angular
  .module('impac.services.kpis', [])
  .service('ImpacKpisSvc', ($log, $http, $filter, $q, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper, ImpacAlerts, ImpacEvents, IMPAC_EVENTS, ImpacUtilities) ->

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

    @getKpiTemplate = (endpoint, primaryWatchable)->
      return _.find(_self.getKpisTemplates(), (k)->
        k.endpoint == endpoint && k.watchables[0] == primaryWatchable
      )

    @getAttachableKpis = (widgetEngine) ->
      deferred = $q.defer()
      _self.load().then(->
        templates = _.select(_self.getKpisTemplates(), (kpiTemplate) ->
          return false unless _.isArray(kpiTemplate.attachables)
          _.includes(kpiTemplate.attachables, widgetEngine)
        )
        deferred.resolve(templates)
      )
      deferred.promise

    @getKpisDateRange = ->
      _self.load().then(->
        kpisDateRange = _self.getCurrentDashboard().metadata.kpis_hist_parameters
        return kpisDateRange unless _.isEmpty(kpisDateRange) || !_.isObject(kpisDateRange)
        ImpacMainSvc.load().then( (config) ->
          fyEndMonth = parseInt(config.currentOrganization.financial_year_end_month) || 6
          fyDates = ImpacUtilities.financialYearDates(fyEndMonth)
          {
            from: moment(fyDates.end, 'YYYY-MM-DD').subtract(1, 'year').format('YYYY-MM-DD'),
            to: moment().format('YYYY-MM-DD'),
            keepToday: true
          }
        )
      )

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

        return ImpacDashboardsSvc.load(force).then(
          ->
            if _.isEmpty(_self.getKpisTemplates()) || force

              # clear array
              _.remove _self.config.kpisTemplates, (-> true)

              orgUids = _.pluck _self.getCurrentDashboard().data_sources, 'uid'
              ssoSessionId = _self.getSsoSessionId()

              params =
                metadata:
                  organization_ids: orgUids

              params.sso_session = ssoSessionId if ssoSessionId

              promises =
                impac: index(params)

              # Get local kpis
              if ImpacRoutes.kpis.local()
                promises.local = $http.get(ImpacRoutes.kpis.local())

              return $q.all(promises).then(
                (response) ->
                  if response.impac? && response.impac.data? && !_.isEmpty(response.impac.data.kpis)
                    # fill array with new values from Impac! api
                    for template in response.impac.data.kpis
                      template.source ||= 'impac'
                      _self.config.kpisTemplates.push template

                  if response.local && response.local.data? && !_.isEmpty(response.local.data.kpis)
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
        ).finally(-> _self.locked = false )

      else
        $log.warn "Impac! - KpisSvc: Load locked. Trying again in 1s"
        $timeout (-> _self.load(force)), 1000

    @massAssignAll = (metadata) ->
      _self.load().then(->
        for k in _self.getCurrentDashboard().kpis
          _self.update(k, {metadata: metadata}).then(->
            _self.show(k).then(
              (renderedKpi)-> # success
              (errorResponse)-> $log.error("Unable to refresh all Kpis: #{errorResponse}")
            )
          )
      )

    @isRefreshing = false
    @refreshAll = ->
      unless _self.isRefreshing
        _self.isRefreshing = true
        _self.load().then(->
          for k in _self.getCurrentDashboard().kpis
            _self.show(k).then(
              (renderedKpi)-> # success
              (errorResponse)-> $log.error("Unable to refresh all Kpis: #{errorResponse}")
            )
        ).finally(->
          # throttles refreshAll calls (temporary fix until rx.angular.js is implemented)
          $timeout(->
            _self.isRefreshing = false
          , 3000)
        )


    #====================================
    # Formatting methods
    #====================================
    # TODO: to be replaced with @validateKpiTargets when attach-kpi is extended to handle
    # targets for multiple watchables.
    @validateKpiTarget = (kpi)->
      (kpi.limit && kpi.limit.value && kpi.limit.mode)

    @validateKpiTargets = (targetsByWatchable)->
      return false if _.isEmpty targetsByWatchable
      _.every(targetsByWatchable, (targets)->
        !_.isEmpty(targets) && _.every(targets, (target)-> target.min || target.max)
      )

    @formatKpiName = (endpoint) ->
      kpi_template = _.find(_self.getKpisTemplates(), (tmpl) -> tmpl.endpoint == endpoint )
      return angular.copy(kpi_template.name)

    # Format a kpi target into a displayable string.
    # @param target [Object] containing target mode and value e.g { min: 600 }
    # @param mappings [Array] array of objects to map mode names to given labels e.g [{label:
    #                         'over', mode: 'min'}]
    @formatKpiTarget = (target, unit, mappings=[])->
      return '' unless target && unit
      targetMode = _.keys(target)[0]
      mapping = _.find(mappings, (map)-> map.mode == targetMode ) || {}
      "#{(mapping.label || targetMode)} #{$filter('mnoCurrency')(target[targetMode], unit, false)}"

    @updateKpisOrder = (kpisIds) ->
      dashboardId = _self.getCurrentDashboard().id
      data = {
        metadata:
          kpis_order: kpisIds
      }
      ImpacDashboardsSvc.update(dashboardId, data)

    # Target placeholders are suggestions defined in Impac API for a targets mode, value &
    # unit depending on the watchable. Impac Angular forces the mode & unit, and suggests the
    # value in the target input placeholder.
    @getKpiTargetPlaceholder = (kpiEndpoint, kpiWatchable) ->
      templ = _self.getKpiTemplate(kpiEndpoint, kpiWatchable)
      ((templ? && templ.target_placeholders?) && templ.target_placeholders[kpiWatchable]) || {}

    # TODO: mno & impac should be change to deal with `watchables`, instead
    # of element_watched, and extra_watchables. The first element of watchables should be
    # considered the primary watchable, a.k.a element_watched.
    @buildKpiWatchables = (kpi)->
      return unless kpi.element_watched
      kpi.watchables = [kpi.element_watched].concat(kpi.extra_watchables || [])

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
      kpi.isLoading = true
      _self.load().then(
        ->
          fy_end_month = ImpacMainSvc.getFinancialYearEndMonth()

          params = {
            opts:
              financial_year_end_month: fy_end_month
          }
          params.sso_session = _self.getSsoSessionId() if _self.getSsoSessionId()
          params.targets = kpi.targets if kpi.targets?
          params.metadata = kpi.settings if kpi.settings?
          params.extra_params = kpi.extra_params if kpi.extra_params?
          params.extra_watchables = kpi.extra_watchables if kpi.extra_watchables?

          # Retrieve datesRange from dashboard or default.
          _self.getKpisDateRange().then((dates)->

            angular.extend params.metadata, {
              hist_parameters:
                from: dates.from
                to: dates.to
                period: 'MONTHLY'
            }

            switch kpi.source
              when 'impac'
                host = ImpacRoutes.kpis.show(_self.getCurrentDashboard().id, kpi.id)
              when 'local'
                host = ImpacRoutes.kpis.local()

            url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params)

            $http.get(url).then(
              (response) ->
                # When no target has been defined
                if response.data.error && response.data.error.code == 422
                  # TODO force edit mode
                  return false
                else
                  kpiResp = response.data.kpi
                  # Calculation
                  # angular.extend kpi.data, kpiResp.calculation
                  kpi.data = kpiResp.calculation

                  # Configuration
                  # When the kpi initial configuration is partial, we update it with what the API has picked by default
                  updatedConfig = kpiResp.configuration || {}
                  missingParams = _.select ['targets','extra_params'], ( (param) -> !kpi[param]? && updatedConfig[param]?)
                  angular.extend kpi, _.pick(updatedConfig, missingParams)

                  # Layout
                  # angular.extend kpi.layout, kpiResp.layout
                  kpi.layout = kpiResp.layout

                  return kpi

              (err) ->
                $log.error 'Impac! - KpisSvc: Could not retrieve KPI (show) at: ' + kpi.endpoint, err
                err
            )
          )
        ->
          $log.error 'Impac! - KpisSvc: Service not initialized'
          {error: { message: 'Impac! - KpisSvc: Service is not initialized' }}
      ).finally ( -> kpi.isLoading = false )

    @create = (source, endpoint, elementWatched, opts={}) ->
      _self.load().then(
        ->
          params = {
            source: source
            endpoint: endpoint
            element_watched: elementWatched
            metadata:
              currency: _self.getCurrentDashboard().currency
          }

          angular.extend params, opts

          url = ImpacRoutes.kpis.create(_self.getCurrentDashboard().id)

          $http.post(url, {kpi: params}).then(
            (success) ->
              # Alerts can be created by default on kpi#create (widget.kpis), check for
              # new alerts and register them with Pusher.
              ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts)
              kpi = success.data
              _self.buildKpiWatchables(kpi)
              kpi
            (err) ->
              $log.error("Impac! - KpisSvc: Unable to create kpi endpoint=#{endpoint}", err)
              err
          )
        ->
          { error: {message: 'Impac! - KpisSvc: Service is not initialized'} }
      )

    @update = (kpi, params) ->
      kpi.isLoading = true
      _self.load().then(

        filtered_params = {}
        filtered_params.name = params.name if params.name?
        filtered_params.settings = params.metadata if params.metadata?
        filtered_params.targets = params.targets if params.targets?
        filtered_params.extra_params = params.extra_params if params.extra_params?

        url = ImpacRoutes.kpis.update(_self.getCurrentDashboard().id, kpi.id)

        if !_.isEmpty filtered_params
          $http.put(url, {kpi: params}).then (success) ->
            # Alerts can be created by default on kpi#update (dashboard.kpis), check for
            # new alerts and register them with Pusher.
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts)
            angular.extend(kpi, success.data)
            _self.buildKpiWatchables(kpi)
            _self.show(kpi)
          ,(err) ->
            $log.error("Impac! - KpisSvc: Unable to update KPI #{kpi.id}", err)
            $q.reject(err)
      ).finally( -> kpi.isLoading = false)


    @delete = (kpi) ->
      _self.load().then(
        url = ImpacRoutes.kpis.delete(_self.getCurrentDashboard().id, kpi.id)
        $http.delete(url).then(
          (res)->
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts)
            res
          (err)->
            $log.error("Impac! KpisSvc: Unable to delete KPI #{kpi.id}", err)
            err
        )
      )

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

    return @
  )
