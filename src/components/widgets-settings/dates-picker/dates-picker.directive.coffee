module = angular.module('impac.components.widgets-settings.dates-picker',[])

module.directive('settingDatesPicker', ($templateCache, $filter, ImpacWidgetsSvc, $timeout) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      fromDate: '=from'
      toDate: '=to'
      keepToday: '='
      onUse: '&?'
      minDate: '=?'
    },
    template: $templateCache.get('widgets-settings/dates-picker.tmpl.html'),
    
    link: (scope, element) ->
      w = scope.parentWidget

      setting = {}
      setting.key = "dates-picker"

      scope.calendarFrom =
        opened: false
        value: new Date(new Date().getFullYear(), 0, 1)
        toggle: ->
          scope.calendarFrom.opened = !scope.calendarFrom.opened
          scope.calendarTo.opened = false

      scope.calendarTo =
        opened: false
        value: new Date()
        toggle: ->
          scope.calendarFrom.opened = false
          scope.calendarTo.opened = !scope.calendarTo.opened

      setting.initialize = ->
        # timeout to make sure that the fromDate and toDate are propagated to the directive if updated in widget.initContext()
        $timeout ->
          scope.changed = false
          # TODO: widget directives parse dates into strings (with $filter('date')), pass it into this directive, then it gets parsed into a date for display. Maybe it could accept a date directly? Maybe we could use moment.js in this component for neater parsing to avoid syntax like below?
          if Date.parse(scope.fromDate)
            parsedFrom = scope.fromDate.split('-')
            y = parsedFrom[0]
            m = parsedFrom[1] - 1
            d = parsedFrom[2]
            scope.calendarFrom.value = new Date(y,m,d)
          else
            scope.calendarFrom.value = new Date(new Date().getFullYear(), 0, 1)

          if Date.parse(scope.toDate) && !scope.keepToday
            parsedTo = scope.toDate.split('-')
            y = parsedTo[0]
            m = parsedTo[1] - 1
            d = parsedTo[2]
            scope.calendarTo.value = new Date(y,m,d)
          else
            scope.calendarTo.value = new Date()

      isToToday = ->
        (scope.calendarTo.value.getFullYear() == new Date().getFullYear()) &&
        (scope.calendarTo.value.getMonth() == new Date().getMonth()) &&
        (scope.calendarTo.value.getDate() == new Date().getDate())

      setting.toMetadata = ->
        return {
          hist_parameters: 
            from: $filter('date')(scope.calendarFrom.value, 'yyyy-MM-dd')
            to: $filter('date')(scope.calendarTo.value, 'yyyy-MM-dd')
            period: "RANGE"
            keep_today: isToToday()
        }

      scope.showApplyButton = ->
        scope.changed = true

      scope.applyChanges = ->
        ImpacWidgetsSvc.updateWidgetSettings(w, true)
        scope.changed = false

      scope.showTitle = ->
        element.hasClass('part')


      w.settings.push(setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)
