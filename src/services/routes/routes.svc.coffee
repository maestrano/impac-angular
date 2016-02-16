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
        # Mnoe: /api/mnoe/jpi/v1/organizations/:organization_id/impac/dashboards
        # Maestrano: /api/js_api/v1/analytics/dashboards
        # Dev. Toolkit: /api/v2/impac/dashboards
        index: (orgId=null) ->
          if defaults.dashboards.index
            defaults.dashboards.index.replace(':organization_id', orgId)
          else
            "#{defaults.mnoHub}#{defaults.impacPrefix}/dashboards"

        # Mnoe: /api/mnoe/jpi/v1/impac/dashboards
        # Maestrano: /api/js_api/v1/analytics/dashboards
        # Dev. Toolkit: /api/v2/impac/dashboards
        create: -> (defaults.dashboards.create || "#{defaults.mnoHub}#{defaults.impacPrefix}/dashboards")

        show: (id) ->
          if defaults.dashboards.show
            defaults.dashboards.show.replace(':id', id)
          else
            "#{service.dashboards.create()}/#{id}"

        update: (id) ->
          if defaults.dashboards.update
            defaults.dashboards.update.replace(':id', id)
          else
            "#{service.dashboards.create()}/#{id}"
        delete: (id) ->
          if defaults.dashboards.del
            defaults.dashboards.del.replace(':id', id)
          else
            "#{service.dashboards.create()}/#{id}"

      service.widgets =
        index: (dashboard_id) ->
          if defaults.widgets.index
            defaults.widgets.index.replace(':dashboard_id', dashboard_id)
          else
            "#{service.dashboards.show(dashboard_id)}/widgets"

        # Mnoe: /api/mnoe/jpi/v1/impac/widgets/:id
        # Maestrano: /api/js_api/v1/analytics/widgets/:id
        # Dev. Toolkit: /api/v2/impac/dashboards/:dashboard_id/widgets/:id
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
