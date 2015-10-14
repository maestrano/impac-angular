module = angular.module('impac.components.widgets.hr-employee-details',[])

module.controller('WidgetHrEmployeeDetailsCtrl', ($scope, $q, Utilities, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.paramSelectorDeferred1 = $q.defer()
  $scope.paramSelectorDeferred2 = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.widthDeferred.promise
    $scope.paramSelectorDeferred1.promise
    $scope.paramSelectorDeferred2.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content.employees)

      $scope.periodOptions = [
        {label: 'Yearly', value: 'yearly'},
        {label: 'Monthly', value: 'monthly'},
        {label: 'Weekly', value: 'weekly'},
        {label: 'Hourly', value: 'hourly'}
      ]
      if w.metadata && w.metadata.period
        $scope.period = angular.copy(_.find($scope.periodOptions, (o) ->
          o.value == w.metadata.period.toLowerCase()
        ) || $scope.periodOptions[0])
      else
        $scope.period = angular.copy($scope.periodOptions[0])

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

  $scope.getSingleCompanyName = ->
    if w.content && w.content.organizations
      orgUid = w.content.organizations[0]
      org = _.find($scope.parentDashboard.data_sources, (o) ->
        o.uid == orgUid
      )
      return org.label if org?

  $scope.getEmployee = ->
    return false unless $scope.isDataFound

    if w.metadata && w.metadata.employee_uid
      employee = angular.copy(_.find(w.content.employees, (e) ->
        e.uid == w.metadata.employee_uid
      ) || w.content.employees[0])
    else
      employee = angular.copy(w.content.employees[0])

    employee.salary &&= $filter('mnoCurrency')(employee.salary.amount,employee.salary.currency)
    return employee

  $scope.formatAddress = (anAddress) ->
    return anAddress.replace(/, /g,',\n') if angular.isDefined(anAddress)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetHrEmployeeDetails', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrEmployeeDetailsCtrl'
  }
)