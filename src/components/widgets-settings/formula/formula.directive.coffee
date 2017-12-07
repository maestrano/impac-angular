module = angular.module('impac.components.widgets-settings.formula',[])

module.controller('SettingFormulaCtrl', ($scope, $filter, $timeout, $translate) ->

  w = $scope.parentWidget
  w.formula = ''

  # # Only authorize mathematical expressions
  AUTHORIZED_REGEXP = new RegExp("^(\\{|\\d|\\}|\\/|\\+|-|\\*|\\(|\\)|\\s|\\.)*$")

  setting = {}
  setting.key = "formula"
  setting.isInitialized = false

  setting.initialize = ->
    if w.metadata? && w.metadata.formula?
      w.formula = w.metadata.formula
      $timeout () ->
        prepareFormula()
        setting.isInitialized = true
    else
      w.formula = ''

  setting.toMetadata = ->
    prepareFormula()
    if w.isFormulaCorrect
      return { formula: w.formula }
    else
      return { formula: '' }

  getFormula = ->
    return w.formula

  w.formatAmount = (anAccount) ->
    return $filter('mnoCurrency')(anAccount.current_balance,anAccount.currency)

  $scope.$watch getFormula, (e) ->
    prepareFormula()

  # Assesses whether a formula is valid and format the result and legend
  prepareFormula = ->
    interpolatedFormula = interpolateInFormula(w.formula, w.selectedAccounts, 'current_balance')

    if (evaluatedFormula = evaluateFormula(interpolatedFormula))
      w.evaluatedFormula = formatFormula(evaluatedFormula, w.formula, w.selectedAccounts)
      w.legend = interpolateInFormula(w.formula, w.selectedAccounts, 'name')
      w.isFormulaCorrect = true
    else
      w.evaluatedFormula = 'invalid expression'
      w.legend = '...'
      w.isFormulaCorrect = false
    w.evaluatedFormulaTranslate = translateEvaluatedFormula(w.evaluatedFormula);

  # Evaluate formula for the specified index, i.e. at some point in the past
  w.evaluatedFormula_History = (index) ->
    interpolation = w.formula
    for account, i in w.selectedAccounts
      pattern = new RegExp("\\{#{i+1}\\}", 'g')
      interpolation = interpolation.replace(pattern, " #{account['balances'][index]} ")
    evaluateFormula(interpolation)

  translateEvaluatedFormula = (formula) ->
    switch formula
      when 'invalid expression' then return $translate.instant('impac.widget.formula.invalid_expression')
      when 'Infinity'           then return $translate.instant('impac.widget.formula.infinity')
      when '-Infinity'          then return $translate.instant('impac.widget.formula.minus_infinity')
      else return formula

  # Replaces each account reference ({1} + {2}...) by a member of the corresponding account object
  interpolateInFormula = (sourceFormula, selectedAccounts, accountMember) ->
    interpolation = sourceFormula
    return interpolation if _.isEmpty(selectedAccounts)
    for account, i in selectedAccounts
      pattern = new RegExp("\\{#{i+1}\\}", 'g')
      interpolation = interpolation.replace(pattern, " #{account[accountMember]} ")
    return interpolation

  # Guards against injection and verifies the calculation is finite
  evaluateFormula = (interpolatedFormula) ->
    return false unless interpolatedFormula.match(AUTHORIZED_REGEXP)
    try
      evaluation = eval(interpolatedFormula).toFixed(2)
      if isFinite(evaluation) then return evaluation else return false
    catch e
      return false

  # The expression is a ration if a '/' can be found...
  isRatio = (sourceFormula) ->
    sourceFormula.match(/\//g)

  # Adds a currency to the expression if it is not a ratio and a currency can be found
  formatFormula = (evaluation, sourceFormula, selectedAccounts)->
    return evaluation if isRatio(sourceFormula) || _.isEmpty(selectedAccounts)
    firstAccount = selectedAccounts[0]
    return evaluation unless (currency = firstAccount.currency)
    $filter('mnoCurrency')(evaluation, currency)

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
