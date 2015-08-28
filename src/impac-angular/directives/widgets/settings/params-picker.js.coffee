module = angular.module('maestrano.analytics.widgets-settings.params-picker',[])

module.controller('SettingParamsPickerCtrl',
  ['$scope', 'DhbAnalyticsSvc',
  ($scope, DhbAnalyticsSvc) ->

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
])

module.directive('settingParamsPicker', ['TemplatePath', (TemplatePath) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      param: '@',
      options: '=',
    },
    link: (scope, elements, attrs) ->
      scope.formattedParam = scope.param.replace('_',' ')
    templateUrl: TemplatePath['analytics/widgets/settings/params-picker.html'],
    controller: 'SettingParamsPickerCtrl'
  }
])