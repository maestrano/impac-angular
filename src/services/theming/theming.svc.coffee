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
        multiCompany: false
        designerMode:
          enabled: false
          dhbLabelName: 'Template'
      # configurations for the dashboard selector feature.
      dhbSelectorConfig:
        selectorType: 'dropdown'
        customTmplPath: null
        accessibilityEnabled: false
        pdfModeEnabled: false
      dhbWidgetsConfig:
        templates:
          defaultToFinancialYear: true
      # kpis options
      dhbKpisConfig:
        enableKpis: true
        parentElementId: ''
        enableDatesPicker: true
      # alert notifications options
      alertsConfig:
        enableAlerts: true
      # options for the data-not-found display panel messages.
      dataNotFoundConfig:
        content:
          mainMessage: 'impac.data_not_found_config.main_message'
          liveBMessage: 'impac.data_not_found_config.live_b_message'
          linkMessage: 'impac.data_not_found_config.link_message'
          liveBTitle: 'impac.data_not_found_config.live_b_title'
          title: 'impac.data_not_found_config.title'
          seeExample: 'impac.data_not_found_config.see_example'
          demoData: 'impac.data_not_found_config.demo_data'
        linkUrl: '/apps'
        linkTarget: '_blank'
        linkUrlCallback: null

      # options for configuring the dhb errors messages.
      dhbErrorsConfig:
        firstTimeCreated:
          first: 'impac.widget.common.error_config.first_time_created.first'
          second: 'impac.widget.common.error_config.first_time_created.second'
          note: 'impac.widget.common.error_config.first_time_created.note'
        empty:
          first: 'impac.widget.common.error_config.empty.first'
          second: 'impac.widget.common.error_config.empty.second'
        failed:
          first: 'impac.widget.common.error_config.failed.first'
          second: 'impac.widget.common.error_config.failed.second'

      dhbSubMenuConfig:
        myobMessage:
          show: true
          appLink:
            show: true
            url: '#/marketplace'
            text: 'impac.widget.common.sub_menu_config.check_this_app'

      # options for the widget selector panel.
      widgetSelectorConfig:
        path: null
        # whitelist takes precedence over blacklist
        # when both are empty, all templates are displayed
        whitelist: []
        blacklist: []
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
        createFromTemplateEnabled: false
      widgetSettings:
        histModeChoser:
          currentLabels:
            bls: "impac.widget.theming.hist.bls"
            pnl: "impac.widget.theming.hist.pnl"
            default: "impac.widget.theming.hist.default"
          todayPrefixes:
            bls: "impac.widget.theming.hist.bls.prefix"
            pnl: "impac.widget.theming.hist.pnl.prefix"
            default: "impac.widget.theming.hist.default.prefix"
        timePeriod:
          showSlider: true
        tagging:
          enabled: false

      dateFormatterSettings:
        default: 'L'
        # Specific formatting can be defined per widget or other components:
        # formats:
        #  'hr/employee_details':  "MM-DD-YYYY"
        #  'time-period':          "MM_DD_YYYY"

    #=======================================
    # Public methods available in config
    #=======================================
    provider.configure = (configOptions) ->
      angular.merge(options, configOptions)

    #=======================================
    _$get = ($window, ImpacUtilities) ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      service.get = ->
        return options

      service.configure = (configOptions) ->
        angular.merge(options, configOptions)

      service.getDhbLabelName = ->
        designerModeOpts = options.dhbConfig.designerMode
        if designerModeOpts.enabled then designerModeOpts.dhbLabelName else 'Dashboard'

      # Methods for generating parsing / generating colors
      service.color =
        ###
        #   @desc Generates a random shade of the given hexcode color.
        ###
        generateRandomShade: (hexcode)->
          baseHsl = $window.Color(hexcode).hsl()
          shade   = $window.Color().hsl(
              baseHsl.h
              ImpacUtilities.getRandomInteger(40, 100)
              ImpacUtilities.getRandomInteger(50, 85)
            )
            .rgb()
          "rgb(#{shade.r}, #{shade.g}, #{shade.b})"

        ###
        #   @desc Generates a palette of shades starting from the given hexcode color
        #   @param {string} [hexcode] A color hexcode to base the palette from.
        #   @param {integer} [amount] The amount of colour needed.
        #   @param {Array<number>} [options.lightnessRange] A minimum and maximum lightness range.
        ###
        generateShadesPalette: (hexcode, amount, options = {})->
          options.lightnessRange ||= [50, 90]
          baseHsl   = $window.Color(hexcode).hsl()
          increment = options.lightnessRange.slice(0,2).reduce((min, max)-> max - min) / amount
          palette   = []
          counter   = 0
          while counter < amount
            shade = $window.Color().hsl(
                baseHsl.h
                baseHsl.s
                options.lightnessRange[0]
              )
              .rgb()
            palette.push("rgb(#{shade.r}, #{shade.g}, #{shade.b})")
            options.lightnessRange[0] += increment
            counter++
          return palette


      return service
    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = ['$window', 'ImpacUtilities']
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider
  )
