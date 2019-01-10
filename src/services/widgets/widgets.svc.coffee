angular
  .module('impac.services.widgets', [])
  .service 'ImpacWidgetsSvc', ($q, $http, $log, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper, ImpacEvents, ImpacTheming, IMPAC_EVENTS) ->

    _self = @
    # ====================================
    # Getters
    # ====================================
    # Simply forward the getter for objects that remain stored in other services
    @getSsoSessionId = ImpacMainSvc.getSsoSessionId

    # ====================================
    # Register Listeners
    # ====================================
    ImpacEvents.registerCb(IMPAC_EVENTS.kpiTargetAlert, (notification) ->
      _self.refreshAll(true)
    )


    # ====================================
    # Load and initialize
    # ====================================
    @load = ->
      unless _self.getSsoSessionId()?
        $q.all([ImpacMainSvc.loadUserData(), ImpacDashboardsSvc.load()])
      else
        $q.resolve()


    isWidgetInCurrentDashboard = (widgetId) ->
      currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
      return false if _.isEmpty(currentDhb) || _.isEmpty(currentDhb.widgets)
      return _.contains( _.pluck(currentDhb.widgets, 'id'), widgetId)


    @initWidgetSettings = (w) ->
      w.isEditMode = false
      return if _.isEmpty(w.settings)
      for setting in w.settings
        setting.initialize()
      return true

    @updateWidgetSettings = (widget, needContentReload = true, ignoreReach = false) ->
      widget.isEditMode = false
      if _.isEmpty(widget.settings)
        $log.warn("Impac! - WidgetsSvc: Tried to update widget: #{widget.id} with no settings", widget)
        return false

      # Check if widget settings should be written to all same widgets and use as a default
      changedGlobalSetting = _.find widget.settings, (setting)-> setting.reach == 'dashboard'

      # Update all same widgets and dashboard settings if needed
      if (changedGlobalSetting && !ignoreReach)
        return _self.updateAllSimilarWidgets(ImpacDashboardsSvc.getCurrentDashboard(), changedGlobalSetting)

      meta = _.reduce(
        _.map( widget.settings, (set) -> set.toMetadata() ),
        (result={}, setMeta) ->
          angular.merge(result, setMeta)
      )

      _self.update(widget, { metadata: meta }, needContentReload)

    # TODO: move logic in ImpacDashboardsSvc
    # Sets setting for all widgets with same name
    @updateAllSimilarWidgets = (dashboard, setting) ->
      # Find setting key
      settingKey = _.keys(setting.toMetadata())[0]
      # Add setting to dashboard's metadata
      angular.extend(dashboard.metadata, setting.toMetadata())

      # Write new setting metadata to current dashboard
      ImpacDashboardsSvc.update(dashboard.id, { metadata: dashboard.metadata }).then(
        (updatedDashboard)->
          promises = []
          for wgt in dashboard.widgets
            # Retrieve the name of parameters attached to the widget
            # TODO: export to a helper function in WidgetsSvc
            wgtSettingsKeys = _.uniq( _.map( wgt.settings, (st) ->
              _.keys(st.toMetadata())[0]
            ))

            # The widget's metadata are updated only if the correct setting is attached to the widget
            if settingKey in wgtSettingsKeys
              angular.extend wgt.metadata, setting.toMetadata()
              promises.push _self.update(wgt, { metadata: wgt.metadata })
            else
              promises.push $q.resolve(wgt)

          $q.all(promises)
      )

    # @desc    Assigns a metadata parameter to all the widgets of the current dashboard
    # @returns Promise
    @massAssignAll = (metadata, refreshCache=false) ->
      return $q.reject('undefined metadata') if _.isEmpty(metadata)

      _self.load().then(
        (_widget) ->
          currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
          promises = []

          if !(currentDhb? && currentDhb.widgets?)
            $log.error "Impac! - WidgetsSvc: CurrentDhb.widgets is null", currentDhb
            $q.reject('undefined currentDhb or currentDhb.widgets')

          else if _.isEmpty(currentDhb.widgets)
            $q.resolve([])

          else
            for widget in currentDhb.widgets
              newMetadata = angular.merge({}, widget.metadata, metadata)
              # If the metadata has not changed, we don't push the promise
              promises.push _self.update(widget, {metadata: newMetadata}, false) unless _.isEqual(widget.metadata, newMetadata)

            $q.all(promises).then( (results) -> _self.refreshAll(refreshCache) )

      )

    @isRefreshing = false
    @refreshAll = (refreshCache = false) ->
      return $q.resolve() if _self.isRefreshing

      _self.isRefreshing = true
      _self.load().then(
        ->
          currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
          promises = []
          for w in currentDhb.widgets
            promises.push _self.show(w, { refreshCache: refreshCache }).then(
              (renderedWidget) ->
                $q.resolve(renderedWidget)
              (errorResponse) ->
              # TODO: better error management
                $log.error(errorResponse.data.error) if (errorResponse.data? && errorResponse.data.error)
                $q.reject(errorResponse)
            )
          $q.all(promises)
      ).finally(
        ->
          # throttles refreshAll calls (temporary fix until rx.angular.js is implemented)
          $timeout(
            ->
              _self.isRefreshing = false
            3000
          )
      )

    # ====================================
    # CRUD methods
    # ====================================

    initWidget = (widget) ->
      # Init
      widget.initContext() if angular.isDefined(widget.initContext)
      # Init settings
      unless _.isEmpty(widget.settings)
        for setting in widget.settings
          setting.initialize() if angular.isDefined(setting.initialize)
      # Draw chart
      widget.format() if angular.isDefined(widget.format)

    paramsForWidget = (widget, opts = {}) ->
      metadata = angular.copy(widget.metadata)
      metadata.utc_offset ||= moment().utcOffset()

      params =
        metadata: metadata
        demo_data: ImpacTheming.get().dhbConfig.designerMode.enabled || !!opts.demo

      params.refresh_cache = true if !!opts.refreshCache
      params

    getConfig = ->
      authHeader = 'Basic ' + btoa(_self.getSsoSessionId())
      { headers: {'Authorization': authHeader } }

    @showAsCSV = (widget) ->
      route = "#{widget.metadata['bolt_path']}/widgets/#{widget.endpoint}.csv"
      params = paramsForWidget(widget)
      url = [route, decodeURIComponent( $.param(params) )].join('?')
      $http.get(url, getConfig()).then(
        (success) ->
          $q.resolve(success.data)
        (error) ->
          $q.reject(error)
      )

    # Calls Legacy Impac! or bolt API to render a widget
    # If no content is returned, the endpoint will be called again with `demo` = `true` to retrieve stub data
    # default opts: { refreshCache: false, demo: false }
    @show = (widget, opts = {}) ->
      widget.isLoading = true
      _self.load().then(
        (loaded) ->
          route = if widget.metadata['bolt_path']
            # If bolt_path is defined, widget is to be fetched from a bolt
            "#{widget.metadata['bolt_path']}/widgets/#{widget.endpoint}"
          else
            # By default, widget is to be fetched from legacy Impac! API (v1)
            dashboard = ImpacDashboardsSvc.getCurrentDashboard()
            ImpacRoutes.widgets.show(widget.endpoint, dashboard.id, widget.id)

          params = paramsForWidget(widget, opts)
          url = [route, decodeURIComponent( $.param(params) )].join('?')

          $http.get(url, getConfig()).then(
            (success) ->
              content = success.data.content || success.data[widget.endpoint] || {}
              if _.isEmpty(content)
                # Reload the widget with param `demo` set at `true` (to retrieve stub data)
                if params.demo_data
                  # If we were already trying to load the widget in demo mode, we resolve the widget without content
                  # TODO: display an error box?
                  $log.error('Impac! - WidgetsSvc: Cannot retrieve demo data for widget:', widget)
                  $q.resolve(widget)
                else
                  _self.show(widget, { refreshCache: params.refresh_cache, demo: true })

              else
                # Push new content to widget, and initialize it
                name = success.data.name
                settingOptions = success.data.settings
                angular.extend widget, {
                  content: content,
                  configOptions: settingOptions,
                  originalName: name,
                  demoData: params.demo_data
                }
                initWidget(widget)
                $q.resolve(widget)

            (showError) ->
              initWidget(widget)
              widget.processError(showError.data.error) if angular.isDefined(widget.processError) && showError.data? && showError.data.error
              $q.reject(showError)
          )

        (loadError) ->
          $log.error("Impac! - WidgetsSvc: Error while trying to load the service")
          $q.reject(loadError)
      ).finally(
        ->
          widget.isLoading = false
      )

    @create = (params) ->
      _self.load().then(
        (_widget) ->
          dashboard = ImpacDashboardsSvc.getCurrentDashboard()

          # form a http request or a stubbed request which returns a promise.
          if ImpacDeveloper.isWidgetStubbed(params)
            request = ImpacDeveloper.createWidgetStub(params, dashboard)
          else
            request = $http.post(ImpacRoutes.widgets.create(dashboard.id), params)

          request.then(
            (success) ->
              newWidget = success.data
              dashboard.widgets.push(newWidget)
              ImpacDashboardsSvc.callbacks.widgetAdded.notify(newWidget)
              $q.resolve(newWidget)

            (createError) ->
              $log.error("Impac! - WidgetsSvc: Cannot create widget on dashboard #{dashboard.id}")
              $q.reject(createError)
          )

        (loadError) ->
          $log.error("Impac! - WidgetsSvc: Error while trying to load the service")
          $q.reject(loadError)
      )

    @update = (widget, opts, needContentReload = true) ->
      widget.isLoading = needContentReload
      _self.load().then(
        (_widget) ->
          if !isWidgetInCurrentDashboard(widget.id)
            $log.info("Impac! - WidgetsSvc: Trying to update a widget (id: #{widget.id}) that is not in currentDashboard")
            $q.reject("trying to update a widget (id: #{widget.id}) that is not in currentDashboard")

          else
            data = { widget: opts }
            dashboard = ImpacDashboardsSvc.getCurrentDashboard()

            # form a http request or a stubbed request which returns a promise.
            if ImpacDeveloper.isWidgetStubbed(widget)
              request = ImpacDeveloper.updateWidgetStub(widget, data.widget)
            else
              request = $http.put(ImpacRoutes.widgets.update(dashboard.id, widget.id), data)

            request.then(
              (success) ->
                angular.extend widget, success.data
                if needContentReload
                  _self.show(widget)
                else
                  $q.resolve(widget)

              (updateError) ->
                $log.error("Impac! - WidgetsSvc: Cannot update widget: #{widget.id}")
                $q.reject(updateError)
            )

        (loadError) ->
          $log.error("Impac! - WidgetsSvc: Error while trying to load the service")
          $q.reject(loadError)
      ).finally(
        ->
          widget.isLoading = false
      )

    @delete = (widgetToDelete) ->
      _self.load().then(
        (_widget) ->
          dashboard = ImpacDashboardsSvc.getCurrentDashboard()

          # form a http request or a stubbed request which returns a promise.
          if ImpacDeveloper.isWidgetStubbed(widgetToDelete)
            request = ImpacDeveloper.deleteWidgetStub(widgetToDelete)
          else
            request = $http.delete(ImpacRoutes.widgets.delete(dashboard.id, widgetToDelete.id))

          request.then(
            (success) ->
              _.remove dashboard.widgets, (widget) ->
                widget.id == widgetToDelete.id
              $q.resolve(success)

            (deleteError) ->
              $log.error("Impac! - WidgetsSvc: Error while trying to delete widget: #{widgetToDelete.id}")
              $q.reject(deleteError)
          )

        (loadError) ->
          $log.error("Impac! - WidgetsSvc: Error while trying to load the service")
          $q.reject(loadError)
      )

    return _self
