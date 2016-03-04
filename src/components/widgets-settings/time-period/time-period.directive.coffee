module = angular.module('impac.components.widgets-settings.time-period',[])

module.directive('settingTimePeriod', ($templateCache, $q, $log, $timeout) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      histParams: '=?'
    },
    template: $templateCache.get('widgets-settings/time-period.tmpl.html'),
    
    link: (scope) ->
      w = scope.parentWidget

      scope.timePeriodSetting =
        key: "time-period"
        settings: []
        isEditMode: true

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
        # "FYEARLY"
      ]

      # Put at "undefined" to cancel the preset and make it disappear from the dropdown
      resetPreset = ->
        scope.timePeriodSetting.selectedPreset = undefined
        return true
      resetPreset()

      scope.timePeriodSetting.initialize = ->
        # Make sure scope.histParams have been propagated
        $timeout ->
          # for set in scope.timePeriodSetting.settings
          #   set.initialize()
          initPeriod()
          getSetting('time-presets').initialize()
          scope.initUsedSetting()

      scope.timePeriodSetting.toMetadata = ->
        sourceSetting = getSetting(getUsedSettingKey())
        histParams = sourceSetting.toMetadata().hist_parameters if sourceSetting?
        histParams.period = getPeriod()
        histParams.mode = scope.histParams.mode if scope.histParams? && scope.histParams.mode?
        metadata = 
          hist_parameters: histParams

        return metadata


      scope.titleize = (word) ->
        unless word == "FYEARLY"
          return "#{word.slice(0,1).toUpperCase()}#{word.slice(1).toLowerCase()}"
        else
          return "Yearly (financial)"


      getPeriod = ->
        if scope.timePeriodSetting.period? then return scope.timePeriodSetting.period else return initPeriod()

      scope.isTimeSliderUsed = ->
        return getUsedSettingKey() == 'time-slider'

      scope.isDatesPickerUsed = ->
        return getUsedSettingKey() == 'dates-picker'

      getUsedSettingKey = ->
        if scope.usedSetting? then return scope.usedSetting else return scope.initUsedSetting()

      getSetting = (key) ->
        return _.find(scope.timePeriodSetting.settings, (set) ->
          set.key == key
        )

      initPeriod = ->
        if scope.histParams? && scope.histParams.period? && _.contains(scope.periods, scope.histParams.period)
          scope.timePeriodSetting.period = angular.copy(scope.histParams.period)
        else
          scope.timePeriodSetting.period = "MONTHLY"

        return scope.timePeriodSetting.period

      scope.initUsedSetting = (histParams=null) ->
        histParams = scope.histParams unless histParams?
        if histParams? && histParams.from?
          # Force use of setting dates-picker
          scope.usedSetting = 'dates-picker'
          # Update dates
          scope.fromDate = histParams.from
          scope.toDate = histParams.to
          # Initialize dates-picker
          getSetting('dates-picker').initialize()

        else
          # Force use of setting time-slider
          scope.usedSetting = 'time-slider'
          if histParams? && histParams.time_range?
            tr = histParams.time_range
            # Force period to match time range
            pattern = /([a-z])/
            newLetter = pattern.exec(tr)[1]
            scope.timePeriodSetting.period = angular.copy(_.find(scope.periods, (p) ->
              p.slice(0,1).toLowerCase() == newLetter
            ))
            # Update time-range
            scope.timePeriodSetting.timeRange = tr

          # Initialize time-slider
          getSetting('time-slider').initialize()

        return scope.usedSetting

      scope.updateTimeRangePeriod = ->
        if scope.isTimeSliderUsed()
          resetPreset()
          # Force time-range to match period
          set = getSetting('time-slider')
          tr = set.toMetadata().hist_parameters.time_range
          periodLetter = getPeriod().slice(0,1).toLowerCase()
          scope.timePeriodSetting.timeRange = tr.replace(/[a-z]/, periodLetter)
          # Re-initialize time-slider
          set.initialize()

          return scope.timePeriodSetting.timeRange

        else
          return false

      scope.useTimeSlider = ->
        resetPreset()
        scope.usedSetting = 'time-slider'
        # Force time-range to match period
        scope.updateTimeRangePeriod()
        return scope.usedSetting

      scope.useDatesPicker = ->
        resetPreset()
        return scope.usedSetting = 'dates-picker'


      w.settings.push(scope.timePeriodSetting)

      # Setting is ready: trigger load content
      # ------------------------------------
      $q.all(settingsPromises).then -> scope.deferred.resolve(scope.timePeriodSetting)
  }
)
