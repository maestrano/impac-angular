module = angular.module('impac.components.widgets-common.editable-title',[])

module.controller('CommonEditableTitleCtrl', ($scope, DhbAnalyticsSvc) ->

    w = $scope.parentWidget

    $scope.updateName = ->
      if w.name.length == 0
        w.name = w.originalName
        return "Incorrect name"
      else
        data = { name: w.name }
        DhbAnalyticsSvc.widgets.update(w,data).then(
          (success)->
            w.originalName = w.name
            angular.extend(w, success.data)
          , ->
            w.name = w.originalName
        )
)

module.directive('commonEditableTitle', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    template: $templateCache.get('widgets-common/editable-title.tmpl.html'),
    controller: 'CommonEditableTitleCtrl'
  }
)
