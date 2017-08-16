angular
.module('impac.services.highcharts-factory', [])
.factory('HighchartsFactory', ($filter, $timeout)->

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
        @hc = Highcharts.chart(@id, chartConfig,
          (chart)=>
            @addThresholds(chart)
            @renderThresholdTooltip(chart)
        )
      else
        @hc.update(chartConfig)
        @addThresholds(@hc)
        @renderThresholdTooltip(@hc)
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

    addThresholds: (chart, options = @options)->
      return if _.isEmpty(chart)
      # Remove existing thresholds
      _.each(chart.series, (s)-> s.remove() if s.name.toLowerCase().includes('threshold'))
      return chart if _.isEmpty(options.thresholds)
      # Determine the indexes length of the cash projection intervals
      projectionIntervalLength = @data.labels.slice(todayIndex(@data.labels), @data.labels.length).length
      for threshold in options.thresholds
        data = if options.fullLengthThresholds then [] else new Array(@data.labels.length - projectionIntervalLength).fill(null)
        serie =
          name: 'Threshold KPI'
          data: data
          color: _.get(options, 'thresholdsColor', 'rgba(0, 0, 0, 0.7)')
          showInLegend: false
          marker: { enabled: false }
        # Apply threshold properties as series options
        angular.extend(serie, threshold)
        if options.fullLengthThresholds
          # Set the thresholds for all intervals, creating a full length horizontal bar
          thresholdBar = _.map(@data.labels, -> parseFloat(threshold.value))
        else
          # Set the thresholds for the projection intervals, creating a horizontal bar
          thresholdBar = _.map(new Array(projectionIntervalLength), -> parseFloat(threshold.value))
        serie.data.push.apply(serie.data, thresholdBar)
        # Note: series can only be added after initial render via the `addSeries` method.
        chart.addSeries(serie, true)
      chart

    # Render a threshold serie dataLabel when KPI triggered
    renderThresholdTooltip: (chart)->
      thresholdSerie = _.find(chart.series, (s)->
        s.options.triggered && s.name.toLowerCase() == 'threshold kpi'
      )
      return removePointDataLabels(@triggeredPoint) unless thresholdSerie
      cashSerie = _.find(chart.series, (s)-> s.name.toLowerCase() == 'projected cash')

      return removePointDataLabels(@triggeredPoint) unless thresholdSerie.options.triggered
      labelText = 'You have reached your threshold'
      # The first cash projection interval point below the threshold
      @triggeredPoint = cashSerie.points[thresholdSerie.options.triggered_interval_index]
      # Updating dataLabels have no animation, adds delay to improve UI.
      $timeout(=>
        @triggeredPoint.update(
          dataLabels:
            enabled: true
            format: '<span class="threshold-tooltip" style="cursor: pointer;">You have reached you threshold</span>'
            verticalAlign: 'bottom'
            crop: false
            overflow: 'none'
            y: -20
            shape: 'callout'
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
            style:
              color: '#FFFFFF'
              textOutline: 'none'
        )
        angular.element('.threshold-tooltip').on('click', =>
          removePointDataLabels(@triggeredPoint)
        )
      , 1000)

    # Private methods
    # --

    todayIndex = (labels)->
      projection_date = _.find(labels, (date)-> moment(date) >= moment().startOf('day'))
      _.indexOf(labels, projection_date)

    removePointDataLabels = (point)->
      point && _.isFunction(point.update) && point.update(dataLabels: enabled: false)

)
