module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, $filter, $modal, ImpacMainSvc, ImpacRoutes, ImpacWidgetsSvc, ImpacTheming, poller) ->
  return {
    restrict: 'A',
    scope: {
    },
    link: (scope, element, attrs) ->
      scope.syncingApps = false
      scope.hasConnectors = false

      # Theming configuration giving the ability to show / hide the sync apps feature.
      scope.showComponent = ImpacTheming.get().syncAppsConfig.show

      # Attaches the open() method to openSyncAlertsModal object when openSyncAlertsModal.engage() is called.
      # This allows the modal to only run in cases where it has been 'switched on', as once it runs, it will dis-engage (switch itself off), waiting to be re-engaged.
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

      # Attaches the run() method to refreshAllWidgets object when refreshAllWidget.engage() is called.
      # This allows the widget refresh to only run in cases where it has been 'switched on', as once it runs, it will dis-engage (switch itself off), waiting to be re-engaged.
      refreshAllWidgets =
        run: null
        engage: ()->
          this.run = ()->
            ImpacWidgetsSvc.refreshAll()
            this.run = null

      ImpacMainSvc.load(true).then(
        (config) ->
          scope.orgUID = config.currentOrganization.uid

          scope.syncingPoller = poller.get(ImpacRoutes.appInstancesSyncPath(scope.orgUID), {delay: 5000, smart: true})

          scope.syncingPoller.promise.then(null, null,
            # PROMISE NOTIFY METHOD - runs on each poll until syncPoller.stop() is called.
            (response) ->
              scope.connectors = []
              scope.errors = response.data.errors

              # Syncing status
              if (response.data.syncing == false)
                scope.syncingApps = false
                # if refresh widgets is engaged, refresh widgets
                refreshAllWidgets.run() if refreshAllWidgets.run
                # if modal is engaged, and there are errors, open alerts modal
                openSyncAlertsModal.open() if openSyncAlertsModal.open && (scope.errors.fatal.length || scope.errors.disconnected.length)
                scope.syncingPoller.stop()
              else if (response.data.syncing == true)
                scope.syncingApps = true
                # engaged refresh & modal functions
                refreshAllWidgets.engage()
                openSyncAlertsModal.engage()

              # last synced app(s)
              if response.data.last_synced
                # when a last sync date is available
                if response.data.last_synced.last_sync
                  scope.lastSynced = "Last Synced: #{$filter('date')(response.data.last_synced.last_sync, "yyyy-MM-dd 'at' h:mma")} (#{response.data.last_synced.name})"
                # when no last sync history can be retrieved,
                else if response.data.last_synced.name
                  scope.lastSynced = response.data.last_synced.name + ' - Please Retry'

                # connectors are objects containing the sync history of all connector apps.
                scope.connectors = _.reject(response.data.connectors, (connector) -> connector.name == response.data.last_synced.name)

              scope.hasConnectors = if scope.connectors.length then true else false
          )
      )

      # runs on syncronize button click
      scope.synchronize = ->
        return if scope.syncingApps
        scope.syncingApps = true

        $http.post(ImpacRoutes.appInstancesSyncPath(scope.orgUID)).then(
          (success) ->
            # start poller - engage alerts modal.
            scope.syncingPoller.start()
            openSyncAlertsModal.engage()
          (err) ->
            $log.error 'Unable to sync apps', err
            scope.syncingApps = false
        )

    template: $templateCache.get('dashboard-settings/sync-apps.tmpl.html'),
  }
)
