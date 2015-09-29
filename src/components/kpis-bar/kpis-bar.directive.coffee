angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', ($log, $compile, $templateCache, ImpacTheming, DhbAnalyticsSvc, Kpis) ->
    return {
      restrict: 'E'
      scope: {},
      controller: ($scope) ->

        kpisConfig = ImpacTheming.get().dhbKpisConfig

        $scope.keyStats =
          interests: { title: 'Interest %', value: '-15.30' }
          profitability: { title: 'Profitability %', value: '8.34' }
          capital: { title: 'Cost of capital', value: '20.00' }
          tax: { title: 'TAX % based on FY14', value: '29.91' }
          super: { title: 'Super', value: '$479,023' }

        $scope.kpis = []

        # Set callback for when dashboards and currentDhb are loaded
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
