module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, ImpacMainSvc, ImpacRoutes, poller) ->
  return {
    restrict: 'A',
    scope: {
    },
    link: (scope, element, attrs) ->
      scope.syncingApps = false

      scope.synchronize = ->
        return if scope.syncingApps
        scope.syncingApps = true

        ImpacMainSvc.load().then(
          (config) ->
            orgUID = config.currentOrganization.uid
            $http.get(ImpacRoutes.syncAppsPath(orgUID)).then(
              (success) ->
                console.log 'success! ', success

                myPoller = poller.get("webhook/sync/#{orgUID}/progress", {delay: 5000})
                myPoller.promise.then(null, null,
                  (object) ->
                    if (object.syncing == false)
                      scope.syncingApps = false
                      myPoller.remove()
                )
              (err) ->
                $log.error 'Unable to sync apps', err
                scope.syncingApps = false
            )
        )

    template: $templateCache.get('dashboard-settings/sync-apps.tmpl.html'),
  }
)