# in template:
# {{ [amount] | mnoCurrency : [currency] : ([true|false]) }}
# or in js file:
# $filter('mnoCurrency')(amount,currency,[true|false])
#
angular.module('impac.filters.mno-currency', []).filter('mnoCurrency', ($filter) ->
  (amount, currency='', ISOmode=true) ->

    SYMBOLS = {
      USD: '$'
      AUD: '$'
      CAD: '$'
      CNY: '¥'
      EUR: '€'
      GBP: '£'
      HKD: '$'
      INR: ''
      JPY: '¥'
      NZD: '$'
      SGD: '$'
      PHP: '₱'
      AED: ''
      IDR: 'Rp'
    }

    return "" unless amount?

    symbol = if !ISOmode && _.has(SYMBOLS, currency) then SYMBOLS[currency] else ''
    s = $filter('currency')(amount, symbol)

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
