module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter, ImpacKpisSvc, ImpacAssets, HighchartsFactory) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.datesPickerDeferred = $q.defer()
  $scope.intervalsOffsetsDeferred = $q.defer()
  $scope.currentOffsetsDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise,
    $scope.datesPickerDeferred.promise,
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

  # Dates picker defaults
  $scope.fromDate = moment().subtract(3, 'months').format('YYYY-MM-DD')
  $scope.toDate = moment().add(1, 'month').format('YYYY-MM-DD')
  $scope.period = 'DAILY'
  $scope.keepToday = false

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    # TODO: what to do when the widget has no data?
    $scope.isDataFound = w.content?

    # Offset will be applied to all intervals after today
    todayInterval = _.findIndex w.content.chart.series[0].data, (vector) ->
      vector[0] >= moment.now()
    $scope.intervalsCount = w.content.chart.series[0].data.length - todayInterval

    projectedSerie = _.find w.content.chart.series, (serie) ->
      serie.name == "Projected cash"

    cashFlowSerie = _.find w.content.chart.series, (serie) ->
      serie.name == "Cash flow"
    cashFlowSerie.data = []
    cashFlowSerie.type = 'area'

    totalOffset = 0.0
    if w.metadata.offset && w.metadata.offset.current && w.metadata.offset.current.length > 0
      totalOffset += _.sum(w.metadata.offset.current)

    if w.metadata.offset && w.metadata.offset.per_interval && w.metadata.offset.per_interval.length > 0
      totalOffset += _.sum(w.metadata.offset.per_interval)

    if projectedSerie?
      $scope.currentProjectedCash = projectedSerie.data[todayInterval] - totalOffset

    $scope.isTimePeriodInThePast = w.metadata.hist_parameters && moment(w.metadata.hist_parameters.to) < moment().startOf('day')

    if hist = w.metadata.hist_parameters
      $scope.fromDate = hist.from
      $scope.toDate = hist.to


  # Sets the transactions list resources type and displays it
  onClickBar = (event) ->
    series = this
    resources = switch(series.name)
      when 'Payables'
        'bills'
      when 'Receivables'
        'invoices'
    return unless resources?
  legendFormatter = ->
    series = this
    imgSrc = ImpacAssets.get(_.camelCase(series.name + 'LegendIcon'))
    "<img src='#{imgSrc}'><br>  #{series.name}"

  w.format = ->
    # Chart basic options
    options =
      chartType: 'line'
      currency: w.metadata.currency
      showToday: true
      showLegend: true
      thresholds: getThresholds()

    $scope.chart ||= new HighchartsFactory($scope.chartId(), w.content.chart, options)
    $scope.chart.render(w.content.chart, options)

    # Chart customization
    $scope.chart.addCustomLegend(legendFormatter)
    $scope.chart.addSeriesEvent('click', onClickBar)

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

  getThresholds = ->
    targets = w.kpis? && w.kpis[0] && w.kpis[0].targets
    return [] unless ImpacKpisSvc.validateKpiTargets(targets)
    [{ kpiId: w.kpis[0].id, value: targets.threshold[0].min }]

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
