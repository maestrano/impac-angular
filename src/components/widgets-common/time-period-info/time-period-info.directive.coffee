module = angular.module('impac.components.widgets-common.time-period-info',[])
module.directive('commonTimePeriodInfo', ($templateCache, ImpacUtilities) ->
  return {
    restrict: 'A'
    scope: {
      context: '='
    }
    template: $templateCache.get('widgets-common/time-period-info.tmpl.html')

    link: (scope, element) ->
      getBehaviour = ->
        context = scope.context
        if angular.isFunction(context.accountingBehaviour)
          context.accountingBehaviour()
        else
          context.accountingBehaviour

      scope.getDateInfo = ->
        context = scope.context
        dates = ImpacUtilities.selectedTimeRange(context.histParams)
        if getBehaviour() == 'bls'
          return "As at #{dates.to}"
        else
          return "From #{dates.from} to #{dates.to}"
  }
)
