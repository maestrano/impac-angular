module = angular.module('impac.components.widgets-settings.limit-entries',[])

module.controller('SettingLimitEntriesCtrl', ($scope) ->
  setting = {}
  setting.key = 'limit-entries'

  setting.initialize = ->
    return true

  setting.toMetadata = ->
    return {limit_entries: $scope.selected}

  $scope.parentWidget.settings.push(setting)
  $scope.deferred.resolve(setting)
)

module.directive('settingLimitEntries', ($templateCache, ImpacWidgetsSvc) ->
  return {
    restrict: 'A'
    scope: {
      parentWidget: '='
      deferred: '='
      selected: '='
      max: '=?'
      options: '=?'
      entriesLabel: '=?'
    }

    link: (scope, elements, attrs) ->
      scope.options = [5, 15, 50] unless (scope.options? && scope.options.length > 0)

      scope.selectOption = (anOption) ->
        scope.selected = anOption
        ImpacWidgetsSvc.updateWidgetSettings(scope.parentWidget,false)

      scope.isOptionValid = (anOption) ->
        !scope.max? || anOption < scope.max


    controller: 'SettingLimitEntriesCtrl'
    template: $templateCache.get('widgets-settings/limit-entries.tmpl.html'),
  }
)
