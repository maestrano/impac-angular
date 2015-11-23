angular
  .module('impacWorkspace', ['maestrano.impac'])
  // configures the $http service headers to use basic http auth
  .config(function ($httpProvider) {
    var api_key = '6002a744e3196eec8402e0c764ed725fe401d2d90c946f0c16e4d656a9303f40',
        api_secret = 'f10b06a5-8cc6-43c0-a52b-aec93ede3da8';
    // TODO: base64 coding?
    // $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + api_key + ':' + api_secret;
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .config(function (ImpacRoutesProvider) {
    // ImpacRoutesProvider.configureRoutes({
      // dhbBasePath: 'https://uat.maestrano.io/api/v2/impac_dashboards',
      // widgetBasePath: 'https://uat.maestrano.io/api/v2/impac_widgets'
      // todo: api v2 kpi extension
    // });
  })
  .run(function (ImpacLinking, $q, $http) {
    $http.defaults.headers.common.Authorization = 'Basic NjAwMmE3NDRlMzE5NmVlYzg0MDJlMGM3NjRlZDcyNWZlNDAxZDJkOTBjOTQ2ZjBjMTZlNGQ2NTZhOTMwM2Y0MDpmMTBiMDZhNS04Y2M2LTQzYzAtYTUyYi1hZWM5M2VkZTNkYTg=';
    $http.get('http://localhost:3000/api/v2/impac/dashboards');
    // var res = $resource('http://localhost:3000/api/v2/impac/dashboards');
    // res.get();
    ImpacLinking.linkData({
      organizations: function () {
        return $q.when({
          organizations: ['org-fbp1'],
          currentOrgId: 405
        });
      },
      user: function () {
        return $q.when({sso_session: '28effdd74ae35e1e57b47ed24b83272f2071ed4d'});
      }
    });
  });
