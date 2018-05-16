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

  @update = (boltPath, resourcesName, resourceId, attributes) ->
    url = [boltPath, resourcesName, resourceId].join('/')
    body =
      data:
        id: resourceId
        type: resourcesName
        attributes: attributes
    $http.put(url, body, { headers: authHeaders() })

  @create = (boltPath, resourcesName, attributes, relationships) ->
    url = [boltPath, resourcesName].join('/')
    body =
      data:
        type: resourcesName
        attributes: attributes
        relationships: relationships
    $http.post(url, body, { headers: authHeaders() })

  @destroy = (boltPath, resourcesName, resourceId) ->
    url = [boltPath, resourcesName, resourceId].join('/')
    $http.delete(url, { headers: authHeaders() })

  @patch = (boltPath, resourcesName, resourceId, custom_action, attributes) ->
    url = [boltPath, resourcesName, resourceId, custom_action].join('/')
    body =
      data:
        id: resourceId
        type: resourcesName
        attributes: attributes
    $http.patch(url, body, { headers: authHeaders() })

  return
)
