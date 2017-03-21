module = angular.module('impac.components.widgets.hr-employees-list',[])

module.controller('WidgetHrEmployeesListCtrl', ($scope, $q, $filter) ->

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
    if $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.total) && !_.isEmpty(w.content.employees)
      $scope.periodOptions = [
        {label: 'per year', value: 'YEARLY'},
        {label: 'per month', value: 'MONTHLY'},
        {label: 'per week', value: 'WEEKLY'},
        {label: 'per day', value: 'DAILY'}
      ]
      $scope.period = angular.copy(_.find($scope.periodOptions, (o) ->
        o.value == w.content.total.period.toUpperCase()
      ) || $scope.periodOptions[0])

  $scope.getSingleCompanyName = ->
    if w.content && w.content.organizations
      orgUid = w.content.organizations[0]
      org = _.find($scope.parentDashboard.data_sources, (o) ->
        o.uid == orgUid
      )
      return org.label

  $scope.getEmployeeEarnings = (anEmployee) ->
    if anEmployee.salary?
      return $filter('mnoCurrency')(anEmployee.salary.amount,w.content.total.currency)
    else
      return '-'


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetHrEmployeesList', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrEmployeesListCtrl'
  }
)
