module = angular.module('impac.components.widgets.accounts-comparison',[])

module.controller('WidgetAccountsComparisonCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.accountsListDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.paramsCheckboxesDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.accountsListDeferred.promise
    $scope.chartDeferred.promise
    $scope.paramsCheckboxesDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && !_.isEmpty(w.content.complete_list)
    # parameters for params-checkboxes.directive
    $scope.comparisonModeOptions = [{
      id: 'compare_accounts',
      label: 'Compare matching accounts across your companies',
      value: false,
      onChangeCallback: $scope.multiCompanyComparisonOnChange
    }]
    if angular.isDefined w.metadata.comparison_mode
      angular.merge $scope.comparisonModeOptions, w.metadata.comparison_mode
    $scope.movedAccount = {}

  # callbacks for settings components
  $scope.callbacks = {}
  # applys all comparison mode params
  $scope.callbacks.runMultiCompanyComparison = (isOnLoad=true) ->
    _.forEach $scope.comparisonModeOptions, (option) -> option.onChangeCallback(isOnLoad)

  $scope.isMultiCompanyMode = ->
    _.result( _.find($scope.comparisonModeOptions, 'id', 'compare_accounts'), 'value')

  $scope.multiCompanyComparisonOnChange = (isOnLoad=false) ->
    $scope.purgeSelectedAccounts() unless isOnLoad
    if $scope.isMultiCompanyMode()
      w.groupAccounts(w.remainingAccounts, w.remainingAccounts, 'account_name')
    else
      w.ungroupAccounts(w.remainingAccounts, w.remainingAccounts, 'account_name')

  # moves all accounts from w.selectedAccounts to w.remainingAccounts
  $scope.purgeSelectedAccounts = ->
    w.clearAccounts(w.selectedAccounts, w.remainingAccounts)

  # move selected accounts & set all comparisonModeOptions to false before updating settings.
  $scope.beforeUpdateCallback = ->
    $scope.purgeSelectedAccounts()
    _.forEach $scope.comparisonModeOptions, (option) -> option.value = false if option.value

  $scope.hasAccountsSelected = ->
    return w.selectedAccounts && w.selectedAccounts.length > 0

  $scope.getAccountColor = (anAccount) ->
    if $scope.isMultiCompanyMode()
      ChartFormatterSvc.getColor(_.indexOf(w.selectedAccounts[0].accounts, anAccount))
    else
      ChartFormatterSvc.getColor(_.indexOf(w.selectedAccounts, anAccount))

  $scope.addAccount = (anAccount) ->
    w.moveAccountToAnotherList(anAccount, w.remainingAccounts, w.selectedAccounts)
    w.format()

  $scope.removeAccount = (anAccount) ->
    w.moveAccountToAnotherList(anAccount, w.selectedAccounts, w.remainingAccounts)
    w.format()

  $scope.formatAmount = (anAccount) ->
    return $filter('mnoCurrency')(anAccount.current_balance, anAccount.currency)

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    inputData = {labels: [], values: []}
    _.forEach w.selectedAccounts, (account) ->
      if $scope.isMultiCompanyMode()
        _.forEach account.accounts, (groupedAccount) ->
          inputData.labels.push groupedAccount.name
          inputData.values.push groupedAccount.current_balance
      else
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
