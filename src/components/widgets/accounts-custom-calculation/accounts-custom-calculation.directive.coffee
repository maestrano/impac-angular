module = angular.module('impac.components.widgets.accounts-custom-calculation',[])

module.controller('WidgetAccountsCustomCalculationCtrl', ($scope, $timeout, $modal, $q, $templateCache, $filter, ImpacWidgetsSvc, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.accountsListDeferred = $q.defer()
  $scope.formulaDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.accountsListDeferred.promise
    $scope.formulaDeferred.promise
    $scope.timePeriodDeferred
    $scope.histModeDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.movedAccount = {}
    $scope.isDataFound = w.content? && !_.isEmpty(w.content.complete_list)

  $scope.addAccountToFormula = (account) ->
    return unless account?

    # When some accounts are already in savedList
    if w.selectedAccounts.length > 0
      w.formula += " + {#{w.selectedAccounts.length + 1}}"
    # Otherwise
    else
      w.formula = "{1}"

    w.moveAccountToAnotherList(account,w.remainingAccounts,w.selectedAccounts,false)

  $scope.removeAccountFromFormula = (account) ->
    prevUids = _.map(w.selectedAccounts, (e) ->
      e.uid
    )
    nextUids = _.reject(prevUids, (e) ->
      e == account.uid
    )

    diffAccountUid = _.first(_.difference(prevUids,nextUids))
    diffAccountIndex = _.indexOf(prevUids, diffAccountUid) + 1

    if diffAccountIndex == 1
      # We remove the next operator
      removePattern = "{#{diffAccountIndex}\\}\\s*(-|\\*|\\/|\\+)*\\s*"
    else
      # We remove the previous operator
      removePattern = "\\s*(-|\\*|\\/|\\+)*\\s*\\{#{diffAccountIndex}\\}"
    newFormula = angular.copy(w.formula).replace(new RegExp(removePattern, 'g'),'')

    # We downgrade all the next indexes
    i = diffAccountIndex + 1
    while i <= prevUids.length
      indexPattern = "\\{#{i}\\}"
      newFormula = newFormula.replace(new RegExp(indexPattern, 'g'), "{#{i-1}}")
      i++

    w.formula = angular.copy(newFormula)
    w.moveAccountToAnotherList(account,w.selectedAccounts,w.remainingAccounts,false)

  # Modal management
  # --------------------------------------
  $scope.formulaModal = $scope.$new()
  $scope.formulaModal.config = {
    backdrop: 'static'
    template: $templateCache.get('widgets/accounts-custom-calculation/formula.modal.html')
    size: 'lg'
    scope: $scope.formulaModal
    keyboard: false
  }

  $scope.formulaModal.open = ->
    self = $scope.formulaModal
    self.modalOrgDeferred = $q.defer()

    # remove the initial organizations setting...
    _.remove w.settings, ((set) -> set.key == "organizations")
    self.instance = $modal.open(self.config)

    # ...it will be replaced by a new one when the modal DOM is loaded
    self.modalOrgDeferred.promise.then(
      (success) ->
        $scope.initSettings()
    )

  $scope.formulaModal.cancel = ->
    $scope.initSettings()
    $scope.formulaModal.close()

  $scope.formulaModal.proceed = ->
    w.format()
    ImpacWidgetsSvc.updateWidgetSettings(w,false)
    $scope.formulaModal.close()

  $scope.formulaModal.close = ->
    $scope.formulaModal.instance.close()

  # Reload the accounts lists on organizations list change
  $scope.reloadAccountsLists = (orgs) ->
    # Refresh the settings only if some orgs are selected
    if orgs? && _.some(_.values(orgs))
      ImpacWidgetsSvc.updateWidgetSettings(w)

  # Open the modal on toggleEditMode()
  $scope.$watch (-> w.isEditMode), (result, prev) ->
    $scope.formulaModal.open() if result && !prev

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && w.isHistoryMode
      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      all_values_are_positive = true
      angular.forEach(w.selectedAccounts, (acc) ->
        angular.forEach(acc.balances, (balance) ->
          all_values_are_positive &&= balance >= 0
        )
      )
      lineData = [{ title: '', labels: dates, values: w.evaluatedFormulaHist }]
      lineOptions = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false,
        # currency: ""
      }
      chartData = ChartFormatterSvc.lineChart(lineData,lineOptions, true)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsCustomCalculation', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsCustomCalculationCtrl'
  }
)
