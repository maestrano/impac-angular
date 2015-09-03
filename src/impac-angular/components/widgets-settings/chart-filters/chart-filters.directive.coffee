module = angular.module('impac.components.widgets-settings.chart-filters',[])

module.controller('SettingChartFiltersCtrl', ($scope) ->

  w = $scope.parentWidget

  setting = {}
  setting.key = "chart-filters"
  setting.isInitialized = false

  setting.initialize = ->
    if w.content.chart_filter? && $scope.filterCriteria = w.content.chart_filter.criteria
      $scope.maxEntities = w.content.chart_filter.max
      $scope.entityType = w.content.chart_filter.entity_type
      $scope.filterLabel = w.content.chart_filter.filter_label.replace(/_/g," ")

      if $scope.filterCriteria == "number"
        $scope.filterValuePercentage = 80
        $scope.filterValueNumber = w.content.chart_filter.value
      else
        $scope.filterValuePercentage = w.content.chart_filter.value
        $scope.filterValueNumber = Math.round($scope.maxEntities/2)
      setting.isInitialized = true

  setting.toMetadata = ->
    if w.content.chart_filter?
      if $scope.filterCriteria == "percentage"
        filterValue = $scope.filterValuePercentage
      else
        filterValue = $scope.filterValueNumber
      return { chart_filter: {criteria: $scope.filterCriteria, value: filterValue} }
    else
      return {}

  w.settings ||= []
  w.settings.push(setting)
)

module.directive('settingChartFilters', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    template: $templateCache.get('widgets/settings/chart-filters.html'),
    controller: 'SettingChartFiltersCtrl'
  }
)