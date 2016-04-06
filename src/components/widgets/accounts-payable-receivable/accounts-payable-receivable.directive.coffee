module = angular.module('impac.components.widgets.accounts-payable-receivable',[])

module.controller('WidgetAccountsPayableReceivableCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.histModeDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && w.content.values? && w.content.live_values?

  $scope.getCurrentPayable = ->
    if $scope.isDataFound then w.content.live_values.payable else 0.0

  $scope.getCurrentReceivable = ->
    if $scope.isDataFound then w.content.live_values.receivable else 0.0

  $scope.getCurrency = ->
    w.content.currency if $scope.isDataFound


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      lineData = [
        {title: "Payable", labels: dates, values: w.content.values.payables },
        {title: "Receivable", labels: dates, values: w.content.values.receivables },
      ]

      all_values_are_positive = true
      for value in w.content.values.payables
        all_values_are_positive &&= value >= 0
      for value in w.content.values.receivables
        all_values_are_positive &&= value >= 0

      lineOptions = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false,
      }
      chartData = ChartFormatterSvc.lineChart(lineData,lineOptions, true)
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsPayableReceivable', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsPayableReceivableCtrl'
  }
)
