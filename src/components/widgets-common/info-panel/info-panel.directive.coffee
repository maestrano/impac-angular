module = angular.module('impac.components.widgets-common.info-panel',[])

module.directive('commonInfoPanel', ($templateCache) ->
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
        cat_array = (w.metadata.template || w.category).split('/')
        cat_array = cat_array.slice(cat_array.length - 2, cat_array.length)
        result = "#{cat_array[0]} - #{cat_array[1].replace('_', ' ')}"
        return result
  }
)
