module = angular.module('impac.components.common.data-not-found',[])

module.directive('commonDataNotFound', ($templateCache, $log, $http, ImpacAssets, ImpacTheming, ImpacMainSvc) ->
  return {
    restrict: 'A',
    scope: {
      noImage: '=?'
      endpoint: '='
      width: '=?'
      onDisplayAlerts: '&?'
    },
    link: (scope, element) ->
      scope.content     = ImpacTheming.get().dataNotFoundConfig
      widgetImgsBaseDir = ImpacAssets.get('dataNotFound')
      usingDefaults     = false
      imagePath         = ''
      image             = element.find('.data-not-found #not-found-bg')[0]

      image.onerror = ->
        missingImageLocationMsg = if usingDefaults then 'library defaults' else scope.endpoint
        $log.warn("Missing data-not-found image for #{missingImageLocationMsg}")
        image.remove() if image?

      displayDefaultImage = ->
        return if scope.noImage || !scope.width
        usingDefaults = true
        imagePath = ImpacAssets.get('defaultImagesPath') + '/widget-bg-width-' + scope.width + '.png'
        image.src = imagePath

      # Custom widget images are provided with a directory of images.
      widgetImgsBaseDirProvided = ->
        scope.endpoint && widgetImgsBaseDir.length > 0

      loadCustomWidgetImage = ->
        # checks for trailing slash and corrects.
        dir = widgetImgsBaseDir.split('')
        dir = if dir[dir.length - 1] != '/'
        then dir.concat('/').join('')
        else dir.join('')

        imagePath = dir + scope.endpoint + '.png'

        # Check if custom image has been provided, if not, display default.
        $http.get(imagePath).then(
          -> image.src = imagePath
          -> displayDefaultImage()
        )

      load = ->
        # When providing custom images for widgets
        unless scope.noImage
          hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only
          scope.showAlertsTrigger = (hasMyobEssentialsOnly && scope.endpoint.match(/.*accounts\/.*/) && angular.isDefined(scope.onDisplayAlerts))
          return loadCustomWidgetImage() if widgetImgsBaseDirProvided()
          scope.hasCallbackUrl = scope.content.linkUrlCallback?
          # When providing no custom images, uses library defaults.
          displayDefaultImage()

      load()

    template: $templateCache.get('common/data-not-found.tmpl.html'),
  }
)
