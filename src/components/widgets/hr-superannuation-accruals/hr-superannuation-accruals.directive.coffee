module = angular.module('impac.components.widgets.hr-superannuation-accruals',[])

module.controller('WidgetHrSuperannuationAccrualsCtrl', ($scope, $q) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timeRangeDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timeRangeDeferred.promise
    $scope.paramSelectorDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content.employees) && !_.isEmpty(w.content.dates)
      $scope.employeesOptions = _.map(w.content.employees, (e) ->
        {
          value: e.id,
          label: "#{e.lastname} #{e.firstname}",
        }
      )
      $scope.selectedEmployee = {
        value: $scope.getEmployee().id,
        label: "#{$scope.getEmployee().lastname} #{$scope.getEmployee().firstname}",
      }

  $scope.getEmployee = ->
    return false unless $scope.isDataFound

    if w.metadata && w.metadata.employee_id
      return _.find(w.content.employees, (e) ->
        e.id == w.metadata.employee_id
      ) || w.content.employees[0]
    else
      return w.content.employees[0]


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetHrSuperannuationAccruals', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrSuperannuationAccrualsCtrl'
  }
)