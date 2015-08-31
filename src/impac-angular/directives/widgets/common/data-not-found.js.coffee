module = angular.module('maestrano.analytics.widgets-common.data-not-found',[])

module.directive('commonDataNotFound', [ '$templateCache', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
    	widgetEngine: '='
    },
    template: $templateCache.get('widgets/common/data-not-found.html'),
    link: (scope, element) ->
        # todo::assets implement new assets system
    	# bgImagePath = ["impac/data_not_found",scope.widgetEngine].join('/')
    	# scope.bgImage = AssetPath[[bgImagePath,"png"].join('.')]
  }
])