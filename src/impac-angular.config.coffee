
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

module.config(($translateProvider, LOCALES) ->
  # # Path to translations files
  # $translateProvider.useStaticFilesLoader({
  #   prefix: 'locales/',
  #   suffix: '.json'
  # })

  # language strategy
  $translateProvider.useSanitizeValueStrategy('escapeParameters')
  $translateProvider.useMessageFormatInterpolation()
  $translateProvider.useMissingTranslationHandlerLog()
  $translateProvider.preferredLanguage(LOCALES.preferredLanguage)
  $translateProvider.fallbackLanguage(LOCALES.fallbackLanguage)

  # remember language
  # $translateProvider.useLocalStorage();
)
