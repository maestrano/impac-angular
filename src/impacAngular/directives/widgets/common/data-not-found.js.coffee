module = angular.module('maestrano.analytics.widgets-common.data-not-found',['maestrano.assets'])

module.directive('commonDataNotFound', ['TemplatePath', 'AssetPath', (TemplatePath, AssetPath) ->
  return {
    restrict: 'A',
    scope: {
    	widgetEngine: '='
    },
    templateUrl: TemplatePath['analytics/widgets/common/data-not-found.html'],
    link: (scope, element) ->
    	bgImagePath = ["impac/data_not_found",scope.widgetEngine].join('/')
    	scope.bgImage = AssetPath[[bgImagePath,"png"].join('.')]
  }
])