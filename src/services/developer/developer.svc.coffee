#=======================================
# This provider is designed to facilitate the Impac Developer Toolkit by providing custom
# configurations and service methods to impac-angular.
# When adding methods to this service, please keep all 'developer mode' logic
# within this service, and not throughout the directives and services.
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
    _$get = ($q) ->
      # Mapping constant for widget stubbing.
      # TODO: impac-angular receives a template with `template.path`, converts
      #       it to a `widget.widget_category` key, then server responds with
      #       `widget.category`. This should be more consistant.
      WIDGET = {
        widget_category: 'path'
        category: 'path'
        # metadata: (attrs) -> { template: attrs.template } if _.get(attrs, 'attrs.template')
      }
      #=======================================
      # Public methods available as service
      #=======================================
      service = @
      service.isEnabled = () -> developer.status

      # WIDGETS
      # ---------------
      # Widgets templates
      service.stubWidgetsTemplates = (templates) -> templates.concat developer.widgetsTemplates

      # Find widgets template by match object
      service.findTemplate = (obj, keys=['path', 'metadata']) ->
        _.find developer.widgetsTemplates, (t) -> _.isEqual(_.pick(obj, keys), _.pick(t, keys))

      # Find widgets template by matching object and return bool
      service.isWidgetStubbed = (widget) ->
        match = _.mapKeys widget, (val, key) -> if WIDGET[key]? then WIDGET[key] else key
        !_.isEmpty service.findTemplate(match)

      # CRUD method stubs
      service.createWidgetStub = (widget, currentDhb) ->
        match = _.mapKeys widget, (val, key) -> if WIDGET[key]? then WIDGET[key] else key
        template = angular.copy service.findTemplate(match)
        $q.resolve({
          data: {
            id: Math.random().toString(36).substr(2, 9);
            name: template.name
            category: template.path
            width: template.width
            metadata: angular.merge(template.metadata, {
              organization_ids: _.map currentDhb.data_sources, (s) -> s.uid
              currency: currentDhb.currency
            })
          }
        })

      service.updateWidgetStub = (widget, data) ->
        match = _.mapKeys widget, (val, key) -> if WIDGET[key]? then WIDGET[key] else key
        template = angular.copy service.findTemplate(match)
        angular.merge data.metadata, template.metadata
        $q.resolve({data: data});

      service.deleteWidgetStub = () ->
        $q.resolve({ success: true })

      return service

    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = ['$q'];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider
