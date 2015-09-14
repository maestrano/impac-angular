module = angular.module('impac.components.widgets.hr-timesheets',[])

module.controller('WidgetHrTimesheetsCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.employees) && !_.isEmpty(w.content.dates)

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

        $scope.unCollapsed = w.metadata.unCollapsed || []

    $scope.toogleCollapsed = (categoryName) ->
      if categoryName?
        if _.find($scope.unCollapsed, ((name) -> categoryName == name))
          $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
            name == categoryName
          )
        else
          $scope.unCollapsed.push(categoryName)
        w.updateSettings(false)

    $scope.isCollapsed = (categoryName) ->
      if categoryName?
        if _.find($scope.unCollapsed, ((name) -> categoryName == name))
          return false
        else
          return true

    $scope.getEmployee = ->
      return false unless $scope.isDataFound

      if w.metadata && w.metadata.employee_id
        return _.find(w.content.employees, (e) ->
          e.id == w.metadata.employee_id
        ) || w.content.employees[0]
      else
        return w.content.employees[0]

    $scope.getEmployeeTimeWorked = ->
      if employee = $scope.getEmployee()
        _.find(w.content.employees, (e) ->
          e.id == employee.id
        ).total_time_worked

    $scope.getEmployeeTimeOff = ->
      if employee = $scope.getEmployee()
        _.find(w.content.employees, (e) ->
          e.id == employee.id
        ).total_time_off


    # ### Mini-settings

    unCollapsedSetting = {}
    unCollapsedSetting.initialized = false

    unCollapsedSetting.initialize = ->
      unCollapsedSetting.initialized = true

    unCollapsedSetting.toMetadata = ->
      {unCollapsed: $scope.unCollapsed}

    w.settings.push(unCollapsedSetting)

    # -----------------

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

    # organization_ids + unCollapsed + param selector + time rage
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 4

    return w
)

module.directive('widgetHrTimesheets', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrTimesheetsCtrl'
  }
)