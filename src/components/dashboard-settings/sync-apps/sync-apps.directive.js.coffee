module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, $filter, $modal, $document, ImpacMainSvc, ImpacRoutes, ImpacWidgetsSvc, ImpacTheming, poller, $timeout, $sce) ->
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
      scope.realtimeSyncing = false
      syncAppsThemingConfig = ImpacTheming.get().dhbSettings.syncApps

      #====================================
      # Local methods
      #====================================
      # Returns the formatted timezone offset for date display purpose
      processAppInstancesSync = (responseData) ->
        scope.isSyncing = responseData.is_syncing
        scope.connectors = angular.copy(responseData.connectors) || []

        if scope.connectors.length
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

          determineSyncStatus()

        # No connector: data is synced in realtime, let's display the current time as "last sync"
        else
          scope.realtimeSyncing = true
          determineSyncStatus(scope.realtimeSyncing)

        unless scope.isSyncing || scope.connectors.length < 1
          # If the last successful connector retrieved is the same as the previous one, that means that we retrieved the result of the previous sync.
          # This is possible if the sync asked has just been enqueued and is not running yet.
          # In this case, we keep polling until we receive another connector ('RUNNING', then 'SUCCESS' with different date)
          unless (_.isEqual(scope.previousConnector, scope.connectors[0]) && scope.connectors[0].status == 'SUCCESS')
            scope.previousConnector = angular.copy(scope.connectors[0])
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
          scope.triggerSyncAlertsModal()

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

      # Builds the sync status to be displayed on the dashboard settings panel.
      determineSyncStatus = (force=false)->
        descriptor = syncAppsThemingConfig.productDescriptor
        if _.every(scope.connectors, {'status': 'SUCCESS'}) || force
          scope.syncStatus = "#{descriptor} is synced!"
        else if _.some(scope.connectors, 'last_sync_date')
          scope.syncStatus = "#{descriptor} is partially synced."
        else
          scope.syncStatus = "#{descriptor} is not synced."

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

      scope.formatStatus = (connector, modalDisplay=false) ->
        return unless connector
        name = connector.name
        status = ""

        if connector.last_sync_date
          date = $filter('date')(connector.last_sync_date, "h:mma, yyyy-MM-dd", getOffset())

          switch connector.status
            when 'SUCCESS'
              status = if modalDisplay then "Synced at #{date}" else "is synced - #{date}"
            when 'FAILED'
              status = if modalDisplay then "Previous sync #{date}" else "is not synced - previous sync #{date}"
            when 'DISCONNECTED'
              status = if modalDisplay then "Previous sync #{date}" else "is not connected - previous sync #{date}"
            # "RUNNING" case should imply isSyncing==true...

        else
          switch connector.status
            when 'FAILED'
              status = if modalDisplay then "Sync failed" else "is not synced - sync failed"
            when 'NOT SYNCED'
              status = if modalDisplay then "Never synced" else "is not synced - never synced"
            when 'DISCONNECTED'
              status = if modalDisplay then "Not connected" else "is not synced - not connected"
            # Any other case would be buggy...

        status = if modalDisplay then "#{status}" else "<strong>#{name}</strong> #{status}"
        status = $sce.trustAsHtml(status) unless _.isEmpty(status) || _.isEmpty(name)
        return status

      scope.triggerSyncAlertsModal = ->
        modalInstance = $modal.open({
          animation: true
          size: 'md'
          templateUrl: 'alerts.tmpl.html'
          appendTo: angular.element('impac-dashboard')
          controller: ($scope, connectors, methods) ->
            $scope.failedConnectors = connectors.failed
            $scope.disconnectedConnectors = connectors.disconnected
            $scope.successfulConnectors = connectors.successful
            $scope.formatStatus = methods.formatStatus
            $scope.expandListItemOnClick = (e) ->
              list = $document.find('#sync-apps-modal .modal-list')
              listItem = angular.element(e.target)
              # Showing only one listItem message at a time.
              list.find('.message').addClass('ng-hide')
              listItem.find('.message').removeClass('ng-hide')
              # Calculates the top offset of the listItem relative to the list.
              list.animate({ scrollTop: listItem.offset().top - list.offset().top }, 500)
              return
            $scope.ok = ->
              modalInstance.close()
          resolve:
            connectors: ->
              {disconnected: scope.disconnectedConnectors, failed: scope.failedConnectors, successful: scope.successfulConnectors}
            methods: ->
              {formatStatus: scope.formatStatus}
        })

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
