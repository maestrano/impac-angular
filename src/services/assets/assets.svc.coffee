# provider for configuring impac static assets.
angular
  .module('impac.services.assets', [])
  .provider('ImpacAssets', () ->
    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    # parent app should host images, configure this provider to provide relative img paths.
    paths =
      dataNotFound: '',
      impacTitleLogo: 'dist/images/impac-title-logo.png',
      impacDashboardBackground: 'dist/images/impac-dashboard-background.png',

    #=======================================
    # Public methods available in config
    #=======================================
    provider.configure = (configOptions) ->
      angular.extend(paths, configOptions)

    #=======================================
    _$get = ($log) ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      service.get = (key) ->
        paths[key]

      return service
    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = ['$log'];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider
  )
