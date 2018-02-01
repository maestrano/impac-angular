# provider for configuring impac static assets.
angular
  .module('impac.services.assets', [])
  .provider('ImpacAssets', () ->
    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    # Parent apps can provide custom images, or use the default images by providing
    # a defaultImagesPath of which is the parent apps responsibility to make publically available.
    # See the README.md for more information on this.
    paths =
      defaultImagesPath: '/images'
      impacTitleLogo: ':default/impac-title-logo.png'
      impacDashboardBackground: ':default/impac-dashboard-background.png'
      currencyConversionsIcon: ':default/currency-conversions.png'
      cashFlowLegendIcon: ':default/cash-flow.png'
      payablesLegendIcon: ':default/payables.png'
      projectedCashLegendIcon: ':default/projected-cash.png'
      receivablesLegendIcon: ':default/receivables.png'
      plotLineLegendIcon: ':default/plot-line-icon.svg'
      areaLegendIcon: ':default/area-icon.svg'
      greenArrowUp: ':default/green-arrow-up.svg'
      redArrowDown: ':default/red-arrow-down.svg'

    #=======================================
    # Public methods available in config
    #=======================================
    provider.configure = (configOptions) ->
      angular.extend(paths, configOptions)
      # For images with impac-angular defaults, inject the provided default images path.
      _.forIn(paths, (v, k)-> paths[k] = v.replace(':default', paths.defaultImagesPath))

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
