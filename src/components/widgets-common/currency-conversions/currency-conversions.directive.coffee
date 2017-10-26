module = angular.module('impac.components.widgets-common.currency-conversions',[])
module.directive('commonCurrencyConversions', ($templateCache, ImpacAssets, $filter) ->
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
      scope.formattedRatesDate = $filter('momentDate')(scope.ratesDate, 'currency-conversions')
  }
)
