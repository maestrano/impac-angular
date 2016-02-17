module = angular.module('impac.components.widgets-settings.time-period',[])

module.directive('settingTimePeriod', ($templateCache, $q, $log) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
    },
    template: $templateCache.get('widgets-settings/time-period.tmpl.html'),
    
    link: (scope) ->
      w = scope.parentWidget

      scope.timePeriodSetting =
        key: "time-period"
        settings: []

      # Define children settings
      # --------------------------------------
      scope.timeSliderDeferred = $q.defer()
      scope.datesPickerDeferred = $q.defer()
      scope.timePresetsDeferred = $q.defer()

      settingsPromises = [
        scope.timeSliderDeferred.promise
        scope.datesPickerDeferred.promise
        scope.timePresetsDeferred.promise
      ]

      scope.periods = [
        "DAILY"
        "WEEKLY"
        "MONTHLY"
        "QUARTERLY"
        "YEARLY"
      ]
      scope.presets = [
        "Financial year to date"
        "Calendar year to date"
        "Last 6 months"
        "Last 4 quarters"
        "Last 4 weeks"
      ]


      scope.timePeriodSetting.initialize = ->
        for set in scope.timePeriodSetting.settings
          set.initialize()

      scope.timePeriodSetting.toMetadata = ->
        metadata = 
          hist_parameters: {}


      scope.titleize = (word) ->
        return "#{word.slice(0,1).toUpperCase()}#{word.slice(1).toLowerCase()}"

      scope.test = (metadata) ->
        $log.info(metadata)


      w.settings.push(scope.timePeriodSetting)

      # Setting is ready: trigger load content
      # ------------------------------------
      $q.all(settingsPromises).then -> scope.deferred.resolve(scope.timePeriodSetting)
  }
)
