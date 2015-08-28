module = angular.module('maestrano.analytics.widget-sales-growth',[])

module.controller('WidgetSalesGrowthCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc',
  ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    $scope.isDataQuantity = true

    $scope.getSelectedProduct = ->
      return _.find(w.content.summary, (product) ->
        product.id == $scope.product.value
      ) if $scope.isDataFound

    $scope.getCurrentValue = ->
      return _.last($scope.getSelectedProduct().totals) if $scope.getSelectedProduct()?

    $scope.getCurrentDate = ->
      return _.last(w.content.dates) if $scope.isDataFound

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)

        $scope.productOptions = _.flatten(_.map(w.content.summary, (product) ->
          return {label: product.code, value: product.id}
        ))
        $scope.product = _.find($scope.productOptions, (o) ->
          o.value == w.content.product
        ) || {label: "SELECT PRODUCT", value: -1}

        $scope.filterOptions = [
          {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
          {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
          {label: 'quantity sold', value: 'quantity_sold'},
          {label: 'value purchased (incl. taxes)', value: 'gross_value_purchased'},
          {label: 'value purchased (excl. taxes)', value: 'net_value_purchased'},
          {label: 'quantity purchased', value: 'quantity_purchased'},
        ]
        $scope.filter = _.find($scope.filterOptions, (o) ->
          o.value == w.content.filter
        ) || $scope.filterOptions[0]

        $scope.isDataQuantity = $scope.filter.value.match('quantity')

    w.format = ->
      if $scope.isDataFound && $scope.product && data = $scope.getSelectedProduct()
        inputData = {title: data.name, labels: w.content.dates, values: data.totals}
        all_values_are_positive = true
        angular.forEach(data.totals, (value) ->
          all_values_are_positive &&= value >= 0
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
        }
        w.chart = ChartFormatterSvc.lineChart([inputData],options)


    # TODO: Refactor once we have understood exactly how the angularjs compilation process works:
    # in this order, we should:
    # 1- compile impac-widget controller
    # 2- compile the specific widget template/controller
    # 3- compile the settings templates/controllers
    # 4- call widget.loadContent() (ideally, from impac-widget, once a callback
    #     assessing that everything is compiled an ready is received)
    getSettingsCount = ->
      if w.settings?
        return w.settings.length
      else
        return 0

    # organization_ids + time rage + x2 param selector (product, filter)
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 4

    return w
])

module.directive('widgetSalesGrowth', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("sales")
      element.addClass("growth")
    ,controller: 'WidgetSalesGrowthCtrl'
  }
)