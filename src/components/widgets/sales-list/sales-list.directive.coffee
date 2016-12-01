module = angular.module('impac.components.widgets.sales-list',[])

module.controller('WidgetSalesListCtrl', ($scope, $q, ChartFormatterSvc, ImpacWidgetsSvc, $translate) ->

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
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)

    $translate([
      'impac.widget.sales_list.value_sold_taxes',
      'impac.widget.sales_list.value_sold_no_taxes',
      'impac.widget.sales_list.quantity_sold',
      'impac.widget.sales_list.value_purchased_taxes',
      'impac.widget.sales_list.value_purchased_no_taxes',
      'impac.widget.sales_list.quantity_purchased']).then(
      (translations) ->
        $scope.filterOptions = [
          {label: translations['impac.widget.sales_list.value_sold_taxes'], value: 'gross_value_sold'},
          {label: translations['impac.widget.sales_list.value_sold_no_taxes'], value: 'net_value_sold'},
          {label: translations['impac.widget.sales_list.quantity_sold'], value: 'quantity_sold'},
          {label: translations['impac.widget.sales_list.value_purchased_taxes'], value: 'gross_value_purchased'},
          {label: translations['impac.widget.sales_list.value_purchased_no_taxes'], value: 'net_value_purchased'},
          {label: translations['impac.widget.sales_list.quantity_purchased'], value: 'quantity_purchased'}
        ]

        $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
          o.value == w.metadata.filter
        ) || $scope.filterOptions[0])
    )
    
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
