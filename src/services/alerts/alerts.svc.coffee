 angular
  .module('impac.services.alerts', [])
  .service('ImpacAlerts', ($log, $q, $http, $httpParamSerializerJQLike, ImpacRoutes, ImpacMainSvc, ImpacEvents, IMPAC_EVENTS)->

    _self = @

    #====================================
    # Getters
    #====================================
    @config = {}

    @config.ssoSessionId = ""
    @getSsoSessionId = ()->
      return _self.config.ssoSessionId

    #====================================
    # Register Listeners
    #====================================
    ImpacEvents.registerCb(IMPAC_EVENTS.impacNotificationsLoad, (callback) ->
      _self.getAlerts().then((alerts)->
        callback(alerts)
      )
    )

    #====================================
    # Load and initialize
    #====================================

    @load = (force=false)->
      deferred = $q.defer()

      if _.isEmpty(_self.getSsoSessionId()) || force
        ImpacMainSvc.loadUserData(force).then(
          (mainConfig) ->
            _self.config.ssoSessionId = mainConfig.sso_session if mainConfig.sso_session
            deferred.resolve(_self.config)
          (error) ->
            deferred.reject(error)
        )

      else
         deferred.resolve(_self.config)

      return deferred.promise

    #====================================
    # CRUD methods
    #====================================

    @getAlerts = ->
      _self.load().then(
        ()->
          url = ImpacRoutes.kpis.alerts.index()
          params = {}
          params.sso_session = _self.getSsoSessionId if _self.getSsoSessionId

          request = $http({
            url: url,
            method: 'GET',
            data: $httpParamSerializerJQLike(params)
          })

          request.then(
            (success)->
              success.data
            (error)->
              $log.error('ImpacAlerts Service: cannot get alerts.', error)
              error
          )
        ()->
          $log.error 'ImpacAlerts - service is not initialized'
      )

    return _self
  )
