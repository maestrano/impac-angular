module = angular.module('impac.components.widgets.sales-list',[])

module.controller('WidgetSalesListCtrl', ($scope, $q, ChartFormatterSvc, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.datesPickerDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.datesPickerDeferred.promise
  ]

  $scope.ascending = true
  $scope.sortedColumn = 'account'
  $scope.datesPickerTemplate = "<span>from <from-date> to <to-date> <apply></span>"

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)
      buildFxTotals()
      $scope.ratesDate = moment.now()

    $scope.filterOptions = [
      {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
      {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
      {label: 'quantity sold', value: 'quantity_sold'},
      {label: 'value purchased (incl. taxes)', value: 'gross_value_purchased'},
      {label: 'value purchased (excl. taxes)', value: 'net_value_purchased'},
      {label: 'quantity purchased', value: 'quantity_purchased'},
    ]
    $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
      o.value == w.metadata.filter
    ) || $scope.filterOptions[0])

    $scope.unCollapsed = w.metadata.unCollapsed || []
    sortData()

  $scope.toggleCollapsed = (categoryName) ->
    if categoryName?
      if _.find($scope.unCollapsed, ((name) -> categoryName == name))
        $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
          name == categoryName
        )
      else
        $scope.unCollapsed.push(categoryName)
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isCollapsed = (categoryName) ->
    if categoryName?
      if _.find($scope.unCollapsed, ((name) -> categoryName == name))
        return false
      else
        return true

  sortAccountsBy = (getElem) ->
    angular.forEach(w.content.summary, (sElem) ->
      if sElem.products
        sElem.products.sort (a, b) ->
          res = if getElem(a) > getElem(b) then 1
          else if getElem(a) < getElem(b) then -1
          else 0
          res *= -1 unless $scope.ascending
          return res
    )

  sortData = ->
    if $scope.sortedColumn == 'account'
      sortAccountsBy( (el) -> el.name )
    else if $scope.sortedColumn == 'total'
      sortAccountsBy( (el) -> el.total )

  $scope.sort = (col) ->
    if $scope.sortedColumn == col
      $scope.ascending = !$scope.ascending
    else
      $scope.ascending = true
      $scope.sortedColumn = col
    sortData()

  buildFxTotals = ->
    for groupedSales in w.content.summary
      for sale in groupedSales.products
        saleFxTotals = []
        unless _.isEmpty(sale.fx_totals)
          _.mapKeys sale.fx_totals, (total, currency) ->
            amount = total['amount']
            unless amount == 0 || currency == w.metadata.currency
              saleFxTotals.push({
                currency: currency,
                amount: amount,
                rate: total.rate  
              })
        
        sale.formattedFxTotals = saleFxTotals unless _.isEmpty(saleFxTotals)

  # Mini-settings
  # --------------------------------------
  unCollapsedSetting = {}
  unCollapsedSetting.initialized = false

  unCollapsedSetting.initialize = ->
    unCollapsedSetting.initialized = true

  unCollapsedSetting.toMetadata = ->
    {unCollapsed: $scope.unCollapsed}

  w.settings.push(unCollapsedSetting)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesList', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesListCtrl'
  }
)
