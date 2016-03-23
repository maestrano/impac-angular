# Impac Developer Toolkit

#### Developer Account & Authentication

First things first, creating an authenticated developer account.

1. Go to [uat.maestrano.io](https://uat.maestrano.io) and create an account.
2. Go to "My Account"
3. Then expand the "Developer" section
4. Click on "Register"

Now you should an api key, api secret, and an organization associated to your User on the UAT environment.


#### Workspace

##### Steps to get impac loaded:

1. Terminal commands to load dependancies
  ```
  npm install
  bower install
  ```
  
2. Configuring with credentials & launching workspace
  - Add your api_key & api_secret to the settings object in the workspace/index.js file
  ```
  var settings = {
      mno_url: 'https://uat.maestrano.io',
      impac_url: 'https://api-impac-uat.maestrano.io',
      api_key: 'YOUR_KEY',
      api_secret: 'YOUR_SECRET'
  };
  ```
  
3. There a few ways to prepare & launch the Impac Developer Workspace..
  1. Run `gulp serve`, this will inject dependencies, serve impac-angular, and **live reload** on change.
  2. Run `gulp serve:noreload`, if rebuilding the library on every change is using too much cpu - **you will need to run `gulp workspace` and refresh the page after every change**
  2. Run `gulp workspace` to build and inject dependencies, the open the `workspace/index.html` file in a browser - **you will need to run `gulp workspace` and refresh the page after every change**


##### Workspace Architecture

The workspace environment works by loading a parent angular module, which depends on impac-angular ( 'impacWorkspace' ). This allows us to configure impac-angular's services as required. 

Take a look at the `workspace/index.js` file and you'll see default configurations of impac-angular's provider services to enable the workspace to run. 

For more information on the configurations available on impac-angular's provider services see [README.md](./README.md) **Impac Angular Providers & Services** section.

```javascript
angular.module('impacWorkspace', ['maestrano.impac']);
```

The `workspace/index.js` file is then loaded into `workspace/index.html` via `<script>` tags, followed by the `/dist/impac-angular.js` file.. along with all other bower and npm dependencies injected via gulp 'wiredep'.

```html
<script src="index.js"></script>
<script src="../dist/impac-angular.js"></script>
```

#### Impac Ecosystem Architecture 

The high-level diagram below outlines the ecosystem which powers Impac! Angular's reporting abilities.

![Impac Ecosystem Overview](https://maestrano.atlassian.net/wiki/download/attachments/20742254/Impac%20Ecosystem%20Overview.png?version=1&modificationDate=1457910746989&api=v2)

###### First Load Flow
1. The hosting front-end retrieves data for User and Organizations which are then provided to Impac! Angular via an Angular Provider Service.
2. Impac! Angular retrieves the Dashboards, Widgets & KPIs configurations from Hub API.​
3. Impac! Angular queries Impac! Engine to retrieve data.
4. Impac! Engine authenticates the user using IDM API.
5. Impac! Engine queries Connec! to retrieve raw data based on the widget configuration.
6. Connec! authenticates the user using IDM API and returns raw data to Impac! Engine.
7. Impac! Engine computes this raw data into a meaningful summary and sends it back to Impac! Angular.
8. Impac! Angular display the summary using a pre-defined template (line chart, pie chart, figure, list...)

#### How-to: Create a widget
---

#### Shortcut! 

We have built a **Yoeman generator** to generate the boilerplate and some extras to help get you going!

1. Run `npm update` to make sure you have all the latest npm packages.
2. Simply run, `yo widget`, and follow the prompts to generate your new Widget Component!

** Please read the Full Process below, as it will provide more details on getting your widget up and running & help with understanding the basics.**

You want to make the generator better? Of course. See the [README](./generators/generator-widget/README.md) and take a look at `generators/generator-widget`. 

##### Full Process

1. **Defining the Widgets Template.**<br>
  *Widgets templates are currently kept in the maestrano api. They declare defining attributes for each widget.*<br>
  *It is important to take note of the `path` vs `path` & `metadata.template` attributes. Defining a `metadata.template` enables you to use an existing Impac API engine, and points the front-end to a different template*
  ```javascript
  // Example of a widget template
  // -----
  {
    // engine called in Impac! API
    path: 'accounts/balance',
  
    // optional - name of the template to use for your widget. In this case, 'accounts-balance.tmpl.html' will be used. 
    // If no metadata['template'] is defined, the path is used to determine the template name.
    metadata: {
      template: 'accounts/balance'
    },
  
    // name to be displayed in the widgets selector
    name: 'Account balance', 
    
    // description tooltip to be displayed in the widgets selector
    desc: "Display the current value of a given account",
    
    // font awesome icon to be displayed in the widgets selector
    icon: "pie-chart",
    
    // number of bootstrap columns of the widget (value can be 3 or 6)
    width: 3
  }
  ```
  **Widgets templates can be stubbed in the `workspace/index.js` file, via the `ImpacDeveloper` service.**

  ```javascript
 
    // workspace/index.js
    
    var widgetsTemplates = [
      {
        path: 'invoices/awesome-existing-engine',
        name: 'Awesome Sales Widget',
        metadata: { template: 'sales/your-awesome-component' },
        desc: 'compares awesome things to more awesome things',
        icon: 'pie-chart',
        width: 3
      },
      {
        path: 'accounting/your-engine-and-component-name',
        name: 'Awesome Accounting Widget',
        desc: 'compares awesome things to more awesome things',
        icon: 'pie-chart',
        width: 3
      }
    ];
  ```
 
  *This will inject your stubbed templates into the angular apps model,  displaying available templates from API and your stubbed templates.*
  
2. **<u>Create the widget's files:</u>**
  - in `/src/components/widgets/`, add a folder `category-widget-name` (e.g: `accounts-my-new-widget`).
  - in this new folder, add three files:
    - `accounts-my-new-widget.directive.coffee` containing the angular directive and controller defining your widget's behaviour.
    - `accounts-my-new-widget.tmpl.html` containing the template of your widget.
    - `accounts-my-new-widget.less` containing the stylesheet of your widget.
    - `accounts-my-new-widget.spec.js` containing unit-tests for your widget.

3. **<u>Building the directive:</u>** 

  *Widget directives get loaded through `widget.directive.coffee`'s template by `ngInclude`, which means it inherits scope.*
  
  Below are some key variables and methods available through the `ImpacWidget` scope:
  - `$scope.parentDashboard`, which is the dashboard object that contains the widget object in its *widgets* list.
  - `$scope.widget`, which is the widget object.
  - `$scope.widgetDeferred` a `$q` promise object, see step 5.
  - `$scope.updateSettings()`, updates all `widget-settings` directives registered on the widget.

  *The examples below are the basic widget component set-up that is pretty much generic across all other widgets. Make sure you stick to this convention.*

  ```coffeescript
  # Basic components directive structure
  module = angular.module('impac.components.widgets.your-widget',[])
  
  module.controller('YourWidgetCtrl', ($scope) ->
  
    w = $scope.widget
    
  )
  module.directive('yourWidget', ->
    return {
       # avoid restricting by element ('E') please.
       restrict: 'A', 
       controller: 'YourWidgetCtrl'
    }
  )
  ```

  ```html
  <!-- Basic component template structure -->
  
  <div your-widget>
    <!-- edit widget view -->
    <div ng-show="widget.isEditMode" class="edit">
      <h4>Widget settings</h4>
      
      <!-- settings directive for managing organizations (widget data come from multiple companies) -->
      <div setting-organizations parent-widget="widget" class="part" deferred="::orgDeferred" />
      
      <!-- actions -->
      <div class="bottom-buttons" align="right">
        <button class="btn btn-default" ng-click="initSettings()">Cancel</button>
        <button class="btn btn-warning" ng-click="updateSettings()">Save</button>
      </div>
    </div>
    <!-- widget view -->
    <div ng-hide="widget.isEditMode">
      <!-- controller bound boolean for switching between widget and 'data not found' message -->
      <div ng-show="(isDataFound==true)">
  
        <!-- widget content -->

      </div>
      <!-- data not found -->
      <div ng-show="(isDataFound==false)" common-data-not-found on-display-alerts="onDisplayAlerts()" widget-engine="::widget.category" />
    </div>
  </div>
  ```

4. **<u>Start implementing the widget's controller</u>**. 

  It must contain at least the following elements for a widget without a chart:
    - `settingsPromises`, which is an array of promises, contains a promise for each custom sub-directive that you add to your widget (e.g: a setting, a chart...).
    *It is essential that you pass a deferred object (initialized by $q.defer()) to each setting or chart that you want to add to your widget: it will be used to make sure the setting is properly initialized before the widget can call its functions.*
    - `$scope.widget.initContext()` is the function that will be called just after the widget has retrieved its content from the API. It should be implemented, and used to determine if the widget can be displayed properly, and to initialize potential specific variables.
  
  ```coffeescript
     w = $scope.widget
    
     # Define settings
     # --------------------------------------
     $scope.orgDeferred = $q.defer()
    
     settingsPromises = [
       $scope.orgDeferred.promise
     ]
    
     # Widget specific methods
     # --------------------------------------
     w.initContext = ->
       $scope.isDataFound = w.content? 
  ```
  - If your widget is using a chart:
    - `w.format()` will be required to build the chart. It will be triggered by the `ImpacWidgets` service `show` method, after the data has been successfully retrieved from Impac!. 

  ```coffeescript
    $scope.drawTrigger = $q.defer()
    
    ...
    
    w.format = ->
      
      ...
      
      # formats the widget content in data that will be readable by Chartjs
      # See other widgets directives for examples of different chart types, 
      # arguments needed etc. Also take a look at the ChartFormatterSvc methods.
      chartData = ChartFormatterSvc.lineChart([inputData],options)
      # passes chartData to the chart directive, and calls chart.draw()
      $scope.drawTrigger.notify(chartData)
  ```

  ```html
    <div your-widget>
      ...
      
      <div impac-chart draw-trigger="::drawTrigger.promise" deferred="::chartDeferred"></div>
      ...
    </div>
      
  ```

5. Notify the widget's main directive that the widget's specific context has been loaded and is ready. To do that, we use a deferred object that is initialized in the main directive (`widget.directive.coffee`), and resolved at the end of the specific directive (`accounts-my-new-widget.directive.coffee`):
  ```coffeescript
  ...
  
  $scope.widgetDeferred.resolve(settingsPromises)
  ```

  **IMPORTANT**: The settingsPromises array defined in 1/ has to be passed back to the main directive to make sure it will wait for all the settings to be initialized before calling the widget's #show function.

6. Add the new components angular module to the `src/impac-angular.module.js` module declarations.

  ```javascript
    angular.module('impac.components.widgets',
      [
        'impac.components.widgets.your-widget'
      ]
    );
  ```

7. Rebuild via `gulp serve` or `gulp workspace`, and then you should be able to add your new widget to a dashboard!

#### How-to: Create a setting
---

##### Conventions specific to settings development

- A 'setting' is a directive that may be reused by any widget. The purpose of any setting is to handle the management of one 'metadata parameter', which will define the widget configuration. Basically, everytime a configuration information has to be saved before next dashboard reload, a setting should be used.

- **Avoid** using the `$scope.parentWidget` inside of the setting's controller: when you have to call a method belonging to the widget object, pass a callback to the directive as an argument. When you need to access some data contained into `$scope.parentWidget.content`, try passing an object to the directive as well. Eg:

  ```coffeescript
  scope: {
    parentWidget: '='
    deferred: '='
    callBackToWidget: '=onActivate'
    widgetContentData: '=data'
  }
  ```

##### Process

1. Create the setting's files:
  - in `/src/components/widgets-settings/`, add a folder 'setting-name' (e.g: `my-new-setting`).
  - in this new folder, add three files:
    - `my-new-setting.directive.coffee` containing the angular directive and controller defining your setting behaviour.
    - `my-new-setting.tmpl.html` containing the template of your setting.
    - `my-new-setting.less` containing the stylesheet of your setting.

2. Define your setting's directive. It requires at least the following attributes:
  ```coffeescript
  scope: {
    parentWidget: '=' // widget object containing the setting object 
    deferred: '=' // deferred object that will be resolved once the setting context is loaded
  }
  ``` 

3. Start implementing your setting's controller:
  - create a **setting** object with a unique identifier:
    ```coffeescript
    setting = {}
    setting.key = "my-new-setting"
    ```
    - implement the **setting.initialize()** function, which must be used to set the setting's default parameters
    - implement the **setting.toMetadata()** function, which will be called when the setting content has to be stored in the Maestrano config. It must return a javascript hash that will be directly stored into widget.metadata. For instance, if setting.toMetadata() returns `{ my_new_setting: true }`, once the widget is updated, it will contain: `widget.metadata.my_new_setting = true`

4. Push the setting in the parent widget settings list: `$scope.widget.settings.push(setting)`

5. Notify the parent widget that the setting's context has been loaded and is ready: `$scope.deferred.resolve(setting)`.
**IMPORTANT**: The parent widget's #show method (= call to the Impac! API to retrieve the widget's content) will be called only once all the settings are loaded (= once they have resolved their `$scope.deferred` object). 




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


#### Gulp tasks

- `gulp serve` will spin up a server, wiredep `workspace/index.html`, run a `gulp build`, and start a watch that will trigger build when any  `workspace/` or `src/` files change.
- `gulp serve:noreload` do the same as above, but without the watch task.
- `gulp build` will build all `/dist` files.
- `gulp workspace` will inject all dependencies with wiredep, and run a `gulp build`.
- `gulp test` will run unit-tests on `dist/impac-angular.js` and `dist/impac-angular.min.js`

### Licence 
Copyright 2015 Maestrano Pty Ltd
