// IMPAC! WORKSPACE
//--------------------------------------------------------
// PLEASE DO NOT COMMIT CHANGES TO THIS FILE.
// You can use `git add -p ./` to selectively add files to your git index.
// -------------------------------------------------------
var module = angular.module('impacWorkspace', [
  'maestrano.impac',
  'toastr',
  'Devise',
  'ui.router'
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
    });

});

// --
// Configure Angular Devise paths for mno-enterprise.
// -------------------------------------------------------
module.config(function (AuthProvider) {
  // Customize login
  AuthProvider.loginMethod('POST')
  AuthProvider.loginPath('mnoe/auth/users/sign_in.json')

  // Customize logout
  AuthProvider.logoutMethod('DELETE')
  AuthProvider.logoutPath('mnoe/auth/users/sign_out.json')

  // Customize register
  AuthProvider.registerMethod('POST')
  AuthProvider.registerPath('mnoe/auth/users')
});

// --
// Impac! Angular Provider Service Configurations
// -------------------------------------------------------
module.run(function (ImpacLinking, ImpacAssets, ImpacRoutes, ImpacTheming, ImpacDeveloper, DevUser, settings) {

  // Configure ImpacRoutes
  // -------------------------------------------------------
  var mnoHub = settings.mno_url;
  var impacPrefix = "/impac";
  var routesConfig = {
    mnoHub: mnoHub,
    impacPrefix: impacPrefix,
    impacApi: settings.impac_url + "/api",
    dashboards: {
      index: mnoHub + impacPrefix + "/dashboards"
    },
    widgets: {
      index: mnoHub + impacPrefix + "/widgets",
      create: mnoHub + impacPrefix + "/dashboards/:dashboard_id/widgets"
    },
    kpis: {
      index: mnoHub + impacPrefix + "/kpis",
      create: mnoHub + impacPrefix + "/dashboards/:dashboard_id/kpis",
      update: mnoHub + impacPrefix + "/kpis/:id",
      del: mnoHub + impacPrefix + "/kpis/:id"
    },
    alerts: {
      index: mnoHub + impacPrefix + "/alerts",
      create: mnoHub + impacPrefix + "/kpis/:kpi_id/alerts",
      del: mnoHub + impacPrefix + "/alerts/:id"
    }
  };
  // Removes custom index path, defaulting kpi discovery to impac api, where KPIs with
  // multiple watchables are returned.
  if (settings.multiple_watchables_mode) { delete routesConfig.kpis.index; }
  ImpacRoutes.configureRoutes(routesConfig);


  // Configure ImpacTheming - aesthetic and feature customisations across the app
  // -------------------------------------------------------
  ImpacTheming.configure({
    dhbKpisConfig: {
      enableKpis: true
    },
    alertsConfig: {
      enableAlerts: true
    },
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
  ImpacDeveloper.configure({
    status: true,
    widgetsTemplates: settings.widgetsTemplates || []
  });

  // Configure ImpacLinking - Links core callbacks required for impac-angular lib to run.
  // -------------------------------------------------------
  ImpacLinking.linkData({
    organizations: function () {
      return DevUser.getOrganizations(settings.org_uid);
    },
    user: function () {
      return DevUser.getUser();
    },
    pusher_key: 'e98dfd8e4a359a7faf48' // Maestrano pusher account key.
  });

});
