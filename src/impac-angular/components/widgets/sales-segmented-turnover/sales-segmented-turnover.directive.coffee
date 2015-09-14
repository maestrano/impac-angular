module = angular.module('impac.components.widgets.sales-segmented-turnover',[])

module.controller('WidgetSalesSegmentedTurnoverCtrl', ($scope, $filter, ChartFormatterSvc) ->

  w = $scope.widget

  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.ranges)

      $scope.filterOptions = [
        {label: 'Gross revenue (incl. taxes)', value: 'gross'},
        {label: 'Net revenue (excl. taxes)', value: 'net'},
      ]
      $scope.filter = _.find($scope.filterOptions, (o) ->
        o.value == w.content.filter
      ) || $scope.filterOptions[0]

  w.format = ->
    if $scope.isDataFound
      barData = {
        labels: _.map(w.content.ranges, (elem) ->
          elem.label
        ),
        values: _.map(w.content.ranges, (elem) ->
          elem.value
        )
      }
      barOptions = {
        showTooltips: false,
        showXLabels: false,
        barDatasetSpacing: 15,
      }
      w.chart = ChartFormatterSvc.barChart(barData, barOptions)

  $scope.getAnalysis = ->
    if $scope.isDataFound
      if w.content.ranges[0].percentage + w.content.ranges[1].percentage > 50
        "Your less expensive products bring you most of your revenue."
      else if w.content.ranges[3].percentage + w.content.ranges[4].percentage > 50
        "Your most expensive products bring you most of your revenue."
      else
        "Your revenue is balanced between your different products segments."

  $scope.getColorByIndex = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.getRangeLabel = (aLabel) ->
    prices = aLabel.split('-')
    _.map(prices, (price) ->
      $filter('mnoCurrency')(price,w.content.currency,false)
    ).join(' - ')

  $scope.getMaxRange = ->
    if $scope.isDataFound
      max = 0
      maxRange = w.content.ranges[0]
      angular.forEach w.content.ranges, (range) ->
        maxRange = angular.copy(range) if range.percentage > max
        max = Math.max(max, range.percentage)

      return maxRange

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

  # Settings: organizations + time range + 1*param-selector + width
  $scope.$watch getSettingsCount, (total) ->
    w.loadContent() if total >= 4

  return w
)

module.directive('widgetSalesSegmentedTurnover', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesSegmentedTurnoverCtrl'
  }
)