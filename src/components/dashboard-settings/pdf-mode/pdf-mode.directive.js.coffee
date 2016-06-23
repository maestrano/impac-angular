module = angular.module('impac.components.dashboard-settings.pdf-mode',[])

module.directive('dashboardSettingsPdfMode', ($templateCache, $window, ImpacDashboardsSvc) ->
  return {
    restrict: 'A',
    scope: {},
    template: $templateCache.get('dashboard-settings/pdf-mode.tmpl.html'),

    link: (scope, element, attrs) ->
      scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
      scope.pdfMode = false
      scope.allNotTicked = false

      scope.toggle = ->
        scope.pdfMode = !scope.pdfMode
        ImpacDashboardsSvc.togglePdfMode(scope.pdfMode)

      scope.print = ->
        $window.print()

      ImpacDashboardsSvc.ticked().then(null, null, ->
        scope.allNotTicked = _.all(scope.currentDhb.widgets, { ticked: false })
      )

  }
)
