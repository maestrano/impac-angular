angular
  .module('impac.services.kpis', [])
  .service('Kpis', ($log, $http, $filter, $q, ImpacLinking, ImpacRoutes, DhbAnalyticsSvc) ->

    _self = @

    # TODO: make this smarter, as currently it's called on every kpi load.
    @getLinkingData = ->
      return $q.all([ImpacLinking.getSsoSession(), ImpacLinking.getOrganizations()]).then(
        (results) ->
          return $q.when(results)
        (err) ->
          return $q.reject(err)
      )

    # gets users kpi's from dashboard
    # @getKPIs = ->
    #   _.where(DhbAnalyticsSvc.data, {id: DhbAnalyticsSvc.getId()})[0].kpis

    formatShowQuery = (basePath, endpoint, watchable, params) ->
      baseUrl = [basePath,endpoint,watchable].join('/')
      url = [baseUrl,decodeURIComponent( $.param( params ) )].join('?')
      return url

    # retrieves data for kpi from api
    @show = (kpi) ->
      deferred = $q.defer()
      _self.getLinkingData().then(
        (results) ->

          params = {}
          params.sso_session = results[0]
          params.target = kpi.target if kpi.target?
          params.metadata = kpi.metadata if kpi.metadata?
          params.extra_param = kpi.extra_param if kpi.extra_param?

          switch kpi.source
            when 'impac'
              host = ImpacRoutes.impacKpisBasePath()
            when 'local'
              host = ImpacRoutes.localKpisBasePath()

          url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params)

          $http.get(url).then(
            (response) ->
              deferred.resolve(response.data)
            (err) ->
              $log.error 'impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err
              deferred.reject(err)
          )
      )
      return deferred.promise

    # TODO: make this work.
    @addKPI = () ->
      params = {
        name: 'Finance Revenue',
        element_watched: 'total'
        endpoint: 'finance/revenue'
      }
      url = ImpacRoutes.createKpiPath DhbAnalyticsSvc.getId()
      $http.post(url, params).then(
        (success) ->
          $log.debug 'success adding KPI: ', success
        (err) ->
          $log.error 'impac-angular ERROR: Unable to add KPI ', err
      )

    return @
  )
