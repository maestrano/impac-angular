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
        if getBehaviour() == 'bls'
          today = moment().format('YYYY-MM-DD')
          return "As at #{today}"
        else
          dates = ImpacUtilities.selectedTimeRange(context.histParams)
          return "From #{dates.from} to #{dates.to}"
  }
)
