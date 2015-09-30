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
    'ui.bootstrap'
  ]);

/*
** COMPONTENTS
*/
angular.module('impac.components',
  [
    'impac.components.dashboard',
    'impac.components.dashboard-selector',
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
    'impac.components.widgets.accounts-balance-sheet',
    'impac.components.widgets.accounts-balance',
    'impac.components.widgets.accounts-cash-summary',
    'impac.components.widgets.accounts-comparison',
    'impac.components.widgets.accounts-custom-calculation',
    'impac.components.widgets.accounts-expenses-revenue',
    'impac.components.widgets.accounts-payable-receivable',
    'impac.components.widgets.accounts-profit-and-loss',
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
    'impac.components.widgets.sales-number-of-leads',
    'impac.components.widgets.sales-opportunities-funnel',
    'impac.components.widgets.sales-performance',
    'impac.components.widgets.sales-segmented-turnover',
    'impac.components.widgets.sales-summary',
    'impac.components.widgets.sales-top-opportunities'
  ]
);
angular.module('impac.components.widgets-settings',
  [
    'impac.components.widgets-settings.account',
    'impac.components.widgets-settings.accounts-list',
    'impac.components.widgets-settings.chart-filters',
    'impac.components.widgets-settings.formula',
    'impac.components.widgets-settings.hist-mode',
    'impac.components.widgets-settings.organizations',
    'impac.components.widgets-settings.param-selector',
    'impac.components.widgets-settings.params-picker',
    'impac.components.widgets-settings.time-range',
    'impac.components.widgets-settings.width'
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
** FILTERS
*/
angular.module('impac.filters', [
  'impac.filters.url-helper'
]);
/*
** SERVICES
*/
angular.module('impac.services',
  [
    'impac.services.routes',
    'impac.services.linking',
    'impac.services.theming',
    'impac.services.assets',
    'impac.services.analytics',
    'impac.services.kpis',
    'impac.services.chart-formatter',
    'impac.services.message-bus',
    'impac.services.utilities',
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



angular.module("impac.components.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("chart/chart.tmpl.html","<canvas ng-hide=\"isExternalTemplate()\" id=\"myChart\"></canvas>");
$templateCache.put("dashboard/create.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"close()\" >×</div>\n  <h3>Create New Dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!-- Create a new dashboard -->\n  <div class=\"row dashboard-form\">\n    <div class=\"col-sm-10 col-sm-offset-1\">\n      <form class=\"form-horizontal\" role=\"form\">\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Name</label>\n          <div class=\"col-sm-10\">\n            <input type=\'text\' class=\"form-control\" ng-model=\"model.name\" placeholder=\"E.g: Cash Accounts Monitoring\" required>\n          </div>\n        </div>\n\n        <div class=\"form-group\" ng-show=\"isMultiCompanyAvailable()\">\n          <label class=\"col-sm-2 control-label\">Type</label>\n          <div class=\"col-sm-10\">\n            <div class=\"btn-group\" role=\"group\">\n              <button type=\"button\" ng-click=\"selectMode(\'single\')\" ng-class=\"btnBlassFor(\'single\')\">Current Company</button>\n              <button type=\"button\" ng-click=\"selectMode(\'multi\')\" ng-class=\"btnBlassFor(\'multi\')\">Multi Company</button>\n            </div>\n          </div>\n        </div>\n\n        <!-- Single Company mode -->\n        <div class=\"form-group\" ng-show=\"isCurrentOrganizationShown()\">\n          <div ng-show=\"!canAccessAnalyticsForCurrentOrganization()\" class=\"text-center text-purple\">\n            <div class=\"spacer1\"></div>\n            <p>\n              Oops! Only Admins and Super Admins can create dashboards for company {{currentOrganization.name}}.\n              <span ng-show=\"isMultiCompanyAvailable()\">Please select a \"Multi Company\" dashboard to select data from other companies.</span>\n            </p>\n          </div>\n        </div>\n        \n        <!-- Multi Company mode -->\n        <div class=\"form-group\" ng-show=\"isSelectOrganizationShown()\">\n          <label class=\"col-sm-2 control-label\">Companies</label>\n          <div class=\"col-sm-10\">\n            <ul class=\"list-unstyled\">\n              <li ng-repeat=\"organization in organizations\" >\n                <input type=\"checkbox\" ng-model=\"organization.$selected\" ng-disabled=\"!canAccessAnalyticsData(organization)\"> \n                {{organization.name}} \n                <span ng-show=\"organization.is_customer_account\">(customer)</span>\n                <span ng-show=\"!canAccessAnalyticsData(organization)\">\n                  <em><small>\n                    &nbsp;\n                    &nbsp;\n                    <i class=\"fa fa-exclamation-circle text-danger\" tooltip=\"Only Admins and Super Admins can access analytics data for this company\"></i>\n                  </small></em>\n                </span>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </form>\n\n      <!-- End row col -->\n    </div>\n\n    <!-- End Dashboard form -->\n  </div>\n\n\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"close()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-info\" ng-click=\"proceed()\" ng-hide=\"isLoading\" ng-disabled=\"proceedDisabled()\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n        Add\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard/dashboard.tmpl.html","<!-- DASHBOARD -->\n<div class=\"analytics\">\n  <div mno-star-wizard=true modal-open=\'starWizardModal.value\'></div>\n\n  <!-- Impac KPI\'s -->\n  <kpis-bar kpis=\"currentDhb.kpis\"></kpis-bar>\n\n  <!-- Title and Dashboard selection -->\n  <div id=\"head-title\">\n    <div class=\"row\" ng-if=\"showDhbHeading\">\n      <div class=\"col-md-6 col-sm-12\" id=\"dashboard-heading\">\n        <img ng-src=\"{{impacTitleLogo}}\" />\n        <h2>\n          {{dhbHeadingText}}\n        </h2>\n      </div>\n    </div>\n    <dashboard-selector id=\"module__dashboard-selector\"></dashboard-selector>\n  </div>\n\n  <!-- Widgets selection container -->\n  <div id=\"widget-selector\" collapse=\"!showWidgetSelector\" ng-if=\"!customWidgetSelector.path\">\n    <div class=\"title\">\n      <i class=\"fa fa-times-circle\" ng-click=\"hideWidgetSelector()\"/>\n      <span class=\"badge confirmation\">Widget added!</span>\n      Select the widgets you want to add to your dashboard.\n    </div>\n\n    <div class=\"row top-container\">\n      <div class=\"col-md-3 categories\">\n        <div class=\"row header\">\n          All categories\n        </div>\n        <div class=\"row lines\">\n          <div class=\"col-md-12\" style=\"padding: 3px 12px;\">\n            <p ng-click=\"selectCategory(\'accounts\')\" ng-class=\"isCategorySelected(\'accounts\') ? \'selected\' : none\">Accounting</p>\n            <p ng-click=\"selectCategory(\'invoices\')\" ng-class=\"isCategorySelected(\'invoices\') ? \'selected\' : none\">Invoicing</p>\n            <p ng-click=\"selectCategory(\'hr\')\" ng-class=\"isCategorySelected(\'hr\') ? \'selected\' : none\">HR / Payroll</p>\n            <p ng-click=\"selectCategory(\'sales\')\" ng-class=\"isCategorySelected(\'sales\') ? \'selected\' : none\">Sales</p>\n          </div>\n        </div>\n\n        <div class=\"arrow\" ng-style=\"getSelectedCategoryTop()\">\n          <div class=\"square\"></div>\n          <i class=\"fa fa-caret-right\"></i>\n        </div>\n\n      </div>\n\n      <div class=\"col-md-9 widgets\">\n        <div class=\"row header\">\n          {{getSelectedCategoryName() | titleize}}\n        </div>\n        <div class=\"row lines\">\n          <div class=\"col-md-4\" ng-repeat=\"widgetPattern in getWidgetsForSelectedCategory()\" style=\"padding: 0px 8px;\">\n            <p ng-click=\"addWidget(widgetPattern.path, widgetPattern.metadata)\" tooltip=\"{{widgetPattern.desc}}\" tooltip-placement=\"{{$index < 9 ? \'bottom\' : \'top\'}}\" tooltip-animation=\"false\"  tooltip-append-to-body=\"true\" tooltip-class=\"impac-widget-selector-tooltip\"><i class=\"fa fa-{{widgetPattern.icon}}\" /> {{widgetPattern.name}} <i class=\"fa fa-plus-circle\" /></p>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"bottom\">\n      <span class=\"suggestion\">\n        Can\'t find the widget you\'re looking for? <a ng-click=\"modal.widgetSuggestion.open()\">Give us your suggestions here!</a>\n      </span>\n    </div>\n  </div>\n\n  <!-- custom widget selector template configured from ImpacThemingProvider -->\n  <div id=\"custom-widget-selector\" ng-if=\"customWidgetSelector.path\" ng-include=\"customWidgetSelector.path\"></div>\n\n\n  <!-- Errors -->\n  <div class=\"alert alert-error\" ng-show=\"errors\">\n    <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n    <ul>\n      <li ng-repeat=\"error in errors\">{{error}}</li>\n    </ul>\n  </div>\n\n  <div class=\'spacer1\'></div>\n\n  <div id=\"no-widgets-container\" class=\"text-center ng-hide\" ng-show=\'(showChooseDhbMsg || showNoWidgetsMsg) && !isLoading\'>\n\n    <img ng-src=\"{{impacDashboardBackground}}\" class=\"bg\">\n\n    <div class=\"impac-info-message\">\n      <!-- First Time Dashboard Creation -->\n      <div class=\"ng-hide\" ng-show=\'showChooseDhbMsg && !isLoading\'>\n        <div class=\'hidden-xs\'>\n          <div class=\'spacer4\'></div>\n          <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"testimonial promo-dark\">\n                <p><b>It\'s time to add a reporting dashboard!</b></p><p>In 2 clicks, you\'ll be able to visualize how your business is performing.</p>\n              </div>\n            </div>\n          </div>\n          <div class=\'spacer2\'></div>\n        </div>\n        <div class=\"align-center\">\n          <button ng-click=\"modal.createDashboard.open()\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> Create a Dashboard!</button>\n        </div>\n      </div>\n\n      <!-- Empty Dashboard -->\n      <div class=\"ng-hide\" ng-show=\'showNoWidgetsMsg && !isLoading\'>\n        <div class=\'hidden-xs\'>\n          <div class=\'spacer4\'></div>\n          <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"testimonial promo-dark\">\n                <p><b>Now it\'s time to select the metrics you want to see!</b></p><p>Add widgets to your dashboard to help make an Impac!™ to your business.</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"spacer2\"></div>\n        </div>\n        <div class=\"align-center\">\n          <button ng-disabled=\"showWidgetSelector\" ng-click=\"showWidgetSelector=true\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> Add a new Widget</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- First Time Dashboard Creation -->\n  <div class=\"row text-center\" ng-show=\'showChooseDhbMsg && !isLoading\'>\n    <div class=\"spacer2 hidden-xs\"></div>\n    <div class=\'col-md-8 col-md-offset-2\'>\n      <p class=\"text-muted\"><small><em>Note: dashboards you create will only be accessible by you. Dashboard sharing across users will be added soon.</em></small></p>\n    </div>\n  </div>\n\n  <!-- Widgets -->\n  <div class=\'row\'>\n    <div id=\"widgets-container\" ui-sortable=\"sortableOptions\" ng-model=\"currentDhb.widgets\">\n      <div impac-widget widget=\"widget\" is-accessibility=\"accessibility\" parent-dashboard=\"currentDhb\" ng-repeat=\"widget in currentDhb.widgets\" class=\"widget-item\" ng-class=\"widget.getColClass()\" />\n      <!-- Add Widget Tile, enabled & customised in ImpacThemingProvider -->\n      <div ng-if=\"isAddChartEnabled\" class=\"unsortable\" ng-click=\"addChartTileOnClick()\">\n        <div class=\"col-md-6 widget-item add-chart\">\n          <div class=\"a-content\">+ chart</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard/delete.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"close()\" >×</div>\n  <h3>Delete Dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!-- Create a new widget -->\n  <p>Are you sure you want to delete this analytics dashboard?</p>\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"close()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-danger\" ng-click=\"proceed()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n        Delete\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard/widget-suggestion.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"close()\" >×</div>\n  <h3>Suggest a widget</h3>\n</div>\n\n<div class=\"modal-body\">\n\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <label>What would you name your widget?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.name\" ng-disabled=\"isLoading\" />\n    </div>\n    <div class=\"col-md-6\">\n      <label>In which category?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.category\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" />\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <label>What kind of information would your widget display?</label><br />\n      <textarea ng-model=\"widgetDetails.description\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" ng-show=\"isLoading\" />\n\n  <div class=\"row\" ng-show=\"isLoading\">\n    <div class=\"col-md-12 text-center\">\n      <!-- <h3 class=\"thanks-message\">{{userName | titleize}}, thanks a lot for helping us improve Impac!&trade;</h3> -->\n      <h3 class=\"thanks-message\">Thanks a lot for helping us improve Impac!&trade;</h3>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\" ng-class=\"isLoading ? \'text-center\' : null\">\n      <button class=\"btn btn-shaded\" ng-click=\"close()\" ng-hide=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-info\" ng-click=\"proceed()\" ng-hide=\"isLoading\" ng-disabled=\"!(widgetDetails.name && widgetDetails.category && widgetDetails.description)\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n        Send your suggestion\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/bootstrap-tabs.tmpl.html","<div class=\"row\">\n  <div class=\"buttons-bar col-md-8\">\n    <tabset type=\"{{selectorType}}\">\n      <tab ng-repeat=\"dhb in dhbCtrl.dashboardsList\" select=\"dhbCtrl.selectDashboard(dhb.id)\" active=\"dhb.active\">\n        <tab-heading>\n          {{dhb.full_name}}\n          <a href=\"\" class=\"close-link\" ng-if=\"isdeleteDhbEnabled\">\n            <i class=\"fa fa-times\" ng-click=\"dhbCtrl.modal.deleteDashboard.open()\"></i>\n          </a>\n        </tab-heading>\n      </tab>\n      <tab active=\"false\" ng-if=\'isAccessibilityEnabled\' ng-click=\"toogleAccessibilityMode()\">\n        <tab-heading>\n          <a href=\"\"><i class=\"fa fa-wheelchair\"></i></a>\n        </tab-heading>\n      </tab>\n      <tab ng-if=\"isAddDhbEnabled\" active=\"false\" ng-click=\"dhbCtrl.modal.createDashboard.open()\">\n        <tab-heading>\n          <a href=\"\">+</a>\n        </tab-heading>\n      </tab>\n    </tabset>\n  </div>\n  <div class=\'buttons-bar col-md-4\'>\n    <div class=\'actions-panel\'>\n      <button ng-if=\'isAccessibilityEnabled\' ng-click=\"toogleAccessibilityMode()\" class=\'btn btn-info\' ng-disabled=\"showWidgetSelector\"><span class=\'fa fa-wheelchair\'></span></button>\n      <button ng-if=\"isAddWidgetEnabled\" ng-click=\"dhbCtrl.showWidgetSelector = true\" class=\'btn btn-warning\' ng-show=\"dhbCtrl.showCreateWidget\" ng-disabled=\"dhbCtrl.showWidgetSelector\"><span class=\'fa fa-plus\'></span> Add Widget</button>\n      <!-- <button id=\'data-upload-wizard\' ng-click=\'dhbCtrl.openStarWizard()\' class=\'btn btn-success hidden-xs\' ><span class=\'fa fa-upload\'></span> Data Upload</button> -->\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/dropdown.tmpl.html","<div class=\"row dropdown-container\">\n  <div class=\"buttons-bar col-md-6\">\n    <h4 ng-hide=\'dhbCtrl.showChooseDhbMsg\' class=\'dashboard-title\' ng-click=\"dhbCtrl.toogleShowDashboardsList()\">\n      {{dhbCtrl.currentDhb.full_name}}\n      <i class=\"fa fa-chevron-down\" style=\"font-size: 18px;\"></i>\n      <i ng-hide=\"dhbCtrl.showChangeDhbName\" class=\"fa fa-pencil\" tooltip=\"Change name\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" ng-click=\"dhbCtrl.toogleShowChangeDhbName(dhbCtrl.currentDhb)\"></i>\n    </h4>\n\n    <div collapse=\"!dhbCtrl.showDashboardsList\" class=\'dashboard-select\'>\n      <div ng-hide=\"dhb.id == dhbCtrl.currentDhbId\" class=\'option\' ng-repeat=\"dhb in dhbCtrl.dashboardsList\">\n        <span class=\"name\" ng-click=\"dhbCtrl.selectDashboard(dhb.id)\">{{dhb.full_name}}</span>\n        <i ng-hide=\"dhbCtrl.showChangeDhbName\" class=\"fa fa-pencil\" tooltip=\"Change name\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" ng-click=\"dhbCtrl.toogleShowChangeDhbName(dhb)\"/>\n      </div>\n\n      <div ng-show=\"dhbCtrl.showCreateDhb\" class=\"option create\" ng-click=\"dhbCtrl.modal.createDashboard.open() ; dhbCtrl.showChangeDhbName = false\"><i class=\"fa fa-plus\" /> Create Dashboard</div>\n    </div>\n\n    <div ng-show=\"dhbCtrl.showChangeDhbName\" class=\"change-name\">\n      <p>Change dashboard name:</p>\n      <input type=\"text\" class=\"form-control\" id=\"changeDhbNameInput\" ng-model=\"dhbCtrl.dashboardToChange.name\" ng-keyup=\"dhbCtrl.checkChangeDhbNameAndConfirm($event)\"/>\n      <button class=\"btn btn-sm btn-default\" ng-click=\"dhbCtrl.showChangeDhbName=false\">Cancel</button>\n      <button class=\"btn btn-sm btn-success\" style=\"margin-left: 10px\" ng-click=\"dhbCtrl.updateDhbName()\">Confirm</button>\n    </div>\n\n    <p ng-hide=\'dhbCtrl.showChooseDhbMsg\' class=\"data-source-label\">\n      <small><b>Source:</b> {{dhbCtrl.currentDhb.organizationsNames}}</small>\n    </p>\n  </div>\n\n  <div class=\'buttons-bar col-md-6\'>\n    <div class=\'actions-panel\'>\n      <button ng-if=\'isAccessibilityEnabled\' ng-click=\"toogleAccessibilityMode()\" class=\'btn btn-info\' ng-disabled=\"showWidgetSelector\"><span class=\'fa fa-wheelchair\'></span></button>\n      <button ng-if=\"isAddWidgetEnabled\" ng-click=\"dhbCtrl.showWidgetSelector = true\" class=\'btn btn-warning\' ng-show=\"dhbCtrl.showCreateWidget\" ng-disabled=\"dhbCtrl.showWidgetSelector\"><span class=\'fa fa-plus\'></span> Add Widget</button>\n      <button ng-if=\"isAddDhbEnabled\" ng-click=\"dhbCtrl.modal.createDashboard.open()\" class=\'btn btn-warning\' ng-show=\"dhbCtrl.showCreateDhb\"><span class=\'fa fa-pencil-square-o\'></span> Create Dashboard</button>\n      <!-- <button id=\'data-upload-wizard\' ng-click=\'dhbCtrl.openStarWizard()\' class=\'btn btn-success hidden-xs\' ><span class=\'fa fa-upload\'></span> Data Upload</button> -->\n      <button ng-if=\"isdeleteDhbEnabled\" ng-click=\"dhbCtrl.modal.deleteDashboard.open()\" class=\'btn btn-danger hidden-xs\' ng-show=\"dhbCtrl.showDeleteDhb\" tooltip=\"Delete Dashboard\"><span class=\'fa fa-trash-o\'></span> </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("kpi/kpi.tmpl.html","<div class=\"tile kpi\">\n  <div ng-hide=\"showEditTarget\">\n    <small class=\"kpi-title\" ng-if=\"::kpi.static\">{{::kpi.name}}</small>\n    <small class=\"kpi-title\" ng-if=\"::!kpi.static\" editable-text=\"kpi.name\" buttons=\"no\" onaftersave=\"updateName()\">{{kpi.name}}</small>\n    <div class=\"kpi-watch\" ng-if=\"::!kpi.static\">({{::kpi.element_watched}})</div>\n    <span class=\"kpi-value\">{{::kpi.data.real_value}}</span>\n    <!-- <div ng-if=\"::kpi.alert\" class=\"kpi-alert\">{{::kpi.alert}}</div> -->\n    <div class=\"kpi-alert\" ng-if=\"kpi.data.achieved == false && !editMode\">{{ isTargetReverse() ? \'over\' : \'below\'}} {{::kpi.target.limit}}</div>\n\n    <div class=\"kpi-alert\" ng-show=\"editMode\" ng-click=\"displayEditTarget()\">Edit target</div> \n  </div>\n\n  <div ng-if=\"showEditTarget\">\n    <small class=\"kpi-title\" ng-if=\"::kpi.static\">{{::kpi.name}}</small>\n\n    KPI target:\n    \n    <select ng-model=\"kpi.target.reverse\" class=\"form-control input-sm\">\n      <option value=\"false\" ng-selected=\"!isTargetReverse()\">over</option>\n      <option value=\"true\" ng-selected=\"isTargetReverse()\">below</option>\n    </select>\n\n    <input type=\"text\" ng-model=\"kpi.target.limit\"  class=\"form-control input-sm\" />\n    \n    <div class=\"kpi-alert\" ng-click=\"updateTarget()\"><a href=\"\">Save</a></div> \n  </div>\n\n</div>\n");
$templateCache.put("kpis-bar/kpis-bar.tmpl.html","<div class=\"row kpis\">\n  <div class=\"title-actions col-xs-2\">\n    <!-- <div class=\"title\">How I\'m tracking</div> -->\n    \n    <div ng-click=\"toggleAvailableKpis()\"><a href=\"\"><i class=\"fa fa-plus\"></i> Attach KPI</a></div>\n    <div class=\"available-kpis-container\" collapse=\"hideAvailableKpis\">\n      <div ng-repeat=\"kpi in availableKpis\" class=\"available-kpi\">\n        <span class=\"kpi-name\">{{formatKpiName(kpi.endpoint)}}</span>\n        <button class=\"btn btn-sm btn-info\" ng-click=\"addKpi(kpi)\">+ Attach</button>\n        <select class=\"form-control-static input-sm\" ng-model=\"kpi.element_watched\" ng-options=\"watchable for watchable in kpi.watchables\"></select>\n      </div>\n    </div>\n    \n    <div ng-click=\"toggleEditMode()\"><a href=\"\"><i class=\"fa fa-cog\"></i> Edit KPIs Settings</a></div>\n    \n    <!-- <div><a href=\"\"><i class=\"fa fa-exclamation-triangle\"></i> set up an alert</a></div> -->\n  </div>\n  <impac-kpi class=\"col-xs-2\" kpi=\"kpi\" edit-mode=\"showEditMode\" ng-repeat=\"kpi in kpis track by $index\"></impac-kpi>\n</div>\n\n<div class=\"row key-stats\">\n  <div class=\"title-actions col-xs-2\">\n    <div class=\"title\">Key stats</div>\n  </div>\n  <impac-kpi ng-repeat=\"keyStat in keyStats\" kpi=\"keyStat\" class=\"col-xs-2\"></impac-kpi>\n</div>\n");
$templateCache.put("widget/widget.tmpl.html","<!-- Class wrapper: widget-item -->\n<!-- TODO: rename (impac-widget) -->\n\n<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div ng-show=\"isTemplateLoaded()\" class=\"content\" ng-class=\"templateName\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    <div>\n      <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n      <p>Your data is being retrieved...</p>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\" ng-include=\"widgetContentTemplate()\" />\n</div>\n\n<div ng-hide=\"isTemplateLoaded()\" class=\"content\">\n  <div class=\"loader\" align=\"center\">\n    <div>\n      <i class=\"fa fa-spinner fa-pulse fa-4x\"></i>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-common/data-not-found.tmpl.html","<div class=\"data-not-found\">\n	<img ng-src=\"{{bgImage}}\" />\n	<div class=\"message\">\n	  {{content.mainMessage}}\n    <!-- TODO: provider for html hyperlinks? -->\n		<a ng-href=\"{{content.linkUrl}}\" target=\"_blank\">\n			{{content.linkMessage}}\n		</a>\n	</div>\n</div>\n");
$templateCache.put("widgets-common/editable-title.tmpl.html","<div class=\"visible-lg title-wrapper\" ng-if=\"parentWidget.width >= 3 && parentWidget.width < 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:25:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:25:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-lg title-wrapper\" ng-if=\"parentWidget.width >= 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:60:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:60:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-md visible-sm title-wrapper\" ng-if=\"parentWidget.width == 3 && parentWidget.width < 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:18:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:18:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-md visible-sm title-wrapper\" ng-if=\"parentWidget.width >= 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:45:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:45:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-xs title-wrapper\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:30:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:30:\".\"}}\n  </div>\n</div>");
$templateCache.put("widgets-common/top-buttons.tmpl.html","<div id=\"module__top-buttons\">\n  <div ng-mouseenter=\"showCloseActive=true\" ng-mouseleave=\"showCloseActive=false\" class=\"delete-widget\" ng-show=\"parentWidget.hasDeleteAbility\">\n    <button class=\"btn btn-close top-button\" ng-click=\"showConfirmDelete = !showConfirmDelete\">\n      <i class=\"fa fa-times-circle-o fa-lg\"></i>\n    </button>\n  </div>\n\n  <div ng-mouseenter=\"showEditActive=true\" ng-mouseleave=\"showEditActive=false\" class=\"edit-widget\" ng-show=\"parentWidget.hasEditAbility\">\n    <button class=\"btn top-button btn-edit\" ng-click=\"toogleEditMode()\">\n      <i class=\"fa fa-cog fa-lg\"></i>\n    </button>\n  </div>\n\n  <div class=\"refresh-widget\">\n    <button class=\"btn top-button btn-refresh\" ng-click=\"parentWidget.loadContent(true)\">\n      <i class=\"fa fa-refresh\"></i>\n    </button>\n  </div>\n\n  <div class=\"confirm-delete-popover\" ng-show=\"showConfirmDelete\">\n  	<h4>Are you sure you want to delete this widget ?</h4>\n  	<p>(it will not erase your data)</p>\n  	<button ng-click=\"showConfirmDelete = false\" class=\"btn btn-sm btn-default\">Cancel</button>\n  	<button ng-click=\"deleteWidget()\" class=\"btn btn-sm btn-danger\" style=\"margin-left: 10px;\">Delete</button>\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-accounting-values.tmpl.html","<div widget-accounts-accounting-values>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget= \"widget\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">\n           {{ getCurrentPrice() | mnoCurrency : getCurrency() : false }}\n        </div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n        <div class=\"legend\">{{getLegend()}}</div>\n      </div>\n\n      <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n      <div ng-if=\"widget.isHistoryMode\" class=\"history chart-container\">\n        <div dhb-chart data=\"widget.chart\"></div>\n        <div class=\"legend\">{{getLegend()}}</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n  \n</div>");
$templateCache.put("widgets/accounts-assets-summary.tmpl.html","<div widget-accounts-assets-summary>\n      \n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-if=\"isDataFound\" class=\"chart-container\">\n      <div dhb-chart data=\"widget.chart\"></div>\n      <div class=\"legend\">\n        <span ng-repeat=\"valuePair in widget.content.summary\">\n          <span style=\"font-weight: bold; color: {{getAccountColor(valuePair)}};\">{{valuePair.label}}</span>: {{valuePair.total | mnoCurrency : getCurrency()}}\n          <br />\n        </span>\n      </div>\n    </div>\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-balance.tmpl.html","<div widget-accounts-balance>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div ng-hide=\"!isDataFound\" setting-account parent-widget=\"widget\" class=\"part\" />\n    <div ng-hide=\"!isDataFound\" setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <!-- Will be hidden once an account is selected -->\n      <div setting-account ng-hide=\"widget.selectedAccount\" parent-widget=\"widget\" label=\'Select an account to monitor\' />\n\n      <!-- All the below divs will remain hidden until an account is selected -->\n      <div setting-hist-mode ng-show=\"widget.selectedAccount\" parent-widget=\"widget\" />\n\n      <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n      <div ng-if=\"widget.isHistoryMode && widget.selectedAccount\" class=\"chart-container\">\n        <div dhb-chart data=\"widget.chart\"></div>\n        <div class=\"legend\">{{getName()}}</div>\n      </div>\n\n      <div ng-hide=\"widget.isHistoryMode || !widget.selectedAccount\">\n        <h3>{{getName()}}</h3>\n        <div class=\"price\">\n           {{ getCurrentBalance() | mnoCurrency : getCurrency() : false }}\n        </div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-balance-sheet.tmpl.html","<div widget-accounts-balance-sheet>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-6 text-center\">Compare with previous: <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/></div>\n          <div class=\"col-sm-3 text-right\">{{widget.content.dates[0] | date : \"d-MMM\"}}</div>\n          <div class=\"col-sm-3 text-right\">{{widget.content.dates[1] | date : \"d-MMM\"}}</div>\n        </div>\n        <div class=\"row widget-line total\" ng-repeat=\"category in categories\" >\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(category)\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(category) ? \"fa-plus-square-o\" : \"fa-minus-square-o\"\" /></div>\n            <div class=\"col-sm-5\"><strong>{{category | titleize}}</strong></div>\n            <div class=\"col-sm-3 text-right\"><strong>{{widget.content.summary[category].totals[0] | mnoCurrency : widget.content.summary[category].currency}}</strong></div>\n            <div class=\"col-sm-3 text-right\"><strong>{{widget.content.summary[category].totals[1] | mnoCurrency : widget.content.summary[category].currency}}</strong></div>\n          </div>\n          <div collapse=\"isCollapsed(category)\">\n            <div class=\"row widget-line\" ng-repeat=\"account in widget.content.summary[category].accounts\" >\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-5\">{{account.name | titleize}}</div>\n              <div class=\"col-sm-3 text-right\">{{account.totals[0] | mnoCurrency : account.currency}}</div>\n              <div class=\"col-sm-3 text-right\">{{account.totals[1] | mnoCurrency : account.currency}}</div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-cash-summary.tmpl.html","<div widget-accounts-cash-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-1\" />\n            <div class=\"col-sm-5\"></div>\n            <div class=\"col-sm-3 text-right\">{{getLastDate() | date : \"d-MMM\"}}</div>\n            <div class=\"col-sm-3 text-right\">Variance</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n            <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(statement)\"><i class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-5\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n              <div class=\"col-sm-3 text-right\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong></div>\n              <div class=\"col-sm-3 text-right\" ng-click=\"toogleSelectedElement(statement)\" ng-class=\"getVarianceClassColor(getLastVariance(statement))\"><strong>{{getLastVariance(statement)}}</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(statement)\">\n              <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(account)\" ng-repeat=\"account in statement.accounts\" ng-class=\"isSelected(account) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-5\">{{account.name}}</div>\n                <div class=\"col-sm-3 text-right\">{{getLastValue(account) | mnoCurrency : account.currency }}</div>\n                <div class=\"col-sm-3 text-right\" ng-class=\"getVarianceClassColor(getLastVariance(account))\">{{getLastVariance(account)}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n        <h4>{{getName(selectedElement) | titleize}}</h4>\n        <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n        <div class=\"legend\">{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Cash Flow</div>\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line\">\n            <div class=\"col-sm-2 text-center\" ng-repeat=\"date in dates\" style=\"padding: 5px 0px;\">\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date | date : \"d-MMM\"}}</div></div>\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{selectedElement.cash_flows[$index] | mnoCurrency : selectedElement.currency }}</div></div>\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\" ng-class=\"getVarianceClassColor(selectedElement.variances[$index])\">{{formatVariance(selectedElement.variances[$index])}}</div></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n    \n</div>");
$templateCache.put("widgets/accounts-comparison.tmpl.html","<div widget-accounts-comparison>\n  <div setting-accounts-list parent-widget=\"widget\" />\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n      <div ng-hide=\"hasAccountsSelected()\" class=\"row\">\n        <h5>Select which accounts you wish to compare.</h5>\n        <div class=\"col-md-6\">\n          <div class=\"input-group\">\n            <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in widget.remainingAccounts\" class=\"form-control\" ng-show=\"widget.hasEditAbility\" ng-change=\"addAccount(movedAccount)\"></select>\n          </div>\n        </div>\n      </div>\n\n      <div ng-if=\"hasAccountsSelected()\">\n        <div class=\"row\">\n          <div class=\"col-md-12 chart-container\">\n            <div dhb-chart data=\"widget.chart\" />\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"widget-lines-container\">\n              <div class=\"widget-line\" ng-repeat=\"account in widget.selectedAccounts\">\n                <button class=\"close\" ng-click=\"removeAccount(account)\" ng-show=\"widget.hasDeleteAbility\">\n                  x\n                </button>\n                <i style=\"float: right; margin-right: 10px;\">{{formatAmount(account)}}</i>\n                <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getAccountColor(account)}}\" />\n                {{account.name}}\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"add-account\">\n            <div class=\"input-group\">\n              <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in widget.remainingAccounts track by account.uid\" class=\"form-control\" ng-show=\"widget.hasDeleteAbility\" ng-change=\"addAccount(movedAccount)\" ng-disabled=\"widget.selectedAccounts.length >= 15 || widget.remainingAccounts.length == 0\">\n                <option value=\"\" disabled selected>+ ADD ACCOUNT</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-custom-calculation.tmpl.html","<div widget-accounts-custom-calculation>\n\n  <div setting-organizations parent-widget=\"widget\" ng-hide=\"true\" />\n  <div setting-accounts-list parent-widget=\"widget\" />\n  <div setting-formula parent-widget=\"widget\" />\n\n  <h3 ng-show=\"widget.hasEditAbility && !widget.isFormulaCorrect\">\n    <a href=\"\" ng-click=\"formulaModal.open()\">Create a custom calculation</a>\n  </h3>\n  \n  <div class=\"price\" ng-show=\"widget.isFormulaCorrect\">\n    {{widget.evaluatedFormula}}\n  </div>\n  <!-- Should be put in a tooltip/popover instead -->\n<!--     <div class=\"legend\" ng-show=\"widget.isFormulaCorrect\">\n    {{widget.legend}}\n  </div> -->\n\n</div>");
$templateCache.put("widgets/accounts-custom-calculation/formula.modal.html","<div class=\"modal-custom-calculation\">\n  <div class=\"modal-header\">\n    <div class=\"close\" type=\"button\" ng-click=\"formulaModal.cancel()\" >×</div>\n    <h3>Custom Calculation</h3>\n  </div>\n\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <div class=\"alert alert-error\" ng-show=\"formulaModal.errors\">\n          <button class=\"close\" ng-click=\"formulaModal.errors=\'\'\">×</button>\n          <ul>\n            <li ng-repeat=\"error in formulaModal.errors\">{{error}}</li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <!-- <div class=\'analytics\'>  -->\n\n      <div class=\"edit\">\n        <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      </div>\n\n      <p>Make a custom equation with your accounts, and save it as a widget. To create an equation, simply select your accounts in the list, and use the classical operators (example: ({1} + {2}) / {3})</p>\n\n      <div class=\'row\'>\n        <div ng-show=\"widget.isLoading\" class=\"col-md-6 loader\" align=\"center\">\n          <div>\n            <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n            <p>Your data is being retrieved...</p>\n          </div>\n        </div>\n\n        <div ng-hide=\"widget.isLoading\" class=\'col-md-6\'>\n          <div class=\'widget-line\' ng-repeat=\'account in widget.selectedAccounts\'>\n            <div class=\'row\'>\n              <div class=\'col-md-6\'>\n                {{$index+1}} - {{account.name}}\n              </div>\n              <div class=\'col-md-6\'>\n                {{account.current_balance | mnoCurrency : account.currency}}\n                <button class=\"close\" ng-click=\"removeAccountFromFormula(account)\" ng-show=\"widget.hasEditAbility\"><span class=\'fa fa-times-circle\'></span></button>\n              </div>\n            </div>\n          </div>\n\n          <div class=\'input-group\' ng-show=\"widget.hasEditAbility\">\n            <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + widget.formatAmount(account) + \')\' for account in widget.remainingAccounts\" class=\'form-control\' ng-change=\'addAccountToFormula(movedAccount)\'><select>\n          </div>\n        </div>\n\n        <div class=\'col-md-6\'>\n          <p>Type your formula just below:</p>\n          <input class=\'form-control\' ng-model=\"widget.formula\">\n\n          <p>Result: {{widget.evaluatedFormula}}</p>\n          <p>Legend: {{widget.legend}}</p>\n        </div>\n      </div>\n    <!-- </div> -->\n  </div>\n\n  <div class=\"modal-footer\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <button class=\"btn btn-gray\" ng-click=\"formulaModal.cancel()\" ng-hide=\"widget.isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"formulaModal.proceed()\" ng-hide=\"widget.isLoading\" ng-disabled=\'!widget.isFormulaCorrect || widget.isLoading\'>\n          <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n          Save\n        </button>\n      </div>\n\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-expenses-revenue.tmpl.html","<div widget-accounts-expenses-revenue>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget=\"widget\" />\n\n      <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n      <div ng-if=\"widget.isHistoryMode && !widget.isLoading\" class=\"chart-container\">\n        <div dhb-chart data=\"widget.hist_chart\"></div>\n        <div class=\"legend\">\n          <span class=\"negative2\">Expenses</span> -\n          <span class=\"positive2\">Revenue</span>\n        </div>\n      </div>\n\n      <div ng-if=\"!widget.isHistoryMode && !widget.isLoading\" class=\"chart-container\">\n        <div dhb-chart data=\"widget.cur_chart\"></div>\n        <div class=\"legend\">\n          <span class=\"negative2\">Expenses: {{getCurrentExpenses() | mnoCurrency : getCurrency()}}</span>\n          </br>\n          <span class=\"positive2\">Revenue: {{getCurrentRevenue() | mnoCurrency : getCurrency()}}</span>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-payable-receivable.tmpl.html","<div widget-accounts-payable-receivable>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget=\"widget\" />\n\n      <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n      <div ng-if=\"widget.isHistoryMode\" class=\"chart-container\">\n        <div dhb-chart data=\"widget.chart\"></div>\n        <div class=\"legend\">\n          <span class=\"negative2\">Payable</span> -\n          <span class=\"positive2\">Receivable</span>\n        </div>\n      </div>\n\n      <div ng-hide=\"widget.isHistoryMode\">\n        <div class=\"receivable\">\n          <h3>Accounts Receivable</h3>\n          <div class=\"price positive2\">\n             {{getCurrentReceivable() | mnoCurrency : getCurrency() : false}}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n\n        <div class=\"payable\">\n          <h3>Accounts Payable</h3>\n          <div class=\"price negative2\">\n            {{getCurrentPayable() | mnoCurrency : getCurrency() : false}}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-profit-and-loss.tmpl.html","<div widget-accounts-profit-and-loss>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-8\">{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Profit and Loss</div>\n            <div class=\"col-sm-4 text-right\">{{getLastDate() | date : \"d-MMM\"}}</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n            <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(statement)\"><i ng-show=\"statement.accounts\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n              <div class=\"col-sm-4 text-right\" ng-class=\"getClassColor(getLastValue(statement))\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(statement)\">\n              <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(account)\" ng-repeat=\"account in statement.accounts\" ng-class=\"isSelected(account) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{account.name}}</div>\n                <div class=\"col-sm-4 text-right\" ng-class=\"getClassColor(getLastValue(account))\">{{getLastValue(account) | mnoCurrency : account.currency}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n        <h4>{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Profit and Loss</h4>\n        <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n        <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n\n        <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n          <div class=\"row widget-line\">\n            <div class=\"col-sm-2 text-center\" ng-repeat=\"date in dates\" style=\"padding: 5px 0px;\">\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date | date : \"d-MMM\"}}</div></div>\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\" style=\"padding: 0px;\">{{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}</div></div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n          <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n            <i style=\"float: right; margin-right: 10px;\" ng-class=\"getClassColor(getLastValue(element))\">{{getLastValue(element) | mnoCurrency : element.currency}}</i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n            {{getName(element) | titleize}}\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-employee-details.tmpl.html","<div widget-hr-employee-details>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" />\n        <div setting-param-selector parent-widget=\"widget\" param=\"employee_uid\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"row title\" />\n\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Job Title</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().job_title || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Company</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().company || getSingleCompanyName()}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Phone</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().phone || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Email</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().email || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Date of birth</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().dob || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Gender</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().gender || \"-\" }}</pre></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <div class=\"legend\">Salary calculation period: <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" /></div>\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Salary</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().salary || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Address</label></div>\n            <div class=\"col-md-8\"><pre>{{formatAddress(getEmployee().address) || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Job location</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().location || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Supervisor</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().supervisor || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Statuts</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().employment_status || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Note</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().note || \"-\" }}</pre></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-employees-list.tmpl.html","<div widget-hr-employees-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" >\n\n      <div class=\"legend\">\n        <strong>{{widget.content.total.employees}}</strong> employee{{widget.content.total.employees > 1 ? \"s\" : null}} - Average salary rate (<span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>): <strong>{{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}</strong>\n      </div>\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-2\">Company</div>\n          <div class=\"col-sm-3\">Employee</div>\n          <div class=\"col-sm-2\">Title</div>\n          <div class=\"col-sm-3\">Phone</div>\n          <div class=\"col-sm-2\">Salary</div>\n        </div>\n        <div class=\"row widget-line\" ng-repeat=\"employee in widget.content.employees\" >\n          <div class=\"col-sm-2\">{{employee.company || getSingleCompanyName()}}</div>\n          <div class=\"col-sm-3\">{{employee.lastname}} {{employee.firstname}}</div>\n          <div class=\"col-sm-2\"><i>{{employee.job_title}}</i></div>\n          <div class=\"col-sm-3\">{{employee.phone}}</div>\n          <div class=\"col-sm-2\"><i>{{getEmployeeSalary(employee)}}</i></div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-leaves-balance.tmpl.html","<div widget-hr-leaves-balance>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" >\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"selector\" />\n\n      <div class=\"widget-lines-container\">\n        <div class=\"widget-line\">\n          <i style=\"float: right; margin-right: 10px;\">{{getEmployee().total_leaves}} h</i>\n          Accrued\n        </div>\n        <div class=\"widget-line\">\n          <i style=\"float: right; margin-right: 10px;\">{{getEmployee().total_timeoff}} h</i>\n          Used\n        </div>\n      </div>\n\n      <h3>Leave Balance</h3>\n      <div class=\"balance\">{{(getEmployee().total_leaves - getEmployee().total_timeoff)}} hours</div>\n      <div class=\"legend\">\n        <span>(from {{widget.content.dates[0] | date : \"MMM-d\"}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \"MMM-d\"}})</span>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-leaves-schedule.tmpl.html","<div widget-hr-leaves-schedule>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div widget-component-calendar ng-model=\"eventSources\"></div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-payroll-summary.tmpl.html","<div widget-hr-payroll-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-12\">Payroll Summary - {{getPeriod()}}</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n            <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(statement)\"><i ng-show=\"statement.employees\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n              <div class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(statement)\">\n                <strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong>\n              </div>\n            </div>\n            <div collapse=\"isCollapsed(statement)\">\n              <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(employee)\" ng-repeat=\"employee in statement.employees\" ng-class=\"isSelected(employee) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{employee.name}}</div>\n                <div class=\"col-sm-4 text-right\">\n                  <span>{{getLastValue(employee) | mnoCurrency : employee.currency}}</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n        <h4>{{(widget.content.hist_parameters.period || \"Monthly\") | titleize}} Payroll Summary</h4>\n\n        <div setting-hist-mode parent-widget=\"widget\" />\n\n        <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n        <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n          <div ng-if=\"widget.isHistoryMode\" dhb-chart data=\"widget.hist_chart\"></div>\n          <div ng-if=\"!widget.isHistoryMode\" dhb-chart data=\"widget.cur_chart\"></div>\n        </div>\n\n        <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n          <div ng-show=\"getTrackedField()\" class=\"legend\">{{getTrackedField()}}</div>\n          <div class=\"row widget-line\">\n            <div class=\"col-sm-2 text-center\" ng-repeat=\"date in widget.content.dates\" style=\"padding: 5px 0px;\">\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{formatDate(date)}}</div></div>\n              <div class=\"row widget-line\">\n                <div class=\"col-sm-12\" style=\"padding: 0px;\">{{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency }}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n          <div ng-if=\"widget.isHistoryMode\" class=\"widget-line header\">\n            <span ng-show=\"getTrackedField()\">{{getTrackedField()}} - </span>From {{widget.content.dates[0] | date : \"MMM-d\"}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \"MMM-d\"}}\n          </div>\n          <div ng-if=\"!widget.isHistoryMode\" class=\"widget-line header\">\n            <span ng-show=\"getTrackedField()\">{{getTrackedField()}} - </span>{{getPeriod()}}\n          </div>\n\n          <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n            <i style=\"float: right; margin-right: 10px;\">\n              <span ng-if=\"widget.isHistoryMode\">{{getTotalSum(element) | mnoCurrency : element.currency}}</span>\n              <span ng-if=\"!widget.isHistoryMode\">{{getLastValue(element) | mnoCurrency : element.currency}}</span>\n            </i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n            {{getName(element) | titleize}}\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-payroll-taxes.tmpl.html","<div widget-hr-payroll-taxes>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget= \"widget\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">{{getCurrentPrice() | mnoCurrency : getCurrency() : false}}</div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n        <div class=\"legend\">Taxes upon workforce costs<br />{{getPeriod()}}</div>\n      </div>\n\n      <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n      <div ng-if=\"widget.isHistoryMode\" class=\"history chart-container\">\n        <div dhb-chart data=\"widget.chart\"></div>\n        <div class=\"legend\">Taxes upon workforce costs</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-salaries-summary.tmpl.html","<div widget-hr-salaries-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" />\n\n        <h3 class=\"left\">Average Salary Rate</h3>\n        <div class=\"price\">\n           {{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}\n        </div>\n        <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n        <div class=\"legend\">\n          <span>({{widget.content.total.employees}} employee{{widget.content.total.employees > 1 ? \"s\" : null}} with known salary)</span>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <h3 class=\"right\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/></h3>\n        <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n            <i style=\"float: right; margin-right: 10px;\"><b>{{data.value | mnoCurrency : widget.content.total.currency}} (av.)</b></i>\n            <i ng-hide=\"widget.content.summary.filter==\'age_range\'\" class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n            {{data.label}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-superannuation-accruals.tmpl.html","<div widget-hr-superannuation-accruals>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" />\n\n      <h3>Superannuation Balance</h3>\n      <div class=\"price\">{{getEmployee().total_super | mnoCurrency : getEmployee().currency}}</div>\n      <div class=\"legend\">\n        <span>(from {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}})</span>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-timesheets.tmpl.html","<div widget-hr-timesheets>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" />\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-12\">From {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}</div>\n        </div>\n        <div class=\"row widget-line total\" >\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(\'total_time_worked\')\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(\'total_time_worked\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n            <div class=\"col-sm-7\"><strong>Total Time Worked</strong></div>\n            <div class=\"col-sm-4 text-right\"><strong>{{getEmployeeTimeWorked()}} h</strong></div>\n          </div>\n          <div collapse=\"isCollapsed(\'total_time_worked\')\">\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-11\"><i>Activities detail not found</i></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row widget-line total\" >\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(\'total_time_of\')\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(\'total_time_of\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n            <div class=\"col-sm-7\"><strong>Total Time Off</strong></div>\n            <div class=\"col-sm-4 text-right\"><strong>{{getEmployeeTimeOff()}} h</strong></div>\n          </div>\n          <div collapse=\"isCollapsed(\'total_time_of\')\">\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-7\">PTO</div>\n              <div class=\"col-sm-4 text-right\">0 h</div>\n            </div>\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-7\">Vacation</div>\n              <div class=\"col-sm-4 text-right\">0 h</div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-workforce-summary.tmpl.html","<div widget-hr-workforce-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" />\n\n        <h3 class=\"left\">Total Workforce</h3>\n        <div class=\"price\">\n           {{getTotalWorkforce() | mnoCurrency : getCurrency()}}\n        </div>\n        <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n        <div class=\"legend\">\n          <span>({{getNumberOfEmployees()}} employee{{getNumberOfEmployees() > 1 ? \'s\' : null}} with known salary)</span>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <h3 class=\"right\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/></h3>\n        <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n            <i style=\"float: right; margin-right: 10px;\"><b>{{((data.value / widget.content.total.amount)*100).toFixed()}}%</b></i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n            {{widget.content.summary.filter == \"salary_range\" ? formatSalaryRange(data) : data.label}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/invoices-aged-payables-receivables.tmpl.html","<div widget-invoices-aged-payables-receivables>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-8\">Aged Payables & Receivables</div>\n            <div class=\"col-sm-4 text-right\">{{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}</div>\n          </div>\n\n          <!-- Payables -->\n          <div class=\"row widget-line total\">\n            <div class=\"row widget-line\" ng-class=\"isSelected(widget.content.payables) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(widget.content.payables)\">\n                <i ng-show=\"widget.content.payables.suppliers\" class=\"fa\" ng-class=\"isCollapsed(widget.content.payables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n              </div>\n              <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(widget.content.payables)\">\n                <strong>Aged Payables</strong>\n              </div>\n              <div class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(widget.content.payables)\">\n                <strong>{{getTotalSum(widget.content.payables) | mnoCurrency : widget.content.payables.currency}}</strong>\n              </div>\n            </div>\n            <div ng-hide=\"isCollapsed(widget.content.payables)\">\n              <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(supplier)\" ng-repeat=\"supplier in widget.content.payables.suppliers\" ng-class=\"isSelected(supplier) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{supplier.name}}</div>\n                <div class=\"col-sm-4 text-right\">\n                  <span>{{getTotalSum(supplier) | mnoCurrency : supplier.currency}}</span>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <!-- Receivables -->\n          <div class=\"row widget-line total\">\n            <div class=\"row widget-line\" ng-class=\"isSelected(widget.content.receivables) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(widget.content.receivables)\">\n                <i ng-show=\"widget.content.receivables.customers\" class=\"fa\" ng-class=\"isCollapsed(widget.content.receivables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n              </div>\n              <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(widget.content.receivables)\">\n                <strong>Aged Receivables</strong>\n              </div>\n              <div class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(widget.content.receivables)\">\n                <strong>{{getTotalSum(widget.content.receivables) | mnoCurrency : widget.content.receivables.currency}}</strong>\n              </div>\n            </div>\n            <div ng-hide=\"isCollapsed(widget.content.receivables)\">\n              <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(customer)\" ng-repeat=\"customer in widget.content.receivables.customers\" ng-class=\"isSelected(customer) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{customer.name}}</div>\n                <div class=\"col-sm-4 text-right\">\n                  <span>{{getTotalSum(customer) | mnoCurrency : customer.currency}}</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n        <h4>{{(widget.content.hist_parameters.period || \"Monthly\") | titleize}} Aged Payables and Receivables</h4>\n\n        <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n        <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n\n        <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n          <div class=\"row widget-line\">\n            <div class=\"col-sm-2 text-center\" ng-repeat=\"date in widget.content.dates\" style=\"padding: 5px 0px;\">\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date | date : \'MMM-d\'}}</div></div>\n              <div class=\"row widget-line\">\n                <div class=\"col-sm-12\" style=\"padding: 0px;\">{{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n          <div class=\"widget-line header\">\n            Total from {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}\n          </div>\n\n          <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n            <i style=\"float: right; margin-right: 10px;\">\n              <span>{{getTotalSum(element) | mnoCurrency : element.currency}}</span>\n            </i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n            {{getName(element) | titleize}}\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/invoices-list.accessible.tmpl.html","<div widget-invoices-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <table class=\"table widget-lines-container\" ng-hide=\"widget.isEditMode\">\n\n    <!-- Header line -->\n    <tr class=\"widget-line header\">\n      <td>{{entityTypeCap}}</td>\n      <td>Paid</td>\n      <td>Due</td>\n      <td>Invoiced</td>\n    </tr>\n\n    <!-- Data not found line -->\n    <tr class=\"widget-line\" ng-hide=\"isDataFound\">\n      <td>No {{orderBy}}invoice found for your {{entityType}}</td>\n    </tr>\n    \n    <!-- Content lines -->\n    <tr class=\"widget-line\" ng-show=\"isDataFound\" ng-repeat=\"entity in widget.content.entities\">\n      <td>{{entity.name}}</td>\n      <td><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></td>\n      <td><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></td>\n      <td><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></td>\n    </tr>\n\n  </table>\n\n</div>\n");
$templateCache.put("widgets/invoices-list.tmpl.html","<div widget-invoices-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\" class=\"widget-lines-container\">\n\n    <!-- Header line -->\n    <!-- when large widget -->\n    <div class=\"row widget-line header\" ng-show=\"widget.width > 3\">\n      <div class=\"col-sm-4\">{{entityTypeCap}}</div>\n      <div class=\"col-sm-7\">\n        <div class=\"col-xs-4\">Paid</div>\n        <div class=\"col-xs-4\">Due</div>\n        <div class=\"col-xs-4\">Invoiced</div>\n      </div>\n    </div>\n\n    <!-- when small widget -->\n    <div class=\"row widget-line header\" ng-hide=\"widget.width > 3\">\n      <div class=\"col-xs-7\">{{entityTypeCap}}</div>\n      <div class=\"col-xs-4\" ng-show=\"orderBy == \'paid \'\">Paid</div>\n      <div class=\"col-xs-4\" ng-show=\"orderBy == \'due \'\">Due</div>\n      <div class=\"col-xs-4\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\">Invoiced</div>\n    </div>\n\n    <!-- Data not found line -->\n    <div class=\"row widget-line\" ng-hide=\"isDataFound\">\n      <div class=\"col-xs-11\">No {{orderBy}}invoice found for your {{entityType}}</div>\n    </div>\n\n    <!-- Content lines -->\n    <!-- when large widget -->\n    <div ng-if=\"widget.width > 3\" class=\"row widget-line\" ng-show=\"isDataFound\" ng-repeat=\"entity in widget.content.entities\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getInvoices(entity)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n      <div class=\"col-sm-4\">{{entity.name}}</div>\n      <div class=\"col-sm-7\">\n        <div class=\"col-xs-4\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n        <div class=\"col-xs-4\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n        <div class=\"col-xs-4\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n      </div>\n      <div class=\"col-sm-1\"><i class=\"fa fa-info-circle\" /></div>\n    </div>\n\n    <!-- when small widget -->\n    <div ng-if=\"widget.width <= 3\" class=\"row widget-line\" ng-show=\"isDataFound\" ng-repeat=\"entity in widget.content.entities\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getInvoices(entity)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n      <div class=\"col-xs-7\">{{entity.name}}</div>\n      <div class=\"col-xs-4\" ng-show=\"orderBy == \'paid \'\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-4\" ng-show=\"orderBy == \'due \'\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-4\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n      <div><i class=\"fa fa-info-circle\" /></div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("widgets/invoices-summary.tmpl.html","<div widget-invoices-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-chart-filters parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n    <div class=\"chart-container\" ng-if=\"isDataFound\">\n      <div dhb-chart data=\"widget.chart\"></div>\n      <div class=\"legend\">\n        <span>{{widget.content.legend}}</span>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-aged.tmpl.html","<div widget-sales-aged>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"center\">\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload truncate-no=\"60\" style=\"text-align: center;\"/>\n\n      <div class=\"chart-container\">\n        <div dhb-chart data=\"widget.chart\"></div>\n      </div>\n      <div class=\"legend\">From {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n\n      <div class=\"widget-lines-container\">\n        <!-- <div class=\"row widget-line\"> -->\n          <div class=\"col-sm-2 text-center\" ng-repeat=\"date in formattedDates track by $index\" style=\"padding: 5px 0px;\">\n            <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date}}</div></div>\n            <div class=\"row widget-line\">\n            <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" style=\"padding: 0px;\">\n              {{getTotal($index) | mnoCurrency : widget.content.currency : false}}\n              <br />\n              {{widget.content.currency}}\n            </div>\n            <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" style=\"padding: 0px;\">\n              {{getTotal($index)}}\n            </div>\n          </div>\n        <!-- </div> -->\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-break-even.tmpl.html","<div widget-sales-break-even>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"align-center\">\n\n      <div class=\"legend\">From {{widget.content.period.from | date : \'d MMM yyyy\'}} to {{widget.content.period.to | date : \'d MMM yyyy\'}}</div>\n\n      <div class=\"block to-date\">\n        <div class=\"title\">Sales to Date</div>\n        <div class=\"price\">{{widget.content.sales.to_date | mnoCurrency : widget.content.currency : false}}</div>\n        Target: <span class=\"edit-target\" style=\"float: right;\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"widget.updateSettings()\">\n          {{threshold | mnoCurrency : widget.content.currency : false}}\n        </span>\n      </div>\n\n      <div ng-show=\"widget.content.break_even\" class=\"block to-breakeven\">\n        <div class=\"title\">Projection to Break-Even</div>\n        <span ng-show=\"isTargetMet()\">Your sales already exceed your target by:</span>\n        <div class=\"price\">{{getVariance() | mnoCurrency : widget.content.currency : false}}</div>\n        <span ng-hide=\"isTargetMet()\">\n          Projected date: <span style=\"float: right;\">{{getProjectedDate() | date : \'d-MM-yy\'}}</span>\n          <br />\n          Opportunities to close: <span style=\"float: right;\">{{getOpportunitiesToClose()}}</span>\n        </span>\n      </div>\n      <div ng-show=\"widget.content.break_even\" class=\"legend\">{{widget.content.break_even.eligible_opportunities}} eligible opportunities</div>\n\n      <div ng-hide=\"widget.content.break_even\" class=\"block to-breakeven\">\n        <span class=\"edit-target\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"widget.updateSettings()\">\n          <div class=\"define-text\">Click to define your sales target</div>\n        </span>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-comparison.tmpl.html","<div widget-sales-comparison>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n        <div class=\"row legend center\">\n          Compare by: <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"criteria\" options=\"criteriaOptions\" selected=\"criteria\" truncate-no=\"30\" />\n           ---\n          See: <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" truncate-no=\"30\" no-reload />\n        </div>\n\n        <div class=\"widget-lines-container\" style=\"max-height: 530px;\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-12\">Total sales from {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.sales_comparison\" >\n            <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(statement)\"><i ng-show=\"statement.sales\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{statement.name | titleize}}</strong></div>\n              <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getTotalForPeriod(statement)}}</strong></div>\n              <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getTotalForPeriod(statement) | mnoCurrency : statement.currency}}</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(statement)\">\n              <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(sale)\" ng-repeat=\"sale in statement.sales\" ng-class=\"isSelected(sale) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{sale.name}}</div>\n                <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\">{{getTotalForPeriod(sale)}}</div>\n                <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\">{{getTotalForPeriod(sale) | mnoCurrency : sale.currency}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n        <div class=\"chart-container\" ng-if=\"selectedElements.length > 0 && widget.isExpanded()\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-12\">Total sales from {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n          </div>\n          <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n            <i ng-show=\"filter.value == \'quantity_sold\'\" style=\"float: right; margin-right: 10px;\">{{getTotalForPeriod(element)}}</i>\n            <i ng-hide=\"filter.value == \'quantity_sold\'\" style=\"float: right; margin-right: 10px;\">{{getTotalForPeriod(element) | mnoCurrency : element.currency}}</i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n            {{element.name | titleize}}\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-customer-details.tmpl.html","<div widget-sales-customer-details>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" />\n        <div setting-param-selector parent-widget=\"widget\" param=\"customer_uid\" options=\"customersOptions\" selected=\"selectedCustomer\" class=\"row title\" />\n\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Email</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().email}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Phone</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().phone}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Website</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().website}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Contact</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().contact}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>City</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().city}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Country</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().country}}</pre></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <div class=\"details-container\">\n          <div class=\"row\" style=\"border-bottom: solid 1px #e6e6e6; margin-bottom: 10px; padding-bottom: 5px;\">\n            <div class=\"col-md-3\"><label>Address</label></div>\n            <div class=\"col-md-9\"><pre>{{formatAddress(getCustomer().full_address)}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12 center legend\">From {{getFromDate() | date : \'d MMM yyyy\'}} to {{getToDate() | date : \'d MMM yyyy\'}}:</div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total invoiced</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_invoiced | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total paid</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_paid | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total due</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_due | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-cycle.tmpl.html","<div widget-sales-cycle>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n    <div class=\"chart-container\" ng-if=\"isDataFound\">\n      <div dhb-chart data=\"widget.chart\"></div>\n      <div class=\"legend\">\n        <span>Your sales cycle represents how much time your leads stay set to each status</span>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-forecast.tmpl.html","<div widget-sales-forecast>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" >\n\n      <div class=\"chart-container\">\n        <div dhb-chart data=\"widget.chart\"></div>\n      </div>\n\n      <div class=\"widget-lines-container\" style=\"max-height: 340px;\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-12\">Projection on the next 6 months</div>\n        </div>\n        <div class=\"row widget-line total\" ng-repeat=\"date in widget.content.dates.slice(6) track by $index\" ng-init=\"collapsed = true\" >\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-6\" ng-click=\"collapsed = !collapsed\">{{date | date : \'MMMM yyyy\'}}</div>\n            <div class=\"col-sm-6 text-right\"><strong>{{widget.content.totals.slice(6)[$index] | mnoCurrency : widget.content.currency}}</strong></div>\n          </div>\n          <div collapse=\"collapsed\">\n            <div class=\"row widget-line\" ng-repeat=\"opp in widget.content.opportunities.slice(6)[$index]\" >\n              <div class=\"col-sm-6\">{{opp.name}}</div>\n              <div class=\"col-sm-6 text-right\">{{getOpportunityAmount(opp) | mnoCurrency : getOpportunityCurrency(opp)}}</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-growth.tmpl.html","<div widget-sales-growth>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"selector\">\n        <div setting-param-selector parent-widget=\"widget\" param=\"product\" options=\"productOptions\" selected=\"product\"/>\n        <div ng-show=\"product.value != -1\" setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/>\n      </div>\n\n      <div class=\"chart-container\" ng-if=\"isDataFound && product.value != -1\">\n        <div dhb-chart data=\"widget.chart\"></div>\n      </div>\n\n      <div ng-show=\"product.value != -1\" class=\"legend text-center\">{{getSelectedProduct().name}}</div>\n      <div class=\"price text-center\" ng-hide=\"isDataQuantity || product.value == -1\" tooltip=\"total for last period\">{{getCurrentValue() | mnoCurrency : getSelectedProduct().currency}}</div>\n      <div class=\"price text-center\" ng-show=\"isDataQuantity && product.value != -1\" tooltip=\"total for last period\">{{getCurrentValue()}}</div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-leads-funnel.tmpl.html","<div widget-sales-leads-funnel>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n        <div class=\"legend\">Your leads sales funnel from {{widget.content.from | date : \'d MMM yyyy\'}} to {{widget.content.to | date : \'d MMM yyyy\'}}</div>\n\n        <div class=\"funnel-container\">\n          <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toogleSelectStatus(elem.status)\">\n            <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n            <div class=\"main-text\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedStatus\" class=\"currency\">\n          Select a status to display a list of the corresponding leads\n        </div>\n\n        <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n          <div class=\"row widget-line total\" ng-repeat=\"lead in getSelectedLeads()\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getLeadDescription(lead)}}\" tooltip-animation=\"false\"  tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-7\">\n                {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n                <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n              </div>\n              <div class=\"col-sm-5 text-right\"><strong>{{lead.lead_status | titleize}}</strong></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-leads-list.tmpl.html","<div widget-sales-leads-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line total\" ng-repeat=\"lead in widget.content.leads\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getLeadDescription(lead)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-7\">\n              {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n              <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n            </div>\n            <div class=\"col-sm-5 text-right\"><strong>{{lead.lead_status | titleize}}</strong></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-list.tmpl.html","<div widget-sales-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"selector\">\n        See: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/> for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n        ({{widget.content.hist_parameters.from | date : \"d MMM\"}} to {{widget.content.hist_parameters.to | date : \"d MMM\"}})\n      </div>\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line total\" ng-repeat=\"company in widget.content.summary\" >\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(company.name)\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(company.name) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n            <div class=\"col-sm-7\"><strong>{{company.name | titleize}}</strong></div>\n            <div class=\"col-sm-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\"><strong>{{company.total}}</strong></div>\n            <div class=\"col-sm-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\"><strong>{{company.total | mnoCurrency : company.currency}}</strong></div>\n          </div>\n          <div collapse=\"isCollapsed(company.name)\">\n            <div class=\"row widget-line\" ng-repeat=\"product in company.products\" >\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-7\">{{product.name | titleize}}</div>\n              <div class=\"col-sm-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\"><strong>{{product.total}}</strong></div>\n              <div class=\"col-sm-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\"><strong>{{product.total | mnoCurrency : product.currency}}</strong></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-margin.tmpl.html","<div widget-sales-margin>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget= \"widget\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">\n           {{ getTotalMargin() | mnoCurrency : getCurrency()}}\n        </div>\n        <div class=\"legend\">\n          Total sold - Total purchased\n          </br>\n          {{getTimeSpan()}}\n          </br>\n          <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload />\n        </div>\n      </div>\n\n      <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n      <div ng-if=\"widget.isHistoryMode\" class=\"history chart-container\">\n        <div dhb-chart data=\"widget.chart\"></div>\n        <div class=\"legend\">Total sold - Total purchased</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-number-of-leads.tmpl.html","<div widget-sales-number-of-leads>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"align-center\">\n      <div class=\"selector\">\n        Leads for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n      </div>\n\n      <div class=\"stats\">\n        <div class=\"stat row align-left\" ng-repeat=\"carac in [\'new\', \'converted\', \'lost\']\">\n          <div class=\"col-md-6 title\" style=\"padding: 0px;\">{{carac | titleize}}</div>\n          <div class=\"col-md-6\" style=\"padding: 0px;\">\n            <span class=\"variation\" ng-class=\"formatNumberOfLeads(carac).color\">{{formatNumberOfLeads(carac).variation}}</span>\n            <span class=\"nominal\">{{formatNumberOfLeads(carac).nominal}}</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"legend\">\n      {{widget.content.number_of_leads.total[1]}} leads in total\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-opportunities-funnel.tmpl.html","<div widget-sales-opportunities-funnel>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"sales_stage_selection\" parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\': \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n        <div class=\"legend\">Your opportunities, sorted by sales stage</div>\n\n        <div class=\"funnel-container\">\n          <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toogleSelectStatus(elem.status)\">\n            <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n            <div class=\"main-text\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedStatus\" class=\"currency\">\n          Select a sales stage to display a list of the corresponding opportunities\n        </div>\n\n        <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n          <div class=\"row widget-line total\" ng-repeat=\"opp in getSelectedOpportunities()\">\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-6\">\n                {{opp.name | titleize}}\n              </div>\n              <div class=\"col-sm-6 text-right\"><strong>{{getOppDetails(opp)}}</strong></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-performance.tmpl.html","<div widget-sales-performance>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"widget-lines-container\" style=\"max-height: 235px;\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-4\">Users/Teams</div>\n          <div class=\"col-sm-4 text-right\">Win ratio</div>\n          <div class=\"col-sm-4 text-right\">Total won</div>\n        </div>\n        <div class=\"row widget-line total\" ng-repeat=\"assignee in widget.content.assignees\" ng-init=\"collapsed=true\">\n          <div class=\"row widget-line\" style=\"cursor: pointer;\" ng-click=\"collapsed=!collapsed\">\n            <div class=\"col-sm-4\"><strong>{{assignee.name | titleize}}</strong></div>\n            <div class=\"col-sm-4 text-right\"><strong>{{assignee.win_ratio}} %</strong></div>\n            <div class=\"col-sm-4 text-right\"><strong>{{assignee.total_won | mnoCurrency : \'AUD\'}}</strong></div>\n          </div>\n          <div collapse=\"collapsed\">\n            <div class=\"row widget-line\" ng-repeat=\"opp in assignee.opportunities\">\n              <div class=\"col-sm-4\">{{opp.name}}</div>\n              <div class=\"col-sm-4 text-right\">{{opp.sales_stage}}</div>\n              <div class=\"col-sm-4 text-right\">{{getOpportunityAmount(opp)}}</div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-segmented-turnover.tmpl.html","<div widget-sales-segmented-turnover>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\"></div>\n\n        <div class=\"selector\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/></div>\n        <div class=\"chart-container\" ng-if=\"isDataFound\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"widget-line\">\n            Average price range\n          </div>\n          <div class=\"widget-line\" ng-repeat=\"range in widget.content.ranges\">\n            <i style=\"float: right; margin-right: 10px;\">{{range.percentage}}%</i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n            {{getRangeLabel(range.label)}}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <i class=\"fa fa-info-circle\" style=\"float: left;\" tooltip=\"This widget segments your revenue by products average price range and propose an analysis of its composition\" />\n        <h3 style=\"margin: 25px 10px; text-align: center;\">{{getMaxRange().percentage.toFixed()}}% of your revenue comes from products sold at an average price between {{getMaxRange().label.split(\'-\')[0] | mnoCurrency : widget.content.currency}} and {{getMaxRange().label.split(\'-\')[1] | mnoCurrency : widget.content.currency}}.</h3>\n        <div class=\'analysis hidden-md\' >{{getAnalysis()}}</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-summary.tmpl.html","<div widget-sales-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n    <div setting-chart-filters parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"selector\">\n      See: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/>\n      for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n      ({{widget.content.hist_parameters.from | date : \'d MMM\'}} to {{widget.content.hist_parameters.to | date : \'d MMM\'}})\n    </div>\n\n    <div class=\"chart-container\" ng-if=\"isDataFound && !incorrectPeriod\">\n      <div dhb-chart data=\"widget.chart\"></div>\n    </div>\n\n    <div class=\"data-not-found\" ng-if=\"incorrectPeriod\">\n      <div class=\"message\">No data found for this period<br/> Please select another one</div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-top-opportunities.tmpl.html","<div widget-sales-top-opportunities>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"legend\">\n        Total potential: <b>{{widget.content.total_potential | mnoCurrency : widget.content.currency || \"AUD\"}}</b> - <b>{{widget.content.eligible_opportunities}}</b> eligible opportunities\n      </div>\n\n      <div class=\"opps-container\">\n        <div class=\"tile\" ng-repeat=\"opp in widget.content.opportunities track by $index\" ng-class=\"getOppClass($index)\">\n          <div class=\"colored-area\">{{$index +1 }}</div>\n          <div class=\"main-text\">\n            {{opp.name | titleize}}\n            <br />\n            <i style=\"font-size: 13px;\">{{getOppDetails(opp)}}</i>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n    \n</div>");
$templateCache.put("widgets-settings/account.tmpl.html","<h5>{{label}}</h5>\n<div class=\"input-group settings select-account\">\n	<select ng-model=\"parentWidget.selectedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in parentWidget.content.account_list track by account.uid\" class=\"form-control\" />\n</div>");
$templateCache.put("widgets-settings/chart-filters.tmpl.html","<div class=\"settings chart-filters\">\n  <h5>Chart filters</h5>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <input type=\"radio\" ng-model=\"filterCriteria\" value=\"number\">\n      <label for=\"number\" ng-click=\"filterCriteria = \'number\'\">Top {{filterValueNumber}} {{entityType}}</label>\n    </div>\n    <div class=\"col-md-6\">\n      <input type=\"range\" ng-model=\"filterValueNumber\" ng-change=\"filterCriteria = \'number\'\" min=\"3\" max=\"{{maxEntities}}\" step=\"1\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <input type=\"radio\" ng-model=\"filterCriteria\" value=\"percentage\">\n      <label for=\"percentage\" ng-click=\"filterCriteria = \'percentage\'\">Top {{filterValuePercentage}}% {{filterLabel}}</label>\n    </div>\n    <div class=\"col-md-6\">\n      <input type=\"range\" ng-model=\"filterValuePercentage\" ng-change=\"filterCriteria = \'percentage\'\" min=\"20\" max=\"100\" step=\"5\">\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/hist-mode.tmpl.html","<div class=\"settings hist-mode-choser\">\n  <div align=\"center\" class=\"options\">\n    <a ng-click=\"toogleHistMode(\'current\')\" ng-class=\"!parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">current</a> |\n    <a ng-click=\"toogleHistMode(\'history\')\" ng-class=\"parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">history</a>\n  </div>\n  <div class=\"{{parentWidget.isHistoryMode ? \'arrow-container right\' : \'arrow-container left\'}}\">\n    <div class=\"arrow\" />\n    <div class=\"arrow-border\" />\n  </div>\n</div>");
$templateCache.put("widgets-settings/organizations.tmpl.html","<div class=\"settings organizations\">\n  <h5>Select Companies</h5>\n\n  <div class=\"widget-lines-container\">\n    <div class=\"widget-line\" ng-repeat=\"org in dashboardOrganizations\">\n      {{org.label}}\n      <i ng-class=\"isOrganizationSelected(org.uid) ? \'fa fa-toggle-on\' : \'fa fa-toggle-off\'\" ng-click=\"toogleSelectOrganization(org.uid)\" tooltip=\"{{isOrganizationSelected(org.uid) ? \'disable\' : \'enable\'}}\" tooltip-append-to-body=\"true\" />\n    </div>\n  </div>\n</div>");
$templateCache.put("widgets-settings/param-selector.tmpl.html","<span class=\"settings param-selector\">\n	<a ng-click=\"toogleShowOptions()\">{{selected.label | titleize | truncate : getTruncateValue() : \"...\" : false}} <i class=\"fa fa-chevron-down\" /></a>\n	<div class=\"options-container\" collapse=\"!showOptions\">\n		<div ng-repeat=\"option in options\" ng-click=\"selectOption(option)\">\n			{{option.label | titleize}}\n		</div>\n	</div>\n</span>");
$templateCache.put("widgets-settings/params-picker.tmpl.html","<h5>{{formattedParam | titleize}}</h5>\n<div class=\"settings params-picker\">\n  <div style=\"margin-bottom: 8px;\">\n    The selected criteria will be displayed in this order (drag/drop to modify):\n  </div>\n  <div ui:sortable=\"sortableOptions\" ng-model=\"options\" class=\"input-group\">\n    <span ng-repeat=\"parameter in options track by $index\" class=\"parameter\" ng-class=\"!parameter.selected ? \'unchecked\' : \'\'\">\n      <span class=\"badge\">{{$index + 1}}</span>\n      {{parameter.label | titleize}}\n      <input type=\"checkbox\" ng-model=\"parameter.selected\" />\n    </span>\n  </div>\n</div>");
$templateCache.put("widgets-settings/time-range.tmpl.html","<h5>Time range</h5>\n<div class=\"settings time-range\">\n	<div class=\"row\">\n	  <div class=\"col-md-12\">\n	    Show last {{numberOfPeriods}} {{periodToUnit()}}\n	  </div>\n	</div>\n	<div class=\"row input-group\" align=\"center\" style=\"margin: 0; margin-top: 3px;\">\n	  <div class=\"col-xs-6\" style=\"padding: 0; padding-right: 5px;\">\n	    <select ng-model=\"selectedPeriod\" ng-options=\"period.toLowerCase() for period in PERIODS track by period\" class=\"form-control\" style=\"height: 22px; margin-top: 0; padding: 0; padding-left: 1px; padding-bottom: 1px;\"></select>\n	  </div>\n	  <div class=\"col-xs-6\" style=\"padding: 0;\">\n	    <input type=\"range\" ng-model=\"numberOfPeriods\" min=\"1\" max=\"12\" step=\"1\">\n	  </div>\n	</div>\n</div>");
$templateCache.put("widgets-settings/width.tmpl.html","<i class=\"fa fa-angle-double-left reduce\" ng-show=\"expanded\" ng-click=\"parentWidget.toogleExpanded()\" tooltip=\"reduce\"/>\n<i class=\"fa fa-angle-double-right expand\" ng-hide=\"expanded\" ng-click=\"parentWidget.toogleExpanded()\" tooltip=\"expand\"/>");}]);
}());
(function () {
'use strict';
angular.module('impac.services.analytics', []).factory('DhbAnalyticsSvc', ["$http", "$q", "$window", "$timeout", "$log", "ImpacLinking", "ImpacRoutes", function($http, $q, $window, $timeout, $log, ImpacLinking, ImpacRoutes) {
  var self, service;
  self = service = {};
  service.defaultConfig = {
    delay: 1000 * 60 * 10
  };
  service.config = {
    id: null,
    organizationId: null,
    timerId: null,
    $q: null
  };
  service.data = [];
  service.organizations = [];
  service.isLocked = false;
  service.getOrganizations = function() {
    return ImpacLinking.getOrganizations().then(function(success) {
      service.organizations = success.organizations;
      if (success.currentOrgId) {
        return service.config.organizationId = success.currentOrgId;
      } else if ((service.organizations != null) && service.organizations.length > 0) {
        return service.config.organizationId = service.organizations[0].id;
      }
    });
  };
  service.getOrganizationId = function() {
    return service.config.organizationId;
  };
  service.getOrganizations();
  service.getId = function() {
    if (!service.config.id && service.data.length > 0) {
      return service.config.id = service.data[0].id;
    } else {
      return service.config.id;
    }
  };
  service.getDashboards = function() {
    return service.data;
  };
  service.configure = function(opts) {
    return angular.extend(service.config, opts);
  };
  service.load = function() {
    var deferred;
    deferred = $q.defer();
    service.getOrganizations().then(function() {
      $http.get(ImpacRoutes.baseDhbPath(self.config.organizationId)).then(function(success) {
        angular.copy(success.data, self.data);
        service.config.id = service.data[0].id;
        return deferred.resolve(success.data);
      });
      return function(err) {
        $log.error('impac-angular ERROR: Unable to get dashboards from API: ', err);
        return deferred.reject(err);
      };
    });
    (function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  service.refreshDashboards = function() {
    self = service;
    if (self.config.refreshDashboardsCallback != null) {
      return self.load().then(function() {
        return self.config.refreshDashboardsCallback();
      });
    }
  };
  service.dashboards = {};
  service.dashboards.create = function(opts) {
    var base, data;
    data = {
      dashboard: opts
    };
    (base = data['dashboard'])['organization_id'] || (base['organization_id'] = self.config.organizationId);
    return $http.post(ImpacRoutes.createDhbPath(), data).then(function(success) {
      var dashboard;
      dashboard = success.data;
      self.data.push(dashboard);
      self.config.id = dashboard.id;
      return dashboard;
    });
  };
  service.dashboards["delete"] = function(id) {
    return $http["delete"](ImpacRoutes.deleteDhbPath(id)).then(function(success) {
      var dhbs;
      self.config.id = null;
      dhbs = self.data;
      return self.data = _.reject(self.data, function(e) {
        return e.id === id;
      });
    });
  };
  service.dashboards.update = function(id, opts, overrideCurrentDhb) {
    var data;
    if (overrideCurrentDhb == null) {
      overrideCurrentDhb = true;
    }
    data = {
      dashboard: opts
    };
    return $http.put(ImpacRoutes.updateDhbPath(id), data).then(function(success) {
      var dhb;
      dhb = _.findWhere(self.data, {
        id: id
      });
      if (overrideCurrentDhb) {
        return angular.extend(dhb, success.data);
      }
    }, function(err) {
      return $log.error(err);
    });
  };
  service.widgets = {};
  service.widgets.create = function(dashboardId, opts) {
    var data;
    data = {
      widget: opts
    };
    return $http.post(ImpacRoutes.createWidgetPath(dashboardId), data).then(function(success) {
      var dashboard, widget;
      widget = success.data;
      dashboard = _.findWhere(self.data, {
        id: dashboardId
      });
      dashboard.widgets.push(widget);
      return widget;
    });
  };
  service.widgets.show = function(widget, refresh_cache) {
    if (refresh_cache == null) {
      refresh_cache = false;
    }
    return ImpacLinking.getSsoSession().then(function(ssoSession) {
      var data;
      data = {
        owner: widget.owner,
        sso_session: ssoSession,
        metadata: widget.metadata,
        engine: widget.category
      };
      if (refresh_cache) {
        angular.extend(data, {
          refresh_cache: true
        });
      }
      data.metadata.organization_ids = data.metadata.organization_ids;
      return $http.post(ImpacRoutes.showWidgetPath(), data);
    }, function(error) {
      return $log.error('Unable to retrieve widget data due to session auth fail.', error);
    });
  };
  service.widgets["delete"] = function(widgetId, currentDhb) {
    return $http["delete"](ImpacRoutes.deleteWidgetPath(widgetId)).then(function() {
      return currentDhb.widgets = _.reject(currentDhb.widgets, function(widget) {
        return widget.id === widgetId;
      });
    });
  };
  service.widgets.update = function(widget, opts) {
    var data;
    data = {
      widget: opts
    };
    return $http.put(ImpacRoutes.updateWidgetPath(widget.id), data);
  };
  return service;
}]);
}).call(this);
(function () {
'use strict';
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
(function () {
'use strict';
angular.module('impac.components.chart', []).directive('dhbChart', ["$templateCache", "$compile", "$timeout", function($templateCache, $compile, $timeout) {
  return {
    restrict: 'A',
    scope: {
      data: '='
    },
    template: $templateCache.get('chart/chart.tmpl.html'),
    link: function(scope, elem, attr) {
      var myChart, options;
      options = {
        bezierCurve: true,
        pointDotRadius: 3,
        responsive: true,
        scaleShowLabels: true,
        scaleShowLabelBackdrop: true,
        scaleBeginAtZero: true,
        scaleShowGridLines: true
      };
      myChart = null;
      scope.draw = function() {
        var canvas, ctx, newWidth;
        if (!_.isEmpty(scope.data.options)) {
          angular.extend(options, scope.data.options);
        }
        if (myChart !== null) {
          myChart.destroy();
        }
        canvas = elem.children().get(0);
        ctx = canvas.getContext("2d");
        switch (scope.data.chartType) {
          case 'Bar':
            myChart = new Chart(ctx).Bar(scope.data.data, options);
            break;
          case 'Line':
            myChart = new Chart(ctx).Line(scope.data.data, options);
            break;
          case 'Pie':
            angular.extend(options, {
              tooltipFixed: true
            });
            myChart = new Chart(ctx).Pie(scope.data.data, options);
        }
        return newWidth = angular.element(canvas).parent().width();
      };
      return scope.$watch((function() {
        return scope.data;
      }), function(value) {
        if (value != null) {
          return $timeout((function() {
            return scope.draw();
          }), 100);
        }
      }, true);
    }
  };
}]);
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.dashboard', []);

module.controller('ImpacDashboardCtrl', ["$scope", "$http", "$q", "$filter", "$modal", "$log", "$timeout", "$templateCache", "DhbAnalyticsSvc", "MsgBus", "Utilities", "ImpacAssets", "ImpacTheming", function($scope, $http, $q, $filter, $modal, $log, $timeout, $templateCache, DhbAnalyticsSvc, MsgBus, Utilities, ImpacAssets, ImpacTheming) {
  var modalCreateDashboard, modalDeleteDashboard, modalWidgetSuggestion, saveDashboard, updatePlaceHolderSize;
  $scope.impacTitleLogo = ImpacAssets.get('impacTitleLogo');
  $scope.impacDashboardBackground = ImpacAssets.get('impacDashboardBackground');
  $scope.showDhbHeading = ImpacTheming.get().dhbConfig.showDhbHeading;
  $scope.dhbHeadingText = ImpacTheming.get().dhbConfig.dhbHeadingText;
  $scope.accessibility = false;
  $scope.widgetsList = [];
  $scope.isLoading = true;
  $scope.starWizardModal = {
    value: false
  };
  MsgBus.publish('starWizardModal', $scope.starWizardModal);
  $scope.openStarWizard = function() {
    return $scope.starWizardModal.value = true;
  };
  $scope.refreshDashboards = function() {
    $scope.isLoading = true;
    $scope.dashboardsList = DhbAnalyticsSvc.getDashboards();
    if ($scope.dashboardsList.length && ($scope.dashboardsList[0].widgets_templates != null)) {
      $scope.widgetsList = $scope.dashboardsList[0].widgets_templates;
    }
    $scope.dashboardsList = _.filter($scope.dashboardsList, function(dhb) {
      return _.some(dhb.data_sources, function(org) {
        return org.id === DhbAnalyticsSvc.getOrganizationId();
      });
    });
    $scope.currentDhb = _.where($scope.dashboardsList, {
      id: $scope.currentDhbId
    })[0];
    if (_.isEmpty($scope.currentDhb)) {
      $scope.currentDhb = $scope.dashboardsList[0];
      $scope.currentDhbId = (($scope.currentDhb != null) && $scope.currentDhb.id) || null;
    }
    if (angular.isDefined($scope.currentDhb)) {
      $scope.currentDhb.organizationsNames = _.map($scope.currentDhb.data_sources, function(org) {
        return org.label;
      }).join(", ");
    }
    return $scope.setDisplay();
  };
  DhbAnalyticsSvc.configure({
    refreshDashboardsCallback: $scope.refreshDashboards
  });
  DhbAnalyticsSvc.load().then(function(success) {
    $scope.currentDhbId = DhbAnalyticsSvc.getId();
    return $scope.refreshDashboards();
  });
  $scope.getCurrentDhbWidgetsNumber = function() {
    if ($scope.currentDhb && $scope.currentDhb.widgets) {
      return $scope.currentDhb.widgets.length;
    } else {
      return 0;
    }
  };
  $scope.$watch($scope.getCurrentDhbWidgetsNumber, function(result) {
    return $scope.setDisplay();
  });
  $scope.showWidgetSelector = false;
  $scope.customWidgetSelector = ImpacTheming.get().widgetSelectorConfig;
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
  $scope.setDisplay = function() {
    var aDashboardExists, aWidgetExists, severalDashboardsExist;
    aDashboardExists = $scope.currentDhbId != null;
    severalDashboardsExist = aDashboardExists && $scope.dashboardsList.length > 1;
    if (aDashboardExists) {
      aWidgetExists = $scope.currentDhb.widgets.length > 0;
    } else {
      aWidgetExists = false;
    }
    if (aDashboardExists && !aWidgetExists && !$scope.customWidgetSelector.path) {
      $timeout((function() {
        return $scope.showWidgetSelector = true;
      }), 300);
    }
    $scope.showDashboardsList = false;
    $scope.showChangeDhbName = false;
    $scope.showCreateDhb = true;
    $scope.showDeleteDhb = aDashboardExists;
    $scope.showCreateWidget = aDashboardExists;
    $scope.showChooseDhbMsg = !aDashboardExists;
    $scope.showNoWidgetsMsg = aDashboardExists && !aWidgetExists && ImpacTheming.get().showNoWidgetMessages;
    $scope.canManageWidgets = true;
    return $scope.isLoading = false;
  };
  $scope.selectDashboard = function(dhbId) {
    $scope.currentDhbId = dhbId;
    return $scope.refreshDashboards();
  };
  $scope.toogleShowDashboardsList = function() {
    if ($scope.showChangeDhbName) {
      return;
    }
    if ($scope.dashboardsList.length > 1 || $scope.showCreateDhb) {
      return $scope.showDashboardsList = !$scope.showDashboardsList;
    } else {
      return $scope.showDashboardsList = false;
    }
  };
  $scope.toogleShowChangeDhbName = function(dhb) {
    var tmpDhbCpy;
    tmpDhbCpy = angular.copy(dhb);
    $scope.dashboardToChange = {};
    $scope.dashboardToChange.id = tmpDhbCpy.id;
    $scope.dashboardToChange.name = tmpDhbCpy.full_name;
    $scope.showChangeDhbName = !$scope.showChangeDhbName;
    return $timeout(function() {
      var elem;
      elem = $('#changeDhbNameInput');
      elem.select();
      return elem.focus();
    }, 100);
  };
  $scope.checkChangeDhbNameAndConfirm = function(event) {
    if (event.keyCode === 13) {
      $scope.updateDhbName();
    }
    if (event.keyCode === 27) {
      return $scope.showChangeDhbName = false;
    }
  };
  $scope.updateDhbName = function() {
    if (($scope.dashboardToChange == null) || _.isEmpty($scope.dashboardToChange.name)) {
      return;
    }
    DhbAnalyticsSvc.dashboards.update($scope.dashboardToChange.id, {
      name: $scope.dashboardToChange.name
    });
    _.find($scope.dashboardsList, function(dhb) {
      return dhb.id === $scope.dashboardToChange.id;
    }).full_name = $scope.dashboardToChange.name;
    return $scope.showChangeDhbName = false;
  };
  $scope.hideWidgetSelector = function() {
    return $scope.showWidgetSelector = false;
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
        return aWidgetTemplate.path.split('/')[0] === $scope.selectedCategory;
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
    return DhbAnalyticsSvc.widgets.create($scope.currentDhbId, params).then(function() {
      $scope.errors = '';
      angular.element('#widget-selector').css('cursor', 'auto');
      angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer');
      angular.element('#widget-selector .badge.confirmation').fadeTo(250, 1);
      return $timeout(function() {
        return angular.element('#widget-selector .badge.confirmation').fadeTo(700, 0);
      }, 4000);
    }, function(errors) {
      $scope.errors = Utilities.processRailsError(errors);
      angular.element('#widget-selector').css('cursor', 'auto');
      return angular.element('#widget-selector .top-container .row.lines p').css('cursor', 'pointer');
    })["finally"](function() {
      return $scope.setDisplay();
    });
  };
  $scope.modal = {};
  $scope.modal.createDashboard = modalCreateDashboard = $scope.$new(true);
  $scope.modal.deleteDashboard = modalDeleteDashboard = $scope.$new(true);
  $scope.modal.widgetSuggestion = modalWidgetSuggestion = $scope.$new(true);
  modalCreateDashboard.config = {
    action: 'create',
    instance: {
      backdrop: 'static',
      template: $templateCache.get('dashboard/create.modal.html'),
      size: 'md',
      windowClass: 'inverse connec-analytics-modal',
      scope: modalCreateDashboard
    }
  };
  modalCreateDashboard.open = function() {
    var self;
    self = modalCreateDashboard;
    self.model = {
      name: null
    };
    self.organizations = angular.copy(DhbAnalyticsSvc.organizations);
    self.currentOrganization = _.findWhere(self.organizations, {
      id: DhbAnalyticsSvc.getOrganizationId()
    });
    self.selectMode('single');
    self.$instance = $modal.open(self.config.instance);
    return self.isLoading = false;
  };
  modalCreateDashboard.close = function() {
    return modalCreateDashboard.$instance.close();
  };
  modalCreateDashboard.proceed = function() {
    var dashboard, organizations, self;
    self = modalCreateDashboard;
    self.isLoading = true;
    dashboard = {
      name: self.model.name
    };
    if (self.mode === 'multi') {
      organizations = _.select(self.organizations, function(o) {
        return o.$selected;
      });
    } else {
      organizations = [
        {
          id: DhbAnalyticsSvc.getOrganizationId()
        }
      ];
    }
    if (organizations.length > 0) {
      dashboard.organization_ids = _.pluck(organizations, 'id');
    }
    return DhbAnalyticsSvc.dashboards.create(dashboard).then(function(dashboard) {
      self.errors = '';
      $scope.currentDhbId = dashboard.id;
      return self.close();
    }, function(errors) {
      return self.errors = Utilities.processRailsError(errors);
    })["finally"](function() {
      return $scope.refreshDashboards();
    });
  };
  modalCreateDashboard.proceedDisabled = function() {
    var additional_condition, selectedCompanies, self;
    self = modalCreateDashboard;
    selectedCompanies = _.select(self.organizations, function(o) {
      return o.$selected;
    });
    additional_condition = !self.model.name || self.model.name === '';
    additional_condition || (additional_condition = selectedCompanies.length === 0);
    additional_condition || (additional_condition = _.select(selectedCompanies, function(o) {
      return self.canAccessAnalyticsData(o);
    }).length === 0);
    return self.isLoading || false;
  };
  modalCreateDashboard.btnBlassFor = function(mode) {
    var self;
    self = modalCreateDashboard;
    if (mode === self.mode) {
      return "btn btn-sm btn-warning active";
    } else {
      return "btn btn-sm btn-default";
    }
  };
  modalCreateDashboard.selectMode = function(mode) {
    var self;
    self = modalCreateDashboard;
    _.each(self.organizations, function(o) {
      return o.$selected = false;
    });
    self.currentOrganization.$selected = mode === 'single';
    return self.mode = mode;
  };
  modalCreateDashboard.isSelectOrganizationShown = function() {
    return modalCreateDashboard.mode === 'multi';
  };
  modalCreateDashboard.isCurrentOrganizationShown = function() {
    return modalCreateDashboard.mode === 'single';
  };
  modalCreateDashboard.canAccessAnalyticsForCurrentOrganization = function() {
    var self;
    self = modalCreateDashboard;
    return self.canAccessAnalyticsData(self.currentOrganization);
  };
  modalCreateDashboard.isMultiCompanyAvailable = function() {
    return modalCreateDashboard.organizations.length > 1 && modalCreateDashboard.multiOrganizationReporting;
  };
  modalCreateDashboard.canAccessAnalyticsData = function(organization) {
    return organization.current_user_role && (organization.current_user_role === "Super Admin" || organization.current_user_role === "Admin");
  };
  modalDeleteDashboard.config = {
    action: 'delete',
    instance: {
      backdrop: 'static',
      template: $templateCache.get('dashboard/delete.modal.html'),
      size: 'md',
      windowClass: 'inverse',
      scope: modalDeleteDashboard
    }
  };
  modalDeleteDashboard.open = function() {
    var self;
    self = modalDeleteDashboard;
    self.$instance = $modal.open(self.config.instance);
    return self.isLoading = false;
  };
  modalDeleteDashboard.close = function() {
    return modalDeleteDashboard.$instance.close();
  };
  modalDeleteDashboard.proceed = function() {
    var self;
    self = modalDeleteDashboard;
    self.isLoading = true;
    return DhbAnalyticsSvc.dashboards["delete"]($scope.currentDhbId).then(function() {
      self.errors = '';
      $scope.currentDhbId = DhbAnalyticsSvc.getId();
      return self.close();
    }, function(errors) {
      return self.errors = Utilities.processRailsError(errors);
    })["finally"](function() {
      return $scope.refreshDashboards();
    });
  };
  modalWidgetSuggestion.widgetDetails = {};
  modalWidgetSuggestion.config = {
    instance: {
      backdrop: 'static',
      template: $templateCache.get('dashboard/widget-suggestion.modal.html'),
      size: 'md',
      windowClass: 'inverse impac-widget-suggestion',
      scope: modalWidgetSuggestion
    }
  };
  modalWidgetSuggestion.open = function() {
    var self;
    self = modalWidgetSuggestion;
    self.$instance = $modal.open(self.config.instance);
    return self.isLoading = false;
  };
  modalWidgetSuggestion.close = function() {
    return modalWidgetSuggestion.$instance.close();
  };
  modalWidgetSuggestion.proceed = function() {
    var data, self;
    self = modalWidgetSuggestion;
    self.isLoading = true;
    data = {
      widget_name: self.widgetDetails.name,
      widget_category: self.widgetDetails.category,
      widget_description: self.widgetDetails.description
    };
    $http.post('/js_api/v1/mailers', {
      template: 'widget_suggestion',
      opts: data
    });
    return $timeout(function() {
      self.close();
      self.widgetDetails = {};
      return self.isLoading = false;
    }, 3000);
  };
  return $scope.sortableOptions = {
    stop: saveDashboard = function() {
      var data;
      data = {
        widgets_order: _.pluck($scope.currentDhb.widgets, 'id')
      };
      return DhbAnalyticsSvc.dashboards.update($scope.currentDhbId, data, false);
    },
    start: updatePlaceHolderSize = function(e, widget) {
      widget.placeholder.css("width", widget.item.width() - 1);
      return widget.placeholder.css("height", widget.item.height());
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
      dashboards: '='
    },
    template: $templateCache.get('dashboard/dashboard.tmpl.html'),
    controller: 'ImpacDashboardCtrl'
  };
}]);
}).call(this);
(function () {
'use strict';
angular.module('impac.services.chart-formatter', []).service('ChartFormatterSvc', ["ImpacTheming", function(ImpacTheming) {
  var COLORS, _self, cutHex, hexToB, hexToG, hexToR, hexToRGB, lightenColor;
  _self = this;
  COLORS = ImpacTheming.get().chartColors;
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
  this.lineChart = function(inputDataArray, opts, versusMode) {
    var index;
    if (opts == null) {
      opts = {};
    }
    if (versusMode == null) {
      versusMode = false;
    }
    index = 0;
    return {
      chartType: 'Line',
      options: opts,
      data: {
        labels: inputDataArray[0].labels,
        datasets: _.map(inputDataArray, function(inputData) {
          var color;
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
            fillColor: lightenColor(color, 0.3),
            strokeColor: color,
            pointColor: color,
            pointStrokeColor: color,
            pointHighlightFill: color,
            pointHighlightStroke: lightenColor(color, 0.3)
          };
        })
      }
    };
  };
  this.barChart = function(inputData, opts, positivesOnly) {
    var index;
    if (opts == null) {
      opts = {};
    }
    if (positivesOnly == null) {
      positivesOnly = true;
    }
    index = 0;
    return {
      chartType: 'Bar',
      options: opts,
      data: {
        labels: [""],
        datasets: _.map(inputData.values, function(value) {
          var color;
          color = _self.getColor(index);
          index++;
          if (value == null) {
            value = 0.0;
            color = "rgba(0,0,0,0)";
          }
          if (positivesOnly && value < 0.0) {
            value = -value;
          }
          return {
            label: inputData.labels[index] || "",
            data: [value],
            fillColor: color,
            strokeColor: color,
            highlightFill: color,
            highlightStroke: color
          };
        })
      }
    };
  };
  this.pieChart = function(inputData, opts, versusMode) {
    var index;
    if (opts == null) {
      opts = {};
    }
    if (versusMode == null) {
      versusMode = false;
    }
    index = 0;
    return {
      chartType: 'Pie',
      options: opts,
      data: _.map(inputData, function(data) {
        var color;
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
          value: data.value,
          label: data.label,
          color: color,
          highlight: lightenColor(color, 0.7)
        };
      })
    };
  };
}]);
}).call(this);
(function () {
'use strict';
angular.module('impac.components.dashboard-selector', []).directive('dashboardSelector', ["$log", "$compile", "$templateCache", "$http", "ImpacTheming", function($log, $compile, $templateCache, $http, ImpacTheming) {
  return {
    restrict: 'E',
    scope: {},
    controller: ["$scope", function($scope) {
      $scope.dhbCtrl = $scope.$parent;
      $scope.$watch('dhbCtrl.dashboardsList', function(dashboards) {
        if (!dashboards || !dashboards.length) {
          return;
        }
        return _.forEach(dashboards, function(dhb) {
          return dhb.active = false;
        });
      });
      $scope.$watch('dhbCtrl.currentDhbId', function(newVal) {
        if (!newVal) {
          return;
        }
        return _.forEach($scope.dhbCtrl.dashboardsList, function(dhb) {
          if (dhb.id === newVal) {
            return dhb.active = true;
          }
        });
      }, true);
      $scope.toogleAccessibilityMode = function() {
        $scope.dhbCtrl.accessibility = !$scope.dhbCtrl.accessibility;
        return angular.forEach($scope.dhbCtrl.currentDhb.widgets, function(w) {
          return w.loadContent();
        });
      };
      return $scope;
    }],
    link: function(scope, element, attrs) {
      var _compile, customUrl, getCustomTemplate, getTemplate, options, selectorTemplate, setTemplate;
      options = ImpacTheming.get().dhbSelectorConfig;
      scope.isAccessibilityEnabled = options.accessibilityEnabled;
      scope.isAddWidgetEnabled = options.addWidgetEnabled;
      scope.isAddDhbEnabled = options.addDhbEnabled;
      scope.isdeleteDhbEnabled = options.deleteDhbEnabled;
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
(function () {
'use strict';
angular.module('impac.components.kpi', []).directive('impacKpi', ["$log", "Kpis", function($log, Kpis) {
  return {
    restrict: 'EA',
    scope: {
      kpi: '=',
      editMode: '='
    },
    templateUrl: 'kpi/kpi.tmpl.html',
    controller: ["$scope", function($scope) {
      $scope.showEditTarget = false;
      if (!$scope.kpi.data) {
        Kpis.show($scope.kpi);
      }
      $scope.updateName = function() {
        if (!$scope.kpi["static"]) {
          return Kpis.update($scope.kpi, {
            name: $scope.kpi.name
          });
        }
      };
      $scope.updateTarget = function() {
        if (!_.isEmpty($scope.kpi.target.limit)) {
          if (!$scope.kpi["static"]) {
            Kpis.update($scope.kpi, {
              target: $scope.kpi.target
            });
          }
        }
        return $scope.showEditTarget = false;
      };
      $scope.displayEditTarget = function() {
        var base, base1;
        (base = $scope.kpi).target || (base.target = {});
        (base1 = $scope.kpi.target).limit || (base1.limit = "");
        return $scope.showEditTarget = true;
      };
      return $scope.isTargetReverse = function() {
        return ($scope.kpi.target['reverse'] != null) && $scope.kpi.target['reverse'] === 'true';
      };
    }]
  };
}]);
}).call(this);
(function () {
'use strict';
angular.module('impac.services.kpis', []).service('Kpis', ["$log", "$http", "$filter", "$q", "ImpacLinking", "ImpacRoutes", "DhbAnalyticsSvc", function($log, $http, $filter, $q, ImpacLinking, ImpacRoutes, DhbAnalyticsSvc) {
  var _self, formatShowQuery;
  _self = this;
  this.config = {};
  this.load = function(force) {
    var deferred;
    if (force == null) {
      force = false;
    }
    deferred = $q.defer();
    if (_.isEmpty(this.config) || force) {
      ImpacLinking.getSsoSession().then(function(success) {
        _self.config.sso_session = success;
        return deferred.resolve(_self.config);
      }, function(error) {
        $log.error('impac-angular ERROR: Could not retrieve sso_session id');
        return deferred.reject(error);
      });
    } else {
      deferred.resolve(_self.config);
    }
    return deferred.promise;
  };
  formatShowQuery = function(basePath, endpoint, watchable, params) {
    var baseUrl, url;
    baseUrl = [basePath, endpoint, watchable].join('/');
    url = [baseUrl, decodeURIComponent($.param(params))].join('?');
    return url;
  };
  this.index = function(metadata) {
    var deferred;
    if (metadata == null) {
      metadata = null;
    }
    deferred = $q.defer();
    _self.load().then(function(success) {
      var host, params, url;
      params = {};
      params.sso_session = success.sso_session;
      if (metadata != null) {
        params.metadata = metadata;
      }
      host = ImpacRoutes.impacKpisBasePath();
      url = [host, decodeURIComponent($.param(params))].join('?');
      return $http.get(url).then(function(response) {
        return deferred.resolve(response.data);
      }, function(err) {
        $log.error('impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err);
        return deferred.reject(err);
      });
    });
    return deferred.promise;
  };
  this.show = function(kpi) {
    var deferred;
    deferred = $q.defer();
    _self.load().then(function(success) {
      var host, params, url;
      params = {};
      params.sso_session = success.sso_session;
      if (kpi.target != null) {
        params.target = kpi.target;
      }
      if (kpi.settings != null) {
        params.metadata = kpi.settings;
      }
      if (kpi.extra_param != null) {
        params.extra_param = kpi.extra_param;
      }
      switch (kpi.source) {
        case 'impac':
          host = ImpacRoutes.impacKpisBasePath();
          break;
        case 'local':
          host = ImpacRoutes.localKpisBasePath();
      }
      url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params);
      return $http.get(url).then(function(response) {
        kpi.data = response.data.kpi;
        $log.debug('KPI: ', kpi);
        return deferred.resolve(kpi);
      }, function(err) {
        $log.error('impac-angular ERROR: Could not retrieve KPI at: ' + kpi.endpoint, err);
        return deferred.reject(err);
      });
    });
    return deferred.promise;
  };
  this.create = function(endpoint, element_watched, extra_param) {
    var deferred, params, url;
    if (extra_param == null) {
      extra_param = null;
    }
    deferred = $q.defer();
    params = {
      endpoint: endpoint,
      element_watched: element_watched
    };
    if (extra_param != null) {
      params.extra_param = extra_param;
    }
    url = ImpacRoutes.createKpiPath(DhbAnalyticsSvc.getId());
    $http.post(url, params).then(function(success) {
      deferred.resolve(success.data);
      return $log.debug('success adding KPI: ', success);
    }, function(err) {
      deferred.reject(err);
      return $log.error('impac-angular ERROR: Unable to add KPI ', err);
    });
    return deferred.promise;
  };
  this.update = function(kpi, params) {
    var filtered_param, url;
    url = ImpacRoutes.updateKpiPath(kpi.id);
    filtered_param = {};
    if (params.name != null) {
      filtered_param.name = params.name;
    }
    if (params.metadata != null) {
      filtered_param.settings = params.metadata;
    }
    if (params.target != null) {
      filtered_param.target = params.target;
    }
    if (params.extra_param != null) {
      filtered_param.extra_param = params.extra_param;
    }
    if (!_.isEmpty(filtered_param)) {
      return $http.put(url, params).then(function(success) {
        angular.extend(kpi, success.data);
        _self.show(kpi);
        return $log.debug('success updating KPI: ', success);
      }, function(err) {
        return $log.error('impac-angular ERROR: Unable to update KPI ', err);
      });
    }
  };
  return this;
}]);
}).call(this);
(function () {
'use strict';
angular.module('impac.components.kpis-bar', []).directive('kpisBar', ["Kpis", "DhbAnalyticsSvc", function(Kpis, DhbAnalyticsSvc) {
  return {
    restrict: 'E',
    scope: {
      kpis: '='
    },
    templateUrl: 'kpis-bar/kpis-bar.tmpl.html',
    controller: ["$scope", function($scope) {
      $scope.hideAvailableKpis = true;
      $scope.showEditMode = false;
      $scope.keyStats = [
        {
          name: 'Interest %',
          data: {
            real_value: '-15.30'
          },
          "static": true
        }, {
          name: 'Profitability %',
          data: {
            real_value: '8.34'
          },
          "static": true
        }, {
          name: 'Cost of capital',
          data: {
            real_value: '20.00'
          },
          "static": true
        }, {
          name: 'TAX % based on FY14',
          data: {
            real_value: '29.91'
          },
          "static": true
        }, {
          name: 'Super',
          data: {
            real_value: '$479,023'
          },
          "static": true
        }
      ];
      DhbAnalyticsSvc.load().then(function(success) {
        var currentDhb, metadata;
        currentDhb = _.find(success, function(dhb) {
          return dhb.id === DhbAnalyticsSvc.getId();
        });
        metadata = {};
        metadata.organization_ids = _.map(currentDhb.data_sources, function(org) {
          return org.uid;
        });
        return Kpis.index(metadata).then(function(success) {
          $scope.availableKpis = success.kpis;
          return angular.forEach($scope.availableKpis, function(kpi) {
            return kpi.element_watched = kpi.watchables[0];
          });
        });
      });
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
        var extraParam;
        if (kpi.extra_params) {
          extraParam = [];
          angular.forEach(kpi.extra_params, function(ex_param) {
            var param;
            param = {};
            param[ex_param.param] = ex_param.values[0];
            return extraParam.push(param);
          });
        } else {
          extraParam = null;
        }
        return Kpis.create(kpi.endpoint, kpi.element_watched, extraParam).then(function(success) {
          return $scope.kpis.push(success);
        });
      };
      return $scope.toggleEditMode = function() {
        return $scope.showEditMode = !$scope.showEditMode;
      };
    }]
  };
}]);
}).call(this);
(function () {
'use strict';
angular.module('impac.services.linking', []).provider('ImpacLinking', function() {
  var _$get, links, provider;
  provider = this;
  links = {
    ssoSession: null,
    organizations: null
  };
  provider.linkData = function(configData) {
    _.forIn(links, function(value, key) {
      var link;
      link = configData[key];
      if (link == null) {
        throw "Missing core data (" + key + ") to run impac-angular, please refer to impac.services.linking module or impac-angular README.md on required provider configurations.";
      }
      return links[key] = link;
    });
  };
  _$get = function($q) {
    var service;
    service = this;
    service.getSsoSession = function() {
      var deferred;
      deferred = $q.defer();
      links.ssoSession().then(function(ssoSession) {
        return deferred.resolve(ssoSession);
      }, function(error) {
        return deferred.reject(error);
      });
      return deferred.promise;
    };
    service.getOrganizations = function() {
      var deferred;
      deferred = $q.defer();
      links.organizations().then(function(success) {
        return deferred.resolve(success);
      }, function(error) {
        return deferred.reject(error);
      });
      return deferred.promise;
    };
    return service;
  };
  _$get.$inject = ['$q'];
  provider.$get = _$get;
  return provider;
});
}).call(this);
(function () {
'use strict';
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
(function () {
'use strict';
angular.module('impac.services.routes', []).provider('ImpacRoutes', function() {
  var _$get, defaults, provider;
  provider = this;
  defaults = {
    dhbBasePath: '/mnoe/jpi/v1/impac/dashboards',
    widgetBasePath: '/mnoe/jpi/v1/impac/widgets',
    showWidgetPath: 'http://localhost:4000/api/v1/get_widget',
    impacKpisBasePath: 'http://localhost:4000/api/v2/kpis',
    localKpisBasePath: 'mnoe/jpi/v1/impac/kpis'
  };
  provider.configureRoutes = function(configOptions) {
    return angular.extend(defaults, configOptions);
  };
  _$get = function() {
    var service;
    service = this;
    service.baseDhbPath = function(orgId) {
      if (orgId != null) {
        return defaults.dhbBasePath + "?org_id=" + orgId;
      } else {
        return defaults.dhbBasePath;
      }
    };
    service.showDhbPath = function(id) {
      return defaults.dhbBasePath + "/" + id;
    };
    service.createDhbPath = function() {
      return defaults.dhbBasePath;
    };
    service.updateDhbPath = function(id) {
      return service.showDhbPath(id);
    };
    service.deleteDhbPath = function(id) {
      return service.showDhbPath(id);
    };
    service.showWidgetPath = function() {
      return defaults.showWidgetPath;
    };
    service.widgetBasePath = function(id) {
      return defaults.widgetBasePath + "/" + id;
    };
    service.createWidgetPath = function(dashboardId) {
      return (service.showDhbPath(dashboardId)) + "/widgets";
    };
    service.updateWidgetPath = function(id) {
      return service.widgetBasePath(id);
    };
    service.deleteWidgetPath = function(id) {
      return service.widgetBasePath(id);
    };
    service.impacKpisBasePath = function() {
      return defaults.impacKpisBasePath;
    };
    service.localKpisBasePath = function() {
      return defaults.localKpisBasePath;
    };
    service.createKpiPath = function(id) {
      return defaults.dhbBasePath + "/" + id + "/kpis";
    };
    service.updateKpiPath = function(id) {
      return defaults.localKpisBasePath + "/" + id;
    };
    return service;
  };
  _$get.$inject = [];
  provider.$get = _$get;
  return provider;
});
}).call(this);
(function () {
'use strict';
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
      linkUrl: ''
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
    noWidgetMsg: {
      show: true
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
(function () {
'use strict';
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
(function () {
'use strict';
angular.module('impac.services.utilities', []).service('Utilities', function() {
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
            capitalizedAttr = attribute.charAt(0).toUpperCase() + attribute.slice(1);
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
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widget', []);

module.controller('ImpacWidgetCtrl', ["$scope", "$timeout", "$log", "DhbAnalyticsSvc", "Utilities", function($scope, $timeout, $log, DhbAnalyticsSvc, Utilities) {
  var extendDeep, pushMetadata, w;
  extendDeep = function(dst, src) {
    return angular.forEach(src, function(value, key) {
      if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
        return extendDeep(dst[key], value);
      } else {
        return dst[key] = value;
      }
    });
  };
  w = $scope.widget || {};
  w.parentDashboard || (w.parentDashboard = $scope.parentDashboard);
  w.settings = [];
  w.isLoading = true;
  w.hasEditAbility = true;
  w.hasDeleteAbility = true;
  w.loadContent = function(refreshCache) {
    if (refreshCache == null) {
      refreshCache = false;
    }
    w.isLoading = true;
    return DhbAnalyticsSvc.widgets.show(w, refreshCache).then(function(success) {
      var updatedWidget;
      $log.debug('widget loadContent SUCCESS: ', success);
      updatedWidget = success.data;
      updatedWidget.content || (updatedWidget.content = {});
      updatedWidget.originalName = updatedWidget.name;
      angular.extend(w, updatedWidget);
      if ($scope.isAccessibility) {
        w.initialWidth = w.width;
        w.width = 12;
      } else if (w.initialWidth) {
        w.width = w.initialWidth;
      }
      w.initContext();
      w.initSettings();
      w.isLoading = false;
      if (angular.isDefined(w.format)) {
        return w.format();
      }
    }, function(errors) {
      w.errors = Utilities.processRailsError(errors);
      return w.isLoading = false;
    });
  };
  w.initSettings = function() {
    angular.forEach(w.settings, function(setting) {
      return setting.initialize();
    });
    w.isEditMode = false;
    return true;
  };
  w.updateSettings = function(needContentReload) {
    var meta;
    if (needContentReload == null) {
      needContentReload = true;
    }
    meta = {};
    angular.forEach(w.settings, function(setting) {
      return extendDeep(meta, setting.toMetadata());
    });
    if (!_.isEmpty(meta)) {
      pushMetadata(meta, needContentReload);
    }
    return true;
  };
  pushMetadata = function(newMetadata, needContentReload) {
    var data;
    if (needContentReload == null) {
      needContentReload = true;
    }
    if (_.isEmpty(newMetadata)) {
      return;
    }
    data = {
      metadata: newMetadata
    };
    if (needContentReload) {
      w.isLoading = true;
    }
    return DhbAnalyticsSvc.widgets.update(w, data).then(function(success) {
      angular.extend(w, success.data);
      if (needContentReload) {
        return w.loadContent();
      }
    }, function(errors) {
      w.errors = Utilities.processRailsError(errors);
      return w.isLoading = false;
    });
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
      isAccessibility: '='
    },
    controller: 'ImpacWidgetCtrl',
    link: function(scope, element) {
      scope.widgetContentTemplate = function() {
        var splittedPath, templatePath;
        splittedPath = angular.copy(scope.widget.category).split("/");
        splittedPath.splice(2);
        scope.templateName = splittedPath.join("-").replace(/_/g, "-");
        templatePath = "widgets/" + scope.templateName + ".tmpl.html";
        if (scope.isAccessibility) {
          if ($templateCache.get("widgets/" + scope.templateName + ".accessible.tmpl.html")) {
            templatePath = "widgets/" + scope.templateName + ".accessible.tmpl.html";
          }
          scope.templateName = scope.templateName + " accessible";
        }
        return templatePath;
      };
      return scope.isTemplateLoaded = function() {
        return !!$templateCache.get(scope.widgetContentTemplate());
      };
    },
    templateUrl: "widget/widget.tmpl.html"
  };
}]);
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-common.data-not-found', []);

module.directive('commonDataNotFound', ["$templateCache", "ImpacAssets", "ImpacTheming", function($templateCache, ImpacAssets, ImpacTheming) {
  return {
    restrict: 'A',
    scope: {
      widgetEngine: '='
    },
    controller: ["$scope", function($scope) {
      var baseDir, dir;
      $scope.bgImage = '';
      $scope.content = ImpacTheming.get().dataNotFoundConfig;
      baseDir = ImpacAssets.get('dataNotFound');
      if ($scope.widgetEngine && baseDir.length > 0) {
        dir = baseDir.split('');
        dir = dir[dir.length - 1] !== '/' ? dir.concat('/').join('') : dir.join('');
        return $scope.bgImage = dir + $scope.widgetEngine + '.png';
      }
    }],
    template: $templateCache.get('widgets-common/data-not-found.tmpl.html')
  };
}]);
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-common.editable-title', []);

module.controller('CommonEditableTitleCtrl', ["$scope", "DhbAnalyticsSvc", function($scope, DhbAnalyticsSvc) {
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
      return DhbAnalyticsSvc.widgets.update(w, data).then(function(success) {
        w.originalName = w.name;
        return angular.extend(w, success.data);
      }, function() {
        return w.name = w.originalName;
      });
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-common.top-buttons', []);

module.controller('CommonTopButtonsCtrl', ["$scope", "$rootScope", "$log", "DhbAnalyticsSvc", "ImpacAssets", function($scope, $rootScope, $log, DhbAnalyticsSvc, ImpacAssets) {
  var w;
  w = $scope.parentWidget;
  $scope.showCloseActive = false;
  $scope.showEditActive = false;
  $scope.showConfirmDelete = false;
  w.isEditMode = false;
  $scope.deleteWidget = function() {
    return DhbAnalyticsSvc.widgets["delete"](w.id, w.parentDashboard).then(function() {
      return $log.debug('Successfully removed widget!');
    }, function(errors) {
      w.errors = Utilities.processRailsError(errors);
      return $log.error('Error deleting widget: ', errors);
    });
  };
  return $scope.toogleEditMode = function() {
    if (!w.isLoading) {
      if (w.isEditMode) {
        return w.initSettings();
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
      parentWidget: '='
    },
    template: $templateCache.get('widgets-common/top-buttons.tmpl.html'),
    controller: 'CommonTopButtonsCtrl'
  };
}]);
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-accounting-values', []);

module.controller('WidgetAccountsAccountingValuesCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = (w.content != null) && (w.content.accounting != null);
  };
  w.format = function() {
    var all_values_are_positive, data, inputData, options;
    if ($scope.isDataFound) {
      data = angular.copy(w.content.accounting);
      inputData = {
        title: data.type,
        labels: data.dates,
        values: data.values
      };
      all_values_are_positive = true;
      angular.forEach(data.values, function(value) {
        return all_values_are_positive && (all_values_are_positive = value >= 0);
      });
      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false
      };
      return w.chart = ChartFormatterSvc.lineChart([inputData], options);
    }
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsAccountingValues', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsAccountingValuesCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-assets-summary', []);

module.controller('WidgetAccountsAssetsSummaryCtrl', ["$scope", "ChartFormatterSvc", function($scope, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary);
  };
  w.format = function() {
    var pieData, pieOptions;
    if ($scope.isDataFound) {
      pieData = _.map(w.content.summary, function(account) {
        return {
          label: account.label,
          value: account.total
        };
      });
      pieOptions = {
        percentageInnerCutout: 50,
        tooltipFontSize: 12
      };
      return w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions);
    }
  };
  $scope.getCurrency = function() {
    if ($scope.isDataFound) {
      return w.content.currency;
    }
  };
  $scope.getAccountColor = function(anAccount) {
    if ($scope.isDataFound) {
      return ChartFormatterSvc.getColor(_.indexOf(w.content.summary, anAccount));
    }
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 1) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsAssetsSummary', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsAssetsSummaryCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-balance', []);

module.controller('WidgetAccountsBalanceCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.account_list);
  };
  w.format = function() {
    var all_values_are_positive, data, inputData, options;
    if ($scope.isDataFound && (w.selectedAccount != null)) {
      data = angular.copy(w.selectedAccount);
      inputData = {
        title: data.name,
        labels: w.content.dates,
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
      return w.chart = ChartFormatterSvc.lineChart([inputData], options);
    }
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 5) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsBalance', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsBalanceCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-balance-sheet', []);

module.controller('WidgetAccountsBalanceSheetCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, unCollapsedSetting, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
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
      $scope.period = _.find($scope.periodOptions, function(o) {
        return o.value === w.content.period;
      }) || $scope.periodOptions[2];
      $scope.dates = w.content.dates;
      $scope.unCollapsed = w.metadata.unCollapsed || [];
      return $scope.categories = Object.keys(w.content.summary);
    }
  };
  $scope.toogleCollapsed = function(categoryName) {
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
      return w.updateSettings(false);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsBalanceSheet', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsBalanceSheetCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-cash-summary', []);

module.controller('WidgetAccountsCashSummaryCtrl', ["$scope", "ChartFormatterSvc", "$filter", function($scope, ChartFormatterSvc, $filter) {
  var getSettingsCount, selectedElementSetting, unCollapsedSetting, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
      $scope.dates = w.content.dates;
      $scope.unCollapsed = w.metadata.unCollapsed || [];
      if (w.metadata.selectedElement) {
        $scope.selectedElement = _.find(w.content.summary, function(statement) {
          return statement.name === w.metadata.selectedElement.name;
        });
        if (!$scope.selectedElement) {
          angular.forEach(w.content.summary, function(statement) {
            if (statement.accounts != null) {
              return $scope.selectedElement || ($scope.selectedElement = _.find(statement.accounts, function(account) {
                return account.id === w.metadata.selectedElement.id;
              }));
            }
          });
        }
      }
      if ($scope.selectedElement == null) {
        return w.width = 6;
      }
    }
  };
  w.format = function() {
    var all_values_are_positive, data, inputData, labels, options;
    if ($scope.isDataFound && ($scope.selectedElement != null)) {
      data = angular.copy($scope.selectedElement);
      labels = _.map(w.content.dates, function(date) {
        if ((w.metadata.hist_parameters != null) && w.metadata.hist_parameters.period === "YEARLY") {
          return $filter('date')(date, 'yyyy');
        } else if ((w.metadata.hist_parameters != null) && w.metadata.hist_parameters.period === "QUARTERLY") {
          return $filter('date')(date, 'MMM-yy');
        } else if ((w.metadata.hist_parameters != null) && (w.metadata.hist_parameters.period === "WEEKLY" || w.metadata.hist_parameters.period === "DAILY")) {
          return $filter('date')(date, 'dd-MMM');
        } else {
          return $filter('date')(date, 'MMM');
        }
      });
      inputData = {
        title: data.name,
        labels: labels,
        values: data.cash_flows
      };
      all_values_are_positive = true;
      angular.forEach(data.cash_flows, function(value) {
        return all_values_are_positive && (all_values_are_positive = value >= 0);
      });
      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true
      };
      return w.chart = ChartFormatterSvc.lineChart([inputData], options);
    }
  };
  $scope.getLastDate = function() {
    if ($scope.dates != null) {
      return _.last($scope.dates);
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
      return "n/a";
    }
  };
  $scope.getLastVariance = function(element) {
    if ((element.variances != null) && (_.last(element.variances) != null)) {
      return $scope.formatVariance(_.last(element.variances));
    } else {
      return "n/a";
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
      return element.name.replace("_", " ");
    }
  };
  $scope.toogleSelectedElement = function(element) {
    if ($scope.isSelected(element)) {
      $scope.selectedElement = null;
      if (w.isExpanded()) {
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
      }
    } else {
      $scope.selectedElement = angular.copy(element);
      w.format();
      if (!w.isExpanded()) {
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
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
  $scope.toogleCollapsed = function(element) {
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
      return w.updateSettings(false);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 5) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsCashSummary', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsCashSummaryCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-comparison', []);

module.controller('WidgetAccountsComparisonCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.complete_list);
    return $scope.movedAccount = {};
  };
  w.format = function() {
    var inputData, options;
    inputData = {
      labels: [],
      values: []
    };
    _.map(w.selectedAccounts, function(account) {
      inputData.labels.push(account.name);
      return inputData.values.push(account.current_balance);
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
    return w.chart = ChartFormatterSvc.barChart(inputData, options);
  };
  $scope.hasAccountsSelected = function() {
    return w.selectedAccounts && w.selectedAccounts.length > 0;
  };
  $scope.getAccountColor = function(anAccount) {
    return ChartFormatterSvc.getColor(_.indexOf(w.selectedAccounts, anAccount));
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 2) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsComparison', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsComparisonCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-custom-calculation', []);

module.controller('WidgetAccountsCustomCalculationCtrl', ["$scope", "$timeout", "$modal", "DhbAnalyticsSvc", "$templateCache", function($scope, $timeout, $modal, DhbAnalyticsSvc, $templateCache) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    $scope.movedAccount = {};
    return $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.complete_list);
  };
  $scope.addAccountToFormula = function(account) {
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
  $scope.formulaModal = {};
  $scope.formulaModal.config = {
    instance: {
      backdrop: 'static',
      template: $templateCache.get('widgets/accounts-custom-calculation/formula.modal.html'),
      size: 'lg',
      scope: $scope,
      keyboard: false
    }
  };
  $scope.formulaModal.open = function() {
    var self;
    w.settings = angular.copy(_.reject(w.settings, function(elem) {
      return elem.key === "organizations";
    }));
    self = $scope.formulaModal;
    self.$instance = $modal.open(self.config.instance);
    return $timeout(function() {
      return w.initSettings();
    }, 200);
  };
  $scope.$watch((function() {
    return w.selectedOrganizations;
  }), function(result) {
    if (!_.isEmpty(result)) {
      return w.updateSettings();
    }
  }, true);
  $scope.formulaModal.cancel = function() {
    w.initSettings();
    return $scope.formulaModal.close();
  };
  $scope.formulaModal.proceed = function() {
    w.updateSettings(false);
    return $scope.formulaModal.close();
  };
  $scope.formulaModal.close = function() {
    return $scope.formulaModal.$instance.close();
  };
  $scope.$watch((function() {
    return w.isEditMode;
  }), function(result, prev) {
    if (result && !prev) {
      return $scope.formulaModal.open();
    }
  });
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 3 && !$scope.blockLoadContent) {
      w.loadContent();
      return $scope.blockLoadContent = true;
    }
  });
  return w;
}]);

module.directive('widgetAccountsCustomCalculation', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsCustomCalculationCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-expenses-revenue', []);

module.controller('WidgetAccountsExpensesRevenueCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = (w.content != null) && (w.content.values != null);
  };
  w.format = function() {
    var all_values_are_positive, lineData, lineOptions, pieData, pieOptions;
    if ($scope.isDataFound) {
      lineData = [
        {
          title: "Expenses (" + ($scope.getCurrency()) + ")",
          labels: w.content.dates,
          values: w.content.values.expenses
        }, {
          title: "Revenue (" + ($scope.getCurrency()) + ")",
          labels: w.content.dates,
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
      lineOptions = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false
      };
      w.hist_chart = ChartFormatterSvc.lineChart(lineData, lineOptions, true);
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
      return w.cur_chart = ChartFormatterSvc.pieChart(pieData, pieOptions, true);
    }
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsExpensesRevenue', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsExpensesRevenueCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-payable-receivable', []);

module.controller('WidgetAccountsPayableReceivableCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = (w.content != null) && (w.content.values != null);
  };
  w.format = function() {
    var all_values_are_positive, lineData, lineOptions;
    if ($scope.isDataFound) {
      lineData = [
        {
          title: "Payable",
          labels: w.content.dates,
          values: w.content.values.payables
        }, {
          title: "Receivable",
          labels: w.content.dates,
          values: w.content.values.receivables
        }
      ];
      all_values_are_positive = true;
      angular.forEach(w.content.values.payables, function(value) {
        return all_values_are_positive && (all_values_are_positive = value >= 0);
      });
      angular.forEach(w.content.values.receivables, function(value) {
        return all_values_are_positive && (all_values_are_positive = value >= 0);
      });
      lineOptions = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false
      };
      return w.chart = ChartFormatterSvc.lineChart(lineData, lineOptions, true);
    }
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsPayableReceivable', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsPayableReceivableCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-profit-and-loss', []);

module.controller('WidgetAccountsProfitAndLossCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, selectedElementsSetting, unCollapsedSetting, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
      $scope.dates = w.content.dates;
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
  w.format = function() {
    var all_values_are_positive, inputData, options;
    if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
      all_values_are_positive = true;
      inputData = [];
      angular.forEach($scope.selectedElements, function(sElem) {
        var data, labels;
        data = angular.copy(sElem);
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
        pointDot: $scope.selectedElements.length === 1
      };
      return w.chart = ChartFormatterSvc.lineChart(inputData, options);
    }
  };
  $scope.getElementChartColor = function(index) {
    return ChartFormatterSvc.getColor(index);
  };
  $scope.getLastDate = function() {
    if ($scope.dates != null) {
      return _.last($scope.dates);
    }
  };
  $scope.getLastValue = function(element) {
    if (element.totals != null) {
      return _.last(element.totals);
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
  $scope.toogleSelectedElement = function(element) {
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
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
      }
    } else {
      $scope.selectedElements || ($scope.selectedElements = []);
      $scope.selectedElements.push(element);
      w.format();
      if (!w.isExpanded()) {
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
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
  $scope.toogleCollapsed = function(element) {
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
      return w.updateSettings(false);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 5) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsProfitAndLoss', function() {
  return {
    restrict: 'A',
    controller: 'WidgetAccountsProfitAndLossCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-employee-details', []);

module.controller('WidgetHrEmployeeDetailsCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "$filter", function($scope, DhbAnalyticsSvc, Utilities, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = !_.isEmpty(w.content.employees)) {
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
        $scope.period = _.find($scope.periodOptions, function(o) {
          return o.value === w.metadata.period.toLowerCase();
        }) || $scope.periodOptions[0];
      } else {
        $scope.period = $scope.periodOptions[0];
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
      org = _.find(w.parentDashboard.data_sources, function(o) {
        return o.uid === orgUid;
      });
      return org.label;
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrEmployeeDetails', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrEmployeeDetailsCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-employees-list', []);

module.controller('WidgetHrEmployeesListCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "$filter", function($scope, DhbAnalyticsSvc, Utilities, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = !_.isEmpty(w.content.total) && !_.isEmpty(w.content.employees)) {
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
      return $scope.period = _.find($scope.periodOptions, function(o) {
        return o.value === w.content.total.period.toLowerCase();
      }) || $scope.periodOptions[0];
    }
  };
  $scope.getSingleCompanyName = function() {
    var org, orgUid;
    if (w.content && w.content.organizations) {
      orgUid = w.content.organizations[0];
      org = _.find(w.parentDashboard.data_sources, function(o) {
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 2) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrEmployeesList', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrEmployeesListCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-leaves-balance', []);

module.controller('WidgetHrLeavesBalanceCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", function($scope, DhbAnalyticsSvc, Utilities) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = !_.isEmpty(w.content.employees) && !_.isEmpty(w.content.dates)) {
      $scope.employeesOptions = _.map(w.content.employees, function(e) {
        return {
          value: e.id,
          label: e.lastname + " " + e.firstname
        };
      });
      return $scope.selectedEmployee = {
        value: $scope.getEmployee().id,
        label: ($scope.getEmployee().lastname) + " " + ($scope.getEmployee().firstname)
      };
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrLeavesBalance', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrLeavesBalanceCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-leaves-schedule', []);

module.controller('WidgetHrLeavesScheduleCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  $scope.eventSources = [];
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 1) {
      return w.loadContent();
    }
  });
  return w;
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-payroll-summary', []);

module.controller('WidgetHrPayrollSummaryCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, selectedElementsSetting, unCollapsedSetting, w;
  w = $scope.widget;
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
  w.format = function() {
    var all_values_are_positive, inputData, labels, options, pieData, pieOptions;
    if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
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
        pointDot: $scope.selectedElements.length === 1
      };
      w.hist_chart = ChartFormatterSvc.lineChart(inputData, options);
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
        tooltipFontSize: 12
      };
      return w.cur_chart = ChartFormatterSvc.pieChart(pieData, pieOptions);
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
    if (($scope.selectedElements != null) && !_.isEmpty($scope.selectedElements) && ($scope.selectedElements[0].id != null)) {
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
    if (w.content.hist_parameters != null) {
      switch (w.content.hist_parameters.period) {
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
  $scope.toogleSelectedElement = function(element) {
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
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
      }
    } else {
      $scope.selectedElements || ($scope.selectedElements = []);
      $scope.selectedElements.push(element);
      w.format();
      if (!w.isExpanded()) {
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
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
  $scope.toogleCollapsed = function(element) {
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
      return w.updateSettings(false);
    }
  };
  $scope.getPeriod = function() {
    var period, period_param;
    if ($scope.isDataFound && w.content.hist_parameters) {
      period_param = w.content.hist_parameters.period || "MONTHLY";
      period = "day";
      if (period_param !== "DAILY") {
        period = period_param.substr(0, period_param.length - 2).toLowerCase();
      }
      return "last " + period;
    } else {
      return "last MONTH";
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 6) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrPayrollSummary', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrPayrollSummaryCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-payroll-taxes', []);

module.controller('WidgetHrPayrollTaxesCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = (w.content != null) && w.content.total_tax && w.content.dates;
  };
  w.format = function() {
    var all_values_are_positive, inputData, options;
    if ($scope.isDataFound) {
      inputData = {
        title: "Payroll Taxes",
        labels: w.content.dates,
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
      return w.chart = ChartFormatterSvc.lineChart([inputData], options);
    }
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
    if ($scope.isDataFound && w.content.hist_parameters) {
      period_param = w.content.hist_parameters.period || "MONTHLY";
      period = "day";
      if (period_param !== "DAILY") {
        period = period_param.substr(0, period_param.length - 2).toLowerCase();
      }
      return "(current " + period + ")";
    }
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrPayrollTaxes', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrPayrollTaxesCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-salaries-summary', []);

module.controller('WidgetHrSalariesSummaryCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = (w.content.summary != null) && !_.isEmpty(w.content.summary.data)) {
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
      $scope.period = _.find($scope.periodOptions, function(o) {
        return o.value === w.content.total.period.toLowerCase();
      }) || $scope.periodOptions[0];
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
      return $scope.filter = _.find($scope.filterOptions, function(o) {
        return o.value === w.content.summary.filter;
      }) || $scope.filterOptions[0];
    }
  };
  w.format = function() {
    var barData, barOptions, lineData, lineOptions;
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
        return w.chart = ChartFormatterSvc.barChart(barData, barOptions);
      } else if ($scope.filter.value === 'job_title') {
        barOptions = {
          showTooltips: false,
          showXLabels: false,
          barDatasetSpacing: 15
        };
        return w.chart = ChartFormatterSvc.barChart(barData, barOptions);
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
        return w.chart = ChartFormatterSvc.lineChart(lineData, lineOptions);
      }
    }
  };
  $scope.getColorByIndex = function(index) {
    return ChartFormatterSvc.getColor(index);
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrSalariesSummary', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrSalariesSummaryCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-superannuation-accruals', []);

module.controller('WidgetHrSuperannuationAccrualsCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", function($scope, DhbAnalyticsSvc, Utilities) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = !_.isEmpty(w.content.employees) && !_.isEmpty(w.content.dates)) {
      $scope.employeesOptions = _.map(w.content.employees, function(e) {
        return {
          value: e.id,
          label: e.lastname + " " + e.firstname
        };
      });
      return $scope.selectedEmployee = {
        value: $scope.getEmployee().id,
        label: ($scope.getEmployee().lastname) + " " + ($scope.getEmployee().firstname)
      };
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrSuperannuationAccruals', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrSuperannuationAccrualsCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-timesheets', []);

module.controller('WidgetHrTimesheetsCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, unCollapsedSetting, w;
  w = $scope.widget;
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
  $scope.toogleCollapsed = function(categoryName) {
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
      return w.updateSettings(false);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrTimesheets', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrTimesheetsCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-workforce-summary', []);

module.controller('WidgetHrWorkforceSummaryCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = (w.content.summary != null) && !_.isEmpty(w.content.summary.data)) {
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
      $scope.period = _.find($scope.periodOptions, function(o) {
        return o.value === w.content.total.period.toLowerCase();
      }) || $scope.periodOptions[0];
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
      return $scope.filter = _.find($scope.filterOptions, function(o) {
        return o.value === w.content.summary.filter;
      }) || $scope.filterOptions[0];
    }
  };
  w.format = function() {
    var barData, barOptions, pieData, pieOptions;
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
        return w.chart = ChartFormatterSvc.barChart(barData, barOptions);
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
        return w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions);
      }
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetHrWorkforceSummary', function() {
  return {
    restrict: 'A',
    controller: 'WidgetHrWorkforceSummaryCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.invoices-aged-payables-receivables', []);

module.controller('WidgetInvoicesAgedPayablesReceivablesCtrl', ["$scope", "$log", "$filter", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, $log, $filter, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, selectedElementsSetting, unCollapsedSetting, w;
  w = $scope.widget;
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
  w.format = function() {
    var all_values_are_positive, inputData, labels, options;
    if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
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
        pointDot: $scope.selectedElements.length === 1
      };
      return w.chart = ChartFormatterSvc.lineChart(inputData, options);
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
    if ($scope.isDataFound && w.content.hist_parameters) {
      period_param = w.content.hist_parameters.period || "MONTHLY";
      period = "day";
      if (period_param !== "DAILY") {
        period = period_param.substr(0, period_param.length - 2).toLowerCase();
      }
      return "current " + period;
    } else {
      return "current month";
    }
  };
  $scope.toogleSelectedElement = function(element) {
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
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
      }
    } else {
      $scope.selectedElements || ($scope.selectedElements = []);
      $scope.selectedElements.push(element);
      w.format();
      if (!w.isExpanded()) {
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
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
  $scope.toogleCollapsed = function(element) {
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
      return w.updateSettings(false);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 5) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetInvoicesAgedPayablesReceivables', function() {
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesAgedPayablesReceivablesCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.invoices-list', []);

module.controller('WidgetInvoicesListCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "$filter", function($scope, DhbAnalyticsSvc, Utilities, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = !_.isEmpty(w.content.entities);
  };
  $scope.entityType = w.metadata.entity;
  $scope.entityTypeCap = _.capitalize(w.metadata.entity);
  if (w.metadata.order_by === 'name' || w.metadata.order_by === 'total_invoiced') {
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
        paid = " (" + $filter('mnoCurrency')(i.paid, i.currency, false) + " over " + $filter('mnoCurrency')(i.invoiced, i.currency, false) + ")";
      } else {
        paid = " (" + $filter('mnoCurrency')(i.invoiced, i.currency, false) + ")";
      }
      tooltip.push("#" + count + txn + " - " + i.tooltip_status + paid);
      return count++;
    });
    return tooltip.join("<br />");
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 1) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetInvoicesList', function() {
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesListCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.invoices-summary', []);

module.controller('WidgetInvoicesSummaryCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = !_.isEmpty(w.content.summary);
  };
  w.format = function() {
    var pieData, pieOptions;
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
      return w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions);
    }
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total === 2) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetInvoicesSummary', function() {
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesSummaryCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-aged', []);

module.controller('WidgetSalesAgedCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
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
      return $scope.filter = _.find($scope.filterOptions, function(o) {
        return w.metadata && w.metadata.filter === o.value;
      }) || $scope.filterOptions[0];
    }
  };
  w.format = function() {
    var all_values_are_positive, inputData, options, values;
    if ($scope.isDataFound) {
      all_values_are_positive = true;
      inputData = [];
      values = w.content.aged_sales[$scope.filter.value];
      $scope.formattedDates = _.map(w.content.dates, function(date) {
        if (w.metadata && w.metadata.hist_parameters && w.metadata.hist_parameters.period === "YEARLY") {
          return $filter('date')(date, 'yyyy');
        } else if (w.metadata && w.metadata.hist_parameters && w.metadata.hist_parameters.period === "QUARTERLY") {
          return $filter('date')(date, 'MMM-yy');
        } else if (w.metadata && w.metadata.hist_parameters && (w.metadata.hist_parameters.period === "WEEKLY" || w.metadata.hist_parameters.period === "DAILY")) {
          return $filter('date')(date, 'dd-MMM');
        } else {
          return $filter('date')(date, 'MMM');
        }
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
      return w.chart = ChartFormatterSvc.lineChart(inputData, options);
    }
  };
  $scope.$watch((function() {
    return $scope.filter;
  }), function(filter) {
    return w.format();
  }, true);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesAged', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesAgedCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-break-even', []);

module.controller('WidgetSalesBreakEvenCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, thresholdSetting, w;
  w = $scope.widget;
  w.initContext = function() {
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales);
    return $scope.threshold = w.metadata.threshold;
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesBreakEven', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesBreakEvenCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-comparison', []);

module.controller('WidgetSalesComparisonCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, selectedElementsSetting, unCollapsedSetting, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales_comparison) && !_.isEmpty(w.content.dates)) {
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
      $scope.filter = _.find($scope.filterOptions, function(o) {
        return w.metadata && w.metadata.filter === o.value;
      }) || $scope.filterOptions[0];
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
      $scope.criteria = _.find($scope.criteriaOptions, function(o) {
        return w.metadata && w.metadata.criteria === o.value;
      }) || $scope.criteriaOptions[0];
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
  w.format = function() {
    var all_values_are_positive, inputData, options;
    if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
      all_values_are_positive = true;
      inputData = [];
      angular.forEach($scope.selectedElements, function(sElem) {
        var data, labels;
        data = angular.copy(sElem);
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
        inputData.push({
          title: data.name,
          labels: labels,
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
      return w.chart = ChartFormatterSvc.lineChart(inputData, options);
    }
  };
  $scope.$watch((function() {
    return $scope.filter;
  }), function(filter) {
    return w.format();
  }, true);
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
  $scope.toogleSelectedElement = function(element) {
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
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
      }
    } else {
      $scope.selectedElements || ($scope.selectedElements = []);
      $scope.selectedElements.push(element);
      w.format();
      if (!w.isExpanded()) {
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
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
  $scope.toogleCollapsed = function(element) {
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
      return w.updateSettings(false);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 7) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesComparison', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesComparisonCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-customer-details', []);

module.controller('WidgetSalesCustomerDetailsCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "$filter", function($scope, DhbAnalyticsSvc, Utilities, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = !_.isEmpty(w.content.customers)) {
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesCustomerDetails', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesCustomerDetailsCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module = angular.module('impac.components.widgets.sales-cycle', []);

module.controller('WidgetSalesCycleCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
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
  w.format = function() {
    var pieData, pieOptions;
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
        tooltipFontSize: 12
      };
      return w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions);
    }
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesCycle', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesCycleCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-forecast', []);

module.controller('WidgetSalesForecastCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.totals);
  };
  w.format = function() {
    var all_values_are_positive, formattedDates, inputData, options;
    if ($scope.isDataFound) {
      all_values_are_positive = true;
      formattedDates = _.map(w.content.dates, function(aDate) {
        return $filter('date')(aDate, 'MMM-yy');
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
      return w.chart = ChartFormatterSvc.lineChart(inputData, options);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 1) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesForecast', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesForecastCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-growth', []);

module.controller('WidgetSalesGrowthCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  $scope.isDataQuantity = true;
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
  w.initContext = function() {
    if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
      $scope.productOptions = _.flatten(_.map(w.content.summary, function(product) {
        return {
          label: product.code,
          value: product.id
        };
      }));
      $scope.product = _.find($scope.productOptions, function(o) {
        return o.value === w.content.product;
      }) || {
        label: "SELECT PRODUCT",
        value: -1
      };
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
      $scope.filter = _.find($scope.filterOptions, function(o) {
        return o.value === w.content.filter;
      }) || $scope.filterOptions[0];
      return $scope.isDataQuantity = $scope.filter.value.match('quantity');
    }
  };
  w.format = function() {
    var all_values_are_positive, data, inputData, options;
    if ($scope.isDataFound && $scope.product && (data = $scope.getSelectedProduct())) {
      inputData = {
        title: data.name,
        labels: w.content.dates,
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
      return w.chart = ChartFormatterSvc.lineChart([inputData], options);
    }
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesGrowth', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesGrowthCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module = angular.module('impac.components.widgets.sales-leads-funnel', []);

module.controller('WidgetSalesLeadsFunnelCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) {
  var getSettingsCount, selectedStatusSetting, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads_per_status)) {
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
  $scope.getImpacColor = function(index) {
    return ChartFormatterSvc.getColor(index);
  };
  $scope.toogleSelectStatus = function(aStatus) {
    if ($scope.selectedStatus && $scope.selectedStatus === aStatus) {
      $scope.selectedStatus = null;
    } else {
      $scope.selectedStatus = aStatus;
    }
    if (!w.isExpanded() && $scope.selectedStatus) {
      return w.toogleExpanded();
    } else {
      return w.updateSettings(false);
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
    if (angular.isDefined(w.content.leads_per_status[w.metadata.selected_status])) {
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 5) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesLeadsFunnel', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesLeadsFunnelCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-leads-list', []);

module.controller('WidgetSalesLeadsListCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 1) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesLeadsList', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesLeadsListCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-list', []);

module.controller('WidgetSalesListCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
  var getSettingsCount, unCollapsedSetting, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)) {
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
      $scope.period = _.find($scope.periodOptions, function(o) {
        return o.value === w.content.hist_parameters.period;
      }) || $scope.periodOptions[0];
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
      $scope.filter = _.find($scope.filterOptions, function(o) {
        return o.value === w.content.filter;
      }) || $scope.filterOptions[0];
      return $scope.unCollapsed = w.metadata.unCollapsed || [];
    }
  };
  $scope.toogleCollapsed = function(categoryName) {
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
      return w.updateSettings(false);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 3) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesList', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesListCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-margin', []);

module.controller('WidgetSalesMarginCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
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
      return $scope.filter = $scope.filterOptions[1];
    } else {
      return $scope.filter = $scope.filterOptions[0];
    }
  };
  w.format = function() {
    var all_values_are_positive, inputData, options, values;
    if ($scope.isDataFound) {
      if ((w.metadata != null) && w.metadata.filter === "net_margin") {
        values = w.content.margins.net;
      } else {
        values = w.content.margins.gross;
      }
      inputData = {
        title: "Gross margin",
        labels: w.content.dates,
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
      return w.chart = ChartFormatterSvc.lineChart([inputData], options);
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
    if ($scope.isDataFound) {
      return "From " + ($filter('date')(_.first(w.content.dates), 'd MMM yy')) + " to " + ($filter('date')(_.last(w.content.dates), 'd MMM yy'));
    }
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesMargin', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesMarginCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-number-of-leads', []);

module.controller('WidgetSalesNumberOfLeadsCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, getVariation, w;
  w = $scope.widget;
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
      return $scope.period = _.find($scope.periodOptions, function(o) {
        return o.value === w.metadata.period;
      }) || $scope.periodOptions[3];
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 2) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesNumberOfLeads', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesNumberOfLeadsCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module = angular.module('impac.components.widgets.sales-opportunities-funnel', []);

module.controller('WidgetSalesOpportunitiesFunnelCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) {
  var getSettingsCount, selectedStatusSetting, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opps_per_sales_stage)) {
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
  $scope.getImpacColor = function(index) {
    return ChartFormatterSvc.getColor(index);
  };
  $scope.toogleSelectStatus = function(aStatus) {
    if ($scope.selectedStatus && $scope.selectedStatus === aStatus) {
      $scope.selectedStatus = null;
    } else {
      $scope.selectedStatus = aStatus;
    }
    if (!w.isExpanded() && $scope.selectedStatus) {
      return w.toogleExpanded();
    } else {
      return w.updateSettings(false);
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
    if (angular.isDefined(w.content.opps_per_sales_stage[w.metadata.selected_status])) {
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesOpportunitiesFunnel', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesOpportunitiesFunnelCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-performance', []);

module.controller('WidgetSalesPerformanceCtrl', ["$scope", "DhbAnalyticsSvc", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.assignees);
  };
  $scope.getOpportunityAmount = function(anOpp) {
    var amount;
    if ($scope.isDataFound && !_.isEmpty(anOpp)) {
      if (anOpp.amount && anOpp.amount.amount) {
        amount = anOpp.amount.amount;
        return $filter('mnoCurrency')(amount, anOpp.amount.currency || 'AUD');
      } else {
        return '-';
      }
    }
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 1) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesPerformance', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesPerformanceCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-segmented-turnover', []);

module.controller('WidgetSalesSegmentedTurnoverCtrl', ["$scope", "$filter", "ChartFormatterSvc", function($scope, $filter, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.ranges)) {
      $scope.filterOptions = [
        {
          label: 'Gross revenue (incl. taxes)',
          value: 'gross'
        }, {
          label: 'Net revenue (excl. taxes)',
          value: 'net'
        }
      ];
      return $scope.filter = _.find($scope.filterOptions, function(o) {
        return o.value === w.content.filter;
      }) || $scope.filterOptions[0];
    }
  };
  w.format = function() {
    var barData, barOptions;
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
      return w.chart = ChartFormatterSvc.barChart(barData, barOptions);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesSegmentedTurnover', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesSegmentedTurnoverCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-summary', []);

module.controller('WidgetSalesSummaryCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "ChartFormatterSvc", function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    if ($scope.isDataFound = !_.isEmpty(w.content.hist_parameters)) {
      $scope.incorrectPeriod = _.isEmpty(w.content.summary);
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
      $scope.period = _.find($scope.periodOptions, function(o) {
        return o.value === w.content.hist_parameters.period;
      }) || $scope.periodOptions[0];
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
      return $scope.filter = _.find($scope.filterOptions, function(o) {
        return o.value === w.content.filter;
      }) || $scope.filterOptions[0];
    }
  };
  w.format = function() {
    var pieData, pieOptions;
    if ($scope.isDataFound) {
      pieData = _.map(w.content.summary, function(entity) {
        var label;
        if (entity.company) {
          label = (entity.code || entity.location || entity.industry || entity.customer) + " (" + entity.company + ")";
        } else {
          label = entity.code || entity.location || entity.industry || entity.customer;
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
      return w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions);
    }
  };
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesSummary', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesSummaryCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-top-opportunities', []);

module.controller('WidgetSalesTopOpportunitiesCtrl', ["$scope", "DhbAnalyticsSvc", "Utilities", "ChartFormatterSvc", "$filter", function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) {
  var getSettingsCount, w;
  w = $scope.widget;
  w.initContext = function() {
    return $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opportunities);
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
  getSettingsCount = function() {
    if (w.settings != null) {
      return w.settings.length;
    } else {
      return 0;
    }
  };
  $scope.$watch(getSettingsCount, function(total) {
    if (total >= 1) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetSalesTopOpportunities', function() {
  return {
    restrict: 'A',
    controller: 'WidgetSalesTopOpportunitiesCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.account', []);

module.controller('SettingAccountCtrl', ["$scope", "$filter", function($scope, $filter) {
  var setting, w;
  w = $scope.parentWidget;
  setting = {};
  setting.key = "account";
  setting.isInitialized = false;
  setting.initialize = function() {
    w.selectedAccount = null;
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
  $scope.formatAmount = function(anAccount) {
    return $filter('mnoCurrency')(anAccount.current_balance, anAccount.currency);
  };
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive('settingAccount', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      label: '@'
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.accounts-list', []);

module.controller('SettingAccountsListCtrl', ["$scope", function($scope) {
  var addAccountToList, removeAccountFromList, setting, w;
  w = $scope.parentWidget;
  w.moveAccountToAnotherList = function(account, src, dst, triggerUpdate) {
    if (triggerUpdate == null) {
      triggerUpdate = true;
    }
    removeAccountFromList(account, src);
    addAccountToList(account, dst);
    if (triggerUpdate) {
      return w.updateSettings(false);
    }
  };
  removeAccountFromList = function(account, list) {
    if (!_.isEmpty(list)) {
      return angular.copy(_.reject(list, function(accInList) {
        return account.uid === accInList.uid;
      }), list);
    }
  };
  addAccountToList = function(account, list) {
    if (account != null) {
      list || (list = []);
      return list.push(account);
    }
  };
  setting = {};
  setting.key = "accounts-list";
  setting.initialize = function() {
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
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive('settingAccountsList', function() {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    controller: 'SettingAccountsListCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.chart-filters', []);

module.controller('SettingChartFiltersCtrl', ["$scope", function($scope) {
  var setting, w;
  w = $scope.parentWidget;
  setting = {};
  setting.key = "chart-filters";
  setting.isInitialized = false;
  setting.initialize = function() {
    if ((w.content.chart_filter != null) && ($scope.filterCriteria = w.content.chart_filter.criteria)) {
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
    if (w.content.chart_filter != null) {
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
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive('settingChartFilters', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    template: $templateCache.get('widgets-settings/chart-filters.tmpl.html'),
    controller: 'SettingChartFiltersCtrl'
  };
}]);
}).call(this);
(function () {
'use strict';
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
      str = str.replace(new RegExp(balancePattern, 'g'), account.current_balance_no_format);
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
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive(function() {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    controller: 'SettingFormulaCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.hist-mode', []);

module.controller('SettingHistModeCtrl', ["$scope", "DhbAnalyticsSvc", function($scope, DhbAnalyticsSvc) {
  var setting, w;
  w = $scope.parentWidget;
  w.isHistoryMode = false;
  $scope.toogleHistMode = function(mode) {
    if ((w.isHistoryMode && mode === 'history') || (!w.isHistoryMode && mode === 'current')) {
      return;
    }
    w.isHistoryMode = !w.isHistoryMode;
    return w.updateSettings(false);
  };
  setting = {};
  setting.key = "hist-mode";
  setting.isInitialized = false;
  setting.initialize = function() {
    var mode;
    if ((w.content != null) && (w.content.hist_parameters != null) && (mode = w.content.hist_parameters.mode)) {
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
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive('settingHistMode', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    template: $templateCache.get('widgets-settings/hist-mode.tmpl.html'),
    controller: 'SettingHistModeCtrl'
  };
}]);
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.organizations', []);

module.controller('SettingOrganizationsCtrl', ["$scope", "$log", function($scope, $log) {
  var setting, w;
  w = $scope.parentWidget;
  $scope.dashboardOrganizations = w.parentDashboard.data_sources;
  w.selectedOrganizations = {};
  $scope.isOrganizationSelected = function(orgUid) {
    return !!w.selectedOrganizations[orgUid];
  };
  $scope.toogleSelectOrganization = function(orgUid) {
    return w.selectedOrganizations[orgUid] = !w.selectedOrganizations[orgUid];
  };
  setting = {};
  setting.key = "organizations";
  setting.isInitialized = false;
  setting.initialize = function() {
    if ((w.metadata != null) && (w.metadata.organization_ids != null)) {
      angular.forEach(w.metadata.organization_ids, function(orgUid) {
        return w.selectedOrganizations[orgUid] = true;
      });
      return setting.isInitialized = true;
    }
  };
  setting.toMetadata = function() {
    var newOrganizations;
    newOrganizations = _.compact(_.map(w.selectedOrganizations, function(checked, uid) {
      if (checked) {
        return uid;
      }
    }));
    return {
      organization_ids: newOrganizations
    };
  };
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive('settingOrganizations', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    template: $templateCache.get('widgets-settings/organizations.tmpl.html'),
    controller: 'SettingOrganizationsCtrl'
  };
}]);
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.param-selector', []);

module.controller('SettingParamSelectorCtrl', ["$scope", function($scope) {
  var setting, w;
  $scope.showOptions = false;
  $scope.toogleShowOptions = function() {
    return $scope.showOptions = !$scope.showOptions;
  };
  $scope.selectOption = function(anOption) {
    if (anOption !== $scope.selected) {
      $scope.selected = anOption;
      w.updateSettings(!$scope.noReload);
    }
    return $scope.toogleShowOptions();
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
    param["" + $scope.param] = $scope.selected.value;
    return param;
  };
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive('settingParamSelector', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      param: '@',
      options: '=',
      selected: '=',
      truncateNo: '@'
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.params-picker', []);

module.controller('SettingParamsPickerCtrl', ["$scope", "DhbAnalyticsSvc", function($scope, DhbAnalyticsSvc) {
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
    param["" + $scope.param] = _.compact(_.map($scope.options, function(statusOption) {
      if (statusOption.selected) {
        return statusOption.label;
      }
    }));
    return param;
  };
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive('settingParamsPicker', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
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
(function () {
'use strict';
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
  return w.settings.push(setting);
}]);

module.directive('settingTimeRange', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    template: $templateCache.get('widgets-settings/time-range.tmpl.html'),
    controller: 'SettingTimeRangeCtrl'
  };
}]);
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.width', []);

module.controller('SettingWidthCtrl', ["$scope", "$log", function($scope, $log) {
  var setting, w;
  w = $scope.parentWidget;
  w.toogleExpanded = function() {
    $scope.expanded = !$scope.expanded;
    w.updateSettings(false);
    if ($scope.expanded) {
      return w.width = parseInt($scope.max);
    } else {
      return w.width = parseInt($scope.min);
    }
  };
  setting = {};
  setting.key = "width";
  setting.isInitialized = false;
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
  w.settings || (w.settings = []);
  return w.settings.push(setting);
}]);

module.directive('settingWidth', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      min: '@',
      max: '@'
    },
    template: $templateCache.get('widgets-settings/width.tmpl.html'),
    controller: 'SettingWidthCtrl'
  };
}]);
}).call(this);
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * Modified version by Cesar Tonnoir
 * https://github.com/cesar-tonnoir/Chart.js
 */
(function(){"use strict";var t=this,i=t.Chart,e=function(t){this.canvas=t.canvas,this.ctx=t;var i=function(t,i){return t["offset"+i]?t["offset"+i]:document.defaultView.getComputedStyle(t).getPropertyValue(i)},e=this.width=i(t.canvas,"Width")||t.canvas.width,n=this.height=i(t.canvas,"Height")||t.canvas.height;return t.canvas.width=e,t.canvas.height=n,e=this.width=t.canvas.width,n=this.height=t.canvas.height,this.aspectRatio=this.width/this.height,s.retinaScale(this),this};e.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",tooltipFixed:!1,multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},e.types={};var s=e.helpers={},n=s.each=function(t,i,e){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var n;for(n=0;n<t.length;n++)i.apply(e,[t[n],n].concat(s))}else for(var o in t)i.apply(e,[t[o],o].concat(s))},o=s.clone=function(t){var i={};return n(t,function(e,s){t.hasOwnProperty(s)&&(i[s]=e)}),i},a=s.extend=function(t){return n(Array.prototype.slice.call(arguments,1),function(i){n(i,function(e,s){i.hasOwnProperty(s)&&(t[s]=e)})}),t},h=s.merge=function(t,i){var e=Array.prototype.slice.call(arguments,0);return e.unshift({}),a.apply(null,e)},l=s.indexOf=function(t,i){if(Array.prototype.indexOf)return t.indexOf(i);for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1},r=(s.where=function(t,i){var e=[];return s.each(t,function(t){i(t)&&e.push(t)}),e},s.findNextWhere=function(t,i,e){e||(e=-1);for(var s=e+1;s<t.length;s++){var n=t[s];if(i(n))return n}},s.findPreviousWhere=function(t,i,e){e||(e=t.length);for(var s=e-1;s>=0;s--){var n=t[s];if(i(n))return n}},s.inherits=function(t){var i=this,e=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return i.apply(this,arguments)},s=function(){this.constructor=e};return s.prototype=i.prototype,e.prototype=new s,e.extend=r,t&&a(e.prototype,t),e.__super__=i.prototype,e}),c=s.noop=function(){},u=s.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=s.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=s.amd="function"==typeof define&&define.amd,f=s.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=s.max=function(t){return Math.max.apply(Math,t)},m=s.min=function(t){return Math.min.apply(Math,t)},v=(s.cap=function(t,i,e){if(f(i)){if(t>i)return i}else if(f(e)&&e>t)return e;return t},s.getDecimalPlaces=function(t){if(t%1!==0&&f(t)){var i=t.toString();if(i.indexOf("e-")<0)return i.split(".")[1].length;if(i.indexOf(".")<0)return parseInt(i.split("e-")[1]);var e=i.split(".")[1].split("e-");return e[0].length+parseInt(e[1])}return 0}),x=s.radians=function(t){return t*(Math.PI/180)},S=(s.getAngleFromPoint=function(t,i){var e=i.x-t.x,s=i.y-t.y,n=Math.sqrt(e*e+s*s),o=2*Math.PI+Math.atan2(s,e);return 0>e&&0>s&&(o+=2*Math.PI),{angle:o,distance:n}},s.aliasPixel=function(t){return t%2===0?0:.5}),y=(s.splineCurve=function(t,i,e,s){var n=Math.sqrt(Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)),o=Math.sqrt(Math.pow(e.x-i.x,2)+Math.pow(e.y-i.y,2)),a=s*n/(n+o),h=s*o/(n+o);return{inner:{x:i.x-a*(e.x-t.x),y:i.y-a*(e.y-t.y)},outer:{x:i.x+h*(e.x-t.x),y:i.y+h*(e.y-t.y)}}},s.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),w=(s.calculateScaleRange=function(t,i,e,s,n){var o=2,a=Math.floor(i/(1.5*e)),h=o>=a,l=g(t),r=m(t);l===r&&(l+=.5,r>=.5&&!s?r-=.5:l+=.5);for(var c=Math.abs(l-r),u=y(c),d=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),p=s?0:Math.floor(r/(1*Math.pow(10,u)))*Math.pow(10,u),f=d-p,v=Math.pow(10,u),x=Math.round(f/v);(x>a||a>2*x)&&!h;)if(x>a)v*=2,x=Math.round(f/v),x%1!==0&&(h=!0);else if(n&&u>=0){if(v/2%1!==0)break;v/=2,x=Math.round(f/v)}else v/=2,x=Math.round(f/v);return h&&(x=o,v=f/x),{steps:x,stepValue:v,min:p,max:p+x*v}},s.template=function(t,i){function e(t,i){var e=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):s[t]=s[t];return i?e(i):e}if(t instanceof Function)return t(i);var s={};return e(t,i)}),C=(s.generateLabels=function(t,i,e,s){var o=new Array(i);return t&&n(o,function(i,n){o[n]=w(t,{value:e+s*(n+1)})}),o},s.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),-(s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)))},easeOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),s*Math.pow(2,-10*t)*Math.sin(2*(1*t-i)*Math.PI/e)+1)},easeInOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:2==(t/=.5)?1:(e||(e=.3*1.5),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e):s*Math.pow(2,-10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)*.5+1)},easeInBack:function(t){var i=1.70158;return 1*(t/=1)*t*((i+1)*t-i)},easeOutBack:function(t){var i=1.70158;return 1*((t=t/1-1)*t*((i+1)*t+i)+1)},easeInOutBack:function(t){var i=1.70158;return(t/=.5)<1?.5*t*t*(((i*=1.525)+1)*t-i):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},easeInBounce:function(t){return 1-C.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*C.easeInBounce(2*t):.5*C.easeOutBounce(2*t-1)+.5}}),b=s.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),P=s.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),L=(s.animationLoop=function(t,i,e,s,n,o){var a=0,h=C[e]||C.linear,l=function(){a++;var e=a/i,r=h(e);t.call(o,r,e,a),s.call(o,r,e),i>a?o.animationFrame=b(l):n.apply(o)};b(l)},s.getRelativePosition=function(t){var i,e,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,o=n.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX-o.left,e=s.touches[0].clientY-o.top):(i=s.clientX-o.left,e=s.clientY-o.top),{x:i,y:e}},s.addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e):t.attachEvent?t.attachEvent("on"+i,e):t["on"+i]=e}),k=s.removeEvent=function(t,i,e){t.removeEventListener?t.removeEventListener(i,e,!1):t.detachEvent?t.detachEvent("on"+i,e):t["on"+i]=c},F=(s.bindEvents=function(t,i,e){t.events||(t.events={}),n(i,function(i){t.events[i]=function(){e.apply(t,arguments)},L(t.chart.canvas,i,t.events[i])})},s.unbindEvents=function(t,i){n(i,function(i,e){k(t.chart.canvas,e,i)})}),R=s.getMaximumWidth=function(t){var i=t.parentNode;return i.clientWidth},T=s.getMaximumHeight=function(t){var i=t.parentNode;return i.clientHeight},A=(s.getMaximumSize=s.getMaximumWidth,s.retinaScale=function(t){var i=t.ctx,e=t.canvas.width,s=t.canvas.height;window.devicePixelRatio&&(i.canvas.style.width=e+"px",i.canvas.style.height=s+"px",i.canvas.height=s*window.devicePixelRatio,i.canvas.width=e*window.devicePixelRatio,i.scale(window.devicePixelRatio,window.devicePixelRatio))}),M=s.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},W=s.fontString=function(t,i,e){return i+" "+t+"px "+e},z=s.longestText=function(t,i,e){t.font=i;var s=0;return n(e,function(i){var e=t.measureText(i).width;s=e>s?e:s}),s},B=s.drawRoundedRectangle=function(t,i,e,s,n,o){t.beginPath(),t.moveTo(i+o,e),t.lineTo(i+s-o,e),t.quadraticCurveTo(i+s,e,i+s,e+o),t.lineTo(i+s,e+n-o),t.quadraticCurveTo(i+s,e+n,i+s-o,e+n),t.lineTo(i+o,e+n),t.quadraticCurveTo(i,e+n,i,e+n-o),t.lineTo(i,e+o),t.quadraticCurveTo(i,e,i+o,e),t.closePath()};e.instances={},e.Type=function(t,i,s){this.options=i,this.chart=s,this.id=u(),e.instances[this.id]=this,i.responsive&&this.resize(),this.initialize.call(this,t)},a(e.Type.prototype,{initialize:function(){return this},clear:function(){return M(this.chart),this},stop:function(){return P(this.animationFrame),this},resize:function(t){this.stop();var i=this.chart.canvas,e=R(this.chart.canvas),s=this.options.maintainAspectRatio?e/this.chart.aspectRatio:T(this.chart.canvas);return i.width=this.chart.width=e,i.height=this.chart.height=s,A(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){return t&&this.reflow(),this.options.animation&&!t?s.animationLoop(this.draw,this.options.animationSteps,this.options.animationEasing,this.options.onAnimationProgress,this.options.onAnimationComplete,this):(this.draw(),this.options.onAnimationComplete.call(this)),this},generateLegend:function(){return w(this.options.legendTemplate,this)},destroy:function(){this.clear(),F(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete e.instances[this.id]},showTooltip:function(t,i){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var i=!1;return t.length!==this.activeElements.length?i=!0:(n(t,function(t,e){t!==this.activeElements[e]&&(i=!0)},this),i)}.call(this,t);if(o||i){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var a,h,r=this.datasets.length-1;r>=0&&(a=this.datasets[r].points||this.datasets[r].bars||this.datasets[r].segments,h=l(a,t[0]),-1===h);r--);var c=[],u=[],d=function(t){var i,e,n,o,a,l=[],r=[],d=[];return s.each(this.datasets,function(t){i=t.points||t.bars||t.segments,i[h]&&i[h].hasValue()&&l.push(i[h])}),s.each(l,function(t){r.push(t.x),d.push(t.y),c.push(s.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),a=m(d),n=g(d),o=m(r),e=g(r),{x:o>this.chart.width/2?o:e,y:(a+n)/2}}.call(this,h);new e.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:t[0].label,chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else n(t,function(t){var i=t.tooltipPosition();new e.Tooltip({x:Math.round(i.x),y:Math.round(i.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:w(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips,tooltipFixed:this.options.tooltipFixed}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),e.Type.extend=function(t){var i=this,s=function(){return i.apply(this,arguments)};if(s.prototype=o(i.prototype),a(s.prototype,t),s.extend=e.Type.extend,t.name||i.prototype.name){var n=t.name||i.prototype.name,l=e.defaults[i.prototype.name]?o(e.defaults[i.prototype.name]):{};e.defaults[n]=a(l,t.defaults),e.types[n]=s,e.prototype[n]=function(t,i){var o=h(e.defaults.global,e.defaults[n],i||{});return new s(t,o,this)}}else d("Name not provided for this chart, so it hasn't been registered");return i},e.Element=function(t){a(this,t),this.initialize.apply(this,arguments),this.save()},a(e.Element.prototype,{initialize:function(){},restore:function(t){return t?n(t,function(t){this[t]=this._saved[t]},this):a(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return n(t,function(t,i){this._saved[i]=this[i],this[i]=t},this),this},transition:function(t,i){return n(t,function(t,e){this[e]=(t-this._saved[e])*i+this._saved[e]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),e.Element.extend=r,e.Point=e.Element.extend({display:!0,inRange:function(t,i){var e=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(i-this.y,2)<Math.pow(e,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),e.Arc=e.Element.extend({inRange:function(t,i){var e=s.getAngleFromPoint(this,{x:t,y:i}),n=e.angle>=this.startAngle&&e.angle<=this.endAngle,o=e.distance>=this.innerRadius&&e.distance<=this.outerRadius;return n&&o},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,i=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*i,y:this.y+Math.sin(t)*i}},draw:function(t){var i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),e.Rectangle=e.Element.extend({draw:function(){var t=this.ctx,i=this.width/2,e=this.x-i,s=this.x+i,n=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(e+=o,s-=o,n+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(e,this.base),t.lineTo(e,n),t.lineTo(s,n),t.lineTo(s,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,i){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&i>=this.y&&i<=this.base}}),e.Tooltip=e.Element.extend({draw:function(){var t=this.chart.ctx;t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var i=this.caretPadding=2,e=t.measureText(this.text).width+2*this.xPadding,s=this.fontSize+2*this.yPadding,n=s+this.caretHeight+i;this.tooltipFixed&&(e=this.chart.width,s=2*this.fontSize+4*this.yPadding),this.x+e/2>this.chart.width?this.xAlign="left":this.x-e/2<0&&(this.xAlign="right"),this.y-n<0&&(this.yAlign="below");var o=this.x-e/2,a=this.y-n;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{if(this.tooltipFixed)switch(o=0,this.yAlign){case"above":a=0;break;case"below":a=this.chart.height/2-s/2}else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-i),t.lineTo(this.x+this.caretHeight,this.y-(i+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(i+this.caretHeight)),t.closePath(),t.fill();break;case"below":a=this.y+i+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+i),t.lineTo(this.x+this.caretHeight,this.y+i+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+i+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-e+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}}B(t,o,a,e,s,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",this.tooltipFixed&&this.text.split(":").length>=2?(t.fillText(this.text.split(":")[0],o+e/2,a+this.yPadding+this.fontSize),t.fillText(this.text.split(":")[1],o+e/2,a+2*(this.yPadding+this.fontSize))):t.fillText(this.text,o+e/2,a+s/2)}}}),e.MultiTooltip=e.Element.extend({initialize:function(){this.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=W(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,i=z(this.ctx,this.font,this.labels)+this.fontSize+3,e=g([i,t]);this.width=e+2*this.xPadding;var s=this.height/2;this.y-s<0?this.y=s:this.y+s>this.chart.height&&(this.y=this.chart.height-s),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var i=this.y-this.height/2+this.yPadding,e=t-1;return 0===t?i+this.titleFontSize/2:i+(1.5*this.fontSize*e+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{B(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,s.each(this.labels,function(i,e){t.fillStyle=this.textColor,t.fillText(i,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(e+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[e].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),e.Scale=e.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(w(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?z(this.ctx,this.font,this.yLabels)+10:0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,i=this.endPoint-this.startPoint;for(this.calculateYRange(i),this.buildYLabels(),this.calculateXLabelRotation();i>this.endPoint-this.startPoint;)i=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(i),this.buildYLabels(),t<this.yLabelWidth&&this.calculateXLabelRotation()},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,i,e=this.ctx.measureText(this.xLabels[0]).width,s=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=s/2+3,this.xScalePaddingLeft=e/2>this.yLabelWidth?e/2:this.yLabelWidth,this.xLabelRotation=0,this.display){var n,o=z(this.ctx,this.font,this.xLabels);this.xLabelWidth=o;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)n=Math.cos(x(this.xLabelRotation)),t=n*e,i=n*s,t+this.fontSize/2>this.yLabelWidth&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=n*o;this.xLabelRotation>0&&(this.endPoint-=Math.sin(x(this.xLabelRotation))*o+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var i=this.drawingArea()/(this.min-this.max);return this.endPoint-i*(t-this.min)},calculateX:function(t){var i=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),e=i/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),s=e*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=e/2),Math.round(s)},update:function(t){s.extend(this,t),this.fit()},draw:function(){var t=this.ctx,i=(this.endPoint-this.startPoint)/this.steps,e=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,n(this.yLabels,function(n,o){var a=this.endPoint-i*o,h=Math.round(a),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(n,e-10,a),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),h+=s.aliasPixel(t.lineWidth),l&&(t.moveTo(e,h),t.lineTo(this.width,h),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(e-5,h),t.lineTo(e,h),t.stroke(),t.closePath()},this),n(this.xLabels,function(i,e){var s=this.calculateX(e)+S(this.lineWidth),n=this.calculateX(e-(this.offsetGridLines?.5:0))+S(this.lineWidth),o=this.xLabelRotation>0,a=this.showVerticalLines;0!==e||a||(a=!0),a&&t.beginPath(),e>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a&&(t.moveTo(n,this.endPoint),t.lineTo(n,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n,this.endPoint),t.lineTo(n,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(s,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*x(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(i,0,0),t.restore()},this))}}),e.RadialScale=e.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var i=this.drawingArea/(this.max-this.min);return(t-this.min)*i},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(w(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,i,e,s,n,o,a,h,l,r,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)t=this.getPointPosition(i,d),e=this.ctx.measureText(w(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=e/2,t.x+s>p&&(p=t.x+s,n=i),t.x-s<g&&(g=t.x-s,a=i)):i<this.valuesCount/2?t.x+e>p&&(p=t.x+e,n=i):i>this.valuesCount/2&&t.x-e<g&&(g=t.x-e,a=i);l=g,r=Math.ceil(p-this.width),o=this.getIndexAngle(n),h=this.getIndexAngle(a),c=r/Math.sin(o+Math.PI/2),u=l/Math.sin(h+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,i){var e=this.width-i-this.drawingArea,s=t+this.drawingArea;this.xCenter=(s+e)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var i=2*Math.PI/this.valuesCount;return t*i-Math.PI/2},getPointPosition:function(t,i){var e=this.getIndexAngle(t);return{x:Math.cos(e)*i+this.xCenter,y:Math.sin(e)*i+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(n(this.yLabels,function(i,e){if(e>0){var s,n=e*(this.drawingArea/this.steps),o=this.yCenter-n;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var a=0;a<this.valuesCount;a++)s=this.getPointPosition(a,this.calculateCenterOffset(this.min+e*this.stepValue)),0===a?t.moveTo(s.x,s.y):t.lineTo(s.x,s.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var h=t.measureText(i).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-h/2-this.backdropPaddingX,o-this.fontSize/2-this.backdropPaddingY,h+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(i,this.xCenter,o)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var i=this.valuesCount-1;i>=0;i--){if(this.angleLineWidth>0){var e=this.getPointPosition(i,this.calculateCenterOffset(this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(e.x,e.y),t.stroke(),t.closePath()}var s=this.getPointPosition(i,this.calculateCenterOffset(this.max)+5);t.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var o=this.labels.length,a=this.labels.length/2,h=a/2,l=h>i||i>o-h,r=i===h||i===o-h;t.textAlign=0===i?"center":i===a?"center":a>i?"left":"right",t.textBaseline=r?"middle":l?"bottom":"top",t.fillText(this.labels[i],s.x,s.y)}}}}}),s.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){n(e.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return e}):"object"==typeof module&&module.exports&&(module.exports=e),t.Chart=e,e.noConflict=function(){return t.Chart=i,e}}).call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',showXLabels:!0};i.Type.extend({name:"Bar",defaults:s,initialize:function(t){var s=this.options;this.ScaleClass=i.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,i,e){var n=this.calculateBaseWidth(),o=this.calculateX(e)-n/2,a=this.calculateBarWidth(t);return o+a*i+i*s.barDatasetSpacing+a/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*s.barValueSpacing},calculateBarWidth:function(t){var i=this.calculateBaseWidth()-(t-1)*s.barDatasetSpacing;return i/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),this.BarClass=i.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(i,s){var n={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,bars:[]};this.datasets.push(n),e.each(i.data,function(e,s){n.bars.push(new this.BarClass({value:e,label:t.labels[s],datasetLabel:i.label,strokeColor:i.strokeColor,fillColor:i.fillColor,highlightFill:i.highlightFill||i.fillColor,highlightStroke:i.highlightStroke||i.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,i,s){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,s,i),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(i,s){e.each(i.bars,t,this,s)},this)},getBarsAtEvent:function(t){for(var i,s=[],n=e.getRelativePosition(t),o=function(t){s.push(t.bars[i])},a=0;a<this.datasets.length;a++)for(i=0;i<this.datasets[a].bars.length;i++)if(this.datasets[a].bars[i].inRange(n.x,n.y))return e.each(this.datasets,o),s;return s},buildScale:function(t){var i=this,s=function(){var t=[];return i.eachBars(function(i){t.push(i.value)}),t},n={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:this.options.showXLabels?t:[],font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale
};this.options.scaleOverride&&e.extend(n,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(n)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:i,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();this.chart.ctx;this.scale.draw(i),e.each(this.datasets,function(t,s){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,s,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},i).draw())},this)},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Doughnut",defaults:s,initialize:function(t){this.segments=[],this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=i.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.calculateTotal(t),e.each(t,function(i,e){i.color||(i.color="hsl("+360*e/t.length+", 100%, 50%)"),this.addData(i,e,!0)},this),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),e||(this.reflow(),this.update())},calculateCircumference:function(t){return 2*Math.PI*(Math.abs(t)/this.total)},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),e.each(this.activeElements,function(t){t.restore(["fillColor"])}),e.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,e.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var i=t?t:1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},i),t.endAngle=t.startAngle+t.circumference,t.draw(),0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle)},this)}}),i.types.Doughnut.extend({name:"Pie",defaults:e.merge(s,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',showXLabels:!0};i.Type.extend({name:"Line",defaults:s,initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,i){e.extend(t,{x:this.scale.calculateX(i),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.datasets,function(t){e.each(t.points,function(t){t.inRange(s.x,s.y)&&i.push(t)})},this),i},buildScale:function(t){var s=this,n=function(){var t=[];return s.eachPoints(function(i){t.push(i.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:this.options.showXLabels?t:[],font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(o,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new i.Scale(o)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();var s=this.chart.ctx,n=function(t){return null!==t.value},o=function(t,i,s){return e.findNextWhere(i,n,s)||t},a=function(t,i,s){return e.findPreviousWhere(i,n,s)||t};this.scale.draw(i),e.each(this.datasets,function(t){var h=e.where(t.points,n);e.each(t.points,function(t,e){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(e)},i)},this),this.options.bezierCurve&&e.each(h,function(t,i){var s=i>0&&i<h.length-1?this.options.bezierCurveTension:0;t.controlPoints=e.splineCurve(a(t,h,i),t,o(t,h,i),s),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(h,function(t,i){if(0===i)s.moveTo(t.x,t.y);else if(this.options.bezierCurve){var e=a(t,h,i);s.bezierCurveTo(e.controlPoints.outer.x,e.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else s.lineTo(t.x,t.y)},this),s.stroke(),this.options.datasetFill&&h.length>0&&(s.lineTo(h[h.length-1].x,this.scale.endPoint),s.lineTo(h[0].x,this.scale.endPoint),s.fillStyle=t.fillColor,s.closePath(),s.fill()),e.each(h,function(t){t.draw()})},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"PolarArea",defaults:s,initialize:function(t){this.segments=[],this.SegmentArc=i.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),e||(this.reflow(),this.update())},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var i=[];e.each(t,function(t){i.push(t.value)});var s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s,{size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),e.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),e.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),e.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var i=t||1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},i),t.endAngle=t.startAngle+t.circumference,0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers;i.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){var o;this.scale.animation||(o=this.scale.getPointPosition(n,this.scale.calculateCenterOffset(e))),s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=e.getRelativePosition(t),s=e.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},i),n=2*Math.PI/this.scale.valuesCount,o=Math.round((s.angle-1.5*Math.PI)/n),a=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),s.distance<=this.scale.drawingArea&&e.each(this.datasets,function(t){a.push(t.points[o])}),a},buildScale:function(t){this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var i=function(){var i=[];return e.each(t,function(t){t.data?i=i.concat(t.data):e.each(t.points,function(t){i.push(t.value)})}),i}(),s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s)},addData:function(t,i){this.scale.valuesCount++,e.each(t,function(t,e){var s=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:s.x,y:s.y,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.labels.push(i),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),e.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var i=t||1,s=this.chart.ctx;this.clear(),this.scale.draw(),e.each(this.datasets,function(t){e.each(t.points,function(t,e){t.hasValue()&&t.transition(this.scale.getPointPosition(e,this.scale.calculateCenterOffset(t.value)),i)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(t.points,function(t,i){0===i?s.moveTo(t.x,t.y):s.lineTo(t.x,t.y)},this),s.closePath(),s.stroke(),s.fillStyle=t.fillColor,s.fill(),e.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this);