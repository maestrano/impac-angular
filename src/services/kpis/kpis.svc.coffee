angular
  .module('impac.services.kpis', [])
  .service('ImpacKpisSvc', ($log, $http, $filter, $q, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper, ImpacAlerts, ImpacEvents, IMPAC_EVENTS, ImpacUtilities, ImpacTheming, toastr) ->

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
      _self.load().then(
        ->
          templates = _.select(_self.getKpisTemplates(), (kpiTemplate) ->
            return false unless _.isArray(kpiTemplate.attachables)
            _.includes(kpiTemplate.attachables, widgetEngine)
          )
          deferred.resolve(templates)
        ->
          deferred.reject()
      )
      deferred.promise

    @getKpisDateRange = ->
      return $q.reject('Kpis dates picker disabled') unless ImpacTheming.get().dhbKpisConfig.enableDatesPicker
      _self.load().then(->
        kpisDateRange = _self.getCurrentDashboard().metadata.kpis_hist_parameters
        return kpisDateRange unless _.isEmpty(kpisDateRange) || !_.isObject(kpisDateRange)
        ImpacMainSvc.load().then( (config) ->
          fyEndMonth = parseInt(config.currentOrganization.financial_year_end_month) || 6
          fyDates = ImpacUtilities.financialYearDates(fyEndMonth)
          {
            from: fyDates.start,
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
    # @param [refreshCache] needed for refreshing cache on reports used for Impac! KPI
    # possible_extra_params on #index.
    @load = (refreshCache=false) ->
      unless _self.locked
        _self.locked = true

        return $q.all([ImpacMainSvc.loadUserData(), ImpacDashboardsSvc.load()]).then(
          (results)->

            orgUids = _.pluck _self.getCurrentDashboard().data_sources, 'uid'
            ssoSessionId = results[0].sso_session

            params =
              metadata: organization_ids: orgUids
              opts: refresh_cache: refreshCache

            params.sso_session = ssoSessionId if ssoSessionId

            fetchKpisTemplates(params).finally(->
              _self.locked = false
              $log.info("Impac! - KpisSvc: loaded")
            )
          (err)->
            $log.error('Impac! - KpisSvc: failed to load.', err)
        ).finally(-> _self.locked = false )

      else
        $log.warn "Impac! - KpisSvc: Load locked. Trying again in 1s"
        $timeout (-> _self.load(refreshCache)), 1000

    @massAssignAll = (metadata) ->
      _self.load().then(->
        for k in _self.getCurrentDashboard().kpis
          _self.update(k, {metadata: metadata})
        for w in _self.getCurrentDashboard().widgets
          for k in w.kpis
            _self.update(k, {metadata: metadata}, false)

        return
      )

    @isRefreshing = false
    @refreshAll = (refreshCache=false) ->
      unless _self.isRefreshing
        _self.isRefreshing = true
        _self.load(refreshCache).then(->
          for k in _self.getCurrentDashboard().kpis
            _self.show(k, refreshCache).then(
              (renderedKpi)-> # success
              (errorResponse)-> $log.error("Unable to refresh all Kpis: #{errorResponse}")
            )
        ).finally(->
          # throttles refreshAll calls
          $timeout(->
            _self.isRefreshing = false
          , 3000)
        )


    #====================================
    # Formatting methods
    #====================================
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
    # NOTE: target placeholders are recommendations for a single target, by watchable. Multiple
    # targets placeholders are currently not supported.
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

    # Retrieve all the available kpis from various sources
    # Note: fetchKpisTemplates is a private method that should be called only by load()
    fetchKpisTemplates = (params)->
      kpisTemplates = []
      kpisTemplatesPromises = []

      # Templates from Impac! api
      # Serialize nested params as inline
      impacUrl = [ImpacRoutes.kpis.index(), decodeURIComponent( $.param( params ) )].join('?')
      kpisTemplatesPromises.push $http.get(impacUrl).then(
        (response)->
          for template in response.data.kpis
            template.source ||= 'impac'
            kpisTemplates.push template
        (error) ->
          $log.error("Impac! - KpisSvc: cannot retrieve kpis templates from Impac!")
      )

      # Templates from local endpoints
      if ImpacRoutes.kpis.local()
        $http.get(ImpacRoutes.kpis.local()).then(
          (response)->
            # fill array with new values from local endpoints
            for template in response.data.kpis
              template.source = 'local'
              _self.config.kpisTemplates.push template
          (error) ->
            $log.error("Impac! - KpisSvc: cannot retrieve kpis templates from local", "#{ImpacRoutes.kpis.local()}")
        )

      # Templates from each registered Bolt
      for bolt in ImpacRoutes.bolts()
        kpisTemplatesPromises.push $http.get("#{bolt.path}/kpis").then(
          (response) ->
            for template in response.data.kpis
              template.metadata ||= {}
              template.metadata.bolt_path = bolt.path
              kpisTemplates.push(template)
          (error) ->
            $log.error("Impac! - KpisSvc: cannot retrieve kpis templates from bolt", "#{bolt.path}/kpis")
        )

      $q.all(kpisTemplatesPromises).then(->
        _.remove(_self.config.kpisTemplates, -> true)
        for template in kpisTemplates
          _self.config.kpisTemplates.push template
      )

    # Retrieve data for kpi from api
    @show = (kpi, refreshCache=false) ->
      kpi.isLoading = true
      _self.load().then(
        ->
          settings = angular.copy(kpi.settings) || {}
          settings.utc_offset ||= moment().utcOffset()
          
          params =
            opts:
              refresh_cache: refreshCache

          params.sso_session = _self.getSsoSessionId() if _self.getSsoSessionId()
          params.targets = kpi.targets if kpi.targets?
          params.metadata = settings
          params.extra_params = kpi.extra_params if kpi.extra_params?
          params.extra_watchables = kpi.extra_watchables if kpi.extra_watchables?

          switch kpi.source
            when 'impac'
              host = ImpacRoutes.kpis.show(_self.getCurrentDashboard().id, kpi.id)
            when 'local'
              host = ImpacRoutes.kpis.local()

          url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params)

          return $http.get(url).then(
            (response) ->
              kpiResp = response.data.kpi
              # Calculation
              kpi.data = kpiResp.calculation

              # Configuration
              # When the kpi initial configuration is partial, we update it with what the API has picked by default
              updatedConfig = kpiResp.configuration || {}
              missingParams = _.select ['targets','extra_params'], ( (param) -> !kpi[param]? && updatedConfig[param]?)
              angular.extend kpi, _.pick(updatedConfig, missingParams)

              # Layout
              kpi.layout = kpiResp.layout

              return kpi

            (err) ->
              $log.error 'Impac! - KpisSvc: Could not retrieve KPI (show) at: ' + kpi.endpoint, err
              $q.reject(err)
          )
        ->
          $log.error 'Impac! - KpisSvc: Service not initialized'
          $q.reject({error: { message: 'Impac! - KpisSvc: Service is not initialized' }})
      ).finally ( -> kpi.isLoading = false )

    @create = (source, endpoint, elementWatched, opts={}) ->
      deferred = $q.defer()
      _self.load().then(
        ->
          params = {
            source: source
            endpoint: endpoint
            element_watched: elementWatched
            metadata:
              currency: _self.getCurrentDashboard().currency
          }

          # Retrieve datesRange from dashboard or default.
          _self.getKpisDateRange().then( (dates) ->
            params.metadata = {} unless params.metadata?
            params.metadata.hist_parameters = dates
          ).finally( ->
            angular.merge params, opts

            url = ImpacRoutes.kpis.create(_self.getCurrentDashboard().id)

            $http.post(url, {kpi: params}).then(
              (success) ->
                # Alerts can be created by default on kpi#create (widget.kpis), check for
                # new alerts and register them with Pusher.
                ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts)
                kpi = success.data
                _self.buildKpiWatchables(kpi)
                deferred.resolve(kpi)
              (err) ->
                $log.error("Impac! - KpisSvc: Unable to create kpi endpoint=#{endpoint}", err)
                toastr.error('Unable to create KPI', 'Error')
                deferred.reject(err)
            )
          )
        ->
          deferred.reject({ error: {message: 'Impac! - KpisSvc: Service is not initialized'} })
      )
      return deferred.promise

    @update = (kpi, params = {}, showKpi = true) ->
      kpi.isLoading = true
      _self.load().then(->

        filtered_params = {}
        filtered_params.name = params.name if params.name?
        filtered_params.settings = params.metadata if params.metadata?
        filtered_params.targets = params.targets if params.targets?
        filtered_params.extra_params = params.extra_params if params.extra_params?

        url = ImpacRoutes.kpis.update(_self.getCurrentDashboard().id, kpi.id)

        if !_.isEmpty filtered_params
          $http.put(url, {kpi: params}).then(
            (success) ->
              # Alerts can be created by default on kpi#update (dashboard.kpis), check for
              # new alerts and register them with Pusher.
              ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts)
              angular.extend(kpi, success.data)
              _self.buildKpiWatchables(kpi)
              if showKpi then _self.show(kpi) else kpi
            (err) ->
              $log.error("Impac! - KpisSvc: Unable to update KPI #{kpi.id}", err)
              $q.reject(err)
          )
      ).finally(->
        kpi.isLoading = false
      )


    @delete = (kpi) ->
      _self.load().then(->
        url = ImpacRoutes.kpis.delete(_self.getCurrentDashboard().id, kpi.id)
        $http.delete(url).then(
          (res)->
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts)
            res
          (err)->
            $log.error("Impac! KpisSvc: Unable to delete KPI #{kpi.id}", err)
            $q.reject(err)
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

      # Update existing alerts that have been modified
      alertsToUpdate = _.filter(alerts, (alert) ->
        existingAlert = _.find(kpi.alerts, (kpi_alert) -> kpi_alert.service == alert.service)
        return false if alert.service == "inapp" || !existingAlert || !alert.recipients
        existingRecipientIds = existingAlert.recipients.map((recipient) -> recipient.id).sort()
        updatedRecipientIds = alert.recipients.map((recipient) -> recipient.id).sort()
        recipientChange = false
        recipientChange = true if updatedRecipientIds.length != existingRecipientIds.length || "#{existingRecipientIds}" != "#{updatedRecipientIds}"
        alert.id = existingAlert.id
        alert.active && recipientChange
      )

      promises = []

      for alert in alertsToCreate
        alertHash = { alert: _.pick(alert, ['service']) }
        alertHash.alert.recipients = alert.recipients if alert.service == 'email'
        promises.push ImpacAlerts.create(kpi.id, alertHash)

      for alert in alertsToDelete
        promises.push ImpacAlerts.delete(alert.id)

      for alert in alertsToUpdate
        promises.push ImpacAlerts.update(alert.id, {alert: _.pick(alert, ['service', 'recipients'])})

      return $q.all(promises).then(
        (success) ->
          kpi.alerts ||= []
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
