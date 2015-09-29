angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($templateCache) ->
    return {
      restrict: 'A'
      scope: {
        kpi: '=kpiData'
      }
      controller: ($scope) ->
        # dhb = DhbAnalyticsSvc.getCurrentDashboard()

      template: $templateCache.get('kpi/kpi.tmpl.html')
    }
  )
