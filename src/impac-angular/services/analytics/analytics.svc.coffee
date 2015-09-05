angular
  .module('impac.services.analytics', [])
  # REFACTOR THIS INTO A SERVICE
  .factory('DhbAnalyticsSvc', ($http, $q, $window, $timeout, $log, impacLinking, impacRoutes) ->
    # Configuration
    self = service = {};

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
      if !self.config.$q? || force
        self.config.$q = $http.get(impacRoutes.baseDhbPath()).then (success) ->
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
      data = { dashboard: opts }
      data['dashboard']['organization_id'] ||= self.config.organizationId

      $http.post(impacRoutes.createDhbPath(), data).then(
        (success) ->
          dashboard = success.data
          self.data.push(dashboard)
          self.config.id = dashboard.id
          return dashboard
      )

    # Delete a dashboard
    service.dashboards.delete = (id) ->
      $http.delete(impacRoutes.deleteDhbPath(id)).then(
        (success) ->
          self.config.id = null
          dhbs = self.data
          self.data = _.reject(self.data, (e) -> e.id == id)
      )

    # Update a dashboard
    service.dashboards.update = (id, opts, overrideCurrentDhb=yes) ->
      data = { dashboard: opts }
      $http.put(impacRoutes.updateDhbPath(id),data).then(
        (success) ->
          dhb = _.findWhere(self.data,{id: id})
          angular.extend(dhb,success.data) if overrideCurrentDhb
        , (err) ->
          $log.error err
      )

    #======================================
    # Widgets Management #### REFACTOR INTO FACTORY ####
    #======================================
    service.widgets = {}
    # Create a new widget
    # Attributes
    # - widget_category category of widgets
    service.widgets.create = (dashboardId, opts) ->
      data = { widget: opts }
      $http.post(impacRoutes.createWidgetPath(dashboardId), data).then(
        (success) ->
          widget = success.data
          dashboard = _.findWhere(self.data,{ id: dashboardId })
          dashboard.widgets.push(widget)
          return widget
      )

    # Call Impac! API to retrieve the widget content (will be stored in widget.content)
    service.widgets.show = (widget, refresh_cache=false) ->
      data = {
        owner: widget.owner,
        sso_session: impacLinking.getSsoSession(),
        metadata: widget.metadata,
        engine: widget.category
      }
      angular.extend(data, {refresh_cache: true}) if refresh_cache

      data.metadata.organization_ids = impacLinking.getOrganizations()

      $http.post(impacRoutes.showWidgetPath(), data)

    # Delete a widget
    service.widgets.delete = (widgetId, currentDhb) ->
      $http
        .delete(impacRoutes.deleteWidgetPath(widgetId))
        .then( ->
          currentDhb.widgets = _.reject(currentDhb.widgets, (widget) -> widget.id == widgetId)
        )

    # Call the Maestrano API interface to update (mainly the metadata)
    service.widgets.update = (widget,opts) ->
      data = { widget: opts }
      $http.put(impacRoutes.updateWidgetPath(widget.id),data)

    return service
  )
