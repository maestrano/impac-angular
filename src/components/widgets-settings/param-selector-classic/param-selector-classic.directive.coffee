module = angular.module('impac.components.widgets-settings.param-selector-classic', [])

module.controller('SettingParamSelectorClassicCtrl', ($scope, ImpacWidgetsSvc) ->

  $scope.onInit = ->
    $scope.selectedOption = {}
    angular.extend $scope.selectedOption, $scope.selected

  $scope.onChangeOption = ->
    if $scope.selectedOption.value != $scope.selected.value
      angular.extend $scope.selected, $scope.selectedOption
      $scope.parentWidget.isLoading = true unless $scope.noReload
      ImpacWidgetsSvc.updateWidgetSettings($scope.parentWidget,!$scope.noReload)
      $scope.onSelect() if angular.isDefined $scope.onSelect

  $scope.getTruncateValue = ->
    return parseInt($scope.truncateNo) || 20

  w = $scope.parentWidget

  # What will be passed to parentWidget
  setting = {}
  setting.key = "param-selector-classic"
  setting.isInitialized = false

  # initialization of time range parameters from widget.content.hist_parameters
  setting.initialize = ->
    setting.isInitialized = true if w.content?

  setting.toMetadata = ->
    param = {}
    param[$scope.param] = $scope.selected.value if !_.isEmpty($scope.selected)
    return param

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingParamSelectorClassic', ($templateCache) -> 
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      param: '@'
      options: '='
      selected: '='
      truncateNo: '@'
      onSelect: '&'
    },
    link: (scope, elements, attrs) ->
      scope.noReload = typeof attrs.noReload != 'undefined'
      scope.truncateNo = attrs.truncateNo || 20
    template: $templateCache.get('widgets-settings/param-selector-classic.tmpl.html'),
    controller: 'SettingParamSelectorClassicCtrl'
  }
)
