module = angular.module('impac.components.widgets-settings.params-picker',[])

module.controller('SettingParamsPickerCtrl', ($scope) ->

  w = $scope.parentWidget

  # What will be passed to parentWidget
  setting = {}
  setting.key = "params-picker"
  setting.isInitialized = false
  setting.paramName = $scope.param

  setting.initialize = ->
    $scope.sortableOptions = {
      'ui-floating': true,
      tolerance: 'pointer'
    }

    $scope.applyToDashboard = w.metadata[$scope.param].reach == 'dashboard'

    $scope.toggleReach = ->
      setting.reach = if $scope.applyToDashboard then 'dashboard' else 'widget'

    $scope.toggleReach()

    setting.isInitialized = true if _.isEmpty($scope.options)

  setting.toMetadata = ()->
    param = {}
    param[$scope.param] = {
      values:_.compact _.map $scope.options, (statusOption) -> statusOption.label if statusOption.selected
      reach: setting.reach
    }
    return param

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingParamsPicker', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      deferred: '='
      param: '@',
      options: '=',
      hasReach: '='
    },
    link: (scope, elements, attrs) ->
      scope.formattedParam = scope.param.replace('_',' ')
    template: $templateCache.get('widgets-settings/params-picker.tmpl.html'),
    controller: 'SettingParamsPickerCtrl'
  }
)
