module = angular.module('impac.components.widgets-settings.formula',[])

module.controller('SettingFormulaCtrl', ($scope, $filter, $timeout) ->

  w = $scope.parentWidget
  w.formula = ""

  # # Only authorize mathematical expressions
  authorized_regex = new RegExp("^(\\{|\\d|\\}|\\/|\\+|-|\\*|\\(|\\)|\\s|\\.)*$")

  setting = {}
  setting.key = "formula"
  setting.isInitialized = false

  setting.initialize = ->
    if w.metadata? && w.metadata.formula?
      w.formula = w.metadata.formula
      $timeout () ->
        evaluateFormula()
        setting.isInitialized = true
    else
      w.formula = ""

  setting.toMetadata = ->
    evaluateFormula()
    if w.isFormulaCorrect
      return { formula: w.formula }
    else
      return { formula: "" }

  getFormula = ->
    return w.formula

  w.formatAmount = (anAccount) ->
    return $filter('mnoCurrency')(anAccount.current_balance,anAccount.currency)

  $scope.$watch getFormula, (e) ->
    evaluateFormula()

  evaluateFormula = ->
    str = angular.copy(w.formula)
    legend = angular.copy(w.formula)
    i=1
    angular.forEach(w.selectedAccounts, (account) ->
      balancePattern = "\\{#{i}\\}"
      str = str.replace(new RegExp(balancePattern, 'g'), " #{account.current_balance_no_format} ")
      legend = legend.replace(new RegExp(balancePattern, 'g'), account.name)
      i++
    )

    # Guard against injection
    if (!str.match(authorized_regex))
      w.isFormulaCorrect = false
      w.evaluatedFormula = "invalid expression"

    try
      w.evaluatedFormula = eval(str).toFixed(2)
    catch e
      w.evaluatedFormula = "invalid expression"

    if !w.evaluatedFormula? || w.evaluatedFormula == "invalid expression" || w.evaluatedFormula == "Infinity" || w.evaluatedFormula == "-Infinity"
      w.isFormulaCorrect = false
    else
      formatFormula()
      w.legend = legend
      w.isFormulaCorrect = true

  formatFormula = ->
    if !w.formula.match(/\//g) && w.selectedAccounts?
      if firstAcc = w.selectedAccounts[0]
        if currency = firstAcc.currency
          w.evaluatedFormula = $filter('mnoCurrency')(w.evaluatedFormula, currency)

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingFormula', () ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
    },
    controller: 'SettingFormulaCtrl'
  }
)
