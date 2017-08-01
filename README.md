[![Build Status](https://travis-ci.org/maestrano/impac-angular.svg?branch=master)](https://travis-ci.org/maestrano/impac-angular?branch=master)

# Impac!™ Angular Frontend Library

#### Description

This project is a User Interface allowing to access the Impac!™ API provided by [Maestrano](http://maestrano.com).

The user has the ability to create dashboards, and to add widgets and KPIs to these dashboards. A widget displays data calculated by the Impac!™ API, based on the user's company data aggregated by Maestrano Connec!™, while a dashboard is a visual collection of widgets.

#### Contributing

Any contribution is very welcome and will be considered with great attention by Maestrano's developers team.
You can post issues, and submit pull requests directly to the #develop branch of this repository.

#### Documentation

- [Impac!™ functional documentation](https://maestrano.atlassian.net/wiki/pages/viewpage.action?pageId=15335427)
- [Impac!™ API technical documentation](http://maestrano.github.io/impac/)

#### Impac Developers

Impac!™ frontend library can be included in any project based on the Maestrano platform, just fork this repository, read below for information and guidelines on using this library!

**For Developers looking to create Widgets, and modify the library, have a look at [DEVELOPER.md](./DEVELOPER.md), and start developing!**

<br>

---
---
## Installation

Install nodejs on Ubuntu:
```
  curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
  sudo apt-get install -y nodejs npm
```
Install nodejs on Mac (with homebrew):
```
  brew install node
```

Install the project's dependencies:
```
  npm install
```

Install package via bower.

```
  bower install --save impac-angular=git@github.com:maestrano/impac-angular.git
```

Add `'maestrano.impac'` module as dependancy of your angular application.

```javascript
  angular.module('yourApp', ['maestrano.impac'])
```

Embed angular-impac's wrapper directive `'impacDashboard'`. You can use either Element or Attribute binding

```html
  <impac-dashboard></impac-dashboard>
             <!-- or -->
  <div impac-dashboard></div>
```


## Configuration / Customisation

Impac! Angular components appearance and functionalities can be customised by the parent application. The library achieves this by using [Angular Provider Services](https://docs.angularjs.org/guide/providers).

The Angular Provider Service allows the parent app to pass data to impac-angular by  using Angular module `.config()` and `.run()` methods, while also allowing impac-angular to define defaults for these customisable options.

### Configuring the required user data

The user and the user's organisations is **required** for impac-angular to run. This is configured via the `ImpacLinkingProvider`.

##### API

**user**<br>
_type_: Function<br>
_return_: Promise -> { sso_session: ssoSession, ... }<br>
_usage_: Retrieving user details & sso_session key for authenticating querys to Impac! API, and displaying user data e.g name.

**organizations**<br>
_type_: Function<br>
_return_: Promise -> { organizations: [ userOrgs, ... ], currentOrgId: currentOrgId }<br>
_usage_: Retrieving organizations and current organization id.

##### Example
```coffeescript
  angular
    .module 'yourApp'
    .config (ImpacLinkingProvider, ImpacConfigProvider) ->

    # Instantiate the service manually as we're
    # in the .config phase.
    impacConfig = ImpacConfigProvider.$get()

      # ImpacConfig service (an example service) could
      # be a service your app provides to retrieve user
      # data and organizations from MNO HUB API.
      data =
        user: impacConfig.getUserData
        organizations: impacConfig.getOrganizations

      ImpacLinkingProvider.linkData(data)
```

### Using default Assets

Impac! Angular provides some default assets. To use these assets there are some steps that need to be made.

Assets within `bower_components` are not publicly accessible by browsers, so for this you will need a JS build tool (e.g gulp/grunt) to build the provided assets into your application. The default assets can found in `bower_components/impac-angular/dist/images`.
The default location Impac! Angular will look for these assets in runtime is `/images`. To configure this location, see the ImpacAssetsProvider configuration below. Some common places for this would be: `/public/images`, or `dist/images`.

##### Example
```coffeescript
angular
  .module 'yourApp'
  .config (ImpacAssetsProvider) ->

    options =
      defaultImagesPath: '/your/path'

    ImpacAssetsProvider.configure(options)
```

### Customising the global Colour Palette

#### Styles

Adjust Less styling by over-riding Less Variables in the parent application.

##### List of Variables (displayed with defaults)

```less
@mgreen:                          #dae173;
@morange:                         #d6782b;
@mdarkblue:                       #232528;
@mgrey:                           #cccccc;
@mlightgrey:                      #999999;
@mdarkbg:                         #16161B;
@mblue:                           #358fdc;
@darkerblue:                      #16252c;
@darkblue:                        #17262d;
@darkerblue:                      darken(@darkblue,4%);
@darkblue2:                       #25333a;
@mediumblue:                      #626d6d;
@lightblue:                       #abc4c6;
@pink:                            #ed1e79;
@red:                             #FF0000;

@fluroblue:                       #00e5f0;
@fluroorange:                     #ff7300;
@flureoyellow:                    #fbd925;
@flurogreen:                      #47ff00;
@fluropink:                       #e01f74;

@darkgreen:                       #33d375;
@green:                           #d1e55c;
@purple:                          #977bf0;
@lightgray:                       #e6edee;
@bluegray:                        #abc4c6;
@bluegray2:                       #35464c;

@brand-success:                  @fluroblue;
@brand-warning:                  @purple;
@brand-info:                     @fluroblue;
@brand-danger:                   @fluropink;
@brand-primary:                  @fluroblue;

@impac-positive:                 green;
@impac-negative:                 @pink;
@impac-positive2:                #3fc4ff;     // lighter colors used for payables-receivables
@impac-negative2:                #1de9b6;     // lighter colorsused for payables-receivables

```

### Customising the Dashboard

#### Theming

Feature configuration with the ImpacTheming Provider

##### API

**dhbConfig**<br>
_type_: Object<br>
_usage_: General dashboard options.

**dhbSelectorConfig**<br>
_type_: Object<br>
_usage_: Options for the 'Dashboard Selector' component.

**dhbErrorsConfig**<br>
_type_: Object<br>
_usage_: Options for configuring the dhb error messages.

**dhbSubMenuConfig**<br>
_type_: Object<br>
_usage_: Special cases 'sub-menu' configuration options.

**dhbSettings**<br>
_type_: Object<br>
_usage_: Configurations for the Dashboard Settings components.

##### Example
```coffeescript
angular
  .module 'yourApp'
  .config (ImpacThemingProvider) ->

  options =
    dhbConfig:
      showDhbHeading: false
      dhbHeadingText: 'Impac!'
      designerMode:
        enabled: false
        dhbLabelName: 'Template'
      multiCompany: false
    dhbSelectorConfig:
      selectorType: 'dropdown'
      customTmplPath: null
      accessibilityEnabled: false
      addWidgetEnabled: true
      addDhbEnabled: true
      deleteDhbEnabled: true
      pdfModeEnabled: false
    dhbErrorsConfig:
      firstTimeCreated:
        first: 'It\'s time to add a reporting dashboard!'
        second: 'In 2 clicks, you\'ll be able to visualize how your business is performing.'
        note: 'Note: dashboards you create will only be accessible by you. Dashboard sharing across users will be added soon.'
      empty:
        first: 'Now it\'s time to select the metrics you want to see!'
        second: 'Add widgets to your dashboard to help make an Impac!™ to your business.'
      failed:
        first: 'Ooops! Something went wrong, can you please refresh your dashboard?'
        second: 'Unable to load your dashboard, please contact support or try again later.'
    dhbSubMenuConfig:
      myobMessage:
        show: true
        appLink:
          show: true
          url: '#/marketplace'
          text: '>> Check this app on our marketplace'
    dhbSettings:
      inWidgetsContainer: false
      syncApps:
        show: -> true
        productDescriptor: 'Impac!'
      currency:
        locked: false
      createFromTemplateEnabled: false

    ImpacThemingProvider.configure(options)

```

#### Assets

Provide custom image files with the ImpacAssets Provider.

To use the default widget asset files provided, see [Using Default Assets](#using-default-assets).

##### API

**impacTitleLogo**<br>
_type_: String<br>
_usage_: Main branding logo for the dashboard.

**impacDashboardBackground**<br>
_type_: String<br>
_usage_: Dashboard Background image displayed when when no widgets are added.

##### Example
```coffeescript
angular
  .module 'yourApp'
  .config (ImpacAssetsProvider) ->

    options =
      impacTitleLogo: '/images/impac-title-logo.png'
      impacDashboardBackground: '/images/impac-dashboard-background.png'


    ImpacAssetsProvider.configure(options)
```

#### Styles

Adjust Less styling by over-riding Less Variables in the parent application.

##### List of Variables (displayed with defaults)

```less
@impac-dashboard-padding-top:                   50px;
@impac-dashboard-sm-padding-top:                @impac-dashboard-padding-top * 3;
@impac-dashboard-margin-left:                   100px;
@impac-dashboard-borders-color:                 @lightblue;

// Title
@impac-dashboard-title-color:                   @purple;
@impac-dashboard-title-label-color:             @darkblue;
@impac-dashboard-title-label-create-color:      white;
@impac-dashboard-source-color:                  @impac-dashboard-title-label-color;
@impac-dashboard-buttons-border-radius:         4px;

//Info-text
@impac-dashboard-info-text-color:               white;
@impac-dashboard-info-text-background-color:    rgba(23,38,45, 0.7);
@impac-dashboard-info-text-font-size:           25px;
@impac-dashboard-info-text-font-weight:         300;

// Dashboard Selector
  // Tabs
@impac-dashboard-selector-border:               1px solid @impac-dashboard-borders-color;
@impac-dashboard-selector-tabs-margin:          0 2px 0 0;
@impac-dashboard-selector-tabs-padding:         10px 8px 10px 15px;
@impac-dashboard-selector-tabs-background-color: transparent;
@impac-dashboard-selector-tabs-active-background-color: #ffffff;
@impac-dashboard-selector-tabs-color:           black;
@impac-dashboard-selector-tabs-active-color:    @purple;

// Widget selector
@impac-dashboard-widget-selector-bg:            #233845;
@impac-dashboard-widget-selector-text-color:    white;
@impac-dashboard-widget-selector-widget-item-min-height: 55px;

// Widgets container
@impac-placeholder-border:                      2px dashed @impac-dashboard-borders-color;
@impac-widgets-container-side-padding:          0px;
@impac-padding-between-widgets:                 12px;
@impac-minimum-widget-size:                     250px;
@impac-big-widget-size:                         565px;

// Buttons
@impac-btn-shadded-bg:                         @darkblue;
@impac-btn-shadded-color:                      @mediumblue;

// Dashboard Modals
@impac-dashboard-loading-spinner:               white;
```

### Customising the Widgets

#### Theming

Feature configuration with the ImpacTheming Provider

##### API

**chartColors**<br>
_type_: Object<br>
_usage_: Provide a colour palette for the widget charts

**dataNotFoundConfig**
_type_: Object<br>
_usage_: Options for the "data not found" display panel message.

**widgetSelectorConfig**
_type_: Object<br>
_usage_: Options for the "widgets selector".

**widgetSettings**
_type_: Object<br>
_usage_: Options for configuring various widget settings components.

##### Example
```coffeescript
angular
  .module 'yourApp'
  .config (ImpacThemingProvider) ->

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
        dataNotFoundConfig:
          mainMessage: 'Data not found'
          linkMessage: 'Are you missing an app?'
          linkUrl: '/apps'
          linkTarget: '_blank'
          linkUrlCallback: null
        widgetSelectorConfig:
          # path to a custom html template.
          path: null
        widgetSettings:
          histModeChoser:
            currentLabels:
              bls: "Balance"
              pnl: "Total period"
              default: "Current"
            # Prefixed onto the currentLabels when date is today for hist mode chooser
            todayPrefixes:
              bls: "Live"
              pnl: ""
              default: ""
          timePeriod:
            showSlider: true

    ImpacThemingProvider.configure(options)
```

#### Assets

Provide custom image files with the ImpacAssets Provider.

To use the default widget asset files provided, see [Using Default Assets](#using-default-assets).

##### API

**dataNotFound**<br>
_type_: String<br>
_default_: `''`<br>
_usage_: Relative path to a directory containing screenshots that are displayed as a background-image for widgets when the "data not found" case is met. The files in this directory need to be organised & named to match the widget engine path. See [Impac! API docs](http://maestrano.github.io/impac/), go to a widget and look at the **engine** value (e.g `accounts/accounting_values/turnover`). You don't have to provide all images, you could provide images for some select widgets, impac-angular will display the default image if a custom one is not found.

**currencyConversionsIcon**
_type_: String<br>
_default_: `'/images/impac-title-logo.png'`<br>
_usage_:  Icon displayed to trigger conversions rate tooltips on widgets. A default image is provided for this option.

##### Example
```coffeescript
angular
  .module 'yourApp'
  .config (ImpacAssetsProvider) ->

    options =
      dataNotFound: '/images/data-not-found/'
      currencyConversionsIcon: '/images/currency-icon.png'

    ImpacAssetsProvider.configure(options)
```

#### Styles

Adjust Less styling by over-riding Less Variables in the parent application.

##### List of Variables (displayed with defaults)

```less
// Widget selector
@impac-dashboard-widget-selector-bg:            #233845;
@impac-dashboard-widget-selector-text-color:    white;

// Global
@impac-widget-link-color:                      @purple;
@impac-widget-buttons-color:                   @impac-widget-link-color;
@impac-widget-tile-selected-color:             @impac-widget-link-color;
@impac-widget-background-color:                white;
@impac-widget-border:                          solid 1px darken(@lightgray,10%);
@impac-widget-text-color:                      #5B6667;
@impac-widget-text-color-medium:               lighten(@impac-widget-text-color,25%);
@impac-widget-text-color-light:                lighten(@impac-widget-text-color,40%); //#acb0b1
@impac-widget-borders-color:                   lighten(@impac-widget-text-color-light,10%); //#f3f4f4
@impac-widget-scrollbar-color:                 #233845;
@impac-widget-loading-spinner:                 #67BBE9;
@impac-widget-reverse-color:                   #1E303B;

// Title
@impac-widget-title-text-color:                darken(@impac-widget-text-color,5%);
@impac-widget-title-bg:                        @impac-widget-background-color;
@impac-widget-title-border:                    solid 1px @impac-widget-borders-color;
@impac-widget-title-text-transform:            uppercase;
@impac-widget-title-text-size:                 12px;
@impac-widget-title-border-radius:             5px 5px 0px 0px;
@impac-widget-top-buttons-color:               @impac-widget-text-color-light;

// Content
@impac-widget-content-border-radius:           0px 0px 5px 5px;
@impac-widget-lines-container-max-height:      200px;

// Settings
// Param selector
@impac-widget-param-selector-color:            @impac-widget-link-color;
// Hist Mode Choser
@impac-widget-hist-text-transform:             uppercase;
@impac-widget-hist-text-size:                  12px;
@impac-widget-hist-text-color:                 @impac-widget-text-color-light;
// Params picker
@impac-widget-params-picker-bg:                @impac-widget-reverse-color;
@impac-widget-params-picker-unchecked-bg:      #c2c4c4;
// Limit entries
@impac-widget-limit-entries-color:             @impac-widget-reverse-color;

// Globals and Mixins
@impac-widget-selectable-color:                @impac-widget-link-color;

// Edit settings
@impac-widget-sub-bg-color:                    darken(@impac-widget-background-color,6%);
@impac-widget-sub-bg-color-light:              lighten(@impac-widget-sub-bg-color,5%); //f3f4f4

// Accounts Comparison
@impac-widget-accounts-comparison-lines-container-max-height: 220px;

// Sales break-even
@impac-widget-sales-break-even-bg:             rgb(25,40,49);
@impac-widget-sales-break-even-text-color:     #1de9b6;
```

### Customising the KPIs & Alerting

#### Linking
Alerts use [Pusher.com](https://pusher.com/) (an external service which handles the sending of web-socket notification from our server to the browser), which required the client (Impac! Angular) is configured with a Client Key for authentication. This configuration is provided through the ImpacLinking Provider.

##### API
**pusher_key**:<br>
_type_: String<br>
_usage_: Configure Impac! Angular with a Pusher client key.

##### Example
```coffeescript
  angular
    .module 'yourApp'
    .run (ImpacLinkingProvider) ->

      data =
        pusher_key: 'my-pusher-key'

      ImpacLinkingProvider.linkData(data)

      # BELOW IS AN EXAMPLE OF A SECONDARY WAY TO CONFIGURE THE PUSHER KEY,
      # SHOULD IT NEED TO BE CONFIGURED AT A LATER STAGE THE IN APP BOOTSTRAP.
      ImpacLinkingProvider.linkOptionalData({ pusher_key: 'my-pusher-key' })
    )
  )

```

#### Theming

Feature configuration with the ImpacTheming Provider.

##### API
**dhbKpisConfig**<br>
_type_:  Object<br>
_usage_: Options for the KPIs feature.

**alertsConfig**<br>
_type_: Object<br>
_usage_: Options for the Alerts feature.

##### Example
```coffeescript
angular
  .module 'yourApp'
  .config (ImpacThemingProvider) ->

    options =
      dhbKpisConfig:
        enableKpis: true
        enableDatesPicker: true
      alertsConfig:
        enableAlerts: true

    ImpacThemingProvider.configure(options)
```

#### Styles

Adjust Less styling by over-riding Less Variables in the parent application.

##### List of Variables (displayed with defaults)

```less
// Kpi bar
@kpis-bar-background-color:                    white;
@kpis-bar-box-shadow:                          0px 1px 8px -4px;
// Kpi
@kpi-background-color:                         white;
@kpi-triggered-border-bottom:                  4px solid @brand-danger;
@kpi-max-height:                               95px;
@kpi-editing-max-height:                       90px; // height to be added to the @kpi-max-height when in editing mode.
@kpi-content-editing-height-buffer:            5px; // height to be minused from the @kpi-editing-max-height to even the kpi height and the kpi content height.
// Kpi top-line
@kpi-top-line-background-color:                grey;
@kpi-top-line-triggered-background-color:      black;
@kpi-top-line-height:                          7px;
@kpi-top-line-box-shadow:                      none;
// kpi content
@kpi-text-color:                               grey;
@kpi-text-triggered-color:                     black;
@kpi-icon-color:                               grey;
@kpi-icon-triggered-color:                     black;
// kpi settings
@kpi-settings-focus-color:                     @mblue;
@kpi-settings-error-color:                     @brand-danger;
@kpi-settings-remove-background:               #4c4749;
@kpi-settings-remove-background-hover:         darken(@brand-danger, 5%);
@kpi-settings-alert-config-background:         #4c4749;
@kpi-settings-alert-config-background-hover:   @mblue;
@kpi-negative-alert-label-background-color:    lighten(#ff0000, 30%);
```


### Code Conventions across impac-angular
---
#### General
- HTML Templates **must not use double-quotes for strings** (I'm looking at you, Ruby devs). Only html attribute values may be wrapped in double qoutes. 
  - **REASON**: when gulp-angular-templatecache module works its build magic, having double quotes within double quotes breaks the escaping.
 
- We have found [this angular style guide](https://github.com/johnpapa/angular-styleguide) to be an excellent reference which outlines good ways to write angular. I try to write CoffeeScript so it compiles in line with this style guide.

#### File Naming

- Slug style file naming, e.g `this-is-slug-style`.
- Add filename extensions to basename describing the type of component it is.
```javascript
  // good
  some-file.svc.coffee
  some-file.modal.html

  // bad
  some-file-svc.coffee
  some-file-modal.html  
```

<br>
**IMPORTANT:**
Widget folder and file names must be the same as the widget's category that is stored in the back-end, for example:

```javascript
  // widget data returned from maestrano database
  widget: {
    category: "invoices/aged_payables_receivables",
    ...
  }
```
**Component folder & file name should be:** 
```
  components/invoices-aged-payables-receivables/invoices-aged-payables-receivables.directive.coffee
```


#### Stylesheets

The goal is to be able to work on a specific component / piece of functionality and be able to quickly isolate the javascript and css without having to dig through a 1000 line + css / js file, and also preventing styles from bleeding.

Stylesheets should be kept within the components file structure, with styles concerning that component.

Only main stylesheets should be kept in the stylesheets folder, like `variables.less`, `global.less`, and `mixins.less`, etc.

Component specific styles should be wrapped in a containing ID to prevent bleeding. 

With widgets, there is no need for creating an id for nesting styles within. There is some code in place which adds the class dynamically to the template from the Widget's template data retrieved from the API.

To view how this works, see files `components/src/widget/widget.html` and `component/src/widget/widget.directive.coffee`.

Below is an example of the correct less closure for your widgets components less files.
```less
  // impac-angular/src/components/widgets/sales-list/sales-list.less
  .analytics .widget-item .content.sales-list {
    ul {}
  }
```

With other components / widgets settings components, your less should be closured like below.
```less
  // components/your-component-category/your-component.less
  .analytics .your-component-category.your-component {
    /* styles that wont bleed and are easily identifiable as only within this component */
    ul {}
  }
```
Template to match above:

```html
  <!-- components/your-component-category/your-component.tmpl.html -->
  <div class"your-component-category your-component">
    <!-- html template for component -->
  </div>
```

During the build process gulp will inject `@import` declarations from `.less` files in `components/` into `src/impac-angular.less`, concatinate all less files into `dist/impac-angular.less`, and compile and minify all less files into `dist/impac-angular.css` and `dist/impac-angular.min.css`.

  
### Tests

Test should be created within service or component folders. Just be sure to mark them with a .spec extension.

Example: 

```
  components/
    some-component/
      some-component.directive.coffee
      some-component.spec.js
  services/
    some-service/
      some-service.service.coffee
      some-service.spec.js
```

To run tests, first build impac-angular with `gulp build`. Then run `gulp test`.


#### Build tasks

Running `gulp build` will build all /dist files.
Running `gulp build:dist` will run a `gulp clean` first, then build all `/dist` files, ensure only the current src files are included in dist (especially relevant for images).

### Bugs, Refactor and Improvements


### Roadmap


### Licence 
Copyright 2015 Maestrano Pty Ltd
