angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, $templateCache, Kpis) ->
    return {
      restrict: 'EA'
      scope: {
        kpi: '=kpiData'
      }
      controller: ($scope) ->

        if $scope.kpi.endpoint
          Kpis.loadKpiContent($scope.kpi).then(
            (success) ->
              $scope.kpi.data = success.kpi
              $log.debug 'KPI: ', $scope.kpi
          )

      template: $templateCache.get('kpi/kpi.tmpl.html')
    }
  )
