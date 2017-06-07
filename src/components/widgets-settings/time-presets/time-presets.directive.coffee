module = angular.module('impac.components.widgets-settings.time-presets',[])

module.directive('settingTimePresets', ($templateCache, ImpacMainSvc, $timeout, ImpacUtilities, ImpacTheming, $translate) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      presets: '=?'
      onSelect: '&?'
      onChooseDates: '&?'
      onChoosePeriod: '&?'
      histParams: '=?'
      resetPromise: '=?'
    },
    template: $templateCache.get('widgets-settings/time-presets.tmpl.html'),

    link: (scope) ->
      w = scope.parentWidget

      scope.setting = {}
      scope.setting.key = "time-presets"

      scope.financialYearEndMonth = 6
      fyEndMonth = scope.financialYearEndMonth

      ImpacMainSvc.load().then( -> fyEndMonth = ImpacMainSvc.getFinancialYearEndMonth() ).finally( ->

        fyStartDate = ImpacUtilities.financialYearDates(fyEndMonth).start
        prevFyStartDate = moment(ImpacUtilities.financialYearDates(fyEndMonth).start, 'YYYY-MM-DD').subtract(1, 'year').format('YYYY-MM-DD')
        prevFyEndDate = moment(ImpacUtilities.financialYearDates(fyEndMonth).end, 'YYYY-MM-DD').subtract(1, 'year').format('YYYY-MM-DD')

        # Default presets
        toDate = moment().format('YYYY-MM-DD')

        $translate(['impac.common.period.preset_in_words.calendar_year_to_date',
                    'impac.common.period.preset_in_words.financial_year_to_date',
                    'impac.common.period.preset_in_words.previous_financial_year',
                    'impac.common.period.preset_in_words.last_6_months',
                    'impac.common.period.preset_in_words.last_4_quarters',
                    'impac.common.period.preset_in_words.last_4_weeks',
                    'impac.common.period.preset_in_words.choose_period',
                    'impac.common.period.preset_in_words.choose_dates']).then(
          (translations) ->
            scope.presets ||= [
              {
                label: translations['impac.common.period.preset_in_words.calendar_year_to_date']
                value:
                  from: moment().startOf('year').format('YYYY-MM-DD')
                  to: toDate,
                  period: 'MONTHLY'
              }
              {
                label: translations['impac.common.period.preset_in_words.financial_year_to_date']
                value:
                  from: fyStartDate
                  to: toDate,
                  period: 'MONTHLY'
              }
              {
                label: translations['impac.common.period.preset_in_words.previous_financial_year']
                value:
                  from: prevFyStartDate
                  to: prevFyEndDate,
                  period: 'MONTHLY'
              }
              {
                label: translations['impac.common.period.preset_in_words.last_6_months']
                value:
                  time_range: '-6m'
                  to: toDate
              }
              {
                label: translations['impac.common.period.preset_in_words.last_4_quarters']
                value:
                  time_range: '-4q'
                  to: toDate
              }
              {
                label: translations['impac.common.period.preset_in_words.last_4_weeks']
                value:
                  time_range: '-4w'
                  to: toDate
              }
            ]

            scope.presets.unshift({ label: translations['impac.common.period.preset_in_words.choose_period'], value: 'choose-period' }) if angular.isDefined(scope.onChooseDates) && showSlider()
            scope.presets.unshift({ label: translations['impac.common.period.preset_in_words.choose_dates'], value: 'choose-dates' }) if angular.isDefined(scope.onChooseDates)

        )

      )

      if scope.resetPromise?
        scope.resetPromise.then( null, null, (key) ->
          scope.selectedPreset = _.find( scope.presets, (p) ->
            p.value == key
          )
        )

      showSlider = ->
        ImpacTheming.get().widgetSettings? && ImpacTheming.get().widgetSettings.timePeriod? && ImpacTheming.get().widgetSettings.timePeriod.showSlider

      initPreset = ->
        if scope.histParams?
          # Find if this matches an existing preset
          # TODO: DRY with setting.toMetadata?
          scope.selectedPreset = _.find(scope.presets, (p) ->
            _.every(p.value, (v, k) -> scope.histParams[k] == if angular.isFunction(v) then v(fyEndMonth) else v)
          )

          if !scope.selectedPreset? && scope.histParams.time_range? && showSlider()
            scope.selectedPreset = scope.presets[1]

        unless scope.selectedPreset?
          scope.selectedPreset = scope.presets[0]

      scope.presetSelected = ->
        if scope.selectedPreset? && (scope.selectedPreset.value == "choose-dates")
          scope.onChooseDates()
        else if scope.selectedPreset? && (scope.selectedPreset.value == "choose-period")
          scope.onChoosePeriod()
        else
          scope.onSelect({ histParams: scope.setting.toMetadata().hist_parameters })


      scope.setting.initialize = ->
        initPreset()
        scope.presetSelected()
        return true

      scope.setting.toMetadata = ->
        result = {}
        unless _.isEmpty(scope.selectedPreset.value)
          _.forEach(scope.selectedPreset.value, (value, key) ->
            if angular.isFunction(value)
              result[key] = value(fyEndMonth)
            else
              result[key] = value
          )

        return { hist_parameters: result }


      w.settings.push(scope.setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(scope.setting)
  }
)
