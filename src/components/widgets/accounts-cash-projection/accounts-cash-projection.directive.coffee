module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter, ImpacKpisSvc, ImpacAssets, HighchartsFactory) ->

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

    $scope.isTimePeriodInThePast = w.metadata.hist_parameters && moment(w.metadata.hist_parameters.to) < moment().startOf('day')


  w.format = ->
    options =
      chartType: 'line'
      currency: w.metadata.currency
      period: getPeriod()
      showToday: true
      showLegend: true
      thresholds: getThresholds()

    $scope.chart ||= new HighchartsFactory($scope.chartId(), w.content.chart, options)
    # Extend default chart formatters to add custom legend img icon
    defaultFormattersConfig = $scope.chart.formatters()
    $scope.chart.formatters = ->
      angular.merge(defaultFormattersConfig, {
        legend:
          useHTML: true
          labelFormatter: ->
            name = this.name
            imgSrc = ImpacAssets.get(_.camelCase(name + 'LegendIcon'))
            img = "<img src='#{imgSrc}'><br>"
            return img + '	' + name
      })

    $scope.chart.render(w.content.chart, options)
    $scope.chartDeferred.notify($scope.chart.hc)

  $scope.chartId = ->
    "cashProjectionChart-#{w.id}"

  $scope.toggleSimulationMode = (init = false) ->
    $scope.initSettings() if init
    $scope.simulationMode = !$scope.simulationMode

  $scope.saveSimulation = ->
    $scope.updateSettings()
    $scope.toggleSimulationMode()

  getPeriod = ->
    w.metadata? && w.metadata.hist_parameters? && w.metadata.hist_parameters.period || 'MONTHLY'

  # No support for multiple KPIs & watchables yet.
  getThresholds = ->
    return unless (kpi = w.kpis && w.kpis[0]) &&
                  (watchable = kpi.watchables && kpi.watchables[0]) &&
                  (targets = watchable && watchable.targets)
    _.map(targets, (t)-> kpiId: kpi.id, value: t.min, triggered: t.trigger_state, triggered_interval_index: t.triggered_interval_index)

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
