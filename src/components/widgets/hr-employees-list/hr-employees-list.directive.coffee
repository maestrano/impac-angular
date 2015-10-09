module = angular.module('impac.components.widgets.hr-employees-list',[])

module.controller('WidgetHrEmployeesListCtrl', ($scope, Utilities, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = !_.isEmpty(w.content.total) && !_.isEmpty(w.content.employees)
        $scope.periodOptions = [
          {label: 'Yearly', value: 'yearly'},
          {label: 'Monthly', value: 'monthly'},
          {label: 'Weekly', value: 'weekly'},
          {label: 'Hourly', value: 'hourly'}
        ]
        $scope.period = _.find($scope.periodOptions, (o) ->
          o.value == w.content.total.period.toLowerCase()
        ) || $scope.periodOptions[0]

    $scope.getSingleCompanyName = ->
      if w.content && w.content.organizations
        orgUid = w.content.organizations[0]
        org = _.find(w.parentDashboard.data_sources, (o) ->
          o.uid == orgUid
        )
        return org.label

    $scope.getEmployeeSalary = (anEmployee) ->
      if anEmployee.salary?
        return $filter('mnoCurrency')(anEmployee.salary.amount,w.content.total.currency)
      else
        return '-'

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

    # Settings: organizations + x1 param selector
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total == 2

    return w

)

module.directive('widgetHrEmployeesList', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrEmployeesListCtrl'
  }
)