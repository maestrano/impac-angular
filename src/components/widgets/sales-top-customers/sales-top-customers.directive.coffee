module = angular.module('impac.components.widgets.sales-top-customers',[])

module.controller('WidgetSalesTopCustomersCtrl', ($scope, $q, $filter, ImpacUtilities) ->

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

  $scope.limitEntriesOptions = [
    { label: 'TOP - 5', value: 5 }
    { label: 'TOP - 10', value: 10 }
    { label: 'TOP - 25', value: 25 }
    { label: 'TOP - 50', value: 50 }
    { label: 'TOP - 100', value: 100 }
  ]
  $scope.limitEntriesSelected = angular.copy(_.find($scope.limitEntriesOptions, (o) ->
    w.metadata? && (o.value == w.metadata.limit_entries)
  ) || $scope.limitEntriesOptions[3] )

  $scope.headerOptions = [
    { label: 'Total sales', value: 'total_sales', minified: 'total' }
    { label: 'Transactions', value: 'transactions', minified: '# tr' }
    { label: 'Avg sales', value: 'avg_sales', minified: 'avg' }
    { label: 'Last sale', value: 'last_sale', minified: 'last' }
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


  fields = [
    {
      label: 'total'
      showCurrency: true
      getValue: (entity) ->
        entity.total_invoiced
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
