module = angular.module('impac.components.widgets-settings.params-picker',[])

module.controller('SettingParamsPickerCtrl', ($scope) ->

  w = $scope.parentWidget

  # What will be passed to parentWidget
  setting = {}
  setting.key = "params-picker"
  setting.isInitialized = false

  setting.initialize = ->
    $scope.sortableOptions = {
      'ui-floating': true,
      tolerance: 'pointer'
    }

    $scope.applyToDashboard = w.metadata[$scope.param] && w.metadata[$scope.param].reach == 'dashboard'

    # Method sets where widget should take and save settings; it's dashboard or widget
    $scope.toggleReach = ->
      setting.reach = if $scope.applyToDashboard then 'dashboard' else 'widget'

    $scope.toggleReach()

    setting.isInitialized = true if _.isEmpty($scope.options)

  setting.toMetadata = ()->
    param = {}
    param[$scope.param] = {
      values:_.compact _.map $scope.options, (statusOption) -> (statusOption.value || statusOption.label) if statusOption.selected
      reach: setting.reach
    }
    return param

  w.settings.push(setting)
  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingParamsPicker', ($templateCache, $translate) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      deferred: '='
      param: '@',
      options: '=',
      hasReach: '='
      description: '@'
    },
    link: (scope, elements, attrs) ->
      paramText = $translate.instant('impac.widget.settings.params-picker.' + scope.param)
      
      scope.formattedParam = if ~paramText.indexOf('impac.widget.settings.params-picker') then scope.param.replace(/_/g,' ') else paramText
      scope.description = $translate.instant('impac.widget.settings.params-picker.description') unless scope.description?
    template: $templateCache.get('widgets-settings/params-picker.tmpl.html'),
    controller: 'SettingParamsPickerCtrl'
  }
)
