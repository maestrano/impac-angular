module = angular.module('impac.components.widgets.accounts-expenses-revenue',[])

module.controller('WidgetAccountsExpensesRevenueCtrl', ($scope, $q, ChartFormatterSvc, $filter, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.paramsCheckboxesDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.histModeDeferred.promise
    $scope.chartDeferred.promise
    $scope.paramsCheckboxesDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && w.content.values?

    $scope.displayOptions = [{
      id: 'show_net_profit',
      label: $translate.instant('impac.widget.accounts_expenses_revenue.show_net_profit'),
      value: false,
      onChangeCallback: $scope.toggleDisplayNetProfit
    }]
    if angular.isDefined w.metadata? && w.metadata.display?
      angular.merge $scope.displayOptions, w.metadata.display
    $scope.isNetProfitDisplayed = !!$scope.displayOptions[0].value

  $scope.getCurrentRevenue = ->
    _.sum(w.content.values.revenue) if $scope.isDataFound

  $scope.getCurrentExpenses = ->
    _.sum(w.content.values.expenses) if $scope.isDataFound

  $scope.getCurrency = ->
    w.content.currency if $scope.isDataFound

  $scope.toggleDisplayNetProfit = ->
    $scope.isNetProfitDisplayed = !!$scope.displayOptions[0].value
    $scope.updateSettings(false)
    w.format()


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      if w.isHistoryMode
        period = null
        period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
        dates = _.map w.content.dates, (date) ->
          $filter('momentDate')(date, period)

        if $scope.isNetProfitDisplayed
          datasets = [
            {title: $translate.instant('impac.widget.accounts_expenses_revenue.net_profit') + " (#{$scope.getCurrency()})", values: w.content.values.net_profit },
          ]
          all_values_are_positive = true
          angular.forEach(w.content.values.net_profit, (value) ->
            all_values_are_positive &&= value >= 0
          )

        else
          datasets = [
            {title: $translate.instant('impac.widget.accounts_expenses_revenue.expenses') + " (#{$scope.getCurrency()})", values: w.content.values.expenses },
            {title: $translate.instant('impac.widget.accounts_expenses_revenue.revenue') + " (#{$scope.getCurrency()})", values: w.content.values.revenue },
          ]
          all_values_are_positive = true
          angular.forEach(w.content.values.expenses, (value) ->
            all_values_are_positive &&= value >= 0
          )
          angular.forEach(w.content.values.revenue, (value) ->
            all_values_are_positive &&= value >= 0
          )

        lineData =
          labels: dates
          datasets: datasets

        lineOptions = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
        }
        # chartData = ChartFormatterSvc.lineChart(lineData,lineOptions, true)
        chartData = ChartFormatterSvc.combinedBarChart(lineData,lineOptions, false, true)

      else
        pieData = [
          { label: $translate.instant('impac.widget.accounts_expenses_revenue.expenses') + " (#{$scope.getCurrency()})", value: $scope.getCurrentExpenses() },
          { label: $translate.instant('impac.widget.accounts_expenses_revenue.revenue') + " (#{$scope.getCurrency()})", value: $scope.getCurrentRevenue() },
        ]
        pieOptions = {
          tooltipFontSize: 12,
          percentageInnerCutout: 0,
        }
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions, true)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsExpensesRevenue', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsExpensesRevenueCtrl'
  }
)
