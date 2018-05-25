angular
.module('impac.services.highcharts-factory', [])
.factory('HighchartsFactory', ($filter)->

  templates =
    line: Object.freeze
      chart:
        type: 'line'
        zoomType: 'x'
        spacingTop: 20
      legend:
        enabled: true
        layout: 'vertical'
        align: 'left'
        verticalAlign: 'middle'
      title: null
      credits:
        enabled: false
      yAxis:
        title: null
        startOnTick: true
        minPadding: 0
        buttons: [
          { type: 'month', count: 4, text: 'def.' },
          { type: 'month', count: 1, text: '1m' },
          { type: 'month', count: 3, text: '3m' },
          { type: 'month', count: 6, text: '6m' },
          { type: 'year', count: 1, text: '1y' },
          { type: 'all', text: 'All' }
        ]

  todayUTC = moment().startOf('day').add(moment().utcOffset(), 'minutes')

  class Chart
    constructor: (@id, @series = {}, @settings = {})->
      # Setup the basic options for highcharts.
      template = templates[@settings.chartType]
      formatters = @formatters(@settings.currency)
      todayMarker = @todayMarker(@settings.showToday, @settings.markerColor)
      onClickCallbacks = @onClickCallbacks(@settings.chartOnClickCallbacks)
      series = { series: @series }
      @highChartOptions = angular.merge({}, series, template, formatters, todayMarker, onClickCallbacks)
      return

    render: () ->
      # Options are already populated in the constructor, and through the options setter methods.
      # It is faster to create a new stockChart than to update an existing one when data changes.
      @hc = Highcharts.stockChart(@id, @highChartOptions)
      return @

    formatters: (currency) ->
      xAxis:
        labels:
          formatter: ->
            e = this.axis.getExtremes()
            f = if moment.utc(e.min).isSame(e.max, 'month') then 'ddd Do' else 'Do MMM'
            moment.utc(this.value).format(f)
      yAxis:
        labels:
          formatter: ->
            $filter('mnoCurrency')(this.value, currency, false, 0)
      tooltip:
        shared: false
        formatter: ->
          date = moment.utc(this.x).format('Do MMM YYYY')
          amount = $filter('mnoCurrency')(this.y, currency, false)
          name = this.series.name
          # If point is in the past, "My Projected Stuff" => "My Stuff"
          if moment(this.x) < todayUTC
            name = _.startCase _.trim name.toLowerCase().replace(/\s*projected\s*/, ' ')
          tooltip = "<strong>#{date}</strong><br>#{name}: #{amount}"
          return tooltip += "#{t}" if (t = this.series.options.tooltipHtml)
          tooltip

    todayMarker: (showToday, markerColor = 'rgba(0, 85, 255, 0.2)') ->
      return {} unless showToday
      xAxis:
        plotLines: [{
          color: markerColor
          value: todayUTC.unix() * 1000
          width: 1
          label:
            text: null
            verticalAlign: 'top'
            textAlign: 'center'
            rotation: 0
            y: -5
        }]

    addThreshold: (thresholdOptions)->
      return if _.isEmpty(@hc)
      # Initialize data matrix
      data = angular.copy @series[0].data
      for vector in data
        # When in the past, set y-axis value at null
        if !thresholdOptions.fullLengthThresholds && moment(vector[0]) < todayUTC
          vector[1] = null
        # When in the future, set y-axis value at thresholdOptions.value
        else
          vector[1] = parseFloat(thresholdOptions.value)
      # Build & add threshold serie
      threshold = angular.extend(
        { data: data, showInLegend: false, marker: { enabled: false } },
        thresholdOptions
      )
      @hc.addSeries(threshold)

    removeThreshold: (kpiId)->
      thresholdSerie = @findThreshold(kpiId)
      thresholdSerie.remove() if thresholdSerie?

    findThreshold: (kpiId)->
      _.find(@hc.series, (s)-> s.options.kpiId == kpiId)

    addThresholdEvent: (thresholdSerie, eventName, callback)->
      return unless thresholdSerie? && eventName? && _.isFunction(callback)
      Highcharts.addEvent(thresholdSerie, eventName, (_event)-> callback(thresholdSerie))

    addCustomLegend: (labelFormatter, useHTML = true, showLegend = true) ->
      legend =
        legend:
          labelFormatter: labelFormatter
          useHTML: useHTML
          enabled: showLegend
      angular.merge(@highChartOptions, legend)

    removeLegend: () ->
      legend =
        legend:
          enabled: false
      angular.merge(@highChartOptions, legend)

    removeNavigator: () ->
      navigator =
        navigator:
          enabled: false
      angular.merge(@highChartOptions, navigator)

    removeRangeSelector: (defaultSelected = 0) ->
      rangeSelector =
        rangeSelector:
          selected: defaultSelected
          enabled: true
      angular.merge(@highChartOptions, rangeSelector)

    addSeriesEvent: (eventName, callback) ->
      eventHash = {}
      eventHash[eventName] = callback
      plotOptions =
        plotOptions:
          series:
            events: eventHash
      angular.merge(@highChartOptions, plotOptions)

    onClickCallbacks: (chartOnClickCallbacks = []) ->
      # We need onClickCallbacks pointing to settings.onClickCallbacks, so that we can add callbacks to the settings later on.
      @settings.chartOnClickCallbacks = chartOnClickCallbacks
      click = (event) -> _.each(@settings.chartOnClickCallbacks, (cb) -> cb(event))
      chart:
        events:
          click: click.bind(@)

    addOnClickCallback: (event) ->
      @settings.chartOnClickCallbacks.push(event)

    addXAxisOptions: (zoomingOptions) ->
      xAxisOptions = if zoomingOptions?
        events:
          setExtremes: zoomingOptions.callback
        max: _.get(zoomingOptions.defaults, 'max')
        min: _.get(zoomingOptions.defaults, 'min')

      xAxis =
        xAxis: xAxisOptions
        rangeSelector:
          selected: (if _.get(xAxisOptions, 'min') then null else 0)

      angular.merge(@highChartOptions, xAxis)
)
