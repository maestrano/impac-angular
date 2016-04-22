# TODO factor with leads funnel !

module = angular.module('impac.components.widgets.sales-opportunities-funnel',[])

module.controller('WidgetSalesOpportunitiesFunnelCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramsPickerDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramsPickerDeferred.promise
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

  w.initContext = ->
    dhb = ImpacDashboardsSvc.getCurrentDashboard()
    sales_stage_selection = w.metadata.sales_stage_selection || dhb.metadata.sales_stage_selection || { values: [] }
    
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

    if !w.isExpanded() && $scope.selectedStatus
      # will trigger updateSettings(false)
      w.toggleExpanded()
    else
      ImpacWidgetsSvc.updateWidgetSettings(w,false,true)

  $scope.isSelected = (aStatus) ->
    return $scope.selectedStatus && aStatus == $scope.selectedStatus

  $scope.getSelectedOpportunities = ->
    if $scope.isDataFound && $scope.selectedStatus
      return w.content.opps_per_sales_stage[$scope.selectedStatus].opps

  $scope.getOppDetails = (anOpp) ->
    oppDetails = []
    oppDetails.push($filter('mnoCurrency')(anOpp.amount.amount, anOpp.amount.currency || 'AUD')) if anOpp.amount
    oppDetails.push("prob. #{anOpp.probability}%") if anOpp.probability

    return oppDetails.join(' / ')

  selectedStatusSetting = {}
  selectedStatusSetting.initialized = false

  selectedStatusSetting.initialize = ->
    $scope.selectedStatus = w.metadata.selected_status if !_.isEmpty(w.content) && angular.isDefined(w.content.opps_per_sales_stage[w.metadata.selected_status])
    selectedStatusSetting.initialized = true

  selectedStatusSetting.toMetadata = ->
    {selected_status: $scope.selectedStatus}

  w.settings.push(selectedStatusSetting)

  # Funnel formating function
  # --------------------------------------
  w.format = ->
    if $scope.isDataFound
      max=0
      angular.forEach  $scope.statusOptions, (statusOption) ->
        value = w.content.opps_per_sales_stage[statusOption.label].total
        max = value if statusOption.selected && angular.isDefined(value) && value > max

      if max > 0
        $scope.funnel = _.compact _.map $scope.statusOptions, (statusOption, index) ->
          value = w.content.opps_per_sales_stage[statusOption.label].total
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
          } if statusOption.selected && angular.isDefined(value)


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
