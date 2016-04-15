angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', ($templateCache, ImpacKpisSvc) ->
    return {
      restrict: 'E'
      scope: {
        kpis: '='
      }
      template: $templateCache.get('kpis-bar/kpis-bar.tmpl.html')

      link: (scope, element, attrs, ctrl) ->

        # linked methods
        # ---------------------------
        scope.toggleLoader = (loading)->
          element.find('.kpi-loader')[if loading then 'show' else 'hide']()
          return

        scope.toggleAvailableKpis = ->
          scope.hideAvailableKpis = !scope.hideAvailableKpis

        scope.toggleEditMode = (editing)->
          scope.showEditMode = !scope.showEditMode

        scope.formatKpiName = (endpoint) ->
          endpoint_splitted = endpoint.split('/')
          name = endpoint_splitted[0] + ' | ' + endpoint_splitted.slice(1,endpoint_splitted.length).join(' ')
          name = name.replace('_', ' ')
          return name

        scope.addKpi = (kpi) ->
          scope.toggleLoader(true)
          ctrl.createKpi(kpi).finally(-> scope.toggleLoader(false))

        scope.removeKpi = (kpiId) ->
          _.remove scope.kpis, (kpi) -> kpi.id == kpiId

        # load
        # ---------------------------
        scope.toggleLoader(false)
        scope.hideAvailableKpis = true
        scope.showEditMode = false

        # references to services (bound objects shared between all controllers)
        # -------------------------------------
        scope.availableKpis = ctrl.getKpisTemplates()

        # scope.keyStats = [
        #   { name: 'Interest', data: { value: '-15.30', unit: '%' }, static: true },
        #   { name: 'Profitability', data: { value: '8.34', unit: '%' }, static: true},
        #   { name: 'Cost of capital', data: { value: '20.00', unit: 'AUD' }, static: true},
        #   { name: 'TAX % based on FY14', data: { value: '29.91', unit: '%' }, static: true},
        #   { name: 'Super', data: { value: '479023', unit: 'AUD' }, static: true}
        # ]

      controller: ($scope, $timeout, $log) ->

        this.getKpisTemplates = -> ImpacKpisSvc.getKpisTemplates()

        this.createKpi = (kpi)->
          ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched).then(
            (success) ->
              $scope.kpis.push(success)
            (error) ->
              $log.error("Impac Kpis bar can't add a kpi", error)
          )

        return this
    }
  )
