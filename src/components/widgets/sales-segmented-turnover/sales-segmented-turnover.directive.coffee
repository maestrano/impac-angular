module = angular.module('impac.components.widgets.sales-segmented-turnover',[])

module.controller('WidgetSalesSegmentedTurnoverCtrl', ($scope, $q, $filter, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.widthDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.ranges)

      $scope.filterOptions = [
        {label: 'Gross revenue (incl. taxes)', value: 'gross'},
        {label: 'Net revenue (excl. taxes)', value: 'net'},
      ]
      $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
        o.value == w.content.filter
      ) || $scope.filterOptions[0])

  $scope.getAnalysis = ->
    if $scope.isDataFound
      if w.content.ranges[0].percentage + w.content.ranges[1].percentage > 50
        "Your less expensive products bring you most of your revenue."
      else if w.content.ranges[3].percentage + w.content.ranges[4].percentage > 50
        "Your most expensive products bring you most of your revenue."
      else
        "Your revenue is balanced between your different products segments."

  $scope.getColorByIndex = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.getRangeLabel = (aLabel) ->
    prices = aLabel.split('-')
    _.map(prices, (price) ->
      $filter('mnoCurrency')(price,w.content.currency,false)
    ).join(' - ')

  $scope.getMaxRange = ->
    if $scope.isDataFound
      max = 0
      maxRange = w.content.ranges[0]
      angular.forEach w.content.ranges, (range) ->
        maxRange = angular.copy(range) if range.percentage > max
        max = Math.max(max, range.percentage)

      return maxRange


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      barData = {
        labels: _.map(w.content.ranges, (elem) ->
          elem.label
        ),
        values: _.map(w.content.ranges, (elem) ->
          elem.value
        )
      }
      barOptions = {
        showTooltips: false,
        showXLabels: false,
        barDatasetSpacing: 15,
      }
      chartData = ChartFormatterSvc.barChart(barData, barOptions)
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesSegmentedTurnover', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesSegmentedTurnoverCtrl'
  }
)
