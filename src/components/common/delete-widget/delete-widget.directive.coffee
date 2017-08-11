module = angular.module('impac.components.common.delete-widget',[])

module.directive('commonDeleteWidget', ($templateCache, ImpacWidgetsSvc, ImpacUtilities) ->
  return {
    restrict: 'A',
    template: $templateCache.get('common/delete-widget.tmpl.html'),
    scope: {
      parentWidget: '='
      onDismiss: '&'
    }
    link: (scope, element) ->
      scope.loading = false

      scope.deleteWidget = ->
        scope.loading = true
        ImpacWidgetsSvc.delete(scope.parentWidget)
        .then(null, (e) -> scope.parentWidget.errors = ImpacUtilities.processRailsError(e))
        .finally(-> scope.loading = false)
  }
)
