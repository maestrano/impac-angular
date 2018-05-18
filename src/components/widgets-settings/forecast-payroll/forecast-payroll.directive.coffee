module = angular.module('impac.components.widgets-settings.forecast-payroll',[])
module.controller('SettingForecastPayrollCtrl', ($scope, ImpacDashboardsSvc) ->

  w = $scope.parentWidget

  $scope.toggleForecastPayroll = ->
      $scope.selectedForecastPayroll.enable = !$scope.selectedForecastPayroll.enable
      unless($scope.selectedForecastPayroll.enable)
        $scope.selectedForecastPayroll.time_sheet = false

  $scope.toggleTimeSheetModifier= ->
    if($scope.selectedForecastPayroll.enable)
      $scope.selectedForecastPayroll.time_sheet = !$scope.selectedForecastPayroll.time_sheet

  $scope.isToggleForecastPayroll = ->
    if($scope.selectedForecastPayroll?)
      return $scope.selectedForecastPayroll.enable

  $scope.isToggleTimeSheetModifier= ->
    if($scope.selectedForecastPayroll?)
      return $scope.selectedForecastPayroll.time_sheet

  # What will be passed to parentWidget
  setting = {}
  setting.key = "forecast_payroll"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        currentDashboard = config.currentDashboard
        $scope.selectedForecastPayroll = {enable: false, time_sheet: false}
        if w.metadata? && w.metadata.forecast_payroll? && typeof(w.metadata.forecast_payroll) == 'object'
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
