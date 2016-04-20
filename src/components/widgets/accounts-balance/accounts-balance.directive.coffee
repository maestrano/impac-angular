module = angular.module('impac.components.widgets.accounts-balance',[])

module.controller('WidgetAccountsBalanceCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.accountBackDeferred = $q.defer()
  $scope.accountFrontDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.accountBackDeferred
    $scope.accountFrontDeferred
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

  $scope.getBehaviour = ->
    w.selectedAccount? && w.selectedAccount.accounting_behaviour

  $scope.getCurrentBalance = ->
    if w.selectedAccount?
      if $scope.getBehaviour() == 'pnl'
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
      datesSource = data.dates || w.content.dates # w.content.dates should not be used. Placed here in case of frontend hitting old API

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map datesSource, (date) ->
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
      if $scope.getBehaviour() == 'pnl'
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
