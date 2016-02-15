var module = angular.module('impacWorkspace', ['maestrano.impac']);

// Configuration impac-angular lib on module impacWorkSpace run.
module.run(function ($log, $window, $q, $http, ImpacLinking, ImpacRoutes, ImpacTheming, ImpacDashboardsSvc) {

  //--------------------------------------------------------
  // Start editing
  //--------------------------------------------------------

  // Credentials and endpoints
  //------------------------------------------------
  // TODO: set-up server to enable local $http calls to setting.json
  var settings = {
    mno_url: 'https://uat.maestrano.io',
    impac_url: 'https://api-impac-uat.maestrano.io',
    api_key: '',
    api_secret: ''
  };

  // Stub dashboard content
  //------------------------------------------------
  // Uncomment to stub your workspace dashboard.
  // This proves useful when you want to add new widgets that are not
  // yet registered on maestrano.
  // Because data will still be retrieved from Impac! the
  // organization id (org-xxx) needs to be valid.
  // --
  // ImpacDashboardsSvc.stubWith({
  //   id: 0,
  //   name: "My Dashboard",
  //   full_name: "My Dashboard",
  //   currency: "AUD",
  //   data_sources: [
  //      {
  //         id:0,
  //         uid: "org-fbti",
  //         label:"Stubbed Corp"
  //      }
  //   ],
  //   widgets: [
  //      {
  //         id:0,
  //         name: "Net Sales",
  //         category: "sales/net_sales",
  //         width: 6,
  //         metadata:{
  //            organization_ids: ["org-fbti"]
  //         }
  //      }
  //   ]
  // });

  //--------------------------------------------------------
  // That's all!
  // Do not edit below unless you know what you're
  // doing
  //--------------------------------------------------------

  // Check credentials have been provided
  if (!settings.api_key || !settings.api_secret) {
    fail('missing authentication credentials!');
  }

  // encodes a base64 string - Basic Authentication.
  var credentials = $window.btoa(settings.api_key + ':' + settings.api_secret);
  // attaches basic auth onto $http default, which configures all impacWorkspace & maestrano.impac
  // angular modules $http requests.
  $http.defaults.headers.common.Authorization = 'Basic ' + credentials;

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
      showSyncApps: function() { return false; }
    }
  });

  // Link core callbacks required for impac-angular lib to run.
  ImpacLinking.linkData({
    organizations: function () {
      return getOrganizations();
    },
    user: function () {
      return $q.when({ name: 'Developer' });
    }
  });

  function getOrganizations() {
    return $http.get(settings.mno_url + '/api/v2/impac/organizations')
      .then(function (response) {
        var organizations = (response.data || []);
        return { organizations: organizations, currentOrgId: (organizations[0].id || null) };
      },
        fail
      );
  }

  function fail(err) {
    $log.error('workspace/index.js ERROR: ', err);
    return {};
  }

});
