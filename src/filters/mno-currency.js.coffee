# in template:
# {{ [amount] | mnoCurrency : [currency] : ([true|false]) }}
# or in js file:
# $filter('mnoCurrency')(amount,currency,[true|false])
#
angular.module('impac.filters.mno-currency', []).filter('mnoCurrency', ["$filter", ($filter) ->
  (amount, currency, showName=true) ->

    return "" unless amount?

    s = $filter('currency')(amount)

    # official accounting notation: replace '(15)' by: '-15'
    s = s.replace('(','-')
    s = s.replace(')','')

    return s unless currency?

    # for all Dollar based currencies
    if currency[currency.length - 1].toLowerCase() == 'd'
      return if showName then "#{s} #{currency}" else s
    else if currency == "EUR"
      # for Euros, we remove the $ sign and change "," into white spaces and "." into ","
      s = s.replace('$','')
      s = s.replace(',', ' ')
      s = s.replace('.', ',')
      return "#{s} €"
    # all other currencies
    else
      # for other than AUD and USD, we just remove the $ sign
      s = s.replace('$','')
      # when currency is... not a proper currency nor a %, we display an integer value (16.16 => 16)
      if !currency.match(/[A-Z]{3}/) && currency != '%' && currency != '(ratio)'
        s = parseInt(s)
      return if showName then "#{s} #{currency}" else s
])
