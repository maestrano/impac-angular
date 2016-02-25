module = angular.module('impac.components.widgets.sales-net-sales',[])

module.controller('WidgetSalesNetSalesCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

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

  $scope.displayOptions = [
    {label: 'Total amount', value: 'total'},
    {label: 'Average amount', value: 'average'},
    {label: 'Volume', value: 'trans_count'},
  ]
  $scope.displayType = angular.copy(_.find($scope.displayOptions, (o) ->
    w.metadata && o.value == w.metadata.display_type
  ) || $scope.displayOptions[0])

  $scope.timeRangeOptions = [
    {label: 'Last 24h', value: '-1d'},
    {label: 'Last 5 days', value: '-5d'},
    {label: 'Last 7 days', value: '-7d'},
    {label: 'Last 30 days', value: '-30d'},
    {label: 'Last 45 days', value: '-45d'},
    {label: 'Last 60 days', value: '-60d'},
    {label: 'Last 90 days', value: '-90d'},
  ]
  $scope.timeRange = angular.copy(_.find($scope.timeRangeOptions, (o) ->
    w.metadata && o.value == w.metadata.time_range
  ) || $scope.timeRangeOptions[6])

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
