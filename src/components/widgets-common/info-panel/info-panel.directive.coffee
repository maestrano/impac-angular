module = angular.module('impac.components.widgets-common.info-panel',[])

module.directive('commonInfoPanel', ($templateCache, ImpacWidgetsTemplates) ->
  return {
    restrict: 'A'
    scope: {
      parentWidget: '='
      onClose: '&'
    }
    template: $templateCache.get('widgets-common/info-panel.tmpl.html')

    link: (scope) ->

      w = scope.parentWidget

      scope.hideInfoPanel = true
      scope.toggleInfoPanel = ->
        scope.hideInfoPanel = !scope.hideInfoPanel
        scope.onClose()

      scope.getWidgetTemplateName = ->
        cssClass = ImpacWidgetsTemplates.filename(w)
        return "" unless cssClass

        cssClassArray = cssClass.split('-')
        widgetCategory = cssClassArray.slice(0,1)
        widgetName = cssClassArray.slice(1, cssClassArray.length).join(' ')

        return "#{widgetCategory} - #{widgetName}"
  }
)
