
# Impac! Angular config module.
# ---------------------------------------------
module = angular.module('maestrano.impac')

module.config(($httpProvider)->
  $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
)

module.config(($translateProvider, ImpacThemingProvider) ->

  settings = ImpacThemingProvider.$get().get().translateSettings

  # Path to translations files
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
