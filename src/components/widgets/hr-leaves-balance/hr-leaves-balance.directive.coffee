# TODO: factor with superannuation accruals (exact same controller)

module = angular.module('impac.components.widgets.hr-leaves-balance',[])

module.controller('WidgetHrLeavesBalanceCtrl', ($scope, Utilities) ->

    w = $scope.widget

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

    # Settings: organizations + x1 param selector + time range
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 3

    return w

)

module.directive('widgetHrLeavesBalance', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrLeavesBalanceCtrl'
  }
)