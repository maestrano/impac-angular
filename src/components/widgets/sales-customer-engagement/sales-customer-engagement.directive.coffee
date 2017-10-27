module = angular.module('impac.components.widgets.sales-customer-engagement', [])
module.controller('WidgetSalesCustomerEngagementCtrl', ($scope, $q, $filter, ImpacKpisSvc, ImpacWidgetsSvc, ImpacAssets, HighchartsFactory, BoltResources) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramSelectorDeferred.promise
  ]

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
        $scope.trxList.customers = _.map(response.data.data, (trx) ->
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

    if $scope.isDataFound
      offers = (w.content.grouped_table? && w.content.grouped_table.groups[0]) || []
      $scope.filterOptions = _.map offers, (offer)-> { label: offer.name, value: offer.id }
      $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
          w.metadata && w.metadata.selected_offer == o.value
        ) || $scope.filterOptions[0])

  # Timestamps stored in the back-end are in UTC => the filter on the date must be UTC too
  dateFilter = (timestamp) ->
    pickedDate = moment.utc(timestamp)
    if pickedDate <= todayUTC then "lte #{pickedDate.format('YYYY-MM-DD')}" else pickedDate.format('YYYY-MM-DD')

  # Sets the customers list resources type and displays it
  onClickBar = (event) ->
    series = this
    resources = 'customers' if series.name.toLowerCase() == 'number of customers'
    return unless resources?

    # # Init trxList object with static values
    $scope.trxList.resources = resources
    $scope.trxList.params =
      filter:
        interval_end_date: moment.utc(event.point.x).toISOString()
        selected_offer: w.metadata.selected_offer
    $scope.trxList.fetch().finally(-> $scope.trxList.show())

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
      showToday: false
      showLegend: true
      withZooming:
        defaults: w.metadata.xAxis
        callback: onZoom

    $scope.chart ||= new HighchartsFactory($scope.chartId(), w.content.chart, options)
    defaultFormatters = $scope.chart.formatters()
    $scope.chart.formatters = ->
      currency = @options.currency
      primaryYAxis = angular.merge(
        offset: 30,
        labels: formatter: -> $filter('mnoCurrency')(this.value, currency, false)
        defaultFormatters.yAxis
      )
      tooltip:
        shared: false
        formatter: ->
          name = this.series.name
          date = moment.utc(this.x).format('Do MMM YYYY')
          amount = if _.get(this.series.options, 'yAxis') == 0
            amount = $filter('mnoCurrency')(this.y, currency, false)
          else
            this.y
          "<strong>#{date}</strong><br>#{name}: #{amount}"
      xAxis: defaultFormatters.xAxis
      yAxis: [
        primaryYAxis
        labels:
          format: '{value}'
          style:
            color: '#a1a2a3'
      ]
    $scope.chart.render(w.content.chart, options)
    # Chart customization
    $scope.chart.addSeriesEvent('click', onClickBar)
    return


  $scope.chartId = ->
    "customerEngagementChart-#{w.id}"

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetSalesCustomerEngagement', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesCustomerEngagementCtrl'
  }
)
