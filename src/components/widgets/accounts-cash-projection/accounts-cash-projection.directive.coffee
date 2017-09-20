module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter, ImpacKpisSvc, ImpacAssets, HighchartsFactory, BoltResources, ImpacTheming) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.intervalsOffsetsDeferred = $q.defer()
  $scope.currentOffsetsDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise,
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

  # Define metadata for overdue transactions ranges
  settingsRanges = key: 'ranges'
  settingsRanges.initialize = ->
    angular.extend($scope.widget.metadata, this.toMetadata())
  settingsRanges.toMetadata = ->
    ranges: [
      { name: '>60 days', to: moment().subtract(61,'d').format('YYYY-MM-DD') },
      { name: '30-60 days', from: moment().subtract(60,'d').format('YYYY-MM-DD'), to: moment().subtract(30,'d').format('YYYY-MM-DD') },
      { name: '<30 days', from: moment().subtract(29,'d').format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD') }
    ]
  $scope.widget.settings.push(settingsRanges)

  # Transactions List component
  $scope.trxList = { display: false }

  $scope.trxList.show = ->
    $scope.trxList.display = true

  $scope.trxList.hide = ->
    $scope.trxList.display = false

  $scope.trxList.fetch = (currentPage = 1) ->
    params = angular.merge(
      $scope.trxList.params, {
        metadata: _.pick(w.metadata, 'organization_ids')
        page:
          number: currentPage
      }
    )
    BoltResources.index(w.metadata.bolt_path, $scope.trxList.resources, params).then(
      (response) ->
        # Update trxList object with dynamic values
        $scope.trxList.transactions = _.map(response.data.data, (trx) -> trx.attributes)
        $scope.trxList.totalRecords = response.data.meta.record_count
    )


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    # TODO: what to do when the widget has no data?
    $scope.isDataFound = w.content?

    # Offset will be applied to all intervals after today
    todayInterval = _.findIndex w.content.chart.series[0].data, (vector) ->
      vector[0] >= moment.now()
    $scope.intervalsCount = w.content.chart.series[0].data.length - todayInterval

    projectedSerie = _.find(w.content.chart.series, (s) -> s.name == "Projected cash")

    cashFlowSerie = _.find(w.content.chart.series, (s) -> s.name == "Cash flow")
    cashFlowSerie.data = []
    cashFlowSerie.type = 'area'

    $scope.isTimePeriodInThePast = w.metadata.hist_parameters && moment(w.metadata.hist_parameters.to) < moment().startOf('day')

    setStackedSeriesColors(_.select(w.content.chart.series, (s)-> s.stack == 'receivables'), '#89a876')
    setStackedSeriesColors(_.select(w.content.chart.series, (s)-> s.stack == 'payables'), '#d16378')

    totalOffset = 0.0
    if w.metadata.offset && w.metadata.offset.current && w.metadata.offset.current.length > 0
      totalOffset += _.sum(w.metadata.offset.current)

    if w.metadata.offset && w.metadata.offset.per_interval && w.metadata.offset.per_interval.length > 0
      totalOffset += _.sum(w.metadata.offset.per_interval)

    if projectedSerie?
      $scope.currentProjectedCash = projectedSerie.data[todayInterval] - totalOffset

  dateFilter = (timestamp) ->
    pickedDate = moment.unix(timestamp / 1000).format('YYYY-MM-DD')
    if pickedDate == moment().format('YYYY-MM-DD') then "lte #{pickedDate}" else pickedDate

  # Sets the transactions list resources type and displays it
  onClickBar = (event) ->
    series = this
    resources = switch(series.name)
      when 'Payables'
        'bills'
      when 'Receivables'
        'invoices'
    return unless resources?

    # Init trxList object with static values
    $scope.trxList.resources = resources
    $scope.trxList.totalDue = event.point.y
    $scope.trxList.params = {
      filter:
        due_date: dateFilter(event.point.x)
        status: ['AUTHORISED', 'APPROVED', 'SUBMITTED']
    }
    $scope.trxList.fetch().finally(-> $scope.trxList.show())

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

    $scope.chart ||= new HighchartsFactory($scope.chartId(), w.content.chart, options)
    $scope.chart.render(w.content.chart, options)

    # Chart customization
    $scope.chart.addCustomLegend(legendFormatter)
    $scope.chart.addSeriesEvent('click', onClickBar)

    $scope.chartDeferred.notify($scope.chart)

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

  setStackedSeriesColors = (series, color)->
    palette = ImpacTheming.color.generateShadesPalette(color, series.length, reverse: true)
    for serie, i in series
      serie.color = palette[i]

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
