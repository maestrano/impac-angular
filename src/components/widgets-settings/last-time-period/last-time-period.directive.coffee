module = angular.module('impac.components.widgets-settings.last-time-period',[])
module.controller('SettingLastTimePeriodCtrl', ($scope, $log, ImpacDashboardsSvc) ->

  w = $scope.parentWidget
  $scope.selectedOffer = {}
  $scope.selectedInterval = 1
  $scope.selectedTimeSpan = 'DAYS'
  $scope.intervals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  $scope.timeSpans = ['DAYS', 'WEEKS', 'MONTHS']

  # What will be passed to parentWidget
  setting = {}
  setting.key = "last_time_period"
  setting.isInitialized = false

  setting.initialize = ->
    $scope.selectedInterval = Number(w.content.last_time_period.interval)
    $scope.selectedTimeSpan = w.content.last_time_period.span

  setting.toMetadata = ->
    # w.content.selected_offer = $scope.selectedOffer
    return { last_time_period: {interval: $scope.selectedInterval, span: $scope.selectedTimeSpan} }

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingLastTimePeriod', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      onSelect: '&?'
      histParams: '=?'
    },
    template: $templateCache.get('widgets-settings/last-time-period.tmpl.html'),
    controller: 'SettingLastTimePeriodCtrl'
  }
)
