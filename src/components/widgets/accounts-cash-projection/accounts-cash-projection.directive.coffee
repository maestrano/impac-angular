module = angular.module('impac.components.widgets.accounts-cash-projection', [])
module.controller('WidgetAccountsCashProjectionCtrl', ($scope, $q, $filter, $timeout, ImpacKpisSvc, ImpacWidgetsSvc, ImpacAssets, HighchartsFactory, BoltResources, ImpacMainSvc) ->

  # == Context and Helpers ========================================================================
  w = $scope.widget

  # Time management
  todayUTC = moment().startOf('day').add(moment().utcOffset(), 'minutes')
  # Used by onZoom callback
  updateLocked = false
  zoomMetadata = {}
  # Stack the invoices and bills based on their age
  w.metadata.ranges = ['-60d', '-30d']

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

  extractContactName = (id, contacts) ->
    contact = _.find contacts, (c) -> c.id == id
    contact.attributes.name

  # Unique identifier for the chart object in the DOM
  $scope.chartId = ->
    "cashProjectionChart-#{w.id}"

  # == Widget Settings ============================================================================
  $scope.orgDeferred = $q.defer()
  settingsPromises = [$scope.orgDeferred.promise]

  # == Sub-Components - Transactions list =========================================================
  $scope.trxList = { display: false, updated: false, transactions: [] }

  # Initialise Contacts
  $scope.contacts = []

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
        sort: '-expected_payment_date'
        currency: w.metadata.currency
      }
    )
    BoltResources.index(w.metadata.bolt_path, $scope.trxList.resources, params).then(
      (response) ->
        # Clear transactions list and replace by newly fetched ones
        _.remove($scope.trxList.transactions, -> true)
        for trx in response.data.data
          if trx.relationships && trx.relationships.contact && trx.relationships.contact.data
            contact_name = extractContactName(trx.relationships.contact.data.id, response.data.included)
          $scope.trxList.transactions.push(angular.merge(trx.attributes, { id: trx.id, contact_name: contact_name || null }))
        $scope.trxList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.trxList.show())

  # Init trxList object with static values
  $scope.trxList.updateParams = (resources, filter) ->
    $scope.trxList.resources = resources
    $scope.trxList.params = { include: 'contact', fields: { contacts: 'name' }, filter: filter }

  # Fetch and show all invoices or bills
  $scope.trxList.showAll = (resources = 'invoices') ->
    filter = {
      status: ['AUTHORISED', 'APPROVED', 'SUBMITTED', 'FORECAST'],
      reconciliation_status: 'UNRECONCILED'
    }
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

  $scope.trxList.deleteTransaction = (resourcesType, trxId) ->
    _.remove($scope.trxList.transactions, (trx) -> trx.id == trxId)
    BoltResources.destroy(
      w.metadata.bolt_path,
      resourcesType,
      trxId
    ).then(-> $scope.trxList.updated = true)

  # == Sub-Components - Trends list =========================================================
  $scope.trendList = { display: false, updated: false, trends: [], params: { } }

  $scope.trendList.show = ->
    $scope.trendList.display = true

  $scope.trendList.hide = ->
    $scope.trendList.display = false
    if $scope.trendList.updated
      ImpacWidgetsSvc.show(w).then(-> $scope.trendList.updated = false)

  # Fetches the trends from the Bolt JSON API endpoint
  $scope.trendList.fetch = (currentPage = 1) ->
    params = angular.merge(
      $scope.trendList.params, {
        metadata: _.pick(w.metadata, 'organization_ids')
        page: { number: currentPage }
      }
    )
    BoltResources.index(w.metadata.bolt_path, 'trends', params).then(
      (response) ->
        # Clear trend list and replace by newly fetched ones
        _.remove($scope.trendList.trends, -> true)
        for trend in response.data.data
          trend.period = 'once' unless trend.period
          $scope.trendList.trends.push(angular.merge(trend.attributes, { id: trend.id }))
        $scope.trendList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.trendList.show())

  # Fetch and show all trends
  $scope.trendList.showAll = ->
    $scope.trendList.fetch()

  $scope.trendList.updateTrend = (trend) ->
    trend.period = null if trend.period == 'once'
    BoltResources.update(
      w.metadata.bolt_path,
      'trends',
      trend.id,
      _.omit(trend, 'id')
    ).then(-> $scope.trendList.updated = true)

  $scope.trendList.deleteTrend = (trendId) ->
    _.remove($scope.trendList.trends, (trend) -> trend.id == trendId)
    BoltResources.destroy(
      w.metadata.bolt_path,
      'trends',
      trendId
    ).then(-> $scope.trendList.updated = true)

  # == Sub-Components - Threshold KPI =============================================================
  $scope.chartDeferred = $q.defer()
  $scope.chartPromise = $scope.chartDeferred.promise
  $scope.chartThresholdOptions = {
    label: 'Get alerted when the cash projection goes below'
  }

  # == Sub-Components - Add Forecast Popup ========================================================
  $scope.addForecastPopup =
    resourcesType: 'invoices'
    display: false
    show: -> this.display = true
    hide: -> this.display = false

  $scope.addForecastPopup.createTransaction = (trx) ->
    BoltResources.create(
      w.metadata.bolt_path,
      this.resourcesType,
      {
        title: trx.name,
        transaction_number: "FOR-#{Math.ceil(Math.random() * 10000)}"
        amount:trx.amount,
        balance: trx.amount,
        transaction_date: moment().format('YYYY-MM-DD'),
        due_date: moment(trx.datePicker.date).format('YYYY-MM-DD'),
        status: 'FORECAST',
        reconciliation_status: 'UNRECONCILED',
        currency: w.metadata.currency
      },
      {
        company: { data: { type: 'companies', id: $scope.firstCompanyId } },
        contact: { data: { type: 'contacts', id: trx.contact.id } }
      }
    ).then(-> ImpacWidgetsSvc.show(w))

  # == Sub-Components - Duplicate Transactions list =========================================================
  $scope.dupTrxList = { display: false, updated: false, transactions: [] }

  $scope.dupTrxList.show = ->
    $scope.dupTrxList.display = true

  $scope.dupTrxList.hide = ->
    $scope.dupTrxList.display = false
    if $scope.dupTrxList.updated
      ImpacWidgetsSvc.show(w).then(-> $scope.dupTrxList.updated = false)

  # Fetches the transactions from the Bolt JSON API endpoint
  $scope.dupTrxList.fetch = (currentPage = 1) ->
    params = angular.merge(
      $scope.dupTrxList.params, {
        metadata: _.pick(w.metadata, 'organization_ids')
        page: { number: currentPage }
      }
    )
    BoltResources.index(w.metadata.bolt_path, $scope.dupTrxList.resources, params).then(
      (response) ->
        # Clear transactions list and replace by newly fetched ones
        _.remove($scope.dupTrxList.transactions, -> true)
        for trx in response.data.data
          $scope.dupTrxList.transactions.push(angular.merge(trx.attributes, { id: trx.id }))
        $scope.dupTrxList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.dupTrxList.show())

  # Init dupTrxList object with static values
  $scope.dupTrxList.updateParams = (resources, filter) ->
    $scope.dupTrxList.resources = resources
    $scope.dupTrxList.params = { filter: filter }

  # Fetch and show all invoices or bills
  $scope.dupTrxList.showAll = (resources = 'invoices') ->
    filter = {
      status: ['FORECAST']
      reconciliation_status: 'RECONCILING'
    }
    $scope.dupTrxList.updateParams(resources, filter)
    $scope.dupTrxList.fetch()

  # Execute action on duplicate transaction
  $scope.dupTrxList.updateDuplicateTransaction = (dupTrxId, action) ->
    _.remove($scope.dupTrxList.transactions, (dupTrx) -> dupTrx.id == dupTrxId)
    BoltResources.update(
      w.metadata.bolt_path,
      $scope.dupTrxList.resources,
      dupTrxId,
      {reconciliation_action: action}
    ).then(-> $scope.dupTrxList.updated = true)

  $scope.dupTrxList.changeResourcesType = (resourcesType) ->
    return if resourcesType == $scope.dupTrxList.resources
    $scope.dupTrxList.resources = resourcesType
    $scope.dupTrxList.fetch()

  # == Sub-Components - Add Trend ========================================================
  $scope.addTrendPopup =
    display: false
    show: -> this.display = true
    hide: -> this.display = false

  $scope.addTrendPopup.lastDate = (offset, periodicity) ->
    period = null
    if offset == -1 then return
    switch periodicity
      when 'once' then return null
      when 'daily' then period = 'days'
      when 'weekly' then period = 'weeks'
      when 'monthly' then period = 'months'
      when 'yearly' then period = 'years'
    moment().add(offset, period).format('YYYY-MM-DD')


  $scope.addTrendPopup.createTrend = (trend) ->
    if Number.isInteger(trend.untilDate)
      last_apply_date = $scope.addTrendPopup.lastDate(trend.untilDate, trend.period)
    else
      last_apply_date = trend.untilDate
    BoltResources.create(
      w.metadata.bolt_path,
      'trends',
      {
        name: trend.name,
        rate: trend.rate
        period: if trend.period == 'once' then null else trend.period,
        start_date: trend.startDate,
        last_apply_date: last_apply_date
      },
      {
        company: { data: { type: 'companies', id: $scope.firstCompanyId } },
        user: { data: { type: 'users', id: $scope.userId } }
      }
    ).then(-> ImpacWidgetsSvc.show(w))

  # == Chart Events Callbacks =====================================================================
  # Sets the transactions list resources type and displays it
  onClickBar = (event) ->
    series = this
    resources = switch(series.userOptions.stack)
      when 'Payables'
        'bills'
      when 'Receivables'
        'invoices'
    return unless resources?

    filter =
      expected_payment_date: dateFilter(event.point.x)
      status: ['AUTHORISED', 'APPROVED', 'SUBMITTED', 'FORECAST'],
      reconciliation_status: 'UNRECONCILED',
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

  onClickLegend = ->
    series = this
    for s in $scope.chart.hc.series
      continue if s.userOptions.linkedTo != series.name
      if series.visible then s.hide() else s.show()

  loadContacts = ->
    BoltResources.index(
      w.metadata.bolt_path,
      'contacts',
      {
        metadata: _.pick(w.metadata, 'organization_ids')
      }
    ).then(
      (response) ->
        $scope.contacts = response.data.data
    )

  createUser = ->
    BoltResources.create(
      w.metadata.bolt_path,
      'users',
      {
        first_name: ImpacMainSvc.config.userData.name,
        last_name: ImpacMainSvc.config.userData.surname
        email: ImpacMainSvc.config.userData.email
      },
      {
        companies: { data: [{ type: 'companies', id: $scope.firstCompanyId }] },
      }
    ).then(
      (response) ->
        $scope.userId = response.data.data.id
    ) if $scope.firstCompanyId

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
    ).then((response) ->
      if _.isEmpty(response.data.data)
        w.demoData = true
      else
        w.demoData = false
        $scope.firstCompanyId = response.data.data[0].id
      loadContacts()
    )

    # Fetch or create user from Bolt
    BoltResources.index(
      w.metadata.bolt_path,
      'users',
      {
        filter: { email: ImpacMainSvc.config.userData.email },
        metadata: _.pick(w.metadata, 'organization_ids')
      }
    ).then((response) ->
      if response.data.meta.record_count > 0
        $scope.userId = response.data.data[0].id
      else
        createUser()
    )

  # Executed after the widget and its settings are initialised and ready
  w.format = ->
    _highChartOptions =
      chartType: 'line'
      currency: w.metadata.currency
      showToday: true

    # Add custom options to the chart before render.
    $scope.chart = new HighchartsFactory($scope.chartId(), w.content.chart.series, _highChartOptions)
    $scope.chart.addCustomLegend(legendFormatter)
    $scope.chart.addSeriesEvent('click', onClickBar)
    $scope.chart.addSeriesEvent('legendItemClick', onClickLegend)
    $scope.chart.addXAxisOptions(({
      defaults: w.metadata.xAxis
      callback: onZoom
      }))

    $scope.chart.render()
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
