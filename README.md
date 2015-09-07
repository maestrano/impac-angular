# Impac! Angular Frontend Library
---
### Installation

Install package via bower.

```
  bower install --save impac-angular=git@github.com:maestrano/impac-angular.git#develop
```

Add 'maestrano.impac' module as dependacy of your angular application.

```
  angular.module('yourApp', ['maestrano.impac'])
```

Embed angular-impac's wrapper directive 'impacDashboard'. You can use either Element or Attribute binding

```
  <impac-dashboard></impac-dashboard>
             <!-- or -->
  <div impac-dashboard></div>
```

impac-angular requires that you configure it's ImpacLinkingProvider service with some core data.

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
            
        ImpacLinking.linkData(data) 
      
    )
  )
  
```
### Developement

Easiest way to develop for impac-angular at the moment is to clone this repo and sym-link dist folder as impac-angular in your bower_components.

When making changes in angular-impac src files, you will need to run `gulp build:dist`.
Note, there is a `gulp start:watch` task that will run `gulp build:dist`, although it has proven to be inconsitant and needs debugging.

### Conventions within impac-angular

- HTML Templates must not use double-quotes for strings (I'm looking at you, Ruby devs). Only html attribute values may be wrapped in double qoutes. 
  - **REASON**: when gulp-angular-templatecache module works its build magic, having double quotes within double qoutes breaks the escaping.
 
- I have found [this angular style guide](https://github.com/johnpapa/angular-styleguide) to be an excellent reference which outlines good ways to write angular. I try to write CoffeeScript so it compiles in line with this style guide.
  
### Tests
[TODO]

### Bugs & Things to Improve
- By god, do something about the less file.
    - modular / component scoped structure would be nice.
- Gulp sourcemap errors are not giving accurate stack trace lines in browser console, have removed for now.
- ImpacThemingProvider: look into how angular material does their custom themes.
- Fix gulp watch task, seems to be not working consitantly. 

### Licence 
Copyright 2015 Maestrano Pty Ltd


