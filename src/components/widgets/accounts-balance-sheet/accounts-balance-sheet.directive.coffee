module = angular.module('impac.components.widgets.accounts-balance-sheet',[])

module.controller('WidgetAccountsBalanceSheetCtrl', ($scope, $q, ChartFormatterSvc, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramSelectorFrontDeferred = $q.defer()
  $scope.paramSelectorBackDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramSelectorFrontDeferred.promise
    $scope.paramSelectorBackDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  $scope.periodOptions = [
    {label: "Year", value: "YEARLY"},
    {label: "Quarter", value: "QUARTERLY"},
    {label: "Month", value: "MONTHLY"},
    {label: "Week", value: "WEEKLY"},
    {label: "Day", value: "DAILY"},
  ]
  $scope.period = angular.copy $scope.periodOptions[2]
  w.initContext = ->
    if w.content? && w.content.period? && _.contains(_.pluck($scope.periodOptions, 'value'), w.content.period)
      $scope.period = angular.copy _.find $scope.periodOptions, ((o) -> o.value == w.content.period)

    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)
      $scope.dates = w.content.dates
      $scope.unCollapsed = w.metadata.unCollapsed || []
      $scope.categories = Object.keys(w.content.summary)

  $scope.toggleCollapsed = (categoryName) ->
    if categoryName?
      if _.find($scope.unCollapsed, ((name) -> categoryName == name))
        $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
          name == categoryName
        )
      else
        $scope.unCollapsed.push(categoryName)
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isCollapsed = (categoryName) ->
    if categoryName?
      if _.find($scope.unCollapsed, ((name) -> categoryName == name))
        return false
      else
        return true


  # Mini-settings objects
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
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsBalanceSheet', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsBalanceSheetCtrl'
  }
)