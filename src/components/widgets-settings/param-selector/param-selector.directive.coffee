module = angular.module('impac.components.widgets-settings.param-selector',[])

module.controller('SettingParamSelectorCtrl', ($scope, ImpacWidgetsSvc) ->

  $scope.showOptions = false

  $scope.toggleShowOptions = ->
    $scope.showOptions = !$scope.showOptions

  $scope.onInit = ->
    $scope.selectedOption = {}
    angular.extend $scope.selectedOption, $scope.selected
  
  $scope.onChangeOption = ->
    $scope.selectOption($scope.selectedOption)

  $scope.selectOption = (anOption) ->
    if anOption.value != $scope.selected.value
      angular.extend $scope.selected, anOption
      $scope.parentWidget.isLoading = true unless $scope.noReload
      ImpacWidgetsSvc.updateWidgetSettings($scope.parentWidget,!$scope.noReload)
      $scope.onSelect() if angular.isDefined $scope.onSelect
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
    param[$scope.param] = $scope.selected.value if !_.isEmpty($scope.selected)
    return param

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingParamSelector', ($templateCache) ->
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
    template: (elements, attrs) -> 
      return $templateCache.get(if attrs.classic then 'widgets-settings/param-selector-classic.tmpl.html' else 'widgets-settings/param-selector.tmpl.html')
    controller: 'SettingParamSelectorCtrl'
  }
)
