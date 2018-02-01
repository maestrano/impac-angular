module = angular.module('impac.components.widgets-settings.hist-mode',[])

module.controller('SettingHistModeCtrl', ($scope, $translate, $timeout, ImpacWidgetsSvc, ImpacTheming, ImpacUtilities) ->

  w = $scope.parentWidget
  $scope.showModeChoser ||= true

  w.isHistoryMode = w.metadata && w.metadata.hist_parameters && w.metadata.hist_parameters.mode == 'history'

  $scope.forwardParams = {
    accountingBehaviour: ->
      $scope.accountingBehaviour
  }

  $scope.toggleHistMode = (mode) ->
    return if (w.isHistoryMode && mode == 'history') || (!w.isHistoryMode && mode =='current')
    w.isHistoryMode = !w.isHistoryMode
    ImpacWidgetsSvc.updateWidgetSettings(w, false)
    $scope.onToggle() in angular.isDefined $scope.onToggle

  buildCurrentLabel = ->
    labels = ImpacTheming.get().widgetSettings.histModeChoser.currentLabels
    if $scope.accountingBehaviour? && labels[$scope.accountingBehaviour]
      needPrefix = !$scope.endDate || ($scope.endDate == moment().format('YYYY-MM-DD'))
      label = labels[$scope.accountingBehaviour]
      prefix = labels[$scope.accountingBehaviour] + '.prefix'
      $translate([prefix, label]).then((translations)->
        $scope.currentLabel = if needPrefix then "#{translations[prefix]} #{translations[label]}" else translations[label]
      )
    else
      $translate(labels.default).then((label)-> $scope.currentLabel = label)

  # What will be passed to parentWidget
  setting = {}
  setting.key = "hist-mode"
  setting.isInitialized = false

  # initialization of time range parameters from widget.content.hist_parameters
  setting.initialize = ->
    # Timeout to ensure latest scope bindings are available
    $timeout ->
      if w.metadata? && w.metadata.hist_parameters? && mode = w.metadata.hist_parameters.mode
        w.isHistoryMode = if mode == 'history' then true else false

      buildCurrentLabel()

      $scope.forwardParams.histParams = w.metadata && w.metadata.hist_parameters

      setting.isInitialized = true
      return $scope

  setting.toMetadata = ->
    mode = if w.isHistoryMode then 'history' else 'current'
    return {hist_parameters: {mode: mode}}


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
      endDate: '=?'
    },
    template: $templateCache.get('widgets-settings/hist-mode.tmpl.html'),
    controller: 'SettingHistModeCtrl'
  }
)
