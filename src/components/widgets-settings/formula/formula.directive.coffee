module = angular.module('impac.components.widgets-settings.formula',[])

module.controller('SettingFormulaCtrl', ($scope, $filter, $timeout, $log) ->

  w = $scope.parentWidget

  setting = {}
  setting.key = "formula"
  setting.isInitialized = false

  setting.initialize = ->
    w.formula = (w.metadata? && w.metadata.formula) || ""
    evaluate(w.formula)
    setting.isInitialized = true

  setting.toMetadata = ->
    { formula: (w.isFormulaCorrect && w.formula) || "" }

  getFormula = ->
    return w.formula

  w.formatAmount = (anAccount) ->
    return $filter('mnoCurrency')(anAccount.current_balance,anAccount.currency)

  $scope.$watch getFormula, (formula) ->
    evaluate(formula)


  # Returns an array of formula strings of same dimension as arraySample
  initialFormulas = (formulaString, arraySample) ->
    formulasArray = _.map arraySample, (e) ->
      formulaString

  # Replaces the account index by a replacement value (balance, name...) in the formula string
  interpolateIndexesInFormula = (formulaString, replacement, accountIndex) ->
    balancePattern = "\\{#{accountIndex}\\}"
    formulaString.replace(new RegExp(balancePattern, 'g'), " #{replacement} ")

  # Recursive - Replaces all the accounts indexes by all their balances in all the formulas strings in the array
  interpolateAllAccountsBalances = (formulasArray, accounts, accountIndex=1) ->
    unless accountIndex > accounts.length
      balanceIndex=0
      newFormulasArray = _.map formulasArray, (formulaString) ->
        balance = accounts[accountIndex-1].balances[balanceIndex]
        balanceIndex++
        interpolateIndexesInFormula(formulaString, balance, accountIndex)

      interpolateAllAccountsBalances(newFormulasArray, accounts, accountIndex+1)

    else
      formulasArray

  # Recursive - Replaces all the accounts indexes by their names in the given formula string
  interpolateAllAccountsNames = (formulaString, accounts, accountIndex=1) ->
    unless accountIndex > accounts.length
      name = accounts[accountIndex-1].name
      newFormula = interpolateIndexesInFormula(formulaString, name, accountIndex)
      interpolateAllAccountsNames(newFormula, accounts, accountIndex+1)
    
    else
      formulaString

  applyFormulas = (formulasArray) ->
    _.map formulasArray, (formula) ->
      applyFormula(formula)

  # Check if the formula is valid and calculates its result
  applyFormula = (formula) ->
    # Guard against injection: Only authorize mathematical expressions
    authorized_regex = new RegExp("^(\\{|\\d|\\}|\\/|\\+|-|\\*|\\(|\\)|\\s|\\.)*$")
    return false unless formula.match(authorized_regex)
    try eval(formula).toFixed(2)
    catch e then false

  # Apply a formula to an array of accounts for each period interval, and outputs the results array
  calculationResults = (formulasString, arraySample, accounts) ->
    init = initialFormulas(formulasString, arraySample)
    interpolated = interpolateAllAccountsBalances(init, accounts)
    applyFormulas(interpolated)

  isResultValid = (result) ->
    result && isFinite(result)

  # Format a result with a currency when relevant
  formatResult = (formulaString, result, currency) ->
    if !isResultValid(result)
      "invalid expression"
    else if (formulaString.match(/\//) || !currency)
      result
    else
      $filter('mnoCurrency')(result, currency)

  # evaluates the current result and history of results
  # TODO: should directly modify w object. use callbacks instead
  evaluate = (formula) ->
    unless _.isEmpty(formula) || _.isEmpty(w.content.dates)
      accounts = w.selectedAccounts || []
      currency = !_.isEmpty(accounts) && accounts[0].currency

      w.evaluatedFormulaHist = calculationResults(formula, w.content.dates, accounts)
      w.legend = interpolateAllAccountsNames(formula, accounts)

      # TODO: Accounting behaviours? => if some PNL accounts are selected, only the last results will be displayed anyway...
      currentResult = _.last(w.evaluatedFormulaHist)
      w.evaluatedFormula = formatResult(formula, currentResult, currency)
      w.isFormulaCorrect = isResultValid(currentResult)
    
    else
      w.isFormulaCorrect = false  

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
