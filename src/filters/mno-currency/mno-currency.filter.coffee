# in template:
# {{ [amount] | mnoCurrency : [currency] : ([true|false]) }}
# or in js file:
# $filter('mnoCurrency')(amount,currency,[true|false])
#
angular.module('impac.filters.mno-currency', []).filter('mnoCurrency', ($filter, MNO_CURRENCIES) ->
  (amount, currency='', ISOmode=true, decimal) ->

    return "" unless amount?

    symbol = if !ISOmode && _.has(MNO_CURRENCIES, currency) then MNO_CURRENCIES[currency] else ''
    s = $filter('currency')(amount, symbol, decimal)

    # official accounting notation: replace '(15)' by: '-15'
    s = s.replace('(','-')
    s = s.replace(')','')

    # when currency is not a proper currency
    if (currency && !currency.match(/[A-Z]{3}/)) || currency == '%' || currency == '(ratio)'
      s = s.replace(/,/g, '')
      # nor a % or ratio, displays an integer value (1,316.16 => 1316)
      return parseInt(s) if currency != '%' && currency != '(ratio)'

    s = "#{s} #{currency}" if ISOmode

    return s
)
