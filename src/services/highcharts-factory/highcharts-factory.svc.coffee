angular
.module('impac.services.highcharts-factory', [])
.factory('HighchartsFactory', ($filter)->

  templates =
    line: Object.freeze
      get: (options = {})->
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
        series: _.get(options, 'data.series', [])

  class Chart
    constructor: (@id, @options = {})->
      @_template = templates[@options.chartType]
      return

    render: (options)->
      angular.merge(@options, options)
      chartConfig = angular.merge({},
        @template(@options)
        @formatters(@options)
        @todayMarker(@options)
        @thresholdsMarkers(@options)
      )
      if _.isEmpty(@hc)
        @hc = Highcharts.chart(@id, chartConfig)
      else
        @hc.update(chartConfig)
      return @

    template: (options = {})->
      @_template.get(options)

    formatters: (options = {})->
      xAxis:
        labels:
          formatter: ->
            $filter('mnoDate')(options.data.labels[this.value], options.period)
      yAxis:
        labels:
          formatter: ->
            $filter('mnoCurrency')(this.value, options.currency, false, 0)
      tooltip:
        formatter: ->
          date = $filter('mnoDate')(options.data.labels[this.x], options.period)
          amount = $filter('mnoCurrency')(this.y, options.currency, false)
          name = this.series.name
          # If point is in the past, "My Projected Stuff" => "My Stuff"
          if moment(options.data.labels[this.x]) < moment().startOf('day')
            name = _.startCase _.trim name.toLowerCase().replace(/\s*projected\s*/, ' ')
          "<strong>#{date}</strong><br>#{name}: #{amount}"

    todayMarker: (options = {})->
      return {} unless options.showToday && !_.isEmpty(options.data)
      projection_date = _.find(options.data.labels, (date)-> moment(date) >= moment().startOf('day'))
      todayIndex = _.indexOf(options.data.labels, projection_date)
      xAxis:
        plotLines: [{
          color: _.get(options, 'todayMarkerColor', 'rgba(0, 85, 255, 0.2)')
          value: todayIndex
          width: 1
          label:
            text: null
            verticalAlign: 'top'
            textAlign: 'center'
            rotation: 0
            y: -5
        }]

    thresholdsMarkers: (options = {})->
      return {} if _.isEmpty(options.thresholds)
      lines = []
      for threshold in options.thresholds
        lines.push({
          color: _.get(options, 'thresholdsColor', 'rgba(255, 0, 0, 0.5)')
          value: threshold
          width: 2
          zIndex: 5
        })
      "#{_.get(options, 'thresholdsMarkers.axis', 'yAxis')}":
        plotLines: lines
)
