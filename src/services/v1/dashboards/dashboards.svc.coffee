angular
  .module('impac.services.dashboards', [])
  .service 'ImpacDashboardsSvc', ($q, $http, $log, $timeout, ImpacMainSvc, ImpacRoutes, ImpacKpisSvc) ->


    #====================================
    # Initialization and getters
    #====================================

    _self = @
    @config = {}

    @config.dashboards = []
    @getDashboards = ->
      return _self.config.dashboards

    @config.currentDashboard = {}
    @getCurrentDashboard = ->
      return _self.config.currentDashboard

    @config.widgetsTemplates = []
    @getWidgetsTemplates = ->
      return _self.config.widgetsTemplates

    #====================================
    # Callbacks
    #====================================

    @callbacks = {}

    @callbacks.dashboardChanged = $q.defer()
    @dashboardChanged = ->
      return _self.callbacks.dashboardChanged.promise

    @callbacks.widgetAdded = $q.defer()
    @widgetAdded = ->
      return _self.callbacks.widgetAdded.promise


    #====================================
    # Context helpers (return booleans: can be called but can't be bound!)
    #====================================

    needConfigurationLoad = ->
      return  _.isEmpty(_self.config.dashboards) || _.isEmpty(_self.config.currentDashboard)

    @isThereADashboard = ->
      !_.isEmpty _self.config.currentDashboard

    @areThereSeveralDashboards = ->
      _self.config.dashboards.length > 1

    @isCurrentDashboardEmpty = ->
      _self.isThereADashboard() && _.isEmpty(_self.config.currentDashboard.widgets)


    #====================================
    # Loaders and setters
    #====================================

    @loadLocked=false
    @load = (force=false) ->

      # Singleton prevents concurrent calls of _self.load
      if !_self.loadLocked
        _self.loadLocked=true

        deferred = $q.defer()
        if (needConfigurationLoad() || force)

          ImpacMainSvc.loadOrganizations(force).then (success) ->
            orgId = success.currentOrganization.id

            $http.get(ImpacRoutes.baseDhbPath(orgId)).then (dashboards) ->
              _self.setDashboards(dashboards.data).then ->
                _self.setCurrentDashboard()
                _self.loadLocked=false
                deferred.resolve(_self.config)
              (error) ->
                _self.loadLocked=false
                deferred.reject(error)

            ,(error) ->
              $log.error("Impac - DashboardSvc: cannot retrieve dashboards list for org: #{orgId}")
              _self.loadLocked=false
              deferred.reject(error)

          ,(error) ->
            $log.error("Impac - DashboardSvc: cannot retrieve current organization")
            _self.loadLocked=false
            deferred.reject(error)

        else
          _self.loadLocked=false
          deferred.resolve(_self.config)

        return deferred.promise

      else
        $log.warn "ImpacDashboardsSvc.load locked. Trying again in 1s"
        $timeout (-> _self.load(force)), 1000


    setDefaultCurrentDashboard = ->
      if _self.config.dashboards? && _self.config.dashboards.length > 0
        $log.info("Impac - DashboardSvc: first dashboard set as current by default")
        ImpacMainSvc.override _self.config.currentDashboard, _self.config.dashboards[0]
        _self.setWidgetsTemplates(_self.config.currentDashboard.widgets_templates)
        ImpacKpisSvc.initialize(_self.config.currentDashboard)
        _self.initializeActiveTabs()
        _self.callbacks.dashboardChanged.notify(_self.config.currentDashboard)
        return true
      else
        $log.warn("Impac - DashboardSvc: cannot set default current dashboard")
        ImpacMainSvc.override _self.config.currentDashboard, {}
        _self.callbacks.dashboardChanged.notify(false)
        return false

    @setCurrentDashboard = (id=null) ->
      if id?
        fetchedDhb = _.find _self.config.dashboards, ((dhb) -> id == dhb.id)

        if !_.isEmpty(fetchedDhb)
          ImpacMainSvc.override _self.config.currentDashboard, fetchedDhb
          _self.setWidgetsTemplates(fetchedDhb.widgets_templates)
          ImpacKpisSvc.initialize(_self.config.currentDashboard)
          _self.initializeActiveTabs()
          _self.callbacks.dashboardChanged.notify(_self.config.currentDashboard)
          return true
        else
          $log.error("Impac - DashboardSvc: dashboard: #{id} not found in dashboards list")
          return setDefaultCurrentDashboard()

      else
        return setDefaultCurrentDashboard()


    # TODO: refactor backend controller: dashboards(orgId) should return only the dashboards linked to the organization
    # and not all the dashboards belonging to the user...
    belongsToCurrentOrganization = (dashboard, org) ->
      return _.includes(_.pluck(dashboard.data_sources, 'id'), org.id)


    @setDashboards = (dashboardsArray=[]) ->
      ImpacMainSvc.loadOrganizations().then (config) ->
        curOrg = config.currentOrganization
        # Clear array
        _.remove _self.config.dashboards, (-> true)
        for dhb in dashboardsArray
          if belongsToCurrentOrganization(dhb, curOrg)
            _self.config.dashboards.push dhb


    @setWidgetsTemplates = (templatesArray) ->
      # Will be filled only once
      return false if _.isEmpty(templatesArray) || !_.isEmpty(_self.config.widgetsTemplates)
      for template in templatesArray
        _self.config.widgetsTemplates.push template

      return true

    @initializeActiveTabs = ->
      for dhb in _self.config.dashboards
        _.merge dhb, {active: _self.config.currentDashboard.id == dhb.id}


    #====================================
    # CRUD methods
    #====================================

    @create = (dashboard) ->
      _self.load().then ->
        deferred = $q.defer()

        unless dashboard.currency?
          dashboard.currency = ImpacMainSvc.config.currentOrganization.currency || 'USD'

        data = { dashboard: dashboard }

        $http.post(ImpacRoutes.createDhbPath(), data).then (success) ->
          _self.config.dashboards.push(success.data)
          _self.setCurrentDashboard(success.data.id)
          deferred.resolve(success.data)
        ,(error) ->
          $log.error("Impac - DashboardSvc: cannot create dashboard with parameters: #{angular.toJson(dashboard)}", error)
          deferred.reject(error)

        return deferred.promise


    @delete = (id) ->
      deferred = $q.defer()

      $http.delete(ImpacRoutes.deleteDhbPath(id)).then (success) ->
        _.remove _self.config.dashboards, (dhb) ->
          id == dhb.id
        _self.setCurrentDashboard()
        deferred.resolve(success)
      ,(error) ->
        $log.error("Impac - DashboardSvc: cannot delete dashboard: #{id}")
        deferred.reject(error)

      return deferred.promise


    @update = (id, opts) ->
      deferred = $q.defer()
      data = { dashboard: opts }

      $http.put(ImpacRoutes.updateDhbPath(id),data).then (success) ->
        angular.merge( _.find(_self.config.dashboards, (dhb) ->
          id == dhb.id
        ), success.data)

        if id == _self.config.currentDashboard.id
          angular.merge _self.config.currentDashboard, success.data

        deferred.resolve(success.data)
      ,(error) ->
        $log.error("Impac - DashboardSvc: cannot update dashboard: #{id} with parameters: #{opts}")
        deferred.reject(error)

      return deferred.promise


    return _self
