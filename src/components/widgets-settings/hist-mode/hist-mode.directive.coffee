module = angular.module('impac.components.widgets-settings.hist-mode',[])

module.controller('SettingHistModeCtrl', ($scope, ImpacWidgetsSvc, ImpacTheming, ImpacUtilities) ->

  w = $scope.parentWidget
  w.isHistoryMode = false

  $scope.forwardParams = {
    accountingBehaviour: ->
      $scope.accountingBehaviour
  }

  $scope.toggleHistMode = (mode) ->
    return if (w.isHistoryMode && mode == 'history') || (!w.isHistoryMode && mode =='current')
    w.isHistoryMode = !w.isHistoryMode
    ImpacWidgetsSvc.updateWidgetSettings(w,false)
    $scope.onToggle() in angular.isDefined $scope.onToggle


  # What will be passed to parentWidget
  setting = {}
  setting.key = "hist-mode"
  setting.isInitialized = false

  # initialization of time range parameters from widget.content.hist_parameters
  setting.initialize = ->
    if w.metadata? && w.metadata.hist_parameters? && mode = w.metadata.hist_parameters.mode
      if mode == 'history'
        w.isHistoryMode = true
      else
        w.isHistoryMode = false
      setting.isInitialized = true

    $scope.forwardParams.histParams = w.metadata && w.metadata.hist_parameters
    return $scope

  setting.toMetadata = ->
    if w.isHistoryMode
      mode = 'history'
    else
      mode = 'current'
    return {hist_parameters: {mode: mode}}

  labels = ImpacTheming.get().widgetSettings.histModeChoser.currentLabels
  $scope.getCurrentLabel = ->
    if $scope.accountingBehaviour? && labels[$scope.accountingBehaviour]
      return labels[$scope.accountingBehaviour]
    else
      return labels.default


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
      onToggle: '&'
      accountingBehaviour: '@?'
    },
    template: $templateCache.get('widgets-settings/hist-mode.tmpl.html'),
    controller: 'SettingHistModeCtrl'
  }
)
