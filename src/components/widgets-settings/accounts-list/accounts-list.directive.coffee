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

  # collection wrapper for w.moveAccountToAnotherList
  w.clearAccounts = (src, dst, triggerUpdate=false) ->
    srcCopy = angular.copy(src)
    _.forEach(srcCopy, (account) -> w.moveAccountToAnotherList(account, src, dst, triggerUpdate))
    return null

  # keeps local of src accounts for switching between grouped and ungrouped.
  stashedAccounts = []
  # groups accounts by a string matcher, from a src collection, into a destination collection.
  # note: src collection can be the dst collection. Src will be cleared.
  w.groupAccounts = (src, dst, groupByKey, regExp) ->
    grouped = []
    counter = 0
    rgx = new RegExp(regExp || /[^a-z0-9]/g)
    stashedAccounts = angular.copy(src)
    normalise = (str) -> str.toLowerCase().replace(rgx, "")
    collectBalance = (arr) -> _.reduce(arr, (total, n) -> total + n )
    sort = ->
      baseAccount = src.shift()
      matcher = normalise(baseAccount[groupByKey])
      group = { name: baseAccount.account_name, uid: counter++ }
      group.accounts = _.select src, (acc, index) ->
        src.splice(index, 1)[0] if !!acc && normalise(acc[groupByKey]) == matcher
      if group.accounts.length > 0
        group.accounts.unshift(baseAccount)
        # TODO::multi-currency: support for conversions across multi-currency, multi-company accounts.
        group.current_balance = collectBalance(_.map(group.accounts, (acc) -> acc.current_balance))
        group.currency = _.map(group.accounts, (acc) -> acc.currency).join('/')
        grouped.push(group)
      unless src.length
        _.forEach(grouped, (acc) -> dst.push(acc) )
      else
        sort()
    sort()

  # ungroups by removing manipulated(grouped) objects (src), and restores original accounts by re-applying stashedAccounts to dst.
  w.ungroupAccounts = (src, dst) ->
    src.length = 0
    _.forEach(stashedAccounts, (acc) -> src.push(acc) )
    stashedAccounts = []

  # applys comparison_mode setting data to either filter or not filter accounts on load.
  initializeComparisonMode = -> $scope.callbacks.runMultiCompanyComparison()

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
      # Impac! returns the list of all the accounts, and we want that:
      # completeList + savedList = list of all accounts
      if !_.isEmpty(w.metadata.accounts_list)
        angular.forEach(w.metadata.accounts_list, (accUid) ->
          acc = _.find(w.content.complete_list, (acc) ->
            acc.uid == accUid
          )
          w.moveAccountToAnotherList(acc,w.remainingAccounts,w.selectedAccounts,false)
        )
      stashedAccounts = angular.copy(w.remainingAccounts)
      initializeComparisonMode() if $scope.callbacks?
      setting.isInitialized = true

  setting.toMetadata = ->
    return { accounts_list: _.map(w.selectedAccounts, ((acc) -> acc.uid)) } if setting.isInitialized

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
      callbacks: '=?'
    },
    controller: 'SettingAccountsListCtrl'
  }
)
