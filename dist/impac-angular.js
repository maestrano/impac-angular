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
    'impac.components.widgets.catalogue',
    'impac.components.widgets.template-admin',
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
angular.module('impac.filters', []);
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
    'impac.services.chart-formatter',
    'impac.services.message-bus',
    'impac.services.utilities',
    'impac.services.widget-templates'
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
$templateCache.put("dashboard/create.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"close()\" >×</div>\n  <h3>Create New Dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n  \n  <!-- Create a new dashboard -->\n  <div class=\"row dashboard-form\">\n    <div class=\"col-sm-10 col-sm-offset-1\">\n      <form class=\"form-horizontal\" role=\"form\">\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">Name</label>\n          <div class=\"col-sm-10\">\n            <input type=\'text\' class=\"form-control\" ng-model=\"model.name\" placeholder=\"E.g: Cash Accounts Monitoring\" required>\n          </div>\n        </div>\n    \n        <div class=\"form-group\" ng-show=\"isMultiCompanyAvailable()\">\n          <label class=\"col-sm-2 control-label\">Type</label>\n          <div class=\"col-sm-10\">\n            <div class=\"btn-group\" role=\"group\">\n              <button type=\"button\" ng-click=\"selectMode(\'single\')\" ng-class=\"btnBlassFor(\'single\')\">Current Company</button>\n              <button type=\"button\" ng-click=\"selectMode(\'multi\')\" ng-class=\"btnBlassFor(\'multi\')\">Multi Company</button>\n            </div>\n          </div>\n        </div>\n        \n        <!-- Single Company mode -->\n        <div class=\"form-group\" ng-show=\"isCurrentOrganizationShown()\">\n          <div ng-show=\"!canAccessAnalyticsForCurrentOrganization()\" class=\"text-center text-purple\">\n            <div class=\"spacer1\"></div>\n            <p>\n              Oops! Only Admins and Super Admins can create dashboards for company {{currentOrganization.name}}.\n              <span ng-show=\"isMultiCompanyAvailable()\">Please select a \"Multi Company\" dashboard to select data from other companies.</span>\n            </p>\n          </div>\n        </div>\n        \n        <!-- Multi Company mode -->\n        <div class=\"form-group\" ng-show=\"isSelectOrganizationShown()\">\n          <label class=\"col-sm-2 control-label\">Companies</label>\n          <div class=\"col-sm-10\">\n            <ul class=\"list-unstyled\">\n              <li ng-repeat=\"organization in organizations\" >\n                <input type=\"checkbox\" ng-model=\"organization.$selected\" ng-disabled=\"!canAccessAnalyticsData(organization)\"> \n                {{organization.name}} \n                <span ng-show=\"organization.is_customer_account\">(customer)</span>\n                <span ng-show=\"!canAccessAnalyticsData(organization)\">\n                  <em><small>\n                    &nbsp;\n                    &nbsp;\n                    <i class=\"fa fa-exclamation-circle text-danger\" tooltip=\"Only Admins and Super Admins can access analytics data for this company\"></i>\n                  </small></em>\n                </span>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </form>\n      \n      <!-- End row col -->\n    </div>\n    \n    <!-- End Dashboard form -->\n  </div>\n  \n  \n  \n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"close()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-info\" ng-click=\"proceed()\" ng-hide=\"isLoading\" ng-disabled=\"proceedDisabled()\">Add</button>\n      <img ng-src=\"{{loadingGif}}\" ng-show=\"isLoading\" alt=\"Loading\">\n    </div>\n  </div>\n</div>");
$templateCache.put("dashboard/dashboard.tmpl.html","<!-- DASHBOARD -->\n<div class=\"analytics\">\n  <div mno-star-wizard=true modal-open=\'starWizardModal.value\'></div>\n\n  <div class=\'row head-title\'>\n\n    <!-- Title and Dashboard selection -->\n    <div class=\"col-md-6 col-sm-12\">\n\n      <h2>\n        <img ng-src=\"{{impacTitleLogo}}\" style=\"float: left; margin-right: 15px;\" />\n        <!-- <div class=\"text-info\" style=\"padding-top:12px; height: 48px;\">Beta</div> -->\n        <div class=\"text-info\" style=\"padding-top:12px; height: 48px;\"></div>\n      </h2>\n\n      <h4 ng-hide=\'showChooseDhbMsg\' class=\'dashboard-title\' ng-click=\"toogleShowDashboardsList()\">\n        {{currentDhb.full_name}}\n        <i class=\"fa fa-chevron-down\" style=\"font-size: 18px;\"></i>\n        <i ng-hide=\"showChangeDhbName\" class=\"fa fa-pencil\" tooltip=\"Change name\" tooltip-animation=\"false\" ng-click=\"toogleShowChangeDhbName(currentDhb)\"/>\n      </h4>\n\n      <div collapse=\"!showDashboardsList\" class=\'dashboard-select\'>\n        <div ng-hide=\"dhb.id == currentDhbId\" class=\'option\' ng-repeat=\"dhb in dashboardsList\">\n          <span class=\"name\" ng-click=\"selectDashboard(dhb.id)\">{{dhb.full_name}}</span>\n          <i ng-hide=\"showChangeDhbName\" class=\"fa fa-pencil\" tooltip=\"Change name\" tooltip-animation=\"false\" ng-click=\"toogleShowChangeDhbName(dhb)\"/>\n        </div>\n\n        <div ng-show=\"showCreateDhb\" class=\"option create\" ng-click=\"modal.createDashboard.open() ; showChangeDhbName = false\"><i class=\"fa fa-plus\" /> Create Dashboard</div>\n      </div>\n\n      <div ng-show=\"showChangeDhbName\" class=\"change-name\">\n        <p>Change dashboard name:</p>\n        <input type=\"text\" class=\"form-control\" id=\"changeDhbNameInput\" ng-model=\"dashboardToChange.name\" ng-keyup=\"checkChangeDhbNameAndConfirm($event)\"/>\n        <button class=\"btn btn-sm btn-default\" ng-click=\"showChangeDhbName=false\">Cancel</button>\n        <button class=\"btn btn-sm btn-success\" style=\"margin-left: 10px\" ng-click=\"updateDhbName()\">Confirm</button>\n      </div>\n\n\n      <p ng-hide=\'showChooseDhbMsg\' class=\"data-source-label\">\n        <small><b>Source:</b> {{currentDhb.organizationsNames}}</small>\n      </p>\n\n    </div>\n\n    <!-- Buttons -->\n    <div class=\'col-md-6 buttons-bar col-sm-12\'>\n      <div class=\'actions-panel\'>\n        <button ng-click=\"showWidgetSelector = true\" class=\'btn btn-warning\' ng-show=\"showCreateWidget\" ng-disabled=\"showWidgetSelector\"><span class=\'fa fa-plus\'></span> Add Widget</button>\n        <!-- <button ng-click=\"modal.createDashboard.open()\" class=\'btn btn-warning\' ng-show=\"showCreateDhb\"><span class=\'fa fa-pencil-square-o\'></span> Create Dashboard</button>\n        <button id=\'data-upload-wizard\' ng-click=\'openStarWizard()\' class=\'btn btn-success hidden-xs\' ><span class=\'fa fa-upload\'></span> Data Upload</button>\n        <button ng-click=\"modal.deleteDashboard.open()\" class=\'btn btn-danger hidden-xs\' ng-show=\"showDeleteDhb\" tooltip=\"Delete Dashboard\"><span class=\'fa fa-trash-o\'></span> </button> -->\n      </div>\n    </div>\n\n  </div>\n\n\n  <!-- Widgets selection container -->\n  <div id=\"widget-selector\" collapse=\"!showWidgetSelector\">\n    <div class=\"title\">\n      <i class=\"fa fa-times-circle\" ng-click=\"showWidgetSelector = false\"/>\n      <span class=\"badge confirmation\">Widget added!</span>\n      Select the widgets you want to add to your dashboard.\n    </div>\n\n    <div class=\"row top-container\">\n      <div class=\"col-md-3 categories\">\n        <div class=\"row header\">\n          All categories\n        </div>\n        <div class=\"row lines\">\n          <div class=\"col-md-12\" style=\"padding: 3px 12px;\">\n            <p ng-click=\"selectedCategory=\'accounts\'\" ng-class=\"isCategorySelected(\'accounts\') ? \'selected\' : none\">Accounting</p>\n            <p ng-click=\"selectedCategory=\'invoices\'\" ng-class=\"isCategorySelected(\'invoices\') ? \'selected\' : none\">Invoicing</p>\n            <p ng-click=\"selectedCategory=\'hr\'\" ng-class=\"isCategorySelected(\'hr\') ? \'selected\' : none\">HR / Payroll</p>\n            <p ng-click=\"selectedCategory=\'sales\'\" ng-class=\"isCategorySelected(\'sales\') ? \'selected\' : none\">Sales</p>\n          </div>\n        </div>\n\n        <div class=\"arrow\" ng-style=\"getSelectedCategoryTop()\">\n          <div class=\"square\" />\n          <i class=\"fa fa-caret-right\" />\n        </div>\n\n      </div>\n\n      <div class=\"col-md-9 widgets\">\n        <div class=\"row header\">\n          {{getSelectedCategoryName() | titleize}}\n        </div>\n        <div class=\"row lines\">\n          <div class=\"col-md-4\" ng-repeat=\"widgetPattern in getWidgetsForSelectedCategory()\" style=\"padding: 0px 8px;\">\n            <p ng-click=\"addWidget(widgetPattern.path, widgetPattern.metadata)\" tooltip=\"{{widgetPattern.desc}}\" tooltip-placement=\"{{$index < 9 ? \'bottom\' : \'top\'}}\" tooltip-animation=\"false\"><i class=\"fa fa-{{widgetPattern.icon}}\" /> {{widgetPattern.name}} <i class=\"fa fa-plus-circle\" /></p>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"bottom\">\n      <span class=\"suggestion\">\n        Can\'t find the widget you\'re looking for? <a ng-click=\"modal.widgetSuggestion.open()\">Give us your suggestions here!</a>\n      </span>\n    </div>\n  </div>\n\n\n  <!-- Errors -->\n  <div class=\"alert alert-error\" ng-show=\"errors\">\n    <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n    <ul>\n      <li ng-repeat=\"error in errors\">{{error}}</li>\n    </ul>\n  </div>\n\n  <div class=\'spacer1\'></div>\n\n  <div class=\"text-center impac-background ng-hide\" ng-show=\'(showChooseDhbMsg || showNoWidgetsMsg) && !isLoading\'>\n\n    <img ng-src=\"{{impacDashboardBackground}}\" class=\"bg\">\n\n    <div class=\"impac-info-message\">\n      <!-- First Time Dashboard Creation -->\n      <div class=\"ng-hide\" ng-show=\'showChooseDhbMsg && !isLoading\'>\n        <div class=\'hidden-xs\'>\n          <div class=\'spacer4\'></div>\n          <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"testimonial promo-dark\">\n                <p><b>It\'s time to add a reporting dashboard!</b></p><p>In 2 clicks, you\'ll be able to visualize how your business is performing.</p>\n              </div>\n            </div>\n          </div>\n          <div class=\'spacer2\'></div>\n        </div>\n        <div class=\"align-center\">\n          <button ng-click=\"modal.createDashboard.open()\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> Create a Dashboard!</button>\n        </div>\n      </div>\n\n      <!-- Empty Dashboard -->\n      <div class=\"ng-hide\" ng-show=\'showNoWidgetsMsg && !isLoading\'>\n        <div class=\'hidden-xs\'>\n          <div class=\'spacer4\'></div>\n          <div class=\"row\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"testimonial promo-dark\">\n                <p><b>Now it\'s time to select the metrics you want to see!</b></p><p>Add widgets to your dashboard to help make an Impac!™ to your business.</p>\n              </div>\n            </div>\n          </div>\n          <div class=\"spacer2\"></div>\n        </div>\n        <div class=\"align-center\">\n          <button ng-disabled=\"showWidgetSelector\" ng-click=\"showWidgetSelector=true\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> Add a new Widget</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- First Time Dashboard Creation -->\n  <div class=\"row text-center\" ng-show=\'showChooseDhbMsg && !isLoading\'>\n    <div class=\"spacer2 hidden-xs\"></div>\n    <div class=\'col-md-8 col-md-offset-2\'>\n      <p class=\"text-muted\"><small><em>Note: dashboards you create will only be accessible by you. Dashboard sharing across users will be added soon.</em></small></p>\n    </div>\n  </div>\n\n  <!-- Widgets -->\n  <div class=\'row\'>\n    <div ui:sortable=\"sortableOptions\" ng-model=\"currentDhb.widgets\" class=\"widgets-container\">\n      <div impac-widget widget=\"widget\" parent-dashboard=\"currentDhb\" ng-repeat=\"widget in currentDhb.widgets\" class=\"widget-item\" ng-class=\"widget.getColClass()\" />\n    </div>\n  </div>\n</div>\n\n<div class=\'clearfix\'></div>\n<div class=\'spacer2\'></div>\n");
$templateCache.put("dashboard/delete.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"close()\" >×</div>\n  <h3>Delete Dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!-- Create a new widget -->\n  <p>Are you sure you want to delete this analytics dashboard?</p>\n  \n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"close()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-danger\" ng-click=\"proceed()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\">Delete</button>\n      <img ng-src=\"{{loadingGif}}\" ng-show=\"isLoading\" alt=\"Loading\">\n    </div>\n    \n  </div>\n</div>");
$templateCache.put("dashboard/widget-suggestion.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"close()\" >×</div>\n  <h3>Suggest a widget</h3>\n</div>\n\n<div class=\"modal-body\">\n  \n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <label>What would you name your widget?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.name\" ng-disabled=\"isLoading\" />\n    </div>\n    <div class=\"col-md-6\">\n      <label>In which category?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.category\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" />\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <label>What kind of information would your widget display?</label><br />\n      <textarea ng-model=\"widgetDetails.description\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" ng-show=\"isLoading\" />\n\n  <div class=\"row\" ng-show=\"isLoading\">\n    <div class=\"col-md-12 text-center\">\n      <h3 class=\"thanks-message\">{{userName | titleize}}, thanks a lot for helping us improve Impac!&trade;</h3>\n    </div>\n  </div>\n  \n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\" ng-class=\"isLoading ? \'text-center\' : null\">\n      <button class=\"btn btn-shaded\" ng-click=\"close()\" ng-hide=\"isLoading\">Cancel</button>\n      <button class=\"btn btn-info\" ng-click=\"proceed()\" ng-hide=\"isLoading\" ng-disabled=\"!(widgetDetails.name && widgetDetails.category && widgetDetails.description)\">Send your suggestion</button>\n      <img ng-src=\"{{loadingGif}}\" ng-show=\"isLoading\" alt=\"Loading\">\n    </div>\n  </div>\n</div>");
$templateCache.put("widgets/accounts-assets-summary.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\"></div>\n  <div common-editable-title parent-widget=\"widget\"></div>\n</div>\n\n<div widget-accounts-assets-summary class=\"content\">\n  <div ng-hide=\"widget.isLoading\">\n    <div ng-show=\"widget.isEditMode\" class=\"edit\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n      <div ng-if=\"isDataFound\" class=\"chart-container\">\n        <div dhb-chart data=\"widget.chart\"></div>\n        <div class=\"legend\">\n          <span ng-repeat=\"valuePair in widget.content.summary\">\n            <span style=\"font-weight: bold; color: {{getAccountColor(valuePair)}};\">{{valuePair.label}}</span>: {{valuePair.total | mnoCurrency : getCurrency()}}\n            <br />\n          </span>\n        </div>\n      </div>\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\" >\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/accounts-accounting-values-ebitda.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-accounting-value class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div ng-show=\"widget.isEditMode\" class=\"edit\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n      <div ng-show=\"isDataFound\">\n        <div setting-hist-mode parent-widget= \"widget\" />\n\n        <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n          <div class=\"price\">\n             {{ getCurrentPrice() | mnoCurrency : getCurrency() : false }}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n          <div class=\"legend\">{{getLegend()}}</div>\n        </div>\n\n        <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n        <div ng-if=\"widget.isHistoryMode\" class=\"history\">\n          <div dhb-chart data=\"widget.chart\"></div>\n          <div class=\"legend\">{{getLegend()}}</div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-balance-sheet.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-balance-sheet class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-6 text-center\">Compare with previous: <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/></div>\n            <div class=\"col-sm-3 text-right\">{{widget.content.dates[0] | date : \"d-MMM\"}}</div>\n            <div class=\"col-sm-3 text-right\">{{widget.content.dates[1] | date : \"d-MMM\"}}</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"category in categories\" >\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(category)\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(category) ? \"fa-plus-square-o\" : \"fa-minus-square-o\"\" /></div>\n              <div class=\"col-sm-5\"><strong>{{category | titleize}}</strong></div>\n              <div class=\"col-sm-3 text-right\"><strong>{{widget.content.summary[category].totals[0] | mnoCurrency : widget.content.summary[category].currency}}</strong></div>\n              <div class=\"col-sm-3 text-right\"><strong>{{widget.content.summary[category].totals[1] | mnoCurrency : widget.content.summary[category].currency}}</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(category)\">\n              <div class=\"row widget-line\" ng-repeat=\"account in widget.content.summary[category].accounts\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-5\">{{account.name | titleize}}</div>\n                <div class=\"col-sm-3 text-right\">{{account.totals[0] | mnoCurrency : account.currency}}</div>\n                <div class=\"col-sm-3 text-right\">{{account.totals[1] | mnoCurrency : account.currency}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/accounts-balance.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-balance class=\"content\">\n  <div ng-hide=\"widget.isLoading\">\n    <div ng-show=\"widget.isEditMode\" class=\"edit\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div ng-hide=\"!isDataFound\" setting-account parent-widget=\"widget\" class=\"part\" />\n      <div ng-hide=\"!isDataFound\" setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n      <div ng-show=\"isDataFound\">\n        <div setting-hist-mode parent-widget=\"widget\" />\n\n        <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n        <div ng-if=\"widget.isHistoryMode\" class=\"history\">\n          <div dhb-chart data=\"widget.chart\"></div>\n          <div class=\"legend\">{{getName()}}</div>\n        </div>\n\n        <div ng-hide=\"widget.isHistoryMode\">\n          <h3>{{getName()}}</h3>\n          <div class=\"price\">\n             {{ getCurrentBalance() | mnoCurrency : getCurrency() : false }}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/accounts-cash-summary.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-cash-summary class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line header\">\n              <div class=\"col-sm-1\" />\n              <div class=\"col-sm-5\"></div>\n              <div class=\"col-sm-3 text-right\">{{getLastDate() | date : \"d-MMM\"}}</div>\n              <div class=\"col-sm-3 text-right\">Variance</div>\n            </div>\n            <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n              <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(statement)\"><i class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n                <div class=\"col-sm-5\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n                <div class=\"col-sm-3 text-right\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong></div>\n                <div class=\"col-sm-3 text-right\" ng-click=\"toogleSelectedElement(statement)\" ng-class=\"getVarianceClassColor(getLastVariance(statement))\"><strong>{{getLastVariance(statement)}}</strong></div>\n              </div>\n              <div collapse=\"isCollapsed(statement)\">\n                <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(account)\" ng-repeat=\"account in statement.accounts\" ng-class=\"isSelected(account) ? \'selected\' : null\" >\n                  <div class=\"col-sm-1\" />\n                  <div class=\"col-sm-5\">{{account.name}}</div>\n                  <div class=\"col-sm-3 text-right\">{{getLastValue(account) | mnoCurrency : account.currency }}</div>\n                  <div class=\"col-sm-3 text-right\" ng-class=\"getVarianceClassColor(getLastVariance(account))\">{{getLastVariance(account)}}</div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n          <h4>{{getName(selectedElement) | titleize}}</h4>\n          <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n            <div dhb-chart data=\"widget.chart\"></div>\n          </div>\n          <div class=\"legend\">{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Cash Flow</div>\n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-2 text-center\" ng-repeat=\"date in dates\" style=\"padding: 5px 0px;\">\n                <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date | date : \"d-MMM\"}}</div></div>\n                <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{selectedElement.cash_flows[$index] | mnoCurrency : selectedElement.currency }}</div></div>\n                <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\" ng-class=\"getVarianceClassColor(selectedElement.variances[$index])\">{{formatVariance(selectedElement.variances[$index])}}</div></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/accounts-custom-calculation.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-custom-calculation class=\"content\">\n  <div setting-organizations parent-widget=\"widget\" ng-hide=\"true\" />\n  <div setting-accounts-list parent-widget=\"widget\" />\n  <div setting-formula parent-widget=\"widget\" />\n\n  <div ng-hide=\"widget.isLoading\">\n    <h3 ng-show=\"widget.hasEditAbility && !widget.isFormulaCorrect\">\n      <a href=\"\" ng-click=\"formulaModal.open()\">Create a custom calculation</a>\n    </h3>\n\n    <div class=\"price\" ng-show=\"widget.isFormulaCorrect\">\n      {{widget.evaluatedFormula}}\n    </div>\n    <!-- Should be put in a tooltip/popover instead -->\n<!--     <div class=\"legend\" ng-show=\"widget.isFormulaCorrect\">\n      {{widget.legend}}\n    </div> -->\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/accounts-custom-calculation/formula.modal.html","<div class=\"modal-custom-calculation\">\n  <div class=\"modal-header\">\n    <div class=\"close\" type=\"button\" ng-click=\"formulaModal.cancel()\" >×</div>\n    <h3>Custom Calculation</h3>\n  </div>\n\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <div class=\"alert alert-error\" ng-show=\"formulaModal.errors\">\n          <button class=\"close\" ng-click=\"formulaModal.errors=\'\'\">×</button>\n          <ul>\n            <li ng-repeat=\"error in formulaModal.errors\">{{error}}</li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <!-- <div class=\'analytics\'>  -->\n      \n      <div class=\"edit\">\n        <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      </div>\n\n      <p>Make a custom equation with your accounts, and save it as a widget. To create an equation, simply select your accounts in the list, and use the classical operators (example: ({1} + {2}) / {3})</p>\n\n      <div class=\'row\'>\n        <div ng-show=\"widget.isLoading\" class=\'col-md-6 loader\' align=\"center\">\n          Your data is being retrieved...\n          <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n        </div>\n\n        <div ng-hide=\"widget.isLoading\" class=\'col-md-6\'>\n          <div class=\'widget-line\' ng-repeat=\'account in widget.selectedAccounts\'>\n            <div class=\'row\'>\n              <div class=\'col-md-6\'>\n                {{$index+1}} - {{account.name}}\n              </div>\n              <div class=\'col-md-6\'>\n                {{account.current_balance | mnoCurrency : account.currency}}\n                <button class=\"close\" ng-click=\"removeAccountFromFormula(account)\" ng-show=\"widget.hasEditAbility\"><span class=\'fa fa-times-circle\'></span></button>\n              </div>\n            </div>\n          </div>\n\n          <div class=\'input-group\' ng-show=\"widget.hasEditAbility\">\n            <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + widget.formatAmount(account) + \')\' for account in widget.remainingAccounts\" class=\'form-control\' ng-change=\'addAccountToFormula(movedAccount)\'><select>\n          </div>\n        </div>\n        \n        <div class=\'col-md-6\'>\n          <p>Type your formula just below:</p>\n          <input class=\'form-control\' ng-model=\"widget.formula\">\n\n          <p>Result: {{widget.evaluatedFormula}}</p>\n          <p>Legend: {{widget.legend}}</p>\n        </div>\n      </div>\n    <!-- </div> -->\n  </div>\n\n  <div class=\"modal-footer\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <button class=\"btn btn-gray\" ng-click=\"formulaModal.cancel()\" ng-hide=\"widget.isLoading\" ng-disabled=\"isLoading\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"formulaModal.proceed()\" ng-hide=\"widget.isLoading\" ng-disabled=\'!widget.isFormulaCorrect || widget.isLoading\'>Save</button>\n        <img ng-src=\"{{loaderImage}}\" ng-show=\"widget.isLoading\" alt=\"Loading\">\n      </div>\n      \n    </div>\n  </div>\n</div>");
$templateCache.put("widgets/accounts-expenses-revenue.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-expenses-revenue class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div ng-show=\"widget.isEditMode\" class=\"edit\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n      <div ng-show=\"isDataFound\">\n        <div setting-hist-mode parent-widget=\"widget\" />\n\n        <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n        <div ng-if=\"widget.isHistoryMode && !widget.isLoading\">\n          <div dhb-chart data=\"widget.hist_chart\"></div>\n          <div class=\"legend\">\n            <span class=\"pink\">Expenses</span> -\n            <span class=\"blue\">Revenue</span>\n          </div>\n        </div>\n\n        <div ng-if=\"!widget.isHistoryMode && !widget.isLoading\" class=\"chart-container\">\n          <div dhb-chart data=\"widget.cur_chart\"></div>\n          <div class=\"legend\">\n            <span class=\"pink\">Expenses: {{getCurrentExpenses() | mnoCurrency : getCurrency()}}</span>\n            </br>\n            <span class=\"blue\">Revenue: {{getCurrentRevenue() | mnoCurrency : getCurrency()}}</span>\n          </div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/accounts-payable-receivable.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-payable-receivable class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div ng-show=\"widget.isEditMode\" class=\"edit\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n      <div ng-show=\"isDataFound\">\n        <div setting-hist-mode parent-widget=\"widget\" />\n\n        <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n        <div ng-if=\"widget.isHistoryMode\">\n          <div dhb-chart data=\"widget.chart\"></div>\n          <div class=\"legend\">\n            <span class=\"pink\">Payable</span> -\n            <span class=\"blue\">Receivable</span>\n          </div>\n        </div>\n\n        <div ng-hide=\"widget.isHistoryMode\">\n          <div class=\"receivable\">\n            <h3>Accounts Receivable</h3>\n            <div class=\"price blue\">\n               {{getCurrentReceivable() | mnoCurrency : getCurrency() : false}}\n            </div>\n            <div class=\"currency\">{{getCurrency()}}</div>\n          </div>\n\n          <div class=\"payable\">\n            <h3>Accounts Payable</h3>\n            <div class=\"price pink\">\n              {{getCurrentPayable() | mnoCurrency : getCurrency() : false}}\n            </div>\n            <div class=\"currency\">{{getCurrency()}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/accounts-comparison.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-comparison class=\"content\">\n  <div setting-accounts-list parent-widget=\"widget\" />\n\n  <div ng-hide=\"widget.isLoading\">\n    <div ng-show=\"widget.isEditMode\" class=\"edit\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n        <div ng-hide=\"hasAccountsSelected()\" class=\"row\">\n          <h5>Select which accounts you wish to compare.</h5>\n          <div class=\"col-md-6\">\n            <div class=\"input-group\">\n              <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in widget.remainingAccounts\" class=\"form-control\" ng-show=\"widget.hasEditAbility\" ng-change=\"addAccount(movedAccount)\"></select>\n            </div>\n          </div>\n        </div>\n\n        <div ng-if=\"hasAccountsSelected()\">\n          <div class=\"row\">\n            <div class=\"col-md-12 chart-container\">\n              <div dhb-chart data=\"widget.chart\" />\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <div class=\"widget-lines-container\">\n                <div class=\"widget-line\" ng-repeat=\"account in widget.selectedAccounts\">\n                  <button class=\"close\" ng-click=\"removeAccount(account)\" ng-show=\"widget.hasDeleteAbility\">\n                    x\n                  </button>\n                  <i style=\"float: right; margin-right: 10px;\">{{formatAmount(account)}}</i>\n                  <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getAccountColor(account)}}\" />\n                  {{account.name}}\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row\">\n            <div class=\"border\" />\n            <div class=\"add-account\">\n              <div class=\"input-group\">\n                <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in widget.remainingAccounts track by account.uid\" class=\"form-control\" ng-show=\"widget.hasDeleteAbility\" ng-change=\"addAccount(movedAccount)\" ng-disabled=\"widget.selectedAccounts.length >= 15 || widget.remainingAccounts.length == 0\">\n                  <option value=\"\" disabled selected>+ ADD ACCOUNT</option>\n                </select>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/accounts-profit-and-loss.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-accounts-profit-and-loss class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line header\">\n              <div class=\"col-sm-8\">{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Profit and Loss</div>\n              <div class=\"col-sm-4 text-right\">{{getLastDate() | date : \"d-MMM\"}}</div>\n            </div>\n            <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n              <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(statement)\"><i ng-show=\"statement.accounts\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n                <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n                <div class=\"col-sm-4 text-right\" ng-class=\"getClassColor(getLastValue(statement))\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong></div>\n              </div>\n              <div collapse=\"isCollapsed(statement)\">\n                <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(account)\" ng-repeat=\"account in statement.accounts\" ng-class=\"isSelected(account) ? \'selected\' : null\" >\n                  <div class=\"col-sm-1\" />\n                  <div class=\"col-sm-7\">{{account.name}}</div>\n                  <div class=\"col-sm-4 text-right\" ng-class=\"getClassColor(getLastValue(account))\">{{getLastValue(account) | mnoCurrency : account.currency}}</div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n          <h4>{{(widget.metadata.hist_parameters.period || \"Monthly\") | titleize}} Profit and Loss</h4>\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n            <div dhb-chart data=\"widget.chart\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-2 text-center\" ng-repeat=\"date in dates\" style=\"padding: 5px 0px;\">\n                <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date | date : \"d-MMM\"}}</div></div>\n                <div class=\"row widget-line\"><div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\" style=\"padding: 0px;\">{{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}</div></div>\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n              <i style=\"float: right; margin-right: 10px;\" ng-class=\"getClassColor(getLastValue(element))\">{{getLastValue(element) | mnoCurrency : element.currency}}</i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              {{getName(element) | titleize}}\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/catalogue.tmpl.html","<div class=\"row\">\n  <div class=\"col-md-3 menu\" ng-hide=\"menu.loading\">\n    <div class=\"heading\">\n      Impac!&trade; widgets catalogue\n    </div>\n    <accordion close-others=\"true\">\n      <accordion-group ng-repeat=\"category in menu.categories\" is-open=\"selected\">\n        <accordion-heading ng-click=\"selected = !selected\">\n          <div class=\"category\" ng-class=\"selected ? \'selected\' : null\">\n            {{category.name}}\n            <i ng-show=\"selected\" class=\"fa fa-caret-down\" style=\"float: right\" />\n            <i ng-hide=\"selected\" class=\"fa fa-caret-right\" style=\"float: right\" />\n          </div>\n        </accordion-heading>\n        <div class=\"widget-name\" ng-repeat=\"widget in category.widgets\" ng-click=\"show.get(widget.id)\" ng-class=\"widget.id == show.widget.id ? \'selected\' : null\">\n          {{widget.name}}\n          <i ng-show=\"widget.id == show.widget.id\" class=\"fa fa-angle-double-right\" style=\"float: right; margin-top: 3px;\" />\n        </div>\n      </accordion-group>\n    </accordion>\n  </div>\n  <div class=\"col-md-3\" ng-show=\"menu.loading\"><img class=\"gif\" ng-src=\"{{loaderImage}}\"/></div>\n\n  <div class=\"col-md-9 content\" ng-style=\"{\'border-color\' : show.color}\">\n\n    <div class=\"row header\" ng-show=\"show.widget && !show.loading\">\n      <div class=\"col-xs-2 heading\" ng-style=\"{\'background-color\' : show.color, \'border-color\' : show.color}\">\n        {{show.widget.category}}\n      </div>\n      <div class=\"col-xs-1 triangle-topleft\" ng-style=\"{\'border-top-color\' : show.color}\"></div>\n      <span class=\"red\" ng-hide=\"show.widget.active\">Inactive (displayed only to admins)</span>\n    </div>\n\n    <div class=\"row title center\" ng-show=\"show.widget && !show.loading\">\n      <h2>{{show.widget.name}}</h2>\n    </div>\n\n    <div class=\"row fields-container\" ng-show=\"show.widget && !show.loading\">\n\n      <div class=\"col-md-6\">\n        <div class=\"left-panel\">\n          <div class=\"heading\" ng-style=\"{\'background-color\' : show.color}\">\n            Screenshot\n          </div>\n          <div class=\"field screenshot\">\n            <img ng-src=\"{{show.widget.screenshot}}\">\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\">\n\n        <div class=\"row\">\n          <div class=\"heading\" ng-style=\"{\'background-color\' : show.color}\">\n            Description\n          </div>\n          <div class=\"field description\">\n            <p ng-bind-html=\"show.widget.full_description\" />\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"heading\" ng-style=\"{\'background-color\' : show.color}\">\n            Settings\n          </div>\n          <div class=\"field settings\">\n            <div class=\"setting\" ng-class=\"show.widget.settings.length <= 3 ? \'col-md-12\' : \'col-md-6\'\" ng-repeat=\"setting in show.widget.settings\">\n              <i class=\"fa fa-cog\" />\n              {{setting}}\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\" ng-style=\"{\'border-color\' : show.color}\">\n          <div class=\"heading\" ng-style=\"{\'background-color\' : show.color}\">\n            Compatible with...\n          </div>\n          <div class=\"field apps\">\n            <div class=\"col-md-2 app\" ng-repeat=\"app in show.widget.compatible_apps\" style=\"padding: 0px;\" >\n              <img ng-src=\"{{app.logo.logo.url}}\" class=\"app-logo\" tooltip=\"{{app.name}}\" tooltip-placement=\"bottom\" />\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n    <div class=\"row no-widget center\" ng-hide=\"show.widget || show.loading\">\n      <h3>Please select a widget</h3>\n    </div>\n\n    <div class=\"row no-widget center\" ng-show=\"show.loading || menu.loading\">\n      <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n    </div>\n\n    <div class=\"spacer1\"></div>\n\n  </div>\n</div>\n\n<div class=\"spacer1\" />\n\n<div class=\"row\">\n  <a class=\"btn btn-primary\" href=\"/impac_catalogue/\" style=\"float: right;\">\n    Download PDF Catalogue\n  </a>\n</div>");
$templateCache.put("widgets/hr-employee-details.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-employee-details class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" />\n          <div setting-param-selector parent-widget=\"widget\" param=\"employee_uid\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"row title\" />\n\n          <div class=\"details-container\">\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Job Title</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().job_title || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Company</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().company || getSingleCompanyName()}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Phone</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().phone || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Email</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().email || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Date of birth</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().dob || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Gender</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().gender || \"-\" }}</pre></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n          <div class=\"legend\">Salary calculation period: <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" /></div>\n          <div class=\"details-container\">\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Salary</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().salary || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Address</label></div>\n              <div class=\"col-md-8\"><pre>{{formatAddress(getEmployee().address) || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Job location</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().location || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Supervisor</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().supervisor || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Statuts</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().employment_status || \"-\" }}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Note</label></div>\n              <div class=\"col-md-8\"><pre>{{getEmployee().note || \"-\" }}</pre></div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/hr-employees-list.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-employees-list class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" >\n\n        <div class=\"legend\">\n          <strong>{{widget.content.total.employees}}</strong> employee{{widget.content.total.employees > 1 ? \"s\" : null}} - Average salary rate (<span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>): <strong>{{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}</strong>\n        </div>\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-2\">Company</div>\n            <div class=\"col-sm-3\">Employee</div>\n            <div class=\"col-sm-2\">Title</div>\n            <div class=\"col-sm-3\">Phone</div>\n            <div class=\"col-sm-2\">Salary</div>\n          </div>\n          <div class=\"row widget-line\" ng-repeat=\"employee in widget.content.employees\" >\n            <div class=\"col-sm-2\">{{employee.company || getSingleCompanyName()}}</div>\n            <div class=\"col-sm-3\">{{employee.lastname}} {{employee.firstname}}</div>\n            <div class=\"col-sm-2\"><i>{{employee.job_title}}</i></div>\n            <div class=\"col-sm-3\">{{employee.phone}}</div>\n            <div class=\"col-sm-2\"><i>{{getEmployeeSalary(employee)}}</i></div>\n          </div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/hr-leaves-balance.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-leaves-balance class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" >\n\n        <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"widget-line\">\n            <i style=\"float: right; margin-right: 10px;\">{{getEmployee().total_leaves}} h</i>\n            Accrued\n          </div>\n          <div class=\"widget-line\">\n            <i style=\"float: right; margin-right: 10px;\">{{getEmployee().total_timeoff}} h</i>\n            Used\n          </div>\n        </div>\n\n        <h3>Leave Balance</h3>\n        <div class=\"price\">{{(getEmployee().total_leaves - getEmployee().total_timeoff)}} hours</div>\n        <div class=\"legend\">\n          <span>(from {{widget.content.dates[0] | date : \"MMM-d\"}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \"MMM-d\"}})</span>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/hr-leaves-schedule.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-leaves-schedule class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n\n        <div widget-component-calendar ng-model=\"eventSources\"></div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/hr-payroll-summary.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-payroll-summary class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line header\">\n              <div class=\"col-sm-12\">Payroll Summary - {{getPeriod()}}</div>\n            </div>\n            <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.summary\" >\n              <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(statement)\"><i ng-show=\"statement.employees\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n                <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getName(statement) | titleize}}</strong></div>\n                <div class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(statement)\">\n                  <strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong>\n                </div>\n              </div>\n              <div collapse=\"isCollapsed(statement)\">\n                <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(employee)\" ng-repeat=\"employee in statement.employees\" ng-class=\"isSelected(employee) ? \'selected\' : null\" >\n                  <div class=\"col-sm-1\" />\n                  <div class=\"col-sm-7\">{{employee.name}}</div>\n                  <div class=\"col-sm-4 text-right\">\n                    <span>{{getLastValue(employee) | mnoCurrency : employee.currency}}</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n          <h4>{{(widget.content.hist_parameters.period || \"Monthly\") | titleize}} Payroll Summary</h4>\n\n          <div setting-hist-mode parent-widget=\"widget\" />\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n            <div ng-if=\"widget.isHistoryMode\" dhb-chart data=\"widget.hist_chart\"></div>\n            <div ng-if=\"!widget.isHistoryMode\" dhb-chart data=\"widget.cur_chart\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div ng-show=\"getTrackedField()\" class=\"legend\">{{getTrackedField()}}</div>\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-2 text-center\" ng-repeat=\"date in widget.content.dates\" style=\"padding: 5px 0px;\">\n                <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{formatDate(date)}}</div></div>\n                <div class=\"row widget-line\">\n                  <div class=\"col-sm-12\" style=\"padding: 0px;\">{{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency }}</div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div ng-if=\"widget.isHistoryMode\" class=\"widget-line header\">\n              <span ng-show=\"getTrackedField()\">{{getTrackedField()}} - </span>From {{widget.content.dates[0] | date : \"MMM-d\"}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \"MMM-d\"}}\n            </div>\n            <div ng-if=\"!widget.isHistoryMode\" class=\"widget-line header\">\n              <span ng-show=\"getTrackedField()\">{{getTrackedField()}} - </span>{{getPeriod()}}\n            </div>\n\n            <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n              <i style=\"float: right; margin-right: 10px;\">\n                <span ng-if=\"widget.isHistoryMode\">{{getTotalSum(element) | mnoCurrency : element.currency}}</span>\n                <span ng-if=\"!widget.isHistoryMode\">{{getLastValue(element) | mnoCurrency : element.currency}}</span>\n              </i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              {{getName(element) | titleize}}\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/hr-payroll-taxes.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-payroll-taxes class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div ng-show=\"widget.isEditMode\" class=\"edit\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n      <div ng-show=\"isDataFound\">\n        <div setting-hist-mode parent-widget= \"widget\" />\n\n        <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n          <div class=\"price\">{{getCurrentPrice() | mnoCurrency : getCurrency() : false}}</div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n          <div class=\"legend\">Taxes upon workforce costs<br />{{getPeriod()}}</div>\n        </div>\n\n        <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n        <div ng-if=\"widget.isHistoryMode\" class=\"history\">\n          <div dhb-chart data=\"widget.chart\"></div>\n          <div class=\"legend\">Taxes upon workforce costs</div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-salaries-summary.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-salaries-summary class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\">\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" />\n\n          <h3 class=\"left\">Average Salary Rate</h3>\n          <div class=\"price\">\n             {{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}\n          </div>\n          <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n          <div class=\"legend\">\n            <span>({{widget.content.total.employees}} employee{{widget.content.total.employees > 1 ? \"s\" : null}} with known salary)</span>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n          <h3 class=\"right\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/></h3>\n          <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n            <div dhb-chart data=\"widget.chart\"></div>\n          </div>\n          <div class=\"widget-lines-container\">\n            <div class=\"widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n              <i style=\"float: right; margin-right: 10px;\"><b>{{data.value | mnoCurrency : widget.content.total.currency}} (av.)</b></i>\n              <i ng-hide=\"widget.content.summary.filter==\'age_range\'\" class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n              {{data.label}}\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/hr-timesheets.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-timesheets class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n\n        <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" />\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-12\">From {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}</div>\n          </div>\n          <div class=\"row widget-line total\" >\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(\'total_time_worked\')\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(\'total_time_worked\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\"><strong>Total Time Worked</strong></div>\n              <div class=\"col-sm-4 text-right\"><strong>{{getEmployeeTimeWorked()}} h</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(\'total_time_worked\')\">\n              <div class=\"row widget-line\">\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-11\"><i>Activities detail not found</i></div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"row widget-line total\" >\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(\'total_time_of\')\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(\'total_time_of\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\"><strong>Total Time Off</strong></div>\n              <div class=\"col-sm-4 text-right\"><strong>{{getEmployeeTimeOff()}} h</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(\'total_time_of\')\">\n              <div class=\"row widget-line\">\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">PTO</div>\n                <div class=\"col-sm-4 text-right\">0 h</div>\n              </div>\n              <div class=\"row widget-line\">\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">Vacation</div>\n                <div class=\"col-sm-4 text-right\">0 h</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/hr-superannuation-accruals.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-superannuation-accruals class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n\n        <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" />\n\n        <h3>Superannuation Balance</h3>\n        <div class=\"price\">{{getEmployee().total_super | mnoCurrency : getEmployee().currency}}</div>\n        <div class=\"legend\">\n          <span>(from {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}})</span>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/hr-workforce-summary.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-hr-workforce-summary class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\">\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" />\n\n          <h3 class=\"left\">Total Workforce</h3>\n          <div class=\"price\">\n             {{getTotalWorkforce() | mnoCurrency : getCurrency()}}\n          </div>\n          <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n          <div class=\"legend\">\n            <span>({{getNumberOfEmployees()}} employee{{getNumberOfEmployees() > 1 ? \'s\' : null}} with known salary)</span>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n          <h3 class=\"right\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/></h3>\n          <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n            <div dhb-chart data=\"widget.chart\"></div>\n          </div>\n          <div class=\"widget-lines-container\">\n            <div class=\"widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n              <i style=\"float: right; margin-right: 10px;\"><b>{{((data.value / widget.content.total.amount)*100).toFixed()}}%</b></i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n              {{widget.content.summary.filter == \"salary_range\" ? formatSalaryRange(data) : data.label}}\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/invoices-aged-payables-receivables.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-invoices-aged-payables-receivables class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line header\">\n              <div class=\"col-sm-8\">Aged Payables & Receivables</div>\n              <div class=\"col-sm-4 text-right\">{{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}</div>\n            </div>\n\n            <!-- Payables -->\n            <div class=\"row widget-line total\">\n              <div class=\"row widget-line\" ng-class=\"isSelected(widget.content.payables) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(widget.content.payables)\">\n                  <i ng-show=\"widget.content.payables.suppliers\" class=\"fa\" ng-class=\"isCollapsed(widget.content.payables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(widget.content.payables)\">\n                  <strong>Aged Payables</strong>\n                </div>\n                <div class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(widget.content.payables)\">\n                  <strong>{{getTotalSum(widget.content.payables) | mnoCurrency : widget.content.payables.currency}}</strong>\n                </div>\n              </div>\n              <div ng-hide=\"isCollapsed(widget.content.payables)\">\n                <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(supplier)\" ng-repeat=\"supplier in widget.content.payables.suppliers\" ng-class=\"isSelected(supplier) ? \'selected\' : null\" >\n                  <div class=\"col-sm-1\" />\n                  <div class=\"col-sm-7\">{{supplier.name}}</div>\n                  <div class=\"col-sm-4 text-right\">\n                    <span>{{getTotalSum(supplier) | mnoCurrency : supplier.currency}}</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <!-- Receivables -->\n            <div class=\"row widget-line total\">\n              <div class=\"row widget-line\" ng-class=\"isSelected(widget.content.receivables) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(widget.content.receivables)\">\n                  <i ng-show=\"widget.content.receivables.customers\" class=\"fa\" ng-class=\"isCollapsed(widget.content.receivables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(widget.content.receivables)\">\n                  <strong>Aged Receivables</strong>\n                </div>\n                <div class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(widget.content.receivables)\">\n                  <strong>{{getTotalSum(widget.content.receivables) | mnoCurrency : widget.content.receivables.currency}}</strong>\n                </div>\n              </div>\n              <div ng-hide=\"isCollapsed(widget.content.receivables)\">\n                <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(customer)\" ng-repeat=\"customer in widget.content.receivables.customers\" ng-class=\"isSelected(customer) ? \'selected\' : null\" >\n                  <div class=\"col-sm-1\" />\n                  <div class=\"col-sm-7\">{{customer.name}}</div>\n                  <div class=\"col-sm-4 text-right\">\n                    <span>{{getTotalSum(customer) | mnoCurrency : customer.currency}}</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n          <h4>{{(widget.content.hist_parameters.period || \"Monthly\") | titleize}} Aged Payables and Receivables</h4>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\" ng-if=\"isDataFound && widget.isExpanded()\">\n            <div dhb-chart data=\"widget.chart\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div class=\"row widget-line\">\n              <div class=\"col-sm-2 text-center\" ng-repeat=\"date in widget.content.dates\" style=\"padding: 5px 0px;\">\n                <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date | date : \'MMM-d\'}}</div></div>\n                <div class=\"row widget-line\">\n                  <div class=\"col-sm-12\" style=\"padding: 0px;\">{{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}</div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div class=\"widget-line header\">\n              Total from {{widget.content.dates[0] | date : \'MMM-d\'}} to {{widget.content.dates[widget.content.dates.length - 1] | date : \'MMM-d\'}}\n            </div>\n\n            <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n              <i style=\"float: right; margin-right: 10px;\">\n                <span>{{getTotalSum(element) | mnoCurrency : element.currency}}</span>\n              </i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              {{getName(element) | titleize}}\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/invoices-list.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-invoices-list class=\"content\">\n\n  <div ng-show=\"widget.isLoading\">\n    <div class=\"loader\" align=\"center\">\n      Your data is being retrieved...\n      <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n      <div class=\"widget-line\">\n        <div class=\"row table-header\" ng-show=\"widget.width > 3\">\n          <div class=\"col-sm-4\">{{entityTypeCap}}</div>\n          <div class=\"col-sm-8\">\n            <div class=\"col-xs-4\">Paid</div>\n            <div class=\"col-xs-4\">Due</div>\n            <div class=\"col-xs-4\">Invoiced</div>\n          </div>\n        </div>\n        <div class=\"row table-header\" ng-hide=\"widget.width > 3\">\n          <div class=\"col-xs-7\">{{entityTypeCap}}</div>\n          <div class=\"col-xs-4\" ng-show=\"orderBy == \'paid \'\">Paid</div>\n          <div class=\"col-xs-4\" ng-show=\"orderBy == \'due \'\">Due</div>\n          <div class=\"col-xs-4\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\">Invoiced</div>\n        </div>\n      </div>\n      <div class=\"widget-lines-container\">\n        <div class=\"widget-line\" ng-hide=\"isDataFound\">\n          <div>\n            <div class=\"row\">\n              <div class=\"col-xs-11\">No {{orderBy}}invoice found for your {{entityType}}</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"widget-line\" ng-show=\"isDataFound\" ng-repeat=\"entity in widget.content.entities\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getInvoices(entity)}}\" tooltip-animation=\"false\">\n          <div class=\"row\">\n            <div ng-show=\"widget.width > 3\">\n              <div class=\"col-sm-4\">{{entity.name}}</div>\n              <div class=\"col-sm-8\">\n                <div class=\"col-xs-4\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n                <div class=\"col-xs-4\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n                <div class=\"col-xs-4\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n              </div>\n            </div>\n          <div ng-hide=\"widget.width > 3\">\n            <div class=\"col-xs-7\">{{entity.name}}</div>\n            <div class=\"col-xs-4\" ng-show=\"orderBy == \'paid \'\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n            <div class=\"col-xs-4\" ng-show=\"orderBy == \'due \'\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n            <div class=\"col-xs-4\" ng-hide=\"orderBy == \'paid\' || orderBy == \'due \'\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/invoices-summary.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-invoices-summary class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-chart-filters parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div align=\"center\" ng-hide=\"widget.isEditMode\">\n      <div class=\"chart-container\" ng-if=\"isDataFound\">\n        <div dhb-chart data=\"widget.chart\"></div>\n        <div class=\"legend\">\n          <span>{{widget.content.legend}}</span>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/sales-aged.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-aged class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"center\">\n\n        <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload truncate-no=\"60\" />\n\n        <div class=\"chart-container\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n        <div class=\"legend\">From {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n\n        <div class=\"widget-lines-container\">\n          <!-- <div class=\"row widget-line\"> -->\n            <div class=\"col-sm-2 text-center\" ng-repeat=\"date in formattedDates track by $index\" style=\"padding: 5px 0px;\">\n              <div class=\"row widget-line\"><div class=\"col-sm-12\" style=\"padding: 0px;\">{{date}}</div></div>\n              <div class=\"row widget-line\">\n              <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" style=\"padding: 0px;\">\n                {{getTotal($index) | mnoCurrency : widget.content.currency : false}}\n                <br />\n                {{widget.content.currency}}\n              </div>\n              <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" style=\"padding: 0px;\">\n                {{getTotal($index)}}\n              </div>\n            </div>\n          <!-- </div> -->\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-break-even.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-break-even class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"align-center\">\n\n        <div class=\"legend\">From {{widget.content.period.from | date : \'d MMM yyyy\'}} to {{widget.content.period.to | date : \'d MMM yyyy\'}}</div>\n\n        <div class=\"block to-date\">\n          <div class=\"title\">Sales to Date</div>\n          <div class=\"price\">{{widget.content.sales.to_date | mnoCurrency : widget.content.currency : false}}</div>\n          Target: <span class=\"edit-target\" style=\"float: right;\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"widget.updateSettings()\">\n            {{threshold | mnoCurrency : widget.content.currency : false}}\n          </span>\n        </div>\n\n        <div ng-show=\"widget.content.break_even\" class=\"block to-breakeven\">\n          <div class=\"title\">Projection to Break-Even</div>\n          <span ng-show=\"isTargetMet()\">Your sales already exceed your target by:</span>\n          <div class=\"price\">{{getVariance() | mnoCurrency : widget.content.currency : false}}</div>\n          <span ng-hide=\"isTargetMet()\">\n            Projected date: <span style=\"float: right;\">{{getProjectedDate() | date : \'d-MM-yy\'}}</span>\n            <br />\n            Opportunities to close: <span style=\"float: right;\">{{getOpportunitiesToClose()}}</span>\n          </span>\n        </div>\n        <div ng-show=\"widget.content.break_even\" class=\"legend\">{{widget.content.break_even.eligible_opportunities}} eligible opportunities</div>\n\n        <div ng-hide=\"widget.content.break_even\" class=\"block to-breakeven\">\n          <span class=\"edit-target\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"widget.updateSettings()\">\n            <div class=\"currency\">Click to define your sales target</div>\n          </span>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-customer-details.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-customer-details class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" />\n          <div setting-param-selector parent-widget=\"widget\" param=\"customer_uid\" options=\"customersOptions\" selected=\"selectedCustomer\" class=\"row title\" />\n\n          <div class=\"details-container\">\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Email</label></div>\n              <div class=\"col-md-8\"><pre>{{getCustomer().email}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Phone</label></div>\n              <div class=\"col-md-8\"><pre>{{getCustomer().phone}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Website</label></div>\n              <div class=\"col-md-8\"><pre>{{getCustomer().website}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Contact</label></div>\n              <div class=\"col-md-8\"><pre>{{getCustomer().contact}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>City</label></div>\n              <div class=\"col-md-8\"><pre>{{getCustomer().city}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-4\"><label>Country</label></div>\n              <div class=\"col-md-8\"><pre>{{getCustomer().country}}</pre></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n          <div class=\"details-container\">\n            <div class=\"row\" style=\"border-bottom: solid 1px #e6e6e6; margin-bottom: 10px; padding-bottom: 5px;\">\n              <div class=\"col-md-3\"><label>Address</label></div>\n              <div class=\"col-md-9\"><pre>{{formatAddress(getCustomer().full_address)}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-12 center legend\">From {{getFromDate() | date : \'d MMM yyyy\'}} to {{getToDate() | date : \'d MMM yyyy\'}}:</div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-5\"><label>Total invoiced</label></div>\n              <div class=\"col-md-7\"><pre>{{getCustomer().total_invoiced | mnoCurrency : getCustomer().currency}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-5\"><label>Total paid</label></div>\n              <div class=\"col-md-7\"><pre>{{getCustomer().total_paid | mnoCurrency : getCustomer().currency}}</pre></div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-md-5\"><label>Total due</label></div>\n              <div class=\"col-md-7\"><pre>{{getCustomer().total_due | mnoCurrency : getCustomer().currency}}</pre></div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-comparison.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-comparison class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n          <div class=\"row legend center\">\n            Compare by: <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"criteria\" options=\"criteriaOptions\" selected=\"criteria\" truncate-no=\"30\" />\n             ---\n            See: <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" truncate-no=\"30\" no-reload />\n          </div>\n\n          <div class=\"widget-lines-container\" style=\"max-height: 530px;\">\n            <div class=\"row widget-line header\">\n              <div class=\"col-sm-12\">Total sales from {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n            </div>\n            <div class=\"row widget-line total\" ng-repeat=\"statement in widget.content.sales_comparison\" >\n              <div class=\"row widget-line\" ng-class=\"isSelected(statement) ? \'selected\' : null\" >\n                <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(statement)\"><i ng-show=\"statement.sales\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n                <div class=\"col-sm-7\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{statement.name | titleize}}</strong></div>\n                <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getTotalForPeriod(statement)}}</strong></div>\n                <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\" ng-click=\"toogleSelectedElement(statement)\"><strong>{{getTotalForPeriod(statement) | mnoCurrency : statement.currency}}</strong></div>\n              </div>\n              <div collapse=\"isCollapsed(statement)\">\n                <div class=\"row widget-line\" ng-click=\"toogleSelectedElement(sale)\" ng-repeat=\"sale in statement.sales\" ng-class=\"isSelected(sale) ? \'selected\' : null\" >\n                  <div class=\"col-sm-1\" />\n                  <div class=\"col-sm-7\">{{sale.name}}</div>\n                  <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\">{{getTotalForPeriod(sale)}}</div>\n                  <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-sm-4 text-right\">{{getTotalForPeriod(sale) | mnoCurrency : sale.currency}}</div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n          <div class=\"chart-container\" ng-if=\"selectedElements.length > 0 && widget.isExpanded()\">\n            <div dhb-chart data=\"widget.chart\"></div>\n          </div>\n\n          <div class=\"widget-lines-container\">\n            <div class=\"row widget-line header\">\n              <div class=\"col-sm-12\">Total sales from {{widget.content.dates[0]}} to {{getLastDate()}}</div>\n            </div>\n            <div class=\"widget-line\" ng-repeat=\"element in selectedElements\">\n              <i ng-show=\"filter.value == \'quantity_sold\'\" style=\"float: right; margin-right: 10px;\">{{getTotalForPeriod(element)}}</i>\n              <i ng-hide=\"filter.value == \'quantity_sold\'\" style=\"float: right; margin-right: 10px;\">{{getTotalForPeriod(element) | mnoCurrency : element.currency}}</i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getElementChartColor($index)}}\" />\n              {{element.name | titleize}}\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-cycle.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-cycle class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div align=\"center\" ng-hide=\"widget.isEditMode\">\n      <div class=\"chart-container\" ng-if=\"isDataFound\">\n        <div dhb-chart data=\"widget.chart\"></div>\n        <div class=\"legend\">\n          <span>Your sales cycle represents how much time your leads stay set to each status</span>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/sales-forecast.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-forecast class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" >\n\n        <div class=\"chart-container\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n\n        <div class=\"widget-lines-container\" style=\"max-height: 340px;\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-12\">Projection on the next 6 months</div>\n          </div>\n          <div class=\"row widget-line total\" ng-repeat=\"date in widget.content.dates.slice(6) track by $index\" ng-init=\"collapsed = true\" >\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-6\" ng-click=\"collapsed = !collapsed\">{{date | date : \'MMMM yyyy\'}}</div>\n              <div class=\"col-sm-6 text-right\"><strong>{{widget.content.totals.slice(6)[$index] | mnoCurrency : widget.content.currency}}</strong></div>\n            </div>\n            <div collapse=\"collapsed\">\n              <div class=\"row widget-line\" ng-repeat=\"opp in widget.content.opportunities.slice(6)[$index]\" >\n                <div class=\"col-sm-6\">{{opp.name}}</div>\n                <div class=\"col-sm-6 text-right\">{{getOpportunityAmount(opp) | mnoCurrency : getOpportunityCurrency(opp)}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-growth.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-growth class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n\n        <div class=\"selector\">\n          <div setting-param-selector parent-widget=\"widget\" param=\"product\" options=\"productOptions\" selected=\"product\"/>\n          <div ng-show=\"product.value != -1\" setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/>\n        </div>\n\n        <div class=\"chart-container\" ng-if=\"isDataFound && product.value != -1\">\n          <div dhb-chart data=\"widget.chart\"></div>\n        </div>\n\n        <div ng-show=\"product.value != -1\" class=\"legend text-center\">{{getSelectedProduct().name}}</div>\n        <div class=\"price text-center\" ng-hide=\"isDataQuantity || product.value == -1\" tooltip=\"total for last period\">{{getCurrentValue() | mnoCurrency : getSelectedProduct().currency}}</div>\n        <div class=\"price text-center\" ng-show=\"isDataQuantity && product.value != -1\" tooltip=\"total for last period\">{{getCurrentValue()}}</div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-leads-funnel.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-leads-funnel class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n          <div class=\"legend\">Your leads sales funnel from {{widget.content.from | date : \'d MMM yyyy\'}} to {{widget.content.to | date : \'d MMM yyyy\'}}</div>\n\n          <div class=\"funnel-container\">\n            <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toogleSelectStatus(elem.status)\">\n              <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n              <div class=\"status\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n          <div ng-hide=\"selectedStatus\" class=\"currency\">\n            Select a status to display a list of the corresponding leads\n          </div>\n\n          <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n            <div class=\"row widget-line total\" ng-repeat=\"lead in getSelectedLeads()\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getLeadDescription(lead)}}\" tooltip-animation=\"false\">\n              <div class=\"row widget-line\" >\n                <div class=\"col-sm-7\">\n                  {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n                  <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n                </div>\n                <div class=\"col-sm-5 text-right\"><strong>{{lead.lead_status | titleize}}</strong></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-leads-list.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-leads-list class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n\n        <div class=\"widget-lines-container\" style=\"max-height: 235px;\">\n          <div class=\"row widget-line total\" style=\"cursor: pointer;\" ng-repeat=\"lead in widget.content.leads\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"top\" tooltip-html-unsafe=\"{{getLeadDescription(lead)}}\" tooltip-animation=\"false\">\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-7\">\n                {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n                <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n              </div>\n              <div class=\"col-sm-5 text-right\"><strong>{{lead.lead_status | titleize}}</strong></div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-margin.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-margin class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div ng-show=\"widget.isEditMode\" class=\"edit\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n      <div ng-show=\"isDataFound\">\n        <div setting-hist-mode parent-widget= \"widget\" />\n\n        <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n          <div class=\"price\">\n             {{ getTotalMargin() | mnoCurrency : getCurrency()}}\n          </div>\n          <div class=\"legend\">\n            Total sold - Total purchased\n            </br>\n            {{getTimeSpan()}}\n            </br>\n            <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload />\n          </div>\n        </div>\n\n        <!-- the display condition must be an \"if\" and its value must change for the chart to be drawn again -->\n        <div ng-if=\"widget.isHistoryMode\" class=\"history\">\n          <div dhb-chart data=\"widget.chart\"></div>\n          <div class=\"legend\">Total sold - Total purchased</div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-list.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-list class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n\n        <div class=\"selector\">\n          See: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/> for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n          ({{widget.content.hist_parameters.from | date : \"d MMM\"}} to {{widget.content.hist_parameters.to | date : \"d MMM\"}})\n        </div>\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line total\" ng-repeat=\"company in widget.content.summary\" >\n            <div class=\"row widget-line\" >\n              <div class=\"col-sm-1\" ng-click=\"toogleCollapsed(company.name)\" style=\"cursor: pointer;\"><i class=\"fa\" ng-class=\"isCollapsed(company.name) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" /></div>\n              <div class=\"col-sm-7\"><strong>{{company.name | titleize}}</strong></div>\n              <div class=\"col-sm-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\"><strong>{{company.total}}</strong></div>\n              <div class=\"col-sm-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\"><strong>{{company.total | mnoCurrency : company.currency}}</strong></div>\n            </div>\n            <div collapse=\"isCollapsed(company.name)\">\n              <div class=\"row widget-line\" ng-repeat=\"product in company.products\" >\n                <div class=\"col-sm-1\" />\n                <div class=\"col-sm-7\">{{product.name | titleize}}</div>\n                <div class=\"col-sm-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\"><strong>{{product.total}}</strong></div>\n                <div class=\"col-sm-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\"><strong>{{product.total | mnoCurrency : product.currency}}</strong></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-number-of-leads.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-number-of-leads class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"align-center\">\n        Leads for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n\n        <div class=\"stats\">\n          <div class=\"stat row align-left\" ng-repeat=\"carac in [\'new\', \'converted\', \'lost\']\">\n            <div class=\"col-md-6 title\" style=\"padding: 0px;\">{{carac | titleize}}</div>\n            <div class=\"col-md-6\" style=\"padding: 0px;\">\n              <span class=\"variation\" ng-class=\"formatNumberOfLeads(carac).color\">{{formatNumberOfLeads(carac).variation}}</span>\n              <span class=\"nominal\">{{formatNumberOfLeads(carac).nominal}}</span>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"legend\">\n        {{widget.content.number_of_leads.total[1]}} leads in total\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-opportunities-funnel.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-opportunities-funnel class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-params-picker options=\"statusOptions\" param=\"sales_stage_selection\" parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\" >\n\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\': \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" />\n\n          <div class=\"legend\">Your opportunities, sorted by sales stage</div>\n\n          <div class=\"funnel-container\">\n            <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toogleSelectStatus(elem.status)\">\n              <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n              <div class=\"status\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n          <div ng-hide=\"selectedStatus\" class=\"currency\">\n            Select a sales stage to display a list of the corresponding opportunities\n          </div>\n\n          <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n            <div class=\"row widget-line total\" ng-repeat=\"opp in getSelectedOpportunities()\">\n              <div class=\"row widget-line\" >\n                <div class=\"col-sm-6\">\n                  {{opp.name | titleize}}\n                </div>\n                <div class=\"col-sm-6 text-right\"><strong>{{getOppDetails(opp)}}</strong></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-performance.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-performance class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n\n        <div class=\"widget-lines-container\" style=\"max-height: 235px;\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-sm-4\">Users/Teams</div>\n            <div class=\"col-sm-4 text-right\">Win ratio</div>\n            <div class=\"col-sm-4 text-right\">Total won</div>\n          </div>\n          <div class=\"row widget-line total\" style=\"cursor: pointer;\" ng-repeat=\"assignee in widget.content.assignees\" ng-init=\"collapsed=true\">\n            <div class=\"row widget-line\" ng-click=\"collapsed=!collapsed\">\n              <div class=\"col-sm-4\"><strong>{{assignee.name | titleize}}</strong></div>\n              <div class=\"col-sm-4 text-right\"><strong>{{assignee.win_ratio}} %</strong></div>\n              <div class=\"col-sm-4 text-right\"><strong>{{assignee.total_won | mnoCurrency : \'AUD\'}}</strong></div>\n            </div>\n            <div collapse=\"collapsed\">\n              <div class=\"row widget-line\" ng-repeat=\"opp in assignee.opportunities\" >\n                <div class=\"col-sm-4\">{{opp.name}}</div>\n                <div class=\"col-sm-4 text-right\">{{opp.sales_stage}}</div>\n                <div class=\"col-sm-4 text-right\">{{getOpportunityAmount(opp)}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/sales-segmented-turnover.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-segmented-turnover class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-time-range parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"row\">\n        <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n          <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\"></div>\n\n          <h3 class=\"left\">Filter: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/></h3>\n          <div class=\"chart-container\" ng-if=\"isDataFound\">\n            <div dhb-chart data=\"widget.chart\"></div>\n          </div>\n          <div class=\"widget-lines-container\">\n            <div class=\"widget-line\">\n              Average price range\n            </div>\n            <div class=\"widget-line\" ng-repeat=\"range in widget.content.ranges\">\n              <i style=\"float: right; margin-right: 10px;\">{{range.percentage}}%</i>\n              <i class=\"fa fa-circle\" style=\"margin: 0px 8px; color: {{getColorByIndex($index)}}\" />\n              {{getRangeLabel(range.label)}}\n            </div>\n          </div>\n        </div>\n\n        <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n          <i class=\"fa fa-info-circle\" style=\"float: left;\" tooltip=\"This widget segments your revenue by products average price range and propose an analysis of its composition\" />\n          <h3 style=\"margin: 25px 10px; text-align: center;\">{{getMaxRange().percentage.toFixed()}}% of your revenue comes from products sold at an average price between {{getMaxRange().label.split(\'-\')[0] | mnoCurrency : widget.content.currency}} and {{getMaxRange().label.split(\'-\')[1] | mnoCurrency : widget.content.currency}}.</h3>\n          <div class=\'price hidden-md\' >{{getAnalysis()}}</div>\n        </div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/sales-summary.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-summary class=\"content\">\n\n  <div ng-hide=\"widget.isLoading\">\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n      <div setting-chart-filters parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\" class=\"selector\">\n        See: <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\"/>\n        for this <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\"/>\n        ({{widget.content.hist_parameters.from | date : \'d MMM\'}} to {{widget.content.hist_parameters.to | date : \'d MMM\'}})\n      </div>\n\n      <div class=\"chart-container\" ng-if=\"isDataFound && !incorrectPeriod\">\n        <div dhb-chart data=\"widget.chart\"></div>\n      </div>\n\n      <div class=\"data-not-found\" ng-if=\"incorrectPeriod\">\n        <div class=\"message\">No data found for this period<br/> Please select another one</div>\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n  </div>\n\n  <div class=\"loader\" align=\"center\" ng-show=\"widget.isLoading\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n</div>");
$templateCache.put("widgets/sales-top-opportunities.tmpl.html","<div class=\"top-line\">\n  <div common-top-buttons parent-widget=\"widget\" />\n  <div common-editable-title parent-widget=\"widget\" />\n</div>\n\n<div widget-sales-top-opportunities class=\"content\">\n\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    Your data is being retrieved...\n    <img class=\"gif\" ng-src=\"{{loaderImage}}\"/>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\">\n\n    <div class=\"edit\" ng-show=\"widget.isEditMode\">\n      <h4>Widget settings</h4>\n\n      <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n      <div align=\"right\">\n        <button class=\"btn btn-default\" ng-click=\"widget.initSettings()\">Cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"widget.updateSettings()\">Save</button>\n      </div>\n    </div>\n\n    <div ng-hide=\"widget.isEditMode\">\n\n      <div ng-show=\"isDataFound\">\n\n        <div class=\"legend\">\n          Total potential: <b>{{widget.content.total_potential | mnoCurrency : widget.content.currency || \"AUD\"}}</b> - <b>{{widget.content.eligible_opportunities}}</b> eligible opportunities\n        </div>\n\n        <div class=\"opps-container\">\n          <div class=\"tile\" ng-repeat=\"opp in widget.content.opportunities track by $index\" ng-class=\"getOppClass($index)\">\n            <div class=\"colored-area\">{{$index +1 }}</div>\n            <div class=\"name\">\n              {{opp.name | titleize}}\n              <br />\n              <i style=\"font-size: 13px;\">{{getOppDetails(opp)}}</i>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div ng-hide=\"isDataFound\" common-data-not-found widget-engine=\"widget.category\" />\n    </div>\n\n  </div>\n</div>");
$templateCache.put("widgets/template-admin.tmpl.html","<div class=\"widget-template-admin\">\n  <h1>Widget template <small>(last update: {{index.lastUpdate}})</small></h1>\n\n\n  <div class=\"panel-cat\" ng-click=\"activateCat(\'create\')\">\n    <h4>\n      <span ng-hide=\"cat[\'create\']\">+</span>\n      <span class=\"ng-hide\" ng-show=\"cat[\'create\']\">-</span>\n      Create a widget template\n    </h4>\n  </div>\n  <div class=\"ng-hide\" ng-show=\"cat[\'create\']\">\n    <div class=\"alert alert-success ng-hide\" ng-show=\"create.successMsg\">Success! Well done!<button class=\"close\" ng-click=\"create.successMsg=false\">×</button></div>\n    <div class=\"alert alert-error ng-hide\" ng-show=\"create.errorMsg\">Error: {{create.errors}}<button class=\"close\" ng-click=\"create.errorMsg=false\">×</button></div>\n    <form name=\"create_form\">\n      <div class=\"row\">\n        <div class=\"col-md-2 align-right\">\n          <label for=\"create_name\">*Name:</label>\n        </div>\n        <div class=\"col-md-3\">\n          <input type=\"text\" required id=\"create_name\" class=\"form-control\" ng-model=\"create.model[\'name\']\">\n        </div>\n        <div class=\"col-md-2 col-md-offset-1 align-right\">\n          <label for=\"create_description\">*Description (tooltip):</label>\n        </div>\n        <div class=\"col-md-3\">\n          <input type=\"text\" required id=\"create_description\" class=\"form-control\" ng-model=\"create.model[\'description\']\">\n        </div>\n      </div>\n      <div class=\"spacer1\"></div>\n      <div class=\"row\">\n        <div class=\"col-md-2 align-right\">\n          <label for=\"create_icon\">*Icon (font-awesome):</label>\n        </div>\n        <div class=\"col-md-3\">\n          <input type=\"text\" required id=\"create_icon\" class=\"form-control\" ng-model=\"create.model[\'icon\']\">\n        </div>\n        <div class=\"col-md-2 col-md-offset-1 align-right\">\n          <label for=\"create_settings\">Settings (separated by commas, no spaces):</label>\n        </div>\n        <div class=\"col-md-3\">\n          <input type=\"text\" id=\"create_settings\" class=\"form-control\" ng-model=\"create.model[\'settings\']\">\n        </div>\n      </div>\n      <div class=\"spacer1\"></div>\n      <div class=\"row\">\n        <div class=\"col-md-2 align-right\">\n          <label for=\"create_width\">*Width:</label>\n        </div>\n        <div class=\"col-md-3\">\n          <input type=\"number\" required min=\"3\" max=\"12\" id=\"create_width\" class=\"form-control\" ng-model=\"create.model[\'width\']\">\n        </div>\n        <div class=\"col-md-2 col-md-offset-1 align-right\">\n          <label for=\"create_screenshot\">\n            Screenshot: (prefer 400px*380px)\n            <br/>\n            <small>Preview on save only</small>\n          </label>\n        </div>\n        <div class=\"col-md-3\">\n          <input type=\"file\" id=\"create_screenshot\" class=\"form-control\" file-model=\"create.screenshot\">\n        </div>\n      </div>\n      <div class=\"spacer1\"></div>\n      <div class=\"row\">\n        <div class=\"col-md-2 align-right\">\n          <label for=\"create_full_description\">\n            *Full description:\n            <br/>\n            <small>{{create.model[\'full_description\'].length}}/350 char</small>\n          </label>\n        </div>\n        <div class=\"col-md-3\">\n          <textarea row=\"15\" required id=\"create_full_description\" class=\"form-control\" ng-model=\"create.model[\'full_description\']\"/>\n        </div>\n        <div class=\"col-md-2 col-md-offset-1 align-right\">\n          <label for=\"create_active\">Active:</label>\n        </div>\n        <div class=\"col-md-3\">\n          <input type=\"checkbox\" id=\"create_active\" class=\"form-control\" ng-model=\"create.model[\'active\']\">\n        </div>\n      </div>\n      <div class=\"spacer1\"></div>\n      <div class=\"row\">\n        <div class=\"col-md-2 align-right\">\n          <label for=\"category\">*Category:</label>\n        </div>\n        <div class=\"col-md-3\">\n          <select required id=\"category\" class=\"form-control\" ng-model=\"create.model[\'category\']\" ng-options=\"cat.name for cat in index.categories\"/>\n        </div>\n        <div class=\"col-md-2 col-md-offset-1 align-right\">\n          <label for=\"create_engine\">Engine:</label>\n        </div>\n        <div class=\"col-md-3\">\n          <input type=\"text\" id=\"create_engine\" class=\"form-control\" ng-model=\"create.model[\'engine\']\">\n        </div>\n      </div>\n      <div class=\"spacer1\"></div>\n      <div class=\"row\">\n        <h4>Endpoints:</h4>\n      </div>\n      <div class=\"row\">\n        <div ng-repeat=\"ep in create.endpoints\">\n          <div class=\"col-md-2 align-right checkbox-label\">\n            <label for=\"{{ep.name}}\">{{ep.name}}</label>\n          </div>\n          <div class=\"col-md-1\">\n            <input type=\"checkbox\" id=\"{{ep.name}}\" class=\"form-control\" ng-model=\"ep.checked\" ng-change=\"getCompatibleApps(create)\"/>\n          </div>\n        </div>\n      </div>\n      <div class=\"spacer1\"></div>\n      <div class=\"row\">\n        <h4>Preview:</h4>\n      </div>\n      <div class=\"impac-catalogue\">\n        <div class=\"col-md-2\"></div>\n        <div class=\"col-md-9 content\" id=\"preview_create\" ng-style=\"{\'border-color\' : create.model.category.color}\">\n\n          <div class=\"row header\">\n            <div class=\"col-xs-2 heading\" ng-style=\"{\'background-color\' : create.model.category.color, \'border-color\' : create.model.category.color}\">\n              {{create.model.category.name}}\n            </div>\n            <div class=\"col-xs-1 triangle-topleft\" ng-style=\"{\'border-top-color\' : create.model.category.color}\"></div>\n            <span class=\"red\" ng-hide=\"create.model.active\">Inactive (displayed only to admins)</span>\n          </div>\n\n          <div class=\"row title center\">\n            <h2>{{create.model.name}}</h2>\n          </div>\n\n          <div class=\"row fields-container\">\n\n            <div class=\"col-md-6\">\n              <div class=\"left-panel\">\n                <div class=\"heading\" ng-style=\"{\'background-color\' : create.model.category.color}\" style=\"font-size: 17px; font-weight: 700;\">\n                  Screenshot\n                </div>\n                <div class=\"field screenshot\">\n                  <img ng-src=\"{{create.model.screenshot}}\" ng-show=\"create.inProgress\">\n                  <p ng-hide=\"create.inProgress\">No preview available</p>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-md-6 right-panel\">\n              <div class=\"row\">\n                <div class=\"heading\" ng-style=\"{\'background-color\' : create.model.category.color}\" style=\"font-size: 17px; font-weight: 700;\">\n                  Description\n                </div>\n                <div class=\"field description\">\n                  <p ng-bind-html=\"create.model.full_description\"></p>\n                </div>\n              </div>\n\n              <div class=\"row\">\n                <div class=\"heading\" ng-style=\"{\'background-color\' : create.model.category.color}\" style=\"font-size: 17px; font-weight: 700;\">\n                  Settings\n                </div>\n                <div class=\"field settings\">\n                  <div class=\"setting\" ng-class=\"getSettings(create.model).length <= 3 ? \'col-md-12\' : \'col-md-6\'\" ng-repeat=\"setting in getSettings(create.model) track by $index\">\n                    <i ng-hide=\"getSettings(create.model).length == 0\" class=\"fa fa-cog\" />\n                    {{setting}}\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row\" ng-style=\"{\'border-color\' : create.model.category.color}\">\n                <div class=\"heading\" ng-style=\"{\'background-color\' : create.model.category.color}\" style=\"font-size: 17px; font-weight: 700;\">\n                  Compatible with...\n                </div>\n                <div class=\"field apps\">\n                  <div class=\"col-md-2 app\" ng-repeat=\"app in create.model.compatible_apps.slice(0,6)\" style=\"padding: 0px;\" >\n                    <img ng-src=\"{{app.logo.logo.url}}\" class=\"app-logo\" tooltip=\"{{app.name}}\" tooltip-placement=\"bottom\" />\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n\n      <div class=\"spacer2\"></div>\n      <div class=\"row center\" ng-hide=\"create.inProgress\">\n        <label>\n          Generate pdf:\n          <input type=\"checkbox\" name=\"generate_pdf\" ng-model=\"create.generatePdf\"/>\n        </label>\n        <button class=\"btn btn-primary\" ng-disabled=\"create.saveDisabled || create_form.$invalid\" ng-click=\"create.save()\">Save</button>\n        <button class=\"btn btn-warning\" ng-click=\"create.reset()\">Reset</button>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"panel-cat\" ng-click=\"activateCat(\'update\')\">\n    <h4>\n      <span ng-hide=\"cat[\'update\']\">+</span>\n      <span class=\"ng-hide\" ng-show=\"cat[\'update\']\">-</span>\n      Update a widget template\n    </h4>\n  </div>\n  <div class=\"ng-hide\" ng-show=\"cat[\'update\']\">\n    <div class=\"alert alert-success ng-hide\" ng-show=\"update.successMsg\">Success! Well done!<button class=\"close\" ng-click=\"update.successMsg=false\">×</button></div>\n    <div class=\"alert alert-error ng-hide\" ng-show=\"update.errorMsg\">Error: {{update.errors}}<button class=\"close\" ng-click=\"update.errorMsg=false\">×</button></div>\n    <div ng-show=\"index.inProgress\" class=\"ng-hide\"><img class=\"gif\" ng-src=\"{{loaderImage}}\"/></div>\n    <div ng-hide=\"index.inProgress\" class=\"selector\">\n      <select ng-model=\"update.selected\" convert-to-number class=\"form-control\" ng-options=\"wt.name for wt in index.model\" />\n\n      <div ng-hide=\"update.selected\">No widget template selected</div>\n        <div class=\"ng-hide\" ng-show=\"update.selected\">\n        <form name=\"update_form\">\n          <div class=\"spacer1\"></div>\n          <div class=\"row\">\n            <h4>Template details:</h4>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-2 align-right\">\n            <label for=\"update_name\">*Name:</label>\n            </div>\n            <div class=\"col-md-3\">\n              <input type=\"text\" required id=\"update_name\" class=\"form-control\" ng-model=\"update.model[\'name\']\">\n            </div>\n\n            <div class=\"col-md-2 col-md-offset-1 align-right\">\n              <label for=\"update_description\">*Description (tooltip):</label>\n            </div>\n            <div class=\"col-md-3\">\n              <input type=\"text\" required id=\"update_description\" class=\"form-control\" ng-model=\"update.model[\'description\']\">\n            </div>\n          </div>\n          <div class=\"spacer1\"></div>\n          <div class=\"row\">\n            <div class=\"col-md-2 align-right\">\n            <label for=\"update_icon\">*Icon (font-awesome):</label>\n            </div>\n            <div class=\"col-md-3\">\n              <input type=\"text\" required id=\"update_icon\" class=\"form-control\" ng-model=\"update.model[\'icon\']\">\n            </div>\n            <div class=\"col-md-2 col-md-offset-1 align-right\">\n              <label for=\"update_settings\">Settings (separated by commas, no spaces):</label>\n            </div>\n            <div class=\"col-md-3\">\n              <input type=\"text\" id=\"update_settings\" class=\"form-control\" ng-model=\"update.model[\'settings\']\">\n            </div>\n          </div>\n          <div class=\"spacer1\"></div>\n          <div class=\"row\">\n            <div class=\"col-md-2 align-right\">\n            <label for=\"update_width\">*Width:</label>\n            </div>\n            <div class=\"col-md-3\">\n              <input type=\"number\" required min=\"3\" max=\"12\" id=\"update_width\" class=\"form-control\" ng-model=\"update.model[\'width\']\">\n            </div>\n            <div class=\"col-md-2 col-md-offset-1 align-right\">\n              <label for=\"update_screenshot\">\n                Screenshot: (prefer 400px*380px)\n                <br/>\n                <small>Preview on save only</small>\n              </label>\n            </div>\n            <div class=\"col-md-3\">\n              <input type=\"file\" id=\"update_screenshot\" class=\"form-control\" file-model=\"update.screenshot\">\n            </div>\n          </div>\n          <div class=\"spacer1\"></div>\n          <div class=\"row\">\n            <div class=\"col-md-2 align-right\">\n              <label for=\"update_full_description\">\n                *Full description:\n                <br/>\n                <small>{{update.model[\'full_description\'].length}}/350 char</small>\n              </label>\n            </div>\n            <div class=\"col-md-3\">\n              <textarea row=\"15\" required id=\"update_full_description\" class=\"form-control\" ng-model=\"update.model[\'full_description\']\"/>\n            </div>\n            <div class=\"col-md-2 col-md-offset-1 align-right\">\n              <label for=\"update_active\">Active:</label>\n            </div>\n            <div class=\"col-md-3\">\n              <input type=\"checkbox\" id=\"update_active\" class=\"form-control\" ng-model=\"update.model[\'active\']\">\n            </div>\n          </div>\n          <div class=\"spacer1\"></div>\n          <div class=\"row\">\n            <div class=\"col-md-2 align-right\">\n              <label for=\"category\">*Category:</label>\n            </div>\n            <div class=\"col-md-3\">\n              <select required id=\"category_id\" class=\"form-control\" ng-model=\"update.model[\'category\']\" ng-options=\"cat.name for cat in index.categories track by cat.id\"/>\n            </div>\n            <div class=\"col-md-2 col-md-offset-1 align-right\">\n              <label for=\"update_engine\">Engine:</label>\n            </div>\n            <div class=\"col-md-3\">\n              <input type=\"text\" id=\"update_engine\" class=\"form-control\" ng-model=\"update.model[\'engine\']\">\n            </div>\n          </div>\n          <div class=\"spacer1\"></div>\n          <div class=\"row\">\n            <h4>Endpoints:</h4>\n          </div>\n          <div class=\"row\">\n            <div ng-repeat=\"ep in update.endpoints\">\n              <div class=\"col-md-2 align-right checkbox-label\">\n                <label for=\"{{ep.name}}\">{{ep.name}}</label>\n              </div>\n              <div class=\"col-md-1\">\n                <input type=\"checkbox\" id=\"{{ep.name}}\" class=\"form-control\" ng-model=\"ep.checked\" ng-change=\"getCompatibleApps(update)\"/>\n              </div>\n            </div>\n          </div>\n          <div class=\"spacer1\"></div>\n          <div class=\"row\">\n            <h4>Preview:</h4>\n          </div>\n          <div class=\"impac-catalogue\">\n            <div class=\"col-md-2\"></div>\n            <div class=\"col-md-9 content\" id=\"preview_update\" ng-style=\"{\'border-color\' : update.model.category.color}\">\n\n              <div class=\"row header\">\n                <div class=\"col-xs-2 heading\" ng-style=\"{\'background-color\' : update.model.category.color, \'border-color\' : update.model.category.color}\">\n                  {{update.model.category.name}}\n                </div>\n                <div class=\"col-xs-1 triangle-topleft\" ng-style=\"{\'border-top-color\' : update.model.category.color}\"></div>\n                <span class=\"red\" ng-hide=\"update.model.active\">Inactive (displayed only to admins)</span>\n              </div>\n\n              <div class=\"row title center\">\n                <h2>{{update.model.name}}</h2>\n              </div>\n\n              <div class=\"row fields-container\">\n                <div class=\"col-md-6\">\n                  <div class=\"left-panel\">\n                    <div class=\"heading\" ng-style=\"{\'background-color\' : update.model.category.color}\" style=\"font-size: 17px; font-weight: 700;\">\n                      Screenshot\n                    </div>\n                    <div class=\"field screenshot\">\n                      <img ng-src=\"{{update.model.screenshot}}\">\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"col-md-6 right-panel\">\n                  <div class=\"row\">\n                    <div class=\"heading\" ng-style=\"{\'background-color\' : update.model.category.color}\" style=\"font-size: 17px; font-weight: 700;\">\n                      Description\n                    </div>\n                    <div class=\"field description\">\n                      <p ng-bind-html=\"update.model.full_description\"></p>\n                    </div>\n                  </div>\n\n                  <div class=\"row\">\n                    <div class=\"heading\" ng-style=\"{\'background-color\' : update.model.category.color}\" style=\"font-size: 17px; font-weight: 700;\">\n                      Settings\n                    </div>\n                    <div class=\"field settings\">\n                      <div class=\"setting\" ng-class=\"getSettings(update.model).length <= 3 ? \'col-md-12\' : \'col-md-6\'\" ng-repeat=\"setting in getSettings(update.model) track by $index\">\n                        <i class=\"fa fa-cog\" />\n                        {{setting}}\n                      </div>\n                    </div>\n                  </div>\n\n                  <div class=\"row\" ng-style=\"{\'border-color\' : update.model.category.color}\">\n                    <div class=\"heading\" ng-style=\"{\'background-color\' : update.model.category.color}\" style=\"font-size: 17px; font-weight: 700;\">\n                      Compatible with...\n                    </div>\n                    <div class=\"field apps\">\n                      <div class=\"col-md-2 app\" ng-repeat=\"app in update.model.compatible_apps.slice(0,6)\" style=\"padding: 0px;\" >\n                        <img ng-src=\"{{app.logo.logo.url}}\" class=\"app-logo\" tooltip=\"{{app.name}}\" tooltip-placement=\"bottom\" />\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </div>\n          </div>\n\n          <div class=\"spacer2\"></div>\n          <div class=\"row center\" ng-hide=\"update.inProgress\">\n            <label>\n              Generate pdf:\n              <input type=\"checkbox\" name=\"generate_pdf\" ng-model=\"update.generatePdf\"/>\n            </label>\n            <button class=\"btn btn-primary\" ng-disabled=\"update.saveDisabled || update_form.$invalid\" ng-click=\"update.save()\">Save</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel-cat\" ng-click=\"activateCat(\'delete\')\">\n    <h4>\n      <span ng-hide=\"cat[\'delete\']\">+</span>\n      <span class=\"ng-hide\" ng-show=\"cat[\'delete\']\">-</span>\n      Delete a widget template\n    </h4>\n  </div>\n  <div class=\"ng-hide\" ng-show=\"cat[\'delete\']\">\n    <div ng-show=\"index.inProgress\" class=\"ng-hide\"><img class=\"gif\" ng-src=\"{{loaderImage}}\"/></div>\n    <div ng-hide=\"index.inProgress\" class=\"selector\">\n      <select ng-model=\"destroy.selected\" convert-to-number class=\"form-control\" ng-options=\"wt.name for wt in index.model\">\n      </select>\n      <div ng-hide=\"destroy.selected\">No widget template selected</div>\n      <div class=\"ng-hide\" ng-show=\"destroy.selected\">\n        Do you really wish to permanantly delete the widget template \"{{destroy.selected.name}}\" (you could also simply desactivate it)? If so type \"<strong>I do</strong>\" in the input below.\n        <br/>\n        <label>\n          Generate pdf:\n          <input type=\"checkbox\" name=\"generate_pdf\" ng-model=\"destroy.generatePdf\"/>\n        </label>\n        <input type=\"text\" ng-model=\"destroy.confirm\">\n        <button class=\"btn btn-warning\" ng-disabled=\"destroy.confirm != \'I do\'\" ng-click=\"destroy.destroy()\" ng-hide=\"destroy.inProgress\">Delete</button>\n        <div class=\"ng-hide\" ng-show=\"destroy.inProgress\"><img class=\"gif\" ng-src=\"{{loaderImage}}\"/></div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel-cat\" ng-click=\"activateCat(\'addCategory\')\">\n    <h4>\n      <span ng-hide=\"cat[\'addCategory\']\">+</span>\n      <span class=\"ng-hide\" ng-show=\"cat[\'addCategory\']\">-</span>\n      Add a category\n    </h4>\n  </div>\n  <div class=\"ng-hide\" ng-show=\"cat[\'addCategory\']\">\n    <div class=\"row\">\n      <div class=\"col-md-2\">\n        <input type=\"text\" placeholder=\"Name\" ng-model=\"addCategory.model.name\"/>\n      </div>\n      <div class=\"col-md-2\">\n        <div class=\"row\">\n          <input type=\"text\" placeholder=\"Color (ex: #1de9b6)\" ng-model=\"addCategory.model.color\"/>\n        </div>\n        <div class=\"row\">\n        Impac! colors: \"#1de9b6\",\"#7c4dff\",\"#ffc928\",\"#3fc4ff\",\"#ff8e01\",\n        <br/>\"#c6ff00\",\"#d500fa\",\"#ff6e41\",\"#ffeb3c\",\"#ff1844\".\n        </div>\n      </div>\n      <div class=\"col-md-1\" style=\"color: white; background-color:{{addCategory.model.color}}\">\n        Test\n      </div>\n      <div class=\"col-md-1\">\n        <a class=\"btn btn-warning btn-sm\" ng-click=\"addCategory.save()\">Save</a>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"panel-cat\" ng-click=\"activateCat(\'updateCategory\')\">\n    <h4>\n      <span ng-hide=\"cat[\'updateCategory\']\">+</span>\n      <span class=\"ng-hide\" ng-show=\"cat[\'updateCategory\']\">-</span>\n      Update a category\n    </h4>\n  </div>\n  <div class=\"ng-hide\" ng-show=\"cat[\'updateCategory\']\">\n  <div class=\"alert alert-success ng-hide\" ng-show=\"updateCategory.successMsg\">Success! Well done!<button class=\"close\" ng-click=\"updateCategory.successMsg=false\">×</button></div>\n  <div class=\"alert alert-error ng-hide\" ng-show=\"updateCategory.errorMsg\">Error: {{updateCategory.errors}}<button class=\"close\" ng-click=\"updateCategory.errorMsg=false\">×</button></div>\n    <div class=\"row\">\n      <div ng-show=\"index.inProgress\" class=\"ng-hide\"><img class=\"gif\" ng-src=\"{{loaderImage}}\"/></div>\n      <div ng-hide=\"index.inProgress\" class=\"selector\">\n        <select ng-model=\"updateCategory.selected\" convert-to-number class=\"form-control\" ng-options=\"cat.name for cat in index.categories\"></select>\n        <div class=\"spacer1\"></div>\n      </div>\n      <div ng-hide=\"updateCategory.selected\">No category selected</div>\n      <div class=\"ng-hide\" ng-show=\"updateCategory.selected\">\n        <div class=\"col-md-2\">\n          <input type=\"text\" placeholder=\"Name\" ng-model=\"updateCategory.model.name\"/>\n        </div>\n        <div class=\"col-md-2\">\n          <div class=\"row\">\n            <input type=\"text\" placeholder=\"Color (ex: #1de9b6)\" ng-model=\"updateCategory.model.color\"/>\n          </div>\n          <div class=\"row\">\n          Impac! colors: \"#1de9b6\",\"#7c4dff\",\"#ffc928\",\"#3fc4ff\",\"#ff8e01\",\n          <br/>\"#c6ff00\",\"#d500fa\",\"#ff6e41\",\"#ffeb3c\",\"#ff1844\".\n          </div>\n        </div>\n        <div class=\"col-md-1\" style=\"color: white; background-color:{{updateCategory.model.color}}\">\n          Test\n        </div>\n        <div class=\"col-md-1\">\n          <a class=\"btn btn-warning btn-sm\" ng-click=\"updateCategory.save()\">Save</a>\n        </div>\n        <div class=\"col-md-6\">\n          <strong>Warning: updating a category (name or color) won\"t update the pdf catalogue. Each widget of that category will have to be updated.</strong>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("widgets-settings/account.tmpl.html","<h5>Account to monitor</h5>\n<div class=\"input-group select-account\">\n	<select ng-model=\"parentWidget.selectedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' for account in parentWidget.content.account_list track by account.uid\" class=\"form-control\" />\n</div>");
$templateCache.put("widgets-settings/chart-filters.tmpl.html","<h5>Chart filters</h5>\n<div class=\"row chart-filters\">\n  <div class=\"col-md-6\">\n    <input type=\"radio\" ng-model=\"filterCriteria\" value=\"number\">\n    <label for=\"number\" ng-click=\"filterCriteria = \'number\'\">Top {{filterValueNumber}} {{entityType}}</label>\n  </div>\n  <div class=\"col-md-6\">\n    <input type=\"range\" ng-model=\"filterValueNumber\" ng-change=\"filterCriteria = \'number\'\" min=\"3\" max=\"{{maxEntities}}\" step=\"1\">\n  </div>\n</div>\n<div class=\"row chart-filters\">\n  <div class=\"col-md-6\">\n    <input type=\"radio\" ng-model=\"filterCriteria\" value=\"percentage\">\n    <label for=\"percentage\" ng-click=\"filterCriteria = \"percentage\"\">Top {{filterValuePercentage}}% {{filterLabel}}</label>\n  </div>\n  <div class=\"col-md-6\">\n    <input type=\"range\" ng-model=\"filterValuePercentage\" ng-change=\"filterCriteria = \'percentage\'\" min=\"20\" max=\"100\" step=\"5\">\n  </div>\n</div>");
$templateCache.put("widgets-settings/hist-mode.tmpl.html","<div align=\"center\" class=\"histModeChoser\">\n  <a ng-click=\"toogleHistMode(\'current\')\" ng-class=\"!parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">current</a> |\n  <a ng-click=\"toogleHistMode(\'history\')\" ng-class=\"parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">history</a>\n</div>\n<div class=\"{{parentWidget.isHistoryMode ? \'arrow-container right\' : \'arrow-container left\'}}\">\n  <div class=\"arrow\" />\n  <div class=\"arrow-border\" />\n</div>");
$templateCache.put("widgets-settings/organizations.tmpl.html","<h5>Select Companies</h5>\n\n<div class=\"widget-lines-container\">\n  <div class=\"widget-line\" ng-repeat=\"org in dashboardOrganizations\">\n    {{org.label}}\n    <i ng-class=\"isOrganizationSelected(org.uid) ? \'fa fa-toggle-on\' : \'fa fa-toggle-off\'\" ng-click=\"toogleSelectOrganization(org.uid)\" tooltip=\"{{isOrganizationSelected(org.uid) ? \'disable\' : \'enable\'}}\" />\n  </div>\n</div>");
$templateCache.put("widgets-settings/param-selector.tmpl.html","<span class=\"settings param-selector\">\n	<a ng-click=\"toogleShowOptions()\">{{selected.label | titleize | truncate : getTruncateValue() : \"...\" : false}} <i class=\"fa fa-chevron-down\" /></a>\n	<div class=\"options-container\" collapse=\"!showOptions\">\n		<div ng-repeat=\"option in options\" ng-click=\"selectOption(option)\">\n			{{option.label | titleize}}\n		</div>\n	</div>\n</span>");
$templateCache.put("widgets-settings/params-picker.tmpl.html","<h5>{{formattedParam | titleize}}</h5>\n<div class=\"params-picker\">\n  <div style=\"margin-bottom: 8px;\">\n    The selected criteria will be displayed in this order (drag/drop to modify):\n  </div>\n  <div ui:sortable=\"sortableOptions\" ng-model=\"options\" class=\"input-group\">\n    <span ng-repeat=\"parameter in options track by $index\" class=\"parameter\" ng-class=\"!parameter.selected ? \'unchecked\' : \'\'\">\n      <span class=\"badge\">{{$index + 1}}</span>\n      {{parameter.label | titleize}}\n      <input type=\"checkbox\" ng-model=\"parameter.selected\" />\n    </span>\n  </div>\n</div>");
$templateCache.put("widgets-settings/time-range.tmpl.html","<h5>Time range</h5>\n<div class=\"time-range\">\n	<div class=\"row\">\n	  <div class=\"col-md-12\">\n	    Show last {{numberOfPeriods}} {{periodToUnit()}}\n	  </div>\n	</div>\n	<div class=\"row input-group\" align=\"center\" style=\"margin: 0; margin-top: 3px;\">\n	  <div class=\"col-xs-6\" style=\"padding: 0; padding-right: 5px;\">\n	    <select ng-model=\"selectedPeriod\" ng-options=\"period.toLowerCase() for period in PERIODS track by period\" class=\"form-control\" style=\"height: 22px; margin-top: 0; padding: 0; padding-left: 1px; padding-bottom: 1px;\"></select>\n	  </div>\n	  <div class=\"col-xs-6\" style=\"padding: 0;\">\n	    <input type=\"range\" ng-model=\"numberOfPeriods\" min=\"1\" max=\"12\" step=\"1\">\n	  </div>\n	</div>\n</div>");
$templateCache.put("widgets-settings/width.tmpl.html","<i class=\"fa fa-angle-double-left reduce\" ng-show=\"expanded\" ng-click=\"parentWidget.toogleExpanded()\" tooltip=\"reduce\"/>\n<i class=\"fa fa-angle-double-right expand\" ng-hide=\"expanded\" ng-click=\"parentWidget.toogleExpanded()\" tooltip=\"expand\"/>");
$templateCache.put("widgets-common/data-not-found.tmpl.html","<div class=\"data-not-found\">\n	<img ng-src=\"{{bgImage}}\" />\n	<div class=\"message\">\n	  Data not found\n    <!-- TODO: provider for html hyperlinks? -->\n		<a ng-href=\"\" target=\"_blank\">\n			Are you missing an app ?\n		</a>\n	</div>\n</div>\n");
$templateCache.put("widgets-common/editable-title.tmpl.html","<div class=\"visible-lg title-wrapper\" ng-if=\"parentWidget.width >= 3 && parentWidget.width < 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:25:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:25:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-lg title-wrapper\" ng-if=\"parentWidget.width >= 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:60:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:60:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-md visible-sm title-wrapper\" ng-if=\"parentWidget.width == 3 && parentWidget.width < 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:18:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:18:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-md visible-sm title-wrapper\" ng-if=\"parentWidget.width >= 6\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:45:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:45:\".\"}}\n  </div>\n</div>\n\n<div class=\"visible-xs title-wrapper\">\n  <div ng-show=\"parentWidget.hasEditAbility\" class=\"title\" editable-text=\"parentWidget.name\" buttons=\"no\" onaftersave=\"updateName()\">\n  	{{parentWidget.name | truncate:30:\".\"}}\n  </div>\n\n  <div ng-hide=\"parentWidget.hasEditAbility\" class=\"title\">\n  	{{parentWidget.name | truncate:30:\".\"}}\n  </div>\n</div>");
$templateCache.put("widgets-common/top-buttons.tmpl.html","<div id=\"module__top-buttons\">\n  <div ng-mouseenter=\"showCloseActive=true\" ng-mouseleave=\"showCloseActive=false\" class=\"delete-widget\" ng-show=\"parentWidget.hasDeleteAbility\">\n    <button class=\"btn btn-close top-button\" ng-click=\"showConfirmDelete = !showConfirmDelete\">\n      <i class=\"fa fa-times-circle-o fa-lg\"></i>\n    </button>\n  </div>\n\n  <div ng-mouseenter=\"showEditActive=true\" ng-mouseleave=\"showEditActive=false\" class=\"edit-widget\" ng-show=\"parentWidget.hasEditAbility\">\n    <button class=\"btn top-button btn-edit\" ng-click=\"toogleEditMode()\">\n      <i class=\"fa fa-cog fa-lg\"></i>\n    </button>\n  </div>\n\n  <div class=\"refresh-widget\">\n    <button class=\"btn top-button btn-refresh\" ng-click=\"parentWidget.loadContent(true)\">\n      <i class=\"fa fa-refresh\"></i>\n    </button>\n  </div>\n\n  <div class=\"confirm-delete-popover\" ng-show=\"showConfirmDelete\">\n  	<h4>Are you sure you want to delete this widget ?</h4>\n  	<p>(it will not erase your data)</p>\n  	<button ng-click=\"showConfirmDelete = false\" class=\"btn btn-sm btn-default\">Cancel</button>\n  	<button ng-click=\"deleteWidget()\" class=\"btn btn-sm btn-danger\" style=\"margin-left: 10px;\">Delete</button>\n  </div>\n</div>\n");}]);
}());
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
  service.isLocked = false;
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
  service.getOrganizationId = function() {
    return service.config.organizationId;
  };
  service.configure = function(opts) {
    angular.copy(opts, service.config);
    return angular.extend(service.config, service.defaultConfig);
  };
  service.load = function(force) {
    if (force == null) {
      force = false;
    }
    if ((self.config.$q == null) || force) {
      self.config.$q = $http.get(ImpacRoutes.baseDhbPath()).then(function(success) {
        angular.copy(success.data, self.data);
        return console.log('dashboards: ', self.data);
      });
    }
    return self.config.$q;
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
      msg = 'impac-angular warning: There are missing assets, please refer to the including assets section in the docs.';
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
angular.module('impac.services.chart-formatter', []).service('ChartFormatterSvc', ["ImpacTheming", function(ImpacTheming) {
  var COLORS, _self, cutHex, hexToB, hexToG, hexToR, hexToRGB, lightenColor;
  _self = this;
  COLORS = ImpacTheming.getChartColors();
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
var module;

module = angular.module('impac.components.dashboard', []);

module.controller('ImpacDashboardCtrl', ["$scope", "$http", "$q", "$filter", "$modal", "$log", "$timeout", "$templateCache", "DhbAnalyticsSvc", "MsgBus", "Utilities", "ImpacAssets", function($scope, $http, $q, $filter, $modal, $log, $timeout, $templateCache, DhbAnalyticsSvc, MsgBus, Utilities, ImpacAssets) {
  var modalCreateDashboard, modalDeleteDashboard, modalWidgetSuggestion, saveDashboard, updatePlaceHolderSize;
  $scope.impacTitleLogo = ImpacAssets.get('impacTitleLogo');
  $scope.impacDashboardBackground = ImpacAssets.get('impacDashboardBackground');
  $scope.widgetsList = [];
  $scope.isLoading = true;
  $scope.starWizardModal = {
    value: false
  };
  MsgBus.publish('starWizardModal', $scope.starWizardModal);
  $scope.openStarWizard = function() {
    return $scope.starWizardModal.value = true;
  };
  DhbAnalyticsSvc.load().then(function() {
    $scope.currentDhbId = DhbAnalyticsSvc.getId();
    $scope.refreshDashboards();
    return $scope.isLoading = false;
  });
  $scope.refreshDashboards = function() {
    $scope.dashboardsList = DhbAnalyticsSvc.getDashboards();
    if ($scope.dashboardsList.length && ($scope.dashboardsList[0].widgets_templates != null)) {
      $scope.widgetsList = $scope.dashboardsList[0].widgets_templates;
    }
    $scope.currentDhb = _.where($scope.dashboardsList, {
      id: $scope.currentDhbId
    })[0];
    if ($scope.currentDhb == null) {
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
  $scope.setDisplay = function() {
    var aDashboardExists, aWidgetExists, severalDashboardsExist;
    aDashboardExists = $scope.currentDhbId != null;
    severalDashboardsExist = aDashboardExists && $scope.dashboardsList.length > 1;
    if (aDashboardExists) {
      aWidgetExists = $scope.currentDhb.widgets.length > 0;
    } else {
      aWidgetExists = false;
    }
    if (aDashboardExists && !aWidgetExists) {
      $timeout((function() {
        return $scope.showWidgetSelector = true;
      }), 300);
    } else if (!aDashboardExists) {
      $scope.showWidgetSelector = false;
    }
    $scope.showDashboardsList = false;
    $scope.showChangeDhbName = false;
    $scope.showCreateDhb = true;
    $scope.showDeleteDhb = aDashboardExists;
    $scope.showCreateWidget = aDashboardExists;
    $scope.showChooseDhbMsg = !aDashboardExists;
    $scope.showNoWidgetsMsg = aDashboardExists && !aWidgetExists;
    return $scope.canManageWidgets = true;
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
  $scope.selectedCategory = 'accounts';
  $scope.isCategorySelected = function(aCatName) {
    if (($scope.selectedCategory != null) && (aCatName != null)) {
      return $scope.selectedCategory === aCatName;
    } else {
      return false;
    }
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
    self.organizations = angular.copy($scope.user.organizations);
    self.currentOrganization = _.findWhere(self.organizations, {
      id: DhbOrganizationSvc.getId()
    });
    self.selectMode('single');
    self.loadingGif = ImpacAssets.get('loader-darkblue-bg.gif');
    self.$instance = $modal.open(self.config.instance);
    self.isLoading = false;
    return self.multiOrganizationReporting = $scope.user.multi_organization_reporting;
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
          id: DhbOrganizationSvc.getId()
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
    return self.isLoading || additional_condition;
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
    self.loadingGif = ImpacAssets.get('loader-darkblue-bg.gif');
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
    self.userName = UserSvc.document.user.name;
    self.loadingGif = ImpacAssets.get('loader-darkblue-bg.gif');
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
    cursorAt: {
      left: 100,
      top: 20
    },
    opacity: 0.5,
    delay: 150,
    tolerance: 'pointer',
    placeholder: "placeHolderBox",
    cursor: "move",
    revert: 250
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
angular.module('impac.services.linking', []).provider('ImpacLinking', function() {
  var _$get, links, provider;
  provider = this;
  links = {
    ssoSession: null
  };
  provider.linkData = function(configData) {
    _.forIn(links, function(value, key) {
      var link;
      link = configData[key];
      if (link == null) {
        throw 'Missing core data to run impac-angular, please refer to impac.services.linking module or impac-angular README.md on required provider configurations.';
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
    showWidgetPath: 'http://localhost:4000/api/v1/get_widget'
  };
  provider.configureRoutes = function(configOptions) {
    return angular.extend(defaults, configOptions);
  };
  _$get = function() {
    var service;
    service = this;
    service.baseDhbPath = function() {
      return defaults.dhbBasePath;
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
    }
  };
  provider.configureChartTheme = function(configOptions) {
    return angular.extend(options.chartColors, configOptions);
  };
  _$get = function() {
    var service;
    service = this;
    service.getChartColors = function() {
      return options.chartColors;
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
  this.camelize = function(word) {
    return word.replace(/(?:^|[-_])(\w)/g, function(_, c) {
      if (c) {
        return c.toUpperCase();
      } else {
        return '';
      }
    });
  };
  this.jsCamelize = function(word) {
    var camelized;
    camelized = this.camelize(word);
    return camelized.charAt(0).toLowerCase() + camelized.slice(1);
  };
  this.capitalize = function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widget', []);

module.controller('ImpacWidgetCtrl', ["$scope", "$timeout", "$log", "DhbAnalyticsSvc", "Utilities", function($scope, $timeout, $log, DhbAnalyticsSvc, Utilities) {
  var extendDeep, pushMetadata, w;
  $scope.loaderImage = '';
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
      widget: '='
    },
    controller: 'ImpacWidgetCtrl',
    link: function(scope, element) {
      var splittedPath, templateName;
      splittedPath = angular.copy(scope.widget.category).split("/");
      templateName = splittedPath.join("-").replace(/_/g, "-");
      scope.templateUrl = "widgets/" + templateName + ".tmpl.html";
      return scope.isTemplateLoaded = function() {
        return !!$templateCache.get(scope.templateUrl);
      };
    },
    template: '<div ng-show="isTemplateLoaded()" ng-include="templateUrl"></div><div ng-hide="isTemplateLoaded()"><div class="top-line"><div common-top-buttons parent-widget="widget" /> <div common-editable-title parent-widget="widget" /></div><div class="content"><div class="loader" align="center"><img class="gif" ng-src="{{loaderImage}}"/></div></div></div>'
  };
}]);
}).call(this);
(function () {
'use strict';
angular.module('impac.services.widget-templates', []).service('WidgetTemplateSvc', ["$http", "$filter", "$timeout", function($http, $filter, $timeout) {
  var _self;
  _self = this;
  this.config = {
    createPath: '/js_api/v1/impac/widget_templates/',
    indexPath: '/js_api/v1/impac/widget_templates/',
    categoriesPath: '/js_api/v1/impac/widget_templates/categories',
    newCategoryPath: '/js_api/v1/impac/widget_templates/category',
    lastUpdatePath: '/js_api/v1/impac/widget_templates/last_update',
    previewAppsPath: '/js_api/v1/impac/widget_templates/preview_apps',
    generatePdfPath: '/js_api/v1/impac/widget_templates/generate_pdf',
    deletePath: function(id) {
      return "/js_api/v1/impac/widget_templates/" + id;
    },
    updatePath: function(id) {
      return "/js_api/v1/impac/widget_templates/" + id;
    },
    showPath: function(id) {
      return "/js_api/v1/impac/widget_templates/" + id;
    },
    screenshotPath: function(id) {
      return "/js_api/v1/impac/widget_templates/" + id + "/update_screenshot";
    },
    catalogueImgPath: function(id) {
      return "/js_api/v1/impac/widget_templates/" + id + "/update_catalogue_img";
    },
    updateCategoryPath: function(id) {
      return "/js_api/v1/impac/widget_templates/update_category/" + id;
    }
  };
  this.create = function(aCreate) {
    return $http.post(_self.config.createPath, aCreate.model).then(function(success) {
      aCreate.model.id = success.data.id;
      return _self.updateImg(aCreate, aCreate.screenshot, true);
    }, function(failure) {
      return failure;
    });
  };
  this.index = function() {
    return $http.get(_self.config.indexPath).then(function(success) {
      return success.data.widget_templates;
    });
  };
  this.categories = function() {
    return $http.get(_self.config.categoriesPath).then(function(success) {
      return $filter('orderBy')(success.data.categories, 'id');
    });
  };
  this.updateCategory = function(aModel) {
    return $http.put(_self.config.updateCategoryPath(aModel.id), aModel);
  };
  this.destroy = function(id) {
    return $http["delete"](_self.config.deletePath(id)).then(function(success) {
      return success;
    });
  };
  this.update = function(aUpdate) {
    return $http.put(_self.config.updatePath(aUpdate.model.id), aUpdate.model).then(function(success) {
      return _self.updateImg(aUpdate, aUpdate.screenshot, true);
    }, function(failure) {
      return failure;
    });
  };
  this.updateImg = function(aCat, imgFile, screenshot) {
    var imgData, opts, path;
    if (screenshot == null) {
      screenshot = true;
    }
    if (aCat != null) {
      if (imgFile != null) {
        if (screenshot) {
          path = _self.config.screenshotPath(aCat.model.id);
        } else {
          path = _self.config.catalogueImgPath(aCat.model.id);
        }
        opts = {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': void 0
          }
        };
        imgData = new FormData();
        imgData.append('file', imgFile);
        return $http.put(path, imgData, opts).then(function(success) {
          if (screenshot) {
            aCat.model.screenshot = success.data;
            return $timeout(function() {
              return aCat.saveCatalogueImg();
            }, 300);
          } else {
            aCat.model.catalogueImg = success.data;
            return aCat.afterSave();
          }
        });
      } else {
        return aCat.saveCatalogueImg();
      }
    }
  };
  this.show = function(id) {
    return $http.get(_self.config.showPath(id)).then(function(success) {
      return success.data.widget_template;
    });
  };
  this.createCategory = function(data) {
    return $http.post(_self.config.newCategoryPath, data);
  };
  this.lastUpdate = function() {
    return $http.get(_self.config.lastUpdatePath).then(function(success) {
      return success.data.last_update.last_update;
    });
  };
  this.previewApps = function(element) {
    if (element.endpoints != null) {
      return $http.post(_self.config.previewAppsPath, {
        endpoints: element.endpoints
      }).then(function(success) {
        return element.model.compatible_apps = success.data;
      });
    }
  };
  this.generatePdf = function() {
    return $http.post(_self.config.generatePdfPath);
  };
}]);
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets-common.data-not-found', []);

module.directive('commonDataNotFound', ["$templateCache", "ImpacAssets", function($templateCache, ImpacAssets) {
  return {
    restrict: 'A',
    scope: {
      widgetEngine: '='
    },
    template: $templateCache.get('widgets-common/data-not-found.tmpl.html'),
    link: function(scope, element) {
      var baseDir, dir;
      scope.bgImage = '';
      baseDir = ImpacAssets.get('dataNotFound');
      if (scope.widgetEngine && baseDir.length > 0) {
        dir = baseDir.split('');
        dir = dir[dir.length - 1] !== '/' ? dir.concat('/').join('') : dir.join('');
        return scope.bgImage = dir + scope.widgetEngine + '.png';
      }
    }
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

module.directive('widgetAccountsAccountingValue', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("accounting-value");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("assets-summary");
    },
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
  $scope.$watch((function() {
    return w.isEditMode;
  }), function(result) {
    if (w.selectedAccount == null) {
      return w.isEditMode = true;
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
    if (total === 4) {
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetAccountsBalance', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("balance");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("balance-sheet");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("cash-summary");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("comparison");
    },
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
  $scope.loaderImage = '';
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("custom-calculation");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("expenses-revenue");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("payable-receivable");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("profit-and-loss");
    },
    controller: 'WidgetAccountsProfitAndLossCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.catalogue', []);

module.controller('ImpacWidgetCatalogueCtrl', ["$scope", "WidgetTemplateSvc", "$http", function($scope, WidgetTemplateSvc, $http) {
  var menu, show;
  $scope.loaderImage = '';
  $scope.menu = menu = {};
  menu.categories = [];
  menu.loading = true;
  menu.init = function() {
    menu.loading = true;
    return WidgetTemplateSvc.categories().then(function(categories) {
      menu.categories = categories;
      if (!$scope.isAdmin) {
        menu.removeInactiveWidgets();
      }
      menu.prepareCategories();
      return menu.loading = false;
    });
  };
  menu.removeInactiveWidgets = function() {
    return _.each(menu.categories, function(cat) {
      return cat.widgets = _(cat.widgets).filter(function(w) {
        return w.active;
      });
    });
  };
  menu.prepareCategories = function() {
    return menu.categories = _(menu.categories).filter(function(cat) {
      return _.isEmpty(cat.widgets) === false;
    });
  };
  $scope.show = show = {};
  show.widget = false;
  show.loading = false;
  show.get = function(id) {
    show.loading = true;
    return WidgetTemplateSvc.show(id).then(function(widget_template) {
      show.widget = widget_template;
      show.widget.settings = show.widget.settings.splice(0, 6);
      show.widget.compatible_apps = show.widget.compatible_apps.splice(0, 6);
      show.color = widget_template.category_color || "#233845";
      return show.loading = false;
    });
  };
  $scope.init = function() {
    return menu.init();
  };
  return $scope.init();
}]);

module.directive('impacWidgetCatalogue', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {
      isAdmin: '='
    },
    template: $templateCache.get('widgets/catalogue.tmpl.html'),
    controller: 'ImpacWidgetCatalogueCtrl'
  };
}]);
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("employee-details");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("employees-list");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("leaves-balance");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("leaves-schedule");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("payroll-summary");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("payroll-taxes");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("salaries-summary");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("superannuation-accruals");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("timesheets");
    },
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
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("workforce-summary");
    },
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
    $log.debug('getSettingsCount WATCH FIRED: ', total);
    if (total >= 5) {
      $log.debug('getSettingCount LOADING CONTENT: ', total);
      return w.loadContent();
    }
  });
  return w;
}]);

module.directive('widgetInvoicesAgedPayablesReceivables', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("invoices");
      return element.addClass("aged-payables-receivables");
    },
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
  $scope.entityTypeCap = Utilities.capitalize(w.metadata.entity);
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
    link: function(scope, element) {
      element.addClass("invoices");
      return element.addClass("list");
    },
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
    link: function(scope, element) {
      element.addClass("invoices");
      return element.addClass("summary");
    },
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
    link: function(scope, element) {
      debugger;
      element.addClass("sales");
      return element.addClass("aged");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("break-even");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("profit-and-loss");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("customer-details");
    },
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
    link: function(scope, element) {
      element.addClass("invoices");
      return element.addClass("summary");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("profit-and-loss");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("growth");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("leads-funnel");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("list");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("list");
    },
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
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("accounting-value");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("number-of-leads");
    },
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
      oppDetails.push("proba " + anOpp.probability + "%");
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("leads-funnel");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("list");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("segmented-turnover");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("summary");
    },
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
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("top-opportunities");
    },
    controller: 'WidgetSalesTopOpportunitiesCtrl'
  };
});
}).call(this);
(function () {
'use strict';
var module;

module = angular.module('impac.components.widgets.template-admin', []);

module.controller('ImpacWidgetTemplateAdminCtrl', ["$scope", "WidgetTemplateSvc", "$http", function($scope, WidgetTemplateSvc, $http) {
  var addCategory, create, dataURItoBlob, destroy, index, update, updateCategory;
  $scope.activatedCat = false;
  $scope.cat = {};
  $scope.loaderImage = '';
  $scope.activateCat = function(cat) {
    if (cat === $scope.activatedCat) {
      $scope.activatedCat = false;
      return $scope.cat[cat] = false;
    } else {
      $scope.cat[cat] = true;
      if ($scope.activatedCat) {
        $scope.cat[$scope.activatedCat] = false;
      }
      return $scope.activatedCat = cat;
    }
  };
  $scope.create = create = {};
  create.successMsg = false;
  create.errorMsg = false;
  create.errors = '';
  create.inProgress = false;
  create.generatePdf = true;
  create.screenshot = {};
  create.model = {};
  create.endpoints = [];
  create.resetEndpoints = function() {
    return _.each(create.endpoints, function(ep) {
      return ep.checked = false;
    });
  };
  create.reset = function() {
    create.model = {};
    create.model['active'] = true;
    create.model.screenshot = "";
    create.screenshot = {};
    return create.resetEndpoints();
  };
  create.save = function() {
    create.errors = '';
    create.successMsg = false;
    create.errorMsg = false;
    create.inProgress = true;
    create.model.endpoints = create.endpoints;
    return WidgetTemplateSvc.create(create).then(function(response) {
      if (response.status === 400) {
        create.errorMsg = true;
        create.errors = response.data;
        return create.inProgress = false;
      }
    });
  };
  create.saveCatalogueImg = function() {
    return $scope.renderTemplateImg(false);
  };
  create.afterSave = function() {
    create.successMsg = true;
    create.reset();
    index.get();
    create.inProgress = false;
    if (create.generatePdf) {
      return WidgetTemplateSvc.generatePdf();
    }
  };
  $scope.update = update = {};
  update.selected = false;
  update.inProgress = false;
  update.successMsg = false;
  update.errorMsg = false;
  update.errors = '';
  update.generatePdf = true;
  update.model = {};
  update.endpoints = [];
  update.save = function() {
    update.successMsg = false;
    update.errorMsg = false;
    update.inProgress = true;
    update.model.endpoints = update.endpoints;
    return WidgetTemplateSvc.update(update).then(function(response) {
      if (response.status === 400) {
        update.errorMsg = true;
        update.errors = response.data;
        return update.inProgress = false;
      }
    });
  };
  update.saveCatalogueImg = function() {
    return $scope.renderTemplateImg(true);
  };
  update.afterSave = function() {
    update.successMsg = true;
    update.inProgress = false;
    if (update.generatePdf) {
      return WidgetTemplateSvc.generatePdf();
    }
  };
  update.selectEndpoints = function(wt) {
    return _.each(update.endpoints, function(ep) {
      ep.checked = false;
      return _.each(wt.endpoints, function(wt_ep) {
        if (wt_ep.shared_entity_id === ep.id) {
          return ep.checked = true;
        }
      });
    });
  };
  $scope.$watch('update.selected', function() {
    if (update.selected) {
      _.each(index.model, function(wt) {
        if (wt.id === update.selected.id) {
          update.model = wt;
          update.model.category_id = wt.category_id;
          update.selectEndpoints(wt);
        }
      });
    } else {
      update.model = {};
    }
    return $scope.$apply;
  });
  $scope.destroy = destroy = {};
  destroy.selected = false;
  destroy.inProgress = false;
  destroy.generatePdf = true;
  destroy.destroy = function() {
    destroy.inProgress = true;
    return WidgetTemplateSvc.destroy(destroy.selected.id).then(destroy.inProgress = false, destroy.selected = false, destroy.confirm = "", index.get(), destroy.generatePdf ? WidgetTemplateSvc.generatePdf() : void 0);
  };
  $scope.addCategory = addCategory = {};
  addCategory.model = {};
  addCategory.save = function() {
    return WidgetTemplateSvc.createCategory(addCategory.model).then(addCategory.model = {}, index.getCategories());
  };
  $scope.updateCategory = updateCategory = {};
  updateCategory.selected = false;
  updateCategory.inProgress = false;
  updateCategory.model = {};
  updateCategory.successMsg = false;
  updateCategory.errorMsg = false;
  updateCategory.errors = '';
  updateCategory.save = function() {
    updateCategory.successMsg = false;
    updateCategory.errorMsg = false;
    updateCategory.inProgress = true;
    return WidgetTemplateSvc.updateCategory(updateCategory.model).then(function(success) {
      updateCategory.successMsg = true;
      return index.getCategories();
    }, function(failure) {
      updateCategory.errorMsg = true;
      return updateCategory.errors = failure.data;
    }, updateCategory.inProgress = false);
  };
  $scope.$watch('updateCategory.selected', function() {
    if (updateCategory.selected) {
      _.each(index.categories, function(cat) {
        if (cat.id === updateCategory.selected.id) {
          updateCategory.model = cat;
        }
      });
    } else {
      updateCategory.model = {};
    }
    return $scope.$apply;
  });
  $scope.index = index = {};
  index.inProgress = false;
  index.model = {};
  index.categories = {};
  index.sharedEntities = {};
  index.lastUpdate = "";
  index.initEndpoints = function(array) {
    return _.each(index.sharedEntities, function(se) {
      return array.push({
        id: se.id,
        name: se.name,
        checked: false
      });
    });
  };
  index.get = function() {
    index.inProgress = true;
    return WidgetTemplateSvc.index().then(function(widget_templates) {
      index.model = widget_templates;
      return index.inProgress = false;
    });
  };
  index.getCategories = function() {
    index.inProgress = true;
    return WidgetTemplateSvc.categories().then(function(categories) {
      index.categories = categories;
      return index.inProgress = false;
    });
  };
  index.getSharedEntities = function() {
    index.inProgress = true;
    return $http.get('/js_api/v1/connec_entities').then(function(success) {
      index.sharedEntities = success.data.shared_entities;
      index.initEndpoints(create.endpoints);
      index.initEndpoints(update.endpoints);
      return index.inProgress = false;
    });
  };
  index.getLastUpdate = function() {
    index.inProgress = true;
    return WidgetTemplateSvc.lastUpdate().then(function(last_update) {
      index.lastUpdate = last_update;
      return index.inProgress = false;
    });
  };
  $scope.saveCatalogueImg = function(aCat, catalogueImgFile) {
    return WidgetTemplateSvc.updateImg(aCat, catalogueImgFile, false);
  };
  $scope.getSettings = function(aModel) {
    if ((aModel.settings != null) && _.isArray(aModel.settings)) {
      return aModel.settings.slice(0, 6);
    } else if ((aModel.settings != null) && _.isString(aModel.settings)) {
      if (aModel.settings === "") {
        return [];
      } else {
        return aModel.settings.split(',').slice(0, 6);
      }
    }
  };
  $scope.getCompatibleApps = function(element) {
    if (element.endpoints != null) {
      return WidgetTemplateSvc.previewApps(element);
    }
  };
  dataURItoBlob = function(dataURI) {
    var ab, bb, byteString, i, ia, j, mimeString, ref;
    byteString = atob(dataURI.split(',')[1]);
    mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    ab = new ArrayBuffer(byteString.length);
    ia = new Uint8Array(ab);
    for (i = j = 0, ref = byteString.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      ia[i] = byteString.charCodeAt(i);
    }
    bb = new Blob([ab]);
    return bb;
  };
  $scope.renderTemplateImg = function(isUpdate) {
    var contentElem;
    if (isUpdate == null) {
      isUpdate = true;
    }
    if (isUpdate) {
      contentElem = angular.element('#preview_update');
    } else {
      contentElem = angular.element('#preview_create');
    }
    return html2canvas(contentElem, {
      onrendered: function(canvas) {
        var blob, imageData;
        imageData = canvas.toDataURL('image/png');
        blob = dataURItoBlob(imageData);
        if (isUpdate) {
          return $scope.saveCatalogueImg(update, blob);
        } else {
          return $scope.saveCatalogueImg(create, blob);
        }
      }
    });
  };
  $scope.init = function() {
    _.each($scope.catList, function(cat) {
      return $scope.cat[cat] = false;
    });
    create.reset();
    index.get();
    index.getCategories();
    index.getSharedEntities();
    return index.getLastUpdate();
  };
  return $scope.init();
}]);

module.directive('impacWidgetTemplateAdmin', ["$templateCache", function($templateCache) {
  return {
    restrict: 'A',
    scope: {},
    template: $templateCache.get('widgets/template-admin.tmpl.html'),
    controller: 'ImpacWidgetTemplateAdminCtrl'
  };
}]);
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
      parentWidget: '='
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
    var e, i, legend, str;
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
    } catch (_error) {
      e = _error;
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

module = angular.module('impac.components.widgets-settings.organizations', []);

module.controller('SettingOrganizationsCtrl', ["$scope", "$log", function($scope, $log) {
  var setting, w;
  w = $scope.parentWidget;
  $log.debug('SettingOrganizationsCtrl START', w);
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
    $log.debug('SettingsOrganizationCtrl: settings.initialize START');
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
  $log.debug('SettingOrganizationsCtrl FINISH', w.settings);
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
  $log.debug('SettingTimeRangeCtrl START', w);
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
    $log.debug('SettingTimeRangeCtrl: settings.initialize START');
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
  $log.debug('SettingTimeRangeCtrl FINISH', w.settings);
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
  $log.debug('SettingWidthCtrl START', w);
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
    $log.debug('SettingWidthCtrl: setting.initialize START');
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
  $log.debug('SettingWidthCtrl FINISH', w.settings);
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