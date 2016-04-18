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
### Installation

Install nodejs:
```
  curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
  sudo apt-get install -y nodejs npm
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

### Impac Angular Providers & Services
---

*Note: This section is a work-in-progress, not all services and providers that can be used to configure impac-angular are documented.*

Docs on an Angular Provider Service: https://docs.angularjs.org/guide/providers

The Provider Service allows the parent app to pass data to impac-angular by  using Angular module `.config()` and `.run()` methods, while also allowing impac-angular to define defaults for these customisable options.

---

#### Impac Linking Provider (linking.svc.coffee)

Provides impac-angular with core data that it needs to run. This providers configuration is **required** and an error with be thrown if the below configurations have not been given.

##### options
**user**<br>
_type_: Function<br>
_return_: Promise -> { sso_session: ssoSession, ... }<br>
_usage_: Retrieving user details & sso_session key for authenticating querys to Impac! API, and displaying user data e.g name.

**organizations**<br>
_type_: Function<br>
_return_: Promise -> { organizations: [ userOrgs, ... ], currentOrgId: currentOrgId }<br>
_usage_: Retrieving organizations and current organization id.

#### Example

```coffeescript
  angular
    .module('yourApp', [])
    .run( (ImpacLinkingProvider, ImpacConfigProvider) ->
    
      # ImpacConfig service (an example service) could 
      # be a service your app provides to retrieve user 
      # data and organizations from MNO HUB API.
      data =
          user: ImpacConfig.getUserData
          organizations: ImpacConfig.getOrganizations

      ImpacLinkingProvider.linkData(data)

    )
  )

```

#### Impac Assets Provider (assets.svc.coffee)

Provides impac-angular with paths for static assets hosted by the parent application.

##### options
**dataNotFound**<br>
_type_: String<br>
_default_: `null`<br>
_usage_: Relative path to a directive containing screenshots that are displayed as a background-image for widgets when the "data not found" case is met. The files in this directory need to be organised & named to match the widget engine path. See [Impac! API docs](http://maestrano.github.io/impac/), go to a widget and look at the **engine** value (e.g `accounts/accounting_values/turnover`).

**impacTitleLogo**<br>
_type_: String<br>
_default_: `null`<br>
_usage_: Relative image path to the title logo

**impacDashboardBackground**<br>
_type_: String<br>
_default_: `null`<br>
_usage_: Relative image path to default dashboard background

**noWarning**<br>
_type_: Boolean<br>
_default_: `false`<br>
_usage_: Whether to log a warning message or not if an asset is not found



##### Example

```coffeescript
angular
  .module('yourApp', [])
  .config( (ImpacAssetsProvider) ->

    paths =
      dataNotFound: 'images/impac/data_not_found',
      noWarning: true

    ImpacAssetsProvider.configure(paths)
  )
)
```

#### Impac Theming Provider (assets.svc.coffee)

Provides impac-angular with options for customising its colour theme, layout, labels, descriptions, and even enabling(showing/hiding) features.

##### options

View the `theming.svc.coffee` (within impac-angular) source file `options` object for available options.

*TODO: add docs for these options.*

##### Example

```coffeescript
angular
  .module('yourApp', [])
  .config( (ImpacThemingProvider) ->

    options =
      dhbConfig:
        showDhbHeading: true
        dhbHeadingText: 'Epic Reports'
      dataNotFoundConfig: 
        linkUrl: '/marketplace'

    ImpacThemingProvider.configure(options)
  )
)
```

<!--  # notes as reminder of optional config instructions to document.
    - custom dhb selector templates
    - valid url = 'app/views/foobar.html
-->

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

### Bugs, Refactor and Improvements


### Roadmap


### Licence 
Copyright 2015 Maestrano Pty Ltd
