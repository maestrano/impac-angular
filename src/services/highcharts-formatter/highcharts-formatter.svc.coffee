angular
.module('impac.services.highcharts-formatter', [])
.service('HighChartsFormatter', ($filter) ->
  _self = @

  todayMarker = (dates, showToday) ->
    return {} unless showToday
    projection_date = _.find(dates, (date)-> moment(date) >= moment().startOf('day'))
    todayIndex = _.indexOf(dates, projection_date)

    xAxis:
      plotLines: [{
        color: 'rgba(0, 85, 255, 0.2)'
        value: todayIndex
        width: 1
        label:
          text: null
          verticalAlign: 'top'
          textAlign: 'center'
          rotation: 0
          y: -5
      }]

  thresholdsMarkers = (thresholds) ->
    return {} if _.isEmpty(thresholds)
    lines = []
    for threshold in thresholds
      lines.push({
        color: 'rgba(255, 0, 0, 0.5)'
        value: threshold
        width: 2
        zIndex: 5
      })

    yAxis:
      plotLines: lines

  formatters = (chartData, period, currency) ->
    xAxis:
      labels:
        formatter: ->
          $filter('mnoDate')(chartData.labels[this.value], period)
    yAxis:
      labels:
        formatter: ->
          $filter('mnoCurrency')(this.value, currency, false, 0)
    tooltip:
      formatter: ->
        date = $filter('mnoDate')(chartData.labels[this.x], period)
        amount = $filter('mnoCurrency')(this.y, currency, false)
        name = this.series.name
        # If point is in the past, "My Projected Stuff" => "My Stuff"
        if moment(chartData.labels[this.x]) < moment().startOf('day')
          name = _.startCase _.trim name.toLowerCase().replace(/\s*projected\s*/, ' ')
        "<strong>#{date}</strong><br>#{name}: #{amount}"

  # Creates or update a line chart and add it to your scope
  # options:
  #   id()        (required)
  #   period      (required)
  #   currency    (required)
  #   showToday   (default false)
  #   showLegend  (default false)
  #   thresholds  (default empty)
  @lineChart = (scope, chartData, options) ->
    baseLineChart = 
      chart:
        type: 'line'
        zoomType: 'x'
        spacingTop: 20
      title: null
      credits:
        enabled: false
      legend:
        enabled: options.showLegend
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
      series: chartData.series

    chartConfig = angular.merge(
      baseLineChart,
      todayMarker(chartData.labels, options.showToday),
      thresholdsMarkers(options.thresholds),
      formatters(chartData, options.period, options.currency)
    )

    if _.isEmpty(scope.chart)
      scope.chart = Highcharts.chart(options.id(), chartConfig)
    else
      scope.chart.update(chartConfig)

  return @
)
