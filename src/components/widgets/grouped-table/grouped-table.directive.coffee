module = angular.module('impac.components.widgets.grouped-table', [])
module.controller('WidgetGroupedTableCtrl', ($scope, $q, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
  ]

  # Configure the commonTimePeriodInfo directive
  $scope.timePeriodInfoParams = {
    accountingBehaviour: 'pnl'
    histParams: {}
  }

  # $scope.ascending = true
  # $scope.sortedColumn = 'account'

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.grouped_table)
      $scope.unCollapsed = w.metadata.unCollapsed || []
      $scope.currency = w.metadata.currency
      $scope.grouped_table = w.content.grouped_table

  $scope.toggleCollapsed = (header) ->
    if header
      if _.find($scope.unCollapsed, ((name) -> header == name))
        $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
          name == header
        )
      else
        $scope.unCollapsed.push(header)
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isCollapsed = (header) ->
    if header
      if _.find($scope.unCollapsed, ((name) -> header == name))
        return false
      else
        return true

  # sortAccountsBy = (getElem) ->
  #   angular.forEach($scope.headers, (header) ->
  #     sElem = $scope.groups[$index]
  #     if sElem
  #       sElem.sort (a, b) ->
  #         res = if getElem(a.name) > getElem(b.name) then 1
  #         else if getElem(a.name) < getElem(b.name) then -1
  #         else 0
  #         res *= -1 unless $scope.ascending
  #         return res
  #   )
  #
  # sortData = ->
  #   if $scope.sortedColumn == 'account'
  #     sortAccountsBy( (el) -> el.name )
  #   else if $scope.sortedColumn == 'total1'
  #     sortAccountsBy( (el) -> el.balances[1] )
  #   else if $scope.sortedColumn == 'total2'
  #     sortAccountsBy( (el) -> el.balances[0] )
  #
  # $scope.sort = (col) ->
  #   if $scope.sortedColumn == col
  #     $scope.ascending = !$scope.ascending
  #   else
  #     $scope.ascending = true
  #     $scope.sortedColumn = col
  #   sortData()

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

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  # $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetGroupedTable', ->
  return {
    restrict: 'A',
    controller: 'WidgetGroupedTableCtrl'
  }
)
