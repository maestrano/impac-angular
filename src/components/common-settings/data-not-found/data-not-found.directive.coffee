module = angular.module('impac.components.common-settings.data-not-found',[])

module.directive('commonDataNotFound', ($templateCache, $log, $http, ImpacAssets, ImpacTheming, ImpacMainSvc) ->
  return {
    restrict: 'A',
    scope: {
      isKpi: '=?'
      engine: '='
      widgetWidth: '=?'
      onDisplayAlerts: '&?' # remove opt
    },
    link: (scope, element) ->
      scope.content     = ImpacTheming.get().dataNotFoundConfig
      widgetImgsBaseDir = ImpacAssets.get('dataNotFound')
      usingDefaults     = false
      imagePath         = ''
      image             = _.find(element.children().first().children(), (elem) -> elem.id == 'not-found-bg')

      image.onerror = ->
        missingImageLocationMsg = if usingDefaults then 'library defaults' else scope.engine
        $log.warn("Missing data-not-found image for #{missingImageLocationMsg}")
        image.remove() if image?

      displayDefaultImage = ->
        usingDefaults = true
        if scope.isKpi
          imagePath = ImpacAssets.get('defaultImagesPath') + '/kpi-bg.png'
        else
          imagePath = ImpacAssets.get('defaultImagesPath') + '/widget-bg-width-' + scope.widgetWidth + '.png'
        console.log('using defaults.. ', imagePath)
        image.src = imagePath

      # Custom widget images are provided with a directory of images.
      widgetImgsBaseDirProvided = ->
        scope.engine && widgetImgsBaseDir.length > 0

      loadCustomWidgetImage = ->
        # checks for trailing slash and corrects.
        dir = widgetImgsBaseDir.split('')
        dir = if dir[dir.length - 1] != '/'
        then dir.concat('/').join('')
        else dir.join('')

        imagePath = dir + scope.engine + '.png'

        # Check if custom image has been provided, if not, display default.
        $http.get(imagePath).then(
          -> image.src = imagePath
          -> displayDefaultImage()
        )

      load = ->
        # When providing custom images for widgets
        console.log('loading... isKpi? ', scope.isKpi)
        if scope.isKpi
          # TODO: implement custom KPI data not found image.
          # return loadCustomKpiImage() if kpiImgProvided()
        else
          hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only
          scope.showAlertsTrigger = (hasMyobEssentialsOnly && scope.engine.match(/.*accounts\/.*/))
          return loadCustomWidgetImage() if widgetImgsBaseDirProvided()
        scope.hasCallbackUrl = scope.content.linkUrlCallback?
        # When providing no custom images, uses library defaults.
        displayDefaultImage()

      load()

    template: $templateCache.get('common-settings/data-not-found.tmpl.html'),
  }
)
