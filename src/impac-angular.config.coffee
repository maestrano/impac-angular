
# Impac! Angular config module.
# ---------------------------------------------
module = angular.module('maestrano.impac')

module.config(($httpProvider)->
  $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
)

module.config(($translateProvider, ImpacThemingProvider) ->
  # Language strategy
  $translateProvider.useSanitizeValueStrategy('escapeParameters')
  $translateProvider.useMessageFormatInterpolation()
)
