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
  
2. Terminal commands to build your workspace
  - This will run a dist build and inject all dependencies into workspace/index.js - to view this task see gulp/workspace.js
  ```
  gulp workspace
  ```
  
  
3. Configuring with credentials & launching workspace
  - Add your api_key & api_secret to the settings object in the workspace/index.js file
  ```
  var settings = {
      mno_url: 'https://uat.maestrano.io',
      impac_url: 'https://api-impac-uat.maestrano.io',
      api_key: 'YOUR_KEY',
      api_secret: 'YOUR_SECRET'
  };
  ```
  
4. Launch the workspace/index.html file in a browser, and your Impac Developer Workspace should load!

##### Architecture

The workspace environment works by loading a parent angular module, which depends on impac-angular ( 'impacWorkspace' ). This allows us to configure impac-angular's services as required. 

Take a look at the `workspace/index.js` file and you'll see default configurations of impac-angular's provider services to enable the workspace to run. 

For more information on the configurations available on impac-angular's provider services see README.md **Angular Providers Configurations** section.

```javascript
angular.module('impacWorkspace', ['maestrano.impac']);
```

The `workspace/index.js` file is then loaded into `workspace/index.html` via `<script>` tags, followed by the `/dist/impac-angular.js` file.. along with all other bower and npm dependencies injected via gulp 'wiredep'.

```html
<script src="index.js"></script>
<script src="../dist/impac-angular.js"></script>
```


#### How-to: Create a widget
---

##### Process

1. <u>Defining the Widgets Template.</u><br>
  *Widgets templates are currently kept in the maestrano api. They declare defining attributes for each widget. *
  *It is important to take not of the `path` vs `path` & `metadata.template` attributes. Defining a `metadata.template` enables you to use an existing Impac API engine, and point the front-end to a different template*
  ```javascript
  // Example of a widget template
  // -----
  {
    // engine called in Impac! API
    path: 'accounts/balance',
  
    // optional - name of the template to use for your widget. In this case, 'accounts-balance.tmpl.html' will be used. If no metadata['template'] is defined, the path is used to determine the template name
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
  **Widgets templates can be stubbed in the `workspace/index.js` file, via the `ImpacDeveloper` service. **

  ```javascript
 
    // workspace/index.js
    
    var widgetsTemplates = [
      {
        path: 'invoices/your-awesome-engine',
        name: 'Awesome Widget',
        metadata: { template: 'sales/your-awesome-component' },
        desc: 'compares awesome things to more awesome things',
        icon: 'pie-chart',
        width: 3
      }
    ];
  ```
 
  *This will inject your stubbed templates into the angular apps model,  displaying available templates from API and your stubbed templates.*
  
2. Create the widget's files:
  - in `/src/components/widgets/`, add a folder `category-widget-name` (e.g: `accounts-my-new-widget`).
  - in this new folder, add three files:
    - `accounts-my-new-widget.directive.coffee` containing the angular directive and controller defining your widget's behaviour.
    - `accounts-my-new-widget.tmpl.html` containing the template of your widget.
    - `accounts-my-new-widget.less` containing the stylesheet of your widget.

3. Define the widget's directive. According to `widget.directive.coffee`, it will define at least these parameters:
  - `$scope.parentDashboard`, which is the dashboard object that contains the widget object in its *widgets* list.
  - `$scope.widget`, which is the widget object.

4. Start implementing the widget's controller. It must contain at least the following elements:
  - `settingsPromises`, which is an array of promises, contains a promise for each custom sub-directive that you add to your widget (e.g: a setting, a chart...).
  *It is essential that you pass a deferred object (initialized by $q.defer()) to each setting or chart that you want to add to your widget: it will be used to make sure the setting is properly initialized before the widget can call its functions.*
  - `$scope.widget.initContext()` is the function that will be called just after the widget has retrieved its content from the API. It should be implemented, and used to determine if the widget can be displayed properly, and to initialize potential specific variables.
  - `$scope.widget.format()` is the function that will be called when the widget is ready to draw its chart. It should use the ChartFormatterSvc functions to format the data properly. Once the chart data is ready, it can be passed to the chart directive through a notify() called on its deferred object. E.g:
  ```coffeescript
  $scope.drawTrigger = $q.defer()
  w.format = ->
    [...]
    # formats the widget content in data that will be readable by Chartjs
    chartData = ChartFormatterSvc.lineChart([inputData],options)
    # passes chartData to the chart directive, and calls chart.draw()
    $scope.drawTrigger.notify(chartData)
  ```

5. Notify the widget's main directive that the widget's specific context has been loaded and is ready. To do that, we use a deferred object that is initialized in the main directive (`widget.directive.coffee`), and resolved at the end of the specific directive (`accounts-my-new-widget.directive.coffee`):
  ```coffeescript
  $scope.widgetDeferred.resolve(settingsPromises)
  ```

  **IMPORTANT**: The settingsPromises array defined in 1/ has to be passed back to the main directive to make sure it will wait for all the settings to be initialized before calling the widget's #show function.

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


#### Build tasks

Running `gulp build` will build all /dist files.

### Licence 
Copyright 2015 Maestrano Pty Ltd
