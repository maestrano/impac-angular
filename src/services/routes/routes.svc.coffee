# provider for configuring http endpoints.
angular
  .module('impac.services.routes', [])
  .provider('ImpacRoutes', () ->
    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    defaults =
      dhbBasePath: '/mnoe/jpi/v1/impac/dashboards'
      widgetBasePath: '/mnoe/jpi/v1/impac/widgets'
      showWidgetPath: 'http://localhost:4000/api/v1/get_widget'
      # manage kpi in backend
      kpiBasePath: '/mnoe/jpi/v1/impac/kpis'
      # retrieve kpi data
      impacKpisBasePath: 'http://localhost:4000/api/v2/kpis'
      # retrieve the kpis data locally
      localKpisBasePath: null

    #=======================================
    # Public methods available in config
    #=======================================
    provider.configureRoutes = (configOptions) ->
      angular.extend(defaults, configOptions)

    #=======================================
    _$get = () ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      # Dashboard routes
      service.baseDhbPath = (orgId) -> if orgId? then "#{defaults.dhbBasePath}?org_id=#{orgId}" else defaults.dhbBasePath
      service.showDhbPath = (id) -> "#{defaults.dhbBasePath}/#{id}"
      service.createDhbPath = -> defaults.dhbBasePath
      service.updateDhbPath = (id) -> service.showDhbPath(id)
      service.deleteDhbPath = (id) -> service.showDhbPath(id)
      # widget routes
      service.showWidgetPath = -> defaults.showWidgetPath
      service.widgetBasePath = (id) -> "#{defaults.widgetBasePath}/#{id}"
      service.createWidgetPath = (dashboardId) -> "#{service.showDhbPath(dashboardId)}/widgets"
      service.updateWidgetPath = (id) -> service.widgetBasePath(id)
      service.deleteWidgetPath = (id) -> service.widgetBasePath(id)
      # kpi routes
      service.impacKpisBasePath = -> defaults.impacKpisBasePath
      service.localKpisBasePath = -> defaults.localKpisBasePath
      service.createKpiPath = (id) -> "#{defaults.dhbBasePath}/#{id}/kpis"
      service.updateKpiPath = (id) -> "#{defaults.kpiBasePath}/#{id}"
      service.deleteKpiPath = (id) -> "#{defaults.kpiBasePath}/#{id}"

      return service
    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = [];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider

  )
