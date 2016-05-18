
# Wrapper for [https://github.com/pusher/pusher-js](Pusher JS)
# ---------------------------------------------------------------

angular
  .module('impac.services.pusher', [])
  .service('Pusher', ($window, ImpacLinking) ->

    _self = @

    @config =
      pusherOpts:
        encrypted: true

    # Initializes a Pusher socket, and subscribes to all given channels.
    #
    # @param channels [Array of Strings] Subscribe pusher client to channels
    # @return [Pusher] Chain onto class methods, e.g the `@bind` method.
    @init = (channels=[]) ->
      _self.socket = new $window.Pusher(ImpacLinking.getPusherKey(), _self.config.pusherOpts) unless _self.socket
      _.forEach(channels, (channel)-> _self.socket.subscribe(channel))
      return _self

    # Bind an event callback onto a new or existing channel.
    #
    # @param channel [String]
    # @param event [String]
    # @param callback [Function]
    @bind = (channel, event, callback) ->
      _self.init() unless _self.socket
      _self.socket.subscribe(channel) unless _self.socket.channel(channel)
      _self.socket.channel(channel).bind(event, callback)

    # Bind an event callback to all available channels.
    #
    # @param event [String]
    # @param callback [Function]
    @bindAll = (event, callback) ->
      _self.init() unless _self.socket
      _.forEach(_self.socket.allChannels(), (chan) -> chan.bind(event, callback))

    # Unbind an event callback from an existing channel.
    #
    # @param channel [String]
    # @param event [String]
    @unbind = (channel, event)->
      return unless _self.socket && _self.socket.channel(channel)
      _self.socket.channel(channel).unbind(event)

    # Unbind all event callback from an existing channel.
    #
    # @param channel [String]
    @unbindAll = (channel)->
      return unless _self.socket && _self.socket.channel(channel)
      _self.socket.channel(channel).unbind()

    # Unsubscribe from the given channel.
    #
    # @param channel [String]
    @disconnectChannel = (channel)->
      return unless _self.socket
      _self.socket.unsubscribe(channel)

    return _self
  )
