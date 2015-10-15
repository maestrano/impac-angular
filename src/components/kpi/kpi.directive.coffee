angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, ImpacKpisSvc) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
      }
      templateUrl: 'kpi/kpi.tmpl.html'

      controller: ($scope) ->
        $scope.showEditTarget = false
        $scope.availableKpis = ImpacKpisSvc.getKpisTemplates()
        $scope.tmp = { kpiName: '' }

        ImpacKpisSvc.show($scope.kpi) unless $scope.kpi.data

        $scope.updateName = ->
          return if _.isEmpty($scope.tmp.kpiName)
          $scope.kpi.name = $scope.tmp.kpiName
          ImpacKpisSvc.update($scope.kpi, {name: $scope.kpi.name})

        $scope.updateTarget = ->
          params = {}
          params.target = $scope.kpi.target unless _.isEmpty($scope.kpi.target)
          params.extra_param = $scope.kpi.extra_param unless _.isEmpty($scope.kpi.extra_param)

          unless _.isEmpty(params)
            ImpacKpisSvc.update($scope.kpi, params)

          $scope.showEditTarget = false

        buildExtraParams = ->
          angular.forEach($scope.availableKpis, (aKpi) ->
            $scope.extraParams = aKpi.extra_params if aKpi.endpoint == $scope.kpi.endpoint
          )

        $scope.displayEditTarget = ->
          buildExtraParams()
          $scope.kpi.target = {}
          $scope.showEditTarget = true

        $scope.isTargetReverse = ->
          $scope.kpi.target['reverse']? && $scope.kpi.target['reverse'] == 'true'

        $scope.deleteKpi = ->
          unless $scope.kpi.static
            ImpacKpisSvc.delete($scope.kpi).then (success)->
              $scope.onDelete()

    }
  )
