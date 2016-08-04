module = angular.module('impac.components.widgets.sales-opportunity-timeline',[])

module.controller('WidgetSalesOpportunityTimelineCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.widthDeferred.promise
    $scope.chartDeferred.promise
  ]

  $scope.ascending = true
  $scope.sortedColumn = 'opportunity'

  # Widget specific methods
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)
      
      $scope.unCollapsed = w.metadata.unCollapsed || []
      if w.metadata.selectedElement
        $scope.selectedElement = _.find(w.content.summary, (element)->
          matcher = (if element.id? then 'id' else 'name')
          element[matcher] == w.metadata.selectedElement[matcher]
        )
        if !$scope.selectedElement
          angular.forEach(w.content.summary, (statement) ->
            $scope.selectedElement ||= _.find(statement.opportunities, (element)->
              matcher = (if element.id? then 'id' else 'name')
              element[matcher] == w.metadata.selectedElement[matcher]
            ) if statement.opportunities?
          )
      w.width = 6 unless $scope.selectedElement
      sortData()

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.getTotalDuration = (element) ->
    _.reduce(element.sales_stage_changes, (memo, ch) ->
      memo + ch.duration
    , 0) if element? && element.sales_stage_changes?

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

  $scope.toggleCollapsed = (element) ->
    if element? && element.name?
      if _.find($scope.unCollapsed, ((name) -> element.name == name))
        $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
          name == element.name
        )
      else
        $scope.unCollapsed.push(element.name)
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isCollapsed = (element) ->
    if element? && element.name?
      if _.find($scope.unCollapsed, ((name) -> element.name == name))
        return false
      else
        return true

  # <---

  sortOpportunitiesBy = (getElem) ->
    angular.forEach(w.content.summary, (sElem) ->
      if sElem.opportunities
        sElem.opportunities.sort (a, b) ->
          res = if getElem(a) > getElem(b) then 1
          else if getElem(a) < getElem(b) then -1
          else 0
          res *= -1 unless $scope.ascending
          return res
    )

  sortData = ->
    if $scope.sortedColumn == 'opportunity'
      sortOpportunitiesBy( (el) -> el.name )
    else if $scope.sortedColumn == 'duration'
      sortOpportunitiesBy( (el) -> $scope.getTotalDuration(el) )

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
      pieData = _.map $scope.selectedElement.sales_stage_changes, (elem) ->
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
  unCollapsedSetting = {}
  unCollapsedSetting.initialized = false

  unCollapsedSetting.initialize = ->
    unCollapsedSetting.initialized = true

  unCollapsedSetting.toMetadata = ->
    {unCollapsed: $scope.unCollapsed}

  w.settings.push(unCollapsedSetting)

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

module.directive('widgetSalesOpportunityTimeline', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesOpportunityTimelineCtrl'
  }
)
