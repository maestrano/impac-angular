
# Impac! Angular config module.
# ---------------------------------------------
module = angular.module('maestrano.impac')

module.config(($httpProvider)->
  $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
)

module.config(($translateProvider, LOCALES) ->
  # # Path to translations files
  # $translateProvider.useStaticFilesLoader({
  #   prefix: 'locales/',
  #   suffix: '.json'
  # })

  # language strategy
  $translateProvider.useSanitizeValueStrategy('sanitizeParameters')
  $translateProvider.useMissingTranslationHandlerLog()
  $translateProvider.preferredLanguage(LOCALES.preferredLanguage)
  $translateProvider.fallbackLanguage(LOCALES.fallbackLanguage)

  # remember language
  # $translateProvider.useLocalStorage();
)
