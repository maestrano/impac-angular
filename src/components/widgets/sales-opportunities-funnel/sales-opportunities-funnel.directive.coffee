# TODO factor with leads funnel !

module = angular.module('impac.components.widgets.sales-opportunities-funnel',[])

module.controller('WidgetSalesOpportunitiesFunnelCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.widget

  # Define variables
  # --------------------------------------
  $scope.selectedOpportunities = []
  $scope.collapsed = []

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramsPickerDeferred1 = $q.defer()
  $scope.paramsPickerDeferred2 = $q.defer()
  $scope.widthDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramsPickerDeferred1.promise
    $scope.paramsPickerDeferred2.promise
    $scope.widthDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  hasOneOpportunity = (oppsPerSalesStage) ->
    reducedHash = _.mapValues(oppsPerSalesStage, (statusHash) ->
      statusHash.total
    )
    totalsArray = _.compact _.values(reducedHash)
    total = _.reduce(totalsArray, (total=0, n) ->
      total + n
    )
    return total? && total > 0

  getFilteredTotal = (opps, assignees) ->
    return _.reduce(opps, (total=0, opp) ->
      if opp.assignee_id in assignees then total + 1 else total
    , 0)

  getOrderedAssigneeIds = (assigneesOptions) ->
    return _.map(_.filter(assigneesOptions, (assigneeOption) ->
      return assigneeOption.selected
    ), 'value')

  w.initContext = ->
    dhb = ImpacDashboardsSvc.getCurrentDashboard()
    sales_stage_selection = w.metadata.sales_stage_selection || dhb.metadata.sales_stage_selection || { values: [] }
    assignees_selection = w.metadata.assignees_selection || dhb.metadata.assignees_selection || { values: [] }

    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opps_per_sales_stage) && hasOneOpportunity(w.content.opps_per_sales_stage)
      # Remove statuses absent from statuses list returned by the widget engine
      _.remove sales_stage_selection.values, (status) ->
        status not in _.keys w.content.opps_per_sales_stage

      # Parameter which define showing 'Apply to all similar widgets' checkbox
      $scope.hasReach = true;

      $scope.statusOptions = []
      angular.forEach w.content.opps_per_sales_stage, (value, status) ->
        # Sales stage will be ticked if has been selected before OR if no status is selected at all
        isSelected = _.isEmpty(sales_stage_selection.values) || ( status in sales_stage_selection.values )
        $scope.statusOptions.push({label: status, selected: isSelected})

      $scope.assigneesOptions = []
      angular.forEach w.content.assignees, (obj, index) ->
        # Assignee will be ticked if has been selected before OR if no assignee is selected at all
        isSelected = _.isEmpty(assignees_selection.values) || ( obj.id in assignees_selection.values )
        $scope.assigneesOptions.push({label: obj.name, selected: isSelected, value: obj.id})

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.getImpacColor = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.toggleSelectStatus = (aStatus) ->
    if $scope.selectedStatus && $scope.selectedStatus == aStatus
      $scope.selectedStatus = null
    else
      $scope.selectedStatus = aStatus
    $scope.updateRightView();

    if !w.isExpanded() && $scope.selectedStatus
      # will trigger updateSettings(false)
      w.toggleExpanded()
    else
      ImpacWidgetsSvc.updateWidgetSettings(w,false,true)

  $scope.isSelected = (aStatus) ->
    return $scope.selectedStatus && aStatus == $scope.selectedStatus

  $scope.toggleCollapsed = (element) ->
    if element? && element.assigneeName?
      if _.find($scope.collapsed, ((name) -> element.assigneeName == name))
        $scope.collapsed = _.reject($scope.collapsed, (name) ->
          name == element.assigneeName
        )
      else
        $scope.collapsed.push(element.assigneeName)

  $scope.isCollapsed = (element) ->
    if element? && element.assigneeName?
      if _.find($scope.collapsed, ((name) -> element.assigneeName == name))
        return true
      else
        return false

  $scope.getSelectedOpportunities = ->
    if $scope.isDataFound && $scope.selectedStatus && w.content.opps_per_sales_stage[$scope.selectedStatus]
      assignees = getOrderedAssigneeIds($scope.assigneesOptions)
      filteredOpps = _.filter w.content.opps_per_sales_stage[$scope.selectedStatus].opps, (opportunity) ->
        return opportunity.assignee_id in assignees
      oppGroups = _.groupBy filteredOpps, 'assignee_id'
      
      sortedOppGroups = []
      angular.forEach $scope.assigneesOptions, (assigneeOption) ->
        sortedOppGroups.push({ assigneeName: assigneeOption.label, opps: oppGroups[assigneeOption.value]}) if oppGroups[assigneeOption.value]

      return sortedOppGroups
    else
      return []

  $scope.getOppDetails = (anOpp) ->
    oppDetails = []
    oppDetails.push($filter('mnoCurrency')(anOpp.amount.amount, anOpp.amount.currency || 'AUD')) if anOpp.amount
    oppDetails.push("prob. #{anOpp.probability}%") if anOpp.probability

    return oppDetails.join(' / ')

  $scope.getTotal = (oppsGroup) ->
    return "" unless oppsGroup.length > 0
    total = _.sum( oppsGroup, (o) ->
      amount = o.amount.amount || 0.0
      proba = o.probability || 0.0
      amount * (proba / 100)
    )
    currency = oppsGroup[0].amount.currency || 'AUD'
    $filter('mnoCurrency')(total, currency)


  $scope.updateRightView = ->
    $scope.selectedOpportunities = $scope.getSelectedOpportunities()
    $scope.collapsed = []

  selectedStatusSetting = {}
  selectedStatusSetting.initialized = false

  selectedStatusSetting.initialize = ->
    $scope.selectedStatus = w.metadata.selected_status if !_.isEmpty(w.content) && angular.isDefined(w.content.opps_per_sales_stage[w.metadata.selected_status])
    selectedStatusSetting.initialized = true
    $scope.updateRightView();

  selectedStatusSetting.toMetadata = ->
    {selected_status: $scope.selectedStatus}

  w.settings.push(selectedStatusSetting)

  # Funnel formating function
  # --------------------------------------
  w.format = ->
    if $scope.isDataFound
      max=0
      assignees = getOrderedAssigneeIds($scope.assigneesOptions)

      angular.forEach  $scope.statusOptions, (statusOption) ->
        value = getFilteredTotal(w.content.opps_per_sales_stage[statusOption.label].opps, assignees)
        max = value if statusOption.selected && angular.isDefined(value) && value > max

      if max > 0
        $scope.funnel = _.compact _.map $scope.statusOptions, (statusOption, index) ->
          value = getFilteredTotal(w.content.opps_per_sales_stage[statusOption.label].opps, assignees)
          coloredWidth = (100 * (value / max) - 10).toFixed()
          if coloredWidth < 8
            statusWidth = 92
          else
            statusWidth = 100 - coloredWidth
          {
            status: statusOption.label,
            number: value,
            coloredWidth: {width: "#{coloredWidth}%"}
            statusWidth: {width: "#{statusWidth}%"}
          } if statusOption.selected && angular.isDefined(value) && value > 0

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesOpportunitiesFunnel', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesOpportunitiesFunnelCtrl'
  }
)
