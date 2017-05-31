module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.intervalsOffsetsDeferred = $q.defer()
  $scope.currentOffsetsDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise,
    $scope.timePeriodDeferred.promise,
    $scope.intervalsOffsetsDeferred.promise,
    $scope.currentOffsetsDeferred.promise
  ]
  
  $scope.simulationMode = false
  $scope.intervalsCount = 0

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content.chart?

    # Offset will be applied to all intervals after today
    todayInterval = w.content.chart.series[0].zones[0].value
    $scope.intervalsCount = w.content.chart.labels.length - todayInterval
    
    projectedSerie = _.find w.content.chart.series, (serie) ->
      serie.name == "Projected cash"
    if projectedSerie?
      $scope.currentProjectedCash = projectedSerie.data[todayInterval]

  getPeriod = ->
    w.metadata? && w.metadata.hist_parameters? && w.metadata.hist_parameters.period || 'MONTHLY'

  getTodayMarker = ->
    projection_date = _.find(w.content.chart.labels, (label)-> moment(label) >= moment().startOf('day'))
    _.indexOf(w.content.chart.labels, projection_date)

  $scope.toggleSimulationMode = (init = false) ->
    $scope.initSettings() if init
    $scope.simulationMode = !$scope.simulationMode

  $scope.saveSimulation = ->
    $scope.updateSettings()
    $scope.toggleSimulationMode()

  # Called after initContext - draws the chart using HighCharts
  w.format = ->
    Highcharts.chart 'cashProjectionChart', {
      chart:
        type: 'line'
        zoomType: 'x'
        spacingTop: 20
      title: null
      credits:
        enabled: false
      legend:
        layout: 'vertical'
        align: 'left'
        verticalAlign: 'middle'
      xAxis:
        startOnTick: false
        minPadding: 0
        tickInterval: 1
        labels:
          formatter: ->
            $filter('mnoDate')(w.content.chart.labels[this.value], getPeriod())
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
        }]
      yAxis:
        title: null
        startOnTick: true
        minPadding: 0
        labels:
          formatter: ->
            $filter('mnoCurrency')(this.value, w.metadata.currency, false, 0)
      series: w.content.chart.series
    }

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetAccountsCashProjection', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsCashProjectionCtrl'
  }
)
