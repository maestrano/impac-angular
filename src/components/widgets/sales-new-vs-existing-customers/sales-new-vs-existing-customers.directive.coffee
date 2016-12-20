module = angular.module('impac.components.widgets.sales-new-vs-existing-customers',[])

module.controller('WidgetSalesNewVsExistingCustomersCtrl', ($scope, $q, ChartFormatterSvc, $filter, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timeRangeParamSelectorDeferred = $q.defer()
  $scope.displayTypeParamSelectorDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timeRangeParamSelectorDeferred.promise
    $scope.displayTypeParamSelectorDeferred.promise
    $scope.chartDeferred.promise
  ]

  $scope.displayOptions = [
    {label: $translate.instant('impac.widget.sales_new_vs_existing.customers'), value: 'customers_count'},
    {label: $translate.instant('impac.widget.sales_new_vs_existing.total_sales'), value: 'total_sales'},
    {label: $translate.instant('impac.widget.sales_new_vs_existing.transactions'), value: 'transactions_count'}
  ]

  $scope.displayType = angular.copy(_.find($scope.displayOptions, (o) ->
      w.metadata && (o.value == w.metadata.display_type)
    ) || $scope.displayOptions[0])

  hoursTmpl = $translate.instant('impac.widget.sales_new_vs_existing.tmpl.last_hours')
  daysTmpl = $translate.instant('impac.widget.sales_new_vs_existing.tmpl.last_days')
  
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
      w.metadata && (o.value == w.metadata.time_range)
    ) || $scope.timeRangeOptions[6])
  
  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && w.content.summary? && w.content.summary.customers_count? && 
    w.content.summary.customers_count.total? && w.content.summary.customers_count.total > 0
    

  $scope.displayTypeOnClick = () ->
    $scope.updateSettings(false)
    w.format()

  $scope.getValue = (key) ->
    if $scope.isDataFound

      returnType = $scope.displayType.value
      result = w.content.summary[returnType][key]
      switch returnType
        when 'total_sales'
          return $filter('mnoCurrency')(result, w.metadata.currency)
        else
          return result

  # checks whether front-end should display currency or integer values by displayType options.
  $scope.shouldDisplayCurrency = () ->
    $scope.isDataFound && $scope.displayType.value.indexOf('count') < 0

  $scope.calculatePercentage = (sliceType) ->
    Math.round(
      w.content.summary[$scope.displayType.value][sliceType] / w.content.summary[$scope.displayType.value].total * 100
    )

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      pieData = [
        {
          label: "EXISTING #{$scope.calculatePercentage('existing')}%"
          value: w.content.summary[$scope.displayType.value].existing
        },
        {
          label: "NEW #{$scope.calculatePercentage('new')}%"
          value: w.content.summary[$scope.displayType.value].new
        }
      ]
      pieOptions = {
        percentageInnerCutout: 50,
        tooltipFontSize: 12,
      }
      angular.merge(pieOptions, {currency: 'hide'}) unless $scope.shouldDisplayCurrency()
      chartData = ChartFormatterSvc.pieChart(pieData, pieOptions, true)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------

  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesNewVsExistingCustomers', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesNewVsExistingCustomersCtrl'
  }
)
