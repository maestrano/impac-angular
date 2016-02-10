# TODO: factor with superannuation accruals (exact same controller)

module = angular.module('impac.components.widgets.hr-leaves-balance',[])

module.controller('WidgetHrLeavesBalanceCtrl', ($scope, $q) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramSelectorDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.employees)
      $scope.employeesOptions = _.map(w.content.employees, (e) ->
        {
          value: e.uid,
          label: "#{e.lastname} #{e.firstname}",
        }
      )
      $scope.selectedEmployee = {
        value: $scope.getEmployee().uid,
        label: "#{$scope.getEmployee().lastname} #{$scope.getEmployee().firstname}",
      }

  $scope.getEmployee = ->
    return false unless $scope.isDataFound

    e = w.content.employees[0]
    if w.metadata && w.metadata.employee_id
      e = _.find(w.content.employees, (e) ->
        e.uid == w.metadata.employee_id
      ) || w.content.employees[0]

    return angular.copy(e)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetHrLeavesBalance', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrLeavesBalanceCtrl'
  }
)
