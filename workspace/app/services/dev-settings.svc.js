// -------------------------------------------------------
// Impac Workspace Settings
// --------
// Providing Impac! Angular defaults and configuration abilities.
// -------------------------------------------------------
angular.module('impacWorkspace').service('DevSettings', function ($q, ImpacRoutes, ImpacLinking, ImpacDeveloper, DevUser) {
  var _self = this;

  var DEFAULTS = {
    // API Endpoints
    mnoeUrl: {
      host: 'http://localhost:7000',
      base: '/mnoe/jpi/v1'
    },
    impacUrl: {
      host: 'http://localhost:4000',
      base: '/api'
    },
    // Selected Organization - first organisations if unspecified
    orgUid: '',
    // -----------------------------------------------
    // Kpis configurations
    // -----------------------------------------------
    // Change this to `true` to force kpi's to allow multiple watchables, instead of
    // using the mno_hub kpis#discover action maps kpis to have single watchables per kpi.
    multipleWatchableMode: false,
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
  };

  this._defaults = angular.copy(DEFAULTS);

  this.defaults = function () {
    return angular.copy(_self._defaults);
  };

  this.resetDefaults = function () {
    return _self._defaults = angular.copy(DEFAULTS);
  }

  // NOTE: this will be refactored a lot when mnoe routes are added as default
  // in impac-angular.
  // TODO: add routes settings to #/settings, 'basic' & 'advance' tabs could be good.
  this.buildRoutesConfig = function (mnoeUrl, impacUrl, multipleWatchableMode) {
    var routesConfig = {
      mnoHub: mnoeUrl.host + mnoeUrl.base,
      impacPrefix: "/impac",
      impacApi: impacUrl.host + impacUrl.base,
      dashboards: {
        index: mnoeUrl.host + mnoeUrl.base + "/impac/dashboards"
      },
      widgets: {
        index: mnoeUrl.host + mnoeUrl.base + "/impac/widgets",
        create: mnoeUrl.host + mnoeUrl.base + "/impac/dashboards/:dashboard_id/widgets"
      },
      kpis: {
        index: mnoeUrl.host + mnoeUrl.base + "/impac/kpis",
        create: mnoeUrl.host + mnoeUrl.base + "/impac/dashboards/:dashboard_id/kpis",
        update: mnoeUrl.host + mnoeUrl.base + "/impac/kpis/:id",
        del: mnoeUrl.host + mnoeUrl.base + "/impac/kpis/:id"
      },
      alerts: {
        index: mnoeUrl.host + mnoeUrl.base + "/impac/alerts",
        create: mnoeUrl.host + mnoeUrl.base + "/impac/kpis/:kpi_id/alerts",
        del: mnoeUrl.host + mnoeUrl.base + "/impac/alerts/:id"
      }
    }
    // Removes custom index path, defaulting kpi discovery to impac api, where KPIs with
    // multiple watchables are returned.
    if (multipleWatchableMode) { delete routesConfig.kpis.index; }
    return angular.copy(routesConfig)
  };

  this.buildLinkingConfig = function (orgUid, mnoeUrl) {
    return {
      organizations: function () {
        return DevUser.getOrganizations(orgUid, mnoeUrl);
      },
      user: function () {
        return DevUser.getUser(mnoeUrl);
      },
      // TODO: add pusher key to advance settings on #/settings.
      pusher_key: 'e98dfd8e4a359a7faf48' // Maestrano pusher account key.
    }
  }

  this.buildDeveloperConfig = function (widgetsTemplates) {
    return {
      status: true,
      widgetsTemplates: widgetsTemplates
    }
  };

  this.updateProviders = function (data) {
    ImpacRoutes.configureRoutes(_self.buildRoutesConfig(data.mnoeUrl, data.impacUrl, data.multipleWatchableMode));
    ImpacLinking.linkData(_self.buildLinkingConfig(data.orgUid, data.mnoeUrl));
    ImpacDeveloper.configure(_self.buildDeveloperConfig(data.widgetsTemplates));

    // Save settings data to this service's copy of defaults.
    _self._defaults = data;
  };

  return this;
});
