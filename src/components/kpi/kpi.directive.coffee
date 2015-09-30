angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, Kpis) ->
    return {
      restrict: 'EA'
      scope: {
        kpi: '='
        editMode: '='
      }
      templateUrl: 'kpi/kpi.tmpl.html'

      controller: ($scope) ->
        $scope.showEditTarget = false

        Kpis.show($scope.kpi) unless $scope.kpi.data

        $scope.updateName = ->
          Kpis.update($scope.kpi, {name: $scope.kpi.name}) unless $scope.kpi.static

        $scope.updateTarget = ->
          if !_.isEmpty $scope.kpi.target.limit
            Kpis.update($scope.kpi, {target: $scope.kpi.target}) unless $scope.kpi.static
          $scope.showEditTarget = false

        $scope.displayEditTarget = ->
          $scope.kpi.target ||= {}
          $scope.kpi.target.limit ||= ""
          $scope.showEditTarget = true

        $scope.isTargetReverse = ->
          $scope.kpi.target['reverse']? && $scope.kpi.target['reverse'] == 'true'

    }
  )
