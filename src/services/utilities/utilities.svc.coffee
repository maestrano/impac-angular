# This service is designed to provide a place for adding generic helper methods used in
# more than once place across the library.
angular
  .module('impac.services.utilities', [])
  .service('ImpacUtilities', ($window, $templateCache) ->

    _       = $window._
    moment  = $window.moment
    _self   = @

    # Find the min & max dates from an array of dates.
    # Mostly used for setting date pickers default to the min &
    # max date of results returned from Connec!.
    # --
    # @params => accepts date-strings or Date objects.
    @getDatesRange = (dates, excludeToday=false) ->
      return [] unless dates && dates.length
      dates = dates.concat [], moment().toDate() unless excludeToday
      minDate = _.min _.map(dates, (d) -> moment(d))
      maxDate = _.max _.map(dates, (d) -> moment(d))
      return [minDate.startOf('day').toDate(), maxDate.startOf('day').toDate()]

    ###
    #   @param {string} Word representation of a period symbol
    #   @returns {string} A time period word
    ###
    @getPeriodWord = (period) ->
      return '' unless angular.isDefined(period)
      switch period.toLowerCase().slice(0,1)
        when "d" then return "day"
        when "w" then return "week"
        when "m" then return "month"
        when "q" then return "quarter"
        when "y" then return "year"
        when "f" then return "financial year"

    ###
    #   @param {string} numberOfPeriods e.g "4"
    #   @param {string} period e.g "w"
    #   @returns {string} number and word formatted for reading e.g "4 weeks"
    ###
    @formatPeriod = (numberOfPeriods="", period="") ->
      if numberOfPeriods > 1
        number = "#{numberOfPeriods}"
        word = "#{_self.getPeriodWord(period)}s"
      return [number,word].join(' ')

    ###
    #   Determines the start and end dates of a selected time period, based on the metadata passed.
    #   @param {Object} histParams - Historical data
    #   @param {string} histParams.from - The "from" Date
    #   @param {string} histParams.to - The "to" Date
    #   @param {string} histParams.time_range - Shorthand of an amount of time periods.
    #   @returns {Object} Object containing formatted "to" and "from" dates.
    ###
    @selectedTimeRange = (histParams) ->
      # Default is Calendar YTD
      toDate = moment().format('YYYY-MM-DD')
      fromDate = moment().startOf('year').format('YYYY-MM-DD')

      if histParams
        if histParams.to
          toDate = histParams.to

        if histParams.from
          fromDate = histParams.from

        # When time-slider is used, hist_parameters.from is not supposed to be defined
        else if histParams.time_range
          n = histParams.time_range.match(/\d/g) && parseInt(histParams.time_range.match(/\d/g).join(''))
          period = histParams.time_range.match(/[a-z]/) && histParams.time_range.match(/[a-z]/)[0]

          word = _self.getPeriodWord(period)
          if period == "w"
            fromDate = moment().subtract(n, word).startOf('isoweek').format('YYYY-MM-DD')
          else
            fromDate = moment().subtract(n, word).startOf(word).format('YYYY-MM-DD')

      resultHash = {
        from: fromDate
        to: toDate
      }

      return resultHash

    @financialYearDates = (fYearEndMonth) ->
      startYear = moment().year() - 1
      startYear = moment().year() if moment().month() >= fYearEndMonth

      start = moment("#{startYear}-#{fYearEndMonth + 1}-01", 'YYYY-MM-DD')
      end = angular.copy(start).add(1, 'year').subtract(1, 'day')

      resultHash = {
        start: start.format('YYYY-MM-DD')
        end: end.format('YYYY-MM-DD')
      }

      return resultHash

    # Parse a Rails model error and return an array of messages
    # ready to be displayed
    # ---
    # TODO: should this be in impac-angular?
    @processRailsError = (error) ->
      messages = []

      if error.status && error.status == 401
        messages.push("Sorry! You are not authorized to perform this action")
      else
        if error.data && error.data != " "
          if angular.isArray(error.data)
            _.each(error.data, (errorMessage) ->
              capitalizedError = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
              messages.push("#{capitalizedError}")
            )
          else if angular.isObject(error.data)
            _.each(error.data, (attrErrors, attribute) ->
              capitalizedAttr = (attribute.charAt(0).toUpperCase() + attribute.slice(1)).replace('_', ' ')
              if angular.isArray(attrErrors)
                _.each(attrErrors, (attrError) ->
                  if capitalizedAttr.match(/base/i)
                    messages.push(attrError)
                  else
                    messages.push("#{capitalizedAttr} #{attrError}")
                )
              else
                if capitalizedAttr.match(/base/i)
                  messages.push(attrErrors)
                else
                  messages.push("#{capitalizedAttr} #{attrErrors}")
            )
          else if angular.isString(error.data)
            messages.push(error.data)
          else
            messages.push("Potentially a system or communication error. Please retry later.")
        else
          messages.push("Potentially a system or communication error. Please retry later.")

      return messages

    # Retrieves the widget content css class name based on metadata or endpoint
    @fetchWidgetCssClass = (widget) ->
      return false unless endpoint = (widget.metadata.template || widget.endpoint)
      # 'accounts/accounting_values/ebitda' => ['accounts','accounting_values']
      templateNameArray = endpoint.split('/').slice(0,2)
      # ['accounts','accounting_values'] => 'accounts-accounting-values'
      return templateNameArray.join('-').replace(/_/g, '-')

    # Retrieves the HTML template path based on metadata or endpoint
    @fetchWidgetTemplatePath = (widget) ->
      return false unless cssClass = _self.fetchWidgetCssClass(widget)
      templatePath = "widgets/#{cssClass}.tmpl.html"
      # Returns the path only if it can be found
      return ($templateCache.get(templatePath) && templatePath)

    return
  )
