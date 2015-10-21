# in template:
# {{ [amount] | mnoCurrency : [currency] : ([true|false]) }}
# or in js file:
# $filter('mnoCurrency')(amount,currency,[true|false])
# 
angular.module('impac.filters.mno-currency', []).filter('mnoCurrency', ["$filter", ($filter) ->
  (amount, currency, showName=true) ->
    if amount?
      s = $filter('currency')(amount)

      # official accounting notation: replace '(15)' by: '-15'
      s = s.replace('(','-')
      s = s.replace(')','')

      if currency?
        if currency == "EUR"
          # for Euros, we remove the $ sign and change "," into white spaces and "." into ","
          s = s.replace('$','')
          s = s.replace(',', ' ')
          s = s.replace('.', ',')
          return "#{s} €"
        else if currency != "AUD" && currency != "USD"
          # for other than AUD and USD, we just remove the $ sign
          s = s.replace('$','')

          # when currency is... not a proper currency nor a %, we display an integer value (16.16 => 16)
          if !currency.match(/[A-Z]{3}/) && currency != '%'
            s = parseInt(s)

      if showName && currency?
        return "#{s} #{currency}"
      else
        return s
    else
      return ""

])
