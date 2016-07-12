module = angular.module('impac.components.widgets.sales-performance',[])

module.controller('WidgetSalesPerformanceCtrl', ($scope, $q, $filter, ChartFormatterSvc, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramsWinsPickerDeferred = $q.defer()
  $scope.paramsLostsPickerDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramsWinsPickerDeferred
    $scope.paramsLostsPickerDeferred
    $scope.timePeriodDeferred
    $scope.widthDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.assignees)

    if $scope.isDataFound
      if w.metadata.selectedElements
        $scope.selectedElements = []
        angular.forEach(w.metadata.selectedElements, (sElem) ->
          foundElem = _.find(w.content.assignees, (statement)->
            statement.name == sElem.name
          )

          if !foundElem
            angular.forEach(w.content.summary, (statement) ->
              foundElem ||= _.find(statement.accounts, (account)->
                sElem.id == account.id
              ) if statement.accounts?
            )

          $scope.selectedElements.push(foundElem) if foundElem
        )
      # Parameter which define showing 'Apply to all similar widgets' checkbox
      $scope.hasReach = true
      $scope.closedWonOptions = _.compact _.map w.content.sales_stages.won, (stage) ->
        {label: stage, selected: true}

      angular.forEach w.content.sales_stages.all, (stage) ->
        if !(stage in w.content.sales_stages.won)
          $scope.closedWonOptions.push({label: stage, selected: false})

      $scope.closedLostOptions = _.compact _.map w.content.sales_stages.lost, (stage) ->
        {label: stage, selected: true}

      angular.forEach w.content.sales_stages.all, (stage) ->
        if !(stage in w.content.sales_stages.lost)
          $scope.closedLostOptions.push({label: stage, selected: false})


  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.getChartTitle = (el) ->
    $scope.selectedElements.map((el) -> el.name).join(', ') if $scope.selectedElements

  $scope.getTotalWon = (el) ->
    if $scope.selectedElements then $scope.selectedElements.reduce(((t, e) -> t + e.total_won), 0) else 0


  formatDate = (date) ->
    period = if w.metadata? && w.metadata.hist_parameters? then w.metadata.hist_parameters.period else null
    return $filter('mnoDate')(date, period)

  $scope.getCloseDate = (anOpp) ->
    if anOpp? && anOpp.sales_stage_changes? && anOpp.sales_stage_changes.length > 0
      theDate = anOpp.sales_stage_changes[anOpp.sales_stage_changes.length - 1].updated_at
      if theDate.split(' ').length > 0
        theDate = theDate.split(' ')[0]
        return formatDate(theDate)

  $scope.getForecastCloseDate = (anOpp) ->
    if anOpp? && anOpp.expected_close_date
      theDate = anOpp.expected_close_date
      if theDate.split(' ').length > 0
        theDate = theDate.split(' ')[0]
        return formatDate(theDate)

  # --->
  # TODO selectedElement and collapsed should be factorized as settings or 'commons'
  $scope.toggleSelectedElement = (element) ->
    if $scope.isSelected(element)
      $scope.selectedElements = _.reject($scope.selectedElements, (sElem) ->
        if element.id
          sElem.id == element.id
        else
          sElem.name == element.name
      )
      w.format()
      if w.isExpanded() && $scope.selectedElements.length == 0
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w, false, true)
    else
      $scope.selectedElements ||= []
      $scope.selectedElements.push(element)
      w.format()
      if !w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w, false, true)

  $scope.isSelected = (element) ->
    if element? && $scope.selectedElements?
      if _.find($scope.selectedElements, (sElem) ->
        if element.id
          sElem.id == element.id
        else
          sElem.name == element.name
      )
        return true
      else
        return false
    else
      return false

  $scope.hasElements = ->
    $scope.selectedElements? && $scope.selectedElements.length > 0

  $scope.getSelectLineColor = (elem) ->
    ChartFormatterSvc.getLightenColor(_.indexOf($scope.selectedElements, elem)) if $scope.hasElements()
  # <---

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElements? && $scope.selectedElements.length > 0
      inputData = []
      all_values_are_positive = true
      angular.forEach($scope.selectedElements, (sElem) ->
        data = angular.copy(sElem)
        period = null
        period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
        dates = _.map w.content.dates, (date) ->
          $filter('mnoDate')(date, period)

        inputData.push({title: data.name, labels: dates, values: data.totals})
        angular.forEach(data.totals, (value) ->
          all_values_are_positive &&= value >= 0
        )
      )
      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true,
        datasetFill: $scope.selectedElements.length == 1,
        pointDot: $scope.selectedElements.length == 1
      }
      chartData = ChartFormatterSvc.lineChart(inputData,options)
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)

  # Mini-setting
  selectedElementsSetting = {initialized:false}

  selectedElementsSetting.initialize = ->
    selectedElementsSetting.initialized = true

  selectedElementsSetting.toMetadata = ->
    {selectedElements: $scope.selectedElements}

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.no_sales_stages_selected = ->
    w.content && w.content.sales_stages && w.content.sales_stages.won.length == 0 && w.content.sales_stages.lost.length  == 0



  w.settings.push(selectedElementsSetting)
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
