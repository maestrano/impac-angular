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
      restoreSavedAccounts()
      setting.isInitialized = true

  setting.toMetadata = ->
    return { accounts_list: _.map(w.selectedAccounts, ((acc) -> acc.uid)) } if setting.isInitialized

  restoreSavedAccounts = () ->
    return if _.isEmpty(w.metadata.accounts_list)
    for accUid in gatherSavedAccounts()
      acc = _.find(w.content.complete_list, (acc) ->
        acc.uid == accUid
      )
      w.moveAccountToAnotherList(acc, w.remainingAccounts, w.selectedAccounts, false)

  # Returns uids of saved accounts or groups, also converting saved groups into
  # accounts or accounts into groups when switching between comparison mode.
  gatherSavedAccounts = () ->
    isComparisonMode = _.result( _.find(w.metadata.comparison_mode, 'id', 'compare_accounts'), 'value') || false
    savedUids = w.metadata.accounts_list
    areGrouped = savedUids[0].indexOf(':') >= 0
    # when group uids have been saved, and comparison mode is switched off
    if !isComparisonMode && areGrouped
      # deconstruct group uids into account uids
      _.flatten _.map(savedUids, (a) -> a.split(':'))
    # when comparison mode is switch on
    else if isComparisonMode
      # when account uids have been saved, find first matching group by account uid
      unless areGrouped
        for uid in savedUids
          group = _.find(w.remainingAccounts, (group) -> group.uid.indexOf(uid) >= 0)
          return [group.uid] if group
      # when group uids have been saved, deconstruct group uids into account uids
      else
        _.flatten _.map(savedUids, (a) -> a.split(':'))
    else
      savedUids

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
