#=======================================
# provider for configuring impac-angular colour theme & layout.
#=======================================
angular
  .module('impac.services.theming', [])
  .provider('ImpacTheming', () ->

    provider = @
    #=======================================
    # Private Defaults | Customisable features
    #=======================================
    options =
      # widget charts colour palette
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
      # general dashboard options
      dhbConfig:
        showDhbHeading: false
        dhbHeadingText: 'Impac!'
      # configurations for the dashboard selector feature.
      dhbSelectorConfig:
        selectorType: 'dropdown'
        customTmplPath: null
        accessibilityEnabled: false
        addWidgetEnabled: true
        addDhbEnabled: true
        deleteDhbEnabled: true
      # kpis options
      dhbKpisConfig:
        enableKpis: false
        parentElementId: ''
      # options for the data-not-found display panel messages.
      dataNotFoundConfig:
        mainMessage: 'Data not found'
        linkMessage: 'Are you missing an app?'
        linkUrl: '/apps'
        linkTarget: '_blank'
        linkUrlCallback: null

      # options for configuring the dhb errors messages.
      dhbErrorsConfig:
        firstTimeCreated:
          first: 'It\'s time to add a reporting dashboard!'
          second: 'In 2 clicks, you\'ll be able to visualize how your business is performing.'
          note: 'Note: dashboards you create will only be accessible by you. Dashboard sharing across users will be added soon.'
        empty:
          first: 'Now it\'s time to select the metrics you want to see!'
          second: 'Add widgets to your dashboard to help make an Impac!™ to your business.'

      dhbSubMenuConfig:
        myobMessage:
          show: true
          appLink:
            show: true
            url: '#/marketplace'
            text: '>> Check this app on our marketplace'

      # options for the widget selector panel.
      widgetSelectorConfig:
        path: null
      # add chart(widget) tile feature & configurations.
      addChartTile:
        show: false
        onClickOptions:
          triggers: []
      # showing the no widgets / empty dashboard message panel & any configurations that belong.
      showNoWidgetMsg:
        show: true
      # configuring dashboard settings
      dhbSettings:
        inWidgetsContainer: false
        syncApps:
          show: -> true
          productDescriptor: 'Impac!'
        currency:
          locked: false

      widgetSettings:
        histModeChoser:
          currentLabels:
            pnl: "Total period"
            bls: "Live balance"
            default: "Current"


    #=======================================
    # Public methods available in config
    #=======================================
    provider.configure = (configOptions) ->
      angular.merge(options, configOptions)

    #=======================================
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
