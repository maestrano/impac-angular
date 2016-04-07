module = angular.module('impac.components.widgets-settings.accounting-behaviour',[])

module.directive('settingAccountingBehaviour', ($templateCache, $timeout) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
      defaultBehaviour: '=?'
    },
    template: $templateCache.get('widgets-settings/accounting-behaviour.tmpl.html'),
    
    link: (scope) ->
      w = scope.parentWidget

      setting = {}
      setting.key = "accounting-behaviour"

      setting.initialize = ->
        # Make sure scope.timeRange has been propagated
        $timeout ->
          if scope.defaultBehaviour? && scope.defaultBehaviour == 'pnl'
            scope.selectedBehaviour = 'pnl'
          else
            scope.selectedBehaviour = 'bls'

      setting.toMetadata = ->
        { accounting_behaviour: scope.selectedBehaviour }


      w.settings.push(setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)
