module = angular.module('impac.components.widgets.accounts-expense-weight',[])

module.controller('WidgetAccountsExpenseWeightCtrl', ($scope, $q, ChartFormatterSvc, $filter, $translate, $timeout) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.accountBackDeferred = $q.defer()
  $scope.accountFrontDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred
    $scope.accountBackDeferred
    $scope.accountFrontDeferred
    $scope.chartDeferred.promise
    $scope.histModeDeferred.promise
  ]

  $scope.forwardParams = {
    accountingBehaviour: 'pnl'
  }

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && !_.isEmpty(w.content.account_list)
    $scope.forwardParams.histParams = w.metadata && w.metadata.hist_parameters

  $scope.getName = ->
    w.selectedAccount.name if w.selectedAccount?

  $scope.getComparator = ->
    switch w.metadata.comparator
      when 'turnover'
        $translate.instant("impac.widget.account_expense_weight.comparator.turnover")
      else
        $translate.instant("impac.widget.account_expense_weight.comparator.total_exp")

  $scope.displayAccount = ->
    $scope.updateSettings(false).then ->
      $timeout -> (w.format())

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && w.content.summary?
      if w.isHistoryMode
        period = null
        period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
        dates = _.map w.content.dates, (date) ->
          $filter('mnoDate')(date, period)

        datasets = _.map w.content.summary, (s) -> { title: s.company, values: s.ratios }

        all_values_are_positive = true
        angular.forEach(w.content.summary, (s) ->
          angular.forEach(s.ratios, (ratio) ->
            all_values_are_positive &&= ratio >= 0
          )
        )

        lineData =
          labels: dates
          datasets: datasets

        lineOptions = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
          currency: "(ratio)"
        }
        # chartData = ChartFormatterSvc.lineChart(lineData, lineOptions, true)
        chartData = ChartFormatterSvc.combinedBarChart(lineData, lineOptions, false, true)

      else
        companies = _.map w.content.summary, (s) -> s.company
        ratios = _.map w.content.summary, (s) -> s.ratio
        # Display a line instead of a point when only 1 company
        if companies.length == 1
          companies.push(companies[0])
          ratios.push(ratios[0])

        inputData = {labels: companies, values: ratios}

        options = {
          # scaleOverride: true,
          # scaleSteps: 4,
          # scaleStepWidth: 25,
          # scaleStartValue: 0,
          scales: { yAxes: [
            { ticks: {
                suggestedMin: 0
                suggestedMax: 100
                maxTicksLimit: 5
              }
            }
          ]}
          showXLabels: false
          pointDot: false
          currency: '%'
        }
        chartData = ChartFormatterSvc.lineChart([inputData], options)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsExpenseWeight', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsExpenseWeightCtrl'
  }
)
