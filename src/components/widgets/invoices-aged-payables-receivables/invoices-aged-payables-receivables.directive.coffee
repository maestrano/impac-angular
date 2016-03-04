module = angular.module('impac.components.widgets.invoices-aged-payables-receivables',[])

module.controller('WidgetInvoicesAgedPayablesReceivablesCtrl', ($scope, $q, $log, $filter, ChartFormatterSvc, ImpacWidgetsSvc) ->

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


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && (!_.isEmpty(w.content.payables) || !_.isEmpty(w.content.receivables)) && !_.isEmpty(w.content.dates)

      $scope.unCollapsed = w.metadata.unCollapsed || []

      if w.metadata.selectedElements
        $scope.selectedElements = []
        angular.forEach(w.metadata.selectedElements, (sElem) ->
          foundElem = w.content.payables if sElem.name == "aged_payables"
          foundElem = w.content.receivables if sElem.name == "aged_receivables" && !foundElem

          foundElem = _.find(w.content.payables.suppliers, (supplier)->
            supplier.id == sElem.id
          ) if !foundElem

          foundElem = _.find(w.content.receivables.customers, (customer)->
            customer.id == sElem.id
          ) if !foundElem

          $scope.selectedElements.push(foundElem) if foundElem
        )

      w.width = 6 unless $scope.selectedElements? && $scope.selectedElements.length > 0

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index) if index?

  $scope.getLastValue = (element) ->
    _.last(element.totals) if element? && element.totals?

  $scope.getTotalSum = (element) ->
    _.reduce(element.totals, (memo, num) ->
      memo + num
    , 0) if element? && element.totals?

  $scope.getName = (element) ->
    if element? && element.name?
      return element.name.replace(/_/g, " ")

  $scope.getPeriod = ->
    if $scope.isDataFound && w.metadata && w.metadata.hist_parameters
      period_param = w.metadata.hist_parameters.period || "MONTHLY"
      period = "day"
      period = period_param.substr(0,period_param.length-2).toLowerCase() if period_param != "DAILY"
      return "current #{period}"
    else return "current month"


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
        ImpacWidgetsSvc.updateWidgetSettings(w,false)
    else
      $scope.selectedElements ||= []
      $scope.selectedElements.push(element)
      w.format()
      if !w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)

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

  $scope.hasElements = ->
    $scope.selectedElements? && $scope.selectedElements.length > 0
  # <---


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElements? && $scope.selectedElements.length > 0

      # Hist chart
      all_values_are_positive = true
      inputData = []
      
      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      angular.forEach($scope.selectedElements, (sElem) ->
        data = angular.copy(sElem)
        inputData.push({title: data.name, labels: dates, values: data.totals})

        angular.forEach(data.totals, (value) ->
          all_values_are_positive &&= value >= 0
        )
      )
      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true,
        datasetFill: $scope.selectedElements.length == 1,
        pointDot: $scope.selectedElements.length == 1,
      }
      chartData = ChartFormatterSvc.lineChart(inputData,options)
      
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

  selectedElementsSetting = {}
  selectedElementsSetting.initialized = false

  selectedElementsSetting.initialize = ->
    selectedElementsSetting.initialized = true

  selectedElementsSetting.toMetadata = ->
    {selectedElements: $scope.selectedElements}

  w.settings.push(selectedElementsSetting)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetInvoicesAgedPayablesReceivables', ->
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesAgedPayablesReceivablesCtrl'
  }
)
