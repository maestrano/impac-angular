module = angular.module('impac.components.widgets-common.time-period-info',[])
module.directive('commonTimePeriodInfo', ($templateCache, ImpacUtilities, $translate) ->
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

      getDateInfo = ->
        dates = ImpacUtilities.selectedTimeRange(scope.context.histParams)
        if getBehaviour() == 'bls'
           $translate('impac.widget.common.time_period_info.to', {dateTo: "#{dates.to}"}).then((label) -> scope.date = yieldCaption(label))
        else
          $translate('impac.widget.common.time_period_info.from_to', {dateFrom: "#{dates.from}", dateTo: "#{dates.to}"}).then((label) -> scope.date = yieldCaption(label))

      getDateInfo()

      yieldCaption = (caption) ->
        if getInjectBefore().length > 0 then caption = caption.toLowerCase()
        [getInjectBefore(),caption,getInjectAfter()].join(' ')
  }
)
