# TODO: dates-picker should be a common component. Template compiling should be revised.

module = angular.module('impac.components.widgets-settings.dates-picker',[])

module.directive('settingDatesPicker', ($templateCache, $filter, ImpacWidgetsSvc, $timeout, $compile) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=?'
      deferred: '='
      fromDate: '=from'
      toDate: '=to'
      keepToday: '='
      onUse: '&?'
      onChangeCb: '&?onChange'
      minDate: '=?'
      updateOnPick: '=?'
      template: '=?'
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

      scope.template ||= """
      <div style="display: flex; flex-wrap: wrap;">
        <div style="display: flex; flex-grow: 1; justify-content: space-around; margin: 2px 0px;">
          <span class="sdp-from-label" style="padding-top: 3px; min-width: 32px; flex-grow: 1; text-align: center;" translate>impac.widget.settings.dates_picker.from</span> <from-date style="flex-grow: 2;">
        </div>
        <div style="display: flex; flex-grow: 1; justify-content: space-around; margin: 2px 0px;">
          <span class="sdp-to-label" style="padding-top: 3px; min-width: 32px; flex-grow: 1; text-align: center;" translate>impac.widget.settings.dates_picker.to</span> <to-date style="flex-grow: 2;">
        </div>
      </div>
      """
      fromDateHtml = """
      <div style="display: inline-block;">
        <button class="btn btn-sm btn-default date-button" ng-click="calendarFrom.toggle()" uib-datepicker-popup ng-model="calendarFrom.value" is-open="calendarFrom.opened" ng-change="onChange()" min-date="minDate" max-date="calendarTo.value" ng-focus="onUse()" ATTRS>
          {{ calendarFrom.value | date : 'yyyy-MM-dd' }}
        </button>
      </div>
      """
      toDateHtml = """
      <div style="display: inline-block;">
        <button class="btn btn-sm btn-default date-button" ng-click="calendarTo.toggle()" uib-datepicker-popup ng-model="calendarTo.value" is-open="calendarTo.opened" ng-change="onChange()" min-date="calendarFrom.value" ng-focus="onUse()" ATTRS>
          {{ calendarTo.value | date : 'yyyy-MM-dd' }}
        </button>
      </div>
      """
      applyHtml = """<button class="btn btn-sm btn-success" uib-tooltip="{{'impac.widget.settings.dates_picker.tooltip.apply_changes' | translate}}" ng-show="changed && !parentWidget.isEditMode" ng-click="applyChanges()" ng-focus="onUse()" >
        <i class="fa fa-check"/>
      </button>
      """

      # First element triggers onUser() when clicked
      scope.template = scope.template.replace(/>/, " ng-click='onUse()'>")
      # Custom attributes (style...) for from and to dates
      scope.template = scope.template.replace(/<from-date([^>]*)>/g, "#{fromDateHtml.replace('ATTRS', '$1')}")
      scope.template = scope.template.replace(/<to-date([^>]*)>/g, "#{toDateHtml.replace('ATTRS', '$1')}")
      scope.template = scope.template.replace(/<apply([^>]*)>/g, "#{applyHtml.replace('ATTRS', '$1')}")

      templatesContainer = element.find('#template-container')
      templatesContainer.html(scope.template).show()
      $compile(templatesContainer.contents())(scope)

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

      scope.onChange = ->
        scope.showApplyButton()
        scope.onChangeCb()(buildDates()) unless _.isUndefined(scope.onChangeCb)

      buildDates = ->
        {
          from: $filter('date')(scope.calendarFrom.value, 'yyyy-MM-dd')
          to: $filter('date')(scope.calendarTo.value, 'yyyy-MM-dd')
          keepToday: isToToday()
        }

      scope.showApplyButton = ->
        if scope.updateOnPick
          scope.applyChanges()
        else
          scope.changed = true

      scope.applyChanges = ->
        ImpacWidgetsSvc.updateWidgetSettings(w, true)
        scope.changed = false

      scope.showTitle = ->
        element.hasClass('part')

      w.settings.push(setting) if w

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)
