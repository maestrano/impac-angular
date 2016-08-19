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
      imagePath     = ''
      image         = _.find(element.children().first().children(), (elem) -> elem.id == 'not-found-bg')

      image.onerror = ->
        missingImageLocationMsg = if usingDefaults then 'library defaults' else scope.widgetEngine
        $log.warn("Missing data-not-found image for #{missingImageLocationMsg}")
        image.remove() if image?

      displayDefaultImage = ->
        usingDefaults = true
        imagePath = 'dist/images/widget-bg-width-' + scope.widgetWidth + '.png'
        image.src = imagePath

      # When providing custom images
      if scope.widgetEngine and baseDir.length > 0
        # checks for trailing slash and corrects.
        dir = baseDir.split('')
        dir = if dir[dir.length - 1] != '/'
        then dir.concat('/').join('')
        else dir.join('')

        imagePath = dir + scope.widgetEngine + '.png'

        # Check if custom image has been provided, if not, display default.
        $http.get(imagePath).then(
          -> image.src = imagePath
          -> displayDefaultImage()
        )

      # When providing no custom images, uses library defaults.
      else
        displayDefaultImage()


      hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only
      scope.showAlertsTrigger = (hasMyobEssentialsOnly && scope.widgetEngine.match(/.*accounts\/.*/))
      scope.hasCallbackUrl = scope.content.linkUrlCallback?

    template: $templateCache.get('widgets-common/data-not-found.tmpl.html'),
  }
)
