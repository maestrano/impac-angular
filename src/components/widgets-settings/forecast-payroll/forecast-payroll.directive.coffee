module = angular.module('impac.components.widgets-settings.forecast-payroll',[])
module.controller('SettingForecastPayrollCtrl', ($scope, ImpacDashboardsSvc) ->

  w = $scope.parentWidget
  $scope.selectedForecastPayroll = false

  $scope.toggleForecastPayroll = ->
    $scope.selectedForecastPayroll = !$scope.selectedForecastPayroll

  $scope.isToggleForecastPayroll = ->
    return $scope.selectedForecastPayroll

  # What will be passed to parentWidget
  setting = {}
  setting.key = "forecast_payroll"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        currentDashboard = config.currentDashboard
        return unless w.metadata? && w.metadata.forecast_payroll?
        $scope.selectedForecastPayroll = w.metadata.forecast_payroll
        setting.isInitialized = true
    )

  setting.toMetadata = ->
    return { forecast_payroll: $scope.selectedForecastPayroll }

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingForecastPayroll', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      mode: '@?'
      deferred: '='
      onSelect: '&?'
    },
    template: $templateCache.get('widgets-settings/forecast-payroll.tmpl.html'),
    controller: 'SettingForecastPayrollCtrl'
  }
)
