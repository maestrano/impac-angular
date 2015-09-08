module = angular.module('impac.components.widgets.hr-leaves-schedule',[])

module.controller('WidgetHrLeavesScheduleCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget
    $scope.eventSources = []

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

    # organization_ids
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 1

    return w
)

module.directive('widgetHrLeavesSchedule', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("hr")
      element.addClass("leaves-schedule")
    ,controller: 'WidgetHrLeavesScheduleCtrl'
  }
)

module.directive('widgetComponentCalendar', ->
  return {
    scope: {
      events: '=ngModel'
    }
    restrict: 'A',
    link: (scope, element) ->
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