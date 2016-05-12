// IMPAC! WORKSPACE
//--------------------------------------------------------
// PLEASE DO NOT COMMIT CHANGES TO THIS FILE.
// You can use `git add -p ./` to selectively add files to your git index.
// -------------------------------------------------------
var module = angular.module('impacWorkspace', ['maestrano.impac', 'toastr']);

// -------------------------------------------------------
// Impac Workspace Settings
// -------------------------------------------------------
// Provide important configurations for the impacWorkspace.
module.factory('settings', function () {
  return {
    // Credentials and endpoints
    mno_url: 'http://localhost:3000',
    impac_url: 'http://localhost:4000',
    api_key: '6f03feda34a570c3b1d0833c54c9277f0a63200a674577d343dfeb04ae9af588',
    api_secret: '161e1d3a-ae85-45f6-bd6f-0ac2c42b4bf9',
    // mno_url: 'https://uat.maestrano.io',
    // impac_url: 'http://api-impac-uat.maestrano.io',
    // api_key: 'b12a4b03c37daa32f2cc191dd5ff24a7b6063d7e0b42c2c464cdaad5f467b2a6',
    // api_secret: 'f41ac496-8d4d-4070-a3a5-f625c466746a',

    // Stub widget templates - add new widgets!
    //------------------------------------------------
    // Widget templates are stored on Maestrano API, stub your
    // new widget templates here, and contact us for permenant additions or
    // changes to existing widget templates.
    widgetsTemplates: [
      // Example widget template, please see documentation "How-To: Create a Widget" for available
      // options, and importantly, note how the path & metadata.template attributes work.
      // --
      // {
      //   path: 'accounts/assets_summary',
      //   name: 'Assets / Liabilities summary',
      //   metadata: { template: 'accounts/assets_liability_summary' },
      //   desc: 'Compare Assets and Liabilities accounts',
      //   icon: 'pie-chart',
      //   width: 3
      // },
    ]
    // --
  };
});

//--------------------------------------------------------
// Do not edit below unless you know what you're doing.
//--------------------------------------------------------

// HTTP Interceptor
//--------------------------------------------------------
// Applies headers / configurations to certain requests.
module.factory('domainSpecificAuthorization', function($window, settings){
  return {
    request: function(config) {
      // encodes a base64 string - Basic Authentication.
      var credentials = $window.btoa(settings.api_key + ':' + settings.api_secret);
      var url = config.url;
      // merges basic auth with headers if url is to Maestrano's ecosystem.
      if (url.indexOf(settings.mno_url) >= 0 || url.indexOf(settings.impac_url) >= 0) {
        angular.extend(config.headers, { Authorization: 'Basic ' + credentials });
      }
      return config;
    }
  };
});
module.config(function ($httpProvider) {
  $httpProvider.interceptors.push('domainSpecificAuthorization');
});
// --
// Impac! Angular Provider configurations
// -------------------------------------------------------
module.run(function ($log, $q, $http, ImpacLinking, ImpacRoutes, ImpacTheming, ImpacDeveloper, settings, toastr) {

  // Check credentials have been provided
  if (!settings.api_key || !settings.api_secret) {
    fail('Missing authentication credentials!');
  }

  // Configure the ImpacRoutes service options.
  ImpacRoutes.configureRoutes({
    mnoHub: settings.mno_url + '/api/v2',
    impacPrefix: '/impac',
    impacApi: settings.impac_url + '/api'
  });

  // Configure the ImpacTheming service options.
  ImpacTheming.configure({
    dhbKpisConfig: {
      enableKpis: true
    },
    dhbSettings: {
      syncApps: {
        show: function() { return false; }
      }
    }
  });

  // Configure the ImpacDeveloper service options.
  ImpacDeveloper.configure({
    status: true,
    widgetsTemplates: settings.widgetsTemplates || []
  });

  // Link core callbacks required for impac-angular lib to run.
  ImpacLinking.linkData({
    organizations: function () {
      return getOrganizations();
    },
    user: function () {
      return $q.when({
        name: 'Developer',
        email: 'developer@maestrano.com'
      });
    }
  });

  function getOrganizations() {
    return $http.get(settings.mno_url + '/api/v2/impac/organizations')
      .then(function (response) {
        var organizations = (response.data || []);
        return { organizations: organizations, currentOrgId: (organizations[2].id || null) };
      }, function () {
        var msg = 'Unable to retrieve Organizations';
        fail(msg);
        return $q.reject(msg);
      });
  }

  function fail(msg) {
    $log.error('workspace/index.js Error: ' + msg);
    toastr.error(msg, 'Error');
  }

});
