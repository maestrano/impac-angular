module = angular.module('impac.components.widgets.accounts-balance',[])

module.controller('WidgetAccountsBalanceCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = w.content? && !_.isEmpty(w.content.account_list)

    w.format = ->
      if $scope.isDataFound && w.selectedAccount?
        data = angular.copy(w.selectedAccount)
        inputData = {title: data.name, labels: w.content.dates, values: data.balances}
        all_values_are_positive = true
        angular.forEach(data.balances, (value) ->
          all_values_are_positive &&= value >= 0
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
        }
        w.chart = ChartFormatterSvc.lineChart([inputData],options)

    $scope.getName = ->
      w.selectedAccount.name if w.selectedAccount?

    $scope.getCurrentBalance = ->
      w.selectedAccount.current_balance if w.selectedAccount?

    $scope.getCurrency = ->
      w.selectedAccount.currency if w.selectedAccount?

    # When the user tries to disable edit mode without having selected an account
    # we force the edit mode to remain enabled
    $scope.$watch (-> w.isEditMode), (result) ->
      w.isEditMode = true if !w.selectedAccount?


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
      w.loadContent() if total == 4

    return w
)

module.directive('widgetAccountsBalance', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsBalanceCtrl'
  }
)