module = angular.module('impac.components.widgets-settings.time-slider',[])

module.directive('settingTimeSlider', ($templateCache, $timeout, ImpacMainSvc, $translate) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      timeRange: '=?'
      onUse: '&?'
    },
    template: $templateCache.get('widgets-settings/time-slider.tmpl.html'),

    link: (scope) ->
      w = scope.parentWidget

      setting = {}
      setting.key = "time-slider"

      PERIODS = ['d','w','m','q','y','f']

      setting.initialize = ->
        # Make sure scope.timeRange has been propagated
        $timeout ->
          initNumberOfPeriods()
          initPeriod()
          initFinancialYearEndMonth()
          return true

      setting.toMetadata = ->
        histParams =
          to: scope.toDate().format('YYYY-MM-DD')
          time_range: getTimeRange()

        histParams.from = scope.fromDate().format('YYYY-MM-DD') if getPeriod() == 'f'

        return { hist_parameters: histParams }

      initNumberOfPeriods = ->
        tr = scope.timeRange
        scope.numberOfPeriods = moment().month()
        return scope.numberOfPeriods unless tr?

        nPattern = /^-?([0-9]{1,2})[a-z]?$/
        n = nPattern.exec(tr)
        scope.numberOfPeriods = parseInt(n[1]) if (n? && n[1] && parseInt(n[1]))

        return scope.numberOfPeriods

      initPeriod = ->
        tr = scope.timeRange
        scope.period = "m"
        return "m" unless tr?

        pPattern = /^-?[0-9]{0,2}([a-z])$/
        p = pPattern.exec(tr)
        period = _.find(PERIODS, (authPeriod) -> (p? && (p[1] == authPeriod)) )
        scope.period = period if period?

        return scope.period

      initFinancialYearEndMonth = ->
        scope.financialYearEndMonth = 6
        ImpacMainSvc.load().then( (config) ->
          if config? && config.currentOrganization? && parseInt(config.currentOrganization.financial_year_end_month)
            scope.financialYearEndMonth = parseInt(config.currentOrganization.financial_year_end_month)
        )

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
          when "f" then return "financial year"

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
        period = getPeriod()
        # Translate the periods
        period_translation = 'impac.common.period.period_in_words.last_x_'
        switch period
          when "d" then period_translation += "days"
          when "w" then period_translation += "weeks"
          when "m" then period_translation += "months"
          when "q" then period_translation += "quarters"
          when "y" then period_translation += "years"
          when "f" then period_translation += "financial_years"
        if n > 1
          $translate(period_translation + '.other', {count: n}).then((translation) -> scope.last_x_period = translation)
        else
          $translate(period_translation + '.one').then((translation) -> scope.last_x_period = translation)
        return

      scope.formatPeriod()

      scope.formatDate = (aDate) ->
        return aDate.format('Do MMM YYYY')

      scope.fromDate = ->
        n = getNumberOfPeriods()
        word = getPeriodWord()
        if word.slice(0,1) == "f"
          financialYearStartYear = moment().year() - 1
          financialYearStartYear = moment().year() if moment().month() >= 6
          financialYearStartYear = financialYearStartYear - n
          return moment("#{financialYearStartYear}-#{scope.financialYearEndMonth + 1}-01", "YYYY-M-DD")

        else if word.slice(0,1) == "w"
          return moment().subtract(n, word).startOf('isoweek')

        else
          return moment().subtract(n, word).startOf(word)

      scope.toDate = ->
        return moment()

      w.settings.push(setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)
