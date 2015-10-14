module = angular.module('impac.components.widgets.sales-top-opportunities',[])

module.controller('WidgetSalesTopOpportunitiesCtrl', ($scope, $q, Utilities, ChartFormatterSvc, $filter) ->

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
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opportunities)

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.getOppDetails = (anOpp) ->
    oppDetails = []
    oppDetails.push($filter('mnoCurrency')(anOpp.amount.amount, anOpp.amount.currency || 'AUD')) if anOpp.amount
    oppDetails.push("proba #{anOpp.probability}%") if anOpp.probability
    oppDetails.push(anOpp.sales_stage) if anOpp.sales_stage

    return oppDetails.join(' / ')

  $scope.getOppClass = (index) ->
    switch index
      when 0 then return 'first'
      when 1 then return 'second'
      when 2 then return 'second'
      else return ''


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesTopOpportunities', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesTopOpportunitiesCtrl'
  }
)