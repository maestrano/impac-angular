module = angular.module('impac.components.widgets-common.currency-conversions',[])
module.directive('commonCurrencyConversions', ($templateCache, ImpacAssets) ->
  return {
    restrict: 'A'
    scope: {
      fxAmounts: '='
      baseCurrency: '='
      ratesDate: '='
    }
    template: $templateCache.get('widgets-common/currency-conversions.tmpl.html')

    link: (scope, element) ->
      scope.currencyConversionsIcon = ImpacAssets.get('currencyConversionsIcon')
      scope.popoverTemplateUrl = $templateCache.get('widgets-common/details-popover.html')
      scope.popoverTitle = "Currency Conversions Info"
      scope.formattedRatesDate = moment(scope.ratesDate).format('MMMM Do YYYY')
  }
)
