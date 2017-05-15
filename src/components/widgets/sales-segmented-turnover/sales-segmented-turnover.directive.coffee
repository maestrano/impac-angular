module = angular.module('impac.components.widgets.sales-segmented-turnover',[])

module.controller('WidgetSalesSegmentedTurnoverCtrl', ($scope, $q, $filter, ChartFormatterSvc, $translate) ->

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

      $translate([
        'impac.widget.sales_turnover.gross_revenue',
        'impac.widget.sales_turnover.net_revenue']).then(
          (translations) ->
            $scope.filterOptions = [
              {label: translations['impac.widget.sales_turnover.gross_revenue'], value: 'gross'},
              {label: translations['impac.widget.sales_turnover.net_revenue'], value: 'net'},
            ]

            $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
              o.value == w.content.filter
            ) || $scope.filterOptions[0])
        )

      $translate([
        'impac.widget.sales_turnover.analysis.least',
        'impac.widget.sales_turnover.analysis.most',
        'impac.widget.sales_turnover.analysis.balanced']).then(
        (translations) ->
           if w.content.ranges[0].percentage + w.content.ranges[1].percentage > 50
             $scope.analysisTranslate = translations['impac.widget.sales_turnover.analysis.least']
           else if w.content.ranges[3].percentage + w.content.ranges[4].percentage > 50
             $scope.analysisTranslate = translations['impac.widget.sales_turnover.analysis.most']
           else
             $scope.analysisTranslate = translations['impac.widget.sales_turnover.analysis.balanced']
        )

  $scope.getColorByIndex = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.getRangeLabel = (aLabel, ISOmode=false) ->
    prices = aLabel.split('-')
    _.map(prices, (price) ->
      $filter('mnoCurrency')(price,w.content.currency,ISOmode)
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
          $scope.getRangeLabel(elem.label, true)
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
