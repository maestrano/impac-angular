module = angular.module('impac.components.widgets.sales-comparison',[])

module.controller('WidgetSalesComparisonCtrl', ($scope, $q, $filter, ChartFormatterSvc, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.paramSelectorDeferred1 = $q.defer()
  $scope.paramSelectorDeferred2 = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.widthDeferred.promise
    $scope.paramSelectorDeferred1
    $scope.paramSelectorDeferred2
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = (angular.isDefined(w.content) && !_.isEmpty(w.content.sales_comparison) && !_.isEmpty(w.content.dates))
    if $scope.isDataFound
      $scope.unCollapsed = w.metadata.unCollapsed || []

      $scope.filterOptions = [
        {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
        {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
        {label: 'quantity sold', value: 'quantity_sold'},
      ]
      $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
        w.metadata && w.metadata.filter == o.value
      ) || $scope.filterOptions[0])

      $scope.criteriaOptions = [
        {label: 'products', value: 'default'},
        {label: 'locations', value: 'location'},
        {label: 'industries', value: 'industry'},
        {label: 'customers', value: 'customer'},
      ]
      $scope.criteria = angular.copy(_.find($scope.criteriaOptions, (o) ->
        w.metadata && w.metadata.criteria == o.value
      ) || $scope.criteriaOptions[0])

      if w.metadata.selectedElements
        $scope.selectedElements = []
        angular.forEach(w.metadata.selectedElements, (sElem) ->
          foundElem = _.find(w.content.sales_comparison, (statement)->
            statement.name == sElem.name
          )

          if !foundElem
            angular.forEach(w.content.sales_comparison, (statement) ->
              foundElem ||= _.find(statement.sales, (sale)->
                sElem.id == sale.id
              ) if statement.sales?
            )

          $scope.selectedElements.push(foundElem) if foundElem
        )

  $scope.getLastDate = ->
    _.last(w.content.dates) if $scope.isDataFound

  $scope.getTotalForPeriod = (element) ->
    _.reduce(element.totals[$scope.filter.value], (memo,total) ->
      memo + total
    , 0) if element.totals? && $scope.filter

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index)

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
      all_values_are_positive = true

      inputData = []
      angular.forEach($scope.selectedElements, (sElem) ->
        data = angular.copy(sElem)

        period = null
        period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
        dates = _.map w.content.dates, (date) ->
          $filter('mnoDate')(date, period)

        inputData.push({title: data.name, labels: dates, values: data.totals[$scope.filter.value]})

        angular.forEach(data.totals, (value) ->
          all_values_are_positive &&= value >= 0
        )
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true,
        datasetFill: false,
        pointDot: false,
      }
      angular.merge(options, {currency: 'hide'}) if $scope.filter.value.indexOf('quantity') > -1

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

module.directive('widgetSalesComparison', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesComparisonCtrl'
  }
)
