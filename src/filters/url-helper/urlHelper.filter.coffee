# Filter helper for processing params Objects or Arrays into a RESTful inline url.
angular
  .module('impac.filters.url-helper', [])
  .filter('urlHelper', () ->
    return (input, params) ->
      return if !input or !input.length

      processArrayParams = ->
        input = [input,params.shift()].join('?')
        input = [].concat.apply([], [input, params]).join('&')

      processObjectParams = ->
        i = 0
        arr = []
        keys = Object.keys(params)
        while i < keys.length
          arr.push(keys[i] + '=' + params[keys[i]])
          i++
        params = arr
        processArrayParams()

      processArrayParams() if Array.isArray(params)
      processObjectParams() if typeof params == 'object' && !Array.isArray(params)

      return input
  )
