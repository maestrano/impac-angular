module = angular.module('impac.components.widgets-settings.forecast-payroll',[])
module.controller('SettingForecastPayrollCtrl', ($scope, $log, ImpacDashboardsSvc, ImpacMainSvc, ImpacWidgetsSvc) ->

  w = $scope.parentWidget

  $scope.toggleForecastPayroll = ->
    w.selectedForecastPayroll.enable = !w.selectedForecastPayroll.enable
    if(w.selectedForecastPayroll? && !w.selectedForecastPayroll.enable)
      w.selectedForecastPayroll.time_sheet = false

  $scope.toggleTimeSheetModifier= ->
    if(w.selectedForecastPayroll? && w.selectedForecastPayroll.enable)
      w.selectedForecastPayroll.time_sheet = !w.selectedForecastPayroll.time_sheet

  $scope.isToggleForecastPayroll = ->
    if(w.selectedForecastPayroll?)
      return w.selectedForecastPayroll.enable

  $scope.isToggleTimeSheetModifier= ->
    if(w.selectedForecastPayroll?)
      return w.selectedForecastPayroll.time_sheet

  # What will be passed to parentWidget
  setting = {enable: false, time_sheet: false}
  setting.key = "forecast_payroll"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        currentDashboard = config.currentDashboard
        if w.metadata? && w.metadata.forecast_payroll?
          w.selectedForecastPayroll = w.metadata.forecast_payroll
        else
          w.metadata.forecast_payroll = {enable: false, time_sheet: false}

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
