module = angular.module('impac.components.widgets-common.data-not-found',[])

module.directive('commonDataNotFound', ($templateCache, ImpacAssets, ImpacTheming) ->
  return {
    restrict: 'A',
    scope: {
    	widgetEngine: '='
    },
    controller: ($scope) ->
      $scope.bgImage = ''
      $scope.content = ImpacTheming.get().dataNotFoundConfig
      baseDir = ImpacAssets.get('dataNotFound')
      if $scope.widgetEngine and baseDir.length > 0
        # checks for trailing slash and corrects.
        dir = baseDir.split('')
        dir = if dir[dir.length - 1] != '/'
        then dir.concat('/').join('')
        else dir.join('')

        $scope.bgImage = dir + $scope.widgetEngine + '.png'

    template: $templateCache.get('widgets-common/data-not-found.tmpl.html'),
  }
)
# TODO: where should this live? Is there a better way to do this?
# Checks if image is available, preventing displaying the broken image tile - if not, displays nothing.
module.directive('checkImage', ($log, $http) ->
  return {
    restrict: 'A'
    link: (scope, element, attrs) ->
      attrs.$observe('ngSrc', (ngSrc) ->
        $http.get(ngSrc).success( () ->
          # do nothing
        ).error( () ->
          # prevent broken image tile from being displayed, by attaching an empty src.
          element.attr('src', '')
        )
      )
  }
)
