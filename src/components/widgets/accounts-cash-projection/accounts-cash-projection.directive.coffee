module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter, ImpacKpisSvc, ImpacWidgetsSvc, ImpacAssets, HighchartsFactory, BoltResources) ->

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

  # Transactions List component
  $scope.trxList = { display: false, updated: false }

  todayUTC = moment().startOf('day').add(moment().utcOffset(), 'minutes')

  $scope.trxList.show = ->
    $scope.trxList.display = true

  $scope.trxList.hide = ->
    $scope.trxList.display = false
    if $scope.trxList.updated
      ImpacWidgetsSvc.show(w).then(-> $scope.trxList.updated = false)

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
        $scope.trxList.transactions = _.map(response.data.data, (trx) ->
          angular.merge(trx.attributes, { id: trx.id })
        )
        $scope.trxList.totalRecords = response.data.meta.record_count
    )

  # JS date is in local time zone => format it to send a UTC date at 00:00:00
  $scope.trxList.updateExpectedDate = (trxId, date) ->
    BoltResources.update(
      w.metadata.bolt_path,
      $scope.trxList.resources,
      trxId,
      { expected_payment_date: moment(date).format('YYYY-MM-DD') }
    ).then(-> $scope.trxList.updated = true)

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    # TODO: what to do when the widget has no data?
    $scope.isDataFound = w.content?

    # Offset will be applied to all intervals after today
    todayInterval = _.findIndex w.content.chart.series[0].data, (dataMat) ->
      dataMat[0] >= todayUTC
    $scope.intervalsCount = w.content.chart.series[0].data.length - todayInterval

    projectedSerie = _.find w.content.chart.series, (serie) ->
      serie.name == "Projected cash"

    cashFlowSerie = _.find w.content.chart.series, (serie) ->
      serie.name == "Cash flow"
    cashFlowSerie.data = []
    cashFlowSerie.type = 'area'
    cashFlowSerie.showInLegend = false

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

  # Timestamps stored in the back-end are in UTC => the filter on the date must be UTC too
  dateFilter = (timestamp) ->
    pickedDate = moment.utc(timestamp)
    if pickedDate <= todayUTC then "lte #{pickedDate.format('YYYY-MM-DD')}" else pickedDate.format('YYYY-MM-DD')

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
        expected_payment_date: dateFilter(event.point.x)
        status: ['AUTHORISED', 'APPROVED', 'SUBMITTED']
    }
    $scope.trxList.fetch().finally(-> $scope.trxList.show())

  imgSrc = (name) -> ImpacAssets.get(_.camelCase(name + 'LegendIcon'))
  imgTemplate = (src, name) -> "<img src='#{src}'><br>#{name}"
  legendFormatter = ->
    name = this.name
    return imgTemplate(imgSrc(name), name) unless name == 'Projected cash'
    imgTemplate(imgSrc(name), name) + '<br>' + imgTemplate(imgSrc('cashFlow'), 'Cash flow')

  onZoom = (event) ->
    metadataHash = angular.merge w.metadata, {
      xAxis:
        max: event.max
        min: event.min
    }
    ImpacWidgetsSvc.update(w, { metadata: metadataHash }, false)

  w.format = ->
    # Chart basic options
    options =
      chartType: 'line'
      chartOnClickCallbacks: []
      currency: w.metadata.currency
      showToday: true
      showLegend: true
      withZooming:
        defaults: w.metadata.xAxis
        callback: onZoom

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
