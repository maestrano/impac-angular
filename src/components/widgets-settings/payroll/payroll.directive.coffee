module = angular.module('impac.components.widgets-settings.payroll',[])
module.controller('SettingPayrollCtrl', ($scope, ImpacDashboardsSvc) ->

  w = $scope.parentWidget

  $scope.togglePayroll = ->
      $scope.selectedPayroll.enabled = !$scope.selectedPayroll.enabled
      unless $scope.selectedPayroll.enabled
        $scope.selectedPayroll.time_logged = false

  $scope.toggleTimeSheetModifier= ->
    if $scope.selectedPayroll.enabled
      $scope.selectedPayroll.time_logged = !$scope.selectedPayroll.time_logged

  $scope.isTogglePayroll = ->
    if $scope.selectedPayroll?
      return $scope.selectedPayroll.enabled

  $scope.isToggleTimeSheetModifier= ->
    if $scope.selectedPayroll?
      return $scope.selectedPayroll.time_logged

  # What will be passed to parentWidget
  setting = {}
  setting.key = "payroll"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        currentDashboard = config.currentDashboard
        $scope.selectedPayroll = { enabled: false, time_logged: false }
        payroll = _.get(w, 'metadata.payroll')
        $scope.selectedPayroll = w.metadata.payroll if _.isPlainObject(payroll)

        setting.isInitialized = true
    )

  setting.toMetadata = ->
    return { payroll: $scope.selectedPayroll }

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingPayroll', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      mode: '@?'
      deferred: '='
      onSelect: '&?'
    },
    template: $templateCache.get('widgets-settings/payroll.tmpl.html'),
    controller: 'SettingPayrollCtrl'
  }
)
