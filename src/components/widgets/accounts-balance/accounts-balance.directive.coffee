module = angular.module('impac.components.widgets.accounts-balance',[])

module.controller('WidgetAccountsBalanceCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.accountBackDeferred = $q.defer()
  $scope.accountFrontDeferred = $q.defer()
  $scope.accountingBehaviourDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.accountBackDeferred
    $scope.accountFrontDeferred
    $scope.accountingBehaviourDeferred
    $scope.timePeriodDeferred.promise
    $scope.histModeDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  $scope.isDataFound=true
  w.initContext = ->
    $scope.isDataFound = w.content? && !_.isEmpty(w.content.account_list)

  $scope.getName = ->
    w.selectedAccount.name if w.selectedAccount?

  $scope.getCurrentBalance = ->
    if w.selectedAccount?
      if w.metadata.accounting_behaviour == 'pnl'
        _.sum w.selectedAccount.balances
      else
        w.selectedAccount.current_balance
    else
      0.0

  $scope.getCurrency = ->
    w.selectedAccount.currency if w.selectedAccount?

  $scope.displayAccount = ->
    $scope.updateSettings(false)
    w.format()


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && w.selectedAccount?
      data = angular.copy(w.selectedAccount)

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      lineData = {title: data.name, labels: dates, values: data.balances}
      barData = {
        labels: dates
        datasets: [ { title: data.name, values: data.balances } ]
      }

      all_values_are_positive = true
      angular.forEach(data.balances, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false,
      }

      chartData = ChartFormatterSvc.lineChart([lineData],options)
      if w.metadata.accounting_behaviour == 'pnl'
        chartData = ChartFormatterSvc.combinedBarChart(barData,options,false)
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsBalance', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsBalanceCtrl'
  }
)
