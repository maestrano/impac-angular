module = angular.module('impac.components.widgets.sales-average-spend-per-customer', [])
module.controller('WidgetSalesAverageSpendPerCustomerCtrl', ($scope, $q, $filter, HighchartsFactory) ->

  w = $scope.widget
  $scope.isChartDisplayed = true

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise]

  # Unique identifier for the chart object in the DOM
  $scope.chartId = ->
    "averageSpendPerCustomerChart-#{w.id}"

  # # == Sub-Components =============================================================
  $scope.chartDeferred = $q.defer()

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content?

  w.format = ->
    # Instantiate and render chart
    options =
      chartType: 'line'
      chartOnClickCallbacks: []
      currency: w.metadata.currency
      showToday: true
      showLegend: true

    $scope.chart = new HighchartsFactory($scope.chartId(), w.content.chart, options)

    $scope.chart.formatters = ->
        currency = @options.currency
        xAxisLabels =
          labels:
            formatter: ->
              moment.utc(this.value).format('MMM YYYY')
        yAxisLabels =
          labels:
            formatter: ->
              $filter('mnoCurrency')(this.value, currency, false)
        xAxis: angular.merge([w.content.chart.xAxis[0]], [xAxisLabels])
        yAxis: angular.merge([w.content.chart.yAxis[0]], [yAxisLabels])
        rangeSelector:
          selected: 5

    $scope.chart.render(w.content.chart, options)

    # Notifies parent element that the chart is ready to be displayed
    $scope.chartDeferred.notify($scope.chart)

  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetSalesAverageSpendPerCustomer', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesAverageSpendPerCustomerCtrl'
  }
)
