module = angular.module('impac.components.widgets-settings.chart-mode',[])

module.controller('SettingChartModeCtrl', ($scope, ImpacWidgetsSvc) ->

  w = $scope.parentWidget
  w.isCumulativeMode = true

  $scope.toggleChartMode = (mode) ->
    return if (w.isCumulativeMode && mode == 'cumulative') || (!w.isCumulativeMode && mode =='perMonth')
    w.isCumulativeMode = !w.isCumulativeMode
    ImpacWidgetsSvc.updateWidgetSettings(w,false)
    $scope.onToggle() if angular.isDefined $scope.onToggle

  # What will be passed to parentWidget
  setting = {}
  setting.key = "chart-mode"
  setting.isInitialized = false

  setting.initialize = ->
    if w.metadata? && angular.isDefined(w.metadata.isCumulativeMode)
      w.isCumulativeMode = w.metadata.isCumulativeMode
    return $scope

  setting.toMetadata = ->
    {isCumulativeMode: w.isCumulativeMode}

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingChartMode', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      onToggle: '&'
    },
    template: $templateCache.get('widgets-settings/chart-mode.tmpl.html'),
    controller: 'SettingChartModeCtrl'
  }
)
