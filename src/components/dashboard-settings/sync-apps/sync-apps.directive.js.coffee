module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, ImpacMainSvc, ImpacRoutes, poller) ->
  return {
    restrict: 'A',
    scope: {
    },
    link: (scope, element, attrs) ->
      scope.syncingApps = false

      ImpacMainSvc.load().then(
        (config) ->
          scope.orgUID = config.currentOrganization.uid
    
          scope.syncingPoller = poller.get("webhook/sync/#{scope.orgUID}/progress", {delay: 5000, smart: true})
          scope.syncingPoller.promise.then(null, null,
            (object) ->
              if (object.data.syncing == false)
                scope.syncingApps = false
                scope.syncingPoller.stop()
              else if (object.data.syncing == true)
                scope.syncingApps = true
          )
      )

      scope.synchronize = ->
        return if scope.syncingApps
        scope.syncingApps = true

        $http.get(ImpacRoutes.syncAppsPath(scope.orgUID)).then(
          (success) ->
            scope.syncingPoller.start()
          (err) ->
            $log.error 'Unable to sync apps', err
            scope.syncingApps = false
        )

    template: $templateCache.get('dashboard-settings/sync-apps.tmpl.html'),
  }
)