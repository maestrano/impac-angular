module = angular.module('impac.components.dashboard', [])

module.controller('ImpacDashboardCtrl', ($scope, $http, $q, $filter, $modal, $log, $timeout, $templateCache, DhbAnalyticsSvc, MsgBus, Utilities) ->

    #====================================
    # Initialization
    #====================================

    # todo::assets: implement new assets serving system
    # $scope.assetPath = assetPath
    # $scope.impacLogo = $scope.assetPath['impac/transparent-logo.png']

    $scope.widgetsList = [];

    $scope.isLoading = true

    $scope.starWizardModal = { value:false }
    MsgBus.publish('starWizardModal',$scope.starWizardModal)

    $scope.openStarWizard = ->
      $scope.starWizardModal.value = true

    DhbAnalyticsSvc.load().then () ->
      $scope.currentDhbId = DhbAnalyticsSvc.getId()
      $scope.refreshDashboards()
      $scope.isLoading = false

    # When a call to the service is necessary before updating the display
    # (for example when the dashboards list is modified)
    $scope.refreshDashboards = () ->
      $scope.dashboardsList = DhbAnalyticsSvc.getDashboards()
      # server sends back widgets list in dashboards, if there are no dashboards you cannot
      # add a widget.
      if $scope.dashboardsList.length and $scope.dashboardsList[0].widgets_templates?
        $scope.widgetsList = $scope.dashboardsList[0].widgets_templates

      $scope.currentDhb = _.where($scope.dashboardsList, {id: $scope.currentDhbId})[0]

      # Change current dhb if not for the select org
      unless $scope.currentDhb?
        $scope.currentDhb = $scope.dashboardsList[0]
        $scope.currentDhbId = ($scope.currentDhb? && $scope.currentDhb.id) || null

      if angular.isDefined($scope.currentDhb)
        $scope.currentDhb.organizationsNames = _.map($scope.currentDhb.data_sources, (org) ->
          org.label
        ).join(", ")

      $scope.setDisplay()


    # TODO? Move to service
    $scope.getCurrentDhbWidgetsNumber = ->
      if $scope.currentDhb && $scope.currentDhb.widgets
        return $scope.currentDhb.widgets.length
      else
        return 0

    # TODO? Move to service
    # Allows to refresh the display when a widget is deleted
    $scope.$watch $scope.getCurrentDhbWidgetsNumber, (result) ->
      $scope.setDisplay()

    # When there is no need to call the service again before updating the display
    # (for example, when widgets are modified)
    $scope.setDisplay = () ->
      aDashboardExists = $scope.currentDhbId?
      severalDashboardsExist = aDashboardExists && $scope.dashboardsList.length > 1
      if (aDashboardExists)
        aWidgetExists = $scope.currentDhb.widgets.length > 0
      else
        aWidgetExists = false

      if aDashboardExists && !aWidgetExists
        # add a timer to make sure the dom is loaded before the collapse directive is called
        $timeout (-> $scope.showWidgetSelector = true), 300
      else if !aDashboardExists
        $scope.showWidgetSelector = false

      # Permissions and 'show helpers'
      # dashboard name
      $scope.showDashboardsList = false
      $scope.showChangeDhbName = false
      # buttons
      $scope.showCreateDhb = true
      $scope.showDeleteDhb = aDashboardExists
      $scope.showCreateWidget = aDashboardExists
      # messages
      $scope.showChooseDhbMsg = !aDashboardExists
      $scope.showNoWidgetsMsg = aDashboardExists && !aWidgetExists
      #widgets
      $scope.canManageWidgets = true


    # Used by the dashboard selector (top of the page)
    $scope.selectDashboard = (dhbId) ->
      $scope.currentDhbId = dhbId
      $scope.refreshDashboards()

    $scope.toogleShowDashboardsList = ->
      return if $scope.showChangeDhbName

      if ($scope.dashboardsList.length > 1 || $scope.showCreateDhb)
        $scope.showDashboardsList = !$scope.showDashboardsList
      else
        $scope.showDashboardsList = false

    $scope.toogleShowChangeDhbName = (dhb) ->
      tmpDhbCpy = angular.copy(dhb)
      $scope.dashboardToChange = {}
      $scope.dashboardToChange.id = tmpDhbCpy.id
      $scope.dashboardToChange.name = tmpDhbCpy.full_name
      $scope.showChangeDhbName = !$scope.showChangeDhbName
      $timeout ->
        elem = $('#changeDhbNameInput')
        elem.select()
        elem.focus()
      ,100

    $scope.checkChangeDhbNameAndConfirm = (event) ->
      $scope.updateDhbName() if event.keyCode == 13
      $scope.showChangeDhbName = false if event.keyCode == 27

    $scope.updateDhbName = ->
      return if !$scope.dashboardToChange? || _.isEmpty($scope.dashboardToChange.name)
      DhbAnalyticsSvc.dashboards.update($scope.dashboardToChange.id, {name: $scope.dashboardToChange.name})
      _.find($scope.dashboardsList, (dhb) ->
        dhb.id == $scope.dashboardToChange.id
      ).full_name = $scope.dashboardToChange.name
      $scope.showChangeDhbName = false


    #====================================
    # Dashboard management - widget selector
    #====================================

    $scope.selectedCategory = 'accounts'
    $scope.isCategorySelected = (aCatName) ->
      if $scope.selectedCategory? && aCatName?
        return $scope.selectedCategory == aCatName
      else
        return false

    $scope.getSelectedCategoryName = ->
      if $scope.selectedCategory?
        switch $scope.selectedCategory
          when 'accounts'
            return 'Accounting'
          when 'invoices'
            return 'Invoicing'
          when 'hr'
            return 'HR / Payroll'
          when 'sales'
            return 'Sales'
          else
            return false
      else
        return false

    $scope.getSelectedCategoryTop = ->
      if $scope.selectedCategory?
        switch $scope.selectedCategory
          when 'accounts'
            return {top: '33px'}
          when 'invoices'
            return {top: '64px'}
          when 'hr'
            return {top: '95px'}
          when 'sales'
            return {top: '126px'}
          else
            return {top: '9999999px'}
      else
        return false

    $scope.getWidgetsForSelectedCategory = ->
      if $scope.selectedCategory? && $scope.widgetsList?
        return _.select $scope.widgetsList, (aWidgetTemplate) ->
          aWidgetTemplate.path.split('/')[0] == $scope.selectedCategory
      else
        return []

    $scope.addWidget = (widgetPath, widgetMetadata=null) ->
      params = {widget_category: widgetPath}
      if widgetMetadata?
        angular.extend(params, {metadata: widgetMetadata})
      angular.element('#widget-selector').css('cursor', 'progress')
      angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'progress')
      DhbAnalyticsSvc.widgets.create($scope.currentDhbId,params).then(
        () ->
          $scope.errors = ''
          angular.element('#widget-selector').css('cursor', 'auto')
          angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer')
          angular.element('#widget-selector .badge.confirmation').fadeTo(250,1)
          $timeout ->
            angular.element('#widget-selector .badge.confirmation').fadeTo(700,0)
          ,4000
        , (errors) ->
          $scope.errors = Utilities.processRailsError(errors)
          angular.element('#widget-selector').css('cursor', 'auto')
          angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer')
      ).finally( ->
        $scope.setDisplay()
      )


    #====================================
    # Dashboard management - Modals
    #====================================

    # Would it be possible to manage modals in a separate module ?
    # -> Check maestrano-modal (modal-svc) for further update
    $scope.modal = {}
    $scope.modal.createDashboard = modalCreateDashboard = $scope.$new(true)
    $scope.modal.deleteDashboard = modalDeleteDashboard = $scope.$new(true)
    $scope.modal.widgetSuggestion = modalWidgetSuggestion = $scope.$new(true)


    # Modal Create Dashboard
    modalCreateDashboard.config = {
      action: 'create',
      instance: {
        backdrop: 'static',
        template: $templateCache.get('dashboard/create.modal.html'),
        size: 'md',
        windowClass: 'inverse connec-analytics-modal',
        scope: modalCreateDashboard
      }
    }

    modalCreateDashboard.open = ->
      self = modalCreateDashboard
      self.model = { name: null }
      self.organizations = angular.copy($scope.user.organizations)
      # todo::linking: replace DhbOrganizationSvc calls with impacLinking service
      self.currentOrganization = _.findWhere(self.organizations,{id: DhbOrganizationSvc.getId()})
      self.selectMode('single')
      # self.loadingGif = $scope.assetPath['loader-darkblue-bg.gif']
      self.$instance = $modal.open(self.config.instance)
      self.isLoading = false
      self.multiOrganizationReporting = $scope.user.multi_organization_reporting

    modalCreateDashboard.close = ->
      modalCreateDashboard.$instance.close()

    modalCreateDashboard.proceed = ->
      self = modalCreateDashboard
      self.isLoading = true
      dashboard = { name: self.model.name }

      # Add organizations if multi company dashboard
      if self.mode == 'multi'
        organizations = _.select(self.organizations, (o) -> o.$selected )
      else
        organizations = [ { id: DhbOrganizationSvc.getId() } ]

      if organizations.length > 0
        dashboard.organization_ids = _.pluck(organizations, 'id')

      DhbAnalyticsSvc.dashboards.create(dashboard).then(
        (dashboard) ->
          self.errors = ''
          $scope.currentDhbId = dashboard.id
          self.close()
        , (errors) ->
          self.errors = Utilities.processRailsError(errors)
      ).finally(-> $scope.refreshDashboards())

    modalCreateDashboard.proceedDisabled = ->
      self = modalCreateDashboard
      selectedCompanies = _.select(self.organizations, (o) -> o.$selected)

      # Check that dashboard has a name
      additional_condition = !self.model.name || self.model.name == ''

      # Check that some companies have been selected
      additional_condition ||= selectedCompanies.length == 0

      # Check that user can access the analytics data for this company
      additional_condition ||= _.select(selectedCompanies, (o) -> self.canAccessAnalyticsData(o)).length == 0

      return self.isLoading || additional_condition

    modalCreateDashboard.btnBlassFor = (mode) ->
      self = modalCreateDashboard
      if mode == self.mode
        "btn btn-sm btn-warning active"
      else
        "btn btn-sm btn-default"

    modalCreateDashboard.selectMode = (mode) ->
      self = modalCreateDashboard
      _.each(self.organizations, (o) -> o.$selected = false)
      self.currentOrganization.$selected = (mode == 'single')
      self.mode = mode

    modalCreateDashboard.isSelectOrganizationShown = ->
      modalCreateDashboard.mode == 'multi'

    modalCreateDashboard.isCurrentOrganizationShown = ->
      modalCreateDashboard.mode == 'single'

    modalCreateDashboard.canAccessAnalyticsForCurrentOrganization = ->
      self = modalCreateDashboard
      self.canAccessAnalyticsData(self.currentOrganization)

    modalCreateDashboard.isMultiCompanyAvailable = ->
      modalCreateDashboard.organizations.length > 1 && modalCreateDashboard.multiOrganizationReporting

    modalCreateDashboard.canAccessAnalyticsData = (organization) ->
      organization.current_user_role && (
        organization.current_user_role == "Super Admin" ||
        organization.current_user_role == "Admin"
      )

    # Modal Delete Dashboard
    modalDeleteDashboard.config = {
      action: 'delete',
      instance: {
        backdrop: 'static',
        template: $templateCache.get('dashboard/delete.modal.html'),
        size: 'md',
        windowClass: 'inverse',
        scope: modalDeleteDashboard
      }
    }

    modalDeleteDashboard.open = ->
      self = modalDeleteDashboard
      # self.loadingGif = $scope.assetPath['loader-darkblue-bg.gif']
      self.$instance = $modal.open(self.config.instance)
      self.isLoading = false

    modalDeleteDashboard.close = ->
      modalDeleteDashboard.$instance.close()

    modalDeleteDashboard.proceed = ->
      self = modalDeleteDashboard
      self.isLoading = true

      DhbAnalyticsSvc.dashboards.delete($scope.currentDhbId).then(
        () ->
          self.errors = ''
          $scope.currentDhbId = DhbAnalyticsSvc.getId()
          self.close()
        , (errors) ->
          self.errors = Utilities.processRailsError(errors)
      ).finally(-> $scope.refreshDashboards())


    # Modal Widget Suggestion
    modalWidgetSuggestion.widgetDetails = {}
    modalWidgetSuggestion.config = {
      instance: {
        backdrop: 'static',
        template: $templateCache.get('dashboard/widget-suggestion.modal.html'),
        size: 'md',
        windowClass: 'inverse impac-widget-suggestion',
        scope: modalWidgetSuggestion
      }
    }

    modalWidgetSuggestion.open = ->
      self = modalWidgetSuggestion
      self.userName = UserSvc.document.user.name
      # self.loadingGif = $scope.assetPath['loader-darkblue-bg.gif']
      self.$instance = $modal.open(self.config.instance)
      self.isLoading = false

    modalWidgetSuggestion.close = ->
      modalWidgetSuggestion.$instance.close()

    modalWidgetSuggestion.proceed = ->
      self = modalWidgetSuggestion
      self.isLoading = true

      data = {
        widget_name: self.widgetDetails.name,
        widget_category: self.widgetDetails.category,
        widget_description: self.widgetDetails.description
      }

      $http.post('/js_api/v1/mailers',{template: 'widget_suggestion', opts: data})

      # Thank you, user...
      $timeout ->
        self.close()
        self.widgetDetails = {}
        self.isLoading = false
      ,3000


    #====================================
    # Drag & Drop management
    #====================================

    $scope.sortableOptions = {
      # When the widget is dropped
      stop: saveDashboard = ->
        data = { widgets_order: _.pluck($scope.currentDhb.widgets,'id') }
        DhbAnalyticsSvc.dashboards.update($scope.currentDhbId,data,false)

      # When the widget is starting to be dragged
      ,start: updatePlaceHolderSize = (e, widget) ->
        # width-1 to avoid return to line (succession of float left divs...)
        widget.placeholder.css("width",widget.item.width() - 1)
        widget.placeholder.css("height",widget.item.height())

        # # Determining height of the placeholder
        # maxHeight=0
        # _.each e.currentTarget.children, (w) ->
        #   if (w.className != 'placeHolderBox')
        #     height = w.clientHeight
        #     if height > maxHeight
        #       maxHeight = height
        # cssHeight = ''
        # cssHeight = cssHeight.concat(maxHeight)
        # cssHeight = cssHeight.concat('px')
        # _.each e.currentTarget.children, (w) ->
        #   w.style.height = cssHeight
        #   w.style.clear = 'none'


      # Options
      ,cursorAt: {left: 100, top: 20}
      ,opacity: 0.5
      ,delay: 150
      ,tolerance: 'pointer'
      ,placeholder: "placeHolderBox"
      ,cursor: "move"
      ,revert: 250
      }

)

module.directive('impacDashboard', ($templateCache) ->
  return {
      restrict: 'EA',
      scope: {
        dashboards: '='
      },
      template: $templateCache.get('dashboard/dashboard.tmpl.html'),
      controller: 'ImpacDashboardCtrl'
    }
)
