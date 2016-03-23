module = angular.module('impac.components.widgets-common.editable-title',[])

module.controller('CommonEditableTitleCtrl', ($scope, ImpacWidgetsSvc) ->

    w = $scope.parentWidget

    $scope.updateName = ->
      if w.name.length == 0
        w.name = w.originalName
        return "Incorrect name"
      else
        data = { name: w.name }
        ImpacWidgetsSvc.update(w,data)
)

module.directive('commonEditableTitle', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      onToggle: '&'
    },
    template: $templateCache.get('widgets-common/editable-title.tmpl.html'),
    controller: 'CommonEditableTitleCtrl'
  }
)
