module = angular.module('impac.components.dashboard', [])

module.controller('ImpacDashboardCtrl', ($scope, $http, $q, $filter, $modal, $log, $timeout, $templateCache, DhbAnalyticsSvc, MsgBus, Utilities) ->

    #====================================
    # Initialization
    #====================================

    # Sets callbacks as methods within the analytics service for retrieving data
    # from the parent scop.
    # todo::clean-up: analytics-svc needs to be split out into smaller peices.
    DhbAnalyticsSvc.widgets.setGetOrganizations($scope.getOrganizationsCallback)
    DhbAnalyticsSvc.widgets.setGetSsoSession($scope.getUserSsoSessionCallback)

    # todo::assets: implement new assets serving system
    # $scope.assetPath = assetPath
    # $scope.impacLogo = $scope.assetPath['impac/transparent-logo.png']

    # todo: get this from dashboard object returned from backend or put in constant.
    $scope.widgetsList = JSON.parse("[{\"path\":\"accounts/balance\",\"name\":\"Account balance\",\"desc\":\"Display the current value of a given account\",\"icon\":\"university\",\"width\":3},{\"path\":\"accounts/comparison\",\"name\":\"Accounts comparison\",\"desc\":\"Bar chart presenting the comparison of different selected accounts\",\"icon\":\"bar-chart\",\"width\":6},{\"path\":\"accounts/expenses_revenue\",\"name\":\"Expenses / Revenue\",\"desc\":\"Pie chart representing the sum of your 'expense' accounts versus the sum of your 'revenue' accounts\",\"icon\":\"pie-chart\",\"width\":3},{\"path\":\"accounts/payable_receivable\",\"name\":\"Payable / Receivable\",\"desc\":\"Display the sum of your accounts of types 'payable' and 'receivable'\",\"icon\":\"university\",\"width\":3},{\"path\":\"accounts/assets_summary\",\"name\":\"Assets summary\",\"desc\":\"Pie chart representing your different 'asset' accounts values\",\"icon\":\"pie-chart\",\"width\":3},{\"path\":\"accounts/custom_calculation\",\"name\":\"Custom calculation\",\"desc\":\"Define a custom calculation involving different accounts, and display its value\",\"icon\":\"calculator\",\"width\":3},{\"path\":\"accounts/accounting_values/ebitda\",\"name\":\"EBITDA\",\"desc\":\"Display the EBITDA of your company or set of companies\",\"icon\":\"calculator\",\"width\":3},{\"path\":\"accounts/accounting_values/turnover\",\"name\":\"Overall turnover\",\"desc\":\"Display the overall turnover of your company or set of companies\",\"icon\":\"calculator\",\"width\":3},{\"path\":\"accounts/accounting_values/workforce_costs\",\"name\":\"Workforce costs\",\"desc\":\"Display the workforce costs for your company or set of companies\",\"icon\":\"calculator\",\"width\":3},{\"path\":\"accounts/accounting_values/payroll_taxes_account\",\"name\":\"Payroll taxes account\",\"desc\":\"Value of your Payroll Taxes account ans its evolution\",\"icon\":\"university\",\"width\":3},{\"path\":\"accounts/cash_summary\",\"name\":\"Cash summary\",\"desc\":\"Detailed summary of your cash flow per account\",\"icon\":\"line-chart\",\"width\":6},{\"path\":\"accounts/balance_sheet\",\"name\":\"Balance sheet\",\"desc\":\"Comparison between the current balance sheet and a previous one\",\"icon\":\"list-alt\",\"width\":6},{\"path\":\"accounts/profit_and_loss\",\"name\":\"Profit & Loss\",\"desc\":\"Detailed summary of your profit and loss per cateogry and account\",\"icon\":\"line-chart\",\"width\":6},{\"path\":\"invoices/list\",\"name\":\"Invoices list\",\"metadata\":{\"entity\":\"customers\",\"order_by\":\"name\"},\"desc\":\"Full list of all the invoices sent to your customers\",\"icon\":\"list-alt\",\"width\":6},{\"path\":\"invoices/list\",\"name\":\"Paid invoices\",\"metadata\":{\"entity\":\"customers\",\"order_by\":\"total_paid\"},\"desc\":\"Reduced list the invoices paid by your customers\",\"icon\":\"list-alt\",\"width\":3},{\"path\":\"invoices/list\",\"name\":\"Due invoices\",\"metadata\":{\"entity\":\"customers\",\"order_by\":\"total_due\"},\"desc\":\"Reduced list of the invoices unpaid by your customers\",\"icon\":\"list-alt\",\"width\":3},{\"path\":\"invoices/list\",\"name\":\"All invoices\",\"metadata\":{\"entity\":\"customers\",\"order_by\":\"total_invoiced\"},\"desc\":\"Reduced list of all the invoices sent to your customers\",\"icon\":\"list-alt\",\"width\":3},{\"path\":\"invoices/list\",\"name\":\"Purchase orders list\",\"metadata\":{\"entity\":\"suppliers\",\"order_by\":\"name\"},\"desc\":\"Full list of all the purchase orders received from your suppliers\",\"icon\":\"list-alt\",\"width\":6},{\"path\":\"invoices/list\",\"name\":\"Paid purchase orders\",\"metadata\":{\"entity\":\"suppliers\",\"order_by\":\"total_paid\"},\"desc\":\"Reduced list of the paid purchase orders received from your suppliers\",\"icon\":\"list-alt\",\"width\":3},{\"path\":\"invoices/list\",\"name\":\"Due purchase orders\",\"metadata\":{\"entity\":\"suppliers\",\"order_by\":\"total_due\"},\"desc\":\"Reduced list of the unpaid purchase orders received from your suppliers\",\"icon\":\"list-alt\",\"width\":3},{\"path\":\"invoices/list\",\"name\":\"All purchase orders\",\"metadata\":{\"entity\":\"suppliers\",\"order_by\":\"total_invoiced\"},\"desc\":\"Reduced list of all the purchase orders received from your suppliers\",\"icon\":\"list-alt\",\"width\":3},{\"path\":\"invoices/summary\",\"name\":\"Top-customers summary\",\"metadata\":{\"entity\":\"customers\",\"order_by\":\"total_invoiced\"},\"desc\":\"Filterable pie chart representing your top-invoiced customers\",\"icon\":\"pie-chart\",\"width\":6},{\"path\":\"invoices/aged_payables_receivables\",\"name\":\"Aged payables and receivables\",\"metadata\":null,\"desc\":\"Decomposition and comparison of your aged payables and receivables in a period of time\",\"icon\":\"line-chart\",\"width\":6},{\"path\":\"hr/workforce_summary\",\"name\":\"Workforce summary\",\"desc\":\"Representation of the total workforce as the sum of the salaries of all your employees\",\"icon\":\"pie-chart\",\"width\":6},{\"path\":\"hr/salaries_summary\",\"name\":\"Salaries summary\",\"desc\":\"Representation of the average salaries filtered by several criterias\",\"icon\":\"pie-chart\",\"width\":6},{\"path\":\"hr/employees_list\",\"name\":\"Employees list\",\"desc\":\"Detailed list of all the employees for the given companies\",\"icon\":\"list-alt\",\"width\":6},{\"path\":\"hr/employee_details\",\"name\":\"Employee details\",\"desc\":\"All the details corresponding to a selected employee\",\"icon\":\"list-alt\",\"width\":3},{\"path\":\"hr/payroll_taxes\",\"name\":\"Payroll taxes\",\"desc\":\"Sum of all the taxes paid upon all your workforce costs\",\"icon\":\"university\",\"width\":3},{\"path\":\"hr/superannuation_accruals\",\"name\":\"Superannuation balance\",\"desc\":\"Sum of all the superannuation expenses for a given employee over a period of time\",\"icon\":\"university\",\"width\":3},{\"path\":\"hr/leaves_balance\",\"name\":\"Leave balance\",\"desc\":\"Presentation of the leave accrued, used and balance for a given employee\",\"icon\":\"suitcase\",\"width\":3},{\"path\":\"hr/payroll_summary\",\"name\":\"Payroll summary\",\"desc\":\"Decomposition and comparison of your the payroll costs\",\"icon\":\"line-chart\",\"width\":6},{\"path\":\"hr/timesheets\",\"name\":\"Timesheets\",\"desc\":\"Display the timesheets of your employees\",\"icon\":\"list-alt\",\"width\":6},{\"path\":\"sales/summary\",\"name\":\"Sales summary\",\"desc\":\"Filterable pie chart representing your top-sold products\",\"icon\":\"pie-chart\",\"width\":6},{\"path\":\"sales/summary\",\"name\":\"Sales by location\",\"desc\":\"Filterable pie chart representing your top sales areas\",\"icon\":\"pie-chart\",\"width\":6,\"metadata\":{\"criteria\":\"location\"}},{\"path\":\"sales/summary\",\"name\":\"Sales by industry\",\"desc\":\"Filterable pie chart representing your top sales industry targets\",\"icon\":\"pie-chart\",\"width\":6,\"metadata\":{\"criteria\":\"industry\"}},{\"path\":\"sales/summary\",\"name\":\"Sales by customer\",\"desc\":\"Filterable pie chart representing your top customers\",\"icon\":\"pie-chart\",\"width\":6,\"metadata\":{\"criteria\":\"customer\"}},{\"path\":\"sales/list\",\"name\":\"Sales list\",\"desc\":\"Detailed list of all your products sales\",\"icon\":\"list-alt\",\"width\":6},{\"path\":\"sales/growth\",\"name\":\"Growth per product\",\"desc\":\"Line chart representing the sales growth for a given product\",\"icon\":\"line-chart\",\"width\":3},{\"path\":\"sales/segmented_turnover\",\"name\":\"Sales by price range\",\"desc\":\"Decomposition of your turnover per product average price\",\"icon\":\"bar-chart\",\"width\":6},{\"path\":\"sales/customer_details\",\"name\":\"Customer details\",\"desc\":\"All the details corresponding to a selected customer\",\"icon\":\"list-alt\",\"width\":3},{\"path\":\"sales/margin\",\"name\":\"Gross margin\",\"desc\":\"Sales gross margin, corresponding to the difference between value sold and value purchased\",\"icon\":\"line-chart\",\"width\":3},{\"path\":\"sales/aged\",\"name\":\"Aged sales\",\"desc\":\"History of your sales through a specified period of time\",\"icon\":\"line-chart\",\"width\":6},{\"path\":\"sales/comparison\",\"name\":\"Sales comparison\",\"desc\":\"Compare the evolution of your sales order by chosen criteria\",\"icon\":\"line-chart\",\"width\":6},{\"path\":\"sales/leads_list\",\"name\":\"Leads list\",\"desc\":\"Listing of your current leads\",\"icon\":\"list-alt\",\"width\":6},{\"path\":\"sales/number_of_leads\",\"name\":\"Number of leads\",\"desc\":\"The number of converted, lost, and total leads you had for the last period\",\"icon\":\"calculator\",\"width\":3},{\"path\":\"sales/cycle\",\"name\":\"Sales cycle\",\"desc\":\"Shows how much time (average) leads stay at a each status\",\"icon\":\"circle-o-notch\",\"width\":6},{\"path\":\"sales/leads_funnel\",\"name\":\"Leads funnel\",\"desc\":\"Sales funnel based on your leads status\",\"icon\":\"sort-amount-desc\",\"width\":6},{\"path\":\"sales/opportunities_funnel\",\"name\":\"Opportunities funnel\",\"desc\":\"Sales funnel based on your opportunities sales stage\",\"icon\":\"sort-amount-desc\",\"width\":6},{\"path\":\"sales/top_opportunities\",\"name\":\"Top opportunities\",\"desc\":\"List of your top opportunities, based on close probability and expected close date\",\"icon\":\"list-alt\",\"width\":6},{\"path\":\"sales/break_even\",\"name\":\"Break-even\",\"desc\":\"Amount of sales missing to break-even target, and estimated date at which the break-even will happen\",\"icon\":\"calculator\",\"width\":3},{\"path\":\"sales/forecast\",\"name\":\"Sales forecast\",\"desc\":\"Projection of you sales for the next 6 months, based on your current opportunities\",\"icon\":\"line-chart\",\"width\":6},{\"path\":\"sales/performance\",\"name\":\"Teams performance\",\"desc\":\"Comparison of the performance of your accounts managers and sales teams\",\"icon\":\"list-alt\",\"width\":6}]")


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
        template: $templateCache.get('modals/create.html'),
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
        template: $templateCache.get('modals/delete.html'),
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
        template: $templateCache.get('modals/widget-suggestion.html'),
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
        dashboards: '=',
        getOrganizationsCallback: '=',
        getUserSsoSessionCallback: '='
      },
      template: $templateCache.get('impac-dashboard.html'),
      controller: 'ImpacDashboardCtrl'
    }
)