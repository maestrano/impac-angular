angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', ($log, $compile, $templateCache, ImpacTheming, DhbAnalyticsSvc, Kpis) ->
    return {
      restrict: 'E'
      scope: {},
      controller: ($scope) ->

        kpisConfig = ImpacTheming.get().dhbKpisConfig

        $scope.keyStats =
          interests: {
            name: 'Interest %',
            data: {
              real_value: '-15.30'
            }
          }
          profitability: {
            name: 'Profitability %',
            data: {
              real_value: '8.34'
            }
          }
          capital: {
            name: 'Cost of capital',
            data: {
              real_value: '20.00'
            }
          }
          tax: {
            name: 'TAX % based on FY14',
            data: {
              real_value: '29.91'
            }
          }
          super: {
            name: 'Super',
            data: {
              real_value: '$479,023'
            }
          }

        $scope.kpis = []

        # Set callback for when dashboards and currentDhb are loaded, this gets called
        # from the dashboard.directive ctrl.
        DhbAnalyticsSvc.config.loadKpis = ->
          $scope.kpis = Kpis.getKPIs()

        $scope.addKpiOnClick = ->
          Kpis.addKPI()

        _compile = ->
          id = kpisConfig.parentElementId
          element = angular.element(document.getElementById(id))
          element.html($templateCache.get('kpis-bar/kpis-bar.tmpl.html')).show()
          $compile(element.contents())($scope)

        _compile()
    }
  )
