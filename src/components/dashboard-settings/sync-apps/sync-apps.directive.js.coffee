module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, ImpacMainSvc, ImpacRoutes) ->
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
                # TODO: this endpoint needs to be polled at an interval until sync'ing is stated
                #       as finished from the response.
                # @cesar: https://github.com/emmaguo/angular-poller
                $http.get("webhook/sync/#{orgUID}/progress")
                ####
                scope.syncingApps = false
              (err) ->
                $log.error 'Unable to sync apps', err
                scope.syncingApps = false
            )
        )

    template: $templateCache.get('dashboard-settings/sync-apps.tmpl.html'),
  }
)