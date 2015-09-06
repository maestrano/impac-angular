module = angular.module('impac.components.widgets-common.data-not-found',[])

module.directive('commonDataNotFound', ($templateCache, impacAssets) ->
  return {
    restrict: 'A',
    scope: {
    	widgetEngine: '='
    },
    template: $templateCache.get('widgets-common/data-not-found.tmpl.html'),
    link: (scope, element) ->
      scope.bgImage = ''
      if scope.widgetEngine?
        scope.bgImage = impacAssets.get('data_not_found/' + scope.widgetEngine + '.png')
  }
)
