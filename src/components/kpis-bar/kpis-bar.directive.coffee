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
        ImpacKpisSvc.load().then ->
          $scope.availableKpis = ImpacKpisSvc.getKpisTemplates()

        # $scope.keyStats = [
        #   { name: 'Interest', data: { value: '-15.30', unit: '%' }, static: true },
        #   { name: 'Profitability', data: { value: '8.34', unit: '%' }, static: true},
        #   { name: 'Cost of capital', data: { value: '20.00', unit: 'AUD' }, static: true},
        #   { name: 'TAX % based on FY14', data: { value: '29.91', unit: '%' }, static: true},
        #   { name: 'Super', data: { value: '479023', unit: 'AUD' }, static: true}
        # ]

        $scope.sortableOptions = {
          stop: ->
            ids = _.pluck $scope.kpis, 'id'
            ImpacKpisSvc.updateKpisOrder(ids)
          cursorAt:
            left: 100
            top: 20
          opacity: 0.5
          delay: 150
          tolerance: 'pointer'
          cursor: "move"
          revert: 250
          cancel: ".unsortable"
          helper: 'clone'
        }

        $scope.toggleAvailableKpis = ->
          $scope.hideAvailableKpis = !$scope.hideAvailableKpis

        $scope.formatKpiName = (endpoint)->
          ImpacKpisSvc.formatKpiName(endpoint)

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
