module = angular.module('impac.components.widgets-settings.time-slider',[])

module.directive('settingTimeSlider', ($templateCache, $timeout, ImpacMainSvc, ImpacUtilities, ImpacTheming) ->
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
        return ImpacUtilities.getPeriodWord(getPeriod())

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
        return ImpacUtilities.formatPeriod(getNumberOfPeriods(), getPeriod())

      scope.formatDate = (aDate) ->
        settings = ImpacTheming.get()
        if settings.dateFormatterSettings.formats && settings.dateFormatterSettings.formats[setting.key]
          format = settings.dateFormatterSettings.formats[setting.key]
        else
          format = settings.dateFormatterSettings.default

        return aDate.format(format)

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
