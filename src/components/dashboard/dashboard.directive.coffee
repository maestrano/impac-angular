module = angular.module('impac.components.dashboard', [])

module.controller('ImpacDashboardCtrl', ($scope, $http, $q, $filter, $modal, $log, $timeout, $templateCache, MsgBus, ImpacUtilities, ImpacAssets, ImpacTheming, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, ImpacDeveloper) ->

    #====================================
    # Initialization
    #====================================
    # $scope.isLoading = true

    # references to services (bound objects shared between all controllers)
    # -------------------------------------
    $scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
    $scope.widgetsList = ImpacDashboardsSvc.getWidgetsTemplates()

    # assets
    # -------------------------------------
    $scope.impacTitleLogo = ImpacAssets.get('impacTitleLogo')
    $scope.impacDashboardBackground = ImpacAssets.get('impacDashboardBackground')

    # dashboard heading & error messages
    # -------------------------------------
    $scope.showDhbHeading = ImpacTheming.get().dhbConfig.showDhbHeading
    $scope.dhbHeadingText = ImpacTheming.get().dhbConfig.dhbHeadingText
    $scope.dhbErrorsConfig = ImpacTheming.get().dhbErrorsConfig

    # Dashboard Settings
    # -------------------------------------
    $scope.dhbSettingsConfig = ImpacTheming.get().dhbSettings

    # kpis
    # -------------------------------------
    $scope.showKpisBar = ImpacTheming.get().dhbKpisConfig.enableKpis

    # messages
    # -------------------------------------
    $scope.showChooseDhbMsg = ->
      !ImpacDashboardsSvc.isThereADashboard()
    $scope.showNoWidgetsMsg = ->
      ImpacDashboardsSvc.isCurrentDashboardEmpty() && ImpacTheming.get().showNoWidgetMsg

    # star
    # -------------------------------------
    $scope.starWizardModal = { value:false }
    MsgBus.publish('starWizardModal',$scope.starWizardModal)
    $scope.openStarWizard = ->
      $scope.starWizardModal.value = true

    # Sub menu (alerts)
    # -------------------------------------
    $scope.marketplaceMyobLink = ImpacTheming.get().dhbSubMenuConfig.marketplaceMyobLink
    $scope.showSubMenu = false
    $scope.displaySubMenu = ->
      $scope.showSubMenu = true
    $scope.hideSubMenu = ->
      $scope.showSubMenu = false

    $scope.myobMessageConfig = ImpacTheming.get().dhbSubMenuConfig.myobMessage

    # load dashboards with their widgets
    # -------------------------------------
    # 'true' forces the reload: will cause the service to update the organization id and other core data that Impac! needs
    # NB: in Maestrano. we don't need to call ImpacDashboardsSvc.load(true) 'from the outside', because the view will
    # reload the <impac-dashboards> on organization change.
    # In other apps, calling this method should be enough to force a complete reload on Impac! contents
    $scope.isLoading = true
    $scope.failedDashboardLoad = false
    ImpacDashboardsSvc.load(true).then(
      (success) ->
        $scope.activateTimer()
        $scope.hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only
      (error) ->
        # on dashboard failed first load, user should not be able to access dashboard controls.
        $scope.failedDashboardLoad = true
        $scope.isLoading=false
    )

    $scope.activateTimer = ->
      $scope.isLoading ||= true
      # The dashboard will load 100ms per widget before being displayed
      w = $scope.currentDhb.widgets
      if w? then timer = Math.max(100*w.length, 500) else timer = 500
      # The timer is only 500ms: to let the time for the dashboard to be loaded
      # timer = 500
      $timeout ->
        $scope.isLoading=false
      ,timer


    # ============================================
    # Create dashboard modal
    # ============================================

    $scope.createDashboardModal = $scope.$new()

    $scope.createDashboardModal.config = {
      backdrop: 'static'
      template: $templateCache.get('dashboard/create.modal.html')
      size: 'md'
      windowClass: 'inverse'
      scope: $scope.createDashboardModal
    }

    $scope.createDashboardModal.open = ->
      self = $scope.createDashboardModal
      return if self.locked

      self.model = { name: '' }
      self.errors = ''
      self.isLoading = false
      self.instance = $modal.open(self.config)

      self.instance.rendered.then (onRender) ->
        self.locked = true
      self.instance.result.then (onClose) ->
        self.locked = false
      ,(onDismiss) ->
        self.locked = false

      ImpacMainSvc.loadOrganizations().then (config) ->
        self.organizations = config.organizations
        self.currentOrganization = config.currentOrganization
        self.selectMode('single')

    $scope.createDashboardModal.proceed = ->
      self = $scope.createDashboardModal
      self.isLoading = true
      dashboard = { name: self.model.name }

      # Add organizations if multi company dashboard
      organizations = []
      if self.mode == 'multi'
        organizations = _.select(self.organizations, (o) -> o.$selected )
      else
        organizations = [ { id: ImpacMainSvc.config.currentOrganization.id } ]

      if organizations.length > 0
        dashboard.organization_ids = _.pluck(organizations, 'id')

      return ImpacDashboardsSvc.create(dashboard).then(
        (dashboard) ->
          self.errors = ''
          self.instance.close()
        , (errors) ->
          self.isLoading = false
          self.errors = ImpacUtilities.processRailsError(errors)
      )

    $scope.createDashboardModal.isProceedDisabled = ->
      self = $scope.createDashboardModal
      selectedCompanies = _.select(self.organizations, (o) -> o.$selected)

      # Check that dashboard has a name
      additional_condition = _.isEmpty self.model.name

      # Check that some companies have been selected
      additional_condition ||= selectedCompanies.length == 0

      # Check that user can access the analytics data for this company
      additional_condition ||= _.select(selectedCompanies, (o) -> self.canAccessAnalyticsData(o)).length == 0

      return self.isLoading || additional_condition

    $scope.createDashboardModal.btnBlassFor = (mode) ->
      self = $scope.createDashboardModal
      if mode == self.mode
        "btn btn-sm btn-warning active"
      else
        "btn btn-sm btn-default"

    $scope.createDashboardModal.selectMode = (mode) ->
      self = $scope.createDashboardModal
      _.each(self.organizations, (o) -> o.$selected = false)
      self.currentOrganization.$selected = (mode == 'single')
      self.mode = mode

    $scope.createDashboardModal.isSelectOrganizationShown = ->
      $scope.createDashboardModal.mode == 'multi'

    $scope.createDashboardModal.isCurrentOrganizationShown = ->
      $scope.createDashboardModal.mode == 'single'

    $scope.createDashboardModal.canAccessAnalyticsForCurrentOrganization = ->
      self = $scope.createDashboardModal
      self.canAccessAnalyticsData(self.currentOrganization)

    $scope.createDashboardModal.isMultiCompanyAvailable = ->
      # TODO: re-enable somewhere
      $scope.createDashboardModal.organizations.length > 1 && $scope.createDashboardModal.multiOrganizationReporting

    $scope.createDashboardModal.canAccessAnalyticsData = (organization) ->
      organization.current_user_role && (
        organization.current_user_role == "Super Admin" ||
        organization.current_user_role == "Admin"
      )


    #====================================
    # Widgets selector
    #====================================
    # TODO: put in separate directive

    $scope.customWidgetSelector = ImpacTheming.get().widgetSelectorConfig
    $scope.forceShowWidgetSelector = false # just to initialize / will be overriden at first load anyway
    $scope.showCloseWidgetSelectorButton = ->
      !ImpacDashboardsSvc.isCurrentDashboardEmpty()

    $scope.displayWidgetSelector = (value=true) ->
      $scope.forceShowWidgetSelector = value

    $scope.showWidgetSelector = ->
      $scope.forceShowWidgetSelector || (ImpacDashboardsSvc.isCurrentDashboardEmpty() && !$scope.customWidgetSelector.path)

    # Custom widgets selector
    # --------------------------
    # Add Chart Tile: optional feature for triggering widget selector, with configurability to
    #                 modify onClick behaviour.
    $scope.isAddChartEnabled = ImpacTheming.get().addChartTile.show
    $scope.addChartTileOnClick = ->
      triggers = ImpacTheming.get().addChartTile.onClickOptions.triggers
      _.forEach(triggers, (trigger) ->

        switch trigger.type
          when 'objectProperty'
            $scope[trigger.target][trigger.property] = trigger.value

        # NOTE: These configuration options are designed to be extended on a case-by-case basis.
        #       For example, a callback trigger.type, or a re-define function inside this ctrl,
        #       with a function from external app.
      )

    $scope.selectedCategory = 'accounts'
    $scope.isCategorySelected = (aCatName) ->
      if $scope.selectedCategory? && aCatName?
        return $scope.selectedCategory == aCatName
      else
        return false

    $scope.selectCategory = (aCatName) ->
      $scope.selectedCategory = aCatName

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
          if aWidgetTemplate.metadata && aWidgetTemplate.metadata.template
            widgetCategory = aWidgetTemplate.metadata.template.split('/')[0]
          else
            widgetCategory = aWidgetTemplate.path.split('/')[0]
          widgetCategory == $scope.selectedCategory
      else
        return []

    $scope.addWidget = (widgetPath, widgetMetadata=null) ->
      params = {widget_category: widgetPath}
      if widgetMetadata?
        angular.extend(params, {metadata: widgetMetadata})
      angular.element('#widget-selector').css('cursor', 'progress')
      angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'progress')
      ImpacWidgetsSvc.create(params).then(
        () ->
          $scope.errors = ''
          angular.element('#widget-selector').css('cursor', 'auto')
          angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer')
          angular.element('#widget-selector .badge.confirmation').fadeTo(250,1)
          $timeout ->
            angular.element('#widget-selector .badge.confirmation').fadeTo(700,0)
          ,4000
        , (errors) ->
          $scope.errors = ImpacUtilities.processRailsError(errors)
          angular.element('#widget-selector').css('cursor', 'auto')
          angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer')
      )


    #====================================
    # Dashboard Settings Panel
    #====================================

    # - in directives -


    #====================================
    # Widget suggestion modal
    #====================================

    $scope.widgetSuggestionModal = $scope.$new()

    # Modal Widget Suggestion
    $scope.widgetSuggestionModal.widgetDetails = {}
    $scope.widgetSuggestionModal.error = false
    $scope.widgetSuggestionModal.onSuccess = false

    $scope.widgetSuggestionModal.config = {
      backdrop: 'static',
      template: $templateCache.get('dashboard/widget-suggestion.modal.html'),
      size: 'md',
      windowClass: 'inverse impac-widget-suggestion',
      scope: $scope.widgetSuggestionModal,
      apiPath: ImpacRoutes.widgets.suggest()
    }

    $scope.widgetSuggestionModal.open = ->
      self = $scope.widgetSuggestionModal
      return if self.locked

      ImpacMainSvc.loadUserData().then((user) ->
        self.userName = user.name
      )
      self.instance = $modal.open(self.config)

      self.instance.rendered.then (onRender) ->
        self.locked = true
      self.instance.result.then (onClose) ->
        self.locked = false
      ,(onDismiss) ->
        self.locked = false

      self.isLoading = false

    $scope.widgetSuggestionModal.proceed = ->
      self = $scope.widgetSuggestionModal
      self.isLoading = true

      data = {
        widget_name: self.widgetDetails.name,
        widget_category: self.widgetDetails.category,
        widget_description: self.widgetDetails.description
      }

      if self.config.apiPath?
        $http.post(self.config.apiPath, {
          template: 'widget_suggestion',
          opts: data
        }).then( ->
          self.onSuccess = true
          # Thank you, user...
          $timeout ->
            self.instance.close()
            self.widgetDetails = {}
            self.isLoading = false
            self.onSuccess = false
          ,3000
        (err) ->
          self.isLoading = false
          self.error = true
          $log.error 'impac-angular ERROR: Unable to POST widget_suggestion mailer: ', err
        )


    #====================================
    # Drag & Drop management
    #====================================

    $scope.sortableOptions = {
      # When the widget is dropped
      stop: saveDashboard = ->
        data = { widgets_order: _.pluck($scope.currentDhb.widgets,'id') }
        ImpacDashboardsSvc.update($scope.currentDhb.id,data)

      # When the widget is starting to be dragged
      start: updatePlaceHolderSize = (e, widget) ->
        # width-1 to avoid return to line (succession of float left divs...)
        widget.placeholder.css("width",widget.item.width() - 1)
        widget.placeholder.css("height",widget.item.height())

      # Options
      cursorAt: {left: 100, top: 20}
      opacity: 0.5
      delay: 150
      tolerance: 'pointer'
      placeholder: "placeHolderBox"
      cursor: "move"
      revert: 250
      # items with the class 'unsortable', are infact, unsortable.
      cancel: ".unsortable,.editable-input"
      # only the top-line with title will provide the handle to drag/drop widgets
      handle: ".top-line"
    }

)

module.directive('impacDashboard', ($templateCache) ->
  return {
      restrict: 'EA',
      scope: {
        forceLoad: '=load'
      },
      template: $templateCache.get('dashboard/dashboard.tmpl.html'),
      controller: 'ImpacDashboardCtrl'
    }
)
