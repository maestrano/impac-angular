module = angular.module('impac.components.widgets.hr-employees-list',[])

module.controller('WidgetHrEmployeesListCtrl', ($scope, $q, $filter, $translate) ->

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
      $translate([
        "impac.widget.settings.time_period.period.weekly",
        "impac.widget.settings.time_period.period.monthly",
        "impac.widget.settings.time_period.period.quarterly",
        "impac.widget.settings.time_period.period.hourly"]).then(
        (translations) ->
          $scope.periodOptions = [
            {label: _.capitalize(translations["impac.widget.settings.time_period.period.weekly"]), value: "weekly"},
            {label: _.capitalize(translations["impac.widget.settings.time_period.period.monthly"]), value: "monthly"},
            {label: _.capitalize(translations["impac.widget.settings.time_period.period.quarterly"]), value: "quarterly"},
            {label: _.capitalize(translations["impac.widget.settings.time_period.period.hourly"]), value: "hourly"}
          ]

          $scope.period = angular.copy(_.find($scope.periodOptions, (o) ->
              o.value == w.content.total.period.toLowerCase()
            ) || $scope.periodOptions[0])
      )

  $scope.getSingleCompanyName = ->
    if w.content && w.content.organizations
      orgUid = w.content.organizations[0]
      org = _.find($scope.parentDashboard.data_sources, (o) ->
        o.uid == orgUid
      )
      return org.label

  $scope.getEmployeeSalary = (anEmployee) ->
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
