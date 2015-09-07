module = angular.module('impac.components.widgets-common.data-not-found',[])

module.directive('commonDataNotFound', ($templateCache, ImpacAssets) ->
  return {
    restrict: 'A',
    scope: {
    	widgetEngine: '='
    },
    template: $templateCache.get('widgets-common/data-not-found.tmpl.html'),
    link: (scope, element) ->
      scope.bgImage = ''
      # returns a string that is either the asset directory path, or empty.
      baseDir = ImpacAssets.get('dataNotFound')
      if scope.widgetEngine and baseDir.length > 0
        # checks for trailing slash and corrects.
        dir = baseDir.split('')
        dir = if dir[dir.length - 1] != '/'
        then dir.concat('/').join('')
        else dir.join('')
        scope.bgImage = dir + scope.widgetEngine + '.png'
  }
)
