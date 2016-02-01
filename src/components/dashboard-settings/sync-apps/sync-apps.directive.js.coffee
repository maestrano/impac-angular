module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, $filter, $modal, ImpacMainSvc, ImpacRoutes, ImpacWidgetsSvc, ImpacTheming, poller) ->
  return {
    restrict: 'A',
    scope: {
    },
    template: $templateCache.get('dashboard-settings/sync-apps.tmpl.html'),

    link: (scope, element, attrs) ->

      #====================================
      # Variables initialization
      #====================================
      scope.isSyncing = false
      scope.hasConnectors = false
      # Theming configuration giving the ability to show / hide the sync apps feature.
      scope.showComponent = ImpacTheming.get().syncAppsConfig.show


      #====================================
      # Local methods
      #====================================
      # Returns the formatted timezone offset for date display purpose
      processAppInstancesSync = (responseData) ->
        scope.isSyncing = responseData.is_syncing
        scope.hasConnectors = (responseData.connectors && responseData.connectors.length > 0)

        if scope.hasConnectors
          # The connector that will be displayed on front
          scope.lastConnector = responseData.connectors[0]
          # The other connectors that will be displayed in the popover
          scope.otherConnectors = _.slice(responseData.connectors, 1)
          
          # The connectors we will use for error management
          scope.failedConnectors = []
          scope.disconnectedConnectors = []
          for c in responseData.connectors
            if c.status == "FAILED"
              scope.failedConnectors.push angular.copy(c)
            else if c.status == "DISCONNECTED"
              scope.disconnectedConnectors.push angular.copy(c)

        # No connector: data is synced in realtime, let's display the current time as "last sync"
        else
          scope.lastConnector = 
            status: 'SUCCESS'
            last_sync_date: new Date()

        unless scope.isSyncing
          refreshDashboard()

      # Refreshes the widgets and display the modal if needed
      refreshDashboard = ->
        scope.syncingPoller.stop()
        # Avoid having the refresh triggered when the button has not been clicked
        return unless scope.isDashboardRefreshAuthorized
        # Reloads all the widgets contents
        ImpacWidgetsSvc.refreshAll()

        # Opens the modal if errors are present
        unless (_.isEmpty(scope.failedConnectors) && _.isEmpty(scope.disconnectedConnectors))
          modalInstance = $modal.open({
            animation: true
            size: 'md'
            templateUrl: 'alerts.tmpl.html'
            appendTo: angular.element('impac-dashboard')
            controller: ($scope, connectors) ->
              $scope.failedConnectors = connectors.failed
              $scope.disconnectedConnectors = connectors.disconnected
              $scope.ok = ->
                modalInstance.close()
            resolve:
              connectors: ->
                {disconnected: scope.disconnectedConnectors, failed: scope.failedConnectors}
          })

        # Blocks the dashboard refresh until next click on "synchronize"
        scope.isDashboardRefreshAuthorized = false

      getOffset = ->
        timezone = new Date().getTimezoneOffset()
        offsetArray = ['+','00','00']
        offsetArray[0] = '-' unless timezone < 0

        hours = "#{Math.abs(Math.floor(timezone/60))}"
        if hours.length < 2
          offsetArray[1] = "0" + hours
        else
          offsetArray[1] = hours

        minutes = "#{Math.abs(timezone%60)}"
        if minutes.length < 2
          offsetArray[2] = "0" + minutes
        else
          offsetArray[2] = minutes

        return offsetArray.join('')


      #====================================
      # Scope methods
      #====================================
      # Runs on syncronize button click
      scope.synchronize = ->
        return if scope.isSyncing
        scope.isSyncing = true
        scope.isDashboardRefreshAuthorized = true

        $http.post(ImpacRoutes.appInstancesSyncPath(scope.orgUID)).then(
          (success) ->
            processAppInstancesSync(success.data)
            scope.syncingPoller.start() if success.data.is_syncing
          (err) ->
            $log.error 'Unable to sync apps', err
            scope.isSyncing = false
        )

      scope.formatStatus = (connector) ->
        return unless connector
        name = connector.name
        status = ""

        if connector.last_sync_date
          date = $filter('date')(connector.last_sync_date, "yyyy-MM-dd 'at' h:mma", getOffset())
        
          switch connector.status
            when 'SUCCESS' then status = "Last sync: #{date}"
            when 'FAILED' then status = "Last sync failed: #{date}"
            when 'DISCONNECTED' then status = "Disconnected - previous sync was: #{date}"
            # "RUNNING" case should imply isSyncing==true...

        else
          switch connector.status
            when 'FAILED' then status = "Sync failed"
            when 'DISCONNECTED' then status = "Sync failed - Disconnected"
            when 'NOT SYNCED' then status = "Not synced yet"
            # Any other case would be buggy...

        status = "#{status} (#{name})" unless _.isEmpty(status) || _.isEmpty(name)
        return status


      #====================================
      # Directive Load and Destroy
      #====================================
      ImpacMainSvc.load(true).then(
        (config) ->
          scope.orgUID = config.currentOrganization.uid

          # Returns:
          # -----------------------------
          # data:
          #   connectors[]:
          #     name (String)
          #     status ('SUCCESS' | 'RUNNING' | 'FAILED' | 'DISCONNECTED')
          #     last_sync_date (DateTime)
          #   is_syncing (Bool)
          # -----------------------------
          scope.syncingPoller = poller.get(ImpacRoutes.appInstancesSyncPath(scope.orgUID), {delay: 5000, smart: true})
          scope.syncingPoller.promise.then(null, null, (response) -> processAppInstancesSync(response.data) )
      )

      # Removes the poller when the directive is destroyed (eg: when we switch from the impac dashboard to another js route)
      scope.$on("$destroy", -> (scope.syncingPoller.stop() && scope.syncingPoller.remove()) if scope.syncingPoller )
  }
)
