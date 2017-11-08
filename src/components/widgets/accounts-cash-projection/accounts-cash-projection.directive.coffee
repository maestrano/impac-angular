module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter, $timeout  , ImpacKpisSvc, ImpacWidgetsSvc, ImpacAssets, HighchartsFactory, BoltResources) ->

  # == Context and Helpers ========================================================================
  w = $scope.widget

  # Time management
  todayUTC = moment().startOf('day').add(moment().utcOffset(), 'minutes')
  # Used by onZoom callback
  updateLocked = false
  zoomMetadata = {}

  # Timestamps stored in the back-end are in UTC => the filter on the date must be UTC too
  dateFilter = (timestamp) ->
    pickedDate = moment.utc(timestamp)
    if pickedDate <= todayUTC then "lte #{pickedDate.format('YYYY-MM-DD')}" else pickedDate.format('YYYY-MM-DD')

  # Used by legendFormatter
  imgSrc = (name) ->
    ImpacAssets.get(_.camelCase(name + 'LegendIcon'))

  # Used by legendFormatter
  imgTemplate = (src, name) ->
    "<img src='#{src}'><br>#{name}"

  # Unique identifier for the chart object in the DOM
  $scope.chartId = ->
    "cashProjectionChart-#{w.id}"

  # == Widget Settings ============================================================================
  $scope.orgDeferred = $q.defer()
  settingsPromises = [$scope.orgDeferred.promise]

  # == Sub-Components - Transactions list =========================================================
  $scope.trxList = { display: false, updated: false, transactions: [] }

  $scope.trxList.show = ->
    $scope.trxList.display = true

  $scope.trxList.hide = ->
    $scope.trxList.display = false
    if $scope.trxList.updated
      ImpacWidgetsSvc.show(w).then(-> $scope.trxList.updated = false)

  # Fetches the transactions from the Bolt JSON API endpoint
  $scope.trxList.fetch = (currentPage = 1) ->
    params = angular.merge(
      $scope.trxList.params, {
        metadata: _.pick(w.metadata, 'organization_ids')
        page: { number: currentPage }
      }
    )
    BoltResources.index(w.metadata.bolt_path, $scope.trxList.resources, params).then(
      (response) ->
        # Clear transactions list and replace by newly fetched ones
        _.remove($scope.trxList.transactions, -> true)
        for trx in response.data.data
          $scope.trxList.transactions.push(angular.merge(trx.attributes, { id: trx.id }))
        $scope.trxList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.trxList.show())

  # Init trxList object with static values
  $scope.trxList.updateParams = (resources, filter) ->
    $scope.trxList.resources = resources
    $scope.trxList.params = { filter: filter }

  # Fetch and show all invoices or bills
  $scope.trxList.showAll = (resources = 'invoices') ->
    filter = { status: ['AUTHORISED', 'APPROVED', 'SUBMITTED'] }
    $scope.trxList.updateParams(resources, filter)
    $scope.trxList.fetch()

  # JS date is in local time zone => format it to send a UTC date at 00:00:00
  $scope.trxList.updateExpectedDate = (trxId, date) ->
    BoltResources.update(
      w.metadata.bolt_path,
      $scope.trxList.resources,
      trxId,
      { expected_payment_date: moment(date).format('YYYY-MM-DD') }
    ).then(-> $scope.trxList.updated = true)

  $scope.trxList.changeResourcesType = (resourcesType) ->
    return if resourcesType == $scope.trxList.resources
    $scope.trxList.resources = resourcesType
    $scope.trxList.fetch()

  # == Sub-Components - Threshold KPI =============================================================
  $scope.chartDeferred = $q.defer()
  $scope.chartPromise = $scope.chartDeferred.promise
  $scope.chartThresholdOptions = {
    label: 'Get alerted when the cash projection goes below'
  }

  # == Sub-Components - Add Forecast Popup ========================================================
  $scope.addForecastPopup =
    display: false
    trx:
      datePicker:
        opened: false
        date: new Date()
        toggle: -> this.opened = !this.opened
    resourcesType: 'invoices'
    hide: -> this.display = false
    show: -> this.display = true
    isValid: -> !_.isEmpty(this.trx.name) && !isNaN(Number(this.trx.amount)) && Number(this.trx.amount) != 0
    createTransaction: ->
      this.hide()
      BoltResources.create(
        w.metadata.bolt_path,
        this.resourcesType,
        {
          title: this.trx.name,
          amount: this.trx.amount,
          balance: this.trx.amount,
          transaction_date: moment(),
          due_date: this.trx.datePicker.date,
          status: 'FORECAST',
          currency: w.metadata.currency
        },
        { company: { data: { type: 'companies', id: $scope.firstCompanyId } } }
      )

  $scope.tempDate = moment().add(10, 'weeks').toDate()

  # == Chart Events Callbacks =====================================================================
  # Sets the transactions list resources type and displays it
  onClickBar = (event) ->
    series = this
    resources = switch(series.name)
      when 'Payables'
        'bills'
      when 'Receivables'
        'invoices'
    return unless resources?

    filter =
      expected_payment_date: dateFilter(event.point.x)
      status: ['AUTHORISED', 'APPROVED', 'SUBMITTED']
    $scope.trxList.updateParams(resources, filter)
    $scope.trxList.fetch()

  # Add custom images to legend entries (images are fetched from the Assets service)
  legendFormatter = ->
    name = this.name
    return imgTemplate(imgSrc(name), name) unless name == 'Projected cash'
    imgTemplate(imgSrc(name), name) + '<br>' + imgTemplate(imgSrc('cashFlow'), 'Cash flow')

  # Persists the zooming options on user selection (call to MnoHub to update the metadata)
  onZoom = (event) ->
    zoomMetadata = angular.merge w.metadata, {
      xAxis:
        max: event.max
        min: event.min
    }
    unless updateLocked
      updateLocked = true
      $timeout ->
        ImpacWidgetsSvc.update(w, { metadata: zoomMetadata }, false).finally(-> updateLocked = false)
      , 1000

  # == Widget =====================================================================================
  # Executed after the widget content is retrieved from the API
  w.initContext = ->
    # Hide Cash Flow series returned by the API
    cashFlowSerie = _.find w.content.chart.series, (serie) ->
      serie.name == "Cash flow"
    cashFlowSerie.data = []
    cashFlowSerie.type = 'area'
    cashFlowSerie.showInLegend = false

    # Fetch companies from Bolt and save first id
    # TODO: multi-companies?
    BoltResources.index(
      w.metadata.bolt_path,
      'companies',
      { metadata: _.pick(w.metadata, 'organization_ids') }
    ).then((response) -> $scope.firstCompanyId = response.data.data[0].id)

  # Executed after the widget and its settings are initialised and ready
  w.format = ->
    # Instantiate and render chart
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

    # Add events callbacks to chart object
    $scope.chart.addCustomLegend(legendFormatter)
    $scope.chart.addSeriesEvent('click', onClickBar)

    # Notifies parent element that the chart is ready to be displayed
    $scope.chartDeferred.notify($scope.chart)

  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsCashProjection', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsCashProjectionCtrl'
  }
)
