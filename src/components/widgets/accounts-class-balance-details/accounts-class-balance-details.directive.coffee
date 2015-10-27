module = angular.module('impac.components.widgets.accounts-class-balance-details', [])
module.controller('WidgetAccountsClassBalanceDetailsCtrl', ($scope, $q) ->

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
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content)


  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetAccountsClassBalanceDetails', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsClassBalanceDetailsCtrl'
  }
)
