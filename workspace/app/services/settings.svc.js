// -------------------------------------------------------
// Impac Workspace Settings
// -------------------------------------------------------
// Provide important configurations for the impacWorkspace.
angular.module('impacWorkspace').factory('settings', function () {
  return {
    // Credentials and endpoints
    mno_url: '/mnoe/jpi/v1', // rename to mnoe_url
    impac_url: 'http://localhost:4000',
    // TODO: build login form
    email: 'xaun.lopez@maestrano.com',
    password: 'Test1234',
    org_uid: '', // First organisations if unspecified

    // -----------------------------------------------
    // Kpis configurations
    // -----------------------------------------------
    // Change this to `true` to force kpi's to allow multiple watchables, instead of
    // using the mno_hub kpis#discover action maps kpis to have single watchables per kpi.
    multiple_watchables_mode: false,
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
