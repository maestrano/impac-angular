module = angular.module('impac.components.widgets-common.top-buttons', [])
module.controller('CommonTopButtonsCtrl', ($scope, $rootScope, $log, ImpacWidgetsSvc, ImpacAssets) ->

  w = $scope.parentWidget

  $scope.showCloseActive = false
  $scope.showEditActive = false
  $scope.showConfirmDelete = false

  w.isEditMode = false

  $scope.deleteWidget = ->
    ImpacWidgetsSvc.delete(w).then(
      (success) ->
        return true
      (errors) ->
        w.errors = Utilities.processRailsError(errors)
    )

  $scope.toggleEditMode = ->
    if !w.isLoading
      if w.isEditMode
        # Like a press on 'Cancel' button
        w.initSettings()
      else
        # Otherwise, we pass in edit mode
        w.isEditMode = true
)

module.directive('commonTopButtons', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    template: $templateCache.get('widgets-common/top-buttons.tmpl.html'),
    controller: 'CommonTopButtonsCtrl'
  }
)
