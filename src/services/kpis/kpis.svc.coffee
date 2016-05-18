angular
  .module('impac.services.kpis', [])
  .service('ImpacKpisSvc', ($log, $http, $filter, $q, ImpacEvents, ImpacRoutes, ImpacMainSvc, ImpacDeveloper, IMPAC_EVENTS) ->

    _self = @

    #====================================
    # Getters
    #====================================

    @config = {}

    @getSsoSessionId = ->
      return ImpacMainSvc.getSsoSessionId()

    @config.kpisTemplates = []
    @getKpisTemplates = ->
      return _self.config.kpisTemplates

    @config.currentDhb = {}
    @getCurrentDashboard = ->
      return _self.config.currentDhb


    #====================================
    # Register Listeners
    #====================================
    ImpacEvents.registerCb(IMPAC_EVENTS.kpiTargetAlert, (notification) ->
      _self.refreshAll(true)
    )

    #====================================
    # Context helpers
    #====================================

    formatShowQuery = (basePath, endpoint, watchable, params) ->
      baseUrl = [basePath,endpoint,watchable].join('/')
      url = [baseUrl,decodeURIComponent( $.param( params ) )].join('?')
      return url

    #====================================
    # Load and initialize
    #====================================

    # Methods can tap into this promise to receive resolution on initialization.
    @initialized = $q.defer()

    @load = (force=false) ->
      deferred = $q.defer()

      if _.isEmpty(_self.getSsoSessionId()) || force
        ImpacMainSvc.loadUserData(force).then(
          () ->
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
      # Re-assign a new initialization promise, if the previous has been resolved or rejected.
      _self.initialized = $q.defer() if _self.initialized.promise.$$state > 0
      _self.load().then( ->
        _self.config.currentDhb = dashboard

        orgUids = _.pluck dashboard.data_sources, 'uid'

        params =
          metadata:
            organization_ids: orgUids

        params.sso_session = _self.getSsoSessionId() if _self.getSsoSessionId()

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

            _self.initialized.resolve(true)
          (error) ->
            $log.error('ImpacKpisSvc - cannot retrieve kpis templates list', error)
            _self.initialized.reject(false)
        )
      )
      return _self.initialized.promise

    # TODO: this method should message alerts.svc for Alerts requests.
    @saveAlerts = (kpi, alerts) ->
      # Create alerts that have been ticked in the modal, and are not already in kpi.alerts
      alertsToCreate = _.filter(alerts, (alert) ->
        alert.active && !_.includes(
          _.map(kpi.alerts, (a) -> a.service),
          alert.service
        )
      )

      # Remove alerts that are not ticked in the modal and are part of kpi.alerts
      alertsToDelete = _.filter(kpi.alerts, (alert) ->
        !alerts[alert.service].active
      )

      promises = []

      createUrl = ImpacRoutes.kpis.alerts.create(kpi.id)

      for alert in alertsToCreate
        promises.push $http.post(createUrl, {alert: _.pick(alert, ['service'])})

      for alert in alertsToDelete
        deleteUrl = ImpacRoutes.kpis.alerts.delete(alert.id)
        promises.push $http.delete(deleteUrl)

      return $q.all(promises).then(
        (success) ->
          kpi.alerts ||= {}
          for resp in success
            # if "deleted" is received, remove the alert from the kpi.alerts array
            if resp.data.deleted
              _.remove(kpi.alerts, (alert) ->
                alert.service == resp.data.deleted.service
              )
            # else: push the added alert to the kpi.alerts array
            else
              kpi.alerts.push resp.data
          ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts)
      )

    @refreshAll = (refreshCache=false) ->
      _self.load().then(->
        for k in _self.getCurrentDashboard().kpis
          _self.show(k, refreshCache).then(
            (renderedKpi)-> $log.debug('ImpacKpisSvc: Successfully refreshed Kpis.')
            (errorResponse)-> $log.error("Unable to refresh all Kpis: #{errorResponse}")
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
      _self.initialized.promise.then(
        ()->
          params = {}
          params.sso_session = _self.getSsoSessionId() if _self.getSsoSessionId()
          params.targets = kpi.targets if kpi.targets?
          params.metadata = kpi.settings if kpi.settings?
          params.extra_params = kpi.extra_params if kpi.extra_params?

          switch kpi.source
            when 'impac'
              host = ImpacRoutes.kpis.show(_self.getCurrentDashboard().id, kpi.id)
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
              kpi
            (err) ->
              $log.error 'impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err
              err
          )
        ()->
          $log.error 'ImpacKpisSvc - Service not initialized'
          {error: { message: 'ImpacKpisSvc is not initialized' }}
      )

    @create = (source, endpoint, elementWatched) ->
    # @create = (source, endpoint, elementWatched, extraParams=[]) ->
      _self.initialized.promise.then(
        ()->
          params = {
            source: source
            endpoint: endpoint
            element_watched: elementWatched
          }
          # for param in extraParams
          #   params.extra_params ||= []
          #   params.extra_params.push param

          url = ImpacRoutes.kpis.create(_self.getCurrentDashboard().id)

          $http.post(url, {kpi: params}).then(
            (success) -> success.data
            (err) -> err
          )
        ()->
          { error: {message: 'ImpacKpisSvc is not initialized'} }
      )

    @update = (kpi, params) ->
      deferred = $q.defer()

      filtered_params = {}
      filtered_params.name = params.name if params.name?
      filtered_params.settings = params.metadata if params.metadata?
      filtered_params.targets = params.targets if params.targets?
      filtered_params.extra_params = params.extra_params if params.extra_params?

      url = ImpacRoutes.kpis.update(_self.getCurrentDashboard().id, kpi.id)

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

      url = ImpacRoutes.kpis.delete(_self.getCurrentDashboard().id, kpi.id)
      $http.delete(url).then (success) ->
        deferred.resolve(success)
      ,(err) ->
        deferred.reject(err)

      return deferred.promise


    return @
  )
