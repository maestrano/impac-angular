module = angular.module('impac.components.widgets.sales-repeat-customers', [])
module.controller('WidgetSalesRepeatCustomersCtrl', ($scope, $q, $filter, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.chartDeferred.promise
    $scope.histModeDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content?

  $scope.getColorByIndex = (index) ->
    ChartFormatterSvc.getColor(index)

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      dates = _.map w.content.small_chart.dates, (date) ->
        $filter('date')(date, 'MMM yy')

      lineOptions = {
        scaleBeginAtZero: true,
        showXLabels: false,
        currency: 'hide'
      }

      lineData = [
        {title: 'Merchant', labels: dates, values: w.content.small_chart.merchant_values},
        {title: 'Competitive Set', labels: dates, values: w.content.small_chart.competitive_values},
        {title: 'Industry', labels: dates, values: w.content.small_chart.industry_values}
      ]

      # init chartData after transletion chages
      chartData = ChartFormatterSvc.lineChart(lineData,lineOptions)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetSalesRepeatCustomers', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesRepeatCustomersCtrl'
  }
)