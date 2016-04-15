angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', ($templateCache, ImpacKpisSvc) ->
    return {
      restrict: 'E'
      scope: {
        kpis: '='
      }
      template: $templateCache.get('kpis-bar/kpis-bar.tmpl.html')

      controller: ($scope, $timeout, $log) ->
        $scope.hideAvailableKpis = true
        $scope.showKpisExpanded = false
        $scope.showEditMode = false
        $scope.isAddingKPI = false

        # references to services (bound objects shared between all controllers)
        # -------------------------------------
        $scope.availableKpis = ImpacKpisSvc.getKpisTemplates()

        # $scope.keyStats = [
        #   { name: 'Interest', data: { value: '-15.30', unit: '%' }, static: true },
        #   { name: 'Profitability', data: { value: '8.34', unit: '%' }, static: true},
        #   { name: 'Cost of capital', data: { value: '20.00', unit: 'AUD' }, static: true},
        #   { name: 'TAX % based on FY14', data: { value: '29.91', unit: '%' }, static: true},
        #   { name: 'Super', data: { value: '479023', unit: 'AUD' }, static: true}
        # ]

        $scope.toggleAvailableKpis = ->
          $scope.hideAvailableKpis = !$scope.hideAvailableKpis

        $scope.formatKpiName = (endpoint) ->
          endpoint_splitted = endpoint.split('/')
          name = endpoint_splitted[0] + ' | ' + endpoint_splitted.slice(1,endpoint_splitted.length).join(' ')
          name = name.replace('_', ' ')
          return name

        $scope.addKpi = (kpi) ->
          $scope.isAddingKPI = true
          ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched).then(
            (success) ->
              $scope.kpis.push(success)
            (error) ->
              $log.error("Impac Kpis bar can't add a kpi", error)
          ).finally(-> $scope.isAddingKPI = false)

        $scope.removeKpi = (kpiId) -> _.remove $scope.kpis, (kpi) -> kpi.id == kpiId

        $scope.toggleEditMode = ->
          $scope.showEditMode = !$scope.showEditMode
    }
  )
