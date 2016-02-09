# # provider for configuring http endpoints.
# angular
#   .module('impac.services.routes', [])
#   .provider('ImpacRoutes', () ->
#     provider = @
#     #=======================================
#     # Private Defaults
#     #=======================================
#     defaults =
#       syncAppsBasePath: '/mnoe/jpi/v1/organizations/:uid/app_instances_sync'
#       # manage dashboards in backend
#       dhbBasePath: '/mnoe/jpi/v1/impac/dashboards',
#       # manage widget in backend
#       widgetBasePath: '/mnoe/jpi/v1/impac/widgets',
#       # retrieve impac! widgets data
#       showWidgetPath: 'http://localhost:4000/api/v1/get_widget',
#       # path for widget suggestion feature
#       sendWidgetSuggestionPath: null
#       # manage kpi in backend
#       kpiBasePath: '/mnoe/jpi/v1/impac/kpis'
#       # retrieve impac! kpis data
#       impacKpisBasePath: 'http://localhost:4000/api/v2/kpis'
#       # retrieve local kpis data
#       localKpisBasePath: null

#     #=======================================
#     # Public methods available in config
#     #=======================================
#     provider.configureRoutes = (configOptions) ->
#       angular.extend(defaults, configOptions)

#     #=======================================
#     _$get = () ->
#       service = @
#       #=======================================
#       # Public methods available as service
#       #=======================================
#       # Dashboard routes
#       service.baseDhbPath = (orgId) -> if orgId? then "#{defaults.dhbBasePath}?org_id=#{orgId}" else defaults.dhbBasePath
#       service.showDhbPath = (id) -> "#{defaults.dhbBasePath}/#{id}"
#       service.createDhbPath = -> defaults.dhbBasePath
#       service.updateDhbPath = (id) -> service.showDhbPath(id)
#       service.deleteDhbPath = (id) -> service.showDhbPath(id)
#       # widget routes
#       service.showWidgetPath = -> defaults.showWidgetPath
#       service.widgetBasePath = (id) -> "#{defaults.widgetBasePath}/#{id}"
#       service.createWidgetPath = (dashboardId) -> "#{service.showDhbPath(dashboardId)}/widgets"
#       service.updateWidgetPath = (id) -> service.widgetBasePath(id)
#       service.deleteWidgetPath = (id) -> service.widgetBasePath(id)
#       # modal post routes
#       service.sendWidgetSuggestion = -> defaults.sendWidgetSuggestionPath
#       # kpi routes
#       service.impacKpisBasePath = -> defaults.impacKpisBasePath
#       service.localKpisBasePath = -> defaults.localKpisBasePath
#       service.createKpiPath = (id) -> "#{defaults.dhbBasePath}/#{id}/kpis"
#       service.updateKpiPath = (id) -> "#{defaults.kpiBasePath}/#{id}"
#       service.deleteKpiPath = (id) -> "#{defaults.kpiBasePath}/#{id}"
#       # webhooks
#       service.appInstancesSyncPath = (uid) -> "#{defaults.syncAppsBasePath.replace(':uid',uid)}"

#       return service
#     # inject service dependencies here, and declare in _$get function args.
#     _$get.$inject = [];
#     # attach provider function onto the provider object
#     provider.$get = _$get

#     return provider

#   )

# provider for configuring http endpoints.
angular
  .module('impac.services.routes', [])
  .provider('ImpacRoutes', () ->
    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    defaults =
      # base paths
      mnoHub: '/api/v2'
      impacPrefix: '/impac'
      impacApi: 'http://localhost:4000/api'
      
      dashboards:
        index: null
        show: null
        create: null
        update: null
        del: null

      widgets:
        index: null
        show: null
        create: null
        update: null
        del: null
        # path for widget suggestion feature
        suggest: null

      kpis:
        index: null
        show: null
        create: null
        update: null
        del: null
        # retrieve local kpis data
        local: null

      organizations:
        appInstancesSync: null

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
      service.dashboards =
        index: -> (defaults.dashboards.index || "#{defaults.mnoHub}#{defaults.impacPrefix}/dashboards")
        show: (id) ->
          if defaults.dashboards.show
            defaults.dashboards.show.replace(':id', id)
          else
            "#{service.dashboards.index()}/#{id}"

        create: -> (defaults.dashboards.create || service.dashboards.index())
        update: (id) ->
          if defaults.dashboards.update
            defaults.dashboards.update.replace(':id', id)
          else
            "#{service.dashboards.index()}/#{id}"
        delete: (id) ->
          if defaults.dashboards.del
            defaults.dashboards.del.replace(':id', id)
          else
            "#{service.dashboards.index()}/#{id}"

      service.widgets =
        index: (dashboard_id) ->
          if defaults.widgets.index
            defaults.widgets.index.replace(':dashboard_id', dashboard_id)
          else
            "#{service.dashboards.show(dashboard_id)}/widgets"
        show: (dashboard_id, id) ->
          if defaults.widgets.show
            defaults.widgets.show.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{defaults.impacApi}/v1/get_widget"
        create: (dashboard_id) ->
          if defaults.widgets.create
            defaults.widgets.create.replace(':dashboard_id', dashboard_id)
          else
            service.widgets.index(dashboard_id)
        update: (dashboard_id, id) ->
          if defaults.widgets.update
            defaults.widgets.update.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{service.widgets.index(dashboard_id)}/#{id}"
        delete: (dashboard_id, id) ->
          if defaults.widgets.del
            defaults.widgets.del.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{service.widgets.index(dashboard_id)}/#{id}"
        suggest: -> defaults.widgets.suggest

      service.kpis =
        index: (dashboard_id) ->
          if defaults.kpis.index
            defaults.kpis.index.replace(':dashboard_id', dashboard_id)
          else
            "#{defaults.impacApi}/v2/kpis"
        show: (dashboard_id, id) ->
          if defaults.kpis.show
            defaults.kpis.show.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{defaults.impacApi}/v2/kpis"
        create: (dashboard_id) ->
          if defaults.kpis.create
            defaults.kpis.create.replace(':dashboard_id', dashboard_id)
          else
            "#{service.dashboards.show(dashboard_id)}/kpis"
        update: (dashboard_id, id) ->
          if defaults.kpis.update
            defaults.kpis.update.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{service.kpis.create(dashboard_id)}/#{id}"
        delete: (dashboard_id, id) ->
          if defaults.kpis.del
            defaults.kpis.del.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{service.kpis.create(dashboard_id)}/#{id}"
        local: -> defaults.kpis.local

      service.organizations =
        appInstancesSync: (uid) ->
          if defaults.organizations.appInstancesSync
            defaults.organizations.appInstancesSync.replace(':uid', uid)
          else
            "#{defaults.mnoHub}/organizations/#{uid}/app_instances_sync"

      return service
    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = [];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider

  )
