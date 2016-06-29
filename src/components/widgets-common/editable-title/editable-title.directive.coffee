module = angular.module('impac.components.widgets-common.editable-title',[])

module.controller('CommonEditableTitleCtrl', ($scope, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

    w = $scope.parentWidget

    $scope.updateName = ->
      if w.name.length == 0
        w.name = w.originalName
        return "Incorrect name"
      else
        data = { name: w.name }
        ImpacWidgetsSvc.update(w,data)

    $scope.getTooltip = ->
      if $scope.pdfMode
        return ''
      else
        return w.name + if w.hasEditAbility then ' (click to edit name)' else ''

    ImpacDashboardsSvc.pdfModeEnabled().then(null, null, ->
      $scope.pdfMode = true
    )
    ImpacDashboardsSvc.pdfModeCanceled().then(null, null, ->
      $scope.pdfMode = false
    )
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
