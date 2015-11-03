# Impac! Angular Frontend Library
---
### Installation

Make sure you have nodejs installed, and then:

```
  npm install
```

Install package via bower.

```
  bower install --save impac-angular=git@github.com:maestrano/impac-angular.git#develop
```

Add `'maestrano.impac'` module as dependancy of your angular application.

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

**user**<br>
_type_: Function<br>
_return_: Promise -> {sso_session: ssoSession, ... }<br>
_usage_: Retrieving user details & sso_session key for authenticating querys to Impac! API, and displaying user data e.g name.

**organizations**<br>
_type_: Function<br>
_return_: Promise -> {organizations: [ userOrgs, ... ], currentOrgId: currentOrgId}<br>
_usage_: Retrieving organizations and current organization id.

See example below:

```
  angular
    .module('yourApp', [])
    .run( (ImpacLinkingProvider, ImpacConfigProvider) ->
    
      data = 
          user: ImpacConfig.getUserData
          organizations: ImpacConfig.getOrganizations
            
      ImpacLinkingProvider.linkData(data)

    )
  )
  
```
### Optional Configurations
[TODO: Expand on this section]<br>

There are other provider services for dynamically configuring impac-angular on an app by app basis. For example, there is a routes provider for configuring api end-points and such. There is a theming provider for configuring chart colour themes and soon more. There is an assets provider for configuring static assets.


<!--  # notes as reminder of optional config instructions to document.
  	- custom dhb selector templates
    	- valid url = 'app/views/foobar.html
-->

### Developement

Easiest way to develop for impac-angular is by creating a **[bower link](http://bower.io/docs/api/#link)**. (Essentially a sym-link, so will sync with any changes).

Steps are:

```
	// Pointing bower to your local version of impac-angular
	 
	cd impac-angular/	
	bower link	
	cd your-project/
	bower link impac-angular
	
	// Uninstalling bower link, and pointing bower to original github path.
	
	cd impac-angular/
	bower uninstall impac-angular
	bower update
```

### Conventions within impac-angular

##### General
- HTML Templates **must not use double-quotes for strings** (I'm looking at you, Ruby devs). Only html attribute values may be wrapped in double qoutes. 
  - **REASON**: when gulp-angular-templatecache module works its build magic, having double quotes within double quotes breaks the escaping.
 
- We have found [this angular style guide](https://github.com/johnpapa/angular-styleguide) to be an excellent reference which outlines good ways to write angular. I try to write CoffeeScript so it compiles in line with this style guide.

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

The goal is to be able to work on a specific component / piece of functionality and be able to quickly isolate the javascript and css without having to dig through a 1000 line + css / js file, and also preventing styles from bleeding.

Stylesheets should be kept within the components file structure, with styles concerning that component.

Only main stylesheets should be kept in the stylesheets folder, like `variables.less`, `global.less`, and `mixins.less`, etc.

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

Running `gulp less:inject` will inject `@import` declarations from `.less` files in `components/` into `impac-angular.less`.

Running `gulp less:concat` will then concatinate all less files into a one.

Running `gulp less:compile` will compile the dist less file into a dist css and min.css file. Note, you will need to uncomment an `@import` of `bower_components/bootstrap` in the `impac-angular.less`.
  
### Tests

Test should be created within service or component folders. Just be sure to mark them with a .spec extension.

Example: 

```
	components/
		some-component/
			some-component.directive.coffee
			some-component.directive.spec.js
	services/
		some-service/
			some-service.service.coffee
			some-service.service.spec.js
```

To run tests, first build impac-angular with `gulp build`. Then run `gulp test`.

To run tests for production on the minified version, first build with `gulp build:dist`. Then run `gulp test:dist`.

**NOTE:** with `gulp build:dist` you will need to uncomment the bower_components bootstrap `@import` in the `impac-angular.less` file.

### Bugs, Refactor and Improvements


### Roadmap


### Licence 
Copyright 2015 Maestrano Pty Ltd


