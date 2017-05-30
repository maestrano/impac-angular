#
# Component generated by Impac! Widget Generator!
# TODO:
# - colour shades by account sub-type (don't spend too much time on this one / not that important)
# - check if a different chart can be used for better time period selection
#
module = angular.module('impac.components.widgets.accounts-cash-balance', [])
module.controller('WidgetAccountsCashBalanceCtrl', ($scope, $q, $timeout, $filter, ImpacTheming) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise,
    $scope.timePeriodDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = w.content?

      # Custom chart legend
      $scope.groupedTable = w.content.grouped_table

      # TODO: theming config for positive/negative hex codes (or move to API)
      # chartColors = ImpacTheming.get().chartColors

      # Set chart accounts series colors by account bias ('positive' / 'negative')
      setSeriesColors(w.content.chart.series, {'positive': '#3FC4FF', 'negative': '#e50228'})

      # Wait for the next digest cycle to ensure the chart parent (.data-container) is shown.
      $timeout(->
        $scope.chart = buildChart(w.content.chart)
      )

  $scope.legendItemOnClick = (account)->
    serie = $scope.chart && getSerieByAccount($scope.chart.series, account)
    return unless serie
    visibility = if serie.visible then false else true
    serie.setVisible(visibility)

  $scope.getLegendItemIcon = (account)->
    serie = $scope.chart && getSerieByAccount($scope.chart.series, account)
    return 'fa-check-square-o' unless serie
    if serie.visible then 'fa-check-square-o' else 'fa-square-o'

  $scope.getLegendItemColor = (account)->
    serie = $scope.chart && getSerieByAccount($scope.chart.series, account)
    return '#000' unless serie
    serie.color

  # Private
  # ----

  getPeriod = ->
    w.metadata? && w.metadata.hist_parameters? && w.metadata.hist_parameters.period || 'MONTHLY'

  getSerieByAccount = (series, account)->
    _.find(series, (serie)-> (serie.id || serie.options && serie.options.id) == account.id)

  getTodayMarker = ->
    projection_date = _.find(w.content.chart.labels, (label)-> moment(label) >= moment().startOf('day'))
    _.indexOf(w.content.chart.labels, projection_date)

  setSeriesColors = (series, chartColors) ->
    groupedSeries = _.groupBy(series, (serie)-> serie.bias)
    for bias, series of groupedSeries
      continue unless chartColors[bias]
      palette = ImpacTheming.color.generateShadesPalette(chartColors[bias], series.length)
      for serie, i in series
        serie.color = palette[i]

  buildChart = (data, onRender)->
    options =
      chart:
        type: 'line'
        zoomType: 'x'
        spacingTop:20
      title: null
      credits:
        enabled: false
      legend:
        enabled: false
      scrollbar:
        enabled: true
      xAxis:
        startOnTick: false
        minPadding: 0
        tickInterval: 1
        labels:
          style: textOverflow: 'none'
          formatter: ()->
            $filter('mnoDate')(data.labels[this.value], getPeriod())
        plotLines: [{
          color: 'rgba(0, 85, 255, 0.2)'
          value: getTodayMarker()
          width: 1
          label:
            text: null
            verticalAlign: 'top'
            textAlign: 'center'
            rotation: 0
            y: -5
            x: -2
        }]
      yAxis:
        startOnTick: true
        minPadding: 0
        title: null
        labels:
          formatter: ()->
            $filter('mnoCurrency')(this.value, w.metadata.currency, false, 0)
      series: data.series

    Highcharts.chart('cashBalanceChart', options, onRender)


  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetAccountsCashBalance', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsCashBalanceCtrl'
  }
)
