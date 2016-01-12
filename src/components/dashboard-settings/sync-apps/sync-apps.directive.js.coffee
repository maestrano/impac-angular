module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, $filter, ImpacMainSvc, ImpacRoutes, poller) ->
  return {
    restrict: 'A',
    scope: {
    },
    link: (scope, element, attrs) ->
      scope.syncingApps = false

      ImpacMainSvc.load().then(
        (config) ->
          scope.orgUID = config.currentOrganization.uid

          scope.syncingPoller = poller.get("webhook/sync/#{scope.orgUID}/progress?sso_session=#{config.userData.sso_session}", {delay: 5000, smart: true})
          scope.syncingPoller.promise.then(null, null,
            (object) ->
              if (object.data.syncing == false)
                scope.syncingApps = false
                scope.syncingPoller.stop()
              else if (object.data.syncing == true)
                scope.syncingApps = true

              scope.lastSynced = if object.data.last_synced then $filter('date')(object.data.last_synced.last_sync, "dd/MM/yyyy 'at' h:mma") else null

              scope.connectors = object.data.connectors
              scope.errors = object.data.errors
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
