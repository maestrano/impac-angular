module = angular.module('impac.components.dashboard-settings.pdf-mode',[])

module.directive('dashboardSettingsPdfMode', ($templateCache, $window, ImpacDashboardsSvc) ->
  return {
    restrict: 'A',
    scope: {},
    template: $templateCache.get('dashboard-settings/pdf-mode.tmpl.html'),
    
    link: (scope, element, attrs) ->
      scope.pdfMode = false

      scope.toggle = ->
        scope.pdfMode = !scope.pdfMode
        ImpacDashboardsSvc.togglePdfMode(scope.pdfMode)

      scope.print = ->
        $window.print()

  }
)
