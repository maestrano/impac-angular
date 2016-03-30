module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, $filter, $modal, ImpacMainSvc, ImpacRoutes, ImpacWidgetsSvc, ImpacTheming, poller, $timeout) ->
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
          scope.successfulConnectors = []
          for c in responseData.connectors
            if c.status == "FAILED"
              scope.failedConnectors.push angular.copy(c)
            else if c.status == "DISCONNECTED"
              scope.disconnectedConnectors.push angular.copy(c)
            else if c.status == "SUCCESS"
              scope.successfulConnectors.push angular.copy(c)

        # No connector: data is synced in realtime, let's display the current time as "last sync"
        else
          scope.lastConnector =
            status: 'SUCCESS'
            last_sync_date: new Date()

        unless scope.isSyncing
          # If the last successful connector retrieved is the same as the previous one, that means that we retrieved the result of the previous sync.
          # This is possible if the sync asked has just been enqueued and is not running yet.
          # In this case, we keep polling until we receive another connector ('RUNNING', then 'SUCCESS' with different date)
          unless (_.isEqual(scope.previousConnector, scope.lastConnector) && scope.lastConnector.status == 'SUCCESS')
            scope.previousConnector = angular.copy(scope.lastConnector)
            refreshDashboard()
          else
            scope.isSyncing = true

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
              errorMessage = -1
              $scope.failedConnectors = connectors.failed
              $scope.disconnectedConnectors = connectors.disconnected
              $scope.successfulConnectors = connectors.successful
              $scope.selectErrorOnClick = (connector, index) ->
                return unless connector.message
                return errorMessage = -1 if index == errorMessage
                errorMessage = index
              $scope.isErrorSelected = (index) -> errorMessage == index
              $scope.ok = ->
                modalInstance.close()
            resolve:
              connectors: ->
                {disconnected: scope.disconnectedConnectors, failed: scope.failedConnectors, successful: scope.successfulConnectors}
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

        $http.post(ImpacRoutes.organizations.appInstancesSync(scope.orgUID)).then(
          (success) ->
            processAppInstancesSync(success.data)
            if success.data.is_syncing
              # Use timeout to make sure Connec! has enough time to create the ConnectoSync object
              $timeout ->
                scope.syncingPoller.start()
              , 5000
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
          scope.syncingPoller = poller.get(ImpacRoutes.organizations.appInstancesSync(scope.orgUID), {delay: 5000, smart: true})
          scope.syncingPoller.promise.then(null, null, (response) -> processAppInstancesSync(response.data) )
      )

      # Removes the poller when the directive is destroyed (eg: when we switch from the impac dashboard to another js route)
      scope.$on("$destroy", -> (scope.syncingPoller.stop() && scope.syncingPoller.remove()) if scope.syncingPoller )
  }
)
