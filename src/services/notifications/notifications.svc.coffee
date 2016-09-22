angular
  .module('impac.services.notifications', [])
  .service('ImpacNotifications', ($log, Pusher, ImpacTheming, ImpacEvents, IMPAC_EVENTS, toastr)->

    _self = @

    # Register listeners
    # ----------------------------------
    ImpacEvents.registerCb(IMPAC_EVENTS.addOrRemoveAlerts, ()->
      _self.load()
    )
    # ----

    # Notification event callbacks
    # -----------------------------------
    # Event attribute names should match what is returned from Impac! API (snake-case convention).
    EVENTS = {
      # A kpi or kpi attached to a widget's target has been met.
      kpi_target_alert: (response)->
        notification = response.data
        toastr.warning(notification.subject)
        ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpiTargetAlert, notification)
    }
    # ----

    # Load the notifications service by retrieving all alerts for the current user,
    # and initializing the Pusher service.
    @load = () ->

      return unless ImpacTheming.get().alertsConfig.enableAlerts

      ImpacEvents.notifyCallbacks(IMPAC_EVENTS.impacNotificationsLoad, (alerts)->

        pusher = Pusher.init()

        # Select inapp alerts with pusher metadata
        # e.g [{pusher: {channel: 'some_channel', event: 'some_event'}}, {...}]
        pusherAlerts = _.map(alerts, (alert)->
          return null unless alert.service == 'inapp' && _.has(alert.metadata, 'pusher')
          _.pick(alert.metadata, ['pusher'])
        )

        pusherAlerts = _.uniq(_.compact(pusherAlerts))
        channels = _.uniq(_.map(pusherAlerts, (a)-> a.pusher.channel))

        # This prevents the receiving of unwanted sockets, and duplicate notifications
        # due to connections not being disconnected properly.
        for activeChannel in pusher.socket.allChannels()
          if channels.indexOf(activeChannel) < 0
            pusher.disconnectChannel(activeChannel.name)
          else
            pusher.unbindAll(activeChannel.name)

        # Bind events to channels
        for alert in pusherAlerts
          pusher.bind(alert.pusher.channel, alert.pusher.event, EVENTS[alert.pusher.event])

      )

    return _self
  )
