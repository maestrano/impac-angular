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
module.directive('widgetAccountsDetailedClassifications', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsDetailedClassificationsCtrl'
  }
)
