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
** COMPONENTS
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
    'impac.components.widgets-settings.limit-entries',
    'impac.components.widgets-settings.organizations',
    'impac.components.widgets-settings.param-selector',
    'impac.components.widgets-settings.params-picker',
    'impac.components.widgets-settings.params-checkboxes',
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
angular.module('impac.filters',
  [
    'impac.filters.titleize',
    'impac.filters.truncate',
    'impac.filters.mno-currency'
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



angular.module("impac.components.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("dashboard-selector/bootstrap-tabs.tmpl.html","<div class=\"row\">\n  <div class=\"buttons-bar col-md-8\">\n    <tabset type=\"{{selectorType}}\">\n      <tab ng-repeat=\"dhb in dashboardsList\" select=\"selectDashboard(dhb.id)\" active=\"dhb.active\">\n        <tab-heading>\n          {{dhb.full_name}}\n          <a href=\"\" class=\"close-link\" ng-if=\"isDeleteDhbEnabled\">\n            <i class=\"fa fa-times\" ng-click=\"deleteDashboardModal.open()\"></i>\n          </a>\n        </tab-heading>\n      </tab>\n      <tab ng-if=\'isAccessibilityEnabled\' ng-click=\"toggleAccessibilityMode()\">\n        <tab-heading>\n          <a href=\"\"><i class=\"fa fa-wheelchair\"></i></a>\n        </tab-heading>\n      </tab>\n      <tab ng-if=\"isAddDhbEnabled\" ng-click=\"onCreateDashboard()\">\n        <tab-heading>\n          <a href=\"\">+</a>\n        </tab-heading>\n      </tab>\n    </tabset>\n  </div>\n  <div class=\'buttons-bar col-md-4\'>\n    <div class=\'actions-panel\'>\n      <button ng-if=\'isAccessibilityEnabled\' ng-click=\"toggleAccessibilityMode()\" class=\'btn btn-info\' ng-disabled=\"isWidgetSelectorShown()\"><span class=\'fa fa-wheelchair\'></span></button>\n      <button ng-if=\"isAddWidgetEnabled && isThereADashboard()\" ng-click=\"onDisplayWidgetSelector()\" class=\'btn btn-warning\' ng-disabled=\"isWidgetSelectorShown()\"><span class=\'fa fa-plus\'></span> Add Widget</button>\n      <!-- <button id=\'data-upload-wizard\' ng-click=\'openStarWizard()\' class=\'btn btn-success hidden-xs\' ><span class=\'fa fa-upload\'></span> Data Upload</button> -->\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/delete.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3>Delete Dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!-- Create a new widget -->\n  <p>Are you sure you want to delete this analytics dashboard?</p>\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-danger\" ng-click=\"proceed()\" ng-disabled=\"isLoading\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n        Delete\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/dropdown.tmpl.html","<div class=\"row buttons-bar\">\n\n  <div class=\"col-md-6 dropdown-container\" ng-hide=\"isLoading\">\n    <div ng-if=\"isThereADashboard()\">\n      <h4 class=\'dashboard-title\'>\n        <div style=\"display: inline-block;\" ng-click=\"toggleShowDashboardsDropdown()\">\n          {{currentDhb.full_name}}\n          <i class=\"fa fa-chevron-down\" style=\"font-size: 18px;\"></i>\n        </div>\n        <i ng-hide=\"showChangeDashboardNameBox\" class=\"fa fa-pencil\" tooltip=\"Change name\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" ng-click=\"toggleChangeDashboardNameBox(currentDhb)\"></i>\n      </h4>\n\n      <div ng-show=\"showDashboardsDropdown\" class=\'dashboard-select\'>\n        <div ng-hide=\"dhb.id == currentDhb.id\" class=\'option\' ng-repeat=\"dhb in dashboardsList\">\n          <span class=\"name\" ng-click=\"selectDashboard(dhb.id)\">{{dhb.full_name}}</span>\n          <i ng-hide=\"showChangeDashboardNameBox\" class=\"fa fa-pencil\" tooltip=\"Change name\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" ng-click=\"toggleChangeDashboardNameBox(dhb)\"/>\n        </div>\n\n        <div ng-show=\"showCreateDashboardButton\" class=\"option create\" ng-click=\"onCreateDashboard()\"><i class=\"fa fa-plus\" /> Create Dashboard</div>\n      </div>\n\n      <div ng-if=\"showChangeDashboardNameBox\" class=\"change-name\">\n        <p>Change dashboard name:</p>\n        <input type=\"text\" class=\"form-control\" id=\"changeDhbNameInput\" ng-model=\"dashboardToChange.name\" ng-keyup=\"checkAndUpdateDashboardName($event)\"/>\n        <button class=\"btn btn-sm btn-default\" ng-click=\"hideChangeDashboardNameBox()\">Cancel</button>\n        <button class=\"btn btn-sm btn-success\" style=\"margin-left: 10px\" ng-click=\"updateDashboardName()\">Confirm</button>\n      </div>\n\n      <p class=\"data-source-label\">\n        <small><b>Source:</b> {{organizationsNames()}}</small>\n      </p>\n    </div>\n  </div>\n\n  <div class=\"col-md-6 loader-container\" ng-show=\"isLoading\">\n    <i class=\"fa fa-spinner fa-pulse fa-4x loading-spinner\"/>\n  </div>\n\n  <div class=\'col-md-6 actions-panel\'>\n\n    <button ng-if=\'isAccessibilityEnabled\' ng-click=\"toggleAccessibilityMode()\" class=\'btn btn-info\' ng-disabled=\"showWidgetSelector\"><span class=\'fa fa-wheelchair\'></span></button>\n\n    <button ng-if=\"isAddWidgetEnabled && isThereADashboard()\" ng-click=\"onDisplayWidgetSelector()\" class=\'btn btn-warning\' ng-disabled=\"isWidgetSelectorShown()\"><span class=\'fa fa-plus\'></span> Add Widget</button>\n\n    <button ng-if=\"isAddDhbEnabled\" ng-click=\"onCreateDashboard()\" class=\'btn btn-warning\' ng-show=\"showCreateDashboardButton\"><span class=\'fa fa-pencil-square-o\'></span> Create Dashboard</button>\n\n    <!-- <button id=\'data-upload-wizard\' ng-click=\'dhbCtrl.openStarWizard()\' class=\'btn btn-success hidden-xs\' ><span class=\'fa fa-upload\'></span> Data Upload</button> -->\n\n    <button ng-if=\"isDeleteDhbEnabled\" ng-click=\"deleteDashboardModal.open()\" class=\'btn btn-danger hidden-xs\' ng-show=\"isThereADashboard()\" tooltip=\"Delete Dashboard\"><span class=\'fa fa-trash-o\'></span> </button>\n    \n  </div>\n\n</div>\n");
$templateCache.put("dashboard/create.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3>Create New Dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!-- Create a new dashboard -->\n  <div class=\"row dashboard-form\">\n    <div class=\"col-sm-10 col-sm-offset-1\">\n      <form class=\"form-horizontal\" role=\"form\">\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Name</label>\n          <div class=\"col-sm-10\">\n            <input type=\'text\' class=\"form-control\" ng-model=\"model.name\" placeholder=\"E.g: Cash Accounts Monitoring\" required>\n          </div>\n        </div>\n\n        <div class=\"form-group\" ng-show=\"isMultiCompanyAvailable()\">\n          <label class=\"col-sm-2 control-label\">Type</label>\n          <div class=\"col-sm-10\">\n            <div class=\"btn-group\" role=\"group\">\n              <button type=\"button\" ng-click=\"selectMode(\'single\')\" ng-class=\"btnBlassFor(\'single\')\">Current Company</button>\n              <button type=\"button\" ng-click=\"selectMode(\'multi\')\" ng-class=\"btnBlassFor(\'multi\')\">Multi Company</button>\n            </div>\n          </div>\n        </div>\n\n        <!-- Single Company mode -->\n        <div class=\"form-group\" ng-show=\"isCurrentOrganizationShown()\">\n          <div ng-show=\"!canAccessAnalyticsForCurrentOrganization()\" class=\"text-center text-purple\">\n            <div class=\"spacer1\"></div>\n            <p>\n              Oops! Only Admins and Super Admins can create dashboards for company {{currentOrganization.name}}.\n              <span ng-show=\"isMultiCompanyAvailable()\">Please select a \"Multi Company\" dashboard to select data from other companies.</span>\n            </p>\n          </div>\n        </div>\n\n        <!-- Multi Company mode -->\n        <div class=\"form-group\" ng-show=\"isSelectOrganizationShown()\">\n          <label class=\"col-sm-2 control-label\">Companies</label>\n          <div class=\"col-sm-10\">\n            <ul class=\"list-unstyled\">\n              <li ng-repeat=\"organization in organizations\" >\n                <input type=\"checkbox\" ng-model=\"organization.$selected\" ng-disabled=\"!canAccessAnalyticsData(organization)\">\n                {{organization.name}}\n                <span ng-show=\"organization.is_customer_account\">(customer)</span>\n                <span ng-show=\"!canAccessAnalyticsData(organization)\">\n                  <em><small>\n                    &nbsp;\n                    &nbsp;\n                    <i class=\"fa fa-exclamation-circle text-danger\" tooltip=\"Only Admins and Super Admins can access analytics data for this company\"></i>\n                  </small></em>\n                </span>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </form>\n\n      <!-- End row col -->\n    </div>\n\n    <!-- End Dashboard form -->\n  </div>\n\n\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-primary\" ng-click=\"proceed()\" ng-disabled=\"isProceedDisabled()\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n        Add\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard/dashboard.tmpl.html","<!-- DASHBOARD -->\n<div class=\"analytics\" ng-hide=\"isLoading\">\n  <div mno-star-wizard=true modal-open=\'starWizardModal.value\'></div>\n\n  <!-- Title and Dashboard selection -->\n  <div id=\"head-title\">\n    <div class=\"row\" ng-if=\"showDhbHeading\">\n      <div class=\"col-md-6 col-sm-12\" id=\"dashboard-heading\">\n        <img ng-src=\"{{impacTitleLogo}}\" />\n        <h2>\n          {{dhbHeadingText}}\n        </h2>\n      </div>\n    </div>\n\n    <!-- Impac KPI\'s -->\n    <kpis-bar ng-if=\"showKpisBar\" kpis=\"currentDhb.kpis\"></kpis-bar>\n\n    <!-- Dashboards selection/creation/deletion -->\n    <dashboard-selector id=\"module__dashboard-selector\" is-widget-selector-shown=\"showWidgetSelector()\" on-create-dashboard=\"createDashboardModal.open()\" on-display-widget-selector=\"displayWidgetSelector()\" on-select-dashboard=\"activateTimer()\"></dashboard-selector>\n  </div>\n\n  <!-- Widgets selection container -->\n  <div id=\"widget-selector\" collapse=\"!showWidgetSelector()\" ng-if=\"!customWidgetSelector.path\">\n    <div class=\"title\">\n      <i class=\"fa fa-times-circle\" ng-if=\"showCloseWidgetSelectorButton()\" ng-click=\"displayWidgetSelector(false)\"/>\n      <span class=\"badge confirmation\">Widget added!</span>\n      Select the widgets you want to add to your dashboard.\n    </div>\n\n    <div class=\"row top-container\">\n      <div class=\"col-md-3 categories\">\n        <div class=\"row header\">\n          All categories\n        </div>\n        <div class=\"row lines\">\n          <div class=\"col-md-12\" style=\"padding: 3px 12px;\">\n            <p ng-click=\"selectCategory(\'accounts\')\" ng-class=\"isCategorySelected(\'accounts\') ? \'selected\' : none\">Accounting</p>\n            <p ng-click=\"selectCategory(\'invoices\')\" ng-class=\"isCategorySelected(\'invoices\') ? \'selected\' : none\">Invoicing</p>\n            <p ng-click=\"selectCategory(\'hr\')\" ng-class=\"isCategorySelected(\'hr\') ? \'selected\' : none\">HR / Payroll</p>\n            <p ng-click=\"selectCategory(\'sales\')\" ng-class=\"isCategorySelected(\'sales\') ? \'selected\' : none\">Sales</p>\n          </div>\n        </div>\n\n        <div class=\"arrow\" ng-style=\"getSelectedCategoryTop()\">\n          <div class=\"square\"></div>\n          <i class=\"fa fa-caret-right\"></i>\n        </div>\n\n      </div>\n\n      <div class=\"col-md-9 widgets\">\n        <div class=\"row header\">\n          {{getSelectedCategoryName() | titleize}}\n        </div>\n        <div class=\"row lines\">\n          <div class=\"col-md-4\" ng-repeat=\"widgetPattern in getWidgetsForSelectedCategory()\" style=\"padding: 0px 8px;\">\n            <p ng-click=\"addWidget(widgetPattern.path, widgetPattern.metadata)\" tooltip=\"{{widgetPattern.desc}}\" tooltip-placement=\"{{$index < 9 ? \'bottom\' : \'top\'}}\" tooltip-animation=\"false\"  tooltip-append-to-body=\"true\" tooltip-class=\"impac-widget-selector-tooltip\"><i class=\"fa fa-{{widgetPattern.icon}}\" /> {{widgetPattern.name}} <i class=\"fa fa-plus-circle\" /></p>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"bottom\" ng-if=\"widgetSuggestionModal.config.apiPath\">\n      <span class=\"suggestion\">\n        Can\'t find the widget you\'re looking for? <a ng-click=\"widgetSuggestionModal.open()\">Give us your suggestions here!</a>\n      </span>\n    </div>\n  </div>\n\n  <!-- custom widget selector template configured from ImpacThemingProvider -->\n  <div id=\"custom-widget-selector\" ng-if=\"customWidgetSelector.path\" ng-include=\"customWidgetSelector.path\"></div>\n\n\n  <!-- Errors -->\n  <div class=\"alert alert-error\" ng-show=\"errors\">\n    <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n    <ul>\n      <li ng-repeat=\"error in errors\">{{error}}</li>\n    </ul>\n  </div>\n\n  <div class=\'spacer1\'></div>\n\n  <div id=\"no-widgets-container\" class=\"row text-center ng-hide\" ng-show=\'(showChooseDhbMsg() || showNoWidgetsMsg())\'>\n\n    <img ng-src=\"{{impacDashboardBackground}}\" class=\"bg\">\n\n    <div class=\"impac-info-message\">\n      <!-- First Time Dashboard Creation -->\n      <div class=\"ng-hide\" ng-show=\'showChooseDhbMsg()\'>\n        <div class=\'hidden-xs\'>\n          <div class=\'spacer4\'></div>\n          <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"testimonial promo-dark\">\n                <p><b>{{dhbErrorsConfig.firstTimeCreated.first}}</b></p>\n                <p>{{dhbErrorsConfig.firstTimeCreated.second}}</p>\n              </div>\n            </div>\n          </div>\n          <div class=\'spacer2\'></div>\n        </div>\n        <div class=\"align-center\">\n          <button ng-click=\"createDashboardModal.open()\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> Create a Dashboard!</button>\n        </div>\n      </div>\n\n      <!-- Empty Dashboard -->\n      <div class=\"ng-hide\" ng-show=\'showNoWidgetsMsg()\'>\n        <div class=\'hidden-xs\'>\n          <div class=\'spacer4\'></div>\n          <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"testimonial promo-dark\">\n                <p><b>{{dhbErrorsConfig.empty.first}}</b></p>\n                <p>{{dhbErrorsConfig.empty.second}}</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"spacer2\"></div>\n        </div>\n        <div class=\"align-center\">\n          <button ng-disabled=\"showWidgetSelector()\" ng-click=\"displayWidgetSelector()\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> Add a new Widget</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- First Time Dashboard Creation -->\n  <div class=\"row text-center\" ng-show=\'showChooseDhbMsg()\'>\n    <div class=\"spacer2 hidden-xs\"></div>\n    <div class=\'col-md-8 col-md-offset-2\'>\n      <p class=\"text-muted\"><small><em>{{dhbErrorsConfig.firstTimeCreated.note}}</em></small></p>\n    </div>\n  </div>\n\n  <!-- Widgets -->\n  <div class=\'row\' id=\"widgets-section\">\n    <div id=\"widgets-container\" ui-sortable=\"sortableOptions\" ng-model=\"currentDhb.widgets\">\n      <div impac-widget widget=\"widget\" is-accessibility=\"accessibility\" parent-dashboard=\"currentDhb\" ng-repeat=\"widget in currentDhb.widgets track by widget.id\" class=\"widget-item\" ng-class=\"widget.getColClass()\" />\n      <!-- Add Widget Tile, enabled & customised in ImpacThemingProvider -->\n      <div ng-if=\"isAddChartEnabled\" class=\"unsortable\" ng-click=\"addChartTileOnClick()\">\n        <div class=\"col-md-6 widget-item add-chart\">\n          <div class=\"a-content\">+ chart</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"analytics\" ng-show=\"isLoading\">\n  <div class=\"row\">\n    <div class=\"col-md-12 loader-container text-center\" style=\"margin-top: 200px;\">\n      <i class=\"fa fa-refresh fa-spin\" style=\"font-size: 250px; opacity: 0.7;\"/>\n    </div>\n  </div>\n</div>");
$templateCache.put("dashboard/widget-suggestion.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3>Suggest a widget</h3>\n</div>\n\n<div class=\"modal-body\">\n\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <label>What would you name your widget?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.name\" ng-disabled=\"isLoading\" />\n    </div>\n    <div class=\"col-md-6\">\n      <label>In which category?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.category\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" />\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <label>What kind of information would your widget display?</label><br/>\n      <textarea ng-model=\"widgetDetails.description\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" ng-show=\"isLoading\" />\n\n  <div class=\"row\" collapse=\"!onSuccess\">\n    <div class=\"col-md-12 text-center\">\n      <h3 class=\"thanks-message\">{{userName | titleize}}, thanks a lot for helping us improve Impac!&trade;</h3>\n    </div>\n  </div>\n\n  <div class=\"row\" ng-show=\"error\">\n    <div class=\"col-md-12 text-center\">\n      <h5 style=\"color: red;\">\n        Unable to send suggestions request, please try again or contact technical support.\n      </h5>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-info\" ng-click=\"proceed()\" ng-disabled=\"!(widgetDetails.name && widgetDetails.category && widgetDetails.description) || isLoading\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n        Send your suggestion\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("kpi/kpi.tmpl.html","<div class=\"tile kpi\" ng-class=\"{ \'edit\': showEditSettings, \'static\': kpi.static }\">\n\n  <div ng-hide=\"showEditSettings\">\n    <div>\n      <small class=\"kpi-title\" ng-if=\"::kpi.static\">{{::kpi.name}}</small>\n      <small class=\"kpi-title\" ng-if=\"::!kpi.static\" editable-text=\"tmp.kpiName\" buttons=\"no\" onaftersave=\"updateName()\">{{kpi.name}}</small>\n      <div class=\"kpi-watch\" ng-if=\"::!kpi.static\">({{::kpi.element_watched}})</div>\n      <span class=\"kpi-value\">{{kpi.data.value | mnoCurrency : kpi.data.unit}}</span>\n\n      <!-- TODO: refactor design to handle multiple targets and ranges -->\n      <div class=\"kpi-alert\" ng-repeat=\"target in kpi.targets track by $index\" ng-hide=\"editMode || kpi.data.results[$index]\">\n        <span ng-show=\"target.max\">over {{target.max | mnoCurrency : kpi.data.unit : false}}</span>\n        <span ng-show=\"target.min\">below {{target.min | mnoCurrency : kpi.data.unit : false}}</span>\n      </div>\n\n      <div class=\"kpi-alert\" ng-show=\"editMode\" ng-click=\"displayEditSettings()\">Edit</div>\n      <div class=\"kpi-alert kpi-close\" ng-show=\"editMode\" ng-click=\"deleteKpi()\">x</div>\n    </div>\n  </div>\n\n  <div ng-show=\"showEditSettings\">\n    KPI target:\n\n    <!-- TODO: refactor design to handle multiple targets and ranges -->\n    <select class=\"form-control input-sm\" ng-model=\"limit.mode\" ng-options=\"option.mode as option.label for option in possibleTargets\" >\n    </select>\n\n    <input class=\"form-control input-sm\" type=\"text\" ng-model=\"limit.value\" style=\"width: 70%; float: left;\" />\n    <span style=\"margin-top: 10px; display: inline-block;\">{{kpi.data.unit}}</span>\n\n    <div ng-repeat=\"(param, paramValues) in possibleExtraParams track by $index\">\n      <div class=\"param-name\">Select {{param | titleize}}:</div>\n      <select class=\"form-control input-sm\" ng-model=\"kpi.extra_params[param]\" ng-options=\"value.id as value.label for value in paramValues\">\n      </select>\n    </div>\n\n    <button class=\"btn btn-sm btn-default\" ng-click=\"hideEditSettings()\">Cancel</button>\n    <button class=\"btn btn-sm btn-success\" ng-click=\"updateSettings()\">Save</button>\n  </div>\n\n</div>\n");
$templateCache.put("widget/widget.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" on-refresh=\"showWidget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div class=\"content\" ng-class=\"templateName\">\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    <div>\n      <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n      <p>Your data is being retrieved...</p>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\" ng-include=\"widgetContentTemplate()\" />\n</div>\n");
$templateCache.put("kpis-bar/kpis-bar.tmpl.html","<div class=\"row kpis\" ng-class=\"{expanded: showKpisExpanded}\">\n  <div class=\"title-actions col-xs-2\">\n\n    <div ng-click=\"toggleAvailableKpis()\"><a href=\"\"><i class=\"fa fa-plus\"></i> Attach KPI</a></div>\n    <div class=\"available-kpis-container\" collapse=\"hideAvailableKpis\">\n      <div ng-repeat=\"kpi in availableKpis\" class=\"available-kpi\" ng-init=\"kpi.element_watched = kpi.watchables[0]\">\n        <span class=\"kpi-name\">{{formatKpiName(kpi.endpoint)}}</span>\n        <button class=\"btn btn-sm btn-info\" ng-click=\"addKpi(kpi)\">+ Attach</button>\n        <select class=\"form-control-static input-sm\" ng-model=\"kpi.element_watched\" ng-options=\"watchable for watchable in kpi.watchables\"></select>\n      </div>\n    </div>\n\n    <div ng-click=\"toggleEditMode()\"><a href=\"\"><i class=\"fa fa-cog\"></i> Edit KPIs Settings</a></div>\n\n    <div ng-click=\"expandKpis()\" ng-hide=\"showKpisExpanded\"><a href=\"\"><i class=\"fa fa-chevron-down\"></i> Expand KPIs</a></div>\n    <div ng-click=\"collapseKpis()\" ng-show=\"showKpisExpanded\"><a href=\"\"><i class=\"fa fa-chevron-up\"></i> Collapse KPIs</a></div>\n\n  </div>\n\n  <impac-kpi class=\"col-xs-2\" kpi=\"kpi\" on-delete=\"removeKpi(kpi.id)\" edit-mode=\"showEditMode\" available-kpis=\"availableKpis\" ng-repeat=\"kpi in kpis track by $index\"></impac-kpi>\n</div>\n");
$templateCache.put("widgets/accounts-accounting-values.tmpl.html","<div widget-accounts-accounting-values>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">\n           {{ getCurrentPrice() | mnoCurrency : getCurrency() : false }}\n        </div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n        <div class=\"legend\">{{getLegend()}}</div>\n      </div>\n\n      <div class=\"history chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">{{getLegend()}}</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n  \n</div>");
$templateCache.put("widgets/accounts-assets-liability-summary.tmpl.html","<div widget-accounts-assets-liability-summary>\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\" class=\"chart-container\">\n      <!-- account classification selectors -->\n      <div setting-param-selector parent-widget=\"widget\" param=\"classification\" options=\"accountsOptions\" selected=\"selectedAccountsOption\" class=\"row param-selector\" deferred=\"::paramSelectorDeferred\"/>\n      <!---->\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <div class=\"title\" ng-show=\"widget.metadata.organization_ids.length==1\">{{widget.content.summary[0].company}} {{classification}}</div>\n        <div class=\"title\" ng-hide=\"widget.metadata.organization_ids.length==1\">{{classification}} repartition</div>\n        <span ng-repeat=\"valuePair in dataSource\">\n          <span style=\"font-weight: bold; color: {{getAccountColor(valuePair)}};\">{{valuePair.label}}</span>: {{valuePair.total | mnoCurrency : getCurrency()}}\n          <br />\n        </span>\n      </div>\n    </div>\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-assets-vs-liabilities.tmpl.html","<div widget-accounts-assets-vs-liabilities>\n      \n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\" class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\" style=\"max-height: 115px;\">\n        <div class=\"title\">\n          <i class=\"fa fa-circle\" style=\"color: {{assetsColor}};\"> Assets</i> | \n          <i class=\"fa fa-circle\" style=\"color: {{liabilitiesColor}};\"> Liabilities</i>\n        </div>\n        <div class=\"row\">\n          <div ng-repeat=\"data in companiesList\" ng-class=\"{\'col-md-6\': (widget.content.companies.length > 1), \'col-md-12\': (widget.content.companies.length == 1)}\">\n            <span>{{ data.company }}</span><br />\n            <span style=\"color: {{assetsColor}};\"> {{ data.assets | mnoCurrency : data.currency }}</span> <br/>\n            <span style=\"color: {{liabilitiesColor}};\"> {{ data.liabilities | mnoCurrency : data.currency }}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-assets-summary.tmpl.html","<div widget-accounts-assets-summary>\n      \n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\" class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <div class=\"title\" ng-show=\"widget.metadata.organization_ids.length==1\">{{widget.content.summary[0].company}} {{classification}}</div>\n        <div class=\"title\" ng-hide=\"widget.metadata.organization_ids.length==1\">{{classification}} repartition</div>\n        <span ng-repeat=\"valuePair in dataSource\">\n          <span style=\"font-weight: bold; color: {{getAccountColor(valuePair)}};\">{{valuePair.label}}</span>: {{valuePair.total | mnoCurrency : getCurrency()}}\n          <br />\n        </span>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-balance-sheet.tmpl.html","<div widget-accounts-balance-sheet>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"no-data-block\" ng-hide=\"isDataFound\">\n      No balance sheet can be generated between this {{period.label.toLowerCase()}} and the previous {{period.label.toLowerCase()}}. <br />\n      Maybe try selecting a longer period? <br />\n      <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorFrontDeferred\" />\n    </div>\n\n    <div ng-show=\"isDataFound\" class=\"widget-lines-container\">\n      <div class=\"row widget-line header\">\n        <div class=\"col-sm-6 text-left\">Compare with previous: <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorBackDeferred\" /></div>\n        <div class=\"col-sm-3 text-right\">{{widget.content.dates[0] | date : \"d-MMM\"}}</div>\n        <div class=\"col-sm-3 text-right\">{{widget.content.dates[1] | date : \"d-MMM\"}}</div>\n      </div>\n     \n      <div class=\"row widget-line total\" ng-repeat=\"category in categories\" >\n        <div class=\"row widget-line\" >\n          <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(category)\" style=\"cursor: pointer;\">\n            <i class=\"fa\" ng-class=\"isCollapsed(category) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n          </div>\n          <div class=\"col-sm-5 text-left\"><strong>{{category | titleize}}</strong></div>\n          <div class=\"col-sm-3 text-right\"><strong>{{widget.content.summary[category].totals[0] | mnoCurrency : widget.content.summary[category].currency}}</strong></div>\n          <div class=\"col-sm-3 text-right\"><strong>{{widget.content.summary[category].totals[1] | mnoCurrency : widget.content.summary[category].currency}}</strong></div>\n        </div>\n        \n        <div collapse=\"isCollapsed(category)\">\n          <div class=\"row widget-line\" ng-repeat=\"account in widget.content.summary[category].accounts\" >\n            <div class=\"col-sm-1\" />\n            <div class=\"col-sm-5 text-left\">{{account.name | titleize}}</div>\n            <div class=\"col-sm-3 text-right\">{{account.totals[0] | mnoCurrency : account.currency}}</div>\n            <div class=\"col-sm-3 text-right\">{{account.totals[1] | mnoCurrency : account.currency}}</div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-balance.tmpl.html","<div widget-accounts-balance>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-account parent-widget=\"widget\" class=\"part\" deferred=\"::accountBackDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <!-- Will be hidden once an account is selected -->\n      <div setting-account ng-hide=\"widget.selectedAccount\" parent-widget=\"widget\" label=\'Select an account to monitor\' on-account-selected=\"displayAccount()\" deferred=\"::accountFrontDeferred\" />\n\n      <!-- All the below divs will remain hidden until an account is selected -->\n      <div ng-show=\"widget.selectedAccount\">\n        <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n        <div ng-hide=\"widget.isHistoryMode\">\n          <h3>{{getName()}}</h3>\n          <div class=\"price\">\n             {{ getCurrentBalance() | mnoCurrency : getCurrency() : false }}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n\n        <div class=\"chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          <div class=\"legend\">{{getName()}}</div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-cash-summary.tmpl.html","<div widget-accounts-cash-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-1\" />\n            <div class=\"col-sm-5\"></div>\n            <div class=\"col-sm-3 text-right\">{{getLastDate() | date : \"d-MMM\"}}</div>\n            <div class=\"col-sm-3 text-right\">Variance</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n            <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(statement)\"><i class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-5\" ng-click=\"toggleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n              <div class=\"col-sm-3 text-right\" ng-click=\"toggleSelectedElement(statement)\"><strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong></div>\n              <div class=\"col-sm-3 text-right\" ng-click=\"toggleSelectedElement(statement)\" ng-class=\"getVarianceClassColor(getLastVariance(statement))\"><strong>{{getLastVariance(statement)}}</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(statement)\">\n              <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(account)\" ng-repeat=\"account in statement.accounts\" ng-class=\"isSelected(account) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-5\">{{account.name}}</div>\n                <div class=\"col-sm-3 text-right\">{{getLastValue(account) | mnoCurrency : account.currency }}</div>\n                <div class=\"col-sm-3 text-right\" ng-class=\"getVarianceClassColor(getLastVariance(account))\">{{getLastVariance(account)}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"right-panel text-center\" ng-class=\"{\'col-md-6\': widget.isExpanded(), \'col-md-12 invisible\': !widget.isExpanded()}\">\n\n        <div ng-show=\"selectedElement\">\n          <h4>{{getName(selectedElement) | titleize}}</h4>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div class=\"legend\">{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Cash Flow</div>\n          </div>\n          \n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line\">\n              <span class=\"text-center\" ng-repeat=\"date in dates track by $index\">\n                <div ng-if=\"$index % 6 == 0 && $index > 0\" class=\"clearfix dashed hidden-xs\"></div>\n\n                <div class=\"col-sm-2\" style=\"padding: 5px 0px;\">\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date | date : \"d-MMM\"}}</div></div>\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{selectedElement.cash_flows[$index] | mnoCurrency : selectedElement.currency }}</div></div>\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\" ng-class=\"getVarianceClassColor(selectedElement.variances[$index])\">{{formatVariance(selectedElement.variances[$index])}}</div></div>\n                </div>\n              </span>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"selectedElement\" class=\"no-element\">\n          Select an account or an account type to display the corresponding cash evolution.\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n    \n</div>");
$templateCache.put("widgets/accounts-class-comparison.tmpl.html","<div widget-accounts-class-comparison>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <!-- account classification selectors -->\n      <div setting-param-selector parent-widget=\"widget\" param=\"classification\" options=\"classifications\" selected=\"selectedClassification\" class=\"row param-selector\" deferred=\"::paramSelectorDeferred\" on-select=\"selectClassification()\" no-reload/>\n      <!---->\n      <div class=\"row\">\n        <div class=\"col-md-12 chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-12 widget-lines-container\">\n          <div ng-repeat=\"entity in widget.content.companies track by $index\">\n            <i style=\"float: right; margin-right: 10px;\">\n              {{formatAmount(selectedClassificationItem.totals[$index])}}\n            </i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getAccountColor(entity)}}\" />\n            {{entity}}\n          </div>\n        </div>\n      </div>\n    </div>\n    \n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-comparison.tmpl.html","<div widget-accounts-comparison>\n  <div setting-accounts-list parent-widget=\"widget\" deferred=\"::accountsListDeferred\" callbacks=\"callbacks\"/>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"beforeUpdateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n      <!-- multi-companies mode -->\n      <div ng-show=\"widget.metadata.organization_ids.length > 1\">\n        <div setting-params-checkboxes options=\"comparisonModeOptions\" param=\"comparison_mode\" parent-widget=\"widget\" deferred=\"::paramsCheckboxesDeferred\"/>\n      </div>\n      <!-- end -->\n      <div ng-hide=\"hasAccountsSelected()\" class=\"row\">\n        <h5>Select the accounts you wish to compare.</h5>\n        <div class=\"col-md-6\">\n          <div class=\"input-group\">\n            <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in widget.remainingAccounts\" class=\"form-control\" ng-show=\"widget.hasEditAbility\" ng-change=\"addAccount(movedAccount)\"></select>\n          </div>\n        </div>\n      </div>\n\n      <div ng-show=\"hasAccountsSelected()\">\n        <div class=\"row\">\n          <div class=\"col-md-12 chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"widget-lines-container\">\n              <div class=\"widget-line\" ng-repeat=\"account in widget.selectedAccounts track by $index\">\n                <div ng-if=\"isMultiCompanyMode()\" ng-repeat=\"groupedAccount in account.accounts track by $index\">\n                  <button class=\"close\" ng-click=\"removeAccount(account)\" ng-show=\"widget.hasDeleteAbility\">\n                    x\n                  </button>\n                  <i style=\"float: right; margin-right: 10px;\">{{formatAmount(groupedAccount)}}</i>\n                  <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getAccountColor(groupedAccount)}}\" />\n                  {{groupedAccount.name}}\n                </div>\n                <div ng-if=\"!isMultiCompanyMode()\">\n                  <button class=\"close\" ng-click=\"removeAccount(account)\" ng-show=\"widget.hasDeleteAbility\">\n                    x\n                  </button>\n                  <i style=\"float: right; margin-right: 10px;\">{{formatAmount(account)}}</i>\n                  <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getAccountColor(account)}}\" />\n                  {{account.name}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"add-account\">\n            <div class=\"input-group\">\n              <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in widget.remainingAccounts track by account.uid\" class=\"form-control\" ng-show=\"widget.hasDeleteAbility\" ng-change=\"addAccount(movedAccount)\" ng-disabled=\"widget.selectedAccounts.length >= 15 || widget.remainingAccounts.length == 0 || isMultiCompanyMode()\">\n                <option value=\"\" disabled selected>+ ADD ACCOUNT</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-custom-calculation.tmpl.html","<div widget-accounts-custom-calculation>\n\n  <div setting-organizations parent-widget=\"widget\" ng-hide=\"true\" deferred=\"::orgDeferred\" />\n  <div setting-accounts-list parent-widget=\"widget\" deferred=\"::accountsListDeferred\" />\n  <div setting-formula parent-widget=\"widget\" deferred=\"::formulaDeferred\" />\n\n  <h3 ng-show=\"widget.hasEditAbility && !widget.isFormulaCorrect\">\n    <a href=\"\" ng-click=\"formulaModal.open()\">Create a custom calculation</a>\n  </h3>\n  \n  <div class=\"price\" ng-show=\"widget.isFormulaCorrect\">\n    {{widget.evaluatedFormula}}\n  </div>\n  <div class=\"legend\" ng-show=\"widget.isFormulaCorrect\">\n    {{widget.legend}}\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-custom-calculation/formula.modal.html","<div class=\"analytics modal-custom-calculation\">\n  <div class=\"modal-header\">\n    <div class=\"close\" type=\"button\" ng-click=\"cancel()\" >×</div>\n    <h3>Custom Calculation</h3>\n  </div>\n\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <div class=\"alert alert-error\" ng-show=\"errors\">\n          <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n          <ul>\n            <li ng-repeat=\"error in errors\">{{error}}</li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"edit\">\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::modalOrgDeferred\" />\n    </div>\n\n    <p>Make a custom equation with your accounts, and save it as a widget. To create an equation, simply select your accounts in the list, and use the classical operators (example: ({1} + {2}) / {3})</p>\n\n    <div class=\'row\'>\n      <div ng-show=\"widget.isLoading\" class=\'col-md-6 loader\' align=\"center\">\n        <div>\n          <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n          <p>Your data is being retrieved...</p>\n        </div>\n      </div>\n\n      <div ng-hide=\"widget.isLoading\" class=\'col-md-6\'>\n        <div class=\'widget-line\' ng-repeat=\'account in widget.selectedAccounts track by $index\'>\n          <div class=\'row\'>\n            <div class=\'col-md-6\'>\n              {{$index+1}} - {{account.name}}\n            </div>\n            <div class=\'col-md-6\'>\n              {{account.current_balance | mnoCurrency : account.currency}}\n              <button class=\"close\" ng-click=\"removeAccountFromFormula(account)\" ng-show=\"widget.hasEditAbility\"><span class=\'fa fa-times-circle\'></span></button>\n            </div>\n          </div>\n        </div>\n\n        <div class=\'input-group\' ng-show=\"widget.hasEditAbility\">\n          <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + widget.formatAmount(account) + \')\' for account in widget.remainingAccounts\" class=\'form-control\' ng-change=\'addAccountToFormula(movedAccount)\'><select>\n        </div>\n      </div>\n      \n      <div ng-hide=\"widget.isLoading\" class=\'col-md-6\'>\n        <p>Type your formula just below:</p>\n        <input class=\'form-control\' ng-model=\"widget.formula\">\n\n        <p>Result: {{widget.evaluatedFormula}}</p>\n        <p>Legend: {{widget.legend}}</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <button class=\"btn btn-gray\" ng-click=\"cancel()\" ng-hide=\"widget.isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"proceed()\" ng-hide=\"widget.isLoading\" ng-disabled=\'!widget.isFormulaCorrect || widget.isLoading\'>\n          <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n          Save\n        </button>\n      </div>\n      \n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-detailed-classifications.tmpl.html","<div widget-accounts-detailed-classifications>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\" class=\"widget-lines-container\">\n\n      <div ng-hide=\"multiEntity\" class=\"row widget-line header\">{{widget.content.companies[0].name}} - Accounts classifications</div>\n\n      <div class=\"row widget-line total\" ng-repeat=\"source in dataSource track by source.label\">\n        <div class=\"row widget-line\">\n          <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(source.label)\" style=\"cursor: pointer;\">\n            <i class=\"fa\" ng-class=\"isCollapsed(source.label) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n          </div>\n          <div class=\"col-sm-5 text-left\"><strong>{{source.label | titleize}}</strong></div>\n          <div class=\"col-sm-6 text-right\"><strong>{{source.value | mnoCurrency : source.currency}}</strong></div>\n        </div>\n\n        <div collapse=\"isCollapsed(source.label)\">\n          <div class=\"row widget-line\" ng-repeat=\"entry in source.entries track by entry.label\" >\n            <div class=\"col-sm-1\" />\n            <div class=\"col-sm-5 text-left\">{{entry.label | titleize}}</div>\n            <div class=\"col-sm-6 text-right\">{{entry.value | mnoCurrency : entry.currency}}</div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n</div>\n\n");
$templateCache.put("widgets/accounts-expense-weight.tmpl.html","<div widget-accounts-expense-weight>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-account parent-widget=\"widget\" class=\"part\" deferred=\"::accountBackDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <!-- Will be hidden once an account is selected -->\n      <div setting-account ng-hide=\"widget.selectedAccount\" parent-widget=\"widget\" label=\'Select an expense account\' on-account-selected=\"updateSettings()\" deferred=\"::accountFrontDeferred\" />\n\n      <!-- The chart will remain hidden until an account is selected -->\n      <div class=\"chart-container\" ng-class=\"{\'invisible\': !widget.selectedAccount}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">\n          <div class=\"title\">\n            {{getName()}} to {{getComparator() | titleize}}\n            <span ng-if=\"widget.metadata.organization_ids.length==1\"><br /><strong>{{widget.content.summary[0].ratio | mnoCurrency : \'%\'}}</strong></span>\n          </div>\n          <span ng-repeat=\"sum in widget.content.summary\" ng-if=\"widget.metadata.organization_ids.length>1\">\n            <span style=\"font-weight: bold;\">{{sum.company}}: {{sum.ratio | mnoCurrency : \'%\'}}</span>\n            <br />\n          </span>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-expenses-revenue.tmpl.html","<div widget-accounts-expenses-revenue>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" on-toggle=\"widget.format()\" />\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        \n        <div class=\"legend\" ng-if=\"widget.isHistoryMode\">\n          <span ng-hide=\"isNetProfitDisplayed\">\n            <span class=\"negative2\">Expenses</span> -\n            <span class=\"positive2\">Revenue</span>\n          </span>\n          <span ng-show=\"isNetProfitDisplayed\">\n            <strong>Net Profit</strong>\n          </span>\n        </div>\n\n        <div ng-show=\"widget.isHistoryMode\" setting-params-checkboxes options=\"displayOptions\" param=\"display\" parent-widget=\"widget\" deferred=\"::paramsCheckboxesDeferred\"/>\n\n        <div class=\"legend\" ng-if=\"!widget.isHistoryMode\">\n          <span class=\"negative2\">Expenses: {{getCurrentExpenses() | mnoCurrency : getCurrency()}}</span>\n          </br>\n          <span class=\"positive2\">Revenue: {{getCurrentRevenue() | mnoCurrency : getCurrency()}}</span>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-payable-receivable.tmpl.html","<div widget-accounts-payable-receivable>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\">\n        <div class=\"receivable\">\n          <h3>Accounts Receivable</h3>\n          <div class=\"price positive2\">\n             {{getCurrentReceivable() | mnoCurrency : getCurrency() : false}}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n\n        <div class=\"payable\">\n          <h3>Accounts Payable</h3>\n          <div class=\"price negative2\">\n            {{getCurrentPayable() | mnoCurrency : getCurrency() : false}}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n      </div>\n\n      <div class=\"chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n        <div impac-chart draw-trigger=\"drawTrigger.promise\" deferred=\"chartDeferred\"></div>\n        <div class=\"legend\">\n          <span class=\"negative2\">Payable</span> -\n          <span class=\"positive2\">Receivable</span>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/accounts-profit-and-loss.tmpl.html","<div widget-accounts-profit-and-loss>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-8\">{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Profit and Loss</div>\n            <div class=\"col-sm-4 text-right\">{{getLastDate() | date : \"d-MMM\"}}</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n            <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(statement)\"><i ng-show=\"statement.accounts\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\" ng-click=\"toggleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n              <div class=\"col-sm-4 text-right\" ng-class=\"getClassColor(getLastValue(statement))\" ng-click=\"toggleSelectedElement(statement)\"><strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(statement)\">\n              <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(account)\" ng-repeat=\"account in statement.accounts\" ng-class=\"isSelected(account) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{account.name}}</div>\n                <div class=\"col-sm-4 text-right\" ng-class=\"getClassColor(getLastValue(account))\">{{getLastValue(account) | mnoCurrency : account.currency}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"right-panel text-center\" ng-class=\"{\'col-md-6\': widget.isExpanded(), \'col-md-12 invisible\': !widget.isExpanded()}\">\n\n        <div ng-show=\"hasElements()\"\n          <h4>{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Profit and Loss</h4>\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div class=\"row widget-line\">\n              <span class=\"text-center\" ng-repeat=\"date in dates track by $index\">\n                <div ng-if=\"$index % 6 == 0 && $index > 0\" class=\"clearfix dashed hidden-xs\"></div>\n\n                <div class=\"col-sm-2\" style=\"padding: 5px 0px;\">\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date | date : \"d-MMM\"}}</div></div>\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\" style=\"padding: 0px;\">{{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}</div></div>\n                </div>\n              </span>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n              <i style=\"float: right; margin-right: 10px;\" ng-class=\"getClassColor(getLastValue(element))\">{{getLastValue(element) | mnoCurrency : element.currency}}</i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              {{getName(element) | titleize}}\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\">\n          Select one or several account(s) or account(s) type(s) to display the corresponding PnL.\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-employee-details.tmpl.html","<div widget-hr-employee-details>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n        <div setting-param-selector parent-widget=\"widget\" param=\"employee_uid\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"row title\" deferred=\"::paramSelectorDeferred1\" />\n\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Job Title</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().job_title || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Company</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().company || getSingleCompanyName()}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Phone</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().phone || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Email</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().email || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Date of birth</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().dob || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Gender</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().gender || \"-\" }}</pre></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <div class=\"legend\">Salary calculation period: <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred2\" /></div>\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Salary</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().salary || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Address</label></div>\n            <div class=\"col-md-8\"><pre>{{formatAddress(getEmployee().address) || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Job location</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().location || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Supervisor</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().supervisor || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Statuts</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().employment_status || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Note</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().note || \"-\" }}</pre></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-employees-list.tmpl.html","<div widget-hr-employees-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" >\n\n      <div class=\"legend\">\n        <strong>{{widget.content.total.employees}}</strong> employee{{widget.content.total.employees > 1 ? \"s\" : null}} - Average salary rate (<span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred\"/>): <strong>{{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}</strong>\n      </div>\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-2\">Company</div>\n          <div class=\"col-sm-3\">Employee</div>\n          <div class=\"col-sm-2\">Title</div>\n          <div class=\"col-sm-3\">Phone</div>\n          <div class=\"col-sm-2\">Salary</div>\n        </div>\n        <div class=\"row widget-line\" ng-repeat=\"employee in widget.content.employees\" >\n          <div class=\"col-sm-2\">{{employee.company || getSingleCompanyName()}}</div>\n          <div class=\"col-sm-3\">{{employee.lastname}} {{employee.firstname}}</div>\n          <div class=\"col-sm-2\"><i>{{employee.job_title}}</i></div>\n          <div class=\"col-sm-3\">{{employee.phone}}</div>\n          <div class=\"col-sm-2\"><i>{{getEmployeeSalary(employee)}}</i></div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-leaves-balance.tmpl.html","<div widget-hr-leaves-balance>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\"/>\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" >\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"selector\" deferred=\"::paramSelectorDeferred\" />\n\n      <div class=\"widget-lines-container\">\n        <div class=\"widget-line\">\n          <i style=\"float: right; margin-right: 10px;\">{{getEmployee().total_leaves}} h</i>\n          Accrued\n        </div>\n        <div class=\"widget-line\">\n          <i style=\"float: right; margin-right: 10px;\">{{getEmployee().total_timeoff}} h</i>\n          Used\n        </div>\n      </div>\n\n      <h3>Leave Balance</h3>\n      <div class=\"balance\">{{(getEmployee().total_leaves - getEmployee().total_timeoff)}} hours</div>\n      <div class=\"legend\">\n        <span>(from {{widget.content.dates[0] | date : \"MMM-d\"}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \"MMM-d\"}})</span>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-leaves-schedule.tmpl.html","<div widget-hr-leaves-schedule>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div widget-component-calendar ng-model=\"eventSources\"></div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-payroll-summary.tmpl.html","<div widget-hr-payroll-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-12\">Payroll Summary - {{getPeriod()}}</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n            <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(statement)\"><i ng-show=\"statement.employees\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\" ng-click=\"toggleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n              <div class=\"col-sm-4 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                <strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong>\n              </div>\n            </div>\n            <div collapse=\"isCollapsed(statement)\">\n              <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(employee)\" ng-repeat=\"employee in statement.employees\" ng-class=\"isSelected(employee) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{employee.name}}</div>\n                <div class=\"col-sm-4 text-right\">\n                  <span>{{getLastValue(employee) | mnoCurrency : employee.currency}}</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"right-panel text-center\" ng-class=\"{\'col-md-6\': widget.isExpanded(), \'col-md-12 invisible\': !widget.isExpanded()}\">\n        \n        <div ng-show=\"hasElements()\">\n        \n          <h4>{{(widget.content.hist_parameters.period || \"Monthly\") | titleize}} Payroll Summary</h4>\n          <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" on-toggle=\"widget.format()\"/>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div ng-show=\"getTrackedField()\" class=\"legend\">{{getTrackedField()}}</div>\n            <div class=\"row widget-line\">\n              <span class=\"text-center\" ng-repeat=\"date in widget.content.dates track by $index\">\n                <div ng-if=\"$index % 6 == 0 && $index > 0\" class=\"clearfix dashed hidden-xs\"></div>\n\n                <div class=\"col-sm-2\" style=\"padding: 5px 0px;\">\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">\n                    {{formatDate(date)}}\n                    </div></div>\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">\n                    {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency }}\n                  </div></div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div ng-if=\"widget.isHistoryMode\" class=\"widget-line header\">\n              <span ng-show=\"getTrackedField()\">{{getTrackedField()}} - </span>From {{widget.content.dates[0] | date : \"MMM-d\"}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \"MMM-d\"}}\n            </div>\n            <div ng-if=\"!widget.isHistoryMode\" class=\"widget-line header\">\n              <span ng-show=\"getTrackedField()\">{{getTrackedField()}} - </span>{{getPeriod()}}\n            </div>\n\n            <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n              <i style=\"float: right; margin-right: 10px;\">\n                <span ng-if=\"widget.isHistoryMode\">{{getTotalSum(element) | mnoCurrency : element.currency}}</span>\n                <span ng-if=\"!widget.isHistoryMode\">{{getLastValue(element) | mnoCurrency : element.currency}}</span>\n              </i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              {{getName(element) | titleize}}\n            </div>\n\n          </div>\n\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\">\n          Select one or several employee(s) or category(ies) to display the corresponding summary\n        </div>\n      \n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-payroll-taxes.tmpl.html","<div widget-hr-payroll-taxes>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">{{getCurrentPrice() | mnoCurrency : getCurrency() : false}}</div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n        <div class=\"legend\">Taxes upon workforce costs<br />{{getPeriod()}}</div>\n      </div>\n\n      <div class=\"history chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">Taxes upon workforce costs</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-salaries-summary.tmpl.html","<div widget-hr-salaries-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <h3 class=\"left\">Average Salary Rate</h3>\n        <div class=\"price\">\n           {{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}\n        </div>\n        <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred1\"/>\n        <div class=\"legend\">\n          <span>({{widget.content.total.employees}} employee{{widget.content.total.employees > 1 ? \"s\" : null}} with known salary)</span>\n        </div>\n      </div>\n\n      <div class=\"right-panel\" ng-class=\"{\'col-md-12 invisible\': !widget.isExpanded(), \'col-md-6\': widget.isExpanded()}\">\n        <h3 class=\"right\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/></h3>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n            <i style=\"float: right; margin-right: 10px;\"><b>{{data.value | mnoCurrency : widget.content.total.currency}} (av.)</b></i>\n            <i ng-hide=\"widget.content.summary.filter==\'age_range\'\" class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n            {{data.label}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-superannuation-accruals.tmpl.html","<div widget-hr-superannuation-accruals>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" deferred=\"::paramSelectorDeferred\" />\n\n      <h3>Superannuation Balance</h3>\n      <div class=\"price\">{{getEmployee().total_super | mnoCurrency : getEmployee().currency}}</div>\n      <div class=\"legend\">\n        <span>(from {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}})</span>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-timesheets.tmpl.html","<div widget-hr-timesheets>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" deferred=\"::paramSelectorDeferred\" />\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-12\">From {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}</div>\n        </div>\n        <div class=\"row widget-line total\" >\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(\'total_time_worked\')\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(\'total_time_worked\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n            <div class=\"col-sm-7\"><strong>Total Time Worked</strong></div>\n            <div class=\"col-sm-4 text-right\"><strong>{{getEmployeeTimeWorked()}} h</strong></div>\n          </div>\n          <div collapse=\"isCollapsed(\'total_time_worked\')\">\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-11\"><i>Activities detail not found</i></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row widget-line total\" >\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(\'total_time_of\')\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(\'total_time_of\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n            <div class=\"col-sm-7\"><strong>Total Time Off</strong></div>\n            <div class=\"col-sm-4 text-right\"><strong>{{getEmployeeTimeOff()}} h</strong></div>\n          </div>\n          <div collapse=\"isCollapsed(\'total_time_of\')\">\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-7\">PTO</div>\n              <div class=\"col-sm-4 text-right\">0 h</div>\n            </div>\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-7\">Vacation</div>\n              <div class=\"col-sm-4 text-right\">0 h</div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/hr-workforce-summary.tmpl.html","<div widget-hr-workforce-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <h3 class=\"left\">Total Workforce</h3>\n        <div class=\"price\">\n           {{getTotalWorkforce() | mnoCurrency : getCurrency()}}\n        </div>\n        <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred1\"/>\n        <div class=\"legend\">\n          <span>({{getNumberOfEmployees()}} employee{{getNumberOfEmployees() > 1 ? \'s\' : null}} with known salary)</span>\n        </div>\n      </div>\n\n      <div class=\"right-panel\" ng-class=\"{\'col-md-12 invisible\': !widget.isExpanded(), \'col-md-6\': widget.isExpanded()}\">\n        <h3 class=\"right\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/></h3>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n            <i style=\"float: right; margin-right: 10px;\"><b>{{((data.value / widget.content.total.amount)*100).toFixed()}}%</b></i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n            {{widget.content.summary.filter == \"salary_range\" ? formatSalaryRange(data) : data.label}}\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/invoices-aged-payables-receivables.tmpl.html","<div widget-invoices-aged-payables-receivables>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-8\">Aged Payables & Receivables</div>\n            <div class=\"col-sm-4 text-right\">{{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}</div>\n          </div>\n\n          <!-- Payables -->\n          <div class=\"row widget-line total\">\n            <div class=\"row widget-line\" ng-class=\"isSelected(widget.content.payables) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(widget.content.payables)\">\n                <i ng-show=\"widget.content.payables.suppliers\" class=\"fa\" ng-class=\"isCollapsed(widget.content.payables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n              </div>\n              <div class=\"col-sm-7\" ng-click=\"toggleSelectedElement(widget.content.payables)\">\n                <strong>Aged Payables</strong>\n              </div>\n              <div class=\"col-sm-4 text-right\" ng-click=\"toggleSelectedElement(widget.content.payables)\">\n                <strong>{{getTotalSum(widget.content.payables) | mnoCurrency : widget.content.payables.currency}}</strong>\n              </div>\n            </div>\n            <div ng-hide=\"isCollapsed(widget.content.payables)\">\n              <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(supplier)\" ng-repeat=\"supplier in widget.content.payables.suppliers\" ng-class=\"isSelected(supplier) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{supplier.name}}</div>\n                <div class=\"col-sm-4 text-right\">\n                  <span>{{getTotalSum(supplier) | mnoCurrency : supplier.currency}}</span>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <!-- Receivables -->\n          <div class=\"row widget-line total\">\n            <div class=\"row widget-line\" ng-class=\"isSelected(widget.content.receivables) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(widget.content.receivables)\">\n                <i ng-show=\"widget.content.receivables.customers\" class=\"fa\" ng-class=\"isCollapsed(widget.content.receivables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n              </div>\n              <div class=\"col-sm-7\" ng-click=\"toggleSelectedElement(widget.content.receivables)\">\n                <strong>Aged Receivables</strong>\n              </div>\n              <div class=\"col-sm-4 text-right\" ng-click=\"toggleSelectedElement(widget.content.receivables)\">\n                <strong>{{getTotalSum(widget.content.receivables) | mnoCurrency : widget.content.receivables.currency}}</strong>\n              </div>\n            </div>\n            <div ng-hide=\"isCollapsed(widget.content.receivables)\">\n              <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(customer)\" ng-repeat=\"customer in widget.content.receivables.customers\" ng-class=\"isSelected(customer) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{customer.name}}</div>\n                <div class=\"col-sm-4 text-right\">\n                  <span>{{getTotalSum(customer) | mnoCurrency : customer.currency}}</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"right-panel text-center\" ng-class=\"{\'col-md-6\': widget.isExpanded(), \'col-md-12 invisible\': !widget.isExpanded()}\">\n          \n        <div ng-show=\"hasElements()\">\n\n          <h4>{{(widget.content.hist_parameters.period || \"Monthly\") | titleize}} Aged Payables and Receivables</h4>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div class=\"row widget-line\">\n              <span class=\"text-center\" ng-repeat=\"date in widget.content.dates track by $index\">\n                <div ng-if=\"$index % 6 == 0 && $index > 0\" class=\"clearfix dashed hidden-xs\"></div>\n\n                <div class=\"col-sm-2\" style=\"padding: 5px 0px;\">\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">\n                    {{date | date : \'MMM-d\'}}\n                  </div></div>\n                  <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">\n                    {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n                  </div></div>\n                </div>\n              </span>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div class=\"widget-line header\">\n              Total from {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}\n            </div>\n\n            <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n              <i style=\"float: right; margin-right: 10px;\">\n                <span>{{getTotalSum(element) | mnoCurrency : element.currency}}</span>\n              </i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              {{getName(element) | titleize}}\n            </div>\n\n          </div>\n\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\">\n          Select one or several account(s) or category(ies) to display the payables/receivables evolution(s).\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/invoices-list.accessible.tmpl.html","<div widget-invoices-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <table class=\"table widget-lines-container\" ng-hide=\"widget.isEditMode\">\n\n    <!-- Header line -->\n    <tr class=\"widget-line header\">\n      <td>{{entityTypeCap}}</td>\n      <td>Paid</td>\n      <td>Due</td>\n      <td>Invoiced</td>\n    </tr>\n\n    <!-- Data not found line -->\n    <tr class=\"widget-line\" ng-hide=\"isDataFound\">\n      <td>No {{orderBy}}invoice found for your {{entityType}}</td>\n    </tr>\n    \n    <!-- Content lines -->\n    <tr class=\"widget-line\" ng-show=\"isDataFound\" ng-repeat=\"entity in widget.content.entities\">\n      <td>{{entity.name}}</td>\n      <td><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></td>\n      <td><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></td>\n      <td><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></td>\n    </tr>\n\n  </table>\n\n</div>\n");
$templateCache.put("widgets/invoices-list.tmpl.html","<div widget-invoices-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\" class=\"widget-lines-container\">\n\n    <div ng-show=\"isDataFound\" setting-limit-entries parent-widget=\"widget\" deferred=\"::limitEntriesDeferred\" selected=\"limitEntriesSelected\" max=\"widget.content.entities.length\" entries-label=\"limitEntriesLabel\" />\n\n    <!-- Header line -->\n    <!-- when large widget -->\n    <div class=\"row widget-line header\" ng-show=\"widget.width > 3\">\n      <div class=\"col-sm-4\">{{entityTypeCap}}</div>\n      <div class=\"col-sm-7\">\n        <div class=\"col-xs-4\">Paid</div>\n        <div class=\"col-xs-4\">Due</div>\n        <div class=\"col-xs-4\">Invoiced</div>\n      </div>\n    </div>\n\n    <!-- when small widget -->\n    <div class=\"row widget-line header\" ng-hide=\"widget.width > 3\">\n      <div class=\"col-xs-7\">{{entityTypeCap}}</div>\n      <div class=\"col-xs-4\" ng-show=\"orderBy == \'paid \'\">Paid</div>\n      <div class=\"col-xs-4\" ng-show=\"orderBy == \'due \'\">Due</div>\n      <div class=\"col-xs-4\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\">Invoiced</div>\n    </div>\n\n    <!-- Data not found line -->\n    <div class=\"row widget-line\" ng-hide=\"isDataFound\">\n      <div class=\"col-xs-11\">No {{orderBy}}invoice found for your {{entityType}}</div>\n    </div>\n\n    <!-- Content lines -->\n    <!-- when large widget -->\n    <div ng-if=\"widget.width > 3\" class=\"row widget-line\" ng-show=\"isDataFound\" ng-repeat=\"entity in widget.content.entities | limitTo:limitEntriesSelected\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getInvoices(entity)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n      <div class=\"col-sm-4\">{{entity.name}}</div>\n      <div class=\"col-sm-7\">\n        <div class=\"col-xs-4\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n        <div class=\"col-xs-4\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n        <div class=\"col-xs-4\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n      </div>\n      <div class=\"col-sm-1\"><i class=\"fa fa-info-circle\" /></div>\n    </div>\n\n    <!-- when small widget -->\n    <div ng-if=\"widget.width <= 3\" class=\"row widget-line\" ng-show=\"isDataFound\" ng-repeat=\"entity in widget.content.entities | limitTo:limitEntriesSelected\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getInvoices(entity)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n      <div class=\"col-xs-7\">{{entity.name}}</div>\n      <div class=\"col-xs-4\" ng-show=\"orderBy == \'paid \'\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-4\" ng-show=\"orderBy == \'due \'\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-4\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n      <div><i class=\"fa fa-info-circle\" /></div>\n    </div>\n\n  </div>\n\n</div>\n");
$templateCache.put("widgets/invoices-summary.tmpl.html","<div widget-invoices-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-chart-filters parent-widget=\"widget\" class=\"part\" deferred=\"::chartFiltersDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\" class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <span>{{widget.content.legend}}</span>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-aged.tmpl.html","<div widget-sales-aged>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"center\">\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload truncate-no=\"60\" on-select=\"widget.format()\" style=\"text-align: center;\" deferred=\"::paramSelectorDeferred\"/>\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n      <div class=\"legend\">From {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line\">\n          <span class=\"text-center\" ng-repeat=\"date in formattedDates track by $index\">\n            <div ng-if=\"$index % 6 == 0 && $index > 0\" class=\"clearfix dashed hidden-xs\"></div>\n\n            <div class=\"col-sm-2\" style=\"padding: 5px 0px;\">\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date}}</div></div>\n            \n              <div class=\"row widget-line\">\n                <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" style=\"padding: 0px;\">\n                  {{getTotal($index) | mnoCurrency : widget.content.currency : false}}\n                  <br />\n                  {{widget.content.currency}}\n                </div>\n                <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" style=\"padding: 0px;\">\n                  {{getTotal($index)}}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      \n    </div>\n  </div>\n  <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n</div>\n");
$templateCache.put("widgets/sales-break-even.tmpl.html","<div widget-sales-break-even>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"align-center\">\n\n      <div class=\"legend\">From {{widget.content.period.from | date : \'d MMM yyyy\'}} to {{widget.content.period.to | date : \'d MMM yyyy\'}}</div>\n\n      <div class=\"block to-date\">\n        <div class=\"title\">Sales to Date</div>\n        <div class=\"price\">{{widget.content.sales.to_date | mnoCurrency : widget.content.currency : false}}</div>\n        Target: <span class=\"edit-target\" style=\"float: right;\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"updateSettings()\">\n          {{threshold | mnoCurrency : widget.content.currency : false}}\n        </span>\n      </div>\n\n      <div ng-show=\"widget.content.break_even\" class=\"block to-breakeven\">\n        <div class=\"title\">Projection to Break-Even</div>\n        <span ng-show=\"isTargetMet()\">Your sales already exceed your target by:</span>\n        <div class=\"price\">{{getVariance() | mnoCurrency : widget.content.currency : false}}</div>\n        <span ng-hide=\"isTargetMet()\">\n          Projected date: <span style=\"float: right;\">{{getProjectedDate() | date : \'d-MM-yy\'}}</span>\n          <br />\n          Opportunities to close: <span style=\"float: right;\">{{getOpportunitiesToClose()}}</span>\n        </span>\n      </div>\n      <div ng-show=\"widget.content.break_even\" class=\"legend\">{{widget.content.break_even.eligible_opportunities}} eligible opportunities</div>\n\n      <div ng-hide=\"widget.content.break_even\" class=\"block to-breakeven\">\n        <span class=\"edit-target\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"updateSettings()\">\n          <div class=\"define-text\">Click to define your sales target</div>\n        </span>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-comparison.tmpl.html","<div widget-sales-comparison>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"row legend center\">\n          Compare by: <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"criteria\" options=\"criteriaOptions\" selected=\"criteria\" truncate-no=\"30\" deferred=\"::paramSelectorDeferred1\" />\n           |\n          See: <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" truncate-no=\"30\" on-select=\"widget.format()\" no-reload deferred=\"::paramSelectorDeferred2\" />\n        </div>\n\n        <div class=\"widget-lines-container\" style=\"max-height: 530px;\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-12\">Total sales from {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.sales_comparison\" >\n            <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n              <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(statement)\"><i ng-show=\"statement.sales\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\" ng-click=\"toggleSelectedElement(statement)\"><strong>{{statement.name | titleize}}</strong></div>\n              <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\" ng-click=\"toggleSelectedElement(statement)\"><strong>{{getTotalForPeriod(statement)}}</strong></div>\n              <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\" ng-click=\"toggleSelectedElement(statement)\"><strong>{{getTotalForPeriod(statement) | mnoCurrency : statement.currency}}</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(statement)\">\n              <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(sale)\" ng-repeat=\"sale in statement.sales\" ng-class=\"isSelected(sale) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{sale.name}}</div>\n                <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\">{{getTotalForPeriod(sale)}}</div>\n                <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\">{{getTotalForPeriod(sale) | mnoCurrency : sale.currency}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"right-panel text-center\" ng-class=\"{\'col-md-6\': widget.isExpanded(), \'col-md-12 invisible\': !widget.isExpanded()}\">\n\n        <div ng-show=\"hasElements()\">\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line header\">\n              <div class=\"col-sm-12\">Total sales from {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n            </div>\n            <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n              <i ng-show=\"filter.value == \'quantity_sold\'\" style=\"float: right; margin-right: 10px;\">{{getTotalForPeriod(element)}}</i>\n              <i ng-hide=\"filter.value == \'quantity_sold\'\" style=\"float: right; margin-right: 10px;\">{{getTotalForPeriod(element) | mnoCurrency : element.currency}}</i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              {{element.name | titleize}}\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\">\n          Select one or several sales category(ies) to display the corresponding comparison.\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-customer-details.tmpl.html","<div widget-sales-customer-details>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n        <div setting-param-selector parent-widget=\"widget\" param=\"customer_uid\" options=\"customersOptions\" selected=\"selectedCustomer\" class=\"row title\" deferred=\"::paramSelectorDeferred\" />\n\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Email</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().email}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Phone</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().phone}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Website</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().website}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Contact</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().contact}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>City</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().city}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label>Country</label></div>\n            <div class=\"col-md-8\"><pre>{{getCustomer().country}}</pre></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <div class=\"details-container\">\n          <div class=\"row\" style=\"border-bottom: solid 1px #e6e6e6; margin-bottom: 10px; padding-bottom: 5px;\">\n            <div class=\"col-md-3\"><label>Address</label></div>\n            <div class=\"col-md-9\"><pre>{{formatAddress(getCustomer().full_address)}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12 center legend\">From {{getFromDate() | date : \'d MMM yyyy\'}} to {{getToDate() | date : \'d MMM yyyy\'}}:</div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total invoiced</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_invoiced | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total paid</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_paid | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label>Total due</label></div>\n            <div class=\"col-md-7\"><pre>{{getCustomer().total_due | mnoCurrency : getCustomer().currency}}</pre></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-cycle.tmpl.html","<div widget-sales-cycle>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\" class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <span>Your sales cycle represents how much time your leads stay set to each status</span>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-forecast.tmpl.html","<div widget-sales-forecast>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" >\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n\n      <div class=\"widget-lines-container\" style=\"max-height: 340px;\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-12\">Projection on the next 6 months</div>\n        </div>\n        <div class=\"row widget-line total\" ng-repeat=\"date in widget.content.dates.slice(6) track by $index\" ng-init=\"collapsed = true\" >\n          <div class=\"row widget-line\" ng-class=\"{main: widget.content.opportunities.slice(6)[$index].length > 0}\" ng-click=\"collapsed = !collapsed\" >\n            <div class=\"col-sm-6\">{{date | date : \'MMMM yyyy\'}}</div>\n            <div class=\"col-sm-6 text-right\"><strong>{{widget.content.totals.slice(6)[$index] | mnoCurrency : widget.content.currency}}</strong></div>\n          </div>\n          <div collapse=\"collapsed\">\n            <div class=\"row widget-line\" ng-repeat=\"opp in widget.content.opportunities.slice(6)[$index]\" >\n              <div class=\"col-sm-6\">{{opp.name}}</div>\n              <div class=\"col-sm-6 text-right\">{{getOpportunityAmount(opp) | mnoCurrency : getOpportunityCurrency(opp)}}</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-growth.tmpl.html","<div widget-sales-growth>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"selector\">\n        <div setting-param-selector parent-widget=\"widget\" param=\"product\" options=\"productOptions\" selected=\"product\" no-reload on-select=\"widget.format()\" deferred=\"::paramSelectorDeferred1\"/>\n        <div ng-show=\"product.value != -1\" setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/>\n      </div>\n\n      <div class=\"chart-container\" ng-class=\"{\'invisible\': product.value==-1}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n\n      <div ng-show=\"product.value != -1\" class=\"legend text-center\">{{getSelectedProduct().name}}</div>\n      <div class=\"price text-center\" ng-hide=\"isDataQuantity || product.value == -1\" tooltip=\"total for last period\">{{getCurrentValue() | mnoCurrency : getSelectedProduct().currency}}</div>\n      <div class=\"price text-center\" ng-show=\"isDataQuantity && product.value != -1\" tooltip=\"total for last period\">{{getCurrentValue()}}</div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-leads-funnel.tmpl.html","<div widget-sales-leads-funnel>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"legend\">Your leads sales funnel from {{widget.content.from | date : \'d MMM yyyy\'}} to {{widget.content.to | date : \'d MMM yyyy\'}}</div>\n\n        <div class=\"funnel-container\">\n          <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toggleSelectStatus(elem.status)\">\n            <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n            <div class=\"main-text\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedStatus\" class=\"currency\">\n          Select a status to display a list of the corresponding leads\n        </div>\n\n        <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n          <div class=\"row widget-line total\" ng-repeat=\"lead in getSelectedLeads()\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getLeadDescription(lead)}}\" tooltip-animation=\"false\"  tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-7\">\n                {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n                <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n              </div>\n              <div class=\"col-sm-5 text-right\"><strong>{{lead.lead_status | titleize}}</strong></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-leads-list.tmpl.html","<div widget-sales-leads-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line total\" ng-repeat=\"lead in widget.content.leads\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getLeadDescription(lead)}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-7\">\n              {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n              <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n            </div>\n            <div class=\"col-sm-5 text-right\"><strong>{{lead.lead_status | titleize}}</strong></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-list.tmpl.html","<div widget-sales-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"selector\">\n        See: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred1\"/> for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred2\"/>\n        ({{widget.content.hist_parameters.from | date : \"d MMM\"}} to {{widget.content.hist_parameters.to | date : \"d MMM\"}})\n      </div>\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line total\" ng-repeat=\"company in widget.content.summary\" >\n          <div class=\"row widget-line\" >\n            <div class=\"col-sm-1\" ng-click=\"toggleCollapsed(company.name)\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(company.name) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n            <div class=\"col-sm-7\"><strong>{{company.name | titleize}}</strong></div>\n            <div class=\"col-sm-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\"><strong>{{company.total}}</strong></div>\n            <div class=\"col-sm-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\"><strong>{{company.total | mnoCurrency : company.currency}}</strong></div>\n          </div>\n          <div collapse=\"isCollapsed(company.name)\">\n            <div class=\"row widget-line\" ng-repeat=\"product in company.products\" >\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-7\">{{product.name | titleize}}</div>\n              <div class=\"col-sm-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\"><strong>{{product.total}}</strong></div>\n              <div class=\"col-sm-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\"><strong>{{product.total | mnoCurrency : product.currency}}</strong></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-margin.tmpl.html","<div widget-sales-margin>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div ng-show=\"isDataFound\">\n      <div setting-hist-mode parent-widget= \"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">\n           {{ getTotalMargin() | mnoCurrency : getCurrency()}}\n        </div>\n        <div class=\"legend\">\n          Total sold - Total purchased\n          </br>\n          {{getTimeSpan()}}\n          </br>\n          <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload on-select=\"widget.format()\" deferred=\"::paramSelectorDeferred\" />\n        </div>\n      </div>\n\n      <div class=\"history chart-container\" ng-class=\"{\'invisible\': !widget.isHistoryMode}\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">Total sold - Total purchased</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-number-of-leads.tmpl.html","<div widget-sales-number-of-leads>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"align-center\">\n      <div class=\"selector\">\n        Leads for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred\" />\n      </div>\n\n      <div class=\"stats\">\n        <div class=\"stat row align-left\" ng-repeat=\"carac in [\'new\', \'converted\', \'lost\']\">\n          <div class=\"col-md-6 title\" style=\"padding: 0px;\">{{carac | titleize}}</div>\n          <div class=\"col-md-6\" style=\"padding: 0px;\">\n            <span class=\"variation\" ng-class=\"formatNumberOfLeads(carac).color\">{{formatNumberOfLeads(carac).variation}}</span>\n            <span class=\"nominal\">{{formatNumberOfLeads(carac).nominal}}</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"legend\">\n      {{widget.content.number_of_leads.total[1]}} leads in total\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-opportunities-funnel.tmpl.html","<div widget-sales-opportunities-funnel>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"sales_stage_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\': \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"legend\">Your opportunities, sorted by sales stage</div>\n\n        <div class=\"funnel-container\">\n          <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toggleSelectStatus(elem.status)\">\n            <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n            <div class=\"main-text\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedStatus\" class=\"currency\">\n          Select a sales stage to display a list of the corresponding opportunities\n        </div>\n\n        <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n          <div class=\"row widget-line total\" ng-repeat=\"opp in getSelectedOpportunities()\">\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-6\">\n                {{opp.name | titleize}}\n              </div>\n              <div class=\"col-sm-6 text-right\"><strong>{{getOppDetails(opp)}}</strong></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-performance.tmpl.html","<div widget-sales-performance>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n\n    <div ng-show=\"isDataFound\" class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-5\">from {{widget.content.dates[0] | date : \'dd-MM-yy\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'dd-MM-yy\'}}</div>\n            <div class=\"col-sm-3 text-right\">Win ratio</div>\n            <div class=\"col-sm-4 text-right\">Total won</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"assignee in widget.content.assignees\" >\n            <div class=\"row widget-line\" ng-class=\"{\'selected\': isSelected(assignee)}\" ng-click=\"toggleSelectedElement(assignee)\" >\n              <div class=\"col-sm-5\"><strong>{{assignee.name | titleize}}</strong></div>\n              <div class=\"col-sm-3 text-right\"><strong>{{assignee.win_ratio | mnoCurrency : \'%\'}}</strong></div>\n              <div class=\"col-sm-4 text-right\"><strong>{{assignee.total_won | mnoCurrency}}</strong></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"right-panel text-center\" ng-class=\"{\'col-md-6\': widget.isExpanded(), \'col-md-12 invisible\': !widget.isExpanded()}\">\n\n        <div ng-show=\"selectedElement\">\n          <h4>{{selectedElement.name | titleize}}</h4>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div class=\"legend\">Total won (last 12 months): {{selectedElement.total_won | mnoCurrency}}</div>\n          </div>\n          \n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line total\" ng-init=\"collapsedWon=false\">\n              <div class=\"row widget-line\" style=\"cursor: pointer;\" ng-click=\"collapsedWon=!collapsedWon\">\n                <div class=\"col-sm-10\"><strong>Closed Won</strong></div>\n                <div class=\"col-sm-2 text-right\"><strong>{{getWonOpportunities(selectedElement).length}}</strong></div>\n              </div>\n              <div collapse=\"collapsedWon\">\n                <div class=\"row widget-line\" ng-repeat=\"opp in getWonOpportunities(selectedElement)\">\n                  <div class=\"col-sm-6\">{{opp.name}}</div>\n                  <div class=\"col-sm-3 text-right\">{{getCloseDate(opp)}}</div>\n                  <div class=\"col-sm-3 text-right\">{{opp.amount.amount | mnoCurrency}}</div>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"row widget-line total\" ng-init=\"collapsedLost=false\">\n              <div class=\"row widget-line\" style=\"cursor: pointer;\" ng-click=\"collapsedLost=!collapsedLost\">\n                <div class=\"col-sm-10\"><strong>Closed Lost</strong></div>\n                <div class=\"col-sm-2 text-right\"><strong>{{getLostOpportunities(selectedElement).length}}</strong></div>\n              </div>\n              <div collapse=\"collapsedLost\">\n                <div class=\"row widget-line\" ng-repeat=\"opp in getLostOpportunities(selectedElement)\" >\n                  <div class=\"col-sm-6\">{{opp.name}}</div>\n                  <div class=\"col-sm-3 text-right\">{{getCloseDate(opp)}}</div>\n                  <div class=\"col-sm-3 text-right\">{{opp.amount.amount | mnoCurrency}}</div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"selectedElement\" class=\"no-element\">\n          Select an employee or team to display the corresponding opportunities won/lost.\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-segmented-turnover.tmpl.html","<div widget-sales-segmented-turnover>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-range parent-widget=\"widget\" class=\"part\" deferred=\"::timeRangeDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\"></div>\n\n        <div class=\"selector\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred\"/></div>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"widget-line\">\n            Average price range\n          </div>\n          <div class=\"widget-line\" ng-repeat=\"range in widget.content.ranges\">\n            <i style=\"float: right; margin-right: 10px;\">{{range.percentage}}%</i>\n            <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n            {{getRangeLabel(range.label)}}\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <i class=\"fa fa-info-circle\" style=\"float: left;\" tooltip=\"This widget segments your revenue by products average price range and propose an analysis of its composition\" />\n        <h3 style=\"margin: 25px 10px; text-align: center;\">{{getMaxRange().percentage.toFixed()}}% of your revenue comes from products sold at an average price between {{getMaxRange().label.split(\'-\')[0] | mnoCurrency : widget.content.currency}} and {{getMaxRange().label.split(\'-\')[1] | mnoCurrency : widget.content.currency}}.</h3>\n        <div class=\'analysis hidden-md\' >{{getAnalysis()}}</div>\n      </div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-summary.tmpl.html","<div widget-sales-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-chart-filters parent-widget=\"widget\" class=\"part\" deferred=\"::chartFiltersDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\" class=\"selector\">\n      See: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred1\" />\n      for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred2\"/>\n      ({{widget.content.hist_parameters.from | date : \'d MMM\'}} to {{widget.content.hist_parameters.to | date : \'d MMM\'}})\n    </div>\n\n    <div class=\"chart-container\" ng-show=\"isDataFound\" ng-class=\"{\'invisible\': incorrectPeriod}\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n    </div>\n\n    <div class=\"data-not-found\" ng-if=\"incorrectPeriod\">\n      <div class=\"message\">No data found for this period<br/> Please select another one</div>\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n\n</div>");
$templateCache.put("widgets/sales-top-opportunities.tmpl.html","<div widget-sales-top-opportunities>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div ng-show=\"isDataFound\">\n\n      <div class=\"legend\">\n        Total potential: <b>{{widget.content.total_potential | mnoCurrency : widget.content.currency || \"AUD\"}}</b> - <b>{{widget.content.eligible_opportunities}}</b> eligible opportunities\n      </div>\n\n      <div class=\"opps-container\">\n        <div class=\"tile\" ng-repeat=\"opp in widget.content.opportunities track by $index\" ng-class=\"getOppClass($index)\">\n          <div class=\"colored-area\">{{$index +1 }}</div>\n          <div class=\"main-text\">\n            {{opp.name | titleize}}\n            <br />\n            <i style=\"font-size: 13px;\">{{getOppDetails(opp)}}</i>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"::widget.category\" />\n  </div>\n    \n</div>");
$templateCache.put("widgets-common/data-not-found.tmpl.html","<div class=\"data-not-found\">\n  <!-- <img check-image ng-src=\"{{bgImage}}\" /> -->\n	<img ng-src=\"{{bgImage}}\" />\n	<div class=\"message\">\n	  {{content.mainMessage}}\n		<a ng-href=\"{{content.linkUrl}}\" target=\"{{content.linkTarget}}\">\n			{{content.linkMessage}}\n		</a>\n	</div>\n</div>\n");
$templateCache.put("widgets-common/editable-title.tmpl.html","<div class=\"visible-lg title-wrapper\" ng-if=\"parentWidget.width >= 3 && parentWidget.width < 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:19:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:19:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-lg title-wrapper\" ng-if=\"parentWidget.width >= 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:80:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:80:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-md visible-sm title-wrapper\" ng-if=\"parentWidget.width == 3 && parentWidget.width < 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:13:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:13:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-md visible-sm title-wrapper\" ng-if=\"parentWidget.width >= 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:60:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:60:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-xs title-wrapper\">\n  <!-- Title edition no designed for mobile -->\n  <div class=\"title\">\n  	{{parentWidget.name | truncate:25:\".\"}}\n  </div>\n</div>");
$templateCache.put("widgets-common/top-buttons.tmpl.html","<div id=\"module__top-buttons\">\n  <div ng-mouseenter=\"showCloseActive=true\" ng-mouseleave=\"showCloseActive=false\" ng-show=\"parentWidget.hasDeleteAbility\">\n    <button class=\"btn btn-close top-button\" ng-click=\"showConfirmDelete = !showConfirmDelete\">\n      <i class=\"fa fa-times-circle-o fa-lg\"></i>\n      <span class=\"text-hide\">Delete widget</span>\n    </button>\n  </div>\n\n  <div ng-show=\"parentWidget.hasEditAbility\">\n    <button class=\"btn top-button btn-edit\" ng-click=\"toggleEditMode()\" ng-class=\"{\'edit-mode\': parentWidget.isEditMode}\">\n      <i class=\"fa fa-cog fa-lg\"></i>\n      <span class=\"text-hide\">Edit widget</span>\n    </button>\n  </div>\n\n  <div class=\"refresh-widget\">\n    <button class=\"btn top-button btn-refresh\" ng-click=\"onRefresh({refreshCache: true})\">\n      <i class=\"fa fa-refresh\"></i>\n      <span class=\"text-hide\">Refresh widget</span>\n    </button>\n  </div>\n\n  <div class=\"confirm-delete-popover\" ng-show=\"showConfirmDelete\">\n    <h4>Are you sure you want to delete this widget ?</h4>\n    <p>(it will not erase your data)</p>\n    <div ng-hide=\"isDeletePopoverLoading\">\n      <button ng-click=\"showConfirmDelete = false\" class=\"btn btn-sm btn-default\">Cancel</button>\n      <button ng-click=\"deleteWidget()\" class=\"btn btn-sm btn-danger\" style=\"margin-left: 10px;\">Delete</button>\n    </div>\n    <div ng-show=\"isDeletePopoverLoading\" class=\"loader\" align=\"center\">\n      <div>\n        <i class=\"fa fa-spinner fa-pulse fa-4x\"></i>\n      </div>\n    </div>\n  </div>\n</div>\n\n");
$templateCache.put("widgets-settings/account.tmpl.html","<h5 ng-if=\"showLabel\">{{label}}</h5>\n<div class=\"input-group settings select-account\">\n<!-- <<<<<<< HEAD\n	<select ng-model=\"parentWidget.selectedAccount\" ng-change=\"onAccountSelected()\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in parentWidget.content.account_list track by account.uid\" class=\"form-control\" />\n</div>\n======= -->\n	<select ng-model=\"parentWidget.selectedAccount\" ng-change=\"onAccountSelected()\" ng-options=\"formatLabel(account) for account in parentWidget.content.account_list track by account.uid\" class=\"form-control\" />\n</div>\n<!-- >>>>>>> develop -->\n");
$templateCache.put("widgets-settings/chart-filters.tmpl.html","<div class=\"settings chart-filters\">\n  <h5>Chart filters</h5>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <input type=\"radio\" ng-model=\"filterCriteria\" value=\"number\">\n      <label for=\"number\" ng-click=\"filterCriteria = \'number\'\">Top {{filterValueNumber}} {{entityType}}</label>\n    </div>\n    <div class=\"col-md-6\">\n      <input type=\"range\" ng-model=\"filterValueNumber\" ng-change=\"filterCriteria = \'number\'\" min=\"3\" max=\"{{maxEntities}}\" step=\"1\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <input type=\"radio\" ng-model=\"filterCriteria\" value=\"percentage\">\n      <label for=\"percentage\" ng-click=\"filterCriteria = \'percentage\'\">Top {{filterValuePercentage}}% {{filterLabel}}</label>\n    </div>\n    <div class=\"col-md-6\">\n      <input type=\"range\" ng-model=\"filterValuePercentage\" ng-change=\"filterCriteria = \'percentage\'\" min=\"20\" max=\"100\" step=\"5\">\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/hist-mode.tmpl.html","<div class=\"settings hist-mode-choser\">\n  <div align=\"center\" class=\"options\">\n    <a ng-click=\"toggleHistMode(\'current\')\" ng-class=\"!parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">current</a> |\n    <a ng-click=\"toggleHistMode(\'history\')\" ng-class=\"parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">history</a>\n  </div>\n  <div class=\"{{parentWidget.isHistoryMode ? \'arrow-container right\' : \'arrow-container left\'}}\">\n    <div class=\"arrow\" />\n    <div class=\"arrow-border\" />\n  </div>\n</div>");
$templateCache.put("widgets-settings/limit-entries.tmpl.html","<div class=\"settings limit-entries\">\n  {{ entriesLabel ? \'Top\' : \'Display\' }}\n\n  <span ng-repeat=\"option in options | filter:isOptionValid:option track by $index\">\n    {{ $index!=0 ? \' |\' : \'\' }} \n    <a target=\'#\' ng-click=\"selectOption(option)\" class=\"option\" ng-class=\"{badge: option==selected}\">{{ option }}</a>\n  </span>\n\n  <span ng-if=\"max\">\n    | \n    <a target=\'#\' ng-click=\"selectOption(max)\" class=\"option\" ng-class=\"{badge: (!selected || selected==max)}\">{{ max }}</a>\n  </span>\n\n   {{entriesLabel || \'entries\'}}\n</div>");
$templateCache.put("widgets-settings/organizations.tmpl.html","<div class=\"settings organizations\">\n  <h5>Select Companies</h5>\n\n  <div class=\"widget-lines-container\">\n    <div class=\"widget-line\" ng-repeat=\"org in dashboardOrganizations\">\n      {{org.label}}\n      <i ng-class=\"isOrganizationSelected(org.uid) ? \'fa fa-toggle-on\' : \'fa fa-toggle-off\'\" ng-click=\"toggleSelectOrganization(org.uid)\" tooltip=\"{{isOrganizationSelected(org.uid) ? \'disable\' : \'enable\'}}\" tooltip-append-to-body=\"true\" />\n    </div>\n  </div>\n</div>");
$templateCache.put("widgets-settings/param-selector.tmpl.html","<span class=\"settings param-selector\">\n	<a ng-click=\"toggleShowOptions()\">{{selected.label | titleize | truncate : getTruncateValue() : \"...\" : false}} <i class=\"fa fa-chevron-down\" /></a>\n	<div class=\"options-container\" collapse=\"!showOptions\">\n		<div ng-repeat=\"option in options\" ng-click=\"selectOption(option)\">\n			{{option.label | titleize}}\n		</div>\n	</div>\n</span>");
$templateCache.put("widgets-settings/params-checkboxes.tmpl.html","<div ng-repeat=\"parameter in options track by $index\" class=\"settings params-checkboxes\">\n  <label>\n    <input type=\"checkbox\" ng-model=\"parameter.value\" ng-change=\"parameter.onChangeCallback()\">\n    <span>{{parameter.label}}</span>\n  </label>\n</div>\n");
$templateCache.put("widgets-settings/params-picker.tmpl.html","<h5>{{formattedParam | titleize}}</h5>\n<div class=\"settings params-picker\">\n  <div style=\"margin-bottom: 8px;\">\n    The selected criteria will be displayed in this order (drag/drop to modify):\n  </div>\n  <div ui:sortable=\"sortableOptions\" ng-model=\"options\" class=\"input-group\">\n    <span ng-repeat=\"parameter in options track by $index\" class=\"parameter\" ng-class=\"!parameter.selected ? \'unchecked\' : \'\'\">\n      <span class=\"badge\">{{$index + 1}}</span>\n      {{parameter.label | titleize}}\n      <input type=\"checkbox\" ng-model=\"parameter.selected\" />\n    </span>\n  </div>\n</div>");
$templateCache.put("widgets-settings/time-range.tmpl.html","<h5>Time range</h5>\n<div class=\"settings time-range\">\n	<div class=\"row\">\n	  <div class=\"col-md-12\">\n	    Show last {{numberOfPeriods}} {{periodToUnit()}}\n	  </div>\n	</div>\n	<div class=\"row input-group\" align=\"center\" style=\"margin: 0; margin-top: 3px;\">\n	  <div class=\"col-xs-6\" style=\"padding: 0; padding-right: 5px;\">\n	    <select ng-model=\"selectedPeriod\" ng-options=\"period.toLowerCase() for period in PERIODS track by period\" class=\"form-control\" style=\"height: 22px; margin-top: 0; padding: 0; padding-left: 1px; padding-bottom: 1px;\"></select>\n	  </div>\n	  <div class=\"col-xs-6\" style=\"padding: 0;\">\n	    <input type=\"range\" ng-model=\"numberOfPeriods\" min=\"1\" max=\"12\" step=\"1\">\n	  </div>\n	</div>\n</div>");
$templateCache.put("widgets-settings/width.tmpl.html","<i class=\"fa fa-angle-double-left reduce\" ng-show=\"expanded\" ng-click=\"parentWidget.toggleExpanded()\" tooltip=\"reduce\"/>\n<i class=\"fa fa-angle-double-right expand\" ng-hide=\"expanded\" ng-click=\"parentWidget.toggleExpanded()\" tooltip=\"expand\"/>");}]);
}());
(function () {
'use strict';
angular.module('impac.filters.mno-currency', []).filter('mnoCurrency', [
  "$filter", function($filter) {
    return function(amount, currency, showName) {
      var s;
      if (showName == null) {
        showName = true;
      }
      if (amount != null) {
        s = $filter('currency')(amount);
        s = s.replace('(', '-');
        s = s.replace(')', '');
        if (currency != null) {
          if (currency === "EUR") {
            s = s.replace('$', '');
            s = s.replace(',', ' ');
            s = s.replace('.', ',');
            return s + " €";
          } else if (currency !== "AUD" && currency !== "USD") {
            s = s.replace('$', '');
            if (!currency.match(/[A-Z]{3}/) && currency !== '%') {
              s = parseInt(s);
            }
          }
        }
        if (showName && (currency != null)) {
          return s + " " + currency;
        } else {
          return s;
        }
      } else {
        return "";
      }
    };
  }
]);
}).call(this);
(function () {
'use strict';
angular.module('impac.filters.titleize', []).filter('titleize', function() {
  return function(s) {
    s = s === void 0 || s === null ? '' : s;
    return s.toString().toLowerCase().replace(/\b([a-z])/g, function(ch) {
      return ch.toUpperCase();
    });
  };
});
}).call(this);
(function () {
'use strict';
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
angular.module('impac.components.chart', []).directive('impacChart', ["$timeout", "$log", function($timeout, $log) {
  return {
    restrict: 'A',
    scope: {
      drawTrigger: '=',
      deferred: '='
    },
    template: '<canvas></canvas>',
    link: function(scope, elem, attr) {
      var checkVisibilityAndDraw, hasVisibleParents, options;
      options = {
        bezierCurve: true,
        pointDotRadius: 3,
        responsive: true,
        scaleShowLabels: true,
        scaleShowLabelBackdrop: true,
        scaleBeginAtZero: true,
        scaleShowGridLines: true
      };
      scope.draw = function(data) {
        var canvas, ctx;
        if (!_.isEmpty(data.options)) {
          angular.extend(options, data.options);
        }
        elem.children().get(0).remove();
        elem.append('<canvas></canvas>');
        canvas = elem.children().get(0);
        ctx = canvas.getContext("2d");
        switch (data.chartType) {
          case 'Bar':
            return new Chart(ctx).Bar(data.data, options);
          case 'Line':
            return new Chart(ctx).Line(data.data, options);
          case 'Pie':
            angular.extend(options, {
              tooltipFixed: true
            });
            return new Chart(ctx).Pie(data.data, options);
        }
      };
      hasVisibleParents = function(element) {
        var e, error1, parent;
        if (angular.isDefined(element.parent) && (element.parent() != null) && angular.isDefined(element.parent().css)) {
          parent = element.parent();
          try {
            return (parent.css('display') !== 'none') && hasVisibleParents(parent);
          } catch (error1) {
            e = error1;
            return true;
          }
        } else {
          return true;
        }
      };
      checkVisibilityAndDraw = function(chartData) {
        if (hasVisibleParents(elem)) {
          return scope.draw(chartData);
        } else {
          return $timeout((function() {
            return checkVisibilityAndDraw(chartData);
          }), 50);
        }
      };
      scope.drawTrigger.then(function(success) {
        return $log.warn('chart promise has been resolved: use notify instead');
      }, function(error) {
        return $log.error(error);
      }, function(chartData) {
        return $timeout(function() {
          return checkVisibilityAndDraw(chartData);
        });
      });
      return scope.deferred.resolve('chart ready');
    }
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
  this.combinedBarChart = function(inputData, opts, positivesOnly) {
    var index, result;
    if (opts == null) {
      opts = {};
    }
    if (positivesOnly == null) {
      positivesOnly = true;
    }
    index = 0;
    result = {
      chartType: 'Bar',
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
            fillColor: color,
            strokeColor: color,
            highlightFill: color,
            highlightStroke: color
          };
        })
      }
    };
    return result;
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
var module;

module = angular.module('impac.components.dashboard', []);

module.controller('ImpacDashboardCtrl', ["$scope", "$http", "$q", "$filter", "$modal", "$log", "$timeout", "$templateCache", "MsgBus", "ImpacUtilities", "ImpacAssets", "ImpacTheming", "ImpacRoutes", "ImpacMainSvc", "ImpacDashboardsSvc", "ImpacWidgetsSvc", function($scope, $http, $q, $filter, $modal, $log, $timeout, $templateCache, MsgBus, ImpacUtilities, ImpacAssets, ImpacTheming, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc) {
  var saveDashboard, updatePlaceHolderSize;
  $scope.isLoading = true;
  $scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
  $scope.widgetsList = ImpacDashboardsSvc.getWidgetsTemplates();
  $scope.impacTitleLogo = ImpacAssets.get('impacTitleLogo');
  $scope.impacDashboardBackground = ImpacAssets.get('impacDashboardBackground');
  $scope.showDhbHeading = ImpacTheming.get().dhbConfig.showDhbHeading;
  $scope.dhbHeadingText = ImpacTheming.get().dhbConfig.dhbHeadingText;
  $scope.dhbErrorsConfig = ImpacTheming.get().dhbErrorsConfig;
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
  ImpacDashboardsSvc.load(true).then(function(success) {
    return $scope.activateTimer();
  });
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
    self.isLoading = true;
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
      self.selectMode('single');
      return self.isLoading = false;
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
      self.isLoading = false;
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
    apiPath: ImpacRoutes.sendWidgetSuggestion()
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
  $scope.sortableOptions = {
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
  return $scope.activateTimer = function() {
    var timer, w;
    $scope.isLoading = true;
    w = $scope.currentDhb.widgets;
    timer = 250;
    if (w != null) {
      timer = Math.max(100 * w.length, 500);
    }
    return $timeout(function() {
      return $scope.isLoading = false;
    }, timer);
  };
}]);

module.directive('impacDashboard', ["$templateCache", function($templateCache) {
  return {
    restrict: 'EA',
    scope: {},
    template: $templateCache.get('dashboard/dashboard.tmpl.html'),
    controller: 'ImpacDashboardCtrl'
  };
}]);
}).call(this);
(function () {
'use strict';
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
          self.isLoading = false;
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
(function () {
'use strict';
angular.module('impac.services.dashboards', []).service('ImpacDashboardsSvc', ["$q", "$http", "$log", "ImpacMainSvc", "ImpacRoutes", "ImpacKpisSvc", function($q, $http, $log, ImpacMainSvc, ImpacRoutes, ImpacKpisSvc) {
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
  this.load = function(force) {
    var deferred;
    if (force == null) {
      force = false;
    }
    deferred = $q.defer();
    if (needConfigurationLoad() || force) {
      ImpacMainSvc.loadOrganizations(force).then(function(success) {
        var orgId;
        orgId = success.currentOrganization.id;
        return $http.get(ImpacRoutes.baseDhbPath(orgId)).then(function(dashboards) {
          _self.setDashboards(dashboards.data).then(function() {
            _self.setCurrentDashboard();
            return deferred.resolve(_self.config);
          });
          return function(error) {
            return deferred.reject(error);
          };
        }, function(error) {
          $log.error("Impac - DashboardSvc: cannot retrieve dashboards list for org: " + orgId);
          return deferred.reject(error);
        });
      }, function(error) {
        $log.error("Impac - DashboardSvc: cannot retrieve current organization");
        return deferred.reject(error);
      });
    } else {
      deferred.resolve(_self.config);
    }
    return deferred.promise;
  };
  setDefaultCurrentDashboard = function() {
    if ((_self.config.dashboards != null) && _self.config.dashboards.length > 0) {
      $log.info("Impac - DashboardSvc: first dashboard set as current by default");
      ImpacMainSvc.override(_self.config.currentDashboard, _self.config.dashboards[0]);
      _self.setWidgetsTemplates(_self.config.currentDashboard.widgets_templates);
      ImpacKpisSvc.initialize(_self.config.currentDashboard);
      _self.initializeActiveTabs();
      return true;
    } else {
      $log.warn("Impac - DashboardSvc: cannot set default current dashboard");
      ImpacMainSvc.override(_self.config.currentDashboard, {});
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
        ImpacKpisSvc.initialize(_self.config.currentDashboard);
        _self.initializeActiveTabs();
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
    });
  };
  this.setWidgetsTemplates = function(templatesArray) {
    var i, len, template;
    if (_.isEmpty(templatesArray) || !_.isEmpty(_self.config.widgetsTemplates)) {
      return false;
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
    var data, deferred;
    deferred = $q.defer();
    data = {
      dashboard: dashboard
    };
    $http.post(ImpacRoutes.createDhbPath(), data).then(function(success) {
      _self.config.dashboards.push(success.data);
      _self.setCurrentDashboard(success.data.id);
      return deferred.resolve(success.data);
    }, function(error) {
      $log.error("Impac - DashboardSvc: cannot create dashboard with parameters: " + dashboard);
      return deferred.reject(error);
    });
    return deferred.promise;
  };
  this["delete"] = function(id) {
    var deferred;
    deferred = $q.defer();
    $http["delete"](ImpacRoutes.deleteDhbPath(id)).then(function(success) {
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
    $http.put(ImpacRoutes.updateDhbPath(id), data).then(function(success) {
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
(function () {
'use strict';
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
      $scope.availableKpis = ImpacKpisSvc.getKpisTemplates();
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
      $scope.tmp = {
        kpiName: ''
      };
      if (!$scope.kpi["static"]) {
        ImpacKpisSvc.show($scope.kpi).then(function(success) {
          var base, kpiTemplate;
          kpiTemplate = _.find($scope.availableKpis, function(aKpi) {
            return aKpi.endpoint === $scope.kpi.endpoint;
          });
          if ((kpiTemplate != null) && (kpiTemplate.extra_params != null)) {
            $scope.possibleExtraParams = kpiTemplate.extra_params;
          }
          (base = $scope.kpi).targets || (base.targets = []);
          if (!_.isEmpty($scope.kpi.targets[0])) {
            $scope.limit.mode = _.keys($scope.kpi.targets[0])[0];
            return $scope.limit.value = _.values($scope.kpi.targets[0])[0];
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
        if (_.isEmpty($scope.tmp.kpiName)) {
          return;
        }
        $scope.kpi.name = $scope.tmp.kpiName;
        return ImpacKpisSvc.update($scope.kpi, {
          name: $scope.kpi.name
        });
      };
      $scope.updateSettings = function() {
        var params, target0;
        params = {};
        if (!(_.isEmpty($scope.limit.value || _.isEmpty($scope.limit.mode)))) {
          target0 = {};
          target0[$scope.limit.mode] = $scope.limit.value;
          params.targets = [target0];
        }
        if (!_.isEmpty($scope.kpi.extra_params)) {
          params.extra_params = $scope.kpi.extra_params;
        }
        if (!_.isEmpty(params)) {
          ImpacKpisSvc.update($scope.kpi, params);
        }
        return $scope.showEditSettings = false;
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
(function () {
'use strict';
angular.module('impac.services.kpis', []).service('ImpacKpisSvc', ["$log", "$http", "$filter", "$q", "ImpacRoutes", "ImpacMainSvc", function($log, $http, $filter, $q, ImpacRoutes, ImpacMainSvc) {
  var _self, formatShowQuery, index, isInitialized;
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
      params = {
        sso_session: _self.config.ssoSessionId,
        metadata: {
          organization_ids: orgUids
        }
      };
      promises = {
        impac: index(params)
      };
      if (ImpacRoutes.localKpisBasePath()) {
        promises.local = $http.get(ImpacRoutes.localKpisBasePath());
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
    host = ImpacRoutes.impacKpisBasePath();
    url = [host, decodeURIComponent($.param(params))].join('?');
    return $http.get(url);
  };
  this.show = function(kpi) {
    var deferred, host, params, url;
    deferred = $q.defer();
    if (!isInitialized()) {
      $log.error('ImpacKpisSvc - Service not initialized');
      deferred.reject({
        error: {
          message: 'ImpacKpisSvc is not initialized'
        }
      });
    } else {
      params = {};
      params.sso_session = _self.config.ssoSessionId;
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
          host = ImpacRoutes.impacKpisBasePath();
          break;
        case 'local':
          host = ImpacRoutes.localKpisBasePath();
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
    if (!isInitialized()) {
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
      url = ImpacRoutes.createKpiPath(_self.config.currentDashboardId);
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
    url = ImpacRoutes.updateKpiPath(kpi.id);
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
    url = ImpacRoutes.deleteKpiPath(kpi.id);
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
(function () {
'use strict';
angular.module('impac.components.kpis-bar', []).directive('kpisBar', ["$templateCache", "ImpacKpisSvc", function($templateCache, ImpacKpisSvc) {
  return {
    restrict: 'E',
    scope: {
      kpis: '='
    },
    template: $templateCache.get('kpis-bar/kpis-bar.tmpl.html'),
    controller: ["$scope", "$timeout", function($scope, $timeout) {
      $scope.hideAvailableKpis = true;
      $scope.showKpisExpanded = false;
      $scope.showEditMode = false;
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
        return ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched).then(function(success) {
          return $scope.kpis.push(success);
        }, function(error) {
          return $log.error("Impac Kpis bar can't add a kpi", error);
        });
      };
      $scope.removeKpi = function(kpiId) {
        var kpisList;
        kpisList = angular.copy($scope.kpis);
        return $scope.kpis = _.reject(kpisList, function(kpi) {
          return kpi.id === kpiId;
        });
      };
      $scope.toggleEditMode = function() {
        return $scope.showEditMode = !$scope.showEditMode;
      };
      $scope.expandKpis = function() {
        return $scope.showKpisExpanded = true;
      };
      return $scope.collapseKpis = function() {
        return $scope.showKpisExpanded = false;
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
(function () {
'use strict';
angular.module('impac.services.main', []).service('ImpacMainSvc', ["$q", "$log", "ImpacLinking", "ImpacRoutes", function($q, $log, ImpacLinking, ImpacRoutes) {
  var _self, isConfigurationLoaded, setDefaultCurrentOrganization;
  _self = this;
  this.config = {};
  this.config.organizations = [];
  this.config.currentOrganization = {};
  this.config.userData = {};
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
    sendWidgetSuggestionPath: null,
    kpiBasePath: '/mnoe/jpi/v1/impac/kpis',
    impacKpisBasePath: 'http://localhost:4000/api/v2/kpis',
    localKpisBasePath: null
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
    service.sendWidgetSuggestion = function() {
      return defaults.sendWidgetSuggestionPath;
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
      return defaults.kpiBasePath + "/" + id;
    };
    service.deleteKpiPath = function(id) {
      return defaults.kpiBasePath + "/" + id;
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
      linkUrl: '/apps',
      linkTarget: '_blank'
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
angular.module('impac.services.utilities', []).service('ImpacUtilities', function() {
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
});
}).call(this);
(function () {
'use strict';
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
    }, function(errorResponse) {
      w.isLoading = false;
      if ((errorResponse.data != null) && errorResponse.data.error) {
        return $log.error(errorResponse.data.error);
      }
    });
  };
  $scope.initSettings = function() {
    w.isEditMode = false;
    return ImpacWidgetsSvc.initWidgetSettings(w);
  };
  $scope.updateSettings = function(needContentReload) {
    if (needContentReload == null) {
      needContentReload = true;
    }
    w.isEditMode = false;
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
      isAccessibility: '='
    },
    controller: 'ImpacWidgetCtrl',
    link: function(scope, element) {
      scope.widget.isLoading = true;
      scope.widget.settings = [];
      scope.widget.hasEditAbility = true;
      scope.widget.hasDeleteAbility = true;
      return scope.widgetContentTemplate = function() {
        var splittedPath, templatePath;
        if (scope.widget.metadata.template) {
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
(function () {
'use strict';
angular.module('impac.services.widgets', []).service('ImpacWidgetsSvc', ["$q", "$http", "$log", "ImpacRoutes", "ImpacMainSvc", "ImpacDashboardsSvc", function($q, $http, $log, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc) {
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
      var dashboard, data;
      dashboard = ImpacDashboardsSvc.getCurrentDashboard();
      data = {
        widget: opts
      };
      return $http.post(ImpacRoutes.createWidgetPath(dashboard.id), data).then(function(success) {
        var newWidget;
        newWidget = success.data;
        dashboard.widgets.push(newWidget);
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
    var deferred, i, len, meta, ref, setting;
    if (needContentReload == null) {
      needContentReload = true;
    }
    deferred = $q.defer();
    if (_.isEmpty(widget.settings)) {
      deferred.reject('no setting to update');
    } else {
      if (needContentReload) {
        widget.isLoading = true;
      }
      meta = {};
      ref = widget.settings;
      for (i = 0, len = ref.length; i < len; i++) {
        setting = ref[i];
        angular.merge(meta, setting.toMetadata());
      }
      _self.update(widget, {
        metadata: meta
      }).then(function(updatedSettingsWidget) {
        if (needContentReload) {
          return _self.show(updatedSettingsWidget).then(function(updatedContentWidget) {
            updatedContentWidget.isLoading = false;
            return deferred.resolve(updatedContentWidget);
          }, function(error) {
            updatedSettingsWidget.isLoading = false;
            return deferred.reject(error);
          });
        } else {
          return deferred.resolve(updatedSettingsWidget);
        }
      }, function(error) {
        return deferred.reject(error);
      });
    }
    return deferred.promise;
  };
  this.show = function(widget, refreshCache) {
    var deferred;
    if (refreshCache == null) {
      refreshCache = false;
    }
    deferred = $q.defer();
    _self.load().then(function(config) {
      var data;
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
        return $http.post(ImpacRoutes.showWidgetPath(widget.id), data).then(function(success) {
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
          widget.isLoading = false;
          if (angular.isDefined(widget.format)) {
            widget.format();
          }
          return deferred.resolve(widget);
        }, function(errorResponse) {
          $log.error("ImpacWidgetsSvc: cannot retrieve widget (" + widget.id + ") content from API");
          if (angular.isDefined(widget.processError) && (errorResponse.data != null) && errorResponse.data.error) {
            widget.processError(errorResponse.data.error);
          }
          return deferred.reject(errorResponse);
        });
      }
    }, function(errors) {
      $log.error("ImpacWidgetsSvc: error while trying to load the service");
      return deferred.reject(error);
    });
    return deferred.promise;
  };
  this.update = function(widget, opts) {
    var data, deferred;
    deferred = $q.defer();
    _self.load().then(function(config) {}, !isWidgetInCurrentDashboard(widget.id) ? ($log.info("ImpacWidgetsSvc: trying to update a widget (id: " + widget.id + ") that is not in currentDashboard"), deferred.reject("trying to update a widget (id: " + widget.id + ") that is not in currentDashboard")) : (data = {
      widget: opts
    }, $http.put(ImpacRoutes.updateWidgetPath(widget.id), data).then(function(success) {
      var updatedWidget;
      updatedWidget = success.data;
      angular.extend(widget, updatedWidget);
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
      var dashboard;
      dashboard = ImpacDashboardsSvc.getCurrentDashboard();
      return $http["delete"](ImpacRoutes.deleteWidgetPath(widgetToDelete.id)).then(function(success) {
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-common.data-not-found', []);

module.directive('commonDataNotFound', ["$templateCache", "$log", "$http", "ImpacAssets", "ImpacTheming", function($templateCache, $log, $http, ImpacAssets, ImpacTheming) {
  return {
    restrict: 'A',
    scope: {
      widgetEngine: '='
    },
    controller: ["$scope", function($scope) {
      var assetPath, baseDir, dir;
      $scope.bgImage = '';
      $scope.content = ImpacTheming.get().dataNotFoundConfig;
      baseDir = ImpacAssets.get('dataNotFound');
      if ($scope.widgetEngine && baseDir.length > 0) {
        dir = baseDir.split('');
        dir = dir[dir.length - 1] !== '/' ? dir.concat('/').join('') : dir.join('');
        assetPath = dir + $scope.widgetEngine + '.png';
        return $http.get(assetPath).then(function(success) {
          return $scope.bgImage = assetPath;
        }, function(error) {
          return $log.warn("Missing data-not-found image for " + $scope.widgetEngine);
        });
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
      return ImpacWidgetsSvc.update(w, data).then(function(success) {
        return true;
      }, function(error) {
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

module.controller('CommonTopButtonsCtrl', ["$scope", "$rootScope", "$log", "ImpacWidgetsSvc", "ImpacAssets", "ImpacUtilities", function($scope, $rootScope, $log, ImpacWidgetsSvc, ImpacAssets, ImpacUtilities) {
  var w;
  w = $scope.parentWidget;
  $scope.showCloseActive = false;
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-accounting-values', []);

module.controller('WidgetAccountsAccountingValuesCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.histModeDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
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
    var all_values_are_positive, chartData, data, inputData, options;
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
(function () {
'use strict';
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
    if (w.metadata.organization_ids.length > 1) {
      return $scope.dataSource = w.content.repartition;
    } else {
      return $scope.dataSource = w.content.summary;
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
(function () {
'use strict';
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
    if (w.metadata.organization_ids.length > 1) {
      $scope.dataSource = w.content.repartition;
    } else {
      $scope.dataSource = w.content.summary;
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
(function () {
'use strict';
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-balance', []);

module.controller('WidgetAccountsBalanceCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.accountBackDeferred = $q.defer();
  $scope.accountFrontDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.histModeDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.accountBackDeferred, $scope.accountFrontDeferred, $scope.timeRangeDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
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
    var all_values_are_positive, chartData, data, inputData, options;
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
(function () {
'use strict';
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-cash-summary', []);

module.controller('WidgetAccountsCashSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
  var selectedElementSetting, settingsPromises, unCollapsedSetting, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.widthDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
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
    var all_values_are_positive, chartData, data, inputData, labels, options;
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
      chartData = ChartFormatterSvc.lineChart([inputData], options);
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
(function () {
'use strict';
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
        $scope.selectedClassification = angular.copy(_.find($scope.classifications, {
          value: w.metadata.classification || $scope.classifications[0].value
        }));
      }
      return $scope.selectClassification();
    }
  };
  $scope.selectClassification = function() {
    $scope.selectedClassificationItem = _.find(w.content.summary, function(sum) {
      return sum.classification === $scope.selectedClassification.value;
    });
    return w.format();
  };
  $scope.getAccountColor = function(anEntity) {
    return ChartFormatterSvc.getColor(_.indexOf(w.content.companies, anEntity));
  };
  $scope.formatAmount = function(amount) {
    return $filter('mnoCurrency')(amount, w.content.currency);
  };
  $scope.drawTrigger = $q.defer();
  w.format = function() {
    var chartData, inputData, options;
    if ($scope.isDataFound) {
      inputData = {};
      inputData.labels = w.content.companies;
      inputData.values = $scope.selectedClassificationItem.totals;
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-comparison', []);

module.controller('WidgetAccountsComparisonCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.accountsListDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  $scope.paramsCheckboxesDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.accountsListDeferred.promise, $scope.chartDeferred.promise, $scope.paramsCheckboxesDeferred.promise];
  w.initContext = function() {
    $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.complete_list);
    $scope.comparisonModeOptions = [
      {
        id: 'compare_accounts',
        label: 'Compare matching accounts across your companies',
        value: false,
        onChangeCallback: $scope.multiCompanyComparisonOnChange
      }
    ];
    if (angular.isDefined(w.metadata.comparison_mode)) {
      angular.merge($scope.comparisonModeOptions, w.metadata.comparison_mode);
    }
    return $scope.movedAccount = {};
  };
  $scope.callbacks = {};
  $scope.callbacks.runMultiCompanyComparison = function(isOnLoad) {
    if (isOnLoad == null) {
      isOnLoad = true;
    }
    return _.forEach($scope.comparisonModeOptions, function(option) {
      return option.onChangeCallback(isOnLoad);
    });
  };
  $scope.isMultiCompanyMode = function() {
    return _.result(_.find($scope.comparisonModeOptions, 'id', 'compare_accounts'), 'value');
  };
  $scope.multiCompanyComparisonOnChange = function(isOnLoad) {
    if (isOnLoad == null) {
      isOnLoad = false;
    }
    if (!isOnLoad) {
      $scope.purgeSelectedAccounts();
    }
    if ($scope.isMultiCompanyMode()) {
      return w.groupAccounts(w.remainingAccounts, w.remainingAccounts, 'account_name');
    } else {
      return w.ungroupAccounts(w.remainingAccounts, w.remainingAccounts, 'account_name');
    }
  };
  $scope.purgeSelectedAccounts = function() {
    return w.clearAccounts(w.selectedAccounts, w.remainingAccounts);
  };
  $scope.beforeUpdateSettings = function() {
    $scope.purgeSelectedAccounts();
    _.forEach($scope.comparisonModeOptions, function(option) {
      if (option.value) {
        return option.value = false;
      }
    });
    return $scope.updateSettings();
  };
  $scope.hasAccountsSelected = function() {
    return w.selectedAccounts && w.selectedAccounts.length > 0;
  };
  $scope.getAccountColor = function(anAccount) {
    if ($scope.isMultiCompanyMode()) {
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
      if ($scope.isMultiCompanyMode()) {
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
(function () {
'use strict';
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
(function () {
'use strict';
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
(function () {
'use strict';
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
        scaleOverride: true,
        scaleSteps: 4,
        scaleStepWidth: 25,
        scaleStartValue: 0,
        showXLabels: false,
        pointDot: false
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-expenses-revenue', []);

module.controller('WidgetAccountsExpensesRevenueCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.histModeDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  $scope.paramsCheckboxesDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise, $scope.paramsCheckboxesDeferred.promise];
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
    var all_values_are_positive, chartData, lineData, lineOptions, pieData, pieOptions;
    if ($scope.isDataFound) {
      if (w.isHistoryMode) {
        if ($scope.isNetProfitDisplayed) {
          lineData = [
            {
              title: "Net Profit (" + ($scope.getCurrency()) + ")",
              labels: w.content.dates,
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-payable-receivable', []);

module.controller('WidgetAccountsPayableReceivableCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.histModeDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
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
    var all_values_are_positive, chartData, i, j, len, len1, lineData, lineOptions, ref, ref1, value;
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.accounts-profit-and-loss', []);

module.controller('WidgetAccountsProfitAndLossCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
  var selectedElementsSetting, settingsPromises, unCollapsedSetting, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.widthDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
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
(function () {
'use strict';
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-employees-list', []);

module.controller('WidgetHrEmployeesListCtrl', ["$scope", "$q", "$filter", function($scope, $q, $filter) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.paramSelectorDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise];
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-leaves-balance', []);

module.controller('WidgetHrLeavesBalanceCtrl', ["$scope", "$q", function($scope, $q) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.paramSelectorDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.paramSelectorDeferred.promise];
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
  return $scope.widgetDeferred.resolve(settingsPromises);
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-payroll-summary', []);

module.controller('WidgetHrPayrollSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
  var selectedElementsSetting, settingsPromises, unCollapsedSetting, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.widthDeferred = $q.defer();
  $scope.histModeDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.widthDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
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
          pointDot: $scope.selectedElements.length === 1
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
          tooltipFontSize: 12
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-payroll-taxes', []);

module.controller('WidgetHrPayrollTaxesCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.histModeDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
  w.initContext = function() {
    return $scope.isDataFound = (w.content != null) && w.content.total_tax && w.content.dates;
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
  $scope.drawTrigger = $q.defer();
  w.format = function() {
    var all_values_are_positive, chartData, inputData, options;
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
(function () {
'use strict';
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.hr-superannuation-accruals', []);

module.controller('WidgetHrSuperannuationAccrualsCtrl', ["$scope", "$q", function($scope, $q) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.paramSelectorDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.paramSelectorDeferred.promise];
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
  return $scope.widgetDeferred.resolve(settingsPromises);
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

module.controller('WidgetHrTimesheetsCtrl', ["$scope", "$q", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, ImpacWidgetsSvc) {
  var settingsPromises, unCollapsedSetting, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.paramSelectorDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.paramSelectorDeferred.promise];
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
(function () {
'use strict';
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.invoices-aged-payables-receivables', []);

module.controller('WidgetInvoicesAgedPayablesReceivablesCtrl', ["$scope", "$q", "$log", "$filter", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, $log, $filter, ChartFormatterSvc, ImpacWidgetsSvc) {
  var selectedElementsSetting, settingsPromises, unCollapsedSetting, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.widthDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
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
    var all_values_are_positive, chartData, inputData, labels, options;
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.invoices-list', []);

module.controller('WidgetInvoicesListCtrl', ["$scope", "$q", "$filter", function($scope, $q, $filter) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.limitEntriesDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.limitEntriesDeferred.promise];
  w.initContext = function() {
    $scope.isDataFound = !_.isEmpty(w.content.entities);
    if ($scope.isDataFound && $scope.orderBy === 'due ') {
      if ($scope.entityType === 'suppliers') {
        $scope.limitEntriesLabel = 'creditors';
      } else {
        $scope.limitEntriesLabel = 'debtors';
      }
    }
    if ((w.metadata != null) && (w.metadata.limit_entries != null)) {
      return $scope.limitEntriesSelected = w.metadata.limit_entries;
    }
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
  return $scope.widgetDeferred.resolve(settingsPromises);
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

module.controller('WidgetInvoicesSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.chartFiltersDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.chartFiltersDeferred.promise, $scope.chartDeferred.promise];
  w.initContext = function() {
    return $scope.isDataFound = !_.isEmpty(w.content.summary);
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-aged', []);

module.controller('WidgetSalesAgedCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.paramSelectorDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.chartDeferred.promise];
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
    var all_values_are_positive, chartData, inputData, options, values;
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-break-even', []);

module.controller('WidgetSalesBreakEvenCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
  var settingsPromises, thresholdSetting, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise];
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-comparison', []);

module.controller('WidgetSalesComparisonCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, $filter, ChartFormatterSvc, ImpacWidgetsSvc) {
  var selectedElementsSetting, settingsPromises, unCollapsedSetting, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.widthDeferred = $q.defer();
  $scope.paramSelectorDeferred1 = $q.defer();
  $scope.paramSelectorDeferred2 = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1, $scope.paramSelectorDeferred2, $scope.chartDeferred.promise];
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-customer-details', []);

module.controller('WidgetSalesCustomerDetailsCtrl', ["$scope", "$q", function($scope, $q) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.widthDeferred = $q.defer();
  $scope.paramSelectorDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred.promise];
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
  return $scope.widgetDeferred.resolve(settingsPromises);
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

module.controller('WidgetSalesCycleCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.paramsPickerDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.paramsPickerDeferred.promise, $scope.timeRangeDeferred.promise, $scope.chartDeferred.promise];
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
        tooltipFontSize: 12
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
(function () {
'use strict';
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
    var all_values_are_positive, chartData, formattedDates, inputData, options;
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-growth', []);

module.controller('WidgetSalesGrowthCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.paramSelectorDeferred1 = $q.defer();
  $scope.paramSelectorDeferred2 = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise, $scope.chartDeferred.promise];
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
    var all_values_are_positive, chartData, data, inputData, options;
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
(function () {
'use strict';
var module,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module = angular.module('impac.components.widgets.sales-leads-funnel', []);

module.controller('WidgetSalesLeadsFunnelCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) {
  var hasOneLead, selectedStatusSetting, settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.paramsPickerDeferred = $q.defer();
  $scope.widthDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.paramsPickerDeferred.promise, $scope.widthDeferred.promise];
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
(function () {
'use strict';
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-list', []);

module.controller('WidgetSalesListCtrl', ["$scope", "$q", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, ChartFormatterSvc, ImpacWidgetsSvc) {
  var settingsPromises, unCollapsedSetting, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.paramSelectorDeferred1 = $q.defer();
  $scope.paramSelectorDeferred2 = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise];
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
      $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
        return o.value === w.content.hist_parameters.period;
      }) || $scope.periodOptions[0]);
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-margin', []);

module.controller('WidgetSalesMarginCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", function($scope, $q, ChartFormatterSvc, $filter) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.histModeDeferred = $q.defer();
  $scope.paramSelectorDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.histModeDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.chartDeferred.promise];
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
    if ($scope.isDataFound) {
      return "From " + ($filter('date')(_.first(w.content.dates), 'd MMM yy')) + " to " + ($filter('date')(_.last(w.content.dates), 'd MMM yy'));
    }
  };
  $scope.drawTrigger = $q.defer();
  w.format = function() {
    var all_values_are_positive, chartData, inputData, options, values;
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
(function () {
'use strict';
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
(function () {
'use strict';
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
(function () {
'use strict';
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
    var theDate;
    if ((anOpp != null) && (anOpp.sales_stage_changes != null) && anOpp.sales_stage_changes.length > 0) {
      theDate = anOpp.sales_stage_changes[anOpp.sales_stage_changes.length - 1].updated_at;
      if (theDate.split(' ').length > 0) {
        theDate = theDate.split(' ')[0];
      }
      return $filter('date')(theDate, 'dd MMM yyyy');
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
    var all_values_are_positive, chartData, data, inputData, labels, options;
    if ($scope.isDataFound && ($scope.selectedElement != null)) {
      data = angular.copy($scope.selectedElement);
      labels = _.map(w.content.dates, function(date) {
        return $filter('date')(date, 'MMM-yy');
      });
      labels[labels.length - 1] = $filter('date')(w.content.dates[w.content.dates.length - 1], 'dd-MM-yy');
      inputData = {
        title: data.name,
        labels: labels,
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-segmented-turnover', []);

module.controller('WidgetSalesSegmentedTurnoverCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", function($scope, $q, $filter, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.timeRangeDeferred = $q.defer();
  $scope.widthDeferred = $q.defer();
  $scope.paramSelectorDeferred = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.chartDeferred.promise];
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.sales-summary', []);

module.controller('WidgetSalesSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", function($scope, $q, ChartFormatterSvc) {
  var settingsPromises, w;
  w = $scope.widget;
  $scope.orgDeferred = $q.defer();
  $scope.chartFiltersDeferred = $q.defer();
  $scope.paramSelectorDeferred1 = $q.defer();
  $scope.paramSelectorDeferred2 = $q.defer();
  $scope.chartDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise, $scope.chartFiltersDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise, $scope.chartDeferred.promise];
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
      $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
        return o.value === w.content.hist_parameters.period;
      }) || $scope.periodOptions[0]);
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
        return o.value === w.content.filter;
      }) || $scope.filterOptions[0]);
    }
  };
  $scope.drawTrigger = $q.defer();
  w.format = function() {
    var chartData, pieData, pieOptions;
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
(function () {
'use strict';
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
(function () {
'use strict';
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.accounts-list', []);

module.controller('SettingAccountsListCtrl', ["$scope", "ImpacWidgetsSvc", function($scope, ImpacWidgetsSvc) {
  var initializeComparisonMode, setting, stashedAccounts, w;
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
  w.clearAccounts = function(src, dst, triggerUpdate) {
    var srcCopy;
    if (triggerUpdate == null) {
      triggerUpdate = false;
    }
    srcCopy = angular.copy(src);
    _.forEach(srcCopy, function(account) {
      return w.moveAccountToAnotherList(account, src, dst, triggerUpdate);
    });
    return null;
  };
  stashedAccounts = [];
  w.groupAccounts = function(src, dst, groupByKey, regExp) {
    var collectBalance, counter, grouped, normalise, rgx, sort;
    grouped = [];
    counter = 0;
    rgx = new RegExp(regExp || /[^a-z0-9]/g);
    stashedAccounts = angular.copy(src);
    normalise = function(str) {
      return str.toLowerCase().replace(rgx, "");
    };
    collectBalance = function(arr) {
      return _.reduce(arr, function(total, n) {
        return total + n;
      });
    };
    sort = function() {
      var baseAccount, group, matcher;
      baseAccount = src.shift();
      matcher = normalise(baseAccount[groupByKey]);
      group = {
        name: baseAccount.account_name || baseAccount.name,
        uid: counter++
      };
      group.accounts = _.select(src, function(acc, index) {
        if (!!acc && normalise(acc[groupByKey]) === matcher) {
          return src.splice(index, 1)[0];
        }
      });
      if (group.accounts.length > 0) {
        group.accounts.unshift(baseAccount);
        group.current_balance = collectBalance(_.map(group.accounts, function(acc) {
          return acc.current_balance;
        }));
        group.currency = _.map(group.accounts, function(acc) {
          return acc.currency;
        }).join('/');
        grouped.push(group);
      }
      if (!src.length) {
        return _.forEach(grouped, function(acc) {
          return dst.push(acc);
        });
      } else {
        return sort();
      }
    };
    return sort();
  };
  w.ungroupAccounts = function(src, dst) {
    src.length = 0;
    _.forEach(stashedAccounts, function(acc) {
      return src.push(acc);
    });
    return stashedAccounts = [];
  };
  initializeComparisonMode = function() {
    return $scope.callbacks.runMultiCompanyComparison();
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
      stashedAccounts = angular.copy(w.remainingAccounts);
      if ($scope.callbacks != null) {
        initializeComparisonMode();
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
  w.settings.push(setting);
  return $scope.deferred.resolve($scope.parentWidget);
}]);

module.directive('settingAccountsList', function() {
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      deferred: '=',
      callbacks: '=?'
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
(function () {
'use strict';
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
(function () {
'use strict';
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
      options: '=',
      selected: '=',
      max: '=',
      entriesLabel: '='
    },
    link: function(scope, elements, attrs) {
      if (!((attrs.options != null) && scope.options.length > 0)) {
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.organizations', []);

module.controller('SettingOrganizationsCtrl', ["$scope", "$log", "ImpacDashboardsSvc", function($scope, $log, ImpacDashboardsSvc) {
  var setting, w;
  w = $scope.parentWidget;
  w.selectedOrganizations = {};
  ImpacDashboardsSvc.load().then(function(config) {
    return $scope.dashboardOrganizations = config.currentDashboard.data_sources;
  });
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
(function () {
'use strict';
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
(function () {
'use strict';
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
    param[$scope.param] = $scope.options;
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
(function () {
'use strict';
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
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-settings.width', []);

module.controller('SettingWidthCtrl', ["$scope", "$log", "ImpacWidgetsSvc", function($scope, $log, ImpacWidgetsSvc) {
  var setting, w;
  w = $scope.parentWidget;
  w.toggleExpanded = function() {
    $scope.expanded = !$scope.expanded;
    ImpacWidgetsSvc.updateWidgetSettings(w, false);
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
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
(function(){"use strict";var t=this,i=t.Chart,e=function(t){this.canvas=t.canvas,this.ctx=t;var i=function(t,i){return t["offset"+i]?t["offset"+i]:document.defaultView.getComputedStyle(t).getPropertyValue(i)},e=this.width=i(t.canvas,"Width")||t.canvas.width,n=this.height=i(t.canvas,"Height")||t.canvas.height;return t.canvas.width=e,t.canvas.height=n,e=this.width=t.canvas.width,n=this.height=t.canvas.height,this.aspectRatio=this.width/this.height,s.retinaScale(this),this};e.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipTitleTemplate:"<%= label%>",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",tooltipFixed:!1,multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},e.types={};var s=e.helpers={},n=s.each=function(t,i,e){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var n;for(n=0;n<t.length;n++)i.apply(e,[t[n],n].concat(s))}else for(var o in t)i.apply(e,[t[o],o].concat(s))},o=s.clone=function(t){var i={};return n(t,function(e,s){t.hasOwnProperty(s)&&(i[s]=e)}),i},a=s.extend=function(t){return n(Array.prototype.slice.call(arguments,1),function(i){n(i,function(e,s){i.hasOwnProperty(s)&&(t[s]=e)})}),t},h=s.merge=function(t,i){var e=Array.prototype.slice.call(arguments,0);return e.unshift({}),a.apply(null,e)},l=s.indexOf=function(t,i){if(Array.prototype.indexOf)return t.indexOf(i);for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1},r=(s.where=function(t,i){var e=[];return s.each(t,function(t){i(t)&&e.push(t)}),e},s.findNextWhere=function(t,i,e){e||(e=-1);for(var s=e+1;s<t.length;s++){var n=t[s];if(i(n))return n}},s.findPreviousWhere=function(t,i,e){e||(e=t.length);for(var s=e-1;s>=0;s--){var n=t[s];if(i(n))return n}},s.inherits=function(t){var i=this,e=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return i.apply(this,arguments)},s=function(){this.constructor=e};return s.prototype=i.prototype,e.prototype=new s,e.extend=r,t&&a(e.prototype,t),e.__super__=i.prototype,e}),c=s.noop=function(){},u=s.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=s.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=s.amd="function"==typeof define&&define.amd,f=s.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=s.max=function(t){return Math.max.apply(Math,t)},m=s.min=function(t){return Math.min.apply(Math,t)},v=(s.cap=function(t,i,e){if(f(i)){if(t>i)return i}else if(f(e)&&e>t)return e;return t},s.getDecimalPlaces=function(t){if(t%1!==0&&f(t)){var i=t.toString();if(i.indexOf("e-")<0)return i.split(".")[1].length;if(i.indexOf(".")<0)return parseInt(i.split("e-")[1]);var e=i.split(".")[1].split("e-");return e[0].length+parseInt(e[1])}return 0}),S=s.radians=function(t){return t*(Math.PI/180)},x=(s.getAngleFromPoint=function(t,i){var e=i.x-t.x,s=i.y-t.y,n=Math.sqrt(e*e+s*s),o=2*Math.PI+Math.atan2(s,e);return 0>e&&0>s&&(o+=2*Math.PI),{angle:o,distance:n}},s.aliasPixel=function(t){return t%2===0?0:.5}),y=(s.splineCurve=function(t,i,e,s){var n=Math.sqrt(Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)),o=Math.sqrt(Math.pow(e.x-i.x,2)+Math.pow(e.y-i.y,2)),a=s*n/(n+o),h=s*o/(n+o);return{inner:{x:i.x-a*(e.x-t.x),y:i.y-a*(e.y-t.y)},outer:{x:i.x+h*(e.x-t.x),y:i.y+h*(e.y-t.y)}}},s.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),b=(s.calculateScaleRange=function(t,i,e,s,n){var o=2,a=Math.floor(i/(1.5*e)),h=o>=a,l=g(t),r=m(t);l===r&&(l+=.5,r>=.5&&!s?r-=.5:l+=.5);for(var c=Math.abs(l-r),u=y(c),d=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),p=s?0:Math.floor(r/(1*Math.pow(10,u)))*Math.pow(10,u),f=d-p,v=Math.pow(10,u),S=Math.round(f/v);(S>a||a>2*S)&&!h;)if(S>a)v*=2,S=Math.round(f/v),S%1!==0&&(h=!0);else if(n&&u>=0){if(v/2%1!==0)break;v/=2,S=Math.round(f/v)}else v/=2,S=Math.round(f/v);return h&&(S=o,v=f/S),{steps:S,stepValue:v,min:p,max:p+S*v}},s.template=function(t,i){function e(t,i){var e=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):s[t]=s[t];return i?e(i):e}if(t instanceof Function)return t(i);var s={};return e(t,i)}),w=(s.generateLabels=function(t,i,e,s){var o=new Array(i);return t&&n(o,function(i,n){o[n]=b(t,{value:e+s*(n+1)})}),o},s.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),-(s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)))},easeOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),s*Math.pow(2,-10*t)*Math.sin(2*(1*t-i)*Math.PI/e)+1)},easeInOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:2==(t/=.5)?1:(e||(e=.3*1.5),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e):s*Math.pow(2,-10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)*.5+1)},easeInBack:function(t){var i=1.70158;return 1*(t/=1)*t*((i+1)*t-i)},easeOutBack:function(t){var i=1.70158;return 1*((t=t/1-1)*t*((i+1)*t+i)+1)},easeInOutBack:function(t){var i=1.70158;return(t/=.5)<1?.5*t*t*(((i*=1.525)+1)*t-i):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},easeInBounce:function(t){return 1-w.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*w.easeInBounce(2*t):.5*w.easeOutBounce(2*t-1)+.5}}),C=s.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),P=(s.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),s.animationLoop=function(t,i,e,s,n,o){var a=0,h=w[e]||w.linear,l=function(){a++;var e=a/i,r=h(e);t.call(o,r,e,a),s.call(o,r,e),i>a?o.animationFrame=C(l):n.apply(o)};C(l)},s.getRelativePosition=function(t){var i,e,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,o=n.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX-o.left,e=s.touches[0].clientY-o.top):(i=s.clientX-o.left,e=s.clientY-o.top),{x:i,y:e}},s.addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e):t.attachEvent?t.attachEvent("on"+i,e):t["on"+i]=e}),L=s.removeEvent=function(t,i,e){t.removeEventListener?t.removeEventListener(i,e,!1):t.detachEvent?t.detachEvent("on"+i,e):t["on"+i]=c},k=(s.bindEvents=function(t,i,e){t.events||(t.events={}),n(i,function(i){t.events[i]=function(){e.apply(t,arguments)},P(t.chart.canvas,i,t.events[i])})},s.unbindEvents=function(t,i){n(i,function(i,e){L(t.chart.canvas,e,i)})}),F=s.getMaximumWidth=function(t){var i=t.parentNode,e=parseInt(T(i,"padding-left"))+parseInt(T(i,"padding-right"));return i.clientWidth-e},A=s.getMaximumHeight=function(t){var i=t.parentNode,e=parseInt(T(i,"padding-bottom"))+parseInt(T(i,"padding-top"));return i.clientHeight-e},T=s.getStyle=function(t,i){return t.currentStyle?t.currentStyle[i]:document.defaultView.getComputedStyle(t,null).getPropertyValue(i)},R=(s.getMaximumSize=s.getMaximumWidth,s.retinaScale=function(t){var i=t.ctx,e=t.canvas.width,s=t.canvas.height;window.devicePixelRatio&&(i.canvas.style.width=e+"px",i.canvas.style.height=s+"px",i.canvas.height=s*window.devicePixelRatio,i.canvas.width=e*window.devicePixelRatio,i.scale(window.devicePixelRatio,window.devicePixelRatio))}),W=s.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},M=s.fontString=function(t,i,e){return i+" "+t+"px "+e},z=s.longestText=function(t,i,e){t.font=i;var s=0;return n(e,function(i){var e=t.measureText(i).width;s=e>s?e:s}),s},O=s.drawRoundedRectangle=function(t,i,e,s,n,o){t.beginPath(),t.moveTo(i+o,e),t.lineTo(i+s-o,e),t.quadraticCurveTo(i+s,e,i+s,e+o),t.lineTo(i+s,e+n-o),t.quadraticCurveTo(i+s,e+n,i+s-o,e+n),t.lineTo(i+o,e+n),t.quadraticCurveTo(i,e+n,i,e+n-o),t.lineTo(i,e+o),t.quadraticCurveTo(i,e,i+o,e),t.closePath()};e.instances={},e.Type=function(t,i,s){this.options=i,this.chart=s,this.id=u(),e.instances[this.id]=this,i.responsive&&this.resize(),this.initialize.call(this,t)},a(e.Type.prototype,{initialize:function(){return this},clear:function(){return W(this.chart),this},stop:function(){return e.animationService.cancelAnimation(this),this},resize:function(t){this.stop();var i=this.chart.canvas,e=F(this.chart.canvas),s=this.options.maintainAspectRatio?e/this.chart.aspectRatio:A(this.chart.canvas);return i.width=this.chart.width=e,i.height=this.chart.height=s,R(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){if(t&&this.reflow(),this.options.animation&&!t){var i=new e.Animation;i.numSteps=this.options.animationSteps,i.easing=this.options.animationEasing,i.render=function(t,i){var e=s.easingEffects[i.easing],n=i.currentStep/i.numSteps,o=e(n);t.draw(o,n,i.currentStep)},i.onAnimationProgress=this.options.onAnimationProgress,i.onAnimationComplete=this.options.onAnimationComplete,e.animationService.addAnimation(this,i)}else this.draw(),this.options.onAnimationComplete.call(this);return this},generateLegend:function(){return b(this.options.legendTemplate,this)},destroy:function(){this.clear(),k(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete e.instances[this.id]},showTooltip:function(t,i){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var i=!1;return t.length!==this.activeElements.length?i=!0:(n(t,function(t,e){t!==this.activeElements[e]&&(i=!0)},this),i)}.call(this,t);if(o||i){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var a,h,r=this.datasets.length-1;r>=0&&(a=this.datasets[r].points||this.datasets[r].bars||this.datasets[r].segments,h=l(a,t[0]),-1===h);r--);var c=[],u=[],d=function(t){var i,e,n,o,a,l=[],r=[],d=[];return s.each(this.datasets,function(t){i=t.points||t.bars||t.segments,i[h]&&i[h].hasValue()&&l.push(i[h])}),s.each(l,function(t){r.push(t.x),d.push(t.y),c.push(s.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),a=m(d),n=g(d),o=m(r),e=g(r),{x:o>this.chart.width/2?o:e,y:(a+n)/2}}.call(this,h);new e.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:b(this.options.tooltipTitleTemplate,t[0]),chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else n(t,function(t){var i=t.tooltipPosition();new e.Tooltip({x:Math.round(i.x),y:Math.round(i.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:b(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips,tooltipFixed:this.options.tooltipFixed}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),e.Type.extend=function(t){var i=this,s=function(){return i.apply(this,arguments)};if(s.prototype=o(i.prototype),a(s.prototype,t),s.extend=e.Type.extend,t.name||i.prototype.name){var n=t.name||i.prototype.name,l=e.defaults[i.prototype.name]?o(e.defaults[i.prototype.name]):{};e.defaults[n]=a(l,t.defaults),e.types[n]=s,e.prototype[n]=function(t,i){var o=h(e.defaults.global,e.defaults[n],i||{});return new s(t,o,this)}}else d("Name not provided for this chart, so it hasn't been registered");return i},e.Element=function(t){a(this,t),this.initialize.apply(this,arguments),this.save()},a(e.Element.prototype,{initialize:function(){},restore:function(t){return t?n(t,function(t){this[t]=this._saved[t]},this):a(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return n(t,function(t,i){this._saved[i]=this[i],this[i]=t},this),this},transition:function(t,i){return n(t,function(t,e){this[e]=(t-this._saved[e])*i+this._saved[e]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),e.Element.extend=r,e.Point=e.Element.extend({display:!0,inRange:function(t,i){var e=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(i-this.y,2)<Math.pow(e,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),e.Arc=e.Element.extend({inRange:function(t,i){var e=s.getAngleFromPoint(this,{x:t,y:i}),n=e.angle>=this.startAngle&&e.angle<=this.endAngle,o=e.distance>=this.innerRadius&&e.distance<=this.outerRadius;return n&&o},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,i=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*i,y:this.y+Math.sin(t)*i}},draw:function(t){var i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),e.Rectangle=e.Element.extend({draw:function(){var t=this.ctx,i=this.width/2,e=this.x-i,s=this.x+i,n=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(e+=o,s-=o,n+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(e,this.base),t.lineTo(e,n),t.lineTo(s,n),t.lineTo(s,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,i){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&i>=this.y&&i<=this.base}}),e.Animation=e.Element.extend({currentStep:null,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),e.Tooltip=e.Element.extend({draw:function(){var t=this.chart.ctx;t.font=M(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var i=this.caretPadding=2,e=t.measureText(this.text).width+2*this.xPadding,s=this.fontSize+2*this.yPadding,n=s+this.caretHeight+i;this.tooltipFixed&&(e=this.chart.width,s=2*this.fontSize+4*this.yPadding),this.x+e/2>this.chart.width?this.xAlign="left":this.x-e/2<0&&(this.xAlign="right"),this.y-n<0&&(this.yAlign="below");var o=this.x-e/2,a=this.y-n;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{if(this.tooltipFixed)switch(o=0,this.yAlign){case"above":a=0;break;case"below":a=this.chart.height/2-s/2}else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-i),t.lineTo(this.x+this.caretHeight,this.y-(i+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(i+this.caretHeight)),t.closePath(),t.fill();break;case"below":a=this.y+i+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+i),t.lineTo(this.x+this.caretHeight,this.y+i+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+i+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-e+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}}O(t,o,a,e,s,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",this.tooltipFixed&&this.text.split(":").length>=2?(t.fillText(this.text.split(":")[0],o+e/2,a+this.yPadding+this.fontSize),t.fillText(this.text.split(":")[1],o+e/2,a+2*(this.yPadding+this.fontSize))):t.fillText(this.text,o+e/2,a+s/2)}}}),e.MultiTooltip=e.Element.extend({initialize:function(){this.font=M(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=M(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,i=z(this.ctx,this.font,this.labels)+this.fontSize+3,e=g([i,t]);this.width=e+2*this.xPadding;var s=this.height/2;this.y-s<0?this.y=s:this.y+s>this.chart.height&&(this.y=this.chart.height-s),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var i=this.y-this.height/2+this.yPadding,e=t-1;return 0===t?i+this.titleFontSize/2:i+(1.5*this.fontSize*e+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{O(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,s.each(this.labels,function(i,e){t.fillStyle=this.textColor,t.fillText(i,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(e+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[e].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),e.Scale=e.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(b(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?z(this.ctx,this.font,this.yLabels)+10:0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,i=this.endPoint,e=this.endPoint-this.startPoint;for(this.calculateYRange(e),this.buildYLabels(),this.calculateXLabelRotation();e>this.endPoint-this.startPoint;)e=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(e),this.buildYLabels(),t<this.yLabelWidth&&(this.endPoint=i,this.calculateXLabelRotation())},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,i,e=this.ctx.measureText(this.xLabels[0]).width,s=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=s/2+3,this.xScalePaddingLeft=e/2>this.yLabelWidth?e/2:this.yLabelWidth,this.xLabelRotation=0,this.display){var n,o=z(this.ctx,this.font,this.xLabels);this.xLabelWidth=o;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)n=Math.cos(S(this.xLabelRotation)),t=n*e,i=n*s,t+this.fontSize/2>this.yLabelWidth&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=n*o;this.xLabelRotation>0&&(this.endPoint-=Math.sin(S(this.xLabelRotation))*o+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var i=this.drawingArea()/(this.min-this.max);return this.endPoint-i*(t-this.min)},calculateX:function(t){var i=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),e=i/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),s=e*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=e/2),Math.round(s)},update:function(t){s.extend(this,t),this.fit()},draw:function(){var t=this.ctx,i=(this.endPoint-this.startPoint)/this.steps,e=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,n(this.yLabels,function(n,o){var a=this.endPoint-i*o,h=Math.round(a),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(n,e-10,a),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),h+=s.aliasPixel(t.lineWidth),l&&(t.moveTo(e,h),t.lineTo(this.width,h),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(e-5,h),t.lineTo(e,h),t.stroke(),t.closePath()},this),n(this.xLabels,function(i,e){var s=this.calculateX(e)+x(this.lineWidth),n=this.calculateX(e-(this.offsetGridLines?.5:0))+x(this.lineWidth),o=this.xLabelRotation>0,a=this.showVerticalLines;0!==e||a||(a=!0),a&&t.beginPath(),e>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a&&(t.moveTo(n,this.endPoint),t.lineTo(n,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n,this.endPoint),t.lineTo(n,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(s,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*S(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(i,0,0),t.restore()},this))}}),e.RadialScale=e.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var i=this.drawingArea/(this.max-this.min);return(t-this.min)*i},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(b(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,i,e,s,n,o,a,h,l,r,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=M(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)t=this.getPointPosition(i,d),e=this.ctx.measureText(b(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=e/2,t.x+s>p&&(p=t.x+s,n=i),t.x-s<g&&(g=t.x-s,a=i)):i<this.valuesCount/2?t.x+e>p&&(p=t.x+e,n=i):i>this.valuesCount/2&&t.x-e<g&&(g=t.x-e,a=i);l=g,r=Math.ceil(p-this.width),o=this.getIndexAngle(n),h=this.getIndexAngle(a),c=r/Math.sin(o+Math.PI/2),u=l/Math.sin(h+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,i){var e=this.width-i-this.drawingArea,s=t+this.drawingArea;this.xCenter=(s+e)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var i=2*Math.PI/this.valuesCount;return t*i-Math.PI/2},getPointPosition:function(t,i){var e=this.getIndexAngle(t);return{x:Math.cos(e)*i+this.xCenter,y:Math.sin(e)*i+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(n(this.yLabels,function(i,e){if(e>0){var s,n=e*(this.drawingArea/this.steps),o=this.yCenter-n;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var a=0;a<this.valuesCount;a++)s=this.getPointPosition(a,this.calculateCenterOffset(this.min+e*this.stepValue)),0===a?t.moveTo(s.x,s.y):t.lineTo(s.x,s.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=M(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var h=t.measureText(i).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-h/2-this.backdropPaddingX,o-this.fontSize/2-this.backdropPaddingY,h+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(i,this.xCenter,o)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var i=this.valuesCount-1;i>=0;i--){var e=null,s=null;if(this.angleLineWidth>0&&(e=this.calculateCenterOffset(this.max),s=this.getPointPosition(i,e),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(s.x,s.y),t.stroke(),t.closePath()),this.backgroundColors&&this.backgroundColors.length==this.valuesCount){null==e&&(e=this.calculateCenterOffset(this.max)),null==s&&(s=this.getPointPosition(i,e));var o=this.getPointPosition(0===i?this.valuesCount-1:i-1,e),a=this.getPointPosition(i===this.valuesCount-1?0:i+1,e),h={x:(o.x+s.x)/2,y:(o.y+s.y)/2},l={x:(s.x+a.x)/2,y:(s.y+a.y)/2};t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(h.x,h.y),t.lineTo(s.x,s.y),t.lineTo(l.x,l.y),t.fillStyle=this.backgroundColors[i],t.fill(),t.closePath()}var r=this.getPointPosition(i,this.calculateCenterOffset(this.max)+5);t.font=M(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var c=this.labels.length,u=this.labels.length/2,d=u/2,p=d>i||i>c-d,f=i===d||i===c-d;t.textAlign=0===i?"center":i===u?"center":u>i?"left":"right",t.textBaseline=f?"middle":p?"bottom":"top",t.fillText(this.labels[i],r.x,r.y)}}}}}),e.animationService={frameDuration:17,animations:[],dropFrames:0,addAnimation:function(t,i){for(var e=0;e<this.animations.length;++e)if(this.animations[e].chartInstance===t)return void(this.animations[e].animationObject=i);this.animations.push({chartInstance:t,animationObject:i}),1==this.animations.length&&s.requestAnimFrame.call(window,this.digestWrapper)},cancelAnimation:function(t){var i=s.findNextWhere(this.animations,function(i){return i.chartInstance===t});i&&this.animations.splice(i,1)},digestWrapper:function(){e.animationService.startDigest.call(e.animationService)},startDigest:function(){var t=Date.now(),i=0;this.dropFrames>1&&(i=Math.floor(this.dropFrames),this.dropFrames-=i);for(var e=0;e<this.animations.length;e++)null===this.animations[e].animationObject.currentStep&&(this.animations[e].animationObject.currentStep=0),this.animations[e].animationObject.currentStep+=1+i,this.animations[e].animationObject.currentStep>this.animations[e].animationObject.numSteps&&(this.animations[e].animationObject.currentStep=this.animations[e].animationObject.numSteps),this.animations[e].animationObject.render(this.animations[e].chartInstance,this.animations[e].animationObject),this.animations[e].animationObject.currentStep==this.animations[e].animationObject.numSteps&&(this.animations.splice(e,1),e--);var n=Date.now(),o=n-t-this.frameDuration,a=o/this.frameDuration;a>1&&(this.dropFrames+=a),this.animations.length>0&&s.requestAnimFrame.call(window,this.digestWrapper)}},s.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){n(e.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return e}):"object"==typeof module&&module.exports&&(module.exports=e),t.Chart=e,e.noConflict=function(){return t.Chart=i,e}}).call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',showXLabels:!0};i.Type.extend({name:"Bar",defaults:s,initialize:function(t){var s=this.options;this.ScaleClass=i.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,i,e){var n=this.calculateBaseWidth(),o=this.calculateX(e)-n/2,a=this.calculateBarWidth(t);return o+a*i+i*s.barDatasetSpacing+a/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*s.barValueSpacing},calculateBarWidth:function(t){var i=this.calculateBaseWidth()-(t-1)*s.barDatasetSpacing;return i/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){
t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),this.BarClass=i.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(i,s){var n={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,bars:[]};this.datasets.push(n),e.each(i.data,function(e,s){n.bars.push(new this.BarClass({value:e,label:t.labels[s],datasetLabel:i.label,strokeColor:i.strokeColor,fillColor:i.fillColor,highlightFill:i.highlightFill||i.fillColor,highlightStroke:i.highlightStroke||i.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,i,s){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,s,i),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(i,s){e.each(i.bars,t,this,s)},this)},getBarsAtEvent:function(t){for(var i,s=[],n=e.getRelativePosition(t),o=function(t){s.push(t.bars[i])},a=0;a<this.datasets.length;a++)for(i=0;i<this.datasets[a].bars.length;i++)if(this.datasets[a].bars[i].inRange(n.x,n.y))return e.each(this.datasets,o),s;return s},buildScale:function(t){var i=this,s=function(){var t=[];return i.eachBars(function(i){t.push(i.value)}),t},n={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:this.options.showXLabels?t:[],font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(n,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(n)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();this.chart.ctx;this.scale.draw(i),e.each(this.datasets,function(t,s){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,s,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},i).draw())},this)},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'};i.Type.extend({name:"Doughnut",defaults:s,initialize:function(t){this.segments=[],this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=i.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.calculateTotal(t),e.each(t,function(i,e){i.color||(i.color="hsl("+360*e/t.length+", 100%, 50%)"),this.addData(i,e,!0)},this),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=void 0!==i?i:this.segments.length;this.segments.splice(s,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),e||(this.reflow(),this.update())},calculateCircumference:function(t){return this.total>0?2*Math.PI*(t/this.total):0},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),e.each(this.activeElements,function(t){t.restore(["fillColor"])}),e.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,e.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var i=t?t:1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},i),t.endAngle=t.startAngle+t.circumference,t.draw(),0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle)},this)}}),i.types.Doughnut.extend({name:"Pie",defaults:e.merge(s,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',offsetGridLines:!1,showXLabels:!0};i.Type.extend({name:"Line",defaults:s,initialize:function(t){this.PointClass=i.Point.extend({offsetGridLines:this.options.offsetGridLines,strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,i){e.extend(t,{x:this.scale.calculateX(i),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.datasets,function(t){e.each(t.points,function(t){t.inRange(s.x,s.y)&&i.push(t)})},this),i},buildScale:function(t){var s=this,n=function(){var t=[];return s.eachPoints(function(i){t.push(i.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,offsetGridLines:this.options.offsetGridLines,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:this.options.showXLabels?t:[],font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(o,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new i.Scale(o)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].points.push(new this.PointClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();var s=this.chart.ctx,n=function(t){return null!==t.value},o=function(t,i,s){return e.findNextWhere(i,n,s)||t},a=function(t,i,s){return e.findPreviousWhere(i,n,s)||t};this.scale&&(this.scale.draw(i),e.each(this.datasets,function(t){var h=e.where(t.points,n);e.each(t.points,function(t,e){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(e)},i)},this),this.options.bezierCurve&&e.each(h,function(t,i){var s=i>0&&i<h.length-1?this.options.bezierCurveTension:0;t.controlPoints=e.splineCurve(a(t,h,i),t,o(t,h,i),s),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(h,function(t,i){if(0===i)s.moveTo(t.x,t.y);else if(this.options.bezierCurve){var e=a(t,h,i);s.bezierCurveTo(e.controlPoints.outer.x,e.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else s.lineTo(t.x,t.y)},this),this.options.datasetStroke&&s.stroke(),this.options.datasetFill&&h.length>0&&(s.lineTo(h[h.length-1].x,this.scale.endPoint),s.lineTo(h[0].x,this.scale.endPoint),s.fillStyle=t.fillColor,s.closePath(),s.fill()),e.each(h,function(t){t.draw()})},this))}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>'};i.Type.extend({name:"PolarArea",defaults:s,initialize:function(t){this.segments=[],this.SegmentArc=i.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),e||(this.reflow(),this.update())},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var i=[];e.each(t,function(t){i.push(t.value)});var s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s,{size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),e.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),e.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),e.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var i=t||1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},i),t.endAngle=t.startAngle+t.circumference,0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers;i.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'},initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){var o;this.scale.animation||(o=this.scale.getPointPosition(n,this.scale.calculateCenterOffset(e))),s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=e.getRelativePosition(t),s=e.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},i),n=2*Math.PI/this.scale.valuesCount,o=Math.round((s.angle-1.5*Math.PI)/n),a=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),s.distance<=this.scale.drawingArea&&e.each(this.datasets,function(t){a.push(t.points[o])}),a},buildScale:function(t){this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backgroundColors:this.options.scaleBackgroundColors,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var i=function(){var i=[];return e.each(t,function(t){t.data?i=i.concat(t.data):e.each(t.points,function(t){i.push(t.value)})}),i}(),s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s)},addData:function(t,i){this.scale.valuesCount++,e.each(t,function(t,e){var s=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[e].points.push(new this.PointClass({value:t,label:i,datasetLabel:this.datasets[e].label,x:s.x,y:s.y,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.labels.push(i),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),e.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var i=t||1,s=this.chart.ctx;this.clear(),this.scale.draw(),e.each(this.datasets,function(t){e.each(t.points,function(t,e){t.hasValue()&&t.transition(this.scale.getPointPosition(e,this.scale.calculateCenterOffset(t.value)),i)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(t.points,function(t,i){0===i?s.moveTo(t.x,t.y):s.lineTo(t.x,t.y)},this),s.closePath(),s.stroke(),s.fillStyle=t.fillColor,this.options.datasetFill&&s.fill(),e.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this);