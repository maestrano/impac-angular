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
        context = scope.context
        if angular.isFunction(context.accountingBehaviour)
          context.accountingBehaviour()
        else
          context.accountingBehaviour

      getDateInfo = ->
        _self = this
        context = scope.context
        dates = ImpacUtilities.selectedTimeRange(context.histParams)
        if getBehaviour() == 'bls'
           $translate('impac.widget.common.time_period_info.to', {dateTo: "#{dates.to}"}).then((label) -> scope.date = label)
        else
          $translate('impac.widget.common.time_period_info.from_to', {dateFrom: "#{dates.from}", dateTo: "#{dates.to}"}).then((label) -> scope.date = label)

      getDateInfo()
  }
)
