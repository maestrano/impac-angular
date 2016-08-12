module = angular.module('impac.components.widgets-common.data-not-found',[])

module.directive('commonDataNotFound', ($templateCache, $log, $http, ImpacAssets, ImpacTheming, ImpacMainSvc) ->
  return {
    restrict: 'A',
    scope: {
      widgetEngine: '='
      widgetWidth: '='
      onDisplayAlerts: '&'
    },
    link: (scope, element) ->
      scope.content = ImpacTheming.get().dataNotFoundConfig
      baseDir = ImpacAssets.get('dataNotFound')
      if scope.widgetEngine and baseDir.length > 0
        # checks for trailing slash and corrects.
        dir = baseDir.split('')
        dir = if dir[dir.length - 1] != '/'
        then dir.concat('/').join('')
        else dir.join('')

        image = _.find element.children().first().children(), (elem) ->
          elem.id == 'not-found-bg'

        image.onerror = ->
          $log.warn("Missing data-not-found image for #{scope.widgetEngine}")
          debugger
          image.src = 'images/widget_bg_width_' + scope.widgetWidth + '.png'
          console.log("image.src ---> "+image.src)
          image.remove() if image?


      hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only
      scope.showAlertsTrigger = (hasMyobEssentialsOnly && scope.widgetEngine.match(/.*accounts\/.*/))
      scope.hasCallbackUrl = scope.content.linkUrlCallback?

    template: $templateCache.get('widgets-common/data-not-found.tmpl.html'),
  }
)
