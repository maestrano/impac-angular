angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', (Kpis) ->
    return {
      restrict: 'E'
      scope: {
        kpis: '='
        }
      templateUrl: 'kpis-bar/kpis-bar.tmpl.html'
      
      controller: ($scope) ->
        $scope.keyStats = [
          { name: 'Interest %', data: { real_value: '-15.30' } },
          { name: 'Profitability %', data: { real_value: '8.34' }},
          { name: 'Cost of capital', data: { real_value: '20.00' }},
          { name: 'TAX % based on FY14', data: { real_value: '29.91' }},
          { name: 'Super', data: { real_value: '$479,023' }},
        ]

        # $scope.addKpiOnClick = ->
        #   Kpis.addKPI()
    }
  )
