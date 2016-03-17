angular.module('impac.filters.titleize', []).filter('titleize', ->
  return (s) ->
    s = if (s == undefined || s == null) then '' else s
    return s.toString().toLowerCase().replace( /\b([a-z])/g, (ch) ->
      return ch.toUpperCase()
    )
)
