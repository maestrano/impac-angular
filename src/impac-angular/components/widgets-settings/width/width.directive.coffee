module = angular.module('impac.components.widgets-settings.width',[])

module.controller('SettingWidthCtrl', ($scope, $log) ->

  w = $scope.parentWidget

  $log.debug('SettingWidthCtrl START', w);

  w.toogleExpanded = ->
    $scope.expanded = !$scope.expanded
    # We want to resize the widget without waiting for the response from the dashboarding API
    w.updateSettings(false)
    if $scope.expanded
      w.width = parseInt($scope.max)
    else
      w.width = parseInt($scope.min)

  # What will be passed to parentWidget
  setting = {}
  setting.key = "width"
  setting.isInitialized = false

  w.isExpanded = ->
    $scope.expanded

  # initialization of time range parameters from widget.content.hist_parameters
  setting.initialize = ->
    $log.debug('SettingWidthCtrl: setting.initialize START')
    if w.width?
      $scope.expanded = (w.width == parseInt($scope.max))
      setting.isInitialized = true

  setting.toMetadata = ->
    if $scope.expanded
      newWidth = $scope.max
    else
      newWidth = $scope.min
    return { width: parseInt(newWidth) }

  w.settings ||= []
  $log.debug('SettingWidthCtrl FINISH', w.settings);
  w.settings.push(setting)
)

module.directive('settingWidth', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      min: '@',
      max: '@',
    },
    template: $templateCache.get('widgets-settings/width.tmpl.html'),
    controller: 'SettingWidthCtrl'
  }
)
