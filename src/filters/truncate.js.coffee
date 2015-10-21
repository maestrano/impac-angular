# Usage:
# {{some_text | truncate:100:'...':true}}
#
# Options:
# max (integer) - max length of the text, cut to this number of chars,
# tail (string, default: ' …') - add this string to the input string if the string was cut.
# wordwise (boolean) - if true, cut only by words bounds,
angular.module("impac.filters.truncate",[]).filter("truncate", ->
  (value, max, tail,wordwise) ->
    return ""  unless value
    
    max = parseInt(max, 10)
    
    return value  unless max
    return value  if value.length <= max
    
    value = value.substr(0, max)
    
    if wordwise
      lastspace = value.lastIndexOf(" ")
      value = value.substr(0, lastspace)  unless lastspace is -1
    
    return value + (tail or "…")
)
