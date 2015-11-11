angular
  .module('impac.services.widgets', [])
  .service 'ImpacWidgetsSvc', ($q, $http, $log, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc) ->

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

          $http.post(ImpacRoutes.createWidgetPath(dashboard.id), data).then(
            (success) ->
              newWidget = success.data
              dashboard.widgets.push(newWidget)
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
      return if _.isEmpty(w.settings)
      for setting in w.settings
        setting.initialize()
      return true

    @updateWidgetSettings = (widget, needContentReload=true) ->
      deferred = $q.defer()

      if _.isEmpty(widget.settings)
        deferred.reject('no setting to update')

      else
        widget.isLoading = true if needContentReload
        meta = {}
        for setting in widget.settings
          angular.merge meta, setting.toMetadata()

        _self.update(widget, { metadata: meta }).then(
          (updatedSettingsWidget) ->
            if needContentReload
              _self.show(updatedSettingsWidget).then(
                (updatedContentWidget) ->
                  updatedContentWidget.isLoading = false
                  deferred.resolve(updatedContentWidget)
                (error) ->
                  updatedSettingsWidget.isLoading = false
                  deferred.reject(error)
              )
            else
              deferred.resolve(updatedSettingsWidget)

          (error) ->
            deferred.reject(error)
        )

      return deferred.promise


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

            $http.post(ImpacRoutes.showWidgetPath(widget.id), data).then(
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
                $log.error("ImpacWidgetsSvc: cannot retrieve widget (#{widget.id}) content from API")

                # If data not found ->
                # Old widgets always return a content, even if its empty
                # New widgets return a 404 error
                widget.processError(errorResponse.data.error) if angular.isDefined(widget.processError) && errorResponse.data? && errorResponse.data.error

                deferred.reject(errorResponse)
            )

        (errors) ->
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
          $http.put(ImpacRoutes.updateWidgetPath(widget.id), data).then(
            (success) ->
              updatedWidget = success.data
              angular.extend widget, updatedWidget
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
          $http.delete(ImpacRoutes.deleteWidgetPath(widgetToDelete.id)).then(
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
