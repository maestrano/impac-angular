
# Impac! Angular config module.
# ---------------------------------------------
module = angular.module('impac.config', [])

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
