
# Wrapper for [https://github.com/pusher/pusher-js](Pusher JS)
# ---------------------------------------------------------------

angular
  .module('impac.services.pusher', [])
  .service('Pusher', ($window, ImpacLinking) ->

    _self = @

    @config =
      key: 'e98dfd8e4a359a7faf48'
      channels: [
        {
          keyPrefix: 'user-recipient-'
          name: 'user_channel'
        },
        # .. Extend channels the user is listening to, e.g 'organization_channel',
        # for listening to organization wide websocket events ..
      ]
      pusherOpts:
        encrypted: true

    @initialize = ->
      _self.pusher = new $window.Pusher(_self.config.key, _self.config.pusherOpts)
      ImpacLinking.getUserData().then((user) ->
        _.forEach _self.config.channels, (channel) ->
          _self[channel.name] = _self.pusher.subscribe(channel.keyPrefix + user.id)
      )
      return _self

    # Bind a callback to an event on a channel
    #
    # @param channel [String]
    # @param event [String]
    # @param callback [Function]
    @bind = (channel, event, callback) ->
      _self[channel].bind(event, callback)
      return

    return _self
  )
