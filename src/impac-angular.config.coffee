
# Impac! Angular config module.
# ---------------------------------------------
module = angular.module('maestrano.impac')

module.config(($httpProvider)->
  $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
)

# Retrieves or overrides whether to generate an error when a rejected promise is not handled.
# This feature is enabled by default in Angular v1.6.
# TODO: handle all unhandled promise rejections.
module.config(($qProvider)->
  $qProvider.errorOnUnhandledRejections(false)
)

module.config(($translateProvider, ImpacThemingProvider) ->

  settings = ImpacThemingProvider.$get().get().translateSettings

  # # Path to translations files
  if settings.customLocaleFiles.prefix
    $translateProvider.useStaticFilesLoader({
      prefix: settings.customLocaleFiles.prefix,
      suffix: settings.customLocaleFiles.suffix
    })

  # language strategy
  $translateProvider.useSanitizeValueStrategy('escapeParameters')
  $translateProvider.useMessageFormatInterpolation()
  $translateProvider.preferredLanguage(settings.preferredLanguage)
  $translateProvider.fallbackLanguage(settings.fallbackLanguage)
)
