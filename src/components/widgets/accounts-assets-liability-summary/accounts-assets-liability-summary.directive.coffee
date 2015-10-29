module = angular.module('impac.components.widgets.accounts-assets-liability-summary', [])
module.controller('WidgetAccountsAssetsLiabilitySummaryCtrl', ($scope, $q, ChartFormatterSvc) ->

  w = $scope.widget
  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.accountDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.chartDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.accountDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)
    $scope.multiEntity = w.metadata.organization_ids.length > 1
    if $scope.multiEntity && w.content.account_list
      w.selectedAccount = w.content.account_list[0]
      $scope.applyAccountSelection()
    if !$scope.selectedAccountsOption
      $scope.accountsOptions = [
        { label: 'Assets Accounts', value: 'ASSET' },
        { label: 'Liability Accounts', value: 'LIABILITY' }
      ]
      $scope.selectedAccountsOption = {
        label: 'Assets Accounts',
        value: 'ASSET'
      }

  $scope.getCurrency = ->
    w.content.currency if $scope.isDataFound

  $scope.getAccountColor = (anAccount) ->
    ChartFormatterSvc.getColor(_.indexOf(w.content.summary, anAccount)) if $scope.isDataFound

  $scope.applyAccountSelection = () ->
    return if !w.selectedAccount
    w.content.summary = _.map w.selectedAccount.accounts, (account) ->
      {
        label: account.org_name,
        total: account.current_balance
      }
    w.format()


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      pieData = _.map w.content.summary, (account) ->
        {
          label: account.label,
          value: account.total,
        }
      pieOptions = {
        percentageInnerCutout: 50,
        tooltipFontSize: 12,
        # tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' #{currency}' %>"
      }
      chartData = ChartFormatterSvc.pieChart(pieData, pieOptions)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsAssetsLiabilitySummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsAssetsLiabilitySummaryCtrl'
  }
)
