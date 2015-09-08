module = angular.module('impac.components.widgets.accounts-comparison',[])

module.controller('WidgetAccountsComparisonCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = w.content? && !_.isEmpty(w.content.complete_list)
      $scope.movedAccount = {}

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
      w.chart = ChartFormatterSvc.barChart(inputData,options)

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

    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 2

    return w

)

module.directive('widgetAccountsComparison', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("accounts")
      element.addClass("comparison")
    ,controller: 'WidgetAccountsComparisonCtrl'
  }
)