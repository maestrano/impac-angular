module = angular.module('impac.components.widgets-settings.params-checkboxes',[])

module.controller('SettingParamsCheckboxesCtrl', ($scope) ->

  w = $scope.parentWidget

  # What will be passed to parentWidget
  setting = {}
  setting.key = "params-checkboxes"

  setting.initialize = ->

  setting.toMetadata = ->
    param = {}
    param[$scope.param] = _.map $scope.options, (opt) -> { id: opt.id, value: opt.value }
    return param

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingParamsCheckboxes', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      deferred: '='
      param: '@',
      options: '=',
    },
    template: $templateCache.get('widgets-settings/params-checkboxes.tmpl.html'),
    controller: 'SettingParamsCheckboxesCtrl'
  }
)
