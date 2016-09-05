module = angular.module('impac.components.widgets.sales-opportunities-timeline',[])

module.controller('WidgetSalesOpportunitiesTimelineCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramsPickerDeferred1 = $q.defer()
  $scope.paramsPickerDeferred2 = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramsPickerDeferred1.promise
    $scope.paramsPickerDeferred2.promise
    $scope.widthDeferred.promise
    $scope.chartDeferred.promise
  ]

  $scope.ascending = true
  $scope.sortedColumn = 'opportunity'

  # Widget specific methods
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opportunities)
      dhb = ImpacDashboardsSvc.getCurrentDashboard()
      sales_stage_selection = w.metadata.sales_stage_selection || dhb.metadata.sales_stage_selection || { values: [] }

      if w.metadata.selectedElement
        $scope.selectedElement = _.find(w.content.opportunities, (element)->
          matcher = (if element.id? then 'id' else 'name')
          element[matcher] == w.metadata.selectedElement[matcher]
        )

      $scope.statusOptions = []
      angular.forEach w.content.stages, (status) ->
        # Sales stage will be ticked if has been selected before OR if no status is selected at all
        isSelected = _.isEmpty(sales_stage_selection.values) || ( status in sales_stage_selection.values )
        $scope.statusOptions.push({label: status, selected: isSelected})

      w.width = 6 unless $scope.selectedElement
      sortData()

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.getSelectLineColor = ->
    ChartFormatterSvc.getColor(0)

  # --->
  # TODO selectedElement and collapsed should be factorized as settings or 'commons'
  $scope.toggleSelectedElement = (element) ->
    if $scope.isSelected(element)
      $scope.selectedElement = null
      if w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)
    else
      $scope.selectedElement = angular.copy(element)
      w.format()
      if !w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isSelected = (element) ->
    element? && $scope.selectedElement? && (
      matcher = (if element.id? then 'id' else 'name')
      $scope.selectedElement[matcher] == element[matcher]
    )

  # <---

  sortOpportunitiesBy = (getElem) ->
    w.content.opportunities.sort (a, b) ->
      res = if getElem(a) > getElem(b) then 1
      else if getElem(a) < getElem(b) then -1
      else 0
      res *= -1 unless $scope.ascending
      return res

  sortData = ->
    if $scope.sortedColumn == 'opportunity'
      sortOpportunitiesBy( (el) -> el.name )
    else if $scope.sortedColumn == 'total'
      sortOpportunitiesBy( (el) -> el.total_duration )
    else if $scope.sortedColumn == 'avg'
      sortOpportunitiesBy( (el) -> el.avg_duration )

  $scope.sort = (col) ->
    if $scope.sortedColumn == col
      $scope.ascending = !$scope.ascending
    else
      $scope.ascending = true
      $scope.sortedColumn = col
    sortData()

  $scope.filterBySalesStage = (element) ->
    if _.find($scope.statusOptions, (status)-> status.label == element.status && status. selected) then true else false

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElement
      pieData = _.map $scope.selectedElement.stages, (elem) ->
        {
          label: $filter('titleize')(elem.status),
          value: elem.duration
        }
      pieOptions = {
        showTooltips: true,
        percentageInnerCutout: 50,
        tooltipFontSize: 12,
        currency: 'd'
      }
      chartData = ChartFormatterSvc.pieChart(pieData, pieOptions)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Mini-settings
  # --------------------------------------
  selectedElementSetting = {}
  selectedElementSetting.initialized = false

  selectedElementSetting.initialize = ->
    selectedElementSetting.initialized = true

  selectedElementSetting.toMetadata = ->
    {selectedElement: $scope.selectedElement}

  w.settings.push(selectedElementSetting)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesOpportunitiesTimeline', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesOpportunitiesTimelineCtrl'
  }
)
