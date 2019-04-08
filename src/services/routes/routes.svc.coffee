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
      mnoHub: 'http://localhost:7000/mnoe/jpi/v1'
      impacApi: 'http://localhost:4000/api'

      dashboards:
        index: null
        show: null
        create: null
        update: null
        del: null
        copy: null

      dashboardTemplates:
        index: null
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

      alerts:
        index: null
        create: null
        update: null
        del: null

      organizations:
        appInstancesSync: null

    # Default bolts (proxied by Impac! API) - to be defined in configuration
    bolts =
      version: 'v2'
      engines: []

    #=======================================
    # Local helper methods
    #=======================================
    isBoltValid = (bolt) ->
      console.warn('Bolt has no provider', bolt) unless bolt.provider
      console.warn('Bolt has no name', bolt) unless bolt.name
      console.warn('Bolt is not mapped to a category', bolt) unless bolt.category
      Boolean(bolt.provider && bolt.name && bolt.category)

    #=======================================
    # Public methods available in config
    #=======================================
    provider.configureRoutes = (configOptions) ->
      angular.extend(defaults, configOptions)

    provider.configureBolts = (version, engines) ->
      for bolt in engines
        unless isBoltValid(bolt)
          console.warn('Default bolts will be used:', bolts)
          return false
      angular.extend(bolts, { version: version, engines: engines })

    #=======================================
    _$get = () ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      service.configureRoutes = (configOptions) ->
        angular.extend(defaults, configOptions)

      service.dashboards =
        index: (orgId=null) ->
          if defaults.dashboards.index
            defaults.dashboards.index.replace(':organization_id', orgId)
          else
            "#{defaults.mnoHub}/impac/dashboards"

        create: (orgId=null)->
          if defaults.dashboards.create
            defaults.dashboards.create.replace(':organization_id', orgId)
          else
            service.dashboards.index(orgId)

        show: (id) ->
          if defaults.dashboards.show
            defaults.dashboards.show.replace(':id', id)
          else
            "#{defaults.mnoHub}/impac/dashboards/#{id}"

        update: (id) ->
          if defaults.dashboards.update
            defaults.dashboards.update.replace(':id', id)
          else
            service.dashboards.show(id)

        delete: (id) ->
          if defaults.dashboards.del
            defaults.dashboards.del.replace(':id', id)
          else
            service.dashboards.show(id)

        copy: (sourceId) ->
          if defaults.dashboards.copy
            defaults.dashboards.copy.replace(':id', sourceId)
          else
            "#{service.dashboards.show(sourceId)}/copy"

      service.dashboardTemplates =
        index: ->
          if defaults.dashboardTemplates.index
            defaults.dashboardTemplates.index
          else
            "#{defaults.mnoHub}/impac/dashboard_templates"

      service.widgets =
        index: (dashboard_id) ->
          if defaults.widgets.index
            defaults.widgets.index.replace(':dashboard_id', dashboard_id)
          else
            "#{defaults.mnoHub}/impac/widgets"

        show: (endpoint, dashboard_id, id) ->
          if defaults.widgets.show
            defaults.widgets.show.replace(':endpoint', endpoint).replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{defaults.impacApi}/v1/widgets/#{endpoint}"

        create: (dashboard_id) ->
          if defaults.widgets.create
            defaults.widgets.create.replace(':dashboard_id', dashboard_id)
          else
            "#{service.dashboards.show(dashboard_id)}/widgets"

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

        templates: -> "#{defaults.impacApi}/v1/widgets"

      service.kpis =
        index: (dashboard_id) ->
          if defaults.kpis.index
            defaults.kpis.index.replace(':dashboard_id', dashboard_id)
          else
            "#{defaults.impacApi}/v1/kpis"

        show: (dashboard_id, id) ->
          if defaults.kpis.show
            defaults.kpis.show.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{defaults.impacApi}/v1/kpis"

        create: (dashboard_id) ->
          if defaults.kpis.create
            defaults.kpis.create.replace(':dashboard_id', dashboard_id)
          else
            "#{service.dashboards.show(dashboard_id)}/kpis"

        update: (dashboard_id, id) ->
          if defaults.kpis.update
            defaults.kpis.update.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{defaults.mnoHub}/impac/kpis/#{id}"

        delete: (dashboard_id, id) ->
          if defaults.kpis.del
            defaults.kpis.del.replace(':dashboard_id', dashboard_id).replace(':id', id)
          else
            "#{defaults.mnoHub}/impac/kpis/#{id}"

        local: -> defaults.kpis.local

        alerts:
          index: () ->
            if defaults.alerts.index
              defaults.alerts.index
            else
              "#{defaults.mnoHub}/impac/alerts"
          create: (kpi_id) ->
            if defaults.alerts.create
              defaults.alerts.create.replace(':kpi_id', kpi_id)
            else
              "#{defaults.mnoHub}/impac/kpis/#{kpi_id}/alerts"
          update: (id) ->
            if defaults.alerts.update
              defaults.alerts.update.replace(':id', id)
            else
              "#{defaults.mnoHub}/impac/alerts/#{id}"
          delete: (id) ->
            if defaults.alerts.del
              defaults.alerts.del.replace(':id', id)
            else
              "#{defaults.mnoHub}/impac/alerts/#{id}"

      service.organizations =
        appInstancesSync: (uid) ->
          if defaults.organizations.appInstancesSync
            defaults.organizations.appInstancesSync.replace(':uid', uid)
          else
            "#{defaults.mnoHub}/organizations/#{uid}/app_instances_sync"

      service.bolts = ->
        _.map bolts.engines, (engine) ->
          angular.extend engine, {
            path: "#{defaults.impacApi}/#{bolts.version}/#{engine.provider}/#{engine.name}"
          }

      return service
    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = [];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider

  )
