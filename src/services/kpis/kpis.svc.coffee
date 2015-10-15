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
      !_.isEmpty _self.config.ssoSessionId and
        !_.isEmpty _self.config.kpisTemplates and
        !_.isEmpty _self.config.currentDashboardId


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
        params = {
          sso_session: _self.config.ssoSessionId
          metadata: {organization_ids: orgUids}
        }

        promises = {
          impac: index(params)
        }

        # Get local kpis
        if ImpacRoutes.localKpisBasePath()
          promises.local = $http.get(ImpacRoutes.localKpisBasePath())

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
      host = ImpacRoutes.impacKpisBasePath()
      url = [host,decodeURIComponent( $.param( params ) )].join('?')
      return $http.get(url)


    # retrieves data for kpi from api
    @show = (kpi) ->
      deferred = $q.defer()
      deferred.reject({error: {message: 'ImpacKpisSvc is not initialized'}}) if !isInitialized()

      params = {}
      params.sso_session = _self.config.ssoSessionId
      params.target = kpi.target if kpi.target?
      params.metadata = kpi.settings if kpi.settings?
      params.extra_param = kpi.extra_param if kpi.extra_param?

      switch kpi.source
        when 'impac'
          host = ImpacRoutes.impacKpisBasePath()
        when 'local'
          host = ImpacRoutes.localKpisBasePath()

      url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params)

      $http.get(url).then(
        (response) ->
          kpi.data = response.data.kpi
          $log.debug 'KPI: ', kpi
          deferred.resolve(kpi)
        (err) ->
          $log.error 'impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err
          deferred.reject(err)
      )
      
      return deferred.promise


    @create = (source, endpoint, element_watched, extra_param=null) ->
      deferred = $q.defer()
      deferred.reject({error: {message: 'ImpacKpisSvc is not initialized'}}) if !isInitialized()

      params = {
        source: source
        endpoint: endpoint
        element_watched: element_watched
      }
      params.extra_param = extra_param if extra_param?

      url = ImpacRoutes.createKpiPath _self.config.currentDashboardId

      $http.post(url, {kpi: params}).then(
        (success) ->
          deferred.resolve(success.data)
          $log.debug 'success adding KPI: ', success
        (err) ->
          deferred.reject(err)
          $log.error 'impac-angular ERROR: Unable to add KPI ', err
      )

      return deferred.promise


    @update = (kpi, params) ->
      deferred = $q.defer()

      filtered_params = {}
      filtered_params.name = params.name if params.name?
      filtered_params.settings = params.metadata if params.metadata?
      filtered_params.target = params.target if params.target?
      filtered_params.extra_param = params.extra_param if params.extra_param?

      url = ImpacRoutes.updateKpiPath kpi.id

      if !_.isEmpty filtered_params
        $http.put(url, {kpi: params}).then (success) ->
          # TODO verify
          angular.extend(kpi, success.data)
          _self.show(kpi)
          deferred.resolve(kpi)
        ,(err) ->
          $log.error 'impac-angular ERROR: Unable to update KPI ', err
          deferred.reject(err)

      return deferred.promise


    @delete = (kpi) ->
      deferred = $q.defer()

      url = ImpacRoutes.deleteKpiPath kpi.id
      $http.delete(url).then (success) ->
        deferred.resolve(success)
      ,(err) ->
        deferred.reject(err)

      return deferred.promise


    return @
  )
