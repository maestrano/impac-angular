angular
  .module('impac.services.kpis', [])
  .service('ImpacKpisSvc', ($log, $http, $filter, $q, ImpacRoutes, ImpacMainSvc) ->

    _self = @

    #====================================
    # Getters
    #====================================

    @config = {}

    @config.ssoSessionId = ""
    @getSsoSessionId = ->
      return _self.config.ssoSessionId

    @config.kpisTemplates = []
    @getKpisTemplates = ->
      return _self.config.kpisTemplates

    @config.currentDashboardId = ""
    @getCurrentDashboardId = ->
      return _self.config.currentDashboardId


    #====================================
    # Context helpers
    #====================================

    formatShowQuery = (basePath, endpoint, watchable, params) ->
      baseUrl = [basePath,endpoint,watchable].join('/')
      url = [baseUrl,decodeURIComponent( $.param( params ) )].join('?')
      return url

    isInitialized = ->
      !(_.isEmpty _self.config.ssoSessionId or _.isEmpty _self.config.kpisTemplates or _.isEmpty _self.config.currentDashboardId)

    # impac developer toolkit basic authentication is present.
    isDeveloper = ->
      basicAuth = $http.defaults.headers.common.Authorization
      return basicAuth && typeof basicAuth == 'string' && basicAuth.length


    #====================================
    # Load and initialize
    #====================================

    @load = (force=false) ->
      deferred = $q.defer()

      if _.isEmpty(_self.config.ssoSessionId) || force
        ImpacMainSvc.loadUserData(force).then(
          (mainConfig) ->
            _self.config.ssoSessionId = mainConfig.sso_session
            deferred.resolve(_self.config)
          (error) ->
            deferred.reject(error)
        )

      else
         deferred.resolve(_self.config)

      return deferred.promise

    # Will be called by ImpacDashboardsSvc when the current Dhb is set
    # (required because we need the list of organizations uids to properly load the available kpis fron #INDEX)
    @initialize = (dashboard) ->
      _self.load().then( ->
        _self.config.currentDashboardId = dashboard.id

        orgUids = _.pluck dashboard.data_sources, 'uid'

        params =
          metadata:
            organization_ids: orgUids

        params.sso_session = _self.config.ssoSessionId if _self.config.ssoSessionId

        promises = {
          impac: index(params)
        }

        # Get local kpis
        if ImpacRoutes.kpis.local()
          promises.local = $http.get(ImpacRoutes.kpis.local())

        $q.all(promises).then(
          (response) ->
            # clear array
            _.remove _self.config.kpisTemplates, (-> true)

            # fill array with new values from Impac! api
            for template in response.impac.data.kpis
              template.source ||= 'impac'
              _self.config.kpisTemplates.push template

            if response.local
              # fill array with new values from local endpoinst
              for template in response.local.data.kpis
                template.source = 'local'
                _self.config.kpisTemplates.push template

          (error) ->
            $log.error('ImpacKpisSvc - cannot retrieve kpis templates list', error)
        )
      )


    #====================================
    # CRUD methods
    #====================================

    # Retrieve all the available kpis from Impac!
    # Note: index is a private method that should be called only by _self.initialized
    index = (params) ->
      host = ImpacRoutes.kpis.index()
      url = [host,decodeURIComponent( $.param( params ) )].join('?')
      return $http.get(url)


    # retrieves data for kpi from api
    @show = (kpi) ->
      deferred = $q.defer()

      unless isInitialized() || isDeveloper()
        $log.error 'ImpacKpisSvc - Service not initialized'
        deferred.reject({error: {message: 'ImpacKpisSvc is not initialized'}})

      else
        params = {}
        params.sso_session = _self.config.ssoSessionId if _self.config.ssoSessionId
        params.targets = kpi.targets if kpi.targets?
        params.metadata = kpi.settings if kpi.settings?
        params.extra_params = kpi.extra_params if kpi.extra_params?

        switch kpi.source
          when 'impac'
            host = ImpacRoutes.kpis.show(_self.config.currentDashboardId, kpi.id)
          when 'local'
            host = ImpacRoutes.kpis.local()

        url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params)

        $http.get(url).then(
          (response) ->
            kpi.data ||= {}
            angular.extend kpi.data, _.pick response.data.kpi, ['value', 'unit', 'results']

            # When the kpi initial configuration is partial, we update it with what the API has picked by default
            updatedConfig = response.data.kpi.configuration || {}
            missingParams = _.select ['targets','extra_params'], ( (param) -> !kpi[param]? && updatedConfig[param]?)
            angular.extend kpi, _.pick(updatedConfig, missingParams)

            deferred.resolve(kpi)
          (err) ->
            $log.error 'impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err
            deferred.reject(err)
        )

      return deferred.promise


    @create = (source, endpoint, elementWatched) ->
    # @create = (source, endpoint, elementWatched, extraParams=[]) ->
      deferred = $q.defer()

      unless isInitialized() || isDeveloper()
        deferred.reject({error: {message: 'ImpacKpisSvc is not initialized'}})

      else
        params = {
          source: source
          endpoint: endpoint
          element_watched: elementWatched
        }
        # for param in extraParams
        #   params.extra_params ||= []
        #   params.extra_params.push param

        url = ImpacRoutes.kpis.create(_self.config.currentDashboardId)

        $http.post(url, {kpi: params}).then(
          (success) ->
            deferred.resolve(success.data)
          (err) ->
            deferred.reject(err)
        )

      return deferred.promise


    @update = (kpi, params) ->
      deferred = $q.defer()

      filtered_params = {}
      filtered_params.name = params.name if params.name?
      filtered_params.settings = params.metadata if params.metadata?
      filtered_params.targets = params.targets if params.targets?
      filtered_params.extra_params = params.extra_params if params.extra_params?

      url = ImpacRoutes.kpis.update(_self.config.currentDashboardId, kpi.id)

      if !_.isEmpty filtered_params
        $http.put(url, {kpi: params}).then (success) ->
          angular.extend(kpi, success.data)
          _self.show(kpi)
          deferred.resolve(kpi)
        ,(err) ->
          $log.error 'impac-angular ERROR: Unable to update KPI ', err
          deferred.reject(err)

      return deferred.promise


    @delete = (kpi) ->
      deferred = $q.defer()

      url = ImpacRoutes.kpis.delete(_self.config.currentDashboardId, kpi.id)
      $http.delete(url).then (success) ->
        deferred.resolve(success)
      ,(err) ->
        deferred.reject(err)

      return deferred.promise


    return @
  )
