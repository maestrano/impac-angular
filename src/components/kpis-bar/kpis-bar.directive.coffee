angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', (ImpacKpisSvc) ->
    return {
      restrict: 'E'
      scope: {
        kpis: '='
      }
      templateUrl: 'kpis-bar/kpis-bar.tmpl.html'
      
      controller: ($scope, $timeout) ->
        $scope.hideAvailableKpis = true
        $scope.showEditMode = false
        $scope.showKpisExpanded = false

        # references to services (bound objects shared between all controllers)
        # -------------------------------------
        $scope.availableKpis = ImpacKpisSvc.getKpisTemplates()

        $scope.keyStats = [
          { name: 'Interest %', data: { real_value: '-15.30' }, static: true },
          { name: 'Profitability %', data: { real_value: '8.34' }, static: true},
          { name: 'Cost of capital', data: { real_value: '20.00' }, static: true},
          { name: 'TAX % based on FY14', data: { real_value: '29.91' }, static: true},
          { name: 'Super', data: { real_value: '$479,023' }, static: true},
        ]


        $scope.toggleAvailableKpis = ->
          $scope.hideAvailableKpis = !$scope.hideAvailableKpis

        $scope.formatKpiName = (endpoint) ->
          endpoint_splitted = endpoint.split('/')
          name = endpoint_splitted[0] + ' | ' + endpoint_splitted.slice(1,endpoint_splitted.length).join(' ')
          name = name.replace('_', ' ')
          return name

        $scope.addKpi = (kpi) ->
          if kpi.extra_params
            extraParam = []
            angular.forEach kpi.extra_params, (ex_param) ->
              param = {}
              param[ex_param.param] = ex_param.values[0]
              extraParam.push(param)
          else
            extraParam = null

          ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched, extraParam).then (success) ->
            $scope.kpis.push(success)

        $scope.removeKpi = (kpiId) ->
          kpisList = angular.copy($scope.kpis)
          $scope.kpis = _.reject kpisList, (kpi) ->
            kpi.id == kpiId

        $scope.toggleEditMode = ->
          $scope.showEditMode = !$scope.showEditMode

        $scope.expandKpis = ->
          $scope.showKpisExpanded = true

        $scope.collapseKpis = ->
          $scope.showKpisExpanded = false

    }
  )
