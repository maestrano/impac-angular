angular
.module('impac.services.highcharts-factory', [])
.factory('HighchartsFactory', ($filter)->

  templates =
    line: Object.freeze
      get: (series = [], options = {})->

        chartOnClickCallbacks = _.get(options, 'chartOnClickCallbacks', [])
        click = (event) -> _.each(chartOnClickCallbacks, (cb) -> cb(event))

        # Get rid of all the _gets and replace with setter methods below.
        zoomingOptions = _.get(options, 'withZooming')
        xAxisOptions = if zoomingOptions?
          {
            events:
              setExtremes: zoomingOptions.callback
            max: _.get(zoomingOptions.defaults, 'max')
            min: _.get(zoomingOptions.defaults, 'min')
          }

        chart:
          type: 'line'
          zoomType: 'x'
          spacingTop: 20
          events:
            click: click
        plotOptions:
          series:
            events: _.get(options, 'plotOptions.series.events', {})
        title: null
        credits:
          enabled: false
        legend:
          enabled: _.get(options, 'showLegend', true)
          layout: 'vertical'
          align: 'left'
          verticalAlign: 'middle'
          useHTML: _.get(options, 'legend.useHTML', false)
          labelFormatter: _.get(options, 'legend.labelFormatter')
        xAxis: xAxisOptions
        yAxis:
          title: null
          startOnTick: true
          minPadding: 0
        series: series
        rangeSelector:
          buttons: [
            { type: 'month', count: 4, text: 'def.' },
            { type: 'month', count: 1, text: '1m' },
            { type: 'month', count: 3, text: '3m' },
            { type: 'month', count: 6, text: '6m' },
            { type: 'year', count: 1, text: '1y' },
            { type: 'all', text: 'All' }
          ]
          selected: (if _.get(xAxisOptions, 'min') then null else 0)

  todayUTC = moment().startOf('day').add(moment().utcOffset(), 'minutes')

  class Chart
    constructor: (@id, @data = {}, @options = {})->
      @_template = templates[@options.chartType]
      return
    # Remove these arguments from the render method -- this will happen in the constructor.
    render: (data, options)->
      @data = data if _.isObject(data)
      angular.extend(@options, options)
      # Move this into the constructor -- as we will not be populating this here.
      chartConfig = angular.merge({}, @template(), @formatters(), @todayMarker())
      #It is faster to create a new stockChart than to update an existing one.
        #when data changes.
      @hc = Highcharts.stockChart(@id, chartConfig)
      return @

    template: ->
      @_template.get(@data.series, @options)

    formatters: ->
      currency = @options.currency
      xAxis:
        labels:
          formatter: ->
            moment.utc(this.value).format('Do MMM YYYY')
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
          "<strong>#{date}</strong><br>#{name}: #{amount}"

    todayMarker: ->
      return {} unless @options.showToday
      xAxis:
        plotLines: [{
          color: _.get(@options, 'todayMarkerColor', 'rgba(0, 85, 255, 0.2)')
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
      data = angular.copy @data.series[0].data
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
)
