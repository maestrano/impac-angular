module = angular.module('maestrano.analytics.widget-accounts-payable-receivable',['maestrano.assets'])

module.controller('WidgetAccountsPayableReceivableCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc',
  ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = w.content? && w.content.values?

    w.format = ->
      if $scope.isDataFound
        lineData = [
          {title: "Payable", labels: w.content.dates, values: w.content.values.payables },
          {title: "Receivable", labels: w.content.dates, values: w.content.values.receivables },
        ]
        all_values_are_positive = true
        angular.forEach(w.content.values.payables, (value) ->
          all_values_are_positive &&= value >= 0
        )
        angular.forEach(w.content.values.receivables, (value) ->
          all_values_are_positive &&= value >= 0
        )
        lineOptions = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
        }
        w.chart = ChartFormatterSvc.lineChart(lineData,lineOptions, true)

    $scope.getCurrentPayable = ->
      _.last(w.content.values.payables) if $scope.isDataFound

    $scope.getCurrentReceivable = ->
      _.last(w.content.values.receivables) if $scope.isDataFound

    $scope.getCurrency = ->
      w.content.currency if $scope.isDataFound


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
      w.loadContent() if total == 3

    return w
])

module.directive('widgetAccountsPayableReceivable', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("accounts")
      element.addClass("payable-receivable")
    ,controller: 'WidgetAccountsPayableReceivableCtrl'
  }
)