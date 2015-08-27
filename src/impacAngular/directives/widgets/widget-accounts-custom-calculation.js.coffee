module = angular.module('maestrano.analytics.widget-accounts-custom-calculation',['maestrano.assets'])

module.controller('WidgetAccountsCustomCalculationCtrl',[
  '$scope', '$timeout', '$modal', 'DhbAnalyticsSvc', 'TemplatePath', 'AssetPath',
  ($scope, $timeout, $modal, DhbAnalyticsSvc, TemplatePath, AssetPath) ->

    w = $scope.widget

    $scope.loaderImage = AssetPath['loader-white-bg.gif']

    w.initContext = ->
      $scope.movedAccount = {}
      $scope.isDataFound = w.content? && !_.isEmpty(w.content.complete_list)


    # #====================================
    # # Formula management
    # #====================================

    $scope.addAccountToFormula = (account) ->
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

    #====================================
    # Modal management
    #====================================

    $scope.formulaModal = {}
    $scope.formulaModal.config = {
      instance: {
        backdrop: 'static'
        templateUrl: TemplatePath['analytics/modals/formula-modal.html']
        size: 'lg'
        scope: $scope
        keyboard: false
      }
    }

    $scope.formulaModal.open = ->
      # A new organization setting directive is going to be inserted via the modal
      # before loading it, we remove the initial setting
      w.settings = angular.copy(_.reject w.settings, (elem) ->
        elem.key == "organizations"
      )
      self = $scope.formulaModal
      self.$instance = $modal.open(self.config.instance)
      $timeout ->
        w.initSettings()
      ,200

    # # # Reload the accounts lists on organizations list change
    $scope.$watch (-> w.selectedOrganizations), (result) ->
      w.updateSettings() if !_.isEmpty(result)
    ,true

    $scope.formulaModal.cancel = ->
      w.initSettings()
      $scope.formulaModal.close()

    $scope.formulaModal.proceed = ->
      w.updateSettings(false)
      $scope.formulaModal.close()
    
    $scope.formulaModal.close = ->
      $scope.formulaModal.$instance.close()

    # Open the modal on toogleEditMode()
    $scope.$watch (-> w.isEditMode), (result, prev) ->
      $scope.formulaModal.open() if result && !prev


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
      if total == 3 && !$scope.blockLoadContent
        w.loadContent()
        $scope.blockLoadContent = true

    return w
])

module.directive('widgetAccountsCustomCalculation', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("accounts")
      element.addClass("custom-calculation")
    ,controller: 'WidgetAccountsCustomCalculationCtrl'
  }
)