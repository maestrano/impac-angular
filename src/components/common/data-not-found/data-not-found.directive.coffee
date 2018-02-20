module = angular.module('impac.components.common.data-not-found',[])

module.directive('commonDataNotFound', ($templateCache, $location, ImpacTheming) ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      settings = ImpacTheming.get().dataNotFoundConfig
      scope.content = settings.content
      scope.designerMode = ImpacTheming.get().dhbConfig.designerMode.enabled
      scope.messageVisible = true

      scope.hide = ->
        scope.messageVisible = false

      scope.goToMarketplace = ->
        if settings.linkUrlCallback?
          settings.linkUrlCallback()
        else
          $location.url(settings.linkUrl)

    template: $templateCache.get('common/data-not-found.tmpl.html'),
  }
)
