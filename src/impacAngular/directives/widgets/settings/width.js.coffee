module = angular.module('maestrano.analytics.widgets-settings.width',['maestrano.assets'])

module.controller('SettingWidthCtrl', ['$scope', ($scope) ->

  w = $scope.parentWidget

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
  w.settings.push(setting)
])

module.directive('settingWidth', ['TemplatePath', (TemplatePath) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      min: '@',
      max: '@',
    },
    templateUrl: TemplatePath['analytics/widgets/settings/width.html'],
    controller: 'SettingWidthCtrl'
  }
])