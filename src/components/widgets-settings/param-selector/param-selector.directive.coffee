module = angular.module('impac.components.widgets-settings.param-selector',[])

module.controller('SettingParamSelectorCtrl', ($scope) ->

    $scope.showOptions = false

    $scope.toggleShowOptions = ->
      $scope.showOptions = !$scope.showOptions

    $scope.selectOption = (anOption) ->
      if anOption != $scope.selected
        $scope.selected = anOption
        w.updateSettings(!$scope.noReload)
      $scope.toggleShowOptions()

    $scope.getTruncateValue = ->
      return parseInt($scope.truncateNo) || 20

    w = $scope.parentWidget

    # What will be passed to parentWidget
    setting = {}
    setting.key = "param-selector"
    setting.isInitialized = false

    # initialization of time range parameters from widget.content.hist_parameters
    setting.initialize = ->
      setting.isInitialized = true if w.content?

    setting.toMetadata = ->
      param = {}
      param["#{$scope.param}"] = $scope.selected.value
      return param

    w.settings ||= []
    w.settings.push(setting)
)

module.directive('settingParamSelector', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      param: '@',
      options: '=',
      selected: '=',
      truncateNo: '@',
    },
    link: (scope, elements, attrs) ->
      scope.noReload = typeof attrs.noReload != 'undefined'
      scope.truncateNo = attrs.truncateNo || 20
    template: $templateCache.get('widgets-settings/param-selector.tmpl.html'),
    controller: 'SettingParamSelectorCtrl'
  }
)
