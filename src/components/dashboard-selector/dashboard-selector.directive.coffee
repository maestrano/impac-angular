angular
.module('impac.components.dashboard-selector', [])
.directive('dashboardSelector', ($log, $compile, $templateCache, $http, $timeout, $modal, ImpacTheming, ImpacDashboardsSvc, ImpacMainSvc, ImpacUtilities) ->
  return {
    restrict: 'E'
    scope: {
      onCreateDashboard: '&'
      isWidgetSelectorShown: '&'
      onDisplayWidgetSelector: '&'
      onSelectDashboard: '&'
      onChangePdfMode: '&'
      onSavePdf: '&'
      onPrintPdf: '&'
      pdfMode: '=pdfMode'
    }
    controller: ($scope) ->

      # ============================================
      # Select dashboards
      # ============================================

      $scope.organizationsNames = ->
        _.pluck $scope.currentDhb.data_sources, 'label'
        .join ", "

      $scope.toggleShowDashboardsDropdown = ->
        return if $scope.showChangeDashboardNameBox

        if (ImpacDashboardsSvc.areThereSeveralDashboards() || $scope.showCreateDashboardButton)
          $scope.showDashboardsDropdown = !$scope.showDashboardsDropdown
        else
          $scope.showDashboardsDropdown = false

      # Use of timeouts for better fluidity (avoid freezing the display)
      $scope.selectDashboard = (dhbId) ->
        return if $scope.currentDhb.id == dhbId
        $scope.isLoading = true
        $scope.showDashboardsDropdown = false

        # make sure the dropdown disappears
        $timeout ->
          $scope.$apply ->
            ImpacDashboardsSvc.setCurrentDashboard(dhbId)
            $scope.onSelectDashboard()
            $scope.isLoading = false
        , 50


      # ============================================
      # Change dashboard name
      # ============================================

      $scope.toggleChangeDashboardNameBox = (dhb) ->
        tmpDhbCpy = angular.copy(dhb)
        $scope.dashboardToChange = {}
        $scope.dashboardToChange.id = tmpDhbCpy.id
        $scope.dashboardToChange.name = tmpDhbCpy.full_name
        $scope.showChangeDashboardNameBox = !$scope.showChangeDashboardNameBox
        $timeout ->
          elem = $('#changeDhbNameInput')
          elem.select()
          elem.focus()
        ,100

      $scope.hideChangeDashboardNameBox = ->
        $scope.showChangeDashboardNameBox = false

      $scope.checkAndUpdateDashboardName = (event) ->
        $scope.updateDashboardName() if event.keyCode == 13
        $scope.showChangeDashboardNameBox = false if event.keyCode == 27

      $scope.updateDashboardName = ->
        return if !$scope.dashboardToChange? || _.isEmpty($scope.dashboardToChange.name)
        ImpacDashboardsSvc.update($scope.dashboardToChange.id, {name: $scope.dashboardToChange.name}).then (success) ->
          $scope.showChangeDashboardNameBox = false


      # ============================================
      # Accessibility
      # ============================================

      $scope.toggleAccessibilityMode = ->
        $scope.accessibilityMode = !$scope.accessibilityMode
        angular.forEach $scope.currentDhb.widgets, (w) ->
          w.loadContent()


      # ============================================
      # Delete dashboard modal
      # ============================================

      $scope.deleteDashboardModal = $scope.$new()

      $scope.deleteDashboardModal.config = {
        backdrop: 'static',
        template: $templateCache.get('dashboard-selector/delete.modal.html'),
        size: 'md',
        windowClass: 'inverse',
        scope: $scope.deleteDashboardModal
      }

      $scope.deleteDashboardModal.open = ->
        self = $scope.deleteDashboardModal
        return if self.locked

        self.errors = ''
        self.isLoading = false
        self.instance = $modal.open(self.config)

        self.instance.rendered.then (onRender) ->
          self.locked = true
        self.instance.result.then (onClose) ->
          self.locked = false
        ,(onDismiss) ->
          self.locked = false

      $scope.deleteDashboardModal.proceed = ->
        self = $scope.deleteDashboardModal

        self.isLoading = true
        ImpacDashboardsSvc.delete($scope.currentDhb.id).then(
          () ->
            self.errors = ''
            self.instance.close()
          , (errors) ->
            self.errors = ImpacUtilities.processRailsError(errors)
            self.isLoading = false
        )


      return $scope


    link: (scope, element, attrs) ->
      # references to services
      # -------------------------------------
      scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
      scope.dashboardsList = ImpacDashboardsSvc.getDashboards()
      scope.isThereADashboard = ->
        ImpacDashboardsSvc.isThereADashboard()

      # display options / permissions
      # -------------------------------------
      options = ImpacTheming.get().dhbSelectorConfig
      scope.isAccessibilityEnabled = options.accessibilityEnabled
      scope.isAddWidgetEnabled = options.addWidgetEnabled
      scope.isAddDhbEnabled = options.addDhbEnabled
      scope.isDeleteDhbEnabled = options.deleteDhbEnabled

      # buttons / display
      # -------------------------------------
      scope.showCreateDashboardButton = true
      scope.showDashboardsDropdown = false
      scope.showChangeDashboardNameBox = false
      scope.accessibilityMode = false
      # scope.pdfMode = false

      if !!options.customTmplPath
        customUrl = options.customTmplPath
      else
        scope.selectorType = options.selectorType

      selectorTemplate = null

      setTemplate = (path) ->
        selectorTemplate = path

      switch scope.selectorType
        when 'dropdown' then setTemplate('dashboard-selector/dropdown.tmpl.html')
        when 'tabs' then setTemplate('dashboard-selector/bootstrap-tabs.tmpl.html')
        when 'pills' then setTemplate('dashboard-selector/bootstrap-tabs.tmpl.html')
        else setTemplate(customUrl)

      # gets custom template from local path, returns as string.
      getCustomTemplate = ->
        $http.get(selectorTemplate, {cache: $templateCache}).then(
          (tmplContent) ->
            if !tmplContent or !tmplContent.data or !tmplContent.data.length
              $log.warn 'dashboardSelector custom template: no content found'
            _compile(tmplContent.data)
          (err) ->
            $log.error 'Error retrieving custom template: ', err
        )

      # gets template string from templateCache
      getTemplate = ->
        _compile($templateCache.get(selectorTemplate))

      # compiles html string to element
      _compile = (htmlString) ->
        element.html(htmlString).show()
        $compile(element.contents())(scope)

      if customUrl then getCustomTemplate() else getTemplate()
  }
)
