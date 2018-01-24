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
    provider.linkData = (configData) ->
      # Link required data
      for key, value of required_links
        link = configData[key]
        unless link?
          throw new Error("impac-angular linking.svc: Missing core data (#{key}) to run impac-angular.")
        if typeof link != 'function'
          throw new TypeError("impac-angular linking.svc: #{key} should be a Function.")
        required_links[key] = link
      # Link optional data
      provider.linkOptionalData(configData, false)
      return true

    # Ability to link/re-link optional data only.
    provider.linkOptionalData = (configData, logs=true) ->
      warnings = {
        pusher_key: ', Alerts are disabled!'
      }
      for key, value of optional_links
        link = configData[key]
        unless link?
          console.warn("impac-angular linking.svc: No #{key} is configured" + warnings[key] || "")
        else
          optional_links[key] = link
          console.log("impac-angular linking.svc: #{key} successfully configured") if logs
      return true

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

      sortOrganizations = (orgs) ->
        return orgs.sort((a,b) ->
          wordA = a.name
          wordB = b.name
          if wordA > wordB
            return 1
          else if wordA < wordB
            return -1
          else
            return 0
        )

      service.getOrganizations = ->
        return required_links.organizations().then(
          (success) ->
            allOrgs = success
            sortedOrganizations = sortOrganizations(success.organizations)
            allOrgs.organizations = sortedOrganizations
            return allOrgs
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
