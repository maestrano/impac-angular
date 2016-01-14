module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, $filter, $modal, ImpacMainSvc, ImpacRoutes, ImpacWidgetsSvc, poller) ->
  return {
    restrict: 'A',
    scope: {
    },
    link: (scope, element, attrs) ->
      scope.syncingApps = false
      scope.hasConnectors = false

      openSyncAlertsModal =
        open: null
        engage: ()->
          this.open = ()->
            modalInstance = $modal.open({
              animation: true
              size: 'md'
              templateUrl: 'alerts.tmpl.html'
              appendTo: angular.element(document.getElementsByTagName('impac-dashboard'))
              controller: ($scope, alerts) ->
                $scope.alerts = alerts
                $scope.ok = () ->
                  modalInstance.close()
              resolve:
                alerts: ()->
                  return scope.errors
            })
            this.open = null

      refreshAllWidgets =
        run: null
        engage: ()->
          this.run = ()->
            ImpacWidgetsSvc.refreshAll()
            this.run = null

      ImpacMainSvc.load().then(
        (config) ->
          scope.orgUID = config.currentOrganization.uid

          scope.syncingPoller = poller.get("webhook/sync/#{scope.orgUID}/progress?sso_session=#{config.userData.sso_session}", {delay: 5000, smart: true})
          scope.syncingPoller.promise.then(null, null,
            (response) ->
              scope.connectors = []
              scope.errors = response.data.errors

              # syncing status for loader
              if (response.data.syncing == false)
                scope.syncingApps = false
                refreshAllWidgets.run() if refreshAllWidgets.run
                openSyncAlertsModal.open() if openSyncAlertsModal.open && (scope.errors.fatal.length || scope.errors.disconnected.length)
                scope.syncingPoller.stop()
              else if (response.data.syncing == true)
                scope.syncingApps = true
                refreshAllWidgets.engage()
                openSyncAlertsModal.engage()

              # last synced app(s)
              if response.data.last_synced
                # when a last sync date is available
                if response.data.last_synced.last_sync
                  scope.lastSynced = "Last Synced: #{$filter('date')(response.data.last_synced.last_sync, "dd/MM/yyyy 'at' h:mma")} (#{response.data.last_synced.name})"
                # when no last sync history can be retrieved,
                else if response.data.last_synced.name
                  scope.lastSynced = response.data.last_synced.name + ' - Please Retry'

                scope.connectors = _.reject(response.data.connectors, (connector) -> connector.name == response.data.last_synced.name)

              scope.hasConnectors = if scope.connectors.length then true else false
          )
      )

      scope.synchronize = ->
        return if scope.syncingApps
        scope.syncingApps = true

        $http.get(ImpacRoutes.syncAppsPath(scope.orgUID)).then(
          (success) ->
            scope.syncingPoller.start()
            openSyncAlertsModal.engage()
          (err) ->
            $log.error 'Unable to sync apps', err
            scope.syncingApps = false
        )

    template: $templateCache.get('dashboard-settings/sync-apps.tmpl.html'),
  }
)
