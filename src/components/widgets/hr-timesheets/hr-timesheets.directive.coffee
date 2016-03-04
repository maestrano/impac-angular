module = angular.module('impac.components.widgets.hr-timesheets',[])

module.controller('WidgetHrTimesheetsCtrl', ($scope, $q, ChartFormatterSvc,ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.paramSelectorDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
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

  $scope.toggleCollapsed = (categoryName) ->
    if categoryName?
      if _.find($scope.unCollapsed, ((name) -> categoryName == name))
        $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
          name == categoryName
        )
      else
        $scope.unCollapsed.push(categoryName)
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

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


  # Mini-settings
  # --------------------------------------
  unCollapsedSetting = {}
  unCollapsedSetting.initialized = false

  unCollapsedSetting.initialize = ->
    unCollapsedSetting.initialized = true

  unCollapsedSetting.toMetadata = ->
    {unCollapsed: $scope.unCollapsed}

  w.settings.push(unCollapsedSetting)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetHrTimesheets', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrTimesheetsCtrl'
  }
)
