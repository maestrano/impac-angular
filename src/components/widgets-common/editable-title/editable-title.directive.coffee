module = angular.module('impac.components.widgets-common.editable-title',[])

module.controller('CommonEditableTitleCtrl', ($scope, ImpacWidgetsSvc, ImpacDashboardsSvc, $translate) ->

    w = $scope.parentWidget

    $scope.updateName = ->
      if w.name.length == 0
        w.name = w.originalName
        $translate.instant('impac.widget.editable_title.incorrect_name');
      else
        ImpacWidgetsSvc.update(w, { name: w.name }, false)

    $scope.getTooltip = ->
      if $scope.pdfMode
        ''
      else
        tooltipText = $translate.instant('impac.widget.editable_title.tooltip_text');
        "#{w.name} #{tooltipText}"

    ImpacDashboardsSvc.pdfModeEnabled().then(null, null, -> $scope.pdfMode = true)
    ImpacDashboardsSvc.pdfModeCanceled().then(null, null, -> $scope.pdfMode = false)
)

module.directive('commonEditableTitle', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      onToggle: '&'
      disabled: '='
    },
    template: $templateCache.get('widgets-common/editable-title.tmpl.html'),
    controller: 'CommonEditableTitleCtrl'
  }
)
