module = angular.module('impac.components.widgets.sales-top-customers',[])

module.controller('WidgetSalesTopCustomersCtrl', ($scope, $q, $filter, ImpacUtilities, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.datesPickerDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.datesPickerDeferred.promise
    $scope.paramSelectorDeferred.promise
  ]

  topTmpl = $translate.instant('impac.widget.sales_top_customers.top')

  $scope.limitEntriesOptions = [
    {label: topTmpl.replace(':number:', 5), value: 5},
    {label: topTmpl.replace(':number:', 10), value: 10},
    {label: topTmpl.replace(':number:', 25), value: 25},
    {label: topTmpl.replace(':number:', 50), value: 50},
    {label: topTmpl.replace(':number:', 100), value: 100}
  ]

  $scope.limitEntriesSelected = angular.copy(_.find($scope.limitEntriesOptions, (o) ->
      w.metadata? && (o.value == w.metadata.limit_entries)
    ) || $scope.limitEntriesOptions[3] )

  $scope.headerOptions = [
    {label: $translate.instant('impac.widget.sales_top_customers.total_sales'), value: 'total_sales', minified: 'total'},
    {label: $translate.instant('impac.widget.sales_top_customers.transactions'), value: 'transactions', minified: '# tr'},
    {label: $translate.instant('impac.widget.sales_top_customers.avg_sales'), value: 'avg_sales', minified: 'avg'},
    {label: $translate.instant('impac.widget.sales_top_customers.last_sale'), value: 'last_sale', minified: 'last'}
  ]

  $scope.headerSelected = angular.copy(_.find($scope.headerOptions, (o) ->
      w.metadata? && (w.metadata.header == o.value)
    ) || $scope.headerOptions[0] )

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.entities)
      dates = _.flatten _.map(w.content.entities, ((e) -> _.map(e.invoices, ((i) -> i.invoice_date)) ))

      datesRange = ImpacUtilities.getDatesRange(dates)
      $scope.defaultFrom = $filter('date')(datesRange[0], 'yyyy-MM-dd')
      $scope.defaultTo = $filter('date')(datesRange[1], 'yyyy-MM-dd')

      buildFxTotals()
      $scope.ratesDate = moment.now()


  fields = [
    {
      label: 'total'
      showCurrency: true
      getValue: (entity) ->
        entity.total_invoiced
      getFormattedFxTotals: (entity) ->
        entity.formattedFxTotals
    }
    {
      label: '# tr'
      showCurrency: false
      getValue: (entity) ->
        entity.invoices.length
    }
    {
      label: 'avg'
      showCurrency: true
      getValue: (entity) ->
        total = entity.invoices.length
        if (total > 0) then (entity.total_invoiced / entity.invoices.length) else 0
    }
    {
      label: 'last'
      showCurrency: true
      getValue: (entity) ->
        total = entity.invoices.length
        if (total > 0) then entity.invoices[entity.invoices.length - 1].invoiced else 0
    }
  ]

  $scope.getHeaderField = ->
    _.find(fields, (f) ->
      f.label == $scope.headerSelected.minified
    )

  $scope.getRemainingFields = ->
    _.reject(fields, (f) ->
      f.label == $scope.headerSelected.minified
    )

  $scope.getEntities = ->
    return [] unless $scope.isDataFound
    $filter('orderBy')( w.content.entities, ( (entity) -> $scope.getHeaderField().getValue(entity) ), true )

  buildFxTotals = ->
    for contact in w.content.entities
      contactFxTotals = []
      _.mapKeys contact.fx_totals, (total, currency) ->
        if currency != w.metadata.currency
          contactFxTotals.push({
            currency: currency,
            amount: total.invoiced,
            rate: total.rate  
          })  
      unless _.isEmpty(contactFxTotals)
        contact.formattedFxTotals = contactFxTotals


  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesTopCustomers', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesTopCustomersCtrl'
    link: (scope) ->
      # Hide/show transactions
      scope.transactionsCollapsed = false
      scope.toggleTransactions = ->
        scope.transactionsCollapsed = !scope.transactionsCollapsed
  }
)
