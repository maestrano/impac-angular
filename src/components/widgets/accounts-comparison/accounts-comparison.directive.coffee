module = angular.module('impac.components.widgets.accounts-comparison',[])

module.controller('WidgetAccountsComparisonCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.accountsListDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.accountsListDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && !_.isEmpty(w.content.complete_list)
    $scope.movedAccount = {}

  $scope.hasAccountsSelected = ->
    return w.selectedAccounts && w.selectedAccounts.length > 0

  $scope.getAccountColor = (anAccount) ->
    ChartFormatterSvc.getColor(_.indexOf(w.selectedAccounts, anAccount))

  $scope.addAccount = (anAccount) ->
    w.moveAccountToAnotherList(anAccount, w.remainingAccounts, w.selectedAccounts)
    w.format()

  $scope.removeAccount = (anAccount) ->
    w.moveAccountToAnotherList(anAccount, w.selectedAccounts, w.remainingAccounts)
    w.format()

  $scope.formatAmount = (anAccount) ->
    return $filter('mnoCurrency')(anAccount.current_balance, anAccount.currency)

  $scope.purgeSelectedAccounts = -> w.clearAccounts(w.selectedAccounts, w.remainingAccounts)

  $scope.multiCompanyMode = false
  $scope.multiCompanyComparisonOnChange = ->
    $scope.purgeSelectedAccounts()
    if $scope.multiCompanyMode
      w.groupAccounts(w.remainingAccounts, w.remainingAccounts, 'account_name')
      console.log 'w.remainingAccounts: ', w.remainingAccounts
    else
      w.ungroupAccounts(w.remainingAccounts, w.remainingAccounts, 'account_name')
      console.log 'w.remainingAccounts: ', w.remainingAccounts

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    inputData = {labels: [], values: []}
    _.map w.selectedAccounts, (account) ->
      inputData.labels.push account.name
      inputData.values.push account.current_balance
    while inputData.values.length < 15
      inputData.labels.push ""
      inputData.values.push null

    options = {
      showTooltips: false,
      showXLabels: false,
      barDatasetSpacing: 9,
    }
    chartData = ChartFormatterSvc.barChart(inputData,options)

    # calls chart.draw()
    $scope.drawTrigger.notify(chartData)

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsComparison', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsComparisonCtrl'
  }
)
