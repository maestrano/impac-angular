module = angular.module('impac.components.kpi-common.kpi-info-panel',[])
module.directive('kpiInfoPanel', ($templateCache) ->
  return {
    restrict: 'A'
    scope: {
      onClose: '&',
      kpi: '='
    }
    template: $templateCache.get('kpi-common/kpi-info-panel.tmpl.html')

    link: (scope) ->

      scope.toggleInfoPanel = ->
        scope.onClose()
  }
)
