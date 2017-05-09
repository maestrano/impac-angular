module = angular.module('impac.components.widgets.sales-net-sales',[])

module.controller('WidgetSalesNetSalesCtrl', ($scope, $q, ChartFormatterSvc, $filter, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramSelector1Deferred = $q.defer()
  $scope.paramSelector2Deferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramSelector1Deferred.promise
    $scope.paramSelector2Deferred.promise
  ]

  $translate([
    'impac.widget.sales_net_sales.total_amount',
    'impac.widget.sales_net_sales.average_amount',
    'impac.widget.sales_net_sales.volume']).then(
    (translations) ->
      $scope.displayOptions = [
        {label: translations['impac.widget.sales_net_sales.total_amount'], value: 'total'},
        {label: translations['impac.widget.sales_net_sales.average_amount'], value: 'average'},
        {label: translations['impac.widget.sales_net_sales.volume'], value: 'trans_count'},
      ]

      $scope.displayType = angular.copy(_.find($scope.displayOptions, (o) ->
        w.metadata && o.value == w.metadata.display_type
      ) || $scope.displayOptions[0])
  )

  $translate([
    'impac.widget.sales_net_sales.tmpl.last_hours',
    'impac.widget.sales_net_sales.tmpl.last_days']).then(
    (translations) ->
      hoursTmpl = translations['impac.widget.sales_net_sales.tmpl.last_hours']
      daysTmpl = translations['impac.widget.sales_net_sales.tmpl.last_days']
      
      $scope.timeRangeOptions = [
        {label: hoursTmpl.replace(':hours:', 24), value: '-1d'},
        {label: daysTmpl.replace(':days:', 5), value: '-5d'},
        {label: daysTmpl.replace(':days:', 7), value: '-7d'},
        {label: daysTmpl.replace(':days:', 30), value: '-30d'},
        {label: daysTmpl.replace(':days:', 45), value: '-45d'},
        {label: daysTmpl.replace(':days:', 60), value: '-60d'},
        {label: daysTmpl.replace(':days:', 90), value: '-90d'}
      ]

      $scope.timeRange = angular.copy(_.find($scope.timeRangeOptions, (o) ->
        w.metadata && o.value == w.metadata.time_range
      ) || $scope.timeRangeOptions[6])
  )

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && w.content.sales? && w.content.sales.length > 0 && w.content.sales[0].total?

  $scope.getCurrency = ->
    if $scope.isDataFound
      return w.content.currency

  # Return a sales, returns or net result value formatted accroding to the
  # current display type
  # valueType: enum('sales','returns','net_result')
  $scope.getValue = (valueType) ->
    if w.content? && w.content[valueType]
      switch $scope.displayType.value
        when 'total' then $filter('mnoCurrency')(w.content[valueType][0].total,$scope.getCurrency(),false)
        when 'average' then $filter('mnoCurrency')(w.content[valueType][0].avg,$scope.getCurrency(),false)
        when 'trans_count' then w.content[valueType][0].trans_count
    else
      0

  # type: enum('minus','equal')
  $scope.sign = (type)->
    if $scope.displayType.value == 'average'
      { minus: '~', equal: '=>' }[type]
    else if $scope.displayType.value == 'trans_count'
      { minus: '+', equal: '=' }[type]
    else
      { minus: '-', equal: '=' }[type]

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesNetSales', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesNetSalesCtrl',
  }
)
