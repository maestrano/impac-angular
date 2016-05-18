 angular
  .module('impac.services.alerts', [])
  .service('ImpacAlerts', ($log, $q, $http, $httpParamSerializerJQLike, ImpacRoutes, ImpacMainSvc, ImpacEvents, IMPAC_EVENTS)->

    _self = @

    #====================================
    # Getters
    #====================================
    @config = {}

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

    # @load = (force=false)->
    #   deferred = $q.defer()

    #   if _.isEmpty(_self.getSsoSessionId()) || force
    #     ImpacMainSvc.loadUserData(force).then(
    #       (mainConfig) ->
    #         deferred.resolve(_self.config)
    #       (error) ->
    #         deferred.reject(error)
    #     )

    #   else
    #      deferred.resolve(_self.config)

    #   return deferred.promise

    #====================================
    # CRUD methods
    #====================================

    @getAlerts = ->
      $http.get(ImpacRoutes.kpis.alerts.index()).then(
        (success)->
          success.data
        (error)->
          $log.error('ImpacAlerts Service: cannot get alerts.', error)
          error
      )

    @create = (kpiId, params)->
      $http.post(ImpacRoutes.kpis.alerts.create(kpiId), params)

    @delete = (alertId)->
      $http.delete(ImpacRoutes.kpis.alerts.delete(alertId))

    return _self
  )
