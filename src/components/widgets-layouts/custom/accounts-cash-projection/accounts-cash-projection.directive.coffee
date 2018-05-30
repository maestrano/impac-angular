module = angular.module('impac.components.widgets-layouts.accounts-cash-projection', [])
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


  extractEntityName = (id, entities, type) ->
    entity = _.find entities, (c) -> c.id == id && c.type = type
    entity.attributes.name

  extractTrend = (id, entities) ->
    trend = _.find entities, (c) -> c.id == id && c.type == 'trends'
    if trend.relationships && trend.relationships.account && trend.relationships.account.data
      account_name = extractEntityName(trend.relationships.account.data.id, entities, 'accounts')
    angular.merge(trend.attributes, { id: id, account_name: account_name || null })

  # Unique identifier for the chart object in the DOM
  $scope.chartId = ->
    "cashProjectionChart-#{w.id}"

  # == Widget Settings ============================================================================
  $scope.orgDeferred = $q.defer()
  $scope.sourceDeferred = $q.defer()
  settingsPromises = [
    $scope.orgDeferred.promise,
    $scope.sourceDeferred.promise
  ]

  # == Sub-Components - Transactions list =========================================================
  $scope.trxList = { display: false, updated: false, transactions: [] }

  # Initialise Contacts and Accounts
  $scope.contacts = []
  $scope.accounts = []

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
          contactName = ''
          if trx.relationships && trx.relationships.contact && trx.relationships.contact.data
            contactName = _.find(response.data.included, (includedContact) ->
              includedContact.id == trx.relationships.contact.data.id
            ).attributes.name
          $scope.trxList.transactions.push(angular.merge(trx.attributes, {
            id: trx.id
            contact_name: contactName
          }))
        $scope.trxList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.trxList.show())

  # Init trxList object with static values
  $scope.trxList.updateParams = (resources, filter) ->
    $scope.trxList.resources = resources
    $scope.trxList.params = { include: 'contact', fields: { contacts: 'name' }, filter: filter }

  # Fetch and show all invoices or bills
  $scope.trxList.showAll = (resources = 'invoices') ->
    appUid = $scope.widget.metadata.app_instance_id[0] if $scope.widget.metadata.app_instance_id
    filter = {
      status: ['AUTHORISED', 'APPROVED', 'SUBMITTED', 'FORECAST']
      reconciliation_status: 'UNRECONCILED'
      'app_instance.id': appUid
    }
    $scope.trxList.updateParams(resources, filter)
    $scope.trxList.fetch()

  $scope.trxList.changeQuery = (query) ->
    $scope.trxList.params.filter.query_data = query
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
    BoltResources.destroy(
      w.metadata.bolt_path,
      resourcesType,
      trxId
    ).then(-> $scope.trxList.updated = true)

  $scope.trxList.updateSchedulableTransactions = (resourcesType, trx) ->
    $scope.trxList.updated = true

  $scope.trxList.deleteChildrenTransactions = (resourcesType, trxId) ->
    BoltResources.update(
      w.metadata.bolt_path,
      resourcesType,
      trxId,
      { recurring : false }
    ).then(-> $scope.trxList.updated = true)

  # == Sub-Components - Trends list =========================================================
  $scope.trendList = { display: false, updated: false, trends: [], params: { include: 'trends,trends.account' } }

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
    BoltResources.index(w.metadata.bolt_path, 'trends_groups', params).then(
      (response) ->
        # Clear trend list and replace by newly fetched ones
        _.remove($scope.trendList.trends, -> true)
        for group in response.data.data
          trends = []
          if group.relationships && group.relationships.trends && group.relationships.trends.data
            for trend in group.relationships.trends.data
              trends.push(extractTrend(trend.id, response.data.included))
          $scope.trendList.trends.push(angular.merge(group.attributes, { id: group.id, trends: trends }))
        $scope.trendList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.trendList.show())

  # Fetch and show all trends
  $scope.trendList.showAll = ->
    $scope.trendList.fetch()

  $scope.trendList.updateTrend = (trend) ->
    BoltResources.update(
      w.metadata.bolt_path,
      'trends',
      trend.id,
      _.omit(trend, 'id', 'account_name')
    ).then(-> $scope.trendList.updated = true)

  $scope.trendList.delete = (entityId, resource) ->
    BoltResources.destroy(
      w.metadata.bolt_path,
      resource,
      entityId
    ).then(-> $scope.trendList.updated = true)

  $scope.accountsAverageBalances = (widget) ->
    _.find(widget.configOptions.selectors, (selector) ->
      return selector.name == 'accounts_average_balance'
    ).options


  # == Sub-Components - Threshold KPI =============================================================
  $scope.chartDeferred = $q.defer()
  $scope.chartPromise = $scope.chartDeferred.promise

  # == Sub-Components - Add Forecast Popup ========================================================
  $scope.addForecastPopup =
    resourcesType: 'invoices'
    display: false
    hide: -> this.display = false
    show: -> this.display = true

  $scope.addForecastPopup.createTransaction = (trx, resourcesType) ->
    BoltResources.create(
      w.metadata.bolt_path,
      resourcesType,
      {
        title: trx.title,
        transaction_number: "FOR-#{Math.ceil(Math.random() * 10000)}"
        amount:trx.amount,
        balance: trx.amount,
        transaction_date: moment().format('YYYY-MM-DD'),
        due_date: moment(trx.datePicker.date).format('YYYY-MM-DD'),
        status: 'FORECAST',
        recurring: trx.recurring,
        recurring_pattern: trx.recurring_pattern,
        recurring_end_date: if trx.recurring_end_date then moment(trx.recurring_end_date).format('YYYY-MM-DD') else null
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
    filter['app_instance.id'] = w.metadata.app_instance_id[0] if w.metadata.app_instance_id
    $scope.dupTrxList.updateParams(resources, filter)
    $scope.dupTrxList.fetch()

  # Execute action on duplicate transaction
  $scope.dupTrxList.updateDuplicateTransaction = (dupTrxId, action) ->
    _.remove($scope.dupTrxList.transactions, (dupTrx) -> dupTrx.id == dupTrxId)
    BoltResources.patch(
      w.metadata.bolt_path,
      $scope.dupTrxList.resources,
      dupTrxId,
      action
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

  $scope.addTrendPopup.createTrend = (trend) ->
    relations = {
      user: { data: { type: 'users', id: $scope.userId } },
      trends_group: { data: { type: 'trends_groups', id: trend.trends_group_id } }
    }
    relations['account'] = { data: { type: 'accounts', id: trend.account_id } } if trend.account_id
    BoltResources.create(
      w.metadata.bolt_path,
      'trends',
      {
        name: trend.name,
        rate: trend.rate
        period: trend.period,
        start_date: trend.startDate,
        last_apply_date: trend.untilDate,
        description: trend.description
        account_class: trend.account_class
      },
      relations
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
    img = imgSrc(name)
    return name unless img
    return imgTemplate(img, name) unless name == 'Projected cash'
    imgTemplate(img, name) + '<br>' + imgTemplate(imgSrc('cashFlow'), 'Cash flow')

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

  loadAccounts = ->
    BoltResources.index(
      w.metadata.bolt_path,
      'accounts',
      {
        metadata: _.pick(w.metadata, 'organization_ids'),
        filter: { a_class: 'EXPENSE,REVENUE' }
      }
    ).then(
      (response) ->
        $scope.accounts = response.data.data
    )

  loadTrendsGroups = ->
    BoltResources.index(
      w.metadata.bolt_path,
      'trends_groups',
      {
        metadata: _.pick(w.metadata, 'organization_ids'),
        fields: { trends_groups: 'name'}
      }
    ).then(
      (response) ->
        $scope.trendsGroups = response.data.data
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

  fetchUser = ->
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
        fetchUser()
      loadContacts()
      loadAccounts()
      loadTrendsGroups()
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
