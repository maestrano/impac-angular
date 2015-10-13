# in template:
# {{ [amount] | mnoCurrency : [currency] : ([true|false]) }}
# or in js file:
# $filter('mnoCurrency')(amount,currency,[true|false])
# 
angular.module('impac.filters.mno-currency', []).filter('mnoCurrency', ["$filter", ($filter) ->
  (amount, currency, showName=true) ->
    if amount?
      s = $filter('currency')(amount)

      # official accounting notation: (15) > replaced by: -15
      s = s.replace('(','-')
      s = s.replace(')','')

      if currency == "EUR"
        s = s.replace('$','')
        s = s.replace(',', ' ')
        s = s.replace('.', ',')
        return "#{s} €"
      else if currency != "AUD" && currency != "USD"
        s = s.replace('$','')

      if showName
        return "#{s} #{currency}"
      else
        return s
    else
      return ""

])
