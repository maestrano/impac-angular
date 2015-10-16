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
        $scope.showEditSettings = false

        $scope.availableKpis = ImpacKpisSvc.getKpisTemplates()
        $scope.possibleExtraParams = []
        $scope.limit = {}
        $scope.possibleTargets = [
          { label: 'over', mode: 'min' }
          { label: 'below', mode: 'max' }
        ]
        $scope.tmp = { kpiName: '' }

        unless $scope.kpi.static
          ImpacKpisSvc.show($scope.kpi).then(
            (success) -> 
              kpiTemplate = _.find $scope.availableKpis, (aKpi) -> 
                aKpi.endpoint == $scope.kpi.endpoint

              if kpiTemplate? && kpiTemplate.extra_params?
                $scope.possibleExtraParams = kpiTemplate.extra_params

              $scope.kpi.targets ||= []
              if !_.isEmpty $scope.kpi.targets[0]
                $scope.limit.mode = _.keys($scope.kpi.targets[0])[0]
                $scope.limit.value = _.values($scope.kpi.targets[0])[0]
          )

        $scope.displayEditSettings = ->
          $scope.showEditSettings = true

        $scope.hideEditSettings = ->
          $scope.showEditSettings = false

        $scope.updateName = ->
          return if _.isEmpty($scope.tmp.kpiName)
          $scope.kpi.name = $scope.tmp.kpiName
          ImpacKpisSvc.update($scope.kpi, {name: $scope.kpi.name})

        $scope.updateSettings = ->
          params = {}
          if !(_.isEmpty $scope.limit.value || _.isEmpty $scope.limit.mode)
            target0 = {}
            target0[$scope.limit.mode] = $scope.limit.value
            params.targets = [target0]
          params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)
          
          ImpacKpisSvc.update($scope.kpi, params) unless _.isEmpty(params)

          $scope.showEditSettings = false

        $scope.deleteKpi = ->
          return if $scope.kpi.static
          ImpacKpisSvc.delete($scope.kpi).then ((success) -> $scope.onDelete())

    }
  )
