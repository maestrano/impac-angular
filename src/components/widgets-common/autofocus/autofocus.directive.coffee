module = angular.module('impac.components.widgets-common.autofocus',[])

module.directive('autofocus', ($timeout) ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      $timeout ->
        element[0].focus()
  }
)
