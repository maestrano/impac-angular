angular
  .module('impac.services.kpis', [])
  .service('ImpacKpisSvc', ($log, $http, $filter, $q, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper, ImpacAlerts, ImpacEvents, IMPAC_EVENTS) ->

    _self = @

    #====================================
    # Getters
    #====================================


    # Simply forward the getters for objects that remain stored in other services
    @getSsoSessionId = ImpacMainSvc.getSsoSessionId
    @getCurrentDashboard = ImpacDashboardsSvc.getCurrentDashboard

    @config =
      kpisTemplates: []
    @getKpisTemplates = ->
      return _self.config.kpisTemplates

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

    @locked = false
    @load = (force=false) ->
      unless _self.locked
        _self.locked = true

        # Needed:
        #   sso session id => ImpacMainSvc.loadUserData
        #   organizations uids (data sources) => ImpacDashboardsSvc.load
        return $q.all([ImpacMainSvc.loadUserData(force), ImpacDashboardsSvc.load(force)]).then(
          (results) ->
            if _.isEmpty(_self.getKpisTemplates()) || force

              # clear array
              _.remove _self.config.kpisTemplates, (-> true)

              orgUids = _.pluck _self.getCurrentDashboard().data_sources, 'uid'
              ssoSessionId = _self.getSsoSessionId()

              params =
                metadata:
                  organization_ids: orgUids
                sso_session: ssoSessionId

              promises =
                impac: index(params)

              # Get local kpis
              if ImpacRoutes.kpis.local()
                promises.local = $http.get(ImpacRoutes.kpis.local())

              return $q.all(promises).then(
                (response) ->

                  # fill array with new values from Impac! api
                  for template in response.impac.data.kpis
                    template.source ||= 'impac'
                    _self.config.kpisTemplates.push template

                  if response.local
                    # fill array with new values from local endpoints
                    for template in response.local.data.kpis
                      template.source = 'local'
                      _self.config.kpisTemplates.push template
        
                  $log.info("Impac! - KpisSvc: loaded (force=#{force})")

                (error) ->
                  $log.error('Impac! - KpisSvc: Cannot retrieve kpis templates list', error)
              ).finally(-> _self.locked = false )

            else
              _self.locked = false
              return $q.resolve()
        )

      else
        $log.warn "Impac! - KpisSvc: Load locked. Trying again in 1s"
        $timeout (-> _self.load(force)), 1000


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

      for alert in alertsToCreate
        promises.push ImpacAlerts.create(kpi.id, { alert: _.pick(alert, ['service']) })

      for alert in alertsToDelete
        promises.push ImpacAlerts.delete(alert.id)

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
            (renderedKpi)-> # success
            (errorResponse)-> $log.error("Unable to refresh all Kpis: #{errorResponse}")
          )
      )


    #====================================
    # CRUD methods
    #====================================

    # Retrieve all the available kpis from Impac!
    # Note: index is a private method that should be called only by load()
    index = (params) ->
      host = ImpacRoutes.kpis.index()
      url = [host,decodeURIComponent( $.param( params ) )].join('?')
      return $http.get(url)


    # Retrieve data for kpi from api
    @show = (kpi) ->
      _self.load().then(
        ->
          params = {}
          params.sso_session = _self.getSsoSessionId()
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
              kpi.data = _.pick(response.data.kpi, ['value', 'unit', 'results'])

              # When the kpi initial configuration is partial, we update it with what the API has picked by default
              updatedConfig = response.data.kpi.configuration || {}
              missingParams = _.select ['targets','extra_params'], ( (param) -> !kpi[param]? && updatedConfig[param]?)
              angular.extend kpi, _.pick(updatedConfig, missingParams)
              kpi

            (err) ->
              $log.error 'Impac! - KpisSvc: Could not retrieve KPI (show) at: ' + kpi.endpoint, err
              err
          )
        ->
          $log.error 'Impac! - KpisSvc: Service not initialized'
          {error: { message: 'Impac! - KpisSvc: Service is not initialized' }}
      )

    @create = (source, endpoint, elementWatched) ->
      _self.load().then(
        ->
          params = {
            source: source
            endpoint: endpoint
            element_watched: elementWatched
          }

          url = ImpacRoutes.kpis.create(_self.getCurrentDashboard().id)

          $http.post(url, {kpi: params}).then(
            (success) -> success.data
            (err) -> err
          )
        ->
          { error: {message: 'Impac! - KpisSvc: Service is not initialized'} }
      )

    @update = (kpi, params) ->
      _self.load().then(

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
            $q.resolve(kpi)
          ,(err) ->
            $log.error 'Impac! - KpisSvc: Unable to update KPI ', err
            $q.reject(err)
      )


    @delete = (kpi) ->
      _self.load().then(
        url = ImpacRoutes.kpis.delete(_self.getCurrentDashboard().id, kpi.id)
        $http.delete(url)
      )

    return @
  )
