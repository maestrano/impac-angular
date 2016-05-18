#=======================================
# This provider service is designed to provide impac-angular with all it's vital methods & data,
# while internally keeping it's concerns as focused as possible.
# TODO: when this gets less varied.. split out into multiple, more specific providers.
#=======================================
angular
  .module('impac.services.linking', [])
  .provider('ImpacLinking', () ->
    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    # Required data:
    required_links = {
      user: null, # @params Function -> returns Promise
      organizations: null # @params Function -> return Promise
    }
    # Optional data:
    optional_links = {
      pusher_key: '' # @params String
    }
    #=======================================
    # Public methods available in config
    #=======================================
    # Iterates over default links object and assigns values from configData with strict checking.
    provider.linkData = (configData)  ->
      for key, value of required_links
        link = configData[key]
        unless link?
          throw new Error("impac-angular linking.svc: Missing core data (#{key}) to run impac-angular.")
        if typeof link != 'function'
          throw new TypeError("impac-angular linking.svc: #{key} should be a Function.")
        required_links[key] = link
      for key, value of optional_links
        link = configData[key]
        unless link?
          console.error("impac-angular linking.svc: No #{key} is configured, Alerts are disabled.")
        else
          optional_links[key] = link

    #=======================================
    _$get = ($q) ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      service.getUserData = ->
        return required_links.user().then(
          (success) ->
            return success
          (err) ->
            return $q.reject(err)
      )

      service.getOrganizations = ->
        return required_links.organizations().then(
          (success) ->
            return success
          (err) ->
            return $q.reject(err)
        )

      service.getPusherKey = ->
        return optional_links.pusher_key

      return service
    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = ['$q'];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider

  )
