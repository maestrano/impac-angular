# Impac! Angular Frontend Library
---
### Installation

Install package via bower.

```
  bower install --save impac-angular=git@github.com:maestrano/impac-angular.git#develop
```

Add `'maestrano.impac'` module as dependacy of your angular application.

```
  angular.module('yourApp', ['maestrano.impac'])
```

Embed angular-impac's wrapper directive `'impacDashboard'`. You can use either Element or Attribute binding

```
  <impac-dashboard></impac-dashboard>
             <!-- or -->
  <div impac-dashboard></div>
```

impac-angular requires that you configure it's **ImpacLinkingProvider service** with some core data.

**Below is the API & an example:**

##### linkData(options)
_type_: Object<br>
_usage_: Linking core User data into impac-angular to meet the requirements of the library, and keeping concerns seperate.

**organizations**<br>
_type_: {Function}<br>
_return_: {Array|String}<br>
_usage_: Retriving the right content belonging to the users organizations.

**ssoSession**<br>
_type_: Function<br>
_return_: {String}<br>
_usage_: Retrieving sso_session key for authenticating querys to Impac! API.

See example below:

```
  angular
    .module('yourApp', [])
    .config( (ImpacLinkingProvider, UserAuthProvider, OrganizationProvider) ->
    
      data = 
          organizations: OrganizationProvider.$get().getOrgUIDs
          ssoSession: UserAuthProvider.$get().getSession
            
        ImpacLinkingProvider.linkData(data) 
      
    )
  )
  
```
### Optional Configurations
[TODO: Expand on this section]<br>
There are other provider services for dynamically configuring impac-angular on an app by app basis. For example, there is a routes provider for configuring api end-points and such. There is a theming provider for configuring chart colour themes and soon more. There is an assets provider for configuring static assets.

### Developement

Easiest way to develop for impac-angular at the moment is to create a sym-link of the dist folder into your app, and the bower.json file into the root of angular-impac.

```
  ln -s impac-angular/dist your-app/bower_components/angular-impac/dist
  cp impac-angular/bower.json your-app/bower_components/angular-impac 
```
When making changes in angular-impac src files, you will need to run `gulp build:dist`.

Note, there is a `gulp start:watch` task that will run `gulp build:dist`, although it has proven to be inconsitant and needs debugging.

### Conventions within impac-angular

##### General
- HTML Templates **must not use double-quotes for strings** (I'm looking at you, Ruby devs). Only html attribute values may be wrapped in double qoutes. 
  - **REASON**: when gulp-angular-templatecache module works its build magic, having double quotes within double qoutes breaks the escaping.
 
- I have found [this angular style guide](https://github.com/johnpapa/angular-styleguide) to be an excellent reference which outlines good ways to write angular. I try to write CoffeeScript so it compiles in line with this style guide.

##### File Naming

- Slug style file naming, e.g `this-is-slug-style`.
- Prefix file basename rather than adding to filename. e.g `some-file.svc.coffee` instead of `some-file-svc.coffee`, or `some-file.modal.html` instead of `some-file-modal.html`.

<br>
**IMPORTANT:**
Widget folder and file names must be the same as the widget's category that is stored in the back-end, for example:

```
  # widget data returned from maestrano database
  widget: {
    category: "invoices/aged_payables_receivables",
    ...
  }
```
**Component folder & file name should be:** `invoices-aged-payables-receivables`


##### Stylesheets

The goal is to be able to work on a specific component / peice of functionality and be able to quickly isolate the javascript and css without having to dig through a 1000 line + css / js file, and also preventing styles from bleeding.

Stylesheets should be kept within the components file structure, with styles concerning that component.

Only main stylesheets should be kept in the stylesheets folder, like `variables.less`, `global.less`, and `imports.less`.

Component specific styles should be wrapped in a containing ID to prevent bleeding. 

```
  #module__component-name {
    /* styles that wont bleed and are easily identifiable as only within this component */
    ul {}
  }
```
Template to match above:

``` 
  <!-- components/component-name/component-name.tmpl.html -->
  <div id="module__component-name">
    <!-- html template for component -->
  </div>
```

Running `gulp build:less:inject` will inject `@import` declarations from `.less` files in `components/` into `stylesheets/import.less`.

Running `gulp build:less` will run the inject task, and then compile all imports.less into one big css file in dist.
  
### Tests
[TODO]

### Bugs, Refactor and Improvements
- Refactor `analytics.less` into modular structure.
- Gulp sourcemap errors are not giving accurate stack trace lines in browser console, have removed for now.
- ImpacThemingProvider: look into how angular material does their custom themes.
- Fix gulp watch task, seems to be not working consitantly. 
- Dashboard.tmpl.html dashboard management sections is currently broken.
- Bootstrap files are currently included within the project, this should be a dependency of impac-angular.

### Roadmap
- Refactor `analytics.less`
- Accessiblity
- Testing 
- tabs component
  - multi-tab lazy loading
  - switch between 'tabs' & 'pills' UI style
  - ng-include options for app specific custom template include. 
- Remove bootstrap files from stylesheets, as as bower dep.

### Licence 
Copyright 2015 Maestrano Pty Ltd


