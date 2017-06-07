module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter, ImpacKpisSvc) ->

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

  # Simulation mode
  $scope.simulationMode = false
  $scope.intervalsCount = 0

  # Attach KPI
  $scope.chartDeferred = $q.defer()
  $scope.chartPromise = $scope.chartDeferred.promise
  $scope.chartThresholdOptions = {
    label: 'Get alerted when the cash projection goes below'
  }

  # TODO: move to a wrapper service (where you can set/get blocks of chart config)
  chartFactory = {
    base: ->
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
        min: 0
      yAxis:
        title: null
        startOnTick: true
        minPadding: 0
    data: ->
      series: w.content.chart.series
    formatters: ->
      xAxis:
        labels:
          formatter: ->
            $filter('mnoDate')(w.content.chart.labels[this.value], getPeriod())
      yAxis:
        labels:
          formatter: ->
            $filter('mnoCurrency')(this.value, w.metadata.currency, false, 0)
      tooltip:
        formatter: ->
          date = $filter('mnoDate')(w.content.chart.labels[this.x], getPeriod())
          amount = $filter('mnoCurrency')(this.y, w.metadata.currency, false)
          name = this.series.name
          # Detect and remove 'Projected' label from 'Projected cash' on intervals less than today.
          if _.include(name.toLowerCase(), 'projected')
            name = 'Cash' if this.series.data.indexOf(this.point) < getTodayMarker()
          "<strong>#{date}</strong><br>#{name}: #{amount}"
    todayMarker: ->
      xAxis:
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
    thresholdMarker: ->
      return unless w.kpis
      yAxis:
        plotLines: [{
          color: 'rgba(255, 0, 0, 0.5)'
          value: getThresholdTarget()
          width: 2
          zIndex: 5
        }]
  }

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    # TODO: what to do when the widget has no data?
    $scope.isDataFound = w.content?

    # Offset will be applied to all intervals after today
    todayInterval = w.content.chart.series[0].zones[0].value
    $scope.intervalsCount = w.content.chart.labels.length - todayInterval

    projectedSerie = _.find w.content.chart.series, (serie) ->
      serie.name == "Projected cash"

    totalOffset = 0.0
    if w.metadata.offset && w.metadata.offset.current && w.metadata.offset.current.length > 0
      totalOffset += _.sum(w.metadata.offset.current)

    if w.metadata.offset && w.metadata.offset.per_interval && w.metadata.offset.per_interval.length > 0
      totalOffset += _.sum(w.metadata.offset.per_interval)

    if projectedSerie?
      $scope.currentProjectedCash = projectedSerie.data[todayInterval] - totalOffset


  w.format = ->
    # Register chart and notify
    if $scope.chart
      # update existing chart with new values
      $scope.chart.update(angular.merge({},
        chartFactory.data(),
        chartFactory.formatters(),
        chartFactory.todayMarker(),
        chartFactory.thresholdMarker()
      ))
    else
      # Build new chart
      $scope.chart = Highcharts.chart($scope.chartId(), angular.merge({},
        chartFactory.base(),
        chartFactory.data(),
        chartFactory.formatters(),
        chartFactory.todayMarker(),
        chartFactory.thresholdMarker()
      ))

    $scope.chartDeferred.notify($scope.chart)
 
  $scope.chartId = -> 
    "cashProjectionChart-#{w.id}"
 
  $scope.toggleSimulationMode = (init = false) -> 
    $scope.initSettings() if init 
    $scope.simulationMode = !$scope.simulationMode 
 
  $scope.saveSimulation = -> 
    $scope.updateSettings() 
    $scope.toggleSimulationMode() 

  # Can be removed once click even is registered in the attach-kpi cmp
  $scope.onAttachKpiInit = ({api})->
    $scope.settingAttachKpiApi = api

  $scope.onAttachedKpi = ({kpi})->
    $scope.chart.update(chartFactory.thresholdMarker())

  # Private

  getPeriod = ->
    w.metadata? && w.metadata.hist_parameters? && w.metadata.hist_parameters.period || 'MONTHLY'

  getTodayMarker = ->
    projection_date = _.find(w.content.chart.labels, (label)-> moment(label) >= moment().startOf('day'))
    _.indexOf(w.content.chart.labels, projection_date)

  getThresholdTarget = ->
    targets = w.kpis[0] && w.kpis[0].targets
    return null unless ImpacKpisSvc.validateKpiTargets(targets)
    targets.threshold[0].min

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
