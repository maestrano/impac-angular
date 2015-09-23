module = angular.module('impac.components.widgets.accounts-accounting-values',[])

module.controller('WidgetAccountsAccountingValuesCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = w.content? && w.content.accounting?

    w.format = ->
      if $scope.isDataFound
        data = angular.copy(w.content.accounting)
        inputData = {title: data.type, labels: data.dates, values: data.values}
        all_values_are_positive = true
        angular.forEach(data.values, (value) ->
          all_values_are_positive &&= value >= 0
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
        }
        w.chart = ChartFormatterSvc.lineChart([inputData],options)

    $scope.getCurrentPrice = ->
      return _.last w.content.accounting.values if $scope.isDataFound

    $scope.getCurrency = ->
      return w.content.accounting.currency if $scope.isDataFound

    $scope.getLegend = ->
      return w.content.accounting.legend if $scope.isDataFound


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
)

module.directive('widgetAccountsAccountingValues', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsAccountingValuesCtrl',
  }
)