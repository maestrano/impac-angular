module = angular.module('impac.components.widgets-settings.accounts-list', [])

# There is no template associated to this setting, and though it won't appear in the 'settings' panel
# However, as its metadata has to be initialized from, and saved to Impac!, we build ListAccounts as a setting
module.controller('SettingAccountsListCtrl', ($scope, ImpacWidgetsSvc) ->

  # ---------------------------------------------------------
  # ### Populate the widget
  # ---------------------------------------------------------

  w = $scope.parentWidget

  # Used by the 'delete' button in the accounts list and by the comboBox
  w.moveAccountToAnotherList = (account, src, dst, triggerUpdate=true) ->
    return if _.isEmpty(src) || _.isEmpty(account)
    dst ||= []
    _.remove src, (acc) -> account.uid == acc.uid
    dst.push(account)
    ImpacWidgetsSvc.updateWidgetSettings(w, false) if triggerUpdate
    return null

  # ---------------------------------------------------------
  # ### Setting definition
  # ---------------------------------------------------------

  setting = {}
  setting.key = "accounts-list"

  setting.initialize = ->
    setting.isInitialized = false
    w.remainingAccounts = []
    w.selectedAccounts = []

    if w.content? && !_.isEmpty(w.content.complete_list)
      w.remainingAccounts = angular.copy(w.content.complete_list)
      # pre-fills saved accounts (or saved grouped accounts) into w.selectedAccounts
      if !_.isEmpty(w.metadata.accounts_list)
        for accUid in savedAccounts()
          acc = _.find(w.content.complete_list, (acc) ->
            acc.uid == accUid
          )
          w.moveAccountToAnotherList(acc, w.remainingAccounts, w.selectedAccounts, false)
      setting.isInitialized = true

  setting.toMetadata = ->
    return { accounts_list: _.map(w.selectedAccounts, ((acc) -> acc.uid)) } if setting.isInitialized

  # Returns uids of saved accounts or groups, also converting saved groups into
  # accounts or accounts into groups when switching between comparison mode.
  savedAccounts = () ->
    isComparisonMode = _.result( _.find(w.metadata.comparison_mode, 'id', 'compare_accounts'), 'value') || false
    # Decontruct group uids into account uids
    if !isComparisonMode && w.metadata.accounts_list[0].indexOf(':') >= 0
      _.flatten _.map(w.metadata.accounts_list, (a) -> a.split(':'))
    # Find first group uid matchable by account uids.
    else if isComparisonMode
      if w.metadata.accounts_list[0].indexOf(':') < 0
        for savedAccount in w.metadata.accounts_list
          account = _.find(w.remainingAccounts, (acc) -> acc.uid.indexOf(savedAccount) >= 0)
          return [account.uid] if account
      else
        _.flatten _.map(w.metadata.accounts_list, (a) -> a.split(':'))
    # Saved accounts
    else
      w.metadata.accounts_list

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingAccountsList', () ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
    },
    controller: 'SettingAccountsListCtrl'
  }
)
