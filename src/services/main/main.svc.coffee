angular
  .module('impac.services.main', [])
  .service 'ImpacMainSvc', ($q, $log, ImpacLinking) ->

    _self = @
    @config = {}
    @config.organizations = []
    @config.currentOrganization = {}
    @config.userData = {}
    @config.currencies = ["USD","AUD","CAD","CNY","EUR","GBP","HKD","INR","JPY","NZD","SGD","PHP","AED","IDR"]


    isConfigurationLoaded = ->
      return !( _.isEmpty(_self.config.organizations) || _.isEmpty(_self.config.currentOrganization || _.isEmpty(_self.config.userData)) )


    @load = (force=false) ->
      deferred = $q.defer()

      if !isConfigurationLoaded() || force

        $q.all([_self.loadOrganizations(force), _self.loadUserData(force)]).then (results) ->
          deferred.resolve(_self.config)
        ,(error) ->
          $log.error("ImpacMainSvc: failed to load configuration")
          deferred.reject(error)

      else
        deferred.resolve(_self.config)

      return deferred.promise


    @loadOrganizations = (force=false) ->
      deferred = $q.defer()

      if _.isEmpty(_self.config.organizations) || _.isEmpty(_self.config.currentOrganization) || force

        ImpacLinking.getOrganizations().then (success) ->

          if success.organizations? && success.organizations.length > 0
            _self.config.organizations = success.organizations
            _self.setCurrentOrganization(success.currentOrgId)
          else
            _self.config.organizations = []
            _self.config.currentOrganization = {}
            $log.info("ImpacMainSvc: retrieved empty organizations list")

          deferred.resolve(_self.config)

        ,(error) ->
          $log.error("ImpacMainSvc: cannot load organizations")
          deferred.reject(error)

      else
        deferred.resolve(_self.config)

      return deferred.promise


    setDefaultCurrentOrganization = ->
      if _self.config.organizations? && _self.config.organizations.length > 0
        _self.config.currentOrganization = _self.config.organizations[0]
        $log.info("ImpacMainSvc: first organization set as current by default")
        return true
      else
        _self.config.currentOrganization = {}
        $log.error("ImpacMainSvc: cannot set default current organization")
        return {error: {code: 400, message: "cannot set default current organization"}}

    @setCurrentOrganization = (id=null) ->
      if id?
        fetchedOrg = _.find _self.config.organizations, ((org) -> id == org.id)

        if !_.isEmpty(fetchedOrg)
          _self.config.currentOrganization = fetchedOrg
          return true
        else
          $log.error("ImpacMainSvc: organization: #{id} not found in organizations list")
          return setDefaultCurrentOrganization()

      else
        return setDefaultCurrentOrganization()


    @loadUserData = (force=false) ->
      deferred = $q.defer()

      if _.isEmpty(_self.config.userData) || force
        ImpacLinking.getUserData().then (user) ->
          angular.extend _self.config.userData, user
          deferred.resolve(_self.config.userData)
        ,(error) ->
          $log.error('ImpacMainSvc: cannot retrieve user data')
          deferred.reject(error)

      else
        deferred.resolve(_self.config.userData)

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
