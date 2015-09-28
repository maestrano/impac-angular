# Filter helper for processing params into a RESTful inline url.
angular
  .module('impac.filters.url-helper', [])
  .filter('urlHelper', () ->
    return (input, params) ->
      return if !input or !input.length
      i = 0
      keys = Object.keys(params)
      while i < keys.length
        input += '?' if i == 0
        input += keys[i] + '=' + params[keys[i]]
        input += '&' if i != (keys.length - 1)
        i++
      return input
  )
