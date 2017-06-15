// IMPAC! WORKSPACE
//--------------------------------------------------------
// PLEASE DO NOT COMMIT CHANGES TO THIS FILE.
// You can use `git add -p ./` to selectively add files to your git index.
// -------------------------------------------------------
var module = angular.module('impacWorkspace', [
  'maestrano.impac',
  'toastr',
  'Devise',
  'ui.router',
  'ngCookies'
]);

// --
// The Developer Toolkit Workspace States.
// -------------------------------------------------------
module.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('workspace', {
      abstract: true,
      templateUrl: 'app/views/workspace/workspace.html',
      controller: 'WorkspaceController',
      controllerAs: 'main'
    })
    .state('workspace.login', {
      url: '/login',
      templateUrl: 'app/views/workspace/login/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .state('workspace.impac', {
      url: '/impac',
      templateUrl: 'app/views/workspace/impac/impac.html',
      controller: 'ImpacController',
      controllerAs: 'vm'
    })
    .state('workspace.settings', {
      url: '/settings',
      templateUrl: 'app/views/workspace/settings/settings.html',
      controller: 'SettingsController',
      controllerAs: 'vm'
    });

});

// --
// Configure Angular Devise paths for mno-enterprise.
// -------------------------------------------------------
module.config(function (AuthProvider, DevSettingsProvider) {
  var mnoeHostUrl = DevSettingsProvider.$get().defaults().mnoeUrl.host;
  // Customize login
  AuthProvider.loginMethod('POST');
  AuthProvider.loginPath(mnoeHostUrl + '/mnoe/auth/users/sign_in.json');

  // Customize logout
  AuthProvider.logoutMethod('DELETE');
  AuthProvider.logoutPath(mnoeHostUrl + '/mnoe/auth/users/sign_out.json');

  // Customize register
  AuthProvider.registerMethod('POST');
  AuthProvider.registerPath(mnoeHostUrl + '/mnoe/auth/users');
});

// --
// Configure Angular $http to apply XSRF Token headers to CORS requests.
// -------------------------------------------------------
module.constant('CSRF', {
  "headerTokenKey": 'X-XSRF-TOKEN',
  "cookieTokenKey": 'XSRF-TOKEN'
});
module.config(function($httpProvider) {
  // Allow "credentialed" requests that are aware of HTTP cookies and HTTP
  // Authentication information.
  $httpProvider.defaults.withCredentials = true;
});
module.run(function($http, DevSession) {
  DevSession.create();
});

// --
// Configure Angular Translate to use missing translation logs for development aid.
// -------------------------------------------------------
module.config(function($translateProvider) {
  $translateProvider.useMissingTranslationHandlerLog();
  $translateProvider.useStaticFilesLoader(
    {
      prefix: 'locales/',
      suffix: '.json'
    }
  );
});

// --
// Impac! Angular Provider Service Configurations.
// -------------------------------------------------------
module.run(function ($translate, ImpacLinking, ImpacAssets, ImpacRoutes, ImpacTheming, ImpacDeveloper, DevUser, DevSettings) {

  var defaults = DevSettings.defaults();

  // Configure ImpacRoutes
  // -------------------------------------------------------
  ImpacRoutes.configureRoutes(DevSettings.buildRoutesConfig(defaults.mnoeUrl, defaults.impacUrl, defaults.multipleWatchableMode));
  ImpacRoutes.configureBolts('v2', defaults.bolts)


  // Configure ImpacTheming - aesthetic and feature customisations across the app
  // -------------------------------------------------------
  ImpacTheming.configure({
    dhbConfig: {
      showDhbHeading: true,
      dhbHeadingText: 'Your business at a glance, in real-time'
    },
    dhbSelectorConfig: {
      selectorType: 'dropdown',
      pdfModeEnabled: true
    },
    dhbSettings: {
      syncApps: {
        show: function() { return false; }
      }
    }
  });

  // Configure ImpacAssets - app asset file configurations
  // -------------------------------------------------------
  ImpacAssets.configure({
    defaultImagesPath: '/dist/images',
  })

  // Configure ImpacDeveloper - developer toolkit specifc customisations
  // -------------------------------------------------------
  ImpacDeveloper.configure(DevSettings.buildDeveloperConfig(defaults.widgetsTemplates));

  // Configure ImpacLinking - Links core callbacks required for impac-angular lib to run.
  // -------------------------------------------------------
  ImpacLinking.linkData(DevSettings.buildLinkingConfig(defaults.orgUid, defaults.mnoeUrl));

  // Locale to be used
  $translate.use('en-AU');
});
