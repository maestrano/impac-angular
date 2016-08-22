
# Implements the Observable pattern to supply Impac Angular with
# event based callback triggering.
# ---------------------------------------------------------------

angular
  .module('impac.services.events', [])
  .service('ImpacEvents', ($log)->

    _self = @

    observableCallbacks = {}

    @registerCb = (event, callback) ->
      return $log.warn "Callback must be a Function" unless _.isFunction(callback)
      return $log.warn "Event must be a string" unless _.isString(event)
      observableCallbacks[event] ||= []
      observableCallbacks[event].push(callback)

    @notifyCallbacks = (event, notification=null) ->
      return $log.warn "No observableCallbacks event named '#{event}' found." unless observableCallbacks[event]
      _.forEach(observableCallbacks[event], (callback) -> callback(notification))

    @deregisterCb = (event, callback) ->
      _.remove(observableCallbacks[event], (registeredCb) ->
        callback == registeredCb
      )
      delete observableCallbacks[event] if _.isEmpty(observableCallbacks[event])

    @unsubscribe = (event) ->
      delete observableCallbacks[event]

    return _self
  )
