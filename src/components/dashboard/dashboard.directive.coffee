module = angular.module('impac.components.dashboard', [])

module.controller('ImpacDashboardCtrl', ($scope, $http, $q, $filter, $uibModal, $log, $timeout, $templateCache, MsgBus, ImpacUtilities, ImpacAssets, ImpacTheming, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, $translate, ImpacDhbTemplatesSvc) ->

    #====================================
    # Initialization
    #====================================
    # $scope.isLoading = true

    # references to services (bound objects shared between all controllers)
    # -------------------------------------
    $scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
    $scope.widgetsTemplates = ImpacDashboardsSvc.getWidgetsTemplates()

    # assets
    # -------------------------------------
    $scope.impacTitleLogo = ImpacAssets.get('impacTitleLogo')
    $scope.impacDashboardBackground = ImpacAssets.get('impacDashboardBackground')

    # dashboard heading & error messages
    # -------------------------------------
    $scope.showDhbHeading = ImpacTheming.get().dhbConfig.showDhbHeading
    $scope.dhbHeadingText = ImpacTheming.get().dhbConfig.dhbHeadingText
    $scope.dhbErrorsConfig = ImpacTheming.get().dhbErrorsConfig
    $scope.dhbLabelName = ImpacTheming.getDhbLabelName()

    # Dashboard Settings
    # -------------------------------------
    $scope.dhbSettingsConfig = ImpacTheming.get().dhbSettings
    $scope.createFromTemplateEnabled = $scope.dhbSettingsConfig.createFromTemplateEnabled

    # kpis
    # -------------------------------------
    $scope.showKpisBar = ->
      ImpacDashboardsSvc.areKpisEnabled() && ImpacDashboardsSvc.isThereADashboard()

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

    # Load dashboards with their widgets
    # -------------------------------------
    # 'true' forces the reload: will cause the service to update the organization id and other core data that Impac! needs
    # NB: in Maestrano. we don't need to call ImpacDashboardsSvc.load(true) 'from the outside', because the view will
    # reload the <impac-dashboards> on organization change.
    # In other apps, calling this method should be enough to force a complete reload on Impac! contents
    $scope.isLoading = true
    $scope.failedDashboardLoad = false

    dhbLoadSuccess = (success) ->
      $scope.activateTimer()
      $scope.hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only

    dhbLoadError = (error) ->
      $log.error(error)
      # on dashboard failed first load, user should not be able to access dashboard controls.
      $scope.failedDashboardLoad = true
      $scope.isLoading = false

    ImpacDashboardsSvc.load(true).then(dhbLoadSuccess, dhbLoadError)

    # failed load reloader
    # -------------------------------------
    count = 0
    $scope.displaySecondMsg = false
    $scope.reloadDashboard = ->
      count++
      $scope.displaySecondMsg = true if count >= 3
      ImpacDashboardsSvc.reload(true).then(dhbLoadSuccess, dhbLoadError)


    # Loader spinner notify trigger
    # -------------------------------------
    ImpacDashboardsSvc.dhbLoader().then(null, null, (triggerLoad)->
      if triggerLoad then $scope.isLoading = true else $scope.activateTimer()
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
      windowClass: 'inverse dhb-create-modal'
      scope: $scope.createDashboardModal
    }

    $scope.createDashboardModal.open = ->
      self = $scope.createDashboardModal
      return if self.locked

      self.model = { name: '' }
      self.errors = ''
      self.isLoading = false
      $scope.createDashboardModal.isTemplate = false
      self.dhbLabelName = ImpacTheming.getDhbLabelName()
      self.instance = $uibModal.open(self.config)

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
      return unless self.model.name
      self.isLoading = true
      dashboard = self.model

      # Add organizations if multi company dashboard
      organizations = []
      if self.mode == 'multi'
        organizations = _.select(self.organizations, (o) -> o.$selected )
      else
        organizations = [ { id: ImpacMainSvc.config.currentOrganization.id } ]

      dashboard.organization_ids = _.pluck(organizations, 'id')
      dashboard.metadata = _.omit(dashboard.metadata, ['organization_ids'])

      promise = if dashboard.id
        ImpacDashboardsSvc.copy(dashboard)
      else
        ImpacDashboardsSvc.create(dashboard)

      promise.then(
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
      $scope.createDashboardModal.organizations.length > 1 && ImpacTheming.get().dhbConfig.multiCompany

    $scope.createDashboardModal.canAccessAnalyticsData = (organization) ->
      organization.current_user_role && (
        organization.current_user_role == "Super Admin" ||
        organization.current_user_role == "Admin"
      )

    $scope.createDashboardModal.onSelectTemplate = ({ template })->
      $scope.createDashboardModal.isTemplate = !_.isEmpty(template)
      $scope.createDashboardModal.model = template

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
      ImpacDashboardsSvc.isThereADashboard() && ($scope.forceShowWidgetSelector || ImpacDashboardsSvc.isCurrentDashboardEmpty())

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
    $scope.isCategorySelected = (category) ->
      if $scope.selectedCategory? && category?
        return $scope.selectedCategory == category
      else
        return false

    $scope.selectCategory = (category) ->
      $scope.selectedCategory = category

    $scope.getSelectedCategoryName = ->
      if $scope.selectedCategory?
        switch $scope.selectedCategory
          when 'accounts'
            return $translate.instant('impac.dashboard.category_name.accounting')
          when 'invoices'
            return $translate.instant('impac.dashboard.category_name.invoicing')
          when 'hr'
            return $translate.instant('impac.dashboard.category_name.hr_or_payroll')
          when 'sales'
            return $translate.instant('impac.dashboard.category_name.sales')
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
            return {top: '63px'}
          when 'hr'
            return {top: '93px'}
          when 'sales'
            return {top: '123px'}
          else
            return {top: '9999999px'}
      else
        return false

    $scope.getWidgetsForSelectedCategory = ->
      if $scope.selectedCategory? && $scope.widgetsTemplates?
        return _.select $scope.widgetsTemplates, (template) ->

          # Category defined by the widget's template
          if template.metadata && template.metadata.template
            widgetCategory = template.metadata.template.split('/')[0]

          # Category defined by the bolt
          else if template.metadata && template.metadata.bolt_path
            bolt = _.find ImpacRoutes.bolts(), (bolt) -> bolt.path == template.metadata.bolt_path
            widgetCategory = bolt.category

          # Category defined by the widget endpoint
          else
            widgetCategory = template.endpoint.split('/')[0]

          widgetCategory == $scope.selectedCategory
      else
        return []

    $scope.addWidget = (widgetTemplate) ->
      params = _.pick(widgetTemplate, ['endpoint', 'name', 'width', 'metadata', 'layouts'])

      angular.element('#widget-selector').css('cursor', 'progress')
      angular.element('#widget-selector .section-lines .line-item').css('cursor', 'progress')
      ImpacWidgetsSvc.create(params).then(
        () ->
          $scope.errors = ''
          angular.element('#widget-selector .badge.widget-added').fadeTo(250,1)
          $timeout ->
            angular.element('#widget-selector .badge.widget-added').fadeTo(700,0)
          ,4000
          return
        , (errors) ->
          $scope.errors = ImpacUtilities.processRailsError(errors)
      )
      .finally(->
        angular.element('#widget-selector').css('cursor', 'auto')
        angular.element('#widget-selector .section-lines .line-item').css('cursor', 'pointer')
      )

    $scope.triggerUpload = () ->
      fileInput = angular.element("#fileInput")
      fileInput.on('change', (event) ->
        files = event.target.files
        if  files && files[0]
          reader = new FileReader()
          reader.onload = (e) ->
            $scope.impacTitleLogo = e.target.result
          reader.readAsDataURL(files[0])
      )
      fileInput.trigger('click')
      return true

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
      self.instance = $uibModal.open(self.config)

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
      helper: 'clone'
    }

)

module.directive('impacDashboard', ($templateCache, ImpacDashboardsSvc) ->
  return {
      restrict: 'EA',
      scope: {
        forceLoad: '=load'
      },
      template: $templateCache.get('dashboard/dashboard.tmpl.html'),
      controller: 'ImpacDashboardCtrl'

      link: (scope, element) ->
        scope.pdfMode = false
        ImpacDashboardsSvc.pdfModeEnabled().then(null, null, ->
          scope.pdfMode = true
        )
        ImpacDashboardsSvc.pdfModeCanceled().then(null, null, ->
          scope.pdfMode = false
        )
    }
)
