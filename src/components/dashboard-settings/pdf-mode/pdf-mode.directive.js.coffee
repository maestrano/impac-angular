module = angular.module('impac.components.dashboard-settings.pdf-mode',[])

module.directive('dashboardSettingsPdfMode', ($templateCache, $window) ->
  return {
    restrict: 'A',
    scope: {
      onEnable: '&'
      onCancel: '&'
    },
    template: $templateCache.get('dashboard-settings/pdf-mode.tmpl.html'),
    
    link: (scope, element, attrs) ->
      scope.pdfMode = false

      scope.toggle = ->
        scope.pdfMode = !scope.pdfMode
        if scope.pdfMode
          scope.onEnable()
        else
          scope.onCancel()

      scope.print = ->
        $window.print()

  }
)
