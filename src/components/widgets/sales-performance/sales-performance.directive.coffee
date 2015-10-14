module = angular.module('impac.components.widgets.sales-performance',[])

module.controller('WidgetSalesPerformanceCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.assignees)

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.getOpportunityAmount = (anOpp) ->
    if $scope.isDataFound && !_.isEmpty(anOpp)
      if anOpp.amount && anOpp.amount.amount
        amount = anOpp.amount.amount
        return $filter('mnoCurrency')(amount, anOpp.amount.currency || 'AUD')
      else
        return '-'


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesPerformance', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesPerformanceCtrl'
  }
)