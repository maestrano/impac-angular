var module = angular.module('impacWorkspace', ['maestrano.impac']);

// Configuration impac-angular lib on module impacWorkSpace run.
module.config(function ($httpProvider) {
  // $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  // $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  // $httpProvider.defaults.useXDomain = true;
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
module.run(function ($log, $window, $q, $http, ImpacLinking, ImpacRoutes) {

  // TODO: set-up server to enable local $http calls to setting.json
  var settings = {
    url: 'http://localhost:3000',
    api_key: '7149f0c91d7e995c10be79ed4881c035d662632995e852f550313345e0f0b982',
    api_secret: '4a776ea4-8134-4f38-b632-85cbe951524e'
  };

  // encodes a base64 string
  var credentials = $window.btoa(settings.api_key + ':' + settings.api_secret);

  $http.defaults.headers.common.Authorization = 'Basic ' + credentials;

  ImpacLinking.linkData({
    organizations: function () {
      return getOrganizations();
    },
    user: function () {
      return $q.when({});
    }
  });

  ImpacRoutes.configureRoutes({
    dhbBasePath: settings.url + '/api/v2/impac/dashboards',
    widgetBasePath: settings.url + '/api/v2/impac/widgets',
    // impacKpisBasePath: ''
  });

  function getOrganizations() {
    return $http.get(settings.url + '/api/v2/impac/organizations')
      .then(function (response) {
        var organizations = (response.data || []);
        return { organizations: organizations, currentOrgId: (organizations[0].id || null) };
      }
    );
  }

  function fail(err) {
    $log.error('workspace/index.js ERROR: ', err);
  }

});
