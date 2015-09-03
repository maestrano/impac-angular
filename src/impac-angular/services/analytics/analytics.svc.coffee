angular
  .module('impac.services.analytics', [])
  .factory('DhbAnalyticsSvc', ($http,$q,$window, $timeout) ->
    # Configuration
    service = {};


    service.routes = {
      # Dashboard routes
      basePath: -> "/mnoe/jpi/v1/impac/dashboards"
      showPath: (id) -> "#{service.routes.basePath()}/#{id}"
      createPath: -> service.routes.basePath()
      updatePath: (id) -> service.routes.showPath(id)
      deletePath: (id) -> service.routes.showPath(id)
      baseWidgetPath: (id) -> "/mnoe/jpi/v1/impac/widgets/#{id}"
      # Impac! js_api # todo::impac: make this more dynamic, put it in a config variable somewhere.
      showWidgetPath: "http://localhost:4000/api/v1/get_widget",
      createWidgetPath: (dashboardId) -> "#{service.routes.showPath(dashboardId)}/widgets"
      updateWidgetPath: (id) -> service.routes.baseWidgetPath(id)
      deleteWidgetPath: (id) -> service.routes.baseWidgetPath(id)
    }

    service.defaultConfig = {
      delay: 1000 * 60 * 10 # minutes - long polling delay
    }

    service.config = {
      id: null # current dashboard loaded
      organizationId: null, # The organization id to load
      timerId: null, # The current timer id (used for long polling)
      $q: null # The current service promise
    }

    service.data = []

    service.isLocked = false

    #======================================
    # Data Management
    #======================================
    # Return the id of the currently displayed dashboard, or the first dashboard.
    service.getId = ->
      if (!service.config.id && service.data.length > 0)
        service.config.id = service.data[0].id
      else
        service.config.id

    service.getDashboards = ->
      service.data

    # Return the id of the currently loaded/loading organization
    service.getOrganizationId = ->
      service.config.organizationId

    # Configure the service
    service.configure = (opts) ->
      angular.copy(opts, service.config)
      angular.extend(service.config, service.defaultConfig)

    # loads the dashboards
    service.load = (force = false) ->
      self = service
      if !self.config.$q? || force
        self.config.$q = $http.get(self.routes.basePath()).then (success) ->
          angular.copy(success.data,self.data)
          console.log('dashboards: ', self.data)
      return self.config.$q

    #======================================
    # Analytics Dashboard Management ### REFACTOR INTO FACTORY ####
    #======================================
    service.dashboards = {}

    # Opts require
    # - name: the dashboard name
    # - organization_id: the organization id
    service.dashboards.create = (opts) ->
      self = service
      data = { dashboard: opts }
      data['dashboard']['organization_id'] ||= self.config.organizationId

      $http.post(self.routes.createPath(),data).then(
        (success) ->
          dashboard = success.data
          self.data.push(dashboard)
          self.config.id = dashboard.id
          return dashboard
      )

    # Delete a dashboard
    service.dashboards.delete = (id) ->
      self = service
      $http.delete(self.routes.deletePath(id)).then(
        (success) ->
          self.config.id = null
          dhbs = self.data
          self.data = _.reject(self.data, (e) -> e.id == id)
      )

    # Update a dashboard
    service.dashboards.update = (id, opts, overrideCurrentDhb=yes) ->
      self = service
      data = { dashboard: opts }
      $http.put(self.routes.updatePath(id),data).then(
        (success) ->
          dhb = _.findWhere(self.data,{id: id})
          angular.extend(dhb,success.data) if overrideCurrentDhb
        , (->)
      )

    #======================================
    # Widgets Management #### REFACTOR INTO FACTORY ####
    #======================================
    service.widgets = {}

    # todo::data-link: move to provider
    service.widgets.setGetOrganizations = (callback) ->
      service.widgets.getOrganizations = callback

    service.widgets.setGetSsoSession = (callback) ->
      service.widgets.getSsoSessionId = callback

    # Create a new widget
    # Attributes
    # - widget_category category of widgets
    service.widgets.create = (dashboardId, opts) ->
      self = service
      data = { widget: opts }
      $http.post(self.routes.createWidgetPath(dashboardId), data).then(
        (success) ->
          widget = success.data
          dashboard = _.findWhere(self.data,{ id: dashboardId })
          dashboard.widgets.push(widget)
          return widget
      )

    # Call Impac! API to retrieve the widget content (will be stored in widget.content)
    service.widgets.show = (widget, refresh_cache=false) ->
      self = service
      data = {
        owner: widget.owner,
        sso_session: service.widgets.getSsoSessionId(),
        metadata: widget.metadata,
        engine: widget.category
      }
      angular.extend(data, {refresh_cache: true}) if refresh_cache

      # todo::data-link
      data.metadata.organization_ids = service.widgets.getOrganizations()

      $http.post(self.routes.showWidgetPath, data)

    # Delete a widget
    service.widgets.delete = (widgetId, currentDhb) ->
      self = service
      $http
        .delete(self.routes.deleteWidgetPath(widgetId))
        .then( ->
          currentDhb.widgets = _.reject(currentDhb.widgets, (widget) -> widget.id == widgetId)
        )

    # Call the Maestrano API interface to update (mainly the metadata)
    service.widgets.update = (widget,opts) ->
      self = service
      data = { widget: opts }
      $http.put(self.routes.updateWidgetPath(widget.id),data)

    return service
  )