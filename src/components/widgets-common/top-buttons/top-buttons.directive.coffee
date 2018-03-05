module = angular.module('impac.components.widgets-common.top-buttons', [])
module.controller('CommonTopButtonsCtrl', ($scope, $rootScope, $log, ImpacWidgetsSvc, ImpacAssets) ->

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
