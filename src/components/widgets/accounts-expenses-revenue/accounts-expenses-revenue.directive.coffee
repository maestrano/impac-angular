module = angular.module('impac.components.widgets.accounts-expenses-revenue',[])

module.controller('WidgetAccountsExpensesRevenueCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = w.content? && w.content.values?

    w.format = ->
      if $scope.isDataFound
        lineData = [
          {title: "Expenses (#{$scope.getCurrency()})", labels: w.content.dates, values: w.content.values.expenses },
          {title: "Revenue (#{$scope.getCurrency()})", labels: w.content.dates, values: w.content.values.revenue },
        ]
        all_values_are_positive = true
        angular.forEach(w.content.values.expenses, (value) ->
          all_values_are_positive &&= value >= 0
        )
        angular.forEach(w.content.values.revenue, (value) ->
          all_values_are_positive &&= value >= 0
        )
        lineOptions = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
        }
        w.hist_chart = ChartFormatterSvc.lineChart(lineData,lineOptions, true)

        pieData = [
          { label: "Expenses (#{$scope.getCurrency()})", value: $scope.getCurrentExpenses() },
          { label: "Revenue (#{$scope.getCurrency()})", value: $scope.getCurrentRevenue() },
        ]
        pieOptions = {
          tooltipFontSize: 12,
          percentageInnerCutout: 0,
        }
        w.cur_chart = ChartFormatterSvc.pieChart(pieData, pieOptions, true)

    $scope.getCurrentRevenue = ->
      _.last(w.content.values.revenue) if $scope.isDataFound

    $scope.getCurrentExpenses = ->
      _.last(w.content.values.expenses) if $scope.isDataFound

    $scope.getCurrency = ->
      w.content.currency if $scope.isDataFound


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

    # organization_ids + hist mode + time rage
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 3

    return w
)

module.directive('widgetAccountsExpensesRevenue', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsExpensesRevenueCtrl'
  }
)