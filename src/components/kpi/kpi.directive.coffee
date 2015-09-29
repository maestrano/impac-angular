angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, Kpis) ->
    return {
      restrict: 'EA'
      scope: {
        kpi: '='
      }
      templateUrl: 'kpi/kpi.tmpl.html'

      controller: ($scope) ->
        Kpis.show($scope.kpi).then(
          (success) ->
            $scope.kpi.data = success.kpi
            $log.debug 'KPI: ', $scope.kpi
        ) unless $scope.kpi.data
    }
  )
