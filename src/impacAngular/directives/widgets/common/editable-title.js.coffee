module = angular.module('maestrano.analytics.widgets-common.editable-title',['maestrano.assets'])

module.controller('CommonEditableTitleCtrl',
  ['$scope', 'DhbAnalyticsSvc',
  ($scope, DhbAnalyticsSvc) ->

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
])

module.directive('commonEditableTitle', ['TemplatePath', (TemplatePath) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    templateUrl: TemplatePath['analytics/widgets/common/editable-title.html'],
    controller: 'CommonEditableTitleCtrl'
  }
])