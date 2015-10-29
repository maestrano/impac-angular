module = angular.module('impac.components.widgets.accounts-class-comparison', [])
module.controller('WidgetAccountsClassComparisonCtrl', ($scope, $q, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  # organization (entity) settings panel switches - settingsOrganizations directive
  $scope.orgDeferred = $q.defer()
  # chart loading component - impacChart directive
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    # $scope.chartDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content)

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    # inputData = {labels: [], values: []}
    # _.forEach w.selectedAccounts, (account) ->
    #   if $scope.isMultiCompanyMode()
    #     _.forEach account.accounts, (groupedAccount) ->
    #       inputData.labels.push groupedAccount.name
    #       inputData.values.push groupedAccount.current_balance
    #   else
    #     inputData.labels.push account.name
    #     inputData.values.push account.current_balance

    # while inputData.values.length < 15
    #   inputData.labels.push ""
    #   inputData.values.push null

    # options = {
    #   showTooltips: false,
    #   showXLabels: false,
    #   barDatasetSpacing: 9,
    # }
    # chartData = ChartFormatterSvc.barChart(inputData,options)

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetAccountsClassComparison', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsClassComparisonCtrl'
  }
)
