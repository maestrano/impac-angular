module = angular.module('impac.components.widgets.hr-payroll-taxes',[])

module.controller('WidgetHrPayrollTaxesCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

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
    $scope.isDataFound = w.content? && !_.isEmpty(w.content.total_tax) && !_.isEmpty(w.content.dates)

  $scope.getCurrentPrice = ->
    return _.last w.content.total_tax if $scope.isDataFound

  $scope.getCurrency = ->
    return w.content.currency || "USD" if $scope.isDataFound

  $scope.getPeriod = ->
    if $scope.isDataFound && w.metadata && w.metadata.hist_parameters
      period_param = w.metadata.hist_parameters.period || "MONTHLY"
      period = "day"
      period = period_param.substr(0,period_param.length-2).toLowerCase() if period_param != "DAILY"
      return "(current #{period})"


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      inputData = {title: "Payroll Taxes", labels: dates, values: w.content.total_tax}
      all_values_are_positive = true
      angular.forEach(w.content.total_tax, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false,
      }
      chartData = ChartFormatterSvc.lineChart([inputData],options)
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetHrPayrollTaxes', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrPayrollTaxesCtrl',
  }
)
