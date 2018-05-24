module = angular.module('impac.components.widgets-settings.forecast-payroll',[])
module.controller('SettingForecastPayrollCtrl', ($scope, ImpacDashboardsSvc) ->

  w = $scope.parentWidget

  $scope.toggleForecastPayroll = ->
      $scope.selectedForecastPayroll.enabled = !$scope.selectedForecastPayroll.enabled
      unless $scope.selectedForecastPayroll.enabled
        $scope.selectedForecastPayroll.time_logged = false

  $scope.toggleTimeSheetModifier= ->
    if $scope.selectedForecastPayroll.enabled
      $scope.selectedForecastPayroll.time_logged = !$scope.selectedForecastPayroll.time_logged

  $scope.isToggleForecastPayroll = ->
    if $scope.selectedForecastPayroll?
      return $scope.selectedForecastPayroll.enabled

  $scope.isToggleTimeSheetModifier= ->
    if $scope.selectedForecastPayroll?
      return $scope.selectedForecastPayroll.time_logged

  # What will be passed to parentWidget
  setting = {}
  setting.key = "forecast_payroll"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        currentDashboard = config.currentDashboard
        $scope.selectedForecastPayroll = { enabled: false, time_logged: false }
        forecastPayroll = _.get(w, 'metadata.forecast_payroll')
        $scope.selectedForecastPayroll = w.metadata.forecast_payroll if _.isPlainObject(forecastPayroll)

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
