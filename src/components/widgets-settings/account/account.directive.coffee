module = angular.module('impac.components.widgets-settings.account',[])

module.controller('SettingAccountCtrl', ($scope, $filter) ->

  w = $scope.parentWidget

  # What will be passed to parentWidget
  setting = {}
  setting.key = "account"
  setting.isInitialized = false

  # initialization of time range parameters from widget.content.hist_parameters
  setting.initialize = ->
    w.selectedAccount = w.selectedAccount || null
    if w.content? && w.content.account_list? && w.metadata? && w.metadata.account_uid?
      w.selectedAccount = _.find(w.content.account_list, (acc) ->
        acc.uid == w.metadata.account_uid
      )
      setting.isInitialized = true

  setting.toMetadata = ->
    return { account_uid: w.selectedAccount.uid } if w.selectedAccount?

  formatAmount = (anAccount) ->
    balance = anAccount.current_balance || anAccount.balance || 0.0
    return $filter('mnoCurrency')(balance,anAccount.currency)

  $scope.formatLabel = (anAccount) ->
    if anAccount.company?
      "#{anAccount.company} - #{anAccount.name} (#{formatAmount(anAccount)})"
    else
      "#{anAccount.name} (#{formatAmount(anAccount)})"

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingAccount', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      label: '@'
      showLabel: '=?'
      onAccountSelected: '&'
    },

    link: (scope, element) ->
      scope.label = "Account to monitor" if !scope.label

    ,template: $templateCache.get('widgets-settings/account.tmpl.html'),
    controller: 'SettingAccountCtrl'
  }
)
