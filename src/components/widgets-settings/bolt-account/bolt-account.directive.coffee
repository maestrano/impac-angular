module = angular.module('impac.components.widgets-settings.bolt-account',[])

module.controller('SettingBoltAccountCtrl', ($scope, $filter) ->

  w = $scope.parentWidget

  # What will be passed to parentWidget
  setting = {}
  setting.key = "bolt-account"
  setting.isInitialized = false

  # initialization of time range parameters from widget.content.hist_parameters
  setting.initialize = ->
    w.accountList = setOptions() unless w.content.settings.selectors.length == 0
    w.selectedAccount = setSelected()
    if w.content? && w.accountList? && w.metadata? && w.metadata.account_uid?
      w.selectedAccount = setSelected(w.metadata.account_uid)
      setting.isInitialized = true

  setting.toMetadata = ->
    return { account_uid: w.selectedAccount.account_id } if w.selectedAccount?

  setOptions = (name = 'account')->
    _.find(w.content.settings.selectors, (selector) ->
      selector.name == name
    ).options

  setSelected = (selected = 'total_uid')->
    _.find(w.accountList, (acc) ->
      acc.account_id == selected
    )

  formatAmount = (anAccount) ->
    balance = null
    return $filter('mnoCurrency')(balance, anAccount.currency)

  $scope.formatLabel = (anAccount) ->
    if anAccount.currency?
      "#{anAccount.name} (#{anAccount.currency})"
    else
      "#{anAccount.name}"

  w.settings.push(setting)
  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingBoltAccount', ($templateCache, $translate) ->
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
      scope.label = $translate.instant('impac.widget.settings.bolt-account.label') if !scope.label

    ,template: $templateCache.get('widgets-settings/bolt-account.tmpl.html'),
    controller: 'SettingBoltAccountCtrl'
  }
)
