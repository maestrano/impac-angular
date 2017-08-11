module = angular.module('impac.components.widgets.hr-employee-details',[])

module.controller('WidgetHrEmployeeDetailsCtrl', ($scope, $q, $filter, $translate) ->

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

  $scope.salaries = []

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.employees)

      $scope.periodOptions = [
        {label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.yearly')), value: 'yearly'},
        {label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.quarterly')), value: 'quarterly'},
        {label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.monthly')), value: 'monthly'},
        {label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.weekly')), value: 'weekly'},
        {label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.daily')), value: 'daily'}
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

      employee = $scope.getEmployee()
      $scope.selectedEmployee = {
        value: employee.uid,
        label: "#{employee.lastname} #{employee.firstname}",
      }

      mapSalaries(employee, $scope.salaries)

  # Map Employee salaries
  mapSalaries = (employee, salariesArray) ->
    _.remove(salariesArray, -> true)
    for salary in employee.employee_salaries
      tooltip = salary.name
      if salary.hours_per_week
        tooltip = "#{salary.name} (#{salary.hours_per_week}h per week)"

      if (amount = salary.annual_salary)
        salariesArray.push({
          amount: amount,
          currency: salary.currency,
          period: 'Annual',
          tooltip: tooltip
        })
      else if (amount = salary.hourly_rate)
        salariesArray.push({
          amount: amount,
          currency: salary.currency,
          period: 'Hourly',
          tooltip: tooltip
        })


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

    if employee.salary?
      employee.earnings = $filter('mnoCurrency')(employee.salary.amount, employee.salary.currency)

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
