module = angular.module('impac.components.widgets.hr-employee-details',[])

module.controller('WidgetHrEmployeeDetailsCtrl', ($scope, DhbAnalyticsSvc, Utilities, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = !_.isEmpty(w.content.employees)

        $scope.periodOptions = [
          {label: 'Yearly', value: 'yearly'},
          {label: 'Monthly', value: 'monthly'},
          {label: 'Weekly', value: 'weekly'},
          {label: 'Hourly', value: 'hourly'}
        ]
        if w.metadata && w.metadata.period
          $scope.period = _.find($scope.periodOptions, (o) ->
            o.value == w.metadata.period.toLowerCase()
          ) || $scope.periodOptions[0]
        else
          $scope.period = $scope.periodOptions[0]

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
        org = _.find(w.parentDashboard.data_sources, (o) ->
          o.uid == orgUid
        )
        return org.label

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

    # TODO: Refactor once we have understood exactly how the angularjs compilation process works:
    # in this order, we should:
    # 1- compile impac-widget controller
    # 2- compile the specific widget template/controller
    # 3- compile the settings templates/controllers
    # 4- call widget.loadContent() (ideally, from impac-widget, once a callback
    #     assessing that everything is compiled an ready is received)
    getSettingsCount = ->
      if w.settings?
        return w.settings.length
      else
        return 0

    # Settings: organizations + x2 param selector + width
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 4

    return w

)

module.directive('widgetHrEmployeeDetails', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("hr")
      element.addClass("employee-details")
    ,controller: 'WidgetHrEmployeeDetailsCtrl'
  }
)