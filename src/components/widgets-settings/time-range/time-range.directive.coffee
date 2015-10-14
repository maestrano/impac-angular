module = angular.module('impac.components.widgets-settings.time-range',[])

module.controller('SettingTimeRangeCtrl', ($scope, $log) ->

  w = $scope.parentWidget

  $scope.numberOfPeriods = (new Date()).getMonth() + 1
  $scope.selectedPeriod = "MONTHLY"
  $scope.PERIODS = ['DAILY','WEEKLY','MONTHLY','QUARTERLY','YEARLY']

  $scope.periodToUnit = ->
    nb = $scope.numberOfPeriods
    period = $scope.selectedPeriod
    if period != "DAILY"
      unit = period.substring(0,period.length-2).toLowerCase()
    else
      unit = "day"
    if nb > 1
      unit = unit.concat("s")
    return unit

  # What will be passed to parentWidget
  setting = {}
  setting.key = "time-range"
  setting.isInitialized = false

  # initialization of time range parameters from widget.content.hist_parameters
  setting.initialize = ->
    # if w.content? && hist = w.content.hist_parameters
    if w.metadata? && hist = w.metadata.hist_parameters
      $scope.selectedPeriod = hist.period if hist.period?
      $scope.numberOfPeriods = hist.number_of_periods if hist.number_of_periods?
      setting.isInitialized = true

  setting.toMetadata = ->
    return { hist_parameters: {period: $scope.selectedPeriod, number_of_periods: $scope.numberOfPeriods} }

  w.settings ||= []
  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingTimeRange', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
    },
    template: $templateCache.get('widgets-settings/time-range.tmpl.html'),
    controller: 'SettingTimeRangeCtrl'
  }
)
