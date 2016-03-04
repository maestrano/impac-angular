(function() {
'use strict';

/*                                                                        **
**                      MAESTRANO IMPAC-ANGULAR LIBRARY                   **
**                                                                        */
//*************************************************************************/
//* Create all modules and define dependencies.
//*************************************************************************/
angular.module('maestrano.impac',
  [
    'impac.config',
    'impac.services',
    'impac.filters',
    'impac.components',
    // EXTERNAL DEPENDENCIES //
    'ui.sortable',
    'ui.bootstrap',
    'emguo.poller'
  ]);

/*
** COMPONENTS
*/
angular.module('impac.components',
  [
    'impac.components.dashboard',
    'impac.components.dashboard-selector',
    'impac.components.dashboard-settings',
    'impac.components.kpis-bar',
    'impac.components.kpi',
    'impac.components.chart',
    'impac.components.widget',
    'impac.components.widgets',
    'impac.components.widgets-settings',
    'impac.components.widgets-common',
    'impac.components.templates'
  ]
);
angular.module('impac.components.widgets',
  [
    'impac.components.widgets.accounts-accounting-values',
    'impac.components.widgets.accounts-assets-summary',
    'impac.components.widgets.accounts-assets-liability-summary',
    'impac.components.widgets.accounts-balance-sheet',
    'impac.components.widgets.accounts-balance',
    'impac.components.widgets.accounts-cash-summary',
    'impac.components.widgets.accounts-comparison',
    'impac.components.widgets.accounts-custom-calculation',
    'impac.components.widgets.accounts-expenses-revenue',
    'impac.components.widgets.accounts-payable-receivable',
    'impac.components.widgets.accounts-profit-and-loss',
    'impac.components.widgets.accounts-class-comparison',
    'impac.components.widgets.accounts-expense-weight',
    'impac.components.widgets.accounts-assets-vs-liabilities',
    'impac.components.widgets.accounts-detailed-classifications',
    'impac.components.widgets.hr-employee-details',
    'impac.components.widgets.hr-employees-list',
    'impac.components.widgets.hr-leaves-balance',
    'impac.components.widgets.hr-leaves-schedule',
    'impac.components.widgets.hr-payroll-summary',
    'impac.components.widgets.hr-payroll-taxes',
    'impac.components.widgets.hr-salaries-summary',
    'impac.components.widgets.hr-superannuation-accruals',
    'impac.components.widgets.hr-timesheets',
    'impac.components.widgets.hr-workforce-summary',
    'impac.components.widgets.invoices-aged-payables-receivables',
    'impac.components.widgets.invoices-list',
    'impac.components.widgets.invoices-summary',
    'impac.components.widgets.sales-aged',
    'impac.components.widgets.sales-break-even',
    'impac.components.widgets.sales-comparison',
    'impac.components.widgets.sales-customer-details',
    'impac.components.widgets.sales-cycle',
    'impac.components.widgets.sales-forecast',
    'impac.components.widgets.sales-growth',
    'impac.components.widgets.sales-leads-funnel',
    'impac.components.widgets.sales-leads-list',
    'impac.components.widgets.sales-list',
    'impac.components.widgets.sales-margin',
    'impac.components.widgets.sales-net-sales',
    'impac.components.widgets.sales-number-of-leads',
    'impac.components.widgets.sales-opportunities-funnel',
    'impac.components.widgets.sales-performance',
    'impac.components.widgets.sales-segmented-turnover',
    'impac.components.widgets.sales-summary',
    'impac.components.widgets.sales-top-opportunities',
    'impac.components.widgets.sales-top-customers',
    'impac.components.widgets.sales-new-vs-existing-customers'
  ]
);
angular.module('impac.components.widgets-settings',
  [
    'impac.components.widgets-settings.account',
    'impac.components.widgets-settings.accounts-list',
    'impac.components.widgets-settings.chart-filters',
    'impac.components.widgets-settings.dates-picker',
    'impac.components.widgets-settings.formula',
    'impac.components.widgets-settings.hist-mode',
    'impac.components.widgets-settings.limit-entries',
    'impac.components.widgets-settings.organizations',
    'impac.components.widgets-settings.param-selector',
    'impac.components.widgets-settings.params-picker',
    'impac.components.widgets-settings.params-checkboxes',
    'impac.components.widgets-settings.time-period',
    'impac.components.widgets-settings.time-presets',
    'impac.components.widgets-settings.time-slider',
    'impac.components.widgets-settings.width'
  ]
);
angular.module('impac.components.dashboard-settings',
  [
    'impac.components.dashboard-settings.currency',
    'impac.components.dashboard-settings.sync-apps',
  ]
);
angular.module('impac.components.widgets-common',
  [
    'impac.components.widgets-common.top-buttons',
    'impac.components.widgets-common.data-not-found',
    'impac.components.widgets-common.editable-title'
  ]
);
/*
** SERVICES
*/
angular.module('impac.services',
  [
    'impac.services.routes',
    'impac.services.linking',
    'impac.services.theming',
    'impac.services.assets',
    'impac.services.chart-formatter',
    'impac.services.message-bus',
    'impac.services.utilities',
    'impac.services.main',
    'impac.services.kpis',
    'impac.services.dashboards',
    'impac.services.widgets',
    'impac.services.developer',
  ]
);
/*
** FILTERS
*/
angular.module('impac.filters',
  [
    'impac.filters.titleize',
    'impac.filters.truncate',
    'impac.filters.mno-currency',
    'impac.filters.mno-date'
  ]
);
/*
** CONFIG
*/
angular.module('impac.config', []).config(['$httpProvider',
  function ($httpProvider) {
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  }
]);



angular.module("impac.components.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("dashboard/create.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3>Create New Dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!-- Create a new dashboard -->\n  <div class=\"row dashboard-form\">\n    <div class=\"col-sm-10 col-sm-offset-1\">\n      <form class=\"form-horizontal\" role=\"form\">\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Name</label>\n          <div class=\"col-sm-10\">\n            <input type=\'text\' class=\"form-control\" ng-model=\"model.name\" placeholder=\"E.g: Cash Accounts Monitoring\" required>\n          </div>\n        </div>\n\n        <div class=\"form-group\" ng-show=\"isMultiCompanyAvailable()\">\n          <label class=\"col-sm-2 control-label\">Type</label>\n          <div class=\"col-sm-10\">\n            <div class=\"btn-group\" role=\"group\">\n              <button type=\"button\" ng-click=\"selectMode(\'single\')\" ng-class=\"btnBlassFor(\'single\')\">Current Company</button>\n              <button type=\"button\" ng-click=\"selectMode(\'multi\')\" ng-class=\"btnBlassFor(\'multi\')\">Multi Company</button>\n            </div>\n          </div>\n        </div>\n\n        <!-- Single Company mode -->\n        <div class=\"form-group\" ng-show=\"isCurrentOrganizationShown()\">\n          <div ng-show=\"!canAccessAnalyticsForCurrentOrganization()\" class=\"text-center text-purple\">\n            <div class=\"spacer1\"></div>\n            <p>\n              Oops! Only Admins and Super Admins can create dashboards for company {{currentOrganization.name}}.\n              <span ng-show=\"isMultiCompanyAvailable()\">Please select a \"Multi Company\" dashboard to select data from other companies.</span>\n            </p>\n          </div>\n        </div>\n\n        <!-- Multi Company mode -->\n        <div class=\"form-group\" ng-show=\"isSelectOrganizationShown()\">\n          <label class=\"col-sm-2 control-label\">Companies</label>\n          <div class=\"col-sm-10\">\n            <ul class=\"list-unstyled\">\n              <li ng-repeat=\"organization in organizations\" >\n                <input type=\"checkbox\" ng-model=\"organization.$selected\" ng-disabled=\"!canAccessAnalyticsData(organization)\">\n                {{organization.name}}\n                <span ng-show=\"organization.is_customer_account\">(customer)</span>\n                <span ng-show=\"!canAccessAnalyticsData(organization)\">\n                  <em><small>\n                    &nbsp;\n                    &nbsp;\n                    <i class=\"fa fa-exclamation-circle text-danger\" tooltip=\"Only Admins and Super Admins can access analytics data for this company\"></i>\n                  </small></em>\n                </span>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </form>\n\n      <!-- End row col -->\n    </div>\n\n    <!-- End Dashboard form -->\n  </div>\n\n\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-primary\" ng-click=\"proceed()\" ng-disabled=\"isProceedDisabled()\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-if=\"isLoading\"></i>\n        Add\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard/dashboard.tmpl.html","<!-- DASHBOARD -->\n<div class=\"analytics\" ng-hide=\"(isLoading || forceLoad)\" ng-class=\"{\'hide-dhb\': (isLoading || forceLoad), \'show-dhb\': !(isLoading || forceLoad)}\">\n  <div mno-star-wizard=true modal-open=\'starWizardModal.value\'></div>\n\n  <!-- Title and Dashboard selection -->\n  <div id=\"head-title\">\n    <div class=\"row\" ng-if=\"showDhbHeading\">\n      <div class=\"col-md-6 col-sm-12\" id=\"dashboard-heading\">\n        <img ng-src=\"{{impacTitleLogo}}\" />\n        <h2>\n          {{dhbHeadingText}}\n        </h2>\n      </div>\n    </div>\n\n    <!-- Impac KPI\'s -->\n    <kpis-bar ng-if=\"showKpisBar\" kpis=\"currentDhb.kpis\"></kpis-bar>\n\n    <!-- Dashboards selection/creation/deletion -->\n    <dashboard-selector id=\"module__dashboard-selector\" is-widget-selector-shown=\"showWidgetSelector()\" on-create-dashboard=\"createDashboardModal.open()\" on-display-widget-selector=\"displayWidgetSelector()\" on-select-dashboard=\"activateTimer()\"></dashboard-selector>\n  </div>\n\n  <div id=\"sub-menu\" collapse=\"!showSubMenu\">\n    <i class=\"fa fa-times\" ng-click=\"hideSubMenu()\" />\n\n    <!-- Displayed to MYOB Essentials Users -->\n    <div id=\"myob-message\" ng-if=\"hasMyobEssentialsOnly && myobMessageConfig.show\" class=\"alert alert-warning\">\n      <h3>It looks like you are using MYOB Essentials...</h3>\n      <p>Unfortunately, all the information required by Impac! is not exposed by MYOB Essentials API <strong>yet</strong>.\n      Consequently, most of the accounting widgets provided by Impac! won\'t find a valid source of data to display their content.</p>\n      <p>Maybe you should consider switching to <a href=\"http://myob.com.au/products/small-business/accounting-software/myob-accountright-1422735752948\" target=\"_blank\">MYOB AccountRight</a>, the other MYOB accounting solution?</p>\n      <p align=\"right\" ng-if=\"myobMessageConfig.appLink.show\"><a ng-href=\"{{myobMessageConfig.appLink.url}}\" target=\"_blank\">{{myobMessageConfig.appLink.text}}</a></p>\n    </div>\n  </div>\n\n  <!-- Widgets selection container -->\n  <div id=\"widget-selector\" collapse=\"!showWidgetSelector()\" ng-if=\"!customWidgetSelector.path\">\n    <div class=\"title\">\n      <i class=\"fa fa-times-circle\" ng-if=\"showCloseWidgetSelectorButton()\" ng-click=\"displayWidgetSelector(false)\"/>\n      <span class=\"badge confirmation\">Widget added!</span>\n      Select the widgets you want to add to your dashboard.\n    </div>\n\n    <div class=\"row top-container\">\n      <div class=\"col-md-3 categories\">\n        <div class=\"row header\">\n          All categories\n        </div>\n        <div class=\"row lines\">\n          <div class=\"col-md-12\" style=\"padding: 3px 12px;\">\n            <p ng-click=\"selectCategory(\'accounts\')\" ng-class=\"isCategorySelected(\'accounts\') ? \'selected\' : none\">Accounting</p>\n            <p ng-click=\"selectCategory(\'invoices\')\" ng-class=\"isCategorySelected(\'invoices\') ? \'selected\' : none\">Invoicing</p>\n            <p ng-click=\"selectCategory(\'hr\')\" ng-class=\"isCategorySelected(\'hr\') ? \'selected\' : none\">HR / Payroll</p>\n            <p ng-click=\"selectCategory(\'sales\')\" ng-class=\"isCategorySelected(\'sales\') ? \'selected\' : none\">Sales</p>\n          </div>\n        </div>\n\n        <div class=\"arrow\" ng-style=\"getSelectedCategoryTop()\">\n          <div class=\"square\"></div>\n          <i class=\"fa fa-caret-right\"></i>\n        </div>\n\n      </div>\n\n      <div class=\"col-md-9 widgets\">\n        <div class=\"row header\">\n          {{getSelectedCategoryName() | titleize}}\n        </div>\n        <div class=\"row lines\">\n          <div class=\"col-md-4\" ng-repeat=\"widgetPattern in getWidgetsForSelectedCategory()\" style=\"padding: 0px 8px;\">\n            <p ng-click=\"addWidget(widgetPattern.path, widgetPattern.metadata)\" tooltip=\"{{widgetPattern.desc}}\" tooltip-placement=\"{{$index < 9 ? \'bottom\' : \'top\'}}\" tooltip-animation=\"false\"  tooltip-append-to-body=\"true\" tooltip-class=\"impac-widget-selector-tooltip\"><i class=\"fa fa-{{widgetPattern.icon}}\" /> {{widgetPattern.name}} <i class=\"fa fa-plus-circle\" /></p>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"bottom\" ng-if=\"widgetSuggestionModal.config.apiPath\">\n      <span class=\"suggestion\">\n        Can\'t find the widget you\'re looking for? <a ng-click=\"widgetSuggestionModal.open()\">Give us your suggestions here!</a>\n      </span>\n    </div>\n  </div>\n\n  <!-- custom widget selector template configured from ImpacThemingProvider -->\n  <div id=\"custom-widget-selector\" ng-if=\"customWidgetSelector.path\" ng-include=\"customWidgetSelector.path\" ng-hide=\"showChooseDhbMsg()\"></div>\n\n  <!-- Dashboard Settings - DEFAULT POSITION -->\n  <div id=\"dashboard-settings-panel\" ng-if=\"!dhbSettingsConfig.inWidgetsContainer && !showChooseDhbMsg()\" class=\"row text-right\">\n    <div dashboard-setting-sync-apps ng-if=\"dhbSettingsConfig.showSyncApps()\"/>\n    <div dashboard-setting-currency currency=\"currentDhb.currency\" />\n  </div>\n\n  <!-- Errors -->\n  <div class=\"alert alert-error\" ng-show=\"errors\">\n    <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n    <ul>\n      <li ng-repeat=\"error in errors\">{{error}}</li>\n    </ul>\n  </div>\n\n  <div id=\"no-widgets-container\" class=\"row text-center ng-hide\" ng-show=\'(showChooseDhbMsg() || showNoWidgetsMsg())\'>\n\n    <img ng-src=\"{{impacDashboardBackground}}\" class=\"bg\">\n\n    <div class=\"impac-info-message\">\n      <!-- First Time Dashboard Creation -->\n      <div class=\"ng-hide\" ng-show=\'showChooseDhbMsg()\'>\n        <div class=\'hidden-xs\'>\n          <div class=\'spacer4\'></div>\n          <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"testimonial promo-dark\">\n                <p><b>{{dhbErrorsConfig.firstTimeCreated.first}}</b></p>\n                <p>{{dhbErrorsConfig.firstTimeCreated.second}}</p>\n              </div>\n            </div>\n          </div>\n          <div class=\'spacer2\'></div>\n        </div>\n        <div class=\"align-center\">\n          <button ng-click=\"createDashboardModal.open()\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> Create a Dashboard!</button>\n        </div>\n      </div>\n\n      <!-- Empty Dashboard -->\n      <div class=\"ng-hide\" ng-show=\'showNoWidgetsMsg()\'>\n        <div class=\'hidden-xs\'>\n          <div class=\'spacer4\'></div>\n          <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"testimonial promo-dark\">\n                <p><b>{{dhbErrorsConfig.empty.first}}</b></p>\n                <p>{{dhbErrorsConfig.empty.second}}</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"spacer2\"></div>\n        </div>\n        <div class=\"align-center\">\n          <button ng-disabled=\"showWidgetSelector()\" ng-click=\"displayWidgetSelector()\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> Add a new Widget</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- First Time Dashboard Creation -->\n  <div class=\"row text-center\" ng-show=\'showChooseDhbMsg()\'>\n    <div class=\"spacer2 hidden-xs\"></div>\n    <div class=\'col-md-8 col-md-offset-2\'>\n      <p class=\"text-muted\"><small><em>{{dhbErrorsConfig.firstTimeCreated.note}}</em></small></p>\n    </div>\n  </div>\n\n  <!-- Widgets -->\n  <div class=\'row\' id=\"widgets-section\" ng-hide=\"showNoWidgetsMsg() || showChooseDhbMsg()\">\n    <!-- Dashboard Settings - CONFIGURED INSIDE WIDGETS-CONTAINER -->\n    <div id=\"dashboard-settings-panel\" ng-if=\"dhbSettingsConfig.inWidgetsContainer && !showChooseDhbMsg()\" class=\"text-right col-md-12 in-widgets-container\">\n      <div dashboard-setting-sync-apps ng-if=\"dhbSettingsConfig.showSyncApps()\"/>\n      <div dashboard-setting-currency currency=\"currentDhb.currency\" />\n    </div>\n    <div class=\"col-md-12\">\n      <div id=\"widgets-container\" ui-sortable=\"sortableOptions\" ng-model=\"currentDhb.widgets\" class=\"row\">\n        <!-- Widgets -->\n        <div impac-widget widget=\"widget\" is-accessibility=\"accessibility\" parent-dashboard=\"currentDhb\" ng-repeat=\"widget in currentDhb.widgets\" class=\"widget-item\" ng-class=\"widget.getColClass()\" on-display-alerts=\"displaySubMenu()\" />\n        <!-- Add Widget Tile, enabled & customised in ImpacThemingProvider -->\n        <div ng-if=\"isAddChartEnabled\" class=\"unsortable\" ng-click=\"addChartTileOnClick()\">\n          <div class=\"col-md-6 widget-item add-chart\">\n            <div class=\"a-content\">+ chart</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"analytics\" ng-show=\"(isLoading || forceLoad)\">\n  <div class=\"row\">\n    <div class=\"col-md-12 loader-container text-center\" style=\"margin-top: 200px;\">\n      <i class=\"fa fa-refresh fa-spin\" style=\"font-size: 250px; opacity: 0.7;\"/>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard/widget-suggestion.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3>Suggest a widget</h3>\n</div>\n\n<div class=\"modal-body\">\n\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <label>What would you name your widget?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.name\" ng-disabled=\"isLoading\" />\n    </div>\n    <div class=\"col-md-6\">\n      <label>In which category?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.category\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" />\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <label>What kind of information would your widget display?</label><br/>\n      <textarea ng-model=\"widgetDetails.description\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" ng-show=\"isLoading\" />\n\n  <div class=\"row\" collapse=\"!onSuccess\">\n    <div class=\"col-md-12 text-center\">\n      <h3 class=\"thanks-message\">{{userName | titleize}}, thanks a lot for helping us improve Impac!&trade;</h3>\n    </div>\n  </div>\n\n  <div class=\"row\" ng-show=\"error\">\n    <div class=\"col-md-12 text-center\">\n      <h5 style=\"color: red;\">\n        Unable to send suggestions request, please try again or contact technical support.\n      </h5>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-info\" ng-click=\"proceed()\" ng-disabled=\"!(widgetDetails.name && widgetDetails.category && widgetDetails.description) || isLoading\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n        Send your suggestion\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/bootstrap-tabs.tmpl.html","<div class=\"row buttons-bar-row\">\n  <div class=\"buttons-bar col-sm-8\" ng-show=\"isThereADashboard()\">\n    <tabset type=\"{{selectorType}}\">\n      <tab ng-repeat=\"dhb in dashboardsList\" ng-click=\"selectDashboard(dhb.id)\" active=\"dhb.active\">\n        <tab-heading>\n          {{dhb.full_name}}\n          <a href=\"\" class=\"close-link\" ng-if=\"isDeleteDhbEnabled\">\n            <i class=\"fa fa-times\" ng-click=\"deleteDashboardModal.open()\"></i>\n          </a>\n        </tab-heading>\n      </tab>\n      <tab ng-if=\'isAccessibilityEnabled\' ng-click=\"toggleAccessibilityMode()\">\n        <tab-heading>\n          <a href=\"\"><i class=\"fa fa-wheelchair\"></i></a>\n        </tab-heading>\n      </tab>\n      <tab ng-if=\"isAddDhbEnabled\" ng-click=\"onCreateDashboard()\">\n        <tab-heading>\n          <a href=\"\">+</a>\n        </tab-heading>\n      </tab>\n    </tabset>\n  </div>\n  <div class=\'buttons-bar col-sm-4\'>\n    <div class=\'actions-panel\'>\n      <button ng-if=\'isAccessibilityEnabled\' ng-click=\"toggleAccessibilityMode()\" class=\'btn btn-info\' ng-disabled=\"isWidgetSelectorShown()\"><span class=\'fa fa-wheelchair\'></span></button>\n      <button ng-if=\"isAddWidgetEnabled && isThereADashboard()\" ng-click=\"onDisplayWidgetSelector()\" class=\'btn btn-warning\' ng-disabled=\"isWidgetSelectorShown()\"><span class=\'fa fa-plus\'></span> Add Widget</button>\n      <!-- <button id=\'data-upload-wizard\' ng-click=\'openStarWizard()\' class=\'btn btn-success hidden-xs\' ><span class=\'fa fa-upload\'></span> Data Upload</button> -->\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/delete.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3>Delete Dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!-- Create a new widget -->\n  <p>Are you sure you want to delete this analytics dashboard?</p>\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-danger\" ng-click=\"proceed()\" ng-disabled=\"isLoading\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-if=\"isLoading\"></i>\n        Delete\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/dropdown.tmpl.html","<div class=\"row buttons-bar-row buttons-bar\">\n\n  <div class=\"col-md-6 dropdown-container\" ng-hide=\"isLoading\">\n    <div ng-if=\"isThereADashboard()\">\n      <h4 class=\'dashboard-title\'>\n        <div style=\"display: inline-block;\" ng-click=\"toggleShowDashboardsDropdown()\">\n          {{currentDhb.full_name}}\n          <i class=\"fa fa-chevron-down\" style=\"font-size: 18px;\"></i>\n        </div>\n        <i ng-hide=\"showChangeDashboardNameBox\" class=\"fa fa-pencil\" tooltip=\"Change name\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" ng-click=\"toggleChangeDashboardNameBox(currentDhb)\"></i>\n      </h4>\n\n      <div ng-show=\"showDashboardsDropdown\" class=\'dashboard-select\'>\n        <div ng-hide=\"dhb.id == currentDhb.id\" class=\'option\' ng-repeat=\"dhb in dashboardsList\">\n          <span class=\"name\" ng-click=\"selectDashboard(dhb.id)\">{{dhb.full_name}}</span>\n          <i ng-hide=\"showChangeDashboardNameBox\" class=\"fa fa-pencil\" tooltip=\"Change name\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" ng-click=\"toggleChangeDashboardNameBox(dhb)\"/>\n        </div>\n\n        <div ng-show=\"showCreateDashboardButton\" class=\"option create\" ng-click=\"onCreateDashboard()\"><i class=\"fa fa-plus\" /> Create Dashboard</div>\n      </div>\n\n      <div ng-if=\"showChangeDashboardNameBox\" class=\"change-name\">\n        <p>Change dashboard name:</p>\n        <input type=\"text\" class=\"form-control\" id=\"changeDhbNameInput\" ng-model=\"dashboardToChange.name\" ng-keyup=\"checkAndUpdateDashboardName($event)\"/>\n        <button class=\"btn btn-sm btn-default\" ng-click=\"hideChangeDashboardNameBox()\">Cancel</button>\n        <button class=\"btn btn-sm btn-success\" style=\"margin-left: 10px\" ng-click=\"updateDashboardName()\">Confirm</button>\n      </div>\n\n      <p class=\"data-source-label\">\n        <small><b>Source:</b> {{organizationsNames()}}</small>\n      </p>\n    </div>\n  </div>\n\n  <div class=\"col-md-6 loader-container\" ng-show=\"isLoading\">\n    <i class=\"fa fa-spinner fa-pulse fa-4x loading-spinner\"/>\n  </div>\n\n  <div class=\'col-md-6 actions-panel\'>\n\n    <button ng-if=\'isAccessibilityEnabled\' ng-click=\"toggleAccessibilityMode()\" class=\'btn btn-info\' ng-disabled=\"showWidgetSelector\"><span class=\'fa fa-wheelchair\'></span></button>\n\n    <button ng-if=\"isAddWidgetEnabled && isThereADashboard()\" ng-click=\"onDisplayWidgetSelector()\" class=\'btn btn-warning\' ng-disabled=\"isWidgetSelectorShown()\"><span class=\'fa fa-plus\'></span> Add Widget</button>\n\n    <button ng-if=\"isAddDhbEnabled\" ng-click=\"onCreateDashboard()\" class=\'btn btn-warning\' ng-show=\"showCreateDashboardButton\"><span class=\'fa fa-pencil-square-o\'></span> Create Dashboard</button>\n\n    <!-- <button id=\'data-upload-wizard\' ng-click=\'dhbCtrl.openStarWizard()\' class=\'btn btn-success hidden-xs\' ><span class=\'fa fa-upload\'></span> Data Upload</button> -->\n\n    <button ng-if=\"isDeleteDhbEnabled\" ng-click=\"deleteDashboardModal.open()\" class=\'btn btn-danger hidden-xs\' ng-show=\"isThereADashboard()\" tooltip=\"Delete Dashboard\"><span class=\'fa fa-trash-o\'></span> </button>\n\n  </div>\n\n</div>\n");
$templateCache.put("kpi/kpi.tmpl.html","<div class=\"tile kpi\" ng-class=\"{ \'static\': kpi.static }\">\n\n  <div class=\"kpi-show\" ng-hide=\"showEditSettings\">\n    <small class=\"kpi-title\" ng-if=\"::kpi.static\">{{::kpi.name}}</small>\n    <small class=\"kpi-title\" ng-if=\"::!kpi.static\" editable-text=\"kpi.name\" buttons=\"yes\" onaftersave=\"updateName()\">{{kpi.name}}</small>\n    <div class=\"kpi-watch\" ng-if=\"::!kpi.static\">({{::kpi.element_watched}})</div>\n    <span class=\"kpi-value\">{{kpi.data.value | mnoCurrency : kpi.data.unit}}</span>\n\n    <!-- TODO: refactor design to handle multiple targets and ranges -->\n    <div class=\"kpi-alert\" ng-repeat=\"target in kpi.targets track by $index\" ng-hide=\"editMode || kpi.data.results[$index]\">\n      <span ng-show=\"target.max\">over {{target.max | mnoCurrency : kpi.data.unit}}</span>\n      <span ng-show=\"target.min\">below {{target.min | mnoCurrency : kpi.data.unit}}</span>\n    </div>\n\n    <div class=\"kpi-alert\" ng-show=\"editMode\" ng-click=\"displayEditSettings()\">Edit</div>\n    <div class=\"kpi-alert kpi-close\" ng-show=\"editMode\" ng-click=\"deleteKpi()\">x</div>\n  </div>\n\n  <div class=\"kpi-edit\" ng-show=\"showEditSettings\">\n    <span class=\"param-name\">KPI target:</span>\n\n    <!-- TODO: refactor design to handle multiple targets and ranges -->\n    <div class=\"clearfix edit-limit align\">\n      <select class=\"pull-left select-limit-mode form-control input-sm\" ng-model=\"kpi.limit.mode\" ng-options=\"option.mode as option.label for option in possibleTargets\" >\n      </select>\n\n      <div class=\"pull-right input-limit-value form-group has-feedback\">\n        <input type=\"text\" class=\"form-control input-sm\" ng-model=\"kpi.limit.value\">\n        <span class=\"form-control-feedback\" aria-hidden=\"true\">{{kpi.data.unit}}</span>\n      </div>\n    </div>\n\n    <div class=\"extra-params\" ng-repeat=\"(param, paramValues) in kpi.possibleExtraParams track by $index\">\n      <span class=\"param-name\">Select {{param | titleize}}:</span>\n      <select class=\"form-control input-sm\" ng-model=\"kpi.extra_params[param]\" ng-options=\"value.id as value.label for value in paramValues\">\n      </select>\n    </div>\n\n    <button class=\"btn btn-xs btn-default\" ng-click=\"hideEditSettings()\">Cancel</button>\n    <button class=\"btn btn-xs btn-success\" ng-click=\"updateSettings()\">Save</button>\n  </div>\n\n</div>\n");
$templateCache.put("kpis-bar/kpis-bar.tmpl.html","<div class=\"row kpis\">\n  <div class=\"title-actions col-xs-4 col-sm-2\">\n    <div ng-click=\"toggleAvailableKpis()\"><a href=\"\"><i class=\"fa fa-plus\"></i> Attach KPI</a></div>\n\n    <div class=\"available-kpis-container\" collapse=\"hideAvailableKpis\">\n      <div ng-repeat=\"kpi in availableKpis\" class=\"available-kpi\" ng-init=\"kpi.element_watched = kpi.watchables[0]\">\n        <span class=\"kpi-name\">{{formatKpiName(kpi.endpoint)}}</span>\n        <button class=\"btn btn-sm btn-info\" ng-click=\"addKpi(kpi)\">+ Attach</button>\n        <select class=\"form-control-static input-sm\" ng-model=\"kpi.element_watched\" ng-options=\"watchable for watchable in kpi.watchables\"></select>\n      </div>\n    </div>\n\n    <div ng-click=\"toggleEditMode()\"><a href=\"\"><i class=\"fa fa-cog\"></i> Edit KPI Settings</a></div>\n  </div>\n\n  <impac-kpi class=\"col-xs-4 col-sm-2\" kpi=\"kpi\" on-delete=\"removeKpi(kpi.id)\" edit-mode=\"showEditMode\" available-kpis=\"availableKpis\" ng-repeat=\"kpi in kpis track by $index\"></impac-kpi>\n\n  <div ng-show=\"isAddingKPI\" class=\"col-xs-2 kpi-loader\">\n    <i class=\"fa fa-2x fa-spin fa-refresh\"></i>\n  </div>\n</div>\n");
$templateCache.put("widget/widget.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" on-refresh=\"showWidget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div class=\"content\" ng-class=\"templateName\">\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    <div>\n      <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n      <p>Your data is being retrieved...</p>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\" ng-include=\"widgetContentTemplate()\" />\n</div>\n");
$templateCache.put("dashboard-settings/currency.tmpl.html","<div class=\"dashboard-settings currency\">\n  <select ng-options=\"cur for cur in currencies\" ng-model=\"currency\" ng-change=\"massAssignCurrency()\" ng-disabled=\"locked\">\n    <option ng-if=\"!currency\" value=\"\" disabled>Choose currency...</option>\n  </select>\n</div>\n");
$templateCache.put("dashboard-settings/sync-apps.tmpl.html","<!-- Will be displayed only if specified in configuration and if first response has been processed (lastConnector not null) -->\n<div class=\"dashboard-settings sync-apps\" ng-show=\"lastConnector\">\n\n  <span ng-show=\"isSyncing\">Syncing...</span>\n  <span ng-if=\"otherConnectors.length == 0\" ng-hide=\"isSyncing\">\n    {{ formatStatus(lastConnector) }}\n  </span>\n  <span ng-if=\"otherConnectors.length > 0\" ng-hide=\"isSyncing\" popover-template=\"\'connectors.tmpl.html\'\" popover-trigger=\"mouseenter\" popover-placement=\"bottom\">\n    {{ formatStatus(lastConnector) }}\n  </span>\n\n  <button id=\"sync\" class=\"btn btn-primary\" ng-click=\"synchronize()\" tooltip=\"Sync data and refresh dashboard\" ng-disabled=\"isSyncing\">\n    <i class=\"fa fa-refresh\" ng-class=\"{ \'fa-spin\': isSyncing }\"></i>\n  </button>\n\n</div>\n\n<!-- ui.bootstrap popover template -->\n<script type=\"text/ng-template\" id=\"connectors.tmpl.html\">\n  <div ng-repeat=\"connector in otherConnectors track by $index\">\n    <span>{{ formatStatus(connector) }}</span>\n  </div>\n  <div style=\"border-bottom: 1px solid #ccc; width: 100%; height: 2px; margin: 5px 0;\"></div>\n  <p>All other applications are synced in real-time.</p>\n</script>\n\n<!-- ui.bootstrap modal template -->\n<script type=\"text/ng-template\" id=\"alerts.tmpl.html\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">Synchronization alerts</h4>\n  </div>\n  <div class=\"modal-body\">\n    <div ng-repeat=\"connector in failedConnectors track by $index\">\n      {{connector.name}} - Synchronization failed. Please retry later.\n    </div>\n    <div ng-repeat=\"connector in disconnectedConnectors track by $index\">\n      {{connector.name}} is disconnected. Please reconnect to synchronize.\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\n  </div>\n</script>\n");
$templateCache.put("widgets/accounts-accounting-values.tmpl.html","<div widget-accounts-accounting-values>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">\n           {{ getCurrentPrice() | mnoCurrency : getCurrency() : false }}\n        </div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n        <div class=\"legend\">{{getLegend()}}</div>\n      </div>\n\n      <div class=\"history chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">{{getLegend()}}</div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n  \n</div>\n");
$templateCache.put("widgets/accounts-assets-liability-summary.tmpl.html","<div widget-accounts-assets-liability-summary>\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\" class=\"chart-container\">\n      <!-- account classification selectors -->\n      <div setting-param-selector parent-widget=\"widget\" param=\"classification\" options=\"accountsOptions\" selected=\"selectedAccountsOption\" class=\"row param-selector\" deferred=\"::paramSelectorDeferred\"/>\n      <!---->\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <div class=\"title\" ng-show=\"widget.metadata.organization_ids.length==1\">{{widget.content.summary[0].company}} {{classification}}</div>\n        <div class=\"title\" ng-hide=\"widget.metadata.organization_ids.length==1\">{{classification}} repartition</div>\n        <span ng-repeat=\"valuePair in dataSource\">\n          <span style=\"font-weight: bold; color: {{getAccountColor(valuePair)}};\">{{valuePair.label}}</span>: {{valuePair.total | mnoCurrency : getCurrency()}}\n          <br />\n        </span>\n      </div>\n    </div>\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-assets-summary.tmpl.html","<div widget-accounts-assets-summary>\n      \n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\" class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <div class=\"title\" ng-show=\"widget.metadata.organization_ids.length==1\">{{widget.content.summary[0].company}} {{classification}}</div>\n        <div class=\"title\" ng-hide=\"widget.metadata.organization_ids.length==1\">{{classification}} repartition</div>\n        <span ng-repeat=\"valuePair in dataSource\">\n          <span style=\"font-weight: bold; color: {{getAccountColor(valuePair)}};\">{{valuePair.label}}</span>: {{valuePair.total | mnoCurrency : getCurrency()}}\n          <br />\n        </span>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-assets-vs-liabilities.tmpl.html","<div widget-accounts-assets-vs-liabilities>\n      \n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\" class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\" style=\"max-height: 115px;\">\n        <div class=\"title\">\n          <i class=\"fa fa-circle\" style=\"color: {{assetsColor}};\"> Assets</i> | \n          <i class=\"fa fa-circle\" style=\"color: {{liabilitiesColor}};\"> Liabilities</i>\n        </div>\n        <div class=\"row\">\n          <div ng-repeat=\"data in companiesList\" ng-class=\"{\'col-md-6\': (widget.content.companies.length > 1), \'col-md-12\': (widget.content.companies.length == 1)}\">\n            <span>{{ data.company }}</span><br />\n            <span style=\"color: {{assetsColor}};\"> {{ data.assets | mnoCurrency : data.currency }}</span> <br/>\n            <span style=\"color: {{liabilitiesColor}};\"> {{ data.liabilities | mnoCurrency : data.currency }}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-balance.tmpl.html","<div widget-accounts-balance>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-account parent-widget=\"widget\" class=\"part\" deferred=\"::accountBackDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\">\n      <!-- Will be hidden once an account is selected -->\n      <div setting-account ng-hide=\"widget.selectedAccount\" parent-widget=\"widget\" label=\'Select an account to monitor\' on-account-selected=\"displayAccount()\" deferred=\"::accountFrontDeferred\" />\n\n      <!-- All the below divs will remain hidden until an account is selected -->\n      <div ng-show=\"widget.selectedAccount\">\n        <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n        <div ng-hide=\"widget.isHistoryMode\">\n          <h3>{{getName()}}</h3>\n          <div class=\"price\">\n             {{ getCurrentBalance() | mnoCurrency : getCurrency() : false }}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n\n        <div class=\"chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          <div class=\"legend\">{{getName()}}</div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-balance-sheet.tmpl.html","<div widget-accounts-balance-sheet>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"no-data-block\" ng-show=\"(isDataFound==false)\">\n      No balance sheet can be generated between this {{period.label.toLowerCase()}} and the previous {{period.label.toLowerCase()}}. <br />\n      Maybe try selecting a longer period? <br />\n      <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorFrontDeferred\" />\n    </div>\n\n    <div ng-show=\"(isDataFound==true)\" class=\"widget-lines-container\">\n      <!-- Tab header -->\n      <div class=\"row widget-line header\">\n        <div class=\"col-sm-6 col-xs-12 text-left\">Compare with previous: <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorBackDeferred\" /></div>\n        <div class=\"col-sm-3 col-xs-6 text-right\">{{widget.content.dates[0] | mnoDate : widget.metadata.period}}</div>\n        <div class=\"col-sm-3 col-xs-6 text-right\">{{widget.content.dates[1] | mnoDate : widget.metadata.period}}</div>\n      </div>\n     \n      <!-- Groups of statements with their accounts -->\n      <div class=\"row lines-group\" ng-repeat=\"category in categories\" >\n        <div class=\"col-xs-12\">\n          <!-- Statements lines -->\n          <div class=\"row widget-line total\" >\n            <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(category)\" style=\"cursor: pointer;\">\n              <i class=\"fa\" ng-class=\"isCollapsed(category) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n            </div>\n            <div class=\"col-sm-5 col-xs-11 text-left\">\n              <strong>{{category | titleize}}</strong>\n            </div>\n            <div class=\"col-sm-3 col-xs-6 text-right\">\n              <strong>{{widget.content.summary[category].totals[0] | mnoCurrency : widget.content.summary[category].currency}}</strong>\n            </div>\n            <div class=\"col-sm-3 col-xs-6 text-right\">\n              <strong>{{widget.content.summary[category].totals[1] | mnoCurrency : widget.content.summary[category].currency}}</strong>\n            </div>\n          </div>\n\n          <!-- Accounts lines -->\n          <div class=\"row\" collapse=\"isCollapsed(category)\">\n            <div class=\"col-xs-12\">\n              <div class=\"row widget-line\" ng-repeat=\"account in widget.content.summary[category].accounts\" >\n                <div class=\"col-sm-6 col-xs-12 text-left\">\n                  {{account.name | titleize}}\n                </div>\n                <div class=\"col-sm-3 col-xs-6 text-right\">\n                  {{account.totals[0] | mnoCurrency : account.currency}}\n                </div>\n                <div class=\"col-sm-3 col-xs-6 text-right\">\n                  {{account.totals[1] | mnoCurrency : account.currency}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-cash-summary.tmpl.html","<div widget-accounts-cash-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n        <!-- Tab header -->\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-5 col-xs-offset-1\">Cash flow</div>\n            <div class=\"col-xs-3 text-right\">{{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}}</div>\n            <div class=\"col-xs-3 text-right\">vs {{getPrevDate() | mnoDate : widget.metadata.hist_parameters.period}}</div>\n          </div>\n\n          <!-- Groups of statements with their accounts -->\n          <div class=\"row lines-group\" ng-repeat=\"statement in widget.content.summary\" ng-class=\"{cash: statement.name.indexOf(\'cash\')>0}\" >\n            <div class=\"col-xs-12\">\n            \n              <!-- Statements lines -->\n              <div class=\"row widget-line\" ng-class=\"{selected: isSelected(statement)}\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(statement)\">\n                  <i ng-show=\"(statement.accounts && statement.accounts.length)\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\"/>\n                </div>\n                <div class=\"col-xs-5\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getName(statement) | titleize}}</strong>\n                </div>\n                <div class=\"col-xs-3 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getLastValue(statement) | mnoCurrency : statement.currency : false}}</strong>\n                </div>\n                <div class=\"col-xs-3 text-right\" ng-click=\"toggleSelectedElement(statement)\" ng-class=\"getVarianceClassColor(getLastVariance(statement))\">\n                  <strong>{{getLastVariance(statement)}}</strong>\n                </div>\n              </div>\n\n              <!-- Accounts lines -->\n              <div class=\"row\" collapse=\"isCollapsed(statement)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(account)\" ng-repeat=\"account in statement.accounts\" ng-class=\"{selected: isSelected(account)}\" >\n                    <div class=\"col-xs-5 col-xs-offset-1\">\n                      {{account.name}}\n                    </div>\n                    <div class=\"col-xs-3 text-right\">\n                      {{getLastValue(account) | mnoCurrency : account.currency : false }}\n                    </div>\n                    <div class=\"col-xs-3 text-right\" ng-class=\"getVarianceClassColor(getLastVariance(account))\">\n                      {{getLastVariance(account)}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n          \n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"selectedElement\">\n          <h4>{{getName(selectedElement) | titleize}}</h4>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div class=\"legend\">{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Cash Flow</div>\n          </div>\n\n          <div class=\"widget-lines-container\">\n\n            <!-- Not mobile -->\n            <div class=\"row\">\n              <span ng-repeat=\"date in dates track by $index\" class=\"hidden-xs\">\n                <!-- Separator every 4 items -->\n                <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n                <div class=\"col-sm-3 text-center\">\n                  <!-- Date -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{date | mnoDate : widget.metadata.hist_parameters.period}}\n                    </div>\n                  </div>\n                  <!-- Amount + currency -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{selectedElement.cash_flows[$index] | mnoCurrency : selectedElement.currency }}\n                    </div>\n                  </div>\n                  <!-- Variance -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\" ng-class=\"getVarianceClassColor(selectedElement.variances[$index])\">\n                      {{formatVariance(selectedElement.variances[$index])}}\n                    </div>\n                  </div>\n                </div>\n              </span>\n            </div>\n\n            <!-- Mobile -->\n            <div ng-repeat=\"date in dates track by $index\" class=\"row widget-line visible-xs\">\n              <!-- Date -->\n              <div class=\"col-xs-4\">\n                {{date | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n              <!-- Amount + currency -->\n              <div class=\"col-xs-4 text-right\">\n                {{selectedElement.cash_flows[$index] | mnoCurrency : selectedElement.currency }}\n              </div>\n              <!-- Variance -->\n              <div class=\"col-xs-4 text-right\" ng-class=\"getVarianceClassColor(selectedElement.variances[$index])\">\n                {{formatVariance(selectedElement.variances[$index])}}\n              </div>\n            </div>\n            \n          </div>\n        </div>\n\n        <div ng-hide=\"selectedElement\" class=\"no-element\">\n          Select an account or an account type to display the corresponding cash evolution.\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-class-comparison.tmpl.html","<div widget-accounts-class-comparison>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\">\n      <!-- account classification selectors -->\n      <div setting-param-selector parent-widget=\"widget\" param=\"classification\" options=\"classifications\" selected=\"selectedClassification\" class=\"row param-selector\" deferred=\"::paramSelectorDeferred\" on-select=\"widget.format()\" no-reload/>\n      <!---->\n      <div class=\"row\">\n        <div class=\"col-md-12 chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-12 widget-lines-container\">\n          <div class=\"row\" ng-repeat=\"entity in widget.content.companies track by $index\">\n            <div class=\"col-xs-6 text-left\">\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getAccountColor(entity)}}\" />\n              {{entity}}\n            </div>\n            <div class=\"col-xs-6 text-right\">\n              <i>{{getAmount($index)}}</i>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    \n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-comparison.tmpl.html","<div widget-accounts-comparison>\n  <div setting-accounts-list parent-widget=\"widget\" deferred=\"::accountsListDeferred\"/>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\">\n      <!-- multi-companies mode -->\n      <div ng-show=\"widget.metadata.organization_ids.length > 1 && canSelectComparisonMode || isComparisonMode()\">\n        <div setting-params-checkboxes options=\"comparisonModeOptions\" param=\"comparison_mode\" parent-widget=\"widget\" deferred=\"::paramsCheckboxesDeferred\"/>\n      </div>\n      <!-- end -->\n      <div ng-hide=\"hasAccountsSelected() || noComparableAccounts\" class=\"row\">\n        <div class=\"col-xs-12\">\n          <h5>Select the accounts you wish to compare.</h5>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"input-group\">\n            <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in widget.remainingAccounts\" class=\"form-control\" ng-show=\"widget.hasEditAbility\" ng-change=\"addAccount(movedAccount)\"></select>\n          </div>\n        </div>\n      </div>\n      <!-- error: when there are no comparable accounts matched -->\n      <div ng-show=\"isComparisonMode() && noComparableAccounts\" class=\"row comparable-error\">\n        <div class=\"col-xs-12\"><h5>No comparable accounts found.</h5></div>\n      </div>\n\n      <div class=\"row\" ng-show=\"hasAccountsSelected()\">\n        <div class=\"col-xs-12 chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n      </div>\n\n      <div class=\"row\" ng-show=\"hasAccountsSelected()\">\n        <div class=\"col-xs-12 widget-lines-container\">\n\n          <div class=\"row\" ng-class=\"{\'lines-group\': isComparisonMode(), \'widget-line\': !isComparisonMode()}\" ng-repeat=\"account in widget.selectedAccounts track by $index\">\n            \n            <!-- Comparison between several conpanies -->\n            <div class=\"col-xs-12\" ng-if=\"isComparisonMode()\">\n              <div class=\"row widget-line\" ng-repeat=\"groupedAccount in account.accounts track by $index\">\n                <div class=\"col-xs-1\">\n                  <i class=\"fa fa-circle\" style=\"color: {{getAccountColor(groupedAccount)}}\" />\n                </div>\n                <div class=\"col-xs-6\">\n                  {{groupedAccount.name}}\n                </div>\n                <div class=\"col-xs-4 text-right\">\n                  <i>{{formatAmount(groupedAccount)}}</i>\n                </div>\n                <div class=\"col-xs-1 text-right\">\n                  <button class=\"close\" ng-click=\"removeAccount(account)\" ng-show=\"widget.hasDeleteAbility\">x</button>\n                </div>\n              </div>\n            </div>\n\n            <!-- Simple comparison between accounts -->\n            <div ng-if=\"!isComparisonMode()\" class=\"col-xs-1\">\n              <i class=\"fa fa-circle\" style=\"color: {{getAccountColor(account)}}\" />\n            </div>\n            <div ng-if=\"!isComparisonMode()\" class=\"col-xs-6\">\n              {{account.name}}\n            </div>\n            <div ng-if=\"!isComparisonMode()\" class=\"col-xs-4 text-right\">\n              <i>{{formatAmount(account)}}</i>\n            </div>\n            <div ng-if=\"!isComparisonMode()\" class=\"col-xs-1 text-right\">\n              <button class=\"close\" ng-click=\"removeAccount(account)\" ng-show=\"widget.hasDeleteAbility\">x</button>\n            </div>\n\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\" ng-show=\"hasAccountsSelected()\">\n        <div class=\"col-xs-12 input-group add-account\">\n          <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in widget.remainingAccounts track by account.uid\" class=\"form-control\" ng-show=\"widget.hasDeleteAbility\" ng-change=\"addAccount(movedAccount)\" ng-disabled=\"widget.selectedAccounts.length >= 15 || widget.remainingAccounts.length == 0 || isComparisonMode()\">\n            <option value=\"\" disabled selected>+ ADD ACCOUNT</option>\n          </select>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-custom-calculation.tmpl.html","<div widget-accounts-custom-calculation>\n\n  <div setting-organizations parent-widget=\"widget\" ng-hide=\"true\" deferred=\"::orgDeferred\" />\n  <div setting-accounts-list parent-widget=\"widget\" deferred=\"::accountsListDeferred\" />\n  <div setting-formula parent-widget=\"widget\" deferred=\"::formulaDeferred\" />\n\n  <h3 ng-show=\"widget.hasEditAbility && !widget.isFormulaCorrect\">\n    <a href=\"\" ng-click=\"formulaModal.open()\">Create a custom calculation</a>\n  </h3>\n  \n  <div class=\"price\" ng-show=\"widget.isFormulaCorrect\">\n    {{widget.evaluatedFormula}}\n  </div>\n  <div class=\"legend\" ng-show=\"widget.isFormulaCorrect\">\n    {{widget.legend}}\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-custom-calculation/formula.modal.html","<div class=\"analytics modal-custom-calculation\">\n  <div class=\"modal-header\">\n    <div class=\"close\" type=\"button\" ng-click=\"cancel()\" >×</div>\n    <h3>Custom Calculation</h3>\n  </div>\n\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <div class=\"alert alert-error\" ng-show=\"errors\">\n          <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n          <ul>\n            <li ng-repeat=\"error in errors\">{{error}}</li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"edit\">\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::modalOrgDeferred\" />\n    </div>\n\n    <p>Make a custom equation with your accounts, and save it as a widget. To create an equation, simply select your accounts in the list, and use the classical operators (example: ({1} + {2}) / {3})</p>\n\n    <div class=\'row\'>\n      <div ng-show=\"widget.isLoading\" class=\'col-md-6 loader\' align=\"center\">\n        <div>\n          <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n          <p>Your data is being retrieved...</p>\n        </div>\n      </div>\n\n      <div ng-hide=\"widget.isLoading\" class=\'col-md-6\'>\n        <div class=\'widget-line\' ng-repeat=\'account in widget.selectedAccounts track by $index\'>\n          <div class=\'row\'>\n            <div class=\'col-md-6\'>\n              {{$index+1}} - {{account.name}}\n            </div>\n            <div class=\'col-md-6\'>\n              {{account.current_balance | mnoCurrency : account.currency}}\n              <button class=\"close\" ng-click=\"removeAccountFromFormula(account)\" ng-show=\"widget.hasEditAbility\"><span class=\'fa fa-times-circle\'></span></button>\n            </div>\n          </div>\n        </div>\n\n        <div class=\'input-group\' ng-show=\"widget.hasEditAbility\">\n          <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + widget.formatAmount(account) + \')\' for account in widget.remainingAccounts\" class=\'form-control\' ng-change=\'addAccountToFormula(movedAccount)\'><select>\n        </div>\n      </div>\n      \n      <div ng-hide=\"widget.isLoading\" class=\'col-md-6\'>\n        <p>Type your formula just below:</p>\n        <input class=\'form-control\' ng-model=\"widget.formula\">\n\n        <p>Result: {{widget.evaluatedFormula}}</p>\n        <p>Legend: {{widget.legend}}</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <button class=\"btn btn-gray\" ng-click=\"cancel()\" ng-hide=\"widget.isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"proceed()\" ng-hide=\"widget.isLoading\" ng-disabled=\'!widget.isFormulaCorrect || widget.isLoading\'>\n          <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n          Save\n        </button>\n      </div>\n      \n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-detailed-classifications.tmpl.html","<div widget-accounts-detailed-classifications>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\" class=\"widget-lines-container\">\n\n      <!-- Tab header -->\n      <div ng-hide=\"multiEntity\" class=\"row widget-line header\">\n        <div class=\"col-md-11 col-md-offset-1 text-left\">\n          {{widget.content.companies[0].name}} - Accounts classifications\n        </div>\n      </div>\n\n      <!-- Groups of statements with their accounts -->\n      <div class=\"row lines-group\" ng-repeat=\"source in dataSource track by source.label\">\n        <div class=\"col-xs-12\">\n        \n          <!-- Statements lines -->\n          <div class=\"row widget-line\">\n            <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(source.label)\" style=\"cursor: pointer;\">\n              <i class=\"fa\" ng-class=\"isCollapsed(source.label) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n            </div>\n            <div class=\"col-xs-5 text-left\">\n              <strong>{{source.label | titleize}}</strong>\n            </div>\n            <div class=\"col-xs-6 text-right\">\n              <strong>{{source.value | mnoCurrency : source.currency}}</strong>\n            </div>\n          </div>\n\n          <!-- Accounts lines -->\n          <div class=\"row\" collapse=\"isCollapsed(source.label)\">\n            <div class=\"col-xs-12\">\n              <div class=\"row widget-line\" ng-repeat=\"entry in source.entries\" >\n                <div class=\"col-xs-5 col-xs-offset-1 text-left\">\n                  {{entry.label | titleize}}\n                </div>\n                <div class=\"col-xs-6 text-right\">\n                  {{entry.value | mnoCurrency : entry.currency}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n</div>\n\n");
$templateCache.put("widgets/accounts-expense-weight.tmpl.html","<div widget-accounts-expense-weight>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-account parent-widget=\"widget\" class=\"part\" deferred=\"::accountBackDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\">\n      <!-- Will be hidden once an account is selected -->\n      <div setting-account ng-hide=\"widget.selectedAccount\" parent-widget=\"widget\" label=\'Select an expense account\' on-account-selected=\"updateSettings()\" deferred=\"::accountFrontDeferred\" />\n\n      <!-- The chart will remain hidden until an account is selected -->\n      <div class=\"chart-container\" ng-show=\"widget.selectedAccount\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">\n          <div class=\"title\">\n            {{getName()}} to {{getComparator() | titleize}}\n            <span ng-if=\"widget.metadata.organization_ids.length==1\"><br /><strong>{{widget.content.summary[0].ratio | mnoCurrency : \'%\'}}</strong></span>\n          </div>\n          <span ng-repeat=\"sum in widget.content.summary\" ng-if=\"widget.metadata.organization_ids.length>1\">\n            <span style=\"font-weight: bold;\">{{sum.company}}: {{sum.ratio | mnoCurrency : \'%\'}}</span>\n            <br />\n          </span>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-expenses-revenue.tmpl.html","<div widget-accounts-expenses-revenue>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" on-toggle=\"widget.format()\" />\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        \n        <div class=\"legend\" ng-if=\"widget.isHistoryMode\">\n          <span ng-hide=\"isNetProfitDisplayed\">\n            <span class=\"negative2\">Expenses</span> -\n            <span class=\"positive2\">Revenue</span>\n          </span>\n          <span ng-show=\"isNetProfitDisplayed\">\n            <strong>Net Profit</strong>\n          </span>\n        </div>\n\n        <div ng-show=\"widget.isHistoryMode\" setting-params-checkboxes options=\"displayOptions\" param=\"display\" parent-widget=\"widget\" deferred=\"::paramsCheckboxesDeferred\"/>\n\n        <div class=\"legend\" ng-if=\"!widget.isHistoryMode\">\n          <span class=\"negative2\">Expenses: {{getCurrentExpenses() | mnoCurrency : getCurrency()}}</span>\n          </br>\n          <span class=\"positive2\">Revenue: {{getCurrentRevenue() | mnoCurrency : getCurrency()}}</span>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-payable-receivable.tmpl.html","<div widget-accounts-payable-receivable>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\">\n        <div class=\"receivable\">\n          <h3>Accounts Receivable</h3>\n          <div class=\"price positive2\">\n             {{getCurrentReceivable() | mnoCurrency : getCurrency() : false}}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n\n        <div class=\"payable\">\n          <h3>Accounts Payable</h3>\n          <div class=\"price negative2\">\n            {{getCurrentPayable() | mnoCurrency : getCurrency() : false}}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n      </div>\n\n      <div class=\"chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n        <div impac-chart draw-trigger=\"drawTrigger.promise\" deferred=\"chartDeferred\"></div>\n        <div class=\"legend\">\n          <span class=\"negative2\">Payable</span> -\n          <span class=\"positive2\">Receivable</span>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-profit-and-loss.tmpl.html","<div widget-accounts-profit-and-loss>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n          <!-- Tab header -->\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-4 col-xs-offset-8 text-right\">\n              <span setting-param-selector parent-widget=\"widget\" param=\"amount_displayed\" options=\"amountDisplayedOptions\" selected=\"amountDisplayed\" deferred=\"::paramSelectorDeferred\" no-reload />\n              <!-- {{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}} -->\n            </div>\n          </div>\n\n          <!-- Groups of statements with their accounts -->\n          <div class=\"row lines-group\" ng-repeat=\"statement in widget.content.summary\" ng-class=\"{profit: statement.name.indexOf(\'profit\')>0}\">\n            <div class=\"col-xs-12\">\n\n              <!-- Statements lines -->\n              <div class=\"row widget-line\" ng-class=\"{selected: isSelected(statement)}\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(statement)\">\n                  <i ng-show=\"(statement.accounts && statement.accounts.length)\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-7\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getName(statement) | titleize}}</strong>\n                </div>\n                <div class=\"col-xs-4 text-right\" ng-class=\"getClassColor(getAmount(statement))\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getAmount(statement) | mnoCurrency : statement.currency}}</strong>\n                </div>\n              </div>\n\n              <!-- Accounts lines -->\n              <div class=\"row\" collapse=\"isCollapsed(statement)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(account)\" ng-repeat=\"account in statement.accounts\" ng-class=\"{selected: isSelected(account)}\" >\n                    <div class=\"col-xs-7 col-xs-offset-1\">\n                      {{account.name}}\n                    </div>\n                    <div class=\"col-xs-4 text-right\" ng-class=\"getClassColor(getAmount(account))\">\n                      {{getAmount(account) | mnoCurrency : account.currency}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"hasElements()\">\n          <h4>{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Profit and Loss</h4>\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            \n            <!-- Not mobile -->\n            <div class=\"row\">\n              <span ng-repeat=\"date in dates track by $index\" class=\"hidden-xs\">\n                <!-- Separator every 4 items -->\n                <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n                <div class=\"col-sm-3 text-center\">\n                  <!-- Date -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{date | mnoDate : widget.metadata.hist_parameters.period}}\n                    </div>\n                  </div>\n                  <!-- Amount + currency -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                      {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n                    </div>\n                  </div>\n                </div>\n              </span>\n            </div>\n\n            <!-- Mobile -->\n            <div ng-repeat=\"date in dates track by $index\" class=\"row widget-line visible-xs\">\n              <!-- Date -->\n              <div class=\"col-xs-6\">\n                {{date | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n              <!-- Amount + currency -->\n              <div class=\"col-xs-6 text-right\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div class=\"row widget-line\" ng-repeat=\"element in selectedElements\">\n              <div class=\"col-xs-7 text-left\">\n                <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n                {{getName(element) | titleize}}\n              </div>\n              <div class=\"col-xs-5 text-right\">\n                <i ng-class=\"getClassColor(getAmount(element))\">\n                  {{getAmount(element) | mnoCurrency : element.currency}}\n                </i>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\">\n          Select one or several account(s) or account(s) type(s) to display the corresponding PnL.\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found on-display-alerts=\"onDisplayAlerts()\" widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-employee-details.tmpl.html","<div widget-hr-employee-details>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n        <div setting-param-selector parent-widget=\"widget\" param=\"employee_uid\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"row title\" deferred=\"::paramSelectorDeferred1\" />\n\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Job Title</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().job_title || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Company</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().company || getSingleCompanyName()}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Phone</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().phone || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Email</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().email || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Date of birth</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().dob || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Gender</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().gender || \"-\" }}</pre></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <div class=\"legend\">Salary calculation period: <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred2\" /></div>\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Salary</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().salary || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Address</label></div>\n            <div class=\"col-md-8\"><pre>{{formatAddress(getEmployee().address) || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Job location</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().location || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Supervisor</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().supervisor || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Status</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().employment_status || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Note</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().note || \"-\" }}</pre></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-employees-list.tmpl.html","<div widget-hr-employees-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" >\n\n      <div class=\"legend\">\n        <strong>{{widget.content.total.employees}}</strong> employee{{widget.content.total.employees > 1 ? \"s\" : null}} - Average salary rate (<span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred\"/>): <strong>{{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}</strong>\n      </div>\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-2\">Company</div>\n          <div class=\"col-sm-3\">Employee</div>\n          <div class=\"col-sm-2\">Title</div>\n          <div class=\"col-sm-3\">Phone</div>\n          <div class=\"col-sm-2\">Salary</div>\n        </div>\n        <div class=\"row widget-line\" ng-repeat=\"employee in widget.content.employees\" >\n          <div class=\"col-sm-2\">{{employee.company || getSingleCompanyName()}}</div>\n          <div class=\"col-sm-3\">{{employee.lastname}} {{employee.firstname}}</div>\n          <div class=\"col-sm-2\"><i>{{employee.job_title}}</i></div>\n          <div class=\"col-sm-3\">{{employee.phone}}</div>\n          <div class=\"col-sm-2\"><i>{{getEmployeeSalary(employee)}}</i></div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-leaves-balance.tmpl.html","<div widget-hr-leaves-balance>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\"/>\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" >\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"employee-name\" deferred=\"::paramSelectorDeferred\" />\n\n      <h3>{{getEmployee().leaves[0].name || \'Vacation leaves\'}} balance</h3>\n      <div class=\"balance\">{{(getEmployee().leaves[0].units || 0) | mnoCurrency : (getEmployee().leaves[0].type_of_units || \'h\')}}</div>\n\n      <h3>{{getEmployee().leaves[1].name || \'Sick leaves\'}} balance</h3>\n      <div class=\"balance\">{{(getEmployee().leaves[1].units || 0) | mnoCurrency : (getEmployee().leaves[1].type_of_units || \'h\')}}</div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-leaves-schedule.tmpl.html","<div widget-hr-leaves-schedule>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\">\n\n      <div widget-component-calendar ng-model=\"eventSources\"></div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-payroll-summary.tmpl.html","<div widget-hr-payroll-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n      \n          <!-- Tab header -->\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-11 col-xs-offset-1\">Payroll Summary - {{widget.metadata.hist_parameters.period}}</div>\n          </div>\n\n          <!-- Groups of statements with their accounts -->\n          <div class=\"row lines-group\" ng-repeat=\"statement in widget.content.summary\" >\n            <div class=\"col-xs-12\">\n\n              <!-- Statements lines -->\n              <div class=\"row widget-line\" ng-class=\"{selected: isSelected(statement)}\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(statement)\">\n                  <i ng-show=\"(statement.employees && statement.employees.length)\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-7\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getName(statement) | titleize}}</strong>\n                </div>\n                <div class=\"col-xs-4 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong>\n                </div>\n              </div>\n\n              <!-- Accounts lines -->\n              <div class=\"row\" collapse=\"isCollapsed(statement)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(employee)\" ng-repeat=\"employee in statement.employees\" ng-class=\"{selected: isSelected(account)}\" >\n                    <div class=\"col-xs-7 col-xs-offset-1\">\n                      {{employee.name}}\n                    </div>\n                    <div class=\"col-xs-4 text-right\">\n                      {{getLastValue(employee) | mnoCurrency : employee.currency}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n            \n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"hasElements()\">\n\n          <h4>{{(widget.content.hist_parameters.period || \"Monthly\") | titleize}} Payroll Summary</h4>\n          <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" on-toggle=\"widget.format()\"/>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div ng-show=\"getTrackedField()\" class=\"row widget-line header\">\n              <div class=\"col-xs-12\">{{getTrackedField()}}</div>\n            </div>\n\n            <!-- Not mobile -->\n            <div class=\"row\">\n              <span ng-repeat=\"date in widget.content.dates track by $index\" class=\"hidden-xs\">\n                <!-- Separator every 4 items -->\n                <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n                <div class=\"col-sm-3 text-center\">\n                  <!-- Date -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{formatDate(date)}}\n                    </div>\n                  </div>\n                  <!-- Amount + currency -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                      {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency }}\n                    </div>\n                  </div>\n                </div>\n              </span>\n            </div>\n\n            <!-- Mobile -->\n            <div ng-repeat=\"date in widget.content.dates track by $index\" class=\"row widget-line visible-xs\">\n              <!-- Date -->\n              <div class=\"col-xs-6\">\n                {{formatDate(date)}}\n              </div>\n              <!-- Amount + currency -->\n              <div class=\"col-xs-6 text-right\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div class=\"row widget-line header\">\n              <div class=\"col-md-12\">\n                <span ng-if=\"getTrackedField()\">\n                  {{getTrackedField()}} - \n                </span>\n                <span ng-if=\"widget.isHistoryMode\">\n                  From {{widget.content.dates[0] | date : \"MMM-d\"}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \"MMM-d\"}}\n                </span>\n                <span ng-if=\"!widget.isHistoryMode\">\n                  {{getPeriod()}}\n                </span>\n              </div>\n            </div>\n\n            <div class=\"row widget-line\" ng-repeat=\"element in selectedElements\">\n              <div class=\"col-xs-7\">\n                <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n                {{getName(element) | titleize}}\n              </div>\n              <div class=\"col-xs-5 text-right\">\n                <span ng-if=\"widget.isHistoryMode\">{{getTotalSum(element) | mnoCurrency : element.currency}}</span>\n                <span ng-if=\"!widget.isHistoryMode\">{{getLastValue(element) | mnoCurrency : element.currency}}</span>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\">\n          Select one or several employee(s) or category(ies) to display the corresponding summary.\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-payroll-taxes.tmpl.html","<div widget-hr-payroll-taxes>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">{{getCurrentPrice() | mnoCurrency : getCurrency() : false}}</div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n        <div class=\"legend\">Taxes upon workforce costs<br />{{getPeriod()}}</div>\n      </div>\n\n      <div class=\"history chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">Taxes upon workforce costs</div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-salaries-summary.tmpl.html","<div widget-hr-salaries-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <h3 class=\"left\">Average Salary Rate</h3>\n        <div class=\"price\">\n           {{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}\n        </div>\n        <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred1\"/>\n        <div class=\"legend\">\n          <span>({{widget.content.total.employees}} employee{{widget.content.total.employees > 1 ? \"s\" : null}} with known salary)</span>\n        </div>\n      </div>\n\n      <div class=\"right-panel\" ng-class=\"{\'col-md-12 invisible\': !widget.isExpanded(), \'col-md-6\': widget.isExpanded()}\">\n        <h3 class=\"right\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/></h3>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n            <div class=\"col-xs-2\">\n              <i ng-hide=\"widget.content.summary.filter==\'age_range\'\" class=\"fa fa-circle\" style=\"color: {{getColorByIndex($index)}}\" />\n            </div>\n            <div class=\"col-xs-5\">\n              {{data.label}}\n            </div>\n            <div class=\"col-xs-5 text-right\">\n              <i>{{data.value | mnoCurrency : widget.content.total.currency}} (av.)</i>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-superannuation-accruals.tmpl.html","<div widget-hr-superannuation-accruals>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" deferred=\"::paramSelectorDeferred\" />\n\n      <h3>Superannuation Balance</h3>\n      <div class=\"price\">{{(getEmployee().total_super || 0) | mnoCurrency : getEmployee().currency}}</div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-timesheets.tmpl.html","<div widget-hr-timesheets>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\">\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" deferred=\"::paramSelectorDeferred\" />\n\n      <div class=\"widget-lines-container\">\n\n        <!-- Tab header -->\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-12\">\n            From {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} to {{widget.content.dates[widget.content.dates.length - 1] | mnoDate : widget.metadata.hist_parameters.period}}\n          </div>\n        </div>\n\n        <!-- Time worked activities -->\n        <div class=\"row lines-group\" >\n          <div class=\"col-xs-12\">\n          \n            <!-- Time worked -->\n            <div class=\"row widget-line\" >\n              <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(\'total_time_worked\')\" style=\"cursor: pointer;\">\n                <i class=\"fa\" ng-class=\"isCollapsed(\'total_time_worked\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n              </div>\n              <div class=\"col-xs-7\">\n                <strong>Total Time Worked</strong>\n              </div>\n              <div class=\"col-xs-4 text-right\">\n                <strong>{{getEmployeeTimeWorked()}} h</strong>\n              </div>\n            </div>\n          \n            <!-- Activities lines / TODO -->\n            <div class=\"row\" collapse=\"isCollapsed(\'total_time_worked\')\">\n              <div class=\"col-xs-12\">\n                <div class=\"row widget-line\">\n                  <div class=\"col-xs-11 col-xs-offset-1\">\n                    <i>Activities detail not found</i>\n                  </div>\n                </div>\n              </div>\n            </div>\n          \n          </div>\n        </div>\n\n        <!-- Time off activities -->\n        <div class=\"row lines-group\" >\n          <div class=\"col-xs-12\">\n          \n            <!-- Time off -->\n            <div class=\"row widget-line\" >\n              <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(\'total_time_of\')\" style=\"cursor: pointer;\">\n                <i class=\"fa\" ng-class=\"isCollapsed(\'total_time_of\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n              </div>\n              <div class=\"col-xs-7\">\n                <strong>Total Time Off</strong>\n              </div>\n              <div class=\"col-xs-4 text-right\">\n                <strong>{{getEmployeeTimeOff()}} h</strong>\n              </div>\n            </div>\n\n\n            <!-- PTO and Vacation lines / TODO -->\n            <div class=\"row\" collapse=\"isCollapsed(\'total_time_of\')\">\n              <div class=\"col-xs-12\">\n                <div class=\"row widget-line\">\n                  <div class=\"col-xs-7 col-xs-offset-1\">PTO</div>\n                  <div class=\"col-xs-4 text-right\">0 h</div>\n                </div>\n                <div class=\"row widget-line\">\n                  <div class=\"col-xs-7 col-xs-offset-1\">Vacation</div>\n                  <div class=\"col-xs-4 text-right\">0 h</div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-workforce-summary.tmpl.html","<div widget-hr-workforce-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <h3 class=\"left\">Total Workforce</h3>\n        <div class=\"price\">\n           {{getTotalWorkforce() | mnoCurrency : getCurrency()}}\n        </div>\n        <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred1\"/>\n        <div class=\"legend\">\n          <span>({{getNumberOfEmployees()}} employee{{getNumberOfEmployees() > 1 ? \'s\' : null}} with known salary)</span>\n        </div>\n      </div>\n\n      <div class=\"right-panel\" ng-class=\"{\'col-md-12 invisible\': !widget.isExpanded(), \'col-md-6\': widget.isExpanded()}\">\n        <h3 class=\"right\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/></h3>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n            <div class=\"col-xs-2\">\n              <i class=\"fa fa-circle\" style=\"color: {{getColorByIndex($index)}}\" />\n            </div>\n            <div class=\"col-xs-7\">\n              {{widget.content.summary.filter == \"salary_range\" ? formatSalaryRange(data) : data.label}}\n            </div>\n            <div class=\"col-xs-3 text-right\">\n              <i>{{((data.value / widget.content.total.amount)*100).toFixed()}}%</i>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/invoices-aged-payables-receivables.tmpl.html","<div widget-invoices-aged-payables-receivables>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-8\">Aged Payables & Receivables</div>\n            <div class=\"col-xs-4 text-right\">Total</div>\n          </div>\n\n          <!-- Payables -->\n          <div class=\"row lines-group\">\n            <div class=\"col-xs-12\">\n\n              <div class=\"row widget-line\" ng-class=\"{selected: isSelected(widget.content.payables)}\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(widget.content.payables)\">\n                  <i ng-show=\"(widget.content.payables.suppliers && widget.content.payables.suppliers.length)\" class=\"fa\" ng-class=\"isCollapsed(widget.content.payables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-7\" ng-click=\"toggleSelectedElement(widget.content.payables)\">\n                  <strong>Aged Payables</strong>\n                </div>\n                <div class=\"col-xs-4 text-right\" ng-click=\"toggleSelectedElement(widget.content.payables)\">\n                  <strong>{{getTotalSum(widget.content.payables) | mnoCurrency : widget.content.payables.currency}}</strong>\n                </div>\n              </div>\n\n              <div class=\"row\" ng-hide=\"isCollapsed(widget.content.payables)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(supplier)\" ng-repeat=\"supplier in widget.content.payables.suppliers\" ng-class=\"isSelected(supplier) ? \'selected\' : null\" >\n                    <div class=\"col-xs-7 col-xs-offset-1\">\n                      {{supplier.name}}\n                    </div>\n                    <div class=\"col-xs-4 text-right\">\n                      {{getTotalSum(supplier) | mnoCurrency : supplier.currency}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n            \n            </div>\n          </div>\n\n          <!-- Receivables -->\n          <div class=\"row lines-group\">\n            <div class=\"col-xs-12\">\n\n              <div class=\"row widget-line\" ng-class=\"{selected: isSelected(widget.content.receivables)}\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(widget.content.receivables)\">\n                  <i ng-show=\"(widget.content.receivables.customers && widget.content.receivables.customers.length)\" class=\"fa\" ng-class=\"isCollapsed(widget.content.receivables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-7\" ng-click=\"toggleSelectedElement(widget.content.receivables)\">\n                  <strong>Aged Receivables</strong>\n                </div>\n                <div class=\"col-xs-4 text-right\" ng-click=\"toggleSelectedElement(widget.content.receivables)\">\n                  <strong>{{getTotalSum(widget.content.receivables) | mnoCurrency : widget.content.receivables.currency}}</strong>\n                </div>\n              </div>\n\n              <div class=\"row\" ng-hide=\"isCollapsed(widget.content.receivables)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(customer)\" ng-repeat=\"customer in widget.content.receivables.customers\" ng-class=\"isSelected(customer) ? \'selected\' : null\" >\n                    <div class=\"col-xs-7 col-xs-offset-1\">\n                      {{customer.name}}\n                    </div>\n                    <div class=\"col-xs-4 text-right\">\n                      <span>{{getTotalSum(customer) | mnoCurrency : customer.currency}}</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n\n\n      <div class=\"right-panel text-center\" ng-class=\"{\'col-md-6\': widget.isExpanded(), \'col-md-12 invisible\': !widget.isExpanded()}\">\n\n        <div ng-show=\"hasElements()\">\n\n          <h4>{{(widget.content.hist_parameters.period || \"Monthly\") | titleize}} Aged Payables and Receivables</h4>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <!-- Not mobile -->\n            <div class=\"row\">\n              <span ng-repeat=\"date in widget.content.dates track by $index\" class=\"hidden-xs\">\n                <!-- Separator every 4 items -->\n                <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n                <div class=\"col-sm-3 text-center\">\n                  <!-- Date -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{date | mnoDate : widget.metadata.hist_parameters.period}}\n                    </div>\n                  </div>\n                  <!-- Amount + currency -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                      {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n                    </div>\n                  </div>\n                </div>\n              </span>\n            </div>\n\n            <!-- Mobile -->\n            <div ng-repeat=\"date in widget.content.dates track by $index\" class=\"row widget-line visible-xs\">\n              <!-- Date -->\n              <div class=\"col-xs-6\">\n                {{date | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n              <!-- Amount + currency -->\n              <div class=\"col-xs-6 text-right\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n              </div>\n            </div>\n\n            <div class=\"row astericks-info\">\n              <div class=\"col-xs-12\">\n                <p><i>* Your opening-balance of receivables and/or payables for this period.</i></p>\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div class=\"row widget-line header\">\n              <div class=\"col-xs-4 col-xs-offset-8 text-right\">Totals</div>\n            </div>\n\n            <div class=\"row widget-line\" ng-repeat=\"element in selectedElements\">\n              <div class=\"col-xs-2\">\n                <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              </div>\n              <div class=\"col-xs-6\">\n                {{getName(element) | titleize}}\n              </div>\n              <div class=\"col-xs-4 text-right\">\n                <i>{{getTotalSum(element) | mnoCurrency : element.currency}}</i>\n              </div>\n            </div>\n\n            <div class=\"row astericks-info\">\n              <div class=\"col-xs-12\">\n                <p><i>* Your opening-balance of receivables and/or payables for this period.</i></p>\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\">\n          Select one or several account(s) or category(ies) to display the payables/receivables evolution(s).\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/invoices-list.accessible.tmpl.html","<div widget-invoices-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <table class=\"table widget-lines-container\" ng-hide=\"widget.isEditMode\">\n\n    <!-- Header line -->\n    <tr class=\"widget-line header\">\n      <td>{{entityTypeCap}}</td>\n      <td>Paid</td>\n      <td>Due</td>\n      <td>Invoiced</td>\n    </tr>\n\n    <!-- Data not found line -->\n    <tr class=\"widget-line\" ng-show=\"(isDataFound==false)\">\n      <td>No {{orderBy}}invoice found for your {{entityType}}</td>\n    </tr>\n    \n    <!-- Content lines -->\n    <tr class=\"widget-line\" ng-show=\"(isDataFound==true)\" ng-repeat=\"entity in widget.content.entities\">\n      <td>{{entity.name}}</td>\n      <td><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></td>\n      <td><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></td>\n      <td><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></td>\n    </tr>\n\n  </table>\n\n</div>\n");
$templateCache.put("widgets/invoices-list.tmpl.html","<div widget-invoices-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-dates-picker parent-widget=\"widget\" class=\"part\" from=\"(widget.metadata.hist_parameters.from || defaultFrom)\" to=\"(widget.metadata.hist_parameters.to || defaultTo)\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\"/>\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\" class=\"widget-lines-container\">\n\n    <div ng-show=\"(isDataFound==true)\" setting-limit-entries parent-widget=\"widget\" deferred=\"::limitEntriesDeferred\" selected=\"limitEntriesSelected\" max=\"widget.content.entities.length\" entries-label=\"limitEntriesLabel\" />\n\n\n    <!-- LARGE WIDGET -->\n\n    <!-- Header line -->\n    <div ng-if=\"widget.width > 3\" class=\"row widget-line header\">\n      <div class=\"col-sm-4\">{{entityTypeCap}}</div>\n      <div class=\"col-sm-7\">\n        <div class=\"row\">\n          <div class=\"col-xs-4\">Paid</div>\n          <div class=\"col-xs-4\">Due</div>\n          <div class=\"col-xs-4\">Invoiced</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Content lines -->\n    <div ng-if=\"widget.width > 3\" class=\"row widget-line\" ng-show=\"(isDataFound==true)\" ng-repeat=\"entity in widget.content.entities | limitTo:limitEntriesSelected\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getInvoices(entity)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n      <div class=\"col-sm-4\"><b>{{entity.name}}</b></div>\n      <div class=\"col-sm-7\">\n        <div class=\"row\">\n          <div class=\"col-xs-4\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n          <div class=\"col-xs-4\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n          <div class=\"col-xs-4\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n        </div>\n      </div>\n      <div class=\"col-sm-1 text-right\"><i class=\"fa fa-info-circle\" /></div>\n    </div>\n\n\n    <!-- SMALL WIDGET -->\n\n    <!-- Header line -->\n    <div ng-if=\"widget.width <= 3\" class=\"row widget-line header\">\n      <div class=\"col-xs-12\" ng-show=\"orderBy == \'paid \'\">{{entityTypeCap}} - Total paid</div>\n      <div class=\"col-xs-12\" ng-show=\"orderBy == \'due \'\">{{entityTypeCap}} - Total due</div>\n      <div class=\"col-xs-12\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\">{{entityTypeCap}} - Total invoiced</div>\n    </div>\n\n    <!-- Content lines -->\n    <div ng-if=\"widget.width <= 3\" class=\"row widget-line\" ng-show=\"(isDataFound==true)\" ng-repeat=\"entity in widget.content.entities | limitTo:limitEntriesSelected\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getInvoices(entity)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n      <div class=\"col-xs-12\"><b>{{entity.name}}</b></div>\n      <div class=\"col-xs-8\" ng-show=\"orderBy == \'paid \'\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-8\" ng-show=\"orderBy == \'due \'\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-8\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-4 text-right\"><i class=\"fa fa-info-circle\" /></div>\n    </div>\n\n\n    <!-- Data not found line -->\n    <div class=\"row widget-line\" ng-show=\"(isDataFound==false)\">\n      <div class=\"col-xs-12\">No {{orderBy}}invoice found for your {{entityType}}</div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("widgets/invoices-summary.tmpl.html","<div widget-invoices-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-dates-picker parent-widget=\"widget\" class=\"part\" from=\"(widget.metadata.hist_parameters.from || defaultFrom)\" to=\"widget.metadata.hist_parameters.to\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\"/>\n    <div setting-chart-filters parent-widget=\"widget\" class=\"part\" deferred=\"::chartFiltersDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\" class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <span>{{widget.content.legend}}</span>\n      </div>\n    </div>\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-aged.tmpl.html","<div widget-sales-aged>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"center\">\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload truncate-no=\"60\" on-select=\"widget.format()\" style=\"text-align: center;\" deferred=\"::paramSelectorDeferred\"/>\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n      <div class=\"legend\">From {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} to {{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}}</div>\n\n      <div class=\"widget-lines-container\">\n\n        <!-- Not mobile -->\n        <div class=\"row\">\n          <span ng-repeat=\"date in formattedDates track by $index\" class=\"hidden-xs\">\n            <!-- Separator every 4 items -->\n            <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n            <div class=\"col-sm-3 text-center\">\n              <!-- Date -->\n              <div class=\"row widget-line\">\n                <div class=\"col-xs-12\">\n                  {{date}}\n                </div>\n              </div>\n              <!-- Amount (+ currency) -->\n              <div class=\"row widget-line\">\n                <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-xs-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" >\n                  {{getTotal($index) | mnoCurrency : widget.content.currency}}\n                </div>\n                <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-xs-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" >\n                  {{getTotal($index)}}\n                </div>\n              </div>\n            </div>\n          </span>\n        </div>\n\n        <!-- Mobile -->\n        <div ng-repeat=\"date in formattedDates track by $index\" class=\"row widget-line visible-xs\">\n          <!-- Date -->\n          <div class=\"col-xs-6\">\n            {{date}}\n          </div>\n          <!-- Amount (+ currency) -->\n          <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-xs-6 text-right\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" >\n            {{getTotal($index) | mnoCurrency : widget.content.currency}}\n          </div>\n          <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-xs-6 text-right\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" >\n            {{getTotal($index)}}\n          </div>\n        </div>\n\n      </div>\n      \n    </div>\n    \n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-break-even.tmpl.html","<div widget-sales-break-even>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"align-center\">\n\n      <div class=\"legend\">From {{widget.content.period.from | date : \'d MMM yyyy\'}} to {{widget.content.period.to | date : \'d MMM yyyy\'}}</div>\n\n      <div class=\"block to-date\">\n        <div class=\"title\">Sales to Date</div>\n        <div class=\"price\">{{widget.content.sales.to_date | mnoCurrency : widget.content.currency : false}}</div>\n        Target: <span class=\"edit-target\" style=\"float: right;\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"updateSettings()\">\n          {{threshold | mnoCurrency : widget.content.currency : false}}\n        </span>\n      </div>\n\n      <div ng-show=\"widget.content.break_even\" class=\"block to-breakeven\">\n        <div class=\"title\">Projection to Break-Even</div>\n        <span ng-show=\"isTargetMet()\">Your sales already exceed your target by:</span>\n        <div class=\"price\">{{getVariance() | mnoCurrency : widget.content.currency : false}}</div>\n        <span ng-hide=\"isTargetMet()\">\n          Projected date: <span style=\"float: right;\">{{getProjectedDate() | date : \'d-MM-yy\'}}</span>\n          <br />\n          Opportunities to close: <span style=\"float: right;\">{{getOpportunitiesToClose()}}</span>\n        </span>\n      </div>\n      <div ng-show=\"widget.content.break_even\" class=\"legend\">{{widget.content.break_even.eligible_opportunities}} eligible opportunities</div>\n\n      <div ng-hide=\"widget.content.break_even\" class=\"block to-breakeven\">\n        <span class=\"edit-target\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"updateSettings()\">\n          <div class=\"define-text\">Click to define your sales target</div>\n        </span>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-comparison.tmpl.html","<div widget-sales-comparison>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"row legend center\">\n          Compare by: <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"criteria\" options=\"criteriaOptions\" selected=\"criteria\" truncate-no=\"30\" deferred=\"::paramSelectorDeferred1\" />\n           |\n          See: <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" truncate-no=\"30\" on-select=\"widget.format()\" no-reload deferred=\"::paramSelectorDeferred2\" />\n        </div>\n\n        <div class=\"widget-lines-container\">\n\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-12\">\n              Total sales from {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} to {{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}}\n            </div>\n          </div>\n        \n          <div class=\"row lines-group\" ng-repeat=\"statement in widget.content.sales_comparison\" >\n            <div class=\"col-xs-12\">\n\n              <div class=\"row widget-line\" ng-class=\"{selected: isSelected(statement)}\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(statement)\">\n                  <i ng-show=\"(statement.sales && statement.sales.length)\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-7\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{statement.name | titleize}}</strong>\n                </div>\n                <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-xs-4 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getTotalForPeriod(statement)}}</strong>\n                </div>\n                <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-xs-4 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getTotalForPeriod(statement) | mnoCurrency : statement.currency}}</strong>\n                </div>\n              </div>\n\n              <div class=\"row\" collapse=\"isCollapsed(statement)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(sale)\" ng-repeat=\"sale in statement.sales\" ng-class=\"{selected: isSelected(sale)}\" >\n                    <div class=\"col-xs-7 col-xs-offset-1\">\n                      {{sale.name}}\n                    </div>\n                    <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-xs-4 text-right\">\n                      {{getTotalForPeriod(sale)}}\n                    </div>\n                    <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-xs-4 text-right\">\n                      {{getTotalForPeriod(sale) | mnoCurrency : sale.currency}}\n                    </div>\n                  </div>\n                </div>\n              </div>\n          \n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"hasElements()\">\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div class=\"widget-lines-container\">\n\n            <div class=\"row widget-line header\">\n              <div class=\"col-xs-12\">\n                Total sales from {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} to {{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n            </div>\n\n            <div class=\"row widget-line\" ng-repeat=\"element in selectedElements\">\n              <div class=\"col-xs-1\">\n                <i class=\"fa fa-circle\" style=\"color: {{getElementChartColor($index)}}\" />\n              </div>\n              <div class=\"col-xs-7\">\n                {{element.name | titleize}}\n              </div>\n              <div class=\"col-xs-4 text-right\">\n                <i ng-show=\"filter.value == \'quantity_sold\'\">{{getTotalForPeriod(element)}}</i>\n                <i ng-hide=\"filter.value == \'quantity_sold\'\">{{getTotalForPeriod(element) | mnoCurrency : element.currency}}</i>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\">\n          Select one or several sales category(ies) to display the corresponding comparison.\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-customer-details.tmpl.html","<div widget-sales-customer-details>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n        <div setting-param-selector parent-widget=\"widget\" param=\"customer_uid\" options=\"customersOptions\" selected=\"selectedCustomer\" class=\"row title\" deferred=\"::paramSelectorDeferred\" />\n\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Email</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().email}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Phone</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().phone}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Website</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().website}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Contact</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().contact}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>City</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().city}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Country</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().country}}</pre></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <div class=\"details-container\">\n          <div class=\"row\" style=\"border-bottom: solid 1px #e6e6e6; margin-bottom: 10px; padding-bottom: 5px;\">\n            <div class=\"col-md-3\"><label>Address</label></div>\n            <div class=\"col-md-9\"><pre>{{formatAddress(getCustomer().full_address)}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12 center legend\">From {{getFromDate() | date : \'d MMM yyyy\'}} to {{getToDate() | date : \'d MMM yyyy\'}}:</div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total invoiced</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_invoiced | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total paid</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_paid | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total due</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_due | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-cycle.tmpl.html","<div widget-sales-cycle>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\" class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <span>Your sales cycle represents how much time your leads stay set to each status</span>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-forecast.tmpl.html","<div widget-sales-forecast>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" >\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n\n      <div class=\"widget-lines-container\">\n        \n        <div class=\"row widget-line header\">\n          <div class=\"col-xs-12\">Projection on the next 6 months</div>\n        </div>\n        \n        <div class=\"row lines-group\" ng-repeat=\"date in widget.content.dates.slice(6) track by $index\" ng-init=\"collapsed = true\" >\n          <div class=\"col-xs-12\">\n\n            <div class=\"row widget-line\" ng-class=\"{main: widget.content.opportunities.slice(6)[$index].length > 0}\" ng-click=\"collapsed = !collapsed\" >\n              <div class=\"col-xs-6\">\n                {{date | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n              <div class=\"col-xs-6 text-right\">\n                <strong>{{widget.content.totals.slice(6)[$index] | mnoCurrency : widget.content.currency}}</strong>\n              </div>\n            </div>\n          \n            <div class=\"row\" collapse=\"collapsed\">\n              <div class=\"col-xs-12\">\n                <div class=\"row widget-line\" ng-repeat=\"opp in widget.content.opportunities.slice(6)[$index]\" >\n                  <div class=\"col-xs-6\">\n                    {{opp.name}}\n                  </div>\n                  <div class=\"col-xs-6 text-right\">\n                    {{getOpportunityAmount(opp) | mnoCurrency : getOpportunityCurrency(opp)}}\n                  </div>\n                </div>\n              </div>\n            </div>\n          \n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-growth.tmpl.html","<div widget-sales-growth>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\">\n\n      <div class=\"selector\">\n        <div setting-param-selector parent-widget=\"widget\" param=\"product\" options=\"productOptions\" selected=\"product\" no-reload on-select=\"widget.format()\" deferred=\"::paramSelectorDeferred1\"/>\n        <div ng-show=\"product.value != -1\" setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/>\n      </div>\n\n      <div class=\"chart-container\" ng-class=\"{\'invisible\': product.value==-1}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n\n      <div ng-show=\"product.value != -1\" class=\"legend text-center\">{{getSelectedProduct().name}}</div>\n      <div class=\"price text-center\" ng-hide=\"isDataQuantity || product.value == -1\" tooltip=\"total for last period\">{{getCurrentValue() | mnoCurrency : getSelectedProduct().currency}}</div>\n      <div class=\"price text-center\" ng-show=\"isDataQuantity && product.value != -1\" tooltip=\"total for last period\">{{getCurrentValue()}}</div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-leads-funnel.tmpl.html","<div widget-sales-leads-funnel>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"legend\">Your leads sales funnel from {{widget.content.from | date : \'d MMM yyyy\'}} to {{widget.content.to | date : \'d MMM yyyy\'}}</div>\n\n        <div class=\"funnel-container\">\n          <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toggleSelectStatus(elem.status)\">\n            <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n            <div class=\"main-text\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedStatus\" class=\"currency\">\n          Select a status to display a list of the corresponding leads\n        </div>\n\n        <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n\n          <div class=\"row lines-group widget-line\" ng-repeat=\"lead in getSelectedLeads()\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getLeadDescription(lead)}}\" tooltip-animation=\"false\"  tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n            <div class=\"col-sm-7\">\n              {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n              <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n            </div>\n            <div class=\"col-sm-5 text-right\">\n              <strong>{{lead.lead_status | titleize}}</strong>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-leads-list.tmpl.html","<div widget-sales-leads-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\">\n\n      <div class=\"widget-lines-container\">\n\n        <div class=\"row lines-group widget-line\" ng-repeat=\"lead in widget.content.leads\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getLeadDescription(lead)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n          <div class=\"col-sm-7\">\n            {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n            <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n          </div>\n          <div class=\"col-sm-5 text-right\">\n            <strong>{{lead.lead_status | titleize}}</strong>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-list.tmpl.html","<div widget-sales-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"selector\">\n      <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred\" />\n      <span setting-dates-picker parent-widget=\"widget\" from=\"widget.metadata.hist_parameters.from\" to=\"widget.metadata.hist_parameters.to\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\"/>\n    </div>\n\n    <div class=\"widget-lines-container\" ng-show=\"(isDataFound==true)\">\n\n      <div class=\"row lines-group\" ng-repeat=\"company in widget.content.summary\" >\n        <div class=\"col-xs-12\">\n\n          <div class=\"row widget-line\" >\n            <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(company.name)\" style=\"cursor: pointer;\">\n              <i class=\"fa\" ng-class=\"isCollapsed(company.name) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n            </div>\n            <div class=\"col-xs-7\">\n              <strong>{{company.name | titleize}}</strong>\n            </div>\n            <div class=\"col-xs-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\">\n              <strong>{{company.total}}</strong>\n            </div>\n            <div class=\"col-xs-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\">\n              <strong>{{company.total | mnoCurrency : company.currency}}</strong>\n            </div>\n          </div>\n\n        <div class=\"row\" collapse=\"isCollapsed(company.name)\">\n          <div class=\"col-xs-12\">\n            <div class=\"row widget-line\" ng-repeat=\"product in company.products\" >\n              <div class=\"col-xs-7 col-xs-offset-1\">\n                {{product.name | titleize}}\n              </div>\n              <div class=\"col-xs-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\">\n                <strong>{{product.total}}</strong>\n              </div>\n              <div class=\"col-xs-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\">\n                <strong>{{product.total | mnoCurrency : product.currency}}</strong>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"data-not-found\" ng-show=\"(isDataFound==false)\">\n      <div class=\"message\">No data found for this time range<br/> Please select another one</div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-margin.tmpl.html","<div widget-sales-margin>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"(isDataFound==true)\">\n      <div setting-hist-mode parent-widget= \"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">\n           {{ getTotalMargin() | mnoCurrency : getCurrency()}}\n        </div>\n        <div class=\"legend\">\n          Total sold - Total purchased\n          </br>\n          {{getTimeSpan()}}\n          </br>\n          <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload on-select=\"widget.format()\" deferred=\"::paramSelectorDeferred\" />\n        </div>\n      </div>\n\n      <div class=\"history chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">Total sold - Total purchased</div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-net-sales.tmpl.html","<div widget-sales-net-sales>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row selector\">\n      <div class=\"col-xs-12 text-right\">\n        <span setting-param-selector parent-widget=\"widget\" param=\"display_type\" options=\"displayOptions\" selected=\"displayType\" no-reload=\"true\" deferred=\"::paramSelector1Deferred\" /> |\n        <span setting-param-selector parent-widget=\"widget\" param=\"time_range\" options=\"timeRangeOptions\" selected=\"timeRange\" deferred=\"::paramSelector2Deferred\" />\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==true)\">\n\n      <div class=\"row text-center values\">\n        <div class=\"value-container col-md-3 col-md-offset-0 col-xs-10 col-xs-offset-2\">\n          <div class=\"title\">Sales</div>\n          <div class=\"value-box\">\n            {{ getValue(\'sales\') }}\n          </div>\n        </div>\n        <div class=\"operator col-md-1 col-xs-2\">\n          <span>{{ sign(\'minus\') }}</span>\n        </div>\n        <div class=\"value-container col-md-3 col-xs-10\">\n          <div class=\"title\">Returns</div>\n          <div class=\"value-box\">\n            {{ getValue(\'returns\') }}\n          </div>\n        </div>\n        <div class=\"operator col-md-1 col-xs-2\">\n          <span>{{ sign(\'equal\') }}</span>\n        </div>\n        <div class=\"value-container col-md-4 col-xs-10\">\n          <div class=\"title\">Net Result</div>\n          <div class=\"value-box\">\n            {{ getValue(\'net_result\') }}\n          </div>\n        </div>\n      </div>\n\n  </div>\n\n  <div class=\"data-not-found\" ng-show=\"(isDataFound==false)\">\n    <div class=\"message\">No transaction found for this time range<br/> Please select another one</div>\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-new-vs-existing-customers.tmpl.html","<div widget-sales-new-vs-existing-customers>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div class=\"selector\">\n      <div class=\"selector-wrap\">\n        <span setting-param-selector parent-widget=\"widget\" param=\"display_type\" options=\"displayOptions\" selected=\"displayType\" on-select=\"displayTypeOnClick()\" no-reload=\"true\" deferred=\"::displayTypeParamSelectorDeferred\" />\n      </div>\n      <div class=\"selector-wrap\">\n        <span setting-param-selector parent-widget=\"widget\" param=\"time_range\" options=\"timeRangeOptions\" selected=\"timeRange\" deferred=\"::timeRangeParamSelectorDeferred\" />\n      </div>\n    </div>\n\n    <div class=\"chart-container\" ng-show=\"(isDataFound==true)\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n    </div>\n\n    <div class=\"legend\" ng-show=\"(isDataFound==true)\">\n      <div class=\"row positive2\">\n        <div class=\"col-xs-7 text-left\">New Customers:</div>\n        <div class=\"col-xs-5 text-right\">{{getValue(\'new\')}}</div>\n      </div>\n      <div class=\"row negative2\">\n        <div class=\"col-xs-7 text-left\">Existing Customers:</div>\n        <div class=\"col-xs-5 text-right\">{{getValue(\'existing\')}}</div>\n      </div>\n      <div class=\"row total\">\n        <div class=\"col-xs-7 text-left\">Total:</div>\n        <div class=\"col-xs-5 text-right\">{{getValue(\'total\')}}</div>\n      </div>\n    </div>\n\n    <div class=\"data-not-found\" ng-show=\"(isDataFound==false)\">\n      <div class=\"message\">No data found for this time range<br/> Please select another one</div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-number-of-leads.tmpl.html","<div widget-sales-number-of-leads>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"align-center\">\n      <div class=\"selector\">\n        Leads for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred\" />\n      </div>\n\n      <div class=\"stats\">\n        <div class=\"stat row align-left\" ng-repeat=\"carac in [\'new\', \'converted\', \'lost\']\">\n          <div class=\"col-md-6 title\" style=\"padding: 0px;\">{{carac | titleize}}</div>\n          <div class=\"col-md-6\" style=\"padding: 0px;\">\n            <span class=\"variation\" ng-class=\"formatNumberOfLeads(carac).color\">{{formatNumberOfLeads(carac).variation}}</span>\n            <span class=\"nominal\">{{formatNumberOfLeads(carac).nominal}}</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"legend\">\n      {{widget.content.number_of_leads.total[1]}} leads in total\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-opportunities-funnel.tmpl.html","<div widget-sales-opportunities-funnel>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"sales_stage_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\': \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"legend\">Your opportunities, sorted by sales stage</div>\n\n        <div class=\"funnel-container\">\n          <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toggleSelectStatus(elem.status)\">\n            <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n            <div class=\"main-text\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedStatus\" class=\"currency\">\n          Select a sales stage to display a list of the corresponding opportunities\n        </div>\n\n        <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n\n          <div class=\"row lines-group widget-line\" ng-repeat=\"opp in getSelectedOpportunities()\">\n            <div class=\"col-xs-6\">\n              {{opp.name | titleize}}\n            </div>\n            <div class=\"col-xs-6 text-right\"><strong>{{getOppDetails(opp)}}</strong></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-performance.tmpl.html","<div widget-sales-performance>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-5\">\n              from {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} to {{widget.content.dates[widget.content.dates.length - 1] | mnoDate : widget.metadata.hist_parameters.period}}\n            </div>\n            <div class=\"col-xs-3 text-right\">\n              Win ratio\n            </div>\n            <div class=\"col-xs-4 text-right\">\n              Total won\n            </div>\n          </div>\n        \n          <div class=\"row lines-group\" ng-repeat=\"assignee in widget.content.assignees\" ng-click=\"toggleSelectedElement(assignee)\" >\n            <div class=\"col-xs-12\">\n              <div class=\"row widget-line\" ng-class=\"{\'selected\': isSelected(assignee)}\">\n                <div class=\"col-xs-5\">{{assignee.name | titleize}}</div>\n                <div class=\"col-xs-3 text-right\">{{assignee.win_ratio | mnoCurrency : \'%\'}}</div>\n                <div class=\"col-xs-4 text-right\">{{assignee.total_won | mnoCurrency}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"selectedElement\">\n          <h4>{{selectedElement.name | titleize}}</h4>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div class=\"legend\">Total won (last 12 months): {{selectedElement.total_won | mnoCurrency}}</div>\n          </div>\n          \n          <div class=\"widget-lines-container\">\n\n            <div class=\"row lines-group\" ng-init=\"collapsedWon=false\">\n              <div class=\"col-xs-12\">\n                \n                <div class=\"row widget-line\" ng-click=\"collapsedWon=!collapsedWon\">\n                  <div class=\"col-xs-10\">\n                    <strong>Closed Won</strong>\n                  </div>\n                  <div class=\"col-xs-2 text-right\">\n                    <strong>{{getWonOpportunities(selectedElement).length}}</strong>\n                  </div>\n                </div>\n\n                <div class=\"row\" collapse=\"collapsedWon\">\n                  <div class=\"col-xs-12\">\n                    <div class=\"row widget-line no-select\" ng-repeat=\"opp in getWonOpportunities(selectedElement)\">\n                      <div class=\"col-xs-6\">{{opp.name}}</div>\n                      <div class=\"col-xs-3 text-right\">{{getCloseDate(opp)}}</div>\n                      <div class=\"col-xs-3 text-right\">{{opp.amount.amount | mnoCurrency}}</div>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </div>\n\n            <div class=\"row lines-group\" ng-init=\"collapsedLost=false\">\n              <div class=\"col-xs-12\">\n                \n                <div class=\"row widget-line\" ng-click=\"collapsedLost=!collapsedLost\">\n                  <div class=\"col-xs-10\">\n                    <strong>Closed Lost</strong>\n                  </div>\n                  <div class=\"col-xs-2 text-right\">\n                    <strong>{{getLostOpportunities(selectedElement).length}}</strong>\n                  </div>\n                </div>\n\n                <div class=\"row\" collapse=\"collapsedLost\">\n                  <div class=\"col-xs-12\">\n                    <div class=\"row widget-line no-select\" ng-repeat=\"opp in getLostOpportunities(selectedElement)\" >\n                      <div class=\"col-xs-6\">{{opp.name}}</div>\n                      <div class=\"col-xs-3 text-right\">{{getCloseDate(opp)}}</div>\n                      <div class=\"col-xs-3 text-right\">{{opp.amount.amount | mnoCurrency}}</div>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"selectedElement\" class=\"no-element\">\n          Select an employee or team to display the corresponding opportunities won/lost.\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-segmented-turnover.tmpl.html","<div widget-sales-segmented-turnover>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\"></div>\n\n        <div class=\"selector\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred\"/></div>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n\n        <div class=\"widget-lines-container\">\n\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-12\">Average price range</div>\n          </div>\n          \n          <div class=\"row widget-line\" ng-repeat=\"range in widget.content.ranges\">\n            <div class=\"col-xs-2\">\n              <i class=\"fa fa-circle\" style=\"color: {{getColorByIndex($index)}}\" />\n            </div>\n            <div class=\"col-xs-6\">\n              {{getRangeLabel(range.label)}}\n            </div>\n            <div class=\"col-xs-4 text-right\">\n              <i>{{range.percentage}}%</i>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <i class=\"fa fa-info-circle\" style=\"float: left;\" tooltip=\"This widget segments your revenue by products average price range and propose an analysis of its composition\" />\n        <h3 style=\"margin: 25px 10px; text-align: center;\">{{getMaxRange().percentage.toFixed()}}% of your revenue comes from products sold at an average price between {{getMaxRange().label.split(\'-\')[0] | mnoCurrency : widget.content.currency}} and {{getMaxRange().label.split(\'-\')[1] | mnoCurrency : widget.content.currency}}.</h3>\n        <div class=\'analysis hidden-md\' >{{getAnalysis()}}</div>\n      </div>\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-summary.tmpl.html","<div widget-sales-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-chart-filters parent-widget=\"widget\" class=\"part\" deferred=\"::chartFiltersDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div class=\"selector\">\n      <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred\" />\n      <span setting-dates-picker parent-widget=\"widget\" from=\"widget.metadata.hist_parameters.from\" to=\"widget.metadata.hist_parameters.to\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\"/>\n    </div>\n\n    <div class=\"chart-container\" ng-show=\"(isDataFound==true)\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n    </div>\n\n    <div class=\"data-not-found\" ng-show=\"(isDataFound==false)\">\n      <div class=\"message\">No data found for this time range<br/> Please select another one</div>\n    </div>\n\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-top-customers.tmpl.html","<div widget-sales-top-customers>\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-dates-picker parent-widget=\"widget\" class=\"part\" from=\"(widget.metadata.hist_parameters.from || defaultFrom)\" to=\"(widget.metadata.hist_parameters.to || defaultTo)\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\"/>\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\" class=\"widget-lines-container\">\n\n    <div class=\"row selector\" ng-show=\"(isDataFound==true)\">\n      <div class=\"col-xs-12 text-right\">\n        <a ng-click=\"toggleTransactions()\">{{transactionsCollapsed ? \'Show\' : \'Hide\'}} details</a> |\n        <div setting-param-selector parent-widget=\"widget\" param=\"limit_entries\" options=\"limitEntriesOptions\" selected=\"limitEntriesSelected\" class=\"param-selector\" deferred=\"::paramSelectorDeferred\" no-reload/>\n      </div>\n    </div>\n\n    <!-- Header line -->\n    <div class=\"row widget-line header\">\n      <div class=\"col-xs-1\">\n        #\n      </div>\n      <div class=\"col-xs-7\">\n        Customer name\n      </div>\n      <div class=\"col-xs-4 text-right\">\n        <div setting-param-selector parent-widget=\"widget\" param=\"header\" options=\"headerOptions\" selected=\"headerSelected\" class=\"param-selector\" deferred=\"::paramSelectorDeferred\" no-reload />\n      </div>\n    </div>\n\n    <!-- Content lines -->\n    <div class=\"row lines-group\" ng-show=\"(isDataFound==true)\" ng-repeat=\"entity in getEntities() | limitTo: limitEntriesSelected.value\">\n      <div class=\"col-xs-12\">\n\n        <div class=\"row widget-line\">\n          <div class=\"col-xs-1\">\n            {{$index + 1}}\n          </div>\n          <div class=\"col-xs-7\">\n            <b>{{entity.name}}</b>\n          </div>\n          <div class=\"col-xs-4 text-right\">\n            <b ng-if=\"getHeaderField().showCurrency\">{{ getHeaderField().getValue(entity) | mnoCurrency : entity.currency }}</b>\n            <b ng-if=\"!getHeaderField().showCurrency\">{{ getHeaderField().getValue(entity) }}</b>\n          </div>\n        </div>\n\n        <div class=\"row widget-line sub-line\" collapse=\"transactionsCollapsed\">\n          <div class=\"col-xs-4\" ng-repeat=\"field in getRemainingFields() track by $index\" ng-class=\"{\'text-center\': ($index==1), \'text-right\': ($index==2)}\" >\n            <i ng-if=\"field.showCurrency\">{{field.label}}: {{field.getValue(entity) | mnoCurrency : entity.currency}}</i>\n            <i ng-if=\"!field.showCurrency\">{{field.label}}: {{field.getValue(entity)}}</i>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n    <!-- Data not found line -->\n    <div class=\"row widget-line\" ng-show=\"(isDataFound==false)\">\n      <div class=\"col-xs-12\">No sales data found for your customers</div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-top-opportunities.tmpl.html","<div widget-sales-top-opportunities>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"(isDataFound==true)\">\n\n      <div class=\"legend\">\n        Total potential: <b>{{widget.content.total_potential | mnoCurrency : widget.content.currency || \"AUD\"}}</b> - <b>{{widget.content.eligible_opportunities}}</b> eligible opportunities\n      </div>\n\n      <div class=\"opps-container\">\n        <div class=\"tile\" ng-repeat=\"opp in widget.content.opportunities track by $index\" ng-class=\"getOppClass($index)\">\n          <div class=\"colored-area\">{{$index +1 }}</div>\n          <div class=\"main-text\">\n            {{opp.name | titleize}}\n            <br />\n            <i style=\"font-size: 13px;\">{{getOppDetails(opp)}}</i>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"(isDataFound==false)\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n    \n</div>");
$templateCache.put("widgets-common/data-not-found.tmpl.html","<div class=\"data-not-found\">\n  <img id=\"not-found-bg\" />\n  <div class=\"message\">\n    {{content.mainMessage}}\n\n    <a ng-show=\"showAlertsTrigger\" ng-click=\"onDisplayAlerts()\">\n      <i class=\"fa fa-warning\" /> Find out why\n    </a>\n    <a ng-if=\"hasCallbackUrl\" ng-hide=\"showAlertsTrigger\" ng-click=\"content.linkUrlCallback()\">\n      {{content.linkMessage}}\n    </a>\n    <a ng-if=\"!hasCallbackUrl\" ng-hide=\"showAlertsTrigger\" ng-href=\"{{content.linkUrl}}\" target=\"{{content.linkTarget}}\">\n      {{content.linkMessage}}\n    </a>\n\n  </div>\n</div>\n");
$templateCache.put("widgets-common/editable-title.tmpl.html","<div class=\"visible-lg title-wrapper\" ng-if=\"parentWidget.width >= 3 && parentWidget.width < 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:19:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:19:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-lg title-wrapper\" ng-if=\"parentWidget.width >= 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:80:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:80:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-md visible-sm title-wrapper\" ng-if=\"parentWidget.width == 3 && parentWidget.width < 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:13:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:13:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-md visible-sm title-wrapper\" ng-if=\"parentWidget.width >= 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:60:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:60:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-xs title-wrapper\">\n  <!-- Title edition no designed for mobile -->\n  <div class=\"title\">\n  	{{parentWidget.name | truncate:25:\".\"}}\n  </div>\n</div>\n");
$templateCache.put("widgets-common/top-buttons.tmpl.html","<div id=\"module__top-buttons\">\n\n  <div class=\"top-buttons-wrapper\">\n    <button class=\"btn top-button btn-refresh\" ng-click=\"onRefresh({refreshCache: true})\">\n      <i class=\"fa fa-refresh\"></i>\n      <span class=\"text-hide\">Refresh widget</span>\n    </button>\n\n    <button class=\"btn top-button btn-edit\" ng-click=\"toggleEditMode()\" ng-show=\"parentWidget.hasEditAbility\" ng-class=\"{\'edit-mode\': parentWidget.isEditMode}\">\n      <i class=\"fa fa-cog fa-lg\"></i>\n      <span class=\"text-hide\">Edit widget</span>\n    </button>\n\n    <button class=\"btn top-button btn-close\" ng-click=\"showConfirmDelete = !showConfirmDelete\" ng-show=\"parentWidget.hasDeleteAbility\">\n      <i class=\"fa fa-times-circle-o fa-lg\"></i>\n      <span class=\"text-hide\">Delete widget</span>\n    </button>\n  </div>\n\n  <div class=\"confirm-delete-popover\" ng-show=\"showConfirmDelete\">\n    <h4>Are you sure you want to delete this widget ?</h4>\n    <p>(it will not erase your data)</p>\n    <div ng-hide=\"isDeletePopoverLoading\">\n      <button ng-click=\"showConfirmDelete = false\" class=\"btn btn-sm btn-default\">Cancel</button>\n      <button ng-click=\"deleteWidget()\" class=\"btn btn-sm btn-danger\" style=\"margin-left: 10px;\">Delete</button>\n    </div>\n    <div ng-show=\"isDeletePopoverLoading\" class=\"loader\" align=\"center\">\n      <div>\n        <i class=\"fa fa-spinner fa-pulse fa-4x\"></i>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/account.tmpl.html","<h5 ng-if=\"showLabel\">{{label}}</h5>\n<div class=\"input-group settings select-account\">\n	<select ng-model=\"parentWidget.selectedAccount\" ng-change=\"onAccountSelected()\" ng-options=\"formatLabel(account) for account in parentWidget.content.account_list track by account.uid\" class=\"form-control\" />\n</div>\n");
$templateCache.put("widgets-settings/chart-filters.tmpl.html","<div class=\"settings chart-filters\">\n  <h5>Chart filters</h5>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <input type=\"radio\" ng-model=\"filterCriteria\" value=\"number\">\n      <label for=\"number\" ng-click=\"filterCriteria = \'number\'\">Top {{filterValueNumber}} {{entityType}}</label>\n    </div>\n    <div class=\"col-md-6\">\n      <input type=\"range\" ng-model=\"filterValueNumber\" ng-change=\"filterCriteria = \'number\'\" min=\"3\" max=\"{{maxEntities}}\" step=\"1\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <input type=\"radio\" ng-model=\"filterCriteria\" value=\"percentage\">\n      <label for=\"percentage\" ng-click=\"filterCriteria = \'percentage\'\">Top {{filterValuePercentage}}% {{filterLabel}}</label>\n    </div>\n    <div class=\"col-md-6\">\n      <input type=\"range\" ng-model=\"filterValuePercentage\" ng-change=\"filterCriteria = \'percentage\'\" min=\"20\" max=\"100\" step=\"5\">\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/dates-picker.tmpl.html","<span class=\"settings dates-picker\">\n  <h5 ng-if=\"showTitle()\">Time range</h5>\n\n  <span class=\"buttons\" ng-click=\"onUse()\">\n    <button class=\"btn btn-sm btn-default\" ng-click=\"calendarFrom.toggle()\" datepicker-popup ng-model=\"calendarFrom.value\" is-open=\"calendarFrom.opened\" ng-change=\"showApplyButton()\" max-date=\"calendarTo.value\" ng-focus=\"onUse()\">\n      {{ calendarFrom.value | date : \'yyyy-MM-dd\' }}\n    </button>\n    to \n    <button class=\"btn btn-sm btn-default\" ng-click=\"calendarTo.toggle()\" datepicker-popup ng-model=\"calendarTo.value\" is-open=\"calendarTo.opened\" ng-change=\"showApplyButton()\" min-date=\"calendarFrom.value\" on-open-focus=\"false\" ng-focus=\"onUse()\">\n      {{ calendarTo.value | date : \'yyyy-MM-dd\' }}\n    </button>\n    <button class=\"btn btn-sm btn-success\" tooltip=\"Apply changes\" ng-show=\"changed && !parentWidget.isEditMode\" ng-click=\"applyChanges()\" ng-focus=\"onUse()\" >\n      <i class=\"fa fa-check\"/>\n    </button>\n  </span>\n</span>\n");
$templateCache.put("widgets-settings/hist-mode.tmpl.html","<div class=\"settings hist-mode-choser\">\n  <div align=\"center\" class=\"options\">\n    <a ng-click=\"toggleHistMode(\'current\')\" ng-class=\"!parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">current</a> |\n    <a ng-click=\"toggleHistMode(\'history\')\" ng-class=\"parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">history</a>\n  </div>\n  <div class=\"{{parentWidget.isHistoryMode ? \'arrow-container right\' : \'arrow-container left\'}}\">\n    <div class=\"arrow\" />\n    <div class=\"arrow-border\" />\n  </div>\n</div>");
$templateCache.put("widgets-settings/limit-entries.tmpl.html","<div class=\"settings limit-entries\">\n  {{ entriesLabel ? \'Top\' : \'Display\' }}\n\n  <span ng-repeat=\"option in options | filter:isOptionValid:option track by $index\">\n    {{ $index!=0 ? \' |\' : \'\' }} \n    <a target=\'#\' ng-click=\"selectOption(option)\" class=\"option\" ng-class=\"{badge: option==selected}\">{{ option }}</a>\n  </span>\n\n  <span ng-if=\"max\">\n    | \n    <a target=\'#\' ng-click=\"selectOption(max)\" class=\"option\" ng-class=\"{badge: (!selected || selected==max)}\">{{ max }}</a>\n  </span>\n\n   {{entriesLabel || \'entries\'}}\n</div>");
$templateCache.put("widgets-settings/organizations.tmpl.html","<div class=\"settings organizations\">\n  <h5>Select Companies</h5>\n\n  <div class=\"widget-lines-container\">\n    <div class=\"widget-line\" ng-repeat=\"org in dashboardOrganizations\">\n      {{org.label}}\n      <i ng-class=\"isOrganizationSelected(org.uid) ? \'fa fa-toggle-on\' : \'fa fa-toggle-off\'\" ng-click=\"toggleSelectOrganization(org.uid)\" tooltip=\"{{isOrganizationSelected(org.uid) ? \'disable\' : \'enable\'}}\" tooltip-append-to-body=\"true\" />\n    </div>\n  </div>\n</div>");
$templateCache.put("widgets-settings/param-selector.tmpl.html","<span class=\"settings param-selector\">\n	<a ng-click=\"toggleShowOptions()\">{{selected.label | titleize | truncate : getTruncateValue() : \"...\" : false}} <i class=\"fa fa-chevron-down\" /></a>\n	<div class=\"options-container\" collapse=\"!showOptions\">\n		<div ng-repeat=\"option in options\" ng-click=\"selectOption(option)\">\n			{{option.label | titleize}}\n		</div>\n	</div>\n</span>");
$templateCache.put("widgets-settings/params-checkboxes.tmpl.html","<div ng-repeat=\"parameter in options track by $index\" class=\"settings params-checkboxes\">\n  <label>\n    <input type=\"checkbox\" ng-model=\"parameter.value\" ng-change=\"parameter.onChangeCallback()\">\n    <span>{{parameter.label}}</span>\n  </label>\n</div>\n");
$templateCache.put("widgets-settings/params-picker.tmpl.html","<h5>{{formattedParam | titleize}}</h5>\n<div class=\"settings params-picker\">\n  <div style=\"margin-bottom: 8px;\">\n    The selected criteria will be displayed in this order (drag/drop to modify):\n  </div>\n  <div ui:sortable=\"sortableOptions\" ng-model=\"options\" class=\"input-group\">\n    <span ng-repeat=\"parameter in options track by $index\" class=\"parameter\" ng-class=\"!parameter.selected ? \'unchecked\' : \'\'\">\n      <span class=\"badge\">{{$index + 1}}</span>\n      {{parameter.label | titleize}}\n      <input type=\"checkbox\" ng-model=\"parameter.selected\" />\n    </span>\n  </div>\n</div>");
$templateCache.put("widgets-settings/time-period.tmpl.html","<h5>Time period selection</h5>\n<div class=\"settings time-period\" ng-if=\"timePeriodSetting\">\n\n  <div class=\"row\">\n    <div class=\"col-xs-6\">\n      Period:\n      <select ng-model=\"timePeriodSetting.period\" ng-options=\"titleize(p) for p in periods\" ng-change=\"updateTimeRangePeriod()\" />\n    </div>\n    <div class=\"col-xs-6\">\n      Preset:\n      <div setting-time-presets parent-widget=\"timePeriodSetting\" deferred=\"::timePresetsDeferred\" on-select=\"initUsedSetting(histParams)\" selected=\"timePeriodSetting.selectedPreset\" />\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <div setting-time-slider class=\"sub-setting\" ng-class=\"{used: isTimeSliderUsed(), unused: isDatesPickerUsed()}\" parent-widget=\"timePeriodSetting\" deferred=\"::timeSliderDeferred\" time-range=\"timePeriodSetting.timeRange\" on-use=\"useTimeSlider()\" />\n    </div>\n  </div>\n\n  <div class=\"row text-center\">\n    <div class=\"col-xs-12\">\n      <div setting-dates-picker class=\"sub-setting\" ng-class=\"{used: isDatesPickerUsed(), unused: isTimeSliderUsed()}\" parent-widget=\"timePeriodSetting\" deferred=\"::datesPickerDeferred\" from=\"fromDate\" to=\"toDate\" keep-today=\"histParams.keep_today\" on-use=\"useDatesPicker()\" />\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/time-presets.tmpl.html","<div class=\"settings time-presets\">\n  <select ng-model=\"selectedPreset\" ng-options=\"p.label for p in presets\" ng-change=\"onSelect({histParams: setting.toMetadata().hist_parameters})\"/>\n</div>\n");
$templateCache.put("widgets-settings/time-slider.tmpl.html","<div class=\"settings time-slider\">\n  <div class=\"row\">\n    <div class=\"col-xs-11 col-xs-offset-1\" ng-click=\"onUse()\">\n      Show last {{formatPeriod()}}\n    </div>\n    <div class=\"col-xs-11 col-xs-offset-1\" ng-click=\"onUse()\">\n      <i>{{formatDate(fromDate())}} - {{formatDate(toDate())}}</i>\n    </div>\n    <div class=\"col-xs-12\">\n      <input type=\"range\" ng-model=\"numberOfPeriods\" min=\"1\" max=\"12\" step=\"1\" ng-focus=\"onUse()\">\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/width.tmpl.html","<i class=\"fa fa-angle-double-left reduce\" ng-show=\"expanded\" ng-click=\"parentWidget.toggleExpanded()\" tooltip=\"reduce\"/>\n<i class=\"fa fa-angle-double-right expand\" ng-hide=\"expanded\" ng-click=\"parentWidget.toggleExpanded()\" tooltip=\"expand\"/>");}]);
}).call(this);

(function() {
  angular.module('impac.filters.mno-currency', []).filter('mnoCurrency', [
    "$filter", function($filter) {
      return function(amount, currency, showName) {
        var s;
        if (showName == null) {
          showName = true;
        }
        if (amount == null) {
          return "";
        }
        s = $filter('currency')(amount);
        s = s.replace('(', '-');
        s = s.replace(')', '');
        if (currency == null) {
          return s;
        }
        if (currency[currency.length - 1].toLowerCase() === 'd') {
          if (showName) {
            return s + " " + currency;
          } else {
            return s;
          }
        } else if (currency === "EUR") {
          s = s.replace('$', '');
          s = s.replace(',', ' ');
          s = s.replace('.', ',');
          return s + " €";
        } else {
          s = s.replace('$', '');
          if (!currency.match(/[A-Z]{3}/) && currency !== '%' && currency !== '(ratio)') {
            s = parseInt(s);
          }
          if (showName) {
            return s + " " + currency;
          } else {
            return s;
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('impac.filters.mno-date', []).filter('mnoDate', [
    "$filter", function($filter) {
      return function(date_string, period) {
        var PERIODS;
        PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'];
        if (date_string != null) {
          if (!((period != null) && _.includes(PERIODS, period.toUpperCase()))) {
            period = 'MONTHLY';
          }
          switch (period.toUpperCase()) {
            case 'DAILY':
              return $filter('date')(date_string, 'dd MMM');
            case 'WEEKLY':
              return $filter('date')(date_string, 'dd MMM');
            case 'MONTHLY':
              return $filter('date')(date_string, 'MMM yyyy');
            case 'QUARTERLY':
              return $filter('date')(date_string, 'MMM yyyy');
            case 'YEARLY':
              return $filter('date')(date_string, 'yyyy');
          }
        } else {
          return "";
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('impac.filters.titleize', []).filter('titleize', function() {
    return function(s) {
      s = s === void 0 || s === null ? '' : s;
      return s.toString().toLowerCase().replace(/\b([a-z])/g, function(ch) {
        return ch.toUpperCase();
      });
    };
  });

}).call(this);

(function() {
  angular.module("impac.filters.truncate", []).filter("truncate", function() {
    return function(value, max, tail, wordwise) {
      var lastspace;
      if (!value) {
        return "";
      }
      max = parseInt(max, 10);
      if (!max) {
        return value;
      }
      if (value.length <= max) {
        return value;
      }
      value = value.substr(0, max);
      if (wordwise) {
        lastspace = value.lastIndexOf(" ");
        if (lastspace !== -1) {
          value = value.substr(0, lastspace);
        }
      }
      return value + (tail || "…");
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.dashboard', []);

  module.controller('ImpacDashboardCtrl', ["$scope", "$http", "$q", "$filter", "$modal", "$log", "$timeout", "$templateCache", "MsgBus", "ImpacUtilities", "ImpacAssets", "ImpacTheming", "ImpacRoutes", "ImpacMainSvc", "ImpacDashboardsSvc", "ImpacWidgetsSvc", "ImpacDeveloper", function($scope, $http, $q, $filter, $modal, $log, $timeout, $templateCache, MsgBus, ImpacUtilities, ImpacAssets, ImpacTheming, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, ImpacDeveloper) {
    var saveDashboard, updatePlaceHolderSize;
    $scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
    $scope.widgetsList = ImpacDashboardsSvc.getWidgetsTemplates();
    $scope.impacTitleLogo = ImpacAssets.get('impacTitleLogo');
    $scope.impacDashboardBackground = ImpacAssets.get('impacDashboardBackground');
    $scope.showDhbHeading = ImpacTheming.get().dhbConfig.showDhbHeading;
    $scope.dhbHeadingText = ImpacTheming.get().dhbConfig.dhbHeadingText;
    $scope.dhbErrorsConfig = ImpacTheming.get().dhbErrorsConfig;
    $scope.dhbSettingsConfig = ImpacTheming.get().dhbSettings;
    $scope.showKpisBar = ImpacTheming.get().dhbKpisConfig.enableKpis;
    $scope.showChooseDhbMsg = function() {
      return !ImpacDashboardsSvc.isThereADashboard();
    };
    $scope.showNoWidgetsMsg = function() {
      return ImpacDashboardsSvc.isCurrentDashboardEmpty() && ImpacTheming.get().showNoWidgetMsg;
    };
    $scope.starWizardModal = {
      value: false
    };
    MsgBus.publish('starWizardModal', $scope.starWizardModal);
    $scope.openStarWizard = function() {
      return $scope.starWizardModal.value = true;
    };
    $scope.marketplaceMyobLink = ImpacTheming.get().dhbSubMenuConfig.marketplaceMyobLink;
    $scope.showSubMenu = false;
    $scope.displaySubMenu = function() {
      return $scope.showSubMenu = true;
    };
    $scope.hideSubMenu = function() {
      return $scope.showSubMenu = false;
    };
    $scope.myobMessageConfig = ImpacTheming.get().dhbSubMenuConfig.myobMessage;
    $scope.isLoading = true;
    ImpacDashboardsSvc.load(true).then(function(success) {
      $scope.activateTimer();
      return $scope.hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only;
    }, function(error) {
      return $scope.isLoading = false;
    });
    $scope.activateTimer = function() {
      var timer, w;
      $scope.isLoading || ($scope.isLoading = true);
      w = $scope.currentDhb.widgets;
      if (w != null) {
        timer = Math.max(100 * w.length, 500);
      } else {
        timer = 500;
      }
      return $timeout(function() {
        return $scope.isLoading = false;
      }, timer);
    };
    $scope.createDashboardModal = $scope.$new();
    $scope.createDashboardModal.config = {
      backdrop: 'static',
      template: $templateCache.get('dashboard/create.modal.html'),
      size: 'md',
      windowClass: 'inverse',
      scope: $scope.createDashboardModal
    };
    $scope.createDashboardModal.open = function() {
      var self;
      self = $scope.createDashboardModal;
      if (self.locked) {
        return;
      }
      self.model = {
        name: ''
      };
      self.errors = '';
      self.isLoading = false;
      self.instance = $modal.open(self.config);
      self.instance.rendered.then(function(onRender) {
        return self.locked = true;
      });
      self.instance.result.then(function(onClose) {
        return self.locked = false;
      }, function(onDismiss) {
        return self.locked = false;
      });
      return ImpacMainSvc.loadOrganizations().then(function(config) {
        self.organizations = config.organizations;
        self.currentOrganization = config.currentOrganization;
        return self.selectMode('single');
      });
    };
    $scope.createDashboardModal.proceed = function() {
      var dashboard, organizations, self;
      self = $scope.createDashboardModal;
      self.isLoading = true;
      dashboard = {
        name: self.model.name
      };
      organizations = [];
      if (self.mode === 'multi') {
        organizations = _.select(self.organizations, function(o) {
          return o.$selected;
        });
      } else {
        organizations = [
          {
            id: ImpacMainSvc.config.currentOrganization.id
          }
        ];
      }
      if (organizations.length > 0) {
        dashboard.organization_ids = _.pluck(organizations, 'id');
      }
      return ImpacDashboardsSvc.create(dashboard).then(function(dashboard) {
        self.errors = '';
        return self.instance.close();
      }, function(errors) {
        self.isLoading = false;
        return self.errors = ImpacUtilities.processRailsError(errors);
      });
    };
    $scope.createDashboardModal.isProceedDisabled = function() {
      var additional_condition, selectedCompanies, self;
      self = $scope.createDashboardModal;
      selectedCompanies = _.select(self.organizations, function(o) {
        return o.$selected;
      });
      additional_condition = _.isEmpty(self.model.name);
      additional_condition || (additional_condition = selectedCompanies.length === 0);
      additional_condition || (additional_condition = _.select(selectedCompanies, function(o) {
        return self.canAccessAnalyticsData(o);
      }).length === 0);
      return self.isLoading || additional_condition;
    };
    $scope.createDashboardModal.btnBlassFor = function(mode) {
      var self;
      self = $scope.createDashboardModal;
      if (mode === self.mode) {
        return "btn btn-sm btn-warning active";
      } else {
        return "btn btn-sm btn-default";
      }
    };
    $scope.createDashboardModal.selectMode = function(mode) {
      var self;
      self = $scope.createDashboardModal;
      _.each(self.organizations, function(o) {
        return o.$selected = false;
      });
      self.currentOrganization.$selected = mode === 'single';
      return self.mode = mode;
    };
    $scope.createDashboardModal.isSelectOrganizationShown = function() {
      return $scope.createDashboardModal.mode === 'multi';
    };
    $scope.createDashboardModal.isCurrentOrganizationShown = function() {
      return $scope.createDashboardModal.mode === 'single';
    };
    $scope.createDashboardModal.canAccessAnalyticsForCurrentOrganization = function() {
      var self;
      self = $scope.createDashboardModal;
      return self.canAccessAnalyticsData(self.currentOrganization);
    };
    $scope.createDashboardModal.isMultiCompanyAvailable = function() {
      return $scope.createDashboardModal.organizations.length > 1 && $scope.createDashboardModal.multiOrganizationReporting;
    };
    $scope.createDashboardModal.canAccessAnalyticsData = function(organization) {
      return organization.current_user_role && (organization.current_user_role === "Super Admin" || organization.current_user_role === "Admin");
    };
    $scope.customWidgetSelector = ImpacTheming.get().widgetSelectorConfig;
    $scope.forceShowWidgetSelector = false;
    $scope.showCloseWidgetSelectorButton = function() {
      return !ImpacDashboardsSvc.isCurrentDashboardEmpty();
    };
    $scope.displayWidgetSelector = function(value) {
      if (value == null) {
        value = true;
      }
      return $scope.forceShowWidgetSelector = value;
    };
    $scope.showWidgetSelector = function() {
      return $scope.forceShowWidgetSelector || (ImpacDashboardsSvc.isCurrentDashboardEmpty() && !$scope.customWidgetSelector.path);
    };
    $scope.isAddChartEnabled = ImpacTheming.get().addChartTile.show;
    $scope.addChartTileOnClick = function() {
      var triggers;
      triggers = ImpacTheming.get().addChartTile.onClickOptions.triggers;
      return _.forEach(triggers, function(trigger) {
        switch (trigger.type) {
          case 'objectProperty':
            return $scope[trigger.target][trigger.property] = trigger.value;
        }
      });
    };
    $scope.selectedCategory = 'accounts';
    $scope.isCategorySelected = function(aCatName) {
      if (($scope.selectedCategory != null) && (aCatName != null)) {
        return $scope.selectedCategory === aCatName;
      } else {
        return false;
      }
    };
    $scope.selectCategory = function(aCatName) {
      return $scope.selectedCategory = aCatName;
    };
    $scope.getSelectedCategoryName = function() {
      if ($scope.selectedCategory != null) {
        switch ($scope.selectedCategory) {
          case 'accounts':
            return 'Accounting';
          case 'invoices':
            return 'Invoicing';
          case 'hr':
            return 'HR / Payroll';
          case 'sales':
            return 'Sales';
          default:
            return false;
        }
      } else {
        return false;
      }
    };
    $scope.getSelectedCategoryTop = function() {
      if ($scope.selectedCategory != null) {
        switch ($scope.selectedCategory) {
          case 'accounts':
            return {
              top: '33px'
            };
          case 'invoices':
            return {
              top: '64px'
            };
          case 'hr':
            return {
              top: '95px'
            };
          case 'sales':
            return {
              top: '126px'
            };
          default:
            return {
              top: '9999999px'
            };
        }
      } else {
        return false;
      }
    };
    $scope.getWidgetsForSelectedCategory = function() {
      if (($scope.selectedCategory != null) && ($scope.widgetsList != null)) {
        return _.select($scope.widgetsList, function(aWidgetTemplate) {
          var widgetCategory;
          if (aWidgetTemplate.metadata && aWidgetTemplate.metadata.template) {
            widgetCategory = aWidgetTemplate.metadata.template.split('/')[0];
          } else {
            widgetCategory = aWidgetTemplate.path.split('/')[0];
          }
          return widgetCategory === $scope.selectedCategory;
        });
      } else {
        return [];
      }
    };
    $scope.addWidget = function(widgetPath, widgetMetadata) {
      var params;
      if (widgetMetadata == null) {
        widgetMetadata = null;
      }
      params = {
        widget_category: widgetPath
      };
      if (widgetMetadata != null) {
        angular.extend(params, {
          metadata: widgetMetadata
        });
      }
      angular.element('#widget-selector').css('cursor', 'progress');
      angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'progress');
      return ImpacWidgetsSvc.create(params).then(function() {
        $scope.errors = '';
        angular.element('#widget-selector').css('cursor', 'auto');
        angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer');
        angular.element('#widget-selector .badge.confirmation').fadeTo(250, 1);
        return $timeout(function() {
          return angular.element('#widget-selector .badge.confirmation').fadeTo(700, 0);
        }, 4000);
      }, function(errors) {
        $scope.errors = ImpacUtilities.processRailsError(errors);
        angular.element('#widget-selector').css('cursor', 'auto');
        return angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer');
      });
    };
    $scope.widgetSuggestionModal = $scope.$new();
    $scope.widgetSuggestionModal.widgetDetails = {};
    $scope.widgetSuggestionModal.error = false;
    $scope.widgetSuggestionModal.onSuccess = false;
    $scope.widgetSuggestionModal.config = {
      backdrop: 'static',
      template: $templateCache.get('dashboard/widget-suggestion.modal.html'),
      size: 'md',
      windowClass: 'inverse impac-widget-suggestion',
      scope: $scope.widgetSuggestionModal,
      apiPath: ImpacRoutes.widgets.suggest()
    };
    $scope.widgetSuggestionModal.open = function() {
      var self;
      self = $scope.widgetSuggestionModal;
      if (self.locked) {
        return;
      }
      ImpacMainSvc.loadUserData().then(function(user) {
        return self.userName = user.name;
      });
      self.instance = $modal.open(self.config);
      self.instance.rendered.then(function(onRender) {
        return self.locked = true;
      });
      self.instance.result.then(function(onClose) {
        return self.locked = false;
      }, function(onDismiss) {
        return self.locked = false;
      });
      return self.isLoading = false;
    };
    $scope.widgetSuggestionModal.proceed = function() {
      var data, self;
      self = $scope.widgetSuggestionModal;
      self.isLoading = true;
      data = {
        widget_name: self.widgetDetails.name,
        widget_category: self.widgetDetails.category,
        widget_description: self.widgetDetails.description
      };
      if (self.config.apiPath != null) {
        return $http.post(self.config.apiPath, {
          template: 'widget_suggestion',
          opts: data
        }).then(function() {
          self.onSuccess = true;
          return $timeout(function() {
            self.instance.close();
            self.widgetDetails = {};
            self.isLoading = false;
            return self.onSuccess = false;
          }, 3000);
        }, function(err) {
          self.isLoading = false;
          self.error = true;
          return $log.error('impac-angular ERROR: Unable to POST widget_suggestion mailer: ', err);
        });
      }
    };
    return $scope.sortableOptions = {
      stop: saveDashboard = function() {
        var data;
        data = {
          widgets_order: _.pluck($scope.currentDhb.widgets, 'id')
        };
        return ImpacDashboardsSvc.update($scope.currentDhb.id, data);
      },
      start: updatePlaceHolderSize = function(e, widget) {
        widget.placeholder.css("width", widget.item.width() - 1);
        return widget.placeholder.css("height", widget.item.height());
      },
      cursorAt: {
        left: 100,
        top: 20
      },
      opacity: 0.5,
      delay: 150,
      tolerance: 'pointer',
      placeholder: "placeHolderBox",
      cursor: "move",
      revert: 250,
      cancel: ".unsortable",
      handle: ".top-line"
    };
  }]);

  module.directive('impacDashboard', ["$templateCache", function($templateCache) {
    return {
      restrict: 'EA',
      scope: {
        forceLoad: '=load'
      },
      template: $templateCache.get('dashboard/dashboard.tmpl.html'),
      controller: 'ImpacDashboardCtrl'
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.components.chart', []).directive('impacChart', ["$log", "$window", function($log, $window) {
    return {
      restrict: 'A',
      scope: {
        drawTrigger: '=',
        deferred: '='
      },
      link: function(scope, elem, attr) {
        scope.draw = function(chartData) {
          var canvas, ctx;
          if ((chartData.options.showXLabels != null) && !chartData.options.showXLabels) {
            angular.merge(chartData.options, {
              scales: {
                xAxes: [
                  {
                    display: false
                  }
                ]
              }
            });
          }
          if (elem.children().length > 0) {
            elem.children().remove(0);
          }
          elem.append('<canvas></canvas>');
          canvas = elem.children()[0];
          ctx = canvas.getContext("2d");
          return new Chart(ctx, chartData);
        };
        scope.drawTrigger.then(function(success) {
          return $log.warn('chart promise has been resolved: use notify instead');
        }, function(error) {
          return $log.error(error);
        }, function(chartData) {
          var isSafari, timeoutUntilVisible, userAgent;
          userAgent = $window.navigator.userAgent;
          isSafari = (userAgent.indexOf('Safari') !== -1) && !(userAgent.indexOf('Chrome') !== -1);
          if (isSafari) {
            timeoutUntilVisible = function() {
              var visible;
              visible = $(elem).is(':visible');
              if (visible) {
                return scope.draw(chartData);
              } else {
                return setTimeout(function() {
                  return timeoutUntilVisible();
                }, 100);
              }
            };
            return timeoutUntilVisible();
          } else {
            return scope.draw(chartData);
          }
        });
        return scope.deferred.resolve('chart ready');
      }
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.components.dashboard-selector', []).directive('dashboardSelector', ["$log", "$compile", "$templateCache", "$http", "$timeout", "$modal", "ImpacTheming", "ImpacDashboardsSvc", "ImpacMainSvc", "ImpacUtilities", function($log, $compile, $templateCache, $http, $timeout, $modal, ImpacTheming, ImpacDashboardsSvc, ImpacMainSvc, ImpacUtilities) {
    return {
      restrict: 'E',
      scope: {
        onCreateDashboard: '&',
        isWidgetSelectorShown: '&',
        onDisplayWidgetSelector: '&',
        onSelectDashboard: '&'
      },
      controller: ["$scope", function($scope) {
        $scope.organizationsNames = function() {
          return _.pluck($scope.currentDhb.data_sources, 'label').join(", ");
        };
        $scope.toggleShowDashboardsDropdown = function() {
          if ($scope.showChangeDashboardNameBox) {
            return;
          }
          if (ImpacDashboardsSvc.areThereSeveralDashboards() || $scope.showCreateDashboardButton) {
            return $scope.showDashboardsDropdown = !$scope.showDashboardsDropdown;
          } else {
            return $scope.showDashboardsDropdown = false;
          }
        };
        $scope.selectDashboard = function(dhbId) {
          if ($scope.currentDhb.id === dhbId) {
            return;
          }
          $scope.isLoading = true;
          $scope.showDashboardsDropdown = false;
          return $timeout(function() {
            return $scope.$apply(function() {
              ImpacDashboardsSvc.setCurrentDashboard(dhbId);
              $scope.onSelectDashboard();
              return $scope.isLoading = false;
            });
          }, 50);
        };
        $scope.toggleChangeDashboardNameBox = function(dhb) {
          var tmpDhbCpy;
          tmpDhbCpy = angular.copy(dhb);
          $scope.dashboardToChange = {};
          $scope.dashboardToChange.id = tmpDhbCpy.id;
          $scope.dashboardToChange.name = tmpDhbCpy.full_name;
          $scope.showChangeDashboardNameBox = !$scope.showChangeDashboardNameBox;
          return $timeout(function() {
            var elem;
            elem = $('#changeDhbNameInput');
            elem.select();
            return elem.focus();
          }, 100);
        };
        $scope.hideChangeDashboardNameBox = function() {
          return $scope.showChangeDashboardNameBox = false;
        };
        $scope.checkAndUpdateDashboardName = function(event) {
          if (event.keyCode === 13) {
            $scope.updateDashboardName();
          }
          if (event.keyCode === 27) {
            return $scope.showChangeDashboardNameBox = false;
          }
        };
        $scope.updateDashboardName = function() {
          if (($scope.dashboardToChange == null) || _.isEmpty($scope.dashboardToChange.name)) {
            return;
          }
          return ImpacDashboardsSvc.update($scope.dashboardToChange.id, {
            name: $scope.dashboardToChange.name
          }).then(function(success) {
            return $scope.showChangeDashboardNameBox = false;
          });
        };
        $scope.toggleAccessibilityMode = function() {
          $scope.accessibilityMode = !$scope.accessibilityMode;
          return angular.forEach($scope.currentDhb.widgets, function(w) {
            return w.loadContent();
          });
        };
        $scope.deleteDashboardModal = $scope.$new();
        $scope.deleteDashboardModal.config = {
          backdrop: 'static',
          template: $templateCache.get('dashboard-selector/delete.modal.html'),
          size: 'md',
          windowClass: 'inverse',
          scope: $scope.deleteDashboardModal
        };
        $scope.deleteDashboardModal.open = function() {
          var self;
          self = $scope.deleteDashboardModal;
          if (self.locked) {
            return;
          }
          self.errors = '';
          self.isLoading = false;
          self.instance = $modal.open(self.config);
          self.instance.rendered.then(function(onRender) {
            return self.locked = true;
          });
          return self.instance.result.then(function(onClose) {
            return self.locked = false;
          }, function(onDismiss) {
            return self.locked = false;
          });
        };
        $scope.deleteDashboardModal.proceed = function() {
          var self;
          self = $scope.deleteDashboardModal;
          self.isLoading = true;
          return ImpacDashboardsSvc["delete"]($scope.currentDhb.id).then(function() {
            self.errors = '';
            return self.instance.close();
          }, function(errors) {
            self.errors = ImpacUtilities.processRailsError(errors);
            return self.isLoading = false;
          });
        };
        return $scope;
      }],
      link: function(scope, element, attrs) {
        var _compile, customUrl, getCustomTemplate, getTemplate, options, selectorTemplate, setTemplate;
        scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
        scope.dashboardsList = ImpacDashboardsSvc.getDashboards();
        scope.isThereADashboard = function() {
          return ImpacDashboardsSvc.isThereADashboard();
        };
        options = ImpacTheming.get().dhbSelectorConfig;
        scope.isAccessibilityEnabled = options.accessibilityEnabled;
        scope.isAddWidgetEnabled = options.addWidgetEnabled;
        scope.isAddDhbEnabled = options.addDhbEnabled;
        scope.isDeleteDhbEnabled = options.deleteDhbEnabled;
        scope.showCreateDashboardButton = true;
        scope.showDashboardsDropdown = false;
        scope.showChangeDashboardNameBox = false;
        scope.accessibilityMode = false;
        if (!!options.customTmplPath) {
          customUrl = options.customTmplPath;
        } else {
          scope.selectorType = options.selectorType;
        }
        selectorTemplate = null;
        setTemplate = function(path) {
          return selectorTemplate = path;
        };
        switch (scope.selectorType) {
          case 'dropdown':
            setTemplate('dashboard-selector/dropdown.tmpl.html');
            break;
          case 'tabs':
            setTemplate('dashboard-selector/bootstrap-tabs.tmpl.html');
            break;
          case 'pills':
            setTemplate('dashboard-selector/bootstrap-tabs.tmpl.html');
            break;
          default:
            setTemplate(customUrl);
        }
        getCustomTemplate = function() {
          return $http.get(selectorTemplate, {
            cache: $templateCache
          }).then(function(tmplContent) {
            if (!tmplContent || !tmplContent.data || !tmplContent.data.length) {
              $log.warn('dashboardSelector custom template: no content found');
            }
            return _compile(tmplContent.data);
          }, function(err) {
            return $log.error('Error retrieving custom template: ', err);
          });
        };
        getTemplate = function() {
          return _compile($templateCache.get(selectorTemplate));
        };
        _compile = function(htmlString) {
          element.html(htmlString).show();
          return $compile(element.contents())(scope);
        };
        if (customUrl) {
          return getCustomTemplate();
        } else {
          return getTemplate();
        }
      }
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.components.kpi', []).directive('impacKpi', ["$log", "ImpacKpisSvc", function($log, ImpacKpisSvc) {
    return {
      restrict: 'EA',
      scope: {
        onDelete: '&',
        kpi: '=',
        editMode: '='
      },
      templateUrl: 'kpi/kpi.tmpl.html',
      controller: ["$scope", function($scope) {
        $scope.showEditSettings = false;
        $scope.kpiTemplates = ImpacKpisSvc.getKpisTemplates();
        $scope.possibleExtraParams = [];
        $scope.limit = {};
        $scope.possibleTargets = [
          {
            label: 'over',
            mode: 'min'
          }, {
            label: 'below',
            mode: 'max'
          }
        ];
        if (!$scope.kpi["static"]) {
          ImpacKpisSvc.show($scope.kpi).then(function(success) {
            var base, kpiTemplate;
            kpiTemplate = _.find($scope.kpiTemplates, function(aKpi) {
              return aKpi.endpoint === $scope.kpi.endpoint;
            });
            if ((kpiTemplate != null) && (kpiTemplate.extra_params != null)) {
              $scope.kpi.possibleExtraParams = kpiTemplate.extra_params;
            }
            (base = $scope.kpi).targets || (base.targets = []);
            if (!_.isEmpty($scope.kpi.targets[0])) {
              if ($scope.kpi.limit == null) {
                $scope.kpi.limit = {};
              }
              $scope.kpi.limit.mode = _.keys($scope.kpi.targets[0])[0];
              return $scope.kpi.limit.value = _.values($scope.kpi.targets[0])[0];
            }
          });
        }
        $scope.displayEditSettings = function() {
          return $scope.showEditSettings = true;
        };
        $scope.hideEditSettings = function() {
          return $scope.showEditSettings = false;
        };
        $scope.updateName = function() {
          if (_.isEmpty($scope.kpi.name)) {
            return;
          }
          return ImpacKpisSvc.update($scope.kpi, {
            name: $scope.kpi.name
          });
        };
        $scope.updateSettings = function() {
          var params, target0;
          params = {};
          if (!(_.isEmpty($scope.kpi.limit.value || _.isEmpty($scope.kpi.limit.mode)))) {
            target0 = {};
            target0[$scope.kpi.limit.mode] = $scope.kpi.limit.value;
            params.targets = [target0];
          }
          if (!_.isEmpty($scope.kpi.extra_params)) {
            params.extra_params = $scope.kpi.extra_params;
          }
          if (!_.isEmpty(params)) {
            ImpacKpisSvc.update($scope.kpi, params);
          }
          return $scope.hideEditSettings();
        };
        return $scope.deleteKpi = function() {
          if ($scope.kpi["static"]) {
            return;
          }
          return ImpacKpisSvc["delete"]($scope.kpi).then((function(success) {
            return $scope.onDelete();
          }));
        };
      }]
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.components.kpis-bar', []).directive('kpisBar', ["$templateCache", "ImpacKpisSvc", function($templateCache, ImpacKpisSvc) {
    return {
      restrict: 'E',
      scope: {
        kpis: '='
      },
      template: $templateCache.get('kpis-bar/kpis-bar.tmpl.html'),
      controller: ["$scope", "$timeout", "$log", function($scope, $timeout, $log) {
        $scope.hideAvailableKpis = true;
        $scope.showKpisExpanded = false;
        $scope.showEditMode = false;
        $scope.isAddingKPI = false;
        $scope.availableKpis = ImpacKpisSvc.getKpisTemplates();
        $scope.toggleAvailableKpis = function() {
          return $scope.hideAvailableKpis = !$scope.hideAvailableKpis;
        };
        $scope.formatKpiName = function(endpoint) {
          var endpoint_splitted, name;
          endpoint_splitted = endpoint.split('/');
          name = endpoint_splitted[0] + ' | ' + endpoint_splitted.slice(1, endpoint_splitted.length).join(' ');
          name = name.replace('_', ' ');
          return name;
        };
        $scope.addKpi = function(kpi) {
          $scope.isAddingKPI = true;
          return ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched).then(function(success) {
            return $scope.kpis.push(success);
          }, function(error) {
            return $log.error("Impac Kpis bar can't add a kpi", error);
          })["finally"](function() {
            return $scope.isAddingKPI = false;
          });
        };
        $scope.removeKpi = function(kpiId) {
          return $scope.kpis = _.remove($scope.kpis, function(kpi) {
            return kpi.id !== kpiId;
          });
        };
        return $scope.toggleEditMode = function() {
          return $scope.showEditMode = !$scope.showEditMode;
        };
      }]
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widget', []);

  module.controller('ImpacWidgetCtrl', ["$scope", "$log", "$q", "$timeout", "ImpacWidgetsSvc", function($scope, $log, $q, $timeout, ImpacWidgetsSvc) {
    var w;
    w = $scope.widget || {};
    $scope.widgetDeferred = $q.defer();
    $scope.widgetDeferred.promise.then(function(promises) {
      return $q.all(promises).then(function(success) {
        return $scope.showWidget();
      }, function(error) {
        w.isLoading = false;
        $log.error("widget " + w.id + " failed to render");
        return $log.error(error);
      });
    });
    $scope.showWidget = function(refreshCache) {
      if (refreshCache == null) {
        refreshCache = false;
      }
      w.isLoading || (w.isLoading = true);
      return ImpacWidgetsSvc.show(w, refreshCache).then(function(updatedWidget) {
        if ($scope.isAccessibility) {
          w.initialWidth = w.width;
          return w.width = 12;
        } else if (w.initialWidth) {
          return w.width = w.initialWidth;
        }
      })["finally"](function() {
        return w.isLoading = false;
      });
    };
    $scope.initSettings = function() {
      return ImpacWidgetsSvc.initWidgetSettings(w);
    };
    $scope.updateSettings = function(needContentReload) {
      if (needContentReload == null) {
        needContentReload = true;
      }
      return ImpacWidgetsSvc.updateWidgetSettings(w, needContentReload);
    };
    return w.getColClass = function() {
      return "col-md-" + w.width;
    };
  }]);

  module.directive('impacWidget', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentDashboard: '=',
        widget: '=',
        isAccessibility: '=',
        onDisplayAlerts: '&'
      },
      controller: 'ImpacWidgetCtrl',
      link: function(scope, element) {
        scope.widget.isLoading = true;
        scope.widget.settings = [];
        scope.widget.hasEditAbility = true;
        scope.widget.hasDeleteAbility = true;
        return scope.widgetContentTemplate = function() {
          var splittedPath, templatePath;
          if (scope.widget.metadata && scope.widget.metadata.template) {
            scope.templateName = scope.widget.metadata.template.replace(/\/|_/g, '-');
          } else {
            splittedPath = angular.copy(scope.widget.category).split('/');
            splittedPath.length = 2;
            scope.templateName = splittedPath.join("-").replace(/_/g, '-');
          }
          templatePath = 'widgets/' + scope.templateName + '.tmpl.html';
          if (scope.isAccessibility) {
            if ($templateCache.get('widgets/' + scope.templateName + '.accessible.tmpl.html')) {
              templatePath = 'widgets/' + scope.templateName + '.accessible.tmpl.html';
            }
            scope.templateName = scope.templateName + ' accessible';
          }
          return templatePath;
        };
      },
      template: $templateCache.get('widget/widget.tmpl.html')
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.filters.url-helper', []).filter('urlHelper', function() {
    return function(input, params) {
      var processArrayParams, processObjectParams;
      if (!input || !input.length) {
        return;
      }
      processArrayParams = function() {
        input = [input, params.shift()].join('?');
        return input = [].concat.apply([], [input, params]).join('&');
      };
      processObjectParams = function() {
        var arr, i, keys;
        i = 0;
        arr = [];
        keys = Object.keys(params);
        while (i < keys.length) {
          arr.push(keys[i] + '=' + params[keys[i]]);
          i++;
        }
        params = arr;
        return processArrayParams();
      };
      if (Array.isArray(params)) {
        processArrayParams();
      }
      if (typeof params === 'object' && !Array.isArray(params)) {
        processObjectParams();
      }
      return input;
    };
  });

}).call(this);

(function() {
  angular.module('impac.services.assets', []).provider('ImpacAssets', function() {
    var _$get, paths, provider;
    provider = this;
    paths = {
      dataNotFound: null,
      impacTitleLogo: null,
      impacDashboardBackground: null,
      noWarning: false
    };
    provider.configure = function(configOptions) {
      return angular.extend(paths, configOptions);
    };
    _$get = function($log) {
      var service;
      service = this;
      service.get = function(key) {
        var msg, path;
        path = '';
        msg = 'impac-angular warning: There are missing assets (' + key + '), please refer to the including assets section in the docs.';
        if (paths[key] != null) {
          path = paths[key];
        } else {
          if (!paths.noWarning) {
            $log.warn(msg);
          }
        }
        return path;
      };
      return service;
    };
    _$get.$inject = ['$log'];
    provider.$get = _$get;
    return provider;
  });

}).call(this);

(function() {
  angular.module('impac.services.chart-formatter', []).service('ChartFormatterSvc', ["ImpacTheming", "$filter", "$window", "$document", "ImpacDashboardsSvc", function(ImpacTheming, $filter, $window, $document, ImpacDashboardsSvc) {
    var COLORS, _self, cutHex, hexToB, hexToG, hexToR, hexToRGB, lightenColor;
    _self = this;
    COLORS = ImpacTheming.get().chartColors;
    $window.onblur = function() {
      return angular.element($document[0].getElementById('chartjs-tooltip')).remove();
    };
    this.getPositiveColor = function() {
      return COLORS.positive;
    };
    this.getNegativeColor = function() {
      return COLORS.negative;
    };
    this.getOthersColor = function() {
      return COLORS.others;
    };
    this.getColor = function(index) {
      return COLORS.array[index % COLORS.array.length];
    };
    cutHex = function(htmlColor) {
      return htmlColor.replace(/#/, '');
    };
    hexToR = function(htmlColor) {
      return parseInt((cutHex(htmlColor)).substring(0, 2), 16);
    };
    hexToG = function(htmlColor) {
      return parseInt((cutHex(htmlColor)).substring(2, 4), 16);
    };
    hexToB = function(htmlColor) {
      return parseInt((cutHex(htmlColor)).substring(4, 6), 16);
    };
    hexToRGB = function(htmlColor) {
      return [hexToR(htmlColor), hexToG(htmlColor), hexToB(htmlColor)].join(",");
    };
    lightenColor = function(htmlColor, alpha) {
      return "rgba(" + (hexToRGB(htmlColor)) + "," + alpha + ")";
    };
    this.customTooltip = function(tooltip) {
      var canvasEl, innerHtml, obj, offset, ref, tooltipEl;
      tooltipEl = angular.element('#chartjs-tooltip');
      if (!tooltipEl[0]) {
        angular.element('body').append('<div id="chartjs-tooltip"></div>');
        tooltipEl = angular.element('#chartjs-tooltip');
      }
      if (!tooltip.opacity) {
        tooltipEl.css({
          opacity: 0.5
        });
        return;
      }
      tooltipEl.removeClass('above below no-transform');
      if (tooltip.yAlign) {
        tooltipEl.addClass(tooltip.yAlign);
      } else {
        tooltipEl.addClass('no-transform');
      }
      if (tooltip.body) {
        innerHtml = _.compact([(tooltip.beforeTitle || []).join('<br/>'), (tooltip.title || []).join('<br/>'), (tooltip.afterTitle || []).join('<br/>'), (tooltip.beforeBody || []).join('<br/>'), (tooltip.body || []).join('<br/>'), (tooltip.afterBody || []).join('<br/>'), (tooltip.beforeFooter || []).join('<br/>'), (tooltip.footer || []).join('<br/>'), (tooltip.afterFooter || []).join('<br/>')]);
        tooltipEl.html(innerHtml.join('<br/>'));
      }
      canvasEl = angular.element(this._chart.canvas);
      offset = canvasEl.offset();
      canvasEl.bind('mouseleave', function(event) {
        if (event.relatedTarget.id !== 'chartjs-tooltip') {
          return tooltipEl.remove();
        }
      });
      tooltipEl.bind('mouseleave', function(event) {
        if (event.relatedTarget.tagName !== 'CANVAS') {
          return tooltipEl.remove();
        }
      });
      return tooltipEl.css({
        'background-color': '#17262d',
        color: 'white',
        opacity: 1,
        transition: 'opacity 0.5s, top 0.5s, left 0.5s',
        position: 'absolute',
        width: (ref = tooltip.width) != null ? ref : (
          obj = {},
          obj[tooltip.width + "px"] = 'auto',
          obj
        ),
        left: (offset.left + tooltip.x + 10) + "px",
        top: (offset.top + tooltip.y + 10) + "px",
        fontFamily: tooltip._fontFamily,
        fontSize: tooltip.fontSize,
        fontStyle: tooltip._fontStyle,
        padding: tooltip.yPadding + "px " + tooltip.xPadding + "px",
        'border-radius': '2px'
      });
    };
    angular.merge(Chart.defaults.global, {
      defaultColor: _self.getColor(0),
      tooltips: {
        titleFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        bodyFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        footerFontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        enabled: false,
        custom: _self.customTooltip
      },
      elements: {
        point: {
          hitRadius: 8,
          hoverRadius: 8
        },
        line: {
          tension: 0,
          borderWidth: 2
        }
      }
    });
    angular.merge(Chart.defaults.scale, {
      ticks: {
        beginAtZero: true,
        minRotation: 0,
        fontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
      },
      scaleLabel: {
        fontFamily: "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"
      }
    });
    this.setTooltipsTextLayout = function(opts, showSerieInTitle) {
      if (showSerieInTitle == null) {
        showSerieInTitle = false;
      }
      return angular.merge(opts, {
        tooltips: {
          callbacks: {
            title: function(context, data) {
              var title;
              if (!showSerieInTitle) {
                return data.labels[context[0].index];
              } else {
                title = [data.labels[context[0].index]];
                if (data.datasets[context[0].datasetIndex].label) {
                  title.push(data.datasets[context[0].datasetIndex].label);
                }
                return title.join(' | ');
              }
            },
            label: function(context, data) {
              var currency;
              currency = opts.currency || ImpacDashboardsSvc.getCurrentDashboard().currency;
              if (currency !== 'hide') {
                return $filter('mnoCurrency')(data.datasets[context.datasetIndex].data[context.index], currency);
              } else {
                return data.datasets[context.datasetIndex].data[context.index];
              }
            }
          }
        }
      });
    };
    this.lineChart = function(inputDataArray, opts, versusMode) {
      var index, isFilled, singleValue;
      if (opts == null) {
        opts = {};
      }
      if (versusMode == null) {
        versusMode = false;
      }
      _self.setTooltipsTextLayout(opts, true);
      index = 0;
      isFilled = inputDataArray.length === 1;
      singleValue = false;
      if (inputDataArray[0].labels.length < 2) {
        singleValue = true;
        inputDataArray[0].labels.push(inputDataArray[0].labels[0]);
      }
      if (inputDataArray.length > 1 || ((opts.pointDot != null) && !opts.pointDot) || singleValue) {
        angular.merge(opts, {
          elements: {
            point: {
              radius: 0.0001
            },
            line: {
              tension: 0.3
            }
          }
        });
      }
      return {
        type: 'line',
        options: opts,
        data: {
          labels: inputDataArray[0].labels,
          datasets: _.map(inputDataArray, function(inputData) {
            var color;
            if (singleValue) {
              inputData.values.push(inputData.values[0]);
            }
            if (versusMode) {
              if (index === 0) {
                color = _self.getNegativeColor();
              } else {
                color = _self.getPositiveColor();
              }
            } else {
              color = _self.getColor(index);
            }
            index++;
            return {
              label: inputData.title,
              data: inputData.values,
              fill: isFilled,
              backgroundColor: lightenColor(color, 0.3),
              borderColor: color,
              pointBorderColor: color,
              pointBackgroundColor: color,
              pointHoverBackgroundColor: 'rgb(255,255,255)'
            };
          })
        }
      };
    };
    this.barChart = function(inputData, opts, positivesOnly) {
      var colors, i, index, len, ref, value;
      if (opts == null) {
        opts = {};
      }
      if (positivesOnly == null) {
        positivesOnly = true;
      }
      _self.setTooltipsTextLayout(opts);
      index = 0;
      colors = [];
      ref = inputData.values;
      for (i = 0, len = ref.length; i < len; i++) {
        value = ref[i];
        if (positivesOnly) {
          inputData.values[index] = Math.abs(value);
        }
        colors.push(_self.getColor(index));
        index++;
      }
      return {
        type: 'bar',
        options: opts,
        data: {
          labels: inputData.labels,
          datasets: [
            {
              backgroundColor: colors,
              data: inputData.values
            }
          ]
        }
      };
    };
    this.combinedBarChart = function(inputData, opts, positivesOnly) {
      var index, result;
      if (opts == null) {
        opts = {};
      }
      if (positivesOnly == null) {
        positivesOnly = true;
      }
      _self.setTooltipsTextLayout(opts, true);
      index = 0;
      result = {
        type: 'bar',
        options: opts,
        data: {
          labels: inputData.labels,
          datasets: _.map(inputData.datasets, function(dataset) {
            var color, i, len, ref, value;
            color = _self.getColor(index);
            index++;
            if (positivesOnly) {
              ref = dataset.values;
              for (i = 0, len = ref.length; i < len; i++) {
                value = ref[i];
                value = Math.abs(value);
              }
            }
            return {
              label: dataset.title,
              data: dataset.values,
              backgroundColor: color
            };
          })
        }
      };
      return result;
    };
    this.pieChart = function(inputData, opts, versusMode) {
      var colors, data, i, index, j, len, len1;
      if (opts == null) {
        opts = {};
      }
      if (versusMode == null) {
        versusMode = false;
      }
      _self.setTooltipsTextLayout(opts);
      index = 0;
      colors = [];
      if (versusMode) {
        colors.push(_self.getNegativeColor());
        for (i = 0, len = inputData.length; i < len; i++) {
          data = inputData[i];
          if (index !== 0) {
            colors.push(_self.getPositiveColor());
          }
          index++;
        }
      } else {
        for (j = 0, len1 = inputData.length; j < len1; j++) {
          data = inputData[j];
          colors.push(_self.getColor(index));
          index++;
        }
      }
      return {
        type: 'doughnut',
        options: opts,
        data: {
          datasets: [
            {
              data: _.map(inputData, (function(data) {
                return Math.abs(data.value);
              })),
              backgroundColor: colors
            }
          ],
          labels: _.map(inputData, (function(data) {
            return data.label;
          }))
        }
      };
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.services.dashboards', []).service('ImpacDashboardsSvc', ["$q", "$http", "$log", "$timeout", "ImpacMainSvc", "ImpacRoutes", "ImpacKpisSvc", "ImpacTheming", "ImpacDeveloper", function($q, $http, $log, $timeout, ImpacMainSvc, ImpacRoutes, ImpacKpisSvc, ImpacTheming, ImpacDeveloper) {
    var _self, belongsToCurrentOrganization, needConfigurationLoad, setDefaultCurrentDashboard;
    _self = this;
    this.config = {};
    this.config.dashboards = [];
    this.getDashboards = function() {
      return _self.config.dashboards;
    };
    this.config.currentDashboard = {};
    this.getCurrentDashboard = function() {
      return _self.config.currentDashboard;
    };
    this.config.widgetsTemplates = [];
    this.getWidgetsTemplates = function() {
      return _self.config.widgetsTemplates;
    };
    this.callbacks = {};
    this.callbacks.dashboardChanged = $q.defer();
    this.dashboardChanged = function() {
      return _self.callbacks.dashboardChanged.promise;
    };
    this.callbacks.widgetAdded = $q.defer();
    this.widgetAdded = function() {
      return _self.callbacks.widgetAdded.promise;
    };
    needConfigurationLoad = function() {
      return _.isEmpty(_self.config.dashboards) || _.isEmpty(_self.config.currentDashboard);
    };
    this.isThereADashboard = function() {
      return !_.isEmpty(_self.config.currentDashboard);
    };
    this.areThereSeveralDashboards = function() {
      return _self.config.dashboards.length > 1;
    };
    this.isCurrentDashboardEmpty = function() {
      return _self.isThereADashboard() && _.isEmpty(_self.config.currentDashboard.widgets);
    };
    this.areKpisEnabled = function() {
      return ImpacTheming.get().dhbKpisConfig.enableKpis;
    };
    this.loadLocked = false;
    this.load = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      if (!_self.loadLocked) {
        _self.loadLocked = true;
        deferred = $q.defer();
        if (needConfigurationLoad() || force) {
          ImpacMainSvc.loadOrganizations(force).then(function(success) {
            var orgId;
            orgId = success.currentOrganization.id;
            return $http.get(ImpacRoutes.dashboards.index(orgId)).then(function(dashboards) {
              _self.setDashboards(dashboards.data).then(function() {
                _self.setCurrentDashboard();
                _self.loadLocked = false;
                return deferred.resolve(_self.config);
              });
              return function(error) {
                _self.loadLocked = false;
                return deferred.reject(error);
              };
            }, function(error) {
              $log.error("Impac - DashboardSvc: cannot retrieve dashboards list for org: " + orgId);
              _self.loadLocked = false;
              return deferred.reject(error);
            });
          }, function(error) {
            $log.error("Impac - DashboardSvc: cannot retrieve current organization");
            _self.loadLocked = false;
            return deferred.reject(error);
          });
        } else {
          _self.loadLocked = false;
          deferred.resolve(_self.config);
        }
        return deferred.promise;
      } else {
        $log.warn("ImpacDashboardsSvc.load locked. Trying again in 1s");
        return $timeout((function() {
          return _self.load(force);
        }), 1000);
      }
    };
    setDefaultCurrentDashboard = function() {
      if ((_self.config.dashboards != null) && _self.config.dashboards.length > 0) {
        $log.info("Impac - DashboardSvc: first dashboard set as current by default");
        ImpacMainSvc.override(_self.config.currentDashboard, _self.config.dashboards[0]);
        _self.setWidgetsTemplates(_self.config.currentDashboard.widgets_templates);
        if (_self.areKpisEnabled()) {
          ImpacKpisSvc.initialize(_self.config.currentDashboard);
        }
        _self.initializeActiveTabs();
        _self.callbacks.dashboardChanged.notify(_self.config.currentDashboard);
        return true;
      } else {
        $log.warn("Impac - DashboardSvc: cannot set default current dashboard");
        ImpacMainSvc.override(_self.config.currentDashboard, {});
        _self.callbacks.dashboardChanged.notify(false);
        return false;
      }
    };
    this.setCurrentDashboard = function(id) {
      var fetchedDhb;
      if (id == null) {
        id = null;
      }
      if (id != null) {
        fetchedDhb = _.find(_self.config.dashboards, (function(dhb) {
          return id === dhb.id;
        }));
        if (!_.isEmpty(fetchedDhb)) {
          ImpacMainSvc.override(_self.config.currentDashboard, fetchedDhb);
          _self.setWidgetsTemplates(fetchedDhb.widgets_templates);
          if (_self.areKpisEnabled()) {
            ImpacKpisSvc.initialize(_self.config.currentDashboard);
          }
          _self.initializeActiveTabs();
          _self.callbacks.dashboardChanged.notify(_self.config.currentDashboard);
          return true;
        } else {
          $log.error("Impac - DashboardSvc: dashboard: " + id + " not found in dashboards list");
          return setDefaultCurrentDashboard();
        }
      } else {
        return setDefaultCurrentDashboard();
      }
    };
    belongsToCurrentOrganization = function(dashboard, org) {
      return _.includes(_.pluck(dashboard.data_sources, 'id'), org.id);
    };
    this.setDashboards = function(dashboardsArray) {
      if (dashboardsArray == null) {
        dashboardsArray = [];
      }
      return ImpacMainSvc.loadOrganizations().then(function(config) {
        var curOrg, dhb, i, len, results;
        curOrg = config.currentOrganization;
        _.remove(_self.config.dashboards, (function() {
          return true;
        }));
        results = [];
        for (i = 0, len = dashboardsArray.length; i < len; i++) {
          dhb = dashboardsArray[i];
          if (belongsToCurrentOrganization(dhb, curOrg)) {
            results.push(_self.config.dashboards.push(dhb));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }, function(error) {
        return $log.error("Impac - DashboardSvc: Cannot load user's organizations");
      });
    };
    this.setWidgetsTemplates = function(templatesArray) {
      var i, len, template;
      if (_.isEmpty(templatesArray) || !_.isEmpty(_self.config.widgetsTemplates)) {
        return false;
      }
      if (ImpacDeveloper.isEnabled()) {
        templatesArray = ImpacDeveloper.stubWidgetsTemplates(templatesArray);
      }
      for (i = 0, len = templatesArray.length; i < len; i++) {
        template = templatesArray[i];
        _self.config.widgetsTemplates.push(template);
      }
      return true;
    };
    this.initializeActiveTabs = function() {
      var dhb, i, len, ref, results;
      ref = _self.config.dashboards;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        dhb = ref[i];
        results.push(_.merge(dhb, {
          active: _self.config.currentDashboard.id === dhb.id
        }));
      }
      return results;
    };
    this.create = function(dashboard) {
      return _self.load().then(function() {
        var data, deferred, org;
        deferred = $q.defer();
        org = ImpacMainSvc.config.currentOrganization;
        if (dashboard.currency == null) {
          dashboard.currency = org.currency || 'USD';
        }
        data = {
          dashboard: dashboard
        };
        $http.post(ImpacRoutes.dashboards.create(org.id), data).then(function(success) {
          _self.config.dashboards.push(success.data);
          _self.setCurrentDashboard(success.data.id);
          return deferred.resolve(success.data);
        }, function(error) {
          $log.error("Impac - DashboardSvc: cannot create dashboard with parameters: " + (angular.toJson(dashboard)), error);
          return deferred.reject(error);
        });
        return deferred.promise;
      });
    };
    this["delete"] = function(id) {
      var deferred;
      deferred = $q.defer();
      $http["delete"](ImpacRoutes.dashboards["delete"](id)).then(function(success) {
        _.remove(_self.config.dashboards, function(dhb) {
          return id === dhb.id;
        });
        _self.setCurrentDashboard();
        return deferred.resolve(success);
      }, function(error) {
        $log.error("Impac - DashboardSvc: cannot delete dashboard: " + id);
        return deferred.reject(error);
      });
      return deferred.promise;
    };
    this.update = function(id, opts) {
      var data, deferred;
      deferred = $q.defer();
      data = {
        dashboard: opts
      };
      $http.put(ImpacRoutes.dashboards.update(id), data).then(function(success) {
        angular.merge(_.find(_self.config.dashboards, function(dhb) {
          return id === dhb.id;
        }), success.data);
        if (id === _self.config.currentDashboard.id) {
          angular.merge(_self.config.currentDashboard, success.data);
        }
        return deferred.resolve(success.data);
      }, function(error) {
        $log.error("Impac - DashboardSvc: cannot update dashboard: " + id + " with parameters: " + opts);
        return deferred.reject(error);
      });
      return deferred.promise;
    };
    return _self;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.developer', []).provider('ImpacDeveloper', function() {
    var _$get, developer, provider;
    provider = this;
    developer = {
      status: false,
      widgetsTemplates: []
    };
    provider.configure = function(options) {
      return angular.extend(developer, options);
    };
    _$get = function($q) {
      var WIDGET, service;
      WIDGET = {
        widget_category: 'path',
        category: 'path'
      };
      service = this;
      service.isEnabled = function() {
        return developer.status;
      };
      service.stubWidgetsTemplates = function(templates) {
        return templates.concat(developer.widgetsTemplates);
      };
      service.findTemplate = function(widget, keys, metadataKeys) {
        var match;
        if (keys == null) {
          keys = ['path', 'metadata'];
        }
        if (metadataKeys == null) {
          metadataKeys = ['template'];
        }
        match = _.mapKeys(widget, function(val, key) {
          if (WIDGET[key] != null) {
            return WIDGET[key];
          } else {
            return key;
          }
        });
        if (match.metadata) {
          match.metadata = _.pick(match.metadata, metadataKeys);
        }
        return _.find(developer.widgetsTemplates, function(t) {
          return _.isEqual(_.pick(match, keys), _.pick(t, keys));
        });
      };
      service.isWidgetStubbed = function(widget) {
        return !_.isEmpty(service.findTemplate(widget));
      };
      service.createWidgetStub = function(widget, currentDhb) {
        var template;
        template = angular.copy(service.findTemplate(widget));
        return $q.resolve({
          data: {
            id: Math.random().toString(36).substr(2, 9) + '-stubbed',
            name: template.name,
            category: template.path,
            width: template.width,
            metadata: angular.merge(template.metadata, {
              organization_ids: _.map(currentDhb.data_sources, function(s) {
                return s.uid;
              }),
              currency: currentDhb.currency
            })
          }
        });
      };
      service.updateWidgetStub = function(widget, data) {
        var template;
        template = angular.copy(service.findTemplate(widget));
        angular.merge(data.metadata, template.metadata);
        return $q.resolve({
          data: data
        });
      };
      service.deleteWidgetStub = function() {
        return $q.resolve({
          success: true
        });
      };
      return service;
    };
    _$get.$inject = ['$q'];
    provider.$get = _$get;
    return provider;
  });

}).call(this);

(function() {
  angular.module('impac.services.kpis', []).service('ImpacKpisSvc', ["$log", "$http", "$filter", "$q", "ImpacRoutes", "ImpacMainSvc", function($log, $http, $filter, $q, ImpacRoutes, ImpacMainSvc) {
    var _self, formatShowQuery, index, isDeveloper, isInitialized;
    _self = this;
    this.config = {};
    this.config.ssoSessionId = "";
    this.getSsoSessionId = function() {
      return _self.config.ssoSessionId;
    };
    this.config.kpisTemplates = [];
    this.getKpisTemplates = function() {
      return _self.config.kpisTemplates;
    };
    this.config.currentDashboardId = "";
    this.getCurrentDashboardId = function() {
      return _self.config.currentDashboardId;
    };
    formatShowQuery = function(basePath, endpoint, watchable, params) {
      var baseUrl, url;
      baseUrl = [basePath, endpoint, watchable].join('/');
      url = [baseUrl, decodeURIComponent($.param(params))].join('?');
      return url;
    };
    isInitialized = function() {
      return !(_.isEmpty(_self.config.ssoSessionId || _.isEmpty(_self.config.kpisTemplates || _.isEmpty(_self.config.currentDashboardId))));
    };
    isDeveloper = function() {
      var basicAuth;
      basicAuth = $http.defaults.headers.common.Authorization;
      return basicAuth && typeof basicAuth === 'string' && basicAuth.length;
    };
    this.load = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      deferred = $q.defer();
      if (_.isEmpty(_self.config.ssoSessionId) || force) {
        ImpacMainSvc.loadUserData(force).then(function(mainConfig) {
          _self.config.ssoSessionId = mainConfig.sso_session;
          return deferred.resolve(_self.config);
        }, function(error) {
          return deferred.reject(error);
        });
      } else {
        deferred.resolve(_self.config);
      }
      return deferred.promise;
    };
    this.initialize = function(dashboard) {
      return _self.load().then(function() {
        var orgUids, params, promises;
        _self.config.currentDashboardId = dashboard.id;
        orgUids = _.pluck(dashboard.data_sources, 'uid');
        params = {};
        params.metadata = {
          organization_ids: orgUids
        };
        if (_self.config.ssoSessionId) {
          params.metadata.sso_session = _self.config.ssoSessionId;
        }
        promises = {
          impac: index(params)
        };
        if (ImpacRoutes.kpis.local()) {
          promises.local = $http.get(ImpacRoutes.kpis.local());
        }
        return $q.all(promises).then(function(response) {
          var i, j, len, len1, ref, ref1, results, template;
          _.remove(_self.config.kpisTemplates, (function() {
            return true;
          }));
          ref = response.impac.data.kpis;
          for (i = 0, len = ref.length; i < len; i++) {
            template = ref[i];
            template.source || (template.source = 'impac');
            _self.config.kpisTemplates.push(template);
          }
          if (response.local) {
            ref1 = response.local.data.kpis;
            results = [];
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              template = ref1[j];
              template.source = 'local';
              results.push(_self.config.kpisTemplates.push(template));
            }
            return results;
          }
        }, function(error) {
          return $log.error('ImpacKpisSvc - cannot retrieve kpis templates list', error);
        });
      });
    };
    index = function(params) {
      var host, url;
      host = ImpacRoutes.kpis.index();
      url = [host, decodeURIComponent($.param(params))].join('?');
      return $http.get(url);
    };
    this.show = function(kpi) {
      var deferred, host, params, url;
      deferred = $q.defer();
      if (!(isInitialized() || isDeveloper())) {
        $log.error('ImpacKpisSvc - Service not initialized');
        deferred.reject({
          error: {
            message: 'ImpacKpisSvc is not initialized'
          }
        });
      } else {
        params = {};
        if (_self.config.ssoSessionId) {
          params.sso_session = _self.config.ssoSessionId;
        }
        if (kpi.targets != null) {
          params.targets = kpi.targets;
        }
        if (kpi.settings != null) {
          params.metadata = kpi.settings;
        }
        if (kpi.extra_params != null) {
          params.extra_params = kpi.extra_params;
        }
        switch (kpi.source) {
          case 'impac':
            host = ImpacRoutes.kpis.show(_self.config.currentDashboardId, kpi.id);
            break;
          case 'local':
            host = ImpacRoutes.kpis.local();
        }
        url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params);
        $http.get(url).then(function(response) {
          var missingParams, updatedConfig;
          kpi.data || (kpi.data = {});
          angular.extend(kpi.data, _.pick(response.data.kpi, ['value', 'unit', 'results']));
          updatedConfig = response.data.kpi.configuration || {};
          missingParams = _.select(['targets', 'extra_params'], (function(param) {
            return (kpi[param] == null) && (updatedConfig[param] != null);
          }));
          angular.extend(kpi, _.pick(updatedConfig, missingParams));
          return deferred.resolve(kpi);
        }, function(err) {
          $log.error('impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err);
          return deferred.reject(err);
        });
      }
      return deferred.promise;
    };
    this.create = function(source, endpoint, elementWatched) {
      var deferred, params, url;
      deferred = $q.defer();
      if (!(isInitialized() || isDeveloper())) {
        deferred.reject({
          error: {
            message: 'ImpacKpisSvc is not initialized'
          }
        });
      } else {
        params = {
          source: source,
          endpoint: endpoint,
          element_watched: elementWatched
        };
        url = ImpacRoutes.kpis.create(_self.config.currentDashboardId);
        $http.post(url, {
          kpi: params
        }).then(function(success) {
          return deferred.resolve(success.data);
        }, function(err) {
          return deferred.reject(err);
        });
      }
      return deferred.promise;
    };
    this.update = function(kpi, params) {
      var deferred, filtered_params, url;
      deferred = $q.defer();
      filtered_params = {};
      if (params.name != null) {
        filtered_params.name = params.name;
      }
      if (params.metadata != null) {
        filtered_params.settings = params.metadata;
      }
      if (params.targets != null) {
        filtered_params.targets = params.targets;
      }
      if (params.extra_params != null) {
        filtered_params.extra_params = params.extra_params;
      }
      url = ImpacRoutes.kpis.update(_self.config.currentDashboardId, kpi.id);
      if (!_.isEmpty(filtered_params)) {
        $http.put(url, {
          kpi: params
        }).then(function(success) {
          angular.extend(kpi, success.data);
          _self.show(kpi);
          return deferred.resolve(kpi);
        }, function(err) {
          $log.error('impac-angular ERROR: Unable to update KPI ', err);
          return deferred.reject(err);
        });
      }
      return deferred.promise;
    };
    this["delete"] = function(kpi) {
      var deferred, url;
      deferred = $q.defer();
      url = ImpacRoutes.kpis["delete"](_self.config.currentDashboardId, kpi.id);
      $http["delete"](url).then(function(success) {
        return deferred.resolve(success);
      }, function(err) {
        return deferred.reject(err);
      });
      return deferred.promise;
    };
    return this;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.linking', []).provider('ImpacLinking', function() {
    var _$get, links, provider;
    provider = this;
    links = {
      user: null,
      organizations: null
    };
    provider.linkData = function(configData) {
      return _.forIn(links, function(value, key) {
        var link;
        link = configData[key];
        if (link == null) {
          throw new Error("impac-angular linking.svc: Missing core data (" + key + ") to run impac-angular.");
        }
        if (typeof link !== 'function') {
          throw new TypeError("impac-angular linking.svc: " + key + " should be a Function.");
        }
        return links[key] = link;
      });
    };
    _$get = function($q) {
      var service;
      service = this;
      service.getUserData = function() {
        return links.user().then(function(success) {
          return success;
        }, function(err) {
          return $q.reject(err);
        });
      };
      service.getOrganizations = function() {
        return links.organizations().then(function(success) {
          return success;
        }, function(err) {
          return $q.reject(err);
        });
      };
      return service;
    };
    _$get.$inject = ['$q'];
    provider.$get = _$get;
    return provider;
  });

}).call(this);

(function() {
  angular.module('impac.services.main', []).service('ImpacMainSvc', ["$q", "$log", "ImpacLinking", function($q, $log, ImpacLinking) {
    var _self, isConfigurationLoaded, setDefaultCurrentOrganization;
    _self = this;
    this.config = {};
    this.config.organizations = [];
    this.config.currentOrganization = {};
    this.config.userData = {};
    this.config.currencies = ["USD", "AUD", "CAD", "CNY", "EUR", "GBP", "HKD", "INR", "JPY", "NZD", "SGD", "PHP", "AED", "IDR"];
    isConfigurationLoaded = function() {
      return !(_.isEmpty(_self.config.organizations) || _.isEmpty(_self.config.currentOrganization || _.isEmpty(_self.config.userData)));
    };
    this.load = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      deferred = $q.defer();
      if (!isConfigurationLoaded() || force) {
        $q.all([_self.loadOrganizations(force), _self.loadUserData(force)]).then(function(results) {
          return deferred.resolve(_self.config);
        }, function(error) {
          $log.error("ImpacMainSvc: failed to load configuration");
          return deferred.reject(error);
        });
      } else {
        deferred.resolve(_self.config);
      }
      return deferred.promise;
    };
    this.loadOrganizations = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      deferred = $q.defer();
      if (_.isEmpty(_self.config.organizations) || _.isEmpty(_self.config.currentOrganization) || force) {
        ImpacLinking.getOrganizations().then(function(success) {
          if ((success.organizations != null) && success.organizations.length > 0) {
            _self.config.organizations = success.organizations;
            _self.setCurrentOrganization(success.currentOrgId);
          } else {
            _self.config.organizations = [];
            _self.config.currentOrganization = {};
            $log.info("ImpacMainSvc: retrieved empty organizations list");
          }
          return deferred.resolve(_self.config);
        }, function(error) {
          $log.error("ImpacMainSvc: cannot set organization: " + id + " as currentOrganization");
          return deferred.reject(error);
        });
      } else {
        deferred.resolve(_self.config);
      }
      return deferred.promise;
    };
    setDefaultCurrentOrganization = function() {
      if ((_self.config.organizations != null) && _self.config.organizations.length > 0) {
        _self.config.currentOrganization = _self.config.organizations[0];
        $log.info("ImpacMainSvc: first organization set as current by default");
        return true;
      } else {
        _self.config.currentOrganization = {};
        $log.error("ImpacMainSvc: cannot set default current organization");
        return {
          error: {
            code: 400,
            message: "cannot set default current organization"
          }
        };
      }
    };
    this.setCurrentOrganization = function(id) {
      var fetchedOrg;
      if (id == null) {
        id = null;
      }
      if (id != null) {
        fetchedOrg = _.find(_self.config.organizations, (function(org) {
          return id === org.id;
        }));
        if (!_.isEmpty(fetchedOrg)) {
          _self.config.currentOrganization = fetchedOrg;
          return true;
        } else {
          $log.error("ImpacMainSvc: organization: " + id + " not found in organizations list");
          return setDefaultCurrentOrganization();
        }
      } else {
        return setDefaultCurrentOrganization();
      }
    };
    this.loadUserData = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      deferred = $q.defer();
      if (_.isEmpty(_self.config.userData) || force) {
        ImpacLinking.getUserData().then(function(user) {
          angular.extend(_self.config.userData, user);
          return deferred.resolve(_self.config.userData);
        }, function(error) {
          $log.error('ImpacMainSvc: cannot retrieve user data');
          return deferred.reject(error);
        });
      } else {
        deferred.resolve(_self.config.userData);
      }
      return deferred.promise;
    };
    this.override = function(src, dst) {
      var key, value;
      for (key in src) {
        value = src[key];
        delete src[key];
      }
      for (key in dst) {
        value = dst[key];
        src[key] = value;
      }
      return src;
    };
    return _self;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.message-bus', []).service('MsgBus', function() {
    var msgBusData;
    msgBusData = {
      dashboardGrid: {},
      controlBarFilter: {},
      controlBarQuickFilter: {},
      orgaSharingModal: {},
      appConnectModal: {},
      page: {},
      pane: {},
      errors: [],
      autostopQueue: [],
      notificationQueue: [],
      params: {}
    };
    this.publish = function(name, object) {
      return msgBusData[name] = object;
    };
    this.subscribe = function(name) {
      return function() {
        return msgBusData[name];
      };
    };
  });

}).call(this);

(function() {
  angular.module('impac.services.routes', []).provider('ImpacRoutes', function() {
    var _$get, defaults, provider;
    provider = this;
    defaults = {
      mnoHub: '/api/v2',
      impacPrefix: '/impac',
      impacApi: 'http://localhost:4000/api',
      dashboards: {
        index: null,
        show: null,
        create: null,
        update: null,
        del: null
      },
      widgets: {
        index: null,
        show: null,
        create: null,
        update: null,
        del: null,
        suggest: null
      },
      kpis: {
        index: null,
        show: null,
        create: null,
        update: null,
        del: null,
        local: null
      },
      organizations: {
        appInstancesSync: null
      }
    };
    provider.configureRoutes = function(configOptions) {
      return angular.extend(defaults, configOptions);
    };
    _$get = function() {
      var service;
      service = this;
      service.dashboards = {
        index: function(orgId) {
          if (orgId == null) {
            orgId = null;
          }
          if (defaults.dashboards.index) {
            return defaults.dashboards.index.replace(':organization_id', orgId);
          } else {
            return "" + defaults.mnoHub + defaults.impacPrefix + "/dashboards";
          }
        },
        create: function(orgId) {
          if (orgId == null) {
            orgId = null;
          }
          if (defaults.dashboards.create) {
            return defaults.dashboards.create.replace(':organization_id', orgId);
          } else {
            return service.dashboards.index(orgId);
          }
        },
        show: function(id) {
          if (defaults.dashboards.show) {
            return defaults.dashboards.show.replace(':id', id);
          } else {
            return "" + defaults.mnoHub + defaults.impacPrefix + "/dashboards/" + id;
          }
        },
        update: function(id) {
          if (defaults.dashboards.update) {
            return defaults.dashboards.update.replace(':id', id);
          } else {
            return service.dashboards.show(id);
          }
        },
        "delete": function(id) {
          if (defaults.dashboards.del) {
            return defaults.dashboards.del.replace(':id', id);
          } else {
            return service.dashboards.show(id);
          }
        }
      };
      service.widgets = {
        index: function(dashboard_id) {
          if (defaults.widgets.index) {
            return defaults.widgets.index.replace(':dashboard_id', dashboard_id);
          } else {
            return (service.dashboards.show(dashboard_id)) + "/widgets";
          }
        },
        show: function(dashboard_id, id) {
          if (defaults.widgets.show) {
            return defaults.widgets.show.replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return defaults.impacApi + "/v1/get_widget";
          }
        },
        create: function(dashboard_id) {
          if (defaults.widgets.create) {
            return defaults.widgets.create.replace(':dashboard_id', dashboard_id);
          } else {
            return service.widgets.index(dashboard_id);
          }
        },
        update: function(dashboard_id, id) {
          if (defaults.widgets.update) {
            return defaults.widgets.update.replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return (service.widgets.index(dashboard_id)) + "/" + id;
          }
        },
        "delete": function(dashboard_id, id) {
          if (defaults.widgets.del) {
            return defaults.widgets.del.replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return (service.widgets.index(dashboard_id)) + "/" + id;
          }
        },
        suggest: function() {
          return defaults.widgets.suggest;
        }
      };
      service.kpis = {
        index: function(dashboard_id) {
          if (defaults.kpis.index) {
            return defaults.kpis.index.replace(':dashboard_id', dashboard_id);
          } else {
            return defaults.impacApi + "/v2/kpis";
          }
        },
        show: function(dashboard_id, id) {
          if (defaults.kpis.show) {
            return defaults.kpis.show.replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return defaults.impacApi + "/v2/kpis";
          }
        },
        create: function(dashboard_id) {
          if (defaults.kpis.create) {
            return defaults.kpis.create.replace(':dashboard_id', dashboard_id);
          } else {
            return (service.dashboards.show(dashboard_id)) + "/kpis";
          }
        },
        update: function(dashboard_id, id) {
          if (defaults.kpis.update) {
            return defaults.kpis.update.replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return (service.kpis.create(dashboard_id)) + "/" + id;
          }
        },
        "delete": function(dashboard_id, id) {
          if (defaults.kpis.del) {
            return defaults.kpis.del.replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return (service.kpis.create(dashboard_id)) + "/" + id;
          }
        },
        local: function() {
          return defaults.kpis.local;
        }
      };
      service.organizations = {
        appInstancesSync: function(uid) {
          if (defaults.organizations.appInstancesSync) {
            return defaults.organizations.appInstancesSync.replace(':uid', uid);
          } else {
            return defaults.mnoHub + "/organizations/" + uid + "/app_instances_sync";
          }
        }
      };
      return service;
    };
    _$get.$inject = [];
    provider.$get = _$get;
    return provider;
  });

}).call(this);

(function() {
  angular.module('impac.services.theming', []).provider('ImpacTheming', function() {
    var _$get, options, provider;
    provider = this;
    options = {
      chartColors: {
        positive: '#3FC4FF',
        negative: '#1DE9B6',
        array: ["#1de9b6", "#7c4dff", "#ffc928", "#3fc4ff", "#ff8e01", "#c6ff00", "#d500fa", "#ff6e41", "#ffeb3c", "#ff1844"]
      },
      dhbConfig: {
        showDhbHeading: false,
        dhbHeadingText: 'Impac!'
      },
      dhbSelectorConfig: {
        selectorType: 'dropdown',
        customTmplPath: null,
        accessibilityEnabled: false,
        addWidgetEnabled: true,
        addDhbEnabled: true,
        deleteDhbEnabled: true
      },
      dhbKpisConfig: {
        enableKpis: false,
        parentElementId: ''
      },
      dataNotFoundConfig: {
        mainMessage: 'Data not found',
        linkMessage: 'Are you missing an app?',
        linkUrl: '/apps',
        linkTarget: '_blank',
        linkUrlCallback: null
      },
      dhbErrorsConfig: {
        firstTimeCreated: {
          first: 'It\'s time to add a reporting dashboard!',
          second: 'In 2 clicks, you\'ll be able to visualize how your business is performing.',
          note: 'Note: dashboards you create will only be accessible by you. Dashboard sharing across users will be added soon.'
        },
        empty: {
          first: 'Now it\'s time to select the metrics you want to see!',
          second: 'Add widgets to your dashboard to help make an Impac!™ to your business.'
        }
      },
      dhbSubMenuConfig: {
        myobMessage: {
          show: true,
          appLink: {
            show: true,
            url: '#/marketplace',
            text: '>> Check this app on our marketplace'
          }
        }
      },
      widgetSelectorConfig: {
        path: null
      },
      addChartTile: {
        show: false,
        onClickOptions: {
          triggers: []
        }
      },
      showNoWidgetMsg: {
        show: true
      },
      dhbSettings: {
        inWidgetsContainer: false,
        showSyncApps: function() {
          return true;
        },
        currency: {
          locked: false
        }
      }
    };
    provider.configure = function(configOptions) {
      return angular.merge(options, configOptions);
    };
    _$get = function() {
      var service;
      service = this;
      service.get = function() {
        return options;
      };
      return service;
    };
    _$get.$inject = [];
    provider.$get = _$get;
    return provider;
  });

}).call(this);

(function() {
  angular.module('impac.services.utilities', []).service('ImpacUtilities', ["$window", function($window) {
    var _, moment;
    _ = $window._;
    moment = $window.moment;
    this.getDatesRange = function(dates, excludeToday) {
      var maxDate, minDate;
      if (excludeToday == null) {
        excludeToday = false;
      }
      if (!(dates && dates.length)) {
        return [];
      }
      if (!excludeToday) {
        dates = dates.concat([], moment().toDate());
      }
      minDate = _.min(_.map(dates, function(d) {
        return moment(d);
      }));
      maxDate = _.max(_.map(dates, function(d) {
        return moment(d);
      }));
      return [minDate.startOf('day').toDate(), maxDate.startOf('day').toDate()];
    };
    this.processRailsError = function(error) {
      var messages;
      messages = [];
      if (error.status && error.status === 401) {
        messages.push("Sorry! You are not authorized to perform this action");
      } else {
        if (error.data && error.data !== " ") {
          if (angular.isArray(error.data)) {
            _.each(error.data, function(errorMessage) {
              var capitalizedError;
              capitalizedError = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
              return messages.push("" + capitalizedError);
            });
          } else if (angular.isObject(error.data)) {
            _.each(error.data, function(attrErrors, attribute) {
              var capitalizedAttr;
              capitalizedAttr = (attribute.charAt(0).toUpperCase() + attribute.slice(1)).replace('_', ' ');
              if (angular.isArray(attrErrors)) {
                return _.each(attrErrors, function(attrError) {
                  if (capitalizedAttr.match(/base/i)) {
                    return messages.push(attrError);
                  } else {
                    return messages.push(capitalizedAttr + " " + attrError);
                  }
                });
              } else {
                if (capitalizedAttr.match(/base/i)) {
                  return messages.push(attrErrors);
                } else {
                  return messages.push(capitalizedAttr + " " + attrErrors);
                }
              }
            });
          } else if (angular.isString(error.data)) {
            messages.push(error.data);
          } else {
            messages.push("Potentially a system or communication error. Please retry later.");
          }
        } else {
          messages.push("Potentially a system or communication error. Please retry later.");
        }
      }
      return messages;
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.services.widgets', []).service('ImpacWidgetsSvc', ["$q", "$http", "$log", "ImpacRoutes", "ImpacMainSvc", "ImpacDashboardsSvc", "ImpacDeveloper", function($q, $http, $log, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper) {
    var _self, isWidgetInCurrentDashboard;
    _self = this;
    this.config = {};
    this.config.ssoSessionId = "";
    this.load = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      deferred = $q.defer();
      if (_.isEmpty(_self.config.ssoSessionId) || force) {
        $q.all([ImpacMainSvc.loadUserData(force), ImpacDashboardsSvc.load(force)]).then(function(results) {
          _self.config.ssoSessionId = results[0].sso_session;
          return deferred.resolve(_self.config);
        }, function(error) {
          return deferred.reject(error);
        });
      } else {
        deferred.resolve(_self.config);
      }
      return deferred.promise;
    };
    this.create = function(opts) {
      var deferred;
      deferred = $q.defer();
      _self.load().then(function(config) {
        var dashboard, data, request;
        dashboard = ImpacDashboardsSvc.getCurrentDashboard();
        data = {
          widget: opts
        };
        if (ImpacDeveloper.isWidgetStubbed(data.widget)) {
          request = ImpacDeveloper.createWidgetStub(data.widget, dashboard);
        } else {
          request = $http.post(ImpacRoutes.widgets.create(dashboard.id), data);
        }
        return request.then(function(success) {
          var newWidget;
          newWidget = success.data;
          dashboard.widgets.push(newWidget);
          ImpacDashboardsSvc.callbacks.widgetAdded.notify(newWidget);
          return deferred.resolve(newWidget);
        }, function(error) {
          $log.error("ImpacWidgetsSvc: cannot create widget on dashboard " + dashboard.id);
          return deferred.reject(error);
        });
      }, function(error) {
        $log.error("ImpacWidgetsSvc: error while trying to load the service");
        return deferred.reject(error);
      });
      return deferred.promise;
    };
    isWidgetInCurrentDashboard = function(widgetId) {
      var currentDhb;
      currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
      if (_.isEmpty(currentDhb) || _.isEmpty(currentDhb.widgets)) {
        return false;
      }
      return _.contains(_.pluck(currentDhb.widgets, 'id'), widgetId);
    };
    this.initWidgetSettings = function(w) {
      var i, len, ref, setting;
      w.isEditMode = false;
      if (_.isEmpty(w.settings)) {
        return;
      }
      ref = w.settings;
      for (i = 0, len = ref.length; i < len; i++) {
        setting = ref[i];
        setting.initialize();
      }
      return true;
    };
    this.updateWidgetSettings = function(widget, needContentReload) {
      var meta;
      if (needContentReload == null) {
        needContentReload = true;
      }
      widget.isEditMode = false;
      if (_.isEmpty(widget.settings)) {
        $log.warn("ImpacWidgetsSvc: Tried to update widget: " + widget.id + " with no settings", widget);
        return false;
      }
      if (needContentReload) {
        widget.isLoading = true;
      }
      meta = _.reduce(_.map(widget.settings, function(set) {
        return set.toMetadata();
      }), function(result, setMeta) {
        return angular.merge(result, setMeta);
      });
      return _self.update(widget, {
        metadata: meta
      }).then(function(updatedWidget) {
        if (needContentReload) {
          return _self.show(updatedWidget)["finally"](function() {
            return updatedWidget.isLoading = false;
          });
        }
      });
    };
    this.massAssignAll = function(metadata) {
      if (!_.isEmpty(metadata)) {
        return _self.load().then(function() {
          var currentDhb, i, len, newMetadata, promises, ref, widget;
          currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
          promises = [];
          if ((currentDhb != null) && (currentDhb.widgets != null)) {
            if (!_.isEmpty(currentDhb.widgets)) {
              ref = currentDhb.widgets;
              for (i = 0, len = ref.length; i < len; i++) {
                widget = ref[i];
                newMetadata = angular.merge({}, widget.metadata, metadata);
                if (!_.isEqual(widget.metadata, newMetadata)) {
                  promises.push(_self.update(widget, {
                    metadata: newMetadata
                  }).then(function(updatedWidget) {
                    updatedWidget.isLoading = true;
                    return _self.show(updatedWidget).then(function(renderedWidget) {
                      return renderedWidget.isLoading = false;
                    });
                  }));
                }
              }
              return $q.all(promises);
            } else {
              return $q.resolve([]);
            }
          } else {
            $log.error("ImpacWidgetsSvc - currentDhb.widgets is null", currentDhb);
            return $q.reject(null);
          }
        });
      }
    };
    this.refreshAll = function() {
      return ImpacDashboardsSvc.load().then(function(config) {
        var widgets;
        widgets = config.currentDashboard.widgets;
        return _.forEach(widgets, function(w) {
          w.isLoading || (w.isLoading = true);
          return _self.show(w, true).then(function(updatedWidget) {
            return w.isLoading = false;
          }, function(errorResponse) {
            w.isLoading = false;
            if ((errorResponse.data != null) && errorResponse.data.error) {
              return $log.error(errorResponse.data.error);
            }
          });
        });
      });
    };
    this.show = function(widget, refreshCache) {
      var deferred;
      if (refreshCache == null) {
        refreshCache = false;
      }
      deferred = $q.defer();
      _self.load().then(function(config) {
        var dashboard, data;
        if (!isWidgetInCurrentDashboard(widget.id)) {
          $log.info("ImpacWidgetsSvc: trying to load a widget (id: " + widget.id + ") that is not in currentDashboard");
          return deferred.reject("trying to load a widget (id: " + widget.id + ") that is not in currentDashboard");
        } else {
          data = {
            owner: widget.owner,
            sso_session: _self.config.ssoSessionId,
            metadata: widget.metadata,
            engine: widget.category
          };
          if (refreshCache) {
            angular.extend(data, {
              refresh_cache: true
            });
          }
          dashboard = ImpacDashboardsSvc.getCurrentDashboard();
          return $http.post(ImpacRoutes.widgets.show(dashboard.id, widget.id), data).then(function(success) {
            var content, i, len, name, ref, setting;
            content = success.data.content || {};
            name = success.data.name;
            angular.extend(widget, {
              content: content,
              originalName: name
            });
            if (angular.isDefined(widget.initContext)) {
              widget.initContext();
            }
            ref = widget.settings;
            for (i = 0, len = ref.length; i < len; i++) {
              setting = ref[i];
              if (angular.isDefined(setting.initialize)) {
                setting.initialize();
              }
            }
            if (angular.isDefined(widget.format)) {
              widget.format();
            }
            return deferred.resolve(widget);
          }, function(errorResponse) {
            var i, len, ref, setting;
            if (angular.isDefined(widget.initContext)) {
              widget.initContext();
            }
            ref = widget.settings;
            for (i = 0, len = ref.length; i < len; i++) {
              setting = ref[i];
              if (angular.isDefined(setting.initialize)) {
                setting.initialize();
              }
            }
            if (angular.isDefined(widget.processError) && (errorResponse.data != null) && errorResponse.data.error) {
              widget.processError(errorResponse.data.error);
            }
            return deferred.reject(errorResponse);
          });
        }
      }, function(error) {
        $log.error("ImpacWidgetsSvc: error while trying to load the service");
        return deferred.reject(error);
      });
      return deferred.promise;
    };
    this.update = function(widget, opts) {
      var dashboard, data, deferred, request;
      deferred = $q.defer();
      _self.load().then(function(config) {}, !isWidgetInCurrentDashboard(widget.id) ? ($log.info("ImpacWidgetsSvc: trying to update a widget (id: " + widget.id + ") that is not in currentDashboard"), deferred.reject("trying to update a widget (id: " + widget.id + ") that is not in currentDashboard")) : (data = {
        widget: opts
      }, dashboard = ImpacDashboardsSvc.getCurrentDashboard(), ImpacDeveloper.isWidgetStubbed(widget) ? request = ImpacDeveloper.updateWidgetStub(widget, data.widget) : request = $http.put(ImpacRoutes.widgets.update(dashboard.id, widget.id), data), request.then(function(success) {
        angular.extend(widget, success.data);
        return deferred.resolve(widget);
      }, function(error) {
        $log.error("ImpacWidgetsSvc: cannot update widget: " + widget.id);
        return deferred.reject(error);
      })), function(error) {
        $log.error("ImpacWidgetsSvc: error while trying to load the service");
        return deferred.reject(error);
      });
      return deferred.promise;
    };
    this["delete"] = function(widgetToDelete) {
      var deferred;
      deferred = $q.defer();
      _self.load().then(function(config) {
        var dashboard, request;
        dashboard = ImpacDashboardsSvc.getCurrentDashboard();
        if (ImpacDeveloper.isWidgetStubbed(widgetToDelete)) {
          request = ImpacDeveloper.deleteWidgetStub(widgetToDelete);
        } else {
          request = $http["delete"](ImpacRoutes.widgets["delete"](dashboard.id, widgetToDelete.id));
        }
        return request.then(function(success) {
          _.remove(dashboard.widgets, function(widget) {
            return widget.id === widgetToDelete.id;
          });
          return deferred.resolve(success);
        }, function(error) {
          $log.error("ImpacWidgetsSvc: error while trying to delete widget: " + widgetToDelete.id);
          return deferred.reject(error);
        });
      }, function(error) {
        $log.error("ImpacWidgetsSvc: error while trying to load the service");
        return deferred.reject(error);
      });
      return deferred.promise;
    };
    return _self;
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.dashboard-settings.currency', []);

  module.directive('dashboardSettingCurrency', ["$templateCache", "$log", "ImpacMainSvc", "ImpacDashboardsSvc", "ImpacWidgetsSvc", "ImpacTheming", function($templateCache, $log, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, ImpacTheming) {
    return {
      restrict: 'A',
      scope: {
        currency: '='
      },
      link: function(scope, element, attrs) {
        scope.locked = ImpacTheming.get().dhbSettings.currency.locked;
        ImpacMainSvc.load().then(function(mainConfig) {
          return ImpacDashboardsSvc.load().then(function() {
            scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
            return scope.currencies = mainConfig.currencies;
          });
        });
        return scope.massAssignCurrency = function() {
          var data;
          data = {
            currency: scope.currency
          };
          ImpacDashboardsSvc.update(scope.currentDhb.id, data);
          return ImpacWidgetsSvc.massAssignAll(data);
        };
      },
      template: $templateCache.get('dashboard-settings/currency.tmpl.html')
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.dashboard-settings.sync-apps', []);

  module.directive('dashboardSettingSyncApps', ["$templateCache", "$log", "$http", "$filter", "$modal", "ImpacMainSvc", "ImpacRoutes", "ImpacWidgetsSvc", "ImpacTheming", "poller", "$timeout", function($templateCache, $log, $http, $filter, $modal, ImpacMainSvc, ImpacRoutes, ImpacWidgetsSvc, ImpacTheming, poller, $timeout) {
    return {
      restrict: 'A',
      scope: {},
      template: $templateCache.get('dashboard-settings/sync-apps.tmpl.html'),
      link: function(scope, element, attrs) {
        var getOffset, processAppInstancesSync, refreshDashboard;
        scope.isSyncing = false;
        scope.hasConnectors = false;
        processAppInstancesSync = function(responseData) {
          var c, i, len, ref;
          scope.isSyncing = responseData.is_syncing;
          scope.hasConnectors = responseData.connectors && responseData.connectors.length > 0;
          if (scope.hasConnectors) {
            scope.lastConnector = responseData.connectors[0];
            scope.otherConnectors = _.slice(responseData.connectors, 1);
            scope.failedConnectors = [];
            scope.disconnectedConnectors = [];
            ref = responseData.connectors;
            for (i = 0, len = ref.length; i < len; i++) {
              c = ref[i];
              if (c.status === "FAILED") {
                scope.failedConnectors.push(angular.copy(c));
              } else if (c.status === "DISCONNECTED") {
                scope.disconnectedConnectors.push(angular.copy(c));
              }
            }
          } else {
            scope.lastConnector = {
              status: 'SUCCESS',
              last_sync_date: new Date()
            };
          }
          if (!scope.isSyncing) {
            if (!(_.isEqual(scope.previousConnector, scope.lastConnector) && scope.lastConnector.status === 'SUCCESS')) {
              scope.previousConnector = angular.copy(scope.lastConnector);
              return refreshDashboard();
            } else {
              return scope.isSyncing = true;
            }
          }
        };
        refreshDashboard = function() {
          var modalInstance;
          scope.syncingPoller.stop();
          if (!scope.isDashboardRefreshAuthorized) {
            return;
          }
          ImpacWidgetsSvc.refreshAll();
          if (!(_.isEmpty(scope.failedConnectors) && _.isEmpty(scope.disconnectedConnectors))) {
            modalInstance = $modal.open({
              animation: true,
              size: 'md',
              templateUrl: 'alerts.tmpl.html',
              appendTo: angular.element('impac-dashboard'),
              controller: ["$scope", "connectors", function($scope, connectors) {
                $scope.failedConnectors = connectors.failed;
                $scope.disconnectedConnectors = connectors.disconnected;
                return $scope.ok = function() {
                  return modalInstance.close();
                };
              }],
              resolve: {
                connectors: function() {
                  return {
                    disconnected: scope.disconnectedConnectors,
                    failed: scope.failedConnectors
                  };
                }
              }
            });
          }
          return scope.isDashboardRefreshAuthorized = false;
        };
        getOffset = function() {
          var hours, minutes, offsetArray, timezone;
          timezone = new Date().getTimezoneOffset();
          offsetArray = ['+', '00', '00'];
          if (!(timezone < 0)) {
            offsetArray[0] = '-';
          }
          hours = "" + (Math.abs(Math.floor(timezone / 60)));
          if (hours.length < 2) {
            offsetArray[1] = "0" + hours;
          } else {
            offsetArray[1] = hours;
          }
          minutes = "" + (Math.abs(timezone % 60));
          if (minutes.length < 2) {
            offsetArray[2] = "0" + minutes;
          } else {
            offsetArray[2] = minutes;
          }
          return offsetArray.join('');
        };
        scope.synchronize = function() {
          if (scope.isSyncing) {
            return;
          }
          scope.isSyncing = true;
          scope.isDashboardRefreshAuthorized = true;
          return $http.post(ImpacRoutes.organizations.appInstancesSync(scope.orgUID)).then(function(success) {
            processAppInstancesSync(success.data);
            if (success.data.is_syncing) {
              return $timeout(function() {
                return scope.syncingPoller.start();
              }, 5000);
            }
          }, function(err) {
            $log.error('Unable to sync apps', err);
            return scope.isSyncing = false;
          });
        };
        scope.formatStatus = function(connector) {
          var date, name, status;
          if (!connector) {
            return;
          }
          name = connector.name;
          status = "";
          if (connector.last_sync_date) {
            date = $filter('date')(connector.last_sync_date, "yyyy-MM-dd 'at' h:mma", getOffset());
            switch (connector.status) {
              case 'SUCCESS':
                status = "Last sync: " + date;
                break;
              case 'FAILED':
                status = "Last sync failed: " + date;
                break;
              case 'DISCONNECTED':
                status = "Disconnected - previous sync was: " + date;
            }
          } else {
            switch (connector.status) {
              case 'FAILED':
                status = "Sync failed";
                break;
              case 'DISCONNECTED':
                status = "Sync failed - Disconnected";
                break;
              case 'NOT SYNCED':
                status = "Not synced yet";
            }
          }
          if (!(_.isEmpty(status) || _.isEmpty(name))) {
            status = status + " (" + name + ")";
          }
          return status;
        };
        ImpacMainSvc.load(true).then(function(config) {
          scope.orgUID = config.currentOrganization.uid;
          scope.syncingPoller = poller.get(ImpacRoutes.organizations.appInstancesSync(scope.orgUID), {
            delay: 5000,
            smart: true
          });
          return scope.syncingPoller.promise.then(null, null, function(response) {
            return processAppInstancesSync(response.data);
          });
        });
        return scope.$on("$destroy", function() {
          if (scope.syncingPoller) {
            return scope.syncingPoller.stop() && scope.syncingPoller.remove();
          }
        });
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-accounting-values', []);

  module.controller('WidgetAccountsAccountingValuesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && (w.content.accounting != null);
    };
    $scope.getCurrentPrice = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.accounting.values);
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.accounting.currency;
      }
    };
    $scope.getLegend = function() {
      if ($scope.isDataFound) {
        return w.content.accounting.legend;
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, data, dates, inputData, options, period;
      if ($scope.isDataFound) {
        data = angular.copy(w.content.accounting);
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(data.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData = {
          title: data.type,
          labels: dates,
          values: data.values
        };
        all_values_are_positive = true;
        angular.forEach(data.values, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
          currency: data.currency
        };
        chartData = ChartFormatterSvc.lineChart([inputData], options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsAccountingValues', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsAccountingValuesCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-assets-liability-summary', []);

  module.controller('WidgetAccountsAssetsLiabilitySummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary);
      switch ((w.metadata.classification || 'asset').toLowerCase()) {
        case 'liability':
          $scope.classification = "Liabilities";
          break;
        default:
          $scope.classification = "Assets";
      }
      $scope.accountsOptions = [
        {
          label: 'Assets Accounts',
          value: 'ASSET'
        }, {
          label: 'Liability Accounts',
          value: 'LIABILITY'
        }
      ];
      if (!$scope.selectedAccountsOption) {
        $scope.selectedAccountsOption = angular.copy(_.find($scope.accountsOptions, {
          value: w.metadata.classification || 'ASSET'
        }));
      }
      if ($scope.isDataFound) {
        if (w.metadata.organization_ids.length > 1) {
          return $scope.dataSource = w.content.repartition;
        } else {
          return $scope.dataSource = w.content.summary;
        }
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency;
      }
    };
    $scope.getAccountColor = function(elem) {
      if ($scope.isDataFound) {
        return ChartFormatterSvc.getColor(_.indexOf($scope.dataSource, elem));
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = _.map($scope.dataSource, function(company) {
          return {
            label: company.label,
            value: company.total
          };
        });
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12
        };
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsAssetsLiabilitySummary', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsAssetsLiabilitySummaryCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-assets-summary', []);

  module.controller('WidgetAccountsAssetsSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary);
      if ($scope.isDataFound) {
        if (w.metadata.organization_ids.length > 1) {
          $scope.dataSource = w.content.repartition;
        } else {
          $scope.dataSource = w.content.summary;
        }
      }
      switch ((w.metadata.classification || 'assets').toLowerCase()) {
        case 'liability':
          return $scope.classification = "Liabilities";
        default:
          return $scope.classification = "Assets";
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency;
      }
    };
    $scope.getAccountColor = function(elem) {
      if ($scope.isDataFound) {
        return ChartFormatterSvc.getColor(_.indexOf($scope.dataSource, elem));
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = _.map($scope.dataSource, function(company) {
          return {
            label: company.label,
            value: company.total
          };
        });
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12
        };
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsAssetsSummary', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsAssetsSummaryCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-assets-vs-liabilities', []);

  module.controller('WidgetAccountsAssetsVsLiabilitiesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      var index;
      $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.companies);
      if ($scope.isDataFound) {
        index = 0;
        return $scope.companiesList = _.map(w.content.companies, function(company) {
          var assetSum, liabilitiesSum, result;
          assetSum = _.find(w.content.summary, (function(sum) {
            return sum.classification === "ASSET";
          }));
          liabilitiesSum = _.find(w.content.summary, (function(sum) {
            return sum.classification === "LIABILITY";
          }));
          result = {
            company: company,
            assets: assetSum != null ? assetSum.totals[index] : 0.0,
            liabilities: liabilitiesSum != null ? liabilitiesSum.totals[index] : 0.0,
            currency: w.content.currency
          };
          index++;
          return result;
        });
      }
    };
    $scope.assetsColor = ChartFormatterSvc.getColor(0);
    $scope.liabilitiesColor = ChartFormatterSvc.getColor(1);
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, datasets, inputData, options;
      if ($scope.isDataFound) {
        datasets = _.map(w.content.summary, function(sum) {
          if (_.includes(['ASSET', 'LIABILITY'], sum.classification)) {
            return {
              title: sum.classification,
              values: sum.totals
            };
          }
        });
        datasets = _.sortByOrder(datasets, ['title']);
        inputData = {
          labels: w.content.companies,
          datasets: _.compact(datasets)
        };
        options = {
          showTooltips: false,
          showXLabels: false,
          barValueSpacing: Math.max(8 - w.content.companies.length, 1)
        };
        chartData = ChartFormatterSvc.combinedBarChart(inputData, options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsAssetsVsLiabilities', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsAssetsVsLiabilitiesCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-balance', []);

  module.controller('WidgetAccountsBalanceCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.accountBackDeferred = $q.defer();
    $scope.accountFrontDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.accountBackDeferred, $scope.accountFrontDeferred, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
    $scope.isDataFound = true;
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.account_list);
    };
    $scope.getName = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.name;
      }
    };
    $scope.getCurrentBalance = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.current_balance;
      }
    };
    $scope.getCurrency = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.currency;
      }
    };
    $scope.displayAccount = function() {
      $scope.updateSettings(false);
      return w.format();
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, data, dates, inputData, options, period;
      if ($scope.isDataFound && (w.selectedAccount != null)) {
        data = angular.copy(w.selectedAccount);
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData = {
          title: data.name,
          labels: dates,
          values: data.balances
        };
        all_values_are_positive = true;
        angular.forEach(data.balances, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        chartData = ChartFormatterSvc.lineChart([inputData], options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsBalance', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsBalanceCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-balance-sheet', []);

  module.controller('WidgetAccountsBalanceSheetCtrl', ["$scope", "$q", "ImpacWidgetsSvc", function($scope, $q, ImpacWidgetsSvc) {
    var settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorFrontDeferred = $q.defer();
    $scope.paramSelectorBackDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorFrontDeferred.promise, $scope.paramSelectorBackDeferred.promise];
    $scope.periodOptions = [
      {
        label: "Year",
        value: "YEARLY"
      }, {
        label: "Quarter",
        value: "QUARTERLY"
      }, {
        label: "Month",
        value: "MONTHLY"
      }, {
        label: "Week",
        value: "WEEKLY"
      }, {
        label: "Day",
        value: "DAILY"
      }
    ];
    $scope.period = angular.copy($scope.periodOptions[2]);
    w.initContext = function() {
      if ((w.content != null) && (w.content.period != null) && _.contains(_.pluck($scope.periodOptions, 'value'), w.content.period)) {
        $scope.period = angular.copy(_.find($scope.periodOptions, (function(o) {
          return o.value === w.content.period;
        })));
      }
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.dates = w.content.dates;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        return $scope.categories = Object.keys(w.content.summary);
      }
    };
    $scope.toggleCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === categoryName;
          });
        } else {
          $scope.unCollapsed.push(categoryName);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsBalanceSheet', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsBalanceSheetCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-cash-summary', []);

  module.controller('WidgetAccountsCashSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
    var selectedElementSetting, settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.dates = w.content.dates;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.metadata.selectedElement) {
          $scope.selectedElement = _.find(w.content.summary, function(statement) {
            return statement.name === w.metadata.selectedElement.name;
          });
          if (!$scope.selectedElement) {
            return angular.forEach(w.content.summary, function(statement) {
              if (statement.accounts != null) {
                return $scope.selectedElement || ($scope.selectedElement = _.find(statement.accounts, function(account) {
                  return account.id === w.metadata.selectedElement.id;
                }));
              }
            });
          }
        }
      }
    };
    $scope.getLastDate = function() {
      if ($scope.dates != null) {
        return $scope.dates[$scope.dates.length - 1];
      }
    };
    $scope.getPrevDate = function() {
      if ($scope.dates != null) {
        return $scope.dates[$scope.dates.length - 2];
      }
    };
    $scope.getLastValue = function(element) {
      if (element.cash_flows != null) {
        return _.last(element.cash_flows);
      }
    };
    $scope.formatVariance = function(aVariance) {
      if (aVariance != null) {
        if (aVariance > 0) {
          return "+" + aVariance + " %";
        } else {
          return aVariance + " %";
        }
      } else {
        return "-";
      }
    };
    $scope.getLastVariance = function(element) {
      if ((element.variances != null) && (_.last(element.variances) != null)) {
        return $scope.formatVariance(_.last(element.variances));
      } else {
        return "-";
      }
    };
    $scope.getVarianceClassColor = function(aVariance) {
      if (parseInt(aVariance) > 0) {
        return 'positive';
      } else if (parseInt(aVariance) < 0) {
        return 'negative';
      } else {
        return null;
      }
    };
    $scope.getName = function(element) {
      if ((element != null) && (element.name != null)) {
        return element.name.replace(/_/g, " ");
      }
    };
    $scope.toggleSelectedElement = function(element) {
      if ($scope.isSelected(element)) {
        $scope.selectedElement = null;
        if (w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        $scope.selectedElement = angular.copy(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element) {
      if ((element != null) && ($scope.selectedElement != null)) {
        if (((element.id != null) && $scope.selectedElement.id && element.id === $scope.selectedElement.id) || (element.name === $scope.selectedElement.name)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    $scope.toggleCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === element.name;
          });
        } else {
          $scope.unCollapsed.push(element.name);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          return false;
        } else {
          return true;
        }
        if ($scope.selectedElement == null) {
          return w.width = 6;
        }
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, data, dates, inputData, options, period;
      if ($scope.isDataFound && ($scope.selectedElement != null)) {
        data = angular.copy($scope.selectedElement);
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData = {
          labels: dates,
          datasets: [
            {
              title: data.name,
              values: data.cash_flows
            }
          ]
        };
        all_values_are_positive = true;
        angular.forEach(data.cash_flows, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true
        };
        chartData = ChartFormatterSvc.combinedBarChart(inputData, options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    selectedElementSetting = {};
    selectedElementSetting.initialized = false;
    selectedElementSetting.initialize = function() {
      return selectedElementSetting.initialized = true;
    };
    selectedElementSetting.toMetadata = function() {
      return {
        selectedElement: $scope.selectedElement
      };
    };
    w.settings.push(selectedElementSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsCashSummary', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsCashSummaryCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-class-comparison', []);

  module.controller('WidgetAccountsClassComparisonCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", function($scope, $q, $filter, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.companies);
      if ($scope.isDataFound) {
        $scope.classifications = _.map(w.content.summary, function(summary) {
          var klass;
          klass = summary.classification;
          return {
            label: _.capitalize(klass.toLowerCase()),
            value: klass
          };
        });
        if (!$scope.selectedClassification) {
          return $scope.selectedClassification = angular.copy(_.find($scope.classifications, {
            value: w.metadata.classification || $scope.classifications[0].value
          }));
        }
      }
    };
    $scope.getTotals = function() {
      var amount;
      return amount = _.find(w.content.summary, function(sum) {
        return sum.classification === $scope.selectedClassification.value;
      }).totals;
    };
    $scope.getAmount = function(index) {
      var amount;
      amount = $scope.getTotals()[index];
      return $filter('mnoCurrency')(amount, w.content.currency);
    };
    $scope.getAccountColor = function(anEntity) {
      return ChartFormatterSvc.getColor(_.indexOf(w.content.companies, anEntity));
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, inputData, options;
      if ($scope.isDataFound) {
        inputData = {};
        inputData.labels = w.content.companies;
        inputData.values = $scope.getTotals();
        if (inputData.labels.length > 15) {
          inputData.labels.length = 15;
        }
        if (inputData.values.length > 15) {
          inputData.values.length = 15;
        }
        options = {
          showTooltips: false,
          showXLabels: false,
          barValueSpacing: Math.max(8 - w.content.companies.length, 1)
        };
        chartData = ChartFormatterSvc.barChart(inputData, options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsClassComparison', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsClassComparisonCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-comparison', []);

  module.controller('WidgetAccountsComparisonCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var scanAccountsForMultiOrgData, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.accountsListDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramsCheckboxesDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.accountsListDeferred.promise, $scope.chartDeferred.promise, $scope.paramsCheckboxesDeferred.promise];
    w.initContext = function() {
      $scope.movedAccount = {};
      $scope.comparisonModeOptions = [
        {
          id: 'compare_accounts',
          label: 'Compare matching accounts across your companies',
          value: false,
          onChangeCallback: $scope.updateSettings
        }
      ];
      if (angular.isDefined(w.metadata.comparison_mode) && (w.metadata.organization_ids != null) && w.metadata.organization_ids.length > 1) {
        angular.merge($scope.comparisonModeOptions, w.metadata.comparison_mode);
      }
      $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.complete_list) || $scope.isComparisonMode();
      $scope.noComparableAccounts = $scope.isComparisonMode() && (w.content != null) && _.isEmpty(w.content.complete_list);
      return $scope.canSelectComparisonMode = scanAccountsForMultiOrgData();
    };
    scanAccountsForMultiOrgData = function() {
      if (w.content == null) {
        return false;
      }
      return _.uniq(_.pluck(w.content.complete_list, 'org_name')).length > 1;
    };
    $scope.isComparisonMode = function() {
      return _.result(_.find($scope.comparisonModeOptions, 'id', 'compare_accounts'), 'value') || false;
    };
    $scope.hasAccountsSelected = function() {
      return w.selectedAccounts && w.selectedAccounts.length > 0;
    };
    $scope.getAccountColor = function(anAccount) {
      if ($scope.isComparisonMode()) {
        return ChartFormatterSvc.getColor(_.indexOf(w.selectedAccounts[0].accounts, anAccount));
      } else {
        return ChartFormatterSvc.getColor(_.indexOf(w.selectedAccounts, anAccount));
      }
    };
    $scope.addAccount = function(anAccount) {
      w.moveAccountToAnotherList(anAccount, w.remainingAccounts, w.selectedAccounts);
      return w.format();
    };
    $scope.removeAccount = function(anAccount) {
      w.moveAccountToAnotherList(anAccount, w.selectedAccounts, w.remainingAccounts);
      return w.format();
    };
    $scope.formatAmount = function(anAccount) {
      return $filter('mnoCurrency')(anAccount.current_balance, anAccount.currency);
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, inputData, options;
      inputData = {
        labels: [],
        values: []
      };
      _.forEach(w.selectedAccounts, function(account) {
        if ($scope.isComparisonMode()) {
          return _.forEach(account.accounts, function(groupedAccount) {
            inputData.labels.push(groupedAccount.name);
            return inputData.values.push(groupedAccount.current_balance);
          });
        } else {
          inputData.labels.push(account.name);
          return inputData.values.push(account.current_balance);
        }
      });
      while (inputData.values.length < 15) {
        inputData.labels.push("");
        inputData.values.push(null);
      }
      options = {
        showTooltips: false,
        showXLabels: false,
        barDatasetSpacing: 9
      };
      chartData = ChartFormatterSvc.barChart(inputData, options);
      return $scope.drawTrigger.notify(chartData);
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsComparison', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsComparisonCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-custom-calculation', []);

  module.controller('WidgetAccountsCustomCalculationCtrl', ["$scope", "$timeout", "$modal", "$q", "$templateCache", "ImpacWidgetsSvc", function($scope, $timeout, $modal, $q, $templateCache, ImpacWidgetsSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.accountsListDeferred = $q.defer();
    $scope.formulaDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.accountsListDeferred.promise, $scope.formulaDeferred.promise];
    w.initContext = function() {
      $scope.movedAccount = {};
      return $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.complete_list);
    };
    $scope.addAccountToFormula = function(account) {
      if (account == null) {
        return;
      }
      if (w.selectedAccounts.length > 0) {
        w.formula += " + {" + (w.selectedAccounts.length + 1) + "}";
      } else {
        w.formula = "{1}";
      }
      return w.moveAccountToAnotherList(account, w.remainingAccounts, w.selectedAccounts, false);
    };
    $scope.removeAccountFromFormula = function(account) {
      var diffAccountIndex, diffAccountUid, i, indexPattern, newFormula, nextUids, prevUids, removePattern;
      prevUids = _.map(w.selectedAccounts, function(e) {
        return e.uid;
      });
      nextUids = _.reject(prevUids, function(e) {
        return e === account.uid;
      });
      diffAccountUid = _.first(_.difference(prevUids, nextUids));
      diffAccountIndex = _.indexOf(prevUids, diffAccountUid) + 1;
      if (diffAccountIndex === 1) {
        removePattern = "{" + diffAccountIndex + "\\}\\s*(-|\\*|\\/|\\+)*\\s*";
      } else {
        removePattern = "\\s*(-|\\*|\\/|\\+)*\\s*\\{" + diffAccountIndex + "\\}";
      }
      newFormula = angular.copy(w.formula).replace(new RegExp(removePattern, 'g'), '');
      i = diffAccountIndex + 1;
      while (i <= prevUids.length) {
        indexPattern = "\\{" + i + "\\}";
        newFormula = newFormula.replace(new RegExp(indexPattern, 'g'), "{" + (i - 1) + "}");
        i++;
      }
      w.formula = angular.copy(newFormula);
      return w.moveAccountToAnotherList(account, w.selectedAccounts, w.remainingAccounts, false);
    };
    $scope.formulaModal = $scope.$new();
    $scope.formulaModal.config = {
      backdrop: 'static',
      template: $templateCache.get('widgets/accounts-custom-calculation/formula.modal.html'),
      size: 'lg',
      scope: $scope.formulaModal,
      keyboard: false
    };
    $scope.formulaModal.open = function() {
      var self;
      self = $scope.formulaModal;
      self.modalOrgDeferred = $q.defer();
      _.remove(w.settings, (function(set) {
        return set.key === "organizations";
      }));
      self.instance = $modal.open(self.config);
      return self.modalOrgDeferred.promise.then(function(success) {
        return $scope.initSettings();
      });
    };
    $scope.$watch((function() {
      return w.selectedOrganizations;
    }), function(result) {
      if (!_.isEmpty(result)) {
        return ImpacWidgetsSvc.updateWidgetSettings(w);
      }
    }, true);
    $scope.formulaModal.cancel = function() {
      $scope.initSettings();
      return $scope.formulaModal.close();
    };
    $scope.formulaModal.proceed = function() {
      ImpacWidgetsSvc.updateWidgetSettings(w, false);
      return $scope.formulaModal.close();
    };
    $scope.formulaModal.close = function() {
      return $scope.formulaModal.instance.close();
    };
    $scope.$watch((function() {
      return w.isEditMode;
    }), function(result, prev) {
      if (result && !prev) {
        return $scope.formulaModal.open();
      }
    });
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsCustomCalculation', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsCustomCalculationCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-detailed-classifications', []);

  module.controller('WidgetAccountsDetailedClassificationsCtrl', ["$scope", "$q", "ImpacWidgetsSvc", function($scope, $q, ImpacWidgetsSvc) {
    var settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.companies);
      if ($scope.isDataFound) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.content.companies.length === 1) {
          $scope.multiEntity = false;
          return $scope.dataSource = _.map(w.content.companies[0].classifications, function(klass) {
            return {
              label: klass.name,
              value: klass.total,
              currency: klass.currency,
              entries: _.map(klass.accounts, function(acc) {
                return {
                  label: acc.name,
                  value: acc.balance,
                  currency: acc.currency
                };
              })
            };
          });
        } else {
          $scope.multiEntity = true;
          return $scope.dataSource = _.map(w.content.companies, function(company) {
            return {
              label: company.name,
              entries: _.map(company.classifications, function(klass) {
                return {
                  label: klass.name,
                  value: klass.total,
                  currency: klass.currency
                };
              })
            };
          });
        }
      }
    };
    $scope.toggleCollapsed = function(groupName) {
      if (groupName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return groupName === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === groupName;
          });
        } else {
          $scope.unCollapsed.push(groupName);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(groupName) {
      if (groupName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return groupName === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsDetailedClassifications', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsDetailedClassificationsCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-expense-weight', []);

  module.controller('WidgetAccountsExpenseWeightCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.accountBackDeferred = $q.defer();
    $scope.accountFrontDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.accountBackDeferred, $scope.accountFrontDeferred, $scope.chartDeferred.promise];
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.account_list);
    };
    $scope.getName = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.name;
      }
    };
    $scope.getComparator = function() {
      switch (w.metadata.comparator) {
        case 'turnover':
          return "turnover";
        default:
          return "total expenses";
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, companies, inputData, options, ratios;
      if ($scope.isDataFound && (w.content.summary != null)) {
        companies = _.map(w.content.summary, function(s) {
          return s.company;
        });
        ratios = _.map(w.content.summary, function(s) {
          return s.ratio;
        });
        if (companies.length === 1) {
          companies.push(companies[0]);
          ratios.push(ratios[0]);
        }
        inputData = {
          labels: companies,
          values: ratios
        };
        options = {
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 100,
                  maxTicksLimit: 5
                }
              }
            ]
          },
          showXLabels: false,
          pointDot: false,
          currency: '%'
        };
        chartData = ChartFormatterSvc.lineChart([inputData], options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsExpenseWeight', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsExpenseWeightCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-expenses-revenue', []);

  module.controller('WidgetAccountsExpensesRevenueCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramsCheckboxesDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise, $scope.paramsCheckboxesDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = (w.content != null) && (w.content.values != null);
      $scope.displayOptions = [
        {
          id: 'show_net_profit',
          label: 'Show net profit',
          value: false,
          onChangeCallback: $scope.toggleDisplayNetProfit
        }
      ];
      if (angular.isDefined((w.metadata != null) && (w.metadata.display != null))) {
        angular.merge($scope.displayOptions, w.metadata.display);
      }
      return $scope.isNetProfitDisplayed = !!$scope.displayOptions[0].value;
    };
    $scope.getCurrentRevenue = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.revenue);
      }
    };
    $scope.getCurrentExpenses = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.expenses);
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency;
      }
    };
    $scope.toggleDisplayNetProfit = function() {
      $scope.isNetProfitDisplayed = !!$scope.displayOptions[0].value;
      $scope.updateSettings(false);
      return w.format();
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, dates, lineData, lineOptions, period, pieData, pieOptions;
      if ($scope.isDataFound) {
        if (w.isHistoryMode) {
          period = null;
          if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
            period = w.metadata.hist_parameters.period;
          }
          dates = _.map(w.content.dates, function(date) {
            return $filter('mnoDate')(date, period);
          });
          if ($scope.isNetProfitDisplayed) {
            lineData = [
              {
                title: "Net Profit (" + ($scope.getCurrency()) + ")",
                labels: dates,
                values: w.content.values.net_profit
              }
            ];
            all_values_are_positive = true;
            angular.forEach(w.content.values.net_profit, function(value) {
              return all_values_are_positive && (all_values_are_positive = value >= 0);
            });
          } else {
            lineData = [
              {
                title: "Expenses (" + ($scope.getCurrency()) + ")",
                labels: dates,
                values: w.content.values.expenses
              }, {
                title: "Revenue (" + ($scope.getCurrency()) + ")",
                labels: dates,
                values: w.content.values.revenue
              }
            ];
            all_values_are_positive = true;
            angular.forEach(w.content.values.expenses, function(value) {
              return all_values_are_positive && (all_values_are_positive = value >= 0);
            });
            angular.forEach(w.content.values.revenue, function(value) {
              return all_values_are_positive && (all_values_are_positive = value >= 0);
            });
          }
          lineOptions = {
            scaleBeginAtZero: all_values_are_positive,
            showXLabels: false
          };
          chartData = ChartFormatterSvc.lineChart(lineData, lineOptions, true);
        } else {
          pieData = [
            {
              label: "Expenses (" + ($scope.getCurrency()) + ")",
              value: $scope.getCurrentExpenses()
            }, {
              label: "Revenue (" + ($scope.getCurrency()) + ")",
              value: $scope.getCurrentRevenue()
            }
          ];
          pieOptions = {
            tooltipFontSize: 12,
            percentageInnerCutout: 0
          };
          chartData = ChartFormatterSvc.pieChart(pieData, pieOptions, true);
        }
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsExpensesRevenue', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsExpensesRevenueCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-payable-receivable', []);

  module.controller('WidgetAccountsPayableReceivableCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && (w.content.values != null);
    };
    $scope.getCurrentPayable = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.payables);
      }
    };
    $scope.getCurrentReceivable = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.receivables);
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency;
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, dates, i, j, len, len1, lineData, lineOptions, period, ref, ref1, value;
      if ($scope.isDataFound) {
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        lineData = [
          {
            title: "Payable",
            labels: dates,
            values: w.content.values.payables
          }, {
            title: "Receivable",
            labels: dates,
            values: w.content.values.receivables
          }
        ];
        all_values_are_positive = true;
        ref = w.content.values.payables;
        for (i = 0, len = ref.length; i < len; i++) {
          value = ref[i];
          all_values_are_positive && (all_values_are_positive = value >= 0);
        }
        ref1 = w.content.values.receivables;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          value = ref1[j];
          all_values_are_positive && (all_values_are_positive = value >= 0);
        }
        lineOptions = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        chartData = ChartFormatterSvc.lineChart(lineData, lineOptions, true);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsPayableReceivable', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsPayableReceivableCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-profit-and-loss', []);

  module.controller('WidgetAccountsProfitAndLossCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
    var getLastAmount, getPeriod, getTotalAmount, selectedElementsSetting, setAmountDisplayed, settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise, $scope.paramSelectorDeferred.promise];
    setAmountDisplayed = function() {
      return $scope.amountDisplayed = angular.copy(_.find($scope.amountDisplayedOptions, function(o) {
        return w.metadata && o.value === w.metadata.amount_displayed;
      }) || $scope.amountDisplayedOptions[0]);
    };
    $scope.amountDisplayedOptions = [
      {
        label: 'Last period',
        value: 'last'
      }, {
        label: 'Total for period',
        value: 'total'
      }
    ];
    setAmountDisplayed();
    w.initContext = function() {
      var firstDate, lastDate;
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.dates = w.content.dates;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        firstDate = $filter('mnoDate')($scope.dates[0], getPeriod());
        lastDate = $filter('mnoDate')($scope.getLastDate(), getPeriod());
        $scope.amountDisplayedOptions[0].label = lastDate;
        $scope.amountDisplayedOptions[1].label = firstDate + " to " + lastDate;
        setAmountDisplayed();
        if (w.metadata.selectedElements) {
          $scope.selectedElements = [];
          angular.forEach(w.metadata.selectedElements, function(sElem) {
            var foundElem;
            foundElem = _.find(w.content.summary, function(statement) {
              return statement.name === sElem.name;
            });
            if (!foundElem) {
              angular.forEach(w.content.summary, function(statement) {
                if (statement.accounts != null) {
                  return foundElem || (foundElem = _.find(statement.accounts, function(account) {
                    return sElem.id === account.id;
                  }));
                }
              });
            }
            if (foundElem) {
              return $scope.selectedElements.push(foundElem);
            }
          });
        }
        if (!(($scope.selectedElements != null) && $scope.selectedElements.length > 0)) {
          return w.width = 6;
        }
      }
    };
    $scope.getElementChartColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.getLastDate = function() {
      if ($scope.dates != null) {
        return $scope.dates[$scope.dates.length - 1];
      }
    };
    $scope.getPrevDate = function() {
      if ($scope.dates != null) {
        return $scope.dates[$scope.dates.length - 2];
      }
    };
    getPeriod = function() {
      if ((w.metadata != null) && (w.metadata.hist_parameters != null) && (w.metadata.hist_parameters.period != null)) {
        return w.metadata.hist_parameters.period;
      } else {
        return 'MONTHLY';
      }
    };
    getLastAmount = function(element) {
      if (element.totals != null) {
        return _.last(element.totals);
      }
    };
    getTotalAmount = function(element) {
      if (element.totals != null) {
        return _.sum(element.totals);
      }
    };
    $scope.getAmount = function(element) {
      switch (w.metadata.amount_displayed) {
        case 'total':
          return getTotalAmount(element);
        default:
          return getLastAmount(element);
      }
    };
    $scope.getClassColor = function(aTotal) {
      if (parseInt(aTotal) > 0) {
        return 'positive';
      } else if (parseInt(aTotal) < 0) {
        return 'negative';
      } else {
        return null;
      }
    };
    $scope.getName = function(element) {
      if ((element != null) && (element.name != null)) {
        return element.name.replace(/_/g, " ");
      }
    };
    $scope.toggleSelectedElement = function(element) {
      if ($scope.isSelected(element)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element) {
      if ((element != null) && ($scope.selectedElements != null)) {
        if (_.find($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        })) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    $scope.toggleCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === element.name;
          });
        } else {
          $scope.unCollapsed.push(element.name);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    $scope.hasElements = function() {
      return ($scope.selectedElements != null) && $scope.selectedElements.length > 0;
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, inputData, options;
      if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
        all_values_are_positive = true;
        inputData = [];
        angular.forEach($scope.selectedElements, function(sElem) {
          var data, dates, period;
          data = angular.copy(sElem);
          period = null;
          if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
            period = w.metadata.hist_parameters.period;
          }
          dates = _.map(w.content.dates, function(date) {
            return $filter('mnoDate')(date, period);
          });
          inputData.push({
            title: data.name,
            labels: dates,
            values: data.totals
          });
          return angular.forEach(data.totals, function(value) {
            return all_values_are_positive && (all_values_are_positive = value >= 0);
          });
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: $scope.selectedElements.length === 1,
          pointDot: $scope.selectedElements.length === 1
        };
        chartData = ChartFormatterSvc.lineChart(inputData, options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    selectedElementsSetting = {};
    selectedElementsSetting.initialized = false;
    selectedElementsSetting.initialize = function() {
      return selectedElementsSetting.initialized = true;
    };
    selectedElementsSetting.toMetadata = function() {
      return {
        selectedElements: $scope.selectedElements
      };
    };
    w.settings.push(selectedElementsSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsProfitAndLoss', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsProfitAndLossCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-employee-details', []);

  module.controller('WidgetHrEmployeeDetailsCtrl', ["$scope", "$q", "$filter", function($scope, $q, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise];
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.employees)) {
        $scope.periodOptions = [
          {
            label: 'Yearly',
            value: 'yearly'
          }, {
            label: 'Monthly',
            value: 'monthly'
          }, {
            label: 'Weekly',
            value: 'weekly'
          }, {
            label: 'Hourly',
            value: 'hourly'
          }
        ];
        if (w.metadata && w.metadata.period) {
          $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
            return o.value === w.metadata.period.toLowerCase();
          }) || $scope.periodOptions[0]);
        } else {
          $scope.period = angular.copy($scope.periodOptions[0]);
        }
        $scope.employeesOptions = _.map(w.content.employees, function(e) {
          return {
            value: e.uid,
            label: e.lastname + " " + e.firstname
          };
        });
        return $scope.selectedEmployee = {
          value: $scope.getEmployee().uid,
          label: ($scope.getEmployee().lastname) + " " + ($scope.getEmployee().firstname)
        };
      }
    };
    $scope.getSingleCompanyName = function() {
      var org, orgUid;
      if (w.content && w.content.organizations) {
        orgUid = w.content.organizations[0];
        org = _.find($scope.parentDashboard.data_sources, function(o) {
          return o.uid === orgUid;
        });
        if (org != null) {
          return org.label;
        }
      }
    };
    $scope.getEmployee = function() {
      var employee;
      if (!$scope.isDataFound) {
        return false;
      }
      if (w.metadata && w.metadata.employee_uid) {
        employee = angular.copy(_.find(w.content.employees, function(e) {
          return e.uid === w.metadata.employee_uid;
        }) || w.content.employees[0]);
      } else {
        employee = angular.copy(w.content.employees[0]);
      }
      employee.salary && (employee.salary = $filter('mnoCurrency')(employee.salary.amount, employee.salary.currency));
      return employee;
    };
    $scope.formatAddress = function(anAddress) {
      if (angular.isDefined(anAddress)) {
        return anAddress.replace(/, /g, ',\n');
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrEmployeeDetails', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrEmployeeDetailsCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-employees-list', []);

  module.controller('WidgetHrEmployeesListCtrl', ["$scope", "$q", "$filter", function($scope, $q, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.total) && !_.isEmpty(w.content.employees)) {
        $scope.periodOptions = [
          {
            label: 'Yearly',
            value: 'yearly'
          }, {
            label: 'Monthly',
            value: 'monthly'
          }, {
            label: 'Weekly',
            value: 'weekly'
          }, {
            label: 'Hourly',
            value: 'hourly'
          }
        ];
        return $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
          return o.value === w.content.total.period.toLowerCase();
        }) || $scope.periodOptions[0]);
      }
    };
    $scope.getSingleCompanyName = function() {
      var org, orgUid;
      if (w.content && w.content.organizations) {
        orgUid = w.content.organizations[0];
        org = _.find($scope.parentDashboard.data_sources, function(o) {
          return o.uid === orgUid;
        });
        return org.label;
      }
    };
    $scope.getEmployeeSalary = function(anEmployee) {
      if (anEmployee.salary != null) {
        return $filter('mnoCurrency')(anEmployee.salary.amount, w.content.total.currency);
      } else {
        return '-';
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrEmployeesList', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrEmployeesListCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-leaves-balance', []);

  module.controller('WidgetHrLeavesBalanceCtrl', ["$scope", "$q", function($scope, $q) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.employees)) {
        $scope.employeesOptions = _.map(w.content.employees, function(e) {
          return {
            value: e.uid,
            label: e.lastname + " " + e.firstname
          };
        });
        return $scope.selectedEmployee = {
          value: $scope.getEmployee().uid,
          label: ($scope.getEmployee().lastname) + " " + ($scope.getEmployee().firstname)
        };
      }
    };
    $scope.getEmployee = function() {
      var e;
      if (!$scope.isDataFound) {
        return false;
      }
      e = w.content.employees[0];
      if (w.metadata && w.metadata.employee_id) {
        e = _.find(w.content.employees, function(e) {
          return e.uid === w.metadata.employee_id;
        }) || w.content.employees[0];
      }
      return angular.copy(e);
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrLeavesBalance', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrLeavesBalanceCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-leaves-schedule', []);

  module.controller('WidgetHrLeavesScheduleCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise];
    w.initContext = function() {
      var eventsArray;
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)) {
        eventsArray = [];
        angular.forEach(w.content.summary, function(leave) {
          return eventsArray.push({
            title: leave.employee_name + " - " + leave.title,
            start: leave.start_date,
            end: leave.end_date
          });
        });
        return $scope.eventSources = angular.copy(eventsArray);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrLeavesSchedule', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrLeavesScheduleCtrl'
    };
  });

  module.directive('widgetComponentCalendar', function() {
    return {
      scope: {
        events: '=ngModel'
      },
      restrict: 'A',
      link: function(scope, element) {
        var calendarOptions, getEvents;
        scope.eventSources = [];
        calendarOptions = {
          header: {
            left: "prev",
            center: "title",
            right: "next"
          },
          contentHeight: 204
        };
        getEvents = function() {
          return scope.events;
        };
        return scope.$watch(getEvents, function(events) {
          if (events.length > 0) {
            element.fullCalendar('destroy');
            angular.extend(calendarOptions, {
              events: scope.events
            });
            return element.fullCalendar(calendarOptions);
          }
        }, true);
      }
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-payroll-summary', []);

  module.controller('WidgetHrPayrollSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
    var selectedElementsSetting, settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.metadata.selectedElements) {
          $scope.selectedElements = [];
          angular.forEach(w.metadata.selectedElements, function(sElem) {
            var foundElem;
            foundElem = _.find(w.content.summary, function(statement) {
              return statement.name === sElem.name;
            });
            if (!foundElem) {
              angular.forEach(w.content.summary, function(statement) {
                if (statement.employees != null) {
                  return foundElem || (foundElem = _.find(statement.employees, function(employee) {
                    return sElem.id === employee.id;
                  }));
                }
              });
            }
            if (foundElem) {
              return $scope.selectedElements.push(foundElem);
            }
          });
        }
        if (!(($scope.selectedElements != null) && $scope.selectedElements.length > 0)) {
          return w.width = 6;
        }
      }
    };
    $scope.getElementChartColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.getLastValue = function(element) {
      if (element.totals != null) {
        return element.totals[element.totals.length - 2];
      }
    };
    $scope.getTotalSum = function(element) {
      if (element.totals != null) {
        return _.reduce(element.totals, function(memo, num) {
          return memo + num;
        }, 0);
      }
    };
    $scope.getName = function(element) {
      if ((element != null) && (element.name != null)) {
        if (element.name === "total_leaves") {
          return "Total Leaves Accruals";
        }
        if (element.name === "total_super") {
          return "Total Superannuation Accruals";
        }
        if (element.name === "total_reimbursement") {
          return "Total Reimbursements";
        }
        if (element.name === "total_tax") {
          return "Total Taxes";
        }
        if (element.name === "total_timeoff") {
          return "Total Time Off";
        }
        return element.name.replace(/_/g, " ");
      }
    };
    $scope.getTrackedField = function() {
      var allFieldsEquals, field;
      if (!_.isEmpty($scope.selectedElements) && ($scope.selectedElements[0].id != null)) {
        field = $scope.selectedElements[0].id.split('-')[0];
        allFieldsEquals = true;
        angular.forEach($scope.selectedElements, function(element) {
          return allFieldsEquals && (allFieldsEquals = element.id && field === element.id.split('-')[0]);
        });
        if (allFieldsEquals) {
          return $scope.getName({
            name: field
          });
        } else {
          return null;
        }
      }
    };
    $scope.formatDate = function(date) {
      if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
        switch (w.metadata.hist_parameters.period) {
          case 'DAILY':
            return $filter('date')(date, 'dd-MMM');
          case 'WEEKLY':
            return $filter('date')(date, 'dd-MMM');
          case 'MONTHLY':
            return $filter('date')(date, 'MMM');
          case 'QUARTERLY':
            return $filter('date')(date, 'MMM-yy');
          case 'YEARLY':
            return $filter('date')(date, 'yyyy');
          default:
            return $filter('date')(date, 'MMM');
        }
      } else {
        return $filter('date')(date, 'MMM');
      }
    };
    $scope.toggleSelectedElement = function(element) {
      if ($scope.isSelected(element)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element) {
      if ((element != null) && ($scope.selectedElements != null)) {
        if (_.find($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        })) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    $scope.toggleCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === element.name;
          });
        } else {
          $scope.unCollapsed.push(element.name);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    $scope.hasElements = function() {
      return ($scope.selectedElements != null) && $scope.selectedElements.length > 0;
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, inputData, labels, options, pieData, pieOptions;
      if ($scope.isDataFound && $scope.hasElements()) {
        if (w.isHistoryMode) {
          all_values_are_positive = true;
          inputData = [];
          labels = _.map(w.content.dates, function(date) {
            if (w.metadata.hist_parameters && w.metadata.hist_parameters.period === "YEARLY") {
              return $filter('date')(date, 'yyyy');
            } else if (w.metadata.hist_parameters && w.metadata.hist_parameters.period === "QUARTERLY") {
              return $filter('date')(date, 'MMM-yy');
            } else if (w.metadata.hist_parameters && (w.metadata.hist_parameters.period === "WEEKLY" || w.metadata.hist_parameters.period === "DAILY")) {
              return $filter('date')(date, 'dd-MMM');
            } else {
              return $filter('date')(date, 'MMM');
            }
          });
          angular.forEach($scope.selectedElements, function(sElem) {
            var data;
            data = angular.copy(sElem);
            inputData.push({
              title: data.name,
              labels: labels,
              values: data.totals
            });
            return angular.forEach(data.totals, function(value) {
              return all_values_are_positive && (all_values_are_positive = value >= 0);
            });
          });
          options = {
            scaleBeginAtZero: all_values_are_positive,
            showXLabels: true,
            datasetFill: $scope.selectedElements.length === 1,
            pointDot: $scope.selectedElements.length === 1,
            currency: 'hide'
          };
          chartData = ChartFormatterSvc.lineChart(inputData, options);
        } else {
          pieData = _.map($scope.selectedElements, function(elem) {
            return {
              label: $filter('titleize')($scope.getName({
                name: elem.name
              })),
              value: $scope.getLastValue(elem)
            };
          });
          pieOptions = {
            showTooltips: true,
            percentageInnerCutout: 50,
            tooltipFontSize: 12,
            currency: 'hide'
          };
          chartData = ChartFormatterSvc.pieChart(pieData, pieOptions);
        }
        return $scope.drawTrigger.notify(chartData);
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    selectedElementsSetting = {};
    selectedElementsSetting.initialized = false;
    selectedElementsSetting.initialize = function() {
      return selectedElementsSetting.initialized = true;
    };
    selectedElementsSetting.toMetadata = function() {
      return {
        selectedElements: $scope.selectedElements
      };
    };
    w.settings.push(selectedElementsSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrPayrollSummary', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrPayrollSummaryCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-payroll-taxes', []);

  module.controller('WidgetHrPayrollTaxesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.total_tax) && !_.isEmpty(w.content.dates);
    };
    $scope.getCurrentPrice = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.total_tax);
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency || "USD";
      }
    };
    $scope.getPeriod = function() {
      var period, period_param;
      if ($scope.isDataFound && w.metadata && w.metadata.hist_parameters) {
        period_param = w.metadata.hist_parameters.period || "MONTHLY";
        period = "day";
        if (period_param !== "DAILY") {
          period = period_param.substr(0, period_param.length - 2).toLowerCase();
        }
        return "(current " + period + ")";
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, dates, inputData, options, period;
      if ($scope.isDataFound) {
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData = {
          title: "Payroll Taxes",
          labels: dates,
          values: w.content.total_tax
        };
        all_values_are_positive = true;
        angular.forEach(w.content.total_tax, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        chartData = ChartFormatterSvc.lineChart([inputData], options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrPayrollTaxes', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrPayrollTaxesCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-salaries-summary', []);

  module.controller('WidgetHrSalariesSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content) && (w.content.summary != null) && !_.isEmpty(w.content.summary.data)) {
        $scope.periodOptions = [
          {
            label: 'Yearly',
            value: 'yearly'
          }, {
            label: 'Monthly',
            value: 'monthly'
          }, {
            label: 'Weekly',
            value: 'weekly'
          }, {
            label: 'Hourly',
            value: 'hourly'
          }
        ];
        $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
          return o.value === w.content.total.period.toLowerCase();
        }) || $scope.periodOptions[0]);
        $scope.filterOptions = [
          {
            label: 'Gender',
            value: 'gender'
          }, {
            label: 'Age Range',
            value: 'age_range'
          }, {
            label: 'Job Title',
            value: 'job_title'
          }
        ];
        return $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return o.value === w.content.summary.filter;
        }) || $scope.filterOptions[0]);
      }
    };
    $scope.getColorByIndex = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var barData, barOptions, chartData, lineData, lineOptions;
      if ($scope.isDataFound) {
        barData = {
          labels: _.map(w.content.summary.data, function(elem) {
            return elem.label;
          }),
          values: _.map(w.content.summary.data, function(elem) {
            return elem.value;
          })
        };
        if ($scope.filter.value === 'gender') {
          barOptions = {
            showTooltips: false
          };
          chartData = ChartFormatterSvc.barChart(barData, barOptions);
        } else if ($scope.filter.value === 'job_title') {
          barOptions = {
            showTooltips: false,
            showXLabels: false,
            barDatasetSpacing: 15
          };
          chartData = ChartFormatterSvc.barChart(barData, barOptions);
        } else if ($scope.filter.value === 'age_range') {
          if (_.last(barData.labels) === "unknown") {
            barData.labels.pop();
            barData.values.pop();
          }
          lineData = [
            {
              title: "Average salary",
              labels: barData.labels,
              values: barData.values
            }
          ];
          lineOptions = {
            scaleBeginAtZero: true,
            showXLabels: false
          };
          chartData = ChartFormatterSvc.lineChart(lineData, lineOptions);
        } else {
          return {
            error: {
              message: "wrong filter",
              code: 400
            }
          };
        }
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrSalariesSummary', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrSalariesSummaryCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-superannuation-accruals', []);

  module.controller('WidgetHrSuperannuationAccrualsCtrl', ["$scope", "$q", function($scope, $q) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.employees)) {
        $scope.employeesOptions = _.map(w.content.employees, function(e) {
          return {
            value: e.uid,
            label: e.lastname + " " + e.firstname
          };
        });
        return $scope.selectedEmployee = {
          value: $scope.getEmployee().uid,
          label: ($scope.getEmployee().lastname) + " " + ($scope.getEmployee().firstname)
        };
      }
    };
    $scope.getEmployee = function() {
      var e;
      if (!$scope.isDataFound) {
        return false;
      }
      e = w.content.employees[0];
      if (w.metadata && w.metadata.employee_id) {
        e = _.find(w.content.employees, function(e) {
          return e.uid === w.metadata.employee_id;
        }) || w.content.employees[0];
      }
      return angular.copy(e);
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrSuperannuationAccruals', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrSuperannuationAccrualsCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-timesheets', []);

  module.controller('WidgetHrTimesheetsCtrl', ["$scope", "$q", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, ImpacWidgetsSvc) {
    var settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.employees) && !_.isEmpty(w.content.dates)) {
        $scope.employeesOptions = _.map(w.content.employees, function(e) {
          return {
            value: e.id,
            label: e.lastname + " " + e.firstname
          };
        });
        $scope.selectedEmployee = {
          value: $scope.getEmployee().id,
          label: ($scope.getEmployee().lastname) + " " + ($scope.getEmployee().firstname)
        };
        return $scope.unCollapsed = w.metadata.unCollapsed || [];
      }
    };
    $scope.toggleCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === categoryName;
          });
        } else {
          $scope.unCollapsed.push(categoryName);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    $scope.getEmployee = function() {
      if (!$scope.isDataFound) {
        return false;
      }
      if (w.metadata && w.metadata.employee_id) {
        return _.find(w.content.employees, function(e) {
          return e.id === w.metadata.employee_id;
        }) || w.content.employees[0];
      } else {
        return w.content.employees[0];
      }
    };
    $scope.getEmployeeTimeWorked = function() {
      var employee;
      if (employee = $scope.getEmployee()) {
        return _.find(w.content.employees, function(e) {
          return e.id === employee.id;
        }).total_time_worked;
      }
    };
    $scope.getEmployeeTimeOff = function() {
      var employee;
      if (employee = $scope.getEmployee()) {
        return _.find(w.content.employees, function(e) {
          return e.id === employee.id;
        }).total_time_off;
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrTimesheets', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrTimesheetsCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-workforce-summary', []);

  module.controller('WidgetHrWorkforceSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content) && (w.content.summary != null) && !_.isEmpty(w.content.summary.data)) {
        $scope.periodOptions = [
          {
            label: 'Yearly',
            value: 'yearly'
          }, {
            label: 'Monthly',
            value: 'monthly'
          }, {
            label: 'Weekly',
            value: 'weekly'
          }, {
            label: 'Hourly',
            value: 'hourly'
          }
        ];
        $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
          return o.value === w.content.total.period.toLowerCase();
        }) || $scope.periodOptions[0]);
        $scope.filterOptions = [
          {
            label: 'Gender',
            value: 'gender'
          }, {
            label: 'Age Range',
            value: 'age_range'
          }, {
            label: 'Salary Range',
            value: 'salary_range'
          }, {
            label: 'Job Title',
            value: 'job_title'
          }
        ];
        return $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return o.value === w.content.summary.filter;
        }) || $scope.filterOptions[0]);
      }
    };
    $scope.getTotalWorkforce = function() {
      if ($scope.isDataFound) {
        return w.content.total.amount;
      }
    };
    $scope.getNumberOfEmployees = function() {
      if ($scope.isDataFound) {
        return w.content.total.employees;
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.total.currency;
      }
    };
    $scope.formatSalaryRange = function(aRange) {
      var range1, range2;
      range1 = $filter('mnoCurrency')(aRange.label.split('-')[0], aRange.currency, false);
      range2 = $filter('mnoCurrency')(aRange.label.split('-')[1], aRange.currency, false);
      return [range1, range2].join(" - ");
    };
    $scope.getColorByIndex = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var barData, barOptions, chartData, pieData, pieOptions;
      if ($scope.isDataFound) {
        if ($scope.filter.value === 'salary_range') {
          barData = {
            labels: _.map(w.content.summary.data, function(elem) {
              return $scope.formatSalaryRange(elem);
            }),
            values: _.map(w.content.summary.data, function(elem) {
              return elem.value;
            })
          };
          barOptions = {
            showTooltips: false,
            showXLabels: false,
            barDatasetSpacing: 15
          };
          chartData = ChartFormatterSvc.barChart(barData, barOptions);
        } else {
          pieData = _.map(w.content.summary.data, function(elem) {
            return {
              label: elem.label,
              value: elem.value
            };
          });
          pieOptions = {
            showTooltips: true,
            percentageInnerCutout: 50,
            tooltipFontSize: 12
          };
          chartData = ChartFormatterSvc.pieChart(pieData, pieOptions);
        }
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetHrWorkforceSummary', function() {
    return {
      restrict: 'A',
      controller: 'WidgetHrWorkforceSummaryCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.invoices-aged-payables-receivables', []);

  module.controller('WidgetInvoicesAgedPayablesReceivablesCtrl', ["$scope", "$q", "$log", "$filter", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, $log, $filter, ChartFormatterSvc, ImpacWidgetsSvc) {
    var selectedElementsSetting, settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && (!_.isEmpty(w.content.payables) || !_.isEmpty(w.content.receivables)) && !_.isEmpty(w.content.dates)) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.metadata.selectedElements) {
          $scope.selectedElements = [];
          angular.forEach(w.metadata.selectedElements, function(sElem) {
            var foundElem;
            if (sElem.name === "aged_payables") {
              foundElem = w.content.payables;
            }
            if (sElem.name === "aged_receivables" && !foundElem) {
              foundElem = w.content.receivables;
            }
            if (!foundElem) {
              foundElem = _.find(w.content.payables.suppliers, function(supplier) {
                return supplier.id === sElem.id;
              });
            }
            if (!foundElem) {
              foundElem = _.find(w.content.receivables.customers, function(customer) {
                return customer.id === sElem.id;
              });
            }
            if (foundElem) {
              return $scope.selectedElements.push(foundElem);
            }
          });
        }
        if (!(($scope.selectedElements != null) && $scope.selectedElements.length > 0)) {
          return w.width = 6;
        }
      }
    };
    $scope.getElementChartColor = function(index) {
      if (index != null) {
        return ChartFormatterSvc.getColor(index);
      }
    };
    $scope.getLastValue = function(element) {
      if ((element != null) && (element.totals != null)) {
        return _.last(element.totals);
      }
    };
    $scope.getTotalSum = function(element) {
      if ((element != null) && (element.totals != null)) {
        return _.reduce(element.totals, function(memo, num) {
          return memo + num;
        }, 0);
      }
    };
    $scope.getName = function(element) {
      if ((element != null) && (element.name != null)) {
        return element.name.replace(/_/g, " ");
      }
    };
    $scope.getPeriod = function() {
      var period, period_param;
      if ($scope.isDataFound && w.metadata && w.metadata.hist_parameters) {
        period_param = w.metadata.hist_parameters.period || "MONTHLY";
        period = "day";
        if (period_param !== "DAILY") {
          period = period_param.substr(0, period_param.length - 2).toLowerCase();
        }
        return "current " + period;
      } else {
        return "current month";
      }
    };
    $scope.toggleSelectedElement = function(element) {
      if ($scope.isSelected(element)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element) {
      if ((element != null) && ($scope.selectedElements != null)) {
        if (_.find($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        })) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    $scope.toggleCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === element.name;
          });
        } else {
          $scope.unCollapsed.push(element.name);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    $scope.hasElements = function() {
      return ($scope.selectedElements != null) && $scope.selectedElements.length > 0;
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, dates, inputData, options, period;
      if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
        all_values_are_positive = true;
        inputData = [];
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        angular.forEach($scope.selectedElements, function(sElem) {
          var data;
          data = angular.copy(sElem);
          inputData.push({
            title: data.name,
            labels: dates,
            values: data.totals
          });
          return angular.forEach(data.totals, function(value) {
            return all_values_are_positive && (all_values_are_positive = value >= 0);
          });
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: $scope.selectedElements.length === 1,
          pointDot: $scope.selectedElements.length === 1
        };
        chartData = ChartFormatterSvc.lineChart(inputData, options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    selectedElementsSetting = {};
    selectedElementsSetting.initialized = false;
    selectedElementsSetting.initialize = function() {
      return selectedElementsSetting.initialized = true;
    };
    selectedElementsSetting.toMetadata = function() {
      return {
        selectedElements: $scope.selectedElements
      };
    };
    w.settings.push(selectedElementsSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetInvoicesAgedPayablesReceivables', function() {
    return {
      restrict: 'A',
      controller: 'WidgetInvoicesAgedPayablesReceivablesCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.invoices-list', []);

  module.controller('WidgetInvoicesListCtrl', ["$scope", "$q", "$filter", "ImpacUtilities", function($scope, $q, $filter, ImpacUtilities) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.limitEntriesDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.limitEntriesDeferred.promise, $scope.datesPickerDeferred.promise];
    w.initContext = function() {
      var dates, datesRange;
      $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.entities);
      if ($scope.isDataFound && $scope.orderBy === 'due ') {
        if ($scope.entityType === 'suppliers') {
          $scope.limitEntriesLabel = 'creditors';
        } else {
          $scope.limitEntriesLabel = 'debtors';
        }
      }
      if ((w.metadata != null) && (w.metadata.limit_entries != null)) {
        $scope.limitEntriesSelected = w.metadata.limit_entries;
      }
      if ($scope.isDataFound) {
        dates = _.flatten(_.map(w.content.entities, (function(e) {
          return _.map(e.invoices, (function(i) {
            return i.invoice_date;
          }));
        })));
        datesRange = ImpacUtilities.getDatesRange(dates);
        $scope.defaultFrom = $filter('date')(datesRange[0], 'yyyy-MM-dd');
        return $scope.defaultTo = $filter('date')(datesRange[1], 'yyyy-MM-dd');
      }
    };
    $scope.entityType = w.metadata.entity;
    $scope.entityTypeCap = _.capitalize(w.metadata.entity);
    if (_.isEmpty(w.metadata.order_by) || w.metadata.order_by === 'name' || w.metadata.order_by === 'total_invoiced') {
      $scope.orderBy = '';
    } else {
      $scope.orderBy = _.last(w.metadata.order_by.split('_')).concat(" ");
    }
    $scope.getInvoices = function(entity) {
      var count, tooltip;
      tooltip = ["<strong>" + entity.name + "</strong>"];
      count = 1;
      angular.forEach(entity.invoices, function(i) {
        var paid, txn;
        if (i.transaction_no !== "") {
          txn = " (" + i.transaction_no + ")";
        } else {
          txn = "";
        }
        if (i.tooltip_status === "partially paid") {
          paid = " (" + $filter('mnoCurrency')(i.paid, i.currency, true) + " over " + $filter('mnoCurrency')(i.invoiced, i.currency, true) + ")";
        } else {
          paid = " (" + $filter('mnoCurrency')(i.invoiced, i.currency, true) + ")";
        }
        tooltip.push("#" + count + txn + " - " + i.tooltip_status + paid);
        return count++;
      });
      return tooltip.join("<br />");
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetInvoicesList', function() {
    return {
      restrict: 'A',
      controller: 'WidgetInvoicesListCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.invoices-summary', []);

  module.controller('WidgetInvoicesSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartFiltersDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartFiltersDeferred.promise, $scope.chartDeferred.promise, $scope.datesPickerDeferred.promise];
    $scope.defaultFrom = (new Date().getFullYear() - 10) + "-01-01";
    w.initContext = function() {
      return $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.summary);
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = _.map(w.content.summary, function(entity) {
          return {
            label: entity.name,
            value: entity.total
          };
        });
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12
        };
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetInvoicesSummary', function() {
    return {
      restrict: 'A',
      controller: 'WidgetInvoicesSummaryCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-aged', []);

  module.controller('WidgetSalesAgedCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.aged_sales) && !_.isEmpty(w.content.dates)) {
        $scope.filterOptions = [
          {
            label: 'value sold (incl. taxes)',
            value: 'gross_value_sold'
          }, {
            label: 'value sold (excl. taxes)',
            value: 'net_value_sold'
          }, {
            label: 'quantity sold',
            value: 'quantity_sold'
          }
        ];
        return $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return w.metadata && w.metadata.filter === o.value;
        }) || $scope.filterOptions[0]);
      }
    };
    $scope.getTotal = function(anIndex) {
      if ($scope.isDataFound && anIndex >= 0 && anIndex < w.content.aged_sales[$scope.filter.value].length) {
        return w.content.aged_sales[$scope.filter.value][anIndex];
      }
    };
    $scope.getLastDate = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.dates);
      }
    };
    $scope.getClassColor = function(prev, value) {
      if (value < prev) {
        return 'negative';
      } else if (value > prev) {
        return 'positive';
      } else {
        return null;
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, inputData, options, period, values;
      if ($scope.isDataFound) {
        all_values_are_positive = true;
        inputData = [];
        values = w.content.aged_sales[$scope.filter.value];
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        $scope.formattedDates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData.push({
          title: $scope.filter.label,
          labels: $scope.formattedDates,
          values: values
        });
        angular.forEach(values, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: true,
          pointDot: true
        };
        if ($scope.filter.value.indexOf('quantity') > -1) {
          angular.merge(options, {
            currency: 'hide'
          });
        }
        chartData = ChartFormatterSvc.lineChart(inputData, options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesAged', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesAgedCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-break-even', []);

  module.controller('WidgetSalesBreakEvenCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, thresholdSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales);
      return $scope.threshold = w.metadata.threshold;
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.getProjectedDate = function() {
      var date;
      if ($scope.isDataFound && w.content.break_even) {
        if (("" + w.content.break_even.projected_date).match('After')) {
          date = angular.copy(w.content.break_even.projected_date).replace('After ', '');
          return "> " + ($filter('date')(date, 'd-MM-yy'));
        } else {
          return w.content.break_even.projected_date;
        }
      }
    };
    $scope.getOpportunitiesToClose = function() {
      var opps;
      if ($scope.isDataFound && w.content.break_even) {
        if (("" + w.content.break_even.opportunities_to_close).match('>')) {
          opps = angular.copy(w.content.break_even.opportunities_to_close).replace('>', '');
          return "> " + opps;
        } else {
          return w.content.break_even.opportunities_to_close;
        }
      }
    };
    $scope.isTargetMet = function() {
      if ($scope.isDataFound && w.content.break_even) {
        return w.content.break_even.variance < 0;
      }
    };
    $scope.getVariance = function() {
      if ($scope.isDataFound && w.content.break_even) {
        return Math.abs(w.content.break_even.variance);
      }
    };
    thresholdSetting = {};
    thresholdSetting.initialized = false;
    thresholdSetting.initialize = function() {
      return thresholdSetting.initialized = true;
    };
    thresholdSetting.toMetadata = function() {
      return {
        threshold: $scope.threshold
      };
    };
    w.settings.push(thresholdSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesBreakEven', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesBreakEvenCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-comparison', []);

  module.controller('WidgetSalesComparisonCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, $filter, ChartFormatterSvc, ImpacWidgetsSvc) {
    var selectedElementsSetting, settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1, $scope.paramSelectorDeferred2, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales_comparison) && !_.isEmpty(w.content.dates);
      if ($scope.isDataFound) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        $scope.filterOptions = [
          {
            label: 'value sold (incl. taxes)',
            value: 'gross_value_sold'
          }, {
            label: 'value sold (excl. taxes)',
            value: 'net_value_sold'
          }, {
            label: 'quantity sold',
            value: 'quantity_sold'
          }
        ];
        $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return w.metadata && w.metadata.filter === o.value;
        }) || $scope.filterOptions[0]);
        $scope.criteriaOptions = [
          {
            label: 'products',
            value: 'default'
          }, {
            label: 'locations',
            value: 'location'
          }, {
            label: 'industries',
            value: 'industry'
          }, {
            label: 'customers',
            value: 'customer'
          }
        ];
        $scope.criteria = angular.copy(_.find($scope.criteriaOptions, function(o) {
          return w.metadata && w.metadata.criteria === o.value;
        }) || $scope.criteriaOptions[0]);
        if (w.metadata.selectedElements) {
          $scope.selectedElements = [];
          return angular.forEach(w.metadata.selectedElements, function(sElem) {
            var foundElem;
            foundElem = _.find(w.content.sales_comparison, function(statement) {
              return statement.name === sElem.name;
            });
            if (!foundElem) {
              angular.forEach(w.content.sales_comparison, function(statement) {
                if (statement.sales != null) {
                  return foundElem || (foundElem = _.find(statement.sales, function(sale) {
                    return sElem.id === sale.id;
                  }));
                }
              });
            }
            if (foundElem) {
              return $scope.selectedElements.push(foundElem);
            }
          });
        }
      }
    };
    $scope.getLastDate = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.dates);
      }
    };
    $scope.getTotalForPeriod = function(element) {
      if ((element.totals != null) && $scope.filter) {
        return _.reduce(element.totals[$scope.filter.value], function(memo, total) {
          return memo + total;
        }, 0);
      }
    };
    $scope.getElementChartColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.toggleSelectedElement = function(element) {
      if ($scope.isSelected(element)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element) {
      if ((element != null) && ($scope.selectedElements != null)) {
        if (_.find($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        })) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    $scope.toggleCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === element.name;
          });
        } else {
          $scope.unCollapsed.push(element.name);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    $scope.hasElements = function() {
      return ($scope.selectedElements != null) && $scope.selectedElements.length > 0;
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, inputData, options;
      if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
        all_values_are_positive = true;
        inputData = [];
        angular.forEach($scope.selectedElements, function(sElem) {
          var data, dates, period;
          data = angular.copy(sElem);
          period = null;
          if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
            period = w.metadata.hist_parameters.period;
          }
          dates = _.map(w.content.dates, function(date) {
            return $filter('mnoDate')(date, period);
          });
          inputData.push({
            title: data.name,
            labels: dates,
            values: data.totals[$scope.filter.value]
          });
          return angular.forEach(data.totals, function(value) {
            return all_values_are_positive && (all_values_are_positive = value >= 0);
          });
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: false,
          pointDot: false
        };
        if ($scope.filter.value.indexOf('quantity') > -1) {
          angular.merge(options, {
            currency: 'hide'
          });
        }
        chartData = ChartFormatterSvc.lineChart(inputData, options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    selectedElementsSetting = {};
    selectedElementsSetting.initialized = false;
    selectedElementsSetting.initialize = function() {
      return selectedElementsSetting.initialized = true;
    };
    selectedElementsSetting.toMetadata = function() {
      return {
        selectedElements: $scope.selectedElements
      };
    };
    w.settings.push(selectedElementsSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesComparison', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesComparisonCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-customer-details', []);

  module.controller('WidgetSalesCustomerDetailsCtrl', ["$scope", "$q", function($scope, $q) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.customers);
      if ($scope.isDataFound) {
        $scope.customersOptions = _.map(w.content.customers, function(e) {
          return {
            value: e.uid,
            label: e.name
          };
        });
        return $scope.selectedCustomer = {
          value: $scope.getCustomer().uid,
          label: $scope.getCustomer().name
        };
      }
    };
    $scope.getCustomer = function() {
      var customer;
      if (!$scope.isDataFound) {
        return false;
      }
      if (w.metadata && w.metadata.customer_uid) {
        customer = angular.copy(_.find(w.content.customers, function(e) {
          return e.uid === w.metadata.customer_uid;
        }) || w.content.customers[0]);
      } else {
        customer = angular.copy(w.content.customers[0]);
      }
      return customer;
    };
    $scope.formatAddress = function(anAddress) {
      if (angular.isDefined(anAddress)) {
        return anAddress.replace(/, /g, ',\n');
      }
    };
    $scope.getFromDate = function() {
      if ($scope.isDataFound) {
        return w.content.from;
      }
    };
    $scope.getToDate = function() {
      if ($scope.isDataFound) {
        return w.content.to;
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesCustomerDetails', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesCustomerDetailsCtrl'
    };
  });

}).call(this);

(function() {
  var module,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module = angular.module('impac.components.widgets.sales-cycle', []);

  module.controller('WidgetSalesCycleCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramsPickerDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramsPickerDeferred.promise, $scope.timePeriodDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.status_average_durations)) {
        $scope.unit = (w.metadata.unit || w.content.unit || "days").toLowerCase();
        $scope.statusOptions = _.compact(_.map(w.metadata.status_selection, function(status) {
          if (angular.isDefined(w.content.status_average_durations[status])) {
            return {
              label: status,
              selected: true
            };
          }
        }));
        return angular.forEach(w.content.status_average_durations, function(value, status) {
          if (w.metadata.status_selection && !(indexOf.call(w.metadata.status_selection, status) >= 0)) {
            return $scope.statusOptions.push({
              label: status,
              selected: false
            });
          } else if (_.isEmpty(w.metadata.status_selection)) {
            return $scope.statusOptions.push({
              label: status,
              selected: true
            });
          }
        });
      }
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = _.compact(_.map($scope.statusOptions, function(statusOption) {
          var value;
          value = w.content.status_average_durations[statusOption.label];
          if (statusOption.selected && angular.isDefined(value)) {
            return {
              label: ($filter('titleize')(statusOption.label)) + ": " + value + " " + $scope.unit,
              value: value
            };
          }
        }));
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12,
          currency: w.content.unit
        };
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesCycle', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesCycleCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-forecast', []);

  module.controller('WidgetSalesForecastCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      return $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.totals);
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.getOpportunityAmount = function(anOpp) {
      if ($scope.isDataFound && !_.isEmpty(anOpp)) {
        if (anOpp.amount && anOpp.amount.amount) {
          return anOpp.amount.amount;
        } else {
          return '-';
        }
      }
    };
    $scope.getOpportunityCurrency = function(anOpp) {
      if ($scope.isDataFound && !_.isEmpty(anOpp)) {
        if (anOpp.amount && anOpp.amount.currency) {
          return anOpp.amount.currency;
        } else if (w.content.currency) {
          return w.content.currency;
        } else {
          return 'AUD';
        }
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, formattedDates, inputData, options, period;
      if ($scope.isDataFound) {
        all_values_are_positive = true;
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        formattedDates = _.map(w.content.dates, function(aDate) {
          return $filter('mnoDate')(aDate, period);
        });
        inputData = [
          {
            title: 'Sales Performance',
            labels: formattedDates,
            values: w.content.totals
          }
        ];
        angular.forEach(w.content.totals, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: true,
          pointDot: false
        };
        chartData = ChartFormatterSvc.lineChart(inputData, options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesForecast', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesForecastCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-growth', []);

  module.controller('WidgetSalesGrowthCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise, $scope.chartDeferred.promise];
    $scope.isDataQuantity = true;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.productOptions = _.flatten(_.map(w.content.summary, function(product) {
          return {
            label: product.code,
            value: product.id
          };
        }));
        $scope.product = angular.copy(_.find($scope.productOptions, function(o) {
          return o.value === w.content.product;
        }) || {
          label: "SELECT PRODUCT",
          value: -1
        });
        $scope.filterOptions = [
          {
            label: 'value sold (incl. taxes)',
            value: 'gross_value_sold'
          }, {
            label: 'value sold (excl. taxes)',
            value: 'net_value_sold'
          }, {
            label: 'quantity sold',
            value: 'quantity_sold'
          }, {
            label: 'value purchased (incl. taxes)',
            value: 'gross_value_purchased'
          }, {
            label: 'value purchased (excl. taxes)',
            value: 'net_value_purchased'
          }, {
            label: 'quantity purchased',
            value: 'quantity_purchased'
          }
        ];
        $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return o.value === w.content.filter;
        }) || $scope.filterOptions[0]);
        return $scope.isDataQuantity = $scope.filter.value.match('quantity');
      }
    };
    $scope.getSelectedProduct = function() {
      if ($scope.isDataFound) {
        return _.find(w.content.summary, function(product) {
          return product.id === $scope.product.value;
        });
      }
    };
    $scope.getCurrentValue = function() {
      if ($scope.getSelectedProduct() != null) {
        return _.last($scope.getSelectedProduct().totals);
      }
    };
    $scope.getCurrentDate = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.dates);
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, data, dates, inputData, options, period;
      if ($scope.isDataFound && $scope.product && (data = $scope.getSelectedProduct())) {
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData = {
          title: data.name,
          labels: dates,
          values: data.totals
        };
        all_values_are_positive = true;
        angular.forEach(data.totals, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        if ($scope.filter.value.indexOf('quantity') > -1) {
          angular.merge(options, {
            currency: 'hide'
          });
        }
        chartData = ChartFormatterSvc.lineChart([inputData], options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesGrowth', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesGrowthCtrl'
    };
  });

}).call(this);

(function() {
  var module,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module = angular.module('impac.components.widgets.sales-leads-funnel', []);

  module.controller('WidgetSalesLeadsFunnelCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
    var hasOneLead, selectedStatusSetting, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.paramsPickerDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.paramsPickerDeferred.promise, $scope.widthDeferred.promise];
    hasOneLead = function(leadsPerStatus) {
      var reducedHash, total, totalsArray;
      reducedHash = _.mapValues(leadsPerStatus, function(statusHash) {
        return statusHash.total;
      });
      totalsArray = _.compact(_.values(reducedHash));
      total = _.reduce(totalsArray, function(total, n) {
        if (total == null) {
          total = 0;
        }
        return total + n;
      });
      return (total != null) && total > 0;
    };
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads_per_status) && hasOneLead(w.content.leads_per_status)) {
        $scope.statusOptions = _.compact(_.map(w.metadata.status_selection, function(status) {
          if (angular.isDefined(w.content.leads_per_status[status])) {
            return {
              label: status,
              selected: true
            };
          }
        }));
        return angular.forEach(w.content.leads_per_status, function(value, status) {
          if (w.metadata.status_selection && !(indexOf.call(w.metadata.status_selection, status) >= 0)) {
            return $scope.statusOptions.push({
              label: status,
              selected: false
            });
          } else if (_.isEmpty(w.metadata.status_selection)) {
            return $scope.statusOptions.push({
              label: status,
              selected: true
            });
          }
        });
      }
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.getImpacColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.toggleSelectStatus = function(aStatus) {
      if ($scope.selectedStatus && $scope.selectedStatus === aStatus) {
        $scope.selectedStatus = null;
      } else {
        $scope.selectedStatus = aStatus;
      }
      if (!w.isExpanded() && $scope.selectedStatus) {
        return w.toggleExpanded();
      } else {
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isSelected = function(aStatus) {
      return $scope.selectedStatus && aStatus === $scope.selectedStatus;
    };
    $scope.getSelectedLeads = function() {
      if ($scope.isDataFound && $scope.selectedStatus) {
        return w.content.leads_per_status[$scope.selectedStatus].leads;
      }
    };
    $scope.getLeadDescription = function(aLead) {
      var nameLineArray, tooltip;
      tooltip = [];
      nameLineArray = ["<strong>"];
      if (aLead.first_name) {
        nameLineArray.push($filter('titleize')(aLead.first_name));
      }
      if (aLead.last_name) {
        nameLineArray.push($filter('titleize')(aLead.last_name));
      }
      nameLineArray.push("</strong>");
      tooltip.push(nameLineArray.join(' '));
      tooltip.push("Status: " + ($filter('titleize')(aLead.lead_status)));
      if (aLead.organization) {
        tooltip.push("Organization: " + ($filter('titleize')(aLead.organization)));
      }
      if (aLead.opportunities) {
        tooltip.push("<strong>Opportunities:</strong>");
        angular.forEach(aLead.opportunities, function(opp) {
          var oppLineArray;
          oppLineArray = [];
          if (opp.code) {
            oppLineArray.push("#" + opp.code);
          }
          if (opp.name) {
            oppLineArray.push("" + opp.name);
          }
          if (opp.amount) {
            oppLineArray.push($filter('mnoCurrency')(opp.amount.total_amount, "USD", false));
          }
          if (opp.probability) {
            oppLineArray.push(opp.probability + "%");
          }
          if (opp.sales_stage) {
            oppLineArray.push("" + opp.sales_stage);
          }
          return tooltip.push(oppLineArray.join(' - '));
        });
      }
      return tooltip.join("<br />");
    };
    selectedStatusSetting = {};
    selectedStatusSetting.initialized = false;
    selectedStatusSetting.initialize = function() {
      if (!_.isEmpty(w.content) && angular.isDefined(w.content.leads_per_status[w.metadata.selected_status])) {
        $scope.selectedStatus = w.metadata.selected_status;
      }
      return selectedStatusSetting.initialized = true;
    };
    selectedStatusSetting.toMetadata = function() {
      return {
        selected_status: $scope.selectedStatus
      };
    };
    w.settings.push(selectedStatusSetting);
    w.format = function() {
      var max;
      if ($scope.isDataFound) {
        max = 0;
        angular.forEach($scope.statusOptions, function(statusOption) {
          var value;
          value = w.content.leads_per_status[statusOption.label].total;
          if (statusOption.selected && angular.isDefined(value) && value > max) {
            return max = value;
          }
        });
        if (max > 0) {
          return $scope.funnel = _.compact(_.map($scope.statusOptions, function(statusOption, index) {
            var coloredWidth, statusWidth, value;
            value = w.content.leads_per_status[statusOption.label].total;
            coloredWidth = (100 * (value / max) - 10).toFixed();
            if (coloredWidth < 8) {
              statusWidth = 92;
            } else {
              statusWidth = 100 - coloredWidth;
            }
            if (statusOption.selected && angular.isDefined(value)) {
              return {
                status: statusOption.label,
                number: value,
                coloredWidth: {
                  width: coloredWidth + "%"
                },
                statusWidth: {
                  width: statusWidth + "%"
                }
              };
            }
          }));
        }
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesLeadsFunnel', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesLeadsFunnelCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-leads-list', []);

  module.controller('WidgetSalesLeadsListCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise];
    w.initContext = function() {
      return $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads);
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.getLeadDescription = function(aLead) {
      var nameLineArray, tooltip;
      tooltip = [];
      nameLineArray = ["<strong>"];
      if (aLead.first_name) {
        nameLineArray.push($filter('titleize')(aLead.first_name));
      }
      if (aLead.last_name) {
        nameLineArray.push($filter('titleize')(aLead.last_name));
      }
      nameLineArray.push("</strong>");
      tooltip.push(nameLineArray.join(' '));
      tooltip.push("Status: " + ($filter('titleize')(aLead.lead_status)));
      if (aLead.organization) {
        tooltip.push("Organization: " + ($filter('titleize')(aLead.organization)));
      }
      if (aLead.opportunities) {
        tooltip.push("<strong>Opportunities:</strong>");
        angular.forEach(aLead.opportunities, function(opp) {
          var oppLineArray;
          oppLineArray = [];
          if (opp.code) {
            oppLineArray.push("#" + opp.code);
          }
          if (opp.name) {
            oppLineArray.push("" + opp.name);
          }
          if (opp.amount) {
            oppLineArray.push($filter('mnoCurrency')(opp.amount.total_amount, "USD", false));
          }
          if (opp.probability) {
            oppLineArray.push(opp.probability + "%");
          }
          if (opp.sales_stage) {
            oppLineArray.push("" + opp.sales_stage);
          }
          return tooltip.push(oppLineArray.join(' - '));
        });
      }
      return tooltip.join("<br />");
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesLeadsList', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesLeadsListCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-list', []);

  module.controller('WidgetSalesListCtrl', ["$scope", "$q", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, ImpacWidgetsSvc) {
    var settingsPromises, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.datesPickerDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary);
      $scope.filterOptions = [
        {
          label: 'value sold (incl. taxes)',
          value: 'gross_value_sold'
        }, {
          label: 'value sold (excl. taxes)',
          value: 'net_value_sold'
        }, {
          label: 'quantity sold',
          value: 'quantity_sold'
        }, {
          label: 'value purchased (incl. taxes)',
          value: 'gross_value_purchased'
        }, {
          label: 'value purchased (excl. taxes)',
          value: 'net_value_purchased'
        }, {
          label: 'quantity purchased',
          value: 'quantity_purchased'
        }
      ];
      $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
        return o.value === w.metadata.filter;
      }) || $scope.filterOptions[0]);
      return $scope.unCollapsed = w.metadata.unCollapsed || [];
    };
    $scope.toggleCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === categoryName;
          });
        } else {
          $scope.unCollapsed.push(categoryName);
        }
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesList', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesListCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-margin', []);

  module.controller('WidgetSalesMarginCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = (w.content != null) && (w.content.margins != null) && (w.content.dates != null);
      $scope.filterOptions = [
        {
          label: 'Including taxes',
          value: 'gross_margin'
        }, {
          label: 'Excluding taxes',
          value: 'net_margin'
        }
      ];
      if ((w.metadata != null) && w.metadata.filter === "net_margin") {
        return $scope.filter = angular.copy($scope.filterOptions[1]);
      } else {
        return $scope.filter = angular.copy($scope.filterOptions[0]);
      }
    };
    $scope.getTotalMargin = function() {
      if ($scope.isDataFound) {
        if ((w.metadata != null) && w.metadata.filter === "net_margin") {
          return _.reduce(w.content.margins.net, function(memo, margin) {
            return memo + margin;
          }, 0);
        } else {
          return _.reduce(w.content.margins.gross, function(memo, margin) {
            return memo + margin;
          }, 0);
        }
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency || "USD";
      }
    };
    $scope.getTimeSpan = function() {
      var period;
      if ($scope.isDataFound) {
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        return "From " + ($filter('mnoDate')(_.first(w.content.dates), period)) + " to " + ($filter('mnoDate')(_.last(w.content.dates), period));
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, dates, inputData, options, period, values;
      if ($scope.isDataFound) {
        if ((w.metadata != null) && w.metadata.filter === "net_margin") {
          values = w.content.margins.net;
        } else {
          values = w.content.margins.gross;
        }
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData = {
          title: "Gross margin",
          labels: dates,
          values: values
        };
        all_values_are_positive = true;
        angular.forEach(values, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        chartData = ChartFormatterSvc.lineChart([inputData], options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesMargin', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesMarginCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-net-sales', []);

  module.controller('WidgetSalesNetSalesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelector1Deferred = $q.defer();
    $scope.paramSelector2Deferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelector1Deferred.promise, $scope.paramSelector2Deferred.promise];
    $scope.displayOptions = [
      {
        label: 'Total amount',
        value: 'total'
      }, {
        label: 'Average amount',
        value: 'average'
      }, {
        label: 'Volume',
        value: 'trans_count'
      }
    ];
    $scope.displayType = angular.copy(_.find($scope.displayOptions, function(o) {
      return w.metadata && o.value === w.metadata.display_type;
    }) || $scope.displayOptions[0]);
    $scope.timeRangeOptions = [
      {
        label: 'Last 24h',
        value: '-1d'
      }, {
        label: 'Last 5 days',
        value: '-5d'
      }, {
        label: 'Last 7 days',
        value: '-7d'
      }, {
        label: 'Last 30 days',
        value: '-30d'
      }, {
        label: 'Last 45 days',
        value: '-45d'
      }, {
        label: 'Last 60 days',
        value: '-60d'
      }, {
        label: 'Last 90 days',
        value: '-90d'
      }
    ];
    $scope.timeRange = angular.copy(_.find($scope.timeRangeOptions, function(o) {
      return w.metadata && o.value === w.metadata.time_range;
    }) || $scope.timeRangeOptions[6]);
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && (w.content.sales != null) && w.content.sales.length > 0 && (w.content.sales[0].total != null);
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency;
      }
    };
    $scope.getValue = function(valueType) {
      if ((w.content != null) && w.content[valueType]) {
        switch ($scope.displayType.value) {
          case 'total':
            return $filter('mnoCurrency')(w.content[valueType][0].total, $scope.getCurrency(), false);
          case 'average':
            return $filter('mnoCurrency')(w.content[valueType][0].avg, $scope.getCurrency(), false);
          case 'trans_count':
            return w.content[valueType][0].trans_count;
        }
      } else {
        return 0;
      }
    };
    $scope.sign = function(type) {
      if ($scope.displayType.value === 'average') {
        return {
          minus: '~',
          equal: '=>'
        }[type];
      } else if ($scope.displayType.value === 'trans_count') {
        return {
          minus: '+',
          equal: '='
        }[type];
      } else {
        return {
          minus: '-',
          equal: '='
        }[type];
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesNetSales', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesNetSalesCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-new-vs-existing-customers', []);

  module.controller('WidgetSalesNewVsExistingCustomersCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timeRangeParamSelectorDeferred = $q.defer();
    $scope.displayTypeParamSelectorDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeParamSelectorDeferred.promise, $scope.displayTypeParamSelectorDeferred.promise, $scope.chartDeferred.promise];
    $scope.displayOptions = [
      {
        label: 'Customers',
        value: 'customers_count'
      }, {
        label: 'Total Sales',
        value: 'total_sales'
      }, {
        label: 'Transactions',
        value: 'transactions_count'
      }
    ];
    $scope.displayType = angular.copy(_.find($scope.displayOptions, function(o) {
      return w.metadata && (o.value === w.metadata.display_type);
    }) || $scope.displayOptions[0]);
    $scope.timeRangeOptions = [
      {
        label: 'Last 24h',
        value: '-1d'
      }, {
        label: 'Last 5 days',
        value: '-5d'
      }, {
        label: 'Last 7 days',
        value: '-7d'
      }, {
        label: 'Last 30 days',
        value: '-30d'
      }, {
        label: 'Last 45 days',
        value: '-45d'
      }, {
        label: 'Last 60 days',
        value: '-60d'
      }, {
        label: 'Last 90 days',
        value: '-90d'
      }
    ];
    $scope.timeRange = angular.copy(_.find($scope.timeRangeOptions, function(o) {
      return w.metadata && (o.value === w.metadata.time_range);
    }) || $scope.timeRangeOptions[6]);
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && (w.content.summary != null) && (w.content.summary.customers_count != null) && (w.content.summary.customers_count.total != null) && w.content.summary.customers_count.total > 0;
    };
    $scope.displayTypeOnClick = function() {
      $scope.updateSettings(false);
      return w.format();
    };
    $scope.getValue = function(key) {
      var result, returnType;
      if ($scope.isDataFound) {
        returnType = $scope.displayType.value;
        result = w.content.summary[returnType][key];
        switch (returnType) {
          case 'total_sales':
            return $filter('mnoCurrency')(result, w.metadata.currency);
          default:
            return result;
        }
      }
    };
    $scope.shouldDisplayCurrency = function() {
      return $scope.isDataFound && $scope.displayType.value.indexOf('count') < 0;
    };
    $scope.calculatePercentage = function(sliceType) {
      return Math.round(w.content.summary[$scope.displayType.value][sliceType] / w.content.summary[$scope.displayType.value].total * 100);
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = [
          {
            label: "EXISTING " + ($scope.calculatePercentage('existing')) + "%",
            value: w.content.summary[$scope.displayType.value].existing
          }, {
            label: "NEW " + ($scope.calculatePercentage('new')) + "%",
            value: w.content.summary[$scope.displayType.value]["new"]
          }
        ];
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12
        };
        if (!$scope.shouldDisplayCurrency()) {
          angular.merge(pieOptions, {
            currency: 'hide'
          });
        }
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions, true);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesNewVsExistingCustomers', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesNewVsExistingCustomersCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-number-of-leads', []);

  module.controller('WidgetSalesNumberOfLeadsCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var getVariation, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.number_of_leads)) {
        $scope.periodOptions = [
          {
            label: 'year',
            value: 'YEARLY'
          }, {
            label: 'quarter',
            value: 'QUARTERLY'
          }, {
            label: 'month',
            value: 'MONTHLY'
          }, {
            label: 'week',
            value: 'WEEKLY'
          }, {
            label: 'day',
            value: 'DAILY'
          }
        ];
        return $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
          return o.value === w.metadata.period;
        }) || $scope.periodOptions[3]);
      }
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.formatNumberOfLeads = function(carac) {
      var color, formattedNominal, formattedVariation, n_hash, nominal, variation;
      formattedNominal = 0;
      formattedVariation = "- %";
      if (!$scope.isDataFound) {
        return {
          nominal: formattedNominal,
          variation: formattedVariation,
          color: ''
        };
      }
      n_hash = angular.copy(w.content.number_of_leads);
      nominal = 0;
      color = '';
      if (carac === "new" && n_hash.total && n_hash.total.length === 2) {
        nominal = n_hash.total[1] - n_hash.total[0];
        variation = getVariation(n_hash.total);
        if (variation > 0) {
          color = 'green';
        } else if (variation < 0) {
          color = 'red';
        }
      } else if (carac === "converted" && n_hash.converted && n_hash.converted.length === 2) {
        nominal = n_hash.converted[1];
        variation = getVariation(n_hash.converted);
        if (variation > 0) {
          color = 'green';
        } else if (variation < 0) {
          color = 'red';
        }
      } else if (carac === "lost" && n_hash.lost && n_hash.lost.length === 2) {
        nominal = n_hash.lost[1];
        variation = getVariation(n_hash.lost);
        if (variation < 0) {
          color = 'green';
        } else if (variation > 0) {
          color = 'red';
        }
      } else {
        return {
          nominal: formattedNominal,
          variation: formattedVariation,
          color: color
        };
      }
      if (nominal > 0) {
        formattedNominal = "+" + nominal;
      } else if (nominal < 0) {
        formattedNominal = nominal;
      }
      if (variation && variation > 0) {
        formattedVariation = "+" + (variation.toFixed(0)) + "%";
      } else if (variation && variation < 0) {
        formattedVariation = (variation.toFixed(0)) + "%";
      }
      return {
        nominal: formattedNominal,
        variation: formattedVariation,
        color: color
      };
    };
    getVariation = function(v_array) {
      var variation;
      if (v_array[0] !== 0) {
        return variation = 100 * ((v_array[1] / v_array[0]) - 1);
      } else {
        return variation = "- ";
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesNumberOfLeads', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesNumberOfLeadsCtrl'
    };
  });

}).call(this);

(function() {
  var module,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module = angular.module('impac.components.widgets.sales-opportunities-funnel', []);

  module.controller('WidgetSalesOpportunitiesFunnelCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
    var hasOneOpportunity, selectedStatusSetting, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramsPickerDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramsPickerDeferred.promise, $scope.widthDeferred.promise];
    hasOneOpportunity = function(oppsPerSalesStage) {
      var reducedHash, total, totalsArray;
      reducedHash = _.mapValues(oppsPerSalesStage, function(statusHash) {
        return statusHash.total;
      });
      totalsArray = _.compact(_.values(reducedHash));
      total = _.reduce(totalsArray, function(total, n) {
        if (total == null) {
          total = 0;
        }
        return total + n;
      });
      return (total != null) && total > 0;
    };
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opps_per_sales_stage) && hasOneOpportunity(w.content.opps_per_sales_stage)) {
        $scope.statusOptions = _.compact(_.map(w.metadata.sales_stage_selection, function(status) {
          if (angular.isDefined(w.content.opps_per_sales_stage[status])) {
            return {
              label: status,
              selected: true
            };
          }
        }));
        return angular.forEach(w.content.opps_per_sales_stage, function(value, status) {
          if (w.metadata.sales_stage_selection && !(indexOf.call(w.metadata.sales_stage_selection, status) >= 0)) {
            return $scope.statusOptions.push({
              label: status,
              selected: false
            });
          } else if (_.isEmpty(w.metadata.sales_stage_selection)) {
            return $scope.statusOptions.push({
              label: status,
              selected: true
            });
          }
        });
      }
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.getImpacColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.toggleSelectStatus = function(aStatus) {
      if ($scope.selectedStatus && $scope.selectedStatus === aStatus) {
        $scope.selectedStatus = null;
      } else {
        $scope.selectedStatus = aStatus;
      }
      if (!w.isExpanded() && $scope.selectedStatus) {
        return w.toggleExpanded();
      } else {
        return ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
    };
    $scope.isSelected = function(aStatus) {
      return $scope.selectedStatus && aStatus === $scope.selectedStatus;
    };
    $scope.getSelectedOpportunities = function() {
      if ($scope.isDataFound && $scope.selectedStatus) {
        return w.content.opps_per_sales_stage[$scope.selectedStatus].opps;
      }
    };
    $scope.getOppDetails = function(anOpp) {
      var oppDetails;
      oppDetails = [];
      if (anOpp.amount) {
        oppDetails.push($filter('mnoCurrency')(anOpp.amount.amount, anOpp.amount.currency || 'AUD'));
      }
      if (anOpp.probability) {
        oppDetails.push("prob. " + anOpp.probability + "%");
      }
      return oppDetails.join(' / ');
    };
    selectedStatusSetting = {};
    selectedStatusSetting.initialized = false;
    selectedStatusSetting.initialize = function() {
      if (!_.isEmpty(w.content) && angular.isDefined(w.content.opps_per_sales_stage[w.metadata.selected_status])) {
        $scope.selectedStatus = w.metadata.selected_status;
      }
      return selectedStatusSetting.initialized = true;
    };
    selectedStatusSetting.toMetadata = function() {
      return {
        selected_status: $scope.selectedStatus
      };
    };
    w.settings.push(selectedStatusSetting);
    w.format = function() {
      var max;
      if ($scope.isDataFound) {
        max = 0;
        angular.forEach($scope.statusOptions, function(statusOption) {
          var value;
          value = w.content.opps_per_sales_stage[statusOption.label].total;
          if (statusOption.selected && angular.isDefined(value) && value > max) {
            return max = value;
          }
        });
        if (max > 0) {
          return $scope.funnel = _.compact(_.map($scope.statusOptions, function(statusOption, index) {
            var coloredWidth, statusWidth, value;
            value = w.content.opps_per_sales_stage[statusOption.label].total;
            coloredWidth = (100 * (value / max) - 10).toFixed();
            if (coloredWidth < 8) {
              statusWidth = 92;
            } else {
              statusWidth = 100 - coloredWidth;
            }
            if (statusOption.selected && angular.isDefined(value)) {
              return {
                status: statusOption.label,
                number: value,
                coloredWidth: {
                  width: coloredWidth + "%"
                },
                statusWidth: {
                  width: statusWidth + "%"
                }
              };
            }
          }));
        }
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesOpportunitiesFunnel', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesOpportunitiesFunnelCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-performance', []);

  module.controller('WidgetSalesPerformanceCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, $filter, ChartFormatterSvc, ImpacWidgetsSvc) {
    var selectedElementSetting, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.assignees);
      if ($scope.isDataFound && w.metadata.selectedElement) {
        return $scope.selectedElement = _.find(w.content.assignees, function(statement) {
          return statement.name === w.metadata.selectedElement.name;
        });
      }
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.getWonOpportunities = function(element) {
      if ((element != null) && (element.opportunities != null)) {
        return _.select(element.opportunities, function(opp) {
          return opp.sales_stage.toLowerCase().match(/won/);
        });
      }
    };
    $scope.getLostOpportunities = function(element) {
      if ((element != null) && (element.opportunities != null)) {
        return _.select(element.opportunities, function(opp) {
          return !opp.sales_stage.toLowerCase().match(/won/);
        });
      }
    };
    $scope.getCloseDate = function(anOpp) {
      var period, theDate;
      if ((anOpp != null) && (anOpp.sales_stage_changes != null) && anOpp.sales_stage_changes.length > 0) {
        theDate = anOpp.sales_stage_changes[anOpp.sales_stage_changes.length - 1].updated_at;
        if (theDate.split(' ').length > 0) {
          theDate = theDate.split(' ')[0];
        }
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        return $filter('mnoDate')(theDate, period);
      }
    };
    $scope.toggleSelectedElement = function(element) {
      if ($scope.isSelected(element)) {
        $scope.selectedElement = null;
        if (w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        $scope.selectedElement = angular.copy(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element) {
      return (element != null) && ($scope.selectedElement != null) && ((element.name != null) && element.name === $scope.selectedElement.name);
    };
    selectedElementSetting = {};
    selectedElementSetting.initialized = false;
    selectedElementSetting.initialize = function() {
      return selectedElementSetting.initialized = true;
    };
    selectedElementSetting.toMetadata = function() {
      return {
        selectedElement: $scope.selectedElement
      };
    };
    w.settings.push(selectedElementSetting);
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, data, dates, inputData, options, period;
      if ($scope.isDataFound && ($scope.selectedElement != null)) {
        data = angular.copy($scope.selectedElement);
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData = {
          title: data.name,
          labels: dates,
          values: data.totals
        };
        all_values_are_positive = true;
        angular.forEach(data.totals, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true
        };
        chartData = ChartFormatterSvc.lineChart([inputData], options);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesPerformance', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesPerformanceCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-segmented-turnover', []);

  module.controller('WidgetSalesSegmentedTurnoverCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", function($scope, $q, $filter, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.ranges)) {
        $scope.filterOptions = [
          {
            label: 'Gross revenue (incl. taxes)',
            value: 'gross'
          }, {
            label: 'Net revenue (excl. taxes)',
            value: 'net'
          }
        ];
        return $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return o.value === w.content.filter;
        }) || $scope.filterOptions[0]);
      }
    };
    $scope.getAnalysis = function() {
      if ($scope.isDataFound) {
        if (w.content.ranges[0].percentage + w.content.ranges[1].percentage > 50) {
          return "Your less expensive products bring you most of your revenue.";
        } else if (w.content.ranges[3].percentage + w.content.ranges[4].percentage > 50) {
          return "Your most expensive products bring you most of your revenue.";
        } else {
          return "Your revenue is balanced between your different products segments.";
        }
      }
    };
    $scope.getColorByIndex = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.getRangeLabel = function(aLabel) {
      var prices;
      prices = aLabel.split('-');
      return _.map(prices, function(price) {
        return $filter('mnoCurrency')(price, w.content.currency, false);
      }).join(' - ');
    };
    $scope.getMaxRange = function() {
      var max, maxRange;
      if ($scope.isDataFound) {
        max = 0;
        maxRange = w.content.ranges[0];
        angular.forEach(w.content.ranges, function(range) {
          if (range.percentage > max) {
            maxRange = angular.copy(range);
          }
          return max = Math.max(max, range.percentage);
        });
        return maxRange;
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var barData, barOptions, chartData;
      if ($scope.isDataFound) {
        barData = {
          labels: _.map(w.content.ranges, function(elem) {
            return elem.label;
          }),
          values: _.map(w.content.ranges, function(elem) {
            return elem.value;
          })
        };
        barOptions = {
          showTooltips: false,
          showXLabels: false,
          barDatasetSpacing: 15
        };
        chartData = ChartFormatterSvc.barChart(barData, barOptions);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesSegmentedTurnover', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesSegmentedTurnoverCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-summary', []);

  module.controller('WidgetSalesSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartFiltersDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartFiltersDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.datesPickerDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.summary);
      $scope.filterOptions = [
        {
          label: 'value sold (incl. taxes)',
          value: 'gross_value_sold'
        }, {
          label: 'value sold (excl. taxes)',
          value: 'net_value_sold'
        }, {
          label: 'quantity sold',
          value: 'quantity_sold'
        }, {
          label: 'value purchased (incl. taxes)',
          value: 'gross_value_purchased'
        }, {
          label: 'value purchased (excl. taxes)',
          value: 'net_value_purchased'
        }, {
          label: 'quantity purchased',
          value: 'quantity_purchased'
        }
      ];
      if (w.metadata.criteria === "customer") {
        $scope.filterOptions = [$scope.filterOptions[0], $scope.filterOptions[1], $scope.filterOptions[2]];
      }
      return $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
        return o.value === w.metadata.filter;
      }) || $scope.filterOptions[0]);
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = _.map(w.content.summary, function(entity) {
          var label;
          if (entity.company) {
            label = (entity.code || entity.name || entity.location || entity.industry || entity.customer) + " (" + entity.company + ")";
          } else {
            label = entity.code || entity.name || entity.location || entity.industry || entity.customer;
          }
          return {
            label: label,
            value: entity.total
          };
        });
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12
        };
        if ($scope.filter.value.indexOf('quantity') > -1) {
          angular.merge(pieOptions, {
            currency: 'hide'
          });
        }
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesSummary', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesSummaryCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-top-customers', []);

  module.controller('WidgetSalesTopCustomersCtrl', ["$scope", "$q", "$filter", "ImpacUtilities", function($scope, $q, $filter, ImpacUtilities) {
    var fields, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.datesPickerDeferred.promise, $scope.paramSelectorDeferred.promise];
    $scope.limitEntriesOptions = [
      {
        label: 'TOP - 5',
        value: 5
      }, {
        label: 'TOP - 10',
        value: 10
      }, {
        label: 'TOP - 25',
        value: 25
      }, {
        label: 'TOP - 50',
        value: 50
      }, {
        label: 'TOP - 100',
        value: 100
      }
    ];
    $scope.limitEntriesSelected = angular.copy(_.find($scope.limitEntriesOptions, function(o) {
      return (w.metadata != null) && (o.value === w.metadata.limit_entries);
    }) || $scope.limitEntriesOptions[3]);
    $scope.headerOptions = [
      {
        label: 'Total sales',
        value: 'total_sales',
        minified: 'total'
      }, {
        label: 'Transactions',
        value: 'transactions',
        minified: '# tr'
      }, {
        label: 'Avg sales',
        value: 'avg_sales',
        minified: 'avg'
      }, {
        label: 'Last sale',
        value: 'last_sale',
        minified: 'last'
      }
    ];
    $scope.headerSelected = angular.copy(_.find($scope.headerOptions, function(o) {
      return (w.metadata != null) && (w.metadata.header === o.value);
    }) || $scope.headerOptions[0]);
    w.initContext = function() {
      var dates, datesRange;
      if ($scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.entities)) {
        dates = _.flatten(_.map(w.content.entities, (function(e) {
          return _.map(e.invoices, (function(i) {
            return i.invoice_date;
          }));
        })));
        datesRange = ImpacUtilities.getDatesRange(dates);
        $scope.defaultFrom = $filter('date')(datesRange[0], 'yyyy-MM-dd');
        return $scope.defaultTo = $filter('date')(datesRange[1], 'yyyy-MM-dd');
      }
    };
    fields = [
      {
        label: 'total',
        showCurrency: true,
        getValue: function(entity) {
          return entity.total_invoiced;
        }
      }, {
        label: '# tr',
        showCurrency: false,
        getValue: function(entity) {
          return entity.invoices.length;
        }
      }, {
        label: 'avg',
        showCurrency: true,
        getValue: function(entity) {
          var total;
          total = entity.invoices.length;
          if (total > 0) {
            return entity.total_invoiced / entity.invoices.length;
          } else {
            return 0;
          }
        }
      }, {
        label: 'last',
        showCurrency: true,
        getValue: function(entity) {
          var total;
          total = entity.invoices.length;
          if (total > 0) {
            return entity.invoices[entity.invoices.length - 1].invoiced;
          } else {
            return 0;
          }
        }
      }
    ];
    $scope.getHeaderField = function() {
      return _.find(fields, function(f) {
        return f.label === $scope.headerSelected.minified;
      });
    };
    $scope.getRemainingFields = function() {
      return _.reject(fields, function(f) {
        return f.label === $scope.headerSelected.minified;
      });
    };
    $scope.getEntities = function() {
      if (!$scope.isDataFound) {
        return [];
      }
      return $filter('orderBy')(w.content.entities, (function(entity) {
        return $scope.getHeaderField().getValue(entity);
      }), true);
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesTopCustomers', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesTopCustomersCtrl',
      link: function(scope) {
        scope.transactionsCollapsed = false;
        return scope.toggleTransactions = function() {
          return scope.transactionsCollapsed = !scope.transactionsCollapsed;
        };
      }
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.sales-top-opportunities', []);

  module.controller('WidgetSalesTopOpportunitiesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise];
    w.initContext = function() {
      return $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opportunities);
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.getOppDetails = function(anOpp) {
      var oppDetails;
      oppDetails = [];
      if (anOpp.amount) {
        oppDetails.push($filter('mnoCurrency')(anOpp.amount.amount, anOpp.amount.currency || 'AUD'));
      }
      if (anOpp.probability) {
        oppDetails.push("proba " + anOpp.probability + "%");
      }
      if (anOpp.sales_stage) {
        oppDetails.push(anOpp.sales_stage);
      }
      return oppDetails.join(' / ');
    };
    $scope.getOppClass = function(index) {
      switch (index) {
        case 0:
          return 'first';
        case 1:
          return 'second';
        case 2:
          return 'second';
        default:
          return '';
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetSalesTopOpportunities', function() {
    return {
      restrict: 'A',
      controller: 'WidgetSalesTopOpportunitiesCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.data-not-found', []);

  module.directive('commonDataNotFound', ["$templateCache", "$log", "$http", "ImpacAssets", "ImpacTheming", "ImpacMainSvc", function($templateCache, $log, $http, ImpacAssets, ImpacTheming, ImpacMainSvc) {
    return {
      restrict: 'A',
      scope: {
        widgetEngine: '=',
        onDisplayAlerts: '&'
      },
      link: function(scope, element) {
        var baseDir, dir, hasMyobEssentialsOnly, image;
        scope.content = ImpacTheming.get().dataNotFoundConfig;
        baseDir = ImpacAssets.get('dataNotFound');
        if (scope.widgetEngine && baseDir.length > 0) {
          dir = baseDir.split('');
          dir = dir[dir.length - 1] !== '/' ? dir.concat('/').join('') : dir.join('');
          image = _.find(element.children().first().children(), function(elem) {
            return elem.id === 'not-found-bg';
          });
          image.onerror = function() {
            $log.warn("Missing data-not-found image for " + scope.widgetEngine);
            return image.remove();
          };
          image.src = dir + scope.widgetEngine + '.png';
        }
        hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only;
        scope.showAlertsTrigger = hasMyobEssentialsOnly && scope.widgetEngine.match(/.*accounts\/.*/);
        return scope.hasCallbackUrl = scope.content.linkUrlCallback != null;
      },
      template: $templateCache.get('widgets-common/data-not-found.tmpl.html')
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.editable-title', []);

  module.controller('CommonEditableTitleCtrl', ["$scope", "ImpacWidgetsSvc", function($scope, ImpacWidgetsSvc) {
    var w;
    w = $scope.parentWidget;
    return $scope.updateName = function() {
      var data;
      if (w.name.length === 0) {
        w.name = w.originalName;
        return "Incorrect name";
      } else {
        data = {
          name: w.name
        };
        return ImpacWidgetsSvc.update(w, data);
      }
    };
  }]);

  module.directive('commonEditableTitle', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '='
      },
      template: $templateCache.get('widgets-common/editable-title.tmpl.html'),
      controller: 'CommonEditableTitleCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.top-buttons', []);

  module.controller('CommonTopButtonsCtrl', ["$scope", "$rootScope", "$log", "ImpacWidgetsSvc", "ImpacAssets", "ImpacUtilities", function($scope, $rootScope, $log, ImpacWidgetsSvc, ImpacAssets, ImpacUtilities) {
    var w;
    w = $scope.parentWidget;
    $scope.showConfirmDelete = false;
    $scope.isDeletePopoverLoading = false;
    w.isEditMode = false;
    $scope.deleteWidget = function() {
      $scope.isDeletePopoverLoading = true;
      return ImpacWidgetsSvc["delete"](w).then(function(success) {
        return true;
      }, function(errors) {
        return w.errors = ImpacUtilities.processRailsError(errors);
      })["finally"](function() {
        return $scope.isDeletePopoverLoading = false;
      });
    };
    return $scope.toggleEditMode = function() {
      if (!w.isLoading) {
        if (w.isEditMode) {
          w.isEditMode = false;
          return ImpacWidgetsSvc.initWidgetSettings(w);
        } else {
          return w.isEditMode = true;
        }
      }
    };
  }]);

  module.directive('commonTopButtons', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        onRefresh: '='
      },
      template: $templateCache.get('widgets-common/top-buttons.tmpl.html'),
      controller: 'CommonTopButtonsCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.account', []);

  module.controller('SettingAccountCtrl', ["$scope", "$filter", function($scope, $filter) {
    var formatAmount, setting, w;
    w = $scope.parentWidget;
    setting = {};
    setting.key = "account";
    setting.isInitialized = false;
    setting.initialize = function() {
      w.selectedAccount = w.selectedAccount || null;
      if ((w.content != null) && (w.content.account_list != null) && (w.metadata != null) && (w.metadata.account_uid != null)) {
        w.selectedAccount = _.find(w.content.account_list, function(acc) {
          return acc.uid === w.metadata.account_uid;
        });
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      if (w.selectedAccount != null) {
        return {
          account_uid: w.selectedAccount.uid
        };
      }
    };
    formatAmount = function(anAccount) {
      var balance;
      balance = anAccount.current_balance || anAccount.balance;
      return $filter('mnoCurrency')(balance, anAccount.currency);
    };
    $scope.formatLabel = function(anAccount) {
      if (anAccount.company != null) {
        return anAccount.company + " - " + anAccount.name + " (" + (formatAmount(anAccount)) + ")";
      } else {
        return anAccount.name + " (" + (formatAmount(anAccount)) + ")";
      }
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingAccount', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        label: '@',
        showLabel: '=?',
        onAccountSelected: '&'
      },
      link: function(scope, element) {
        if (!scope.label) {
          return scope.label = "Account to monitor";
        }
      },
      template: $templateCache.get('widgets-settings/account.tmpl.html'),
      controller: 'SettingAccountCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.accounts-list', []);

  module.controller('SettingAccountsListCtrl', ["$scope", "ImpacWidgetsSvc", function($scope, ImpacWidgetsSvc) {
    var setting, w;
    w = $scope.parentWidget;
    w.moveAccountToAnotherList = function(account, src, dst, triggerUpdate) {
      if (triggerUpdate == null) {
        triggerUpdate = true;
      }
      if (_.isEmpty(src) || _.isEmpty(account)) {
        return;
      }
      dst || (dst = []);
      _.remove(src, function(acc) {
        return account.uid === acc.uid;
      });
      dst.push(account);
      if (triggerUpdate) {
        ImpacWidgetsSvc.updateWidgetSettings(w, false);
      }
      return null;
    };
    setting = {};
    setting.key = "accounts-list";
    setting.initialize = function() {
      var stashedAccounts;
      setting.isInitialized = false;
      w.remainingAccounts = [];
      w.selectedAccounts = [];
      if ((w.content != null) && !_.isEmpty(w.content.complete_list)) {
        w.remainingAccounts = angular.copy(w.content.complete_list);
        if (!_.isEmpty(w.metadata.accounts_list)) {
          angular.forEach(w.metadata.accounts_list, function(accUid) {
            var acc;
            acc = _.find(w.content.complete_list, function(acc) {
              return acc.uid === accUid;
            });
            return w.moveAccountToAnotherList(acc, w.remainingAccounts, w.selectedAccounts, false);
          });
        }
        stashedAccounts = angular.copy(w.remainingAccounts);
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      if (setting.isInitialized) {
        return {
          accounts_list: _.map(w.selectedAccounts, (function(acc) {
            return acc.uid;
          }))
        };
      }
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingAccountsList', function() {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '='
      },
      controller: 'SettingAccountsListCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.chart-filters', []);

  module.controller('SettingChartFiltersCtrl', ["$scope", function($scope) {
    var setting, w;
    w = $scope.parentWidget;
    setting = {};
    setting.key = "chart-filters";
    setting.isInitialized = false;
    setting.initialize = function() {
      if ((w.content != null) && (w.content.chart_filter != null) && ($scope.filterCriteria = w.content.chart_filter.criteria)) {
        $scope.maxEntities = w.content.chart_filter.max;
        $scope.entityType = w.content.chart_filter.entity_type;
        $scope.filterLabel = w.content.chart_filter.filter_label.replace(/_/g, " ");
        if ($scope.filterCriteria === "number") {
          $scope.filterValuePercentage = 80;
          $scope.filterValueNumber = w.content.chart_filter.value;
        } else {
          $scope.filterValuePercentage = w.content.chart_filter.value;
          $scope.filterValueNumber = Math.round($scope.maxEntities / 2);
        }
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var filterValue;
      if ((w.content != null) && (w.content.chart_filter != null)) {
        if ($scope.filterCriteria === "percentage") {
          filterValue = $scope.filterValuePercentage;
        } else {
          filterValue = $scope.filterValueNumber;
        }
        return {
          chart_filter: {
            criteria: $scope.filterCriteria,
            value: filterValue
          }
        };
      } else {
        return {};
      }
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingChartFilters', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '='
      },
      template: $templateCache.get('widgets-settings/chart-filters.tmpl.html'),
      controller: 'SettingChartFiltersCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.dates-picker', []);

  module.directive('settingDatesPicker', ["$templateCache", "$filter", "ImpacWidgetsSvc", "$timeout", function($templateCache, $filter, ImpacWidgetsSvc, $timeout) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        fromDate: '=from',
        toDate: '=to',
        keepToday: '=',
        onUse: '&?'
      },
      template: $templateCache.get('widgets-settings/dates-picker.tmpl.html'),
      link: function(scope, element) {
        var isToToday, setting, w;
        w = scope.parentWidget;
        setting = {};
        setting.key = "dates-picker";
        scope.calendarFrom = {
          opened: false,
          value: new Date(new Date().getFullYear(), 0, 1),
          toggle: function() {
            scope.calendarFrom.opened = !scope.calendarFrom.opened;
            return scope.calendarTo.opened = false;
          }
        };
        scope.calendarTo = {
          opened: false,
          value: new Date(),
          toggle: function() {
            scope.calendarFrom.opened = false;
            return scope.calendarTo.opened = !scope.calendarTo.opened;
          }
        };
        setting.initialize = function() {
          return $timeout(function() {
            var d, m, parsedFrom, parsedTo, y;
            scope.changed = false;
            if (Date.parse(scope.fromDate)) {
              parsedFrom = scope.fromDate.split('-');
              y = parsedFrom[0];
              m = parsedFrom[1] - 1;
              d = parsedFrom[2];
              scope.calendarFrom.value = new Date(y, m, d);
            } else {
              scope.calendarFrom.value = new Date(new Date().getFullYear(), 0, 1);
            }
            if (Date.parse(scope.toDate) && !scope.keepToday) {
              parsedTo = scope.toDate.split('-');
              y = parsedTo[0];
              m = parsedTo[1] - 1;
              d = parsedTo[2];
              return scope.calendarTo.value = new Date(y, m, d);
            } else {
              return scope.calendarTo.value = new Date();
            }
          });
        };
        isToToday = function() {
          return (scope.calendarTo.value.getFullYear() === new Date().getFullYear()) && (scope.calendarTo.value.getMonth() === new Date().getMonth()) && (scope.calendarTo.value.getDate() === new Date().getDate());
        };
        setting.toMetadata = function() {
          return {
            hist_parameters: {
              from: $filter('date')(scope.calendarFrom.value, 'yyyy-MM-dd'),
              to: $filter('date')(scope.calendarTo.value, 'yyyy-MM-dd'),
              period: "RANGE",
              keep_today: isToToday()
            }
          };
        };
        scope.showApplyButton = function() {
          return scope.changed = true;
        };
        scope.applyChanges = function() {
          ImpacWidgetsSvc.updateWidgetSettings(w, true);
          return scope.changed = false;
        };
        scope.showTitle = function() {
          return element.hasClass('part');
        };
        w.settings.push(setting);
        return scope.deferred.resolve(setting);
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.formula', []);

  module.controller('SettingFormulaCtrl', ["$scope", "$filter", function($scope, $filter) {
    var authorized_regex, evaluateFormula, formatFormula, getFormula, setting, w;
    w = $scope.parentWidget;
    w.formula = "";
    authorized_regex = new RegExp("^(\\{|\\d|\\}|\\/|\\+|-|\\*|\\(|\\)|\\s|\\.)*$");
    setting = {};
    setting.key = "formula";
    setting.isInitialized = false;
    setting.initialize = function() {
      if ((w.metadata != null) && (w.metadata.formula != null)) {
        w.formula = w.metadata.formula;
        evaluateFormula();
        return setting.isInitialized = true;
      } else {
        return w.formula = "";
      }
    };
    setting.toMetadata = function() {
      evaluateFormula();
      if (w.isFormulaCorrect) {
        return {
          formula: w.formula
        };
      } else {
        return {
          formula: ""
        };
      }
    };
    getFormula = function() {
      return w.formula;
    };
    w.formatAmount = function(anAccount) {
      return $filter('mnoCurrency')(anAccount.current_balance, anAccount.currency);
    };
    $scope.$watch(getFormula, function(e) {
      return evaluateFormula();
    });
    evaluateFormula = function() {
      var e, error, i, legend, str;
      str = angular.copy(w.formula);
      legend = angular.copy(w.formula);
      i = 1;
      angular.forEach(w.selectedAccounts, function(account) {
        var balancePattern;
        balancePattern = "\\{" + i + "\\}";
        str = str.replace(new RegExp(balancePattern, 'g'), " " + account.current_balance_no_format + " ");
        legend = legend.replace(new RegExp(balancePattern, 'g'), account.name);
        return i++;
      });
      if (!str.match(authorized_regex)) {
        w.isFormulaCorrect = false;
        w.evaluatedFormula = "invalid expression";
      }
      try {
        w.evaluatedFormula = eval(str).toFixed(2);
      } catch (error) {
        e = error;
        w.evaluatedFormula = "invalid expression";
      }
      if ((w.evaluatedFormula == null) || w.evaluatedFormula === "invalid expression" || w.evaluatedFormula === "Infinity" || w.evaluatedFormula === "-Infinity") {
        return w.isFormulaCorrect = false;
      } else {
        formatFormula();
        w.legend = legend;
        return w.isFormulaCorrect = true;
      }
    };
    formatFormula = function() {
      var currency, firstAcc;
      if (!w.formula.match(/\//g) && (w.selectedAccounts != null)) {
        if (firstAcc = w.selectedAccounts[0]) {
          if (currency = firstAcc.currency) {
            return w.evaluatedFormula = $filter('mnoCurrency')(w.evaluatedFormula, currency);
          }
        }
      }
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingFormula', function() {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '='
      },
      controller: 'SettingFormulaCtrl'
    };
  });

}).call(this);

(function() {
  var module,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module = angular.module('impac.components.widgets-settings.hist-mode', []);

  module.controller('SettingHistModeCtrl', ["$scope", "ImpacWidgetsSvc", function($scope, ImpacWidgetsSvc) {
    var setting, w;
    w = $scope.parentWidget;
    w.isHistoryMode = false;
    $scope.toggleHistMode = function(mode) {
      var ref;
      if ((w.isHistoryMode && mode === 'history') || (!w.isHistoryMode && mode === 'current')) {
        return;
      }
      w.isHistoryMode = !w.isHistoryMode;
      ImpacWidgetsSvc.updateWidgetSettings(w, false);
      return ref = $scope.onToggle(), indexOf.call(angular.isDefined($scope.onToggle), ref) >= 0;
    };
    setting = {};
    setting.key = "hist-mode";
    setting.isInitialized = false;
    setting.initialize = function() {
      var mode;
      if ((w.metadata != null) && (w.metadata.hist_parameters != null) && (mode = w.metadata.hist_parameters.mode)) {
        if (mode === 'history') {
          w.isHistoryMode = true;
        } else {
          w.isHistoryMode = false;
        }
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var mode;
      if (w.isHistoryMode) {
        mode = 'history';
      } else {
        mode = 'current';
      }
      return {
        hist_parameters: {
          mode: mode
        }
      };
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingHistMode', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        onToggle: '&'
      },
      template: $templateCache.get('widgets-settings/hist-mode.tmpl.html'),
      controller: 'SettingHistModeCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.limit-entries', []);

  module.controller('SettingLimitEntriesCtrl', ["$scope", function($scope) {
    var setting;
    setting = {};
    setting.key = 'limit-entries';
    setting.initialize = function() {
      return true;
    };
    setting.toMetadata = function() {
      return {
        limit_entries: $scope.selected
      };
    };
    $scope.parentWidget.settings.push(setting);
    return $scope.deferred.resolve(setting);
  }]);

  module.directive('settingLimitEntries', ["$templateCache", "ImpacWidgetsSvc", function($templateCache, ImpacWidgetsSvc) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        selected: '=',
        max: '=?',
        options: '=?',
        entriesLabel: '=?'
      },
      link: function(scope, elements, attrs) {
        if (!((scope.options != null) && scope.options.length > 0)) {
          scope.options = [5, 15, 50];
        }
        scope.selectOption = function(anOption) {
          scope.selected = anOption;
          return ImpacWidgetsSvc.updateWidgetSettings(scope.parentWidget, false);
        };
        return scope.isOptionValid = function(anOption) {
          return (scope.max == null) || anOption < scope.max;
        };
      },
      controller: 'SettingLimitEntriesCtrl',
      template: $templateCache.get('widgets-settings/limit-entries.tmpl.html')
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.organizations', []);

  module.controller('SettingOrganizationsCtrl', ["$scope", "$log", "ImpacDashboardsSvc", function($scope, $log, ImpacDashboardsSvc) {
    var setting, w;
    w = $scope.parentWidget;
    w.selectedOrganizations = {};
    $scope.isOrganizationSelected = function(orgUid) {
      return !!w.selectedOrganizations[orgUid];
    };
    $scope.toggleSelectOrganization = function(orgUid) {
      return w.selectedOrganizations[orgUid] = !w.selectedOrganizations[orgUid];
    };
    setting = {};
    setting.key = "organizations";
    setting.isInitialized = false;
    setting.initialize = function() {
      return ImpacDashboardsSvc.load().then(function(config) {
        var i, len, org, ref;
        $scope.dashboardOrganizations = config.currentDashboard.data_sources;
        if ((w.metadata != null) && (w.metadata.organization_ids != null)) {
          ref = $scope.dashboardOrganizations;
          for (i = 0, len = ref.length; i < len; i++) {
            org = ref[i];
            w.selectedOrganizations[org.uid] = _.contains(w.metadata.organization_ids, org.uid);
          }
          return setting.isInitialized = true;
        }
      });
    };
    setting.toMetadata = function() {
      var newOrganizations;
      newOrganizations = _.compact(_.map(w.selectedOrganizations, function(checked, uid) {
        if (checked) {
          return uid;
        }
      }));
      if (_.isEmpty(newOrganizations)) {
        newOrganizations = [_.first($scope.dashboardOrganizations).uid];
      }
      return {
        organization_ids: newOrganizations
      };
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingOrganizations', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '='
      },
      template: $templateCache.get('widgets-settings/organizations.tmpl.html'),
      controller: 'SettingOrganizationsCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.param-selector', []);

  module.controller('SettingParamSelectorCtrl', ["$scope", "ImpacWidgetsSvc", function($scope, ImpacWidgetsSvc) {
    var setting, w;
    $scope.showOptions = false;
    $scope.toggleShowOptions = function() {
      return $scope.showOptions = !$scope.showOptions;
    };
    $scope.selectOption = function(anOption) {
      if (anOption.value !== $scope.selected.value) {
        angular.extend($scope.selected, anOption);
        if (!$scope.noReload) {
          $scope.parentWidget.isLoading = true;
        }
        ImpacWidgetsSvc.updateWidgetSettings($scope.parentWidget, !$scope.noReload);
        if (angular.isDefined($scope.onSelect)) {
          $scope.onSelect();
        }
      }
      return $scope.toggleShowOptions();
    };
    $scope.getTruncateValue = function() {
      return parseInt($scope.truncateNo) || 20;
    };
    w = $scope.parentWidget;
    setting = {};
    setting.key = "param-selector";
    setting.isInitialized = false;
    setting.initialize = function() {
      if (w.content != null) {
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var param;
      param = {};
      if (!_.isEmpty($scope.selected)) {
        param[$scope.param] = $scope.selected.value;
      }
      return param;
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingParamSelector', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        param: '@',
        options: '=',
        selected: '=',
        truncateNo: '@',
        onSelect: '&'
      },
      link: function(scope, elements, attrs) {
        scope.noReload = typeof attrs.noReload !== 'undefined';
        return scope.truncateNo = attrs.truncateNo || 20;
      },
      template: $templateCache.get('widgets-settings/param-selector.tmpl.html'),
      controller: 'SettingParamSelectorCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.params-checkboxes', []);

  module.controller('SettingParamsCheckboxesCtrl', ["$scope", function($scope) {
    var setting, w;
    w = $scope.parentWidget;
    setting = {};
    setting.key = "params-checkboxes";
    setting.initialize = function() {};
    setting.toMetadata = function() {
      var param;
      param = {};
      param[$scope.param] = _.map($scope.options, function(opt) {
        return {
          id: opt.id,
          value: opt.value
        };
      });
      return param;
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingParamsCheckboxes', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        param: '@',
        options: '='
      },
      template: $templateCache.get('widgets-settings/params-checkboxes.tmpl.html'),
      controller: 'SettingParamsCheckboxesCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.params-picker', []);

  module.controller('SettingParamsPickerCtrl', ["$scope", function($scope) {
    var setting, w;
    w = $scope.parentWidget;
    setting = {};
    setting.key = "params-picker";
    setting.isInitialized = false;
    setting.initialize = function() {
      $scope.sortableOptions = {
        'ui-floating': true,
        tolerance: 'pointer'
      };
      if (_.isEmpty($scope.options)) {
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var param;
      param = {};
      param[$scope.param] = _.compact(_.map($scope.options, function(statusOption) {
        if (statusOption.selected) {
          return statusOption.label;
        }
      }));
      return param;
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingParamsPicker', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        param: '@',
        options: '='
      },
      link: function(scope, elements, attrs) {
        return scope.formattedParam = scope.param.replace('_', ' ');
      },
      template: $templateCache.get('widgets-settings/params-picker.tmpl.html'),
      controller: 'SettingParamsPickerCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.time-period', []);

  module.directive('settingTimePeriod', ["$templateCache", "$q", "$log", "$timeout", function($templateCache, $q, $log, $timeout) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        histParams: '=?'
      },
      template: $templateCache.get('widgets-settings/time-period.tmpl.html'),
      link: function(scope) {
        var getPeriod, getSetting, getUsedSettingKey, initPeriod, resetPreset, settingsPromises, w;
        w = scope.parentWidget;
        scope.timePeriodSetting = {
          key: "time-period",
          settings: [],
          isEditMode: true
        };
        scope.timeSliderDeferred = $q.defer();
        scope.datesPickerDeferred = $q.defer();
        scope.timePresetsDeferred = $q.defer();
        settingsPromises = [scope.timeSliderDeferred.promise, scope.datesPickerDeferred.promise, scope.timePresetsDeferred.promise];
        scope.periods = ["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY"];
        resetPreset = function() {
          scope.timePeriodSetting.selectedPreset = void 0;
          return true;
        };
        resetPreset();
        scope.timePeriodSetting.initialize = function() {
          return $timeout(function() {
            initPeriod();
            getSetting('time-presets').initialize();
            return scope.initUsedSetting();
          });
        };
        scope.timePeriodSetting.toMetadata = function() {
          var histParams, metadata, sourceSetting;
          sourceSetting = getSetting(getUsedSettingKey());
          if (sourceSetting != null) {
            histParams = sourceSetting.toMetadata().hist_parameters;
          }
          histParams.period = getPeriod();
          if ((scope.histParams != null) && (scope.histParams.mode != null)) {
            histParams.mode = scope.histParams.mode;
          }
          metadata = {
            hist_parameters: histParams
          };
          return metadata;
        };
        scope.titleize = function(word) {
          if (word !== "FYEARLY") {
            return "" + (word.slice(0, 1).toUpperCase()) + (word.slice(1).toLowerCase());
          } else {
            return "Yearly (financial)";
          }
        };
        getPeriod = function() {
          if (scope.timePeriodSetting.period != null) {
            return scope.timePeriodSetting.period;
          } else {
            return initPeriod();
          }
        };
        scope.isTimeSliderUsed = function() {
          return getUsedSettingKey() === 'time-slider';
        };
        scope.isDatesPickerUsed = function() {
          return getUsedSettingKey() === 'dates-picker';
        };
        getUsedSettingKey = function() {
          if (scope.usedSetting != null) {
            return scope.usedSetting;
          } else {
            return scope.initUsedSetting();
          }
        };
        getSetting = function(key) {
          return _.find(scope.timePeriodSetting.settings, function(set) {
            return set.key === key;
          });
        };
        initPeriod = function() {
          if ((scope.histParams != null) && (scope.histParams.period != null) && _.contains(scope.periods, scope.histParams.period)) {
            scope.timePeriodSetting.period = angular.copy(scope.histParams.period);
          } else {
            scope.timePeriodSetting.period = "MONTHLY";
          }
          return scope.timePeriodSetting.period;
        };
        scope.initUsedSetting = function(histParams) {
          var newLetter, pattern, tr;
          if (histParams == null) {
            histParams = null;
          }
          if (histParams == null) {
            histParams = scope.histParams;
          }
          if ((histParams != null) && (histParams.from != null)) {
            scope.usedSetting = 'dates-picker';
            scope.fromDate = histParams.from;
            scope.toDate = histParams.to;
            getSetting('dates-picker').initialize();
          } else {
            scope.usedSetting = 'time-slider';
            if ((histParams != null) && (histParams.time_range != null)) {
              tr = histParams.time_range;
              pattern = /([a-z])/;
              newLetter = pattern.exec(tr)[1];
              scope.timePeriodSetting.period = angular.copy(_.find(scope.periods, function(p) {
                return p.slice(0, 1).toLowerCase() === newLetter;
              }));
              scope.timePeriodSetting.timeRange = tr;
            }
            getSetting('time-slider').initialize();
          }
          return scope.usedSetting;
        };
        scope.updateTimeRangePeriod = function() {
          var periodLetter, set, tr;
          if (scope.isTimeSliderUsed()) {
            resetPreset();
            set = getSetting('time-slider');
            tr = set.toMetadata().hist_parameters.time_range;
            periodLetter = getPeriod().slice(0, 1).toLowerCase();
            scope.timePeriodSetting.timeRange = tr.replace(/[a-z]/, periodLetter);
            set.initialize();
            return scope.timePeriodSetting.timeRange;
          } else {
            return false;
          }
        };
        scope.useTimeSlider = function() {
          resetPreset();
          scope.usedSetting = 'time-slider';
          scope.updateTimeRangePeriod();
          return scope.usedSetting;
        };
        scope.useDatesPicker = function() {
          resetPreset();
          return scope.usedSetting = 'dates-picker';
        };
        w.settings.push(scope.timePeriodSetting);
        return $q.all(settingsPromises).then(function() {
          return scope.deferred.resolve(scope.timePeriodSetting);
        });
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.time-presets', []);

  module.directive('settingTimePresets', ["$templateCache", "ImpacMainSvc", "$timeout", function($templateCache, ImpacMainSvc, $timeout) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        presets: '=?',
        onSelect: '&?',
        selectedPreset: '=?selected'
      },
      template: $templateCache.get('widgets-settings/time-presets.tmpl.html'),
      link: function(scope) {
        var w;
        w = scope.parentWidget;
        scope.setting = {};
        scope.setting.key = "time-presets";
        scope.setting.initialize = function() {
          return $timeout(function() {
            var financialYearEndMonth;
            if (!scope.presets) {
              financialYearEndMonth = 6;
              return ImpacMainSvc.load().then(function(config) {
                if ((config != null) && (config.currentOrganization != null) && parseInt(config.currentOrganization.financial_year_end_month)) {
                  return financialYearEndMonth = parseInt(config.currentOrganization.financial_year_end_month);
                }
              })["finally"](function() {
                var financialYearStartYear, toDate;
                financialYearStartYear = moment().year() - 1;
                if (moment().month() >= 6) {
                  financialYearStartYear = moment().year();
                }
                scope.financialYearStartDate = financialYearStartYear + "-" + (financialYearEndMonth + 1) + "-01";
                toDate = moment().format('YYYY-MM-DD');
                return scope.presets = [
                  {
                    label: 'Calendar year to date',
                    value: {
                      from: moment().startOf('year').format('YYYY-MM-DD'),
                      to: toDate
                    }
                  }, {
                    label: 'Financial year to date',
                    value: {
                      from: scope.financialYearStartDate,
                      to: toDate
                    }
                  }, {
                    label: 'Last 6 months',
                    value: {
                      time_range: '-6m',
                      to: toDate
                    }
                  }, {
                    label: 'Last 4 quarters',
                    value: {
                      time_range: '-4q',
                      to: toDate
                    }
                  }, {
                    label: 'Last 4 weeks',
                    value: {
                      time_range: '-4w',
                      to: toDate
                    }
                  }
                ];
              });
            }
          });
        };
        scope.setting.toMetadata = function() {
          return {
            hist_parameters: scope.selectedPreset.value
          };
        };
        w.settings.push(scope.setting);
        return scope.deferred.resolve(scope.setting);
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.time-range', []);

  module.controller('SettingTimeRangeCtrl', ["$scope", "$log", function($scope, $log) {
    var setting, w;
    w = $scope.parentWidget;
    $scope.numberOfPeriods = (new Date()).getMonth() + 1;
    $scope.selectedPeriod = "MONTHLY";
    $scope.PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'];
    $scope.periodToUnit = function() {
      var nb, period, unit;
      nb = $scope.numberOfPeriods;
      period = $scope.selectedPeriod;
      if (period !== "DAILY") {
        unit = period.substring(0, period.length - 2).toLowerCase();
      } else {
        unit = "day";
      }
      if (nb > 1) {
        unit = unit.concat("s");
      }
      return unit;
    };
    setting = {};
    setting.key = "time-range";
    setting.isInitialized = false;
    setting.initialize = function() {
      var hist;
      if ((w.metadata != null) && (hist = w.metadata.hist_parameters)) {
        if (hist.period != null) {
          $scope.selectedPeriod = hist.period;
        }
        if (hist.number_of_periods != null) {
          $scope.numberOfPeriods = hist.number_of_periods;
        }
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      return {
        hist_parameters: {
          period: $scope.selectedPeriod,
          number_of_periods: $scope.numberOfPeriods
        }
      };
    };
    w.settings || (w.settings = []);
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingTimeRange', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '='
      },
      template: $templateCache.get('widgets-settings/time-range.tmpl.html'),
      controller: 'SettingTimeRangeCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.time-slider', []);

  module.directive('settingTimeSlider', ["$templateCache", "$timeout", "ImpacMainSvc", function($templateCache, $timeout, ImpacMainSvc) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        timeRange: '=?',
        onUse: '&?'
      },
      template: $templateCache.get('widgets-settings/time-slider.tmpl.html'),
      link: function(scope) {
        var PERIODS, getNumberOfPeriods, getPeriod, getPeriodWord, getTimeRange, initFinancialYearEndMonth, initNumberOfPeriods, initPeriod, setting, w;
        w = scope.parentWidget;
        setting = {};
        setting.key = "time-slider";
        PERIODS = ['d', 'w', 'm', 'q', 'y', 'f'];
        setting.initialize = function() {
          return $timeout(function() {
            initNumberOfPeriods();
            initPeriod();
            initFinancialYearEndMonth();
            return true;
          });
        };
        setting.toMetadata = function() {
          var histParams;
          histParams = {
            to: scope.toDate().format('YYYY-MM-DD'),
            time_range: getTimeRange()
          };
          if (getPeriod() === 'f') {
            histParams.from = scope.fromDate().format('YYYY-MM-DD');
          }
          return {
            hist_parameters: histParams
          };
        };
        initNumberOfPeriods = function() {
          var n, nPattern, tr;
          tr = scope.timeRange;
          scope.numberOfPeriods = moment().month();
          if (tr == null) {
            return scope.numberOfPeriods;
          }
          nPattern = /^-?([0-9]{1,2})[a-z]?$/;
          n = nPattern.exec(tr);
          if ((n != null) && n[1] && parseInt(n[1])) {
            scope.numberOfPeriods = parseInt(n[1]);
          }
          return scope.numberOfPeriods;
        };
        initPeriod = function() {
          var p, pPattern, period, tr;
          tr = scope.timeRange;
          scope.period = "m";
          if (tr == null) {
            return "m";
          }
          pPattern = /^-?[0-9]{0,2}([a-z])$/;
          p = pPattern.exec(tr);
          period = _.find(PERIODS, function(authPeriod) {
            return (p != null) && (p[1] === authPeriod);
          });
          if (period != null) {
            scope.period = period;
          }
          return scope.period;
        };
        initFinancialYearEndMonth = function() {
          scope.financialYearEndMonth = 6;
          return ImpacMainSvc.load().then(function(config) {
            if ((config != null) && (config.currentOrganization != null) && parseInt(config.currentOrganization.financial_year_end_month)) {
              return scope.financialYearEndMonth = parseInt(config.currentOrganization.financial_year_end_month);
            }
          });
        };
        getPeriod = function() {
          if (scope.period != null) {
            return scope.period;
          } else {
            return initPeriod();
          }
        };
        getPeriodWord = function() {
          var period;
          period = getPeriod();
          switch (period) {
            case "d":
              return "day";
            case "w":
              return "week";
            case "m":
              return "month";
            case "q":
              return "quarter";
            case "y":
              return "year";
            case "f":
              return "financial year";
          }
        };
        getNumberOfPeriods = function() {
          if (scope.numberOfPeriods != null) {
            return scope.numberOfPeriods;
          } else {
            return initNumberOfPeriods();
          }
        };
        getTimeRange = function() {
          var n, p;
          n = getNumberOfPeriods();
          p = getPeriod();
          return "-" + n + p;
        };
        scope.formatPeriod = function() {
          var n, number, word;
          n = getNumberOfPeriods();
          number = "";
          word = getPeriodWord();
          if (n > 1) {
            number = "" + n;
            word = word + "s";
          }
          return [number, word].join(' ');
        };
        scope.formatDate = function(aDate) {
          return aDate.format('Do MMM YYYY');
        };
        scope.fromDate = function() {
          var financialYearStartYear, n, word;
          n = getNumberOfPeriods();
          word = getPeriodWord();
          if (word.slice(0, 1) === "f") {
            financialYearStartYear = moment().year() - 1;
            if (moment().month() >= 6) {
              financialYearStartYear = moment().year();
            }
            financialYearStartYear = financialYearStartYear - n;
            return moment(financialYearStartYear + "-" + (scope.financialYearEndMonth + 1) + "-01", "YYYY-M-DD");
          } else if (word.slice(0, 1) === "w") {
            return moment().subtract(n, word).startOf('isoweek');
          } else {
            return moment().subtract(n, word).startOf(word);
          }
        };
        scope.toDate = function() {
          return moment();
        };
        w.settings.push(setting);
        return scope.deferred.resolve(setting);
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.width', []);

  module.controller('SettingWidthCtrl', ["$scope", "$element", "$timeout", "$log", "ImpacWidgetsSvc", function($scope, $element, $timeout, $log, ImpacWidgetsSvc) {
    var elem, hideOnResize, i, len, ref, setting, w;
    w = $scope.parentWidget;
    setting = {};
    setting.key = "width";
    setting.isInitialized = false;
    ref = $element.parents();
    for (i = 0, len = ref.length; i < len; i++) {
      elem = ref[i];
      if (angular.element(elem).hasClass('content')) {
        $scope.contentElements = angular.element(elem).children();
        break;
      }
    }
    hideOnResize = function(elements) {
      var j, len1;
      if (!(elements && elements.length > 0)) {
        return;
      }
      for (j = 0, len1 = elements.length; j < len1; j++) {
        elem = elements[j];
        angular.element(elem).animate({
          opacity: 0
        }, 0);
      }
      return $timeout(function() {
        var k, len2, results;
        results = [];
        for (k = 0, len2 = elements.length; k < len2; k++) {
          elem = elements[k];
          results.push(angular.element(elem).animate({
            opacity: 1
          }, 200));
        }
        return results;
      }, 300);
    };
    w.toggleExpanded = function() {
      $scope.expanded = !$scope.expanded;
      ImpacWidgetsSvc.updateWidgetSettings(w, false);
      hideOnResize($scope.contentElements);
      if ($scope.expanded) {
        return w.width = parseInt($scope.max);
      } else {
        return w.width = parseInt($scope.min);
      }
    };
    w.isExpanded = function() {
      return $scope.expanded;
    };
    setting.initialize = function() {
      if (w.width != null) {
        $scope.expanded = w.width === parseInt($scope.max);
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var newWidth;
      if ($scope.expanded) {
        newWidth = $scope.max;
      } else {
        newWidth = $scope.min;
      }
      return {
        width: parseInt(newWidth)
      };
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingWidth', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        min: '@',
        max: '@'
      },
      template: $templateCache.get('widgets-settings/width.tmpl.html'),
      controller: 'SettingWidthCtrl'
    };
  }]);

}).call(this);

!function t(e,i,a){function s(n,r){if(!i[n]){if(!e[n]){var h="function"==typeof require&&require;if(!r&&h)return h(n,!0);if(o)return o(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[n]={exports:{}};e[n][0].call(c.exports,function(t){var i=e[n][1][t];return s(i?i:t)},c,c.exports,t,e,i,a)}return i[n].exports}for(var o="function"==typeof require&&require,n=0;n<a.length;n++)s(a[n]);return s}({1:[function(t,e,i){!function(){var i=t("color-convert"),a=t("color-string"),s=function(t){if(t instanceof s)return t;if(!(this instanceof s))return new s(t);if(this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1},"string"==typeof t){var e=a.getRgba(t);if(e)this.setValues("rgb",e);else if(e=a.getHsla(t))this.setValues("hsl",e);else{if(!(e=a.getHwb(t)))throw new Error('Unable to parse color from string "'+t+'"');this.setValues("hwb",e)}}else if("object"==typeof t){var e=t;if(void 0!==e.r||void 0!==e.red)this.setValues("rgb",e);else if(void 0!==e.l||void 0!==e.lightness)this.setValues("hsl",e);else if(void 0!==e.v||void 0!==e.value)this.setValues("hsv",e);else if(void 0!==e.w||void 0!==e.whiteness)this.setValues("hwb",e);else{if(void 0===e.c&&void 0===e.cyan)throw new Error("Unable to parse color from object "+JSON.stringify(t));this.setValues("cmyk",e)}}};s.prototype={rgb:function(t){return this.setSpace("rgb",arguments)},hsl:function(t){return this.setSpace("hsl",arguments)},hsv:function(t){return this.setSpace("hsv",arguments)},hwb:function(t){return this.setSpace("hwb",arguments)},cmyk:function(t){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){return 1!==this.values.alpha?this.values.hwb.concat([this.values.alpha]):this.values.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values.rgb;return t.concat([this.values.alpha])},hslaArray:function(){var t=this.values.hsl;return t.concat([this.values.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return a.hexString(this.values.rgb)},rgbString:function(){return a.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return a.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return a.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return a.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return a.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return a.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return a.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){return this.values.rgb[0]<<16|this.values.rgb[1]<<8|this.values.rgb[2]},luminosity:function(){for(var t=this.values.rgb,e=[],i=0;i<t.length;i++){var a=t[i]/255;e[i]=.03928>=a?a/12.92:Math.pow((a+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),i=t.luminosity();return e>i?(e+.05)/(i+.05):(i+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb,e=(299*t[0]+587*t[1]+114*t[2])/1e3;return 128>e},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;3>e;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){return this.values.hsl[2]+=this.values.hsl[2]*t,this.setValues("hsl",this.values.hsl),this},darken:function(t){return this.values.hsl[2]-=this.values.hsl[2]*t,this.setValues("hsl",this.values.hsl),this},saturate:function(t){return this.values.hsl[1]+=this.values.hsl[1]*t,this.setValues("hsl",this.values.hsl),this},desaturate:function(t){return this.values.hsl[1]-=this.values.hsl[1]*t,this.setValues("hsl",this.values.hsl),this},whiten:function(t){return this.values.hwb[1]+=this.values.hwb[1]*t,this.setValues("hwb",this.values.hwb),this},blacken:function(t){return this.values.hwb[2]+=this.values.hwb[2]*t,this.setValues("hwb",this.values.hwb),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){return this.setValues("alpha",this.values.alpha-this.values.alpha*t),this},opaquer:function(t){return this.setValues("alpha",this.values.alpha+this.values.alpha*t),this},rotate:function(t){var e=this.values.hsl[0];return e=(e+t)%360,e=0>e?360+e:e,this.values.hsl[0]=e,this.setValues("hsl",this.values.hsl),this},mix:function(t,e){e=1-(null==e?.5:e);for(var i=2*e-1,a=this.alpha()-t.alpha(),s=((i*a==-1?i:(i+a)/(1+i*a))+1)/2,o=1-s,n=this.rgbArray(),r=t.rgbArray(),h=0;h<n.length;h++)n[h]=n[h]*s+r[h]*o;this.setValues("rgb",n);var l=this.alpha()*e+t.alpha()*(1-e);return this.setValues("alpha",l),this},toJSON:function(){return this.rgb()},clone:function(){return new s(this.rgb())}},s.prototype.getValues=function(t){for(var e={},i=0;i<t.length;i++)e[t.charAt(i)]=this.values[t][i];return 1!=this.values.alpha&&(e.a=this.values.alpha),e},s.prototype.setValues=function(t,e){var a={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},s={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},o=1;if("alpha"==t)o=e;else if(e.length)this.values[t]=e.slice(0,t.length),o=e[t.length];else if(void 0!==e[t.charAt(0)]){for(var n=0;n<t.length;n++)this.values[t][n]=e[t.charAt(n)];o=e.a}else if(void 0!==e[a[t][0]]){for(var r=a[t],n=0;n<t.length;n++)this.values[t][n]=e[r[n]];o=e.alpha}if(this.values.alpha=Math.max(0,Math.min(1,void 0!==o?o:this.values.alpha)),"alpha"!=t){for(var n=0;n<t.length;n++){var h=Math.max(0,Math.min(s[t][n],this.values[t][n]));this.values[t][n]=Math.round(h)}for(var l in a){l!=t&&(this.values[l]=i[t][l](this.values[t]));for(var n=0;n<l.length;n++){var h=Math.max(0,Math.min(s[l][n],this.values[l][n]));this.values[l][n]=Math.round(h)}}return!0}},s.prototype.setSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i),this)},s.prototype.setChannel=function(t,e,i){return void 0===i?this.values[t][e]:(this.values[t][e]=i,this.setValues(t,this.values[t]),this)},window.Color=e.exports=s}()},{"color-convert":3,"color-string":4}],2:[function(t,e,i){function a(t){var e,i,a,s=t[0]/255,o=t[1]/255,n=t[2]/255,r=Math.min(s,o,n),h=Math.max(s,o,n),l=h-r;return h==r?e=0:s==h?e=(o-n)/l:o==h?e=2+(n-s)/l:n==h&&(e=4+(s-o)/l),e=Math.min(60*e,360),0>e&&(e+=360),a=(r+h)/2,i=h==r?0:.5>=a?l/(h+r):l/(2-h-r),[e,100*i,100*a]}function s(t){var e,i,a,s=t[0],o=t[1],n=t[2],r=Math.min(s,o,n),h=Math.max(s,o,n),l=h-r;return i=0==h?0:l/h*1e3/10,h==r?e=0:s==h?e=(o-n)/l:o==h?e=2+(n-s)/l:n==h&&(e=4+(s-o)/l),e=Math.min(60*e,360),0>e&&(e+=360),a=h/255*1e3/10,[e,i,a]}function o(t){var e=t[0],i=t[1],s=t[2],o=a(t)[0],n=1/255*Math.min(e,Math.min(i,s)),s=1-1/255*Math.max(e,Math.max(i,s));return[o,100*n,100*s]}function n(t){var e,i,a,s,o=t[0]/255,n=t[1]/255,r=t[2]/255;return s=Math.min(1-o,1-n,1-r),e=(1-o-s)/(1-s)||0,i=(1-n-s)/(1-s)||0,a=(1-r-s)/(1-s)||0,[100*e,100*i,100*a,100*s]}function h(t){return G[JSON.stringify(t)]}function l(t){var e=t[0]/255,i=t[1]/255,a=t[2]/255;e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92,a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92;var s=.4124*e+.3576*i+.1805*a,o=.2126*e+.7152*i+.0722*a,n=.0193*e+.1192*i+.9505*a;return[100*s,100*o,100*n]}function c(t){var e,i,a,s=l(t),o=s[0],n=s[1],r=s[2];return o/=95.047,n/=100,r/=108.883,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,e=116*n-16,i=500*(o-n),a=200*(n-r),[e,i,a]}function d(t){return B(c(t))}function u(t){var e,i,a,s,o,n=t[0]/360,r=t[1]/100,h=t[2]/100;if(0==r)return o=255*h,[o,o,o];i=.5>h?h*(1+r):h+r-h*r,e=2*h-i,s=[0,0,0];for(var l=0;3>l;l++)a=n+1/3*-(l-1),0>a&&a++,a>1&&a--,o=1>6*a?e+6*(i-e)*a:1>2*a?i:2>3*a?e+(i-e)*(2/3-a)*6:e,s[l]=255*o;return s}function m(t){var e,i,a=t[0],s=t[1]/100,o=t[2]/100;return o*=2,s*=1>=o?o:2-o,i=(o+s)/2,e=2*s/(o+s),[a,100*e,100*i]}function p(t){return o(u(t))}function f(t){return n(u(t))}function v(t){return h(u(t))}function x(t){var e=t[0]/60,i=t[1]/100,a=t[2]/100,s=Math.floor(e)%6,o=e-Math.floor(e),n=255*a*(1-i),r=255*a*(1-i*o),h=255*a*(1-i*(1-o)),a=255*a;switch(s){case 0:return[a,h,n];case 1:return[r,a,n];case 2:return[n,a,h];case 3:return[n,r,a];case 4:return[h,n,a];case 5:return[a,n,r]}}function y(t){var e,i,a=t[0],s=t[1]/100,o=t[2]/100;return i=(2-s)*o,e=s*o,e/=1>=i?i:2-i,e=e||0,i/=2,[a,100*e,100*i]}function k(t){return o(x(t))}function D(t){return n(x(t))}function w(t){return h(x(t))}function C(t){var e,i,a,s,o=t[0]/360,n=t[1]/100,h=t[2]/100,l=n+h;switch(l>1&&(n/=l,h/=l),e=Math.floor(6*o),i=1-h,a=6*o-e,0!=(1&e)&&(a=1-a),s=n+a*(i-n),e){default:case 6:case 0:r=i,g=s,b=n;break;case 1:r=s,g=i,b=n;break;case 2:r=n,g=i,b=s;break;case 3:r=n,g=s,b=i;break;case 4:r=s,g=n,b=i;break;case 5:r=i,g=n,b=s}return[255*r,255*g,255*b]}function S(t){return a(C(t))}function _(t){return s(C(t))}function A(t){return n(C(t))}function I(t){return h(C(t))}function M(t){var e,i,a,s=t[0]/100,o=t[1]/100,n=t[2]/100,r=t[3]/100;return e=1-Math.min(1,s*(1-r)+r),i=1-Math.min(1,o*(1-r)+r),a=1-Math.min(1,n*(1-r)+r),[255*e,255*i,255*a]}function P(t){return a(M(t))}function F(t){return s(M(t))}function R(t){return o(M(t))}function V(t){return h(M(t))}function T(t){var e,i,a,s=t[0]/100,o=t[1]/100,n=t[2]/100;return e=3.2406*s+-1.5372*o+n*-.4986,i=s*-.9689+1.8758*o+.0415*n,a=.0557*s+o*-.204+1.057*n,e=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:e=12.92*e,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i=12.92*i,a=a>.0031308?1.055*Math.pow(a,1/2.4)-.055:a=12.92*a,e=Math.min(Math.max(0,e),1),i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),[255*e,255*i,255*a]}function L(t){var e,i,a,s=t[0],o=t[1],n=t[2];return s/=95.047,o/=100,n/=108.883,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,e=116*o-16,i=500*(s-o),a=200*(o-n),[e,i,a]}function z(t){return B(L(t))}function W(t){var e,i,a,s,o=t[0],n=t[1],r=t[2];return 8>=o?(i=100*o/903.3,s=7.787*(i/100)+16/116):(i=100*Math.pow((o+16)/116,3),s=Math.pow(i/100,1/3)),e=.008856>=e/95.047?e=95.047*(n/500+s-16/116)/7.787:95.047*Math.pow(n/500+s,3),a=.008859>=a/108.883?a=108.883*(s-r/200-16/116)/7.787:108.883*Math.pow(s-r/200,3),[e,i,a]}function B(t){var e,i,a,s=t[0],o=t[1],n=t[2];return e=Math.atan2(n,o),i=360*e/2/Math.PI,0>i&&(i+=360),a=Math.sqrt(o*o+n*n),[s,a,i]}function O(t){return T(W(t))}function E(t){var e,i,a,s=t[0],o=t[1],n=t[2];return a=n/360*2*Math.PI,e=o*Math.cos(a),i=o*Math.sin(a),[s,e,i]}function N(t){return W(E(t))}function H(t){return O(E(t))}function Y(t){return Q[t]}function q(t){return a(Y(t))}function j(t){return s(Y(t))}function U(t){return o(Y(t))}function X(t){return n(Y(t))}function J(t){return c(Y(t))}function Z(t){return l(Y(t))}e.exports={rgb2hsl:a,rgb2hsv:s,rgb2hwb:o,rgb2cmyk:n,rgb2keyword:h,rgb2xyz:l,rgb2lab:c,rgb2lch:d,hsl2rgb:u,hsl2hsv:m,hsl2hwb:p,hsl2cmyk:f,hsl2keyword:v,hsv2rgb:x,hsv2hsl:y,hsv2hwb:k,hsv2cmyk:D,hsv2keyword:w,hwb2rgb:C,hwb2hsl:S,hwb2hsv:_,hwb2cmyk:A,hwb2keyword:I,cmyk2rgb:M,cmyk2hsl:P,cmyk2hsv:F,cmyk2hwb:R,cmyk2keyword:V,keyword2rgb:Y,keyword2hsl:q,keyword2hsv:j,keyword2hwb:U,keyword2cmyk:X,keyword2lab:J,keyword2xyz:Z,xyz2rgb:T,xyz2lab:L,xyz2lch:z,lab2xyz:W,lab2rgb:O,lab2lch:B,lch2lab:E,lch2xyz:N,lch2rgb:H};var Q={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},G={};for(var $ in Q)G[JSON.stringify(Q[$])]=$},{}],3:[function(t,e,i){var a=t("./conversions"),s=function(){return new l};for(var o in a){s[o+"Raw"]=function(t){return function(e){return"number"==typeof e&&(e=Array.prototype.slice.call(arguments)),a[t](e)}}(o);var n=/(\w+)2(\w+)/.exec(o),r=n[1],h=n[2];s[r]=s[r]||{},s[r][h]=s[o]=function(t){return function(e){"number"==typeof e&&(e=Array.prototype.slice.call(arguments));var i=a[t](e);if("string"==typeof i||void 0===i)return i;for(var s=0;s<i.length;s++)i[s]=Math.round(i[s]);return i}}(o)}var l=function(){this.convs={}};l.prototype.routeSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i))},l.prototype.setValues=function(t,e){return this.space=t,this.convs={},this.convs[t]=e,this},l.prototype.getValues=function(t){var e=this.convs[t];if(!e){var i=this.space,a=this.convs[i];e=s[i][t](a),this.convs[t]=e}return e},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(t){l.prototype[t]=function(e){return this.routeSpace(t,arguments)}}),e.exports=s},{"./conversions":2}],4:[function(t,e,i){function a(t){if(t){var e=/^#([a-fA-F0-9]{3})$/,i=/^#([a-fA-F0-9]{6})$/,a=/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,s=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,o=/(\w+)/,n=[0,0,0],r=1,h=t.match(e);if(h){h=h[1];for(var l=0;l<n.length;l++)n[l]=parseInt(h[l]+h[l],16)}else if(h=t.match(i)){h=h[1];for(var l=0;l<n.length;l++)n[l]=parseInt(h.slice(2*l,2*l+2),16)}else if(h=t.match(a)){for(var l=0;l<n.length;l++)n[l]=parseInt(h[l+1]);r=parseFloat(h[4])}else if(h=t.match(s)){for(var l=0;l<n.length;l++)n[l]=Math.round(2.55*parseFloat(h[l+1]));r=parseFloat(h[4])}else if(h=t.match(o)){if("transparent"==h[1])return[0,0,0,0];if(n=y[h[1]],!n)return}for(var l=0;l<n.length;l++)n[l]=v(n[l],0,255);return r=r||0==r?v(r,0,1):1,n[3]=r,n}}function s(t){if(t){var e=/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,i=t.match(e);if(i){var a=parseFloat(i[4]),s=v(parseInt(i[1]),0,360),o=v(parseFloat(i[2]),0,100),n=v(parseFloat(i[3]),0,100),r=v(isNaN(a)?1:a,0,1);return[s,o,n,r]}}}function o(t){if(t){var e=/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,i=t.match(e);if(i){var a=parseFloat(i[4]),s=v(parseInt(i[1]),0,360),o=v(parseFloat(i[2]),0,100),n=v(parseFloat(i[3]),0,100),r=v(isNaN(a)?1:a,0,1);return[s,o,n,r]}}}function n(t){var e=a(t);return e&&e.slice(0,3)}function r(t){var e=s(t);return e&&e.slice(0,3)}function h(t){var e=a(t);return e?e[3]:(e=s(t))?e[3]:(e=o(t))?e[3]:void 0}function l(t){return"#"+x(t[0])+x(t[1])+x(t[2])}function c(t,e){return 1>e||t[3]&&t[3]<1?d(t,e):"rgb("+t[0]+", "+t[1]+", "+t[2]+")"}function d(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function u(t,e){if(1>e||t[3]&&t[3]<1)return g(t,e);var i=Math.round(t[0]/255*100),a=Math.round(t[1]/255*100),s=Math.round(t[2]/255*100);return"rgb("+i+"%, "+a+"%, "+s+"%)"}function g(t,e){var i=Math.round(t[0]/255*100),a=Math.round(t[1]/255*100),s=Math.round(t[2]/255*100);return"rgba("+i+"%, "+a+"%, "+s+"%, "+(e||t[3]||1)+")"}function m(t,e){return 1>e||t[3]&&t[3]<1?p(t,e):"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"}function p(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function f(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"}function b(t){return k[t.slice(0,3)]}function v(t,e,i){return Math.min(Math.max(e,t),i)}function x(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}var y=t("color-name");e.exports={getRgba:a,getHsla:s,getRgb:n,getHsl:r,getHwb:o,getAlpha:h,hexString:l,rgbString:c,rgbaString:d,percentString:u,percentaString:g,hslString:m,hslaString:p,hwbString:f,keyword:b};var k={};for(var D in y)k[y[D]]=D},{"color-name":5}],5:[function(t,e,i){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},{}]},{},[1]),/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.0.0-beta
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
function(){"use strict";var t=this,e=t.Chart,i=function(t,e){this.config=e,t.length&&t[0].getContext&&(t=t[0]),t.getContext&&(t=t.getContext("2d")),this.ctx=t,this.canvas=t.canvas,this.width=t.canvas.width||parseInt(i.helpers.getStyle(t.canvas,"width"))||i.helpers.getMaximumWidth(t.canvas),this.height=t.canvas.height||parseInt(i.helpers.getStyle(t.canvas,"height"))||i.helpers.getMaximumHeight(t.canvas),this.aspectRatio=this.width/this.height,(isNaN(this.aspectRatio)||isFinite(this.aspectRatio)===!1)&&(this.aspectRatio=void 0!==e.aspectRatio?e.aspectRatio:2),this.originalCanvasStyleWidth=t.canvas.style.width,this.originalCanvasStyleHeight=t.canvas.style.height,i.helpers.retinaScale(this),e&&(this.controller=new i.Controller(this));var a=this;return i.helpers.addResizeListener(t.canvas.parentNode,function(){a.controller&&a.controller.config.options.responsive&&a.controller.resize()}),this.controller?this.controller:this};i.defaults={global:{responsive:!0,responsiveAnimationDuration:0,maintainAspectRatio:!0,events:["mousemove","mouseout","click","touchstart","touchmove","touchend"],hover:{onHover:null,mode:"single",animationDuration:400},onClick:null,defaultColor:"rgba(0,0,0,0.1)",elements:{},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');for(var i=0;i<t.data.datasets.length;i++)e.push('<li><span style="background-color:'+t.data.datasets[i].backgroundColor+'">'),t.data.datasets[i].label&&e.push(t.data.datasets[i].label),e.push("</span></li>");return e.push("</ul>"),e.join("")}}},"undefined"!=typeof amd?define(function(){return i}):"object"==typeof module&&module.exports&&(module.exports=i),t.Chart=i,i.noConflict=function(){return t.Chart=e,i}}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers={},a=i.each=function(t,e,i,a){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var o;if(a)for(o=t.length-1;o>=0;o--)e.apply(i,[t[o],o].concat(s));else for(o=0;o<t.length;o++)e.apply(i,[t[o],o].concat(s))}else for(var n in t)e.apply(i,[t[n],n].concat(s))},s=i.clone=function(t){var e={};return a(t,function(a,o){t.hasOwnProperty(o)&&(i.isArray(a)?e[o]=a.slice(0):"object"==typeof a&&null!==a?e[o]=s(a):e[o]=a)}),e},o=i.extend=function(t){return a(Array.prototype.slice.call(arguments,1),function(e){a(e,function(i,a){e.hasOwnProperty(a)&&(t[a]=i)})}),t},n=(i.configMerge=function(t){var a=s(t);return i.each(Array.prototype.slice.call(arguments,1),function(t){i.each(t,function(s,o){if(t.hasOwnProperty(o))if("scales"===o)a[o]=i.scaleMerge(a.hasOwnProperty(o)?a[o]:{},s);else if("scale"===o)a[o]=i.configMerge(a.hasOwnProperty(o)?a[o]:{},e.scaleService.getScaleDefaults(s.type),s);else if(a.hasOwnProperty(o)&&i.isArray(a[o])&&i.isArray(s)){var n=a[o];i.each(s,function(t,e){e<n.length?"object"==typeof n[e]&&null!==n[e]&&"object"==typeof t&&null!==t?n[e]=i.configMerge(n[e],t):n[e]=t:n.push(t)})}else a.hasOwnProperty(o)&&"object"==typeof a[o]&&null!==a[o]&&"object"==typeof s?a[o]=i.configMerge(a[o],s):a[o]=s})}),a},i.extendDeep=function(t){function e(t){return i.each(arguments,function(a){a!==t&&i.each(a,function(i,a){t[a]&&t[a].constructor&&t[a].constructor===Object?e(t[a],i):t[a]=i})}),t}return e.apply(this,arguments)},i.scaleMerge=function(t,a){var o=s(t);return i.each(a,function(t,s){a.hasOwnProperty(s)&&("xAxes"===s||"yAxes"===s?o.hasOwnProperty(s)?i.each(t,function(t,a){a>=o[s].length||!o[s][a].type?o[s].push(i.configMerge(t.type?e.scaleService.getScaleDefaults(t.type):{},t)):t.type!==o[s][a].type?o[s][a]=i.configMerge(o[s][a],t.type?e.scaleService.getScaleDefaults(t.type):{},t):o[s][a]=i.configMerge(o[s][a],t)}):(o[s]=[],i.each(t,function(t){o[s].push(i.configMerge(t.type?e.scaleService.getScaleDefaults(t.type):{},t))})):o.hasOwnProperty(s)&&"object"==typeof o[s]&&null!==o[s]&&"object"==typeof t?o[s]=i.configMerge(o[s],t):o[s]=t)}),o},i.getValueAtIndexOrDefault=function(t,e,a){return void 0===t||null===t?a:i.isArray(t)?e<t.length?t[e]:a:t},i.indexOf=function(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1},i.where=function(t,e){var a=[];return i.each(t,function(t){e(t)&&a.push(t)}),a},i.findNextWhere=function(t,e,i){(void 0===i||null===i)&&(i=-1);for(var a=i+1;a<t.length;a++){var s=t[a];if(e(s))return s}},i.findPreviousWhere=function(t,e,i){(void 0===i||null===i)&&(i=t.length);for(var a=i-1;a>=0;a--){var s=t[a];if(e(s))return s}},i.inherits=function(t){var e=this,i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},a=function(){this.constructor=i};return a.prototype=e.prototype,i.prototype=new a,i.extend=n,t&&o(i.prototype,t),i.__super__=e.prototype,i}),r=i.noop=function(){},h=(i.uid=function(){var t=0;return function(){return"chart-"+t++}}(),i.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},i.amd="function"==typeof define&&define.amd,i.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)}),l=(i.max=function(t){return Math.max.apply(Math,t)},i.min=function(t){return Math.min.apply(Math,t)},i.sign=function(t){return Math.sign?Math.sign(t):(t=+t,0===t||isNaN(t)?t:t>0?1:-1)},i.log10=function(t){return Math.log10?Math.log10(t):Math.log(t)/Math.LN10},i.getDecimalPlaces=function(t){if(t%1!==0&&h(t)){var e=t.toString();if(e.indexOf("e-")<0)return e.split(".")[1].length;if(e.indexOf(".")<0)return parseInt(e.split("e-")[1]);var i=e.split(".")[1].split("e-");return i[0].length+parseInt(i[1])}return 0},i.toRadians=function(t){return t*(Math.PI/180)},i.toDegrees=function(t){return t*(180/Math.PI)},i.getAngleFromPoint=function(t,e){var i=e.x-t.x,a=e.y-t.y,s=Math.sqrt(i*i+a*a),o=Math.atan2(a,i);return o<-.5*Math.PI&&(o+=2*Math.PI),{angle:o,distance:s}},i.aliasPixel=function(t){return t%2===0?0:.5},i.splineCurve=function(t,e,i,a){var s=t,o=e,n=i;s.skip&&(s=o),n.skip&&(n=o);var r=Math.sqrt(Math.pow(o.x-s.x,2)+Math.pow(o.y-s.y,2)),h=Math.sqrt(Math.pow(n.x-o.x,2)+Math.pow(n.y-o.y,2)),l=a*r/(r+h),c=a*h/(r+h);return{previous:{x:o.x-l*(n.x-s.x),y:o.y-l*(n.y-s.y)},next:{x:o.x+c*(n.x-s.x),y:o.y+c*(n.y-s.y)}}},i.nextItem=function(t,e,i){return i?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},i.previousItem=function(t,e,i){return i?0>=e?t[t.length-1]:t[e-1]:0>=e?t[0]:t[e-1]},i.niceNum=function(t,e){var a,s=Math.floor(i.log10(t)),o=t/Math.pow(10,s);return a=e?1.5>o?1:3>o?2:7>o?5:10:1>=o?1:2>=o?2:5>=o?5:10,a*Math.pow(10,s)},i.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:1==(t/=1)?1:(i||(i=.3),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),-(a*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)))},easeOutElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:1==(t/=1)?1:(i||(i=.3),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),a*Math.pow(2,-10*t)*Math.sin((1*t-e)*(2*Math.PI)/i)+1)},easeInOutElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:2==(t/=.5)?1:(i||(i=1*(.3*1.5)),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),1>t?-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)):a*Math.pow(2,-10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:function(t){return 1-l.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?1*(7.5625*t*t):2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*l.easeInBounce(2*t):.5*l.easeOutBounce(2*t-1)+.5}}),c=(i.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),i.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),i.getRelativePosition=function(t,e){var i,a,s=t.originalEvent||t,o=t.currentTarget||t.srcElement,n=o.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX,a=s.touches[0].clientY):(i=s.clientX,a=s.clientY),i=Math.round((i-n.left)/(n.right-n.left)*o.width/e.currentDevicePixelRatio),a=Math.round((a-n.top)/(n.bottom-n.top)*o.height/e.currentDevicePixelRatio),{x:i,y:a}},i.addEvent=function(t,e,i){t.addEventListener?t.addEventListener(e,i):t.attachEvent?t.attachEvent("on"+e,i):t["on"+e]=i}),d=i.removeEvent=function(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent?t.detachEvent("on"+e,i):t["on"+e]=r},u=(i.bindEvents=function(t,e,i){t.events||(t.events={}),a(e,function(e){t.events[e]=function(){i.apply(t,arguments)},c(t.chart.canvas,e,t.events[e])})},i.unbindEvents=function(t,e){a(e,function(e,i){d(t.chart.canvas,i,e)})},i.getConstraintWidth=function(t){var e,i=document.defaultView.getComputedStyle(t)["max-width"],a=document.defaultView.getComputedStyle(t.parentNode)["max-width"],s=null!==i&&"none"!==i,o=null!==a&&"none"!==a;return(s||o)&&(e=Math.min(s?parseInt(i,10):Number.POSITIVE_INFINITY,o?parseInt(a,10):Number.POSITIVE_INFINITY)),e}),g=i.getConstraintHeight=function(t){var e,i=document.defaultView.getComputedStyle(t)["max-height"],a=document.defaultView.getComputedStyle(t.parentNode)["max-height"],s=null!==i&&"none"!==i,o=null!==a&&"none"!==a;return(i||a)&&(e=Math.min(s?parseInt(i,10):Number.POSITIVE_INFINITY,o?parseInt(a,10):Number.POSITIVE_INFINITY)),e},m=(i.getMaximumWidth=function(t){var e=t.parentNode,i=parseInt(m(e,"padding-left"))+parseInt(m(e,"padding-right")),a=e.clientWidth-i,s=u(t);return void 0!==s&&(a=Math.min(a,s)),a},i.getMaximumHeight=function(t){var e=t.parentNode,i=parseInt(m(e,"padding-top"))+parseInt(m(e,"padding-bottom")),a=e.clientHeight-i,s=g(t);return void 0!==s&&(a=Math.min(a,s)),a},i.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)});i.getMaximumSize=i.getMaximumWidth,i.retinaScale=function(t){var e=t.ctx,i=t.canvas.width,a=t.canvas.height;t.currentDevicePixelRatio=window.devicePixelRatio||1,1!==window.devicePixelRatio&&(e.canvas.height=a*window.devicePixelRatio,e.canvas.width=i*window.devicePixelRatio,e.scale(window.devicePixelRatio,window.devicePixelRatio),e.canvas.style.width=i+"px",e.canvas.style.height=a+"px",t.originalDevicePixelRatio=t.originalDevicePixelRatio||window.devicePixelRatio)},i.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},i.fontString=function(t,e,i){return e+" "+t+"px "+i},i.longestText=function(t,e,i){t.font=e;var s=0;return a(i,function(e){var i=t.measureText(e).width;s=i>s?i:s}),s},i.drawRoundedRectangle=function(t,e,i,a,s,o){t.beginPath(),t.moveTo(e+o,i),t.lineTo(e+a-o,i),t.quadraticCurveTo(e+a,i,e+a,i+o),t.lineTo(e+a,i+s-o),t.quadraticCurveTo(e+a,i+s,e+a-o,i+s),t.lineTo(e+o,i+s),t.quadraticCurveTo(e,i+s,e,i+s-o),t.lineTo(e,i+o),t.quadraticCurveTo(e,i,e+o,i),t.closePath()},i.color=function(t){return window.Color?window.Color(t):(console.log("Color.js not found!"),t)},i.addResizeListener=function(t,e){var i=document.createElement("iframe"),a="chartjs-hidden-iframe";i.classlist?i.classlist.add(a):i.setAttribute("class",a),i.style.width="100%",i.style.display="block",i.style.border=0,i.style.height=0,i.style.margin=0,i.style.position="absolute",i.style.left=0,i.style.right=0,i.style.top=0,i.style.bottom=0,t.insertBefore(i,t.firstChild);(i.contentWindow||i).onresize=function(){e&&e()}},i.removeResizeListener=function(t){var e=t.querySelector(".chartjs-hidden-iframe");e&&e.parentNode.removeChild(e)},i.isArray=function(t){return Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(arg)},i.isDatasetVisible=function(t){return!t.hidden}}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.elements={},e.Element=function(t){i.extend(this,t),this.initialize.apply(this,arguments)},i.extend(e.Element.prototype,{initialize:function(){},pivot:function(){return this._view||(this._view=i.clone(this._model)),this._start=i.clone(this._view),this},transition:function(t){return this._view||(this._view=i.clone(this._model)),this._start||this.pivot(),i.each(this._model,function(e,a){if("_"!==a[0]&&this._model.hasOwnProperty(a))if(this._view[a])if(this._model[a]===this._view[a]);else if("string"==typeof e)try{var s=i.color(this._start[a]).mix(i.color(this._model[a]),t);this._view[a]=s.rgbString()}catch(o){this._view[a]=e}else if("number"==typeof e){var n=void 0!==this._start[a]?this._start[a]:0;this._view[a]=(this._model[a]-n)*t+n}else this._view[a]=e;else"number"==typeof e?this._view[a]=e*t:this._view[a]=e||null;else;},this),1===t&&delete this._start,this},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return i.isNumber(this._model.x)&&i.isNumber(this._model.y)}}),e.Element.extend=i.inherits}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.global.animation={duration:1e3,easing:"easeOutQuart",onProgress:function(){},onComplete:function(){}},e.Animation=e.Element.extend({currentStep:null,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),e.animationService={frameDuration:17,animations:[],dropFrames:0,addAnimation:function(t,e,a,s){s||(t.animating=!0);for(var o=0;o<this.animations.length;++o)if(this.animations[o].chartInstance===t)return void(this.animations[o].animationObject=e);this.animations.push({chartInstance:t,animationObject:e}),1==this.animations.length&&i.requestAnimFrame.call(window,this.digestWrapper)},cancelAnimation:function(t){var e=i.findNextWhere(this.animations,function(e){return e.chartInstance===t});e&&(this.animations.splice(e,1),t.animating=!1)},digestWrapper:function(){e.animationService.startDigest.call(e.animationService)},startDigest:function(){var t=Date.now(),e=0;this.dropFrames>1&&(e=Math.floor(this.dropFrames),this.dropFrames=this.dropFrames%1);for(var a=0;a<this.animations.length;a++)null===this.animations[a].animationObject.currentStep&&(this.animations[a].animationObject.currentStep=0),this.animations[a].animationObject.currentStep+=1+e,this.animations[a].animationObject.currentStep>this.animations[a].animationObject.numSteps&&(this.animations[a].animationObject.currentStep=this.animations[a].animationObject.numSteps),this.animations[a].animationObject.render(this.animations[a].chartInstance,this.animations[a].animationObject),this.animations[a].animationObject.currentStep==this.animations[a].animationObject.numSteps&&(this.animations[a].chartInstance.animating=!1,this.animations.splice(a,1),a--);var s=Date.now(),o=(s-t)/this.frameDuration;this.dropFrames+=o,this.animations.length>0&&i.requestAnimFrame.call(window,this.digestWrapper)}}}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.types={},e.instances={},e.controllers={},e.Controller=function(t){return this.chart=t,this.config=t.config,this.data=this.config.data,this.options=this.config.options=i.configMerge(e.defaults.global,e.defaults[this.config.type],this.config.options||{}),this.id=i.uid(),e.instances[this.id]=this,this.options.responsive&&this.resize(!0),this.initialize.call(this),this},i.extend(e.Controller.prototype,{initialize:function(){return this.bindEvents(),this.ensureScalesHaveIDs(),this.buildOrUpdateControllers(),this.buildScales(),this.resetElements(),this.initToolTip(),this.update(),this},clear:function(){return i.clear(this.chart),this},stop:function(){return e.animationService.cancelAnimation(this),this},resize:function(t){this.stop();var e=this.chart.canvas,a=i.getMaximumWidth(this.chart.canvas),s=this.options.maintainAspectRatio&&isNaN(this.chart.aspectRatio)===!1&&isFinite(this.chart.aspectRatio)&&0!==this.chart.aspectRatio?a/this.chart.aspectRatio:i.getMaximumHeight(this.chart.canvas);return e.width=this.chart.width=a,e.height=this.chart.height=s,i.retinaScale(this.chart),t||this.update(this.options.responsiveAnimationDuration),this},ensureScalesHaveIDs:function(){var t="x-axis-",e="y-axis-";this.options.scales&&(this.options.scales.xAxes&&this.options.scales.xAxes.length&&i.each(this.options.scales.xAxes,function(e,i){e.id=e.id||t+i},this),this.options.scales.yAxes&&this.options.scales.yAxes.length&&i.each(this.options.scales.yAxes,function(t,i){t.id=t.id||e+i},this))},buildScales:function(){if(this.scales={},this.options.scales&&(this.options.scales.xAxes&&this.options.scales.xAxes.length&&i.each(this.options.scales.xAxes,function(t,i){var a=e.scaleService.getScaleConstructor(t.type),s=new a({ctx:this.chart.ctx,options:t,data:this.data,id:t.id});this.scales[s.id]=s},this),this.options.scales.yAxes&&this.options.scales.yAxes.length&&i.each(this.options.scales.yAxes,function(t,i){var a=e.scaleService.getScaleConstructor(t.type),s=new a({ctx:this.chart.ctx,options:t,data:this.data,id:t.id});this.scales[s.id]=s},this)),this.options.scale){var t=e.scaleService.getScaleConstructor(this.options.scale.type),a=new t({ctx:this.chart.ctx,options:this.options.scale,data:this.data,chart:this.chart});this.scale=a,this.scales.radialScale=a}e.scaleService.update(this,this.chart.width,this.chart.height)},buildOrUpdateControllers:function(t){var a=[];if(i.each(this.data.datasets,function(i,s){i.type||(i.type=this.config.type);var o=i.type;return a.push(o),i.controller?void i.controller.updateIndex(s):(i.controller=new e.controllers[o](this,s),void(t&&i.controller.reset()))},this),a.length>1)for(var s=1;s<a.length;s++)if(a[s]!=a[s-1]){this.isCombo=!0;break}},resetElements:function(){i.each(this.data.datasets,function(t,e){t.controller.reset()},this)},update:function(t,a){e.scaleService.update(this,this.chart.width,this.chart.height),this.buildOrUpdateControllers(!0),i.each(this.data.datasets,function(t,e){t.controller.buildOrUpdateElements()},this),i.each(this.data.datasets,function(t,e){t.controller.update()},this),this.render(t,a)},render:function(t,a){if("undefined"!=typeof t&&0!==t||"undefined"==typeof t&&0!==this.options.animation.duration){var s=new e.Animation;s.numSteps=(t||this.options.animation.duration)/16.66,s.easing=this.options.animation.easing,s.render=function(t,e){var a=i.easingEffects[e.easing],s=e.currentStep/e.numSteps,o=a(s);t.draw(o,s,e.currentStep)},s.onAnimationProgress=this.options.onAnimationProgress,s.onAnimationComplete=this.options.onAnimationComplete,e.animationService.addAnimation(this,s,t,a)}else this.draw(),this.options.onAnimationComplete&&this.options.onAnimationComplete.call&&this.options.onAnimationComplete.call(this);return this},draw:function(t){var e=t||1;this.clear(),i.each(this.scales,function(t){t.draw(this.chartArea)},this),this.scale&&this.scale.draw(),i.each(this.data.datasets,function(e,a){i.isDatasetVisible(e)&&e.controller.draw(t)},this),this.tooltip.transition(e).draw()},getElementAtEvent:function(t){var e=i.getRelativePosition(t,this.chart),a=[];return i.each(this.data.datasets,function(t,s){i.isDatasetVisible(t)&&i.each(t.metaData,function(t,i){return t.inRange(e.x,e.y)?(a.push(t),a):void 0},this)},this),a},getElementsAtEvent:function(t){var e=i.getRelativePosition(t,this.chart),a=[],s=function(){for(var t=0;t<this.data.datasets.length;t++)if(i.isDatasetVisible(this.data.datasets[t]))for(var a=0;a<this.data.datasets[t].metaData.length;a++)if(this.data.datasets[t].metaData[a].inRange(e.x,e.y))return this.data.datasets[t].metaData[a]}.call(this);return s?(i.each(this.data.datasets,function(t,e){i.isDatasetVisible(t)&&a.push(t.metaData[s._index])},this),a):a},getDatasetAtEvent:function(t){var e=i.getRelativePosition(t,this.chart),a=[];return i.each(this.data.datasets,function(t,s){i.isDatasetVisible(t)&&i.each(t.metaData,function(s,o){s.inLabelRange(e.x,e.y)&&i.each(t.metaData,function(t,e){a.push(t)},this)},this)},this),a.length?a:[]},generateLegend:function(){return this.options.legendCallback(this)},destroy:function(){this.clear(),i.unbindEvents(this,this.events),i.removeResizeListener(this.chart.canvas.parentNode);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,void 0!==this.chart.originalDevicePixelRatio&&this.chart.ctx.scale(1/this.chart.originalDevicePixelRatio,1/this.chart.originalDevicePixelRatio),t.style.width=this.chart.originalCanvasStyleWidth,t.style.height=this.chart.originalCanvasStyleHeight,delete e.instances[this.id]},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)},initToolTip:function(){this.tooltip=new e.Tooltip({_chart:this.chart,_data:this.data,_options:this.options},this)},bindEvents:function(){i.bindEvents(this,this.options.events,function(t){this.eventHandler(t)})},eventHandler:function(t){this.lastActive=this.lastActive||[],this.lastTooltipActive=this.lastTooltipActive||[],"mouseout"==t.type?(this.active=[],this.tooltipActive=[]):(this.active=function(){switch(this.options.hover.mode){case"single":return this.getElementAtEvent(t);case"label":return this.getElementsAtEvent(t);case"dataset":return this.getDatasetAtEvent(t);default:return t}}.call(this),this.tooltipActive=function(){switch(this.options.tooltips.mode){case"single":return this.getElementAtEvent(t);case"label":return this.getElementsAtEvent(t);case"dataset":return this.getDatasetAtEvent(t);default:return t}}.call(this)),this.options.hover.onHover&&this.options.hover.onHover.call(this,this.active),("mouseup"==t.type||"click"==t.type)&&this.options.onClick&&this.options.onClick.call(this,t,this.active);if(this.lastActive.length)switch(this.options.hover.mode){case"single":this.data.datasets[this.lastActive[0]._datasetIndex].controller.removeHoverStyle(this.lastActive[0],this.lastActive[0]._datasetIndex,this.lastActive[0]._index);break;case"label":case"dataset":for(var e=0;e<this.lastActive.length;e++)this.data.datasets[this.lastActive[e]._datasetIndex].controller.removeHoverStyle(this.lastActive[e],this.lastActive[e]._datasetIndex,this.lastActive[e]._index)}if(this.active.length&&this.options.hover.mode)switch(this.options.hover.mode){case"single":this.data.datasets[this.active[0]._datasetIndex].controller.setHoverStyle(this.active[0]);break;case"label":case"dataset":for(var a=0;a<this.active.length;a++)this.data.datasets[this.active[a]._datasetIndex].controller.setHoverStyle(this.active[a])}if((this.options.tooltips.enabled||this.options.tooltips.custom)&&(this.tooltip.initialize(),this.tooltip._active=this.tooltipActive,this.tooltip.update()),this.tooltip.pivot(),!this.animating){var s;i.each(this.active,function(t,e){t!==this.lastActive[e]&&(s=!0)},this),i.each(this.tooltipActive,function(t,e){t!==this.lastTooltipActive[e]&&(s=!0)},this),(this.lastActive.length!==this.active.length||this.lastTooltipActive.length!==this.tooltipActive.length||s)&&(this.stop(),(this.options.tooltips.enabled||this.options.tooltips.custom)&&this.tooltip.update(!0),this.render(this.options.hover.animationDuration,!0))}return this.lastActive=this.active,this.lastTooltipActive=this.tooltipActive,this}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.scale={display:!0,gridLines:{show:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawOnChartArea:!0,drawTicks:!0,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",offsetGridLines:!1},scaleLabel:{fontColor:"#666",fontFamily:"Helvetica Neue",fontSize:12,fontStyle:"normal",labelString:"",show:!1},ticks:{beginAtZero:!1,fontSize:12,fontStyle:"normal",fontColor:"#666",fontFamily:"Helvetica Neue",maxRotation:90,minRotation:20,mirror:!1,padding:10,reverse:!1,show:!0,callback:function(t){return""+t}}},e.Scale=e.Element.extend({beforeUpdate:i.noop,update:function(t,e,i){return this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this.margins=i,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this.beforeBuildTicks(),this.buildTicks(),this.afterBuildTicks(),this.beforeTickToLabelConversion(),this.convertTicksToLabels(),this.afterTickToLabelConversion(),this.beforeCalculateTickRotation(),this.calculateTickRotation(),this.afterCalculateTickRotation(),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate(),this.minSize},afterUpdate:i.noop,beforeSetDimensions:i.noop,setDimensions:function(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0},afterSetDimensions:i.noop,beforeBuildTicks:i.noop,buildTicks:i.noop,afterBuildTicks:i.noop,beforeTickToLabelConversion:i.noop,convertTicksToLabels:function(){this.ticks=this.ticks.map(function(t,e,i){return this.options.ticks.userCallback?this.options.ticks.userCallback(t,e,i):this.options.ticks.callback(t,e,i)},this)},afterTickToLabelConversion:i.noop,beforeCalculateTickRotation:i.noop,calculateTickRotation:function(){var t=i.fontString(this.options.ticks.fontSize,this.options.ticks.fontStyle,this.options.ticks.fontFamily);this.ctx.font=t;var e,a,s=this.ctx.measureText(this.ticks[0]).width,o=this.ctx.measureText(this.ticks[this.ticks.length-1]).width;if(this.paddingRight=o/2+3,this.paddingLeft=s/2+3,this.labelRotation=0,this.options.display&&this.isHorizontal()){var n,r,h=i.longestText(this.ctx,t,this.ticks);this.labelWidth=h;for(var l=this.getPixelForTick(1)-this.getPixelForTick(0)-6;this.labelWidth>l&&this.labelRotation<=this.options.ticks.maxRotation;){if(n=Math.cos(i.toRadians(this.labelRotation)),r=Math.sin(i.toRadians(this.labelRotation)),e=n*s,a=n*o,e+this.options.ticks.fontSize/2>this.yLabelWidth&&(this.paddingLeft=e+this.options.ticks.fontSize/2),this.paddingRight=this.options.ticks.fontSize/2,r*h>this.maxHeight){this.labelRotation--;break}this.labelRotation++,this.labelWidth=n*h}}else this.labelWidth=0,this.paddingRight=0,this.paddingLeft=0;this.margins&&(this.paddingLeft-=this.margins.left,this.paddingRight-=this.margins.right,this.paddingLeft=Math.max(this.paddingLeft,0),this.paddingRight=Math.max(this.paddingRight,0))},afterCalculateTickRotation:i.noop,beforeFit:i.noop,fit:function(){if(this.minSize={width:0,height:0},this.isHorizontal()?this.minSize.width=this.maxWidth:this.minSize.width=this.options.gridLines.show&&this.options.display?10:0,this.isHorizontal()?this.minSize.height=this.options.gridLines.show&&this.options.display?10:0:this.minSize.height=this.maxHeight,this.options.scaleLabel.show&&(this.isHorizontal()?this.minSize.height+=1.5*this.options.scaleLabel.fontSize:this.minSize.width+=1.5*this.options.scaleLabel.fontSize),this.options.ticks.show&&this.options.display){var t=i.fontString(this.options.ticks.fontSize,this.options.ticks.fontStyle,this.options.ticks.fontFamily);if(this.isHorizontal()){var e=(this.maxHeight-this.minSize.height,i.longestText(this.ctx,t,this.ticks)),a=Math.sin(i.toRadians(this.labelRotation))*e+1.5*this.options.ticks.fontSize;this.minSize.height=Math.min(this.maxHeight,this.minSize.height+a),t=i.fontString(this.options.ticks.fontSize,this.options.ticks.fontStyle,this.options.ticks.fontFamily),this.ctx.font=t;var s=this.ctx.measureText(this.ticks[0]).width,o=this.ctx.measureText(this.ticks[this.ticks.length-1]).width,n=Math.cos(i.toRadians(this.labelRotation)),r=Math.sin(i.toRadians(this.labelRotation));this.paddingLeft=0!==this.labelRotation?n*s+3:s/2+3,this.paddingRight=0!==this.labelRotation?r*(this.options.ticks.fontSize/2)+3:o/2+3}else{var h=this.maxWidth-this.minSize.width,l=i.longestText(this.ctx,t,this.ticks);h>l?this.minSize.width+=l:this.minSize.width=this.maxWidth,this.paddingTop=this.options.ticks.fontSize/2,this.paddingBottom=this.options.ticks.fontSize/2}}this.margins&&(this.paddingLeft-=this.margins.left,this.paddingTop-=this.margins.top,this.paddingRight-=this.margins.right,this.paddingBottom-=this.margins.bottom,this.paddingLeft=Math.max(this.paddingLeft,0),this.paddingTop=Math.max(this.paddingTop,0),this.paddingRight=Math.max(this.paddingRight,0),this.paddingBottom=Math.max(this.paddingBottom,0)),this.width=this.minSize.width,this.height=this.minSize.height},afterFit:i.noop,isHorizontal:function(){return"top"==this.options.position||"bottom"==this.options.position},getRightValue:function a(t){return null===t||"undefined"==typeof t?NaN:"number"==typeof t&&isNaN(t)?NaN:"object"==typeof t?a(this.isHorizontal()?t.x:t.y):t},getLabelForIndex:i.noop,getPixelForValue:i.noop,getPixelForTick:function(t,e){if(this.isHorizontal()){var i=this.width-(this.paddingLeft+this.paddingRight),a=i/Math.max(this.ticks.length-(this.options.gridLines.offsetGridLines?0:1),1),s=a*t+this.paddingLeft;return e&&(s+=a/2),this.left+Math.round(s)}var o=this.height-(this.paddingTop+this.paddingBottom);return this.top+t*(o/(this.ticks.length-1))},getPixelForDecimal:function(t,e){if(this.isHorizontal()){var i=this.width-(this.paddingLeft+this.paddingRight),a=i*t+this.paddingLeft;return this.left+Math.round(a)}return this.top+t*this.height},draw:function(t){if(this.options.display){var e,a,s,o,n=0!==this.labelRotation;this.ctx.fillStyle=this.options.ticks.fontColor;var r=i.fontString(this.options.ticks.fontSize,this.options.ticks.fontStyle,this.options.ticks.fontFamily);if(this.isHorizontal()){e=!0;var h="bottom"==this.options.position?this.top:this.bottom-10,l="bottom"==this.options.position?this.top+10:this.bottom;a=!1,(this.options.ticks.fontSize+4)*this.ticks.length>this.width-(this.paddingLeft+this.paddingRight)&&(a=1+Math.floor((this.options.ticks.fontSize+4)*this.ticks.length/(this.width-(this.paddingLeft+this.paddingRight)))),i.each(this.ticks,function(s,o){if(!(a>1&&o%a>0||void 0===s||null===s)){var c=this.getPixelForTick(o),d=this.getPixelForTick(o,this.options.gridLines.offsetGridLines);this.options.gridLines.show&&(o===("undefined"!=typeof this.zeroLineIndex?this.zeroLineIndex:0)?(this.ctx.lineWidth=this.options.gridLines.zeroLineWidth,this.ctx.strokeStyle=this.options.gridLines.zeroLineColor,e=!0):e&&(this.ctx.lineWidth=this.options.gridLines.lineWidth,this.ctx.strokeStyle=this.options.gridLines.color,e=!1),c+=i.aliasPixel(this.ctx.lineWidth),this.ctx.beginPath(),this.options.gridLines.drawTicks&&(this.ctx.moveTo(c,h),this.ctx.lineTo(c,l)),this.options.gridLines.drawOnChartArea&&(this.ctx.moveTo(c,t.top),this.ctx.lineTo(c,t.bottom)),this.ctx.stroke()),this.options.ticks.show&&(this.ctx.save(),this.ctx.translate(d,n?this.top+12:"top"===this.options.position?this.bottom-10:this.top+10),this.ctx.rotate(-1*i.toRadians(this.labelRotation)),this.ctx.font=r,this.ctx.textAlign=n?"right":"center",
this.ctx.textBaseline=n?"middle":"top"===this.options.position?"bottom":"top",this.ctx.fillText(s,0,0),this.ctx.restore())}},this),this.options.scaleLabel.show&&(this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillStyle=this.options.scaleLabel.fontColor,this.ctx.font=i.fontString(this.options.scaleLabel.fontSize,this.options.scaleLabel.fontStyle,this.options.scaleLabel.fontFamily),s=this.left+(this.right-this.left)/2,o="bottom"==this.options.position?this.bottom-this.options.scaleLabel.fontSize/2:this.top+this.options.scaleLabel.fontSize/2,this.ctx.fillText(this.options.scaleLabel.labelString,s,o))}else{e=!0;var c="right"==this.options.position?this.left:this.right-5,d="right"==this.options.position?this.left+5:this.right;if(i.each(this.ticks,function(a,s){var o=this.getPixelForTick(s);if(this.options.gridLines.show&&(s===("undefined"!=typeof this.zeroLineIndex?this.zeroLineIndex:0)?(this.ctx.lineWidth=this.options.gridLines.zeroLineWidth,this.ctx.strokeStyle=this.options.gridLines.zeroLineColor,e=!0):e&&(this.ctx.lineWidth=this.options.gridLines.lineWidth,this.ctx.strokeStyle=this.options.gridLines.color,e=!1),o+=i.aliasPixel(this.ctx.lineWidth),this.ctx.beginPath(),this.options.gridLines.drawTicks&&(this.ctx.moveTo(c,o),this.ctx.lineTo(d,o)),this.options.gridLines.drawOnChartArea&&(this.ctx.moveTo(t.left,o),this.ctx.lineTo(t.right,o)),this.ctx.stroke()),this.options.ticks.show){var n,h=this.getPixelForTick(s,this.options.gridLines.offsetGridLines);this.ctx.save(),"left"==this.options.position?this.options.ticks.mirror?(n=this.right+this.options.ticks.padding,this.ctx.textAlign="left"):(n=this.right-this.options.ticks.padding,this.ctx.textAlign="right"):this.options.ticks.mirror?(n=this.left-this.options.ticks.padding,this.ctx.textAlign="right"):(n=this.left+this.options.ticks.padding,this.ctx.textAlign="left"),this.ctx.translate(n,h),this.ctx.rotate(-1*i.toRadians(this.labelRotation)),this.ctx.font=r,this.ctx.textBaseline="middle",this.ctx.fillText(a,0,0),this.ctx.restore()}},this),this.options.scaleLabel.show){s="left"==this.options.position?this.left+this.options.scaleLabel.fontSize/2:this.right-this.options.scaleLabel.fontSize/2,o=this.top+(this.bottom-this.top)/2;var u="left"==this.options.position?-.5*Math.PI:.5*Math.PI;this.ctx.save(),this.ctx.translate(s,o),this.ctx.rotate(u),this.ctx.textAlign="center",this.ctx.fillStyle=this.options.scaleLabel.fontColor,this.ctx.font=i.fontString(this.options.scaleLabel.fontSize,this.options.scaleLabel.fontStyle,this.options.scaleLabel.fontFamily),this.ctx.textBaseline="middle",this.ctx.fillText(this.options.scaleLabel.labelString,0,0),this.ctx.restore()}}}}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.scaleService={constructors:{},defaults:{},registerScaleType:function(t,e,a){this.constructors[t]=e,this.defaults[t]=i.clone(a)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(t){return this.defaults.hasOwnProperty(t)?i.scaleMerge(e.defaults.scale,this.defaults[t]):{}},update:function(t,e,a){var s=e>30?5:2,o=a>30?5:2;if(t){var n=i.where(t.scales,function(t){return"left"==t.options.position}),r=i.where(t.scales,function(t){return"right"==t.options.position}),h=i.where(t.scales,function(t){return"top"==t.options.position}),l=i.where(t.scales,function(t){return"bottom"==t.options.position}),c=i.where(t.scales,function(t){return"chartArea"==t.options.position}),d=e/2,u=a/2;d-=2*s,u-=2*o;var g=(e-d)/(n.length+r.length),m=(a-u)/(h.length+l.length),p=[],f=function(t){var e=t.update(g,u);p.push({horizontal:!1,minSize:e,scale:t})},b=function(t){var e=t.update(d,m);p.push({horizontal:!0,minSize:e,scale:t})};i.each(n,f),i.each(r,f),i.each(h,b),i.each(l,b);var v=a-2*o,x=e-2*s;i.each(p,function(t){t.horizontal?v-=t.minSize.height:x-=t.minSize.width});var y=function(t){var e=i.findNextWhere(p,function(e){return e.scale===t});e&&t.update(e.minSize.width,v)},k=function(t){var e=i.findNextWhere(p,function(e){return e.scale===t}),a={left:D,right:w,top:0,bottom:0};e&&t.update(x,e.minSize.height,a)},D=s,w=s,C=o,S=o;i.each(n,y),i.each(r,y),i.each(n,function(t){D+=t.width}),i.each(r,function(t){w+=t.width}),i.each(h,k),i.each(l,k),i.each(h,function(t){C+=t.height}),i.each(l,function(t){S+=t.height}),i.each(n,function(t){var e=i.findNextWhere(p,function(e){return e.scale===t}),a={left:0,right:0,top:C,bottom:S};e&&t.update(e.minSize.width,v,a)}),i.each(r,function(t){var e=i.findNextWhere(p,function(e){return e.scale===t}),a={left:0,right:0,top:C,bottom:S};e&&t.update(e.minSize.width,v,a)}),D=s,w=s,C=o,S=o,i.each(n,function(t){D+=t.width}),i.each(r,function(t){w+=t.width}),i.each(h,function(t){C+=t.height}),i.each(l,function(t){S+=t.height});var _=a-C-S,A=e-D-w;(A!==x||_!==v)&&(i.each(n,function(t){t.height=_}),i.each(r,function(t){t.height=_}),i.each(h,function(t){t.width=A}),i.each(l,function(t){t.width=A}),v=_,x=A);var I=s,M=o,P=function(t){t.left=I,t.right=I+t.width,t.top=C,t.bottom=C+v,I=t.right},F=function(t){t.left=D,t.right=D+x,t.top=M,t.bottom=M+t.height,M=t.bottom};i.each(n,P),i.each(h,F),I+=x,M+=v,i.each(r,P),i.each(l,F),t.chartArea={left:D,top:C,right:D+x,bottom:C+v},i.each(c,function(e){e.left=t.chartArea.left,e.top=t.chartArea.top,e.right=t.chartArea.right,e.bottom=t.chartArea.bottom,e.update(x,v)})}}}}.call(this),function(){"use strict";function t(t,e){return e&&(a.isArray(e)?t=t.concat(e):t.push(e)),t}var e=this,i=e.Chart,a=i.helpers;i.defaults.global.tooltips={enabled:!0,custom:null,mode:"single",backgroundColor:"rgba(0,0,0,0.8)",titleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",titleFontSize:12,titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleColor:"#fff",titleAlign:"left",bodyFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",bodyFontSize:12,bodyFontStyle:"normal",bodySpacing:2,bodyColor:"#fff",bodyAlign:"left",footerFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",footerFontSize:12,footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,caretSize:5,cornerRadius:6,xOffset:10,multiKeyBackground:"#fff",callbacks:{beforeTitle:a.noop,title:function(t,e){var i="";return t.length>0&&(t[0].xLabel?i=t[0].xLabel:e.labels.length>0&&t[0].index<e.labels.length&&(i=e.labels[t[0].index])),i},afterTitle:a.noop,beforeBody:a.noop,beforeLabel:a.noop,label:function(t,e){var i=e.datasets[t.datasetIndex].label||"";return i+": "+t.yLabel},afterLabel:a.noop,afterBody:a.noop,beforeFooter:a.noop,footer:a.noop,afterFooter:a.noop}},i.Tooltip=i.Element.extend({initialize:function(){var t=this._options;a.extend(this,{_model:{xPadding:t.tooltips.xPadding,yPadding:t.tooltips.yPadding,xOffset:t.tooltips.xOffset,bodyColor:t.tooltips.bodyColor,_bodyFontFamily:t.tooltips.bodyFontFamily,_bodyFontStyle:t.tooltips.bodyFontStyle,_bodyAlign:t.tooltips.bodyAlign,bodyFontSize:t.tooltips.bodyFontSize,bodySpacing:t.tooltips.bodySpacing,titleColor:t.tooltips.titleColor,_titleFontFamily:t.tooltips.titleFontFamily,_titleFontStyle:t.tooltips.titleFontStyle,titleFontSize:t.tooltips.titleFontSize,_titleAlign:t.tooltips.titleAlign,titleSpacing:t.tooltips.titleSpacing,titleMarginBottom:t.tooltips.titleMarginBottom,footerColor:t.tooltips.footerColor,_footerFontFamily:t.tooltips.footerFontFamily,_footerFontStyle:t.tooltips.footerFontStyle,footerFontSize:t.tooltips.footerFontSize,_footerAlign:t.tooltips.footerAlign,footerSpacing:t.tooltips.footerSpacing,footerMarginTop:t.tooltips.footerMarginTop,caretSize:t.tooltips.caretSize,cornerRadius:t.tooltips.cornerRadius,backgroundColor:t.tooltips.backgroundColor,opacity:0,legendColorBackground:t.tooltips.multiKeyBackground}})},getTitle:function(){var e=this._options.tooltips.callbacks.beforeTitle.apply(this,arguments),i=this._options.tooltips.callbacks.title.apply(this,arguments),a=this._options.tooltips.callbacks.afterTitle.apply(this,arguments),s=[];return s=t(s,e),s=t(s,i),s=t(s,a)},getBeforeBody:function(){var t=this._options.tooltips.callbacks.beforeBody.call(this,arguments);return a.isArray(t)?t:[t]},getBody:function(t,e){var i=[];return a.each(t,function(t){var a=this._options.tooltips.callbacks.beforeLabel.call(this,t,e)||"",s=this._options.tooltips.callbacks.label.call(this,t,e)||"",o=this._options.tooltips.callbacks.afterLabel.call(this,t,e)||"";i.push(a+s+o)},this),i},getAfterBody:function(){var t=this._options.tooltips.callbacks.afterBody.call(this,arguments);return a.isArray(t)?t:[t]},getFooter:function(){var e=this._options.tooltips.callbacks.beforeFooter.apply(this,arguments),i=this._options.tooltips.callbacks.footer.apply(this,arguments),a=this._options.tooltips.callbacks.afterFooter.apply(this,arguments),s=[];return s=t(s,e),s=t(s,i),s=t(s,a)},getAveragePosition:function(t){if(!t.length)return!1;var e=[],i=[];a.each(t,function(t){var a=t.tooltipPosition();e.push(a.x),i.push(a.y)});for(var s=0,o=0,n=0;n<e.length;n++)s+=e[n],o+=i[n];return{x:Math.round(s/e.length),y:Math.round(o/e.length)}},update:function(t){this._chart.ctx;if(this._active.length){this._model.opacity=1;var e,i=this._active[0],s=[],o=[];if("single"==this._options.tooltips.mode){var n=i._yScale||i._scale;o.push({xLabel:i._xScale?i._xScale.getLabelForIndex(i._index,i._datasetIndex):"",yLabel:n?n.getLabelForIndex(i._index,i._datasetIndex):"",index:i._index,datasetIndex:i._datasetIndex}),e=this.getAveragePosition(this._active)}else a.each(this._data.datasets,function(t,e){if(a.isDatasetVisible(t)){var s=t.metaData[i._index],n=i._yScale||i._scale;o.push({xLabel:s._xScale?s._xScale.getLabelForIndex(s._index,s._datasetIndex):"",yLabel:n?n.getLabelForIndex(s._index,s._datasetIndex):"",index:i._index,datasetIndex:e})}}),a.each(this._active,function(t,e){s.push({borderColor:t._view.borderColor,backgroundColor:t._view.backgroundColor})},this),e=this.getAveragePosition(this._active),e.y=this._active[0]._yScale.getPixelForDecimal(.5);a.extend(this._model,{title:this.getTitle(o,this._data),beforeBody:this.getBeforeBody(o,this._data),body:this.getBody(o,this._data),afterBody:this.getAfterBody(o,this._data),footer:this.getFooter(o,this._data)}),a.extend(this._model,{x:Math.round(e.x),y:Math.round(e.y),caretPadding:e.padding,labelColors:s})}else this._model.opacity=0;return t&&this._options.tooltips.custom&&this._options.tooltips.custom.call(this,this._model),this},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==this._view.opacity){e.position="top";var i=e.caretPadding||2,s=e.body.length+e.beforeBody.length+e.afterBody.length,o=2*e.yPadding;o+=e.title.length*e.titleFontSize,o+=(e.title.length-1)*e.titleSpacing,o+=e.title.length?e.titleMarginBottom:0,o+=s*e.bodyFontSize,o+=(s-1)*e.bodySpacing,o+=e.footer.length?e.footerMarginTop:0,o+=e.footer.length*e.footerFontSize,o+=(e.footer.length-1)*e.footerSpacing;var n=0;a.each(e.title,function(i,s){t.font=a.fontString(e.titleFontSize,e._titleFontStyle,e._titleFontFamily),n=Math.max(n,t.measureText(i).width)}),a.each(e.body,function(i,s){t.font=a.fontString(e.bodyFontSize,e._bodyFontStyle,e._bodyFontFamily),n=Math.max(n,t.measureText(i).width+("single"!=this._options.tooltips.mode?e.bodyFontSize+2:0))},this),a.each(e.footer,function(i,s){t.font=a.fontString(e.footerFontSize,e._footerFontStyle,e._footerFontFamily),n=Math.max(n,t.measureText(i).width)}),n+=2*e.xPadding;var r=n+e.caretSize+i;e.yAlign="center",e.y-o/2<0?e.yAlign="top":e.y+o/2>this._chart.height&&(e.yAlign="bottom"),e.xAlign="right",e.x+r>this._chart.width&&(e.xAlign="left");var h=e.x,l=e.y;if(l="top"==e.yAlign?e.y-e.caretSize-e.cornerRadius:"bottom"==e.yAlign?e.y-o+e.caretSize+e.cornerRadius:e.y-o/2,h="left"==e.xAlign?e.x-r:"right"==e.xAlign?e.x+i+e.caretSize:e.x+r/2,this._options.tooltips.enabled&&(t.fillStyle=a.color(e.backgroundColor).alpha(e.opacity).rgbString(),a.drawRoundedRectangle(t,h,l,n,o,e.cornerRadius),t.fill()),this._options.tooltips.enabled&&(t.fillStyle=a.color(e.backgroundColor).alpha(e.opacity).rgbString(),"left"==e.xAlign?(t.beginPath(),t.moveTo(e.x-i,e.y),t.lineTo(e.x-i-e.caretSize,e.y-e.caretSize),t.lineTo(e.x-i-e.caretSize,e.y+e.caretSize),t.closePath(),t.fill()):(t.beginPath(),t.moveTo(e.x+i,e.y),t.lineTo(e.x+i+e.caretSize,e.y-e.caretSize),t.lineTo(e.x+i+e.caretSize,e.y+e.caretSize),t.closePath(),t.fill())),this._options.tooltips.enabled){var c=l+e.yPadding,d=h+e.xPadding;e.title.length&&(t.textAlign=e._titleAlign,t.textBaseline="top",t.fillStyle=a.color(e.titleColor).alpha(e.opacity).rgbString(),t.font=a.fontString(e.titleFontSize,e._titleFontStyle,e._titleFontFamily),a.each(e.title,function(i,a){t.fillText(i,d,c),c+=e.titleFontSize+e.titleSpacing,a+1==e.title.length&&(c+=e.titleMarginBottom-e.titleSpacing)},this)),t.textAlign=e._bodyAlign,t.textBaseline="top",t.fillStyle=a.color(e.bodyColor).alpha(e.opacity).rgbString(),t.font=a.fontString(e.bodyFontSize,e._bodyFontStyle,e._bodyFontFamily),a.each(e.beforeBody,function(i,a){t.fillText(e.beforeBody,d,c),c+=e.bodyFontSize+e.bodySpacing}),a.each(e.body,function(i,s){"single"!=this._options.tooltips.mode&&(t.fillStyle=a.color(e.labelColors[s].borderColor).alpha(e.opacity).rgbString(),t.fillRect(d,c,e.bodyFontSize,e.bodyFontSize),t.fillStyle=a.color(e.labelColors[s].backgroundColor).alpha(e.opacity).rgbString(),t.fillRect(d+1,c+1,e.bodyFontSize-2,e.bodyFontSize-2),t.fillStyle=a.color(e.bodyColor).alpha(e.opacity).rgbString()),t.fillText(i,d+("single"!=this._options.tooltips.mode?e.bodyFontSize+2:0),c),c+=e.bodyFontSize+e.bodySpacing},this),a.each(e.afterBody,function(i,a){t.fillText(e.afterBody,d,c),c+=e.bodyFontSize}),c-=e.bodySpacing,e.footer.length&&(c+=e.footerMarginTop,t.textAlign=e._footerAlign,t.textBaseline="top",t.fillStyle=a.color(e.footerColor).alpha(e.opacity).rgbString(),t.font=a.fontString(e.footerFontSize,e._footerFontStyle,e._footerFontFamily),a.each(e.footer,function(i,a){t.fillText(i,d,c),c+=e.footerFontSize+e.footerSpacing},this))}}}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.bar={hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}},e.controllers.bar=function(t,e){this.initialize.call(this,t,e)},i.extend(e.controllers.bar.prototype,{initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){this.getDataset().xAxisID||(this.getDataset().xAxisID=this.chart.options.scales.xAxes[0].id),this.getDataset().yAxisID||(this.getDataset().yAxisID=this.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getScaleForID:function(t){return this.chart.scales[t]},getBarCount:function(){var t=0;return i.each(this.chart.data.datasets,function(e){i.isDatasetVisible(e)&&("bar"===e.type?++t:void 0===e.type&&"bar"===this.chart.config.type&&++t)},this),t},addElements:function(){this.getDataset().metaData=this.getDataset().metaData||[],i.each(this.getDataset().data,function(t,i){this.getDataset().metaData[i]=this.getDataset().metaData[i]||new e.elements.Rectangle({_chart:this.chart.chart,_datasetIndex:this.index,_index:i})},this)},addElementAndReset:function(t){this.getDataset().metaData=this.getDataset().metaData||[];var i=new e.elements.Rectangle({_chart:this.chart.chart,_datasetIndex:this.index,_index:t}),a=this.getBarCount();this.updateElement(i,t,!0,a),this.getDataset().metaData.splice(t,0,i)},removeElement:function(t){this.getDataset().metaData.splice(t,1)},reset:function(){this.update(!0)},buildOrUpdateElements:function(){var t=this.getDataset().data.length,e=this.getDataset().metaData.length;if(e>t)this.getDataset().metaData.splice(t,e-t);else if(t>e)for(var i=e;t>i;++i)this.addElementAndReset(i)},update:function(t){var e=this.getBarCount();i.each(this.getDataset().metaData,function(i,a){this.updateElement(i,a,t,e)},this)},updateElement:function(t,e,a,s){var o,n=this.getScaleForID(this.getDataset().xAxisID),r=this.getScaleForID(this.getDataset().yAxisID);o=r.min<0&&r.max<0?r.getPixelForValue(r.max):r.min>0&&r.max>0?r.getPixelForValue(r.min):r.getPixelForValue(0),i.extend(t,{_chart:this.chart.chart,_xScale:n,_yScale:r,_datasetIndex:this.index,_index:e,_model:{x:this.calculateBarX(e,this.index),y:a?o:this.calculateBarY(e,this.index),label:this.chart.data.labels[e],datasetLabel:this.getDataset().label,base:this.calculateBarBase(this.index,e),width:this.calculateBarWidth(s),backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.rectangle.backgroundColor),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.rectangle.borderColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.rectangle.borderWidth)}}),t.pivot()},calculateBarBase:function(t,e){var a=(this.getScaleForID(this.getDataset().xAxisID),this.getScaleForID(this.getDataset().yAxisID)),s=0;if(a.options.stacked){var o=this.chart.data.datasets[t].data[e];if(0>o)for(var n=0;t>n;n++){var r=this.chart.data.datasets[n];i.isDatasetVisible(r)&&r.yAxisID===a.id&&(s+=r.data[e]<0?r.data[e]:0)}else for(var h=0;t>h;h++){var l=this.chart.data.datasets[h];i.isDatasetVisible(l)&&l.yAxisID===a.id&&(s+=l.data[e]>0?l.data[e]:0)}return a.getPixelForValue(s)}return s=a.getPixelForValue(a.min),a.beginAtZero||a.min<=0&&a.max>=0||a.min>=0&&a.max<=0?s=a.getPixelForValue(0,0):a.min<0&&a.max<0&&(s=a.getPixelForValue(a.max)),s},getRuler:function(){var t=this.getScaleForID(this.getDataset().xAxisID),e=(this.getScaleForID(this.getDataset().yAxisID),this.getBarCount()),i=function(){for(var e=t.getPixelForValue(null,1)-t.getPixelForValue(null,0),i=2;i<this.getDataset().data.length;i++)e=Math.min(t.getPixelForValue(null,i)-t.getPixelForValue(null,i-1),e);return e}.call(this),a=i*t.options.categoryPercentage,s=(i-i*t.options.categoryPercentage)/2,o=a/e,n=o*t.options.barPercentage,r=o-o*t.options.barPercentage;return{datasetCount:e,tickWidth:i,categoryWidth:a,categorySpacing:s,fullBarWidth:o,barWidth:n,barSpacing:r}},calculateBarWidth:function(){var t=this.getScaleForID(this.getDataset().xAxisID),e=this.getRuler();return t.options.stacked?e.categoryWidth:e.barWidth},getBarIndex:function(t){for(var e=0,a=0;t>a;++a)i.isDatasetVisible(this.chart.data.datasets[a])&&("bar"===this.chart.data.datasets[a].type||void 0===this.chart.data.datasets[a].type&&"bar"===this.chart.config.type)&&++e;return e},calculateBarX:function(t,e){var i=(this.getScaleForID(this.getDataset().yAxisID),this.getScaleForID(this.getDataset().xAxisID)),a=this.getBarIndex(e),s=this.getRuler(),o=i.getPixelForValue(null,t,a,this.chart.isCombo);return o-=this.chart.isCombo?s.tickWidth/2:0,i.options.stacked?o+s.categoryWidth/2+s.categorySpacing:o+s.barWidth/2+s.categorySpacing+s.barWidth*a+s.barSpacing/2+s.barSpacing*a},calculateBarY:function(t,e){var a=(this.getScaleForID(this.getDataset().xAxisID),this.getScaleForID(this.getDataset().yAxisID)),s=this.getDataset().data[t];if(a.options.stacked){for(var o=0,n=0,r=0;e>r;r++){var h=this.chart.data.datasets[r];i.isDatasetVisible(h)&&(h.data[t]<0?n+=h.data[t]||0:o+=h.data[t]||0)}return 0>s?a.getPixelForValue(n+s):a.getPixelForValue(o+s)}return a.getPixelForValue(s)},draw:function(t){var e=t||1;i.each(this.getDataset().metaData,function(t,i){t.transition(e).draw()},this)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(e.hoverBackgroundColor,a,i.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:i.getValueAtIndexOrDefault(e.hoverBorderColor,a,i.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:i.getValueAtIndexOrDefault(e.hoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var e=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.rectangle.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.rectangle.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.rectangle.borderWidth)}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.bubble={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{template:"(<%= value.x %>, <%= value.y %>, <%= value.r %>)",multiTemplate:"<%if (datasetLabel){%><%=datasetLabel%>: <%}%>(<%= value.x %>, <%= value.y %>, <%= value.r %>)"}},e.controllers.bubble=function(t,e){this.initialize.call(this,t,e)},i.extend(e.controllers.bubble.prototype,{initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){this.getDataset().xAxisID||(this.getDataset().xAxisID=this.chart.options.scales.xAxes[0].id),this.getDataset().yAxisID||(this.getDataset().yAxisID=this.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getScaleForId:function(t){return this.chart.scales[t]},addElements:function(){this.getDataset().metaData=this.getDataset().metaData||[],i.each(this.getDataset().data,function(t,i){this.getDataset().metaData[i]=this.getDataset().metaData[i]||new e.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:i})},this)},addElementAndReset:function(t){this.getDataset().metaData=this.getDataset().metaData||[];var i=new e.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:t});this.updateElement(i,t,!0),this.getDataset().metaData.splice(t,0,i)},removeElement:function(t){this.getDataset().metaData.splice(t,1)},reset:function(){this.update(!0)},buildOrUpdateElements:function(){var t=this.getDataset().data.length,e=this.getDataset().metaData.length;if(e>t)this.getDataset().metaData.splice(t,e-t);else if(t>e)for(var i=e;t>i;++i)this.addElementAndReset(i)},update:function(t){var e,a=this.getDataset().metaData,s=this.getScaleForId(this.getDataset().yAxisID);this.getScaleForId(this.getDataset().xAxisID);e=s.min<0&&s.max<0?s.getPixelForValue(s.max):s.min>0&&s.max>0?s.getPixelForValue(s.min):s.getPixelForValue(0),i.each(a,function(e,i){this.updateElement(e,i,t)},this)},updateElement:function(t,e,a){var s,o=this.getScaleForId(this.getDataset().yAxisID),n=this.getScaleForId(this.getDataset().xAxisID);s=o.min<0&&o.max<0?o.getPixelForValue(o.max):o.min>0&&o.max>0?o.getPixelForValue(o.min):o.getPixelForValue(0),i.extend(t,{_chart:this.chart.chart,_xScale:n,_yScale:o,_datasetIndex:this.index,_index:e,_model:{x:a?n.getPixelForDecimal(.5):n.getPixelForValue(this.getDataset().data[e],e,this.index,this.chart.isCombo),y:a?s:o.getPixelForValue(this.getDataset().data[e],e,this.index),radius:a?0:t.custom&&t.custom.radius?t.custom.radius:this.getRadius(this.getDataset().data[e]),backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.point.backgroundColor),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.point.borderColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.point.borderWidth),hitRadius:t.custom&&t.custom.hitRadius?t.custom.hitRadius:i.getValueAtIndexOrDefault(this.getDataset().hitRadius,e,this.chart.options.elements.point.hitRadius)}}),t._model.skip=t.custom&&t.custom.skip?t.custom.skip:isNaN(t._model.x)||isNaN(t._model.y),t.pivot()},getRadius:function(t){return t.r||this.chart.options.elements.point.radius},draw:function(t){var e=t||1;i.each(this.getDataset().metaData,function(t,i){t.transition(e),t.draw()},this)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.radius=t.custom&&t.custom.hoverRadius?t.custom.hoverRadius:i.getValueAtIndexOrDefault(e.hoverRadius,a,this.chart.options.elements.point.hoverRadius)+this.getRadius(this.getDataset().data[t._index]),t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(e.hoverBackgroundColor,a,i.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:i.getValueAtIndexOrDefault(e.hoverBorderColor,a,i.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:i.getValueAtIndexOrDefault(e.hoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var e=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.radius=t.custom&&t.custom.radius?t.custom.radius:this.getRadius(this.getDataset().data[t._index]),t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.point.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.point.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.point.borderWidth)}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.doughnut={animation:{animateRotate:!0,animateScale:!1},hover:{mode:"single"},cutoutPercentage:50,tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+e.datasets[t.datasetIndex].data[t.index]}}}},e.defaults.pie=i.clone(e.defaults.doughnut),i.extend(e.defaults.pie,{cutoutPercentage:0}),e.controllers.doughnut=e.controllers.pie=function(t,e){this.initialize.call(this,t,e)},i.extend(e.controllers.doughnut.prototype,{initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){},getDataset:function(){return this.chart.data.datasets[this.index]},addElements:function(){this.getDataset().metaData=this.getDataset().metaData||[],i.each(this.getDataset().data,function(t,i){this.getDataset().metaData[i]=this.getDataset().metaData[i]||new e.elements.Arc({_chart:this.chart.chart,_datasetIndex:this.index,_index:i})},this)},addElementAndReset:function(t,a){this.getDataset().metaData=this.getDataset().metaData||[];var s=new e.elements.Arc({_chart:this.chart.chart,_datasetIndex:this.index,_index:t});a&&i.isArray(this.getDataset().backgroundColor)&&this.getDataset().backgroundColor.splice(t,0,a),this.updateElement(s,t,!0),this.getDataset().metaData.splice(t,0,s)},removeElement:function(t){this.getDataset().metaData.splice(t,1)},reset:function(){this.update(!0)},buildOrUpdateElements:function(){var t=this.getDataset().data.length,e=this.getDataset().metaData.length;if(e>t)this.getDataset().metaData.splice(t,e-t);else if(t>e)for(var i=e;t>i;++i)this.addElementAndReset(i)},getVisibleDatasetCount:function(){return i.where(this.chart.data.datasets,function(t){return i.isDatasetVisible(t)}).length},getRingIndex:function(t){for(var e=0,a=0;t>a;++a)i.isDatasetVisible(this.chart.data.datasets[a])&&++e;return e},update:function(t){this.chart.outerRadius=Math.max(i.min([this.chart.chart.width,this.chart.chart.height])/2-this.chart.options.elements.arc.borderWidth/2,0),this.chart.innerRadius=Math.max(this.chart.options.cutoutPercentage?this.chart.outerRadius/100*this.chart.options.cutoutPercentage:1,0),this.chart.radiusLength=(this.chart.outerRadius-this.chart.innerRadius)/this.getVisibleDatasetCount(),this.getDataset().total=0,i.each(this.getDataset().data,function(t){this.getDataset().total+=Math.abs(t)},this),this.outerRadius=this.chart.outerRadius-this.chart.radiusLength*this.getRingIndex(this.index),this.innerRadius=this.outerRadius-this.chart.radiusLength,i.each(this.getDataset().metaData,function(e,i){this.updateElement(e,i,t)},this)},updateElement:function(t,e,a){var s={x:this.chart.chart.width/2,y:this.chart.chart.height/2,startAngle:Math.PI*-.5,circumference:this.chart.options.animation.animateRotate?0:this.calculateCircumference(this.getDataset().data[e]),outerRadius:this.chart.options.animation.animateScale?0:this.outerRadius,innerRadius:this.chart.options.animation.animateScale?0:this.innerRadius};i.extend(t,{_chart:this.chart.chart,_datasetIndex:this.index,_index:e,_model:a?s:{x:this.chart.chart.width/2,y:this.chart.chart.height/2,circumference:this.calculateCircumference(this.getDataset().data[e]),outerRadius:this.outerRadius,innerRadius:this.innerRadius,backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.arc.backgroundColor),hoverBackgroundColor:t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(this.getDataset().hoverBackgroundColor,e,this.chart.options.elements.arc.hoverBackgroundColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.arc.borderWidth),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.arc.borderColor),label:i.getValueAtIndexOrDefault(this.getDataset().label,e,this.chart.data.labels[e])}}),a||(0===e?t._model.startAngle=Math.PI*-.5:t._model.startAngle=this.getDataset().metaData[e-1]._model.endAngle,t._model.endAngle=t._model.startAngle+t._model.circumference,e<this.getDataset().data.length-1&&(this.getDataset().metaData[e+1]._model.startAngle=t._model.endAngle)),t.pivot()},draw:function(t){var e=t||1;i.each(this.getDataset().metaData,function(t,i){t.transition(e).draw()},this)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(e.hoverBackgroundColor,a,i.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:i.getValueAtIndexOrDefault(e.hoverBorderColor,a,i.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:i.getValueAtIndexOrDefault(e.hoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var e=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.arc.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.arc.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.arc.borderWidth);
},calculateCircumference:function(t){return this.getDataset().total>0?1.999999*Math.PI*(t/this.getDataset().total):0}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.line={hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}},e.controllers.line=function(t,e){this.initialize.call(this,t,e)},i.extend(e.controllers.line.prototype,{initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){this.getDataset().xAxisID||(this.getDataset().xAxisID=this.chart.options.scales.xAxes[0].id),this.getDataset().yAxisID||(this.getDataset().yAxisID=this.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getScaleForId:function(t){return this.chart.scales[t]},addElements:function(){this.getDataset().metaData=this.getDataset().metaData||[],this.getDataset().metaDataset=this.getDataset().metaDataset||new e.elements.Line({_chart:this.chart.chart,_datasetIndex:this.index,_points:this.getDataset().metaData}),i.each(this.getDataset().data,function(t,i){this.getDataset().metaData[i]=this.getDataset().metaData[i]||new e.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:i})},this)},addElementAndReset:function(t){this.getDataset().metaData=this.getDataset().metaData||[];var i=new e.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:t});this.updateElement(i,t,!0),this.getDataset().metaData.splice(t,0,i),this.updateBezierControlPoints()},removeElement:function(t){this.getDataset().metaData.splice(t,1)},reset:function(){this.update(!0)},buildOrUpdateElements:function(){var t=this.getDataset().data.length,e=this.getDataset().metaData.length;if(e>t)this.getDataset().metaData.splice(t,e-t);else if(t>e)for(var i=e;t>i;++i)this.addElementAndReset(i)},update:function(t){var e,a=this.getDataset().metaDataset,s=this.getDataset().metaData,o=this.getScaleForId(this.getDataset().yAxisID);this.getScaleForId(this.getDataset().xAxisID);e=o.min<0&&o.max<0?o.getPixelForValue(o.max):o.min>0&&o.max>0?o.getPixelForValue(o.min):o.getPixelForValue(0),i.extend(a,{_scale:o,_datasetIndex:this.index,_children:s,_model:{tension:a.custom&&a.custom.tension?a.custom.tension:this.getDataset().tension||this.chart.options.elements.line.tension,backgroundColor:a.custom&&a.custom.backgroundColor?a.custom.backgroundColor:this.getDataset().backgroundColor||this.chart.options.elements.line.backgroundColor,borderWidth:a.custom&&a.custom.borderWidth?a.custom.borderWidth:this.getDataset().borderWidth||this.chart.options.elements.line.borderWidth,borderColor:a.custom&&a.custom.borderColor?a.custom.borderColor:this.getDataset().borderColor||this.chart.options.elements.line.borderColor,borderCapStyle:a.custom&&a.custom.borderCapStyle?a.custom.borderCapStyle:this.getDataset().borderCapStyle||this.chart.options.elements.line.borderCapStyle,borderDash:a.custom&&a.custom.borderDash?a.custom.borderDash:this.getDataset().borderDash||this.chart.options.elements.line.borderDash,borderDashOffset:a.custom&&a.custom.borderDashOffset?a.custom.borderDashOffset:this.getDataset().borderDashOffset||this.chart.options.elements.line.borderDashOffset,borderJoinStyle:a.custom&&a.custom.borderJoinStyle?a.custom.borderJoinStyle:this.getDataset().borderJoinStyle||this.chart.options.elements.line.borderJoinStyle,fill:a.custom&&a.custom.fill?a.custom.fill:void 0!==this.getDataset().fill?this.getDataset().fill:this.chart.options.elements.line.fill,scaleTop:o.top,scaleBottom:o.bottom,scaleZero:e}}),a.pivot(),i.each(s,function(e,i){this.updateElement(e,i,t)},this),this.updateBezierControlPoints()},updateElement:function(t,e,a){var s,o=this.getScaleForId(this.getDataset().yAxisID),n=this.getScaleForId(this.getDataset().xAxisID);s=o.min<0&&o.max<0?o.getPixelForValue(o.max):o.min>0&&o.max>0?o.getPixelForValue(o.min):o.getPixelForValue(0),i.extend(t,{_chart:this.chart.chart,_xScale:n,_yScale:o,_datasetIndex:this.index,_index:e,_model:{x:n.getPixelForValue(this.getDataset().data[e],e,this.index,this.chart.isCombo),y:a?s:this.calculatePointY(this.getDataset().data[e],e,this.index,this.chart.isCombo),tension:t.custom&&t.custom.tension?t.custom.tension:this.getDataset().tension||this.chart.options.elements.line.tension,radius:t.custom&&t.custom.radius?t.custom.radius:i.getValueAtIndexOrDefault(this.getDataset().radius,e,this.chart.options.elements.point.radius),backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor,e,this.chart.options.elements.point.backgroundColor),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().pointBorderColor,e,this.chart.options.elements.point.borderColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth,e,this.chart.options.elements.point.borderWidth),hitRadius:t.custom&&t.custom.hitRadius?t.custom.hitRadius:i.getValueAtIndexOrDefault(this.getDataset().hitRadius,e,this.chart.options.elements.point.hitRadius)}}),t._model.skip=t.custom&&t.custom.skip?t.custom.skip:isNaN(t._model.x)||isNaN(t._model.y)},calculatePointY:function(t,e,a,s){var o=(this.getScaleForId(this.getDataset().xAxisID),this.getScaleForId(this.getDataset().yAxisID));if(o.options.stacked){for(var n=0,r=0,h=this.chart.data.datasets.length-1;h>a;h--){var l=this.chart.data.datasets[h];i.isDatasetVisible(l)&&(l.data[e]<0?r+=l.data[e]||0:n+=l.data[e]||0)}return 0>t?o.getPixelForValue(r+t):o.getPixelForValue(n+t)}return o.getPixelForValue(t)},updateBezierControlPoints:function(){i.each(this.getDataset().metaData,function(t,e){var a=i.splineCurve(i.previousItem(this.getDataset().metaData,e)._model,t._model,i.nextItem(this.getDataset().metaData,e)._model,t._model.tension);t._model.controlPointPreviousX=a.previous.x,t._model.controlPointNextX=a.next.x,a.next.y>this.chart.chartArea.bottom?t._model.controlPointNextY=this.chart.chartArea.bottom:a.next.y<this.chart.chartArea.top?t._model.controlPointNextY=this.chart.chartArea.top:t._model.controlPointNextY=a.next.y,a.previous.y>this.chart.chartArea.bottom?t._model.controlPointPreviousY=this.chart.chartArea.bottom:a.previous.y<this.chart.chartArea.top?t._model.controlPointPreviousY=this.chart.chartArea.top:t._model.controlPointPreviousY=a.previous.y,t.pivot()},this)},draw:function(t){var e=t||1;i.each(this.getDataset().metaData,function(t,i){t.transition(e)},this),this.getDataset().metaDataset.transition(e).draw(),i.each(this.getDataset().metaData,function(t){t.draw()})},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.radius=t.custom&&t.custom.hoverRadius?t.custom.hoverRadius:i.getValueAtIndexOrDefault(e.pointHoverRadius,a,this.chart.options.elements.point.hoverRadius),t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(e.pointHoverBackgroundColor,a,i.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:i.getValueAtIndexOrDefault(e.pointHoverBorderColor,a,i.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:i.getValueAtIndexOrDefault(e.pointHoverBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var e=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.radius=t.custom&&t.custom.radius?t.custom.radius:i.getValueAtIndexOrDefault(this.getDataset().radius,e,this.chart.options.elements.point.radius),t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor,e,this.chart.options.elements.point.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().pointBorderColor,e,this.chart.options.elements.point.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth,e,this.chart.options.elements.point.borderWidth)}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.polarArea={scale:{type:"radialLinear",lineArc:!0},animateRotate:!0,animateScale:!0,tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}},e.controllers.polarArea=function(t,e){this.initialize.call(this,t,e)},i.extend(e.controllers.polarArea.prototype,{initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){},getDataset:function(){return this.chart.data.datasets[this.index]},getScaleForId:function(t){return this.chart.scales[t]},addElements:function(){this.getDataset().metaData=this.getDataset().metaData||[],i.each(this.getDataset().data,function(t,i){this.getDataset().metaData[i]=this.getDataset().metaData[i]||new e.elements.Arc({_chart:this.chart.chart,_datasetIndex:this.index,_index:i})},this)},addElementAndReset:function(t){this.getDataset().metaData=this.getDataset().metaData||[];var i=new e.elements.Arc({_chart:this.chart.chart,_datasetIndex:this.index,_index:t});this.updateElement(i,t,!0),this.getDataset().metaData.splice(t,0,i)},removeElement:function(t){this.getDataset().metaData.splice(t,1)},reset:function(){this.update(!0)},buildOrUpdateElements:function(){var t=this.getDataset().data.length,e=this.getDataset().metaData.length;if(e>t)this.getDataset().metaData.splice(t,e-t);else if(t>e)for(var i=e;t>i;++i)this.addElementAndReset(i)},getVisibleDatasetCount:function(){return i.where(this.chart.data.datasets,function(t){return i.isDatasetVisible(t)}).length},update:function(t){this.chart.outerRadius=Math.max((i.min([this.chart.chart.width,this.chart.chart.height])-this.chart.options.elements.arc.borderWidth/2)/2,0),this.chart.innerRadius=Math.max(this.chart.options.cutoutPercentage?this.chart.outerRadius/100*this.chart.options.cutoutPercentage:1,0),this.chart.radiusLength=(this.chart.outerRadius-this.chart.innerRadius)/this.getVisibleDatasetCount(),this.getDataset().total=0,i.each(this.getDataset().data,function(t){this.getDataset().total+=Math.abs(t)},this),this.outerRadius=this.chart.outerRadius-this.chart.radiusLength*this.index,this.innerRadius=this.outerRadius-this.chart.radiusLength,i.each(this.getDataset().metaData,function(e,i){this.updateElement(e,i,t)},this)},updateElement:function(t,e,a){var s=1/this.getDataset().data.length*2,o=-.5*Math.PI+Math.PI*s*e,n=o+s*Math.PI,r={x:this.chart.chart.width/2,y:this.chart.chart.height/2,innerRadius:0,outerRadius:this.chart.options.animateScale?0:this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[e]),startAngle:this.chart.options.animateRotate?Math.PI*-.5:o,endAngle:this.chart.options.animateRotate?Math.PI*-.5:n,backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.arc.backgroundColor),hoverBackgroundColor:t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(this.getDataset().hoverBackgroundColor,e,this.chart.options.elements.arc.hoverBackgroundColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.arc.borderWidth),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.arc.borderColor),label:i.getValueAtIndexOrDefault(this.chart.data.labels,e,this.chart.data.labels[e])};i.extend(t,{_chart:this.chart.chart,_datasetIndex:this.index,_index:e,_scale:this.chart.scale,_model:a?r:{x:this.chart.chart.width/2,y:this.chart.chart.height/2,innerRadius:0,outerRadius:this.chart.scale.getDistanceFromCenterForValue(this.getDataset().data[e]),startAngle:o,endAngle:n,backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.arc.backgroundColor),hoverBackgroundColor:t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(this.getDataset().hoverBackgroundColor,e,this.chart.options.elements.arc.hoverBackgroundColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.arc.borderWidth),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.arc.borderColor),label:i.getValueAtIndexOrDefault(this.chart.data.labels,e,this.chart.data.labels[e])}}),t.pivot()},draw:function(t){var e=t||1;i.each(this.getDataset().metaData,function(t,i){t.transition(e).draw()},this)},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(e.hoverBackgroundColor,a,i.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:i.getValueAtIndexOrDefault(e.hoverBorderColor,a,i.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:i.getValueAtIndexOrDefault(e.borderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var e=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().backgroundColor,e,this.chart.options.elements.arc.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().borderColor,e,this.chart.options.elements.arc.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().borderWidth,e,this.chart.options.elements.arc.borderWidth)},calculateCircumference:function(t){return this.getDataset().total>0?2*Math.PI*(t/this.getDataset().total):0},updateScaleRange:function(){i.extend(this.chart.scale,{size:i.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.radar={scale:{type:"radialLinear"},elements:{line:{tension:0}}},e.controllers.radar=function(t,e){this.initialize.call(this,t,e)},i.extend(e.controllers.radar.prototype,{initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){},getDataset:function(){return this.chart.data.datasets[this.index]},getScaleForId:function(t){return this.chart.scales[t]},addElements:function(){this.getDataset().metaData=this.getDataset().metaData||[],this.getDataset().metaDataset=this.getDataset().metaDataset||new e.elements.Line({_chart:this.chart.chart,_datasetIndex:this.index,_points:this.getDataset().metaData,_loop:!0}),i.each(this.getDataset().data,function(t,i){this.getDataset().metaData[i]=this.getDataset().metaData[i]||new e.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:i,_model:{x:0,y:0}})},this)},addElementAndReset:function(t){this.getDataset().metaData=this.getDataset().metaData||[];var i=new e.elements.Point({_chart:this.chart.chart,_datasetIndex:this.index,_index:t});this.updateElement(i,t,!0),this.getDataset().metaData.splice(t,0,i),this.updateBezierControlPoints()},removeElement:function(t){this.getDataset().metaData.splice(t,1)},reset:function(){this.update(!0)},buildOrUpdateElements:function(){var t=this.getDataset().data.length,e=this.getDataset().metaData.length;if(e>t)this.getDataset().metaData.splice(t,e-t);else if(t>e)for(var i=e;t>i;++i)this.addElementAndReset(i)},update:function(t){var e,a=(this.getDataset().metaDataset,this.getDataset().metaData),s=this.chart.scale;e=s.min<0&&s.max<0?s.getPointPositionForValue(0,s.max):s.min>0&&s.max>0?s.getPointPositionForValue(0,s.min):s.getPointPositionForValue(0,0),i.extend(this.getDataset().metaDataset,{_datasetIndex:this.index,_children:this.getDataset().metaData,_model:{tension:this.getDataset().tension||this.chart.options.elements.line.tension,backgroundColor:this.getDataset().backgroundColor||this.chart.options.elements.line.backgroundColor,borderWidth:this.getDataset().borderWidth||this.chart.options.elements.line.borderWidth,borderColor:this.getDataset().borderColor||this.chart.options.elements.line.borderColor,fill:void 0!==this.getDataset().fill?this.getDataset().fill:this.chart.options.elements.line.fill,scaleTop:s.top,scaleBottom:s.bottom,scaleZero:e}}),this.getDataset().metaDataset.pivot(),i.each(a,function(e,i){this.updateElement(e,i,t)},this),this.updateBezierControlPoints()},updateElement:function(t,e,a){var s=this.chart.scale.getPointPositionForValue(e,this.getDataset().data[e]);i.extend(t,{_datasetIndex:this.index,_index:e,_scale:this.chart.scale,_model:{x:a?this.chart.scale.xCenter:s.x,y:a?this.chart.scale.yCenter:s.y,tension:t.custom&&t.custom.tension?t.custom.tension:this.chart.options.elements.line.tension,radius:t.custom&&t.custom.radius?t.custom.pointRadius:i.getValueAtIndexOrDefault(this.getDataset().pointRadius,e,this.chart.options.elements.point.radius),backgroundColor:t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor,e,this.chart.options.elements.point.backgroundColor),borderColor:t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().pointBorderColor,e,this.chart.options.elements.point.borderColor),borderWidth:t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth,e,this.chart.options.elements.point.borderWidth),hitRadius:t.custom&&t.custom.hitRadius?t.custom.hitRadius:i.getValueAtIndexOrDefault(this.getDataset().hitRadius,e,this.chart.options.elements.point.hitRadius)}}),t._model.skip=t.custom&&t.custom.skip?t.custom.skip:isNaN(t._model.x)||isNaN(t._model.y)},updateBezierControlPoints:function(){i.each(this.getDataset().metaData,function(t,e){var a=i.splineCurve(i.previousItem(this.getDataset().metaData,e,!0)._model,t._model,i.nextItem(this.getDataset().metaData,e,!0)._model,t._model.tension);t._model.controlPointPreviousX=a.previous.x,t._model.controlPointNextX=a.next.x,a.next.y>this.chart.chartArea.bottom?t._model.controlPointNextY=this.chart.chartArea.bottom:a.next.y<this.chart.chartArea.top?t._model.controlPointNextY=this.chart.chartArea.top:t._model.controlPointNextY=a.next.y,a.previous.y>this.chart.chartArea.bottom?t._model.controlPointPreviousY=this.chart.chartArea.bottom:a.previous.y<this.chart.chartArea.top?t._model.controlPointPreviousY=this.chart.chartArea.top:t._model.controlPointPreviousY=a.previous.y,t.pivot()},this)},draw:function(t){var e=t||1;i.each(this.getDataset().metaData,function(t,i){t.transition(e)},this),this.getDataset().metaDataset.transition(e).draw(),i.each(this.getDataset().metaData,function(t){t.draw()})},setHoverStyle:function(t){var e=this.chart.data.datasets[t._datasetIndex],a=t._index;t._model.radius=t.custom&&t.custom.radius?t.custom.radius:i.getValueAtIndexOrDefault(e.pointHoverRadius,a,this.chart.options.elements.point.hoverRadius),t._model.backgroundColor=t.custom&&t.custom.hoverBackgroundColor?t.custom.hoverBackgroundColor:i.getValueAtIndexOrDefault(e.pointHoverBackgroundColor,a,i.color(t._model.backgroundColor).saturate(.5).darken(.1).rgbString()),t._model.borderColor=t.custom&&t.custom.hoverBorderColor?t.custom.hoverBorderColor:i.getValueAtIndexOrDefault(e.pointHoverBorderColor,a,i.color(t._model.borderColor).saturate(.5).darken(.1).rgbString()),t._model.borderWidth=t.custom&&t.custom.hoverBorderWidth?t.custom.hoverBorderWidth:i.getValueAtIndexOrDefault(e.pointBorderWidth,a,t._model.borderWidth)},removeHoverStyle:function(t){var e=(this.chart.data.datasets[t._datasetIndex],t._index);t._model.radius=t.custom&&t.custom.radius?t.custom.radius:i.getValueAtIndexOrDefault(this.getDataset().radius,e,this.chart.options.elements.point.radius),t._model.backgroundColor=t.custom&&t.custom.backgroundColor?t.custom.backgroundColor:i.getValueAtIndexOrDefault(this.getDataset().pointBackgroundColor,e,this.chart.options.elements.point.backgroundColor),t._model.borderColor=t.custom&&t.custom.borderColor?t.custom.borderColor:i.getValueAtIndexOrDefault(this.getDataset().pointBorderColor,e,this.chart.options.elements.point.borderColor),t._model.borderWidth=t.custom&&t.custom.borderWidth?t.custom.borderWidth:i.getValueAtIndexOrDefault(this.getDataset().pointBorderWidth,e,this.chart.options.elements.point.borderWidth)}})}.call(this),function(){"use strict";var t=this,e=t.Chart,i=(e.helpers,{position:"bottom"}),a=e.Scale.extend({buildTicks:function(t){this.ticks=this.data.labels},getLabelForIndex:function(t,e){return this.ticks[t]},getPixelForValue:function(t,e,i,a){if(this.isHorizontal()){var s=this.width-(this.paddingLeft+this.paddingRight),o=s/Math.max(this.data.labels.length-(this.options.gridLines.offsetGridLines?0:1),1),n=o*e+this.paddingLeft;return this.options.gridLines.offsetGridLines&&a&&(n+=o/2),this.left+Math.round(n)}var r=this.height-(this.paddingTop+this.paddingBottom),h=r/Math.max(this.data.labels.length-(this.options.gridLines.offsetGridLines?0:1),1),l=h*e+this.paddingTop;return this.options.gridLines.offsetGridLines&&a&&(l+=h/2),this.top+Math.round(l)}});e.scaleService.registerScaleType("category",a,i)}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers,a={position:"left",ticks:{callback:function(t,e,a){var s=a[1]-a[0];Math.abs(s)>1&&t!==Math.floor(t)&&(s=t-Math.floor(t));var o=i.log10(Math.abs(s)),n="";if(0!==t){var r=-1*Math.floor(o);r=Math.max(Math.min(r,20),0),n=t.toFixed(r)}else n="0";return n}}},s=e.Scale.extend({buildTicks:function(){if(this.min=null,this.max=null,this.options.stacked){var t={};i.each(this.data.datasets,function(e){void 0===t[e.type]&&(t[e.type]={positiveValues:[],negativeValues:[]});var a=t[e.type].positiveValues,s=t[e.type].negativeValues;i.isDatasetVisible(e)&&(this.isHorizontal()?e.xAxisID===this.id:e.yAxisID===this.id)&&i.each(e.data,function(t,e){var i=this.getRightValue(t);isNaN(i)||(a[e]=a[e]||0,s[e]=s[e]||0,this.options.relativePoints?a[e]=100:0>i?s[e]+=i:a[e]+=i)},this)},this),i.each(t,function(t){var e=t.positiveValues.concat(t.negativeValues),a=i.min(e),s=i.max(e);this.min=null===this.min?a:Math.min(this.min,a),this.max=null===this.max?s:Math.max(this.max,s)},this)}else i.each(this.data.datasets,function(t){i.isDatasetVisible(t)&&(this.isHorizontal()?t.xAxisID===this.id:t.yAxisID===this.id)&&i.each(t.data,function(t,e){var i=this.getRightValue(t);isNaN(i)||(null===this.min?this.min=i:i<this.min&&(this.min=i),null===this.max?this.max=i:i>this.max&&(this.max=i))},this)},this);this.ticks=[];var e;if(e=this.isHorizontal()?Math.min(this.options.ticks.maxTicksLimit?this.options.ticks.maxTicksLimit:11,Math.ceil(this.width/50)):Math.min(this.options.ticks.maxTicksLimit?this.options.ticks.maxTicksLimit:11,Math.ceil(this.height/(2*this.options.ticks.fontSize))),e=Math.max(2,e),this.options.ticks.beginAtZero){var a=i.sign(this.min),s=i.sign(this.max);0>a&&0>s?this.max=0:a>0&&s>0&&(this.min=0)}this.options.ticks.suggestedMin&&(this.min=Math.min(this.min,this.options.ticks.suggestedMin)),this.options.ticks.suggestedMax&&(this.max=Math.max(this.max,this.options.ticks.suggestedMax)),this.min===this.max&&(this.min--,this.max++);for(var o=i.niceNum(this.max-this.min,!1),n=i.niceNum(o/(e-1),!0),r=Math.floor(this.min/n)*n,h=Math.ceil(this.max/n)*n,l=Math.ceil((h-r)/n),c=0;l>=c;++c)this.ticks.push(r+c*n);("left"==this.options.position||"right"==this.options.position)&&this.ticks.reverse(),this.max=i.max(this.ticks),this.min=i.min(this.ticks),this.options.ticks.reverse?(this.ticks.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),this.zeroLineIndex=this.ticks.indexOf(0)},getLabelForIndex:function(t,e){return this.getRightValue(this.data.datasets[e].data[t])},getPixelForValue:function(t,e,i,a){var s,o=this.getRightValue(t),n=this.end-this.start;if(this.isHorizontal()){var r=this.width-(this.paddingLeft+this.paddingRight);return s=this.left+r/n*(o-this.start),Math.round(s+this.paddingLeft)}var h=this.height-(this.paddingTop+this.paddingBottom);return s=this.bottom-this.paddingBottom-h/n*(o-this.start),Math.round(s)}});e.scaleService.registerScaleType("linear",s,a)}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers,a={position:"left",ticks:{callback:function(t){var i=t/Math.pow(10,Math.floor(e.helpers.log10(t)));return 1===i||2===i||5===i?t.toExponential():""}}},s=e.Scale.extend({buildTicks:function(){if(this.min=null,this.max=null,this.options.stacked){var t={};i.each(this.data.datasets,function(e){i.isDatasetVisible(e)&&(this.isHorizontal()?e.xAxisID===this.id:e.yAxisID===this.id)&&(void 0===t[e.type]&&(t[e.type]=[]),i.each(e.data,function(i,a){var s=t[e.type],o=this.getRightValue(i);isNaN(o)||(s[a]=s[a]||0,this.options.relativePoints?s[a]=100:s[a]+=o)},this))},this),i.each(t,function(t){var e=i.min(t),a=i.max(t);this.min=null===this.min?e:Math.min(this.min,e),this.max=null===this.max?a:Math.max(this.max,a)},this)}else i.each(this.data.datasets,function(t){i.isDatasetVisible(t)&&(this.isHorizontal()?t.xAxisID===this.id:t.yAxisID===this.id)&&i.each(t.data,function(t,e){var i=this.getRightValue(t);isNaN(i)||(null===this.min?this.min=i:i<this.min&&(this.min=i),null===this.max?this.max=i:i>this.max&&(this.max=i))},this)},this);this.min===this.max&&(0!==this.min&&null!==this.min?(this.min=Math.pow(10,Math.floor(i.log10(this.min))-1),this.max=Math.pow(10,Math.floor(i.log10(this.max))+1)):(this.min=1,this.max=10)),this.tickValues=[];for(var e=Math.floor(i.log10(this.min)),a=Math.ceil(i.log10(this.max)),s=e;a>s;++s)for(var o=1;10>o;++o)this.tickValues.push(o*Math.pow(10,s));this.tickValues.push(1*Math.pow(10,a)),("left"==this.options.position||"right"==this.options.position)&&this.tickValues.reverse(),this.max=i.max(this.tickValues),this.min=i.min(this.tickValues),this.options.ticks.reverse?(this.tickValues.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),this.ticks=this.tickValues.slice()},getLabelForIndex:function(t,e){return this.getRightValue(this.data.datasets[e].data[t])},getPixelForTick:function(t,e){return this.getPixelForValue(this.tickValues[t],null,null,e)},getPixelForValue:function(t,e,a,s){var o,n=this.getRightValue(t),r=i.log10(this.end)-i.log10(this.start);if(this.isHorizontal()){if(0!==n){var h=this.width-(this.paddingLeft+this.paddingRight);return o=this.left+h/r*(i.log10(n)-i.log10(this.start)),o+this.paddingLeft}o=this.left+this.paddingLeft}else{if(0!==n){var l=this.height-(this.paddingTop+this.paddingBottom);return this.bottom-this.paddingBottom-l/r*(i.log10(n)-i.log10(this.start))}o=this.top+this.paddingTop}}});e.scaleService.registerScaleType("logarithmic",s,a)}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers,a={display:!0,animate:!0,lineArc:!1,position:"chartArea",angleLines:{show:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2},pointLabels:{fontFamily:"'Arial'",fontStyle:"normal",fontSize:10,fontColor:"#666"}},s=e.Scale.extend({getValueCount:function(){return this.data.labels.length},setDimensions:function(){this.width=this.maxWidth,this.height=this.maxHeight,this.xCenter=Math.round(this.width/2),this.yCenter=Math.round(this.height/2);var t=i.min([this.height,this.width]);this.drawingArea=this.options.display?t/2-(this.options.ticks.fontSize/2+this.options.ticks.backdropPaddingY):t/2},buildTicks:function(){this.min=null,this.max=null,i.each(this.data.datasets,function(t){i.isDatasetVisible(t)&&i.each(t.data,function(t,e){var i=this.getRightValue(t);isNaN(i)||(null===this.min?this.min=i:i<this.min&&(this.min=i),null===this.max?this.max=i:i>this.max&&(this.max=i))},this)},this),this.min===this.max&&(this.min--,this.max++),this.ticks=[];var t=Math.min(this.options.ticks.maxTicksLimit?this.options.ticks.maxTicksLimit:11,Math.ceil(this.drawingArea/(1.5*this.options.ticks.fontSize)));if(t=Math.max(2,t),this.options.ticks.beginAtZero){var e=i.sign(this.min),a=i.sign(this.max);0>e&&0>a?this.max=0:e>0&&a>0&&(this.min=0)}for(var s=i.niceNum(this.max-this.min,!1),o=i.niceNum(s/(t-1),!0),n=Math.floor(this.min/o)*o,r=Math.ceil(this.max/o)*o,h=n;r>=h;h+=o)this.ticks.push(h);this.max=i.max(this.ticks),this.min=i.min(this.ticks),this.options.ticks.reverse?(this.ticks.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),this.zeroLineIndex=this.ticks.indexOf(0)},getLabelForIndex:function(t,e){return this.getRightValue(this.data.datasets[e].data[t])},getCircumference:function(){return 2*Math.PI/this.getValueCount()},fit:function(){var t,e,a,s,o,n,r,h,l,c,d,u,g=i.min([this.height/2-this.options.pointLabels.fontSize-5,this.width/2]),m=this.width,p=0;for(this.ctx.font=i.fontString(this.options.pointLabels.fontSize,this.options.pointLabels.fontStyle,this.options.pointLabels.fontFamily),e=0;e<this.getValueCount();e++)t=this.getPointPosition(e,g),a=this.ctx.measureText(this.options.ticks.callback(this.data.labels[e])).width+5,0===e||e===this.getValueCount()/2?(s=a/2,t.x+s>m&&(m=t.x+s,o=e),t.x-s<p&&(p=t.x-s,r=e)):e<this.getValueCount()/2?t.x+a>m&&(m=t.x+a,o=e):e>this.getValueCount()/2&&t.x-a<p&&(p=t.x-a,r=e);l=p,c=Math.ceil(m-this.width),n=this.getIndexAngle(o),h=this.getIndexAngle(r),d=c/Math.sin(n+Math.PI/2),u=l/Math.sin(h+Math.PI/2),d=i.isNumber(d)?d:0,u=i.isNumber(u)?u:0,this.drawingArea=Math.round(g-(u+d)/2),this.setCenterPoint(u,d)},setCenterPoint:function(t,e){var i=this.width-e-this.drawingArea,a=t+this.drawingArea;this.xCenter=Math.round((a+i)/2+this.left),this.yCenter=Math.round(this.height/2+this.top)},getIndexAngle:function(t){var e=2*Math.PI/this.getValueCount();return t*e-Math.PI/2},getDistanceFromCenterForValue:function(t){if(null===t)return 0;var e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e},getPointPosition:function(t,e){var i=this.getIndexAngle(t);return{x:Math.round(Math.cos(i)*e)+this.xCenter,y:Math.round(Math.sin(i)*e)+this.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},draw:function(){if(this.options.display){var t=this.ctx;if(i.each(this.ticks,function(e,a){if(a>0||this.options.reverse){var s=this.getDistanceFromCenterForValue(this.ticks[a]),o=this.yCenter-s;if(this.options.gridLines.show)if(t.strokeStyle=this.options.gridLines.color,t.lineWidth=this.options.gridLines.lineWidth,this.options.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,s,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var n=0;n<this.getValueCount();n++){var r=this.getPointPosition(n,this.getDistanceFromCenterForValue(this.ticks[a]));0===n?t.moveTo(r.x,r.y):t.lineTo(r.x,r.y)}t.closePath(),t.stroke()}if(this.options.ticks.show){if(t.font=i.fontString(this.options.ticks.fontSize,this.options.ticks.fontStyle,this.options.ticks.fontFamily),this.options.ticks.showLabelBackdrop){var h=t.measureText(e).width;t.fillStyle=this.options.ticks.backdropColor,t.fillRect(this.xCenter-h/2-this.options.ticks.backdropPaddingX,o-this.options.ticks.fontSize/2-this.options.ticks.backdropPaddingY,h+2*this.options.ticks.backdropPaddingX,this.options.ticks.fontSize+2*this.options.ticks.backdropPaddingY);
}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.options.ticks.fontColor,t.fillText(e,this.xCenter,o)}}},this),!this.options.lineArc){t.lineWidth=this.options.angleLines.lineWidth,t.strokeStyle=this.options.angleLines.color;for(var e=this.getValueCount()-1;e>=0;e--){if(this.options.angleLines.show){var a=this.getPointPosition(e,this.getDistanceFromCenterForValue(this.options.reverse?this.min:this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(a.x,a.y),t.stroke(),t.closePath()}var s=this.getPointPosition(e,this.getDistanceFromCenterForValue(this.options.reverse?this.min:this.max)+5);t.font=i.fontString(this.options.pointLabels.fontSize,this.options.pointLabels.fontStyle,this.options.pointLabels.fontFamily),t.fillStyle=this.options.pointLabels.fontColor;var o=this.data.labels.length,n=this.data.labels.length/2,r=n/2,h=r>e||e>o-r,l=e===r||e===o-r;0===e?t.textAlign="center":e===n?t.textAlign="center":n>e?t.textAlign="left":t.textAlign="right",l?t.textBaseline="middle":h?t.textBaseline="bottom":t.textBaseline="top",t.fillText(this.data.labels[e],s.x,s.y)}}}}});e.scaleService.registerScaleType("radialLinear",s,a)}.call(this),function(){"use strict";if(!window.moment)return void console.warn("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at http://momentjs.com/");var t=this,e=t.Chart,i=e.helpers,a={units:["millisecond","second","minute","hour","day","week","month","quarter","year"],unit:{millisecond:{display:"SSS [ms]",maxStep:1e3},second:{display:"h:mm:ss a",maxStep:60},minute:{display:"h:mm:ss a",maxStep:60},hour:{display:"MMM D, hA",maxStep:24},day:{display:"ll",maxStep:7},week:{display:"ll",maxStep:4.3333},month:{display:"MMM YYYY",maxStep:12},quarter:{display:"[Q]Q - YYYY",maxStep:4},year:{display:"YYYY",maxStep:!1}}},s={position:"bottom",time:{format:!1,unit:!1,round:!1,displayFormat:!1}},o=e.Scale.extend({getLabelMoment:function(t,e){return this.labelMoments[t][e]},buildLabelMoments:function(){var t=[];this.data.labels&&this.data.labels.length>0?(i.each(this.data.labels,function(e,i){var a=this.parseTime(e);this.options.time.round&&a.startOf(this.options.time.round),t.push(a)},this),this.options.time.min?this.firstTick=this.parseTime(this.options.time.min):this.firstTick=moment.min.call(this,t),this.options.time.max?this.lastTick=this.parseTime(this.options.time.max):this.lastTick=moment.max.call(this,t)):(this.firstTick=null,this.lastTick=null),i.each(this.data.datasets,function(e,a){var s=[];"object"==typeof e.data[0]?i.each(e.data,function(t,e){var i=this.parseTime(this.getRightValue(t));this.options.time.round&&i.startOf(this.options.time.round),s.push(i),this.firstTick=null!==this.firstTick?moment.min(this.firstTick,i):i,this.lastTick=null!==this.lastTick?moment.max(this.lastTick,i):i},this):s=t,this.labelMoments.push(s)},this),this.firstTick=this.firstTick.clone(),this.lastTick=this.lastTick.clone()},buildTicks:function(t){if(this.ticks=[],this.labelMoments=[],this.buildLabelMoments(),this.options.time.unit)this.tickUnit=this.options.time.unit||"day",this.displayFormat=a.unit[this.tickUnit].display,this.tickRange=Math.ceil(this.lastTick.diff(this.firstTick,this.tickUnit,!0));else{var e=this.width-(this.paddingLeft+this.paddingRight),s=e/this.options.ticks.fontSize+4,o=this.options.time.round?0:2;this.tickUnit="millisecond",this.tickRange=Math.ceil(this.lastTick.diff(this.firstTick,this.tickUnit,!0)+o),this.displayFormat=a.unit[this.tickUnit].display,i.each(a.units,function(t){this.tickRange<=s||(this.tickUnit=t,this.tickRange=Math.ceil(this.lastTick.diff(this.firstTick,this.tickUnit)+o),this.displayFormat=a.unit[t].display)},this)}this.firstTick.startOf(this.tickUnit),this.lastTick.endOf(this.tickUnit),this.smallestLabelSeparation=this.width,i.each(this.data.datasets,function(t,e){for(var i=1;i<this.labelMoments[e].length;i++)this.smallestLabelSeparation=Math.min(this.smallestLabelSeparation,this.labelMoments[e][i].diff(this.labelMoments[e][i-1],this.tickUnit,!0))},this),this.options.time.displayFormat&&(this.displayFormat=this.options.time.displayFormat);for(var n=0;n<=this.tickRange;++n)this.ticks.push(this.firstTick.clone().add(n,this.tickUnit))},getLabelForIndex:function(t,e){var i=this.data.labels&&t<this.data.labels.length?this.data.labels[t]:"";return"object"==typeof this.data.datasets[e].data[0]&&(i=this.getRightValue(this.data.datasets[e].data[t])),i},convertTicksToLabels:function(){this.ticks=this.ticks.map(function(t,e,i){var s=t.format(this.options.time.displayFormat?this.options.time.displayFormat:a.unit[this.tickUnit].display);return this.options.ticks.userCallback?this.options.ticks.userCallback(s,e,i):s},this)},getPixelForValue:function(t,e,i,a){var s=this.getLabelMoment(i,e),o=s.diff(this.firstTick,this.tickUnit,!0),n=o/this.tickRange;if(this.isHorizontal()){var r=this.width-(this.paddingLeft+this.paddingRight),h=(r/Math.max(this.ticks.length-1,1),r*n+this.paddingLeft);return this.left+Math.round(h)}var l=this.height-(this.paddingTop+this.paddingBottom),c=(l/Math.max(this.ticks.length-1,1),l*n+this.paddingTop);return this.top+Math.round(c)},parseTime:function(t){return"function"==typeof t.getMonth||"number"==typeof t?moment(t):t.isValid&&t.isValid()?t:"string"!=typeof this.options.time.format&&this.options.time.format.call?this.options.time.format(t):moment(t,this.options.time.format)}});e.scaleService.registerScaleType("time",o,s)}.call(this),/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.0.0-beta
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.global.elements.arc={backgroundColor:e.defaults.global.defaultColor,borderColor:"#fff",borderWidth:2},e.elements.Arc=e.Element.extend({inLabelRange:function(t){var e=this._view;return e?Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2):!1},inRange:function(t,e){var a=this._view;if(a){var s=i.getAngleFromPoint(a,{x:t,y:e}),o=a.startAngle<-.5*Math.PI?a.startAngle+2*Math.PI:a.startAngle>1.5*Math.PI?a.startAngle-2*Math.PI:a.startAngle,n=a.endAngle<-.5*Math.PI?a.endAngle+2*Math.PI:a.endAngle>1.5*Math.PI?a.endAngle-2*Math.PI:a.endAngle,r=s.angle>=o&&s.angle<=n,h=s.distance>=a.innerRadius&&s.distance<=a.outerRadius;return r&&h}return!1},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,i=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*i,y:t.y+Math.sin(e)*i}},draw:function(){var t=this._chart.ctx,e=this._view;t.beginPath(),t.arc(e.x,e.y,e.outerRadius,e.startAngle,e.endAngle),t.arc(e.x,e.y,e.innerRadius,e.endAngle,e.startAngle,!0),t.closePath(),t.strokeStyle=e.borderColor,t.lineWidth=e.borderWidth,t.fillStyle=e.backgroundColor,t.fill(),t.lineJoin="bevel",e.borderWidth&&t.stroke()}})}.call(this),/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.0.0-beta
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
function(){"use strict";var t=this,e=t.Chart,i=e.helpers;e.defaults.global.elements.line={tension:.4,backgroundColor:e.defaults.global.defaultColor,borderWidth:3,borderColor:e.defaults.global.defaultColor,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",fill:!0},e.elements.Line=e.Element.extend({draw:function(){var t=this._view,a=this._chart.ctx,s=this._children[0],o=this._children[this._children.length-1];if(a.save(),i.each(this._children,function(e,s){var o=i.previousItem(this._children,s),n=i.nextItem(this._children,s);return s||a.moveTo(e._view.x,t.scaleZero),e._view.skip&&!this.loop?(a.lineTo(o._view.x,t.scaleZero),void a.moveTo(n._view.x,t.scaleZero)):o._view.skip?void a.lineTo(e._view.x,e._view.y):t.tension>0&&s?void a.bezierCurveTo(o._view.controlPointNextX,o._view.controlPointNextY,e._view.controlPointPreviousX,e._view.controlPointPreviousY,e._view.x,e._view.y):void a.lineTo(e._view.x,e._view.y)},this),this._loop){if(t.tension>0&&!s._view.skip)return void a.bezierCurveTo(o._view.controlPointNextX,o._view.controlPointNextY,s._view.controlPointPreviousX,s._view.controlPointPreviousY,s._view.x,s._view.y);a.lineTo(s._view.x,s._view.y)}if(this._children.length>0&&t.fill&&(a.lineTo(this._children[this._children.length-1]._view.x,t.scaleZero),a.lineTo(this._children[0]._view.x,t.scaleZero),a.fillStyle=t.backgroundColor||e.defaults.global.defaultColor,a.closePath(),a.fill()),a.lineCap=t.borderCapStyle||e.defaults.global.elements.line.borderCapStyle,a.setLineDash&&a.setLineDash(t.borderDash||e.defaults.global.elements.line.borderDash),a.lineDashOffset=t.borderDashOffset||e.defaults.global.elements.line.borderDashOffset,a.lineJoin=t.borderJoinStyle||e.defaults.global.elements.line.borderJoinStyle,a.lineWidth=t.borderWidth||e.defaults.global.elements.line.borderWidth,a.strokeStyle=t.borderColor||e.defaults.global.defaultColor,a.beginPath(),i.each(this._children,function(e,s){var o=i.previousItem(this._children,s),n=i.nextItem(this._children,s);return s||a.moveTo(e._view.x,t.scaleZero),e._view.skip&&!this.loop?void a.moveTo(n._view.x,t.scaleZero):o._view.skip?void a.moveTo(e._view.x,e._view.y):(s||a.moveTo(e._view.x,e._view.y),t.tension>0&&s?void a.bezierCurveTo(o._view.controlPointNextX,o._view.controlPointNextY,e._view.controlPointPreviousX,e._view.controlPointPreviousY,e._view.x,e._view.y):void a.lineTo(e._view.x,e._view.y))},this),this._loop&&!s._view.skip){if(t.tension>0)return void a.bezierCurveTo(o._view.controlPointNextX,o._view.controlPointNextY,s._view.controlPointPreviousX,s._view.controlPointPreviousY,s._view.x,s._view.y);a.lineTo(s._view.x,s._view.y)}a.stroke(),a.restore()}})}.call(this),/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.0.0-beta
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
function(){"use strict";var t=this,e=t.Chart;e.helpers;e.defaults.global.elements.point={radius:3,backgroundColor:e.defaults.global.defaultColor,borderWidth:1,borderColor:e.defaults.global.defaultColor,hitRadius:1,hoverRadius:4,hoverBorderWidth:1},e.elements.Point=e.Element.extend({inRange:function(t,e){var i=this._view;if(i){var a=i.hitRadius+i.radius;return Math.pow(t-i.x,2)+Math.pow(e-i.y,2)<Math.pow(a,2)}return!1},inLabelRange:function(t){var e=this._view;return e?Math.pow(t-e.x,2)<Math.pow(e.radius+e.hitRadius,2):!1},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(){var t=this._view,i=this._chart.ctx;t.skip||(t.radius>0||t.borderWidth>0)&&(i.beginPath(),i.arc(t.x,t.y,t.radius||e.defaults.global.elements.point.radius,0,2*Math.PI),i.closePath(),i.strokeStyle=t.borderColor||e.defaults.global.defaultColor,i.lineWidth=t.borderWidth||e.defaults.global.elements.point.borderWidth,i.fillStyle=t.backgroundColor||e.defaults.global.defaultColor,i.fill(),i.stroke())}})}.call(this),function(){"use strict";var t=this,e=t.Chart;e.helpers;e.defaults.global.elements.rectangle={backgroundColor:e.defaults.global.defaultColor,borderWidth:0,borderColor:e.defaults.global.defaultColor},e.elements.Rectangle=e.Element.extend({draw:function(){var t=this._chart.ctx,e=this._view,i=e.width/2,a=e.x-i,s=e.x+i,o=e.base-(e.base-e.y),n=e.borderWidth/2;e.borderWidth&&(a+=n,s-=n,o+=n),t.beginPath(),t.fillStyle=e.backgroundColor,t.strokeStyle=e.borderColor,t.lineWidth=e.borderWidth,t.moveTo(a,e.base),t.lineTo(a,o),t.lineTo(s,o),t.lineTo(s,e.base),t.fill(),e.borderWidth&&t.stroke()},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){var i=this._view,a=!1;return i&&(a=i.y<i.base?t>=i.x-i.width/2&&t<=i.x+i.width/2&&e>=i.y&&e<=i.base:t>=i.x-i.width/2&&t<=i.x+i.width/2&&e>=i.base&&e<=i.y),a},inLabelRange:function(t){var e=this._view;return e?t>=e.x-e.width/2&&t<=e.x+e.width/2:!1},tooltipPosition:function(){var t=this._view;return t.y<t.base?{x:t.x,y:t.y}:{x:t.x,y:t.base}}})}.call(this),function(){"use strict";var t=this,e=t.Chart;e.helpers;e.Bar=function(t,i){return i.type="bar",new e(t,i)}}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers,a={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{template:"(<%= value.x %>, <%= value.y %>)",multiTemplate:"<%if (datasetLabel){%><%=datasetLabel%>: <%}%>(<%= value.x %>, <%= value.y %>)"}};e.Bubble=function(t,s){return s.options=i.configMerge(a,s.options),s.type="bubble",new e(t,s)}}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers,a={aspectRatio:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i = 0; i < data.datasets[0].data.length; i++){%><li><span style="background-color:<%=data.datasets[0].backgroundColor[i]%>"><%if(data.labels && i < data.labels.length){%><%=data.labels[i]%><%}%></span></li><%}%></ul>'};e.Doughnut=function(t,s){return s.options=i.configMerge(a,s.options),s.type="doughnut",new e(t,s)}}.call(this),function(){"use strict";var t=this,e=t.Chart;e.helpers;e.Line=function(t,i){return i.type="line",new e(t,i)}}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers,a={aspectRatio:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i = 0; i < data.datasets[0].data.length; i++){%><li><span style="background-color:<%=data.datasets[0].backgroundColor[i]%>"><%if(data.labels && i < data.labels.length){%><%=data.labels[i]%><%}%></span></li><%}%></ul>'};e.PolarArea=function(t,s){return s.options=i.configMerge(a,s.options),s.type="polarArea",new e(t,s)}}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers,a={aspectRatio:1};e.Radar=function(t,s){return s.options=i.configMerge(a,s.options),s.type="radar",new e(t,s)}}.call(this),function(){"use strict";var t=this,e=t.Chart,i=e.helpers,a={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-1"}],yAxes:[{type:"linear",position:"left",id:"y-axis-1"}]},tooltips:{template:"(<%= value.x %>, <%= value.y %>)",multiTemplate:"<%if (datasetLabel){%><%=datasetLabel%>: <%}%>(<%= value.x %>, <%= value.y %>)"}};e.Scatter=function(t,s){return s.options=i.configMerge(a,s.options),s.type="line",new e(t,s)}}.call(this);