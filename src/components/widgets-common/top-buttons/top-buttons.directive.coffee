module = angular.module('impac.components.widgets-common.top-buttons', [])
module.controller('CommonTopButtonsCtrl', ($scope, $rootScope, $log, ImpacWidgetsSvc, ImpacAssets, ImpacUtilities) ->

  w = $scope.parentWidget

  $scope.showCloseActive = false
  $scope.showConfirmDelete = false
  $scope.isDeletePopoverLoading = false

  w.isEditMode = false

  $scope.deleteWidget = ->
    $scope.isDeletePopoverLoading = true
    ImpacWidgetsSvc.delete(w).then(
      (success) ->
        return true
      (errors) ->
        w.errors = ImpacUtilities.processRailsError(errors)
    ).finally(
      ->
        $scope.isDeletePopoverLoading = false
    )

  $scope.toggleEditMode = ->
    if !w.isLoading
      if w.isEditMode
        # = press 'Cancel' button
        w.isEditMode = false
        ImpacWidgetsSvc.initWidgetSettings(w)
      else
        # Otherwise, we pass in edit mode
        w.isEditMode = true
)

module.directive('commonTopButtons', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      onRefresh: '='
    },
    template: $templateCache.get('widgets-common/top-buttons.tmpl.html'),
    controller: 'CommonTopButtonsCtrl'
  }
)
