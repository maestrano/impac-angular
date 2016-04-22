module = angular.module('impac.components.widgets.sales-leads-funnel',[])

module.controller('WidgetSalesLeadsFunnelCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.paramsPickerDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.paramsPickerDeferred.promise
    $scope.widthDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  hasOneLead = (leadsPerStatus) ->
    reducedHash = _.mapValues(leadsPerStatus, (statusHash) ->
      statusHash.total
    )
    totalsArray = _.compact _.values(reducedHash)
    total = _.reduce(totalsArray, (total=0, n) ->
      total + n
    )
    return total? && total > 0

  w.initContext = ->
    dhb = ImpacDashboardsSvc.getCurrentDashboard()
    status_selection = w.metadata.status_selection || dhb.metadata.status_selection || { values: [] }

    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads_per_status) && hasOneLead(w.content.leads_per_status)
      # Remove statuses absent from statuses list returned by the widget engine
      _.remove status_selection.values, (status) ->
        status not in _.keys w.content.leads_per_status

      # Parameter which define showing 'Apply to all similar widgets' checkbox
      $scope.hasReach = true

      $scope.statusOptions = []
      angular.forEach w.content.leads_per_status, (value, status) ->
        # Status will be ticked if has been selected before OR if no status is selected at all
        isSelected = _.isEmpty(status_selection.values) || ( status in status_selection.values )
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

  $scope.getSelectedLeads = ->
    if $scope.isDataFound && $scope.selectedStatus
      return w.content.leads_per_status[$scope.selectedStatus].leads

  $scope.getLeadDescription = (aLead) ->
    tooltip = []

    nameLineArray = ["<strong>"]
    nameLineArray.push($filter('titleize')(aLead.first_name)) if aLead.first_name
    nameLineArray.push($filter('titleize')(aLead.last_name)) if aLead.last_name
    nameLineArray.push("</strong>")

    tooltip.push(nameLineArray.join(' '))
    tooltip.push("Status: #{$filter('titleize')(aLead.lead_status)}")
    tooltip.push("Organization: #{$filter('titleize')(aLead.organization)}") if aLead.organization

    if aLead.opportunities
      tooltip.push("<strong>Opportunities:</strong>")
      angular.forEach aLead.opportunities, (opp) ->
        oppLineArray = []
        oppLineArray.push("##{opp.code}") if opp.code
        oppLineArray.push("#{opp.name}") if opp.name
        # TODO currency
        oppLineArray.push($filter('mnoCurrency')(opp.amount.total_amount, "USD", false)) if opp.amount
        oppLineArray.push("#{opp.probability}%") if opp.probability
        oppLineArray.push("#{opp.sales_stage}") if opp.sales_stage
        tooltip.push(oppLineArray.join(' - '))

    return tooltip.join("<br />")


  selectedStatusSetting = {}
  selectedStatusSetting.initialized = false

  selectedStatusSetting.initialize = ->
    $scope.selectedStatus = w.metadata.selected_status if !_.isEmpty(w.content) && angular.isDefined(w.content.leads_per_status[w.metadata.selected_status])
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
        value = w.content.leads_per_status[statusOption.label].total
        max = value if statusOption.selected && angular.isDefined(value) && value > max

      if max > 0
        $scope.funnel = _.compact _.map $scope.statusOptions, (statusOption, index) ->
          value = w.content.leads_per_status[statusOption.label].total
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

module.directive('widgetSalesLeadsFunnel', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesLeadsFunnelCtrl'
  }
)
