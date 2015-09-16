#=======================================
# provider for configuring impac-angular colour theme & layout.
#=======================================
angular
  .module('impac.services.theming', [])
  .provider('ImpacTheming', () ->

    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    options =
      chartColors:
        positive: '#3FC4FF',
        negative: '#1DE9B6',
        array: [
          "#1de9b6",
          "#7c4dff",
          "#ffc928",
          "#3fc4ff",
          "#ff8e01",
          "#c6ff00",
          "#d500fa",
          "#ff6e41",
          "#ffeb3c",
          "#ff1844"
        ]

      dhbSelectorConfig:
        selectorType: 'dropdown'
        customTmplPath: null
        accessibilityEnabled: false

      dataNotFoundConfig:
        mainMessage: 'Data not found'
        linkMessage: 'Are you missing an app?'
        linkUrl: ''

      widgetSelectorConfig:
        path: null

      addChartTile:
        show: false
        onClickOptions:
          triggers: []

      noWidgetMsg:
        show: true


    #=======================================
    # Public methods available in config
    #=======================================
    provider.configure = (configOptions) ->
      angular.extend(options, configOptions)

    #=======================================
    # TODO: does ng-annotate annotate provider $get methods in the gulp build process?
    _$get = () ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      service.get = ->
        return options

      return service
    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = [];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider
  )
