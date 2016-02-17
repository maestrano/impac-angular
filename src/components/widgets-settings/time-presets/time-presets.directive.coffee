module = angular.module('impac.components.widgets-settings.time-presets',[])

module.directive('settingTimePresets', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      presets: '=?'
      onSelect: '&?'
      financialYearStartDate: '@?'
    },
    template: $templateCache.get('widgets-settings/time-presets.tmpl.html'),
    
    link: (scope) ->
      w = scope.parentWidget

      scope.setting = {}
      scope.setting.key = "time-presets"

      scope.setting.initialize = ->
        unless scope.financialYearStartDate
          if moment().month() >= 6
            scope.financialYearStartDate = "#{moment().year()}-07-01"
          else
            scope.financialYearStartDate = "#{moment().year()-1}-07-01"

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
        ] unless scope.presets

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
