angular
  .module('impac.services.main', [])
  .service 'ImpacMainSvc', ($q, $log, $timeout, ImpacLinking, ImpacNotifications) ->

    _self = @

# ====================================
# Getters
# ====================================
    @config =
      organizations: []
      currentOrganization: {}
      userData: {}
      currencies: ["USD","AUD","CAD","CNY","EUR","GBP","HKD","INR","JPY","NZD","SGD","PHP","AED","IDR","MMK"]

    @getSsoSessionId = ->
      _self.config.userData.sso_session

    @getFinancialYearEndMonth = ->
      parseInt(_self.config.currentOrganization.financial_year_end_month)

    @userIsKpiEnabled = ->
      _self.config.userData.kpi_enabled

#====================================
# Callbacks
#====================================
    @callbacks = {}

    @callbacks.organizationChanged = $q.defer()
    @organizationChanged = ->
      return _self.callbacks.organizationChanged.promise

# ====================================
# Load and initialize
# ====================================
    isConfigurationLoaded = ->
      return !( _.isEmpty(_self.config.organizations) || _.isEmpty(_self.config.currentOrganization || _.isEmpty(_self.config.userData)) )


    @load = (force=false) ->
      deferred = $q.defer()

      if !isConfigurationLoaded() || force

        $q.all([_self.loadOrganizations(force), _self.loadUserData(force)]).then (results) ->
          ImpacNotifications.load()
          deferred.resolve(_self.config)
          $log.info("Impac! - MainSvc: loaded (force=#{force})")
        ,(error) ->
          $log.error("Impac! - MainSvc: failed to load configuration")
          deferred.reject(error)

      else
        deferred.resolve(_self.config)

      return deferred.promise


    @loadOrganizations = (force=false) ->
      deferred = $q.defer()

      if _.isEmpty(_self.config.organizations) || _.isEmpty(_self.config.currentOrganization) || force

        # Init
        _self.config.organizations = []
        _self.config.currentOrganization = {}
        _self.config.currentOrgMembers = []

        ImpacLinking.getOrganizations().then (success) ->

          if success.organizations? && success.organizations.length > 0
            _self.config.organizations = success.organizations
            _self.config.currentOrgMembers = success.currentOrgMembers
            _self.setCurrentOrganization(success.currentOrgId)

            $log.info("Impac! - MainSvc: Organizations loaded (force=#{force})")
          else
            $log.info("Impac! - MainSvc: retrieved empty organizations list")

          deferred.resolve(_self.config)

        ,(error) ->
          $log.error("Impac! - MainSvc: cannot load organizations")
          deferred.reject(error)

      else
        deferred.resolve(_self.config)

      return deferred.promise


    setDefaultCurrentOrganization = ->
      if _self.config.organizations? && _self.config.organizations.length > 0
        _self.config.currentOrganization = _self.config.organizations[0]
        $log.info("Impac! - MainSvc: first organization set as current by default")
        _self.callbacks.organizationChanged.notify(_self.config.currentOrganization)
        return true
      else
        $log.error("Impac! - MainSvc: cannot set default current organization")
        _self.config.currentOrganization = {}
        _self.callbacks.organizationChanged.notify(false)
        return {error: {code: 400, message: "cannot set default current organization"}}

    @setCurrentOrganization = (id=null) ->
      if id?
        fetchedOrg = _.find _self.config.organizations, ((org) -> id == org.id)

        if !_.isEmpty(fetchedOrg)
          _self.config.currentOrganization = fetchedOrg
          _self.callbacks.organizationChanged.notify(_self.config.currentOrganization)
          return true
        else
          $log.error("Impac! - MainSvc: organization: #{id} not found in organizations list")
          return setDefaultCurrentOrganization()

      else
        return setDefaultCurrentOrganization()


    userDataLocked = false
    @loadUserData = (force=false) ->
      deferred = $q.defer()

      unless userDataLocked
        userDataLocked = true

        if _.isEmpty(_self.config.userData) || force

          # Init
          _self.config.userData = {}

          ImpacLinking.getUserData().then(
            (user) ->
              angular.extend _self.config.userData, user
              if user.settings.currencies
                _self.config.currencies = user.settings.currencies

              $log.info("Impac! - MainSvc: User data loaded (force=#{force}) with sso_session #{_self.config.userData.sso_session}")
              deferred.resolve(_self.config.userData)

            (error) ->
              $log.error('Impac! - MainSvc: cannot retrieve user data')
              deferred.reject(error)
          ).finally( -> userDataLocked = false )

        else
          userDataLocked = false
          deferred.resolve(_self.config.userData)

      else
        $log.warn "Impac! - MainSvc: User data load locked. Trying again in 1s"
        $timeout (->
          _self.loadUserData(force).then(
            (success) -> deferred.resolve(success)
            (errors) -> deferred.reject(errors)
          )
        ), 1000

      return deferred.promise


# =====================================================
# Helpers
# =====================================================

    @override = (src, dst) ->
      for key,value of src
        delete src[key]
      for key,value of dst
        src[key] = value

      return src


    return _self
