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
      scope.maxNumberOfPeriods = 20

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
          scope.toDate = histParams.to
          minDate = scope.getMinDate(scope.toDate)
          if moment(histParams.from).isBefore(minDate)
            scope.fromDate = minDate
          else
            scope.fromDate = histParams.from

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

      scope.updateSettings = ->
        resetPreset()
        updateTimeRangePeriod()
        updateFromDate()

      updateTimeRangePeriod = ->
        if scope.isTimeSliderUsed()
          # Force time-range to match period
          set = getSetting('time-slider')
          tr = set.toMetadata().hist_parameters.time_range
          periodLetter = getPeriod().slice(0,1).toLowerCase()
          scope.timePeriodSetting.timeRange = tr.replace(/[a-z]/, periodLetter)
          # Re-initialize time-slider
          set.initialize()

        return scope.timePeriodSetting.timeRange

      updateFromDate = ->
        if scope.isDatesPickerUsed()
          set = getSetting('dates-picker')
          fromDate = set.toMetadata().hist_parameters.from
          toDate = set.toMetadata().hist_parameters.to
          minDate = scope.getMinDate()
          if moment(fromDate).isBefore(minDate)
            scope.toDate = toDate
            scope.fromDate = minDate
            set.initialize()

        return scope.fromDate

      scope.useTimeSlider = ->
        scope.usedSetting = 'time-slider'
        scope.updateSettings()

      scope.useDatesPicker = ->
        scope.usedSetting = 'dates-picker'
        scope.updateSettings()

      scope.getMinDate = (toDate=undefined) ->
        to = moment()
        if toDate?
          to = moment(toDate)
        # Make sure the settings are initialized before trying to retrieve toMetadata()
        else if scope.usedSetting? && scope.isDatesPickerUsed()
          sourceSetting = getSetting('dates-picker')
          to = moment(sourceSetting.toMetadata().hist_parameters.to)

        periodWord = getPeriod().toLowerCase().replace('ly','') + 's'
        periodWord = 'days' if getPeriod() == 'DAILY'

        return to.subtract(scope.maxNumberOfPeriods, periodWord).format('YYYY-MM-DD')


      w.settings.push(scope.timePeriodSetting)

      # Setting is ready: trigger load content
      # ------------------------------------
      $q.all(settingsPromises).then -> scope.deferred.resolve(scope.timePeriodSetting)
  }
)
