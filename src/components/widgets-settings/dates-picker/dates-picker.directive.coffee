module = angular.module('impac.components.widgets-settings.dates-picker',[])

module.directive('settingDatesPicker', ($templateCache, $filter, ImpacWidgetsSvc) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      fromDate: '=from'
      toDate: '=to'
      keepToday: '='
    },
    template: $templateCache.get('widgets-settings/dates-picker.tmpl.html'),
    
    link: (scope) ->
      w = scope.parentWidget

      setting = {}
      setting.key = "dates-picker"

      scope.calendarFrom =
        opened: false
        value: new Date(new Date().getFullYear(), 1, 1)
      scope.calendarTo =
        opened: false
        value: new Date()

      setting.initialize = ->
        scope.changed = false

        if Date.parse(scope.fromDate)
          scope.calendarFrom.value = new Date(Date.parse(scope.fromDate))
        else
          scope.calendarFrom.value = new Date(new Date().getFullYear(), 1, 1)

        if Date.parse(scope.toDate) && !scope.keepToday
          scope.calendarTo.value = new Date(Date.parse(scope.toDate))
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

      scope.toggleCalendarFrom = (event) ->
        scope.calendarFrom.opened = !scope.calendarFrom.opened
        scope.calendarTo.opened = false

      scope.toggleCalendarTo = (event) ->
        scope.calendarFrom.opened = false
        scope.calendarTo.opened = !scope.calendarTo.opened

      scope.showApplyButton = ->
        scope.changed = true

      scope.applyChanges = ->
        ImpacWidgetsSvc.updateWidgetSettings(w, true)


      w.settings.push(setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)
