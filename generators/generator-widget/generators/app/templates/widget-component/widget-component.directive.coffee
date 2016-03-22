module = angular.module('impac.components.widgets.accounts-class-balance-details', [])
module.controller('WidgetAccountsClassBalanceDetailsCtrl', ($scope, $q, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
<%_ data.settingsPromises.forEach(function (name) { _%>
  $scope.<%= name + 'Deferred' %> = $q.defer();
<%_ }) _%>

  settingsPromises = [
  <%_ data.settingsPromises.forEach(function (name) { _%>
    $scope.<%= name + 'Deferred' %>.promise,
  <%_ }) _%>
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content?

  # Chart formating function
  # --------------------------------------

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
