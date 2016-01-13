module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, $filter, $modal, ImpacMainSvc, ImpacRoutes, poller) ->
  return {
    restrict: 'A',
    scope: {
    },
    link: (scope, element, attrs) ->
      scope.syncingApps = false
      scope.hasConnectors = false

      openSyncAlertsModal = ()->
        modalInstance = $modal.open({
          animation: true
          size: 'md'
          templateUrl: 'alerts.tmpl.html'
          appendTo: angular.element(document.getElementsByTagName('impac-dashboard'))
          controller: ($scope, alerts) ->
            $scope.alerts = alerts
            console.log alerts
            $scope.ok = () ->
              modalInstance.close()
          resolve:
            alerts: ()->
              return scope.errors
        })

      ImpacMainSvc.load().then(
        (config) ->
          scope.orgUID = config.currentOrganization.uid

          scope.syncingPoller = poller.get("webhook/sync/#{scope.orgUID}/progress?sso_session=#{config.userData.sso_session}", {delay: 5000, smart: true})
          scope.syncingPoller.promise.then(null, null,
            (response) ->
              console.log 'poller response: ',response
              if (response.data.syncing == false)
                scope.syncingApps = false
                scope.syncingPoller.stop()
              else if (response.data.syncing == true)
                scope.syncingApps = true

              scope.lastSynced = if response.data.last_synced then $filter('date')(response.data.last_synced.last_sync, "dd/MM/yyyy 'at' h:mma") else null

              # sync times for all connectors expect lastSynced displayed in a popover
              # $scope.connectors = []
              scope.connectors = (_.reject(response.data.connectors, (connector) -> connector.name == response.data.last_synced.name) if scope.lastSynced) || []

              scope.hasConnectors = if scope.connectors.length then true else false

              scope.errors = response.data.errors

              openSyncAlertsModal() if scope.errors.fatal.length || scope.errors.disconnected.length
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
