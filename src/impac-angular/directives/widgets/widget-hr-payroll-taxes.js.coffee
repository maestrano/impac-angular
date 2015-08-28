module = angular.module('maestrano.analytics.widget-hr-payroll-taxes',[])

module.controller('WidgetHrPayrollTaxesCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc',
  ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = w.content? && w.content.total_tax && w.content.dates

    w.format = ->
      if $scope.isDataFound
        inputData = {title: "Payroll Taxes", labels: w.content.dates, values: w.content.total_tax}
        all_values_are_positive = true
        angular.forEach(w.content.total_tax, (value) ->
          all_values_are_positive &&= value >= 0
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
        }
        w.chart = ChartFormatterSvc.lineChart([inputData],options)

    $scope.getCurrentPrice = ->
      return _.last w.content.total_tax if $scope.isDataFound

    $scope.getCurrency = ->
      return w.content.currency || "USD" if $scope.isDataFound

    $scope.getPeriod = ->
      if $scope.isDataFound && w.content.hist_parameters
        period_param = w.content.hist_parameters.period || "MONTHLY"
        period = "day"
        period = period_param.substr(0,period_param.length-2).toLowerCase() if period_param != "DAILY"
        return "(current #{period})"

    # TODO: Refactor once we have understood exactly how the angularjs compilation process works:
    # in this order, we should:
    # 1- compile impac-widget controller
    # 2- compile the specific widget template/controller
    # 3- compile the settings templates/controllers
    # 4- call widget.loadContent() (ideally, from impac-widget, once a callback
    #     assessing that everything is compiled an ready is received)
    getSettingsCount = ->
      if w.settings?
        return w.settings.length
      else
        return 0

    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 3

    return w
])

module.directive('widgetHrPayrollTaxes', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("hr")
      element.addClass("payroll-taxes")
    ,controller: 'WidgetHrPayrollTaxesCtrl',
  }
)