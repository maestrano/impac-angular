module = angular.module('impac.components.widgets-settings.hist-mode',[])

module.controller('SettingHistModeCtrl', ($scope, ImpacWidgetsSvc) ->

    w = $scope.parentWidget
    w.isHistoryMode = false

    $scope.toggleHistMode = (mode) ->
      return if (w.isHistoryMode && mode == 'history') || (!w.isHistoryMode && mode =='current')
      w.isHistoryMode = !w.isHistoryMode
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

    # What will be passed to parentWidget
    setting = {}
    setting.key = "hist-mode"
    setting.isInitialized = false

    # initialization of time range parameters from widget.content.hist_parameters
    setting.initialize = ->
      if w.content? && w.content.hist_parameters? && mode = w.content.hist_parameters.mode
        if mode == 'history'
          w.isHistoryMode = true
        else
          w.isHistoryMode = false
        setting.isInitialized = true

    setting.toMetadata = ->
      if w.isHistoryMode
        mode = 'history'
      else
        mode = 'current'
      return {hist_parameters: {mode: mode}}

    w.settings ||= []
    w.settings.push(setting)

    # Setting is ready: trigger load content
    # ------------------------------------
    $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingHistMode', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
    },
    template: $templateCache.get('widgets-settings/hist-mode.tmpl.html'),
    controller: 'SettingHistModeCtrl'
  }
)
