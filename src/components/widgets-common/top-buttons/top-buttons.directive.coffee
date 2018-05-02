module = angular.module('impac.components.widgets-common.top-buttons', [])
module.controller('CommonTopButtonsCtrl', ($scope, $rootScope, $log, ImpacWidgetsSvc, ImpacAssets, ImpacUtilities, ImpacDashboardsSvc) ->

  w = $scope.parentWidget
  w.isEditMode = false

  $scope.toggleEditMode = ->
    if !w.isLoading
      if w.isEditMode
        # = press 'Cancel' button
        w.isEditMode = false
        ImpacWidgetsSvc.initWidgetSettings(w)
      else
        # Otherwise, we pass in edit mode
        w.isEditMode = true

  $scope.hasInfo = ->
    w && w.content? && w.content.info? && w.content.info.length > 0

  $scope.isCsvExportable = ->
    template = _.find(ImpacDashboardsSvc.getWidgetsTemplates(), {endpoint: w.endpoint})
    _.get(template, 'metadata.bolt_path')

  $scope.exportCSV = ->
    ImpacWidgetsSvc.showAsCSV(w).then(
      (response) ->
        link = document.createElement('a')
        link.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(response)
        link.download = w.endpoint + '.csv'
        link.style.display = 'none'
        link.click()
    )
)

module.directive('commonTopButtons', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      onRefresh: '='
      onToggleInfoPanel: '&'
      onToggleDeleteWidget: '&'
      userAccesses: '='
    },
    template: $templateCache.get('widgets-common/top-buttons.tmpl.html'),
    controller: 'CommonTopButtonsCtrl'
  }
)
