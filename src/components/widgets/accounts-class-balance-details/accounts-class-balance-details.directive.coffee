module = angular.module('impac.components.widgets.accounts-class-balance-details', [])
module.controller('WidgetAccountsClassBalanceDetailsCtrl', ($scope, $q, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramSelecterDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramSelecterDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.account_list)
    $scope.unCollapsed = w.metadata.unCollapsed || []
    $scope.multiEntity = w.metadata.organization_ids.length > 1
    unless $scope.multiEntity
      $scope.availableClasses = w.content.account_class.available
      $scope.selectedClass = _.find($scope.availableClasses, {
        value: w.content.account_class.selected
      })

  $scope.toggleCollapsed = (groupName) ->
    if groupName?
      if _.find($scope.unCollapsed, ((name) -> groupName == name))
        $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
          name == groupName
        )
      else
        $scope.unCollapsed.push(groupName)
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isCollapsed = (groupName) ->
    if groupName?
      if _.find($scope.unCollapsed, ((name) -> groupName == name))
        return false
      else
        return true

  # Mini-settings objects
  # handles the saving of collapsed / uncollapsed list groups.
  # --------------------------------------
  unCollapsedSetting = {}
  unCollapsedSetting.initialized = false

  unCollapsedSetting.initialize = ->
    unCollapsedSetting.initialized = true

  unCollapsedSetting.toMetadata = ->
    {unCollapsed: $scope.unCollapsed}

  w.settings.push(unCollapsedSetting)


  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetAccountsClassBalanceDetails', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsClassBalanceDetailsCtrl'
  }
)
