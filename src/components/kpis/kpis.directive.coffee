angular
  .module('impac.components.kpis', [])
  .directive('kpis', ($log, $compile, $http, $filter, $q, $templateCache, ImpacTheming, ImpacRoutes, ImpacLinking) ->
    return {
      restrict: 'E'
      scope: {},
      controller: ($scope) ->

        kpisConfig = ImpacTheming.get().dhbKpisConfig

        availableKpis = [
          { end_point: '/finance/revenue/evolution', watchables: '' }
        ]

        $scope.kpis = []

        getKpis = ->
          $q.all([ImpacLinking.getSsoSession(), ImpacLinking.getOrganizations()]).then(
            (results) ->
              _.forEach(availableKpis, (kpi) ->
                params = { 'sso_session': results[0], 'target[limit]': 15 }
                # _.forEach(_.pluck(results[1].organizations, 'uid'), (uid) ->
                #   params['metadata[organization_ids][]'] = uid
                # )
                params['metadata[organization_ids][]'] = _.pluck(results[1].organizations, 'uid')[0]
                url = $filter('urlHelper')(ImpacRoutes.kpisBasePath() + kpi.end_point, params)
                $http.get(url).then(
                  (success) ->
                    $scope.kpis.push({
                      end_point: kpi.end_point
                      data: success.data.kpi
                    })
                    $log.debug '$scope.kpis: ', $scope.kpis

                    _compile()

                  (err) ->
                    $log.error 'impac-angular ERROR: Could not retrieve KPI ' + kpi.end_point, err
                )
              )
          )

        _compile = ->
          id = kpisConfig.parentElementId
          element = angular.element(document.getElementById(id))
          element.html($templateCache.get('kpis/kpis.tmpl.html')).show()
          $compile(element.contents())($scope)

        getKpis()
    }
  )
