angular
  .module('impac.services.notifications', [])
  .service('ImpacNotifications', ($log, Pusher, ImpacEvents, IMPAC_EVENTS, toastr)->

    _self = @

    # Notification event callbacks
    # -----------------------------------
    # Event attribute names should match what is returned from Impac! API (snake-case convention).
    EVENTS = {
      # A kpi or kpi attached to a widget's target has been met.
      kpi_target_alert: (response)->
        $log.debug "Impac Notification! 'kpi_target_alert'"
        notification = response.data
        toastr.warning(notification.alert.subject)
        ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpiTargetAlert, notification)
    }

    # Load the notifications service by retrieving all alerts for the current user.
    @load = () ->
      ImpacEvents.notifyCallbacks(IMPAC_EVENTS.impacNotificationsLoad, (alerts)->
        _self.initPusher(alerts)
      )

    # Initialise the Pusher client and subscribe pusher to alert events.
    @initPusher = (alerts) ->
      pusherAlerts = _.map(alerts, (alert)->
        return null unless alert.service == 'inapp' && _.has(alert.metadata, 'pusher')
        _.pick(alert.metadata, ['pusher'])
      )
      pusherAlerts = _.uniq(_.compact(pusherAlerts))
      pusher = Pusher.init()
      for alert in pusherAlerts
        pusher.bind(alert.pusher.channel, alert.pusher.event, EVENTS[alert.pusher.event])

    return _self
  )
