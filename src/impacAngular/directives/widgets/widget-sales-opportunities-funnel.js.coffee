# TODO factor with leads funnel !

module = angular.module('maestrano.analytics.widget-sales-opportunities-funnel',['maestrano.assets'])

module.controller('WidgetSalesOpportunitiesFunnelCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'Utilities', 'ChartFormatterSvc', '$filter',
  ($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opps_per_sales_stage)

        $scope.statusOptions = _.compact _.map w.metadata.sales_stage_selection, (status) ->
          {label: status, selected: true} if angular.isDefined(w.content.opps_per_sales_stage[status])

        angular.forEach w.content.opps_per_sales_stage, (value, status) ->
          if w.metadata.sales_stage_selection && !(status in w.metadata.sales_stage_selection)
            $scope.statusOptions.push({label: status, selected: false})
          else if _.isEmpty(w.metadata.sales_stage_selection)
            $scope.statusOptions.push({label: status, selected: true})


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

    $scope.getImpacColor = (index) ->
      ChartFormatterSvc.getColor(index)

    $scope.toogleSelectStatus = (aStatus) ->
      if $scope.selectedStatus && $scope.selectedStatus == aStatus
        $scope.selectedStatus = null
      else
        $scope.selectedStatus = aStatus

      if !w.isExpanded() && $scope.selectedStatus
        # will trigger updateSettings(false)
        w.toogleExpanded()
      else
        w.updateSettings(false)

    $scope.isSelected = (aStatus) ->
      return $scope.selectedStatus && aStatus == $scope.selectedStatus

    $scope.getSelectedOpportunities = ->
      if $scope.isDataFound && $scope.selectedStatus
        return w.content.opps_per_sales_stage[$scope.selectedStatus].opps

    $scope.getOppDetails = (anOpp) ->
      oppDetails = []
      oppDetails.push($filter('mnoCurrency')(anOpp.amount.amount, anOpp.amount.currency || 'AUD')) if anOpp.amount
      oppDetails.push("proba #{anOpp.probability}%") if anOpp.probability

      return oppDetails.join(' / ')


    selectedStatusSetting = {}
    selectedStatusSetting.initialized = false
    
    selectedStatusSetting.initialize = ->
      $scope.selectedStatus = w.metadata.selected_status if angular.isDefined(w.content.opps_per_sales_stage[w.metadata.selected_status])
      selectedStatusSetting.initialized = true

    selectedStatusSetting.toMetadata = ->
      {selected_status: $scope.selectedStatus}

    w.settings.push(selectedStatusSetting)



    # TODO: Refactor once we have understood exactly how the angularjs compilation process works:
    # in this order, we should:
    # 1- compile impac-widget controller
    # 2- compile the specific widget template/controller
    # 3- compile the settings templates/controllers
    # 4- call widget.loadContent() (ideally, from impac-widget, once a callback 
    #     assessing that everything is compiled an ready is received)
    getSettingsCount = ->
      if w.settings?
        return w.settings.length
      else
        return 0

    # organizations + params picker + width + status selector
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 4

    return w
])

module.directive('widgetSalesOpportunitiesFunnel', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("sales")
      element.addClass("leads-funnel")
    ,controller: 'WidgetSalesOpportunitiesFunnelCtrl'
  }
)