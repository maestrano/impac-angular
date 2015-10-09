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
      setting.isInitialized = true if _.isEmpty($scope.options)


    setting.toMetadata = ->
      param = {}
      param["#{$scope.param}"] = _.compact(_.map $scope.options, (statusOption) ->
        statusOption.label if statusOption.selected
      )
      return param

    w.settings ||= []
    w.settings.push(setting)
)

module.directive('settingParamsPicker', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      param: '@',
      options: '=',
    },
    link: (scope, elements, attrs) ->
      scope.formattedParam = scope.param.replace('_',' ')
    template: $templateCache.get('widgets-settings/params-picker.tmpl.html'),
    controller: 'SettingParamsPickerCtrl'
  }
)
