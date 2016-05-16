
# Implements the Observable pattern to supply Impac Angular with
# event based callback triggering.
# ---------------------------------------------------------------

angular
  .module('impac.services.events', [])
  .service('ImpacEvents', ($log)->

    _self = @

    observableCallbacks = {}

    @registerCb = (event, callback) ->
      observableCallbacks[event] ||= []
      observableCallbacks[event].push(callback)

    @notifyCallbacks = (event, notification) ->
      unless observableCallbacks[event]
        return $log.warn "No observableCallbacks event named '#{event}' found."
      else
        for cb in observableCallbacks[event]
          cb(notification)

    return _self
  )
