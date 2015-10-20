module = angular.module('impac.components.widgets.hr-leaves-schedule',[])

module.controller('WidgetHrLeavesScheduleCtrl', ($scope, $q, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)

      eventsArray = []
      angular.forEach(w.content.summary, (leave) ->
        eventsArray.push(
          {
            title: "#{leave.employee_name} - #{leave.title}",
            start: leave.start_date,
            end: leave.end_date
          }
        )
      )
      $scope.eventSources = angular.copy(eventsArray)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetHrLeavesSchedule', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrLeavesScheduleCtrl'
  }
)

module.directive('widgetComponentCalendar', ->
  return {
    scope: {
      events: '=ngModel'
    }
    restrict: 'A',
    link: (scope, element) ->
      scope.eventSources = []

      calendarOptions = {
        header: {
          left: "prev",
          center: "title",
          right: "next",
        },
        contentHeight: 204,
        # aspectRatio: 3,
      }

      getEvents = ->
        return scope.events

      scope.$watch getEvents, (events) ->
        if events.length > 0
          element.fullCalendar('destroy')
          angular.extend(calendarOptions, {events: scope.events})
          element.fullCalendar(calendarOptions)
      ,true
  }
)