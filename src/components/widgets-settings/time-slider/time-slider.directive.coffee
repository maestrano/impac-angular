module = angular.module('impac.components.widgets-settings.time-slider',[])

module.directive('settingTimeSlider', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      timeRange: '@?'
    },
    template: $templateCache.get('widgets-settings/time-slider.tmpl.html'),
    
    link: (scope) ->
      w = scope.parentWidget

      setting = {}
      setting.key = "time-slider"

      PERIODS = ['d','w','m','q','y']

      setting.initialize = ->
        initNumberOfPeriods()
        initPeriod()
        return true

      setting.toMetadata = ->
        return {
          hist_parameters: 
            to: moment().format('YYYY-MM-DD')
            time_range: getTimeRange()
        }


      initNumberOfPeriods = ->
        tr = scope.timeRange
        scope.numberOfPeriods = 6
        return 6 unless tr?
          
        nPattern = /^-?([0-9]{1,2})[a-z]$/
        n = nPattern.exec(tr)
        scope.numberOfPeriods = parseInt(n[1]) if (n? && n[1] && parseInt(n[1]))
        
        return scope.numberOfPeriods

      initPeriod = ->
        tr = scope.timeRange
        scope.period = "m"
        return "m" unless tr?
          
        pPattern = /^-?[0-9]{1,2}([a-z])$/
        p = pPattern.exec(tr)
        period = _.find(PERIODS, (authPeriod) -> (p? && (p[1] == authPeriod)) )
        scope.period = period if period?

        return scope.period

      getPeriod = ->
        if scope.period?
          return scope.period
        else
          return initPeriod()

      getPeriodWord = ->
        period = getPeriod()
        switch period
          when "d" then return "day"
          when "w" then return "week"
          when "m" then return "month"
          when "q" then return "quarter"
          when "y" then return "year"

      getNumberOfPeriods = ->
        if scope.numberOfPeriods?
          return scope.numberOfPeriods
        else
          return initNumberOfPeriods()

      getTimeRange = ->
        n = getNumberOfPeriods()
        p = getPeriod()
        return "-#{n}#{p}"


      scope.formatPeriod = ->
        n = getNumberOfPeriods()
        
        number = ""
        word = getPeriodWord()
        if n > 1
          number = "#{n}"
          word = "#{word}s"

        return [number,word].join(' ')

      scope.fromDate = ->
        n = getNumberOfPeriods()
        word = getPeriodWord()
        return moment().subtract(n, word).startOf(word).format('Do MMM YYYY')

      scope.toDate = ->
        return moment().format('Do MMM YYYY')


      w.settings.push(setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)
