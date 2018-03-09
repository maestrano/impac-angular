module = angular.module('impac.components.dashboard-settings.sync-apps',[])

module.directive('dashboardSettingSyncApps', ($templateCache, $log, $http, $filter, $uibModal, $document, $timeout, ImpacMainSvc, ImpacRoutes, ImpacWidgetsSvc, ImpacKpisSvc, ImpacTheming, poller, $sce) ->
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
      scope.hasConnector = false
      scope.hasError = false
      scope.modalOpened = false
      # unused?
      # syncAppsThemingConfig = ImpacTheming.get().dhbSettings.syncApps


      #====================================
      # Local methods
      #====================================
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

      # Format date applying the timezone offset
      formatDate = (connector) ->
        return unless connector.last_sync_date
        connector.formatted_date = $filter('date')(connector.last_sync_date, "h:mma, yyyy-MM-dd", getOffset())

      # Refreshes the widgets and display the modal if needed
      refreshDashboard = ->
        # Reloads all the widgets contents
        ImpacWidgetsSvc.refreshAll(true)
        # Reloads all the kpis contents
        ImpacKpisSvc.refreshAll(true)
        # Opens the modal if errors are present
        scope.triggerSyncAlertsModal() if _.any(scope.connectors, (c) -> isError(c))

      # Returns the formatted timezone offset for date display purpose
      processAppInstancesSync = (responseData) ->
        scope.connectors = angular.copy(responseData.connectors) || []
        scope.hasRunningCube = responseData.has_running_cube || false

        wasSyncing = scope.isSyncing
        scope.isSyncing = scope.connectors && scope.connectors.length > 0 && _.any(scope.connectors, (c) ->
          c.status == "PENDING" || c.status == "RUNNING"
        )
        scope.hasError = scope.connectors && scope.connectors.length > 0 && _.any(scope.connectors, (c) -> isError(c))

        scope.hasConnectors = scope.connectors.length > 0
        scope.hasApps = scope.hasConnectors || scope.hasRunningCube

        for connector in scope.connectors
          formatDate(connector)

        refreshDashboard() if wasSyncing && !scope.isSyncing

      isError = (connector) ->
        switch connector.status
          when "ERROR" then true
          when "FAILED" then true
          when "DISCONNECTED" then true
          when "UNKNOWN" then true
          else false

      #====================================
      # Scope methods
      #====================================
      # Runs on syncronize button click
      scope.synchronize = ->
        return if scope.isSyncing
        scope.isSyncing = true
        $http.post(ImpacRoutes.organizations.appInstancesSync(scope.orgUID)).then( (resp) -> processAppInstancesSync(resp.data) )

      scope.triggerSyncAlertsModal = ->
        unless scope.modalOpened || _.isEmpty(scope.connectors)
          modalInstance = $uibModal.open({
            animation: true
            size: 'md'
            templateUrl: 'alerts.tmpl.html'
            appendTo: angular.element('impac-dashboard')
            openedClass: 'sync-modal-opened' # prevent use of default
            controller: ($scope, connectors) ->
              $scope.connectors = connectors
              $scope.expandListItemOnClick = (connector) ->
                return unless connector.message
                connector.showMessage = !!!connector.showMessage
              $scope.ok = ->
                modalInstance.close()
            resolve:
              connectors: -> scope.connectors
          })

          modalInstance.opened.then(-> scope.modalOpened = true)
          modalInstance.result.finally(-> scope.modalOpened = false)


      #====================================
      # Directive Load and Destroy
      #====================================
      # Initialise a poller with the latest current org.
      initPoller = ->
        destroyPoller()
        ImpacMainSvc.load().then(
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
            scope.syncingPoller = poller.get(ImpacRoutes.organizations.appInstancesSync(scope.orgUID), {delay: 10000, smart: true})
            scope.syncingPoller.promise.then(null, null, (response) -> processAppInstancesSync(response.data) )
        )
      # Stops & removes current poller instance.
      destroyPoller = ->
        scope.syncingPoller.stop() && scope.syncingPoller.remove() if scope.syncingPoller


      initPoller()

      # Re-init poller on organization change.
      ImpacMainSvc.organizationChanged().then(null, null, (organization)->
        initPoller() if organization
      )

      # Removes the poller when the directive is destroyed (eg: when we switch from the impac dashboard to another js route)
      scope.$on("$destroy", destroyPoller)
  }
)
