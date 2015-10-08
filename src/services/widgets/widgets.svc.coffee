angular
  .module('impac.services.widgets', [])
  .service 'ImpacWidgetsSvc', ($q, $http, $log, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc) ->
  
    _self = @
    @config = {}
    @config.ssoSessionId = ""


    @load = (force=false) ->
      deferred = $q.defer()

      if _.isEmpty(_self.config.ssoSessionId) || force

        ImpacMainSvc.loadUserData(force).then (success) ->
          _self.config.ssoSessionId = success.userData.ssoSession
          deferred.resolve(_self.config)
        ,(error) ->
          deferred.reject(error)

      else
         deferred.resolve(_self.config)

      return deferred.promise


    @show = (id, refreshCache=false) ->
      deferred = $q.defer()

      _self.load().then ->
        ImpacDashboardsSvc.load().then (success) ->
          currentDhb = success.currentDashboard
          if !_.isEmpty(currentDhb)
            if currentDhb.widgets? && currentDhb.widgets.length > 0
              widgetToLoad = _.find currentDhb.widgets, (widget) ->
                id == widget.id

              if _.isEmpty widgetToLoad
                $log.info("Impac - ImpacWidgetsSvc: trying to load a widget (id: #{id}) that is not on currentDashboard")
                deferred.reject("trying to load a widget (id: #{id}) that is not on currentDashboard")

              else
                data = {
                  owner: widgetToLoad.owner
                  sso_session: _self.config.ssoSessionId
                  metadata: widgetToLoad.metadata
                  engine: widgetToLoad.category
                }
                angular.extend(data, {refresh_cache: true}) if refreshCache

                $http.post(ImpacRoutes.showWidgetPath(), data).then (success) ->
                  deferred.resolve success
                ,(error) ->
                  deferred.reject(error)
            else
              $log.error("Impac - ImpacWidgetsSvc: current dashboard has no widget")
              deferred.reject("current dashboard has no widget")

          else
            $log.error("Impac - ImpacWidgetsSvc: cannot load widget when currentDashboard is not set")
            deferred.reject("cannot load widget when currentDashboard is not set")

        ,(error) ->
          $log.error("Impac - ImpacWidgetsSvc: error while loading ImpacDashboardsSvc")
          deferred.reject(error)

      ,(error) ->
        $log.error("Impac - ImpacWidgetsSvc: error while loading ImpacWidgetsSvc")
        deferred.reject(error)

      return deferred.promise


    @create = (dashboard, opts) ->
      deferred = $q.defer()
      data = { widget: opts }

      $http.post(ImpacRoutes.createWidgetPath(dashboard.id), data).then (success) ->
        dashboard.widgets.push(success.data)
        deferred.resolve(success.data)
      ,(error) ->
        $log.error("ImpacWidgetsSvc: cannot create widget on dashboard #{dashboard.id}")
        deferred.reject(error)

      return deferred.promise


    return _self