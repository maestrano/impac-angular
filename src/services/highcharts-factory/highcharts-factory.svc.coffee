angular
.module('impac.services.highcharts-factory', [])
.factory('HighchartsFactory', ($filter)->

  templates =
    line: Object.freeze
      get: (series = [], options = {})->
        chart:
          type: 'line'
          zoomType: 'x'
          spacingTop: 20
        title: null
        credits:
          enabled: false
        legend:
          enabled: _.get(options, 'showLegend', true)
          layout: 'vertical'
          align: 'left'
          verticalAlign: 'middle'
        yAxis:
          title: null
          startOnTick: true
          minPadding: 0
        series: series
        rangeSelector:
          buttons: [
            {
              type: 'month'
              count: 1
              text: '1m'
            },
            {
              type: 'month'
              count: 3
              text: '3m'
            },
            {
              type: 'month'
              count: 6
              text: '6m'
            },
            {
              type: 'year'
              count: 1
              text: '1y'
            },
            {
              type: 'all'
              text: 'All'
            }
          ]
          inputEnabled: false


  class Chart
    constructor: (@id, @data = {}, @options = {})->
      @_template = templates[@options.chartType]
      return

    render: (data, options)->
      @data = data if _.isObject(data)
      angular.extend(@options, options)
      chartConfig = angular.merge({}, @template(), @formatters(), @todayMarker())
      if _.isEmpty(@hc)
        @hc = Highcharts.stockChart(@id, chartConfig)
      else
        @hc.update(chartConfig)
      @addThresholds()
      return @

    template: ->
      @_template.get(@data.series, @options)

    formatters: ->
      [labels, options] = [@data.labels, @options]
      xAxis:
        labels:
          formatter: ->
            moment.unix(this.value / 1000).format('Do MMM YYYY')
      yAxis:
        labels:
          formatter: ->
            $filter('mnoCurrency')(this.value, options.currency, false, 0)
      tooltip:
        shared: false
        formatter: ->
          date = moment.unix(this.x / 1000).format('Do MMM YYYY')
          amount = $filter('mnoCurrency')(this.y, options.currency, false)
          name = this.series.name
          # If point is in the past, "My Projected Stuff" => "My Stuff"
          if this.x < moment().startOf('day').unix() * 1000
            name = _.startCase _.trim name.toLowerCase().replace(/\s*projected\s*/, ' ')
          "<strong>#{date}</strong><br>#{name}: #{amount}"

    todayMarker: ->
      return {} unless @options.showToday && !_.isEmpty(@data.labels)
      xAxis:
        plotLines: [{
          color: _.get(@options, 'todayMarkerColor', 'rgba(0, 85, 255, 0.2)')
          value: moment.utc().startOf('day').unix() * 1000  
          width: 1
          label:
            text: null
            verticalAlign: 'top'
            textAlign: 'center'
            rotation: 0
            y: -5
        }]

    addThresholds: (options = @options)->
      return if _.isEmpty(@hc)
      # Remove existing thresholds
      _.each(@hc.series, (s)-> s.remove() if s.name.toLowerCase().includes('threshold'))
      return @hc if _.isEmpty(options.thresholds)
      # Determine the indexes length of the cash projection intervals
      projectionIntervalLength = @data.labels.slice(todayIndex(@data.labels), @data.labels.length).length
      for threshold in options.thresholds
        data = if options.fullLengthThresholds then [] else new Array(@data.labels.length - projectionIntervalLength).fill(null)
        serie =
          name: 'Threshold KPI'
          kpiId: threshold.kpiId
          data: data
          color: _.get(options, 'thresholdsColor', 'rgba(255, 0, 0, 0.5)')
          showInLegend: false
          marker: { enabled: false }
        if options.fullLengthThresholds
          # Set the thresholds for all intervals, creating a full length horizontal bar
          thresholdBar = _.map(@data.labels, -> parseFloat(threshold.value))
        else
          # Set the thresholds for the projection intervals, creating a horizontal bar
          thresholdBar = _.map(new Array(projectionIntervalLength), -> parseFloat(threshold.value))
        serie.data.push.apply(serie.data, thresholdBar)
        # Note: series can only be added after initial render via the `addSeries` method.
        @hc.addSeries(serie, true)
      @hc

    # Private methods
    # --

    todayIndex = (labels)->
      projection_date = _.find(labels, (date)-> moment(date) >= moment().startOf('day'))
      _.indexOf(labels, projection_date)

)
