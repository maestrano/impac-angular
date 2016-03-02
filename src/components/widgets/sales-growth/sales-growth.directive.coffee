module = angular.module('impac.components.widgets.sales-growth',[])

module.controller('WidgetSalesGrowthCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

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
        return {label: product.code, value: product.id}
      ))
      $scope.product = angular.copy(_.find($scope.productOptions, (o) ->
        o.value == w.content.product
      ) || {label: "SELECT PRODUCT", value: -1})

      $scope.filterOptions = [
        {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
        {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
        {label: 'quantity sold', value: 'quantity_sold'},
        {label: 'value purchased (incl. taxes)', value: 'gross_value_purchased'},
        {label: 'value purchased (excl. taxes)', value: 'net_value_purchased'},
        {label: 'quantity purchased', value: 'quantity_purchased'},
      ]
      $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
        o.value == w.content.filter
      ) || $scope.filterOptions[0])

      $scope.isDataQuantity = $scope.filter.value.match('quantity')

  $scope.getSelectedProduct = ->
    return _.find(w.content.summary, (product) ->
      product.id == $scope.product.value
    ) if $scope.isDataFound

  $scope.getCurrentValue = ->
    return _.last($scope.getSelectedProduct().totals) if $scope.getSelectedProduct()?

  $scope.getCurrentDate = ->
    return _.last(w.content.dates) if $scope.isDataFound


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
