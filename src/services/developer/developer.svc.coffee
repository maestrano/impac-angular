#=======================================
# This provider is designed to facilitate the Impac Developer Toolkit by providing custom
# configurations and service methods to impac-angular.
#=======================================
angular
  .module('impac.services.developer', [])
  .provider 'ImpacDeveloper', () ->

    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    developer = {
      # enables this service across impac-angular.
      status: false
      # ability to add stubbed widget templates to api response for developer widget creation.
      widgetsTemplates: []
    }

    #=======================================
    # Public methods available in config
    #=======================================
    provider.configure = (options) ->
      angular.extend(developer, options)

    #=======================================
    _$get = ($q, $http, ImpacRoutes) ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      service.getStatus = () -> developer.status

      # Stubbing the mechanism of supplying widgets_templates to the dashboard.
      service.stubWidgetsTemplates = () ->
        service.widgetsTemplates = angular.copy developer.widgetsTemplates

      return service

    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = [];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider
