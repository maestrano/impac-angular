angular
  .module('impacWorkspace', ['maestrano.impac'])
  .config(function (ImpacRoutesProvider) {

  })
  .run(function (ImpacLinking, $q) {
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
