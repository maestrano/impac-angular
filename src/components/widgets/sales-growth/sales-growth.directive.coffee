module = angular.module('impac.components.widgets.sales-growth',[])

module.controller('WidgetSalesGrowthCtrl', ($scope, $q, ChartFormatterSvc, $filter, $translate) ->

  w = $scope.widget

  productLineThreshold = 35
  productOptionThreshold = 25

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.paramSelectorDeferred1 = $q.defer()
  $scope.paramSelectorDeferred2 = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.paramSelectorDeferred1.promise
    $scope.paramSelectorDeferred2.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  $scope.isDataQuantity = true
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)
      
      $scope.productOptions = _.flatten(_.map(w.content.summary, (product) ->        
        return {label: $scope.getDisplayName(product, productOptionThreshold), value: product.id}
      ))

      $scope.product = angular.copy(_.find($scope.productOptions, (o) ->
        o.value == w.content.product
      ) || {label: "SELECT PRODUCT", value: -1})

      $translate('impac.widget.sales_growth.select_product').then((result) ->
        $scope.product = angular.copy(_.find($scope.productOptions, (o) ->
          o.value == w.content.product
        ) || {label: result, value: -1})
      )
      
      $translate([
        'impac.widget.sales_growth.value_sold_taxes',
        'impac.widget.sales_growth.value_sold_no_taxes',
        'impac.widget.sales_growth.quantity_sold',
        'impac.widget.sales_growth.value_purchased_taxes',
        'impac.widget.sales_growth.value_purchased_no_taxes',
        'impac.widget.sales_growth.quantity_purchased']).then(
          (translations) ->
            $scope.periodOptions = [
              {label: translations['impac.widget.sales_growth.value_sold_taxes'], value: 'gross_value_sold'},
              {label: translations['impac.widget.sales_growth.value_sold_no_taxes'], value: 'net_value_sold'},
              {label: translations['impac.widget.sales_growth.quantity_sold'], value: 'quantity_sold'},
              {label: translations['impac.widget.sales_growth.value_purchased_taxes'], value: 'gross_value_purchased'},
              {label: translations['impac.widget.sales_growth.value_purchased_no_taxes'], value: 'net_value_purchased'},
              {label: translations['impac.widget.sales_growth.quantity_purchased'], value: 'quantity_purchased'}
            ]

            $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
              o.value == w.content.filter
            ) || $scope.filterOptions[0])
        )
      
      $scope.isDataQuantity = $scope.filter.value.match('quantity')

  $scope.getSelectedProduct = ->
    if $scope.isDataFound
      product = _.find(w.content.summary, (product) ->
        product.id == $scope.product.value
      ) || w.content.summary[0]
      return _.extend(product, {displayName: $scope.getDisplayName(product, productLineThreshold)}) 

  $scope.getCurrentValue = ->
    return _.last($scope.getSelectedProduct().totals) if $scope.getSelectedProduct()?

  $scope.getCurrentDate = ->
    return _.last(w.content.dates) if $scope.isDataFound

  $scope.getDisplayName = (product, threshold) ->
    fullName = if w.content.organizations.length == 1 then product.name else product.company + ' - ' + product.name
    codeName = if w.content.organizations.length == 1 then product.code else product.company + ' - ' + product.code
    return if fullName.length > threshold then codeName else fullName

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.product && data = $scope.getSelectedProduct()

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      inputData = {title: data.name, labels: dates, values: data.totals}
      all_values_are_positive = true
      angular.forEach(data.totals, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false,
      }
      angular.merge(options, {currency: 'hide'}) if $scope.filter.value.indexOf('quantity') > -1
      chartData = ChartFormatterSvc.lineChart([inputData],options)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesGrowth', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesGrowthCtrl'
  }
)
