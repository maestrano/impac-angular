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
      baseDir       = ImpacAssets.get('dataNotFound')
      usingDefaults = false
      image         = _.find(element.children().first().children(), (elem) -> elem.id == 'not-found-bg')

      imagePath     = ''

      # When providing custom images
      if scope.widgetEngine and baseDir.length > 0
        # checks for trailing slash and corrects.
        dir = baseDir.split('')
        dir = if dir[dir.length - 1] != '/'
        then dir.concat('/').join('')
        else dir.join('')

        imagePath = dir + scope.widgetEngine + '.png'

      # When providing no custom images, uses library defaults.
      else
        usingDefaults = true
        imagePath = 'dist/images/widget-bg-width-' + scope.widgetWidth + '.png'

      image.onerror = ->
        missingImageLocationMsg = if usingDefaults then 'library defaults' else scope.widgetEngine
        $log.warn("Missing data-not-found image for #{missingImageLocationMsg}")
        image.remove() if image?

      image.src = imagePath

      hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only
      scope.showAlertsTrigger = (hasMyobEssentialsOnly && scope.widgetEngine.match(/.*accounts\/.*/))
      scope.hasCallbackUrl = scope.content.linkUrlCallback?

    template: $templateCache.get('widgets-common/data-not-found.tmpl.html'),
  }
)
