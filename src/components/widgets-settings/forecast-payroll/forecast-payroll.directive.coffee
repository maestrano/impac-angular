module = angular.module('impac.components.widgets-settings.forecast-payroll',[])
module.controller('SettingForecastPayrollCtrl', ($scope, $log, ImpacDashboardsSvc, ImpacMainSvc, ImpacWidgetsSvc) ->

  w = $scope.parentWidget
  w.selectedForecastPayroll = false

  $scope.toggleForecastPayroll = ->
    w.selectedForecastPayroll = !w.selectedForecastPayroll

  $scope.isToggleForecastPayroll = ->
    return w.selectedForecastPayroll

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
        w.selectedForecastPayroll = w.metadata.forecast_payroll
        setting.isInitialized = true
    )

  setting.toMetadata = ->
    return { forecast_payroll: w.selectedForecastPayroll }

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
