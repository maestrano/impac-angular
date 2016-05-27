
# Impac! Angular config module.
# ---------------------------------------------
module = angular.module('impac.config', [])

module.config(($httpProvider)->
  $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
)
