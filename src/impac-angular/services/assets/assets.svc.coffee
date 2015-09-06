# provider for configuring impac static assets.
angular
  .module('impac.services.assets', [])
  .provider('impacAssets', () ->
    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    defaults =
      # TODO: there must be a better way to reference assets, maybe a gulp module that creates relative url paths or something? Not even sure if this would support prod builds =\
      baseDir: 'bower_components/impac-angular/images/'
    #=======================================
    # Public methods available in config
    #=======================================
    provider.configure = (configOptions) ->
      angular.extend(defaults, configOptions)

    #=======================================
    _$get = () ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      service.get = (path) ->
        # adds trailing slash onto baseDir unless baseDir is an empty string.
        dir = defaults.baseDir.split('')
        dir = if dir.length and dir[dir.length - 1] != '/'
        then dir.concat('/').join('')
        else dir.join('')
        return dir + path

      return service
    # inject service dependencies here
    _$get.$inject = [];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider
  )
