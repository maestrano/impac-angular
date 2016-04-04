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
    $scope.applyForDashboard = false;
    $scope.applyForAll = ->
      setting.reach = $scope.applyForDashboard;

    setting.isInitialized = true if _.isEmpty($scope.options)

  setting.toMetadata = ()->
    param = {}
    param[$scope.param] = _.compact(_.map $scope.options, (statusOption) ->
      statusOption.label if statusOption.selected
    )
    param.reach = $scope.applyForDashboard = false;
    return param

  setting.getOptions = ->
    return $scope.options

  setting.setOptions = (options)->
    _.assign $scope.options, options

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
    },
    link: (scope, elements, attrs) ->
      scope.formattedParam = scope.param.replace('_',' ')
    template: $templateCache.get('widgets-settings/params-picker.tmpl.html'),
    controller: 'SettingParamsPickerCtrl'
  }
)
