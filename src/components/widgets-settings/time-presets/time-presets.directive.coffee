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

      scope.setting.initialize = ->
        $timeout ->
          unless scope.presets
            financialYearEndMonth = 6
            ImpacMainSvc.load().then( (config) ->

              if config? && config.currentOrganization? && parseInt(config.currentOrganization.financial_year_end_month)
                financialYearEndMonth = parseInt(config.currentOrganization.financial_year_end_month)

            ).finally( ->

              financialYearStartYear = moment().year() - 1
              financialYearStartYear = moment().year() if moment().month() >= financialYearEndMonth
              scope.financialYearStartDate = "#{financialYearStartYear}-#{financialYearEndMonth + 1}-01"

              toDate = moment().format('YYYY-MM-DD')
              scope.presets = [
                { label: 'Calendar year to date', value:
                    from: moment().startOf('year').format('YYYY-MM-DD')
                    to: toDate
                }
                {
                  label: 'Financial year to date', value:
                    from: scope.financialYearStartDate
                    to: toDate
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


      scope.setting.toMetadata = ->
        return {
          hist_parameters: scope.selectedPreset.value
        }


      w.settings.push(scope.setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(scope.setting)
  }
)
