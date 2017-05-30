angular
  .module('impac.services.widgets', [])
  .service 'ImpacWidgetsSvc', ($q, $http, $log, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper, ImpacEvents, IMPAC_EVENTS) ->

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

    @updateWidgetSettings = (widget, needContentReload=true, ignoreReach=false) ->
      widget.isEditMode = false
      if _.isEmpty(widget.settings)
        $log.warn("Impac! - WidgetsSvc: Tried to update widget: #{widget.id} with no settings", widget)
        return false

      # Check if widget settings should be written to all same widgets and use as a default
      changedGlobalSetting = _.find widget.settings, (setting)-> setting.reach == 'dashboard'

      # Update all same widgets and dashboard settings if needed
      if (changedGlobalSetting && !ignoreReach)
        return _self.updateAllSimilarWidgets(ImpacDashboardsSvc.getCurrentDashboard(), changedGlobalSetting)

      widget.isLoading = true if needContentReload
      meta = _.reduce(
        _.map( widget.settings, (set) -> set.toMetadata() ),
        (result={}, setMeta) ->
          angular.merge(result, setMeta)
      )

      _self.update(widget, { metadata: meta }).then(
        (updatedWidget) ->
          if needContentReload
            _self.show(updatedWidget).finally( -> updatedWidget.isLoading = false )
      )

    # TODO: move logic in ImpacDashboardsSvc
    # Sets setting for all widgets with same name
    @updateAllSimilarWidgets = (dashboard, setting) ->
      # Find setting key
      settingKey = _.keys(setting.toMetadata())[0]

      angular.extend dashboard.metadata, setting.toMetadata()
      # Write new setting metadata to current dashboard
      ImpacDashboardsSvc.update(dashboard.id, { metadata: dashboard.metadata }).then (updatedDashboard)->
        for wgt in dashboard.widgets
          # Retrieve the name of parameters attached to the widget
          # TODO: export to a helper function in WidgetsSvc
          wgtSettingsKeys = _.uniq( _.map( wgt.settings, (st) ->
            _.keys(st.toMetadata())[0]
          ))

          # The widget's metadata are updated only if the correct setting is attached to the widget
          if settingKey in wgtSettingsKeys
            angular.extend wgt.metadata, setting.toMetadata()
            wgt.isLoading = true
            _self.update(wgt, { metadata: wgt.metadata }).then(
              (updatedWidget) -> _self.show(updatedWidget).finally( -> updatedWidget.isLoading = false )
            )

    @massAssignAll = (metadata, refreshCache=false) ->
      unless _.isEmpty(metadata)
        _self.load().then( ->
          currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
          promises = []

          if currentDhb? && currentDhb.widgets?
            if !_.isEmpty(currentDhb.widgets)
              for widget in currentDhb.widgets
                newMetadata = angular.merge({}, widget.metadata, metadata)
                # If the metadata has not been changed, we don't push the promise
                unless _.isEqual(widget.metadata, newMetadata)
                  widget.isLoading = true
                  promises.push _self.update(widget, {metadata: newMetadata})

              return $q.all(promises).then(
                (results) -> _self.refreshAll(refreshCache)
              )

            else
              return $q.resolve([])

          else
            $log.error "Impac! - WidgetsSvc: CurrentDhb.widgets is null", currentDhb
            return $q.reject(null)
        )

    @isRefreshing = false
    @refreshAll = (refreshCache=false) ->
      unless _self.isRefreshing
        _self.isRefreshing = true
        _self.load().then( ->
          currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
          for w in currentDhb.widgets
            w.isLoading = true
            _self.show(w, refreshCache).then(
              (renderedWidget) -> renderedWidget.isLoading = false
              # TODO: better error management
              (errorResponse) -> $log.error(errorResponse.data.error) if (errorResponse.data? && errorResponse.data.error)
            )
        ).finally(->
          # throttles refreshAll calls (temporary fix until rx.angular.js is implemented)
          $timeout(->
            _self.isRefreshing = false
          , 3000)
        )

    # ====================================
    # CRUD methods
    # ====================================

    @show = (widget, refreshCache=false) ->
      deferred = $q.defer()

      _self.load().then(
        ->
          unless isWidgetInCurrentDashboard(widget.id)
            $log.info("Impac! - WidgetsSvc: Trying to load a widget (id: #{widget.id}) that is not in currentDashboard")
            deferred.reject("trying to load a widget (id: #{widget.id}) that is not in currentDashboard")

          else
            params = { metadata: widget.metadata }
            params.refresh_cache = true if refreshCache

            dashboard = ImpacDashboardsSvc.getCurrentDashboard()

            # By default, widget is to be fetched from legacy Impac! API (v1)
            route = ImpacRoutes.widgets.show(widget.endpoint, dashboard.id, widget.id)
            
            # If bolt_path is defined, widget is to be fetched from a bolt
            if widget.metadata['bolt_path']
              route = "#{widget.metadata['bolt_path']}/widgets/#{widget.endpoint}"
            
            url = [route, decodeURIComponent( $.param(params) )].join('?')

            authHeader = 'Basic ' + btoa(_self.getSsoSessionId())
            config = { headers: {'Authorization': authHeader } }

            $http.get(url, config).then(
              (success) ->
                # Pushes new content to widget
                content = success.data.content || success.data[widget.endpoint] || {}
                name = success.data.name
                angular.extend widget, {content: content, originalName: name}

                # Initializes widget's context, and determines if the data has been found
                widget.initContext() if angular.isDefined(widget.initContext)
                # Initializes each widget's setting
                for setting in widget.settings
                  setting.initialize() if angular.isDefined(setting.initialize)

                # Formats the chart when necessary
                if angular.isDefined(widget.format)
                  widget.format()

                deferred.resolve widget

              (errorResponse) ->
                # We still initialize the widget with the last saved settings (should be saved in metadata)
                widget.initContext() if angular.isDefined(widget.initContext)
                for setting in widget.settings
                  setting.initialize() if angular.isDefined(setting.initialize)

                # We process the error
                widget.processError(errorResponse.data.error) if angular.isDefined(widget.processError) && errorResponse.data? && errorResponse.data.error
                deferred.reject(errorResponse)
            )

        (error) ->
          $log.error("Impac! - WidgetsSvc: Error while trying to load the service")
          deferred.reject(error)
      )

      return deferred.promise


    @create = (params) ->
      deferred = $q.defer()

      _self.load().then(
        ->
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
              deferred.resolve(newWidget)

            (error) ->
              $log.error("Impac! - WidgetsSvc: Cannot create widget on dashboard #{dashboard.id}")
              deferred.reject(error)
          )

        (error) ->
          $log.error("Impac! - WidgetsSvc: Error while trying to load the service")
          deferred.reject(error)
      )

      return deferred.promise


    @update = (widget, opts) ->
      deferred = $q.defer()

      _self.load().then(
        ->
          unless isWidgetInCurrentDashboard(widget.id)
            $log.info("Impac! - WidgetsSvc: Trying to update a widget (id: #{widget.id}) that is not in currentDashboard")
            deferred.reject("trying to update a widget (id: #{widget.id}) that is not in currentDashboard")

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
                deferred.resolve(widget)
              (error) ->
                $log.error("Impac! - WidgetsSvc: Cannot update widget: #{widget.id}")
                deferred.reject(error)
            )

        (error) ->
          $log.error("Impac! - WidgetsSvc: Error while trying to load the service")
          deferred.reject(error)
      )

      return deferred.promise


    @delete = (widgetToDelete) ->
      deferred = $q.defer()

      _self.load().then(
        ->
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
              deferred.resolve(success)

            (error) ->
              $log.error("Impac! - WidgetsSvc: Error while trying to delete widget: #{widgetToDelete.id}")
              deferred.reject(error)
          )

        (error) ->
          $log.error("Impac! - WidgetsSvc: Error while trying to load the service")
          deferred.reject(error)
      )

      return deferred.promise



    return _self
