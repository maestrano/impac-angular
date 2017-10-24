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
    $scope.isDataFound = w.content? && w.content.accounting?
    $scope.getLegend()
    $scope.getCurrency()

  $scope.getCurrentPrice = ->
    return w.content.accounting.total_period if $scope.isDataFound

  $scope.getCurrency = ->
    if $scope.isDataFound
      if w.content.accounting.currency_key?
        $translate(w.content.accounting.currency_key).then((translation) ->
          $scope.currency = translation
          $scope.currency_unit = w.content.accounting.currency
        )
      else  # Fallback
        $scope.currency = w.content.accounting.currency
        $scope.currency_unit = w.content.accounting.currency

  $scope.getLegend = ->
    if $scope.isDataFound
      if w.content.accounting.legend_key?
        # Translate the legend key
        $translate(w.content.accounting.legend_key).then((translation) ->
          $scope.legend = translation
        )
      else  # Fallback
        $scope.legend = w.content.accounting.legend


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      data = angular.copy(w.content.accounting)

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
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
