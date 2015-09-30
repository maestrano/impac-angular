angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', (Kpis, DhbAnalyticsSvc) ->
    return {
      restrict: 'E'
      scope: {
        kpis: '='
      }
      templateUrl: 'kpis-bar/kpis-bar.tmpl.html'
      
      controller: ($scope) ->
        $scope.hideAvailableKpis = true
        $scope.showEditMode = false

        $scope.keyStats = [
          { name: 'Interest %', data: { real_value: '-15.30' }, static: true },
          { name: 'Profitability %', data: { real_value: '8.34' }, static: true},
          { name: 'Cost of capital', data: { real_value: '20.00' }, static: true},
          { name: 'TAX % based on FY14', data: { real_value: '29.91' }, static: true},
          { name: 'Super', data: { real_value: '$479,023' }, static: true},
        ]

        DhbAnalyticsSvc.load().then (success) ->
          currentDhb = _.find success, (dhb) ->
            dhb.id == DhbAnalyticsSvc.getId()

          metadata = {}
          metadata.organization_ids = _.map currentDhb.data_sources, (org) ->
            org.uid

          Kpis.index(metadata).then (success) ->
            $scope.availableKpis = success.kpis


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

          Kpis.create(kpi.endpoint, kpi.element_watched, extraParam).then (success) ->
            $scope.kpis.push(success)

        $scope.toggleEditMode = ->
          $scope.showEditMode = !$scope.showEditMode

    }
  )
