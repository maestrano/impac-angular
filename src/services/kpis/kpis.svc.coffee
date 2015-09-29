angular
  .module('impac.services.kpis', [])
  .service('Kpis', ($log, $http, $filter, $q, ImpacLinking, ImpacRoutes, DhbAnalyticsSvc) ->

    _self = @

    @getAvailableKpis = ->
      return [
        { end_point: '/finance/revenue/evolution', watchables: '' }
      ]

    # TODO: Improve this to save a local copy someone to reduce load times / queries.
    @getLinkingData = ->
      return $q.all([ImpacLinking.getSsoSession(), ImpacLinking.getOrganizations()]).then(
        (results) ->
          return $q.when(results)
        (err) ->
          return $q.reject(err)
      )

    @kpis = null

    @getKPIs = ->
      _.where(DhbAnalyticsSvc.data, {id: DhbAnalyticsSvc.getId()})[0].kpis

    @loadKpiContent = ->


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


    # this.getKpi = ->
    #   deferred = $q.defer()
    #   getLinkingData.then(
    #     (results) ->
    #       kpis = []
    #       promises = []

    #       _.forEach(getAvailableKpis(), (kpi) ->

    #         params = [ 'sso_session=' + results[0], 'target[limit]=15']

    #         _.forEach(_.pluck(results[1].organizations, 'uid'), (uid) ->
    #           params.push('metadata[organization_ids][]=' + uid)
    #         )

    #         # TODO: switch on kpis source
    #         switch kpi.source
    #           when 'impac'
    #             host = ImpacRoutes.impacKpisBasePath()
    #           when 'local'
    #             host = ImpacRoutes.localKpisBasePath()

    #         host = ImpacRoutes.impacKpisBasePath()

    #         url = $filter('urlHelper')(host + kpi.end_point, params)

    #         promises.push($http.get(url))
    #       )

    #       $q.all(promises).then(
    #         (responses) ->

    #           _.forEach(responses, (response) ->
    #             debugger
    #             kpis.push({

    #             })
    #           )
    #         (err) ->
    #           $log.error 'impac-angular ERROR: Could not retrieve KPI ' + kpi.end_point, err
    #       )
    #   )
    #   return deferred.promise

    return @
  )
