angular
  .module('impac.services.widgets', [])
  .service 'ImpacWidgetsSvc', ($q, $http, $log, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper) ->

    _self = @
    @config = {}
    @config.ssoSessionId = ""


    @load = (force=false) ->
      deferred = $q.defer()

      if _.isEmpty(_self.config.ssoSessionId) || force

        $q.all([ImpacMainSvc.loadUserData(force), ImpacDashboardsSvc.load(force)]).then(
          (results) ->
            _self.config.ssoSessionId = results[0].sso_session
            deferred.resolve(_self.config)
          (error) ->
            deferred.reject(error)
        )

      else
         deferred.resolve(_self.config)

      return deferred.promise


    @create = (opts) ->
      deferred = $q.defer()

      _self.load().then(
        (config) ->

          dashboard = ImpacDashboardsSvc.getCurrentDashboard()
          data = { widget: opts }

          # form a http request or a stubbed request which returns a promise.
          if ImpacDeveloper.isWidgetStubbed(data.widget)
            request = ImpacDeveloper.createWidgetStub(data.widget, dashboard)
          else
            request = $http.post(ImpacRoutes.widgets.create(dashboard.id), data)

          request.then(
            (success) ->
              newWidget = success.data
              dashboard.widgets.push(newWidget)
              ImpacDashboardsSvc.callbacks.widgetAdded.notify(newWidget)
              deferred.resolve(newWidget)

            (error) ->
              $log.error("ImpacWidgetsSvc: cannot create widget on dashboard #{dashboard.id}")
              deferred.reject(error)
          )

        (error) ->
          $log.error("ImpacWidgetsSvc: error while trying to load the service")
          deferred.reject(error)
      )

      return deferred.promise


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
        $log.warn("ImpacWidgetsSvc: Tried to update widget: #{widget.id} with no settings", widget)
        return false

      # Check if widget settings should be written to all same widgets and use as a default
      changedGlobalSetting = _.find widget.settings, (setting)-> setting.reach == 'dashboard'

      # Update all same widgets and dashboard settings if needed
      if (changedGlobalSetting && !ignoreReach)
        return _self.updateAllSimilarWidgets(ImpacDashboardsSvc.getCurrentDashboard(), changedGlobalSetting)

      widget.isLoading = true if needContentReload
      meta = _.reduce(_.map(widget.settings, (set) -> set.toMetadata() ), (result, setMeta) -> angular.merge(result, setMeta))

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
            _self.update(wgt, { metadata: wgt.metadata }).then (updatedWidget) ->
              _self.show(updatedWidget).finally( -> updatedWidget.isLoading = false )

    @massAssignAll = (metadata) ->
      unless _.isEmpty(metadata)
        _self.load().then ->
          currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
          promises = []

          if currentDhb? && currentDhb.widgets?
            if !_.isEmpty(currentDhb.widgets)
              for widget in currentDhb.widgets
                newMetadata = angular.merge({}, widget.metadata, metadata)
                unless _.isEqual(widget.metadata, newMetadata)
                  # If the metadata has not been changed, we don't push the promise
                  promises.push _self.update(widget, {metadata: newMetadata}).then(
                    (updatedWidget) ->
                      updatedWidget.isLoading=true
                      # TODO: should Connec! cache be refreshed on show?
                      _self.show(updatedWidget).then( (renderedWidget)-> renderedWidget.isLoading=false )
                  )
              return $q.all(promises)

            else
              return $q.resolve([])

          else
            $log.error "ImpacWidgetsSvc - currentDhb.widgets is null", currentDhb
            return $q.reject(null)

    @refreshAll = ->
      ImpacDashboardsSvc.load().then(
        (config)->
          widgets = config.currentDashboard.widgets
          _.forEach(widgets, (w) ->
            w.isLoading ||= true
            _self.show(w, true).then(
              (updatedWidget) ->
                w.isLoading = false
              (errorResponse) ->
                w.isLoading = false
                # TODO: better error management
                $log.error(errorResponse.data.error) if errorResponse.data? && errorResponse.data.error
            )
          )
      )

    #====================================
    # CRUD methods
    #====================================

    @show = (widget, refreshCache=false) ->
      deferred = $q.defer()

      _self.load().then(
        (config) ->
          unless isWidgetInCurrentDashboard(widget.id)
            $log.info("ImpacWidgetsSvc: trying to load a widget (id: #{widget.id}) that is not in currentDashboard")
            deferred.reject("trying to load a widget (id: #{widget.id}) that is not in currentDashboard")

          else
            data = {
              owner: widget.owner
              sso_session: _self.config.ssoSessionId
              metadata: widget.metadata
              engine: widget.category
            }
            angular.extend(data, {refresh_cache: true}) if refreshCache

            dashboard = ImpacDashboardsSvc.getCurrentDashboard()

            $http.post(ImpacRoutes.widgets.show(dashboard.id, widget.id), data).then(
              (success) ->
                # Pushes new content to widget
                content = success.data.content || {}
                name = success.data.name
                angular.extend widget, {content: content, originalName: name}

                # Initializes widget's context, and determines if the data has been found
                widget.initContext() if angular.isDefined(widget.initContext)
                # Initializes each widget's setting
                for setting in widget.settings
                  setting.initialize() if angular.isDefined(setting.initialize)

                # Formats the chart when necessary
                widget.format() if angular.isDefined(widget.format)

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
          $log.error("ImpacWidgetsSvc: error while trying to load the service")
          deferred.reject(error)
      )

      return deferred.promise


    @update = (widget, opts) ->
      deferred = $q.defer()

      _self.load().then(
        (config) ->

        unless isWidgetInCurrentDashboard(widget.id)
          $log.info("ImpacWidgetsSvc: trying to update a widget (id: #{widget.id}) that is not in currentDashboard")
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
              $log.error("ImpacWidgetsSvc: cannot update widget: #{widget.id}")
              deferred.reject(error)
          )

        (error) ->
          $log.error("ImpacWidgetsSvc: error while trying to load the service")
          deferred.reject(error)
      )

      return deferred.promise


    @delete = (widgetToDelete) ->
      deferred = $q.defer()

      _self.load().then(
        (config) ->
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
              $log.error("ImpacWidgetsSvc: error while trying to delete widget: #{widgetToDelete.id}")
              deferred.reject(error)
          )

        (error) ->
          $log.error("ImpacWidgetsSvc: error while trying to load the service")
          deferred.reject(error)
      )

      return deferred.promise



    return _self
