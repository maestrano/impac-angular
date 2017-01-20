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
        if angular.isFunction(scope.context.accountingBehaviour) then scope.context.accountingBehaviour() else scope.context.accountingBehaviour

      getInjectBefore = ->
        return '' unless angular.isDefined(scope.context.injectBefore)
        if angular.isFunction(scope.context.injectBefore) then scope.context.injectBefore() else scope.context.injectBefore

      getInjectAfter = ->
        return '' unless angular.isDefined(scope.context.injectAfter)
        if angular.isFunction(scope.context.injectAfter) then scope.context.injectAfter() else scope.context.injectAfter

      scope.getDateInfo = ->
        dates = ImpacUtilities.selectedTimeRange(scope.context.histParams)
        if getBehaviour() == 'bls'
          return yieldCaption("As at #{dates.to}")
        else
          return yieldCaption("From #{dates.from} to #{dates.to}")

      yieldCaption = (caption) ->
        if getInjectBefore().length > 0 then caption = caption.toLowerCase()
        [getInjectBefore(),caption,getInjectAfter()].join(' ')
  }
)
