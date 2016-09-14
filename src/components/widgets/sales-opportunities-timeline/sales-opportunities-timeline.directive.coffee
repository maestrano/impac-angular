module = angular.module('impac.components.widgets.sales-opportunities-timeline',[])

module.controller('WidgetSalesOpportunitiesTimelineCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramsPickerDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramsPickerDeferred.promise
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

      # Parameter which define showing 'Apply to all similar widgets' checkbox
      $scope.hasReach = true;

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

  $scope.getDateRange = (element) ->
    return '' unless element.date_range
    element.date_range.join(' to ')

  $scope.getDuration = (element) ->
    return '' if element.duration == 0
    element.duration + 'd'

  $scope.noDates = ->
    return false unless $scope.selectedElement
    stages = $scope.selectedElement.stages
    stages.length = 1 && stages[0].date_range.length == 1

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

  # Sorts opportunities using the passed function, that gets the data of the column being sorted, sames as at view
  sortOpportunitiesBy = (getElem) ->
    w.content.opportunities.sort (a, b) ->
      res = if getElem(a) > getElem(b) then 1
      else if getElem(a) < getElem(b) then -1
      else 0
      # Invert if ascending
      res *= -1 unless $scope.ascending
      return res

  sortData = ->
    if $scope.sortedColumn == 'opportunity'
      sortOpportunitiesBy( (el) -> el.name )
    else if $scope.sortedColumn == 'total'
      sortOpportunitiesBy( (el) -> el.duration )

  $scope.sort = (col) ->
    if $scope.sortedColumn == col
      $scope.ascending = !$scope.ascending
    else
      $scope.ascending = true
      $scope.sortedColumn = col
    sortData()

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElement
      pieData = _.map $scope.selectedElement.stages, (elem) ->
        {
          label: $filter('titleize')(elem.stage),
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
