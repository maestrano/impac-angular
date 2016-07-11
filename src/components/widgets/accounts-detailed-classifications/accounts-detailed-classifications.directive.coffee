module = angular.module('impac.components.widgets.accounts-detailed-classifications', [])
module.controller('WidgetAccountsDetailedClassificationsCtrl', ($scope, $q, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  # $scope.paramSelecterDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    # $scope.paramSelecterDeferred.promise
  ]

  $scope.forwardParams = {
    accountingBehaviour: 'bls'
  }


  $scope.ascending = true
  $scope.sortedColumn = 'account'

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.companies)

    if $scope.isDataFound
      $scope.unCollapsed = w.metadata.unCollapsed || []

      if w.content.companies.length == 1
        $scope.multiEntity = false
        $scope.dataSource = _.map w.content.companies[0].classifications, (klass) ->
          {
            label: klass.name
            value: klass.total
            currency: klass.currency
            entries: _.map klass.accounts, (acc) ->
              {
                label: acc.name
                value: acc.balance
                currency: acc.currency
              }
          }

      else
        $scope.multiEntity = true
        $scope.dataSource = _.map w.content.companies, (company) ->
          {
            label: company.name
            entries: _.map company.classifications, (klass) ->
              {
                label: klass.name
                value: klass.total
                currency: klass.currency
              }
          }
      sortData()

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

  sortAccountsBy = (getElem) ->
    angular.forEach($scope.dataSource, (sElem) ->
      if sElem.entries
        sElem.entries.sort (a, b) ->
          res = if getElem(a) > getElem(b) then 1
          else if getElem(a) < getElem(b) then -1
          else 0
          res *= -1 unless $scope.ascending
          return res
    )

  sortData = ->
    if $scope.sortedColumn == 'account'
      sortAccountsBy( (el) -> el.label )
    else if $scope.sortedColumn == 'total'
      sortAccountsBy( (el) -> el.value )

  $scope.sort = (col) ->
    if $scope.sortedColumn == col
      $scope.ascending = !$scope.ascending
    else
      $scope.ascending = true
      $scope.sortedColumn = col
    sortData()

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
module.directive('widgetAccountsDetailedClassifications', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsDetailedClassificationsCtrl'
  }
)
