module = angular.module('impac.components.widgets.accounts-accounting-values',[])

module.controller('WidgetAccountsAccountingValuesCtrl', ($scope, $q, ChartFormatterSvc) ->

    w = $scope.widget

    # Define settings
    # --------------------------------------
    $scope.orgDeferred = $q.defer()
    $scope.timeRangeDeferred = $q.defer()
    $scope.histModeDeferred = $q.defer()
    $scope.chartDeferred = $q.defer()

    settingsPromises = [
      $scope.orgDeferred.promise
      $scope.timeRangeDeferred.promise
      $scope.histModeDeferred.promise
      $scope.chartDeferred.promise
    ]


    # Widget specific methods
    # --------------------------------------
    w.initContext = ->
      $scope.isDataFound = w.content? && w.content.accounting?

    $scope.getCurrentPrice = ->
      return _.last w.content.accounting.values if $scope.isDataFound

    $scope.getCurrency = ->
      return w.content.accounting.currency if $scope.isDataFound

    $scope.getLegend = ->
      return w.content.accounting.legend if $scope.isDataFound


    # Chart formating function
    # --------------------------------------
    $scope.formatted = $q.defer()
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
        data = ChartFormatterSvc.lineChart([inputData],options)
        
        $scope.formatted.notify(data)


    # Widget is ready: can trigger the "wait for settigns to be ready"
    # --------------------------------------
    $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsAccountingValues', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsAccountingValuesCtrl',
  }
)