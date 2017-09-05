angular
.module('impac.services.bolt-resources', [])
.service('BoltResources', ($http, ImpacMainSvc) ->

  authHeaders = ->
    auth = 'Basic ' + btoa(ImpacMainSvc.getSsoSessionId())
    { 'Authorization': auth }

  buildUrl = (pathArray, paramsHash) ->
    url = pathArray.join('/')
    params = decodeURIComponent( $.param(paramsHash) )
    [url, params].join('?')

  @index = (boltPath, resourcesName, params) ->
    url = buildUrl([boltPath, resourcesName], params)
    $http.get(url, { headers: authHeaders() })

  return
)
