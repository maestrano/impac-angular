module = angular.module('impac.components.widgets-settings.time-presets',[])

module.directive('settingTimePresets', ($templateCache, ImpacMainSvc, $timeout) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      presets: '=?'
      onSelect: '&?'
      selectedPreset: '=?selected'
    },
    template: $templateCache.get('widgets-settings/time-presets.tmpl.html'),

    link: (scope) ->
      w = scope.parentWidget

      scope.setting = {}
      scope.setting.key = "time-presets"

      scope.financialYearEndMonth = 6
      fyEndMonth = scope.financialYearEndMonth

      ImpacMainSvc.load().then( -> fyEndMonth = ImpacMainSvc.getFinancialYearEndMonth() ).finally( ->

        financialYearStartYear = moment().year() - 1
        financialYearStartYear = moment().year() if moment().month() >= fyEndMonth
        scope.financialYearStartDate = "#{financialYearStartYear}-#{fyEndMonth + 1}-01"

        # Default presets
        toDate = moment().format('YYYY-MM-DD')
        scope.presets ||= [
          { label: 'Calendar year to date', value:
              from: moment().startOf('year').format('YYYY-MM-DD')
              to: toDate,
              period: 'MONTHLY'
          }
          {
            label: 'Financial year to date', value:
              from: scope.financialYearStartDate
              to: toDate,
              period: 'MONTHLY'
          }
          {
            label: 'Last 6 months', value:
              time_range: '-6m'
              to: toDate
          }
          {
            label: 'Last 4 quarters', value:
              time_range: '-4q'
              to: toDate
          }
          {
            label: 'Last 4 weeks', value:
              time_range: '-4w'
              to: toDate
          }
        ]
      )


      scope.setting.initialize = ->
        return true

      scope.setting.toMetadata = ->
        result = {}
        _.forEach(scope.selectedPreset.value, (value, key) ->
          if angular.isFunction(value)
            result[key] = value(fyEndMonth)
          else
            result[key] = value
        )

        return {
          hist_parameters: result
        }


      w.settings.push(scope.setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(scope.setting)
  }
)
