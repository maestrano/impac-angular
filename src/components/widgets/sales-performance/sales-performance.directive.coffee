module = angular.module('impac.components.widgets.sales-performance',[])

module.controller('WidgetSalesPerformanceCtrl', ($scope, $q, $filter, ChartFormatterSvc, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.widthDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.assignees)

    if $scope.isDataFound && w.metadata.selectedElement
      $scope.selectedElement = _.find(w.content.assignees, (statement)->
        statement.name == w.metadata.selectedElement.name
      )

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.getWonOpportunities = (element) ->
    if element? && element.opportunities?
      _.select element.opportunities, (opp) ->
        opp.sales_stage.toLowerCase().match(/won/)

  $scope.getLostOpportunities = (element) ->
    if element? && element.opportunities?
      _.select element.opportunities, (opp) ->
        !opp.sales_stage.toLowerCase().match(/won/)

  $scope.getCloseDate = (anOpp) ->
    if anOpp? && anOpp.sales_stage_changes? && anOpp.sales_stage_changes.length > 0
      theDate = anOpp.sales_stage_changes[anOpp.sales_stage_changes.length - 1].updated_at
      if theDate.split(' ').length > 0
        theDate = theDate.split(' ')[0]

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      return $filter('mnoDate')(theDate, period)

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
    element? && $scope.selectedElement? && (element.name? && element.name == $scope.selectedElement.name)

  # Mini-setting
  selectedElementSetting = {}
  selectedElementSetting.initialized = false

  selectedElementSetting.initialize = ->
    selectedElementSetting.initialized = true

  selectedElementSetting.toMetadata = ->
    {selectedElement: $scope.selectedElement}

  w.settings.push(selectedElementSetting)
  # <---


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElement?
      data = angular.copy($scope.selectedElement)

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      inputData = {title: data.name, labels: dates, values: data.totals}
      all_values_are_positive = true
      angular.forEach(data.totals, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true,
      }
      chartData = ChartFormatterSvc.lineChart([inputData],options)
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesPerformance', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesPerformanceCtrl'
  }
)