module = angular.module('impac.components.widgets.sales-offer-performance',[])

module.controller('WidgetSalesOfferPerformanceCtrl', ($scope, $q, ChartFormatterSvc, $filter, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.offersDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.offersDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.histModeDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && w.content.performance?
    $scope.selectedPerformanceSpan = w.content.performance.last if $scope.isDataFound
    $scope.secondaryPerformanceSpan = w.content.performance.previous if $scope.isDataFound
    $scope.histParams = $scope.selectedPerformanceSpan.hist_parameters if $scope.isDataFound
    w.metadata.hist_parameters = $scope.histParams
    $scope.getLegend()
    $scope.getCurrency()

  $scope.switchSpans = ->
    newSpan = $scope.secondaryPerformanceSpan
    $scope.secondaryPerformanceSpan = $scope.selectedPerformanceSpan
    $scope.selectedPerformanceSpan = newSpan

    $scope.histParams = $scope.selectedPerformanceSpan.hist_parameters
    w.metadata.hist_parameters = $scope.histParams
    $scope.initSettings() && w.format()

  $scope.getCurrentPrice = ->
    return $scope.selectedPerformanceSpan.total_period if $scope.isDataFound

  $scope.getSecondaryPrice = ->
    return $scope.secondaryPerformanceSpan.total_period if $scope.isDataFound

  $scope.getCurrency = ->
    if $scope.isDataFound
      if $scope.selectedPerformanceSpan.currency_key?
        $translate($scope.selectedPerformanceSpan.currency_key).then((translation) ->
          $scope.currency = translation
          $scope.currency_unit = $scope.selectedPerformanceSpan.currency
        )
      else  # Fallback
        $scope.currency = $scope.selectedPerformanceSpan.currency
        $scope.currency_unit = $scope.selectedPerformanceSpan.currency

  $scope.getLegend = ->
    if $scope.isDataFound
      if $scope.selectedPerformanceSpan.legend_key?
        # Translate the legend key
        $translate($scope.selectedPerformanceSpan.legend_key).then((translation) ->
          $scope.legend = translation
        )
      else  # Fallback
        $scope.legend = $scope.selectedPerformanceSpan.legend


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      data = angular.copy($scope.selectedPerformanceSpan)

      period = null
      period = $scope.histParams.period
      dates = _.map data.dates, (date) ->
        $filter('mnoDate')(date, period)

      # inputData = {title: data.type, labels: dates, values: data.values
      inputData = {labels: dates, datasets: [{title: data.type, values: data.values}]}
      all_values_are_positive = true
      angular.forEach(data.values, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false,
        currency: data.currency
      }
      chartData = ChartFormatterSvc.combinedBarChart(inputData,options,false)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesOfferPerformance', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesOfferPerformanceCtrl',
  }
)
