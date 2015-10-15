angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, Kpis) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
        availableKpis: '='
      }
      templateUrl: 'kpi/kpi.tmpl.html'

      controller: ($scope) ->
        $scope.showEditTarget = false
        Kpis.show($scope.kpi) unless $scope.kpi.data

        $scope.tmp =
          kpiName: ''

        $scope.updateName = ->
          return if _.isEmpty($scope.tmp.kpiName) || $scope.kpi.static
          $scope.kpi.name = $scope.tmp.kpiName
          Kpis.update($scope.kpi, {name: $scope.kpi.name})

        $scope.updateSettings = ->
          params =
            target: if _.isEmpty($scope.kpi.target) then null else $scope.kpi.target
            extra_param: if _.isEmpty($scope.kpi.extra_param) then null else $scope.kpi.extra_param

          unless _.isEmpty(params) || $scope.kpi.static
            Kpis.update($scope.kpi, params)

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
            Kpis.delete($scope.kpi).then (success)->
              $scope.onDelete()

    }
  )
