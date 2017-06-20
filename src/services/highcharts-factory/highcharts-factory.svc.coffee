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
        xAxis:
          startOnTick: false
          minPadding: 0
          tickInterval: 1
          min: 0
        yAxis:
          title: null
          startOnTick: true
          minPadding: 0
        series: series

  class Chart
    constructor: (@id, @data = {}, @options = {})->
      @_template = templates[@options.chartType]
      return

    render: (data, options)->
      @data = data if _.isObject(data)
      angular.extend(@options, options)
      chartConfig = angular.merge({}, @template(), @formatters(), @todayMarker())
      if _.isEmpty(@hc)
        @hc = Highcharts.chart(@id, chartConfig)
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
            $filter('mnoDate')(labels[this.value], options.period)
      yAxis:
        labels:
          formatter: ->
            $filter('mnoCurrency')(this.value, options.currency, false, 0)
      tooltip:
        formatter: ->
          date = $filter('mnoDate')(labels[this.x], options.period)
          amount = $filter('mnoCurrency')(this.y, options.currency, false)
          name = this.series.name
          # If point is in the past, "My Projected Stuff" => "My Stuff"
          if moment(labels[this.x]) < moment().startOf('day')
            name = _.startCase _.trim name.toLowerCase().replace(/\s*projected\s*/, ' ')
          "<strong>#{date}</strong><br>#{name}: #{amount}"

    todayMarker: ->
      return {} unless @options.showToday && !_.isEmpty(@data.labels)
      xAxis:
        plotLines: [{
          color: _.get(@options, 'todayMarkerColor', 'rgba(0, 85, 255, 0.2)')
          value: todayIndex(@data.labels)
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
