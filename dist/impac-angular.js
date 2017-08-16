/**
 * impac-angular - Impac! Front-End Library
 * @version v1.6.0
 * @git git://github.com/maestrano/impac-angular.git
 * @license Copyright 2017 Maestrano Pty Ltd
 */
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
    'impac.services',
    'impac.filters',
    'impac.components',
    // EXTERNAL DEPENDENCIES //
    'ngMessages',
    'ui.sortable',
    'ui.bootstrap',
    'emguo.poller',
    'toastr',
    'pascalprecht.translate'
  ]);

/*
** COMPONENTS
*/
angular.module('impac.components',
  [
    'impac.components.dashboard',
    'impac.components.dashboard-selector',
    'impac.components.dashboard-templates-selector',
    'impac.components.dashboard-settings',
    'impac.components.kpis-bar',
    'impac.components.kpi',
    'impac.components.chart',
    'impac.components.alerts-config',
    'impac.components.widget',
    'impac.components.widgets',
    'impac.components.widgets-settings',
    'impac.components.widgets-common',
    'impac.components.common',
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
    'impac.components.widgets.accounts-cash-projection',
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
    'impac.components.widgets.accounts-ratios',
    'impac.components.widgets.accounts-cash-balance',
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
    'impac.components.widgets-settings.accounting-behaviour',
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
    'impac.components.widgets-settings.width',
    'impac.components.widgets-settings.attach-kpis',
    'impac.components.widgets-settings.tag-filter',
    'impac.components.widgets-settings.offsets'
  ]
);
angular.module('impac.components.dashboard-settings',
  [
    'impac.components.dashboard-settings.currency',
    'impac.components.dashboard-settings.pdf-mode',
    'impac.components.dashboard-settings.sync-apps'
  ]
);
angular.module('impac.components.widgets-common',
  [
    'impac.components.widgets-common.editable-title',
    'impac.components.widgets-common.info-panel',
    'impac.components.widgets-common.time-period-info',
    'impac.components.widgets-common.top-buttons',
    'impac.components.widgets-common.autofocus',
    'impac.components.widgets-common.currency-conversions',
    'impac.components.widgets-common.chart-threshold',
  ]
);
angular.module('impac.components.common',
  [
    'impac.components.common.data-not-found',
    'impac.components.common.delete-widget'
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
    'impac.services.highcharts-factory',
    'impac.services.message-bus',
    'impac.services.utilities',
    'impac.services.main',
    'impac.services.kpis',
    'impac.services.dashboards',
    'impac.services.dashboard-templates',
    'impac.services.widgets',
    'impac.services.developer',
    'impac.services.pusher',
    'impac.services.alerts',
    'impac.services.notifications',
    'impac.services.events',
    'impac.services.currency-rates'
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

angular.module("impac.components.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("alerts-config/alerts-config.modal.html","<div class=\"kpi-alerts-settings\">\n\n  <div class=\"modal-header\" translate>\n    impac.kpi.alerts.title\n  </div>\n\n  <div class=\"modal-body\">\n    <span translate=\"impac.kpi.alerts.explanation\"\n          translate-values=\"{name: kpi.name,  element_watched: kpi.element_watched}\"></span>\n    <u>{{translateTarget(kpi)}}</u> :\n\n    <ul class=\"list-group\">\n\n      <li class=\"list-group-item\" ng-repeat=\"alert in alerts\" ng-class=\"{active: alert.active}\">\n        <div class=\"alert-toggle\" ng-click=\"toggleAlert(alert)\">\n          <i class=\"fa\" ng-class=\"alert.active ? \'fa-toggle-on\' : \'fa-toggle-off\'\" />\n          {{alert.label}}\n        </div>\n\n        <ul class=\"list-group recipients-list\" ng-show=\"showRecipientList(alert)\">\n\n          <li class=\"list-group-item\" ng-repeat=\"member in members track by member.id\" ng-if=\"member.active\" ng-click=\"toggleRecipient(member)\">\n            {{member.email}}\n            <button type=\"button\" class=\"close\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </li>\n\n        </ul>\n\n        <input class=\"recipient-search\" placeholder=\"Add Recipients By Member Email\" ng-show=\"showRecipientList(alert)\" ng-model=\"recipientSearch.text\" ng-keydown=\"onAddRecipientsKeyPress($event)\" ng-focus=\"onRecipientSearchFocus()\"/>\n\n        <ul class=\"list-group recipients-list available\" ng-show=\"showAvailableRecipients(alert)\">\n\n          <li class=\"list-group-item\" ng-class=\"member == selectedMember ? \'active\' : \'\'\" ng-repeat=\"member in members | filter:recipientSearch.text as filteredMembers\" ng-if=\"!member.active\" ng-click=\"toggleRecipient(member)\">\n            {{member.email}}\n          </li>\n\n        </ul>\n      </li>\n\n    </ul>\n\n  </div>\n\n  <div class=\"modal-footer text-right\">\n    <button class=\"btn btn-default\" ng-click=\"modal.close()\" translate>impac.kpi.alerts.cancel</button>\n    <button class=\"btn btn-primary\" ng-click=\"save(alerts)\" translate><strong>impac.kpi.alerts.save</strong></button>\n  </div>\n\n</div>\n");
$templateCache.put("alerts-config/alerts-config.tmpl.html","<div class=\"alerts-config\" ng-show=\"(kpi.targets && kpi.targets[kpi.element_watched].length > 0)\" ng-click=\"showAlertsSettings()\">\n  <!-- directive link function compiles html here -->\n</div>\n");
$templateCache.put("dashboard/create.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3 translate translate-values=\"{name: dhbLabelName}\">impac.dashboard.create.create_new_dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <!-- Create a new dashboard -->\n  <div class=\"row dashboard-form\">\n    <div class=\"col-sm-10 col-sm-offset-1\">\n      <form class=\"form-horizontal\" role=\"form\">\n        <div class=\"form-group\">\n          <label class=\"col-sm-2 control-label\">{{ (isTemplate ? \'impac.dashboard.create.rename\' : \'impac.dashboard.create.name\') | translate }}</label>\n          <div class=\"col-sm-10\">\n            <input type=\'text\' class=\"form-control\" ng-model=\"model.name\" placeholder=\"{{\'impac.dashboard.create.placeholder.cash_accounts\' | translate}}\" required>\n          </div>\n        </div>\n\n        <div class=\"form-group\" ng-show=\"isMultiCompanyAvailable()\">\n          <label class=\"col-sm-2 control-label\" translate>impac.dashboard.create.type</label>\n          <div class=\"col-sm-10\">\n            <div class=\"btn-group\" role=\"group\">\n              <button type=\"button\" ng-click=\"selectMode(\'single\')\" ng-class=\"btnBlassFor(\'single\')\" translate>impac.dashboard.create.current_company</button>\n              <button type=\"button\" ng-click=\"selectMode(\'multi\')\" ng-class=\"btnBlassFor(\'multi\')\" translate>impac.dashboard.create.multi_company</button>\n            </div>\n          </div>\n        </div>\n\n        <!-- Single Company mode -->\n        <div class=\"form-group\" ng-show=\"isCurrentOrganizationShown()\">\n          <div ng-show=\"!canAccessAnalyticsForCurrentOrganization()\" class=\"text-center text-purple\">\n            <div class=\"spacer1\"></div>\n            <p>\n              {{\'impac.dashboard.create.now_access_text\' | translate}} {{currentOrganization.name}}.\n              <span ng-show=\"isMultiCompanyAvailable()\" translate>impac.dashboard.create.select_multi_company</span>\n            </p>\n          </div>\n        </div>\n\n        <!-- Multi Company mode -->\n        <div class=\"form-group\" ng-show=\"isSelectOrganizationShown()\">\n          <label class=\"col-sm-2 control-label\" translate>impac.dashboard.create.companies</label>\n          <div class=\"col-sm-10\">\n            <ul class=\"list-unstyled\">\n              <li ng-repeat=\"organization in organizations\" >\n                <input type=\"checkbox\" ng-model=\"organization.$selected\" ng-disabled=\"!canAccessAnalyticsData(organization)\">\n                {{organization.name}}\n                <span ng-show=\"organization.is_customer_account\">(customer)</span>\n                <span ng-show=\"!canAccessAnalyticsData(organization)\">\n                  <em><small>\n                    &nbsp;\n                    &nbsp;\n                    <i class=\"fa fa-exclamation-circle text-danger\" uib-tooltip=\"{{\'impac.dashboard.create.tooltip.access\' | translate}}\"></i>\n                  </small></em>\n                </span>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </form>\n\n      <!-- Create from Templates -->\n      <dashboard-templates-selector on-select=\"onSelectTemplate($event)\" ng-if=\"createFromTemplateEnabled\"></dashboard-templates-selector>\n\n      <!-- End row col -->\n    </div>\n\n    <!-- End Dashboard form -->\n  </div>\n\n\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\" translate>impac.dashboard.create.cancel</button>\n      <button class=\"btn btn-primary\" ng-click=\"proceed()\" ng-disabled=\"isProceedDisabled()\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-if=\"isLoading\"></i>\n        {{\'impac.dashboard.create.create\' | translate}}\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard/dashboard.tmpl.html","<!-- DASHBOARD -->\n<div class=\"analytics\" ng-hide=\"(isLoading || forceLoad || failedDashboardLoad)\" ng-class=\"{\'hide-dhb\': (isLoading || forceLoad), \'show-dhb\': !(isLoading || forceLoad), \'pdf-mode\': pdfMode }\">\n  <div mno-star-wizard=true modal-open=\'starWizardModal.value\'></div>\n\n  <!-- Title and Dashboard selection -->\n  <div class=\"row\" id=\"dashboard-heading\" ng-if=\"showDhbHeading\">\n    <div class=\"col-xs-12\">\n      <img ng-src=\"{{impacTitleLogo}}\" ng-click=\"!pdfMode || triggerUpload()\" ng-class=\"{\'pdf-mode\': pdfMode}\" />\n      <br />\n      <button class=\"btn btn-sm btn-default hidden-print\" ng-click=\"triggerUpload()\" ng-if=\"pdfMode\" translate>impac.dashboard.change_logo</button>\n      <input type=\"file\" style=\"display:none\" id=\"fileInput\" name=\"filedata\"/>\n    </div>\n\n    <div class=\"col-xs-12\">\n      <div class=\"caption\">{{dhbHeadingText}}</div>\n    </div>\n  </div>\n\n  <!-- Impac KPI\'s -->\n  <kpis-bar ng-if=\"showKpisBar()\" kpis=\"currentDhb.kpis\"></kpis-bar>\n\n  <!-- Dashboards selection/creation/deletion -->\n  <dashboard-selector id=\"module__dashboard-selector\" is-widget-selector-shown=\"showWidgetSelector()\" on-create-dashboard=\"createDashboardModal.open()\" on-display-widget-selector=\"displayWidgetSelector()\" on-select-dashboard=\"activateTimer()\" pdf-mode=\"pdfMode\" dhb-label-name=\"dhbLabelName\"></dashboard-selector>\n\n  <div id=\"sub-menu\" uib-collapse=\"!showSubMenu\">\n    <i class=\"fa fa-times\" ng-click=\"hideSubMenu()\" />\n\n    <!-- Displayed to MYOB Essentials Users -->\n    <div id=\"myob-message\" ng-if=\"hasMyobEssentialsOnly && myobMessageConfig.show\" class=\"alert alert-warning\">\n      <h3 translate>impac.dashboard.it_looks_like</h3>\n      <p translate=\"impac.dashboard.unfortunately_information\"></p>\n      <p>{{\'impac.dashboard.myob_message.part_1\' | translate}} <a href=\"http://myob.com.au/products/small-business/accounting-software/myob-accountright-1422735752948\" target=\"_blank\">{{\'impac.dashboard.myob_message.part_2\' | translate}}</a> {{\'impac.dashboard.myob_message.part_3\' | translate}}</p>\n      <p align=\"right\" ng-if=\"myobMessageConfig.appLink.show\"><a ng-href=\"{{myobMessageConfig.appLink.url}}\" target=\"_blank\" translate>{{myobMessageConfig.appLink.text}}</a></p>\n    </div>\n  </div>\n\n  <!-- Widgets selection container -->\n  <div id=\"widget-selector\" uib-collapse=\"!showWidgetSelector()\" ng-if=\"!customWidgetSelector.path\">\n    <div class=\"title\">\n      <p class=\"instruction\" translate translate-values=\"{name: dhbLabelName}\">impac.dashboard.select_the_widgets</p>\n      <span class=\"widget-added badge\" translate>impac.dashboard.widget_added</span>\n      <i class=\"fa fa-times-circle close-selector\" ng-if=\"showCloseWidgetSelectorButton()\" ng-click=\"displayWidgetSelector(false)\"/>\n    </div>\n\n    <div class=\"row top-container\">\n      <div class=\"col-md-3 categories-section\">\n        <div class=\"row section-header\">\n          <span translate>impac.dashboard.all_categories</span>\n        </div>\n        <div class=\"row section-lines\">\n          <div class=\"col-md-12\">\n            <p class=\"line-item\" ng-click=\"selectCategory(\'accounts\')\" ng-class=\"isCategorySelected(\'accounts\') ? \'selected\' : none\" translate>impac.dashboard.accounting</p>\n            <p class=\"line-item\" ng-click=\"selectCategory(\'invoices\')\" ng-class=\"isCategorySelected(\'invoices\') ? \'selected\' : none\" translate>impac.dashboard.invoicing</p>\n            <p class=\"line-item\" ng-click=\"selectCategory(\'hr\')\" ng-class=\"isCategorySelected(\'hr\') ? \'selected\' : none\" translate>impac.dashboard.hr_or_payroll</p>\n            <p class=\"line-item\" ng-click=\"selectCategory(\'sales\')\" ng-class=\"isCategorySelected(\'sales\') ? \'selected\' : none\" translate>impac.dashboard.sales</p>\n          </div>\n        </div>\n        <div class=\"arrow-icon\" ng-style=\"getSelectedCategoryTop()\">\n          <div class=\"square\"></div>\n          <i class=\"fa fa-caret-right\"></i>\n        </div>\n      </div>\n\n      <div class=\"col-md-9 widgets-section\">\n        <div class=\"section-header row\">\n          <span>{{getSelectedCategoryName() | titleize}}</span>\n        </div>\n        <div class=\"section-lines\">\n          <div class=\"line-items-grid\">\n            <div class=\"grid-item\" ng-repeat=\"widgetTemplate in getWidgetsForSelectedCategory()\" ng-click=\"addWidget(widgetTemplate)\" uib-tooltip=\"{{widgetTemplate.desc}}\" tooltip-placement=\"{{$index < 9 ? \'bottom\' : \'top\'}}\" tooltip-animation=\"false\"  tooltip-append-to-body=\"true\" tooltip-class=\"impac-widget-selector-tooltip\">\n              <i class=\"fa fa-{{widgetTemplate.icon}} line-item\" />\n              <p class=\"line-item\" ng-bind=\"widgetTemplate.name\"></p>\n              <i class=\"fa fa-plus-circle line-item\" />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"bottom\" ng-if=\"widgetSuggestionModal.config.apiPath\">\n      <span class=\"suggestion\">\n        {{\'impac.dashboard.can_not_find\' | translate}} <a ng-click=\"widgetSuggestionModal.open()\">{{\'impac.dashboard.give_us\' | translate}}</a>\n      </span>\n    </div>\n  </div>\n\n  <!-- custom widget selector template configured from ImpacThemingProvider -->\n  <div id=\"custom-widget-selector\" ng-if=\"customWidgetSelector.path\" ng-include=\"customWidgetSelector.path\" ng-hide=\"showChooseDhbMsg()\"></div>\n\n  <!-- Dashboard Settings - DEFAULT POSITION -->\n  <div id=\"dashboard-settings-panel\" ng-if=\"!dhbSettingsConfig.inWidgetsContainer && !showChooseDhbMsg()\" class=\"row\" ng-hide=\"pdfMode\">\n    <div class=\"col-xs-12\">\n      <div dashboard-setting-sync-apps ng-if=\"dhbSettingsConfig.syncApps.show()\"/>\n      <div dashboard-setting-currency currency=\"currentDhb.currency\" />\n    </div>\n  </div>\n\n  <!-- Errors -->\n  <div class=\"alert alert-error\" ng-show=\"errors\">\n    <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n    <ul>\n      <li ng-repeat=\"error in errors\">{{error}}</li>\n    </ul>\n  </div>\n\n  <div id=\"no-widgets-container\" class=\"row text-center ng-hide\" ng-show=\'(showChooseDhbMsg() || showNoWidgetsMsg())\'>\n\n    <img ng-src=\"{{impacDashboardBackground}}\" class=\"bg\">\n\n    <div class=\"impac-info-message\">\n      <!-- First Time Dashboard Creation -->\n      <div class=\"ng-hide\" ng-show=\'showChooseDhbMsg()\'>\n        <div class=\'hidden-xs\'>\n          <div class=\"row top-buffer-4\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"info-text\">\n                <p><b translate translate-values=\"{name: dhbLabelName}\">{{dhbErrorsConfig.firstTimeCreated.first}}</b></p>\n                <p translate>{{dhbErrorsConfig.firstTimeCreated.second}}</p>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"align-center top-buffer-2\">\n          <button ng-click=\"createDashboardModal.open()\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-pencil-square-o\'></span> {{ \'impac.dashboard.create_a_dashboard\' | translate:{name: dhbLabelName} }}</button>\n        </div>\n      </div>\n\n      <!-- Empty Dashboard -->\n      <div class=\"ng-hide\" ng-show=\'showNoWidgetsMsg()\'>\n        <div class=\'hidden-xs\'>\n          <div class=\"row top-buffer-4\">\n            <div class=\"col-md-8 col-md-offset-2\">\n              <div class=\"info-text\">\n                <p><b translate>{{dhbErrorsConfig.empty.first}}</b></p>\n                <p translate>{{dhbErrorsConfig.empty.second}}</p>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"align-center top-buffer-2\">\n          <button ng-disabled=\"showWidgetSelector()\" ng-click=\"displayWidgetSelector()\" class=\'btn btn-lg btn-warning\'><span class=\'fa fa-plus\'></span> {{\'impac.dashboard.add_new_widget\' | translate}}</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- First Time Dashboard Creation -->\n  <div class=\"row text-center\" ng-show=\'showChooseDhbMsg()\'>\n    <img class=\"bg\" ng-src=\"{{impacDashboardBackground}}\">\n    <div class=\"spacer2 hidden-xs\"></div>\n    <div class=\'col-md-8 col-md-offset-2\'>\n      <p class=\"text-muted\"><small><em translate>{{dhbErrorsConfig.firstTimeCreated.note}}</em></small></p>\n    </div>\n  </div>\n\n  <!-- Widgets -->\n  <div class=\'row\' id=\"widgets-section\" ng-hide=\"showNoWidgetsMsg() || showChooseDhbMsg()\">\n    <!-- Dashboard Settings - CONFIGURED INSIDE WIDGETS-CONTAINER -->\n    <div id=\"dashboard-settings-panel\" ng-if=\"dhbSettingsConfig.inWidgetsContainer && !showChooseDhbMsg()\" class=\"col-md-12 in-widgets-container\">\n      <div>\n        <div dashboard-setting-sync-apps ng-if=\"dhbSettingsConfig.syncApps.show()\"/>\n        <div dashboard-setting-currency currency=\"currentDhb.currency\" />\n      </div>\n    </div>\n    <div class=\"col-md-12\">\n      <div id=\"widgets-container\" ui-sortable=\"sortableOptions\" ng-model=\"currentDhb.widgets\" class=\"row\">\n        <!-- Widgets -->\n        <div impac-widget widget=\"widget\" is-accessibility=\"accessibility\" parent-dashboard=\"currentDhb\" ng-repeat=\"widget in currentDhb.widgets\" class=\"widget-item\" ng-class=\"widget.getCssClasses()\" on-display-alerts=\"displaySubMenu()\" />\n        <!-- Add Widget Tile, enabled & customised in ImpacThemingProvider -->\n        <div ng-if=\"isAddChartEnabled\" class=\"unsortable\" ng-click=\"addChartTileOnClick()\">\n          <div class=\"col-md-6 widget-item add-chart\">\n            <div class=\"a-content\" translate>impac.dashboard.plus_chart</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"analytics\" ng-show=\"(isLoading || forceLoad)\">\n  <div class=\"row\">\n    <div class=\"col-md-12 loader-container text-center\" style=\"margin-top: 200px;\">\n      <i class=\"fa fa-refresh fa-spin\" style=\"font-size: 250px; opacity: 0.7;\"/>\n    </div>\n  </div>\n</div>\n\n<div class=\"analytics load-failed\" ng-show=\"!isLoading && failedDashboardLoad\">\n  <div class=\"row\">\n    <div class=\"col-md-12 text-center\" style=\"margin-top: 200px;\">\n      <p translate>{{dhbErrorsConfig.failed.first}}</p>\n      <div class=\"second-msg\" ng-if=\"displaySecondMsg\">\n        <p translate>{{dhbErrorsConfig.failed.second}}</p>\n      </div>\n      <a href=\"\" ng-click=\"reloadDashboard()\">\n        <button type=\"button\" class=\"btn btn-default\" translate>impac.dashboard.refresh</button>\n      </a>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard/widget-suggestion.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3 translate>impac.dashboard.widget_suggestion.suggest_a_widget</h3>\n</div>\n\n<div class=\"modal-body\">\n\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <label translate>impac.dashboard.widget_suggestion.widget_name</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.name\" ng-disabled=\"isLoading\" />\n    </div>\n    <div class=\"col-md-6\">\n      <label>In which category?</label><br />\n      <input type=\"text\" ng-model=\"widgetDetails.category\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" />\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <label translate>impac.dashboard.widget_suggestion.kind_of_information</label><br/>\n      <textarea ng-model=\"widgetDetails.description\" ng-disabled=\"isLoading\" />\n    </div>\n  </div>\n\n  <div class=\"spacer1\" ng-show=\"isLoading\" />\n\n  <div class=\"row\" uib-collapse=\"!onSuccess\">\n    <div class=\"col-md-12 text-center\">\n      <h3 class=\"thanks-message\">{{userName | titleize}}, <span translate=\"impac.dashboard.widget_suggestion.helping\"></span></h3>\n    </div>\n  </div>\n\n  <div class=\"row\" ng-show=\"error\">\n    <div class=\"col-md-12 text-center\">\n      <h5 style=\"color: red;\" translate>impac.dashboard.widget_suggestion.unable_to_send</h5>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\" translate>impac.dashboard.widget_suggestion.cancel</button>\n      <button class=\"btn btn-info\" ng-click=\"proceed()\" ng-disabled=\"!(widgetDetails.name && widgetDetails.category && widgetDetails.description) || isLoading\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n        {{\'impac.dashboard.widget_suggestion.send_your_suggestion\' | translate}}\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/bootstrap-tabs.tmpl.html","<div class=\"row buttons-bar-row\" ng-class=\"{\'pdf-mode\': pdfMode}\">\n\n  <div ng-show=\"pdfMode\" class=\'col-md-6 col-md-offset-3 title-container text-center\'>\n    <h1 class=\"dashboard-title\">\n      {{currentDhb.full_name}}\n    </h1>\n    <p class=\"data-source-label\">\n      <small><b translate>impac.dashboard_selector.bootstrap_tabs.source</b> {{organizationsNames()}}</small>\n    </p>\n  </div>\n\n  <div class=\"buttons-bar col-sm-8\" ng-show=\"isThereADashboard() && !pdfMode\">\n    <uib-tabset type=\"{{selectorType}}\">\n      <uib-tab ng-repeat=\"dhb in dashboardsList\" ng-click=\"selectDashboard(dhb.id)\" active=\"dhb.active\">\n        <uib-tab-heading>\n          {{dhb.full_name}}\n          <a href=\"\" class=\"close-link\" ng-if=\"isDeleteDhbEnabled\">\n            <i class=\"fa fa-times\" ng-click=\"deleteDashboardModal.open()\"></i>\n          </a>\n        </uib-tab-heading>\n      </uib-tab>\n      <uib-tab ng-if=\'isAccessibilityEnabled\' ng-click=\"toggleAccessibilityMode()\">\n        <uib-tab-heading>\n          <a href=\"\"><i class=\"fa fa-wheelchair\"></i></a>\n        </uib-tab-heading>\n      </uib-tab>\n      <uib-tab ng-if=\"isAddDhbEnabled\" ng-click=\"onCreateDashboard()\">\n        <uib-tab-heading>\n          <a href=\"\">+</a>\n        </uib-tab-heading>\n      </uib-tab>\n    </uib-tabset>\n  </div>\n\n  <div class=\'buttons-bar hidden-print\' ng-class=\"{\'col-md-3\': pdfMode, \'col-sm-4\': !pdfMode}\">\n    <div class=\'actions-panel\'>\n      <button ng-if=\'isAccessibilityEnabled && !pdfMode\' ng-click=\"toggleAccessibilityMode()\" class=\'btn btn-info\' ng-disabled=\"isWidgetSelectorShown()\"><span class=\'fa fa-wheelchair\'></span></button>\n      <button ng-if=\"isAddWidgetEnabled && isThereADashboard() && !pdfMode\" ng-click=\"onDisplayWidgetSelector()\" class=\'btn btn-warning\' ng-disabled=\"isWidgetSelectorShown()\"><span class=\'fa fa-plus\'></span> {{\'impac.dashboard_selector.bootstrap_tabs.add_widget\' | translate}}</button>\n\n      <div dashboard-settings-pdf-mode ng-if=\"isThereADashboard() && !isCurrentDashboardEmpty()\" />\n\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/delete.modal.html","<div class=\"modal-header\">\n  <div class=\"close\" type=\"button\" ng-click=\"instance.close()\" >×</div>\n  <h3 translate translate-values=\"{ name: dhbLabelName }\">impac.dashboard_selector.delete.delete_dashboard</h3>\n</div>\n\n<div class=\"modal-body\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"alert alert-error\" ng-show=\"errors\">\n        <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n        <ul>\n          <li ng-repeat=\"error in errors\">{{error}}</li>\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <p translate translate-values=\"{ name: dhbLabelName }\">impac.dashboard_selector.delete_widget.description</p>\n</div>\n\n<div class=\"modal-footer\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <button class=\"btn btn-shaded\" ng-click=\"instance.dismiss()\" ng-hide=\"isLoading\" ng-disabled=\"isLoading\" translate>impac.dashboard_selector.delete.cancel</button>\n      <button class=\"btn btn-danger\" ng-click=\"proceed()\" ng-disabled=\"isLoading\">\n        <i class=\"fa fa-spinner fa-pulse loader\" ng-if=\"isLoading\"></i>\n        {{\'impac.dashboard_selector.delete.delete\' | translate}}\n      </button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-selector/dropdown.tmpl.html","<div class=\"row buttons-bar-row buttons-bar no-gutters\" ng-class=\"{\'pdf-mode\': pdfMode}\">\n\n  <div ng-show=\"pdfMode\" class=\'col-md-6 col-md-offset-3 title-container text-center\'>\n    <h1 class=\"dashboard-title\">\n      {{currentDhb.full_name}}\n    </h1>\n    <p class=\"data-source-label\">\n      <small><b translate>impac.dashboard_selector.dropdown.source</b> {{organizationsNames()}}</small>\n    </p>\n  </div>\n\n  <div class=\"col-md-6 dropdown-container\" ng-hide=\"isLoading || pdfMode\">\n    <div ng-if=\"isThereADashboard()\">\n      <h4 class=\'dashboard-title\'>\n        <div style=\"display: inline-block;\" ng-click=\"toggleShowDashboardsDropdown()\">\n          {{currentDhb.full_name}}\n          <i class=\"fa fa-chevron-down\" style=\"font-size: 18px;\"></i>\n        </div>\n        <i ng-hide=\"showChangeDashboardNameBox\" class=\"fa fa-pencil\" uib-tooltip=\"{{\'impac.dashboard_selector.dropdown.tooltip.change_name\' | translate}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" ng-click=\"toggleChangeDashboardNameBox(currentDhb)\"></i>\n      </h4>\n\n      <div ng-show=\"showDashboardsDropdown\" class=\'dashboard-select hidden-print\'>\n        <div ng-hide=\"dhb.id == currentDhb.id\" class=\'option\' ng-repeat=\"dhb in dashboardsList\">\n          <span class=\"name\" ng-click=\"selectDashboard(dhb.id)\">{{dhb.full_name}}</span>\n          <i ng-hide=\"showChangeDashboardNameBox\" class=\"fa fa-pencil\" uib-tooltip=\"{{\'impac.dashboard_selector.dropdown.tooltip.change_name\' | translate}}\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" ng-click=\"toggleChangeDashboardNameBox(dhb)\"/>\n        </div>\n\n        <div ng-show=\"showCreateDashboardButton\" class=\"option create\" ng-click=\"onCreateDashboard()\"><i class=\"fa fa-plus\" /> {{ \'impac.dashboard_selector.dropdown.create_dashboard\' | translate:{name: dhbLabelName} }}</div>\n      </div>\n\n      <div ng-if=\"showChangeDashboardNameBox\" class=\"change-name\">\n        <p translate translate-values=\"{name: dhbLabelName}\">impac.dashboard_selector.dropdown.change_dashboard_name</p>\n        <input type=\"text\" class=\"form-control\" id=\"changeDhbNameInput\" ng-model=\"dashboardToChange.name\" ng-keyup=\"checkAndUpdateDashboardName($event)\"/>\n        <button class=\"btn btn-sm btn-default\" ng-click=\"hideChangeDashboardNameBox()\" translate>impac.dashboard_selector.dropdown.cancel</button>\n        <button class=\"btn btn-sm btn-success\" style=\"margin-left: 10px\" ng-click=\"updateDashboardName()\" translate>impac.dashboard_selector.dropdown.confirm</button>\n      </div>\n\n      <p class=\"data-source-label\">\n        <small><b translate>impac.dashboard_selector.dropdown.source</b> {{organizationsNames()}}</small>\n      </p>\n    </div>\n  </div>\n\n  <div class=\"col-md-6 loader-container\" ng-show=\"isLoading\">\n    <i class=\"fa fa-spinner fa-pulse fa-4x loading-spinner\"/>\n  </div>\n\n  <div class=\'actions-panel hidden-print\' ng-class=\"{\'col-md-3\': pdfMode, \'col-md-6\': !pdfMode}\">\n    <button ng-if=\'isAccessibilityEnabled\' ng-click=\"toggleAccessibilityMode()\" class=\'btn btn-info\' ng-disabled=\"showWidgetSelector\" ng-hide=\"pdfMode\"><span class=\'fa fa-wheelchair\'></span></button>\n\n    <button ng-if=\"isAddWidgetEnabled && isThereADashboard()\" ng-click=\"onDisplayWidgetSelector()\" class=\'btn btn-warning\' ng-disabled=\"isWidgetSelectorShown()\" ng-hide=\"pdfMode\"><span class=\'fa fa-plus\'></span> {{\'impac.dashboard_selector.dropdown.add_widget\' | translate}}</button>\n\n    <button ng-if=\"isAddDhbEnabled\" ng-click=\"onCreateDashboard()\" class=\'btn btn-warning\' ng-show=\"showCreateDashboardButton\" ng-hide=\"pdfMode\"><span class=\'fa fa-pencil-square-o\'></span> {{ \'impac.dashboard_selector.dropdown.create_dashboard\' | translate:{name: dhbLabelName} }}</button>\n\n    <div dashboard-settings-pdf-mode ng-if=\"isThereADashboard() && !isCurrentDashboardEmpty()\" />\n\n    <button ng-if=\"isDeleteDhbEnabled && isThereADashboard()\" ng-click=\"deleteDashboardModal.open()\" class=\'btn btn-danger hidden-xs\' ng-show=\"isThereADashboard()\" uib-tooltip=\"{{\'impac.dashboard_selector.dropdown.tooltip.delete\' | translate:{name: dhbLabelName} }}\" ng-hide=\"pdfMode\"><span class=\'fa fa-trash-o\'></span> </button>\n  </div>\n\n</div>\n");
$templateCache.put("dashboard-templates-selector/dashboard-templates-selector.tmpl.html","<div ng-hide=\"$ctrl.hasTemplates() || $ctrl.hideLoader\" class=\"loader\" align=\"center\">\n  <div>\n    <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n  </div>\n</div>\n\n<div ng-if=\"$ctrl.hasTemplates()\">\n  <div class=\"templates-header\">\n    <label class=\"control-label\" translate>Create from Template:</label>\n    <div class=\"templates-toggle\">\n      <i ng-class=\"{\'fa-toggle-off\': !$ctrl.isTemplatesMode, \'fa-toggle-on\': $ctrl.isTemplatesMode}\" class=\"fa\" ng-click=\"$ctrl.toggleTemplatesMode()\"></i>\n    </div>\n  </div>\n  <div class=\"templates\" ng-if=\"$ctrl.isTemplatesMode\">\n    <ul class=\"list-unstyled\">\n      <li class=\"template\" ng-repeat=\"template in $ctrl.templates track by $index\" ng-click=\"$ctrl.templateOnClick(template)\" ng-class=\"{ \'selected\': $ctrl.isSelected(template) }\">\n        <span ng-bind=\"template.name\"></span>\n      </li>\n    </ul>\n  </div>\n</div>\n");
$templateCache.put("kpi/kpi.tmpl.html","<div class=\"kpi\" ng-class=\"{ \'static\': kpi.static, \'triggered\': (kpi.layout.triggered && !isEditing() && !isLoading()), \'editing\': isEditing() }\">\n  <div class=\"content-container\" ng-hide=\"isLoading()\">\n    <div class=\"top-line\" ng-class=\"{ \'triggered\': kpi.layout.triggered }\"></div>\n    <div class=\"kpi-content\" ng-show=\"showKpiContent()\" ng-class=\"{ \'editing\': isEditing() }\">\n      <!-- SHOW -->\n      <div class=\"kpi-show row nomargin nopadding\" ng-hide=\"isEditing()\">\n        <div class=\"col-xs-3 col-sm-3 kpi-icon\" ng-class=\"{ \'triggered\': kpi.layout.triggered }\">\n          <i class=\"fa {{kpi.layout.icon.value}} fa-2x\"></i>\n        </div>\n        <div class=\"col-xs-9 col-sm-9 kpi-text\" ng-class=\"{ \'triggered\': kpi.layout.triggered }\">\n          <span class=\"caption\" uib-tooltip=\"{{kpi.layout.text.caption}}\" tooltip-append-to-body=\"false\">{{kpi.layout.text.caption}}</span>\n          <span class=\"emphasis\" uib-tooltip=\"{{kpi.layout.text.emphasis}} - ({{ getRealValue() }})\" tooltip-placement=\"bottom\" tooltip-append-to-body=\"false\">\n            <strong>{{kpi.layout.text.emphasis}}</strong> - <span class=\"real-value\">({{ getRealValue() }})</span>\n          </span>\n        </div>\n      </div>\n      <!-- EDIT -->\n      <div class=\"kpi-edit\" ng-show=\"isEditing()\">\n        <div class=\"kpi-name\">\n          <h6>{{kpi.name.toUpperCase()}}</h6>\n        </div>\n\n        <div class=\'alert-caption\'>\n          <span>{{kpi.layout.text.alert}}</span>\n        </div>\n\n        <form name=\"kpi{{kpi.id}}SettingsForm\">\n          <!-- watchables -->\n          <div ng-repeat=\"watchable in kpi.watchables track by $index\">\n            <div class=\"real-value\" ng-show=\"kpi.data\">{{\'impac.kpi.current\' | translate}} {{watchable}}: {{ getRealValue() }}</div>\n            <!-- targets -->\n            <div class=\"im-form-group\" ng-class=\"getFormTargetValueInput(watchable, $index).$valid ? \'has-success\' : \'has-error\'\" ng-repeat=\"target in targets[watchable] track by $index\">\n              <!-- target -->\n              <input name=\"{{watchable}}TargetValue{{$index}}\" type=\"text\" pattern=\"^-?\\d+(\\.\\d+)?$\" ng-model=\"target[getTargetPlaceholder(watchable).mode]\" placeholder=\"{{bindTargetInputPlaceholder(watchable, $index)}}\" ng-focus=\"setTargetInputPlaceholder(watchable, $index)\" ng-blur=\"resetTargetInputPlaceholder(watchable, $index)\" autofocus ng-keypress=\"onKeyPress($event)\" required>\n              <label for=\"targetValue\" class=\"im-control-label\">{{watchable | titleize}}</label><i class=\"im-bar\"></i>\n              <span class=\"kpi-target-unit\" aria-hidden=\"true\">{{getTargetUnit(watchable)}}</span>\n              <!-- target error messages -->\n              <div ng-messages=\"getFormTargetValueInput(watchable, $index).$error\" class=\"im-messages\">\n                <span ng-message=\"required\" translate>impac.kpi.kpi_target_require</span>\n                <span ng-message=\"pattern\" translate>impac.kpi.kpi_target_number</span>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"im-form-group\">\n            <div ng-repeat=\"(param, paramValues) in kpi.possibleExtraParams track by $index\">\n              <!-- extra param selection -->\n              <select name=\"extraParam\" ng-model=\"kpi.extra_params[param]\" ng-change=\"updateExtraParam()\" ng-options=\"value.id as value.label for value in paramValues\">\n              </select>\n              <label for=\"extraParam\" class=\"im-control-label\">{{\'impac.kpi.extra_param_label.verb\' | translate}} {{param | titleize}}</label>\n              <i class=\"im-bar\"></i>\n            </div>\n          </div>\n        </form>\n\n        <!-- Alerts Config -->\n        <alerts-config kpi=\"kpi\" button-html=\"\n          <button class=\'kpi-alerts im-fab im-primary\'>\n            <i class=\'fa fa-bell\'></i>\n          </button>\">\n        </alerts-config>\n\n        <!-- Remove KPI -->\n        <button type=\"button\" class=\"kpi-remove im-fab im-warn\" ng-click=\"deleteKpi()\">\n          <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n        </button>\n\n      </div>\n    </div>\n    <!-- Data not found display -->\n    <div class=\"kpi-no-data\" ng-if=\"isDataNotFound()\">\n      <!-- Remove KPI -->\n      <button type=\"button\" ng-show=\"isEditing()\" class=\"kpi-remove im-fab im-warn\" ng-click=\"deleteKpi()\">\n        <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n      </button>\n      <div common-data-not-found no-image=\"true\" endpoint=\"::kpi.endpoint\"/>\n    </div>\n  </div>\n  <div class=\"col-xs-2 kpi-data-loader loader\" ng-if=\"isLoading()\">\n    <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n  </div>\n</div>\n");
$templateCache.put("kpis-bar/kpis-bar.tmpl.html","<div class=\"kpis\" ng-class=\"{\'empty\': (kpis.length == 0), \'hidden-print\': (kpis.length == 0)}\">\n\n  <div class=\"actions\">\n    <button type=\"button\" class=\"toggle-show-content im-fab im-primary\" ng-click=\"toggleShowContent()\">\n      <a href=\"\"><i class=\"fa\" ng-class=\"{ \'fa-chevron-up\': showContent, \'fa-chevron-down\': !showContent }\"></i></a>\n    </button>\n    <div class=\"content-buttons\">\n      <button type=\"button\" class=\"add-kpis im-fab im-primary\" ng-click=\"availableKpis.toggle()\" ng-class=\"{ disabled: !hasKpiAvailability() }\">\n        <a href=\"\"><i class=\"fa\" ng-class=\"{\'fa-plus\': availableKpis.kpiSelectorHidden, \'fa-minus\': !availableKpis.kpiSelectorHidden}\"></i></a>\n      </button>\n      <button type=\"button\" class=\"edit-kpis im-fab im-primary\" ng-class=\"{ \'disabled\': toggleEditModeLock, \'editing\':isEditing() }\" ng-click=\"toggleEditMode()\" ng-if=\"kpis.length > 0\">\n        <a href=\"\"><i class=\"fa\" ng-class=\"{ \'fa-cog\': !isEditing(), \'fa-floppy-o\': isEditing() }\"></i></a>\n      </button>\n    </div>\n  </div>\n\n  <div class=\"content\">\n    <div class=\"row title\" ng-if=\"kpis.length == 0 && availableKpis.kpiSelectorHidden\">\n      <div class=\"col-xs-12 text-center\">\n        <a href=\"\" class=\"show-dashboard\" ng-click=\"availableKpis.toggle()\" ng-show=\"hasKpiAvailability()\" translate translate-values=\"{name: dhbLabelName}\">impac.kpi_bar.you_can_attach</a>\n        <span class=\"no-kpi-templates\" ng-hide=\"hasKpiAvailability()\" translate translate-values=\"{name: dhbLabelName}\">impac.kpi_bar.no_kpis</span>\n      </div>\n    </div>\n\n    <div class=\"row add-bar\" uib-collapse=\"availableKpis.kpiSelectorHidden\">\n      <div class=\"col-xs-12 col-sm-12\">\n        <div class=\"row\">\n          <div ng-repeat=\"kpi in availableKpis.list track by $index\" class=\"impac-kpi col-xs-6 col-sm-4 col-md-3\" ng-click=\"addKpi(kpi)\">\n            <div class=\"kpi add\" ng-hide=\"(availableKpis.list.length == 0)\">\n              <div class=\"top-line ui-sortable-handle\"></div>\n              <div class=\"kpi-content\">\n                <div class=\"kpi-show row nomargin nopadding\">\n                  <div class=\"col-xs-3 col-sm-3 kpi-icon\">\n                    <i class=\"fa fa-2x fa-plus\"></i>\n                  </div>\n                  <div class=\"col-xs-9 col-sm-9 kpi-text\">\n                    <span class=\"caption\"><strong>{{kpi.name}}</strong></span>\n                    <span class=\"emphasis\" translate translate-values=\"{name: dhbLabelName}\">impac.kpi_bar.add_to_dashboard</span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-sm-12\">\n        <div class=\"row\">\n          <div ui-sortable=\"sortableOptions\" ng-model=\"kpis\">\n            <div ng-repeat=\"kpi in kpis\" impac-kpi class=\"impac-kpi col-xs-6 col-sm-4 col-md-3\" kpi=\"kpi\" on-delete=\"removeKpi(kpi.id)\" edit-mode=\"showEditMode\" available-kpis=\"availableKpis.list\" load-ready=\"kpiDatesDeferred\">\n            </div>\n          </div>\n          <div ng-show=\"isAddingKpi\" class=\"col-xs-6 col-sm-4 col-md-3 kpi-loader\">\n            <i class=\"fa fa-2x fa-spin fa-refresh\"></i>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\" ng-show=\"showDatesPicker()\">\n      <div class=\"dates-picker-container\">\n        <div setting-dates-picker from=\"kpisDateRange.from\" to=\"kpisDateRange.to\" keep-today=\"kpisDateRange.keepToday\" on-change=\"kpisBarUpdateDates\" deferred=\"datesPickerDeferred\"/>\n      </div>\n    </div>\n</div>\n\n</div>\n");
$templateCache.put("widget/widget.tmpl.html","<div class=\"top-line\">\n  <div common-editable-title parent-widget=\"widget\" class=\"editable-title\" on-toggle=\"toggleEditTitle()\" />\n  <div common-top-buttons parent-widget=\"widget\" on-refresh=\"showWidget\" ng-hide=\"isInfoPanelDisplayed() || isTitleEdited() || pdfMode\" on-toggle-info-panel=\"toggleInfoPanel()\" on-toggle-delete-widget=\"toggleDeleteWidget()\"/>\n</div>\n\n<div ng-if=\"pdfMode && !widget.ticked\" class=\"include-to-pdf title hidden-print\">\n  <h6 translate>impac.widget.include_pdf</h6>\n</div>\n\n<div class=\"content\" ng-class=\"::cssClass\">\n  <div ng-show=\"widget.isLoading\" class=\"loader\" align=\"center\">\n    <div>\n      <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n      <p translate=\"impac.widget.loader\"></p>\n    </div>\n  </div>\n\n  <div ng-if=\"pdfMode\" class=\"include-to-pdf tick hidden-print\">\n    <a class=\"widget-hover\" ng-click=\"tick()\">\n      <i class=\"fa fa-check-circle fa-5x\" aria-hidden=\"true\" ng-show=\"widget.ticked\"></i>\n    </a>\n  </div>\n\n  <div ng-hide=\"widget.isLoading\" ng-include=\"::templatePath\" />\n  \n  <div common-delete-widget ng-if=\"showDeleteWidget\" parent-widget=\"widget\" on-dismiss=\"toggleDeleteWidget()\" />\n</div>\n\n<div common-info-panel parent-widget=\"widget\" on-close=\"toggleInfoPanel()\" ng-show=\"isInfoPanelDisplayed()\" />\n");
$templateCache.put("common/data-not-found.tmpl.html","<div class=\"data-not-found\" ng-if=\"!designerMode\">\n  <div class=\"overlay\" ng-show=\"messageVisible\" />\n  <div class=\"message\" ng-show=\"messageVisible\" >\n    <div class=\"title\" translate>{{ content.title }}</div>\n    <p translate>{{ content.mainMessage }}</p>\n    <button class=\"btn btn-xs btn-default\" ng-click=\"goToMarketplace()\" translate>{{ content.linkMessage }}</button>\n    <button class=\"btn btn-xs btn-warning\" ng-click=\"hide()\" translate>{{ content.seeExample }}</button>\n  </div>\n  <div class=\"example\" ng-hide=\"messageVisible\">\n    {{ content.demoData | translate }} - \n    <a ng-click=\"goToMarketplace()\" translate>{{ content.linkMessage }}</a>\n  </div>\n</div>\n");
$templateCache.put("common/delete-widget.tmpl.html","<div class=\"delete-widget\">\n  <div class=\"overlay\" />\n  <div class=\"message\">\n    <div class=\"title\" translate>impac.widget.common.top_buttons.delete.title</div>\n    <p translate>impac.widget.common.top_buttons.delete.message</p>\n    <p translate>impac.widget.common.top_buttons.delete.explanation</p>\n    <div ng-hide=\"loading\">\n      <button ng-click=\"onDismiss()\" class=\"btn btn-xs btn-default\" translate>impac.widget.common.top_buttons.delete.cancel</button>\n      <button ng-click=\"deleteWidget()\" class=\"btn btn-xs btn-danger\" translate>impac.widget.common.top_buttons.delete.delete</button>\n    </div>\n    <div ng-show=\"loading\" class=\"loader\" align=\"center\">\n      <div>\n        <i class=\"fa fa-spinner fa-pulse fa-4x\"></i>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("dashboard-settings/currency.tmpl.html","<div class=\"dashboard-settings currency\">\n  <select ng-options=\"cur for cur in currencies\" ng-model=\"data.currency\" ng-change=\"massAssignCurrency()\" ng-disabled=\"locked\">\n    <option ng-if=\"!data.currency\" value=\"\" disabled translate>impac.components.currency.choose_currency</option>\n  </select>\n</div>\n");
$templateCache.put("dashboard-settings/pdf-mode.tmpl.html","<div class=\"dashboard-settings pdf-mode\" ng-if=\"enabled\">\n  <div ng-hide=\"pdfMode\">\n    <button ng-click=\"toggle()\" class=\'btn btn-info\' uib-tooltip=\"Print Dashboard\">\n      <span class=\'fa fa-print\' />\n    </button>\n  </div>\n\n  <div ng-show=\"pdfMode\">\n    <button ng-click=\"print()\" class=\'btn btn-info\' ng-disabled=\"allNotTicked\">\n      <span class=\'fa fa-print\' /> {{\'impac.components.pdf_mode.print\' | translate}}\n    </button>\n    <button ng-click=\"toggle()\" class=\'btn btn-default\' translate>impac.components.pdf_mode.cancel</button>\n  </div>\n</div>\n");
$templateCache.put("dashboard-settings/sync-apps.tmpl.html","<!-- Will be displayed only if specified in configuration and if first response has been processed (realtimeSyncing eq true) -->\n<div class=\"dashboard-settings sync-apps\" ng-show=\"connectors.length || realtimeSyncing\">\n\n  <span class=\"show-status\" uib-popover-template=\"\'connectors.tmpl.html\'\" popover-trigger=\"\'mouseenter\'\" popover-placement=\"bottom\" ng-click=\"triggerSyncAlertsModal()\">\n    <i class=\"fa fa-info\" ng-click=\"triggerSyncAlertsModal()\" />\n    <span class=\"ng-hide\" ng-show=\"isSyncing\" translate>impac.components.sync_apps.syncing</span>\n    <span ng-hide=\"isSyncing\" translate>impac.components.sync_apps.show_sync_status</span>\n  </span>\n\n  <div class=\"status-btn\" ng-click=\"triggerSyncAlertsModal()\" ng-show=\"hasError && !isSyncing\">\n    <i class=\"fa fa-exclamation-triangle\"></i>\n  </div>\n\n  <div class=\"status-btn\" ng-click=\"triggerSyncAlertsModal()\" ng-show=\"!hasError && !isSyncing\">\n    <i class=\"fa fa-check\"></i>\n  </div>\n\n  <button id=\"sync\" class=\"btn btn-primary\" ng-click=\"synchronize()\" uib-tooltip=\"{{\'impac.components.sync_apps.tooltip.sync_data\' | translate}}\" ng-disabled=\"isSyncing\">\n    <i class=\"fa fa-refresh\" ng-class=\"{ \'fa-spin\': isSyncing }\" />\n  </button>\n\n</div>\n\n<!-- ui.bootstrap popover template -->\n<script type=\"text/ng-template\" id=\"connectors.tmpl.html\">\n  <div class=\"connector\" ng-repeat=\"connector in connectors track by $index\" ng-class=\"{ \'{{connector.status.toLowerCase()}}\': true, \'add-seperator\': !$last }\">\n    <div class=\"badge\">{{connector.status}}</div>\n    <strong>{{connector.name}}</strong> -\n    <span ng-switch=\"connector.status\">\n      <span ng-switch-when=\"SUCCESS\">{{\'impac.components.sync_apps.status.synced_at\' | translate}} {{connector.formatted_date}}.</span>\n      <span ng-switch-when=\"PENDING\" translate>impac.components.sync_apps.status.sync_will_run</span>\n      <span ng-switch-when=\"RUNNING\" translate>impac.components.sync_apps.status.syncing_in_progres</span>\n      <span ng-switch-when=\"ERROR\" translate>impac.components.sync_apps.status.sync_failed</span>\n      <span ng-switch-when=\"DISCONNECTED\" translate>impac.components.sync_apps.status.please_link</span>\n      <span ng-switch-when=\"UNKNOWN\" translate>impac.components.sync_apps.status.could_not_retrieve</span>\n    </span>\n    <!-- <span ng-if=\"connector.formatted_date\"> - Synced at {{connector.formatted_date}}</span> -->\n  </div>\n  <div class=\"popover-footer\" ng-class=\"{ \'remove-seperator\': realtimeSyncing }\">\n    <p>{{\'impac.components.sync_apps.all\' | translate}} {{realtimeSyncing ? \'\' : \'other\'}} {{\'impac.components.sync_apps.applications_are_synced\' | translate}}</p>\n  </div>\n</script>\n\n<!-- ui.bootstrap modal template -->\n<script type=\"text/ng-template\" id=\"alerts.tmpl.html\">\n  <div id=\"sync-apps-modal\">\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\" translate>impac.components.sync_apps.synchronization_status</h4>\n    </div>\n    <div class=\"modal-list\">\n      <div class=\"modal-list-item\" ng-class=\"{\'{{connector.status.toLowerCase()}}\': true, \'with-message\': connector.message}\" ng-repeat=\"connector in connectors track by $index\" ng-click=\"expandListItemOnClick(connector)\">\n        <div class=\"badge\">{{connector.status}}</div>\n        <div class=\"text-left\">\n          <strong>{{connector.name}}</strong> -\n          <span ng-switch=\"connector.status\">\n            <span ng-switch-when=\"SUCCESS\">{{\'impac.components.sync_apps.status.synced_at\' | translate}} {{connector.formatted_date}}.</span>\n            <span ng-switch-when=\"PENDING\" translate>impac.components.sync_apps.status.sync_will_run</span>\n            <span ng-switch-when=\"RUNNING\" translate>impac.components.sync_apps.status.syncing_in_progres</span>\n            <span ng-switch-when=\"ERROR\" translate>impac.components.sync_apps.status.sync_failed</span>\n            <span ng-switch-when=\"DISCONNECTED\" translate>impac.components.sync_apps.status.please_link</span>\n            <span ng-switch-when=\"UNKNOWN\" translate>impac.components.sync_apps.status.could_not_retrieve</span>\n          </span>\n        </div>\n        <div class=\"message ng-hide\" ng-show=\"connector.showMessage\">\n          <p>{{connector.message}}</p>\n        </div>\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\" translate>impac.components.sync_apps.ok</button>\n    </div>\n  </div>\n</script>\n");
$templateCache.put("widgets-common/chart-threshold.tmpl.html","<div class=\"attach-panel\" ng-if=\"$ctrl.showPanel\">\n  <div class=\"attach-panel-text\">\n    <span class=\"panel-text-label\">{{$ctrl.kpiCreateLabel}}: </span>\n    <input type=\"text\" class=\"panel-text-input\" ng-model=\"$ctrl.draftTarget.value\">\n    <span class=\"panel-text-currency\" ng-bind=\"$ctrl.widget.metadata.currency\"></span>\n  </div>\n  <div class=\"action-buttons\">\n    <button class=\"btn btn-default\" ng-click=\"$ctrl.cancelCreateKpi()\" ng-disabled=\"$ctrl.loading\">Cancel</button>\n    <button class=\"btn btn-primary has-spinner\" ng-click=\"$ctrl.saveKpi()\">\n      <i ng-show=\"$ctrl.loading\" class=\"fa fa-spinner fa-spin\" aria-hidden=\"true\"></i>\n      <span ng-hide=\"$ctrl.loading\">{{$ctrl.isEditingKpi ? \'Update\' : \'Save\'}}</span>\n    </button>\n    <button ng-if=\"$ctrl.isEditingKpi\" class=\"btn btn-danger has-spinner\" ng-click=\"$ctrl.deleteKpi()\">\n      <i ng-show=\"$ctrl.loading\" class=\"fa fa-spinner fa-spin\" aria-hidden=\"true\"></i>\n      <span ng-hide=\"$ctrl.loading\">Delete</span>\n    </button>\n  </div>\n</div>\n");
$templateCache.put("widgets-common/currency-conversions.tmpl.html","<span class=\"currency-conversions\" ng-if=\"fxAmounts\">\n  <img ng-src=\"{{currencyConversionsIcon}}\" uib-popover-template=\"\'details-popover.tmpl.html\'\" popover-class=\"currency-conversions\" popover-title=\"{{popoverTitle}}\" popover-trigger=\"\'mouseenter\'\" popover-append-to-body=\"true\" />\n</span>\n\n<!-- ui.bootstrap popover template -->\n<script type=\"text/ng-template\" id=\"details-popover.tmpl.html\">\n  <p ng-if=\"fxAmounts.length > 1\">This value includes amounts that have been converted to {{ baseCurrency }} from different currencies:</p>\n  <p ng-if=\"fxAmounts.length == 1\">This value includes one amount that has been converted to {{ baseCurrency }} from a different currency:</p>\n  \n  <table class=\"table\">\n    <tr>\n      <th>Original amount</th>\n      <th>Rate</th>\n    </tr>\n    <tr ng-repeat=\"fx in fxAmounts\">\n      <td>{{ fx.amount | mnoCurrency : fx.currency }}</td>\n      <td>{{ fx.rate }}</td>\n    </tr>\n  </table>\n\n  <p ng-if=\"fxAmounts.length > 1\">The rates used correspond to those for {{ formattedRatesDate }}.</p>\n  <p ng-if=\"fxAmounts.length == 1\">The rate used corresponds to the rate for {{ formattedRatesDate }}.</p>\n</script>\n");
$templateCache.put("widgets-common/editable-title.tmpl.html","<div ng-show=\"parentWidget.hasEditAbility\" class=\"hidden-xs hidden-sm title\" editable-text=\"parentWidget.name\" onaftersave=\"updateName()\" onshow=\"onToggle()\" onhide=\"onToggle()\" uib-tooltip=\"{{ getTooltip() }}\" tooltip-placement=\"top-left\">\n  {{ parentWidget.name }}\n</div>\n\n<div ng-hide=\"parentWidget.hasEditAbility\" class=\"hidden-xs hidden-sm title\" uib-tooltip=\"{{ getTooltip() }}\" tooltip-placement=\"top-left\">\n  {{ parentWidget.name }}\n</div>\n\n<!-- Title edition no designed for mobile -->\n<div class=\"visible-xs visible-sm title\">\n  {{ parentWidget.name }}\n</div>\n");
$templateCache.put("widgets-common/info-panel.tmpl.html","<div class=\"info-panel\">\n\n  <div class=\"i-header text-center\">\n    <i class=\"fa fa-info-circle\" />\n    <i class=\"fa fa-times-circle\" ng-click=\"toggleInfoPanel()\" />\n    {{\'impac.widget.info_panel.information\' | translate}} <b>{{ getWidgetTemplateName() | titleize }}</b>\n  </div>\n\n  <div class=\"i-content text-left\">\n    <div class=\"row text-left\" ng-repeat=\"i in parentWidget.content.info\">\n\n      <div class=\"col-md-3 key\">\n        {{i.key}}\n      </div>\n\n      <div class=\"col-md-9 value\">\n        {{i.value}}\n      </div>\n\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("widgets-common/top-buttons.tmpl.html","<div class=\"top-buttons\">\n  <div class=\"top-buttons-wrapper\">\n\n    <button class=\"btn top-button btn-info\" ng-if=\"hasInfo()\" ng-click=\"onToggleInfoPanel()\">\n      <i class=\"fa fa-info-circle\"></i>\n      <span class=\"text-hide\" translate>impac.widget.common.top_buttons.info_popup.info</span>\n    </button>\n\n    <button class=\"btn top-button btn-refresh\" ng-click=\"onRefresh({refreshCache: true})\">\n      <i class=\"fa fa-refresh\"></i>\n      <span class=\"text-hide\" translate>impac.widget.common.top_buttons.info_popup.refresh</span>\n    </button>\n\n    <button class=\"btn top-button btn-edit\" ng-click=\"toggleEditMode()\" ng-show=\"parentWidget.hasEditAbility\" ng-class=\"{\'edit-mode\': parentWidget.isEditMode}\">\n      <i class=\"fa fa-cog fa-lg\"></i>\n      <span class=\"text-hide\" translate>impac.widget.common.top_buttons.info_popup.edit</span>\n    </button>\n\n    <button class=\"btn top-button btn-close\" ng-click=\"onToggleDeleteWidget()\" ng-show=\"parentWidget.hasDeleteAbility\">\n      <i class=\"fa fa-times-circle-o fa-lg\"></i>\n      <span class=\"text-hide\" translate>impac.widget.common.top_buttons.info_popup.delete</span>\n    </button>\n  </div>\n</div>\n");
$templateCache.put("widgets-common/time-period-info.tmpl.html","<div class=\"time-period-info text-center\" ng-if=\"context\">\n  {{date}}\n</div>\n");
$templateCache.put("widgets-settings/account.tmpl.html","<h5 ng-if=\"showLabel\">{{label}}</h5>\n<div class=\"input-group settings select-account\">\n	<select ng-model=\"parentWidget.selectedAccount\" ng-change=\"onAccountSelected()\" ng-options=\"formatLabel(account) group by account.classification for account in parentWidget.content.account_list track by account.uid\" class=\"form-control\" />\n</div>\n");
$templateCache.put("widgets-settings/accounting-behaviour.tmpl.html","<h5 translate>impac.widget.settings.account.label.accounting_behaviour</h5>\n<div class=\"settings accounting-behaviour\">\n\n<div class=\"row\">\n  <div class=\"col-md-12 text-center\">\n    <div class=\"btn-group\">\n      <label class=\"btn btn-primary\" ng-model=\"selectedBehaviour\" uib-btn-radio=\"\'bls\'\" translate>impac.widget.settings.accounting_behaviour.balance_sheet</label>\n      <label class=\"btn btn_primary\" ng-model=\"selectedBehaviour\" uib-btn-radio=\"\'pnl\'\" translate>impac.widget.settings.accounting_behaviour.p_and_l</label>\n    </div>\n  </div>\n</div>\n\n</div>\n");
$templateCache.put("widgets-settings/attach-kpis.tmpl.html","<div class=\"settings attach-kpis\">\n\n  <div class=\"attach-kpi\">\n    <h5 translate>impac.widget.settings.attach_kpis.attach_an_alert</h5>\n    <form name=\"attachKpiForm\" class=\'attach-kpi-form\'>\n      <!-- <div class=\"row nomargin\">\n        <select class=\"form-control input-sm\" ng-model=\"kpi.endpoint\" ng-options=\"kpi.endpoint as formatKpiName(kpi.endpoint) for kpi in availableKpis\" ng-change=\"selectKpi()\"></select>\n      </div>\n      <div class=\"row nomargin\">\n        <div class=\"extra-params\" ng-repeat=\"(param, paramValues) in kpi.possibleExtraParams track by $index\">\n          <select class=\"form-control input-sm\" name=\"{{param}}\" ng-model=\"kpi.extra_params[param]\" ng-options=\"value.id as value.label for value in paramValues\" ng-init=\"kpi.extra_params[param] = paramValues[0].id\"></select>\n        </div>\n      </div> -->\n      <div class=\"row nomargin kpi-description\">\n        <!-- TODO: support for multiple extra params, and watchables. -->\n        {{\'impac.widget.settings.attach_kpis.keep_the\' | translate}} {{elementWatched}} <span ng-if=\"showExtraParam\">{{\'impac.widget.settings.attach_kpis.of\' | translate}} {{extraParams[selectedParam].name}}</span>:\n      </div>\n      <div class=\"row nomargin\">\n        <div class=\"col-xs-5 nopadding\">\n          <select class=\"pull-left form-control input-sm\" ng-model=\"kpi.limit.mode\" ng-options=\"option.mode as option.label for option in possibleTargets\" ></select>\n        </div>\n        <div class=\"form-group col-xs-5 nopadding nomargin\" ng-class=\"attachKpiForm.limitValue.$valid ? \'has-success\' : \'has-error\'\">\n          <input name=\"limitValue\" type=\"text\" pattern=\"-?[0-9]+\" class=\"form-control input-sm attach-target\" ng-model=\"kpi.limit.value\" required>\n          <!-- TODO: return possible units from API? -->\n          <!-- <span class=\"form-control-feedback\" aria-hidden=\"true\">{{kpi.data.unit}}</span> -->\n          <div class=\"error-messages limit\" ng-messages=\"attachKpiForm.limitValue.$error\">\n            <span ng-message=\"required\" translate>impac.widget.settings.attach_kpis.kpi_target_require</span>\n            <span ng-message=\"pattern\" translate>impac.widget.settings.attach_kpis.kpi_target_number</span>\n          </div>\n        </div>\n        <div class=\"col-xs-2 nopadding\">\n          <button class=\"btn btn-primary input-sm\" ng-click=\"attachKpi()\" ng-disabled=\"!hasValidTarget()\"><i class=\"fa fa-plus\"></i></button>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"list-group attached-kpis\" ng-show=\"attachedKpis.length\">\n    <h5 translate>impac.widget.settings.attach_kpis.attached_alerts</h5>\n    <div class=\"list-group-item clearfix attached-kpi\" ng-repeat=\"kpi in attachedKpis track by $index\">\n      <div class=\"attached-kpi-name\">{{\'impac.widget.settings.attach_kpis.keep\' | translate}} {{formatAttachedKpiTitle(kpi) | titleize}}</div>\n      <div class=\"pull-right actions\">\n        <alerts-config kpi=\"kpi\"></alerts-config>\n        <div class=\"remove-attached-kpi\" ng-click=\"deleteKpi(kpi)\">\n          <i class=\"fa fa-times\"></i>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("widgets-settings/chart-filters.tmpl.html","<div class=\"settings chart-filters\">\n  <h5 translate>impac.widget.settings.chart_filters.title</h5>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <input type=\"radio\" ng-model=\"filterCriteria\" value=\"number\">\n      <label for=\"number\" ng-click=\"filterCriteria = \'number\'\" translate=\"impac.widget.settings.chart_filters.filter_number\" translate-values=\"{number: filterValueNumber, entityType: entityType}\"></label>\n    </div>\n    <div class=\"col-md-6\">\n      <input type=\"range\" ng-model=\"filterValueNumber\" ng-change=\"filterCriteria = \'number\'\" min=\"3\" max=\"{{maxEntities}}\" step=\"1\">\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <input type=\"radio\" ng-model=\"filterCriteria\" value=\"percentage\">\n      <label for=\"percentage\" ng-click=\"filterCriteria = \'percentage\'\" translate=\"impac.widget.settings.chart_filters.filter_percentage\" translate-values=\"{percentage: filterValuePercentage, entityType: filterLabel}\"></label>\n    </div>\n    <div class=\"col-md-6\">\n      <input type=\"range\" ng-model=\"filterValuePercentage\" ng-change=\"filterCriteria = \'percentage\'\" min=\"20\" max=\"100\" step=\"5\">\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/dates-picker.tmpl.html","<span class=\"settings dates-picker\">\n  <h5 ng-if=\"showTitle()\" translate>impac.widget.settings.dates_picker.title</h5>\n  <span id=\"template-container\" />\n</span>\n");
$templateCache.put("widgets-settings/hist-mode.tmpl.html","<div class=\"settings hist-mode-choser\">\n  <div common-time-period-info context=\"forwardParams\" />\n\n  <div align=\"center\" class=\"options\">\n    <a ng-click=\"toggleHistMode(\'current\')\" ng-class=\"!parentWidget.isHistoryMode ? \'active\' : \'inactive\'\">{{currentLabel}} </a> |\n    <a ng-click=\"toggleHistMode(\'history\')\" ng-class=\"parentWidget.isHistoryMode ? \'active\' : \'inactive\'\" translate>impac.widget.settings.hist.history</a>\n  </div>\n\n  <div class=\"{{parentWidget.isHistoryMode ? \'arrow-container right\' : \'arrow-container left\'}}\">\n    <div class=\"arrow\" />\n    <div class=\"arrow-border\" />\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/limit-entries.tmpl.html","<div class=\"settings limit-entries\">\n  {{ (entriesLabel ? \'impac.widget.settings.limit_entries.top\' : \'impac.widget.settings.limit_entries.display\') | translate }}\n\n  <span ng-repeat=\"option in options | filter:isOptionValid:option track by $index\">\n    {{ $index!=0 ? \' |\' : \'\' }} \n    <a target=\'#\' ng-click=\"selectOption(option)\" class=\"option\" ng-class=\"{badge: option==selected}\">{{ option }}</a>\n  </span>\n\n  <span ng-if=\"max\">\n    | \n    <a target=\'#\' ng-click=\"selectOption(max)\" class=\"option\" ng-class=\"{badge: (!selected || selected==max)}\">{{ max }}</a>\n  </span>\n\n   {{entriesLabel || (\'impac.widget.settings.limit_entries.entries\' | translate)}}\n</div>");
$templateCache.put("widgets-settings/offsets.tmpl.html","<div class=\"settings offsets\">\n  <div ng-repeat=\"offsetValue in offsets track by $index\" class=\"offset-value text-right\">\n    <i class=\"fa fa-trash-o pull-left\" ng-click=\"removeOffset($index)\" title=\"Remove offset\"/>\n    + <span ng-if=\"showIntervalsMult\">{{ intervalsCount }} {{ periodWord }}{{ intervalsCount > 1 ? \'s\' : \'\' }} x </span>{{ offsetValue | mnoCurrency : currency}}\n  </div>\n\n  <div class=\"form-group\">\n    <button class=\"btn btn-sm btn-success\" ng-click=\"addOffset()\" title=\"Add offset\">\n      <i class=\"fa fa-plus\" />\n    </button>\n    <input type=\"text\" class=\"form-control input-sm pull-right text-right\" placeholder=\"{{ placeholder }}\" ng-model=\"offsetFormula\" ng-keyup=\"addOffsetOnEnter($event)\">\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/organizations.tmpl.html","<div class=\"settings organizations\">\n  <h5 translate>impac.widget.settings.organizations.select_companies</h5>\n\n  <div class=\"widget-lines-container\">\n    <div class=\"widget-line\" ng-repeat=\"org in dashboardOrganizations\">\n      {{org.label}}\n      <i ng-class=\"isOrganizationSelected(org.uid) ? \'fa fa-toggle-on\' : \'fa fa-toggle-off\'\" ng-click=\"toggleSelectOrganization(org.uid)\" uib-tooltip=\"{{isOrganizationSelected(org.uid) ? \'disable\' : \'enable\'}}\" tooltip-append-to-body=\"true\" />\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/param-selector-classic.tmpl.html","<span class=\"settings param-selector classic\" ng-if=\"selected != undefined\">\n  <select ng-options=\"option as option.label for option in options track by option.value\" ng-model=\"$parent.selectedOption\" ng-change=\"selectOption(selectedOption)\" ng-init=\"onInit()\">\n  </select>\n</span>\n");
$templateCache.put("widgets-settings/param-selector.tmpl.html","<span class=\"settings param-selector\">\n	<a ng-click=\"toggleShowOptions()\">{{((selected.labelTranslate | translate | titleize) || (selected.label | titleize)) | truncate : getTruncateValue() : \"...\" : false}} <i class=\"fa fa-chevron-down\" /></a>\n	<div class=\"options-container\" uib-collapse=\"!showOptions\">\n		<div ng-repeat=\"option in options\" ng-click=\"selectOption(option)\" class=\"param-selector-label\">\n			{{(option.labelTranslate | translate | titleize) || (option.label | titleize)}}\n		</div>\n	</div>\n</span>\n");
$templateCache.put("widgets-settings/params-checkboxes.tmpl.html","<div ng-repeat=\"parameter in options track by $index\" class=\"settings params-checkboxes\">\n  <label>\n    <input type=\"checkbox\" ng-model=\"parameter.value\" ng-change=\"parameter.onChangeCallback()\">\n    <span>{{parameter.label}}</span>\n  </label>\n</div>\n");
$templateCache.put("widgets-settings/params-picker.tmpl.html","<h5>{{formattedParam | titleize}}</h5>\n<div class=\"settings params-picker\">\n  <div style=\"margin-bottom: 8px;\">{{description}}</div>\n  <div ui:sortable=\"sortableOptions\" ng-model=\"options\" class=\"input-group\">\n    <span ng-repeat=\"parameter in options track by $index\" class=\"parameter\" ng-class=\"!parameter.selected ? \'unchecked\' : \'\'\">\n      <span class=\"badge\">{{$index + 1}}</span>\n      {{parameter.label | titleize}}\n      <input type=\"checkbox\" ng-model=\"parameter.selected\" />\n    </span>\n  </div>\n  <div ng-show=\"hasReach\">\n    <label><strong translate>impac.widget.settings.params-picker.apply_to_all</strong> <input type=\"checkbox\" ng-change=\"toggleReach()\" ng-model=\"applyToDashboard\"></label>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/tag-filter.tmpl.html","<h5 translate>impac.widget.settings.tag-filter.filter_title</h5>\n<div class=\"settings tag-filter\" >\n\n  <div class=\"tag-lines-container\">\n    <div class=\"row tag-line\" ng-repeat=\"rule in settingsTags\" >\n      <div class=\"col-xs-2\">\n        <span style=\"font-weight: bold;\" ng-hide=\"$index>0\" translate>impac.widget.settings.tag-filter.add_filter</span>\n        <span ng-hide=\"$index==0\">AND</span>\n      </div>\n      <div class=\"col-xs-8 tags-col\">\n        <tags-input ng-model=\"rule.tags\" replace-spaces-with-dashes=\"false\" add-from-autocomplete-only=\"true\">\n          <auto-complete source=\"loadTagList($query)\" min-length=\"1\" max-results-to-show=\"5\" debounce-delay=\"0\" load-on-down-arrow=\"true\"></auto-complete>\n        </tags-input>\n      </div>\n      <div class=\"col-xs-2 text-center\">\n        <button class=\"btn btn-sm btn-default\" ng-click=\"delRule($index)\" title=\"Remove filter\">-</button>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-xs-2 text-center\">\n        <button class=\"btn btn-sm btn-default\" ng-click=\"addRule()\" title=\"Add filter\">+</button>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/time-period.tmpl.html","<h5 translate>impac.widget.settings.time_period.title</h5>\n<div class=\"settings time-period\" ng-if=\"timePeriodSetting\">\n\n  <!-- Time range -->\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <strong translate>impac.widget.settings.time_period.time_range</strong>\n      <div setting-time-presets parent-widget=\"timePeriodSetting\" deferred=\"::timePresetsDeferred\" on-select=\"applyPreset(histParams)\" presets=\"presets\" on-choose-dates=\"useDatesPicker()\" on-choose-period=\"useTimeSlider()\" hist-params=\"histParams\" reset-promise=\"resetPreset.promise\" />\n    </div>\n  </div>\n\n  <!-- Dates pickers -->\n  <div class=\"row\" ng-show=\"isDatesPickerUsed()\">\n    <div class=\"col-xs-12\">\n      <div setting-dates-picker class=\"sub-setting\" parent-widget=\"timePeriodSetting\" deferred=\"::datesPickerDeferred\" min-date=\"getMinDate()\" from=\"fromDate\" to=\"toDate\" keep-today=\"keepToday\" on-use=\"useDatesPicker()\" />\n    </div>\n  </div>\n\n  <!-- Slider -->\n  <div class=\"row\" ng-show=\"isTimeSliderUsed()\">\n    <div class=\"col-xs-12\">\n      <div setting-time-slider class=\"sub-setting\" parent-widget=\"timePeriodSetting\" deferred=\"::timeSliderDeferred\" time-range=\"timePeriodSetting.timeRange\" on-use=\"useTimeSlider()\" />\n    </div>\n  </div>\n\n  <!-- Chart interval -->\n  <div class=\"row\" ng-hide=\"hideChartInterval\">\n    <div class=\"col-xs-12\">\n      <strong translate>impac.widget.settings.time_period.chart_interval</strong>\n      <select ng-model=\"timePeriodSetting.period\" ng-options=\"period.value as period.label for period in periods\" ng-change=\"updateSettings()\" />\n    </div>\n  </div>\n\n  <!-- Info -->\n  <div class=\"row text-center\" ng-hide=\"hideChartInterval\">\n    <div class=\"col-xs-12\">\n      <i translate=\"impac.widget.settings.time_period.chart_note\" translate-values=\"{nbOfPeriods: maxNumberOfPeriods}\"></i>\n    </div>\n  </div>\n\n  <!-- Save Changes -->\n  <div class=\"row text-center\" ng-show=\"showApplyButton\">\n    <div class=\"col-xs-12\">\n      <button class=\"btn btn-sm btn-default\" ng-click=\"applyChangesCallback()\">Apply changes</button>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/time-presets.tmpl.html","<div class=\"settings time-presets\">\n  <select ng-model=\"selectedPreset\" ng-options=\"p.label for p in presets\" ng-change=\"presetSelected()\" />\n</div>\n");
$templateCache.put("widgets-settings/time-slider.tmpl.html","<div class=\"settings time-slider\">\n  <div class=\"row\">\n    <div class=\"col-xs-11 col-xs-offset-1\" ng-click=\"onUse()\" translate=\"impac.widget.settings.time_slider.show_last\" translate-values=\"{formatPeriod: formatPeriod()}\"></div>\n    <div class=\"col-xs-11 col-xs-offset-1\" ng-click=\"onUse()\">\n      <i>{{formatDate(fromDate())}} - {{formatDate(toDate())}}</i>\n    </div>\n    <div class=\"col-xs-12\">\n      <input type=\"range\" ng-model=\"numberOfPeriods\" min=\"1\" max=\"12\" step=\"1\" ng-focus=\"onUse()\" ng-change=\"formatPeriod()\">\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets-settings/width.tmpl.html","<i class=\"fa fa-angle-double-left reduce\" ng-show=\"expanded && !pdfMode\" ng-click=\"parentWidget.toggleExpanded()\" uib-tooltip=\"{{\'impac.widget.settings.width.reduce\' | translate}}\"/>\n<i class=\"fa fa-angle-double-right expand\" ng-hide=\"expanded || pdfMode\" ng-click=\"parentWidget.toggleExpanded()\" uib-tooltip=\"{{\'impac.widget.settings.width.expand\' | translate}}\"/>\n");
$templateCache.put("widgets/accounts-accounting-values.tmpl.html","<div widget-accounts-accounting-values>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.accounting_values.turnover.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.accounting_values.turnover.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.accounting_values.turnover.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div>\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" accounting-behaviour=\"pnl\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">\n           {{ getCurrentPrice() | mnoCurrency : currency_unit : false }}\n        </div>\n        <div class=\"currency\">{{currency}}</div>\n        <div class=\"legend\">{{legend}}</div>\n      </div>\n\n      <div class=\"history chart-container\" ng-show=\"widget.isHistoryMode\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">{{legend}}</div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-assets-liability-summary.tmpl.html","<div widget-accounts-assets-liability-summary>\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.acc_ass_liab_smry.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.acc_ass_liab_smry.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.acc_ass_liab_smry.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div class=\"chart-container\">\n      <!-- account classification selectors -->\n      <div setting-param-selector parent-widget=\"widget\" param=\"classification\" options=\"accountsOptions\" selected=\"selectedAccountsOption\" class=\"row param-selector\" deferred=\"::paramSelectorDeferred\"/>\n      <!---->\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <div class=\"title\" ng-show=\"widget.metadata.organization_ids.length==1\">{{widget.content.summary[0].company}} {{classification}}</div>\n        <div class=\"title\" ng-hide=\"widget.metadata.organization_ids.length==1\">{{classification}} repartition</div>\n        <span ng-repeat=\"valuePair in dataSource\">\n          <span ng-style=\"{ \'font-weight\': \'bold\', \'color\': getAccountColor(valuePair) }\">{{valuePair.label}}</span>: {{valuePair.total | mnoCurrency : getCurrency()}}\n          <br />\n        </span>\n      </div>\n    </div>\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-assets-summary.tmpl.html","<div widget-accounts-assets-summary>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.acc_ass_smry.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.acc_ass_smry.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.acc_ass_smry.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <div class=\"title\" ng-show=\"widget.metadata.organization_ids.length==1\">{{widget.content.summary[0].company}} {{classification}}</div>\n        <div class=\"title\" ng-hide=\"widget.metadata.organization_ids.length==1\">{{classification}} repartition</div>\n        <span ng-repeat=\"valuePair in dataSource\">\n          <span ng-style=\"{ \'font-weight\': \'bold\', \'color\': getAccountColor(valuePair) }\">{{valuePair.label}}</span>: {{valuePair.total | mnoCurrency : getCurrency()}}\n          <br />\n        </span>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-assets-vs-liabilities.tmpl.html","<div widget-accounts-assets-vs-liabilities>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.acc_ass_vs_liab.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.acc_ass_vs_liab.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.acc_ass_vs_liab.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\" style=\"max-height: 115px;\">\n        <div class=\"title\">\n          <i class=\"fa fa-circle\" ng-style=\"{ \'color\': assetsColor }\"><span translate=\"impac.widget.acc_ass_vs_liab.asset.many\"></span></i> |\n          <i class=\"fa fa-circle\" ng-style=\"{ \'color\': liabilitiesColor }\"><span translate=\"impac.widget.acc_ass_vs_liab.liability.many\"></span></i>\n        </div>\n        <div class=\"row\">\n          <div ng-repeat=\"data in companiesList\" ng-class=\"{\'col-md-6\': (widget.content.companies.length > 1), \'col-md-12\': (widget.content.companies.length == 1)}\">\n            <span>{{ data.company }}</span><br />\n            <span ng-style=\"{ \'color\': assetsColor }\"> {{ data.assets | mnoCurrency : data.currency }}</span> <br/>\n            <span ng-style=\"{ \'color\': liabilitiesColor }\"> {{ data.liabilities | mnoCurrency : data.currency }}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-balance.tmpl.html","<div widget-accounts-balance>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.account_balance.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-account parent-widget=\"widget\" on-account-selected=\"updateKpiExtraParams(\'account\', widget.selectedAccount)\" class=\"part\" deferred=\"::accountBackDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.account_balance.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.account_balance.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <!-- Will be hidden once an account is selected -->\n    <div setting-account ng-hide=\"widget.selectedAccount\" parent-widget=\"widget\" label=\'Select an account to monitor\' on-account-selected=\"displayAccount()\" deferred=\"::accountFrontDeferred\" />\n\n    <!-- All the below divs will remain hidden until an account is selected -->\n    <div ng-show=\"widget.selectedAccount\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" accounting-behaviour=\"{{ getBehaviour() }}\" end-date=\"widget.metadata.hist_parameters.to\" />\n\n      <div ng-hide=\"widget.isHistoryMode\">\n        <h3>{{getName()}}</h3>\n        <div class=\"price\">\n           {{ getCurrentBalance() | mnoCurrency : getCurrency() : false }}\n        </div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n      </div>\n\n      <div class=\"chart-container\" ng-show=\"widget.isHistoryMode\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">{{getName()}}</div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-balance-sheet.tmpl.html","<div widget-accounts-balance-sheet>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.account_balance_sheets.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-tag-filter ng-show=\"filterTagsEnabled == true\" parent-widget=\"widget\" class=\"part\" deferred=\"::tagFilterDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.account_balance_sheets.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.account_balance_sheets.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div class=\"widget-lines-container no-scroll\">\n      <div class=\"row widget-line header\">\n        <div class=\"col-sm-6 col-sm-offset-6 col-xs-12\">\n          <div setting-dates-picker parent-widget=\"widget\" deferred=\"::datesPickerDeferred\" from=\"fromDate\" to=\"toDate\" keep-today=\"keepToday\" update-on-pick=\"true\" template=\"::datesPickerTemplate\" />\n        </div>\n      </div>\n      <div class=\"row widget-line header\">\n        <div class=\"col-sm-5 col-sm-offset-1 col-xs-12 text-left sortable-title\" ng-click=\"sort(\'account\')\">\n          {{\'impac.widget.account_balance_sheets.accounts\' | translate}}\n          <i ng-show=\"sortedColumn == \'account\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n        </div>\n        <div class=\"col-sm-6 col-xs-12\">\n          <div class=\"row\">\n            <div class=\"col-xs-6 text-center sortable-title\" ng-click=\"sort(\'total1\')\">\n              {{\'impac.widget.account_balance_sheets.balance\' | translate}}\n              <i ng-show=\"sortedColumn == \'total1\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-6 text-center sortable-title\" ng-click=\"sort(\'total2\')\">\n              {{\'impac.widget.account_balance_sheets.balance\' | translate}}\n              <i ng-show=\"sortedColumn == \'total2\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"widget-lines-container\">\n      <!-- Groups of statements with their accounts -->\n      <div class=\"row lines-group\" ng-repeat=\"category in categories\" >\n        <div class=\"col-xs-12\">\n\n          <!-- Statements lines -->\n          <div class=\"row widget-line\" >\n            <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(category.key)\" style=\"cursor: pointer;\">\n              <i class=\"fa\" ng-class=\"isCollapsed(category.key) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n            </div>\n            <div class=\"col-sm-5 col-xs-11 text-left\">\n              <strong>{{category.label}}</strong>\n            </div>\n            <div class=\"col-sm-3 col-xs-6 text-right\">\n              <strong>{{widget.content.summary[category.key].totals[1] | mnoCurrency : widget.content.summary[category.key].currency}}</strong>\n            </div>\n            <div class=\"col-sm-3 col-xs-6 text-right\">\n              <strong>{{widget.content.summary[category.key].totals[0] | mnoCurrency : widget.content.summary[category.key].currency}}</strong>\n            </div>\n          </div>\n\n          <!-- Accounts lines -->\n          <div class=\"row\" uib-collapse=\"isCollapsed(category.key)\">\n            <div class=\"col-xs-12\">\n              <div class=\"row widget-line\" ng-repeat=\"account in widget.content.summary[category.key].accounts\" >\n                <div class=\"col-sm-5 col-xs-11 col-xs-offset-1 text-left\">\n                  {{account.name | titleize}}\n                </div>\n                <div class=\"col-sm-3 col-xs-6 text-right\">\n                  {{account.totals[1] | mnoCurrency : account.currency}}\n                </div>\n                <div class=\"col-sm-3 col-xs-6 text-right\">\n                  {{account.totals[0] | mnoCurrency : account.currency}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row widget-line header\" ng-show=\"isReportFiltered()\">\n        <div class=\"col-xs-12 text-center\">\n          <strong translate>impac.widget.settings.tag-filter.report_filtered</strong>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-cash-balance.tmpl.html","<!--\n  Component generated by Impac! Widget Generator!\n-->\n<div widget-accounts-cash-balance>\n  <!-- Settings Panel -->\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <!-- Buttons displayed on the lower  -->\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <!-- Content Panel -->\n  <div ng-hide=\"widget.isEditMode\">\n    <!-- Data found -->\n    <div class=\"data-container\">\n      <div class=\"left-panel\">\n        <div id=\"cash-balance-legend\">\n          <div class=\"header\" ng-repeat=\"header in groupedTable.headers\">\n            <h4 ng-bind=\"header | titleize\"></h4>\n            <div class=\"group-item\" ng-repeat=\"item in groupedTable.groups[$index]\" ng-click=\"legendItemOnClick(item)\">\n              <i ng-style=\"{\'color\': getLegendItemColor(item)}\" class=\"fa {{getLegendItemIcon(item)}}\" aria-hidden=\"true\"></i>\n              <span ng-bind=\"item.name\"></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"right-panel\">\n        <div class=\"top-bar\"></div>\n        <div id=\"{{chartId()}}\" class=\"cash-balance-chart\"></div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-cash-projection.tmpl.html","<div widget-accounts-cash-projection>\n  <!-- Settings Panel -->\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <!-- Buttons displayed on the lower  -->\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <!-- Content Panel -->\n  <div ng-hide=\"widget.isEditMode\">\n    <div>\n      <!-- Set KPI target threshold panel -->\n      <chart-threshold widget=\"widget\" chart-promise=\"chartPromise\" kpi-create-label=\"chartThresholdOptions.label\" on-complete=\"widget.format()\"></chart-threshold>\n\n      <!-- Chart -->\n      <div id=\"{{chartId()}}\" class=\"cash-projection-chart\"></div>\n\n      <!-- Simulation mode box -->\n      <div class=\"offset-box\" ng-show=\"simulationMode\">\n        <h3>Offset your cash projection</h3>\n\n        <h4>For the current interval</h4>\n        <div class=\"price\" ng-if=\"currentProjectedCash\">\n          {{ currentProjectedCash | mnoCurrency : widget.metadata.currency }}\n        </div>\n        <div setting-offsets parent-widget=\"widget\" deferred=\"::currentOffsetsDeferred\" offsets-key=\'current\' initial-offsets=\'widget.metadata.offset.current\' currency=\'widget.metadata.currency\' intervals-count=\'intervalsCount\' show-intervals-mult=\"false\" period=\'widget.metadata.hist_parameters.period\' text-placeholder=\'Spot adjustment\' />\n\n        <h4>For each interval in the future</h4>\n        <div setting-offsets parent-widget=\"widget\" deferred=\"::intervalsOffsetsDeferred\" offsets-key=\'per_interval\' initial-offsets=\'widget.metadata.offset.per_interval\' currency=\'widget.metadata.currency\' intervals-count=\'intervalsCount\' show-intervals-mult=\"true\" period=\'widget.metadata.hist_parameters.period\' />\n      </div>\n\n      <!-- Simulation buttons -->\n      <div class=\"text-left\" ng-hide=\"isTimePeriodInThePast\">\n        <button class=\"btn btn-sm btn-default\" ng-if=\"simulationMode\" ng-click=\"toggleSimulationMode(true)\" title = \"Clear changes to simulation\">\n          Cancel\n        </button>\n        <button class=\"btn btn-sm btn-default\" ng-if=\"!simulationMode\" ng-click=\"toggleSimulationMode()\" title=\"Add custom offsets to the cash projection\">\n          <i class=\"fa fa-pencil-square-o\" />\n          Simulation\n        </button>\n        <button class=\"btn btn-sm btn-warning\" ng-if=\"simulationMode\" ng-click=\"saveSimulation()\" title=\"Apply simulation\">\n          Save\n        </button>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-cash-summary.tmpl.html","<div widget-accounts-cash-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.account_cash_smry.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.account_cash_smry.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.account_cash_smry.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n        <!-- Tab header -->\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-5 col-xs-offset-1 sortable-title\" ng-click=\"sort(\'account\')\">\n              {{ impac.widget.account_cash_smry.cash_flow | translate }}\n              <i ng-show=\"sortedColumn == \'account\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-3 text-right sortable-title\" ng-click=\"sort(\'total\')\">\n              {{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}}\n              <i ng-show=\"sortedColumn == \'total\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-3 text-right sortable-title\" ng-click=\"sort(\'variance\')\">\n              {{\'impac.widget.account_cash_smry.vs\' | translate}}{{getPrevDate() | mnoDate : widget.metadata.hist_parameters.period}}\n              <i ng-show=\"sortedColumn == \'variance\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n          </div>\n\n          <!-- Groups of statements with their accounts -->\n          <div class=\"row lines-group\" ng-repeat=\"statement in widget.content.summary\" ng-class=\"{cash: statement.name.indexOf(\'cash\')>0}\" >\n            <div class=\"col-xs-12\">\n\n              <!-- Statements lines -->\n              <div class=\"row widget-line\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(statement)\">\n                  <i ng-show=\"(statement.accounts && statement.accounts.length)\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\"/>\n                </div>\n                <div class=\"col-xs-5\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{statement.label | titleize}}</strong>\n                </div>\n                <div class=\"col-xs-3 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getLastValue(statement) | mnoCurrency : statement.currency : false}}</strong>\n                </div>\n                <div class=\"col-xs-3 text-right\" ng-click=\"toggleSelectedElement(statement)\" ng-class=\"getVarianceClassColor(getLastVariance(statement))\">\n                  <strong>{{getLastVariance(statement)}}</strong>\n                </div>\n\n                <div class=\"selection-tag\" ng-if=\"isSelected(statement)\" ng-style=\"{ \'background-color\': getSelectLineColor(statement) }\"/>\n              </div>\n\n              <!-- Accounts lines -->\n              <div class=\"row\" uib-collapse=\"isCollapsed(statement)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(account, statement.name)\" ng-repeat=\"account in statement.accounts\" >\n                    <div class=\"col-xs-5 col-xs-offset-1\">\n                      {{account.name}}\n                    </div>\n                    <div class=\"col-xs-3 text-right\">\n                      {{getLastValue(account) | mnoCurrency : account.currency : false }}\n                    </div>\n                    <div class=\"col-xs-3 text-right\" ng-class=\"getVarianceClassColor(getLastVariance(account))\">\n                      {{getLastVariance(account)}}\n                    </div>\n\n                    <div class=\"selection-tag\" ng-if=\"isSelected(account, statement.name)\" ng-style=\"{ \'background-color\': getSelectLineColor(account) }\"/>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"selectedElement\">\n          <h4>{{(selectedElement.label | titleize) || selectedElement.name}}</h4>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div class=\"legend\">{{::widget.metadata.hist_parameters.period_translation}}</div>\n          </div>\n\n          <div class=\"widget-lines-container\">\n\n            <!-- Not mobile -->\n            <div class=\"row\">\n              <span ng-repeat=\"date in dates track by $index\" class=\"hidden-xs\">\n                <!-- Separator every 4 items -->\n                <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n                <div class=\"col-sm-3 text-center\">\n                  <!-- Date -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{date | mnoDate : widget.metadata.hist_parameters.period}}\n                    </div>\n                  </div>\n                  <!-- Amount + currency -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{selectedElement.cash_flows[$index] | mnoCurrency : selectedElement.currency }}\n                    </div>\n                  </div>\n                  <!-- Variance -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\" ng-class=\"getVarianceClassColor(selectedElement.variances[$index])\">\n                      {{formatVariance(selectedElement.variances[$index])}}\n                    </div>\n                  </div>\n                </div>\n              </span>\n            </div>\n\n            <!-- Mobile -->\n            <div ng-repeat=\"date in dates track by $index\" class=\"row widget-line visible-xs\">\n              <!-- Date -->\n              <div class=\"col-xs-4\">\n                {{date | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n              <!-- Amount + currency -->\n              <div class=\"col-xs-4 text-right\">\n                {{selectedElement.cash_flows[$index] | mnoCurrency : selectedElement.currency }}\n              </div>\n              <!-- Variance -->\n              <div class=\"col-xs-4 text-right\" ng-class=\"getVarianceClassColor(selectedElement.variances[$index])\">\n                {{formatVariance(selectedElement.variances[$index])}}\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n        <div ng-hide=\"selectedElement\" class=\"no-element\" translate>\n          impac.widget.account_cash_smry.select.description\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-class-comparison.tmpl.html","<div widget-accounts-class-comparison>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.account_class_comp.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" hide-chart-interval=\"true\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.account_class_comp.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.account_class_comp.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div>\n      <!-- account classification selectors -->\n      <div setting-param-selector parent-widget=\"widget\" param=\"classification\" options=\"classifications\" selected=\"selectedClassification\" class=\"row param-selector\" deferred=\"::paramSelectorDeferred\" on-select=\"widget.format()\" no-reload/>\n      <!---->\n      <div class=\"row\">\n        <div class=\"col-md-12 chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-md-12 widget-lines-container\">\n          <div class=\"row\" style=\"margin-bottom: 5px;\">\n            <div class=\"col-xs-12\">\n              <div common-time-period-info context=\"timePeriodInfoParams\" />\n            </div>\n          </div>\n\n          <div class=\"row\" ng-repeat=\"entity in widget.content.companies track by $index\">\n            <div class=\"col-xs-6 text-left\">\n              <i class=\"fa fa-circle\" ng-style=\"{ \'margin\': \'0px 8px\', \'color\': getAccountColor(entity) }\" />\n              {{entity}}\n            </div>\n            <div class=\"col-xs-6 text-right\">\n              <i>{{getAmount($index)}}</i>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-comparison.tmpl.html","<div widget-accounts-comparison>\n  <div setting-accounts-list parent-widget=\"widget\" deferred=\"::accountsListDeferred\" accounts-list=\"savedAccountsList\"/>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.account_comp.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" hide-chart-interval=\"true\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.account_comp.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.account_comp.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n      <!-- multi-companies mode -->\n      <div ng-show=\"widget.metadata.organization_ids.length > 1 && canSelectComparisonMode || isComparisonMode()\">\n        <div setting-params-checkboxes options=\"comparisonModeOptions\" param=\"comparison_mode\" parent-widget=\"widget\" deferred=\"::paramsCheckboxesDeferred\"/>\n      </div>\n      <!-- end -->\n      <div ng-hide=\"hasAccountsSelected() || noComparableAccounts\" class=\"row\">\n        <div class=\"col-xs-12\">\n          <h5 translate>impac.widget.account_comp.account.select</h5>\n        </div>\n        <div class=\"col-md-6\">\n          <div class=\"input-group\">\n            <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' group by account.classification for account in widget.remainingAccounts\" class=\"form-control\" ng-show=\"widget.hasEditAbility\" ng-change=\"addAccount(movedAccount)\"></select>\n          </div>\n        </div>\n      </div>\n      <!-- error: when there are no comparable accounts matched -->\n      <div ng-show=\"isComparisonMode() && noComparableAccounts\" class=\"row comparable-error\">\n        <div class=\"col-xs-12\"><h5 translate>impac.widget.account_comp.account.not_found</h5></div>\n      </div>\n\n      <div class=\"row\" ng-show=\"hasAccountsSelected()\">\n        <div class=\"col-xs-12 text-center\">\n          <div class=\"chart-container\" impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n      </div>\n\n      <div class=\"row\" ng-show=\"hasAccountsSelected()\">\n        <div class=\"col-xs-12 widget-lines-container\">\n\n          <div class=\"row\" ng-class=\"{\'lines-group\': isComparisonMode(), \'widget-line\': !isComparisonMode()}\" ng-repeat=\"account in widget.selectedAccounts track by $index\">\n\n            <!-- Comparison between several conpanies -->\n            <div class=\"col-xs-12\" ng-if=\"isComparisonMode()\">\n              <div class=\"row widget-line\" ng-repeat=\"groupedAccount in account.accounts track by $index\">\n                <div class=\"col-xs-1\">\n                  <i class=\"fa fa-circle\" ng-style=\"{ \'color\': getAccountColor(groupedAccount) }\" />\n                </div>\n                <div class=\"col-xs-6\">\n                  {{groupedAccount.name}}\n                </div>\n                <div class=\"col-xs-4 text-right\">\n                  <i>{{formatAmount(groupedAccount)}}</i>\n                </div>\n                <div class=\"col-xs-1 text-right\">\n                  <button class=\"close\" ng-click=\"removeAccount(account)\" ng-show=\"widget.hasDeleteAbility\">x</button>\n                </div>\n              </div>\n            </div>\n\n            <!-- Simple comparison between accounts -->\n            <div ng-if=\"!isComparisonMode()\" class=\"col-xs-1\">\n              <i class=\"fa fa-circle\" ng-style=\"{ \'color\': getAccountColor(account) }\" />\n            </div>\n            <div ng-if=\"!isComparisonMode()\" class=\"col-xs-6\">\n              {{account.name}}\n            </div>\n            <div ng-if=\"!isComparisonMode()\" class=\"col-xs-4 text-right\">\n              <i>{{formatAmount(account)}}</i>\n            </div>\n            <div ng-if=\"!isComparisonMode()\" class=\"col-xs-1 text-right\">\n              <button class=\"close\" ng-click=\"removeAccount(account)\" ng-show=\"widget.hasDeleteAbility\">x</button>\n            </div>\n\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\" ng-show=\"hasAccountsSelected() && !pdfMode\">\n        <div class=\"col-xs-12 input-group add-account\">\n          <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + formatAmount(account) + \')\' group by account.classification for account in widget.remainingAccounts track by account.uid\" class=\"form-control\" ng-show=\"widget.hasDeleteAbility\" ng-change=\"addAccount(movedAccount)\" ng-disabled=\"widget.selectedAccounts.length >= 15 || widget.remainingAccounts.length == 0 || isComparisonMode()\">\n            <option value=\"\" disabled selected translate>impac.widget.account_comp.account.add</option>\n          </select>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-custom-calculation.tmpl.html","<div widget-accounts-custom-calculation>\n\n  <div setting-organizations parent-widget=\"widget\" ng-hide=\"true\" deferred=\"::orgDeferred\" />\n  <div setting-accounts-list parent-widget=\"widget\" deferred=\"::accountsListDeferred\" />\n  <div setting-formula parent-widget=\"widget\" deferred=\"::formulaDeferred\" />\n\n  <h3 ng-show=\"widget.hasEditAbility && !widget.isFormulaCorrect\">\n    <a href=\"\" ng-click=\"formulaModal.open()\" translate>impac.widget.account_cust_calc.title</a>\n  </h3>\n\n  <div class=\"price\" ng-show=\"widget.isFormulaCorrect\">\n    {{widget.evaluatedFormulaTranslate}}\n  </div>\n  <div class=\"legend\" ng-show=\"widget.isFormulaCorrect\">\n    {{widget.legend}}\n  </div>\n\n  <div ng-show=\"widget.demoData\" common-data-not-found />\n</div>\n");
$templateCache.put("widgets/accounts-custom-calculation/formula.modal.html","<div class=\"analytics modal-custom-calculation\">\n  <div class=\"modal-header\">\n    <div class=\"close\" type=\"button\" ng-click=\"cancel()\" >×</div>\n    <h3 translate>impac.widget.account_cust_calc.formula.title</h3>\n  </div>\n\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <div class=\"alert alert-error\" ng-show=\"errors\">\n          <button class=\"close\" ng-click=\"errors=\'\'\">×</button>\n          <ul>\n            <li ng-repeat=\"error in errors\">{{error}}</li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"edit row\">\n      <div setting-organizations parent-widget=\"widget\" class=\"part col-md-6\" deferred=\"::modalOrgDeferred\" on-select=\"reloadAccountsLists(orgs)\" />\n      <div setting-time-period parent-widget=\"widget\" class=\"part col-md-6\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" hide-chart-interval=\"true\" apply-changes-callback=\"updateWidgetSettings()\" />\n    </div>\n\n    <p translate=\"impac.widget.account_cust_calc.formula.explanations\" translate-values=\"{example: \'({1} + {2}) / {3})\' }\"></p>\n\n    <div class=\'row\'>\n      <div ng-show=\"widget.isLoading\" class=\'col-md-6 loader\' align=\"center\">\n        <div>\n          <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\n          <p translate>impac.widget.account_cust_calc.formula.data_retrieved</p>\n        </div>\n      </div>\n\n      <div ng-hide=\"widget.isLoading\" class=\'col-md-6\'>\n        <div class=\'widget-line\' ng-repeat=\'account in widget.selectedAccounts track by $index\'>\n          <div class=\'row\'>\n            <div class=\'col-md-6\'>\n              {{$index+1}} - {{account.name}}\n            </div>\n            <div class=\'col-md-6\'>\n              {{account.current_balance | mnoCurrency : account.currency}}\n              <button class=\"close\" ng-click=\"removeAccountFromFormula(account)\" ng-show=\"widget.hasEditAbility\"><span class=\'fa fa-times-circle\'></span></button>\n            </div>\n          </div>\n        </div>\n\n        <div class=\'input-group\' ng-show=\"widget.hasEditAbility\">\n          <select ng-model=\"movedAccount\" ng-options=\"account.name + \' (\' + widget.formatAmount(account) + \')\' group by account.classification for account in widget.remainingAccounts\" class=\'form-control\' ng-change=\'addAccountToFormula(movedAccount)\'><select>\n        </div>\n      </div>\n\n      <div ng-hide=\"widget.isLoading\" class=\'col-md-6\'>\n        <p translate>impac.widget.account_cust_calc.formula.type_here</p>\n        <input class=\'form-control\' ng-model=\"widget.formula\">\n\n        <p translate=\"impac.widget.account_cust_calc.formula.result\" translate-values=\"{result: widget.evaluatedFormula}\"></p>\n        <p translate=\"impac.widget.account_cust_calc.formula.legend\" translate-values=\"{legend: widget.legend}\"></p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <div class=\"row\">\n      <div class=\"col-sm-12\">\n        <button class=\"btn btn-gray\" ng-click=\"cancel()\" ng-hide=\"widget.isLoading\" ng-disabled=\"isLoading\" translate>impac.widget.account_cust_calc.formula.cancel</button>\n        <button class=\"btn btn-warning\" ng-click=\"proceed()\" ng-hide=\"widget.isLoading\" ng-disabled=\'!widget.isFormulaCorrect || widget.isLoading\'>\n          <i class=\"fa fa-spinner fa-pulse loader\" ng-show=\"isLoading\"></i>\n          {{\'impac.widget.account_cust_calc.formula.save\' | translate}}\n        </button>\n      </div>\n\n    </div>\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-detailed-classifications.tmpl.html","<div widget-accounts-detailed-classifications>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.account_det_class.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.account_det_class.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.account_det_class.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div class=\"widget-lines-container\">\n\n      <!-- Tab header -->\n      <div ng-hide=\"multiEntity\" class=\"row widget-line header\">\n        <div class=\"col-md-6 text-left\"  translate=\"impac.widget.account_det_class.acc_classifications\" translate-values=\"{name: widget.content.companies[0].name}\">\n\n        </div>\n\n        <div class=\"col-md-6 text-right\">\n          <div common-time-period-info context=\"timePeriodInfoParams\" />\n        </div>\n      </div>\n\n      <!-- Sorting sub-header (contains sorting) -->\n      <div ng-hide=\"multiEntity\" class=\"row widget-line header sorting\">\n        <div class=\"col-md-6 text-left sortable-title\" ng-click=\"sort(\'account\')\">\n          {{\'impac.widget.account_det_class.account_classifications\' | translate}}\n          <i ng-show=\"sortedColumn == \'account\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n        </div>\n\n        <div class=\"col-md-6 text-right sortable-title\" ng-click=\"sort(\'total\')\">\n          {{\'impac.widget.account_det_class.amounts\' | translate}}\n          <i ng-show=\"sortedColumn == \'total\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n        </div>\n      </div>\n\n      <!-- Groups of statements with their accounts -->\n      <div class=\"row lines-group\" ng-repeat=\"source in dataSource track by source.label\">\n        <div class=\"col-xs-12\">\n\n          <!-- Statements lines -->\n          <div class=\"row widget-line\">\n            <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(source.label)\" style=\"cursor: pointer;\">\n              <i class=\"fa\" ng-class=\"isCollapsed(source.label) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n            </div>\n            <div class=\"col-xs-5 text-left\">\n              <strong>{{source.label | titleize}}</strong>\n            </div>\n            <div class=\"col-xs-6 text-right\">\n              <strong>{{source.value | mnoCurrency : source.currency}}</strong>\n            </div>\n          </div>\n\n          <!-- Accounts lines -->\n          <div class=\"row\" uib-collapse=\"isCollapsed(source.label)\">\n            <div class=\"col-xs-12\">\n              <div class=\"row widget-line\" ng-repeat=\"entry in source.entries\" >\n                <div class=\"col-xs-5 col-xs-offset-1 text-left\">\n                  {{entry.label | titleize}}\n                </div>\n                <div class=\"col-xs-6 text-right\">\n                  {{entry.value | mnoCurrency : entry.currency}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n</div>\n");
$templateCache.put("widgets/accounts-expense-weight.tmpl.html","<div widget-accounts-expense-weight>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.account_expense_weight.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-account parent-widget=\"widget\" class=\"part\" deferred=\"::accountBackDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.account_expense_weight.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.account_expense_weight.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <!-- Will be hidden once an account is selected -->\n    <div setting-account ng-hide=\"widget.selectedAccount\" parent-widget=\"widget\" label=\'Select an expense account\' on-account-selected=\"displayAccount()\" deferred=\"::accountFrontDeferred\" />\n\n    <div ng-show=\"widget.selectedAccount\">\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" on-toggle=\"widget.format()\" accounting-behaviour=\"pnl\" />\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n\n      <div class=\"legend\">\n        <div class=\"title\">\n          {{getName()}} to {{getComparator() | titleize}}\n          <span ng-if=\"widget.metadata.organization_ids.length==1\"><br /><strong>{{widget.content.summary[0].ratio | mnoCurrency : \'%\'}}</strong></span>\n        </div>\n        <span ng-repeat=\"sum in widget.content.summary\" ng-if=\"widget.metadata.organization_ids.length>1\">\n          <span style=\"font-weight: bold;\">{{sum.company}}: {{sum.ratio | mnoCurrency : \'%\'}}</span>\n          <br />\n        </span>\n      </div>\n    </div>\n    \n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-expenses-revenue.tmpl.html","<div widget-accounts-expenses-revenue>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.accounts_expenses_revenue.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.accounts_expenses_revenue.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.accounts_expenses_revenue.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div>\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" on-toggle=\"widget.format()\" accounting-behaviour=\"pnl\" />\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n\n      <div class=\"legend\" ng-if=\"widget.isHistoryMode\">\n        <span ng-hide=\"isNetProfitDisplayed\">\n          <span class=\"negative2\" translate>impac.widget.accounts_expenses_revenue.expenses</span> -\n          <span class=\"positive2\" translate>impac.widget.accounts_expenses_revenue.revenue</span>\n        </span>\n        <span ng-show=\"isNetProfitDisplayed\">\n          <strong translate>impac.widget.accounts_expenses_revenue.net_profit</strong>\n        </span>\n      </div>\n\n      <div ng-show=\"widget.isHistoryMode\" setting-params-checkboxes options=\"displayOptions\" param=\"display\" parent-widget=\"widget\" deferred=\"::paramsCheckboxesDeferred\"/>\n\n      <div class=\"legend\" ng-if=\"!widget.isHistoryMode\">\n        <span class=\"negative2\">{{\'impac.widget.accounts_expenses_revenue.expenses\' | translate}}: {{getCurrentExpenses() | mnoCurrency : getCurrency()}}</span>\n        </br>\n        <span class=\"positive2\">{{\'impac.widget.accounts_expenses_revenue.revenue\' | translate}}: {{getCurrentRevenue() | mnoCurrency : getCurrency()}}</span>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-payable-receivable.tmpl.html","<div widget-accounts-payable-receivable>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.accounts_payable_receivable.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.accounts_payable_receivable.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.accounts_payable_receivable.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div>\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" accounting-behaviour=\"bls\" end-date=\"widget.metadata.hist_parameters.to\" />\n\n      <div ng-hide=\"widget.isHistoryMode\">\n        <div class=\"receivable\">\n          <h3 translate>impac.widget.accounts_payable_receivable.receivables.title</h3>\n          <div class=\"price positive2\">\n            {{getCurrentReceivable() | mnoCurrency : getCurrency() : false}}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n\n        <div class=\"payable\">\n          <h3 translate>impac.widget.accounts_payable_receivable.payables.title</h3>\n          <div class=\"price negative2\">\n            {{getCurrentPayable() | mnoCurrency : getCurrency() : false}}\n          </div>\n          <div class=\"currency\">{{getCurrency()}}</div>\n        </div>\n      </div>\n\n      <div class=\"chart-container\" ng-show=\"widget.isHistoryMode\">\n        <div impac-chart draw-trigger=\"drawTrigger.promise\" deferred=\"chartDeferred\"></div>\n        <div class=\"legend\">\n          <span class=\"negative2\" translate>impac.widget.accounts_payable_receivable.payable</span> -\n          <span class=\"positive2\" translate>impac.widget.accounts_payable_receivable.receivable</span>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-profit-and-loss.tmpl.html","<div widget-accounts-profit-and-loss>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.accounts_profit_and_loss.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n    <div setting-tag-filter ng-show=\"filterTagsEnabled == true\" parent-widget=\"widget\" class=\"part\" deferred=\"::tagFilterDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.accounts_profit_and_loss.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.accounts_profit_and_loss.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n          <!-- Total mode -->\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-12 text-right\">\n              <span setting-param-selector parent-widget=\"widget\" param=\"amount_displayed\" options=\"amountDisplayedOptions\" selected=\"amountDisplayed\" deferred=\"::paramSelectorDeferred\" no-reload />\n            </div>\n          </div>\n\n          <!-- Tab header -->\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-7 col-xs-offset-1 text-left sortable-title\" ng-click=\"sort(\'account\')\">\n              {{\'impac.widget.accounts_profit_and_loss.accounts\' | translate}}\n              <i ng-show=\"sortedColumn == \'account\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-4 text-right sortable-title\" ng-click=\"sort(\'total\')\">\n              {{\'impac.widget.accounts_profit_and_loss.prof_loss\' | translate}}\n              <i ng-show=\"sortedColumn == \'total\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n          </div>\n\n          <!-- Groups of statements with their accounts -->\n          <div class=\"row lines-group\" ng-repeat=\"statement in widget.content.summary\" ng-class=\"{profit: statement.name.indexOf(\'profit\')>0}\">\n            <div class=\"col-xs-12\">\n\n              <!-- Statements lines -->\n              <div class=\"row widget-line\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(statement)\">\n                  <i ng-show=\"(statement.accounts && statement.accounts.length)\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-7\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getName(statement) | titleize}}</strong>\n                </div>\n                <div class=\"col-xs-4 text-right\" ng-class=\"getClassColor(getAmount(statement))\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getAmount(statement) | mnoCurrency : statement.currency}}</strong>\n                </div>\n\n                <div class=\"selection-tag\" ng-if=\"isSelected(statement)\" ng-style=\"{ \'background-color\': getSelectLineColor(statement) }\"/>\n              </div>\n\n              <!-- Accounts lines -->\n              <div class=\"row\" uib-collapse=\"isCollapsed(statement)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(account, statement.name)\" ng-repeat=\"account in statement.accounts\" >\n                    <div class=\"col-xs-7 col-xs-offset-1\">\n                      {{account.name}}\n                    </div>\n                    <div class=\"col-xs-4 text-right\" ng-class=\"getClassColor(getAmount(account))\">\n                      {{getAmount(account) | mnoCurrency : account.currency}}\n                    </div>\n\n                    <div class=\"selection-tag\" ng-if=\"isSelected(account, statement.name)\" ng-style=\"{ \'background-color\': getSelectLineColor(account, statement.name) }\"/>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n\n          <div class=\"row widget-line header\" ng-show=\"isReportFiltered()\">\n            <div class=\"col-xs-12 text-center\">\n              <strong translate>impac.widget.settings.tag-filter.report_filtered</strong>\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"hasElements()\">\n          <h4>{{::period_translation}} {{\'impac.widget.accounts_profit_and_loss.prof_and_loss\' | translate}}</h4>\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <!-- Not mobile -->\n            <div class=\"row\">\n              <span ng-repeat=\"date in dates track by $index\" class=\"hidden-xs\">\n                <!-- Separator every 4 items -->\n                <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n                <div class=\"col-sm-3 text-center\">\n                  <!-- Date -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{date | mnoDate : widget.metadata.hist_parameters.period}}\n                    </div>\n                  </div>\n                  <!-- Amount + currency -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                      {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n                    </div>\n                  </div>\n                </div>\n              </span>\n            </div>\n\n            <!-- Mobile -->\n            <div ng-repeat=\"date in dates track by $index\" class=\"row widget-line visible-xs\">\n              <!-- Date -->\n              <div class=\"col-xs-6\">\n                {{date | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n              <!-- Amount + currency -->\n              <div class=\"col-xs-6 text-right\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n            <div class=\"row widget-line\" ng-repeat=\"element in selectedElements track by $index\">\n              <div class=\"col-xs-7 text-left\">\n                <i class=\"fa fa-circle\" ng-style=\"{ \'margin\': \'0px 8px\', \'color\': getElementChartColor($index) }\" />\n                {{getName(element) | titleize}}\n              </div>\n              <div class=\"col-xs-5 text-right\">\n                <i ng-class=\"getClassColor(getAmount(element))\">\n                  {{getAmount(element) | mnoCurrency : element.currency}}\n                </i>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\" translate>\n          impac.widget.accounts_profit_and_loss.no_elements_selected\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/accounts-ratios.tmpl.html","<!--\n  Component generated by Impac! Widget Generator!\n-->\n<div widget-accounts-ratios>\n  <!-- Settings Panel -->\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4>Widget settings</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <!-- Buttons displayed on the lower  -->\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\">Cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\">Save</button>\n    </div>\n  </div>\n\n  <!-- Content Panel -->\n  <div ng-hide=\"widget.isEditMode\">\n    <!-- Data found -->\n    <div>\n\n      <!-- Ratio details -->\n      <div class=\"col-md-6 left-panel\" ng-class=\"{simulation: simulationMode}\">\n        <div common-time-period-info ng-if=\"simulationMode\" context=\"periodInfoContext\" />\n\n        <div class=\"member\">\n          <div class=\"price\" ng-if=\"!simulationMode\">\n            {{ totalNumerator | mnoCurrency : widget.content.layout.currency }}\n          </div>\n\n          <div class=\"price\" ng-if=\"simulationMode\">\n            {{ calculatedNumerator | mnoCurrency : widget.content.layout.currency }}\n          </div>\n\n          <div class=\"legend\">\n            {{ widget.content.layout.numerator }}\n          </div>\n\n          <div setting-offsets ng-show=\'simulationMode\' parent-widget=\"widget\" deferred=\"::numeratorOffsetsDeferred\" offsets-key=\'numerator\' initial-offsets=\'widget.metadata.offset.numerator\' currency=\'widget.content.layout.currency\' intervals-count=\'intervalsCount\' show-intervals-mult=\"isPnl\" period=\'widget.metadata.hist_parameters.period\' />\n        </div>\n\n        <div class=\"center-block separator\" />\n\n        <div class=\"member\">\n          <div class=\"price\" ng-if=\"!simulationMode\">\n            {{ totalDenominator | mnoCurrency : widget.content.layout.currency }}\n          </div>\n\n          <div class=\"price\" ng-if=\"simulationMode\">\n            {{ calculatedDenominator | mnoCurrency : widget.content.layout.currency }}\n          </div>\n\n          <div class=\"legend\">\n            {{ widget.content.layout.denominator }}\n          </div>\n\n          <div setting-offsets ng-show=\'simulationMode\' parent-widget=\"widget\" deferred=\"::denominatorOffsetsDeferred\" offsets-key=\'denominator\' initial-offsets=\'widget.metadata.offset.denominator\' currency=\'widget.content.layout.currency\' intervals-count=\'intervalsCount\' show-intervals-mult=\"isPnl\" period=\'widget.metadata.hist_parameters.period\' />\n        </div>\n\n        <div class=\"text-center\">\n          <button class=\"btn btn-sm btn-default\" ng-if=\"simulationMode\" ng-click=\"toggleSimulationMode(true)\" title = \"Clear changes to simulation\">\n            Cancel\n          </button>\n          <button class=\"btn btn-sm btn-default\" ng-if=\"!simulationMode\" ng-click=\"toggleSimulationMode()\" title=\"Add custom offsets to the ratio calculation\">\n            <i class=\"fa fa-pencil-square-o\" />\n            Simulation\n          </button>\n          <button class=\"btn btn-sm btn-warning\" ng-if=\"simulationMode\" ng-click=\"saveSimulation()\" title=\"Apply simulation\">\n            Save\n          </button>\n        </div>\n      </div>\n\n      <!-- Current value / Chart -->\n      <div class=\"col-md-6 right-panel\">\n        <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" accounting-behaviour=\"{{widget.content.layout.accounting_behaviour}}\" end-date=\"endDate\" />\n\n        <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n          <div class=\"price\">\n             {{ totalRatio | mnoCurrency : \'(ratio)\' : false }}\n          </div>\n          <div class=\"legend\">{{ widget.content.layout.ratio }}</div>\n        </div>\n\n        <div class=\"history chart-container\" ng-show=\"widget.isHistoryMode\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          <div class=\"legend\">{{ widget.content.layout.ratio }}</div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n</div>\n");
$templateCache.put("widgets/hr-employee-details.tmpl.html","<div widget-hr-employee-details>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.hr_employee_details.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_employee_details.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_employee_details.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n        <div setting-param-selector parent-widget=\"widget\" param=\"employee_uid\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"row title\" deferred=\"::paramSelectorDeferred1\" />\n\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.job_title</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().job_title || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.company</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().company || getSingleCompanyName()}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.phone</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().phone || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.email</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().email || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.date_of_birth</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().dob || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.gender</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().gender || \"-\" }}</pre></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <!-- <div class=\"legend\">{{\'impac.widget.hr_employee_details.legend\' | translate}} <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred2\" /></div> -->\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\">\n              <label translate>impac.widget.hr_employee_details.label.salary</label>\n            </div>\n            <div class=\"col-md-8\">\n              <pre ng-if=\"salaries.length > 0\" ng-repeat=\"salary in salaries\" title=\"{{salary.tooltip}}\">{{ salary.amount | mnoCurrency : salary.currency }} ({{ salary.period }})</pre>\n              <pre ng-if=\"salaries.length == 0\">-</pre>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12\">\n              <label>\n                Estimated earnings\n                - <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred2\" />\n              </label>\n            </div>\n            <div class=\"col-md-8 col-md-offset-4\">\n              <pre>{{ getEmployee().earnings || \'-\' }}</pre>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.address</label></div>\n            <div class=\"col-md-8\"><pre>{{formatAddress(getEmployee().address) || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.job_location</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().location || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.supervisor</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().supervisor || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.status</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().employment_status || \"-\" }}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.hr_employee_details.label.note</label></div>\n            <div class=\"col-md-8\"><pre>{{getEmployee().note || \"-\" }}</pre></div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-employees-list.tmpl.html","<div widget-hr-employees-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.hr_employees_list.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_employees_list.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_employees_list.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n\n      <div class=\"legend\">\n        <strong>{{widget.content.total.employees}}</strong> <span translate=\"impac.widget.hr_employees_list.legend.employee\" translate-values=\"{num_employee: widget.content.total.employees}\"></span> {{\'impac.widget.hr_employees_list.legend.average\' | translate}} (<span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred\"/>): <strong>{{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}</strong>\n      </div>\n\n      <div class=\"widget-lines-container\">\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-2\" translate>impac.widget.hr_employees_list.label.company</div>\n          <div class=\"col-sm-3\" translate>impac.widget.hr_employees_list.label.employee</div>\n          <div class=\"col-sm-2\" translate>impac.widget.hr_employees_list.label.title</div>\n          <div class=\"col-sm-3\" translate>impac.widget.hr_employees_list.label.phone</div>\n          <div class=\"col-sm-2\" translate>impac.widget.hr_employees_list.label.salary</div>\n        </div>\n        <div class=\"row widget-line\" ng-repeat=\"employee in widget.content.employees\" >\n          <div class=\"col-sm-2\">{{employee.company || getSingleCompanyName()}}</div>\n          <div class=\"col-sm-3\">{{employee.lastname}} {{employee.firstname}}</div>\n          <div class=\"col-sm-2\"><i>{{employee.job_title}}</i></div>\n          <div class=\"col-sm-3\">{{employee.phone}}</div>\n          <div class=\"col-sm-2\"><i>{{getEmployeeEarnings(employee)}}</i></div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-leaves-balance.tmpl.html","<div widget-hr-leaves-balance>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate=\"\">impac.widget.hr_leaves_balance.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\"/>\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_leaves_balance.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_leaves_balance.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"employee-name\" deferred=\"::paramSelectorDeferred\" />\n\n      <h3>{{vacationLeaves_translation}} {{\'impac.widget.hr_leaves_balance.balance\' | translate}}</h3>\n      <div class=\"balance\">{{(getEmployee().leaves[0].units || 0) | mnoCurrency : (getEmployee().leaves[0].type_of_units || \'h\')}}</div>\n\n      <h3>{{sickLeaves_translation}} {{\'impac.widget.hr_leaves_balance.balance\' | translate}}</h3>\n      <div class=\"balance\">{{(getEmployee().leaves[1].units || 0) | mnoCurrency : (getEmployee().leaves[1].type_of_units || \'h\')}}</div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-leaves-schedule.tmpl.html","<div widget-hr-leaves-schedule>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 tranlate>impac.widget.hr_leaves_schedule.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" tranlate>impac.widget.hr_leaves_schedule.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" tranlate>impac.widget.hr_leaves_schedule.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n\n      <div widget-component-calendar ng-model=\"eventSources\"></div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-payroll-summary.tmpl.html","<div widget-hr-payroll-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.hr_payroll_summary.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_payroll_summary.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_payroll_summary.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n\n          <!-- Tab header -->\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-9 sortable-title\" ng-click=\"sort(\'employee\')\">\n              {{widget.metadata.hist_parameters.period}} {{\'impac.widget.hr_payroll_summary.payroll_summary\' | translate}}\n              <i ng-show=\"sortedColumn == \'employee\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-3 text-right sortable-title\" ng-click=\"sort(\'total\')\">\n              {{\'impac.widget.hr_payroll_summary.total\' | translate}}\n              <i ng-show=\"sortedColumn == \'total\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n          </div>\n\n          <!-- Groups of statements with their accounts -->\n          <div class=\"row lines-group\" ng-repeat=\"statement in widget.content.summary\" >\n            <div class=\"col-xs-12\">\n\n              <!-- Statements lines -->\n              <div class=\"row widget-line\">\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(statement)\">\n                  <i ng-show=\"(statement.employees && statement.employees.length)\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-7\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getName(statement) | titleize}}</strong>\n                </div>\n                <div class=\"col-xs-4 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getLastValue(statement) | mnoCurrency : statement.currency}}</strong>\n                </div>\n\n                <div class=\"selection-tag\" ng-if=\"isSelected(statement)\" ng-style=\"{ \'background-color\': getSelectLineColor(statement) }\"/>\n              </div>\n\n              <!-- Accounts lines -->\n              <div class=\"row\" uib-collapse=\"isCollapsed(statement)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(employee, statement.name)\" ng-repeat=\"employee in statement.employees\" >\n                    <div class=\"col-xs-7 col-xs-offset-1\">\n                      {{employee.name}}\n                    </div>\n                    <div class=\"col-xs-4 text-right\">\n                      {{getLastValue(employee) | mnoCurrency : employee.currency}}\n                    </div>\n\n                    <div class=\"selection-tag\" ng-if=\"isSelected(employee, statement.name)\" ng-style=\"{ \'background-color\': getSelectLineColor(employee, statement.name) }\"/>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"hasElements()\">\n\n          <h4>{{::periodTranslation | titleize}} {{\'impac.widget.hr_payroll_summary.payroll_summary\' | translate}}</h4>\n          <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" on-toggle=\"widget.format()\"/>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div ng-show=\"getTrackedField()\" class=\"row widget-line header\">\n              <div class=\"col-xs-12\">{{getTrackedField()}}</div>\n            </div>\n\n            <!-- Not mobile -->\n            <div class=\"row\">\n              <span ng-repeat=\"date in widget.content.dates track by $index\" class=\"hidden-xs\">\n                <!-- Separator every 4 items -->\n                <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n                <div class=\"col-sm-3 text-center\">\n                  <!-- Date -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{formatDate(date)}}\n                    </div>\n                  </div>\n                  <!-- Amount + currency -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                      {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency }}\n                    </div>\n                  </div>\n                </div>\n              </span>\n            </div>\n\n            <!-- Mobile -->\n            <div ng-repeat=\"date in widget.content.dates track by $index\" class=\"row widget-line visible-xs\">\n              <!-- Date -->\n              <div class=\"col-xs-6\">\n                {{formatDate(date)}}\n              </div>\n              <!-- Amount + currency -->\n              <div class=\"col-xs-6 text-right\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div class=\"row widget-line header\">\n              <div class=\"col-md-12\">\n                <span ng-if=\"getTrackedField()\">\n                  {{getTrackedField()}} -\n                </span>\n                <span ng-if=\"widget.isHistoryMode\">\n                  {{\'impac.widget.hr_payroll_summary.from\' | translate}} {{widget.content.dates[0] | date : \"MMM-d\"}} {{\'impac.widget.hr_payroll_summary.to\' | translate}} {{widget.content.dates[widget.content.dates.length - 1] | date : \"MMM-d\"}}\n                </span>\n                <span ng-if=\"!widget.isHistoryMode\">\n                  {{getPeriod()}}\n                </span>\n              </div>\n            </div>\n\n            <div class=\"row widget-line\" ng-repeat=\"element in selectedElements track by $index\">\n              <div class=\"col-xs-7\">\n                <i class=\"fa fa-circle\" ng-style=\"{ \'margin\': \'0px 8px\', \'color\': getElementChartColor($index) }\" />\n                {{getName(element) | titleize}}\n              </div>\n              <div class=\"col-xs-5 text-right\">\n                <span ng-if=\"widget.isHistoryMode\">{{getTotalSum(element) | mnoCurrency : element.currency}}</span>\n                <span ng-if=\"!widget.isHistoryMode\">{{getLastValue(element) | mnoCurrency : element.currency}}</span>\n              </div>\n            </div>\n\n          </div>\n\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\" translate>impac.widget.hr_payroll_summary.no_elements</div>\n\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-payroll-taxes.tmpl.html","<div widget-hr-payroll-taxes>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.hr_payroll_taxes.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_payroll_taxes.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_payroll_taxes.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div>\n      <div setting-hist-mode parent-widget=\"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">{{getCurrentPrice() | mnoCurrency : getCurrency() : false}}</div>\n        <div class=\"currency\">{{getCurrency()}}</div>\n        <div class=\"legend\">{{\'impac.widget.hr_payroll_taxes.legend\' | translate}}<br />{{getPeriod()}}</div>\n      </div>\n\n      <div class=\"history chart-container\" ng-show=\"widget.isHistoryMode\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\">{{\'impac.widget.hr_payroll_taxes.legend\' | translate}}</div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-salaries-summary.tmpl.html","<div widget-hr-salaries-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.hr_salaries_summary.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_salaries_summary.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_salaries_summary.save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <h3 class=\"left\" translate>impac.widget.hr_salaries_summary.average_rate</h3>\n        <div class=\"price\">\n           {{widget.content.total.average_rate | mnoCurrency : widget.content.total.currency}}\n        </div>\n        <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred1\"/>\n        <div class=\"legend\">\n          <span>({{widget.content.total.employees}} <span translate=\"impac.widget.hr_salaries_summary.legend.employee\" translate-values=\"{num_employee: widget.content.total.employees}\"></span> {{\'impac.widget.hr_salaries_summary.legend.with\' | translate}})</span>\n        </div>\n      </div>\n\n      <div class=\"right-panel\" ng-class=\"{\'col-md-12\': !widget.isExpanded(), \'col-md-6\': widget.isExpanded()}\">\n        <h3 class=\"right\">{{\'impac.widget.hr_salaries_summary.filter\' | translate}} <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/></h3>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n            <div class=\"col-xs-2\">\n              <i ng-hide=\"widget.content.summary.filter==\'age_range\'\" class=\"fa fa-circle\" ng-style=\"{ \'color\': getColorByIndex($index) }\" />\n            </div>\n            <div class=\"col-xs-5\">\n              {{data.label}}\n            </div>\n            <div class=\"col-xs-5 text-right\">\n              <i>{{data.value | mnoCurrency : widget.content.total.currency}} (av.)</i>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-superannuation-accruals.tmpl.html","<div widget-hr-superannuation-accruals>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.hr_superannuation_accruals.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_superannuation_accruals.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_superannuation_accruals.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" deferred=\"::paramSelectorDeferred\" />\n\n      <h3 translate>impac.widget.hr_superannuation_accruals.superannuation_balance</h3>\n      <div class=\"price\">{{(getEmployee().total_super || 0) | mnoCurrency : getEmployee().currency}}</div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-timesheets.tmpl.html","<div widget-hr-timesheets>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.hr_timesheets.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_timesheets.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_timesheets.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"employee_id\" options=\"employeesOptions\" selected=\"selectedEmployee\" class=\"currency\" deferred=\"::paramSelectorDeferred\" />\n\n      <div class=\"widget-lines-container\">\n\n        <!-- Tab header -->\n        <div class=\"row widget-line header\">\n          <div class=\"col-sm-12\">\n            {{\'impac.widget.hr_timesheets.from\' | translate}} {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} {{\'impac.widget.hr_timesheets.to\' | translate}} {{widget.content.dates[widget.content.dates.length - 1] | mnoDate : widget.metadata.hist_parameters.period}}\n          </div>\n        </div>\n\n        <!-- Time worked activities -->\n        <div class=\"row lines-group\" >\n          <div class=\"col-xs-12\">\n\n            <!-- Time worked -->\n            <div class=\"row widget-line\" >\n              <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(\'total_time_worked\')\" style=\"cursor: pointer;\">\n                <i class=\"fa\" ng-class=\"isCollapsed(\'total_time_worked\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n              </div>\n              <div class=\"col-xs-7\">\n                <strong translate>impac.widget.hr_timesheets.total_worked</strong>\n              </div>\n              <div class=\"col-xs-4 text-right\">\n                <strong>{{getEmployeeTimeWorked()}} h</strong>\n              </div>\n            </div>\n\n            <!-- Activities lines / TODO -->\n            <div class=\"row\" uib-collapse=\"isCollapsed(\'total_time_worked\')\">\n              <div class=\"col-xs-12\">\n                <div class=\"row widget-line\">\n                  <div class=\"col-xs-11 col-xs-offset-1\">\n                    <i translate>impac.widget.hr_timesheets.activities_not_found</i>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n        <!-- Time off activities -->\n        <div class=\"row lines-group\" >\n          <div class=\"col-xs-12\">\n\n            <!-- Time off -->\n            <div class=\"row widget-line\" >\n              <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(\'total_time_of\')\" style=\"cursor: pointer;\">\n                <i class=\"fa\" ng-class=\"isCollapsed(\'total_time_of\') ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n              </div>\n              <div class=\"col-xs-7\">\n                <strong translate>impac.widget.hr_timesheets.total_off</strong>\n              </div>\n              <div class=\"col-xs-4 text-right\">\n                <strong>{{getEmployeeTimeOff()}} h</strong>\n              </div>\n            </div>\n\n\n            <!-- PTO and Vacation lines / TODO -->\n            <div class=\"row\" uib-collapse=\"isCollapsed(\'total_time_of\')\">\n              <div class=\"col-xs-12\">\n                <div class=\"row widget-line\">\n                  <div class=\"col-xs-7 col-xs-offset-1\">PTO</div>\n                  <div class=\"col-xs-4 text-right\">0 h</div>\n                </div>\n                <div class=\"row widget-line\">\n                  <div class=\"col-xs-7 col-xs-offset-1\">Vacation</div>\n                  <div class=\"col-xs-4 text-right\">0 h</div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/hr-workforce-summary.tmpl.html","<div widget-hr-workforce-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.hr_workforce_summary.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.hr_workforce_summary.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.hr_workforce_summary.save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <h3 class=\"left\" translate>impac.widget.hr_workforce_summary.total_workforce</h3>\n        <div class=\"price\">\n           {{getTotalWorkforce() | mnoCurrency : getCurrency()}}\n        </div>\n        <div class=\"currency\" setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred1\"/>\n        <div class=\"legend\">\n          <span>({{getNumberOfEmployees()}} <span translate=\"impac.widget.hr_workforce_summary.legend.employee\" translate-values=\"{num_employee: widget.content.total.employees}\"></span> {{\'impac.widget.hr_workforce_summary.legend.with\' | translate}})</span>\n        </div>\n      </div>\n\n      <div class=\"right-panel\" ng-class=\"{\'col-md-12\': !widget.isExpanded(), \'col-md-6\': widget.isExpanded()}\">\n        <h3 class=\"right\">{{\'impac.widget.hr_workforce_summary.filter\' | translate}} <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/></h3>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line\" ng-repeat=\"data in widget.content.summary.data\">\n            <div class=\"col-xs-2\">\n              <i class=\"fa fa-circle\" ng-style=\"{ \'color\': getColorByIndex($index) }\" />\n            </div>\n            <div class=\"col-xs-7\">\n              {{widget.content.summary.filter == \"salary_range\" ? formatSalaryRange(data) : data.label}}\n            </div>\n            <div class=\"col-xs-3 text-right\">\n              <i>{{((data.value / widget.content.total.amount)*100).toFixed()}}%</i>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/invoices-aged-payables-receivables.tmpl.html","<div widget-invoices-aged-payables-receivables>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.invoices_receivables.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.invoices_receivables.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.invoices_receivables.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"widget-lines-container\">\n\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-6 sortable-title\" ng-click=\"sort(\'customer\')\">\n              {{\'impac.widget.invoices_receivables.payables_and_receivables\' | translate}}\n              <i ng-show=\"sortedColumn == \'customer\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-3 text-right sortable-title\" ng-click=\"sort(\'total\')\">\n              {{\'impac.widget.invoices_receivables.total\' | translate}}\n              <i ng-show=\"sortedColumn == \'total\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-3 text-right sortable-title\" ng-click=\"sort(\'invoice\')\">\n              {{\'impac.widget.invoices_receivables.oldest\' | translate}}\n              <i ng-show=\"sortedColumn == \'invoice\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n          </div>\n\n          <!-- Payables -->\n          <div class=\"row lines-group\">\n            <div class=\"col-xs-12\">\n\n              <div class=\"row widget-line\">\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(payables)\">\n                  <i ng-show=\"(payables.suppliers && payables.suppliers.length)\" class=\"fa\" ng-class=\"isCollapsed(payables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-5\" ng-click=\"toggleSelectedElement(payables)\">\n                  <strong translate>impac.widget.invoices_receivables.aged_payables</strong>\n                </div>\n                <div class=\"col-xs-3 text-right\" ng-click=\"toggleSelectedElement(payables)\">\n                  <strong>{{getTotalSum(payables) | mnoCurrency : payables.currency}}</strong>\n                </div>\n\n                <div class=\"selection-tag\" ng-if=\"isSelected(payables)\" ng-style=\"{ \'background-color\': getSelectLineColor(payables) }\"/>\n              </div>\n\n              <div class=\"row\" uib-collapse=\"isCollapsed(payables)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(supplier, payables.name)\" ng-repeat=\"supplier in payables.suppliers\">\n                    <div class=\"col-xs-5 col-xs-offset-1\">\n                      {{supplier.name}}\n                    </div>\n                    <div class=\"col-xs-3 text-right\">\n                      {{getTotalSum(supplier) | mnoCurrency : supplier.currency}} <span common-currency-conversions fx-amounts=\"supplier.formattedFxTotals\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n                    </div>\n                    <div class=\"col-xs-3 text-right\">\n                      <span uib-tooltip=\"{{\'impac.widget.invoices_receivables.tooltip.oldest_invoice\' | translate}} {{getOldestInvoice(supplier)}}\" tooltip-placement=\"left\">\n                        {{getOldestInvoice(supplier) | mnoDate : widget.metadata.hist_parameters.period}}\n                      </span>\n                    </div>\n\n                    <div class=\"selection-tag\" ng-if=\"isSelected(supplier, payables.name)\" ng-style=\"{ \'background-color\': getSelectLineColor(supplier, payables.name) }\"/>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n\n          <!-- Receivables -->\n          <div class=\"row lines-group\">\n            <div class=\"col-xs-12\">\n\n              <div class=\"row widget-line\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(receivables)\">\n                  <i ng-show=\"(receivables.customers && receivables.customers.length)\" class=\"fa\" ng-class=\"isCollapsed(receivables) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-5\" ng-click=\"toggleSelectedElement(receivables)\">\n                  <strong translate>impac.widget.invoices_receivables.aged_receivables</strong>\n                </div>\n                <div class=\"col-xs-3 text-right\" ng-click=\"toggleSelectedElement(receivables)\">\n                  <strong>{{getTotalSum(receivables) | mnoCurrency : receivables.currency}}</strong>\n                </div>\n\n                <div class=\"selection-tag\" ng-if=\"isSelected(receivables)\" ng-style=\"{ \'background-color\': getSelectLineColor(receivables) }\"/>\n              </div>\n\n              <div class=\"row\" uib-collapse=\"isCollapsed(receivables)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(customer, receivables.name)\" ng-repeat=\"customer in receivables.customers\" ng-class=\"isSelected(customer, receivables.name) ? \'selected\' : null\" >\n                    <div class=\"col-xs-5 col-xs-offset-1\">\n                      {{customer.name}}\n                    </div>\n                    <div class=\"col-xs-3 text-right\">\n                      <span>{{getTotalSum(customer) | mnoCurrency : customer.currency}} <span common-currency-conversions fx-amounts=\"customer.formattedFxTotals\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" /></span>\n                    </div>\n                    <div class=\"col-xs-3 text-right\">\n                      <span uib-tooltip=\"{{\'impac.widget.invoices_receivables.tooltip.oldest_invoice\' | translate}} {{getOldestInvoice(customer)}}\" tooltip-placement=\"left\">\n                        {{getOldestInvoice(customer) | mnoDate : widget.metadata.hist_parameters.period}}\n                      </span>\n                    </div>\n\n                    <div class=\"selection-tag\" ng-if=\"isSelected(customer, receivables.name)\" ng-style=\"{ \'background-color\': getSelectLineColor(customer, receivables.name) }\"/>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"hasElements()\">\n\n          <h4>{{::period_translation | titleize}} {{\'impac.widget.invoices_receivables.aged_payables_and_receivables\' | translate}}</h4>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"legend\">{{getName(selectedElements[0]) | titleize}}</div>\n\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div ng-show=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <!-- Not mobile -->\n            <div class=\"row\">\n              <span ng-repeat=\"date in widget.content.dates track by $index\" class=\"hidden-xs\">\n                <!-- Separator every 4 items -->\n                <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n                <div class=\"col-sm-3 text-center\">\n                  <!-- Date -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\">\n                      {{date | mnoDate : widget.metadata.hist_parameters.period}}\n                    </div>\n                  </div>\n                  <!-- Amount + currency -->\n                  <div class=\"row widget-line\">\n                    <div class=\"col-sm-12\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                      {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n                    </div>\n                  </div>\n                </div>\n              </span>\n            </div>\n\n            <!-- Mobile -->\n            <div ng-repeat=\"date in widget.content.dates track by $index\" class=\"row widget-line visible-xs\">\n              <!-- Date -->\n              <div class=\"col-xs-6\">\n                {{date | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n              <!-- Amount + currency -->\n              <div class=\"col-xs-6 text-right\" ng-class=\"getClassColor(selectedElements[0].totals[$index])\">\n                {{selectedElements[0].totals[$index] | mnoCurrency : selectedElements[0].currency}}\n              </div>\n            </div>\n\n            <div class=\"row astericks-info\">\n              <div class=\"col-xs-12\">\n                <p><i translate>impac.widget.invoices_receivables.your_opening_balance</i></p>\n              </div>\n            </div>\n          </div>\n\n          <div ng-hide=\"selectedElements.length < 2\" class=\"widget-lines-container\">\n\n            <div class=\"row widget-line header\">\n              <div class=\"col-xs-4 col-xs-offset-8 text-right\">Totals</div>\n            </div>\n\n            <div class=\"row widget-line\" ng-repeat=\"element in selectedElements track by $index\">\n              <div class=\"col-xs-2\">\n                <i class=\"fa fa-circle\" ng-style=\"{ \'margin\': \'0px 8px\', \'color\': getElementChartColor($index) }\" />\n              </div>\n              <div class=\"col-xs-6\">\n                {{getName(element) | titleize}}\n              </div>\n              <div class=\"col-xs-4 text-right\">\n                <i>{{getTotalSum(element) | mnoCurrency : element.currency}}</i>\n              </div>\n            </div>\n\n            <div class=\"row astericks-info\">\n              <div class=\"col-xs-12\">\n                <p><i translate>impac.widget.invoices_receivables.your_opening_balance</i></p>\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\" translate>impac.widget.invoices_receivables.select_accounts</div>\n\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/invoices-list.accessible.tmpl.html","<div widget-invoices-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.invoices_list.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.invoices_list.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.invoices_list.save</button>\n    </div>\n  </div>\n\n  <table class=\"table widget-lines-container\" ng-hide=\"widget.isEditMode\">\n\n    <!-- Header line -->\n    <tr class=\"widget-line header\">\n      <td>{{entityTypeCap}}</td>\n      <td translate>impac.widget.invoices_list.paid</td>\n      <td translate>impac.widget.invoices_list.due</td>\n      <td translate>impac.widget.invoices_list.invoiced</td>\n    </tr>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n    \n    <!-- Content lines -->\n    <tr class=\"widget-line\" ng-repeat=\"entity in widget.content.entities\">\n      <td>{{entity.name}}</td>\n      <td><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></td>\n      <td><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></td>\n      <td><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></td>\n    </tr>\n\n  </table>\n\n</div>\n");
$templateCache.put("widgets/invoices-list.tmpl.html","<div widget-invoices-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.invoices_list.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-dates-picker parent-widget=\"widget\" class=\"part\" from=\"(widget.metadata.hist_parameters.from || defaultFrom)\" to=\"(widget.metadata.hist_parameters.to || defaultTo)\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\"/>\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.invoices_list.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.invoices_list.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\" class=\"widget-lines-container\">\n\n    <div setting-limit-entries parent-widget=\"widget\" deferred=\"::limitEntriesDeferred\" selected=\"limitEntriesSelected\" max=\"widget.content.entities.length\" entries-label=\"limitEntriesLabel\" />\n\n\n    <!-- LARGE WIDGET -->\n\n    <!-- Header line -->\n    <div ng-if=\"widget.width > 3\" class=\"row widget-line header\">\n      <div class=\"col-sm-4\">{{entityTypeCap}}</div>\n      <div class=\"col-sm-7\">\n        <div class=\"row\">\n          <div class=\"col-xs-4\" translate>impac.widget.invoices_list.paid</div>\n          <div class=\"col-xs-4\" translate>impac.widget.invoices_list.due</div>\n          <div class=\"col-xs-4\" translate>impac.widget.invoices_list.invoiced</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Content lines -->\n    <div ng-if=\"widget.width > 3\" class=\"row widget-line\" ng-repeat=\"entity in widget.content.entities | limitTo:limitEntriesSelected\" tooltip-placement=\"bottom\" uib-tooltip-html=\"invoiceTooltips[entity.id]\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n      <div class=\"col-sm-4\"><b>{{entity.name}}</b></div>\n      <div class=\"col-sm-7\">\n        <div class=\"row\">\n          <div class=\"col-xs-4\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n          <div class=\"col-xs-4\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n          <div class=\"col-xs-4\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n        </div>\n      </div>\n      <div class=\"col-sm-1 right-column text-right\">\n        <i class=\"fa fa-info-circle\" />\n        <span common-currency-conversions fx-amounts=\"entity.formattedFxTotals\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n      </div>\n    </div>\n\n\n    <!-- SMALL WIDGET -->\n\n    <!-- Header line -->\n    <div ng-if=\"widget.width <= 3\" class=\"row widget-line header\">\n      <div class=\"col-xs-12\" ng-show=\"orderBy == \'paid \'\">{{entityTypeCap}} {{\'impac.widget.invoices_list.total_paid\' | translate}}</div>\n      <div class=\"col-xs-12\" ng-show=\"orderBy == \'due \'\">{{entityTypeCap}} {{\'impac.widget.invoices_list.total_due\' | translate}}</div>\n      <div class=\"col-xs-12\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\">{{entityTypeCap}} {{\'impac.widget.invoices_list.total_invoiced\' | translate}}</div>\n    </div>\n\n    <!-- Content lines -->\n    <div ng-if=\"widget.width <= 3\" class=\"row widget-line\" ng-repeat=\"entity in widget.content.entities | limitTo:limitEntriesSelected\" tooltip-placement=\"bottom\" uib-tooltip-html=\"invoiceTooltips[entity.id]\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n      <div class=\"col-xs-12\"><b>{{entity.name}}</b></div>\n      <div class=\"col-xs-8\" ng-show=\"orderBy == \'paid \'\"><i>{{entity.total_paid | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-8\" ng-show=\"orderBy == \'due \'\"><i>{{entity.total_due | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-8\" ng-hide=\"orderBy == \'paid \' || orderBy == \'due \'\"><i>{{entity.total_invoiced | mnoCurrency : entity.currency}}</i></div>\n      <div class=\"col-xs-4 text-right\">\n        <i class=\"fa fa-info-circle\" />\n        <span common-currency-conversions fx-amounts=\"entity.formattedFxTotals\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/invoices-summary.tmpl.html","<div widget-invoices-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.invoices_summary.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-dates-picker parent-widget=\"widget\" class=\"part\" from=\"(widget.metadata.hist_parameters.from || defaultFrom)\" to=\"widget.metadata.hist_parameters.to\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\"/>\n    <div setting-chart-filters parent-widget=\"widget\" class=\"part\" deferred=\"::chartFiltersDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.invoices_summary.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.invoices_summary.save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n    <div class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <span>{{widget.content.legend}}</span>\n      </div>\n    </div>\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-aged.tmpl.html","<div widget-sales-aged>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_aged.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_aged.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_aged.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"center\">\n\n      <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload truncate-no=\"60\" on-select=\"widget.format()\" style=\"text-align: center;\" deferred=\"::paramSelectorDeferred\"/>\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n      <div class=\"legend\">{{\'impac.widget.sales_aged.from\' | translate}} {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} {{\'impac.widget.sales_aged.to\' | translate}} {{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}}</div>\n\n      <div class=\"widget-lines-container\">\n\n        <!-- Not mobile -->\n        <div class=\"row\">\n          <span ng-repeat=\"date in formattedDates track by $index\" class=\"hidden-xs\">\n            <!-- Separator every 4 items -->\n            <div ng-if=\"$index % 4 == 0 && $index > 0\" class=\"clearfix dashed\"></div>\n\n            <div class=\"col-sm-3 text-center\">\n              <!-- Date -->\n              <div class=\"row widget-line\">\n                <div class=\"col-xs-12\">\n                  {{date}}\n                </div>\n              </div>\n              <!-- Amount (+ currency) -->\n              <div class=\"row widget-line\">\n                <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-xs-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" >\n                  {{getTotal($index) | mnoCurrency : widget.content.currency}}\n                </div>\n                <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-xs-12\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" >\n                  {{getTotal($index)}}\n                </div>\n              </div>\n            </div>\n          </span>\n        </div>\n\n        <!-- Mobile -->\n        <div ng-repeat=\"date in formattedDates track by $index\" class=\"row widget-line visible-xs\">\n          <!-- Date -->\n          <div class=\"col-xs-6\">\n            {{date}}\n          </div>\n          <!-- Amount (+ currency) -->\n          <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-xs-6 text-right\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" >\n            {{getTotal($index) | mnoCurrency : widget.content.currency}}\n          </div>\n          <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-xs-6 text-right\" ng-class=\"getClassColor(getTotal($index - 1),getTotal($index))\" >\n            {{getTotal($index)}}\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-break-even.tmpl.html","<div widget-sales-break-even>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_break_even.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_break_even.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_break_even.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"align-center\">\n\n      <div class=\"legend\">{{\'impac.widget.sales_break_even.from\' | translate}} {{widget.content.period.from | date : \'d MMM yyyy\'}} {{\'impac.widget.sales_break_even.to\' | translate}} {{widget.content.period.to | date : \'d MMM yyyy\'}}</div>\n\n      <div class=\"block to-date\">\n        <div class=\"title\" translate>impac.widget.sales_break_even.title.sales</div>\n        <div class=\"price\">{{widget.content.sales.to_date | mnoCurrency : widget.content.currency : false}}</div>\n        {{\'impac.widget.sales_break_even.target\' | translate}}: <span class=\"edit-target\" style=\"float: right;\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"updateSettings()\">\n          {{threshold | mnoCurrency : widget.content.currency : false}}\n        </span>\n      </div>\n\n      <div ng-show=\"widget.content.break_even\" class=\"block to-breakeven\">\n        <div class=\"title\">impac.widget.sales_break_even.title.projection</div>\n        <span ng-show=\"isTargetMet()\" translate>impac.widget.sales_break_even.your_sales</span>\n        <div class=\"price\">{{getVariance() | mnoCurrency : widget.content.currency : false}}</div>\n        <span ng-hide=\"isTargetMet()\">\n          {{\'impac.widget.sales_break_even.projected_date\' | translate}} <span style=\"float: right;\">{{getProjectedDate() | date : \'d-MM-yy\'}}</span>\n          <br />\n          {{\'impac.widget.sales_break_even.opportunities_to_close\' | translate}} <span style=\"float: right;\">{{getOpportunitiesToClose()}}</span>\n        </span>\n      </div>\n      <div ng-show=\"widget.content.break_even\" class=\"legend\">{{widget.content.break_even.eligible_opportunities}} {{\'impac.widget.sales_break_even.eligible_opportunities\' | translate}}</div>\n\n      <div ng-hide=\"widget.content.break_even\" class=\"block to-breakeven\">\n        <span class=\"edit-target\" editable-text=\"threshold\" buttons=\"no\" onaftersave=\"updateSettings()\">\n          <div class=\"define-text\">{{\'impac.widget.sales_break_even.click_to_define\' | translate}}</div>\n        </span>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-comparison.tmpl.html","<div widget-sales-comparison>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_comparison.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_comparison.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_comparison.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\" >\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"row legend center\">\n          {{\'impac.widget.sales_comparison.legend.compare_by\' | translate}} <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"criteria\" options=\"criteriaOptions\" selected=\"criteria\" truncate-no=\"30\" deferred=\"::paramSelectorDeferred1\" />\n           |\n          {{\'impac.widget.sales_comparison.legend.see\' | translate}} <div setting-param-selector parent-widget=\"widget\" style=\"display: inline;\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" truncate-no=\"30\" on-select=\"widget.format()\" no-reload deferred=\"::paramSelectorDeferred2\" />\n        </div>\n\n        <div class=\"widget-lines-container\">\n\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-8 sortable-title\" ng-click=\"sort(\'sales\')\">\n              {{\'impac.widget.sales_comparison.total_sales_from\' | translate}} {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} {{\'impac.widget.sales_comparison.to\' | translate}} {{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}}\n              <i ng-show=\"sortedColumn == \'sales\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-4 text-right sortable-title\" ng-click=\"sort(\'total\')\">\n              {{\'impac.widget.sales_comparison.total\' | translate}}\n              <i ng-show=\"sortedColumn == \'total\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n          </div>\n\n          <div class=\"row lines-group\" ng-repeat=\"statement in widget.content.sales_comparison\" >\n            <div class=\"col-xs-12\">\n\n              <div class=\"row widget-line\" >\n                <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(statement)\">\n                  <i ng-show=\"(statement.sales && statement.sales.length)\" class=\"fa\" ng-class=\"isCollapsed(statement) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-7\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{statement.name | titleize}}</strong>\n                </div>\n                <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-xs-4 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getTotalForPeriod(statement)}}</strong>\n                </div>\n                <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-xs-4 text-right\" ng-click=\"toggleSelectedElement(statement)\">\n                  <strong>{{getTotalForPeriod(statement) | mnoCurrency : statement.currency}}</strong>\n                </div>\n\n                <div class=\"selection-tag\" ng-if=\"isSelected(statement)\" ng-style=\"{ \'background-color\': getSelectLineColor(statement) }\"/>\n              </div>\n\n              <div class=\"row\" uib-collapse=\"isCollapsed(statement)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-click=\"toggleSelectedElement(sale, statement.name)\" ng-repeat=\"sale in statement.sales\" >\n                    <div class=\"col-xs-7 col-xs-offset-1\">\n                      {{sale.name}}\n                    </div>\n                    <div ng-show=\"filter.value == \'quantity_sold\'\" class=\"col-xs-4 text-right\">\n                      {{getTotalForPeriod(sale)}}\n                    </div>\n                    <div ng-hide=\"filter.value == \'quantity_sold\'\" class=\"col-xs-4 text-right\">\n                      <span common-currency-conversions fx-amounts=\"sale.formattedFxTotals[filter.value]\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n                      {{getTotalForPeriod(sale) | mnoCurrency : sale.currency}}\n                    </div>\n\n                    <div class=\"selection-tag\" ng-if=\"isSelected(sale, statement.name)\" ng-style=\"{ \'background-color\': getSelectLineColor(sale, statement.name) }\"/>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-show=\"hasElements()\">\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n          </div>\n\n          <div class=\"widget-lines-container\">\n\n            <div class=\"row widget-line header\">\n              <div class=\"col-xs-12\">\n                {{\'impac.widget.sales_comparison.total_sales_from\' | translate}} {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} {{\'impac.widget.sales_comparison.to\' | translate}} {{getLastDate() | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n            </div>\n\n            <div class=\"row widget-line\" ng-repeat=\"element in selectedElements track by $index\">\n              <div class=\"col-xs-1\">\n                <i class=\"fa fa-circle\" ng-style=\"{ \'color\': getElementChartColor($index) }\" />\n              </div>\n              <div class=\"col-xs-7\">\n                {{element.name | titleize}}\n              </div>\n              <div class=\"col-xs-4 text-right\">\n                <i ng-show=\"filter.value == \'quantity_sold\'\">{{getTotalForPeriod(element)}}</i>\n                <i ng-hide=\"filter.value == \'quantity_sold\'\">{{getTotalForPeriod(element) | mnoCurrency : element.currency}}</i>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div ng-hide=\"hasElements()\" class=\"no-element\" translate>impac.widget.sales_comparison.select_sales_category</div>\n\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-customer-details.tmpl.html","<div widget-sales-customer-details>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_customer_details.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_customer_details.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_customer_details.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\" />\n        <div setting-param-selector parent-widget=\"widget\" param=\"customer_uid\" options=\"customersOptions\" selected=\"selectedCustomerId\" class=\"row title\" deferred=\"::paramSelectorDeferred\" />\n\n        <div class=\"details-container\">\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.sales_customer_details.label.email</label></div>\n            <div class=\"col-md-8\"><pre>{{selectedCustomer.email || \'-\'}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.sales_customer_details.label.phone</label></div>\n            <div class=\"col-md-8\"><pre>{{selectedCustomer.phone || \'-\'}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.sales_customer_details.label.website</label></div>\n            <div class=\"col-md-8\"><pre>{{selectedCustomer.website || \'-\'}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.sales_customer_details.label.contact</label></div>\n            <div class=\"col-md-8\"><pre>{{selectedCustomer.contact || \'-\'}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.sales_customer_details.label.city</label></div>\n            <div class=\"col-md-8\"><pre>{{selectedCustomer.city || \'-\'}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-4\"><label translate>impac.widget.sales_customer_details.label.country</label></div>\n            <div class=\"col-md-8\"><pre>{{selectedCustomer.country || \'-\'}}</pre></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <div class=\"details-container\">\n          <div class=\"row\" style=\"border-bottom: solid 1px #e6e6e6; margin-bottom: 10px; padding-bottom: 5px;\">\n            <div class=\"col-md-3\"><label translate>impac.widget.sales_customer_details.label.address</label></div>\n            <div class=\"col-md-9\"><pre>{{formatAddress(selectedCustomer.full_address) || \'-\'}}</pre></div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-12 center legend\">{{\'impac.widget.sales_customer_details.from\' | translate}} {{getFromDate() | date : \'d MMM yyyy\'}} {{\'impac.widget.sales_customer_details.to\' | translate}} {{getToDate() | date : \'d MMM yyyy\'}}:</div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label translate>impac.widget.sales_customer_details.label.total_invoiced</label></div>\n            <div class=\"col-md-7\">\n              <span common-currency-conversions fx-amounts=\"selectedCustomer.invoicedFxTotals\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n              <pre>{{selectedCustomer.total_invoiced | mnoCurrency : selectedCustomer.currency}}</pre>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label translate>impac.widget.sales_customer_details.label.total_paid</label></div>\n            <div class=\"col-md-7\">\n              <span common-currency-conversions fx-amounts=\"selectedCustomer.paidFxTotals\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n              <pre>{{selectedCustomer.total_paid | mnoCurrency : selectedCustomer.currency}}</pre>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-md-5\"><label translate>impac.widget.sales_customer_details.label.total_due</label></div>\n            <div class=\"col-md-7\">\n              <span common-currency-conversions fx-amounts=\"selectedCustomer.dueFxTotals\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n              <pre>{{selectedCustomer.total_due | mnoCurrency : selectedCustomer.currency}}</pre>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-cycle.tmpl.html","<div widget-sales-cycle>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_cycle.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" has-reach=\"hasReach\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_cycle.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_cycle.save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n    <div class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      <div class=\"legend\">\n        <span translate>impac.widget.sales_cycle.your_sales_cycle</span>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-forecast.tmpl.html","<div widget-sales-forecast>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_forecast.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_forecast.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_forecast.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n\n      <div class=\"chart-container\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n\n      <div class=\"widget-lines-container\">\n\n        <div class=\"row widget-line header\">\n          <div class=\"col-xs-12\" translate>impac.widget.sales_forecast.projection_on</div>\n        </div>\n\n        <div class=\"row lines-group\" ng-repeat=\"date in widget.content.dates.slice(6) track by $index\" ng-init=\"collapsed = true\" >\n          <div class=\"col-xs-12\">\n\n            <div class=\"row widget-line\" ng-class=\"{main: widget.content.opportunities.slice(6)[$index].length > 0}\" ng-click=\"collapsed = !collapsed\" >\n              <div class=\"col-xs-6\">\n                {{date | mnoDate : widget.metadata.hist_parameters.period}}\n              </div>\n              <div class=\"col-xs-6 text-right\">\n                <strong>{{widget.content.totals.slice(6)[$index] | mnoCurrency : widget.content.currency}}</strong>\n              </div>\n            </div>\n\n            <div class=\"row\" uib-collapse=\"collapsed\">\n              <div class=\"col-xs-12\">\n                <div class=\"row widget-line\" ng-repeat=\"opp in widget.content.opportunities.slice(6)[$index]\" >\n                  <div class=\"col-xs-6\">\n                    {{opp.name}}\n                  </div>\n                  <div class=\"col-xs-6 text-right\">\n                    {{getOpportunityAmount(opp) | mnoCurrency : getOpportunityCurrency(opp)}}\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-growth.tmpl.html","<div widget-sales-growth>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_growth.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_growth.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_growth.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n\n      <div class=\"selector\">\n        <div setting-param-selector classic=\"true\" parent-widget=\"widget\" param=\"product\" options=\"productOptions\" selected=\"product\" no-reload on-select=\"widget.format()\" deferred=\"::paramSelectorDeferred1\"/>\n        <div ng-show=\"product.value != -1\" setting-param-selector classic=\"true\" parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred2\"/>\n      </div>\n\n      <div class=\"chart-container\" ng-hide=\"(product.value == -1)\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n      </div>\n\n      <div ng-show=\"product.value != -1\" class=\"legend text-center\">{{getSelectedProduct().displayName}}</div>\n      <div class=\"price text-center\" ng-hide=\"isDataQuantity || product.value == -1\" uib-tooltip=\"{{\'impac.widget.sales_growth.tooltip.total_for_period\' | translate}}\">{{getCurrentValue() | mnoCurrency : getSelectedProduct().currency}}</div>\n      <div class=\"price text-center\" ng-show=\"isDataQuantity && product.value != -1\" uib-tooltip=\"{{\'impac.widget.sales_growth.tooltip.total_for_period\' | translate}}\">{{getCurrentValue()}}</div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-leads-funnel.tmpl.html","<div widget-sales-leads-funnel>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_leads_funnel.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" param=\"status_selection\" has-reach=\"hasReach\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_leads_funnel.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_leads_funnel.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"legend\">{{\'impac.widget.sales_leads_funnel.legend.your_leads\' | translate}} {{widget.content.from | date : \'d MMM yyyy\'}} {{\'impac.widget.sales_leads_funnel.legend.to\' | translate}} {{widget.content.to | date : \'d MMM yyyy\'}}</div>\n\n        <div class=\"funnel-container\">\n          <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toggleSelectStatus(elem.status)\">\n            <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n            <div class=\"main-text\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedStatus\" class=\"currency\" translate>impac.widget.sales_leads_funnel.select_a_status</div>\n\n        <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n\n          <div class=\"row lines-group widget-line\" ng-repeat=\"lead in getSelectedLeads()\" uib-tooltip-html=\"leadDescriptionTooltips[$index]\" tooltip-placement=\"top\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n            <div class=\"col-sm-7\">\n              {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n              <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n            </div>\n            <div class=\"col-sm-5 text-right\">\n              <strong>{{lead.lead_status | titleize}}</strong>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-leads-list.tmpl.html","<div widget-sales-leads-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_leads_list.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_leads_list.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_leads_list.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n\n      <div class=\"widget-lines-container\">\n\n        <div class=\"row lines-group widget-line\" ng-repeat=\"lead in widget.content.leads\" uib-tooltip-html=\"leadDescriptionTooltips[$index]\" tooltip-placement=\"top\" tooltip-animation=\"false\" tooltip-append-to-body=\"true\" tooltip-class=\"impac-widgets-tooltip\">\n          <div class=\"col-sm-7\">\n            {{lead.first_name | titleize}} {{lead.last_name | titleize}}\n            <span ng-show=\"lead.organization\">({{lead.organization}})</span>\n          </div>\n          <div class=\"col-sm-5 text-right\">\n            <strong>{{lead.lead_status | titleize}}</strong>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-list.tmpl.html","<div widget-sales-list>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_list.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_list.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_list.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"widget-lines-container no-scroll\">\n      <div class=\"row widget-line header\">\n        <div class=\"col-xs-12 text-center\">\n          <span setting-dates-picker parent-widget=\"widget\" from=\"widget.metadata.hist_parameters.from\" to=\"widget.metadata.hist_parameters.to\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\" template=\"::datesPickerTemplate\"/>\n        </div>\n      </div>\n      <div class=\"row widget-line header\">\n        <div class=\"col-xs-4 text-left sortable-title\" ng-click=\"sort(\'account\')\">\n          {{\'impac.widget.sales_list.products\' | translate}}\n          <i ng-show=\"sortedColumn == \'account\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n        </div>\n        <div class=\"col-xs-4 text-center\">\n          <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred\" />\n        </div>\n        <div class=\"col-xs-4 text-right sortable-title\" ng-click=\"sort(\'total\')\">\n          {{\'impac.widget.sales_list.total\' | translate}}\n          <i ng-show=\"sortedColumn == \'total\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n        </div>\n      </div>\n    </div>\n\n    <div class=\"widget-lines-container\">\n\n      <div class=\"row lines-group\" ng-repeat=\"company in widget.content.summary\" >\n        <div class=\"col-xs-12\">\n\n          <div class=\"row widget-line\" >\n            <div class=\"col-xs-1\" ng-click=\"toggleCollapsed(company.name)\" style=\"cursor: pointer;\">\n              <i class=\"fa\" ng-class=\"isCollapsed(company.name) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n            </div>\n            <div class=\"col-xs-7\">\n              <strong>{{company.name | titleize}}</strong>\n            </div>\n            <div class=\"col-xs-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\">\n              <strong>{{company.total}}</strong>\n            </div>\n            <div class=\"col-xs-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\">\n              <strong>{{company.total | mnoCurrency : company.currency}}</strong>\n            </div>\n          </div>\n\n        <div class=\"row\" uib-collapse=\"isCollapsed(company.name)\">\n          <div class=\"col-xs-12\">\n            <div class=\"row widget-line\" ng-repeat=\"product in company.products\" >\n              <div class=\"col-xs-7 col-xs-offset-1\">\n                {{product.name | titleize}}\n              </div>\n              <div class=\"col-xs-4 text-right\" ng-show=\"{{filter.value.match(\'quantity\')}}\">\n                <strong>{{product.total}}</strong>\n              </div>\n              <div class=\"col-xs-4 text-right\" ng-hide=\"{{filter.value.match(\'quantity\')}}\">\n                <span common-currency-conversions fx-amounts=\"product.formattedFxTotals\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n                <strong>{{product.total | mnoCurrency : product.currency}}</strong>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div ng-show=\"widget.demoData\" common-data-not-found />\n</div>\n");
$templateCache.put("widgets/sales-margin.tmpl.html","<div widget-sales-margin>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.sales_margin.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_margin.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_margin.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n    <div>\n      <div setting-hist-mode parent-widget= \"widget\" deferred=\"::histModeDeferred\" />\n\n      <div ng-hide=\"widget.isHistoryMode\" class=\"current\">\n        <div class=\"price\">\n           {{ getTotalMargin() | mnoCurrency : getCurrency()}}\n        </div>\n        <div class=\"legend\">\n          {{\'impac.widget.sales_margin.total_sold_and_purchased\' | translate}}\n          </br>\n          <div setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" no-reload on-select=\"widget.format()\" deferred=\"::paramSelectorDeferred\" />\n        </div>\n      </div>\n\n      <div class=\"history chart-container\" ng-show=\"widget.isHistoryMode\">\n        <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        <div class=\"legend\" translate>impac.widget.sales_margin.total_sold_and_purchased</div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-net-sales.tmpl.html","<div widget-sales-net-sales>\n\n  <div ng-show=\"widget.isEditMode\" class=\"edit\">\n    <h4 translate>impac.widget.sales_net_sales.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_net_sales.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_net_sales.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row selector\">\n      <div class=\"col-xs-12 text-right\">\n        <span setting-param-selector parent-widget=\"widget\" param=\"display_type\" options=\"displayOptions\" selected=\"displayType\" no-reload=\"true\" deferred=\"::paramSelector1Deferred\" /> |\n        <span setting-param-selector parent-widget=\"widget\" param=\"time_range\" options=\"timeRangeOptions\" selected=\"timeRange\" deferred=\"::paramSelector2Deferred\" />\n      </div>\n    </div>\n\n    <div>\n\n      <div class=\"row text-center values\">\n        <div class=\"value-container col-md-3 col-md-offset-0 col-xs-10 col-xs-offset-2\">\n          <div class=\"title\" translate>impac.widget.sales_net_sales.title.sales</div>\n          <div class=\"value-box\">\n            {{ getValue(\'sales\') }}\n          </div>\n        </div>\n        <div class=\"operator col-md-1 col-xs-2\">\n          <span>{{ sign(\'minus\') }}</span>\n        </div>\n        <div class=\"value-container col-md-3 col-xs-10\">\n          <div class=\"title\" translate>impac.widget.sales_net_sales.title.returns</div>\n          <div class=\"value-box\">\n            {{ getValue(\'returns\') }}\n          </div>\n        </div>\n        <div class=\"operator col-md-1 col-xs-2\">\n          <span>{{ sign(\'equal\') }}</span>\n        </div>\n        <div class=\"value-container col-md-4 col-xs-10\">\n          <div class=\"title\" translate>impac.widget.sales_net_sales.title.net_result</div>\n          <div class=\"value-box\">\n            {{ getValue(\'net_result\') }}\n          </div>\n        </div>\n      </div>\n\n  </div>\n\n  <div ng-show=\"widget.demoData\" common-data-not-found />\n</div>\n");
$templateCache.put("widgets/sales-new-vs-existing-customers.tmpl.html","<div widget-sales-new-vs-existing-customers>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_new_vs_existing.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_new_vs_existing.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_new_vs_existing.save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div class=\"selector\">\n      <div class=\"selector-wrap\">\n        <span setting-param-selector parent-widget=\"widget\" param=\"display_type\" options=\"displayOptions\" selected=\"displayType\" on-select=\"displayTypeOnClick()\" no-reload=\"true\" deferred=\"::displayTypeParamSelectorDeferred\" />\n      </div>\n      <div class=\"selector-wrap\">\n        <span setting-param-selector parent-widget=\"widget\" param=\"time_range\" options=\"timeRangeOptions\" selected=\"timeRange\" deferred=\"::timeRangeParamSelectorDeferred\" />\n      </div>\n    </div>\n\n    <div class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n    </div>\n\n    <div class=\"legend\">\n      <div class=\"row positive2\">\n        <div class=\"col-xs-7 text-left\" translate>impac.widget.sales_new_vs_existing.new_customers</div>\n        <div class=\"col-xs-5 text-right\">{{getValue(\'new\')}}</div>\n      </div>\n      <div class=\"row negative2\">\n        <div class=\"col-xs-7 text-left\" translate>impac.widget.sales_new_vs_existing.existing_customers</div>\n        <div class=\"col-xs-5 text-right\">{{getValue(\'existing\')}}</div>\n      </div>\n      <div class=\"row total\">\n        <div class=\"col-xs-7 text-left\" translate>impac.widget.sales_new_vs_existing.total</div>\n        <div class=\"col-xs-5 text-right\">{{getValue(\'total\')}}</div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-number-of-leads.tmpl.html","<div widget-sales-number-of-leads>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_number_of_leads.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_number_of_leads.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_number_of_leads.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"align-center\">\n      <div class=\"selector\">\n        {{\'impac.widget.sales_number_of_leads.leads_for_this\' | translate}} <span setting-param-selector parent-widget=\"widget\" param=\"period\" options=\"periodOptions\" selected=\"period\" deferred=\"::paramSelectorDeferred\" />\n      </div>\n\n      <div class=\"stats\">\n        <div class=\"stat row align-left\" ng-repeat=\"carac in [\'new\', \'converted\', \'lost\']\">\n          <div class=\"col-md-6 title\" style=\"padding: 0px;\">{{carac | titleize}}</div>\n          <div class=\"col-md-6\" style=\"padding: 0px;\">\n            <span class=\"variation\" ng-class=\"formatNumberOfLeads(carac).color\">{{formatNumberOfLeads(carac).variation}}</span>\n            <span class=\"nominal\">{{formatNumberOfLeads(carac).nominal}}</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"legend\">\n      {{widget.content.number_of_leads.total[1]}} {{\'impac.widget.sales_number_of_leads.leads_in_total\' | translate}}\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-opportunities-funnel.tmpl.html","<div widget-sales-opportunities-funnel>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_funnel.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-params-picker options=\"statusOptions\" has-reach=\"hasReach\" param=\"sales_stage_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred1\" />\n    <div setting-params-picker options=\"assigneesOptions\" has-reach=\"hasReach\" param=\"assignees_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsPickerDeferred2\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_funnel.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_funnel.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\': \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\" />\n\n        <div class=\"legend\" translate>impac.widget.sales_funnel.legend</div>\n\n        <div class=\"funnel-container\">\n          <div class=\"tile\" ng-repeat=\"elem in funnel\" ng-click=\"toggleSelectStatus(elem.status)\">\n            <div class=\"colored-area\" ng-style=\"elem.coloredWidth\" ng-class=\"isSelected(elem.status) ? \'selected\' : \'\'\">{{elem.number}}</div>\n            <div class=\"main-text\" ng-style=\"elem.statusWidth\">{{elem.status | titleize}}</div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedStatus\" class=\"currency\" translate>impac.widget.sales_funnel.select_a_sales</div>\n\n        <div ng-show=\"selectedStatus\" class=\"widget-lines-container\">\n\n          <!-- Header -->\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-6 sortable-title\" ng-click=\"sort(\'group\')\">\n              {{\'impac.widget.sales_funnel.assignees_opportunities\' | translate}}\n              <i ng-show=\"sortedColumn == \'group\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n            <div class=\"col-xs-6 text-right sortable-title\" ng-click=\"sort(\'total\')\">\n              {{\'impac.widget.sales_funnel.potential_per_assignee\' | translate}}\n              <i ng-show=\"sortedColumn == \'total\'\" class=\"fa\" ng-class=\"ascending ? \'fa-sort-alpha-asc\' : \'fa-sort-alpha-desc\'\" />\n            </div>\n          </div>\n\n          <div class=\"row lines-group widget-line\" ng-repeat=\"group in selectedOpportunities\">\n            <div class=\"col-xs-12\">\n\n              <!-- Assignee lines -->\n              <div class=\"row widget-line\" ng-click=\"toggleCollapsed(group)\">\n                <div class=\"col-xs-1\">\n                  <i class=\"fa\" ng-class=\"isCollapsed(group) ? \'fa-plus-square-o\' : \'fa-minus-square-o\'\" />\n                </div>\n                <div class=\"col-xs-6\">\n                  <strong>{{group.assigneeName | titleize}}</strong>\n                </div>\n                <div class=\"col-xs-5 text-right\">\n                  <strong>{{getTotal(group.opps)}}</strong>\n                </div>\n              </div>\n\n              <!-- Opportunity lines -->\n              <div class=\"row\" uib-collapse=\"isCollapsed(group)\">\n                <div class=\"col-xs-12\">\n                  <div class=\"row widget-line\" ng-repeat=\"opp in group.opps\">\n                    <div class=\"col-xs-6 col-xs-offset-1\">\n                      {{opp.name | titleize}}\n                    </div>\n                    <div class=\"col-xs-5 text-right\">\n                      <strong>{{getOppDetails(opp)}}</strong>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-performance.tmpl.html","<div widget-sales-performance>\n\n  <!-- Edit panel -->\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_performance.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\"></div>\n\n    <div setting-params-picker options=\"closedWonOptions\" param=\"closed_won_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsWinsPickerDeferred\" description=\"{{\'impac.widget.sales_performance.description.pick_the_status\' | translate}}\"></div>\n\n    <div setting-params-picker options=\"closedLostOptions\" param=\"closed_lost_selection\" parent-widget=\"widget\" class=\"part\" deferred=\"::paramsLostsPickerDeferred\" description=\"{{\'impac.widget.sales_performance.description.pick_the_status_lost\' | translate}}\"></div>\n\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" ></div>\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_performance.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_performance.save</button>\n    </div>\n  </div>\n\n\n  <!-- Widget front -->\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"6\" max=\"12\" class=\"settings width\" deferred=\"::widthDeferred\"></div>\n\n        <div class=\"widget-lines-container\">\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-5\">\n              {{\'impac.widget.sales_performance.from\' | translate}} {{widget.content.dates[0] | mnoDate : widget.metadata.hist_parameters.period}} {{\'impac.widget.sales_performance.to\' | translate}} {{widget.content.dates[widget.content.dates.length - 1] | mnoDate : widget.metadata.hist_parameters.period}}\n            </div>\n            <div class=\"col-xs-3 text-right\" translate>impac.widget.sales_performance.win_ratio</div>\n            <div class=\"col-xs-4 text-right\" translate>impac.widget.sales_performance.total_won</div>\n          </div>\n\n          <div class=\"row lines-group\" ng-repeat=\"assignee in widget.content.assignees\" ng-click=\"toggleSelectedElement(assignee)\" >\n            <div class=\"col-xs-12\">\n              <div class=\"row widget-line\">\n                <div class=\"col-xs-5\">{{assignee.name | titleize}}</div>\n                <div class=\"col-xs-3 text-right\">{{assignee.win_ratio}} %</div>\n                <div class=\"col-xs-4 text-right\">{{assignee.total_won | mnoCurrency: widget.metadata.currency}}</div>\n                <div class=\"selection-tag\" ng-if=\"isSelected(assignee)\" ng-style=\"{ \'background-color\': getSelectLineColor(assignee) }\"/>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-md-6 right-panel text-center\" ng-show=\"widget.isExpanded()\">\n\n        <div ng-hide=\"selectedElements.length > 0\" class=\"no-element\" translate>impac.widget.sales_performance.select_an_employee</div>\n\n        <div ng-show=\"no_sales_stages_selected()\" class=\"no-element\" translate>impac.widget.sales_performance.pick_the_status</div>\n\n        <div ng-show=\"selectedElements.length > 0 && !no_sales_stages_selected()\">\n          <div class=\"chart-container\">\n            <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n            <div class=\"legend\">{{\'impac.widget.sales_performance.total_won_with_colon\' | translate}} {{getTotalWon() | mnoCurrency : widget.metadata.currency}}</div>\n          </div>\n\n          <div class=\"widget-lines-container\" ng-init=\"collapsedAll=false\">\n            <div ng-repeat=\"selectedElement in selectedElements track by $index\">\n              <div class=\"row widget-line header\" ng-click=\"collapsedAll=!collapsedAll\">\n                <div class=\"col-xs-8\">\n                  <i class=\"fa fa-circle\" ng-style=\"{ \'color\': getElementChartColor($index) }\"></i>\n                  {{selectedElement.name | titleize}}\n                </div>\n                <div class=\"col-xs-4 text-right\">{{selectedElement.total_won | mnoCurrency: widget.metadata.currency}}</div>\n              </div>\n\n              <div uib-collapse=\"collapsedAll\">\n                <div class=\"row lines-group\" ng-init=\"collapsedForecast=false\" ng-hide=\"selectedElement.opps.forecast.length == 0\" >\n                  <div class=\"col-xs-12\">\n                    <div class=\"row widget-line\" ng-click=\"collapsedForecast=!collapsedForecast\">\n                      <div class=\"col-xs-10\">\n                        <strong translate>impac.widget.sales_performance.forecast</strong>\n                      </div>\n                      <div class=\"col-xs-2 text-right\">\n                        <strong>{{selectedElement.opps.forecast.length}}</strong>\n                      </div>\n                    </div>\n\n                    <div class=\"row\" uib-collapse=\"collapsedForecast\">\n                      <div class=\"col-xs-12\">\n                        <div class=\"row widget-line no-select\" ng-repeat=\"opp in selectedElement.opps.forecast\" >\n                          <div class=\"col-xs-4\">{{opp.name}}</div>\n                          <div class=\"col-xs-2 text-right\">{{opp.probability | number :0 }} %</div>\n                          <div class=\"col-xs-3 text-right\">{{getForecastCloseDate(opp)}}</div>\n                          <div class=\"col-xs-3 text-right\">{{(opp.amount.amount) | mnoCurrency : opp.amount.currency}}</div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row lines-group\" ng-init=\"collapsedWon=false\">\n                  <div class=\"col-xs-12\">\n                    <div class=\"row widget-line\" ng-click=\"collapsedWon=!collapsedWon\">\n                      <div class=\"col-xs-10\">\n                        <strong translate>{{\'impac.widget.sales_performance.closed_won\' | translate}}</strong>\n                      </div>\n                      <div class=\"col-xs-2 text-right\">\n                        <strong>{{selectedElement.opps.won.length}}</strong>\n                      </div>\n                    </div>\n\n                    <div class=\"row\" uib-collapse=\"collapsedWon\">\n                      <div class=\"col-xs-12\">\n                        <div class=\"row widget-line no-select\" ng-repeat=\"opp in selectedElement.opps.won\">\n                          <div class=\"col-xs-6\">{{opp.name}}</div>\n                          <div class=\"col-xs-3 text-right\">{{getCloseDate(opp)}}</div>\n                          <div class=\"col-xs-3 text-right\">{{opp.amount.amount | mnoCurrency : opp.amount.currency}}</div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row lines-group\" ng-init=\"collapsedLost=false\">\n                  <div class=\"col-xs-12\">\n                    <div class=\"row widget-line\" ng-click=\"collapsedLost=!collapsedLost\">\n                      <div class=\"col-xs-10\">\n                        <strong translate>impac.widget.sales_performance.closed_lost</strong>\n                      </div>\n                      <div class=\"col-xs-2 text-right\">\n                        <strong>{{selectedElement.opps.lost.length}}</strong>\n                      </div>\n                    </div>\n\n                    <div class=\"row\" uib-collapse=\"collapsedLost\">\n                      <div class=\"col-xs-12\">\n                        <div class=\"row widget-line no-select\" ng-repeat=\"opp in selectedElement.opps.lost\" >\n                          <div class=\"col-xs-6\">{{opp.name}}</div>\n                          <div class=\"col-xs-3 text-right\">{{getCloseDate(opp)}}</div>\n                          <div class=\"col-xs-3 text-right\">{{opp.amount.amount | mnoCurrency : opp.amount.currency}}</div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n</div>\n");
$templateCache.put("widgets/sales-segmented-turnover.tmpl.html","<div widget-sales-segmented-turnover>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_turnover.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-time-period parent-widget=\"widget\" class=\"part\" deferred=\"::timePeriodDeferred\" hist-params=\"widget.metadata.hist_parameters\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_turnover.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_turnover.save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div class=\"row\">\n      <div ng-class=\"widget.isExpanded() ? \'col-md-6\' : \'col-md-12\'\">\n        <div setting-width parent-widget=\"widget\" min=\"3\" max=\"6\" class=\"settings width\" deferred=\"::widthDeferred\"></div>\n\n        <div class=\"selector\">{{\'impac.widget.sales_turnover.filter\' | translate}} <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred\"/></div>\n        <div class=\"chart-container\">\n          <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n        </div>\n\n        <div class=\"widget-lines-container\">\n\n          <div class=\"row widget-line header\">\n            <div class=\"col-xs-12\" translate>impac.widget.sales_turnover.average_price</div>\n          </div>\n\n          <div class=\"row widget-line\" ng-repeat=\"range in widget.content.ranges\">\n            <div class=\"col-xs-2\">\n              <i class=\"fa fa-circle\" ng-style=\"{ \'color\': getColorByIndex($index) }\" />\n            </div>\n            <div class=\"col-xs-7\">\n              {{getRangeLabel(range.label)}}\n            </div>\n            <div class=\"col-xs-3 text-right\">\n              <i>{{range.percentage}}%</i>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <div class=\"col-md-6 right-panel\" ng-show=\"widget.isExpanded()\">\n        <i class=\"fa fa-info-circle\" uib-tooltip=\"{{\'impac.widget.sales_turnover.tooltip.widget_segment\' | translate}}\" />\n        <h3>{{getMaxRange().percentage.toFixed()}}% {{\'impac.widget.sales_turnover.of_your_revenue\' | translate}} {{getMaxRange().label.split(\'-\')[0] | mnoCurrency : widget.content.currency}} {{\'impac.widget.sales_turnover.and\' | translate}} {{getMaxRange().label.split(\'-\')[1] | mnoCurrency : widget.content.currency}}.</h3>\n        <div class=\'analysis hidden-md\'>{{::analysisTranslate}}</div>\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-summary.tmpl.html","<div widget-sales-summary>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_summary.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-chart-filters parent-widget=\"widget\" class=\"part\" deferred=\"::chartFiltersDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_summary.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_summary.save</button>\n    </div>\n  </div>\n\n  <div align=\"center\" ng-hide=\"widget.isEditMode\">\n\n    <div class=\"selector\">\n      <span setting-param-selector parent-widget=\"widget\" param=\"filter\" options=\"filterOptions\" selected=\"filter\" deferred=\"::paramSelectorDeferred\" />\n      <span setting-dates-picker parent-widget=\"widget\" from=\"widget.metadata.hist_parameters.from\" to=\"widget.metadata.hist_parameters.to\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\" template=\"::datesPickerTemplate\"/>\n    </div>\n\n    <div class=\"chart-container\">\n      <div impac-chart draw-trigger=\"::drawTrigger.promise\" deferred=\"::chartDeferred\"></div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-top-customers.tmpl.html","<div widget-sales-top-customers>\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_top_customers.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n    <div setting-dates-picker parent-widget=\"widget\" class=\"part\" from=\"(widget.metadata.hist_parameters.from || defaultFrom)\" to=\"(widget.metadata.hist_parameters.to || defaultTo)\" keep-today=\"widget.metadata.hist_parameters.keep_today\" deferred=\"::datesPickerDeferred\"/>\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_top_customers.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_top_customers.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\" class=\"widget-lines-container\">\n\n    <div class=\"row selector\">\n      <div class=\"col-xs-12 text-right\">\n        <a ng-click=\"toggleTransactions()\">{{transactionsCollapsed ? \'impac.widget.sales_top_customers.show\' : \'impac.widget.sales_top_customers.hide\' | translate}} {{\'impac.widget.sales_top_customers.details\' | translate}}</a> |\n        <div setting-param-selector parent-widget=\"widget\" param=\"limit_entries\" options=\"limitEntriesOptions\" selected=\"limitEntriesSelected\" class=\"param-selector\" deferred=\"::paramSelectorDeferred\" no-reload/>\n      </div>\n    </div>\n\n    <!-- Header line -->\n    <div class=\"row widget-line header\">\n      <div class=\"col-xs-1\">\n        #\n      </div>\n      <div class=\"col-xs-7\" translate>impac.widget.sales_top_customers.customer_name</div>\n      <div class=\"col-xs-4 text-right\">\n        <div setting-param-selector parent-widget=\"widget\" param=\"header\" options=\"headerOptions\" selected=\"headerSelected\" class=\"param-selector\" deferred=\"::paramSelectorDeferred\" no-reload />\n      </div>\n    </div>\n\n    <!-- Content lines -->\n    <div class=\"row lines-group\" ng-repeat=\"entity in getEntities() | limitTo: limitEntriesSelected.value\">\n      <div class=\"col-xs-12\">\n\n        <div class=\"row widget-line\">\n          <div class=\"col-xs-2\">\n            {{$index + 1}}\n          </div>\n          <div class=\"col-xs-6\">\n            <b>{{entity.name}}</b>\n          </div>\n          <div class=\"col-xs-4 text-right\">\n            <b ng-if=\"getHeaderField().showCurrency\">\n              <span common-currency-conversions fx-amounts=\"getHeaderField().getFormattedFxTotals(entity)\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n              {{ getHeaderField().getValue(entity) | mnoCurrency : entity.currency }}\n            </b>\n            <b ng-if=\"!getHeaderField().showCurrency\">\n              {{ getHeaderField().getValue(entity) }}\n            </b>\n          </div>\n        </div>\n\n        <div class=\"row widget-line sub-line\" uib-collapse=\"transactionsCollapsed\">\n          <div class=\"col-xs-4\" ng-repeat=\"field in getRemainingFields() track by $index\" ng-class=\"{\'text-center\': ($index==1), \'text-right\': ($index==2)}\" >\n            <i ng-if=\"field.showCurrency\">\n              {{field.label}}: {{field.getValue(entity) | mnoCurrency : entity.currency}}\n              <span common-currency-conversions fx-amounts=\"field.getFormattedFxTotals(entity)\" base-currency=\"widget.metadata.currency\" rates-date=\"ratesDate\" />\n            </i>\n            <i ng-if=\"!field.showCurrency\">{{field.label}}: {{field.getValue(entity)}}</i>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");
$templateCache.put("widgets/sales-top-opportunities.tmpl.html","<div widget-sales-top-opportunities>\n\n  <div class=\"edit\" ng-show=\"widget.isEditMode\">\n    <h4 translate>impac.widget.sales_opportunities.settings.title</h4>\n\n    <div setting-organizations parent-widget=\"widget\" class=\"part\" deferred=\"::orgDeferred\" />\n\n    <div class=\"bottom-buttons\" align=\"right\">\n      <button class=\"btn btn-default\" ng-click=\"initSettings()\" translate>impac.widget.sales_opportunities.cancel</button>\n      <button class=\"btn btn-warning\" ng-click=\"updateSettings()\" translate>impac.widget.sales_opportunities.save</button>\n    </div>\n  </div>\n\n  <div ng-hide=\"widget.isEditMode\">\n\n    <div>\n\n      <div class=\"legend\">\n        {{\'impac.widget.sales_opportunities.total_potential\' | translate}} <b>{{widget.content.total_potential | mnoCurrency : widget.content.currency || \"AUD\"}}</b> - <b>{{widget.content.eligible_opportunities}}</b> {{\'impac.widget.sales_opportunities.eligible_opportunities\' | translate}}\n      </div>\n\n      <div class=\"opps-container\">\n        <div class=\"tile\" ng-repeat=\"opp in widget.content.opportunities track by $index\" ng-class=\"getOppClass($index)\">\n          <div class=\"colored-area\">{{$index +1 }}</div>\n          <div class=\"main-text\">\n            {{opp.name | titleize}}\n            <br />\n            <i style=\"font-size: 13px;\">{{getOppDetails(opp)}}</i>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n    <div ng-show=\"widget.demoData\" common-data-not-found />\n  </div>\n\n</div>\n");}]);
(function() {
  var module;

  module = angular.module('maestrano.impac');

  module.config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';
    return $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  }]);

  module.config(["$translateProvider", "ImpacThemingProvider", function($translateProvider, ImpacThemingProvider) {
    $translateProvider.useSanitizeValueStrategy('escapeParameters');
    return $translateProvider.useMessageFormatInterpolation();
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('maestrano.impac');

  module.constant('IMPAC_EVENTS', {
    kpiTargetAlert: 'kpi-target-alert',
    impacNotificationsLoad: 'impac-notifications-load',
    addOrRemoveAlerts: 'add-or-remove-alerts',
    kpisBarUpdateSettings: 'on-kpis-bar-update-settings',
    kpisBarToggleSettings: 'on-kpis-bar-toggle-settings',
    kpisBarUpdateDates: 'on-kpis-bar-update-dates',
    kpiPressEnterButton: 'on-kpi-press-enter-button'
  });

  module.constant('LOCALES', {
    list: [
      {
        id: 'en-gb',
        name: 'English (GB)'
      }, {
        id: 'zh-HK',
        name: 'Chinese (HK)'
      }
    ]
  });

}).call(this);

(function() {
  var module;

  module = angular.module('maestrano.impac');

  module.run(["ImpacAlerts", function(ImpacAlerts) {}]);

}).call(this);

(function () {console.info("Impac! Front-End Library - v1.6.0"); window["impac"] = {"version": "1.6.0"};}).call();
(function() {
  angular.module('impac.filters.mno-date', []).filter('mnoDate', ["$filter", function($filter) {
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
  }]);

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
  angular.module('impac.filters.mno-currency', []).filter('mnoCurrency', ["$filter", function($filter) {
    return function(amount, currency, ISOmode, decimal) {
      var SYMBOLS, s, symbol;
      if (currency == null) {
        currency = '';
      }
      if (ISOmode == null) {
        ISOmode = true;
      }
      SYMBOLS = {
        USD: '$',
        AUD: '$',
        CAD: '$',
        CNY: '¥',
        EUR: '€',
        GBP: '£',
        HKD: '$',
        INR: '',
        JPY: '¥',
        NZD: '$',
        SGD: '$',
        PHP: '₱',
        AED: '',
        IDR: 'Rp',
        MMK: ''
      };
      if (amount == null) {
        return "";
      }
      symbol = !ISOmode && _.has(SYMBOLS, currency) ? SYMBOLS[currency] : '';
      s = $filter('currency')(amount, symbol, decimal);
      s = s.replace('(', '-');
      s = s.replace(')', '');
      if ((currency && !currency.match(/[A-Z]{3}/)) || currency === '%' || currency === '(ratio)') {
        s = s.replace(/,/g, '');
        if (currency !== '%' && currency !== '(ratio)') {
          return parseInt(s);
        }
      }
      if (ISOmode) {
        s = s + " " + currency;
      }
      return s;
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
  var module;

  module = angular.module('impac.components.alerts-config', []);

  module.directive('alertsConfig', ["$uibModal", "$templateCache", "$compile", "$translate", "ImpacKpisSvc", "ImpacMainSvc", function($uibModal, $templateCache, $compile, $translate, ImpacKpisSvc, ImpacMainSvc) {
    return {
      restrict: 'EA',
      scope: {
        kpi: '=',
        buttonHtml: '@',
        afterSaveCallback: '=?'
      },
      template: $templateCache.get('alerts-config/alerts-config.tmpl.html'),
      link: function(scope, element, attrs) {
        var alertsConfig, htmlString;
        htmlString = scope.buttonHtml ? scope.buttonHtml : "<i class='fa fa-bell-o' />";
        alertsConfig = element.find('.alerts-config');
        alertsConfig.html(htmlString).show();
        return $compile(alertsConfig.contents())(scope);
      },
      controller: ["$scope", function($scope) {
        var alertsSettingsModal;
        $scope.members = [];
        $scope.alerts = {
          inapp: {
            service: 'inapp',
            label: $translate.instant('impac.kpi.alerts.service.inapp')
          },
          email: {
            service: 'email',
            label: "By sending me an email to:"
          }
        };
        $scope.recipientSearch = {
          text: "",
          focus: false
        };
        ImpacMainSvc.load().then(function(config) {
          var defaultActiveMember, emailAlert, emailAlertRecipients;
          $scope.members = config.currentOrgMembers;
          if (!($scope.members || !config.userData.email)) {
            $translate('impac.kpi.alerts.service.email', {
              EMAIL: 'hasEmail',
              email: config.userData.email
            }).then(function(label) {
              return $scope.alerts.email.label = label;
            });
          }
          emailAlert = _.find($scope.kpi.alerts, function(alert) {
            return alert.service === 'email';
          });
          if (emailAlert && $scope.members) {
            emailAlertRecipients = emailAlert.recipients.map(function(recipient) {
              return recipient.id;
            });
            return _.forEach($scope.members, function(member) {
              if (emailAlertRecipients.includes(member.id)) {
                return member.active = true;
              }
            });
          } else if ($scope.members) {
            defaultActiveMember = _.find($scope.members, function(member) {
              return member.email === config.userData.email;
            }) || $scope.members[0];
            if (defaultActiveMember) {
              return defaultActiveMember.active = true;
            }
          }
        });
        $scope.save = function(alerts) {
          if ($scope.members) {
            $scope.alerts.email.recipients = $scope.members.filter(function(member) {
              return member.active;
            });
          }
          if (!$scope.alerts.email.active) {
            _.forEach($scope.alerts.email.recipients, function(recipient) {
              return $scope.toggleRecipient(recipient);
            });
          }
          ImpacKpisSvc.saveAlerts($scope.kpi, alerts);
          $scope.modal.close();
          if ($scope.afterSaveCallback) {
            return $scope.afterSaveCallback();
          }
        };
        $scope.toggleAlert = function(alert) {
          return alert.active = !alert.active;
        };
        $scope.toggleRecipient = function(recipient) {
          if (!recipient.active || _.filter($scope.members, function(recipient) {
            return recipient.active;
          }).length > 1) {
            return recipient.active = !recipient.active;
          }
        };
        $scope.translateTarget = function(kpi) {
          var result, watchableTargets;
          if (kpi.targets) {
            watchableTargets = kpi.targets[kpi.element_watched];
          }
          if (!(watchableTargets && watchableTargets.length > 0)) {
            return;
          }
          result = [];
          if (watchableTargets[0].max != null) {
            result.push($translate.instant('impac.widget.alerts_config.over'), watchableTargets[0].max);
          } else if (watchableTargets[0].min) {
            result.push($translate.instant('impac.widget.alerts_config.below'), watchableTargets[0].min);
          }
          if (kpi.data != null) {
            result.push(kpi.data[kpi.element_watched].unit);
          }
          return result.join(' ');
        };
        alertsSettingsModal = {
          options: {
            backdrop: 'static',
            template: $templateCache.get('alerts-config/alerts-config.modal.html'),
            scope: $scope
          }
        };
        $scope.showAlertsSettings = function() {
          var alert, i, len, ref;
          if (angular.isDefined($scope.kpi.alerts)) {
            ref = $scope.kpi.alerts;
            for (i = 0, len = ref.length; i < len; i++) {
              alert = ref[i];
              $scope.alerts[alert.service].active = true;
            }
          }
          return $scope.modal = $uibModal.open(alertsSettingsModal.options);
        };
        $scope.showRecipientList = function(alert) {
          return alert.active && alert.service === 'email' && $scope.members;
        };
        $scope.onAddRecipientsKeyPress = function(event) {
          var availableInactiveRecipients, memberIndex, recipient;
          availableInactiveRecipients = _.filter(this.filteredMembers, function(member) {
            return !member.active;
          });
          recipient = _.find(availableInactiveRecipients, function(member) {
            return member.email === $scope.recipientSearch.text;
          });
          memberIndex = 0;
          if (event.which === 13) {
            if ($scope.selectedMember) {
              $scope.selectedMember.active = true;
              $scope.selectedMember = null;
            }
            if (recipient) {
              recipient.active = true;
              return $scope.recipientSearch.text = "";
            }
          } else if (event.which === 40 && availableInactiveRecipients.length > 0) {
            if ($scope.selectedMember) {
              memberIndex = _.indexOf(availableInactiveRecipients, $scope.selectedMember) + 1;
            }
            if (!(memberIndex < availableInactiveRecipients.length)) {
              memberIndex = 0;
            }
            return $scope.selectedMember = availableInactiveRecipients[memberIndex];
          } else if (event.which === 38 && availableInactiveRecipients.length > 0) {
            if ($scope.selectedMember) {
              memberIndex = _.indexOf(availableInactiveRecipients, $scope.selectedMember) - 1;
            }
            if (memberIndex < 0) {
              memberIndex = availableInactiveRecipients.length - 1;
            }
            return $scope.selectedMember = availableInactiveRecipients[memberIndex];
          } else {
            return $scope.selectedMember = null;
          }
        };
        $scope.onRecipientSearchFocus = function() {
          return $scope.recipientSearch.focus = true;
        };
        return $scope.showAvailableRecipients = function(alert) {
          if (!this.filteredMembers) {
            return false;
          }
          return $scope.showRecipientList(alert) && $scope.recipientSearch.focus && _.filter(this.filteredMembers, function(member) {
            return !member.active;
          }).length > 0;
        };
      }]
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
          var timeoutUntilVisible, userAgent, waitUntilVisible;
          userAgent = $window.navigator.userAgent;
          waitUntilVisible = true;
          if (waitUntilVisible) {
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
  var module;

  module = angular.module('impac.components.dashboard', []);

  module.controller('ImpacDashboardCtrl', ["$scope", "$http", "$q", "$filter", "$uibModal", "$log", "$timeout", "$templateCache", "MsgBus", "ImpacUtilities", "ImpacAssets", "ImpacTheming", "ImpacRoutes", "ImpacMainSvc", "ImpacDashboardsSvc", "ImpacWidgetsSvc", "$translate", "ImpacDhbTemplatesSvc", function($scope, $http, $q, $filter, $uibModal, $log, $timeout, $templateCache, MsgBus, ImpacUtilities, ImpacAssets, ImpacTheming, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, $translate, ImpacDhbTemplatesSvc) {
    var count, dhbLoadError, dhbLoadSuccess, saveDashboard, updatePlaceHolderSize;
    $scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
    $scope.widgetsTemplates = ImpacDashboardsSvc.getWidgetsTemplates();
    $scope.impacTitleLogo = ImpacAssets.get('impacTitleLogo');
    $scope.impacDashboardBackground = ImpacAssets.get('impacDashboardBackground');
    $scope.showDhbHeading = ImpacTheming.get().dhbConfig.showDhbHeading;
    $scope.dhbHeadingText = ImpacTheming.get().dhbConfig.dhbHeadingText;
    $scope.dhbErrorsConfig = ImpacTheming.get().dhbErrorsConfig;
    $scope.dhbLabelName = ImpacTheming.getDhbLabelName();
    $scope.dhbSettingsConfig = ImpacTheming.get().dhbSettings;
    $scope.createFromTemplateEnabled = $scope.dhbSettingsConfig.createFromTemplateEnabled;
    $scope.showKpisBar = function() {
      return ImpacDashboardsSvc.areKpisEnabled() && ImpacDashboardsSvc.isThereADashboard();
    };
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
    $scope.failedDashboardLoad = false;
    dhbLoadSuccess = function(success) {
      $scope.activateTimer();
      return $scope.hasMyobEssentialsOnly = ImpacMainSvc.config.currentOrganization.has_myob_essentials_only;
    };
    dhbLoadError = function(error) {
      $scope.failedDashboardLoad = true;
      return $scope.isLoading = false;
    };
    ImpacDashboardsSvc.load(true).then(dhbLoadSuccess, dhbLoadError);
    count = 0;
    $scope.displaySecondMsg = false;
    $scope.reloadDashboard = function() {
      count++;
      if (count >= 3) {
        $scope.displaySecondMsg = true;
      }
      return ImpacDashboardsSvc.reload(true).then(dhbLoadSuccess, dhbLoadError);
    };
    ImpacDashboardsSvc.dhbLoader().then(null, null, function(triggerLoad) {
      if (triggerLoad) {
        return $scope.isLoading = true;
      } else {
        return $scope.activateTimer();
      }
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
      windowClass: 'inverse dhb-create-modal',
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
      $scope.createDashboardModal.isTemplate = false;
      self.dhbLabelName = ImpacTheming.getDhbLabelName();
      self.instance = $uibModal.open(self.config);
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
      var dashboard, organizations, promise, self;
      self = $scope.createDashboardModal;
      if (!self.model.name) {
        return;
      }
      self.isLoading = true;
      dashboard = self.model;
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
      dashboard.organization_ids = _.pluck(organizations, 'id');
      dashboard.metadata = _.omit(dashboard.metadata, ['organization_ids']);
      promise = dashboard.id ? ImpacDashboardsSvc.copy(dashboard) : ImpacDashboardsSvc.create(dashboard);
      return promise.then(function(dashboard) {
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
      return $scope.createDashboardModal.organizations.length > 1 && ImpacTheming.get().dhbConfig.multiCompany;
    };
    $scope.createDashboardModal.canAccessAnalyticsData = function(organization) {
      return organization.current_user_role && (organization.current_user_role === "Super Admin" || organization.current_user_role === "Admin");
    };
    $scope.createDashboardModal.onSelectTemplate = function(arg) {
      var template;
      template = arg.template;
      $scope.createDashboardModal.isTemplate = !_.isEmpty(template);
      return $scope.createDashboardModal.model = template;
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
      return ImpacDashboardsSvc.isThereADashboard() && ($scope.forceShowWidgetSelector || ImpacDashboardsSvc.isCurrentDashboardEmpty());
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
    $scope.isCategorySelected = function(category) {
      if (($scope.selectedCategory != null) && (category != null)) {
        return $scope.selectedCategory === category;
      } else {
        return false;
      }
    };
    $scope.selectCategory = function(category) {
      return $scope.selectedCategory = category;
    };
    $scope.getSelectedCategoryName = function() {
      if ($scope.selectedCategory != null) {
        switch ($scope.selectedCategory) {
          case 'accounts':
            return $translate.instant('impac.dashboard.category_name.accounting');
          case 'invoices':
            return $translate.instant('impac.dashboard.category_name.invoicing');
          case 'hr':
            return $translate.instant('impac.dashboard.category_name.hr_or_payroll');
          case 'sales':
            return $translate.instant('impac.dashboard.category_name.sales');
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
              top: '63px'
            };
          case 'hr':
            return {
              top: '93px'
            };
          case 'sales':
            return {
              top: '123px'
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
      if (($scope.selectedCategory != null) && ($scope.widgetsTemplates != null)) {
        return _.select($scope.widgetsTemplates, function(template) {
          var bolt, widgetCategory;
          if (template.metadata && template.metadata.template) {
            widgetCategory = template.metadata.template.split('/')[0];
          } else if (template.metadata && template.metadata.bolt_path) {
            bolt = _.find(ImpacRoutes.bolts(), function(bolt) {
              return bolt.path === template.metadata.bolt_path;
            });
            widgetCategory = bolt.category;
          } else {
            widgetCategory = template.endpoint.split('/')[0];
          }
          return widgetCategory === $scope.selectedCategory;
        });
      } else {
        return [];
      }
    };
    $scope.addWidget = function(widgetTemplate) {
      var params;
      params = _.pick(widgetTemplate, ['endpoint', 'name', 'width', 'metadata']);
      angular.element('#widget-selector').css('cursor', 'progress');
      angular.element('#widget-selector .section-lines .line-item').css('cursor', 'progress');
      return ImpacWidgetsSvc.create(params).then(function() {
        $scope.errors = '';
        angular.element('#widget-selector .badge.widget-added').fadeTo(250, 1);
        $timeout(function() {
          return angular.element('#widget-selector .badge.widget-added').fadeTo(700, 0);
        }, 4000);
      }, function(errors) {
        return $scope.errors = ImpacUtilities.processRailsError(errors);
      })["finally"](function() {
        angular.element('#widget-selector').css('cursor', 'auto');
        return angular.element('#widget-selector .section-lines .line-item').css('cursor', 'pointer');
      });
    };
    $scope.triggerUpload = function() {
      var fileInput;
      fileInput = angular.element("#fileInput");
      fileInput.on('change', function(event) {
        var files, reader;
        files = event.target.files;
        if (files && files[0]) {
          reader = new FileReader();
          reader.onload = function(e) {
            return $scope.impacTitleLogo = e.target.result;
          };
          return reader.readAsDataURL(files[0]);
        }
      });
      fileInput.trigger('click');
      return true;
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
      self.instance = $uibModal.open(self.config);
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
      cancel: ".unsortable,.editable-input",
      handle: ".top-line",
      helper: 'clone'
    };
  }]);

  module.directive('impacDashboard', ["$templateCache", "ImpacDashboardsSvc", function($templateCache, ImpacDashboardsSvc) {
    return {
      restrict: 'EA',
      scope: {
        forceLoad: '=load'
      },
      template: $templateCache.get('dashboard/dashboard.tmpl.html'),
      controller: 'ImpacDashboardCtrl',
      link: function(scope, element) {
        scope.pdfMode = false;
        ImpacDashboardsSvc.pdfModeEnabled().then(null, null, function() {
          return scope.pdfMode = true;
        });
        return ImpacDashboardsSvc.pdfModeCanceled().then(null, null, function() {
          return scope.pdfMode = false;
        });
      }
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.components.dashboard-selector', []).directive('dashboardSelector', ["$log", "$compile", "$templateCache", "$http", "$timeout", "$uibModal", "ImpacTheming", "ImpacDashboardsSvc", "ImpacMainSvc", "ImpacUtilities", function($log, $compile, $templateCache, $http, $timeout, $uibModal, ImpacTheming, ImpacDashboardsSvc, ImpacMainSvc, ImpacUtilities) {
    return {
      restrict: 'E',
      scope: {
        onCreateDashboard: '&',
        isWidgetSelectorShown: '&',
        onDisplayWidgetSelector: '&',
        onSelectDashboard: '&',
        pdfMode: '='
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
          self.dhbLabelName = ImpacTheming.getDhbLabelName();
          self.instance = $uibModal.open(self.config);
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
        scope.isThereADashboard = ImpacDashboardsSvc.isThereADashboard;
        scope.isCurrentDashboardEmpty = ImpacDashboardsSvc.isCurrentDashboardEmpty;
        options = ImpacTheming.get().dhbSelectorConfig;
        scope.isAccessibilityEnabled = options.accessibilityEnabled;
        scope.isAddWidgetEnabled = options.addWidgetEnabled;
        scope.isAddDhbEnabled = options.addDhbEnabled;
        scope.isDeleteDhbEnabled = options.deleteDhbEnabled;
        scope.dhbLabelName = ImpacTheming.getDhbLabelName();
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
  var module;

  module = angular.module('impac.components.dashboard-templates-selector', []);

  module.component('dashboardTemplatesSelector', {
    templateUrl: 'dashboard-templates-selector/dashboard-templates-selector.tmpl.html',
    bindings: {
      onSelect: '&'
    },
    controller: ["toastr", "ImpacDhbTemplatesSvc", function(toastr, ImpacDhbTemplatesSvc) {
      var ctrl;
      ctrl = this;
      ctrl.$onInit = function() {
        ctrl.templates = [];
        ctrl.selectedTemplate = {};
        ctrl.isTemplatesMode = false;
        ctrl.hideLoader = false;
        return ImpacDhbTemplatesSvc.index().then(function(templates) {
          return ctrl.templates = templates;
        }, function() {
          return toastr.error('Failed to retrieve dashboard templates. You can still create your dashboard from scratch.', 'Error');
        })["finally"](function() {
          return ctrl.hideLoader = true;
        });
      };
      ctrl.hasTemplates = function() {
        return ctrl.templates.length;
      };
      ctrl.templateOnClick = function(template) {
        ctrl.selectedTemplate = ctrl.isSelected(template) ? {} : template;
        return ctrl.onSelect({
          $event: {
            template: angular.copy(ctrl.selectedTemplate)
          }
        });
      };
      ctrl.isSelected = function(template) {
        return _.isEqual(template, ctrl.selectedTemplate);
      };
      ctrl.toggleTemplatesMode = function() {
        ctrl.isTemplatesMode = !ctrl.isTemplatesMode;
        if (!ctrl.isTemplatesMode) {
          return ctrl.templateOnClick({});
        }
      };
      return ctrl;
    }]
  });

}).call(this);

(function() {
  angular.module('impac.components.kpi', []).directive('impacKpi', ["$log", "$timeout", "$templateCache", "ImpacKpisSvc", "ImpacEvents", "IMPAC_EVENTS", "$translate", function($log, $timeout, $templateCache, ImpacKpisSvc, ImpacEvents, IMPAC_EVENTS, $translate) {
    return {
      restrict: 'EA',
      scope: {
        onDelete: '&',
        kpi: '=',
        editMode: '=',
        loadReady: '='
      },
      template: $templateCache.get('kpi/kpi.tmpl.html'),
      controller: ["$scope", "$element", function($scope, $element) {
        var animateKpiPanels, applyPlaceholderValues, fetchKpiData, onToggleSettingsCb, onUpdateDatesCb, onUpdateSettingsCb;
        fetchKpiData = function() {
          return ImpacKpisSvc.show($scope.kpi).then(function(renderedKpi) {
            var kpiTemplate, watchablesWithoutTargets;
            angular.extend($scope.kpi, renderedKpi);
            kpiTemplate = ImpacKpisSvc.getKpiTemplate($scope.kpi.endpoint, $scope.kpi.element_watched);
            $scope.kpi.name = (kpiTemplate != null) && kpiTemplate.name;
            if ((kpiTemplate != null) && (kpiTemplate.extra_params != null)) {
              $scope.kpi.possibleExtraParams = kpiTemplate.extra_params;
              _.forIn($scope.kpi.possibleExtraParams, function(paramValues, param) {
                var base;
                if (paramValues[0]) {
                  return ((base = $scope.kpi).extra_params || (base.extra_params = {}))[param] = paramValues[0].id;
                }
              });
            }
            watchablesWithoutTargets = false;
            _.forEach($scope.kpi.watchables, function(watchable) {
              var existingTargets;
              if (_.isEmpty((existingTargets = $scope.getTargets(watchable)))) {
                $scope.addTargetToWatchable(watchable);
                return watchablesWithoutTargets = true;
              } else {
                return $scope.targets[watchable] = angular.copy(existingTargets);
              }
            });
            if (watchablesWithoutTargets) {
              return $scope.displayEditSettings();
            }
          });
        };
        onUpdateSettingsCb = function(force) {
          if ($scope.kpi.isEditing || force) {
            return $scope.updateSettings();
          }
        };
        onToggleSettingsCb = function() {
          return animateKpiPanels();
        };
        onUpdateDatesCb = function() {
          if (!$scope.kpi["static"]) {
            return fetchKpiData();
          }
        };
        applyPlaceholderValues = function() {
          _.forEach($scope.kpi.watchables, function(watchable) {
            var data, target;
            data = $scope.getTargetPlaceholder(watchable);
            (target = {})[data.mode] = data.value;
            return $scope.targets[watchable] = [target];
          });
          return $scope.updateSettings(true);
        };
        animateKpiPanels = function() {
          var element;
          element = angular.element($element).find('.kpi-content');
          if (!element) {
            return;
          }
          element.animate({
            opacity: 0
          }, 0);
          return $timeout(function() {
            return element.animate({
              opacity: 1
            }, 150);
          }, 200);
        };
        $scope.kpiTemplates = ImpacKpisSvc.getKpisTemplates();
        $scope.possibleExtraParams = [];
        $scope.targets = {};
        $scope.possibleTargets = [
          {
            label: $translate.instant('impac.kpi.below'),
            mode: 'min'
          }, {
            label: $translate.instant('impac.kpi.over'),
            mode: 'max'
          }
        ];
        $scope.kpi.isLoading = true;
        $scope.loadReady.promise.then(function() {
          if (!$scope.kpi["static"]) {
            return fetchKpiData()["finally"](function() {
              return $scope.kpi.isLoading = false;
            });
          } else {
            return $scope.kpi.isLoading = false;
          }
        });
        ImpacEvents.registerCb(IMPAC_EVENTS.kpisBarUpdateSettings, onUpdateSettingsCb);
        ImpacEvents.registerCb(IMPAC_EVENTS.kpisBarToggleSettings, onToggleSettingsCb);
        ImpacEvents.registerCb(IMPAC_EVENTS.kpisBarUpdateDates, onUpdateDatesCb);
        $scope.$on('$destroy', function() {
          ImpacEvents.deregisterCb(IMPAC_EVENTS.kpisBarUpdateSettings, onUpdateSettingsCb);
          ImpacEvents.deregisterCb(IMPAC_EVENTS.kpisBarToggleSettings, onToggleSettingsCb);
          return ImpacEvents.deregisterCb(IMPAC_EVENTS.kpisBarUpdateDates, onUpdateDatesCb);
        });
        $scope.addTargetToWatchable = function(watchable) {
          var base, newTarget;
          if (_.has($scope.targets, watchable)) {
            return;
          }
          (newTarget = {})[$scope.getTargetPlaceholder(watchable).mode] = '';
          return ((base = $scope.targets)[watchable] || (base[watchable] = [])).push(newTarget);
        };
        $scope.displayEditSettings = function() {
          return $scope.kpi.isEditing = true;
        };
        $scope.hideEditSettings = function() {
          return $scope.kpi.isEditing = false;
        };
        $scope.hasValidTargets = function() {
          return ImpacKpisSvc.validateKpiTargets($scope.targets);
        };
        $scope.hasContent = function() {
          return !!($scope.kpi && $scope.kpi.layout && $scope.kpi.data);
        };
        $scope.showKpiContent = function() {
          return !$scope.isLoading() && $scope.hasContent();
        };
        $scope.isDataNotFound = function() {
          return !$scope.hasContent();
        };
        $scope.isLoading = function() {
          return $scope.kpi.isLoading;
        };
        $scope.updateExtraParam = function() {
          return $scope.updateSettings(true);
        };
        $scope.updateSettings = function(force) {
          var form, hasValidTargets, params, touched;
          params = {};
          touched = (form = $scope["kpi" + $scope.kpi.id + "SettingsForm"]) && form.$dirty;
          hasValidTargets = $scope.hasValidTargets();
          if (!(touched && hasValidTargets || force)) {
            return $scope.cancelUpdateSettings(hasValidTargets);
          }
          params.targets = $scope.targets;
          if (!_.isEmpty($scope.kpi.extra_params)) {
            params.extra_params = $scope.kpi.extra_params;
          }
          if (!_.isEmpty(params)) {
            ImpacKpisSvc.update($scope.kpi, params);
          }
          form.$setPristine();
          return $timeout(function() {
            return $scope.hideEditSettings();
          }, 200);
        };
        $scope.cancelUpdateSettings = function(hasValidTargets) {
          if (_.isEmpty($scope.kpi.targets)) {
            applyPlaceholderValues();
          } else {
            $scope.targets = angular.copy($scope.kpi.targets);
          }
          return $timeout(function() {
            return $scope.hideEditSettings();
          }, 200);
        };
        $scope.deleteKpi = function() {
          if ($scope.kpi["static"]) {
            return;
          }
          $scope.kpi.isLoading = true;
          return ImpacKpisSvc["delete"]($scope.kpi).then(function(success) {
            return $scope.onDelete();
          })["finally"](function() {
            return $scope.kpi.isLoading = false;
          });
        };
        $scope.isTriggered = function() {
          return ($scope.kpi.layout != null) && $scope.kpi.layout.triggered;
        };
        $scope.isEditing = function() {
          return $scope.kpi.isEditing || $scope.editMode;
        };
        $scope.getFormTargetValueInput = function(watchable, targetIndex) {
          return $scope["kpi" + $scope.kpi.id + "SettingsForm"][watchable + "TargetValue" + targetIndex];
        };
        $scope.getTargets = function(watchable) {
          return (($scope.kpi.targets != null) && $scope.kpi.targets[watchable]) || [];
        };
        $scope.getTargetUnit = function(watchable) {
          var unit;
          unit = (($scope.kpi.data != null) && $scope.kpi.data[watchable].unit) || $scope.getTargetPlaceholder(watchable).unit || '';
          if (unit === 'currency') {
            return ImpacKpisSvc.getCurrentDashboard().currency;
          } else {
            return unit;
          }
        };
        $scope.getTargetPlaceholder = function(watchable) {
          return ImpacKpisSvc.getKpiTargetPlaceholder($scope.kpi.endpoint, watchable);
        };
        $scope.getRealValue = function() {
          var kpi, unit, value;
          kpi = $scope.kpi;
          if (_.isEmpty(kpi.data)) {
            return "";
          }
          value = kpi.data[kpi.watchables[0]].value;
          unit = kpi.data[kpi.watchables[0]].unit;
          return [value, unit].join(' ').trim();
        };
        $scope.bindTargetInputPlaceholder = function(watchable, targetIndex) {
          var name;
          return $scope[name = watchable + "TargetPlaceholder" + targetIndex] || ($scope[name] = '');
        };
        $scope.setTargetInputPlaceholder = function(watchable, targetIndex) {
          return $scope[watchable + "TargetPlaceholder" + targetIndex] = $scope.getTargetPlaceholder(watchable).value || '';
        };
        $scope.resetTargetInputPlaceholder = function(watchable, targetIndex) {
          return $scope[watchable + "TargetPlaceholder" + targetIndex] = '';
        };
        return $scope.onKeyPress = function(keyEvent) {
          if (keyEvent.which === 13) {
            return ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpiPressEnterButton);
          }
        };
      }]
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.components.kpis-bar', []).directive('kpisBar', ["$templateCache", "$q", "$timeout", "ImpacKpisSvc", "ImpacDashboardsSvc", "ImpacTheming", "ImpacEvents", "IMPAC_EVENTS", function($templateCache, $q, $timeout, ImpacKpisSvc, ImpacDashboardsSvc, ImpacTheming, ImpacEvents, IMPAC_EVENTS) {
    return {
      restrict: 'E',
      scope: {
        kpis: '='
      },
      template: $templateCache.get('kpis-bar/kpis-bar.tmpl.html'),
      controller: ["$scope", "$log", "$element", function($scope, $log, $element) {
        var animateKpiBarPanel, buildKpiWatchables, initAvailableKpis, initDatesPicker, kpiIsEditing;
        $scope.availableKpis = {
          kpiSelectorHidden: true,
          toggle: function() {
            if (!$scope.hasKpiAvailability()) {
              return false;
            }
            return $scope.availableKpis.kpiSelectorHidden = !$scope.availableKpis.kpiSelectorHidden;
          },
          list: []
        };
        $scope.showKpisExpanded = false;
        $scope.showEditMode = false;
        $scope.isAddingKpi = false;
        $scope.showContent = true;
        $scope.dhbLabelName = ImpacTheming.getDhbLabelName();
        ImpacKpisSvc.load().then(function() {
          initAvailableKpis();
          return buildKpiWatchables();
        });
        ImpacDashboardsSvc.dashboardChanged().then(null, null, function() {
          return $timeout(function() {
            initAvailableKpis();
            return buildKpiWatchables();
          });
        });
        $scope.sortableOptions = {
          stop: function() {
            var ids;
            ids = _.pluck($scope.kpis, 'id');
            return ImpacKpisSvc.updateKpisOrder(ids);
          },
          cursorAt: {
            left: 100,
            top: 20
          },
          opacity: 0.5,
          delay: 150,
          tolerance: 'pointer',
          cursor: "move",
          revert: 250,
          handle: ".top-line",
          cancel: ".unsortable",
          helper: 'clone'
        };
        $scope.kpisDateRange = {};
        $scope.kpiDatesDeferred = $q.defer();
        $scope.datesPickerDeferred = $q.defer();
        initDatesPicker = function() {
          return $scope.datesPickerDeferred.promise.then(function(settingDatesPicker) {
            return ImpacKpisSvc.getKpisDateRange().then(function(dates) {
              $scope.kpisDateRange.from = dates.from;
              $scope.kpisDateRange.to = dates.to;
              return $scope.kpisDateRange.keepToday = dates.keepToday;
            }, function() {
              return $scope.hideDatesPicker = true;
            })["finally"](function() {
              $scope.kpiDatesDeferred.resolve();
              return settingDatesPicker.initialize();
            });
          });
        };
        initDatesPicker();
        ImpacDashboardsSvc.dashboardChanged().then(null, null, function(result) {
          if (result) {
            return initDatesPicker();
          }
        });
        ImpacEvents.registerCb(IMPAC_EVENTS.kpiPressEnterButton, function() {
          return $scope.toggleEditMode();
        });
        $scope.addKpi = function(kpi) {
          var opts;
          if ($scope.isAddingKpi) {
            return;
          }
          $scope.isAddingKpi = true;
          kpi.element_watched = kpi.watchables[0];
          opts = {};
          opts.extra_watchables = _.filter(kpi.watchables, function(w) {
            return w !== kpi.element_watched;
          });
          return ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched, opts).then(function(success) {
            return $scope.kpis.push(success);
          }, function(error) {
            return $log.error("Impac Kpis bar can't add a kpi", error);
          })["finally"](function() {
            initAvailableKpis();
            return $scope.isAddingKpi = false;
          });
        };
        $scope.removeKpi = function(kpiId) {
          _.remove($scope.kpis, function(kpi) {
            return kpi.id === kpiId;
          });
          return initAvailableKpis();
        };
        $scope.toggleEditModeLock = false;
        $scope.toggleEditMode = function() {
          var f;
          if ($scope.toggleEditModeLock) {
            return;
          }
          $scope.toggleEditModeLock = true;
          ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpisBarToggleSettings);
          if (kpiIsEditing() && !$scope.showEditMode) {
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpisBarUpdateSettings);
          } else {
            if ((f = $scope.showEditMode)) {
              ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpisBarUpdateSettings, f);
            }
            $scope.showEditMode = !$scope.showEditMode;
          }
          if (!($scope.availableKpis.kpiSelectorHidden || $scope.showEditMode)) {
            $scope.availableKpis.toggle();
          }
          return $timeout(function() {
            return $scope.toggleEditModeLock = false;
          }, 450);
        };
        $scope.isEditing = function() {
          return $scope.showEditMode || kpiIsEditing();
        };
        $scope.kpisBarUpdateDates = function(dates) {
          var dashboard;
          if (!(_.isObject(dates) && !_.isEmpty(dates))) {
            return;
          }
          dashboard = ImpacDashboardsSvc.getCurrentDashboard();
          angular.merge(dashboard.metadata, {
            kpis_hist_parameters: dates
          });
          return ImpacDashboardsSvc.update(dashboard.id, {
            metadata: dashboard.metadata
          }).then(function() {
            return ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpisBarUpdateDates);
          });
        };
        $scope.toggleShowContent = function() {
          $scope.showContent = !$scope.showContent;
          animateKpiBarPanel();
          return true;
        };
        $scope.hasKpiAvailability = function() {
          return $scope.availableKpis.list.length;
        };
        $scope.showDatesPicker = function() {
          return $scope.isEditing() && $scope.kpis.length && !$scope.hideDatesPicker;
        };
        kpiIsEditing = function() {
          return _.includes(_.map($scope.kpis, function(kpi) {
            return kpi.isEditing;
          }), true);
        };
        initAvailableKpis = function() {
          $scope.availableKpis.list = _.select(ImpacKpisSvc.getKpisTemplates(), function(k) {
            return _.isEmpty(k.attachables) && _.isEmpty(_.select($scope.kpis, function(existingKpi) {
              return existingKpi.endpoint === k.endpoint && existingKpi.element_watched === k.watchables[0];
            }));
          });
          if (_.isEmpty($scope.availableKpis.list)) {
            return $scope.availableKpis.kpiSelectorHidden = true;
          }
        };
        buildKpiWatchables = function() {
          return _.forEach($scope.kpis, function(kpi) {
            return ImpacKpisSvc.buildKpiWatchables(kpi);
          });
        };
        return animateKpiBarPanel = function() {
          var elements;
          elements = angular.element($element).find('.kpis .content, .kpis .content-buttons');
          if (!elements) {
            return;
          }
          return elements.slideToggle(500);
        };
      }]
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widget', []);

  module.controller('ImpacWidgetCtrl', ["$scope", "$log", "$q", "$timeout", "ImpacWidgetsSvc", "ImpacDashboardsSvc", function($scope, $log, $q, $timeout, ImpacWidgetsSvc, ImpacDashboardsSvc) {
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
      return ImpacWidgetsSvc.show(w, refreshCache)["finally"](function() {
        if ($scope.isAccessibility) {
          $scope.initialWidth = w.width;
          return w.width = 12;
        } else if ($scope.initialWidth) {
          return w.width = $scope.initialWidth;
        }
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
    $scope.getColClass = function() {
      return "col-md-" + w.width;
    };
    w.getCssClasses = function() {
      var classes;
      classes = [$scope.getColClass()];
      if ($scope.pdfMode) {
        classes.push('pdf-mode');
      }
      if (!w.ticked) {
        classes.push('hidden-print');
      }
      return classes.join(' ');
    };
    ImpacDashboardsSvc.pdfModeEnabled().then(null, null, function() {
      $scope.pdfMode = true;
      if (!angular.isDefined(w.ticked)) {
        w.ticked = true;
      }
      $scope.widget.hasEditAbility = false;
      return $scope.initSettings();
    });
    ImpacDashboardsSvc.pdfModeCanceled().then(null, null, function() {
      $scope.pdfMode = false;
      return $scope.widget.hasEditAbility = true;
    });
    return $scope.tick = function() {
      w.ticked = !w.ticked;
      return ImpacDashboardsSvc.tick();
    };
  }]);

  module.directive('impacWidget', ["$templateCache", "ImpacUtilities", function($templateCache, ImpacUtilities) {
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
        scope.pdfMode = false;
        scope.widget.hasEditAbility = true;
        scope.widget.hasDeleteAbility = true;
        scope.cssClass = ImpacUtilities.fetchWidgetCssClass(scope.widget);
        scope.templatePath = ImpacUtilities.fetchWidgetTemplatePath(scope.widget);
        scope.showInfoPanel = false;
        scope.isInfoPanelDisplayed = function() {
          return scope.showInfoPanel;
        };
        scope.toggleInfoPanel = function() {
          return scope.showInfoPanel = !scope.showInfoPanel;
        };
        scope.editTitle = false;
        scope.isTitleEdited = function() {
          return scope.editTitle;
        };
        scope.toggleEditTitle = function() {
          return scope.editTitle = !scope.editTitle;
        };
        scope.showDeleteWidget = false;
        return scope.toggleDeleteWidget = function() {
          return scope.showDeleteWidget = !scope.showDeleteWidget;
        };
      },
      template: $templateCache.get('widget/widget.tmpl.html')
    };
  }]);

}).call(this);

(function() {
  angular.module('impac.services.alerts', []).service('ImpacAlerts', ["$log", "$q", "$http", "$httpParamSerializerJQLike", "ImpacRoutes", "ImpacMainSvc", "ImpacEvents", "IMPAC_EVENTS", function($log, $q, $http, $httpParamSerializerJQLike, ImpacRoutes, ImpacMainSvc, ImpacEvents, IMPAC_EVENTS) {
    var _self;
    _self = this;
    this.config = {};
    ImpacEvents.registerCb(IMPAC_EVENTS.impacNotificationsLoad, function(callback) {
      return _self.getAlerts().then(function(alerts) {
        return callback(alerts);
      });
    });
    this.getAlerts = function() {
      return $http.get(ImpacRoutes.kpis.alerts.index()).then(function(success) {
        return success.data;
      }, function(error) {
        $log.error('ImpacAlerts Service: cannot get alerts.', error);
        return error;
      });
    };
    this.create = function(kpiId, params) {
      return $http.post(ImpacRoutes.kpis.alerts.create(kpiId), params);
    };
    this.update = function(alertId, params) {
      return $http.put(ImpacRoutes.kpis.alerts.update(alertId), params);
    };
    this["delete"] = function(alertId) {
      return $http["delete"](ImpacRoutes.kpis.alerts["delete"](alertId));
    };
    return _self;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.assets', []).provider('ImpacAssets', function() {
    var _$get, paths, provider;
    provider = this;
    paths = {
      defaultImagesPath: '/images',
      impacTitleLogo: ':default/impac-title-logo.png',
      impacDashboardBackground: ':default/impac-dashboard-background.png',
      currencyConversionsIcon: ':default/currency-conversions.png'
    };
    provider.configure = function(configOptions) {
      angular.extend(paths, configOptions);
      return _.forIn(paths, function(v, k) {
        return paths[k] = v.replace(':default', paths.defaultImagesPath);
      });
    };
    _$get = function($log) {
      var service;
      service = this;
      service.get = function(key) {
        return paths[key];
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
    this.getLightenColor = function(index, alpha) {
      var htmlColor;
      htmlColor = COLORS.array[index % COLORS.array.length];
      if (htmlColor) {
        return lightenColor(htmlColor, alpha || 0.4);
      }
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
      },
      legend: {
        display: false
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
    this.combinedBarChart = function(inputData, opts, positivesOnly, versusMode) {
      var index, result;
      if (opts == null) {
        opts = {};
      }
      if (positivesOnly == null) {
        positivesOnly = true;
      }
      if (versusMode == null) {
        versusMode = false;
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
            if (versusMode) {
              if (index === 0) {
                color = _self.getNegativeColor();
              } else {
                color = _self.getPositiveColor();
              }
            }
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
  angular.module('impac.services.currency-rates', []).service('ImpacCurrencyRatesSvc', ["$log", "$http", "$filter", "$q", "$timeout", "ImpacRoutes", "ImpacMainSvc", "ImpacDashboardsSvc", function($log, $http, $filter, $q, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc) {
    var _self, formatShowQuery;
    _self = this;
    this.getSsoSessionId = ImpacMainSvc.getSsoSessionId;
    this.getCurrentDashboard = ImpacDashboardsSvc.getCurrentDashboard;
    this.getOrgUids = _.pluck(_self.getCurrentDashboard().data_sources, 'uid');
    this.locked = false;
    this.ratesForPeriod = function(hist_parameters) {
      var params, url;
      if (!this.locked) {
        this.locked = true;
        params = {
          sso_session: this.getSsoSessionId,
          engine: "currencies/currency_rates",
          metadata: {
            organization_ids: this.getOrgUids,
            hist_parameters: hist_parameters
          }
        };
        url = formatShowQuery(ImpacRoutes.widgets.show(), params);
        return $http.get(url).then(function(response) {
          var i, len, rate, rates, ref;
          rates = [];
          if ((response != null) && (response.data != null) && !_.isEmpty(response.data.content)) {
            ref = response.data.content['currency_rates'];
            for (i = 0, len = ref.length; i < len; i++) {
              rate = ref[i];
              rates.push(rate);
            }
          }
          $log.info("Impac! - CurrencyRatesSvc: ratesForPeriod params " + params);
          return rates;
        }, function(err) {
          $log.error('Impac! - CurrencyRatesSvc: Cannot retrieve current rates :', err);
          return $q.reject(err);
        })["finally"](function() {
          return _self.locked = false;
        });
      } else {
        $log.warn("Impac! - CurrencyRatesSvc: ratesForPeriod locked. Trying again in 1s");
        return $timeout((function() {
          return _self.ratesForPeriod(hist_parameters);
        }), 1000);
      }
    };
    formatShowQuery = function(basePath, params) {
      var url;
      url = [basePath, decodeURIComponent($.param(params))].join('?');
      return url;
    };
    return this;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.dashboard-templates', []).service('ImpacDhbTemplatesSvc', ["$q", "$http", "$log", "ImpacRoutes", "ImpacDashboardsSvc", function($q, $http, $log, ImpacRoutes, ImpacDashboardsSvc) {
    var _self;
    _self = this;
    this.index = function() {
      return $http.get(ImpacRoutes.dashboardTemplates.index()).then(function(response) {
        return response.data || [];
      }, function(err) {
        $log.err('Impac! DashboardTemplatesSvc: failed to retrieve dashboard templates', err);
        return $q.reject();
      });
    };
    return this;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.dashboards', []).service('ImpacDashboardsSvc', ["$q", "$http", "$log", "$timeout", "ImpacMainSvc", "ImpacRoutes", "ImpacTheming", "ImpacDeveloper", "ImpacUtilities", function($q, $http, $log, $timeout, ImpacMainSvc, ImpacRoutes, ImpacTheming, ImpacDeveloper, ImpacUtilities) {
    var _self, belongsToCurrentOrganization, fetchWidgetsTemplates, isTemplateAllowed, needConfigurationLoad, setDefaultCurrentDashboard, widgetsTemplatesUrl;
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
    this.callbacks.pdfModeEnabled = $q.defer();
    this.pdfModeEnabled = function() {
      return _self.callbacks.pdfModeEnabled.promise;
    };
    this.callbacks.pdfModeCanceled = $q.defer();
    this.pdfModeCanceled = function() {
      return _self.callbacks.pdfModeCanceled.promise;
    };
    this.togglePdfMode = function(enabled) {
      if (enabled) {
        return _self.callbacks.pdfModeEnabled.notify();
      } else {
        return _self.callbacks.pdfModeCanceled.notify();
      }
    };
    this.callbacks.ticked = $q.defer();
    this.ticked = function() {
      return _self.callbacks.ticked.promise;
    };
    this.tick = function() {
      return _self.callbacks.ticked.notify();
    };
    this.callbacks.dhbLoader = $q.defer();
    this.dhbLoader = function() {
      return _self.callbacks.dhbLoader.promise;
    };
    this.triggerDhbLoader = function(bool) {
      if (bool == null) {
        bool = false;
      }
      return _self.callbacks.dhbLoader.notify(bool);
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
      return ImpacTheming.get().dhbKpisConfig.enableKpis && ImpacMainSvc.userIsKpiEnabled();
    };
    this.reload = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      deferred = $q.defer();
      _self.triggerDhbLoader(true);
      _self.load(force).then(function() {
        return deferred.resolve();
      }, function() {
        return deferred.reject();
      })["finally"](function() {
        return _self.triggerDhbLoader(false);
      });
      return deferred.promise;
    };
    this.loadLocked = false;
    this.load = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      deferred = $q.defer();
      if (!_self.loadLocked) {
        _self.loadLocked = true;
        if (needConfigurationLoad() || force) {
          ImpacMainSvc.load(force).then(function(success) {
            var dashboardsPromise, orgId, widgetsTemplatesPromise;
            orgId = success.currentOrganization.id;
            dashboardsPromise = $http.get(ImpacRoutes.dashboards.index(orgId)).then(function(response) {
              return _self.setDashboards(response.data).then(function() {
                return _self.setCurrentDashboard();
              });
            }, function(error) {
              return $log.error("Impac! - DashboardsSvc: cannot retrieve dashboards list for org: " + orgId);
            });
            widgetsTemplatesPromise = fetchWidgetsTemplates();
            return $q.all([dashboardsPromise, widgetsTemplatesPromise]).then(function(success) {
              $log.info("Impac! - DashboardsSvc: loaded (force=" + force + ")");
              return deferred.resolve(_self.config);
            }, function(error) {
              return deferred.reject(error);
            })["finally"](function() {
              return _self.loadLocked = false;
            });
          }, function(error) {
            $log.error("Impac! - DashboardsSvc: cannot retrieve current organization");
            _self.loadLocked = false;
            return deferred.reject(error);
          });
        } else {
          _self.loadLocked = false;
          deferred.resolve(_self.config);
        }
      } else {
        $log.warn("Impac! - DashboardsSvc: Load locked. Trying again in 1s");
        $timeout(function() {
          return _self.load(force).then(function(success) {
            return deferred.resolve(success);
          }, function(error) {
            return deferred.reject(error);
          });
        }, 1000);
      }
      return deferred.promise;
    };
    fetchWidgetsTemplates = function() {
      var bolt, i, len, ref, widgetsTemplates, widgetsTemplatesPromises;
      widgetsTemplates = [];
      widgetsTemplatesPromises = [];
      widgetsTemplatesPromises.push($http.get(widgetsTemplatesUrl()).then(function(response) {
        var i, len, ref, results, widgetTemplate;
        ref = response.data.widgets;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          widgetTemplate = ref[i];
          results.push(widgetsTemplates.push(widgetTemplate));
        }
        return results;
      }, function(error) {
        return $log.error("Impac! - DashboardsSvc: cannot retrieve widgets templates", widgetsTemplatesUrl());
      }));
      ref = ImpacRoutes.bolts();
      for (i = 0, len = ref.length; i < len; i++) {
        bolt = ref[i];
        widgetsTemplatesPromises.push($http.get(bolt.path + "/widgets").then(function(response) {
          var j, len1, ref1, results, widgetTemplate;
          ref1 = response.data.widgets;
          results = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            widgetTemplate = ref1[j];
            widgetTemplate.metadata || (widgetTemplate.metadata = {});
            widgetTemplate.metadata.bolt_path = bolt.path;
            results.push(widgetsTemplates.push(widgetTemplate));
          }
          return results;
        }, function(error) {
          return $log.error("Impac! - DashboardsSvc: cannot retrieve widgets templates from bolt", boltPath + "/widgets");
        }));
      }
      return $q.all(widgetsTemplatesPromises).then(function() {
        return _self.setWidgetsTemplates(widgetsTemplates);
      });
    };
    widgetsTemplatesUrl = function() {
      var fy_end_month;
      if (ImpacTheming.get().dhbWidgetsConfig.templates.defaultToFinancialYear) {
        fy_end_month = ImpacMainSvc.getFinancialYearEndMonth();
        return (ImpacRoutes.widgets.templates()) + "?financial_year_end_month=" + fy_end_month;
      } else {
        return ImpacRoutes.widgets.templates();
      }
    };
    setDefaultCurrentDashboard = function() {
      if ((_self.config.dashboards != null) && _self.config.dashboards.length > 0) {
        $log.info("Impac! - DashboardsSvc: first dashboard set as current by default");
        ImpacMainSvc.override(_self.config.currentDashboard, _self.config.dashboards[0]);
        _self.initializeActiveTabs();
        _self.callbacks.dashboardChanged.notify(_self.config.currentDashboard);
        return true;
      } else {
        $log.warn("Impac! - DashboardsSvc: cannot set default current dashboard");
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
          _self.initializeActiveTabs();
          _self.callbacks.dashboardChanged.notify(_self.config.currentDashboard);
          return true;
        } else {
          $log.error("Impac! - DashboardsSvc: Dashboard " + id + " not found in dashboards list");
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
        return $log.error("Impac! - DashboardsSvc: Cannot load user's organizations");
      });
    };
    isTemplateAllowed = function(template) {
      var settings, templateUid;
      if (!ImpacUtilities.fetchWidgetTemplatePath(template)) {
        return false;
      }
      settings = ImpacTheming.get().widgetSelectorConfig;
      templateUid = ImpacUtilities.fetchWidgetCssClass(template);
      if (!_.isEmpty(settings.whitelist)) {
        return _.includes(settings.whitelist, templateUid);
      } else if (!_.isEmpty(settings.blacklist)) {
        return !_.includes(settings.blacklist, templateUid);
      } else {
        return true;
      }
    };
    this.setWidgetsTemplates = function(srcTemplates) {
      var dstTemplates, i, len, template;
      if (_.isEmpty(srcTemplates)) {
        return false;
      }
      if (ImpacDeveloper.isEnabled()) {
        srcTemplates = ImpacDeveloper.stubWidgetsTemplates(srcTemplates);
      }
      dstTemplates = _self.config.widgetsTemplates;
      dstTemplates.length = 0;
      for (i = 0, len = srcTemplates.length; i < len; i++) {
        template = srcTemplates[i];
        if (isTemplateAllowed(template)) {
          dstTemplates.push(template);
        }
      }
      return dstTemplates;
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
          $log.error("Impac! - DashboardsSvc: Cannot create dashboard with parameters: " + (angular.toJson(dashboard)), error);
          return deferred.reject(error);
        });
        return deferred.promise;
      });
    };
    this.copy = function(dashboard) {
      var data;
      if (!dashboard.id) {
        $q.reject('The dashboard you are trying to copy does not have an id');
      }
      data = {
        dashboard: dashboard
      };
      return _self.load().then(function(config) {
        return $http.post(ImpacRoutes.dashboards.copy(dashboard.id), data).then(function(success) {
          var newDhb;
          newDhb = success.data;
          _self.config.dashboards.push(newDhb);
          _self.setCurrentDashboard(newDhb.id);
          return $q.resolve(newDhb);
        }, function(error) {
          $log.error("Impac! - DashboardsSvc: Cannot copy dashboard with parameters: " + (angular.toJson(dashboard)), error);
          return $q.reject(error);
        });
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
        $log.error("Impac! - DashboardsSvc: Cannot delete dashboard: " + id);
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
        $log.error("Impac! - DashboardsSvc: Cannot update dashboard: " + id + " with parameters: " + (angular.toJson(opts)));
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
        endpoint: 'endpoint'
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
          keys = ['endpoint', 'metadata'];
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
            endpoint: template.endpoint,
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
  angular.module('impac.services.events', []).service('ImpacEvents', ["$log", function($log) {
    var _self, observableCallbacks;
    _self = this;
    observableCallbacks = {};
    this.registerCb = function(event, callback) {
      if (!_.isFunction(callback)) {
        return $log.warn("Callback must be a Function");
      }
      if (!_.isString(event)) {
        return $log.warn("Event must be a string");
      }
      observableCallbacks[event] || (observableCallbacks[event] = []);
      return observableCallbacks[event].push(callback);
    };
    this.notifyCallbacks = function(event, notification) {
      if (notification == null) {
        notification = null;
      }
      if (!observableCallbacks[event]) {
        return $log.warn("No observableCallbacks event named '" + event + "' found.");
      }
      return _.forEach(observableCallbacks[event], function(callback) {
        return callback(notification);
      });
    };
    this.deregisterCb = function(event, callback) {
      _.remove(observableCallbacks[event], function(registeredCb) {
        return callback === registeredCb;
      });
      if (_.isEmpty(observableCallbacks[event])) {
        return delete observableCallbacks[event];
      }
    };
    this.unsubscribe = function(event) {
      return delete observableCallbacks[event];
    };
    return _self;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.highcharts-factory', []).factory('HighchartsFactory', ["$filter", function($filter) {
    var Chart, templates;
    templates = {
      line: Object.freeze({
        get: function(series, options) {
          if (series == null) {
            series = [];
          }
          if (options == null) {
            options = {};
          }
          return {
            chart: {
              type: 'line',
              zoomType: 'x',
              spacingTop: 20
            },
            title: null,
            credits: {
              enabled: false
            },
            legend: {
              enabled: _.get(options, 'showLegend', true),
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'middle'
            },
            xAxis: {
              startOnTick: false,
              minPadding: 0,
              tickInterval: 1,
              min: 0
            },
            yAxis: {
              title: null,
              startOnTick: true,
              minPadding: 0
            },
            series: series
          };
        }
      })
    };
    return Chart = (function() {
      var todayIndex;

      function Chart(id, data1, options1) {
        this.id = id;
        this.data = data1 != null ? data1 : {};
        this.options = options1 != null ? options1 : {};
        this._template = templates[this.options.chartType];
        return;
      }

      Chart.prototype.render = function(data, options) {
        var chartConfig;
        if (_.isObject(data)) {
          this.data = data;
        }
        angular.extend(this.options, options);
        chartConfig = angular.merge({}, this.template(), this.formatters(), this.todayMarker());
        if (_.isEmpty(this.hc)) {
          this.hc = Highcharts.chart(this.id, chartConfig);
        } else {
          this.hc.update(chartConfig);
        }
        this.addThresholds();
        return this;
      };

      Chart.prototype.template = function() {
        return this._template.get(this.data.series, this.options);
      };

      Chart.prototype.formatters = function() {
        var labels, options, ref;
        ref = [this.data.labels, this.options], labels = ref[0], options = ref[1];
        return {
          xAxis: {
            labels: {
              formatter: function() {
                return $filter('mnoDate')(labels[this.value], options.period);
              }
            }
          },
          yAxis: {
            labels: {
              formatter: function() {
                return $filter('mnoCurrency')(this.value, options.currency, false, 0);
              }
            }
          },
          tooltip: {
            formatter: function() {
              var amount, date, name;
              date = $filter('mnoDate')(labels[this.x], options.period);
              amount = $filter('mnoCurrency')(this.y, options.currency, false);
              name = this.series.name;
              if (moment(labels[this.x]) < moment().startOf('day')) {
                name = _.startCase(_.trim(name.toLowerCase().replace(/\s*projected\s*/, ' ')));
              }
              return "<strong>" + date + "</strong><br>" + name + ": " + amount;
            }
          }
        };
      };

      Chart.prototype.todayMarker = function() {
        if (!(this.options.showToday && !_.isEmpty(this.data.labels))) {
          return {};
        }
        return {
          xAxis: {
            plotLines: [
              {
                color: _.get(this.options, 'todayMarkerColor', 'rgba(0, 85, 255, 0.2)'),
                value: todayIndex(this.data.labels),
                width: 1,
                label: {
                  text: null,
                  verticalAlign: 'top',
                  textAlign: 'center',
                  rotation: 0,
                  y: -5
                }
              }
            ]
          }
        };
      };

      Chart.prototype.addThresholds = function(options) {
        var data, i, len, projectionIntervalLength, ref, serie, threshold, thresholdBar;
        if (options == null) {
          options = this.options;
        }
        if (_.isEmpty(this.hc)) {
          return;
        }
        _.each(this.hc.series, function(s) {
          if (s.name.toLowerCase().includes('threshold')) {
            return s.remove();
          }
        });
        if (_.isEmpty(options.thresholds)) {
          return this.hc;
        }
        projectionIntervalLength = this.data.labels.slice(todayIndex(this.data.labels), this.data.labels.length).length;
        ref = options.thresholds;
        for (i = 0, len = ref.length; i < len; i++) {
          threshold = ref[i];
          data = options.fullLengthThresholds ? [] : new Array(this.data.labels.length - projectionIntervalLength).fill(null);
          serie = {
            name: 'Threshold KPI',
            kpiId: threshold.kpiId,
            data: data,
            color: _.get(options, 'thresholdsColor', 'rgba(255, 0, 0, 0.5)'),
            showInLegend: false,
            marker: {
              enabled: false
            }
          };
          if (options.fullLengthThresholds) {
            thresholdBar = _.map(this.data.labels, function() {
              return parseFloat(threshold.value);
            });
          } else {
            thresholdBar = _.map(new Array(projectionIntervalLength), function() {
              return parseFloat(threshold.value);
            });
          }
          serie.data.push.apply(serie.data, thresholdBar);
          this.hc.addSeries(serie, true);
        }
        return this.hc;
      };

      todayIndex = function(labels) {
        var projection_date;
        projection_date = _.find(labels, function(date) {
          return moment(date) >= moment().startOf('day');
        });
        return _.indexOf(labels, projection_date);
      };

      return Chart;

    })();
  }]);

}).call(this);

(function() {
  angular.module('impac.services.kpis', []).service('ImpacKpisSvc', ["$log", "$http", "$filter", "$q", "$timeout", "ImpacRoutes", "ImpacMainSvc", "ImpacDashboardsSvc", "ImpacDeveloper", "ImpacAlerts", "ImpacEvents", "IMPAC_EVENTS", "ImpacUtilities", "ImpacTheming", "toastr", function($log, $http, $filter, $q, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper, ImpacAlerts, ImpacEvents, IMPAC_EVENTS, ImpacUtilities, ImpacTheming, toastr) {
    var _self, fetchKpisTemplates, formatShowQuery;
    _self = this;
    this.getSsoSessionId = ImpacMainSvc.getSsoSessionId;
    this.getCurrentDashboard = ImpacDashboardsSvc.getCurrentDashboard;
    this.config = {
      kpisTemplates: []
    };
    this.getKpisTemplates = function() {
      return _self.config.kpisTemplates;
    };
    this.getKpiTemplate = function(endpoint, primaryWatchable) {
      return _.find(_self.getKpisTemplates(), function(k) {
        return k.endpoint === endpoint && k.watchables[0] === primaryWatchable;
      });
    };
    this.getAttachableKpis = function(widgetEngine) {
      var deferred;
      deferred = $q.defer();
      _self.load().then(function() {
        var templates;
        templates = _.select(_self.getKpisTemplates(), function(kpiTemplate) {
          if (!_.isArray(kpiTemplate.attachables)) {
            return false;
          }
          return _.includes(kpiTemplate.attachables, widgetEngine);
        });
        return deferred.resolve(templates);
      }, function() {
        return deferred.reject();
      });
      return deferred.promise;
    };
    this.getKpisDateRange = function() {
      if (!ImpacTheming.get().dhbKpisConfig.enableDatesPicker) {
        return $q.reject('Kpis dates picker disabled');
      }
      return _self.load().then(function() {
        var kpisDateRange;
        kpisDateRange = _self.getCurrentDashboard().metadata.kpis_hist_parameters;
        if (!(_.isEmpty(kpisDateRange) || !_.isObject(kpisDateRange))) {
          return kpisDateRange;
        }
        return ImpacMainSvc.load().then(function(config) {
          var fyDates, fyEndMonth;
          fyEndMonth = parseInt(config.currentOrganization.financial_year_end_month) || 6;
          fyDates = ImpacUtilities.financialYearDates(fyEndMonth);
          return {
            from: fyDates.start,
            to: moment().format('YYYY-MM-DD'),
            keepToday: true
          };
        });
      });
    };
    ImpacEvents.registerCb(IMPAC_EVENTS.kpiTargetAlert, function(notification) {
      return _self.refreshAll(true);
    });
    formatShowQuery = function(basePath, endpoint, watchable, params) {
      var baseUrl, url;
      baseUrl = [basePath, endpoint, watchable].join('/');
      url = [baseUrl, decodeURIComponent($.param(params))].join('?');
      return url;
    };
    this.locked = false;
    this.load = function(refreshCache) {
      if (refreshCache == null) {
        refreshCache = false;
      }
      if (!_self.locked) {
        _self.locked = true;
        return $q.all([ImpacMainSvc.loadUserData(), ImpacDashboardsSvc.load()]).then(function(results) {
          var orgUids, params, ssoSessionId;
          orgUids = _.pluck(_self.getCurrentDashboard().data_sources, 'uid');
          ssoSessionId = results[0].sso_session;
          params = {
            metadata: {
              organization_ids: orgUids
            },
            opts: {
              refresh_cache: refreshCache
            }
          };
          if (ssoSessionId) {
            params.sso_session = ssoSessionId;
          }
          return fetchKpisTemplates(params)["finally"](function() {
            _self.locked = false;
            return $log.info("Impac! - KpisSvc: loaded");
          });
        }, function(err) {
          return $log.error('Impac! - KpisSvc: failed to load.', err);
        })["finally"](function() {
          return _self.locked = false;
        });
      } else {
        $log.warn("Impac! - KpisSvc: Load locked. Trying again in 1s");
        return $timeout((function() {
          return _self.load(refreshCache);
        }), 1000);
      }
    };
    this.massAssignAll = function(metadata) {
      return _self.load().then(function() {
        var i, j, k, l, len, len1, len2, ref, ref1, ref2, w;
        ref = _self.getCurrentDashboard().kpis;
        for (i = 0, len = ref.length; i < len; i++) {
          k = ref[i];
          _self.update(k, {
            metadata: metadata
          });
        }
        ref1 = _self.getCurrentDashboard().widgets;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          w = ref1[j];
          ref2 = w.kpis;
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            k = ref2[l];
            _self.update(k, {
              metadata: metadata
            }, false);
          }
        }
      });
    };
    this.isRefreshing = false;
    this.refreshAll = function(refreshCache) {
      if (refreshCache == null) {
        refreshCache = false;
      }
      if (!_self.isRefreshing) {
        _self.isRefreshing = true;
        return _self.load(refreshCache).then(function() {
          var i, k, len, ref, results1;
          ref = _self.getCurrentDashboard().kpis;
          results1 = [];
          for (i = 0, len = ref.length; i < len; i++) {
            k = ref[i];
            results1.push(_self.show(k, refreshCache).then(function(renderedKpi) {}, function(errorResponse) {
              return $log.error("Unable to refresh all Kpis: " + errorResponse);
            }));
          }
          return results1;
        })["finally"](function() {
          return $timeout(function() {
            return _self.isRefreshing = false;
          }, 3000);
        });
      }
    };
    this.validateKpiTargets = function(targetsByWatchable) {
      if (_.isEmpty(targetsByWatchable)) {
        return false;
      }
      return _.every(targetsByWatchable, function(targets) {
        return !_.isEmpty(targets) && _.every(targets, function(target) {
          return target.min || target.max;
        });
      });
    };
    this.formatKpiName = function(endpoint) {
      var kpi_template;
      kpi_template = _.find(_self.getKpisTemplates(), function(tmpl) {
        return tmpl.endpoint === endpoint;
      });
      return angular.copy(kpi_template.name);
    };
    this.formatKpiTarget = function(target, unit, mappings) {
      var mapping, targetMode;
      if (mappings == null) {
        mappings = [];
      }
      if (!(target && unit)) {
        return '';
      }
      targetMode = _.keys(target)[0];
      mapping = _.find(mappings, function(map) {
        return map.mode === targetMode;
      }) || {};
      return (mapping.label || targetMode) + " " + ($filter('mnoCurrency')(target[targetMode], unit, false));
    };
    this.updateKpisOrder = function(kpisIds) {
      var dashboardId, data;
      dashboardId = _self.getCurrentDashboard().id;
      data = {
        metadata: {
          kpis_order: kpisIds
        }
      };
      return ImpacDashboardsSvc.update(dashboardId, data);
    };
    this.getKpiTargetPlaceholder = function(kpiEndpoint, kpiWatchable) {
      var templ;
      templ = _self.getKpiTemplate(kpiEndpoint, kpiWatchable);
      return (((templ != null) && (templ.target_placeholders != null)) && templ.target_placeholders[kpiWatchable]) || {};
    };
    this.buildKpiWatchables = function(kpi) {
      if (!kpi.element_watched) {
        return;
      }
      return kpi.watchables = [kpi.element_watched].concat(kpi.extra_watchables || []);
    };
    fetchKpisTemplates = function(params) {
      var bolt, i, impacUrl, kpisTemplates, kpisTemplatesPromises, len, ref;
      kpisTemplates = [];
      kpisTemplatesPromises = [];
      impacUrl = [ImpacRoutes.kpis.index(), decodeURIComponent($.param(params))].join('?');
      kpisTemplatesPromises.push($http.get(impacUrl).then(function(response) {
        var i, len, ref, results1, template;
        ref = response.data.kpis;
        results1 = [];
        for (i = 0, len = ref.length; i < len; i++) {
          template = ref[i];
          template.source || (template.source = 'impac');
          results1.push(kpisTemplates.push(template));
        }
        return results1;
      }, function(error) {
        return $log.error("Impac! - KpisSvc: cannot retrieve kpis templates from Impac!");
      }));
      if (ImpacRoutes.kpis.local()) {
        $http.get(ImpacRoutes.kpis.local()).then(function(response) {
          var i, len, ref, results1, template;
          ref = response.data.kpis;
          results1 = [];
          for (i = 0, len = ref.length; i < len; i++) {
            template = ref[i];
            template.source = 'local';
            results1.push(_self.config.kpisTemplates.push(template));
          }
          return results1;
        }, function(error) {
          return $log.error("Impac! - KpisSvc: cannot retrieve kpis templates from local", "" + (ImpacRoutes.kpis.local()));
        });
      }
      ref = ImpacRoutes.bolts();
      for (i = 0, len = ref.length; i < len; i++) {
        bolt = ref[i];
        kpisTemplatesPromises.push($http.get(bolt.path + "/kpis").then(function(response) {
          var j, len1, ref1, results1, template;
          ref1 = response.data.kpis;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            template = ref1[j];
            template.metadata || (template.metadata = {});
            template.metadata.bolt_path = bolt.path;
            results1.push(kpisTemplates.push(template));
          }
          return results1;
        }, function(error) {
          return $log.error("Impac! - KpisSvc: cannot retrieve kpis templates from bolt", bolt.path + "/kpis");
        }));
      }
      return $q.all(kpisTemplatesPromises).then(function() {
        var j, len1, results1, template;
        _.remove(_self.config.kpisTemplates, function() {
          return true;
        });
        results1 = [];
        for (j = 0, len1 = kpisTemplates.length; j < len1; j++) {
          template = kpisTemplates[j];
          results1.push(_self.config.kpisTemplates.push(template));
        }
        return results1;
      });
    };
    this.show = function(kpi, refreshCache) {
      if (refreshCache == null) {
        refreshCache = false;
      }
      kpi.isLoading = true;
      return _self.load().then(function() {
        var host, params, url;
        params = {
          opts: {
            refresh_cache: refreshCache
          }
        };
        if (_self.getSsoSessionId()) {
          params.sso_session = _self.getSsoSessionId();
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
        if (kpi.extra_watchables != null) {
          params.extra_watchables = kpi.extra_watchables;
        }
        switch (kpi.source) {
          case 'impac':
            host = ImpacRoutes.kpis.show(_self.getCurrentDashboard().id, kpi.id);
            break;
          case 'local':
            host = ImpacRoutes.kpis.local();
        }
        url = formatShowQuery(host, kpi.endpoint, kpi.element_watched, params);
        return $http.get(url).then(function(response) {
          var kpiResp, missingParams, updatedConfig;
          kpiResp = response.data.kpi;
          kpi.data = kpiResp.calculation;
          updatedConfig = kpiResp.configuration || {};
          missingParams = _.select(['targets', 'extra_params'], (function(param) {
            return (kpi[param] == null) && (updatedConfig[param] != null);
          }));
          angular.extend(kpi, _.pick(updatedConfig, missingParams));
          kpi.layout = kpiResp.layout;
          return kpi;
        }, function(err) {
          $log.error('Impac! - KpisSvc: Could not retrieve KPI (show) at: ' + kpi.endpoint, err);
          return $q.reject(err);
        });
      }, function() {
        $log.error('Impac! - KpisSvc: Service not initialized');
        return $q.reject({
          error: {
            message: 'Impac! - KpisSvc: Service is not initialized'
          }
        });
      })["finally"]((function() {
        return kpi.isLoading = false;
      }));
    };
    this.create = function(source, endpoint, elementWatched, opts) {
      var deferred;
      if (opts == null) {
        opts = {};
      }
      deferred = $q.defer();
      _self.load().then(function() {
        var params;
        params = {
          source: source,
          endpoint: endpoint,
          element_watched: elementWatched,
          metadata: {
            currency: _self.getCurrentDashboard().currency
          }
        };
        return _self.getKpisDateRange().then(function(dates) {
          if (params.metadata == null) {
            params.metadata = {};
          }
          return params.metadata.hist_parameters = dates;
        })["finally"](function() {
          var url;
          angular.merge(params, opts);
          url = ImpacRoutes.kpis.create(_self.getCurrentDashboard().id);
          return $http.post(url, {
            kpi: params
          }).then(function(success) {
            var kpi;
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts);
            kpi = success.data;
            _self.buildKpiWatchables(kpi);
            return deferred.resolve(kpi);
          }, function(err) {
            $log.error("Impac! - KpisSvc: Unable to create kpi endpoint=" + endpoint, err);
            toastr.error('Unable to create KPI', 'Error');
            return deferred.reject(err);
          });
        });
      }, function() {
        return deferred.reject({
          error: {
            message: 'Impac! - KpisSvc: Service is not initialized'
          }
        });
      });
      return deferred.promise;
    };
    this.update = function(kpi, params, showKpi) {
      if (params == null) {
        params = {};
      }
      if (showKpi == null) {
        showKpi = true;
      }
      kpi.isLoading = true;
      return _self.load().then(function() {
        var filtered_params, url;
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
        url = ImpacRoutes.kpis.update(_self.getCurrentDashboard().id, kpi.id);
        if (!_.isEmpty(filtered_params)) {
          return $http.put(url, {
            kpi: params
          }).then(function(success) {
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts);
            angular.extend(kpi, success.data);
            _self.buildKpiWatchables(kpi);
            if (showKpi) {
              return _self.show(kpi);
            } else {
              return kpi;
            }
          }, function(err) {
            $log.error("Impac! - KpisSvc: Unable to update KPI " + kpi.id, err);
            return $q.reject(err);
          });
        }
      })["finally"](function() {
        return kpi.isLoading = false;
      });
    };
    this["delete"] = function(kpi) {
      return _self.load().then(function() {
        var url;
        url = ImpacRoutes.kpis["delete"](_self.getCurrentDashboard().id, kpi.id);
        return $http["delete"](url).then(function(res) {
          ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts);
          return res;
        }, function(err) {
          $log.error("Impac! KpisSvc: Unable to delete KPI " + kpi.id, err);
          return $q.reject(err);
        });
      });
    };
    this.saveAlerts = function(kpi, alerts) {
      var alert, alertHash, alertsToCreate, alertsToDelete, alertsToUpdate, i, j, l, len, len1, len2, promises;
      alertsToCreate = _.filter(alerts, function(alert) {
        return alert.active && !_.includes(_.map(kpi.alerts, function(a) {
          return a.service;
        }), alert.service);
      });
      alertsToDelete = _.filter(kpi.alerts, function(alert) {
        return !alerts[alert.service].active;
      });
      alertsToUpdate = _.filter(alerts, function(alert) {
        var existingAlert, existingRecipientIds, recipientChange, updatedRecipientIds;
        existingAlert = _.find(kpi.alerts, function(kpi_alert) {
          return kpi_alert.service === alert.service;
        });
        if (alert.service === "inapp" || !existingAlert || !alert.recipients) {
          return false;
        }
        existingRecipientIds = existingAlert.recipients.map(function(recipient) {
          return recipient.id;
        }).sort();
        updatedRecipientIds = alert.recipients.map(function(recipient) {
          return recipient.id;
        }).sort();
        recipientChange = false;
        if (updatedRecipientIds.length !== existingRecipientIds.length || ("" + existingRecipientIds) !== ("" + updatedRecipientIds)) {
          recipientChange = true;
        }
        alert.id = existingAlert.id;
        return alert.active && recipientChange;
      });
      promises = [];
      for (i = 0, len = alertsToCreate.length; i < len; i++) {
        alert = alertsToCreate[i];
        alertHash = {
          alert: _.pick(alert, ['service'])
        };
        if (alert.service === 'email') {
          alertHash.alert.recipients = alert.recipients;
        }
        promises.push(ImpacAlerts.create(kpi.id, alertHash));
      }
      for (j = 0, len1 = alertsToDelete.length; j < len1; j++) {
        alert = alertsToDelete[j];
        promises.push(ImpacAlerts["delete"](alert.id));
      }
      for (l = 0, len2 = alertsToUpdate.length; l < len2; l++) {
        alert = alertsToUpdate[l];
        promises.push(ImpacAlerts.update(alert.id, {
          alert: _.pick(alert, ['service', 'recipients'])
        }));
      }
      return $q.all(promises).then(function(success) {
        var len3, m, resp;
        kpi.alerts || (kpi.alerts = []);
        for (m = 0, len3 = success.length; m < len3; m++) {
          resp = success[m];
          if (resp.data.deleted) {
            _.remove(kpi.alerts, function(alert) {
              return alert.service === resp.data.deleted.service;
            });
          } else {
            kpi.alerts.push(resp.data);
          }
        }
        return ImpacEvents.notifyCallbacks(IMPAC_EVENTS.addOrRemoveAlerts);
      });
    };
    return this;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.linking', []).provider('ImpacLinking', function() {
    var _$get, optional_links, provider, required_links;
    provider = this;
    required_links = {
      user: null,
      organizations: null
    };
    optional_links = {
      pusher_key: ''
    };
    provider.linkData = function(configData) {
      var key, link, value;
      for (key in required_links) {
        value = required_links[key];
        link = configData[key];
        if (link == null) {
          throw new Error("impac-angular linking.svc: Missing core data (" + key + ") to run impac-angular.");
        }
        if (typeof link !== 'function') {
          throw new TypeError("impac-angular linking.svc: " + key + " should be a Function.");
        }
        required_links[key] = link;
      }
      provider.linkOptionalData(configData, false);
      return true;
    };
    provider.linkOptionalData = function(configData, logs) {
      var key, link, value, warnings;
      if (logs == null) {
        logs = true;
      }
      warnings = {
        pusher_key: ', Alerts are disabled!'
      };
      for (key in optional_links) {
        value = optional_links[key];
        link = configData[key];
        if (link == null) {
          console.warn(("impac-angular linking.svc: No " + key + " is configured") + warnings[key] || "");
        } else {
          optional_links[key] = link;
          if (logs) {
            console.log("impac-angular linking.svc: " + key + " successfully configured");
          }
        }
      }
      return true;
    };
    _$get = function($q) {
      var service;
      service = this;
      service.getUserData = function() {
        return required_links.user().then(function(success) {
          return success;
        }, function(err) {
          return $q.reject(err);
        });
      };
      service.getOrganizations = function() {
        return required_links.organizations().then(function(success) {
          return success;
        }, function(err) {
          return $q.reject(err);
        });
      };
      service.getPusherKey = function() {
        return optional_links.pusher_key;
      };
      return service;
    };
    _$get.$inject = ['$q'];
    provider.$get = _$get;
    return provider;
  });

}).call(this);

(function() {
  angular.module('impac.services.main', []).service('ImpacMainSvc', ["$q", "$log", "$timeout", "ImpacLinking", "ImpacNotifications", function($q, $log, $timeout, ImpacLinking, ImpacNotifications) {
    var _self, isConfigurationLoaded, setDefaultCurrentOrganization, userDataLocked;
    _self = this;
    this.config = {
      organizations: [],
      currentOrganization: {},
      userData: {},
      currencies: ["USD", "AUD", "CAD", "CNY", "EUR", "GBP", "HKD", "INR", "JPY", "NZD", "SGD", "PHP", "AED", "IDR", "MMK"]
    };
    this.getSsoSessionId = function() {
      return _self.config.userData.sso_session;
    };
    this.getFinancialYearEndMonth = function() {
      return parseInt(_self.config.currentOrganization.financial_year_end_month);
    };
    this.userIsKpiEnabled = function() {
      return _self.config.userData.kpi_enabled;
    };
    this.callbacks = {};
    this.callbacks.organizationChanged = $q.defer();
    this.organizationChanged = function() {
      return _self.callbacks.organizationChanged.promise;
    };
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
          ImpacNotifications.load();
          deferred.resolve(_self.config);
          return $log.info("Impac! - MainSvc: loaded (force=" + force + ")");
        }, function(error) {
          $log.error("Impac! - MainSvc: failed to load configuration");
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
        _self.config.organizations = [];
        _self.config.currentOrganization = {};
        _self.config.currentOrgMembers = [];
        ImpacLinking.getOrganizations().then(function(success) {
          if ((success.organizations != null) && success.organizations.length > 0) {
            _self.config.organizations = success.organizations;
            _self.config.currentOrgMembers = success.currentOrgMembers;
            _self.setCurrentOrganization(success.currentOrgId);
            $log.info("Impac! - MainSvc: Organizations loaded (force=" + force + ")");
          } else {
            $log.info("Impac! - MainSvc: retrieved empty organizations list");
          }
          return deferred.resolve(_self.config);
        }, function(error) {
          $log.error("Impac! - MainSvc: cannot load organizations");
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
        $log.info("Impac! - MainSvc: first organization set as current by default");
        _self.callbacks.organizationChanged.notify(_self.config.currentOrganization);
        return true;
      } else {
        $log.error("Impac! - MainSvc: cannot set default current organization");
        _self.config.currentOrganization = {};
        _self.callbacks.organizationChanged.notify(false);
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
          _self.callbacks.organizationChanged.notify(_self.config.currentOrganization);
          return true;
        } else {
          $log.error("Impac! - MainSvc: organization: " + id + " not found in organizations list");
          return setDefaultCurrentOrganization();
        }
      } else {
        return setDefaultCurrentOrganization();
      }
    };
    userDataLocked = false;
    this.loadUserData = function(force) {
      var deferred;
      if (force == null) {
        force = false;
      }
      deferred = $q.defer();
      if (!userDataLocked) {
        userDataLocked = true;
        if (_.isEmpty(_self.config.userData) || force) {
          _self.config.userData = {};
          ImpacLinking.getUserData().then(function(user) {
            angular.extend(_self.config.userData, user);
            $log.info("Impac! - MainSvc: User data loaded (force=" + force + ") with sso_session " + _self.config.userData.sso_session);
            return deferred.resolve(_self.config.userData);
          }, function(error) {
            $log.error('Impac! - MainSvc: cannot retrieve user data');
            return deferred.reject(error);
          })["finally"](function() {
            return userDataLocked = false;
          });
        } else {
          userDataLocked = false;
          deferred.resolve(_self.config.userData);
        }
      } else {
        $log.warn("Impac! - MainSvc: User data load locked. Trying again in 1s");
        $timeout((function() {
          return _self.loadUserData(force).then(function(success) {
            return deferred.resolve(success);
          }, function(errors) {
            return deferred.reject(errors);
          });
        }), 1000);
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
  angular.module('impac.services.notifications', []).service('ImpacNotifications', ["$log", "Pusher", "ImpacTheming", "ImpacEvents", "IMPAC_EVENTS", "toastr", function($log, Pusher, ImpacTheming, ImpacEvents, IMPAC_EVENTS, toastr) {
    var EVENTS, _self;
    _self = this;
    ImpacEvents.registerCb(IMPAC_EVENTS.addOrRemoveAlerts, function() {
      return _self.load();
    });
    EVENTS = {
      kpi_target_alert: function(response) {
        var notification;
        notification = response.data;
        toastr.warning(notification.subject);
        return ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpiTargetAlert, notification);
      }
    };
    this.load = function() {
      if (!ImpacTheming.get().alertsConfig.enableAlerts) {
        return;
      }
      return ImpacEvents.notifyCallbacks(IMPAC_EVENTS.impacNotificationsLoad, function(alerts) {
        var activeChannel, alert, channels, i, j, len, len1, pusher, pusherAlerts, ref, results;
        pusher = Pusher.init();
        pusherAlerts = _.map(alerts, function(alert) {
          if (!(alert.service === 'inapp' && _.has(alert.metadata, 'pusher'))) {
            return null;
          }
          return _.pick(alert.metadata, ['pusher']);
        });
        pusherAlerts = _.uniq(_.compact(pusherAlerts));
        channels = _.uniq(_.map(pusherAlerts, function(a) {
          return a.pusher.channel;
        }));
        ref = pusher.socket.allChannels();
        for (i = 0, len = ref.length; i < len; i++) {
          activeChannel = ref[i];
          if (channels.indexOf(activeChannel) < 0) {
            pusher.disconnectChannel(activeChannel.name);
          } else {
            pusher.unbindAll(activeChannel.name);
          }
        }
        results = [];
        for (j = 0, len1 = pusherAlerts.length; j < len1; j++) {
          alert = pusherAlerts[j];
          results.push(pusher.bind(alert.pusher.channel, alert.pusher.event, EVENTS[alert.pusher.event]));
        }
        return results;
      });
    };
    return _self;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.pusher', []).service('Pusher', ["$window", "ImpacLinking", function($window, ImpacLinking) {
    var _self;
    _self = this;
    this.config = {
      pusherOpts: {
        encrypted: true
      }
    };
    this.init = function(channels) {
      if (channels == null) {
        channels = [];
      }
      if (!_self.socket) {
        _self.socket = new $window.Pusher(ImpacLinking.getPusherKey(), _self.config.pusherOpts);
      }
      _.forEach(channels, function(channel) {
        return _self.socket.subscribe(channel);
      });
      return _self;
    };
    this.bind = function(channel, event, callback) {
      if (!_self.socket) {
        _self.init();
      }
      if (!_self.socket.channel(channel)) {
        _self.socket.subscribe(channel);
      }
      return _self.socket.channel(channel).bind(event, callback);
    };
    this.bindAll = function(event, callback) {
      if (!_self.socket) {
        _self.init();
      }
      return _.forEach(_self.socket.allChannels(), function(chan) {
        return chan.bind(event, callback);
      });
    };
    this.unbind = function(channel, event) {
      if (!(_self.socket && _self.socket.channel(channel))) {
        return;
      }
      return _self.socket.channel(channel).unbind(event);
    };
    this.unbindAll = function(channel) {
      if (!(_self.socket && _self.socket.channel(channel))) {
        return;
      }
      return _self.socket.channel(channel).unbind();
    };
    this.disconnectChannel = function(channel) {
      if (!_self.socket) {
        return;
      }
      return _self.socket.unsubscribe(channel);
    };
    return _self;
  }]);

}).call(this);

(function() {
  angular.module('impac.services.routes', []).provider('ImpacRoutes', function() {
    var _$get, bolts, defaults, isBoltValid, provider;
    provider = this;
    defaults = {
      mnoHub: 'http://localhost:7000/mnoe/jpi/v1',
      impacApi: 'http://localhost:4000/api',
      dashboards: {
        index: null,
        show: null,
        create: null,
        update: null,
        del: null,
        copy: null
      },
      dashboardTemplates: {
        index: null,
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
      alerts: {
        index: null,
        create: null,
        update: null,
        del: null
      },
      organizations: {
        appInstancesSync: null
      }
    };
    bolts = {
      version: 'v2',
      engines: []
    };
    isBoltValid = function(bolt) {
      if (!bolt.provider) {
        console.warn('Bolt has no provider', bolt);
      }
      if (!bolt.name) {
        console.warn('Bolt has no name', bolt);
      }
      if (!bolt.category) {
        console.warn('Bolt is not mapped to a category', bolt);
      }
      return Boolean(bolt.provider && bolt.name && bolt.category);
    };
    provider.configureRoutes = function(configOptions) {
      return angular.extend(defaults, configOptions);
    };
    provider.configureBolts = function(version, engines) {
      var bolt, i, len;
      for (i = 0, len = engines.length; i < len; i++) {
        bolt = engines[i];
        if (!isBoltValid(bolt)) {
          console.warn('Default bolts will be used:', bolts);
          return false;
        }
      }
      return angular.extend(bolts, {
        version: version,
        engines: engines
      });
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
            return defaults.mnoHub + "/impac/dashboards";
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
            return defaults.mnoHub + "/impac/dashboards/" + id;
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
        },
        copy: function(sourceId) {
          if (defaults.dashboards.copy) {
            return defaults.dashboards.copy.replace(':id', sourceId);
          } else {
            return (service.dashboards.show(sourceId)) + "/copy";
          }
        }
      };
      service.dashboardTemplates = {
        index: function() {
          if (defaults.dashboardTemplates.index) {
            return defaults.dashboardTemplates.index;
          } else {
            return defaults.mnoHub + "/impac/dashboard_templates";
          }
        }
      };
      service.widgets = {
        index: function(dashboard_id) {
          if (defaults.widgets.index) {
            return defaults.widgets.index.replace(':dashboard_id', dashboard_id);
          } else {
            return defaults.mnoHub + "/impac/widgets";
          }
        },
        show: function(endpoint, dashboard_id, id) {
          if (defaults.widgets.show) {
            return defaults.widgets.show.replace(':endpoint', endpoint).replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return defaults.impacApi + "/v1/widgets/" + endpoint;
          }
        },
        create: function(dashboard_id) {
          if (defaults.widgets.create) {
            return defaults.widgets.create.replace(':dashboard_id', dashboard_id);
          } else {
            return (service.dashboards.show(dashboard_id)) + "/widgets";
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
        },
        templates: function() {
          return defaults.impacApi + "/v1/widgets";
        }
      };
      service.kpis = {
        index: function(dashboard_id) {
          if (defaults.kpis.index) {
            return defaults.kpis.index.replace(':dashboard_id', dashboard_id);
          } else {
            return defaults.impacApi + "/v1/kpis";
          }
        },
        show: function(dashboard_id, id) {
          if (defaults.kpis.show) {
            return defaults.kpis.show.replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return defaults.impacApi + "/v1/kpis";
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
            return defaults.mnoHub + "/impac/kpis/" + id;
          }
        },
        "delete": function(dashboard_id, id) {
          if (defaults.kpis.del) {
            return defaults.kpis.del.replace(':dashboard_id', dashboard_id).replace(':id', id);
          } else {
            return defaults.mnoHub + "/impac/kpis/" + id;
          }
        },
        local: function() {
          return defaults.kpis.local;
        },
        alerts: {
          index: function() {
            if (defaults.alerts.index) {
              return defaults.alerts.index;
            } else {
              return defaults.mnoHub + "/impac/alerts";
            }
          },
          create: function(kpi_id) {
            if (defaults.alerts.create) {
              return defaults.alerts.create.replace(':kpi_id', kpi_id);
            } else {
              return defaults.mnoHub + "/impac/kpis/" + kpi_id + "/alerts";
            }
          },
          update: function(id) {
            if (defaults.alerts.update) {
              return defaults.alerts.update.replace(':id', id);
            } else {
              return defaults.mnoHub + "/impac/alerts/" + id;
            }
          },
          "delete": function(id) {
            if (defaults.alerts.del) {
              return defaults.alerts.del.replace(':id', id);
            } else {
              return defaults.mnoHub + "/impac/alerts/" + id;
            }
          }
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
      service.bolts = function() {
        return _.map(bolts.engines, function(engine) {
          return {
            path: defaults.impacApi + "/" + bolts.version + "/" + engine.provider + "/" + engine.name,
            category: engine.category
          };
        });
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
        dhbHeadingText: 'Impac!',
        multiCompany: false,
        designerMode: {
          enabled: false,
          dhbLabelName: 'Template'
        }
      },
      dhbSelectorConfig: {
        selectorType: 'dropdown',
        customTmplPath: null,
        accessibilityEnabled: false,
        addWidgetEnabled: true,
        addDhbEnabled: true,
        deleteDhbEnabled: true,
        pdfModeEnabled: false
      },
      dhbWidgetsConfig: {
        templates: {
          defaultToFinancialYear: true
        }
      },
      dhbKpisConfig: {
        enableKpis: true,
        parentElementId: '',
        enableDatesPicker: true
      },
      alertsConfig: {
        enableAlerts: true
      },
      dataNotFoundConfig: {
        content: {
          mainMessage: 'impac.data_not_found_config.main_message',
          linkMessage: 'impac.data_not_found_config.link_message',
          title: 'impac.data_not_found_config.title',
          seeExample: 'impac.data_not_found_config.see_example',
          demoData: 'impac.data_not_found_config.demo_data'
        },
        linkUrl: '/apps',
        linkTarget: '_blank',
        linkUrlCallback: null
      },
      dhbErrorsConfig: {
        firstTimeCreated: {
          first: 'impac.widget.common.error_config.first_time_created.first',
          second: 'impac.widget.common.error_config.first_time_created.second',
          note: 'impac.widget.common.error_config.first_time_created.note'
        },
        empty: {
          first: 'impac.widget.common.error_config.empty.first',
          second: 'impac.widget.common.error_config.empty.second'
        },
        failed: {
          first: 'impac.widget.common.error_config.failed.first',
          second: 'impac.widget.common.error_config.failed.second'
        }
      },
      dhbSubMenuConfig: {
        myobMessage: {
          show: true,
          appLink: {
            show: true,
            url: '#/marketplace',
            text: 'impac.widget.common.sub_menu_config.check_this_app'
          }
        }
      },
      widgetSelectorConfig: {
        path: null,
        whitelist: [],
        blacklist: []
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
        syncApps: {
          show: function() {
            return true;
          },
          productDescriptor: 'Impac!'
        },
        currency: {
          locked: false
        },
        createFromTemplateEnabled: false
      },
      widgetSettings: {
        histModeChoser: {
          currentLabels: {
            bls: "impac.widget.theming.hist.bls",
            pnl: "impac.widget.theming.hist.pnl",
            "default": "impac.widget.theming.hist.default"
          },
          todayPrefixes: {
            bls: "impac.widget.theming.hist.bls.prefix",
            pnl: "impac.widget.theming.hist.pnl.prefix",
            "default": "impac.widget.theming.hist.default.prefix"
          }
        },
        timePeriod: {
          showSlider: true
        },
        tagging: {
          enabled: false
        }
      }
    };
    provider.configure = function(configOptions) {
      return angular.merge(options, configOptions);
    };
    _$get = function($window, ImpacUtilities) {
      var service;
      service = this;
      service.get = function() {
        return options;
      };
      service.getDhbLabelName = function() {
        var designerModeOpts;
        designerModeOpts = options.dhbConfig.designerMode;
        if (designerModeOpts.enabled) {
          return designerModeOpts.dhbLabelName;
        } else {
          return 'Dashboard';
        }
      };
      service.color = {

        /*
         *   @desc Generates a random shade of the given hexcode color.
         */
        generateRandomShade: function(hexcode) {
          var baseHsl, shade;
          baseHsl = $window.Color(hexcode).hsl();
          shade = $window.Color().hsl(baseHsl.h, ImpacUtilities.getRandomInteger(40, 100), ImpacUtilities.getRandomInteger(50, 85)).rgb();
          return "rgb(" + shade.r + ", " + shade.g + ", " + shade.b + ")";
        },

        /*
         *   @desc Generates a palette of shades starting from the given hexcode color
         *   @param {string} [hexcode] A color hexcode to base the palette from.
         *   @param {integer} [amount] The amount of colour needed.
         *   @param {Array<number>} [options.lightnessRange] A minimum and maximum lightness range.
         */
        generateShadesPalette: function(hexcode, amount, options) {
          var baseHsl, counter, increment, palette, shade;
          if (options == null) {
            options = {};
          }
          options.lightnessRange || (options.lightnessRange = [50, 90]);
          baseHsl = $window.Color(hexcode).hsl();
          increment = options.lightnessRange.slice(0, 2).reduce(function(min, max) {
            return max - min;
          }) / amount;
          palette = [];
          counter = 0;
          while (counter < amount) {
            shade = $window.Color().hsl(baseHsl.h, baseHsl.s, options.lightnessRange[0]).rgb();
            palette.push("rgb(" + shade.r + ", " + shade.g + ", " + shade.b + ")");
            options.lightnessRange[0] += increment;
            counter++;
          }
          return palette;
        }
      };
      return service;
    };
    _$get.$inject = ['$window', 'ImpacUtilities'];
    provider.$get = _$get;
    return provider;
  });

}).call(this);

(function() {
  angular.module('impac.services.utilities', []).service('ImpacUtilities', ["$window", "$templateCache", "ImpacRoutes", function($window, $templateCache, ImpacRoutes) {
    var _, _self, moment;
    _ = $window._;
    moment = $window.moment;
    _self = this;
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

    /*
     *   @param {string} Word representation of a period symbol
     *   @returns {string} A time period word
     */
    this.getPeriodWord = function(period) {
      if (!angular.isDefined(period)) {
        return '';
      }
      switch (period.toLowerCase().slice(0, 1)) {
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

    /*
     *   @param {string} numberOfPeriods e.g "4"
     *   @param {string} period e.g "w"
     *   @returns {string} number and word formatted for reading e.g "4 weeks"
     */
    this.formatPeriod = function(numberOfPeriods, period) {
      var number, word;
      if (numberOfPeriods == null) {
        numberOfPeriods = "";
      }
      if (period == null) {
        period = "";
      }
      number = '';
      word = "" + (_self.getPeriodWord(period));
      if (numberOfPeriods > 1) {
        number = "" + numberOfPeriods;
        word += 's';
      }
      return [number, word].join(' ');
    };

    /*
     *   Determines the start and end dates of a selected time period, based on the metadata passed.
     *   @param {Object} histParams - Historical data
     *   @param {string} histParams.from - The "from" Date
     *   @param {string} histParams.to - The "to" Date
     *   @param {string} histParams.time_range - Shorthand of an amount of time periods.
     *   @returns {Object} Object containing formatted "to" and "from" dates.
     */
    this.selectedTimeRange = function(histParams) {
      var fromDate, n, period, resultHash, toDate, word;
      toDate = moment().format('YYYY-MM-DD');
      fromDate = moment().startOf('year').format('YYYY-MM-DD');
      if (histParams) {
        if (histParams.to) {
          toDate = histParams.to;
        }
        if (histParams.from) {
          fromDate = histParams.from;
        } else if (histParams.time_range) {
          n = histParams.time_range.match(/\d/g) && parseInt(histParams.time_range.match(/\d/g).join(''));
          period = histParams.time_range.match(/[a-z]/) && histParams.time_range.match(/[a-z]/)[0];
          word = _self.getPeriodWord(period);
          if (period === "w") {
            fromDate = moment().subtract(n, word).startOf('isoweek').format('YYYY-MM-DD');
          } else {
            fromDate = moment().subtract(n, word).startOf(word).format('YYYY-MM-DD');
          }
        }
      }
      resultHash = {
        from: fromDate,
        to: toDate
      };
      return resultHash;
    };
    this.financialYearDates = function(fYearEndMonth) {
      var end, resultHash, start, startYear;
      startYear = moment().year() - 1;
      if (moment().month() >= fYearEndMonth) {
        startYear = moment().year();
      }
      start = moment(startYear + "-" + (fYearEndMonth + 1) + "-01", 'YYYY-MM-DD');
      end = angular.copy(start).add(1, 'year').subtract(1, 'day');
      resultHash = {
        start: start.format('YYYY-MM-DD'),
        end: end.format('YYYY-MM-DD')
      };
      return resultHash;
    };
    this.yearDates = function() {
      return {
        from: moment().startOf('year').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD')
      };
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
    this.fetchWidgetCssClass = function(widget) {
      var bolt, templateNameArray;
      templateNameArray = widget.metadata && widget.metadata.template ? widget.metadata.template.split('/').slice(0, 2) : widget.endpoint && widget.metadata && widget.metadata.bolt_path ? (bolt = _.find(ImpacRoutes.bolts(), function(bolt) {
        return bolt.path === widget.metadata.bolt_path;
      }), bolt && [bolt.category, widget.endpoint]) : widget.endpoint ? widget.endpoint.split('/').slice(0, 2) : void 0;
      if (templateNameArray == null) {
        return false;
      }
      return templateNameArray.join('-').replace(/_/g, '-');
    };
    this.fetchWidgetTemplatePath = function(widget) {
      var cssClass, templatePath;
      if (!(cssClass = _self.fetchWidgetCssClass(widget))) {
        return false;
      }
      templatePath = "widgets/" + cssClass + ".tmpl.html";
      return $templateCache.get(templatePath) && templatePath;
    };
    this.getRandomInteger = function(min, max) {
      return Math.random() * (max - min) + min;
    };
  }]);

}).call(this);

(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  angular.module('impac.services.widgets', []).service('ImpacWidgetsSvc', ["$q", "$http", "$log", "$timeout", "ImpacRoutes", "ImpacMainSvc", "ImpacDashboardsSvc", "ImpacDeveloper", "ImpacEvents", "ImpacTheming", "IMPAC_EVENTS", function($q, $http, $log, $timeout, ImpacRoutes, ImpacMainSvc, ImpacDashboardsSvc, ImpacDeveloper, ImpacEvents, ImpacTheming, IMPAC_EVENTS) {
    var _self, initWidget, isWidgetInCurrentDashboard;
    _self = this;
    this.getSsoSessionId = ImpacMainSvc.getSsoSessionId;
    ImpacEvents.registerCb(IMPAC_EVENTS.kpiTargetAlert, function(notification) {
      return _self.refreshAll(true);
    });
    this.load = function() {
      if (_self.getSsoSessionId() == null) {
        return $q.all([ImpacMainSvc.loadUserData(), ImpacDashboardsSvc.load()]);
      } else {
        return $q.resolve();
      }
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
    this.updateWidgetSettings = function(widget, needContentReload, ignoreReach) {
      var changedGlobalSetting, meta;
      if (needContentReload == null) {
        needContentReload = true;
      }
      if (ignoreReach == null) {
        ignoreReach = false;
      }
      widget.isEditMode = false;
      if (_.isEmpty(widget.settings)) {
        $log.warn("Impac! - WidgetsSvc: Tried to update widget: " + widget.id + " with no settings", widget);
        return false;
      }
      changedGlobalSetting = _.find(widget.settings, function(setting) {
        return setting.reach === 'dashboard';
      });
      if (changedGlobalSetting && !ignoreReach) {
        return _self.updateAllSimilarWidgets(ImpacDashboardsSvc.getCurrentDashboard(), changedGlobalSetting);
      }
      meta = _.reduce(_.map(widget.settings, function(set) {
        return set.toMetadata();
      }), function(result, setMeta) {
        if (result == null) {
          result = {};
        }
        return angular.merge(result, setMeta);
      });
      return _self.update(widget, {
        metadata: meta
      }, needContentReload);
    };
    this.updateAllSimilarWidgets = function(dashboard, setting) {
      var settingKey;
      settingKey = _.keys(setting.toMetadata())[0];
      angular.extend(dashboard.metadata, setting.toMetadata());
      return ImpacDashboardsSvc.update(dashboard.id, {
        metadata: dashboard.metadata
      }).then(function(updatedDashboard) {
        var i, len, promises, ref, wgt, wgtSettingsKeys;
        promises = [];
        ref = dashboard.widgets;
        for (i = 0, len = ref.length; i < len; i++) {
          wgt = ref[i];
          wgtSettingsKeys = _.uniq(_.map(wgt.settings, function(st) {
            return _.keys(st.toMetadata())[0];
          }));
          if (indexOf.call(wgtSettingsKeys, settingKey) >= 0) {
            angular.extend(wgt.metadata, setting.toMetadata());
            promises.push(_self.update(wgt, {
              metadata: wgt.metadata
            }));
          } else {
            promises.push($q.resolve(wgt));
          }
        }
        return $q.all(promises);
      });
    };
    this.massAssignAll = function(metadata, refreshCache) {
      if (refreshCache == null) {
        refreshCache = false;
      }
      if (_.isEmpty(metadata)) {
        return $q.reject('undefined metadata');
      }
      return _self.load().then(function(_widget) {
        var currentDhb, i, len, newMetadata, promises, ref, widget;
        currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
        promises = [];
        if (!((currentDhb != null) && (currentDhb.widgets != null))) {
          $log.error("Impac! - WidgetsSvc: CurrentDhb.widgets is null", currentDhb);
          return $q.reject('undefined currentDhb or currentDhb.widgets');
        } else if (_.isEmpty(currentDhb.widgets)) {
          return $q.resolve([]);
        } else {
          ref = currentDhb.widgets;
          for (i = 0, len = ref.length; i < len; i++) {
            widget = ref[i];
            newMetadata = angular.merge({}, widget.metadata, metadata);
            if (!_.isEqual(widget.metadata, newMetadata)) {
              promises.push(_self.update(widget, {
                metadata: newMetadata
              }, false));
            }
          }
          return $q.all(promises).then(function(results) {
            return _self.refreshAll(refreshCache);
          });
        }
      });
    };
    this.isRefreshing = false;
    this.refreshAll = function(refreshCache) {
      if (refreshCache == null) {
        refreshCache = false;
      }
      if (_self.isRefreshing) {
        return $q.resolve();
      }
      _self.isRefreshing = true;
      return _self.load().then(function() {
        var currentDhb, i, len, promises, ref, w;
        currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
        promises = [];
        ref = currentDhb.widgets;
        for (i = 0, len = ref.length; i < len; i++) {
          w = ref[i];
          promises.push(_self.show(w, refreshCache).then(function(renderedWidget) {
            return $q.resolve(renderedWidget);
          }, function(errorResponse) {
            if ((errorResponse.data != null) && errorResponse.data.error) {
              $log.error(errorResponse.data.error);
            }
            return $q.reject(errorResponse);
          }));
        }
        return $q.all(promises);
      })["finally"](function() {
        return $timeout(function() {
          return _self.isRefreshing = false;
        }, 3000);
      });
    };
    initWidget = function(widget) {
      var i, len, ref, setting;
      if (angular.isDefined(widget.initContext)) {
        widget.initContext();
      }
      if (!_.isEmpty(widget.settings)) {
        ref = widget.settings;
        for (i = 0, len = ref.length; i < len; i++) {
          setting = ref[i];
          if (angular.isDefined(setting.initialize)) {
            setting.initialize();
          }
        }
      }
      if (angular.isDefined(widget.format)) {
        return widget.format();
      }
    };
    this.show = function(widget, refreshCache, demo) {
      if (refreshCache == null) {
        refreshCache = false;
      }
      if (demo == null) {
        demo = false;
      }
      widget.isLoading = true;
      return _self.load().then(function(loaded) {
        var authHeader, config, dashboard, demoData, params, route, url;
        demoData = ImpacTheming.get().dhbConfig.designerMode.enabled || demo;
        params = {
          metadata: widget.metadata,
          demo_data: demoData
        };
        if (refreshCache) {
          params.refresh_cache = true;
        }
        route = widget.metadata['bolt_path'] ? widget.metadata['bolt_path'] + "/widgets/" + widget.endpoint : (dashboard = ImpacDashboardsSvc.getCurrentDashboard(), ImpacRoutes.widgets.show(widget.endpoint, dashboard.id, widget.id));
        url = [route, decodeURIComponent($.param(params))].join('?');
        authHeader = 'Basic ' + btoa(_self.getSsoSessionId());
        config = {
          headers: {
            'Authorization': authHeader
          }
        };
        return $http.get(url, config).then(function(success) {
          var content, name;
          content = success.data.content || success.data[widget.endpoint] || {};
          if (_.isEmpty(content)) {
            if (demoData) {
              $log.error('Impac! - WidgetsSvc: Cannot retrieve demo data for widget:', widget);
              return $q.resolve(widget);
            } else {
              return _self.show(widget, refreshCache, true);
            }
          } else {
            name = success.data.name;
            angular.extend(widget, {
              content: content,
              originalName: name,
              demoData: demoData
            });
            initWidget(widget);
            return $q.resolve(widget);
          }
        }, function(showError) {
          initWidget(widget);
          if (angular.isDefined(widget.processError) && (showError.data != null) && showError.data.error) {
            widget.processError(showError.data.error);
          }
          return $q.reject(showError);
        });
      }, function(loadError) {
        $log.error("Impac! - WidgetsSvc: Error while trying to load the service");
        return $q.reject(loadError);
      })["finally"](function() {
        return widget.isLoading = false;
      });
    };
    this.create = function(params) {
      return _self.load().then(function(_widget) {
        var dashboard, request;
        dashboard = ImpacDashboardsSvc.getCurrentDashboard();
        if (ImpacDeveloper.isWidgetStubbed(params)) {
          request = ImpacDeveloper.createWidgetStub(params, dashboard);
        } else {
          request = $http.post(ImpacRoutes.widgets.create(dashboard.id), params);
        }
        return request.then(function(success) {
          var newWidget;
          newWidget = success.data;
          dashboard.widgets.push(newWidget);
          ImpacDashboardsSvc.callbacks.widgetAdded.notify(newWidget);
          return $q.resolve(newWidget);
        }, function(createError) {
          $log.error("Impac! - WidgetsSvc: Cannot create widget on dashboard " + dashboard.id);
          return $q.reject(createError);
        });
      }, function(loadError) {
        $log.error("Impac! - WidgetsSvc: Error while trying to load the service");
        return $q.reject(loadError);
      });
    };
    this.update = function(widget, opts, needContentReload) {
      if (needContentReload == null) {
        needContentReload = true;
      }
      widget.isLoading = needContentReload;
      return _self.load().then(function(_widget) {
        var dashboard, data, request;
        if (!isWidgetInCurrentDashboard(widget.id)) {
          $log.info("Impac! - WidgetsSvc: Trying to update a widget (id: " + widget.id + ") that is not in currentDashboard");
          return $q.reject("trying to update a widget (id: " + widget.id + ") that is not in currentDashboard");
        } else {
          data = {
            widget: opts
          };
          dashboard = ImpacDashboardsSvc.getCurrentDashboard();
          if (ImpacDeveloper.isWidgetStubbed(widget)) {
            request = ImpacDeveloper.updateWidgetStub(widget, data.widget);
          } else {
            request = $http.put(ImpacRoutes.widgets.update(dashboard.id, widget.id), data);
          }
          return request.then(function(success) {
            angular.extend(widget, success.data);
            if (needContentReload) {
              return _self.show(widget);
            } else {
              return $q.resolve(widget);
            }
          }, function(updateError) {
            $log.error("Impac! - WidgetsSvc: Cannot update widget: " + widget.id);
            return $q.reject(updateError);
          });
        }
      }, function(loadError) {
        $log.error("Impac! - WidgetsSvc: Error while trying to load the service");
        return $q.reject(loadError);
      })["finally"](function() {
        return widget.isLoading = false;
      });
    };
    this["delete"] = function(widgetToDelete) {
      return _self.load().then(function(_widget) {
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
          return $q.resolve(success);
        }, function(deleteError) {
          $log.error("Impac! - WidgetsSvc: Error while trying to delete widget: " + widgetToDelete.id);
          return $q.reject(deleteError);
        });
      }, function(loadError) {
        $log.error("Impac! - WidgetsSvc: Error while trying to load the service");
        return $q.reject(loadError);
      });
    };
    return _self;
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.common.data-not-found', []);

  module.directive('commonDataNotFound', ["$templateCache", "$location", "ImpacTheming", function($templateCache, $location, ImpacTheming) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var settings;
        settings = ImpacTheming.get().dataNotFoundConfig;
        scope.content = settings.content;
        scope.designerMode = ImpacTheming.get().dhbConfig.designerMode.enabled;
        scope.messageVisible = true;
        scope.hide = function() {
          return scope.messageVisible = false;
        };
        return scope.goToMarketplace = function() {
          if (settings.linkUrlCallback != null) {
            return settings.linkUrlCallback();
          } else {
            return $location.url(settings.linkUrl);
          }
        };
      },
      template: $templateCache.get('common/data-not-found.tmpl.html')
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.common.delete-widget', []);

  module.directive('commonDeleteWidget', ["$templateCache", "ImpacWidgetsSvc", "ImpacUtilities", function($templateCache, ImpacWidgetsSvc, ImpacUtilities) {
    return {
      restrict: 'A',
      template: $templateCache.get('common/delete-widget.tmpl.html'),
      scope: {
        parentWidget: '=',
        onDismiss: '&'
      },
      link: function(scope, element) {
        scope.loading = false;
        return scope.deleteWidget = function() {
          scope.loading = true;
          return ImpacWidgetsSvc["delete"](scope.parentWidget).then(null, function(e) {
            return scope.parentWidget.errors = ImpacUtilities.processRailsError(e);
          })["finally"](function() {
            return scope.loading = false;
          });
        };
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.dashboard-settings.currency', []);

  module.directive('dashboardSettingCurrency', ["$templateCache", "$log", "ImpacMainSvc", "ImpacDashboardsSvc", "ImpacWidgetsSvc", "ImpacKpisSvc", "ImpacTheming", "toastr", function($templateCache, $log, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, ImpacKpisSvc, ImpacTheming, toastr) {
    return {
      restrict: 'A',
      scope: {
        currency: '='
      },
      link: function(scope, element, attrs) {
        var init;
        scope.locked = ImpacTheming.get().dhbSettings.currency.locked;
        init = function(dhb) {
          scope.currentDhb = dhb;
          return scope.data = {
            currency: dhb.currency,
            savedCurrency: dhb.currency
          };
        };
        ImpacDashboardsSvc.dashboardChanged().then(null, null, function(newDhb) {
          return init(newDhb);
        });
        ImpacMainSvc.load().then(function(mainConfig) {
          scope.currencies = mainConfig.currencies;
          return ImpacDashboardsSvc.load().then(function(config) {
            return init(config.currentDashboard);
          });
        });
        return scope.massAssignCurrency = function() {
          var data;
          data = {
            currency: scope.data.currency
          };
          return ImpacDashboardsSvc.update(scope.currentDhb.id, data).then(function() {
            scope.data.savedCurrency = scope.data.currency;
            ImpacWidgetsSvc.massAssignAll(data);
            return ImpacKpisSvc.massAssignAll(data);
          }, function() {
            toastr.error("Unable to select currency '" + scope.data.currency + "'", 'Error');
            return scope.data.currency = scope.data.savedCurrency;
          });
        };
      },
      template: $templateCache.get('dashboard-settings/currency.tmpl.html')
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.dashboard-settings.pdf-mode', []);

  module.directive('dashboardSettingsPdfMode', ["$templateCache", "$window", "ImpacDashboardsSvc", "ImpacTheming", function($templateCache, $window, ImpacDashboardsSvc, ImpacTheming) {
    return {
      restrict: 'A',
      scope: {},
      template: $templateCache.get('dashboard-settings/pdf-mode.tmpl.html'),
      link: function(scope, element, attrs) {
        scope.enabled = ImpacTheming.get().dhbSelectorConfig.pdfModeEnabled;
        scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard();
        scope.pdfMode = false;
        scope.allNotTicked = false;
        scope.toggle = function() {
          scope.pdfMode = !scope.pdfMode;
          return ImpacDashboardsSvc.togglePdfMode(scope.pdfMode);
        };
        scope.print = function() {
          return $window.print();
        };
        return ImpacDashboardsSvc.ticked().then(null, null, function() {
          return scope.allNotTicked = _.all(scope.currentDhb.widgets, {
            ticked: false
          });
        });
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.dashboard-settings.sync-apps', []);

  module.directive('dashboardSettingSyncApps', ["$templateCache", "$log", "$http", "$filter", "$uibModal", "$document", "$timeout", "ImpacMainSvc", "ImpacRoutes", "ImpacWidgetsSvc", "ImpacKpisSvc", "ImpacTheming", "poller", "$sce", function($templateCache, $log, $http, $filter, $uibModal, $document, $timeout, ImpacMainSvc, ImpacRoutes, ImpacWidgetsSvc, ImpacKpisSvc, ImpacTheming, poller, $sce) {
    return {
      restrict: 'A',
      scope: {},
      template: $templateCache.get('dashboard-settings/sync-apps.tmpl.html'),
      link: function(scope, element, attrs) {
        var destroyPoller, formatDate, getOffset, initPoller, isError, processAppInstancesSync, refreshDashboard;
        scope.isSyncing = false;
        scope.realtimeSyncing = false;
        scope.hasError = false;
        scope.modalOpened = false;
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
        formatDate = function(connector) {
          if (!connector.last_sync_date) {
            return;
          }
          return connector.formatted_date = $filter('date')(connector.last_sync_date, "h:mma, yyyy-MM-dd", getOffset());
        };
        refreshDashboard = function() {
          ImpacWidgetsSvc.refreshAll(true);
          ImpacKpisSvc.refreshAll(true);
          if (_.any(scope.connectors, function(c) {
            return isError(c);
          })) {
            return scope.triggerSyncAlertsModal();
          }
        };
        processAppInstancesSync = function(responseData) {
          var connector, i, len, ref, wasSyncing;
          scope.connectors = angular.copy(responseData.connectors) || [];
          scope.realtimeSyncing = scope.connectors.length === 0;
          wasSyncing = scope.isSyncing;
          scope.isSyncing = scope.connectors && scope.connectors.length > 0 && _.any(scope.connectors, function(c) {
            return c.status === "PENDING" || c.status === "RUNNING";
          });
          scope.hasError = scope.connectors && scope.connectors.length > 0 && _.any(scope.connectors, function(c) {
            return isError(c);
          });
          ref = scope.connectors;
          for (i = 0, len = ref.length; i < len; i++) {
            connector = ref[i];
            formatDate(connector);
          }
          if (wasSyncing && !scope.isSyncing) {
            return refreshDashboard();
          }
        };
        isError = function(connector) {
          switch (connector.status) {
            case "ERROR":
              return true;
            case "FAILED":
              return true;
            case "DISCONNECTED":
              return true;
            case "UNKNOWN":
              return true;
            default:
              return false;
          }
        };
        scope.synchronize = function() {
          if (scope.isSyncing) {
            return;
          }
          scope.isSyncing = true;
          return $http.post(ImpacRoutes.organizations.appInstancesSync(scope.orgUID)).then(function(resp) {
            return processAppInstancesSync(resp.data);
          });
        };
        scope.triggerSyncAlertsModal = function() {
          var modalInstance;
          if (!(scope.modalOpened || _.isEmpty(scope.connectors))) {
            modalInstance = $uibModal.open({
              animation: true,
              size: 'md',
              templateUrl: 'alerts.tmpl.html',
              appendTo: angular.element('impac-dashboard'),
              openedClass: 'sync-modal-opened',
              controller: ["$scope", "connectors", function($scope, connectors) {
                $scope.connectors = connectors;
                $scope.expandListItemOnClick = function(connector) {
                  if (!connector.message) {
                    return;
                  }
                  return connector.showMessage = !!!connector.showMessage;
                };
                return $scope.ok = function() {
                  return modalInstance.close();
                };
              }],
              resolve: {
                connectors: function() {
                  return scope.connectors;
                }
              }
            });
            modalInstance.opened.then(function() {
              return scope.modalOpened = true;
            });
            return modalInstance.result["finally"](function() {
              return scope.modalOpened = false;
            });
          }
        };
        initPoller = function() {
          destroyPoller();
          return ImpacMainSvc.load().then(function(config) {
            scope.orgUID = config.currentOrganization.uid;
            scope.syncingPoller = poller.get(ImpacRoutes.organizations.appInstancesSync(scope.orgUID), {
              delay: 10000,
              smart: true
            });
            return scope.syncingPoller.promise.then(null, null, function(response) {
              return processAppInstancesSync(response.data);
            });
          });
        };
        destroyPoller = function() {
          if (scope.syncingPoller) {
            return scope.syncingPoller.stop() && scope.syncingPoller.remove();
          }
        };
        initPoller();
        ImpacMainSvc.organizationChanged().then(null, null, function(organization) {
          if (organization) {
            return initPoller();
          }
        });
        return scope.$on("$destroy", destroyPoller);
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.autofocus', []);

  module.directive('autofocus', ["$timeout", function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        return $timeout(function() {
          return element[0].focus();
        });
      }
    };
  }]);

}).call(this);


/*
 *   @desc Chart Threshold - create Widget KPIs from Widget charts. (Highchart widgets only).
 *   @todo support for multiple KPI watchables?
 *   @todo support for multiple KPI targets?
 *   @todo support for multiple attachable KPIs?
 */

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.chart-threshold', []);

  module.component('chartThreshold', {
    templateUrl: 'widgets-common/chart-threshold.tmpl.html',
    bindings: {
      widget: '<',
      chartPromise: '<?',
      chartShrinkSize: '<?',
      disabled: '<?',
      kpiTargetMode: '<?',
      kpiCreateLabel: '<?',
      onComplete: '&?'
    },
    controller: ["$timeout", "$log", "ImpacKpisSvc", "ImpacUtilities", "toastr", function($timeout, $log, ImpacKpisSvc, ImpacUtilities, toastr) {
      var ctrl, disableAttachability, getKpi, growChart, onChartClick, onChartNotify, onThresholdClick, shrinkChart, toggleKpiPanel, validateHistParameters;
      ctrl = this;
      ctrl.$onInit = function() {
        ctrl.kpi = {};
        ctrl.showPanel = false;
        ctrl.isEditingKpi = false;
        ctrl.loading = false;
        ctrl.draftTarget = {
          value: ''
        };
        ctrl.chartShrinkSize || (ctrl.chartShrinkSize = 38);
        ctrl.disabled || (ctrl.disabled = false);
        ctrl.kpiTargetMode || (ctrl.kpiTargetMode = 'min');
        ctrl.kpiCreateLabel || (ctrl.kpiCreateLabel = 'Get alerted when the target threshold goes below');
        ImpacKpisSvc.getAttachableKpis(ctrl.widget.endpoint).then(function(templates) {
          if (_.isEmpty(templates) || _.isEmpty(templates[0].watchables)) {
            return disableAttachability('No valid KPI Templates found');
          }
          return angular.extend(ctrl.kpi, angular.copy(templates[0]));
        }, function() {
          return disableAttachability();
        });
        if ((ctrl.chartPromise != null) && _.isFunction(ctrl.chartPromise.then)) {
          return ctrl.chartPromise.then(null, null, onChartNotify);
        }
      };
      ctrl.createKpi = function(target) {
        if (ctrl.disabled) {
          return;
        }
        if (!(target && _.isEmpty(ctrl.widget.kpis) && _.isEmpty(ctrl.draftTarget.value))) {
          return;
        }
        ctrl.draftTarget.value = target;
        toggleKpiPanel();
      };
      ctrl.editKpi = function(options) {
        if (ctrl.showPanel || ctrl.disabled || _.isEmpty(ctrl.widget.kpis)) {
          return;
        }
        ctrl.isEditingKpi = true;
        angular.extend(ctrl.draftTarget, options);
        toggleKpiPanel();
      };
      ctrl.cancelCreateKpi = function() {
        toggleKpiPanel();
        $timeout(function() {
          ctrl.draftTarget.value = '';
          ctrl.isEditingKpi = false;
          return ctrl.loading = false;
        }, 100);
      };
      ctrl.saveKpi = function() {
        var obj, params, promise, widgetHistParams;
        if (ctrl.loading) {
          return;
        }
        ctrl.loading = true;
        params = {
          targets: {},
          metadata: {}
        };
        params.targets[ctrl.kpi.watchables[0]] = [
          (
            obj = {},
            obj["" + ctrl.kpiTargetMode] = ctrl.draftTarget.value,
            obj
          )
        ];
        if (!ImpacKpisSvc.validateKpiTargets(params.targets)) {
          return;
        }
        promise = ctrl.isEditingKpi ? ImpacKpisSvc.update(getKpi(), params, false) : (ctrl.widget.metadata && (widgetHistParams = ctrl.widget.metadata.hist_parameters) ? params.metadata.hist_parameters = widgetHistParams : params.metadata.hist_parameters = ImpacUtilities.yearDates(), params.widget_id = ctrl.widget.id, ImpacKpisSvc.create('impac', ctrl.kpi.endpoint, ctrl.kpi.watchables[0], params));
        return promise.then(function(kpi) {
          ctrl.widget.kpis.push(kpi);
          if (_.isFunction(ctrl.onComplete)) {
            return ctrl.onComplete({
              $event: {
                kpi: kpi
              }
            });
          }
        }, function(err) {
          return toastr.error('Failed to save KPI', 'Error');
        })["finally"](function() {
          return ctrl.cancelCreateKpi();
        });
      };
      ctrl.deleteKpi = function() {
        var kpi, kpiDesc;
        if (ctrl.loading) {
          return;
        }
        ctrl.loading = true;
        kpiDesc = ctrl.widget.name + " " + (kpi = getKpi()).element_watched;
        return ImpacKpisSvc["delete"](kpi).then(function() {
          toastr.success("Deleted " + kpiDesc + " KPI");
          _.remove(ctrl.widget.kpis, function(k) {
            return k.id === kpi.id;
          });
          if (_.isFunction(ctrl.onComplete)) {
            return ctrl.onComplete({
              $event: {}
            });
          }
        }, function() {
          return toastr.error("Failed to delete " + kpiDesc + " KPI", 'Error');
        })["finally"](function() {
          return ctrl.cancelCreateKpi();
        });
      };
      getKpi = function() {
        return _.find(ctrl.widget.kpis, function(k) {
          return k.id === ctrl.draftTarget.kpiId;
        });
      };
      onChartNotify = function(chart) {
        var thresholdSeries;
        ctrl.chart = chart;
        validateHistParameters();
        Highcharts.addEvent(chart.container, 'click', onChartClick);
        thresholdSeries = _.select(chart.series, function(s) {
          return s.name.toLowerCase().includes('threshold');
        });
        _.each(thresholdSeries, function(t) {
          return Highcharts.addEvent(t, 'click', function(event) {
            return onThresholdClick(t);
          });
        });
      };
      onChartClick = function(event) {
        var value;
        if (event.srcElement.textContent === 'Reset zoom') {
          return;
        }
        if (!(event.yAxis && event.yAxis[0])) {
          return;
        }
        value = event.yAxis[0].value;
        if (!value || _.isNaN(value)) {
          return;
        } else {
          value = value.toFixed(2);
        }
        return ctrl.createKpi(value);
      };
      onThresholdClick = function(thresholdSerie) {
        var opts, thresholdValue;
        thresholdValue = (opts = thresholdSerie.options).data[opts.data.length - 1];
        return ctrl.editKpi({
          kpiId: opts.kpiId,
          value: thresholdValue
        });
      };
      disableAttachability = function(logMsg) {
        ctrl.disabled = true;
        toastr.warning("Chart threshold KPI disabled!", ctrl.widget.name + " Widget");
        if (logMsg) {
          return $log.warn("Impac! - " + ctrl.widget.name + " Widget: " + logMsg);
        }
      };
      toggleKpiPanel = function() {
        return $timeout(function() {
          if (ctrl.showPanel) {
            growChart();
          } else {
            shrinkChart();
          }
          return ctrl.showPanel = !ctrl.showPanel;
        });
      };
      shrinkChart = function() {
        if (!ctrl.chart) {
          return;
        }
        ctrl.chart.setSize(null, ctrl.chart.chartHeight - ctrl.chartShrinkSize, false);
        return ctrl.chart.container.parentElement.style.height = ctrl.chart.chartHeight + "px";
      };
      growChart = function() {
        if (!ctrl.chart) {
          return;
        }
        ctrl.chart.setSize(null, ctrl.chart.chartHeight + ctrl.chartShrinkSize, false);
        return ctrl.chart.container.parentElement.style.height = ctrl.chart.chartHeight + "px";
      };
      validateHistParameters = function() {
        var widgetHistParams;
        widgetHistParams = ctrl.widget.metadata && ctrl.widget.metadata.hist_parameters;
        ctrl.disabled = _.isEmpty(widgetHistParams) || moment(widgetHistParams.to) <= moment().startOf('day');
      };
      return ctrl;
    }]
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.currency-conversions', []);

  module.directive('commonCurrencyConversions', ["$templateCache", "ImpacAssets", function($templateCache, ImpacAssets) {
    return {
      restrict: 'A',
      scope: {
        fxAmounts: '=',
        baseCurrency: '=',
        ratesDate: '='
      },
      template: $templateCache.get('widgets-common/currency-conversions.tmpl.html'),
      link: function(scope, element) {
        scope.currencyConversionsIcon = ImpacAssets.get('currencyConversionsIcon');
        scope.popoverTemplateUrl = $templateCache.get('widgets-common/details-popover.html');
        scope.popoverTitle = "Currency Conversions Info";
        return scope.formattedRatesDate = moment(scope.ratesDate).format('MMMM Do YYYY');
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.editable-title', []);

  module.controller('CommonEditableTitleCtrl', ["$scope", "ImpacWidgetsSvc", "ImpacDashboardsSvc", "$translate", function($scope, ImpacWidgetsSvc, ImpacDashboardsSvc, $translate) {
    var w;
    w = $scope.parentWidget;
    $scope.updateName = function() {
      var data;
      if (w.name.length === 0) {
        w.name = w.originalName;
        return $translate.instant('impac.widget.editable_title.incorrect_name');
      } else {
        data = {
          name: w.name
        };
        return ImpacWidgetsSvc.update(w, data, false);
      }
    };
    $scope.getTooltip = function() {
      var tooltipText;
      if ($scope.pdfMode) {
        return '';
      } else {
        tooltipText = $translate.instant('impac.widget.editable_title.tooltip_text');
        return w.name + (w.hasEditAbility ? ' ' + tooltipText : '');
      }
    };
    ImpacDashboardsSvc.pdfModeEnabled().then(null, null, function() {
      return $scope.pdfMode = true;
    });
    return ImpacDashboardsSvc.pdfModeCanceled().then(null, null, function() {
      return $scope.pdfMode = false;
    });
  }]);

  module.directive('commonEditableTitle', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        onToggle: '&'
      },
      template: $templateCache.get('widgets-common/editable-title.tmpl.html'),
      controller: 'CommonEditableTitleCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.info-panel', []);

  module.directive('commonInfoPanel', ["$templateCache", "ImpacUtilities", function($templateCache, ImpacUtilities) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        onClose: '&'
      },
      template: $templateCache.get('widgets-common/info-panel.tmpl.html'),
      link: function(scope) {
        var w;
        w = scope.parentWidget;
        scope.hideInfoPanel = true;
        scope.toggleInfoPanel = function() {
          scope.hideInfoPanel = !scope.hideInfoPanel;
          return scope.onClose();
        };
        return scope.getWidgetTemplateName = function() {
          var cssClass, cssClassArray, widgetCategory, widgetName;
          cssClass = ImpacUtilities.fetchWidgetCssClass(w);
          if (!cssClass) {
            return "";
          }
          cssClassArray = cssClass.split('-');
          widgetCategory = cssClassArray.slice(0, 1);
          widgetName = cssClassArray.slice(1, cssClassArray.length).join(' ');
          return widgetCategory + " - " + widgetName;
        };
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.time-period-info', []);

  module.directive('commonTimePeriodInfo', ["$templateCache", "ImpacUtilities", "$translate", function($templateCache, ImpacUtilities, $translate) {
    return {
      restrict: 'A',
      scope: {
        context: '='
      },
      template: $templateCache.get('widgets-common/time-period-info.tmpl.html'),
      link: function(scope, element) {
        var getBehaviour, getDateInfo, getInjectAfter, getInjectBefore, yieldCaption;
        getBehaviour = function() {
          if (angular.isFunction(scope.context.accountingBehaviour)) {
            return scope.context.accountingBehaviour();
          } else {
            return scope.context.accountingBehaviour;
          }
        };
        getInjectBefore = function() {
          if (!angular.isDefined(scope.context.injectBefore)) {
            return '';
          }
          if (angular.isFunction(scope.context.injectBefore)) {
            return scope.context.injectBefore();
          } else {
            return scope.context.injectBefore;
          }
        };
        getInjectAfter = function() {
          if (!angular.isDefined(scope.context.injectAfter)) {
            return '';
          }
          if (angular.isFunction(scope.context.injectAfter)) {
            return scope.context.injectAfter();
          } else {
            return scope.context.injectAfter;
          }
        };
        yieldCaption = function(caption) {
          if (getInjectBefore().length > 0) {
            caption = caption.toLowerCase();
          }
          return [getInjectBefore(), caption, getInjectAfter()].join(' ');
        };
        getDateInfo = function() {
          var dates;
          dates = ImpacUtilities.selectedTimeRange(scope.context.histParams);
          if (getBehaviour() === 'bls') {
            return $translate('impac.widget.common.time_period_info.to', {
              dateTo: "" + dates.to
            }).then(function(label) {
              return scope.date = yieldCaption(label);
            });
          } else {
            return $translate('impac.widget.common.time_period_info.from_to', {
              dateFrom: "" + dates.from,
              dateTo: "" + dates.to
            }).then(function(label) {
              return scope.date = yieldCaption(label);
            });
          }
        };
        getDateInfo();
        scope.$watch('context.histParams', function(newVal, oldVal) {
          if (!_.isEqual(newVal, oldVal)) {
            return getDateInfo();
          }
        });
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-common.top-buttons', []);

  module.controller('CommonTopButtonsCtrl', ["$scope", "$rootScope", "$log", "ImpacWidgetsSvc", "ImpacAssets", "ImpacUtilities", function($scope, $rootScope, $log, ImpacWidgetsSvc, ImpacAssets, ImpacUtilities) {
    var w;
    w = $scope.parentWidget;
    w.isEditMode = false;
    $scope.toggleEditMode = function() {
      if (!w.isLoading) {
        if (w.isEditMode) {
          w.isEditMode = false;
          return ImpacWidgetsSvc.initWidgetSettings(w);
        } else {
          return w.isEditMode = true;
        }
      }
    };
    return $scope.hasInfo = function() {
      return w && (w.content != null) && (w.content.info != null) && w.content.info.length > 0;
    };
  }]);

  module.directive('commonTopButtons', ["$templateCache", function($templateCache) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        onRefresh: '=',
        onToggleInfoPanel: '&',
        onToggleDeleteWidget: '&'
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
      balance = anAccount.current_balance || anAccount.balance || 0.0;
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

  module.directive('settingAccount', ["$templateCache", "$translate", function($templateCache, $translate) {
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
          return scope.label = $translate.instant('impac.widget.settings.account.label');
        }
      },
      template: $templateCache.get('widgets-settings/account.tmpl.html'),
      controller: 'SettingAccountCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.accounting-behaviour', []);

  module.directive('settingAccountingBehaviour', ["$templateCache", "$timeout", function($templateCache, $timeout) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        defaultBehaviour: '=?'
      },
      template: $templateCache.get('widgets-settings/accounting-behaviour.tmpl.html'),
      link: function(scope) {
        var setting, w;
        w = scope.parentWidget;
        setting = {};
        setting.key = "accounting-behaviour";
        setting.initialize = function() {
          return $timeout(function() {
            if ((scope.defaultBehaviour != null) && scope.defaultBehaviour === 'pnl') {
              return scope.selectedBehaviour = 'pnl';
            } else {
              return scope.selectedBehaviour = 'bls';
            }
          });
        };
        setting.toMetadata = function() {
          return {
            accounting_behaviour: scope.selectedBehaviour
          };
        };
        w.settings.push(setting);
        return scope.deferred.resolve(setting);
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.accounts-list', []);

  module.controller('SettingAccountsListCtrl', ["$scope", "$timeout", "ImpacWidgetsSvc", function($scope, $timeout, ImpacWidgetsSvc) {
    var restoreSavedAccounts, setting, w;
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
      setting.isInitialized = false;
      w.remainingAccounts = [];
      w.selectedAccounts = [];
      if ((w.content != null) && !_.isEmpty(w.content.complete_list)) {
        w.remainingAccounts = angular.copy(w.content.complete_list);
        return $timeout(function() {
          restoreSavedAccounts();
          return setting.isInitialized = true;
        });
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
    restoreSavedAccounts = function() {
      var acc, accUid, accountsList, i, len, results;
      if (_.isEmpty(w.metadata.accounts_list) && _.isEmpty($scope.accountsList)) {
        return;
      }
      accountsList = _.isEmpty($scope.accountsList) ? w.metadata.accounts_list : $scope.accountsList;
      results = [];
      for (i = 0, len = accountsList.length; i < len; i++) {
        accUid = accountsList[i];
        acc = _.find(w.content.complete_list, function(acc) {
          return acc.uid === accUid;
        });
        results.push(w.moveAccountToAnotherList(acc, w.remainingAccounts, w.selectedAccounts, false));
      }
      return results;
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
        accountsList: '=?'
      },
      controller: 'SettingAccountsListCtrl'
    };
  });

}).call(this);


/*
 *     Attach KPIs onto widget with a form for picking target mode and value. View widget's
 *     attached KPIs, manage set targets, alerts and delete.
 *     **NOTE: this component is not in use, and requires fixes/improvements to be used.**
 */

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.attach-kpis', []);

  module.directive('settingAttachKpis', ["$templateCache", "ImpacWidgetsSvc", "ImpacKpisSvc", "$translate", function($templateCache, ImpacWidgetsSvc, ImpacKpisSvc, $translate) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        attachedKpis: '=?',
        widgetEngine: '=',
        widgetId: '=',
        extraParams: '=?',
        deferred: '=',
        showExtraParam: '=?'
      },
      template: $templateCache.get('widgets-settings/attach-kpis.tmpl.html'),
      controller: ["$scope", function($scope) {
        var loadKpisData, settings, w;
        w = $scope.parentWidget;
        settings = {};
        settings.initialize = function() {
          return loadKpisData();
        };
        settings.toMetadata = function() {};
        w.settings.push(settings);
        $scope.formatKpiName = function(endpoint) {
          return ImpacKpisSvc.formatKpiName(endpoint);
        };
        $scope.hasValidTarget = function() {
          return ImpacKpisSvc.validateKpiTarget($scope.kpi);
        };
        $scope.attachKpi = function() {
          var param, paramValues, params, ref, target0;
          params = {};
          if (!$scope.hasValidTarget()) {
            return;
          }
          target0 = {};
          target0[$scope.kpi.limit.mode] = $scope.kpi.limit.value;
          params.targets = {};
          params.targets[$scope.kpi.watchables[0]] = [target0];
          params.widget_id = $scope.widgetId;
          ref = $scope.extraParams;
          for (param in ref) {
            paramValues = ref[param];
            params.extra_params || (params.extra_params = {});
            params.extra_params[param] = paramValues.uid;
          }
          console.log('attachKpis: ', $scope.kpi.endpoint, $scope.elementWatched, params);
          return ImpacKpisSvc.create('impac', $scope.kpi.endpoint, $scope.elementWatched, params).then(function(kpi) {
            console.log('attached KPI: ', kpi);
            return $scope.attachedKpis.push(kpi);
          });
        };
        $scope.deleteKpi = function(kpi) {
          return ImpacKpisSvc["delete"](kpi, {
            widget_id: $scope.widgetId
          }).then(function() {
            return _.remove($scope.attachedKpis, function(k) {
              return k.id === kpi.id;
            });
          });
        };
        $scope.formatAttachedKpiTitle = function(kpi) {
          if (!(kpi.data && kpi.targets && $scope.elementWatched)) {
            return '';
          }
          return ImpacKpisSvc.formatKpiTarget(kpi.targets[$scope.elementWatched][0], kpi.data[$scope.elementWatched].unit, $scope.possibleTargets);
        };
        $scope.attachedKpis || ($scope.attachedKpis = []);
        $scope.possibleTargets = [
          {
            label: $translate.instant('impac.widget.settings.attach_kpis.over'),
            mode: 'min'
          }, {
            label: $translate.instant('impac.widget.settings.attach_kpis.below'),
            mode: 'max'
          }
        ];
        $scope.kpi = {
          limit: {
            mode: $scope.possibleTargets[0].mode
          }
        };
        ImpacKpisSvc.getAttachableKpis($scope.widgetEngine).then(function(kpiTemplates) {
          $scope.availableKpis = angular.copy(kpiTemplates);
          angular.extend($scope.kpi, $scope.availableKpis[0]);
          $scope.selectedParam = _.keys($scope.extraParams)[0];
          return $scope.elementWatched = ($scope.kpi.watchables != null) && $scope.kpi.watchables[0];
        });
        loadKpisData = function() {};
        loadKpisData();
        return $scope.deferred.resolve($scope.parentWidget);
      }]
    };
  }]);

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

  module.directive('settingDatesPicker', ["$templateCache", "$filter", "ImpacWidgetsSvc", "$timeout", "$compile", function($templateCache, $filter, ImpacWidgetsSvc, $timeout, $compile) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=?',
        deferred: '=',
        fromDate: '=from',
        toDate: '=to',
        keepToday: '=',
        onUse: '&?',
        onChangeCb: '&?onChange',
        minDate: '=?',
        updateOnPick: '=?',
        template: '=?'
      },
      template: $templateCache.get('widgets-settings/dates-picker.tmpl.html'),
      link: function(scope, element) {
        var applyHtml, buildDates, fromDateHtml, isToToday, setting, templatesContainer, toDateHtml, w;
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
        scope.template || (scope.template = "<div style=\"display: flex; flex-wrap: wrap;\">\n  <div style=\"display: flex; flex-grow: 1; justify-content: space-around; margin: 2px 0px;\">\n    <span class=\"sdp-from-label\" style=\"padding-top: 3px; min-width: 32px; flex-grow: 1; text-align: center;\" translate>impac.widget.settings.dates_picker.from</span> <from-date style=\"flex-grow: 2;\">\n  </div>\n  <div style=\"display: flex; flex-grow: 1; justify-content: space-around; margin: 2px 0px;\">\n    <span class=\"sdp-to-label\" style=\"padding-top: 3px; min-width: 32px; flex-grow: 1; text-align: center;\" translate>impac.widget.settings.dates_picker.to</span> <to-date style=\"flex-grow: 2;\">\n  </div>\n</div>");
        fromDateHtml = "<div style=\"display: inline-block;\">\n  <button class=\"btn btn-sm btn-default date-button\" ng-click=\"calendarFrom.toggle()\" uib-datepicker-popup ng-model=\"calendarFrom.value\" is-open=\"calendarFrom.opened\" ng-change=\"onChange()\" min-date=\"minDate\" max-date=\"calendarTo.value\" ng-focus=\"onUse()\" ATTRS>\n    {{ calendarFrom.value | date : 'yyyy-MM-dd' }}\n  </button>\n</div>";
        toDateHtml = "<div style=\"display: inline-block;\">\n  <button class=\"btn btn-sm btn-default date-button\" ng-click=\"calendarTo.toggle()\" uib-datepicker-popup ng-model=\"calendarTo.value\" is-open=\"calendarTo.opened\" ng-change=\"onChange()\" min-date=\"calendarFrom.value\" ng-focus=\"onUse()\" ATTRS>\n    {{ calendarTo.value | date : 'yyyy-MM-dd' }}\n  </button>\n</div>";
        applyHtml = "<button class=\"btn btn-sm btn-success\" uib-tooltip=\"{{'impac.widget.settings.dates_picker.tooltip.apply_changes' | translate}}\" ng-show=\"changed && !parentWidget.isEditMode\" ng-click=\"applyChanges()\" ng-focus=\"onUse()\" >\n  <i class=\"fa fa-check\"/>\n</button>";
        scope.template = scope.template.replace(/>/, " ng-click='onUse()'>");
        scope.template = scope.template.replace(/<from-date([^>]*)>/g, "" + (fromDateHtml.replace('ATTRS', '$1')));
        scope.template = scope.template.replace(/<to-date([^>]*)>/g, "" + (toDateHtml.replace('ATTRS', '$1')));
        scope.template = scope.template.replace(/<apply([^>]*)>/g, "" + (applyHtml.replace('ATTRS', '$1')));
        templatesContainer = element.find('#template-container');
        templatesContainer.html(scope.template).show();
        $compile(templatesContainer.contents())(scope);
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
        scope.onChange = function() {
          scope.showApplyButton();
          if (!_.isUndefined(scope.onChangeCb)) {
            return scope.onChangeCb()(buildDates());
          }
        };
        buildDates = function() {
          return {
            from: $filter('date')(scope.calendarFrom.value, 'yyyy-MM-dd'),
            to: $filter('date')(scope.calendarTo.value, 'yyyy-MM-dd'),
            keepToday: isToToday()
          };
        };
        scope.showApplyButton = function() {
          if (scope.updateOnPick) {
            return scope.applyChanges();
          } else {
            return scope.changed = true;
          }
        };
        scope.applyChanges = function() {
          ImpacWidgetsSvc.updateWidgetSettings(w, true);
          return scope.changed = false;
        };
        scope.showTitle = function() {
          return element.hasClass('part');
        };
        if (w) {
          w.settings.push(setting);
        }
        return scope.deferred.resolve(setting);
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.formula', []);

  module.controller('SettingFormulaCtrl', ["$scope", "$filter", "$timeout", "$translate", function($scope, $filter, $timeout, $translate) {
    var AUTHORIZED_REGEXP, evaluateFormula, formatFormula, getFormula, interpolateInFormula, isRatio, prepareFormula, setting, translateEvaluatedFormula, w;
    w = $scope.parentWidget;
    w.formula = '';
    AUTHORIZED_REGEXP = new RegExp("^(\\{|\\d|\\}|\\/|\\+|-|\\*|\\(|\\)|\\s|\\.)*$");
    setting = {};
    setting.key = "formula";
    setting.isInitialized = false;
    setting.initialize = function() {
      if ((w.metadata != null) && (w.metadata.formula != null)) {
        w.formula = w.metadata.formula;
        return $timeout(function() {
          prepareFormula();
          return setting.isInitialized = true;
        });
      } else {
        return w.formula = '';
      }
    };
    setting.toMetadata = function() {
      prepareFormula();
      if (w.isFormulaCorrect) {
        return {
          formula: w.formula
        };
      } else {
        return {
          formula: ''
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
      return prepareFormula();
    });
    prepareFormula = function() {
      var evaluatedFormula, interpolatedFormula;
      interpolatedFormula = interpolateInFormula(w.formula, w.selectedAccounts, 'current_balance');
      if ((evaluatedFormula = evaluateFormula(interpolatedFormula))) {
        w.evaluatedFormula = formatFormula(evaluatedFormula, w.formula, w.selectedAccounts);
        w.legend = interpolateInFormula(w.formula, w.selectedAccounts, 'name');
        w.isFormulaCorrect = true;
      } else {
        w.evaluatedFormula = 'invalid expression';
        w.legend = '...';
        w.isFormulaCorrect = false;
      }
      return w.evaluatedFormulaTranslate = translateEvaluatedFormula(w.evaluatedFormula);
    };
    translateEvaluatedFormula = function(formula) {
      switch (formula) {
        case 'invalid expression':
          return $translate.instant('impac.widget.formula.invalid_expression');
        case 'Infinity':
          return $translate.instant('impac.widget.formula.infinity');
        case '-Infinity':
          return $translate.instant('impac.widget.formula.minus_infinity');
        default:
          return formula;
      }
    };
    interpolateInFormula = function(sourceFormula, selectedAccounts, accountMember) {
      var account, i, interpolation, j, len, pattern;
      interpolation = sourceFormula;
      if (_.isEmpty(selectedAccounts)) {
        return interpolation;
      }
      for (i = j = 0, len = selectedAccounts.length; j < len; i = ++j) {
        account = selectedAccounts[i];
        pattern = new RegExp("\\{" + (i + 1) + "\\}", 'g');
        interpolation = interpolation.replace(pattern, " " + account[accountMember] + " ");
      }
      return interpolation;
    };
    evaluateFormula = function(interpolatedFormula) {
      var e, evaluation;
      if (!interpolatedFormula.match(AUTHORIZED_REGEXP)) {
        return false;
      }
      try {
        evaluation = eval(interpolatedFormula).toFixed(2);
        if (isFinite(evaluation)) {
          return evaluation;
        } else {
          return false;
        }
      } catch (error) {
        e = error;
        return false;
      }
    };
    isRatio = function(sourceFormula) {
      return sourceFormula.match(/\//g);
    };
    formatFormula = function(evaluation, sourceFormula, selectedAccounts) {
      var currency, firstAccount;
      if (isRatio(sourceFormula) || _.isEmpty(selectedAccounts)) {
        return evaluation;
      }
      firstAccount = selectedAccounts[0];
      if (!(currency = firstAccount.currency)) {
        return evaluation;
      }
      return $filter('mnoCurrency')(evaluation, currency);
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

  module.controller('SettingHistModeCtrl', ["$scope", "$translate", "$timeout", "ImpacWidgetsSvc", "ImpacTheming", "ImpacUtilities", function($scope, $translate, $timeout, ImpacWidgetsSvc, ImpacTheming, ImpacUtilities) {
    var buildCurrentLabel, setting, w;
    w = $scope.parentWidget;
    w.isHistoryMode = w.metadata && w.metadata.hist_parameters && w.metadata.hist_parameters.mode === 'history';
    $scope.forwardParams = {
      accountingBehaviour: function() {
        return $scope.accountingBehaviour;
      }
    };
    $scope.toggleHistMode = function(mode) {
      var ref;
      if ((w.isHistoryMode && mode === 'history') || (!w.isHistoryMode && mode === 'current')) {
        return;
      }
      w.isHistoryMode = !w.isHistoryMode;
      ImpacWidgetsSvc.updateWidgetSettings(w, false);
      return ref = $scope.onToggle(), indexOf.call(angular.isDefined($scope.onToggle), ref) >= 0;
    };
    buildCurrentLabel = function() {
      var label, labels, needPrefix, prefix;
      labels = ImpacTheming.get().widgetSettings.histModeChoser.currentLabels;
      if (($scope.accountingBehaviour != null) && labels[$scope.accountingBehaviour]) {
        needPrefix = !$scope.endDate || ($scope.endDate === moment().format('YYYY-MM-DD'));
        label = labels[$scope.accountingBehaviour];
        prefix = labels[$scope.accountingBehaviour] + '.prefix';
        return $translate([prefix, label]).then(function(translations) {
          return $scope.currentLabel = needPrefix ? translations[prefix] + " " + translations[label] : translations[label];
        });
      } else {
        return $translate(labels["default"]).then(function(label) {
          return $scope.currentLabel = label;
        });
      }
    };
    setting = {};
    setting.key = "hist-mode";
    setting.isInitialized = false;
    setting.initialize = function() {
      return $timeout(function() {
        var mode;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null) && (mode = w.metadata.hist_parameters.mode)) {
          w.isHistoryMode = mode === 'history' ? true : false;
        }
        buildCurrentLabel();
        $scope.forwardParams.histParams = w.metadata && w.metadata.hist_parameters;
        setting.isInitialized = true;
        return $scope;
      });
    };
    setting.toMetadata = function() {
      var mode;
      mode = w.isHistoryMode ? 'history' : 'current';
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
        onToggle: '&',
        accountingBehaviour: '@?',
        endDate: '=?'
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

  module = angular.module('impac.components.widgets-settings.offsets', []);

  module.directive('settingOffsets', ["$templateCache", "ImpacUtilities", function($templateCache, ImpacUtilities) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        offsetsKey: '@',
        initialOffsets: '=',
        currency: '=',
        intervalsCount: '=',
        period: '=',
        showIntervalsMult: '=',
        textPlaceholder: '@?'
      },
      template: $templateCache.get('widgets-settings/offsets.tmpl.html'),
      link: function(scope) {
        var authorized_regex, computedFormula, placeholder, setting, w;
        w = scope.parentWidget;
        authorized_regex = new RegExp("^(\\{|\\d|\\}|\\/|\\+|-|\\*|\\(|\\)|\\s|\\.)*$");
        setting = {
          key: "offsets-" + scope.offsetsKey
        };
        setting.initialize = function() {
          var i, len, offsetValue, ref;
          scope.offsets = [];
          ref = scope.initialOffsets || [];
          for (i = 0, len = ref.length; i < len; i++) {
            offsetValue = ref[i];
            scope.offsets.push(offsetValue);
          }
          scope.offsetFormula = "";
          scope.periodWord = ImpacUtilities.getPeriodWord(scope.period);
          return scope.placeholder = placeholder(scope.period || 'MONTHLY');
        };
        setting.toMetadata = function() {
          var metadata;
          metadata = {
            offset: {}
          };
          metadata.offset[scope.offsetsKey] = scope.offsets;
          return metadata;
        };
        scope.addOffset = function() {
          var result;
          result = computedFormula();
          if (result) {
            scope.offsets.push(result);
          }
          return scope.offsetFormula = "";
        };
        scope.removeOffset = function(offsetIndex) {
          return scope.offsets.splice(offsetIndex, 1);
        };
        scope.addOffsetOnEnter = function(event) {
          if (event.keyCode === 13) {
            return scope.addOffset();
          }
        };
        placeholder = function(inputPeriod) {
          var period;
          if (scope.textPlaceholder != null) {
            return scope.textPlaceholder;
          }
          period = inputPeriod.charAt(0).toUpperCase() + inputPeriod.slice(1).toLowerCase();
          return period + " adjustment";
        };
        computedFormula = function() {
          if (scope.offsetFormula.match(authorized_regex)) {
            return eval(scope.offsetFormula);
          }
        };
        if (w) {
          w.settings.push(setting);
        }
        return scope.deferred.resolve(setting);
      }
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
      w.selectedOrganizations[orgUid] = !w.selectedOrganizations[orgUid];
      if (angular.isDefined($scope.onSelect)) {
        return $scope.onSelect({
          orgs: w.selectedOrganizations
        });
      }
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
        deferred: '=',
        onSelect: '&?'
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
    $scope.onInit = function() {
      $scope.selectedOption = {};
      return angular.extend($scope.selectedOption, $scope.selected);
    };
    $scope.selectOption = function(anOption) {
      if (anOption.value !== $scope.selected.value) {
        angular.extend($scope.selected, anOption);
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
      template: function(elements, attrs) {
        return $templateCache.get(attrs.classic ? 'widgets-settings/param-selector-classic.tmpl.html' : 'widgets-settings/param-selector.tmpl.html');
      },
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
      $scope.applyToDashboard = w.metadata[$scope.param] && w.metadata[$scope.param].reach === 'dashboard';
      $scope.toggleReach = function() {
        return setting.reach = $scope.applyToDashboard ? 'dashboard' : 'widget';
      };
      $scope.toggleReach();
      if (_.isEmpty($scope.options)) {
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var param;
      param = {};
      param[$scope.param] = {
        values: _.compact(_.map($scope.options, function(statusOption) {
          if (statusOption.selected) {
            return statusOption.value || statusOption.label;
          }
        })),
        reach: setting.reach
      };
      return param;
    };
    w.settings.push(setting);
    return $scope.deferred.resolve($scope.parentWidget);
  }]);

  module.directive('settingParamsPicker', ["$templateCache", "$translate", function($templateCache, $translate) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        param: '@',
        options: '=',
        hasReach: '=',
        description: '@'
      },
      link: function(scope, elements, attrs) {
        var paramText;
        paramText = $translate.instant('impac.widget.settings.params-picker.' + scope.param);
        scope.formattedParam = _.includes(paramText, 'impac.widget.settings.params-picker') ? scope.param.replace(/_/g, ' ') : paramText;
        if (scope.description == null) {
          return scope.description = $translate.instant('impac.widget.settings.params-picker.description');
        }
      },
      template: $templateCache.get('widgets-settings/params-picker.tmpl.html'),
      controller: 'SettingParamsPickerCtrl'
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.tag-filter', ['ngTagsInput']);

  module.directive('settingTagFilter', ["$templateCache", "$timeout", function($templateCache, $timeout) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '='
      },
      template: $templateCache.get('widgets-settings/tag-filter.tmpl.html'),
      link: function(scope) {
        var filterToSettingTags, initiateAutoComplete, loadRules, setting, w;
        w = scope.parentWidget;
        setting = {};
        setting.key = "tag-filter";
        scope.settingsTags = [];
        setting.initialize = function() {
          return $timeout(function() {
            loadRules();
            initiateAutoComplete();
            return true;
          });
        };
        setting.toMetadata = function() {
          var filterQuery, filterQueryRules;
          filterQueryRules = [];
          filterQuery = {
            condition: 'OR',
            rules: filterQueryRules
          };
          angular.forEach(scope.settingsTags, function(settingsTag) {
            var filterQueryCondition;
            filterQueryCondition = {
              condition: 'AND',
              rules: []
            };
            angular.forEach(settingsTag.tags, function(filterItem) {
              var ruletag;
              ruletag = {
                value: filterItem.value
              };
              if (filterItem.name != null) {
                ruletag.name = filterItem.name;
              }
              return filterQueryCondition.rules.push(ruletag);
            });
            if (settingsTag.tags.length !== 0) {
              return filterQueryRules.push(filterQueryCondition);
            }
          });
          if (filterQuery.rules.length === 0) {
            filterQuery = {};
          }
          return {
            filter_query: filterQuery
          };
        };
        filterToSettingTags = function(filterQuery) {
          var settingsTags;
          if (_.isEmpty(filterQuery)) {
            return;
          }
          settingsTags = [];
          angular.forEach(filterQuery.rules, function(filterQueryRule) {
            var settingRule;
            settingRule = {
              operator: 'OR',
              tags: []
            };
            angular.forEach(filterQueryRule.rules, function(filterQueryRuleCondition) {
              var ruletag, tagtext;
              tagtext = _.compact([filterQueryRuleCondition.name, filterQueryRuleCondition.value]).join(":");
              ruletag = {
                value: filterQueryRuleCondition.value,
                text: tagtext
              };
              if (filterQueryRuleCondition.name != null) {
                ruletag.name = filterQueryRuleCondition.name;
              }
              return settingRule.tags.push(ruletag);
            });
            return settingsTags.push(settingRule);
          });
          return settingsTags;
        };
        loadRules = function() {
          if (_.isEmpty(w.metadata.filter_query)) {
            return;
          }
          return scope.settingsTags = filterToSettingTags(w.metadata.filter_query);
        };
        initiateAutoComplete = function() {
          var autotags, org, tag_hash, tags;
          tags = w.content.available_tags || [];
          autotags = [];
          for (org in tags) {
            tag_hash = tags[org];
            angular.forEach(tag_hash.tag_references, function(tag_ref) {
              return angular.forEach(tag_ref.tag_reference_values, function(tag) {
                var ruletag, tagtext;
                tagtext = _.compact([tag_ref.name, tag.value]).join(":");
                ruletag = {
                  text: tagtext,
                  value: tag.value
                };
                if (tag_ref.name != null) {
                  ruletag.name = tag_ref.name;
                }
                return autotags.push(ruletag);
              });
            });
          }
          return scope.loadTagList = function(query) {
            return _.filter(autotags, function(e) {
              return e.text.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          };
        };
        scope.addRule = function() {
          return scope.settingsTags.push({
            'operator': 'OR',
            'tags': []
          });
        };
        scope.delRule = function(index) {
          return scope.settingsTags.splice(index, 1);
        };
        w.settings.push(setting);
        return scope.deferred.resolve(setting);
      }
    };
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets-settings.time-period', []);

  module.directive('settingTimePeriod', ["$templateCache", "$q", "$log", "$timeout", "ImpacTheming", "$translate", function($templateCache, $q, $log, $timeout, ImpacTheming, $translate) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        histParams: '=?',
        hideChartInterval: '=?',
        applyChangesCallback: '&?'
      },
      template: $templateCache.get('widgets-settings/time-period.tmpl.html'),
      link: function(scope) {
        var getPeriod, getSetting, getUsedSettingKey, initPeriod, initUsedSetting, settingsPromises, updateFromDate, updateTimeRangePeriod, w;
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
        scope.resetPreset = $q.defer();
        $translate(["impac.widget.settings.time_period.period.daily", "impac.widget.settings.time_period.period.weekly", "impac.widget.settings.time_period.period.monthly", "impac.widget.settings.time_period.period.quarterly", "impac.widget.settings.time_period.period.yearly", "impac.widget.settings.time_period.period.days", "impac.widget.settings.time_period.period.weeks", "impac.widget.settings.time_period.period.months", "impac.widget.settings.time_period.period.quarters", "impac.widget.settings.time_period.period.years"]).then(function(translations) {
          return scope.periods = [
            {
              label: translations["impac.widget.settings.time_period.period.daily"],
              plural: "days",
              value: "DAILY"
            }, {
              label: translations["impac.widget.settings.time_period.period.weekly"],
              plural: "weeks",
              value: "WEEKLY"
            }, {
              label: translations["impac.widget.settings.time_period.period.monthly"],
              plural: "months",
              value: "MONTHLY"
            }, {
              label: translations["impac.widget.settings.time_period.period.quarterly"],
              plural: "quarters",
              value: "QUARTERLY"
            }, {
              label: translations["impac.widget.settings.time_period.period.yearly"],
              plural: "years",
              value: "YEARLY"
            }
          ];
        });
        scope.maxNumberOfPeriods = 20;
        if ((ImpacTheming.get().widgetSettings != null) && (ImpacTheming.get().widgetSettings.timePeriod != null) && !_.isEmpty(ImpacTheming.get().widgetSettings.timePeriod.presets)) {
          scope.presets = angular.copy(ImpacTheming.get().widgetSettings.timePeriod.presets);
        }
        scope.applyPreset = function(histParams) {
          initPeriod(histParams);
          return initUsedSetting(histParams);
        };
        scope.timePeriodSetting.initialize = function() {
          return $timeout(function() {
            initPeriod();
            getSetting('time-presets').initialize();
            return scope.showApplyButton = angular.isDefined(scope.applyChangesCallback);
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
            return initUsedSetting();
          }
        };
        getSetting = function(key) {
          return _.find(scope.timePeriodSetting.settings, function(set) {
            return set.key === key;
          });
        };
        initPeriod = function(histParams) {
          if (histParams == null) {
            histParams = null;
          }
          if (histParams == null) {
            histParams = scope.histParams;
          }
          if ((histParams != null) && (histParams.period != null) && _.find(scope.periods, function(period) {
            return period.value === histParams.period;
          })) {
            scope.timePeriodSetting.period = angular.copy(histParams.period);
          } else {
            scope.timePeriodSetting.period = "MONTHLY";
          }
          return scope.timePeriodSetting.period;
        };
        initUsedSetting = function(histParams) {
          var minDate, newLetter, pattern, tr;
          if (histParams == null) {
            histParams = null;
          }
          if (histParams == null) {
            histParams = scope.histParams;
          }
          if ((histParams != null) && (histParams.from != null)) {
            scope.usedSetting = 'dates-picker';
            scope.toDate = histParams.to;
            minDate = scope.getMinDate(scope.toDate);
            if (moment(histParams.from, "YYYY-MM-DD").isBefore(minDate)) {
              scope.fromDate = minDate;
            } else {
              scope.fromDate = histParams.from;
            }
            scope.keepToday = histParams.keep_today;
            getSetting('dates-picker').initialize();
          } else {
            scope.usedSetting = 'time-slider';
            if ((histParams != null) && (histParams.time_range != null)) {
              tr = histParams.time_range;
              pattern = /([a-z])/;
              newLetter = pattern.exec(tr)[1];
              scope.timePeriodSetting.period = angular.copy(_.find(scope.periods, function(p) {
                return p.value.slice(0, 1).toLowerCase() === newLetter;
              }).value);
              scope.timePeriodSetting.timeRange = tr;
            }
            getSetting('time-slider').initialize();
          }
          return scope.usedSetting;
        };
        scope.updateSettings = function() {
          if (scope.usedSetting === 'time-slider') {
            scope.resetPreset.notify('choose-period');
          } else if (scope.usedSetting === 'dates-picker') {
            scope.resetPreset.notify('choose-dates');
          }
          updateTimeRangePeriod();
          return updateFromDate();
        };
        updateTimeRangePeriod = function() {
          var periodLetter, set, tr;
          if (scope.isTimeSliderUsed()) {
            set = getSetting('time-slider');
            tr = set.toMetadata().hist_parameters.time_range;
            periodLetter = getPeriod().slice(0, 1).toLowerCase();
            scope.timePeriodSetting.timeRange = tr.replace(/[a-z]/, periodLetter);
            set.initialize();
          }
          return scope.timePeriodSetting.timeRange;
        };
        updateFromDate = function() {
          var fromDate, minDate, set, toDate;
          if (scope.isDatesPickerUsed()) {
            set = getSetting('dates-picker');
            fromDate = set.toMetadata().hist_parameters.from;
            toDate = set.toMetadata().hist_parameters.to;
            minDate = scope.getMinDate();
            if (moment(fromDate, "YYYY-MM-DD").isBefore(minDate)) {
              scope.toDate = toDate;
              scope.fromDate = minDate;
              set.initialize();
            }
          }
          return scope.fromDate;
        };
        scope.useTimeSlider = function() {
          scope.usedSetting = 'time-slider';
          return scope.updateSettings();
        };
        scope.useDatesPicker = function() {
          scope.usedSetting = 'dates-picker';
          return scope.updateSettings();
        };
        scope.getMinDate = function(toDate) {
          var currentPeriod, periodWord, sourceSetting, to;
          if (toDate == null) {
            toDate = void 0;
          }
          to = moment();
          if (toDate != null) {
            to = moment(toDate, "YYYY-MM-DD");
          } else if ((scope.usedSetting != null) && scope.isDatesPickerUsed()) {
            sourceSetting = getSetting('dates-picker');
            to = moment(sourceSetting.toMetadata().hist_parameters.to, "YYYY-MM-DD");
          }
          currentPeriod = getPeriod();
          periodWord = _.find(scope.periods, function(period) {
            return currentPeriod === period.value;
          }).plural;
          return to.subtract(scope.maxNumberOfPeriods, periodWord).format('YYYY-MM-DD');
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

  module.directive('settingTimePresets', ["$templateCache", "ImpacMainSvc", "$timeout", "ImpacUtilities", "ImpacTheming", "$translate", function($templateCache, ImpacMainSvc, $timeout, ImpacUtilities, ImpacTheming, $translate) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        deferred: '=',
        presets: '=?',
        onSelect: '&?',
        onChooseDates: '&?',
        onChoosePeriod: '&?',
        histParams: '=?',
        resetPromise: '=?'
      },
      template: $templateCache.get('widgets-settings/time-presets.tmpl.html'),
      link: function(scope) {
        var fyEndMonth, initPreset, showSlider, w;
        w = scope.parentWidget;
        scope.setting = {};
        scope.setting.key = "time-presets";
        scope.financialYearEndMonth = 6;
        fyEndMonth = scope.financialYearEndMonth;
        ImpacMainSvc.load().then(function() {
          return fyEndMonth = ImpacMainSvc.getFinancialYearEndMonth();
        })["finally"](function() {
          var fyStartDate, prevFyEndDate, prevFyStartDate, toDate;
          fyStartDate = ImpacUtilities.financialYearDates(fyEndMonth).start;
          prevFyStartDate = moment(ImpacUtilities.financialYearDates(fyEndMonth).start, 'YYYY-MM-DD').subtract(1, 'year').format('YYYY-MM-DD');
          prevFyEndDate = moment(ImpacUtilities.financialYearDates(fyEndMonth).end, 'YYYY-MM-DD').subtract(1, 'year').format('YYYY-MM-DD');
          toDate = moment().format('YYYY-MM-DD');
          return $translate(['impac.common.period.preset_in_words.calendar_year_to_date', 'impac.common.period.preset_in_words.financial_year_to_date', 'impac.common.period.preset_in_words.previous_financial_year', 'impac.common.period.preset_in_words.last_6_months', 'impac.common.period.preset_in_words.last_4_quarters', 'impac.common.period.preset_in_words.last_4_weeks', 'impac.common.period.preset_in_words.choose_period', 'impac.common.period.preset_in_words.choose_dates']).then(function(translations) {
            scope.presets || (scope.presets = [
              {
                label: translations['impac.common.period.preset_in_words.calendar_year_to_date'],
                value: {
                  from: moment().startOf('year').format('YYYY-MM-DD'),
                  to: toDate,
                  period: 'MONTHLY'
                }
              }, {
                label: translations['impac.common.period.preset_in_words.financial_year_to_date'],
                value: {
                  from: fyStartDate,
                  to: toDate,
                  period: 'MONTHLY'
                }
              }, {
                label: translations['impac.common.period.preset_in_words.previous_financial_year'],
                value: {
                  from: prevFyStartDate,
                  to: prevFyEndDate,
                  period: 'MONTHLY'
                }
              }, {
                label: translations['impac.common.period.preset_in_words.last_6_months'],
                value: {
                  time_range: '-6m',
                  to: toDate
                }
              }, {
                label: translations['impac.common.period.preset_in_words.last_4_quarters'],
                value: {
                  time_range: '-4q',
                  to: toDate
                }
              }, {
                label: translations['impac.common.period.preset_in_words.last_4_weeks'],
                value: {
                  time_range: '-4w',
                  to: toDate
                }
              }
            ]);
            if (angular.isDefined(scope.onChooseDates) && showSlider()) {
              scope.presets.unshift({
                label: translations['impac.common.period.preset_in_words.choose_period'],
                value: 'choose-period'
              });
            }
            if (angular.isDefined(scope.onChooseDates)) {
              return scope.presets.unshift({
                label: translations['impac.common.period.preset_in_words.choose_dates'],
                value: 'choose-dates'
              });
            }
          });
        });
        if (scope.resetPromise != null) {
          scope.resetPromise.then(null, null, function(key) {
            return scope.selectedPreset = _.find(scope.presets, function(p) {
              return p.value === key;
            });
          });
        }
        showSlider = function() {
          return (ImpacTheming.get().widgetSettings != null) && (ImpacTheming.get().widgetSettings.timePeriod != null) && ImpacTheming.get().widgetSettings.timePeriod.showSlider;
        };
        initPreset = function() {
          if (scope.histParams != null) {
            scope.selectedPreset = _.find(scope.presets, function(p) {
              return _.every(p.value, function(v, k) {
                return scope.histParams[k] === (angular.isFunction(v) ? v(fyEndMonth) : v);
              });
            });
            if ((scope.selectedPreset == null) && (scope.histParams.time_range != null) && showSlider()) {
              scope.selectedPreset = scope.presets[1];
            }
          }
          if (scope.selectedPreset == null) {
            return scope.selectedPreset = scope.presets[0];
          }
        };
        scope.presetSelected = function() {
          if ((scope.selectedPreset != null) && (scope.selectedPreset.value === "choose-dates")) {
            return scope.onChooseDates();
          } else if ((scope.selectedPreset != null) && (scope.selectedPreset.value === "choose-period")) {
            return scope.onChoosePeriod();
          } else {
            return scope.onSelect({
              histParams: scope.setting.toMetadata().hist_parameters
            });
          }
        };
        scope.setting.initialize = function() {
          initPreset();
          scope.presetSelected();
          return true;
        };
        scope.setting.toMetadata = function() {
          var result;
          result = {};
          if (!_.isEmpty(scope.selectedPreset.value)) {
            _.forEach(scope.selectedPreset.value, function(value, key) {
              if (angular.isFunction(value)) {
                return result[key] = value(fyEndMonth);
              } else {
                return result[key] = value;
              }
            });
          }
          return {
            hist_parameters: result
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

  module = angular.module('impac.components.widgets-settings.time-slider', []);

  module.directive('settingTimeSlider', ["$templateCache", "$timeout", "ImpacMainSvc", "ImpacUtilities", "$translate", function($templateCache, $timeout, ImpacMainSvc, ImpacUtilities, $translate) {
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
          return ImpacUtilities.getPeriodWord(getPeriod());
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
          return ImpacUtilities.formatPeriod(getNumberOfPeriods(), getPeriod());
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

  module.controller('SettingWidthCtrl', ["$scope", "$element", "$timeout", "$log", "ImpacWidgetsSvc", "ImpacDashboardsSvc", function($scope, $element, $timeout, $log, ImpacWidgetsSvc, ImpacDashboardsSvc) {
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
    w.toggleExpanded = function(save) {
      if (save == null) {
        save = true;
      }
      $scope.expanded = !$scope.expanded;
      if (save) {
        ImpacWidgetsSvc.updateWidgetSettings(w, false, true);
      }
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
    ImpacDashboardsSvc.pdfModeEnabled().then(null, null, function() {
      $scope.pdfMode = true;
      $scope.initiallyExpanded = !!$scope.expanded;
      if (!$scope.initiallyExpanded) {
        return w.toggleExpanded(false);
      }
    });
    ImpacDashboardsSvc.pdfModeCanceled().then(null, null, function() {
      $scope.pdfMode = false;
      if (!$scope.initiallyExpanded) {
        return w.toggleExpanded(false);
      }
    });
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

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-accounting-values', []);

  module.controller('WidgetAccountsAccountingValuesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = (w.content != null) && (w.content.accounting != null);
      $scope.getLegend();
      return $scope.getCurrency();
    };
    $scope.getCurrentPrice = function() {
      if ($scope.isDataFound) {
        return w.content.accounting.total_period;
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        if (w.content.accounting.currency_key != null) {
          return $translate(w.content.accounting.currency_key).then(function(translation) {
            $scope.currency = translation;
            return $scope.currency_unit = w.content.accounting.currency;
          });
        } else {
          $scope.currency = w.content.accounting.currency;
          return $scope.currency_unit = w.content.accounting.currency;
        }
      }
    };
    $scope.getLegend = function() {
      if ($scope.isDataFound) {
        if (w.content.accounting.legend_key != null) {
          return $translate(w.content.accounting.legend_key).then(function(translation) {
            return $scope.legend = translation;
          });
        } else {
          return $scope.legend = w.content.accounting.legend;
        }
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
          labels: dates,
          datasets: [
            {
              title: data.type,
              values: data.values
            }
          ]
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
        chartData = ChartFormatterSvc.combinedBarChart(inputData, options, false);
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

  module.controller('WidgetAccountsAssetsLiabilitySummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$translate", function($scope, $q, ChartFormatterSvc, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary);
      if (!w.metadata.classification) {
        w.metadata.classification = "ASSET";
      }
      $translate('impac.widget.acc_ass_liab_smry.' + w.metadata.classification.toLowerCase() + '.many').then(function(result) {
        return $scope.classification = result;
      });
      $translate(['impac.widget.acc_ass_liab_smry.accounts.asset', 'impac.widget.acc_ass_liab_smry.accounts.liability']).then(function(translation) {
        $scope.accountsOptions = [
          {
            label: translation['impac.widget.acc_ass_liab_smry.accounts.asset'],
            value: 'ASSET'
          }, {
            label: translation['impac.widget.acc_ass_liab_smry.accounts.liability'],
            value: 'LIABILITY'
          }
        ];
        if (!$scope.selectedAccountsOption) {
          return $scope.selectedAccountsOption = angular.copy(_.find($scope.accountsOptions, {
            value: w.metadata.classification
          }));
        }
      });
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

  module.controller('WidgetAccountsAssetsSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$translate", function($scope, $q, ChartFormatterSvc, $translate) {
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
      if (!w.metadata.classification) {
        w.metadata.classification = "ASSET";
      }
      return $translate('impac.widget.acc_ass_smry.' + w.metadata.classification.toLowerCase() + ".many").then(function(result) {
        return $scope.classification = result;
      });
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

  module.controller('WidgetAccountsAssetsVsLiabilitiesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise];
    $translate(['impac.widget.acc_ass_vs_liab.asset.one', 'impac.widget.acc_ass_vs_liab.liability.one']).then(function(translation) {
      return $scope.classificationTranslation = {
        "ASSET": translation['impac.widget.acc_ass_vs_liab.asset.one'].toUpperCase(),
        "LIABILITY": translation['impac.widget.acc_ass_vs_liab.liability.one'].toUpperCase()
      };
    });
    w.initContext = function() {
      var index;
      $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.companies);
      if ($scope.isDataFound) {
        index = 0;
        $scope.companiesList = _.map(w.content.companies, function(company) {
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
        return $scope.titleTranslation;
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
              title: $scope.classificationTranslation[sum.classification],
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
    $scope.kpiExtraParams = {};
    $scope.isDataFound = true;
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.account_list);
    };
    $scope.getName = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.name;
      }
    };
    $scope.getBehaviour = function() {
      return (w.selectedAccount != null) && w.selectedAccount.accounting_behaviour;
    };
    $scope.getCurrentBalance = function() {
      if (w.selectedAccount != null) {
        if ($scope.getBehaviour() === 'pnl') {
          return _.sum(w.selectedAccount.balances);
        } else {
          return _.last(w.selectedAccount.balances);
        }
      } else {
        return 0.0;
      }
    };
    $scope.getCurrency = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.currency;
      }
    };
    $scope.displayAccount = function() {
      return $scope.updateSettings(false).then(function() {
        return w.format();
      });
    };
    $scope.updateKpiExtraParams = function(key, value) {
      return $scope.kpiExtraParams[key] = angular.copy(value);
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, barData, chartData, data, dates, datesSource, lineData, options, period;
      if ($scope.isDataFound && (w.selectedAccount != null)) {
        data = angular.copy(w.selectedAccount);
        datesSource = data.dates || w.content.dates;
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(datesSource, function(date) {
          return $filter('mnoDate')(date, period);
        });
        lineData = {
          title: data.name,
          labels: dates,
          values: data.balances
        };
        barData = {
          labels: dates,
          datasets: [
            {
              title: data.name,
              values: data.balances
            }
          ]
        };
        all_values_are_positive = true;
        angular.forEach(data.balances, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        chartData = ChartFormatterSvc.lineChart([lineData], options);
        if ($scope.getBehaviour() === 'pnl') {
          chartData = ChartFormatterSvc.combinedBarChart(barData, options, false);
        }
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

  module.controller('WidgetAccountsBalanceSheetCtrl', ["$scope", "$q", "ImpacWidgetsSvc", "ImpacMainSvc", "ImpacUtilities", "$translate", "ImpacTheming", function($scope, $q, ImpacWidgetsSvc, ImpacMainSvc, ImpacUtilities, $translate, ImpacTheming) {
    var initDates, settingsPromises, sortAccountsBy, sortData, translateCategories, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    $scope.tagFilterDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.datesPickerDeferred.promise, $scope.tagFilterDeferred.promise];
    $scope.datesPickerTemplate = "<div class=\"row text-right\">\n  <div class=\"col-xs-6\">\n    <to-date>\n  </div>\n  <div class=\"col-xs-6\">\n    <from-date>\n  </div>\n</div>";
    $scope.ascending = true;
    $scope.sortedColumn = 'account';
    $scope.filterTagsEnabled = ImpacTheming.get().widgetSettings.tagging.enabled;
    $scope.isReportFiltered = function() {
      return (w.metadata != null) && (w.metadata.filter_query != null) && Object.keys(w.metadata.filter_query).length > 0;
    };
    initDates = function() {
      $scope.fromDate = w.metadata.hist_parameters.from;
      $scope.toDate = w.metadata.hist_parameters.to;
      return $scope.keepToday = w.metadata.hist_parameters.keep_today;
    };
    if (!((w.metadata != null) && (w.metadata.hist_parameters != null))) {
      w.metadata || (w.metadata = {});
      w.metadata.hist_parameters = {
        to: moment().format('YYYY-MM-DD'),
        keep_today: true,
        period: 'RANGE'
      };
      ImpacMainSvc.load().then(function(config) {
        var fyEndMonth;
        fyEndMonth = parseInt(config.currentOrganization.financial_year_end_month) || 6;
        w.metadata.hist_parameters.from = moment(ImpacUtilities.financialYearDates(fyEndMonth).end, 'YYYY-MM-DD').subtract(1, 'year').format('YYYY-MM-DD');
        return initDates();
      });
    } else {
      initDates();
    }
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.dates = w.content.dates;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        $scope.categories = [];
        translateCategories(Object.keys(w.content.summary));
      }
      initDates();
      return sortData();
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
    translateCategories = function(categories) {
      return _.each(categories, function(category) {
        $translate('impac.widget.account_balance_sheets.' + category.toLowerCase()).then(function(translation) {
          return $scope.categories.push({
            label: translation,
            key: category
          });
        }, function(translationId) {
          return $scope.categories.push({
            label: category.toLowerCase(),
            key: category
          });
        });
      });
    };
    sortAccountsBy = function(getElem) {
      return angular.forEach($scope.categories, function(cat) {
        var sElem;
        sElem = w.content.summary[cat];
        if (sElem.accounts) {
          return sElem.accounts.sort(function(a, b) {
            var res;
            res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
            if (!$scope.ascending) {
              res *= -1;
            }
            return res;
          });
        }
      });
    };
    sortData = function() {
      if ($scope.sortedColumn === 'account') {
        return sortAccountsBy(function(el) {
          return el.name;
        });
      } else if ($scope.sortedColumn === 'total1') {
        return sortAccountsBy(function(el) {
          return el.totals[1];
        });
      } else if ($scope.sortedColumn === 'total2') {
        return sortAccountsBy(function(el) {
          return el.totals[0];
        });
      }
    };
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
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

  module = angular.module('impac.components.widgets.accounts-cash-balance', []);

  module.controller('WidgetAccountsCashBalanceCtrl', ["$scope", "$q", "$timeout", "$filter", "ImpacTheming", "HighchartsFactory", function($scope, $q, $timeout, $filter, ImpacTheming, HighchartsFactory) {
    var getPeriod, getSerieByAccount, setSeriesColors, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = w.content.chart != null;
      $scope.groupedTable = w.content.grouped_table;
      return setSeriesColors(w.content.chart.series, {
        positive: '#3FC4FF',
        negative: '#e50228'
      });
    };
    $scope.legendItemOnClick = function(account) {
      var serie, visibility;
      serie = ($scope.chart != null) && ($scope.chart.hc != null) && getSerieByAccount($scope.chart.hc.series, account);
      if (!serie) {
        return;
      }
      visibility = serie.visible ? false : true;
      return serie.setVisible(visibility);
    };
    $scope.getLegendItemIcon = function(account) {
      var serie;
      serie = ($scope.chart != null) && ($scope.chart.hc != null) && getSerieByAccount($scope.chart.hc.series, account);
      if (!serie) {
        return 'fa-check-square-o';
      }
      if (serie.visible) {
        return 'fa-check-square-o';
      } else {
        return 'fa-square-o';
      }
    };
    $scope.getLegendItemColor = function(account) {
      var serie;
      serie = ($scope.chart != null) && ($scope.chart.hc != null) && getSerieByAccount($scope.chart.hc.series, account);
      if (!serie) {
        return '#000';
      }
      return serie.color;
    };
    getPeriod = function() {
      return (w.metadata != null) && (w.metadata.hist_parameters != null) && w.metadata.hist_parameters.period || 'MONTHLY';
    };
    getSerieByAccount = function(series, account) {
      return _.find(series, function(serie) {
        return (serie.id || serie.options && serie.options.id) === account.id;
      });
    };
    setSeriesColors = function(series, chartColors) {
      var bias, groupedSeries, i, palette, results, serie;
      groupedSeries = _.groupBy(series, function(serie) {
        return serie.bias;
      });
      results = [];
      for (bias in groupedSeries) {
        series = groupedSeries[bias];
        if (!chartColors[bias]) {
          continue;
        }
        palette = ImpacTheming.color.generateShadesPalette(chartColors[bias], series.length);
        results.push((function() {
          var j, len, results1;
          results1 = [];
          for (i = j = 0, len = series.length; j < len; i = ++j) {
            serie = series[i];
            results1.push(serie.color = palette[i]);
          }
          return results1;
        })());
      }
      return results;
    };
    $scope.chartId = function() {
      return "cashBalanceChart-" + w.id;
    };
    w.format = function() {
      var options;
      options = {
        chartType: 'line',
        currency: w.metadata.currency,
        period: getPeriod(),
        showToday: true,
        showLegend: false
      };
      return $timeout(function() {
        $scope.chart || ($scope.chart = new HighchartsFactory($scope.chartId(), w.content.chart, options));
        return $scope.chart.render(w.content.chart, options);
      });
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsCashBalance', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsCashBalanceCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-cash-projection', []);

  module.controller('WidgetAccountsCashProjectionCtrl', ["$scope", "$q", "$filter", "ImpacKpisSvc", "HighchartsFactory", function($scope, $q, $filter, ImpacKpisSvc, HighchartsFactory) {
    var getPeriod, getThresholds, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.intervalsOffsetsDeferred = $q.defer();
    $scope.currentOffsetsDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.intervalsOffsetsDeferred.promise, $scope.currentOffsetsDeferred.promise];
    $scope.simulationMode = false;
    $scope.intervalsCount = 0;
    $scope.chartDeferred = $q.defer();
    $scope.chartPromise = $scope.chartDeferred.promise;
    $scope.chartThresholdOptions = {
      label: 'Get alerted when the cash projection goes below'
    };
    w.initContext = function() {
      var projectedSerie, todayInterval, totalOffset;
      $scope.isDataFound = w.content != null;
      todayInterval = w.content.chart.series[0].zones[0].value;
      $scope.intervalsCount = w.content.chart.labels.length - todayInterval;
      projectedSerie = _.find(w.content.chart.series, function(serie) {
        return serie.name === "Projected cash";
      });
      totalOffset = 0.0;
      if (w.metadata.offset && w.metadata.offset.current && w.metadata.offset.current.length > 0) {
        totalOffset += _.sum(w.metadata.offset.current);
      }
      if (w.metadata.offset && w.metadata.offset.per_interval && w.metadata.offset.per_interval.length > 0) {
        totalOffset += _.sum(w.metadata.offset.per_interval);
      }
      if (projectedSerie != null) {
        $scope.currentProjectedCash = projectedSerie.data[todayInterval] - totalOffset;
      }
      return $scope.isTimePeriodInThePast = w.metadata.hist_parameters && moment(w.metadata.hist_parameters.to) < moment().startOf('day');
    };
    w.format = function() {
      var options;
      options = {
        chartType: 'line',
        currency: w.metadata.currency,
        period: getPeriod(),
        showToday: true,
        showLegend: true,
        thresholds: getThresholds()
      };
      $scope.chart || ($scope.chart = new HighchartsFactory($scope.chartId(), w.content.chart, options));
      $scope.chart.render(w.content.chart, options);
      return $scope.chartDeferred.notify($scope.chart.hc);
    };
    $scope.chartId = function() {
      return "cashProjectionChart-" + w.id;
    };
    $scope.toggleSimulationMode = function(init) {
      if (init == null) {
        init = false;
      }
      if (init) {
        $scope.initSettings();
      }
      return $scope.simulationMode = !$scope.simulationMode;
    };
    $scope.saveSimulation = function() {
      $scope.updateSettings();
      return $scope.toggleSimulationMode();
    };
    getPeriod = function() {
      return (w.metadata != null) && (w.metadata.hist_parameters != null) && w.metadata.hist_parameters.period || 'MONTHLY';
    };
    getThresholds = function() {
      var targets;
      targets = (w.kpis != null) && w.kpis[0] && w.kpis[0].targets;
      if (!ImpacKpisSvc.validateKpiTargets(targets)) {
        return [];
      }
      return [
        {
          kpiId: w.kpis[0].id,
          value: targets.threshold[0].min
        }
      ];
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsCashProjection', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsCashProjectionCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.accounts-cash-summary', []);

  module.controller('WidgetAccountsCashSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", "$translate", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, $translate) {
    var fetchElement, getIdentifier, matchElementToSelectedElement, selectedElementSetting, settingsPromises, sortAccountsBy, sortData, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
    $scope.ascending = true;
    $scope.sortedColumn = 'account';
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.dates = w.content.dates;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        _.map(w.content.summary, function(statement) {
          if (statement.name != null) {
            return $translate('impac.widget.account_cash_smry.summary.' + statement.name.toLowerCase()).then(function(translation) {
              return statement.label = translation;
            });
          }
        });
        $translate('impac.widget.account_cash_smry.cash_flow.' + $scope.widget.metadata.hist_parameters.period.toLowerCase()).then(function(translation) {
          return $scope.widget.metadata.hist_parameters.period_translation = translation;
        });
        if (w.metadata.selectedElement) {
          $scope.selectedElement = _.find(w.content.summary, function(statement) {
            return statement.name === w.metadata.selectedElement;
          });
          $scope.selectedElement || ($scope.selectedElement = fetchElement(w.content.summary));
        }
        return sortData();
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
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
    };
    $scope.toggleSelectedElement = function(element, statementName) {
      if (statementName == null) {
        statementName = null;
      }
      if ($scope.isSelected(element, statementName)) {
        $scope.selectedElement = null;
        if (w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        $scope.selectedElement = angular.copy(element);
        $scope.selectedElement.category = statementName;
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element, statementName) {
      if (statementName == null) {
        statementName = null;
      }
      return (element != null) && ($scope.selectedElement != null) && (matchElementToSelectedElement(element, statementName, $scope.selectedElement));
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
    $scope.getSelectLineColor = function(elem) {
      return ChartFormatterSvc.getColor(0);
    };
    fetchElement = function(statements) {
      var element, i, len, statement;
      for (i = 0, len = statements.length; i < len; i++) {
        statement = statements[i];
        if (statement.accounts == null) {
          continue;
        }
        element = _.find(statement.accounts, function(acc) {
          return getIdentifier(acc, statement.name) === w.metadata.selectedElement;
        });
        if (element != null) {
          element = angular.merge(angular.copy(element), {
            category: statement.name
          });
          return element;
        }
      }
    };
    matchElementToSelectedElement = function(element, elementCategory, sElem) {
      if (elementCategory == null) {
        elementCategory = null;
      }
      return getIdentifier(element, elementCategory) === getIdentifier(sElem);
    };
    getIdentifier = function(element, category) {
      var id;
      if (category == null) {
        category = null;
      }
      id = element.id || element.name;
      category || (category = element.category);
      if (!category) {
        return id;
      }
      return category + "-" + id;
    };
    sortAccountsBy = function(getElem) {
      return angular.forEach(w.content.summary, function(sElem) {
        if (sElem.accounts) {
          return sElem.accounts.sort(function(a, b) {
            var res;
            res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
            if (!$scope.ascending) {
              res *= -1;
            }
            return res;
          });
        }
      });
    };
    sortData = function() {
      if ($scope.sortedColumn === 'account') {
        return sortAccountsBy(function(el) {
          return el.name;
        });
      } else if ($scope.sortedColumn === 'total') {
        return sortAccountsBy(function(el) {
          return $scope.getLastValue(el);
        });
      } else if ($scope.sortedColumn === 'variance') {
        return sortAccountsBy(function(el) {
          return $scope.getLastVariance(el);
        });
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
              title: data.label,
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
      if ($scope.selectedElement == null) {
        return {
          selectedElement: null
        };
      }
      return {
        selectedElement: getIdentifier($scope.selectedElement)
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

  module.controller('WidgetAccountsClassComparisonCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", "$translate", function($scope, $q, $filter, ChartFormatterSvc, $translate) {
    var settingsPromises, translate, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.timePeriodDeferred.promise];
    $scope.timePeriodInfoParams = {
      accountingBehaviour: 'pnl',
      histParams: {}
    };
    translate = function(word) {
      var translation;
      word = word.toLowerCase();
      translation = $translate.instant('impac.widget.account_class_comp.klass.' + word);
      if (_.includes(translation, 'impac.widget.account_class_comp.klass')) {
        return _.capitalize(word);
      } else {
        return translation;
      }
    };
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.companies);
      if ($scope.isDataFound) {
        $scope.classifications = _.map(w.content.summary, function(summary) {
          var klass;
          klass = summary.classification;
          return {
            label: translate(klass),
            labelTranslate: summary.classification_key != null ? summary.classification_key : void 0,
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
      if (!$scope.selectedClassification) {
        return [];
      }
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

  module.controller('WidgetAccountsComparisonCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$timeout", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $timeout, $translate) {
    var gatherSavedAccounts, scanAccountsForMultiOrgData, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.accountsListDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramsCheckboxesDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.accountsListDeferred.promise, $scope.chartDeferred.promise, $scope.paramsCheckboxesDeferred.promise, $scope.timePeriodDeferred.promise];
    w.initContext = function() {
      $scope.movedAccount = {};
      return $translate('impac.widget.account_comp.compare_mode_opt').then(function(label) {
        $scope.comparisonModeOptions = [
          {
            id: 'compare_accounts',
            label: label,
            value: false,
            onChangeCallback: $scope.updateSettings
          }
        ];
        if (angular.isDefined(w.metadata.comparison_mode) && (w.metadata.organization_ids != null) && w.metadata.organization_ids.length > 1) {
          angular.merge($scope.comparisonModeOptions, w.metadata.comparison_mode);
        }
        $scope.savedAccountsList = gatherSavedAccounts();
        $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.complete_list) || $scope.isComparisonMode();
        $scope.noComparableAccounts = $scope.isComparisonMode() && (w.content != null) && _.isEmpty(w.content.complete_list);
        return $scope.canSelectComparisonMode = scanAccountsForMultiOrgData();
      });
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
      if (!anAccount) {
        return;
      }
      w.moveAccountToAnotherList(anAccount, w.remainingAccounts, w.selectedAccounts);
      $scope.savedAccountsList.push(anAccount.uid);
      return w.format();
    };
    $scope.removeAccount = function(anAccount) {
      if (!anAccount) {
        return;
      }
      w.moveAccountToAnotherList(anAccount, w.selectedAccounts, w.remainingAccounts);
      $scope.savedAccountsList.splice($scope.savedAccountsList.indexOf(anAccount.uid), 1);
      return w.format();
    };
    $scope.formatAmount = function(anAccount) {
      return $filter('mnoCurrency')(anAccount.current_balance, anAccount.currency);
    };
    gatherSavedAccounts = function() {
      var areGrouped, group, i, len, savedUids, uid;
      savedUids = w.metadata.accounts_list;
      if (_.isEmpty(savedUids)) {
        return [];
      }
      areGrouped = savedUids[0].indexOf(':') >= 0;
      if (!$scope.isComparisonMode() && areGrouped) {
        return _.flatten(_.map(savedUids, function(a) {
          return a.split(':');
        }));
      } else if ($scope.isComparisonMode() && !areGrouped) {
        for (i = 0, len = savedUids.length; i < len; i++) {
          uid = savedUids[i];
          group = _.find(w.content.complete_list, function(group) {
            return group.uid.indexOf(uid) >= 0;
          });
          if (group) {
            return [group.uid];
          }
        }
        return [];
      } else {
        return savedUids;
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var inputData;
      inputData = {
        labels: [],
        values: []
      };
      return $timeout(function() {
        var account, chartData, groupedAccount, i, j, len, len1, options, ref, ref1;
        ref = w.selectedAccounts;
        for (i = 0, len = ref.length; i < len; i++) {
          account = ref[i];
          if ($scope.isComparisonMode()) {
            ref1 = account.accounts;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              groupedAccount = ref1[j];
              inputData.labels.push(groupedAccount.name);
              inputData.values.push(groupedAccount.current_balance);
            }
          } else {
            inputData.labels.push(account.name);
            inputData.values.push(account.current_balance);
          }
        }
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
      });
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

  module.controller('WidgetAccountsCustomCalculationCtrl', ["$scope", "$timeout", "$uibModal", "$q", "$templateCache", "ImpacWidgetsSvc", function($scope, $timeout, $uibModal, $q, $templateCache, ImpacWidgetsSvc) {
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
      self.timePeriodDeferred = $q.defer();
      _.remove(w.settings, (function(set) {
        return set.key === "organizations";
      }));
      self.instance = $uibModal.open(self.config);
      return $q.all([self.modalOrgDeferred.promise, self.timePeriodDeferred.promise]).then(function(success) {
        return $scope.initSettings();
      });
    };
    $scope.reloadAccountsLists = function(orgs) {
      if ((orgs != null) && _.some(_.values(orgs))) {
        return $scope.updateWidgetSettings();
      }
    };
    $scope.updateWidgetSettings = function() {
      return ImpacWidgetsSvc.updateWidgetSettings(w);
    };
    $scope.formulaModal.cancel = function() {
      $scope.initSettings();
      return $scope.formulaModal.close();
    };
    $scope.formulaModal.proceed = function() {
      ImpacWidgetsSvc.updateWidgetSettings(w);
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
    var settingsPromises, sortAccountsBy, sortData, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise];
    $scope.timePeriodInfoParams = {
      accountingBehaviour: 'pnl',
      histParams: {}
    };
    $scope.ascending = true;
    $scope.sortedColumn = 'account';
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.companies);
      if ($scope.isDataFound) {
        $scope.timePeriodInfoParams.histParams = w.metadata && w.metadata.hist_parameters;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.content.companies.length === 1) {
          $scope.multiEntity = false;
          $scope.dataSource = _.map(w.content.companies[0].classifications, function(klass) {
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
          $scope.dataSource = _.map(w.content.companies, function(company) {
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
        return sortData();
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
    sortAccountsBy = function(getElem) {
      return angular.forEach($scope.dataSource, function(sElem) {
        if (sElem.entries) {
          return sElem.entries.sort(function(a, b) {
            var res;
            res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
            if (!$scope.ascending) {
              res *= -1;
            }
            return res;
          });
        }
      });
    };
    sortData = function() {
      if ($scope.sortedColumn === 'account') {
        return sortAccountsBy(function(el) {
          return el.label;
        });
      } else if ($scope.sortedColumn === 'total') {
        return sortAccountsBy(function(el) {
          return el.value;
        });
      }
    };
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
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

  module.controller('WidgetAccountsExpenseWeightCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.accountBackDeferred = $q.defer();
    $scope.accountFrontDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred, $scope.accountBackDeferred, $scope.accountFrontDeferred, $scope.chartDeferred.promise, $scope.histModeDeferred.promise];
    $scope.forwardParams = {
      accountingBehaviour: 'pnl'
    };
    w.initContext = function() {
      $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.account_list);
      return $scope.forwardParams.histParams = w.metadata && w.metadata.hist_parameters;
    };
    $scope.getName = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.name;
      }
    };
    $scope.getComparator = function() {
      switch (w.metadata.comparator) {
        case 'turnover':
          return $translate.instant("impac.widget.account_expense_weight.comparator.turnover");
        default:
          return $translate.instant("impac.widget.account_expense_weight.comparator.total_exp");
      }
    };
    $scope.displayAccount = function() {
      return $scope.updateSettings(false).then(function() {
        return w.format();
      });
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, companies, datasets, dates, inputData, lineData, lineOptions, options, period, ratios;
      if ($scope.isDataFound && (w.content.summary != null)) {
        if (w.isHistoryMode) {
          period = null;
          if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
            period = w.metadata.hist_parameters.period;
          }
          dates = _.map(w.content.dates, function(date) {
            return $filter('mnoDate')(date, period);
          });
          datasets = _.map(w.content.summary, function(s) {
            return {
              title: s.company,
              values: s.ratios
            };
          });
          all_values_are_positive = true;
          angular.forEach(w.content.summary, function(s) {
            return angular.forEach(s.ratios, function(ratio) {
              return all_values_are_positive && (all_values_are_positive = ratio >= 0);
            });
          });
          lineData = {
            labels: dates,
            datasets: datasets
          };
          lineOptions = {
            scaleBeginAtZero: all_values_are_positive,
            showXLabels: false,
            currency: "(ratio)"
          };
          chartData = ChartFormatterSvc.combinedBarChart(lineData, lineOptions, false, true);
        } else {
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
        }
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

  module = angular.module('impac.components.widgets.accounts-expense-weight', []);

  module.controller('WidgetAccountsExpenseWeightCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.accountBackDeferred = $q.defer();
    $scope.accountFrontDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred, $scope.accountBackDeferred, $scope.accountFrontDeferred, $scope.chartDeferred.promise, $scope.histModeDeferred.promise];
    $scope.forwardParams = {
      accountingBehaviour: 'pnl'
    };
    w.initContext = function() {
      $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.account_list);
      return $scope.forwardParams.histParams = w.metadata && w.metadata.hist_parameters;
    };
    $scope.getName = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.name;
      }
    };
    $scope.getComparator = function() {
      switch (w.metadata.comparator) {
        case 'turnover':
          return $translate.instant("impac.widget.account_expense_weight.comparator.turnover");
        default:
          return $translate.instant("impac.widget.account_expense_weight.comparator.total_exp");
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, companies, datasets, dates, inputData, lineData, lineOptions, options, period, ratios;
      if ($scope.isDataFound && (w.content.summary != null)) {
        if (w.isHistoryMode) {
          period = null;
          if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
            period = w.metadata.hist_parameters.period;
          }
          dates = _.map(w.content.dates, function(date) {
            return $filter('mnoDate')(date, period);
          });
          datasets = _.map(w.content.summary, function(s) {
            return {
              title: s.company,
              values: s.ratios
            };
          });
          all_values_are_positive = true;
          angular.forEach(w.content.summary, function(s) {
            return angular.forEach(s.ratios, function(ratio) {
              return all_values_are_positive && (all_values_are_positive = ratio >= 0);
            });
          });
          lineData = {
            labels: dates,
            datasets: datasets
          };
          lineOptions = {
            scaleBeginAtZero: all_values_are_positive,
            showXLabels: false,
            currency: "(ratio)"
          };
          chartData = ChartFormatterSvc.combinedBarChart(lineData, lineOptions, false, true);
        } else {
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
        }
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

  module.controller('WidgetAccountsExpensesRevenueCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
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
          label: $translate.instant('impac.widget.accounts_expenses_revenue.show_net_profit'),
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
        return _.sum(w.content.values.revenue);
      }
    };
    $scope.getCurrentExpenses = function() {
      if ($scope.isDataFound) {
        return _.sum(w.content.values.expenses);
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
      var all_values_are_positive, chartData, datasets, dates, lineData, lineOptions, period, pieData, pieOptions;
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
            datasets = [
              {
                title: $translate.instant('impac.widget.accounts_expenses_revenue.net_profit') + (" (" + ($scope.getCurrency()) + ")"),
                values: w.content.values.net_profit
              }
            ];
            all_values_are_positive = true;
            angular.forEach(w.content.values.net_profit, function(value) {
              return all_values_are_positive && (all_values_are_positive = value >= 0);
            });
          } else {
            datasets = [
              {
                title: $translate.instant('impac.widget.accounts_expenses_revenue.expenses') + (" (" + ($scope.getCurrency()) + ")"),
                values: w.content.values.expenses
              }, {
                title: $translate.instant('impac.widget.accounts_expenses_revenue.revenue') + (" (" + ($scope.getCurrency()) + ")"),
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
          lineData = {
            labels: dates,
            datasets: datasets
          };
          lineOptions = {
            scaleBeginAtZero: all_values_are_positive,
            showXLabels: false
          };
          chartData = ChartFormatterSvc.combinedBarChart(lineData, lineOptions, false, true);
        } else {
          pieData = [
            {
              label: $translate.instant('impac.widget.accounts_expenses_revenue.expenses') + (" (" + ($scope.getCurrency()) + ")"),
              value: $scope.getCurrentExpenses()
            }, {
              label: $translate.instant('impac.widget.accounts_expenses_revenue.revenue') + (" (" + ($scope.getCurrency()) + ")"),
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

  module.controller('WidgetAccountsPayableReceivableCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && (w.content.values != null) && (w.content.live_values != null);
    };
    $scope.getCurrentPayable = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.payables);
      } else {
        return 0.0;
      }
    };
    $scope.getCurrentReceivable = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.receivables);
      } else {
        return 0.0;
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency;
      }
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, dates, i, j, len, len1, lineOptions, period, ref, ref1, value;
      if ($scope.isDataFound) {
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(w.content.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
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
        return $translate(['impac.widget.accounts_payable_receivable.payable', 'impac.widget.accounts_payable_receivable.receivable']).then(function(translation) {
          var chartData, lineData;
          lineData = [
            {
              title: translation['impac.widget.accounts_payable_receivable.payable'],
              labels: dates,
              values: w.content.values.payables
            }, {
              title: translation['impac.widget.accounts_payable_receivable.receivable'],
              labels: dates,
              values: w.content.values.receivables
            }
          ];
          chartData = ChartFormatterSvc.lineChart(lineData, lineOptions, true);
          return $scope.drawTrigger.notify(chartData);
        });
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

  module.controller('WidgetAccountsProfitAndLossCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", "ImpacUtilities", "$translate", "ImpacTheming", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacUtilities, $translate, ImpacTheming) {
    var fetchElement, getIdentifier, getLastAmount, getPeriod, getTotalAmount, h, matchElementToSelectedElement, periodName, selectedElementsSetting, setAmountDisplayed, settingsPromises, sortAccountsBy, sortData, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.tagFilterDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.tagFilterDeferred.promise];
    $scope.ascending = true;
    $scope.sortedColumn = 'account';
    $scope.filterTagsEnabled = ImpacTheming.get().widgetSettings.tagging.enabled;
    setAmountDisplayed = function() {
      return $scope.amountDisplayed = angular.copy(_.find($scope.amountDisplayedOptions, function(o) {
        return w.metadata && o.value === w.metadata.amount_displayed;
      }) || $scope.amountDisplayedOptions[1]);
    };
    $translate(['impac.widget.accounts_profit_and_loss.last_period', 'impac.widget.accounts_profit_and_loss.total_for_period']).then(function(translation) {
      $scope.amountDisplayedOptions = [
        {
          label: translation['impac.widget.accounts_profit_and_loss.last_period'],
          value: 'last'
        }, {
          label: translation['impac.widget.accounts_profit_and_loss.total_for_period'],
          value: 'total'
        }
      ];
      return setAmountDisplayed();
    });
    periodName = (h = $scope.widget.metadata.hist_parameters) && h.period ? h.period.toLowerCase() : 'monthly';
    $translate('impac.widget.settings.time_period.period.' + periodName).then(function(translation) {
      return $scope.period_translation = _.capitalize(translation.toLowerCase());
    });
    $scope.isReportFiltered = function() {
      return (w.metadata != null) && (w.metadata.filter_query != null) && Object.keys(w.metadata.filter_query).length > 0;
    };
    w.initContext = function() {
      var dates, firstDate, foundElem, histParams, i, lastDate, len, ref, sElemId;
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.dates = w.content.dates;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.metadata && (histParams = w.metadata.hist_parameters)) {
          dates = ImpacUtilities.selectedTimeRange(histParams);
          firstDate = $filter('mnoDate')(dates.from, getPeriod());
          lastDate = $filter('mnoDate')(dates.to, getPeriod());
          $scope.amountDisplayedOptions[1].label = firstDate + " to " + lastDate;
          $scope.amountDisplayedOptions[0].label = lastDate;
        }
        setAmountDisplayed();
        if (!_.isEmpty(w.metadata.selectedElements)) {
          $scope.selectedElements = [];
          ref = w.metadata.selectedElements;
          for (i = 0, len = ref.length; i < len; i++) {
            sElemId = ref[i];
            foundElem = _.find(w.content.summary, function(statement) {
              return statement.name === sElemId;
            });
            foundElem || (foundElem = fetchElement(w.content.summary, sElemId));
            if (foundElem) {
              $scope.selectedElements.push(foundElem);
            }
          }
        }
        if (!_.any($scope.selectedElements)) {
          w.width = 6;
        }
        return sortData();
      }
    };
    $scope.getElementChartColor = function(index) {
      return ChartFormatterSvc.getColor(index);
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
      switch ($scope.amountDisplayed.value) {
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
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
    };
    $scope.toggleSelectedElement = function(element, statementName) {
      var selectedElement;
      if (statementName == null) {
        statementName = null;
      }
      if ($scope.isSelected(element, statementName)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          return matchElementToSelectedElement(element, statementName, sElem);
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        selectedElement = angular.copy(element);
        selectedElement.category = statementName;
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(selectedElement);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element, statementName) {
      if (statementName == null) {
        statementName = null;
      }
      return (element != null) && _.any($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, statementName, sElem);
      });
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
    $scope.getSelectLineColor = function(element, statementName) {
      var sElem;
      if (statementName == null) {
        statementName = null;
      }
      sElem = _.find($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, statementName, sElem);
      });
      if ($scope.hasElements()) {
        return ChartFormatterSvc.getColor(_.indexOf($scope.selectedElements, sElem));
      }
    };
    $scope.hasElements = function() {
      return ($scope.selectedElements != null) && $scope.selectedElements.length > 0;
    };
    matchElementToSelectedElement = function(element, elementCategory, sElem) {
      if (elementCategory == null) {
        elementCategory = null;
      }
      return getIdentifier(element, elementCategory) === getIdentifier(sElem);
    };
    fetchElement = function(statements, sElemId) {
      var element, i, len, statement;
      for (i = 0, len = statements.length; i < len; i++) {
        statement = statements[i];
        if (statement.accounts == null) {
          continue;
        }
        element = _.find(statement.accounts, function(acc) {
          return getIdentifier(acc, statement.name) === sElemId;
        });
        if (element != null) {
          element = angular.merge(angular.copy(element), {
            category: statement.name
          });
          return element;
        }
      }
    };
    getIdentifier = function(element, category) {
      var id;
      if (category == null) {
        category = null;
      }
      id = element.id || element.name;
      category || (category = element.category);
      if (!category) {
        return id;
      }
      return category + "-" + id;
    };
    sortAccountsBy = function(getElem) {
      return angular.forEach(w.content.summary, function(sElem) {
        if (sElem.accounts) {
          return sElem.accounts.sort(function(a, b) {
            var res;
            res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
            if (!$scope.ascending) {
              res *= -1;
            }
            return res;
          });
        }
      });
    };
    sortData = function() {
      if ($scope.sortedColumn === 'account') {
        return sortAccountsBy(function(el) {
          return el.name;
        });
      } else if ($scope.sortedColumn === 'total') {
        return sortAccountsBy(function(el) {
          return $scope.getAmount(el);
        });
      }
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
      var selectedElementsMetadata;
      selectedElementsMetadata = _.map($scope.selectedElements, function(element) {
        return getIdentifier(element);
      });
      return {
        selectedElements: selectedElementsMetadata
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

  module = angular.module('impac.components.widgets.accounts-ratios', []);

  module.controller('WidgetAccountsRatiosCtrl', ["$scope", "$q", "$filter", "$translate", "ChartFormatterSvc", "ImpacTheming", function($scope, $q, $filter, $translate, ChartFormatterSvc, ImpacTheming) {
    var getPrefix, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.numeratorOffsetsDeferred = $q.defer();
    $scope.denominatorOffsetsDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartDeferred.promise, $scope.timePeriodDeferred.promise, $scope.histModeDeferred.promise, $scope.numeratorOffsetsDeferred.promise, $scope.denominatorOffsetsDeferred.promise];
    $scope.totalRatio = 0;
    $scope.totalNumerator = 0;
    $scope.totalDenominator = 0;
    $scope.calculatedNumerator = 0;
    $scope.calculatedDenominator = 0;
    $scope.simulationMode = false;
    $scope.intervalsCount = 0;
    $scope.isPnl = false;
    $scope.periodInfoContext = {};
    getPrefix = function(behaviour) {
      var label, labels, needPrefix, prefix, todayPrefixes;
      labels = ImpacTheming.get().widgetSettings.histModeChoser.currentLabels;
      todayPrefixes = ImpacTheming.get().widgetSettings.histModeChoser.todayPrefixes;
      needPrefix = _.last(w.content.layout.dates) === moment().format('YYYY-MM-DD');
      label = labels[behaviour];
      prefix = todayPrefixes[behaviour];
      return $translate([label, prefix]).then(function(translations) {
        if (needPrefix) {
          return translations[prefix] + " " + translations[label];
        } else {
          return translations[label];
        }
      });
    };
    w.initContext = function() {
      var behaviour;
      $scope.isDataFound = !_.isEmpty(w.content);
      if ($scope.isDataFound) {
        $scope.intervalsCount = _.size(w.content.layout.dates);
        $scope.endDate = _.last(w.content.layout.dates);
        behaviour = w.content.layout.accounting_behaviour;
        $scope.periodInfoContext.histParams = w.metadata.hist_parameters;
        $scope.periodInfoContext.accountingBehaviour = behaviour;
        getPrefix(behaviour).then(function(label) {
          return $scope.periodInfoContext.injectBefore = label;
        });
        if (behaviour === 'pnl') {
          $scope.totalRatio = w.content.calculation.ratio.average;
          $scope.totalNumerator = _.sum(w.content.calculation.numerator.totals);
          $scope.totalDenominator = _.sum(w.content.calculation.denominator.totals);
          $scope.calculatedNumerator = _.sum(w.content.calculation.numerator.values);
          $scope.calculatedDenominator = _.sum(w.content.calculation.denominator.values);
          return $scope.isPnl = true;
        } else {
          $scope.totalRatio = _.last(w.content.calculation.ratio.totals);
          $scope.totalNumerator = _.last(w.content.calculation.numerator.totals);
          $scope.totalDenominator = _.last(w.content.calculation.denominator.totals);
          $scope.calculatedNumerator = _.last(w.content.calculation.numerator.values);
          return $scope.calculatedDenominator = _.last(w.content.calculation.denominator.values);
        }
      }
    };
    $scope.toggleSimulationMode = function(init) {
      if (init == null) {
        init = false;
      }
      if (init) {
        $scope.initSettings();
      }
      return $scope.simulationMode = !$scope.simulationMode;
    };
    $scope.saveSimulation = function() {
      $scope.updateSettings();
      return $scope.toggleSimulationMode();
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var chartData, data, dates, inputData, options, period;
      if ($scope.isDataFound) {
        data = angular.copy(w.content);
        period = null;
        if ((w.metadata != null) && (w.metadata.hist_parameters != null)) {
          period = w.metadata.hist_parameters.period;
        }
        dates = _.map(data.layout.dates, function(date) {
          return $filter('mnoDate')(date, period);
        });
        inputData = {
          labels: dates,
          datasets: [
            {
              title: data.layout.ratio,
              values: data.calculation.ratio.totals
            }
          ]
        };
        options = {
          currency: 'hide'
        };
        chartData = ChartFormatterSvc.combinedBarChart(inputData, options, false);
        return $scope.drawTrigger.notify(chartData);
      }
    };
    return $scope.widgetDeferred.resolve(settingsPromises);
  }]);

  module.directive('widgetAccountsRatios', function() {
    return {
      restrict: 'A',
      controller: 'WidgetAccountsRatiosCtrl'
    };
  });

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-employee-details', []);

  module.controller('WidgetHrEmployeeDetailsCtrl', ["$scope", "$q", "$filter", "$translate", function($scope, $q, $filter, $translate) {
    var mapSalaries, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise];
    $scope.salaries = [];
    w.initContext = function() {
      var employee;
      if ($scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.employees)) {
        $scope.periodOptions = [
          {
            label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.yearly')),
            value: 'yearly'
          }, {
            label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.monthly')),
            value: 'monthly'
          }, {
            label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.weekly')),
            value: 'weekly'
          }, {
            label: _.capitalize($translate.instant('impac.widget.settings.time_period.period.daily')),
            value: 'daily'
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
        employee = $scope.getEmployee();
        $scope.selectedEmployee = {
          value: employee.uid,
          label: employee.lastname + " " + employee.firstname
        };
        return mapSalaries(employee, $scope.salaries);
      }
    };
    mapSalaries = function(employee, salariesArray) {
      var amount, i, len, ref, results, salary, tooltip;
      _.remove(salariesArray, function() {
        return true;
      });
      ref = employee.employee_salaries;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        salary = ref[i];
        tooltip = salary.name;
        if (salary.hours_per_week) {
          tooltip = salary.name + " (" + salary.hours_per_week + "h per week)";
        }
        if ((amount = salary.annual_salary)) {
          results.push(salariesArray.push({
            amount: amount,
            currency: salary.currency,
            period: 'Annual',
            tooltip: tooltip
          }));
        } else if ((amount = salary.hourly_rate)) {
          results.push(salariesArray.push({
            amount: amount,
            currency: salary.currency,
            period: 'Hourly',
            tooltip: tooltip
          }));
        } else {
          results.push(void 0);
        }
      }
      return results;
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
      if (employee.salary != null) {
        employee.earnings = $filter('mnoCurrency')(employee.salary.amount, employee.salary.currency);
      }
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

  module.controller('WidgetHrEmployeesListCtrl', ["$scope", "$q", "$filter", "$translate", function($scope, $q, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.total) && !_.isEmpty(w.content.employees)) {
        $scope.periodOptions = [
          {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.yearly")),
            value: "yearly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.monthly")),
            value: "monthly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.weekly")),
            value: "weekly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.daily")),
            value: "daily"
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
    $scope.getEmployeeEarnings = function(anEmployee) {
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

  module.controller('WidgetHrLeavesBalanceCtrl', ["$scope", "$q", "$translate", function($scope, $q, $translate) {
    var employee, name, settingsPromises, w;
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
    employee = $scope.getEmployee();
    name = employee && employee.leaves[0].name;
    if (name) {
      $scope.vacationLeaves_translation = name;
    } else {
      $translate('impac.widget.hr_leaves_balance.vacation_leaves').then(function(translation) {
        return $scope.vacationLeaves_translation = translation;
      });
    }
    name = employee && employee.leaves[1].name;
    if (name) {
      $scope.sickLeaves_translation = name;
    } else {
      $translate('impac.widget.hr_leaves_balance.sick_leaves').then(function(translation) {
        return $scope.sickLeaves_translation = translation;
      });
    }
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

  module.directive('widgetComponentCalendar', ["$tranlate", function($tranlate) {
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
            left: $tranlate.instant('impac.common.action.calendar.left'),
            center: $tranlate.instant('impac.common.action.calendar.center'),
            right: $tranlate.instant('impac.common.action.calendar.right')
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
  }]);

}).call(this);

(function() {
  var module;

  module = angular.module('impac.components.widgets.hr-payroll-summary', []);

  module.controller('WidgetHrPayrollSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", "$translate", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, $translate) {
    var fetchElement, getIdentifier, h, matchElementToSelectedElement, periodName, selectedElementsSetting, settingsPromises, sortData, sortEmployeesBy, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.histModeDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.histModeDeferred.promise, $scope.chartDeferred.promise];
    $scope.ascending = true;
    $scope.sortedColumn = 'employee';
    periodName = (h = $scope.widget.metadata.hist_parameters) && h.period ? h.period.toLowerCase() : 'monthly';
    $scope.periodTranslation = $translate.instant("impac.widget.settings.time_period.period." + periodName);
    w.initContext = function() {
      var foundElem, i, len, ref, sElemId;
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (!_.isEmpty(w.metadata.selectedElements)) {
          $scope.selectedElements = [];
          ref = w.metadata.selectedElements;
          for (i = 0, len = ref.length; i < len; i++) {
            sElemId = ref[i];
            foundElem = _.find(w.content.summary, function(statement) {
              return statement.name === sElemId;
            });
            foundElem || (foundElem = fetchElement(w.content.summary, sElemId));
            if (foundElem) {
              $scope.selectedElements.push(foundElem);
            }
          }
        }
        if (!(($scope.selectedElements != null) && $scope.selectedElements.length > 0)) {
          w.width = 6;
        }
        return sortData();
      }
    };
    $scope.getElementChartColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.getLastValue = function(element) {
      return (element.totals && element.totals[element.totals.length - 1]) || 0;
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
          return $translate.instant('impac.widget.hr_payroll_summary.total_leaves');
        }
        if (element.name === "total_super") {
          return $translate.instant('impac.widget.hr_payroll_summary.total_superannuation');
        }
        if (element.name === "total_reimbursement") {
          return $translate.instant('impac.widget.hr_payroll_summary.total_reimbursements');
        }
        if (element.name === "total_tax") {
          return $translate.instant('impac.widget.hr_payroll_summary.total_taxes');
        }
        if (element.name === "total_timeoff") {
          return $translate.instant('impac.widget.hr_payroll_summary.total_time_off');
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
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
    };
    $scope.toggleSelectedElement = function(element, statementName) {
      var selectedElement;
      if (statementName == null) {
        statementName = null;
      }
      if ($scope.isSelected(element, statementName)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          return matchElementToSelectedElement(element, statementName, sElem);
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        selectedElement = angular.copy(element);
        selectedElement.category = statementName;
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(selectedElement);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element, statementName) {
      if (statementName == null) {
        statementName = null;
      }
      return (element != null) && _.any($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, statementName, sElem);
      });
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
    $scope.getSelectLineColor = function(element, statementName) {
      var sElem;
      if (statementName == null) {
        statementName = null;
      }
      sElem = _.find($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, statementName, sElem);
      });
      if ($scope.hasElements()) {
        return ChartFormatterSvc.getColor(_.indexOf($scope.selectedElements, sElem));
      }
    };
    matchElementToSelectedElement = function(element, elementCategory, sElem) {
      if (elementCategory == null) {
        elementCategory = null;
      }
      return getIdentifier(element, elementCategory) === getIdentifier(sElem);
    };
    fetchElement = function(statements, sElemId) {
      var element, i, len, statement;
      for (i = 0, len = statements.length; i < len; i++) {
        statement = statements[i];
        if (statement.employees == null) {
          continue;
        }
        element = _.find(statement.employees, function(e) {
          return getIdentifier(e, statement.name) === sElemId;
        });
        if (element != null) {
          element = angular.merge(angular.copy(element), {
            category: statement.name
          });
          return element;
        }
      }
    };
    getIdentifier = function(element, category) {
      var id;
      if (category == null) {
        category = null;
      }
      id = element.id || element.name;
      category || (category = element.category);
      if (!category) {
        return id;
      }
      return category + "-" + id;
    };
    sortEmployeesBy = function(getElem) {
      return angular.forEach(w.content.summary, function(sElem) {
        if (sElem.employees) {
          return sElem.employees.sort(function(a, b) {
            var res;
            res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
            if (!$scope.ascending) {
              res *= -1;
            }
            return res;
          });
        }
      });
    };
    sortData = function() {
      if ($scope.sortedColumn === 'employee') {
        return sortEmployeesBy(function(el) {
          return el.name;
        });
      } else if ($scope.sortedColumn === 'total') {
        return sortEmployeesBy(function(el) {
          return $scope.getLastValue(el);
        });
      }
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
      var selectedElementsMetadata;
      selectedElementsMetadata = _.map($scope.selectedElements, function(element) {
        return getIdentifier(element);
      });
      return {
        selectedElements: selectedElementsMetadata
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

  module.controller('WidgetHrPayrollTaxesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
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
          title: $translate.instant('impac.widget.hr_payroll_taxes.payroll_taxes'),
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

  module.controller('WidgetHrSalariesSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$translate", function($scope, $q, ChartFormatterSvc, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = !_.isEmpty(w.content) && (w.content.summary != null) && !_.isEmpty(w.content.summary.data);
      if ($scope.isDataFound) {
        $scope.periodOptions = [
          {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.yearly").toLowerCase()),
            value: "yearly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.monthly").toLowerCase()),
            value: "monthly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.weekly").toLowerCase()),
            value: "weekly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.daily").toLowerCase()),
            value: "daily"
          }
        ];
        $scope.filterOptions = [
          {
            label: $translate.instant("impac.common.label.gender"),
            value: "gender"
          }, {
            label: $translate.instant("impac.common.label.age_range"),
            value: "age_range"
          }, {
            label: $translate.instant("impac.common.label.job_title"),
            value: "job_title"
          }
        ];
        $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
          return o.value === w.content.total.period.toLowerCase();
        }) || $scope.periodOptions[0]);
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

  module.controller('WidgetHrWorkforceSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1.promise, $scope.paramSelectorDeferred2.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = !_.isEmpty(w.content) && (w.content.summary != null) && !_.isEmpty(w.content.summary.data);
      if ($scope.isDataFound) {
        $scope.periodOptions = [
          {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.yearly").toLowerCase()),
            value: "yearly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.monthly").toLowerCase()),
            value: "monthly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.weekly").toLowerCase()),
            value: "weekly"
          }, {
            label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.daily").toLowerCase()),
            value: "daily"
          }
        ];
        $scope.filterOptions = [
          {
            label: $translate.instant("impac.common.label.gender"),
            value: "gender"
          }, {
            label: $translate.instant("impac.common.label.age_range"),
            value: "age_range"
          }, {
            label: $translate.instant("impac.common.label.salary_range"),
            value: "salary_range"
          }, {
            label: $translate.instant("impac.common.label.job_title"),
            value: "job_title"
          }
        ];
        $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
          return o.value === w.content.total.period.toLowerCase();
        }) || $scope.periodOptions[0]);
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

  module.controller('WidgetInvoicesAgedPayablesReceivablesCtrl', ["$scope", "$q", "$log", "$filter", "ChartFormatterSvc", "ImpacWidgetsSvc", "$translate", function($scope, $q, $log, $filter, ChartFormatterSvc, ImpacWidgetsSvc, $translate) {
    var buildFxTotals, c, fetchElement, getIdentifier, matchElementToSelectedElement, periodName, selectedElementsSetting, settingsPromises, sortBy, sortByInvoiceCallback, sortData, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
    $scope.ascending = true;
    $scope.sortedColumn = 'customer';
    periodName = (c = $scope.widget.content) && (c.hist_parameters && c.hist_parameters.period) ? c.hist_parameters.period.toLowerCase() : 'monthly';
    $translate('impac.widget.settings.time_period.period.' + periodName).then(function(translation) {
      return $scope.period_translation = _.capitalize(translation.toLowerCase());
    });
    w.initContext = function() {
      var foundElem, i, len, ref, sElemId, statements;
      if ($scope.isDataFound = angular.isDefined(w.content) && (!_.isEmpty(w.content.payables) || !_.isEmpty(w.content.receivables)) && !_.isEmpty(w.content.dates)) {
        buildFxTotals();
        $scope.ratesDate = moment.now();
        $scope.payables = w.content.payables;
        $scope.receivables = w.content.receivables;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (!_.isEmpty(w.metadata.selectedElements)) {
          $scope.selectedElements = [];
          ref = w.metadata.selectedElements;
          for (i = 0, len = ref.length; i < len; i++) {
            sElemId = ref[i];
            statements = [$scope.payables, $scope.receivables];
            foundElem = _.find(statements, function(statement) {
              return statement.name === sElemId;
            });
            foundElem || (foundElem = fetchElement(statements, sElemId));
            if (foundElem) {
              $scope.selectedElements.push(foundElem);
            }
          }
        }
        if (!(($scope.selectedElements != null) && $scope.selectedElements.length > 0)) {
          w.width = 6;
        }
        return sortData();
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
    $scope.getOldestInvoice = function(element) {
      var idx;
      idx = _.findIndex(element.totals, function(invoice) {
        return invoice !== 0;
      });
      return w.content.dates[idx] || null;
    };
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
    };
    $scope.toggleSelectedElement = function(element, statementName) {
      if (statementName == null) {
        statementName = null;
      }
      if ($scope.isSelected(element, statementName)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          return matchElementToSelectedElement(element, statementName, sElem);
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        $scope.selectedElements || ($scope.selectedElements = []);
        if (statementName) {
          element.category = statementName;
        }
        $scope.selectedElements.push(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element, statementName) {
      if (statementName == null) {
        statementName = null;
      }
      return (element != null) && _.any($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, statementName, sElem);
      });
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
    $scope.getSelectLineColor = function(element, statementName) {
      var sElem;
      if (statementName == null) {
        statementName = null;
      }
      sElem = _.find($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, statementName, sElem);
      });
      if ($scope.hasElements()) {
        return ChartFormatterSvc.getColor(_.indexOf($scope.selectedElements, sElem));
      }
    };
    $scope.hasElements = function() {
      return ($scope.selectedElements != null) && $scope.selectedElements.length > 0;
    };
    matchElementToSelectedElement = function(element, elementCategory, sElem) {
      if (elementCategory == null) {
        elementCategory = null;
      }
      return getIdentifier(element, elementCategory) === getIdentifier(sElem);
    };
    fetchElement = function(statements, sElemId) {
      var element, elements, i, len, statement;
      for (i = 0, len = statements.length; i < len; i++) {
        statement = statements[i];
        elements = statement.suppliers || statement.customers;
        if (_.isEmpty(elements)) {
          continue;
        }
        element = _.find(elements, function(elem) {
          return getIdentifier(elem, statement.name) === sElemId;
        });
        if (element != null) {
          element = angular.merge(angular.copy(element), {
            category: statement.name
          });
          return element;
        }
      }
    };
    getIdentifier = function(element, category) {
      var id;
      if (category == null) {
        category = null;
      }
      id = element.id || element.name;
      category || (category = element.category);
      if (!category) {
        return id;
      }
      return category + "-" + id;
    };
    sortBy = function(data, getElem) {
      return data.sort(function(a, b) {
        var res;
        res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
        if (!$scope.ascending) {
          res *= -1;
        }
        return res;
      });
    };
    sortByInvoiceCallback = function(el) {
      var date;
      date = $scope.getOldestInvoice(el);
      if (date && _.isString(date)) {
        date = date.match(/[^_\W]+\s?/g).join('');
      }
      return new Date(date);
    };
    sortData = function() {
      if ($scope.sortedColumn === 'customer') {
        sortBy(w.content.payables.suppliers, function(el) {
          return el.name;
        });
        return sortBy(w.content.receivables.customers, function(el) {
          return el.name;
        });
      } else if ($scope.sortedColumn === 'total') {
        sortBy(w.content.payables.suppliers, function(el) {
          return $scope.getTotalSum(el);
        });
        return sortBy(w.content.receivables.customers, function(el) {
          return $scope.getTotalSum(el);
        });
      } else if ($scope.sortedColumn === 'invoice') {
        sortBy(w.content.payables.suppliers, sortByInvoiceCallback);
        return sortBy(w.content.receivables.customers, sortByInvoiceCallback);
      }
    };
    buildFxTotals = function() {
      var contact, contactFxTotals, fxTotal, i, j, len, len1, ref, ref1, results;
      ref = _.union(w.content.payables.suppliers, w.content.receivables.customers);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        contact = ref[i];
        contactFxTotals = [];
        ref1 = contact.fx_totals;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          fxTotal = ref1[j];
          if (!_.isEmpty(fxTotal)) {
            _.mapKeys(fxTotal, function(total, currency) {
              if (currency !== w.metadata.currency) {
                return contactFxTotals.push({
                  currency: currency,
                  amount: total.amount,
                  rate: total.rate
                });
              }
            });
          }
        }
        if (!_.isEmpty(contactFxTotals)) {
          results.push(contact.formattedFxTotals = contactFxTotals);
        } else {
          results.push(void 0);
        }
      }
      return results;
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
        dates = _.map(w.content.dates, function(date, index) {
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
      var selectedElementsMetadata;
      selectedElementsMetadata = _.map($scope.selectedElements, function(element) {
        return getIdentifier(element);
      });
      return {
        selectedElements: selectedElementsMetadata
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

  module.controller('WidgetInvoicesListCtrl', ["$scope", "$q", "$sce", "$filter", "ImpacUtilities", "$translate", function($scope, $q, $sce, $filter, ImpacUtilities, $translate) {
    var buildFxTotals, initInvoicesTooltips, settingsPromises, w;
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
          $scope.limitEntriesLabel = $translate.instant('impac.widget.invoices_list.limit_entries_label.creditors');
        } else {
          $scope.limitEntriesLabel = $translate.instant('impac.widget.invoices_list.limit_entries_label.debtors');
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
        $scope.defaultTo = $filter('date')(datesRange[1], 'yyyy-MM-dd');
        initInvoicesTooltips(w.content.entities);
        buildFxTotals();
        return $scope.ratesDate = moment.now();
      }
    };
    $scope.entityType = w.metadata.entity;
    $scope.entityTypeCap = _.capitalize(w.metadata.entity);
    if (_.isEmpty(w.metadata.order_by) || w.metadata.order_by === 'name' || w.metadata.order_by === 'total_invoiced') {
      $scope.orderBy = '';
    } else {
      $scope.orderBy = _.last(w.metadata.order_by.split('_')).concat(" ");
    }
    $scope.invoiceTooltips = {};
    initInvoicesTooltips = function(entities) {
      return _.each(entities, function(entity) {
        var count, tooltip;
        tooltip = ["<strong>" + entity.name + "</strong>"];
        count = 1;
        _.each(entity.invoices, function(i) {
          var amountDetail, formattedInvoiced, formattedPaid, invCurrency, txn;
          txn = i.transaction_no !== "" ? " (" + i.transaction_no + ")" : "";
          invCurrency = Object.keys(i.fx_totals)[0];
          formattedInvoiced = $filter('mnoCurrency')(i.fx_totals[invCurrency].invoiced, invCurrency, true);
          if (i.tooltip_status === "partially paid") {
            formattedPaid = $filter('mnoCurrency')(i.fx_totals[invCurrency].paid, invCurrency, true);
            amountDetail = " (" + formattedPaid + " on " + formattedInvoiced + ")";
          } else {
            amountDetail = " (" + formattedInvoiced + ")";
          }
          tooltip.push("#" + count + txn + " - " + i.tooltip_status + amountDetail);
          return count++;
        });
        return $scope.invoiceTooltips[entity.id] = $sce.trustAsHtml(tooltip.join("<br />"));
      });
    };
    buildFxTotals = function() {
      var contact, contactFxTotals, j, len, ref, results;
      ref = w.content.entities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        contact = ref[j];
        contactFxTotals = [];
        _.mapKeys(contact.fx_totals, function(total, currency) {
          if (currency !== w.metadata.currency) {
            return contactFxTotals.push({
              currency: currency,
              amount: total.invoiced,
              rate: total.rate
            });
          }
        });
        if (!_.isEmpty(contactFxTotals)) {
          results.push(contact.formattedFxTotals = contactFxTotals);
        } else {
          results.push(void 0);
        }
      }
      return results;
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

  module.controller('WidgetSalesAgedCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.aged_sales) && !_.isEmpty(w.content.dates);
      if ($scope.isDataFound) {
        $scope.filterOptions = [
          {
            label: $translate.instant("impac.widget.sales_aged.value_sold_taxes"),
            value: 'gross_value_sold'
          }, {
            label: $translate.instant("impac.widget.sales_aged.value_sold_no_taxes"),
            value: 'net_value_sold'
          }, {
            label: $translate.instant("impac.widget.sales_aged.quantity_sold"),
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

  module.controller('WidgetSalesComparisonCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", "ImpacWidgetsSvc", "$translate", function($scope, $q, $filter, ChartFormatterSvc, ImpacWidgetsSvc, $translate) {
    var buildFxTotals, fetchElement, getIdentifier, matchElementToSelectedElement, selectedElementsSetting, settingsPromises, sortAccountsBy, sortData, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred1 = $q.defer();
    $scope.paramSelectorDeferred2 = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred1, $scope.paramSelectorDeferred2, $scope.chartDeferred.promise];
    $scope.ascending = true;
    $scope.sortedColumn = 'sales';
    w.initContext = function() {
      var foundElem, i, len, ref, sElemId;
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales_comparison) && !_.isEmpty(w.content.dates);
      if ($scope.isDataFound) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        $scope.filterOptions = [
          {
            label: $translate.instant('impac.widget.sales_comparison.value_sold_taxes'),
            value: 'gross_value_sold'
          }, {
            label: $translate.instant('impac.widget.sales_comparison.value_sold_no_taxes'),
            value: 'net_value_sold'
          }, {
            label: $translate.instant('impac.widget.sales_comparison.quantity_sold'),
            value: 'quantity_sold'
          }
        ];
        $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return w.metadata && w.metadata.filter === o.value;
        }) || $scope.filterOptions[0]);
        $scope.criteriaOptions = [
          {
            label: $translate.instant('impac.widget.sales_comparison.criteria_options.products'),
            value: 'default'
          }, {
            label: $translate.instant('impac.widget.sales_comparison.criteria_options.locations'),
            value: 'location'
          }, {
            label: $translate.instant('impac.widget.sales_comparison.criteria_options.industries'),
            value: 'industry'
          }, {
            label: $translate.instant('impac.widget.sales_comparison.criteria_options.customers'),
            value: 'customer'
          }
        ];
        $scope.criteria = angular.copy(_.find($scope.criteriaOptions, function(o) {
          return w.metadata && w.metadata.criteria === o.value;
        }) || $scope.criteriaOptions[0]);
        buildFxTotals();
        $scope.ratesDate = moment.now();
        if (!_.isEmpty(w.metadata.selectedElements)) {
          $scope.selectedElements = [];
          ref = w.metadata.selectedElements;
          for (i = 0, len = ref.length; i < len; i++) {
            sElemId = ref[i];
            foundElem = _.find(w.content.sales_comparison, function(statement) {
              return statement.name === sElemId;
            });
            foundElem || (foundElem = fetchElement(w.content.sales_comparison, sElemId));
            if (foundElem) {
              $scope.selectedElements.push(foundElem);
            }
          }
        }
        return sortData();
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
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
    };
    $scope.toggleSelectedElement = function(element, statementName) {
      var selectedElement;
      if (statementName == null) {
        statementName = null;
      }
      if ($scope.isSelected(element, statementName)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          return matchElementToSelectedElement(element, statementName, sElem);
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      } else {
        selectedElement = angular.copy(element);
        selectedElement.category = statementName;
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(selectedElement);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false);
        }
      }
    };
    $scope.isSelected = function(element, statementName) {
      if (statementName == null) {
        statementName = null;
      }
      return (element != null) && _.any($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, statementName, sElem);
      });
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
    $scope.getSelectLineColor = function(element, statementName) {
      var sElem;
      if (statementName == null) {
        statementName = null;
      }
      sElem = _.find($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, statementName, sElem);
      });
      if ($scope.hasElements()) {
        return ChartFormatterSvc.getColor(_.indexOf($scope.selectedElements, sElem));
      }
    };
    matchElementToSelectedElement = function(element, elementCategory, sElem) {
      if (elementCategory == null) {
        elementCategory = null;
      }
      return getIdentifier(element, elementCategory) === getIdentifier(sElem);
    };
    fetchElement = function(statements, sElemId) {
      var element, i, len, statement;
      for (i = 0, len = statements.length; i < len; i++) {
        statement = statements[i];
        if (statement.sales == null) {
          continue;
        }
        element = _.find(statement.sales, function(sale) {
          return getIdentifier(sale, statement.name) === sElemId;
        });
        if (element != null) {
          element = angular.merge(angular.copy(element), {
            category: statement.name
          });
          return element;
        }
      }
    };
    getIdentifier = function(element, category) {
      var id;
      if (category == null) {
        category = null;
      }
      id = element.id || element.name;
      category || (category = element.category);
      if (!category) {
        return id;
      }
      return category + "-" + id;
    };
    sortAccountsBy = function(getElem) {
      return angular.forEach(w.content.sales_comparison, function(sElem) {
        if (sElem.sales) {
          return sElem.sales.sort(function(a, b) {
            var res;
            res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
            if (!$scope.ascending) {
              res *= -1;
            }
            return res;
          });
        }
      });
    };
    sortData = function() {
      if ($scope.sortedColumn === 'sales') {
        return sortAccountsBy(function(el) {
          return el.name;
        });
      } else if ($scope.sortedColumn === 'total') {
        return sortAccountsBy(function(el) {
          return $scope.getTotalForPeriod(el);
        });
      }
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
    buildFxTotals = function() {
      var grossSaleFxTotals, groupedSales, i, len, netSaleFxTotals, ref, results, sale;
      ref = w.content.sales_comparison;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        groupedSales = ref[i];
        results.push((function() {
          var j, len1, ref1, results1;
          ref1 = groupedSales.sales;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            sale = ref1[j];
            sale.formattedFxTotals = {};
            netSaleFxTotals = [];
            grossSaleFxTotals = [];
            if (!_.isEmpty(sale.fx_totals)) {
              _.mapKeys(sale.fx_totals, function(total, currency) {
                var grossAmount, k, l, len2, len3, netAmount, ref2, ref3, results2;
                ref2 = total['net_value_sold'];
                for (k = 0, len2 = ref2.length; k < len2; k++) {
                  grossAmount = ref2[k];
                  if (!(grossAmount === 0 || currency === w.metadata.currency)) {
                    netSaleFxTotals.push({
                      currency: currency,
                      amount: grossAmount,
                      rate: total.rate
                    });
                  }
                }
                ref3 = total['gross_value_sold'];
                results2 = [];
                for (l = 0, len3 = ref3.length; l < len3; l++) {
                  netAmount = ref3[l];
                  if (!(netAmount === 0 || currency === w.metadata.currency)) {
                    results2.push(grossSaleFxTotals.push({
                      currency: currency,
                      amount: netAmount,
                      rate: total.rate
                    }));
                  } else {
                    results2.push(void 0);
                  }
                }
                return results2;
              });
            }
            if (!_.isEmpty(netSaleFxTotals)) {
              sale.formattedFxTotals['net_value_sold'] = netSaleFxTotals;
            }
            if (!_.isEmpty(grossSaleFxTotals)) {
              results1.push(sale.formattedFxTotals['gross_value_sold'] = grossSaleFxTotals);
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        })());
      }
      return results;
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
      var selectedElementsMetadata;
      selectedElementsMetadata = _.map($scope.selectedElements, function(sElem) {
        return getIdentifier(sElem);
      });
      return {
        selectedElements: selectedElementsMetadata
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
    var buildFxTotals, setSelectedCustomer, setSelectedCustomerId, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.ratesDate = moment.now();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timePeriodDeferred.promise, $scope.widthDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.customers);
      if ($scope.isDataFound) {
        setSelectedCustomer();
        return $scope.customersOptions = _.map(w.content.customers, function(e) {
          return {
            value: e.uid,
            label: e.name
          };
        });
      }
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
    setSelectedCustomer = function() {
      var customer;
      if (!$scope.isDataFound) {
        return false;
      }
      if (w.metadata && w.metadata.customer_uid) {
        customer = _.find(w.content.customers, function(c) {
          return c.uid === w.metadata.customer_uid;
        });
      }
      customer || (customer = w.content.customers[0]);
      $scope.selectedCustomer = angular.copy(customer);
      setSelectedCustomerId();
      return buildFxTotals();
    };
    setSelectedCustomerId = function() {
      var cust;
      if (!(cust = $scope.selectedCustomer)) {
        return false;
      }
      return $scope.selectedCustomerId = {
        value: cust.uid,
        label: cust.name
      };
    };
    buildFxTotals = function() {
      var cust, dueFxTotals, invoicedFxTotals, paidFxTotals;
      if (!(cust = $scope.selectedCustomer)) {
        return false;
      }
      invoicedFxTotals = [];
      dueFxTotals = [];
      paidFxTotals = [];
      if (_.some(cust.fx_totals, function(total, currency) {
        return currency !== w.metadata.currency;
      })) {
        _.mapKeys(cust.fx_totals, function(total, currency) {
          var baseTotal;
          baseTotal = {
            rate: total.rate,
            currency: currency
          };
          if (total.invoiced !== 0) {
            invoicedFxTotals.push(angular.merge({
              amount: total.invoiced
            }, baseTotal));
          }
          if (total.paid !== 0) {
            paidFxTotals.push(angular.merge({
              amount: total.paid
            }, baseTotal));
          }
          if (total.due !== 0) {
            return dueFxTotals.push(angular.merge({
              amount: total.due
            }, baseTotal));
          }
        });
        if (!_.isEmpty(invoicedFxTotals)) {
          cust.invoicedFxTotals = invoicedFxTotals;
        }
        if (!_.isEmpty(paidFxTotals)) {
          cust.paidFxTotals = paidFxTotals;
        }
        if (!_.isEmpty(dueFxTotals)) {
          return cust.dueFxTotals = dueFxTotals;
        }
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

  module.controller('WidgetSalesCycleCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", "ImpacDashboardsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramsPickerDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramsPickerDeferred.promise, $scope.timePeriodDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      var dhb, status_selection;
      dhb = ImpacDashboardsSvc.getCurrentDashboard();
      status_selection = w.metadata.status_selection || dhb.metadata.status_selection || {
        values: []
      };
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.status_average_durations)) {
        _.remove(status_selection.values, function(status) {
          return indexOf.call(_.keys(w.content.status_average_durations), status) < 0;
        });
        $scope.hasReach = true;
        $scope.statusOptions = [];
        return angular.forEach(w.content.status_average_durations, function(value, status) {
          var isSelected;
          isSelected = _.isEmpty(status_selection.values) || (indexOf.call(status_selection.values, status) >= 0);
          return $scope.statusOptions.push({
            label: status,
            selected: isSelected
          });
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

  module.controller('WidgetSalesForecastCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
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
            title: $translate.instant('impac.widget.sales_forecast.sales_performance'),
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

  module.controller('WidgetSalesGrowthCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var productLineThreshold, productOptionThreshold, settingsPromises, w;
    w = $scope.widget;
    productLineThreshold = 35;
    productOptionThreshold = 25;
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
            label: $scope.getDisplayName(product, productOptionThreshold),
            value: product.id
          };
        }));
        $scope.product = angular.copy(_.find($scope.productOptions, function(o) {
          return o.value === w.content.product;
        }) || {
          label: $translate.instant('impac.widget.sales_growth.select_product'),
          value: -1
        });
        $scope.filterOptions = [
          {
            label: $translate.instant('impac.widget.sales_growth.value_sold_taxes'),
            value: 'gross_value_sold'
          }, {
            label: $translate.instant('impac.widget.sales_growth.value_sold_no_taxes'),
            value: 'net_value_sold'
          }, {
            label: $translate.instant('impac.widget.sales_growth.quantity_sold'),
            value: 'quantity_sold'
          }, {
            label: $translate.instant('impac.widget.sales_growth.value_purchased_taxes'),
            value: 'gross_value_purchased'
          }, {
            label: $translate.instant('impac.widget.sales_growth.value_purchased_no_taxes'),
            value: 'net_value_purchased'
          }, {
            label: $translate.instant('impac.widget.sales_growth.quantity_purchased'),
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
      var product;
      if ($scope.isDataFound) {
        product = _.find(w.content.summary, function(product) {
          return product.id === $scope.product.value;
        }) || w.content.summary[0];
        return _.extend(product, {
          displayName: $scope.getDisplayName(product, productLineThreshold)
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
    $scope.getDisplayName = function(product, threshold) {
      var codeName, fullName;
      fullName = w.content.organizations.length === 1 ? product.name : product.company + ' - ' + product.name;
      codeName = w.content.organizations.length === 1 ? product.code : product.company + ' - ' + product.code;
      if (fullName.length > threshold) {
        return codeName;
      } else {
        return fullName;
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

  module.controller('WidgetSalesLeadsFunnelCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$sce", "ImpacWidgetsSvc", "ImpacDashboardsSvc", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $sce, ImpacWidgetsSvc, ImpacDashboardsSvc, $translate) {
    var hasOneLead, selectedStatusSetting, setLeadDescriptionTooltips, settingsPromises, w;
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
      var dhb, status_selection;
      dhb = ImpacDashboardsSvc.getCurrentDashboard();
      status_selection = w.metadata.status_selection || dhb.metadata.status_selection || {
        values: []
      };
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads_per_status) && hasOneLead(w.content.leads_per_status)) {
        _.remove(status_selection.values, function(status) {
          return indexOf.call(_.keys(w.content.leads_per_status), status) < 0;
        });
        $scope.hasReach = true;
        $scope.statusOptions = [];
        return angular.forEach(w.content.leads_per_status, function(value, status) {
          var isSelected;
          isSelected = _.isEmpty(status_selection.values) || (indexOf.call(status_selection.values, status) >= 0);
          return $scope.statusOptions.push({
            label: status,
            selected: isSelected
          });
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
        $scope.setLeadTooltipsIsLocked = false;
      }
      if (!w.isExpanded() && $scope.selectedStatus) {
        return w.toggleExpanded();
      } else {
        return ImpacWidgetsSvc.updateWidgetSettings(w, false, true);
      }
    };
    $scope.isSelected = function(aStatus) {
      return $scope.selectedStatus && aStatus === $scope.selectedStatus;
    };
    $scope.getSelectedLeads = function() {
      var leads;
      if ($scope.isDataFound && $scope.selectedStatus) {
        leads = w.content.leads_per_status[$scope.selectedStatus].leads;
        if (!$scope.setLeadTooltipsIsLocked) {
          setLeadDescriptionTooltips(leads);
        }
        return leads;
      }
    };
    $scope.leadDescriptionTooltips = {};
    setLeadDescriptionTooltips = function(leads) {
      $scope.leadDescriptionTooltips = {};
      $scope.setLeadTooltipsIsLocked = true;
      return _.each(leads, function(aLead, index) {
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
          _.each(aLead.opportunities, function(opp) {
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
        return $scope.leadDescriptionTooltips[index] = $sce.trustAsHtml(tooltip.join("<br />"));
      });
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

  module.controller('WidgetSalesLeadsListCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$sce", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $sce, $translate) {
    var initLeadDescriptionTooltips, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise];
    w.initContext = function() {
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads);
      if ($scope.isDataFound) {
        return initLeadDescriptionTooltips(w.content.leads);
      }
    };
    w.processError = function(error) {
      if (error.code === 404) {
        return $scope.isDataFound = false;
      }
    };
    $scope.leadDescriptionTooltips = {};
    initLeadDescriptionTooltips = function(leads) {
      return _.each(leads, function(aLead, index) {
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
          _.each(aLead.opportunities, function(opp) {
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
        return $scope.leadDescriptionTooltips[index] = $sce.trustAsHtml(tooltip.join("<br />"));
      });
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

  module.controller('WidgetSalesListCtrl', ["$scope", "$q", "ChartFormatterSvc", "ImpacWidgetsSvc", "$translate", function($scope, $q, ChartFormatterSvc, ImpacWidgetsSvc, $translate) {
    var buildFxTotals, settingsPromises, sortAccountsBy, sortData, unCollapsedSetting, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.datesPickerDeferred.promise];
    $scope.ascending = true;
    $scope.sortedColumn = 'account';
    $scope.datesPickerTemplate = "<span>" + $translate.instant('impac.widget.sales_list.from') + "<from-date> " + $translate.instant('impac.widget.sales_list.to') + " <to-date> <apply></span>";
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)) {
        buildFxTotals();
        $scope.ratesDate = moment.now();
        $scope.filterOptions = [
          {
            label: $translate.instant('impac.widget.sales_list.value_sold_taxes'),
            value: 'gross_value_sold'
          }, {
            label: $translate.instant('impac.widget.sales_list.value_sold_no_taxes'),
            value: 'net_value_sold'
          }, {
            label: $translate.instant('impac.widget.sales_list.quantity_sold'),
            value: 'quantity_sold'
          }, {
            label: $translate.instant('impac.widget.sales_list.value_purchased_taxes'),
            value: 'gross_value_purchased'
          }, {
            label: $translate.instant('impac.widget.sales_list.value_purchased_no_taxes'),
            value: 'net_value_purchased'
          }, {
            label: $translate.instant('impac.widget.sales_list.quantity_purchased'),
            value: 'quantity_purchased'
          }
        ];
        $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return o.value === w.metadata.filter;
        }) || $scope.filterOptions[0]);
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        return sortData();
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
    sortAccountsBy = function(getElem) {
      return angular.forEach(w.content.summary, function(sElem) {
        if (sElem.products) {
          return sElem.products.sort(function(a, b) {
            var res;
            res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
            if (!$scope.ascending) {
              res *= -1;
            }
            return res;
          });
        }
      });
    };
    sortData = function() {
      if ($scope.sortedColumn === 'account') {
        return sortAccountsBy(function(el) {
          return el.name;
        });
      } else if ($scope.sortedColumn === 'total') {
        return sortAccountsBy(function(el) {
          return el.total;
        });
      }
    };
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
    };
    buildFxTotals = function() {
      var groupedSales, i, len, ref, results, sale, saleFxTotals;
      ref = w.content.summary;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        groupedSales = ref[i];
        results.push((function() {
          var j, len1, ref1, results1;
          ref1 = groupedSales.products;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            sale = ref1[j];
            saleFxTotals = [];
            if (!_.isEmpty(sale.fx_totals)) {
              _.mapKeys(sale.fx_totals, function(total, currency) {
                var amount;
                amount = total['amount'];
                if (!(amount === 0 || currency === w.metadata.currency)) {
                  return saleFxTotals.push({
                    currency: currency,
                    amount: amount,
                    rate: total.rate
                  });
                }
              });
            }
            if (!_.isEmpty(saleFxTotals)) {
              results1.push(sale.formattedFxTotals = saleFxTotals);
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        })());
      }
      return results;
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

  module.controller('WidgetSalesMarginCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
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
      if ($scope.isDataFound) {
        $scope.filterOptions = [
          {
            label: $translate.instant('impac.widget.sales_margin.including_taxes'),
            value: 'gross_margin'
          }, {
            label: $translate.instant('impac.widget.sales_margin.excluding_taxes'),
            value: 'net_margin'
          }
        ];
        if ((w.metadata != null) && w.metadata.filter === "net_margin") {
          return $scope.filter = angular.copy($scope.filterOptions[1]);
        } else {
          return $scope.filter = angular.copy($scope.filterOptions[0]);
        }
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
          title: $translate.instant('impac.widget.sales_margin.gross_margin'),
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

  module.controller('WidgetSalesNetSalesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelector1Deferred = $q.defer();
    $scope.paramSelector2Deferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelector1Deferred.promise, $scope.paramSelector2Deferred.promise];
    $translate(['impac.widget.sales_net_sales.total_amount', 'impac.widget.sales_net_sales.average_amount', 'impac.widget.sales_net_sales.volume']).then(function(translations) {
      $scope.displayOptions = [
        {
          label: translations['impac.widget.sales_net_sales.total_amount'],
          value: 'total'
        }, {
          label: translations['impac.widget.sales_net_sales.average_amount'],
          value: 'average'
        }, {
          label: translations['impac.widget.sales_net_sales.volume'],
          value: 'trans_count'
        }
      ];
      return $scope.displayType = angular.copy(_.find($scope.displayOptions, function(o) {
        return w.metadata && o.value === w.metadata.display_type;
      }) || $scope.displayOptions[0]);
    });
    $translate(['impac.widget.sales_net_sales.tmpl.last_hours', 'impac.widget.sales_net_sales.tmpl.last_days']).then(function(translations) {
      var daysTmpl, hoursTmpl;
      hoursTmpl = translations['impac.widget.sales_net_sales.tmpl.last_hours'];
      daysTmpl = translations['impac.widget.sales_net_sales.tmpl.last_days'];
      $scope.timeRangeOptions = [
        {
          label: hoursTmpl.replace(':hours:', 24),
          value: '-1d'
        }, {
          label: daysTmpl.replace(':days:', 5),
          value: '-5d'
        }, {
          label: daysTmpl.replace(':days:', 7),
          value: '-7d'
        }, {
          label: daysTmpl.replace(':days:', 30),
          value: '-30d'
        }, {
          label: daysTmpl.replace(':days:', 45),
          value: '-45d'
        }, {
          label: daysTmpl.replace(':days:', 60),
          value: '-60d'
        }, {
          label: daysTmpl.replace(':days:', 90),
          value: '-90d'
        }
      ];
      return $scope.timeRange = angular.copy(_.find($scope.timeRangeOptions, function(o) {
        return w.metadata && o.value === w.metadata.time_range;
      }) || $scope.timeRangeOptions[6]);
    });
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

  module.controller('WidgetSalesNewVsExistingCustomersCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var daysTmpl, hoursTmpl, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.timeRangeParamSelectorDeferred = $q.defer();
    $scope.displayTypeParamSelectorDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.timeRangeParamSelectorDeferred.promise, $scope.displayTypeParamSelectorDeferred.promise, $scope.chartDeferred.promise];
    $scope.displayOptions = [
      {
        label: $translate.instant('impac.widget.sales_new_vs_existing.customers'),
        value: 'customers_count'
      }, {
        label: $translate.instant('impac.widget.sales_new_vs_existing.total_sales'),
        value: 'total_sales'
      }, {
        label: $translate.instant('impac.widget.sales_new_vs_existing.transactions'),
        value: 'transactions_count'
      }
    ];
    $scope.displayType = angular.copy(_.find($scope.displayOptions, function(o) {
      return w.metadata && (o.value === w.metadata.display_type);
    }) || $scope.displayOptions[0]);
    hoursTmpl = $translate.instant('impac.widget.sales_new_vs_existing.tmpl.last_hours');
    daysTmpl = $translate.instant('impac.widget.sales_new_vs_existing.tmpl.last_days');
    $scope.timeRangeOptions = [
      {
        label: hoursTmpl.replace(':hours:', 24),
        value: '-1d'
      }, {
        label: daysTmpl.replace(':days:', 5),
        value: '-5d'
      }, {
        label: daysTmpl.replace(':days:', 7),
        value: '-7d'
      }, {
        label: daysTmpl.replace(':days:', 30),
        value: '-30d'
      }, {
        label: daysTmpl.replace(':days:', 45),
        value: '-45d'
      }, {
        label: daysTmpl.replace(':days:', 60),
        value: '-60d'
      }, {
        label: daysTmpl.replace(':days:', 90),
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
      var values;
      values = {
        "new": Math.abs(w.content.summary[$scope.displayType.value]["new"]),
        existing: Math.abs(w.content.summary[$scope.displayType.value].existing)
      };
      values.totals = values["new"] + values.existing;
      return Math.round(values[sliceType] / values.totals * 100);
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

  module.controller('WidgetSalesNumberOfLeadsCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
    var getVariation, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramSelectorDeferred.promise];
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.number_of_leads)) {
        return $translate(['impac.widget.settings.time_period.period.year', 'impac.widget.settings.time_period.period.quarter', 'impac.widget.settings.time_period.period.month', 'impac.widget.settings.time_period.period.week', 'impac.widget.settings.time_period.period.day']).then(function(translations) {
          $scope.periodOptions = [
            {
              label: translations['impac.widget.settings.time_period.period.year'],
              value: 'YEARLY'
            }, {
              label: translations['impac.widget.settings.time_period.period.quarter'],
              value: 'QUARTERLY'
            }, {
              label: translations['impac.widget.settings.time_period.period.month'],
              value: 'monthly'
            }, {
              label: translations['impac.widget.settings.time_period.period.week'],
              value: 'WEEKLY'
            }, {
              label: translations['impac.widget.settings.time_period.period.day'],
              value: 'DAILY'
            }
          ];
          return $scope.period = angular.copy(_.find($scope.periodOptions, function(o) {
            return o.value === w.metadata.period;
          }) || $scope.periodOptions[3]);
        });
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

  module.controller('WidgetSalesOpportunitiesFunnelCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "ImpacWidgetsSvc", "ImpacDashboardsSvc", function($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) {
    var getFilteredTotal, getOrderedAssigneeIds, hasOneOpportunity, selectedStatusSetting, settingsPromises, sortData, sortOppsBy, w;
    w = $scope.widget;
    $scope.selectedOpportunities = [];
    $scope.collapsed = [];
    $scope.orgDeferred = $q.defer();
    $scope.paramsPickerDeferred1 = $q.defer();
    $scope.paramsPickerDeferred2 = $q.defer();
    $scope.widthDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramsPickerDeferred1.promise, $scope.paramsPickerDeferred2.promise, $scope.widthDeferred.promise];
    $scope.ascending = true;
    $scope.sortedColumn = 'group';
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
    getFilteredTotal = function(opps, assignees) {
      return _.reduce(opps, function(total, opp) {
        var ref;
        if (total == null) {
          total = 0;
        }
        if (ref = opp.assignee_id, indexOf.call(assignees, ref) >= 0) {
          return total + 1;
        } else {
          return total;
        }
      }, 0);
    };
    getOrderedAssigneeIds = function(assigneesOptions) {
      return _.map(_.filter(assigneesOptions, function(assigneeOption) {
        return assigneeOption.selected;
      }), 'value');
    };
    w.initContext = function() {
      var assignees_selection, dhb, sales_stage_selection;
      dhb = ImpacDashboardsSvc.getCurrentDashboard();
      sales_stage_selection = w.metadata.sales_stage_selection || dhb.metadata.sales_stage_selection || {
        values: []
      };
      assignees_selection = w.metadata.assignees_selection || dhb.metadata.assignees_selection || {
        values: []
      };
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opps_per_sales_stage) && hasOneOpportunity(w.content.opps_per_sales_stage)) {
        _.remove(sales_stage_selection.values, function(status) {
          return indexOf.call(_.keys(w.content.opps_per_sales_stage), status) < 0;
        });
        $scope.hasReach = true;
        $scope.statusOptions = [];
        angular.forEach(w.content.opps_per_sales_stage, function(value, status) {
          var isSelected;
          isSelected = _.isEmpty(sales_stage_selection.values) || (indexOf.call(sales_stage_selection.values, status) >= 0);
          return $scope.statusOptions.push({
            label: status,
            selected: isSelected
          });
        });
        if ($scope.statusOptions[0] && !_.any($scope.statusOptions, 'selected') && !_.isEmpty(w.content.opps_per_sales_stage)) {
          $scope.statusOptions[0].selected = true;
        }
        $scope.assigneesOptions = [];
        angular.forEach(w.content.assignees, function(obj, index) {
          var isSelected, ref;
          isSelected = _.isEmpty(assignees_selection.values) || (ref = obj.id, indexOf.call(assignees_selection.values, ref) >= 0);
          return $scope.assigneesOptions.push({
            label: obj.name,
            selected: isSelected,
            value: obj.id
          });
        });
        if ($scope.assigneesOptions[0] && !_.any($scope.assigneesOptions, 'selected') && !_.isEmpty(w.content.assignees)) {
          return $scope.assigneesOptions[0].selected = true;
        }
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
      $scope.updateRightView();
      if (!w.isExpanded() && $scope.selectedStatus) {
        return w.toggleExpanded();
      } else {
        return ImpacWidgetsSvc.updateWidgetSettings(w, false, true);
      }
    };
    $scope.isSelected = function(aStatus) {
      return $scope.selectedStatus && aStatus === $scope.selectedStatus;
    };
    $scope.toggleCollapsed = function(element) {
      if ((element != null) && (element.assigneeName != null)) {
        if (_.find($scope.collapsed, (function(name) {
          return element.assigneeName === name;
        }))) {
          return $scope.collapsed = _.reject($scope.collapsed, function(name) {
            return name === element.assigneeName;
          });
        } else {
          return $scope.collapsed.push(element.assigneeName);
        }
      }
    };
    $scope.isCollapsed = function(element) {
      if ((element != null) && (element.assigneeName != null)) {
        if (_.find($scope.collapsed, (function(name) {
          return element.assigneeName === name;
        }))) {
          return true;
        } else {
          return false;
        }
      }
    };
    $scope.getSelectedOpportunities = function() {
      var assignees, filteredOpps, oppGroups, sortedOppGroups;
      if ($scope.isDataFound && $scope.selectedStatus && w.content.opps_per_sales_stage[$scope.selectedStatus]) {
        assignees = getOrderedAssigneeIds($scope.assigneesOptions);
        filteredOpps = _.filter(w.content.opps_per_sales_stage[$scope.selectedStatus].opps, function(opportunity) {
          var ref;
          return ref = opportunity.assignee_id, indexOf.call(assignees, ref) >= 0;
        });
        oppGroups = _.groupBy(filteredOpps, 'assignee_id');
        sortedOppGroups = [];
        angular.forEach($scope.assigneesOptions, function(assigneeOption) {
          var assigneeId;
          assigneeId = assigneeOption.value;
          if (oppGroups[assigneeId]) {
            return sortedOppGroups.push({
              assigneeName: assigneeOption.label,
              opps: oppGroups[assigneeId]
            });
          }
        });
        return sortedOppGroups;
      } else {
        return [];
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
    $scope.getTotal = function(oppsGroup) {
      var currency, total;
      if (!(oppsGroup.length > 0)) {
        return "";
      }
      total = _.sum(oppsGroup, function(o) {
        var amount, proba;
        amount = o.amount.amount || 0.0;
        proba = o.probability || 0.0;
        return amount * (proba / 100);
      });
      currency = oppsGroup[0].amount.currency || 'AUD';
      return $filter('mnoCurrency')(total, currency);
    };
    sortOppsBy = function(getElem) {
      return angular.forEach($scope.selectedOpportunities, function(sElem) {
        if (sElem.opps) {
          return sElem.opps.sort(function(a, b) {
            var res;
            res = getElem(a) > getElem(b) ? 1 : getElem(a) < getElem(b) ? -1 : 0;
            if (!$scope.ascending) {
              res *= -1;
            }
            return res;
          });
        }
      });
    };
    sortData = function() {
      if ($scope.sortedColumn === 'group') {
        return sortOppsBy(function(el) {
          return el.name;
        });
      } else if ($scope.sortedColumn === 'total') {
        return sortOppsBy(function(el) {
          return el.amount.amount;
        });
      }
    };
    $scope.sort = function(col) {
      if ($scope.sortedColumn === col) {
        $scope.ascending = !$scope.ascending;
      } else {
        $scope.ascending = true;
        $scope.sortedColumn = col;
      }
      return sortData();
    };
    $scope.updateRightView = function() {
      $scope.selectedOpportunities = $scope.getSelectedOpportunities();
      $scope.collapsed = [];
      return sortData();
    };
    selectedStatusSetting = {};
    selectedStatusSetting.initialized = false;
    selectedStatusSetting.initialize = function() {
      if (!_.isEmpty(w.content) && angular.isDefined(w.content.opps_per_sales_stage[w.metadata.selected_status])) {
        $scope.selectedStatus = w.metadata.selected_status;
      }
      selectedStatusSetting.initialized = true;
      return $scope.updateRightView();
    };
    selectedStatusSetting.toMetadata = function() {
      return {
        selected_status: $scope.selectedStatus
      };
    };
    w.settings.push(selectedStatusSetting);
    w.format = function() {
      var assignees, max;
      if ($scope.isDataFound) {
        max = 0;
        assignees = getOrderedAssigneeIds($scope.assigneesOptions);
        angular.forEach($scope.statusOptions, function(statusOption) {
          var value;
          value = getFilteredTotal(w.content.opps_per_sales_stage[statusOption.label].opps, assignees);
          if (statusOption.selected && angular.isDefined(value) && value > max) {
            return max = value;
          }
        });
        if (max > 0) {
          return $scope.funnel = _.compact(_.map($scope.statusOptions, function(statusOption, index) {
            var coloredWidth, statusWidth, value;
            value = getFilteredTotal(w.content.opps_per_sales_stage[statusOption.label].opps, assignees);
            coloredWidth = (100 * (value / max) - 10).toFixed();
            if (coloredWidth < 8) {
              statusWidth = 92;
            } else {
              statusWidth = 100 - coloredWidth;
            }
            if (statusOption.selected && angular.isDefined(value) && value > 0) {
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
        } else {
          return $scope.isDataFound = false;
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
  var module,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module = angular.module('impac.components.widgets.sales-performance', []);

  module.controller('WidgetSalesPerformanceCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", "ImpacWidgetsSvc", function($scope, $q, $filter, ChartFormatterSvc, ImpacWidgetsSvc) {
    var formatDate, getIdentifier, matchElementToSelectedElement, selectedElementsSetting, settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.paramsWinsPickerDeferred = $q.defer();
    $scope.paramsLostsPickerDeferred = $q.defer();
    $scope.timePeriodDeferred = $q.defer();
    $scope.widthDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.paramsWinsPickerDeferred, $scope.paramsLostsPickerDeferred, $scope.timePeriodDeferred, $scope.widthDeferred.promise, $scope.chartDeferred.promise];
    w.initContext = function() {
      var foundElem, i, len, ref, sElemId;
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.assignees);
      if ($scope.isDataFound) {
        if (!_.isEmpty(w.metadata.selectedElements)) {
          $scope.selectedElements = [];
          ref = w.metadata.selectedElements;
          for (i = 0, len = ref.length; i < len; i++) {
            sElemId = ref[i];
            foundElem = _.find(w.content.assignees, function(assignee) {
              return getIdentifier(assignee) === sElemId;
            });
            if (foundElem) {
              $scope.selectedElements.push(foundElem);
            }
          }
        }
        $scope.hasReach = true;
        $scope.closedWonOptions = _.compact(_.map(w.content.sales_stages.won, function(stage) {
          return {
            label: stage,
            selected: true
          };
        }));
        angular.forEach(w.content.sales_stages.all, function(stage) {
          if (!(indexOf.call(w.content.sales_stages.won, stage) >= 0)) {
            return $scope.closedWonOptions.push({
              label: stage,
              selected: false
            });
          }
        });
        $scope.closedLostOptions = _.compact(_.map(w.content.sales_stages.lost, function(stage) {
          return {
            label: stage,
            selected: true
          };
        }));
        return angular.forEach(w.content.sales_stages.all, function(stage) {
          if (!(indexOf.call(w.content.sales_stages.lost, stage) >= 0)) {
            return $scope.closedLostOptions.push({
              label: stage,
              selected: false
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
    $scope.getChartTitle = function(el) {
      if ($scope.selectedElements) {
        return $scope.selectedElements.map(function(el) {
          return el.name;
        }).join(', ');
      }
    };
    $scope.getTotalWon = function(el) {
      if ($scope.selectedElements) {
        return $scope.selectedElements.reduce((function(t, e) {
          return t + e.total_won;
        }), 0);
      } else {
        return 0;
      }
    };
    formatDate = function(date) {
      var period;
      period = (w.metadata != null) && (w.metadata.hist_parameters != null) ? w.metadata.hist_parameters.period : null;
      return $filter('mnoDate')(date, period);
    };
    $scope.getCloseDate = function(anOpp) {
      var theDate;
      if ((anOpp != null) && (anOpp.sales_stage_changes != null) && anOpp.sales_stage_changes.length > 0) {
        theDate = anOpp.sales_stage_changes[anOpp.sales_stage_changes.length - 1].updated_at;
        if (theDate.split(' ').length > 0) {
          theDate = theDate.split(' ')[0];
          return formatDate(theDate);
        }
      }
    };
    $scope.getForecastCloseDate = function(anOpp) {
      var theDate;
      if ((anOpp != null) && anOpp.expected_close_date) {
        theDate = anOpp.expected_close_date;
        if (theDate.split(' ').length > 0) {
          theDate = theDate.split(' ')[0];
          return formatDate(theDate);
        }
      }
    };
    $scope.getElementChartColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.no_sales_stages_selected = function() {
      return w.content && w.content.sales_stages && w.content.sales_stages.won.length === 0 && w.content.sales_stages.lost.length === 0;
    };
    $scope.toggleSelectedElement = function(element) {
      var selectedElement;
      if ($scope.isSelected(element)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          return matchElementToSelectedElement(element, sElem);
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false, true);
        }
      } else {
        selectedElement = angular.copy(element);
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(selectedElement);
        w.format();
        if (!w.isExpanded()) {
          return w.toggleExpanded();
        } else {
          return ImpacWidgetsSvc.updateWidgetSettings(w, false, true);
        }
      }
    };
    $scope.isSelected = function(element) {
      return (element != null) && _.any($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, sElem);
      });
    };
    $scope.hasElements = function() {
      return ($scope.selectedElements != null) && $scope.selectedElements.length > 0;
    };
    $scope.getSelectLineColor = function(element) {
      var sElem;
      sElem = _.find($scope.selectedElements, function(sElem) {
        return matchElementToSelectedElement(element, sElem);
      });
      if ($scope.hasElements()) {
        return ChartFormatterSvc.getColor(_.indexOf($scope.selectedElements, sElem));
      }
    };
    matchElementToSelectedElement = function(element, sElem) {
      return getIdentifier(element) === getIdentifier(sElem);
    };
    getIdentifier = function(element) {
      return element.id || element.name;
    };
    $scope.drawTrigger = $q.defer();
    w.format = function() {
      var all_values_are_positive, chartData, inputData, options;
      if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
        inputData = [];
        all_values_are_positive = true;
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
    selectedElementsSetting = {
      initialized: false
    };
    selectedElementsSetting.initialize = function() {
      return selectedElementsSetting.initialized = true;
    };
    selectedElementsSetting.toMetadata = function() {
      var selectedElementsMetadata;
      selectedElementsMetadata = _.map($scope.selectedElements, function(sElem) {
        return getIdentifier(sElem);
      });
      return {
        selectedElements: selectedElementsMetadata
      };
    };
    w.settings.push(selectedElementsSetting);
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

  module.controller('WidgetSalesSegmentedTurnoverCtrl', ["$scope", "$q", "$filter", "ChartFormatterSvc", "$translate", function($scope, $q, $filter, ChartFormatterSvc, $translate) {
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
            label: $translate.instant('impac.widget.sales_turnover.gross_revenue'),
            value: 'gross'
          }, {
            label: $translate.instant('impac.widget.sales_turnover.net_revenue'),
            value: 'net'
          }
        ];
        $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return o.value === w.content.filter;
        }) || $scope.filterOptions[0]);
        if (w.content.ranges[0].percentage + w.content.ranges[1].percentage > 50) {
          return $scope.analysisTranslate = $translate.instant('impac.widget.sales_turnover.analysis.least');
        } else if (w.content.ranges[3].percentage + w.content.ranges[4].percentage > 50) {
          return $scope.analysisTranslate = $translate.instant('impac.widget.sales_turnover.analysis.most');
        } else {
          return $scope.analysisTranslate = $translate.instant('impac.widget.sales_turnover.analysis.balanced');
        }
      }
    };
    $scope.getColorByIndex = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.getRangeLabel = function(aLabel, ISOmode) {
      var prices;
      if (ISOmode == null) {
        ISOmode = false;
      }
      prices = aLabel.split('-');
      return _.map(prices, function(price) {
        return $filter('mnoCurrency')(price, w.content.currency, ISOmode);
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
            return $scope.getRangeLabel(elem.label, true);
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

  module.controller('WidgetSalesSummaryCtrl', ["$scope", "$q", "ChartFormatterSvc", "$translate", function($scope, $q, ChartFormatterSvc, $translate) {
    var settingsPromises, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.chartFiltersDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    $scope.chartDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.chartFiltersDeferred.promise, $scope.paramSelectorDeferred.promise, $scope.datesPickerDeferred.promise, $scope.chartDeferred.promise];
    $scope.datesPickerTemplate = "<span><from-date>" + $translate.instant('impac.widget.sales_summary.to') + " <to-date> <apply></span>";
    w.initContext = function() {
      $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.summary) && (_.sum(_.map(w.content.summary, function(s) {
        return s.total;
      })) > 0);
      if ($scope.isDataFound) {
        $scope.filterOptions = [
          {
            label: $translate.instant('impac.widget.sales_summary.value_sold_taxes'),
            value: 'gross_value_sold'
          }, {
            label: $translate.instant('impac.widget.sales_summary.value_sold_no_taxes'),
            value: 'net_value_sold'
          }, {
            label: $translate.instant('impac.widget.sales_summary.quantity_sold'),
            value: 'quantity_sold'
          }, {
            label: $translate.instant('impac.widget.sales_summary.value_purchased_taxes'),
            value: 'gross_value_purchased'
          }, {
            label: $translate.instant('impac.widget.sales_summary.value_purchased_no_taxes'),
            value: 'net_value_purchased'
          }, {
            label: $translate.instant('impac.widget.sales_summary.quantity_purchased'),
            value: 'quantity_purchased'
          }
        ];
        if (w.metadata.criteria === "customer") {
          $scope.filterOptions = [$scope.filterOptions[0], $scope.filterOptions[1], $scope.filterOptions[2]];
        }
        return $scope.filter = angular.copy(_.find($scope.filterOptions, function(o) {
          return o.value === w.metadata.filter;
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

  module.controller('WidgetSalesTopCustomersCtrl', ["$scope", "$q", "$filter", "ImpacUtilities", "$translate", function($scope, $q, $filter, ImpacUtilities, $translate) {
    var buildFxTotals, fields, settingsPromises, topTmpl, w;
    w = $scope.widget;
    $scope.orgDeferred = $q.defer();
    $scope.datesPickerDeferred = $q.defer();
    $scope.paramSelectorDeferred = $q.defer();
    settingsPromises = [$scope.orgDeferred.promise, $scope.datesPickerDeferred.promise, $scope.paramSelectorDeferred.promise];
    topTmpl = $translate.instant('impac.widget.sales_top_customers.top');
    $scope.limitEntriesOptions = [
      {
        label: topTmpl.replace(':number:', 5),
        value: 5
      }, {
        label: topTmpl.replace(':number:', 10),
        value: 10
      }, {
        label: topTmpl.replace(':number:', 25),
        value: 25
      }, {
        label: topTmpl.replace(':number:', 50),
        value: 50
      }, {
        label: topTmpl.replace(':number:', 100),
        value: 100
      }
    ];
    $scope.limitEntriesSelected = angular.copy(_.find($scope.limitEntriesOptions, function(o) {
      return (w.metadata != null) && (o.value === w.metadata.limit_entries);
    }) || $scope.limitEntriesOptions[3]);
    $scope.headerOptions = [
      {
        label: $translate.instant('impac.widget.sales_top_customers.total_sales'),
        value: 'total_sales',
        minified: 'total'
      }, {
        label: $translate.instant('impac.widget.sales_top_customers.transactions'),
        value: 'transactions',
        minified: '# tr'
      }, {
        label: $translate.instant('impac.widget.sales_top_customers.avg_sales'),
        value: 'avg_sales',
        minified: 'avg'
      }, {
        label: $translate.instant('impac.widget.sales_top_customers.last_sale'),
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
        $scope.defaultTo = $filter('date')(datesRange[1], 'yyyy-MM-dd');
        buildFxTotals();
        return $scope.ratesDate = moment.now();
      }
    };
    fields = [
      {
        label: 'total',
        showCurrency: true,
        getValue: function(entity) {
          return entity.total_invoiced;
        },
        getFormattedFxTotals: function(entity) {
          return entity.formattedFxTotals;
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
    buildFxTotals = function() {
      var contact, contactFxTotals, j, len, ref, results;
      ref = w.content.entities;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        contact = ref[j];
        contactFxTotals = [];
        _.mapKeys(contact.fx_totals, function(total, currency) {
          if (currency !== w.metadata.currency) {
            return contactFxTotals.push({
              currency: currency,
              amount: total.invoiced,
              rate: total.rate
            });
          }
        });
        if (!_.isEmpty(contactFxTotals)) {
          results.push(contact.formattedFxTotals = contactFxTotals);
        } else {
          results.push(void 0);
        }
      }
      return results;
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

  module.controller('WidgetSalesTopOpportunitiesCtrl', ["$scope", "$q", "ChartFormatterSvc", "$filter", "$translate", function($scope, $q, ChartFormatterSvc, $filter, $translate) {
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
        oppDetails.push($translate.instant('impac.widget.sales_opportunities.proba') + (" " + anOpp.probability + "%"));
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

}).call(this);

/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 2.1.4
 *
 * Copyright 2016 Nick Downie
 * Released under the MIT license
 * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
 */
!function t(e,i,a){function o(r,s){if(!i[r]){if(!e[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(n)return n(r,!0);var h=new Error("Cannot find module '"+r+"'");throw h.code="MODULE_NOT_FOUND",h}var d=i[r]={exports:{}};e[r][0].call(d.exports,function(t){var i=e[r][1][t];return o(i?i:t)},d,d.exports,t,e,i,a)}return i[r].exports}for(var n="function"==typeof require&&require,r=0;r<a.length;r++)o(a[r]);return o}({1:[function(t,e,i){},{}],2:[function(t,e,i){function a(t){if(t){var e=/^#([a-fA-F0-9]{3})$/,i=/^#([a-fA-F0-9]{6})$/,a=/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,o=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,n=/(\w+)/,r=[0,0,0],s=1,l=t.match(e);if(l){l=l[1];for(var h=0;h<r.length;h++)r[h]=parseInt(l[h]+l[h],16)}else if(l=t.match(i)){l=l[1];for(var h=0;h<r.length;h++)r[h]=parseInt(l.slice(2*h,2*h+2),16)}else if(l=t.match(a)){for(var h=0;h<r.length;h++)r[h]=parseInt(l[h+1]);s=parseFloat(l[4])}else if(l=t.match(o)){for(var h=0;h<r.length;h++)r[h]=Math.round(2.55*parseFloat(l[h+1]));s=parseFloat(l[4])}else if(l=t.match(n)){if("transparent"==l[1])return[0,0,0,0];if(r=y[l[1]],!r)return}for(var h=0;h<r.length;h++)r[h]=v(r[h],0,255);return s=s||0==s?v(s,0,1):1,r[3]=s,r}}function o(t){if(t){var e=/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,i=t.match(e);if(i){var a=parseFloat(i[4]),o=v(parseInt(i[1]),0,360),n=v(parseFloat(i[2]),0,100),r=v(parseFloat(i[3]),0,100),s=v(isNaN(a)?1:a,0,1);return[o,n,r,s]}}}function n(t){if(t){var e=/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,i=t.match(e);if(i){var a=parseFloat(i[4]),o=v(parseInt(i[1]),0,360),n=v(parseFloat(i[2]),0,100),r=v(parseFloat(i[3]),0,100),s=v(isNaN(a)?1:a,0,1);return[o,n,r,s]}}}function r(t){var e=a(t);return e&&e.slice(0,3)}function s(t){var e=o(t);return e&&e.slice(0,3)}function l(t){var e=a(t);return e?e[3]:(e=o(t))?e[3]:(e=n(t))?e[3]:void 0}function h(t){return"#"+x(t[0])+x(t[1])+x(t[2])}function d(t,e){return 1>e||t[3]&&t[3]<1?c(t,e):"rgb("+t[0]+", "+t[1]+", "+t[2]+")"}function c(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"rgba("+t[0]+", "+t[1]+", "+t[2]+", "+e+")"}function u(t,e){if(1>e||t[3]&&t[3]<1)return f(t,e);var i=Math.round(t[0]/255*100),a=Math.round(t[1]/255*100),o=Math.round(t[2]/255*100);return"rgb("+i+"%, "+a+"%, "+o+"%)"}function f(t,e){var i=Math.round(t[0]/255*100),a=Math.round(t[1]/255*100),o=Math.round(t[2]/255*100);return"rgba("+i+"%, "+a+"%, "+o+"%, "+(e||t[3]||1)+")"}function g(t,e){return 1>e||t[3]&&t[3]<1?p(t,e):"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)"}function p(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+e+")"}function m(t,e){return void 0===e&&(e=void 0!==t[3]?t[3]:1),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+(void 0!==e&&1!==e?", "+e:"")+")"}function b(t){return k[t.slice(0,3)]}function v(t,e,i){return Math.min(Math.max(e,t),i)}function x(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}var y=t("color-name");e.exports={getRgba:a,getHsla:o,getRgb:r,getHsl:s,getHwb:n,getAlpha:l,hexString:h,rgbString:d,rgbaString:c,percentString:u,percentaString:f,hslString:g,hslaString:p,hwbString:m,keyword:b};var k={};for(var S in y)k[y[S]]=S},{"color-name":6}],3:[function(t,e,i){var a=t("color-convert"),o=t("chartjs-color-string"),n=function(t){if(t instanceof n)return t;if(!(this instanceof n))return new n(t);this.values={rgb:[0,0,0],hsl:[0,0,0],hsv:[0,0,0],hwb:[0,0,0],cmyk:[0,0,0,0],alpha:1};var e;if("string"==typeof t)if(e=o.getRgba(t))this.setValues("rgb",e);else if(e=o.getHsla(t))this.setValues("hsl",e);else{if(!(e=o.getHwb(t)))throw new Error('Unable to parse color from string "'+t+'"');this.setValues("hwb",e)}else if("object"==typeof t)if(e=t,void 0!==e.r||void 0!==e.red)this.setValues("rgb",e);else if(void 0!==e.l||void 0!==e.lightness)this.setValues("hsl",e);else if(void 0!==e.v||void 0!==e.value)this.setValues("hsv",e);else if(void 0!==e.w||void 0!==e.whiteness)this.setValues("hwb",e);else{if(void 0===e.c&&void 0===e.cyan)throw new Error("Unable to parse color from object "+JSON.stringify(t));this.setValues("cmyk",e)}};n.prototype={rgb:function(){return this.setSpace("rgb",arguments)},hsl:function(){return this.setSpace("hsl",arguments)},hsv:function(){return this.setSpace("hsv",arguments)},hwb:function(){return this.setSpace("hwb",arguments)},cmyk:function(){return this.setSpace("cmyk",arguments)},rgbArray:function(){return this.values.rgb},hslArray:function(){return this.values.hsl},hsvArray:function(){return this.values.hsv},hwbArray:function(){var t=this.values;return 1!==t.alpha?t.hwb.concat([t.alpha]):t.hwb},cmykArray:function(){return this.values.cmyk},rgbaArray:function(){var t=this.values;return t.rgb.concat([t.alpha])},hslaArray:function(){var t=this.values;return t.hsl.concat([t.alpha])},alpha:function(t){return void 0===t?this.values.alpha:(this.setValues("alpha",t),this)},red:function(t){return this.setChannel("rgb",0,t)},green:function(t){return this.setChannel("rgb",1,t)},blue:function(t){return this.setChannel("rgb",2,t)},hue:function(t){return t&&(t%=360,t=0>t?360+t:t),this.setChannel("hsl",0,t)},saturation:function(t){return this.setChannel("hsl",1,t)},lightness:function(t){return this.setChannel("hsl",2,t)},saturationv:function(t){return this.setChannel("hsv",1,t)},whiteness:function(t){return this.setChannel("hwb",1,t)},blackness:function(t){return this.setChannel("hwb",2,t)},value:function(t){return this.setChannel("hsv",2,t)},cyan:function(t){return this.setChannel("cmyk",0,t)},magenta:function(t){return this.setChannel("cmyk",1,t)},yellow:function(t){return this.setChannel("cmyk",2,t)},black:function(t){return this.setChannel("cmyk",3,t)},hexString:function(){return o.hexString(this.values.rgb)},rgbString:function(){return o.rgbString(this.values.rgb,this.values.alpha)},rgbaString:function(){return o.rgbaString(this.values.rgb,this.values.alpha)},percentString:function(){return o.percentString(this.values.rgb,this.values.alpha)},hslString:function(){return o.hslString(this.values.hsl,this.values.alpha)},hslaString:function(){return o.hslaString(this.values.hsl,this.values.alpha)},hwbString:function(){return o.hwbString(this.values.hwb,this.values.alpha)},keyword:function(){return o.keyword(this.values.rgb,this.values.alpha)},rgbNumber:function(){var t=this.values.rgb;return t[0]<<16|t[1]<<8|t[2]},luminosity:function(){for(var t=this.values.rgb,e=[],i=0;i<t.length;i++){var a=t[i]/255;e[i]=.03928>=a?a/12.92:Math.pow((a+.055)/1.055,2.4)}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast:function(t){var e=this.luminosity(),i=t.luminosity();return e>i?(e+.05)/(i+.05):(i+.05)/(e+.05)},level:function(t){var e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},dark:function(){var t=this.values.rgb,e=(299*t[0]+587*t[1]+114*t[2])/1e3;return 128>e},light:function(){return!this.dark()},negate:function(){for(var t=[],e=0;3>e;e++)t[e]=255-this.values.rgb[e];return this.setValues("rgb",t),this},lighten:function(t){var e=this.values.hsl;return e[2]+=e[2]*t,this.setValues("hsl",e),this},darken:function(t){var e=this.values.hsl;return e[2]-=e[2]*t,this.setValues("hsl",e),this},saturate:function(t){var e=this.values.hsl;return e[1]+=e[1]*t,this.setValues("hsl",e),this},desaturate:function(t){var e=this.values.hsl;return e[1]-=e[1]*t,this.setValues("hsl",e),this},whiten:function(t){var e=this.values.hwb;return e[1]+=e[1]*t,this.setValues("hwb",e),this},blacken:function(t){var e=this.values.hwb;return e[2]+=e[2]*t,this.setValues("hwb",e),this},greyscale:function(){var t=this.values.rgb,e=.3*t[0]+.59*t[1]+.11*t[2];return this.setValues("rgb",[e,e,e]),this},clearer:function(t){var e=this.values.alpha;return this.setValues("alpha",e-e*t),this},opaquer:function(t){var e=this.values.alpha;return this.setValues("alpha",e+e*t),this},rotate:function(t){var e=this.values.hsl,i=(e[0]+t)%360;return e[0]=0>i?360+i:i,this.setValues("hsl",e),this},mix:function(t,e){var i=this,a=t,o=void 0===e?.5:e,n=2*o-1,r=i.alpha()-a.alpha(),s=((n*r===-1?n:(n+r)/(1+n*r))+1)/2,l=1-s;return this.rgb(s*i.red()+l*a.red(),s*i.green()+l*a.green(),s*i.blue()+l*a.blue()).alpha(i.alpha()*o+a.alpha()*(1-o))},toJSON:function(){return this.rgb()},clone:function(){var t,e,i=new n,a=this.values,o=i.values;for(var r in a)a.hasOwnProperty(r)&&(t=a[r],e={}.toString.call(t),"[object Array]"===e?o[r]=t.slice(0):"[object Number]"===e?o[r]=t:console.error("unexpected color value:",t));return i}},n.prototype.spaces={rgb:["red","green","blue"],hsl:["hue","saturation","lightness"],hsv:["hue","saturation","value"],hwb:["hue","whiteness","blackness"],cmyk:["cyan","magenta","yellow","black"]},n.prototype.maxes={rgb:[255,255,255],hsl:[360,100,100],hsv:[360,100,100],hwb:[360,100,100],cmyk:[100,100,100,100]},n.prototype.getValues=function(t){for(var e=this.values,i={},a=0;a<t.length;a++)i[t.charAt(a)]=e[t][a];return 1!==e.alpha&&(i.a=e.alpha),i},n.prototype.setValues=function(t,e){var i,o=this.values,n=this.spaces,r=this.maxes,s=1;if("alpha"===t)s=e;else if(e.length)o[t]=e.slice(0,t.length),s=e[t.length];else if(void 0!==e[t.charAt(0)]){for(i=0;i<t.length;i++)o[t][i]=e[t.charAt(i)];s=e.a}else if(void 0!==e[n[t][0]]){var l=n[t];for(i=0;i<t.length;i++)o[t][i]=e[l[i]];s=e.alpha}if(o.alpha=Math.max(0,Math.min(1,void 0===s?o.alpha:s)),"alpha"===t)return!1;var h;for(i=0;i<t.length;i++)h=Math.max(0,Math.min(r[t][i],o[t][i])),o[t][i]=Math.round(h);for(var d in n)d!==t&&(o[d]=a[t][d](o[t]));return!0},n.prototype.setSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i),this)},n.prototype.setChannel=function(t,e,i){var a=this.values[t];return void 0===i?a[e]:i===a[e]?this:(a[e]=i,this.setValues(t,a),this)},"undefined"!=typeof window&&(window.Color=n),e.exports=n},{"chartjs-color-string":2,"color-convert":5}],4:[function(t,e,i){function a(t){var e,i,a,o=t[0]/255,n=t[1]/255,r=t[2]/255,s=Math.min(o,n,r),l=Math.max(o,n,r),h=l-s;return l==s?e=0:o==l?e=(n-r)/h:n==l?e=2+(r-o)/h:r==l&&(e=4+(o-n)/h),e=Math.min(60*e,360),0>e&&(e+=360),a=(s+l)/2,i=l==s?0:.5>=a?h/(l+s):h/(2-l-s),[e,100*i,100*a]}function o(t){var e,i,a,o=t[0],n=t[1],r=t[2],s=Math.min(o,n,r),l=Math.max(o,n,r),h=l-s;return i=0==l?0:h/l*1e3/10,l==s?e=0:o==l?e=(n-r)/h:n==l?e=2+(r-o)/h:r==l&&(e=4+(o-n)/h),e=Math.min(60*e,360),0>e&&(e+=360),a=l/255*1e3/10,[e,i,a]}function n(t){var e=t[0],i=t[1],o=t[2],n=a(t)[0],r=1/255*Math.min(e,Math.min(i,o)),o=1-1/255*Math.max(e,Math.max(i,o));return[n,100*r,100*o]}function s(t){var e,i,a,o,n=t[0]/255,r=t[1]/255,s=t[2]/255;return o=Math.min(1-n,1-r,1-s),e=(1-n-o)/(1-o)||0,i=(1-r-o)/(1-o)||0,a=(1-s-o)/(1-o)||0,[100*e,100*i,100*a,100*o]}function l(t){return G[JSON.stringify(t)]}function h(t){var e=t[0]/255,i=t[1]/255,a=t[2]/255;e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,i=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92,a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92;var o=.4124*e+.3576*i+.1805*a,n=.2126*e+.7152*i+.0722*a,r=.0193*e+.1192*i+.9505*a;return[100*o,100*n,100*r]}function d(t){var e,i,a,o=h(t),n=o[0],r=o[1],s=o[2];return n/=95.047,r/=100,s/=108.883,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,s=s>.008856?Math.pow(s,1/3):7.787*s+16/116,e=116*r-16,i=500*(n-r),a=200*(r-s),[e,i,a]}function c(t){return B(d(t))}function u(t){var e,i,a,o,n,r=t[0]/360,s=t[1]/100,l=t[2]/100;if(0==s)return n=255*l,[n,n,n];i=.5>l?l*(1+s):l+s-l*s,e=2*l-i,o=[0,0,0];for(var h=0;3>h;h++)a=r+1/3*-(h-1),0>a&&a++,a>1&&a--,n=1>6*a?e+6*(i-e)*a:1>2*a?i:2>3*a?e+(i-e)*(2/3-a)*6:e,o[h]=255*n;return o}function f(t){var e,i,a=t[0],o=t[1]/100,n=t[2]/100;return 0===n?[0,0,0]:(n*=2,o*=1>=n?n:2-n,i=(n+o)/2,e=2*o/(n+o),[a,100*e,100*i])}function p(t){return n(u(t))}function m(t){return s(u(t))}function v(t){return l(u(t))}function x(t){var e=t[0]/60,i=t[1]/100,a=t[2]/100,o=Math.floor(e)%6,n=e-Math.floor(e),r=255*a*(1-i),s=255*a*(1-i*n),l=255*a*(1-i*(1-n)),a=255*a;switch(o){case 0:return[a,l,r];case 1:return[s,a,r];case 2:return[r,a,l];case 3:return[r,s,a];case 4:return[l,r,a];case 5:return[a,r,s]}}function y(t){var e,i,a=t[0],o=t[1]/100,n=t[2]/100;return i=(2-o)*n,e=o*n,e/=1>=i?i:2-i,e=e||0,i/=2,[a,100*e,100*i]}function k(t){return n(x(t))}function S(t){return s(x(t))}function C(t){return l(x(t))}function w(t){var e,i,a,o,n=t[0]/360,s=t[1]/100,l=t[2]/100,h=s+l;switch(h>1&&(s/=h,l/=h),e=Math.floor(6*n),i=1-l,a=6*n-e,0!=(1&e)&&(a=1-a),o=s+a*(i-s),e){default:case 6:case 0:r=i,g=o,b=s;break;case 1:r=o,g=i,b=s;break;case 2:r=s,g=i,b=o;break;case 3:r=s,g=o,b=i;break;case 4:r=o,g=s,b=i;break;case 5:r=i,g=s,b=o}return[255*r,255*g,255*b]}function M(t){return a(w(t))}function D(t){return o(w(t))}function A(t){return s(w(t))}function I(t){return l(w(t))}function F(t){var e,i,a,o=t[0]/100,n=t[1]/100,r=t[2]/100,s=t[3]/100;return e=1-Math.min(1,o*(1-s)+s),i=1-Math.min(1,n*(1-s)+s),a=1-Math.min(1,r*(1-s)+s),[255*e,255*i,255*a]}function _(t){return a(F(t))}function P(t){return o(F(t))}function T(t){return n(F(t))}function V(t){return l(F(t))}function R(t){var e,i,a,o=t[0]/100,n=t[1]/100,r=t[2]/100;return e=3.2406*o+-1.5372*n+r*-.4986,i=o*-.9689+1.8758*n+.0415*r,a=.0557*o+n*-.204+1.057*r,e=e>.0031308?1.055*Math.pow(e,1/2.4)-.055:e=12.92*e,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i=12.92*i,a=a>.0031308?1.055*Math.pow(a,1/2.4)-.055:a=12.92*a,e=Math.min(Math.max(0,e),1),i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),[255*e,255*i,255*a]}function O(t){var e,i,a,o=t[0],n=t[1],r=t[2];return o/=95.047,n/=100,r/=108.883,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,e=116*n-16,i=500*(o-n),a=200*(n-r),[e,i,a]}function W(t){return B(O(t))}function L(t){var e,i,a,o,n=t[0],r=t[1],s=t[2];return 8>=n?(i=100*n/903.3,o=7.787*(i/100)+16/116):(i=100*Math.pow((n+16)/116,3),o=Math.pow(i/100,1/3)),e=.008856>=e/95.047?e=95.047*(r/500+o-16/116)/7.787:95.047*Math.pow(r/500+o,3),a=.008859>=a/108.883?a=108.883*(o-s/200-16/116)/7.787:108.883*Math.pow(o-s/200,3),[e,i,a]}function B(t){var e,i,a,o=t[0],n=t[1],r=t[2];return e=Math.atan2(r,n),i=360*e/2/Math.PI,0>i&&(i+=360),a=Math.sqrt(n*n+r*r),[o,a,i]}function z(t){return R(L(t))}function H(t){var e,i,a,o=t[0],n=t[1],r=t[2];return a=r/360*2*Math.PI,e=n*Math.cos(a),i=n*Math.sin(a),[o,e,i]}function N(t){return L(H(t))}function E(t){return z(H(t))}function U(t){return Q[t]}function j(t){return a(U(t))}function q(t){return o(U(t))}function Y(t){return n(U(t))}function J(t){return s(U(t))}function Z(t){return d(U(t))}function X(t){return h(U(t))}e.exports={rgb2hsl:a,rgb2hsv:o,rgb2hwb:n,rgb2cmyk:s,rgb2keyword:l,rgb2xyz:h,rgb2lab:d,rgb2lch:c,hsl2rgb:u,hsl2hsv:f,hsl2hwb:p,hsl2cmyk:m,hsl2keyword:v,hsv2rgb:x,hsv2hsl:y,hsv2hwb:k,hsv2cmyk:S,hsv2keyword:C,hwb2rgb:w,hwb2hsl:M,hwb2hsv:D,hwb2cmyk:A,hwb2keyword:I,cmyk2rgb:F,cmyk2hsl:_,cmyk2hsv:P,cmyk2hwb:T,cmyk2keyword:V,keyword2rgb:U,keyword2hsl:j,keyword2hsv:q,keyword2hwb:Y,keyword2cmyk:J,keyword2lab:Z,keyword2xyz:X,xyz2rgb:R,xyz2lab:O,xyz2lch:W,lab2xyz:L,lab2rgb:z,lab2lch:B,lch2lab:H,lch2xyz:N,lch2rgb:E};var Q={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},G={};for(var $ in Q)G[JSON.stringify(Q[$])]=$},{}],5:[function(t,e,i){var a=t("./conversions"),o=function(){return new h};for(var n in a){o[n+"Raw"]=function(t){return function(e){return"number"==typeof e&&(e=Array.prototype.slice.call(arguments)),a[t](e)}}(n);var r=/(\w+)2(\w+)/.exec(n),s=r[1],l=r[2];o[s]=o[s]||{},o[s][l]=o[n]=function(t){return function(e){"number"==typeof e&&(e=Array.prototype.slice.call(arguments));var i=a[t](e);if("string"==typeof i||void 0===i)return i;for(var o=0;o<i.length;o++)i[o]=Math.round(i[o]);return i}}(n)}var h=function(){this.convs={}};h.prototype.routeSpace=function(t,e){var i=e[0];return void 0===i?this.getValues(t):("number"==typeof i&&(i=Array.prototype.slice.call(e)),this.setValues(t,i))},h.prototype.setValues=function(t,e){return this.space=t,this.convs={},this.convs[t]=e,this},h.prototype.getValues=function(t){var e=this.convs[t];if(!e){var i=this.space,a=this.convs[i];e=o[i][t](a),this.convs[t]=e}return e},["rgb","hsl","hsv","cmyk","keyword"].forEach(function(t){h.prototype[t]=function(e){return this.routeSpace(t,arguments)}}),e.exports=o},{"./conversions":4}],6:[function(t,e,i){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},{}],7:[function(t,e,i){var a=t("./core/core.js")();t("./core/core.helpers")(a),t("./core/core.element")(a),t("./core/core.animation")(a),t("./core/core.controller")(a),t("./core/core.datasetController")(a),t("./core/core.layoutService")(a),t("./core/core.legend")(a),t("./core/core.plugin.js")(a),t("./core/core.scale")(a),t("./core/core.scaleService")(a),t("./core/core.title")(a),t("./core/core.tooltip")(a),t("./elements/element.arc")(a),t("./elements/element.line")(a),t("./elements/element.point")(a),t("./elements/element.rectangle")(a),t("./scales/scale.category")(a),t("./scales/scale.linear")(a),t("./scales/scale.logarithmic")(a),t("./scales/scale.radialLinear")(a),t("./scales/scale.time")(a),t("./controllers/controller.bar")(a),t("./controllers/controller.bubble")(a),t("./controllers/controller.doughnut")(a),t("./controllers/controller.line")(a),t("./controllers/controller.polarArea")(a),t("./controllers/controller.radar")(a),t("./charts/Chart.Bar")(a),t("./charts/Chart.Bubble")(a),t("./charts/Chart.Doughnut")(a),t("./charts/Chart.Line")(a),t("./charts/Chart.PolarArea")(a),t("./charts/Chart.Radar")(a),t("./charts/Chart.Scatter")(a),window.Chart=e.exports=a},{"./charts/Chart.Bar":8,"./charts/Chart.Bubble":9,"./charts/Chart.Doughnut":10,"./charts/Chart.Line":11,"./charts/Chart.PolarArea":12,"./charts/Chart.Radar":13,"./charts/Chart.Scatter":14,"./controllers/controller.bar":15,"./controllers/controller.bubble":16,"./controllers/controller.doughnut":17,"./controllers/controller.line":18,"./controllers/controller.polarArea":19,"./controllers/controller.radar":20,"./core/core.animation":21,"./core/core.controller":22,"./core/core.datasetController":23,"./core/core.element":24,"./core/core.helpers":25,"./core/core.js":26,"./core/core.layoutService":27,"./core/core.legend":28,"./core/core.plugin.js":29,"./core/core.scale":30,"./core/core.scaleService":31,"./core/core.title":32,"./core/core.tooltip":33,"./elements/element.arc":34,"./elements/element.line":35,"./elements/element.point":36,"./elements/element.rectangle":37,"./scales/scale.category":38,"./scales/scale.linear":39,"./scales/scale.logarithmic":40,"./scales/scale.radialLinear":41,"./scales/scale.time":42}],8:[function(t,e,i){"use strict";e.exports=function(t){t.Bar=function(e,i){return i.type="bar",new t(e,i)}}},{}],9:[function(t,e,i){"use strict";e.exports=function(t){t.Bubble=function(e,i){return i.type="bubble",new t(e,i)}}},{}],10:[function(t,e,i){"use strict";e.exports=function(t){t.Doughnut=function(e,i){return i.type="doughnut",new t(e,i)}}},{}],11:[function(t,e,i){"use strict";e.exports=function(t){t.Line=function(e,i){return i.type="line",new t(e,i)}}},{}],12:[function(t,e,i){"use strict";e.exports=function(t){t.PolarArea=function(e,i){return i.type="polarArea",new t(e,i)}}},{}],13:[function(t,e,i){"use strict";e.exports=function(t){t.Radar=function(e,i){return i.options=t.helpers.configMerge({aspectRatio:1},i.options),i.type="radar",new t(e,i)}}},{}],14:[function(t,e,i){"use strict";e.exports=function(t){var e={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-1"}],yAxes:[{type:"linear",position:"left",id:"y-axis-1"}]},tooltips:{callbacks:{title:function(t,e){return""},label:function(t,e){return"("+t.xLabel+", "+t.yLabel+")"}}}};t.defaults.scatter=e,t.controllers.scatter=t.controllers.line,t.Scatter=function(e,i){return i.type="scatter",new t(e,i)}}},{}],15:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bar={hover:{mode:"label"},scales:{xAxes:[{type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}],yAxes:[{type:"linear"}]}},t.controllers.bar=t.DatasetController.extend({dataElementType:t.elements.Rectangle,initialize:function(e,i){t.DatasetController.prototype.initialize.call(this,e,i),this.getMeta().bar=!0},getBarCount:function(){var t=0;return e.each(this.chart.data.datasets,function(e,i){var a=this.chart.getDatasetMeta(i);a.bar&&this.chart.isDatasetVisible(i)&&++t},this),t},update:function(t){e.each(this.getMeta().data,function(e,i){this.updateElement(e,i,t)},this)},updateElement:function(t,i,a){var o=this.getMeta(),n=this.getScaleForId(o.xAxisID),r=this.getScaleForId(o.yAxisID),s=r.getBasePixel(),l=this.chart.options.elements.rectangle,h=t.custom||{},d=this.getDataset();e.extend(t,{_xScale:n,_yScale:r,_datasetIndex:this.index,_index:i,_model:{x:this.calculateBarX(i,this.index),y:a?s:this.calculateBarY(i,this.index),label:this.chart.data.labels[i],datasetLabel:d.label,base:a?s:this.calculateBarBase(this.index,i),width:this.calculateBarWidth(i),backgroundColor:h.backgroundColor?h.backgroundColor:e.getValueAtIndexOrDefault(d.backgroundColor,i,l.backgroundColor),borderSkipped:h.borderSkipped?h.borderSkipped:l.borderSkipped,borderColor:h.borderColor?h.borderColor:e.getValueAtIndexOrDefault(d.borderColor,i,l.borderColor),borderWidth:h.borderWidth?h.borderWidth:e.getValueAtIndexOrDefault(d.borderWidth,i,l.borderWidth)}}),t.pivot()},calculateBarBase:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.yAxisID),o=0;if(a.options.stacked){var n=this.chart,r=n.data.datasets,s=r[t].data[e];if(0>s)for(var l=0;t>l;l++){var h=r[l],d=n.getDatasetMeta(l);d.bar&&d.yAxisID===a.id&&n.isDatasetVisible(l)&&(o+=h.data[e]<0?h.data[e]:0)}else for(var c=0;t>c;c++){var u=r[c],f=n.getDatasetMeta(c);f.bar&&f.yAxisID===a.id&&n.isDatasetVisible(c)&&(o+=u.data[e]>0?u.data[e]:0)}return a.getPixelForValue(o)}return a.getBasePixel()},getRuler:function(t){var e,i=this.getMeta(),a=this.getScaleForId(i.xAxisID),o=this.getBarCount();e="category"===a.options.type?a.getPixelForTick(t+1)-a.getPixelForTick(t):a.width/a.ticks.length;var n=e*a.options.categoryPercentage,r=(e-e*a.options.categoryPercentage)/2,s=n/o;if(a.ticks.length!==this.chart.data.labels.length){var l=a.ticks.length/this.chart.data.labels.length;s*=l}var h=s*a.options.barPercentage,d=s-s*a.options.barPercentage;return{datasetCount:o,tickWidth:e,categoryWidth:n,categorySpacing:r,fullBarWidth:s,barWidth:h,barSpacing:d}},calculateBarWidth:function(t){var e=this.getScaleForId(this.getMeta().xAxisID),i=this.getRuler(t);return e.options.stacked?i.categoryWidth:i.barWidth},getBarIndex:function(t){var e,i,a=0;for(i=0;t>i;++i)e=this.chart.getDatasetMeta(i),e.bar&&this.chart.isDatasetVisible(i)&&++a;return a},calculateBarX:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.xAxisID),o=this.getBarIndex(e),n=this.getRuler(t),r=a.getPixelForValue(null,t,e,this.chart.isCombo);return r-=this.chart.isCombo?n.tickWidth/2:0,a.options.stacked?r+n.categoryWidth/2+n.categorySpacing:r+n.barWidth/2+n.categorySpacing+n.barWidth*o+n.barSpacing/2+n.barSpacing*o},calculateBarY:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.yAxisID),o=this.getDataset().data[t];if(a.options.stacked){for(var n=0,r=0,s=0;e>s;s++){var l=this.chart.data.datasets[s],h=this.chart.getDatasetMeta(s);h.bar&&h.yAxisID===a.id&&this.chart.isDatasetVisible(s)&&(l.data[t]<0?r+=l.data[t]||0:n+=l.data[t]||0)}return 0>o?a.getPixelForValue(r+o):a.getPixelForValue(n+o)}return a.getPixelForValue(o)},draw:function(t){var i=t||1;e.each(this.getMeta().data,function(t,e){var a=this.getDataset().data[e];null===a||void 0===a||isNaN(a)||t.transition(i).draw()},this)},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index,o=t.custom||{},n=t._model;n.backgroundColor=o.hoverBackgroundColor?o.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.hoverBackgroundColor,a,e.getHoverColor(n.backgroundColor)),n.borderColor=o.hoverBorderColor?o.hoverBorderColor:e.getValueAtIndexOrDefault(i.hoverBorderColor,a,e.getHoverColor(n.borderColor)),n.borderWidth=o.hoverBorderWidth?o.hoverBorderWidth:e.getValueAtIndexOrDefault(i.hoverBorderWidth,a,n.borderWidth)},removeHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index,o=t.custom||{},n=t._model,r=this.chart.options.elements.rectangle;n.backgroundColor=o.backgroundColor?o.backgroundColor:e.getValueAtIndexOrDefault(i.backgroundColor,a,r.backgroundColor),n.borderColor=o.borderColor?o.borderColor:e.getValueAtIndexOrDefault(i.borderColor,a,r.borderColor),n.borderWidth=o.borderWidth?o.borderWidth:e.getValueAtIndexOrDefault(i.borderWidth,a,r.borderWidth)}}),t.defaults.horizontalBar={hover:{mode:"label"},scales:{xAxes:[{type:"linear",position:"bottom"}],yAxes:[{position:"left",type:"category",categoryPercentage:.8,barPercentage:.9,gridLines:{offsetGridLines:!0}}]},elements:{rectangle:{borderSkipped:"left"}},tooltips:{callbacks:{title:function(t,e){var i="";return t.length>0&&(t[0].yLabel?i=t[0].yLabel:e.labels.length>0&&t[0].index<e.labels.length&&(i=e.labels[t[0].index])),i},label:function(t,e){var i=e.datasets[t.datasetIndex].label||"";return i+": "+t.xLabel}}}},t.controllers.horizontalBar=t.controllers.bar.extend({updateElement:function(t,i,a,o){var n=this.getMeta(),r=this.getScaleForId(n.xAxisID),s=this.getScaleForId(n.yAxisID),l=r.getBasePixel(),h=t.custom||{},d=this.getDataset(),c=this.chart.options.elements.rectangle;
e.extend(t,{_xScale:r,_yScale:s,_datasetIndex:this.index,_index:i,_model:{x:a?l:this.calculateBarX(i,this.index),y:this.calculateBarY(i,this.index),label:this.chart.data.labels[i],datasetLabel:d.label,base:a?l:this.calculateBarBase(this.index,i),height:this.calculateBarHeight(i),backgroundColor:h.backgroundColor?h.backgroundColor:e.getValueAtIndexOrDefault(d.backgroundColor,i,c.backgroundColor),borderSkipped:h.borderSkipped?h.borderSkipped:c.borderSkipped,borderColor:h.borderColor?h.borderColor:e.getValueAtIndexOrDefault(d.borderColor,i,c.borderColor),borderWidth:h.borderWidth?h.borderWidth:e.getValueAtIndexOrDefault(d.borderWidth,i,c.borderWidth)},draw:function(){function t(t){return l[(d+t)%4]}var e=this._chart.ctx,i=this._view,a=i.height/2,o=i.y-a,n=i.y+a,r=i.base-(i.base-i.x),s=i.borderWidth/2;i.borderWidth&&(o+=s,n-=s,r+=s),e.beginPath(),e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,e.lineWidth=i.borderWidth;var l=[[i.base,n],[i.base,o],[r,o],[r,n]],h=["bottom","left","top","right"],d=h.indexOf(i.borderSkipped,0);-1===d&&(d=0),e.moveTo.apply(e,t(0));for(var c=1;4>c;c++)e.lineTo.apply(e,t(c));e.fill(),i.borderWidth&&e.stroke()},inRange:function(t,e){var i=this._view,a=!1;return i&&(a=i.x<i.base?e>=i.y-i.height/2&&e<=i.y+i.height/2&&t>=i.x&&t<=i.base:e>=i.y-i.height/2&&e<=i.y+i.height/2&&t>=i.base&&t<=i.x),a}}),t.pivot()},calculateBarBase:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.xAxisID),o=0;if(a.options.stacked){var n=this.chart.data.datasets[t].data[e];if(0>n)for(var r=0;t>r;r++){var s=this.chart.data.datasets[r],l=this.chart.getDatasetMeta(r);l.bar&&l.xAxisID===a.id&&this.chart.isDatasetVisible(r)&&(o+=s.data[e]<0?s.data[e]:0)}else for(var h=0;t>h;h++){var d=this.chart.data.datasets[h],c=this.chart.getDatasetMeta(h);c.bar&&c.xAxisID===a.id&&this.chart.isDatasetVisible(h)&&(o+=d.data[e]>0?d.data[e]:0)}return a.getPixelForValue(o)}return a.getBasePixel()},getRuler:function(t){var e,i=this.getMeta(),a=this.getScaleForId(i.yAxisID),o=this.getBarCount();e="category"===a.options.type?a.getPixelForTick(t+1)-a.getPixelForTick(t):a.width/a.ticks.length;var n=e*a.options.categoryPercentage,r=(e-e*a.options.categoryPercentage)/2,s=n/o;if(a.ticks.length!==this.chart.data.labels.length){var l=a.ticks.length/this.chart.data.labels.length;s*=l}var h=s*a.options.barPercentage,d=s-s*a.options.barPercentage;return{datasetCount:o,tickHeight:e,categoryHeight:n,categorySpacing:r,fullBarHeight:s,barHeight:h,barSpacing:d}},calculateBarHeight:function(t){var e=this.getScaleForId(this.getMeta().yAxisID),i=this.getRuler(t);return e.options.stacked?i.categoryHeight:i.barHeight},calculateBarX:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.xAxisID),o=this.getDataset().data[t];if(a.options.stacked){for(var n=0,r=0,s=0;e>s;s++){var l=this.chart.data.datasets[s],h=this.chart.getDatasetMeta(s);h.bar&&h.xAxisID===a.id&&this.chart.isDatasetVisible(s)&&(l.data[t]<0?r+=l.data[t]||0:n+=l.data[t]||0)}return 0>o?a.getPixelForValue(r+o):a.getPixelForValue(n+o)}return a.getPixelForValue(o)},calculateBarY:function(t,e){var i=this.getMeta(),a=this.getScaleForId(i.yAxisID),o=this.getBarIndex(e),n=this.getRuler(t),r=a.getPixelForValue(null,t,e,this.chart.isCombo);return r-=this.chart.isCombo?n.tickHeight/2:0,a.options.stacked?r+n.categoryHeight/2+n.categorySpacing:r+n.barHeight/2+n.categorySpacing+n.barHeight*o+n.barSpacing/2+n.barSpacing*o}})}},{}],16:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.bubble={hover:{mode:"single"},scales:{xAxes:[{type:"linear",position:"bottom",id:"x-axis-0"}],yAxes:[{type:"linear",position:"left",id:"y-axis-0"}]},tooltips:{callbacks:{title:function(t,e){return""},label:function(t,e){var i=e.datasets[t.datasetIndex].label||"",a=e.datasets[t.datasetIndex].data[t.index];return i+": ("+a.x+", "+a.y+", "+a.r+")"}}}},t.controllers.bubble=t.DatasetController.extend({dataElementType:t.elements.Point,update:function(t){var i=this.getMeta(),a=i.data;e.each(a,function(e,i){this.updateElement(e,i,t)},this)},updateElement:function(t,i,a){var o=this.getMeta(),n=this.getScaleForId(o.xAxisID),r=this.getScaleForId(o.yAxisID),s=t.custom||{},l=this.getDataset(),h=l.data[i],d=this.chart.options.elements.point;e.extend(t,{_xScale:n,_yScale:r,_datasetIndex:this.index,_index:i,_model:{x:a?n.getPixelForDecimal(.5):n.getPixelForValue(h,i,this.index,this.chart.isCombo),y:a?r.getBasePixel():r.getPixelForValue(h,i,this.index),radius:a?0:s.radius?s.radius:this.getRadius(h),backgroundColor:s.backgroundColor?s.backgroundColor:e.getValueAtIndexOrDefault(l.backgroundColor,i,d.backgroundColor),borderColor:s.borderColor?s.borderColor:e.getValueAtIndexOrDefault(l.borderColor,i,d.borderColor),borderWidth:s.borderWidth?s.borderWidth:e.getValueAtIndexOrDefault(l.borderWidth,i,d.borderWidth),hitRadius:s.hitRadius?s.hitRadius:e.getValueAtIndexOrDefault(l.hitRadius,i,d.hitRadius)}});var c=t._model;c.skip=s.skip?s.skip:isNaN(c.x)||isNaN(c.y),t.pivot()},getRadius:function(t){return t.r||this.chart.options.elements.point.radius},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index,o=t.custom||{},n=t._model;n.radius=o.hoverRadius?o.hoverRadius:e.getValueAtIndexOrDefault(i.hoverRadius,a,this.chart.options.elements.point.hoverRadius)+this.getRadius(this.getDataset().data[t._index]),n.backgroundColor=o.hoverBackgroundColor?o.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.hoverBackgroundColor,a,e.getHoverColor(n.backgroundColor)),n.borderColor=o.hoverBorderColor?o.hoverBorderColor:e.getValueAtIndexOrDefault(i.hoverBorderColor,a,e.getHoverColor(n.borderColor)),n.borderWidth=o.hoverBorderWidth?o.hoverBorderWidth:e.getValueAtIndexOrDefault(i.hoverBorderWidth,a,n.borderWidth)},removeHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index,o=t.custom||{},n=t._model,r=this.chart.options.elements.point;n.radius=o.radius?o.radius:this.getRadius(i.data[t._index]),n.backgroundColor=o.backgroundColor?o.backgroundColor:e.getValueAtIndexOrDefault(i.backgroundColor,a,r.backgroundColor),n.borderColor=o.borderColor?o.borderColor:e.getValueAtIndexOrDefault(i.borderColor,a,r.borderColor),n.borderWidth=o.borderWidth?o.borderWidth:e.getValueAtIndexOrDefault(i.borderWidth,a,r.borderWidth)}})}},{}],17:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i=t.defaults;i.doughnut={animation:{animateRotate:!0,animateScale:!1},aspectRatio:1,hover:{mode:"single"},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var i=t.data,a=i.datasets,o=i.labels;if(a.length)for(var n=0;n<a[0].data.length;++n)e.push('<li><span style="background-color:'+a[0].backgroundColor[n]+'"></span>'),o[n]&&e.push(o[n]),e.push("</li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var i=t.data;return i.labels.length&&i.datasets.length?i.labels.map(function(a,o){var n=t.getDatasetMeta(0),r=i.datasets[0],s=n.data[o],l=s.custom||{},h=e.getValueAtIndexOrDefault,d=t.options.elements.arc,c=l.backgroundColor?l.backgroundColor:h(r.backgroundColor,o,d.backgroundColor),u=l.borderColor?l.borderColor:h(r.borderColor,o,d.borderColor),f=l.borderWidth?l.borderWidth:h(r.borderWidth,o,d.borderWidth);return{text:a,fillStyle:c,strokeStyle:u,lineWidth:f,hidden:isNaN(r.data[o])||n.data[o].hidden,index:o}}):[]}},onClick:function(t,e){var i,a,o,n=e.index,r=this.chart;for(i=0,a=(r.data.datasets||[]).length;a>i;++i)o=r.getDatasetMeta(i),o.data[n].hidden=!o.data[n].hidden;r.update()}},cutoutPercentage:50,rotation:Math.PI*-.5,circumference:2*Math.PI,tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+e.datasets[t.datasetIndex].data[t.index]}}}},i.pie=e.clone(i.doughnut),e.extend(i.pie,{cutoutPercentage:0}),t.controllers.doughnut=t.controllers.pie=t.DatasetController.extend({dataElementType:t.elements.Arc,linkScales:e.noop,getRingIndex:function(t){for(var e=0,i=0;t>i;++i)this.chart.isDatasetVisible(i)&&++e;return e},update:function(t){var i=this,a=i.chart,o=a.chartArea,n=a.options,r=n.elements.arc,s=o.right-o.left-r.borderWidth,l=o.bottom-o.top-r.borderWidth,h=Math.min(s,l),d={x:0,y:0},c=i.getMeta(),u=n.cutoutPercentage,f=n.circumference;if(f<2*Math.PI){var g=n.rotation%(2*Math.PI);g+=2*Math.PI*(g>=Math.PI?-1:g<-Math.PI?1:0);var p=g+f,m={x:Math.cos(g),y:Math.sin(g)},b={x:Math.cos(p),y:Math.sin(p)},v=0>=g&&p>=0||g<=2*Math.PI&&2*Math.PI<=p,x=g<=.5*Math.PI&&.5*Math.PI<=p||g<=2.5*Math.PI&&2.5*Math.PI<=p,y=g<=-Math.PI&&-Math.PI<=p||g<=Math.PI&&Math.PI<=p,k=g<=.5*-Math.PI&&.5*-Math.PI<=p||g<=1.5*Math.PI&&1.5*Math.PI<=p,S=u/100,C={x:y?-1:Math.min(m.x*(m.x<0?1:S),b.x*(b.x<0?1:S)),y:k?-1:Math.min(m.y*(m.y<0?1:S),b.y*(b.y<0?1:S))},w={x:v?1:Math.max(m.x*(m.x>0?1:S),b.x*(b.x>0?1:S)),y:x?1:Math.max(m.y*(m.y>0?1:S),b.y*(b.y>0?1:S))},M={width:.5*(w.x-C.x),height:.5*(w.y-C.y)};h=Math.min(s/M.width,l/M.height),d={x:(w.x+C.x)*-.5,y:(w.y+C.y)*-.5}}a.outerRadius=Math.max(h/2,0),a.innerRadius=Math.max(u?a.outerRadius/100*u:1,0),a.radiusLength=(a.outerRadius-a.innerRadius)/a.getVisibleDatasetCount(),a.offsetX=d.x*a.outerRadius,a.offsetY=d.y*a.outerRadius,c.total=i.calculateTotal(),i.outerRadius=a.outerRadius-a.radiusLength*i.getRingIndex(i.index),i.innerRadius=i.outerRadius-a.radiusLength,e.each(c.data,function(e,a){i.updateElement(e,a,t)})},updateElement:function(t,i,a){var o=this,n=o.chart,r=n.chartArea,s=n.options,l=s.animation,h=s.elements.arc,d=(r.left+r.right)/2,c=(r.top+r.bottom)/2,u=s.rotation,f=s.rotation,g=o.getDataset(),p=a&&l.animateRotate?0:t.hidden?0:o.calculateCircumference(g.data[i])*(s.circumference/(2*Math.PI)),m=a&&l.animateScale?0:o.innerRadius,b=a&&l.animateScale?0:o.outerRadius,v=t.custom||{},x=e.getValueAtIndexOrDefault;e.extend(t,{_datasetIndex:o.index,_index:i,_model:{x:d+n.offsetX,y:c+n.offsetY,startAngle:u,endAngle:f,circumference:p,outerRadius:b,innerRadius:m,label:x(g.label,i,n.data.labels[i])}});var y=t._model;y.backgroundColor=v.backgroundColor?v.backgroundColor:x(g.backgroundColor,i,h.backgroundColor),y.hoverBackgroundColor=v.hoverBackgroundColor?v.hoverBackgroundColor:x(g.hoverBackgroundColor,i,h.hoverBackgroundColor),y.borderWidth=v.borderWidth?v.borderWidth:x(g.borderWidth,i,h.borderWidth),y.borderColor=v.borderColor?v.borderColor:x(g.borderColor,i,h.borderColor),a&&l.animateRotate||(0===i?y.startAngle=s.rotation:y.startAngle=o.getMeta().data[i-1]._model.endAngle,y.endAngle=y.startAngle+y.circumference),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},calculateTotal:function(){var t,i=this.getDataset(),a=this.getMeta(),o=0;return e.each(a.data,function(e,a){t=i.data[a],isNaN(t)||e.hidden||(o+=Math.abs(t))}),o},calculateCircumference:function(t){var e=this.getMeta().total;return e>0&&!isNaN(t)?2*Math.PI*(t/e):0}})}},{}],18:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.line={showLines:!0,hover:{mode:"label"},scales:{xAxes:[{type:"category",id:"x-axis-0"}],yAxes:[{type:"linear",id:"y-axis-0"}]}},t.controllers.line=t.DatasetController.extend({datasetElementType:t.elements.Line,dataElementType:t.elements.Point,addElementAndReset:function(e){var i=this,a=i.chart.options;t.DatasetController.prototype.addElementAndReset.call(i,e),a.showLines&&0!==a.elements.line.tension&&i.updateBezierControlPoints()},update:function(t){var i,a,o,n,r=this,s=r.getMeta(),l=s.dataset,h=s.data||[],d=r.chart.options,c=d.elements.line,u=r.getScaleForId(s.yAxisID);for(d.showLines&&(o=r.getDataset(),n=l.custom||{},void 0!==o.tension&&void 0===o.lineTension&&(o.lineTension=o.tension),l._scale=u,l._datasetIndex=r.index,l._children=h,l._model={tension:n.tension?n.tension:e.getValueOrDefault(o.lineTension,c.tension),backgroundColor:n.backgroundColor?n.backgroundColor:o.backgroundColor||c.backgroundColor,borderWidth:n.borderWidth?n.borderWidth:o.borderWidth||c.borderWidth,borderColor:n.borderColor?n.borderColor:o.borderColor||c.borderColor,borderCapStyle:n.borderCapStyle?n.borderCapStyle:o.borderCapStyle||c.borderCapStyle,borderDash:n.borderDash?n.borderDash:o.borderDash||c.borderDash,borderDashOffset:n.borderDashOffset?n.borderDashOffset:o.borderDashOffset||c.borderDashOffset,borderJoinStyle:n.borderJoinStyle?n.borderJoinStyle:o.borderJoinStyle||c.borderJoinStyle,fill:n.fill?n.fill:void 0!==o.fill?o.fill:c.fill,scaleTop:u.top,scaleBottom:u.bottom,scaleZero:u.getBasePixel()},l.pivot()),i=0,a=h.length;a>i;++i)r.updateElement(h[i],i,t);d.showLines&&0!==c.tension&&r.updateBezierControlPoints()},getPointBackgroundColor:function(t,i){var a=this.chart.options.elements.point.backgroundColor,o=this.getDataset(),n=t.custom||{};return n.backgroundColor?a=n.backgroundColor:o.pointBackgroundColor?a=e.getValueAtIndexOrDefault(o.pointBackgroundColor,i,a):o.backgroundColor&&(a=o.backgroundColor),a},getPointBorderColor:function(t,i){var a=this.chart.options.elements.point.borderColor,o=this.getDataset(),n=t.custom||{};return n.borderColor?a=n.borderColor:o.pointBorderColor?a=e.getValueAtIndexOrDefault(o.pointBorderColor,i,a):o.borderColor&&(a=o.borderColor),a},getPointBorderWidth:function(t,i){var a=this.chart.options.elements.point.borderWidth,o=this.getDataset(),n=t.custom||{};return n.borderWidth?a=n.borderWidth:o.pointBorderWidth?a=e.getValueAtIndexOrDefault(o.pointBorderWidth,i,a):o.borderWidth&&(a=o.borderWidth),a},updateElement:function(t,i,a){var o,n,r=this,s=r.getMeta(),l=t.custom||{},h=r.getDataset(),d=r.index,c=h.data[i],u=r.getScaleForId(s.yAxisID),f=r.getScaleForId(s.xAxisID),g=r.chart.options.elements.point;void 0!==h.radius&&void 0===h.pointRadius&&(h.pointRadius=h.radius),void 0!==h.hitRadius&&void 0===h.pointHitRadius&&(h.pointHitRadius=h.hitRadius),o=f.getPixelForValue(c,i,d,r.chart.isCombo),n=a?u.getBasePixel():r.calculatePointY(c,i,d,r.chart.isCombo),t._xScale=f,t._yScale=u,t._datasetIndex=d,t._index=i,t._model={x:o,y:n,skip:l.skip||isNaN(o)||isNaN(n),radius:l.radius||e.getValueAtIndexOrDefault(h.pointRadius,i,g.radius),pointStyle:l.pointStyle||e.getValueAtIndexOrDefault(h.pointStyle,i,g.pointStyle),backgroundColor:r.getPointBackgroundColor(t,i),borderColor:r.getPointBorderColor(t,i),borderWidth:r.getPointBorderWidth(t,i),tension:s.dataset._model?s.dataset._model.tension:0,hitRadius:l.hitRadius||e.getValueAtIndexOrDefault(h.pointHitRadius,i,g.hitRadius)}},calculatePointY:function(t,e,i,a){var o,n,r,s=this,l=s.chart,h=s.getMeta(),d=s.getScaleForId(h.yAxisID),c=0,u=0;if(d.options.stacked){for(o=0;i>o;o++)n=l.data.datasets[o],r=l.getDatasetMeta(o),"line"===r.type&&l.isDatasetVisible(o)&&(n.data[e]<0?u+=n.data[e]||0:c+=n.data[e]||0);return 0>t?d.getPixelForValue(u+t):d.getPixelForValue(c+t)}return d.getPixelForValue(t)},updateBezierControlPoints:function(){var t,i,a,o,n,r=this.getMeta(),s=this.chart.chartArea,l=r.data||[];for(t=0,i=l.length;i>t;++t)a=l[t],o=a._model,n=e.splineCurve(e.previousItem(l,t)._model,o,e.nextItem(l,t)._model,r.dataset._model.tension),o.controlPointPreviousX=Math.max(Math.min(n.previous.x,s.right),s.left),o.controlPointPreviousY=Math.max(Math.min(n.previous.y,s.bottom),s.top),o.controlPointNextX=Math.max(Math.min(n.next.x,s.right),s.left),o.controlPointNextY=Math.max(Math.min(n.next.y,s.bottom),s.top),a.pivot()},draw:function(t){var e,i,a=this.getMeta(),o=a.data||[],n=t||1;for(e=0,i=o.length;i>e;++e)o[e].transition(n);for(this.chart.options.showLines&&a.dataset.transition(n).draw(),e=0,i=o.length;i>e;++e)o[e].draw()},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index,o=t.custom||{},n=t._model;n.radius=o.hoverRadius||e.getValueAtIndexOrDefault(i.pointHoverRadius,a,this.chart.options.elements.point.hoverRadius),n.backgroundColor=o.hoverBackgroundColor||e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor,a,e.getHoverColor(n.backgroundColor)),n.borderColor=o.hoverBorderColor||e.getValueAtIndexOrDefault(i.pointHoverBorderColor,a,e.getHoverColor(n.borderColor)),n.borderWidth=o.hoverBorderWidth||e.getValueAtIndexOrDefault(i.pointHoverBorderWidth,a,n.borderWidth)},removeHoverStyle:function(t){var i=this,a=i.chart.data.datasets[t._datasetIndex],o=t._index,n=t.custom||{},r=t._model;void 0!==a.radius&&void 0===a.pointRadius&&(a.pointRadius=a.radius),r.radius=n.radius||e.getValueAtIndexOrDefault(a.pointRadius,o,i.chart.options.elements.point.radius),r.backgroundColor=i.getPointBackgroundColor(t,o),r.borderColor=i.getPointBorderColor(t,o),r.borderWidth=i.getPointBorderWidth(t,o)}})}},{}],19:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.polarArea={scale:{type:"radialLinear",lineArc:!0},animation:{animateRotate:!0,animateScale:!0},aspectRatio:1,legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');var i=t.data,a=i.datasets,o=i.labels;if(a.length)for(var n=0;n<a[0].data.length;++n)e.push('<li><span style="background-color:'+a[0].backgroundColor[n]+'">'),o[n]&&e.push(o[n]),e.push("</span></li>");return e.push("</ul>"),e.join("")},legend:{labels:{generateLabels:function(t){var i=t.data;return i.labels.length&&i.datasets.length?i.labels.map(function(a,o){var n=t.getDatasetMeta(0),r=i.datasets[0],s=n.data[o],l=s.custom||{},h=e.getValueAtIndexOrDefault,d=t.options.elements.arc,c=l.backgroundColor?l.backgroundColor:h(r.backgroundColor,o,d.backgroundColor),u=l.borderColor?l.borderColor:h(r.borderColor,o,d.borderColor),f=l.borderWidth?l.borderWidth:h(r.borderWidth,o,d.borderWidth);return{text:a,fillStyle:c,strokeStyle:u,lineWidth:f,hidden:isNaN(r.data[o])||n.data[o].hidden,index:o}}):[]}},onClick:function(t,e){var i,a,o,n=e.index,r=this.chart;for(i=0,a=(r.data.datasets||[]).length;a>i;++i)o=r.getDatasetMeta(i),o.data[n].hidden=!o.data[n].hidden;r.update()}},tooltips:{callbacks:{title:function(){return""},label:function(t,e){return e.labels[t.index]+": "+t.yLabel}}}},t.controllers.polarArea=t.DatasetController.extend({dataElementType:t.elements.Arc,linkScales:e.noop,update:function(t){var i=this,a=i.chart,o=a.chartArea,n=this.getMeta(),r=a.options,s=r.elements.arc,l=Math.min(o.right-o.left,o.bottom-o.top);a.outerRadius=Math.max((l-s.borderWidth/2)/2,0),a.innerRadius=Math.max(r.cutoutPercentage?a.outerRadius/100*r.cutoutPercentage:1,0),a.radiusLength=(a.outerRadius-a.innerRadius)/a.getVisibleDatasetCount(),i.outerRadius=a.outerRadius-a.radiusLength*i.index,i.innerRadius=i.outerRadius-a.radiusLength,n.count=i.countVisibleElements(),e.each(n.data,function(e,a){i.updateElement(e,a,t)})},updateElement:function(t,i,a){for(var o=this,n=o.chart,r=n.chartArea,s=o.getDataset(),l=n.options,h=l.animation,d=l.elements.arc,c=t.custom||{},u=n.scale,f=e.getValueAtIndexOrDefault,g=n.data.labels,p=o.calculateCircumference(s.data[i]),m=(r.left+r.right)/2,b=(r.top+r.bottom)/2,v=0,x=o.getMeta(),y=0;i>y;++y)isNaN(s.data[y])||x.data[y].hidden||++v;var k=t.hidden?0:u.getDistanceFromCenterForValue(s.data[i]),S=-.5*Math.PI+p*v,C=S+(t.hidden?0:p),w={x:m,y:b,innerRadius:0,outerRadius:h.animateScale?0:u.getDistanceFromCenterForValue(s.data[i]),startAngle:h.animateRotate?Math.PI*-.5:S,endAngle:h.animateRotate?Math.PI*-.5:C,backgroundColor:c.backgroundColor?c.backgroundColor:f(s.backgroundColor,i,d.backgroundColor),borderWidth:c.borderWidth?c.borderWidth:f(s.borderWidth,i,d.borderWidth),borderColor:c.borderColor?c.borderColor:f(s.borderColor,i,d.borderColor),label:f(g,i,g[i])};e.extend(t,{_datasetIndex:o.index,_index:i,_scale:u,_model:a?w:{x:m,y:b,innerRadius:0,outerRadius:k,startAngle:S,endAngle:C,backgroundColor:c.backgroundColor?c.backgroundColor:f(s.backgroundColor,i,d.backgroundColor),borderWidth:c.borderWidth?c.borderWidth:f(s.borderWidth,i,d.borderWidth),borderColor:c.borderColor?c.borderColor:f(s.borderColor,i,d.borderColor),label:f(g,i,g[i])}}),t.pivot()},removeHoverStyle:function(e){t.DatasetController.prototype.removeHoverStyle.call(this,e,this.chart.options.elements.arc)},countVisibleElements:function(){var t=this.getDataset(),i=this.getMeta(),a=0;return e.each(i.data,function(e,i){isNaN(t.data[i])||e.hidden||a++}),a},calculateCircumference:function(t){var e=this.getMeta().count;return e>0&&!isNaN(t)?2*Math.PI/e:0}})}},{}],20:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.radar={scale:{type:"radialLinear"},elements:{line:{tension:0}}},t.controllers.radar=t.DatasetController.extend({datasetElementType:t.elements.Line,dataElementType:t.elements.Point,linkScales:e.noop,addElementAndReset:function(e){t.DatasetController.prototype.addElementAndReset.call(this,e),this.updateBezierControlPoints()},update:function(t){var i=this.getMeta(),a=i.dataset,o=i.data,n=a.custom||{},r=this.getDataset(),s=this.chart.options.elements.line,l=this.chart.scale;void 0!==r.tension&&void 0===r.lineTension&&(r.lineTension=r.tension),e.extend(i.dataset,{_datasetIndex:this.index,_children:o,_loop:!0,_model:{tension:n.tension?n.tension:e.getValueOrDefault(r.lineTension,s.tension),backgroundColor:n.backgroundColor?n.backgroundColor:r.backgroundColor||s.backgroundColor,borderWidth:n.borderWidth?n.borderWidth:r.borderWidth||s.borderWidth,borderColor:n.borderColor?n.borderColor:r.borderColor||s.borderColor,fill:n.fill?n.fill:void 0!==r.fill?r.fill:s.fill,borderCapStyle:n.borderCapStyle?n.borderCapStyle:r.borderCapStyle||s.borderCapStyle,borderDash:n.borderDash?n.borderDash:r.borderDash||s.borderDash,borderDashOffset:n.borderDashOffset?n.borderDashOffset:r.borderDashOffset||s.borderDashOffset,borderJoinStyle:n.borderJoinStyle?n.borderJoinStyle:r.borderJoinStyle||s.borderJoinStyle,scaleTop:l.top,scaleBottom:l.bottom,scaleZero:l.getBasePosition()}}),i.dataset.pivot(),e.each(o,function(e,i){this.updateElement(e,i,t)},this),this.updateBezierControlPoints()},updateElement:function(t,i,a){var o=t.custom||{},n=this.getDataset(),r=this.chart.scale,s=this.chart.options.elements.point,l=r.getPointPositionForValue(i,n.data[i]);e.extend(t,{_datasetIndex:this.index,_index:i,_scale:r,_model:{x:a?r.xCenter:l.x,y:a?r.yCenter:l.y,tension:o.tension?o.tension:e.getValueOrDefault(n.tension,this.chart.options.elements.line.tension),radius:o.radius?o.radius:e.getValueAtIndexOrDefault(n.pointRadius,i,s.radius),backgroundColor:o.backgroundColor?o.backgroundColor:e.getValueAtIndexOrDefault(n.pointBackgroundColor,i,s.backgroundColor),borderColor:o.borderColor?o.borderColor:e.getValueAtIndexOrDefault(n.pointBorderColor,i,s.borderColor),borderWidth:o.borderWidth?o.borderWidth:e.getValueAtIndexOrDefault(n.pointBorderWidth,i,s.borderWidth),pointStyle:o.pointStyle?o.pointStyle:e.getValueAtIndexOrDefault(n.pointStyle,i,s.pointStyle),hitRadius:o.hitRadius?o.hitRadius:e.getValueAtIndexOrDefault(n.hitRadius,i,s.hitRadius)}}),t._model.skip=o.skip?o.skip:isNaN(t._model.x)||isNaN(t._model.y)},updateBezierControlPoints:function(){var t=this.chart.chartArea,i=this.getMeta();e.each(i.data,function(a,o){var n=a._model,r=e.splineCurve(e.previousItem(i.data,o,!0)._model,n,e.nextItem(i.data,o,!0)._model,n.tension);n.controlPointPreviousX=Math.max(Math.min(r.previous.x,t.right),t.left),n.controlPointPreviousY=Math.max(Math.min(r.previous.y,t.bottom),t.top),n.controlPointNextX=Math.max(Math.min(r.next.x,t.right),t.left),n.controlPointNextY=Math.max(Math.min(r.next.y,t.bottom),t.top),a.pivot()},this)},draw:function(t){var i=this.getMeta(),a=t||1;e.each(i.data,function(t,e){t.transition(a)}),i.dataset.transition(a).draw(),e.each(i.data,function(t){t.draw()})},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t.custom||{},o=t._index,n=t._model;n.radius=a.hoverRadius?a.hoverRadius:e.getValueAtIndexOrDefault(i.pointHoverRadius,o,this.chart.options.elements.point.hoverRadius),n.backgroundColor=a.hoverBackgroundColor?a.hoverBackgroundColor:e.getValueAtIndexOrDefault(i.pointHoverBackgroundColor,o,e.getHoverColor(n.backgroundColor)),n.borderColor=a.hoverBorderColor?a.hoverBorderColor:e.getValueAtIndexOrDefault(i.pointHoverBorderColor,o,e.getHoverColor(n.borderColor)),n.borderWidth=a.hoverBorderWidth?a.hoverBorderWidth:e.getValueAtIndexOrDefault(i.pointHoverBorderWidth,o,n.borderWidth)},removeHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t.custom||{},o=t._index,n=t._model,r=this.chart.options.elements.point;n.radius=a.radius?a.radius:e.getValueAtIndexOrDefault(i.radius,o,r.radius),n.backgroundColor=a.backgroundColor?a.backgroundColor:e.getValueAtIndexOrDefault(i.pointBackgroundColor,o,r.backgroundColor),n.borderColor=a.borderColor?a.borderColor:e.getValueAtIndexOrDefault(i.pointBorderColor,o,r.borderColor),n.borderWidth=a.borderWidth?a.borderWidth:e.getValueAtIndexOrDefault(i.pointBorderWidth,o,r.borderWidth)}})}},{}],21:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.animation={duration:1e3,easing:"easeOutQuart",onProgress:e.noop,onComplete:e.noop},t.Animation=t.Element.extend({currentStep:null,numSteps:60,easing:"",render:null,onAnimationProgress:null,onAnimationComplete:null}),t.animationService={frameDuration:17,animations:[],dropFrames:0,request:null,addAnimation:function(t,e,i,a){a||(t.animating=!0);for(var o=0;o<this.animations.length;++o)if(this.animations[o].chartInstance===t)return void(this.animations[o].animationObject=e);this.animations.push({chartInstance:t,animationObject:e}),1===this.animations.length&&this.requestAnimationFrame()},cancelAnimation:function(t){var i=e.findIndex(this.animations,function(e){return e.chartInstance===t});-1!==i&&(this.animations.splice(i,1),t.animating=!1)},requestAnimationFrame:function(){var t=this;null===t.request&&(t.request=e.requestAnimFrame.call(window,function(){t.request=null,t.startDigest()}))},startDigest:function(){var t=Date.now(),e=0;this.dropFrames>1&&(e=Math.floor(this.dropFrames),this.dropFrames=this.dropFrames%1);for(var i=0;i<this.animations.length;)null===this.animations[i].animationObject.currentStep&&(this.animations[i].animationObject.currentStep=0),this.animations[i].animationObject.currentStep+=1+e,this.animations[i].animationObject.currentStep>this.animations[i].animationObject.numSteps&&(this.animations[i].animationObject.currentStep=this.animations[i].animationObject.numSteps),this.animations[i].animationObject.render(this.animations[i].chartInstance,this.animations[i].animationObject),this.animations[i].animationObject.onAnimationProgress&&this.animations[i].animationObject.onAnimationProgress.call&&this.animations[i].animationObject.onAnimationProgress.call(this.animations[i].chartInstance,this.animations[i]),this.animations[i].animationObject.currentStep===this.animations[i].animationObject.numSteps?(this.animations[i].animationObject.onAnimationComplete&&this.animations[i].animationObject.onAnimationComplete.call&&this.animations[i].animationObject.onAnimationComplete.call(this.animations[i].chartInstance,this.animations[i]),this.animations[i].chartInstance.animating=!1,this.animations.splice(i,1)):++i;var a=Date.now(),o=(a-t)/this.frameDuration;this.dropFrames+=o,this.animations.length>0&&this.requestAnimationFrame()}}}},{}],22:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.types={},t.instances={},t.controllers={},t.Controller=function(i){return this.chart=i,this.config=i.config,this.options=this.config.options=e.configMerge(t.defaults.global,t.defaults[this.config.type],this.config.options||{}),this.id=e.uid(),Object.defineProperty(this,"data",{get:function(){return this.config.data}}),t.instances[this.id]=this,this.options.responsive&&this.resize(!0),this.initialize(),this},e.extend(t.Controller.prototype,{initialize:function(){return t.pluginService.notifyPlugins("beforeInit",[this]),this.bindEvents(),this.ensureScalesHaveIDs(),this.buildOrUpdateControllers(),this.buildScales(),this.buildSurroundingItems(),this.updateLayout(),this.resetElements(),this.initToolTip(),this.update(),t.pluginService.notifyPlugins("afterInit",[this]),this},clear:function(){return e.clear(this.chart),this},stop:function(){return t.animationService.cancelAnimation(this),this},resize:function(t){var i=this.chart.canvas,a=e.getMaximumWidth(this.chart.canvas),o=this.options.maintainAspectRatio&&isNaN(this.chart.aspectRatio)===!1&&isFinite(this.chart.aspectRatio)&&0!==this.chart.aspectRatio?a/this.chart.aspectRatio:e.getMaximumHeight(this.chart.canvas),n=this.chart.width!==a||this.chart.height!==o;return n?(i.width=this.chart.width=a,i.height=this.chart.height=o,e.retinaScale(this.chart),t||(this.stop(),this.update(this.options.responsiveAnimationDuration)),this):this},ensureScalesHaveIDs:function(){var t=this.options,i=t.scales||{},a=t.scale;e.each(i.xAxes,function(t,e){t.id=t.id||"x-axis-"+e}),e.each(i.yAxes,function(t,e){t.id=t.id||"y-axis-"+e}),a&&(a.id=a.id||"scale")},buildScales:function(){var i=this,a=i.options,o=i.scales={},n=[];a.scales&&(n=n.concat((a.scales.xAxes||[]).map(function(t){return{options:t,dtype:"category"}}),(a.scales.yAxes||[]).map(function(t){return{options:t,dtype:"linear"}}))),a.scale&&n.push({options:a.scale,dtype:"radialLinear",isDefault:!0}),e.each(n,function(a,n){var r=a.options,s=e.getValueOrDefault(r.type,a.dtype),l=t.scaleService.getScaleConstructor(s);if(l){var h=new l({id:r.id,options:r,ctx:i.chart.ctx,chart:i});o[h.id]=h,a.isDefault&&(i.scale=h)}}),t.scaleService.addScalesToLayout(this)},buildSurroundingItems:function(){this.options.title&&(this.titleBlock=new t.Title({ctx:this.chart.ctx,options:this.options.title,chart:this}),t.layoutService.addBox(this,this.titleBlock)),this.options.legend&&(this.legend=new t.Legend({ctx:this.chart.ctx,options:this.options.legend,chart:this}),t.layoutService.addBox(this,this.legend))},updateLayout:function(){t.layoutService.update(this,this.chart.width,this.chart.height)},buildOrUpdateControllers:function(){var i=[],a=[];if(e.each(this.data.datasets,function(e,o){var n=this.getDatasetMeta(o);n.type||(n.type=e.type||this.config.type),i.push(n.type),n.controller?n.controller.updateIndex(o):(n.controller=new t.controllers[n.type](this,o),a.push(n.controller))},this),i.length>1)for(var o=1;o<i.length;o++)if(i[o]!==i[o-1]){this.isCombo=!0;break}return a},resetElements:function(){e.each(this.data.datasets,function(t,e){this.getDatasetMeta(e).controller.reset()},this)},update:function(i,a){t.pluginService.notifyPlugins("beforeUpdate",[this]),this.tooltip._data=this.data;var o=this.buildOrUpdateControllers();e.each(this.data.datasets,function(t,e){this.getDatasetMeta(e).controller.buildOrUpdateElements()},this),t.layoutService.update(this,this.chart.width,this.chart.height),t.pluginService.notifyPlugins("afterScaleUpdate",[this]),e.each(o,function(t){t.reset()}),e.each(this.data.datasets,function(t,e){this.getDatasetMeta(e).controller.update()},this),t.pluginService.notifyPlugins("afterUpdate",[this]),this.render(i,a)},render:function(i,a){t.pluginService.notifyPlugins("beforeRender",[this]);var o=this.options.animation;if(o&&("undefined"!=typeof i&&0!==i||"undefined"==typeof i&&0!==o.duration)){var n=new t.Animation;n.numSteps=(i||o.duration)/16.66,n.easing=o.easing,n.render=function(t,i){var a=e.easingEffects[i.easing],o=i.currentStep/i.numSteps,n=a(o);t.draw(n,o,i.currentStep)},n.onAnimationProgress=o.onProgress,n.onAnimationComplete=o.onComplete,t.animationService.addAnimation(this,n,i,a)}else this.draw(),o&&o.onComplete&&o.onComplete.call&&o.onComplete.call(this);return this},draw:function(i){var a=i||1;this.clear(),t.pluginService.notifyPlugins("beforeDraw",[this,a]),e.each(this.boxes,function(t){t.draw(this.chartArea)},this),this.scale&&this.scale.draw();var o=this.chart.ctx;o.save(),o.beginPath(),o.rect(this.chartArea.left,this.chartArea.top,this.chartArea.right-this.chartArea.left,this.chartArea.bottom-this.chartArea.top),o.clip(),e.each(this.data.datasets,function(t,e){this.isDatasetVisible(e)&&this.getDatasetMeta(e).controller.draw(i)},this,!0),o.restore(),this.tooltip.transition(a).draw(),t.pluginService.notifyPlugins("afterDraw",[this,a])},getElementAtEvent:function(t){var i=e.getRelativePosition(t,this.chart),a=[];return e.each(this.data.datasets,function(t,o){if(this.isDatasetVisible(o)){var n=this.getDatasetMeta(o);e.each(n.data,function(t,e){
return t.inRange(i.x,i.y)?(a.push(t),a):void 0})}},this),a},getElementsAtEvent:function(t){var i=e.getRelativePosition(t,this.chart),a=[],o=function(){if(this.data.datasets)for(var t=0;t<this.data.datasets.length;t++){var e=this.getDatasetMeta(t);if(this.isDatasetVisible(t))for(var a=0;a<e.data.length;a++)if(e.data[a].inRange(i.x,i.y))return e.data[a]}}.call(this);return o?(e.each(this.data.datasets,function(t,e){if(this.isDatasetVisible(e)){var i=this.getDatasetMeta(e);a.push(i.data[o._index])}},this),a):a},getElementsAtEventForMode:function(t,e){var i=this;switch(e){case"single":return i.getElementAtEvent(t);case"label":return i.getElementsAtEvent(t);case"dataset":return i.getDatasetAtEvent(t);default:return t}},getDatasetAtEvent:function(t){var e=this.getElementAtEvent(t);return e.length>0&&(e=this.getDatasetMeta(e[0]._datasetIndex).data),e},getDatasetMeta:function(t){var e=this.data.datasets[t];e._meta||(e._meta={});var i=e._meta[this.id];return i||(i=e._meta[this.id]={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null}),i},getVisibleDatasetCount:function(){for(var t=0,e=0,i=this.data.datasets.length;i>e;++e)this.isDatasetVisible(e)&&t++;return t},isDatasetVisible:function(t){var e=this.getDatasetMeta(t);return"boolean"==typeof e.hidden?!e.hidden:!this.data.datasets[t].hidden},generateLegend:function(){return this.options.legendCallback(this)},destroy:function(){this.clear(),e.unbindEvents(this,this.events),e.removeResizeListener(this.chart.canvas.parentNode);var i=this.chart.canvas;i.width=this.chart.width,i.height=this.chart.height,void 0!==this.chart.originalDevicePixelRatio&&this.chart.ctx.scale(1/this.chart.originalDevicePixelRatio,1/this.chart.originalDevicePixelRatio),i.style.width=this.chart.originalCanvasStyleWidth,i.style.height=this.chart.originalCanvasStyleHeight,t.pluginService.notifyPlugins("destroy",[this]),delete t.instances[this.id]},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)},initToolTip:function(){this.tooltip=new t.Tooltip({_chart:this.chart,_chartInstance:this,_data:this.data,_options:this.options},this)},bindEvents:function(){e.bindEvents(this,this.options.events,function(t){this.eventHandler(t)})},updateHoverStyle:function(t,e,i){var a,o,n,r=i?"setHoverStyle":"removeHoverStyle";switch(e){case"single":t=[t[0]];break;case"label":case"dataset":break;default:return}for(o=0,n=t.length;n>o;++o)a=t[o],a&&this.getDatasetMeta(a._datasetIndex).controller[r](a)},eventHandler:function(t){var i=this,a=i.tooltip,o=i.options||{},n=o.hover,r=o.tooltips;return i.lastActive=i.lastActive||[],i.lastTooltipActive=i.lastTooltipActive||[],"mouseout"===t.type?(i.active=[],i.tooltipActive=[]):(i.active=i.getElementsAtEventForMode(t,n.mode),i.tooltipActive=i.getElementsAtEventForMode(t,r.mode)),n.onHover&&n.onHover.call(i,i.active),("mouseup"===t.type||"click"===t.type)&&(o.onClick&&o.onClick.call(i,t,i.active),i.legend&&i.legend.handleEvent&&i.legend.handleEvent(t)),i.lastActive.length&&i.updateHoverStyle(i.lastActive,n.mode,!1),i.active.length&&n.mode&&i.updateHoverStyle(i.active,n.mode,!0),(r.enabled||r.custom)&&(a.initialize(),a._active=i.tooltipActive,a.update(!0)),a.pivot(),i.animating||e.arrayEquals(i.active,i.lastActive)&&e.arrayEquals(i.tooltipActive,i.lastTooltipActive)||(i.stop(),(r.enabled||r.custom)&&a.update(!0),i.render(n.animationDuration,!0)),i.lastActive=i.active,i.lastTooltipActive=i.tooltipActive,i}})}},{}],23:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i=e.noop;t.DatasetController=function(t,e){this.initialize.call(this,t,e)},e.extend(t.DatasetController.prototype,{datasetElementType:null,dataElementType:null,initialize:function(t,e){this.chart=t,this.index=e,this.linkScales(),this.addElements()},updateIndex:function(t){this.index=t},linkScales:function(){var t=this.getMeta(),e=this.getDataset();null===t.xAxisID&&(t.xAxisID=e.xAxisID||this.chart.options.scales.xAxes[0].id),null===t.yAxisID&&(t.yAxisID=e.yAxisID||this.chart.options.scales.yAxes[0].id)},getDataset:function(){return this.chart.data.datasets[this.index]},getMeta:function(){return this.chart.getDatasetMeta(this.index)},getScaleForId:function(t){return this.chart.scales[t]},reset:function(){this.update(!0)},createMetaDataset:function(){var t=this,e=t.datasetElementType;return e&&new e({_chart:t.chart.chart,_datasetIndex:t.index})},createMetaData:function(t){var e=this,i=e.dataElementType;return i&&new i({_chart:e.chart.chart,_datasetIndex:e.index,_index:t})},addElements:function(){var t,e,i=this,a=i.getMeta(),o=i.getDataset().data||[],n=a.data;for(t=0,e=o.length;e>t;++t)n[t]=n[t]||i.createMetaData(a,t);a.dataset=a.dataset||i.createMetaDataset()},addElementAndReset:function(t){var e=this,i=e.createMetaData(t);e.getMeta().data.splice(t,0,i),e.updateElement(i,t,!0)},buildOrUpdateElements:function(){var t=this.getMeta(),e=t.data,i=this.getDataset().data.length,a=e.length;if(a>i)e.splice(i,a-i);else if(i>a)for(var o=a;i>o;++o)this.addElementAndReset(o)},update:i,draw:function(t){var i=t||1;e.each(this.getMeta().data,function(t,e){t.transition(i).draw()})},removeHoverStyle:function(t,i){var a=this.chart.data.datasets[t._datasetIndex],o=t._index,n=t.custom||{},r=e.getValueAtIndexOrDefault,s=(e.color,t._model);s.backgroundColor=n.backgroundColor?n.backgroundColor:r(a.backgroundColor,o,i.backgroundColor),s.borderColor=n.borderColor?n.borderColor:r(a.borderColor,o,i.borderColor),s.borderWidth=n.borderWidth?n.borderWidth:r(a.borderWidth,o,i.borderWidth)},setHoverStyle:function(t){var i=this.chart.data.datasets[t._datasetIndex],a=t._index,o=t.custom||{},n=e.getValueAtIndexOrDefault,r=(e.color,e.getHoverColor),s=t._model;s.backgroundColor=o.hoverBackgroundColor?o.hoverBackgroundColor:n(i.hoverBackgroundColor,a,r(s.backgroundColor)),s.borderColor=o.hoverBorderColor?o.hoverBorderColor:n(i.hoverBorderColor,a,r(s.borderColor)),s.borderWidth=o.hoverBorderWidth?o.hoverBorderWidth:n(i.hoverBorderWidth,a,s.borderWidth)}}),t.DatasetController.extend=e.inherits}},{}],24:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.elements={},t.Element=function(t){e.extend(this,t),this.initialize.apply(this,arguments)},e.extend(t.Element.prototype,{initialize:function(){this.hidden=!1},pivot:function(){return this._view||(this._view=e.clone(this._model)),this._start=e.clone(this._view),this},transition:function(t){return this._view||(this._view=e.clone(this._model)),1===t?(this._view=this._model,this._start=null,this):(this._start||this.pivot(),e.each(this._model,function(i,a){if("_"===a[0]);else if(this._view.hasOwnProperty(a))if(i===this._view[a]);else if("string"==typeof i)try{var o=e.color(this._model[a]).mix(e.color(this._start[a]),t);this._view[a]=o.rgbString()}catch(n){this._view[a]=i}else if("number"==typeof i){var r=void 0!==this._start[a]&&isNaN(this._start[a])===!1?this._start[a]:0;this._view[a]=(this._model[a]-r)*t+r}else this._view[a]=i;else"number"!=typeof i||isNaN(this._view[a])?this._view[a]=i:this._view[a]=i*t},this),this)},tooltipPosition:function(){return{x:this._model.x,y:this._model.y}},hasValue:function(){return e.isNumber(this._model.x)&&e.isNumber(this._model.y)}}),t.Element.extend=e.inherits}},{}],25:[function(t,e,i){"use strict";var a=t("chartjs-color");e.exports=function(t){function e(t,e,i){var a;return"string"==typeof t?(a=parseInt(t,10),-1!=t.indexOf("%")&&(a=a/100*e.parentNode[i])):a=t,a}function i(t){return void 0!==t&&null!==t&&"none"!==t}function o(t,a,o){var n=document.defaultView,r=t.parentNode,s=n.getComputedStyle(t)[a],l=n.getComputedStyle(r)[a],h=i(s),d=i(l),c=Number.POSITIVE_INFINITY;return h||d?Math.min(h?e(s,t,o):c,d?e(l,r,o):c):"none"}var n=t.helpers={};n.each=function(t,e,i,a){var o,r;if(n.isArray(t))if(r=t.length,a)for(o=r-1;o>=0;o--)e.call(i,t[o],o);else for(o=0;r>o;o++)e.call(i,t[o],o);else if("object"==typeof t){var s=Object.keys(t);for(r=s.length,o=0;r>o;o++)e.call(i,t[s[o]],s[o])}},n.clone=function(t){var e={};return n.each(t,function(t,i){n.isArray(t)?e[i]=t.slice(0):"object"==typeof t&&null!==t?e[i]=n.clone(t):e[i]=t}),e},n.extend=function(t){for(var e=arguments.length,i=[],a=1;e>a;a++)i.push(arguments[a]);return n.each(i,function(e){n.each(e,function(e,i){t[i]=e})}),t},n.configMerge=function(e){var i=n.clone(e);return n.each(Array.prototype.slice.call(arguments,1),function(e){n.each(e,function(e,a){if("scales"===a)i[a]=n.scaleMerge(i.hasOwnProperty(a)?i[a]:{},e);else if("scale"===a)i[a]=n.configMerge(i.hasOwnProperty(a)?i[a]:{},t.scaleService.getScaleDefaults(e.type),e);else if(i.hasOwnProperty(a)&&n.isArray(i[a])&&n.isArray(e)){var o=i[a];n.each(e,function(t,e){e<o.length?"object"==typeof o[e]&&null!==o[e]&&"object"==typeof t&&null!==t?o[e]=n.configMerge(o[e],t):o[e]=t:o.push(t)})}else i.hasOwnProperty(a)&&"object"==typeof i[a]&&null!==i[a]&&"object"==typeof e?i[a]=n.configMerge(i[a],e):i[a]=e})}),i},n.extendDeep=function(t){function e(t){return n.each(arguments,function(i){i!==t&&n.each(i,function(i,a){t[a]&&t[a].constructor&&t[a].constructor===Object?e(t[a],i):t[a]=i})}),t}return e.apply(this,arguments)},n.scaleMerge=function(e,i){var a=n.clone(e);return n.each(i,function(e,i){"xAxes"===i||"yAxes"===i?a.hasOwnProperty(i)?n.each(e,function(e,o){var r=n.getValueOrDefault(e.type,"xAxes"===i?"category":"linear"),s=t.scaleService.getScaleDefaults(r);o>=a[i].length||!a[i][o].type?a[i].push(n.configMerge(s,e)):e.type&&e.type!==a[i][o].type?a[i][o]=n.configMerge(a[i][o],s,e):a[i][o]=n.configMerge(a[i][o],e)}):(a[i]=[],n.each(e,function(e){var o=n.getValueOrDefault(e.type,"xAxes"===i?"category":"linear");a[i].push(n.configMerge(t.scaleService.getScaleDefaults(o),e))})):a.hasOwnProperty(i)&&"object"==typeof a[i]&&null!==a[i]&&"object"==typeof e?a[i]=n.configMerge(a[i],e):a[i]=e}),a},n.getValueAtIndexOrDefault=function(t,e,i){return void 0===t||null===t?i:n.isArray(t)?e<t.length?t[e]:i:t},n.getValueOrDefault=function(t,e){return void 0===t?e:t},n.indexOf=function(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1},n.where=function(t,e){if(n.isArray(t)&&Array.prototype.filter)return t.filter(e);var i=[];return n.each(t,function(t){e(t)&&i.push(t)}),i},n.findIndex=function(t,e,i){var a=-1;if(Array.prototype.findIndex)a=t.findIndex(e,i);else for(var o=0;o<t.length;++o)if(i=void 0!==i?i:t,e.call(i,t[o],o,t)){a=o;break}return a},n.findNextWhere=function(t,e,i){(void 0===i||null===i)&&(i=-1);for(var a=i+1;a<t.length;a++){var o=t[a];if(e(o))return o}},n.findPreviousWhere=function(t,e,i){(void 0===i||null===i)&&(i=t.length);for(var a=i-1;a>=0;a--){var o=t[a];if(e(o))return o}},n.inherits=function(t){var e=this,i=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},a=function(){this.constructor=i};return a.prototype=e.prototype,i.prototype=new a,i.extend=n.inherits,t&&n.extend(i.prototype,t),i.__super__=e.prototype,i},n.noop=function(){},n.uid=function(){var t=0;return function(){return t++}}(),n.warn=function(t){console&&"function"==typeof console.warn&&console.warn(t)},n.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},n.almostEquals=function(t,e,i){return Math.abs(t-e)<i},n.max=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.max(t,e)},Number.NEGATIVE_INFINITY)},n.min=function(t){return t.reduce(function(t,e){return isNaN(e)?t:Math.min(t,e)},Number.POSITIVE_INFINITY)},n.sign=function(t){return Math.sign?Math.sign(t):(t=+t,0===t||isNaN(t)?t:t>0?1:-1)},n.log10=function(t){return Math.log10?Math.log10(t):Math.log(t)/Math.LN10},n.toRadians=function(t){return t*(Math.PI/180)},n.toDegrees=function(t){return t*(180/Math.PI)},n.getAngleFromPoint=function(t,e){var i=e.x-t.x,a=e.y-t.y,o=Math.sqrt(i*i+a*a),n=Math.atan2(a,i);return n<-.5*Math.PI&&(n+=2*Math.PI),{angle:n,distance:o}},n.aliasPixel=function(t){return t%2===0?0:.5},n.splineCurve=function(t,e,i,a){var o=t.skip?e:t,n=e,r=i.skip?e:i,s=Math.sqrt(Math.pow(n.x-o.x,2)+Math.pow(n.y-o.y,2)),l=Math.sqrt(Math.pow(r.x-n.x,2)+Math.pow(r.y-n.y,2)),h=s/(s+l),d=l/(s+l);h=isNaN(h)?0:h,d=isNaN(d)?0:d;var c=a*h,u=a*d;return{previous:{x:n.x-c*(r.x-o.x),y:n.y-c*(r.y-o.y)},next:{x:n.x+u*(r.x-o.x),y:n.y+u*(r.y-o.y)}}},n.nextItem=function(t,e,i){return i?e>=t.length-1?t[0]:t[e+1]:e>=t.length-1?t[t.length-1]:t[e+1]},n.previousItem=function(t,e,i){return i?0>=e?t[t.length-1]:t[e-1]:0>=e?t[0]:t[e-1]},n.niceNum=function(t,e){var i,a=Math.floor(n.log10(t)),o=t/Math.pow(10,a);return i=e?1.5>o?1:3>o?2:7>o?5:10:1>=o?1:2>=o?2:5>=o?5:10,i*Math.pow(10,a)};var r=n.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:1===(t/=1)?1:(i||(i=.3),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),-(a*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)))},easeOutElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:1===(t/=1)?1:(i||(i=.3),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),a*Math.pow(2,-10*t)*Math.sin((1*t-e)*(2*Math.PI)/i)+1)},easeInOutElastic:function(t){var e=1.70158,i=0,a=1;return 0===t?0:2===(t/=.5)?1:(i||(i=1*(.3*1.5)),a<Math.abs(1)?(a=1,e=i/4):e=i/(2*Math.PI)*Math.asin(1/a),1>t?-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)):a*Math.pow(2,-10*(t-=1))*Math.sin((1*t-e)*(2*Math.PI)/i)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:function(t){return 1-r.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?1*(7.5625*t*t):2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*r.easeInBounce(2*t):.5*r.easeOutBounce(2*t-1)+.5}};n.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),n.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),n.getRelativePosition=function(t,e){var i,a,o=t.originalEvent||t,r=t.currentTarget||t.srcElement,s=r.getBoundingClientRect(),l=o.touches;l&&l.length>0?(i=l[0].clientX,a=l[0].clientY):(i=o.clientX,a=o.clientY);var h=parseFloat(n.getStyle(r,"padding-left")),d=parseFloat(n.getStyle(r,"padding-top")),c=parseFloat(n.getStyle(r,"padding-right")),u=parseFloat(n.getStyle(r,"padding-bottom")),f=s.right-s.left-h-c,g=s.bottom-s.top-d-u;return i=Math.round((i-s.left-h)/f*r.width/e.currentDevicePixelRatio),a=Math.round((a-s.top-d)/g*r.height/e.currentDevicePixelRatio),{x:i,y:a}},n.addEvent=function(t,e,i){t.addEventListener?t.addEventListener(e,i):t.attachEvent?t.attachEvent("on"+e,i):t["on"+e]=i},n.removeEvent=function(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent?t.detachEvent("on"+e,i):t["on"+e]=n.noop},n.bindEvents=function(t,e,i){var a=t.events=t.events||{};n.each(e,function(e){a[e]=function(){i.apply(t,arguments)},n.addEvent(t.chart.canvas,e,a[e])})},n.unbindEvents=function(t,e){var i=t.chart.canvas;n.each(e,function(t,e){n.removeEvent(i,e,t)})},n.getConstraintWidth=function(t){return o(t,"max-width","clientWidth")},n.getConstraintHeight=function(t){return o(t,"max-height","clientHeight")},n.getMaximumWidth=function(t){var e=t.parentNode,i=parseInt(n.getStyle(e,"padding-left"))+parseInt(n.getStyle(e,"padding-right")),a=e.clientWidth-i,o=n.getConstraintWidth(t);return isNaN(o)?a:Math.min(a,o)},n.getMaximumHeight=function(t){var e=t.parentNode,i=parseInt(n.getStyle(e,"padding-top"))+parseInt(n.getStyle(e,"padding-bottom")),a=e.clientHeight-i,o=n.getConstraintHeight(t);return isNaN(o)?a:Math.min(a,o)},n.getStyle=function(t,e){return t.currentStyle?t.currentStyle[e]:document.defaultView.getComputedStyle(t,null).getPropertyValue(e)},n.retinaScale=function(t){var e=t.ctx,i=t.canvas,a=i.width,o=i.height,n=t.currentDevicePixelRatio=window.devicePixelRatio||1;1!==n&&(i.height=o*n,i.width=a*n,e.scale(n,n),t.originalDevicePixelRatio=t.originalDevicePixelRatio||n),i.style.width=a+"px",i.style.height=o+"px"},n.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},n.fontString=function(t,e,i){return e+" "+t+"px "+i},n.longestText=function(t,e,i,a){a=a||{};var o=a.data=a.data||{},r=a.garbageCollect=a.garbageCollect||[];a.font!==e&&(o=a.data={},r=a.garbageCollect=[],a.font=e),t.font=e;var s=0;n.each(i,function(e){if(void 0!==e&&null!==e){var i=o[e];i||(i=o[e]=t.measureText(e).width,r.push(e)),i>s&&(s=i)}});var l=r.length/2;if(l>i.length){for(var h=0;l>h;h++)delete o[r[h]];r.splice(0,l)}return s},n.drawRoundedRectangle=function(t,e,i,a,o,n){t.beginPath(),t.moveTo(e+n,i),t.lineTo(e+a-n,i),t.quadraticCurveTo(e+a,i,e+a,i+n),t.lineTo(e+a,i+o-n),t.quadraticCurveTo(e+a,i+o,e+a-n,i+o),t.lineTo(e+n,i+o),t.quadraticCurveTo(e,i+o,e,i+o-n),t.lineTo(e,i+n),t.quadraticCurveTo(e,i,e+n,i),t.closePath()},n.color=function(e){return a?a(e instanceof CanvasGradient?t.defaults.global.defaultColor:e):(console.log("Color.js not found!"),e)},n.addResizeListener=function(t,e){var i=document.createElement("iframe"),a="chartjs-hidden-iframe";i.classlist?i.classlist.add(a):i.setAttribute("class",a);var o=i.style;o.width="100%",o.display="block",o.border=0,o.height=0,o.margin=0,o.position="absolute",o.left=0,o.right=0,o.top=0,o.bottom=0,t.insertBefore(i,t.firstChild),(i.contentWindow||i).onresize=function(){e&&e()}},n.removeResizeListener=function(t){var e=t.querySelector(".chartjs-hidden-iframe");e&&e.parentNode.removeChild(e)},n.isArray=function(t){return Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)},n.arrayEquals=function(t,e){var i,a,o,r;if(!t||!e||t.length!=e.length)return!1;for(i=0,a=t.length;a>i;++i)if(o=t[i],r=e[i],o instanceof Array&&r instanceof Array){if(!n.arrayEquals(o,r))return!1}else if(o!=r)return!1;return!0},n.pushAllIfDefined=function(t,e){"undefined"!=typeof t&&(n.isArray(t)?e.push.apply(e,t):e.push(t))},n.callCallback=function(t,e,i){t&&"function"==typeof t.call&&t.apply(i,e)},n.getHoverColor=function(t){return t instanceof CanvasPattern?t:n.color(t).saturate(.5).darken(.1).rgbString()}}},{"chartjs-color":3}],26:[function(t,e,i){"use strict";e.exports=function(){var t=function(e,i){this.config=i,e.length&&e[0].getContext&&(e=e[0]),e.getContext&&(e=e.getContext("2d")),this.ctx=e,this.canvas=e.canvas,this.width=e.canvas.width||parseInt(t.helpers.getStyle(e.canvas,"width"))||t.helpers.getMaximumWidth(e.canvas),this.height=e.canvas.height||parseInt(t.helpers.getStyle(e.canvas,"height"))||t.helpers.getMaximumHeight(e.canvas),this.aspectRatio=this.width/this.height,(isNaN(this.aspectRatio)||isFinite(this.aspectRatio)===!1)&&(this.aspectRatio=void 0!==i.aspectRatio?i.aspectRatio:2),this.originalCanvasStyleWidth=e.canvas.style.width,this.originalCanvasStyleHeight=e.canvas.style.height,t.helpers.retinaScale(this),i&&(this.controller=new t.Controller(this));var a=this;return t.helpers.addResizeListener(e.canvas.parentNode,function(){a.controller&&a.controller.config.options.responsive&&a.controller.resize()}),this.controller?this.controller:this};return t.defaults={global:{responsive:!0,responsiveAnimationDuration:0,maintainAspectRatio:!0,events:["mousemove","mouseout","click","touchstart","touchmove"],hover:{onHover:null,mode:"single",animationDuration:400},onClick:null,defaultColor:"rgba(0,0,0,0.1)",defaultFontColor:"#666",defaultFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",defaultFontSize:12,defaultFontStyle:"normal",showLines:!0,elements:{},legendCallback:function(t){var e=[];e.push('<ul class="'+t.id+'-legend">');for(var i=0;i<t.data.datasets.length;i++)e.push('<li><span style="background-color:'+t.data.datasets[i].backgroundColor+'"></span>'),t.data.datasets[i].label&&e.push(t.data.datasets[i].label),e.push("</li>");return e.push("</ul>"),e.join("")}}},t}},{}],27:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.layoutService={defaults:{},addBox:function(t,e){t.boxes||(t.boxes=[]),t.boxes.push(e)},removeBox:function(t,e){t.boxes&&t.boxes.splice(t.boxes.indexOf(e),1)},update:function(t,i,a){function o(t){var e,i=t.isHorizontal();i?(e=t.update(t.options.fullWidth?p:k,y),S-=e.height):(e=t.update(x,v),k-=e.width),C.push({horizontal:i,minSize:e,box:t})}function n(t){var i=e.findNextWhere(C,function(e){return e.box===t});if(i)if(t.isHorizontal()){var a={left:w,right:M,top:0,bottom:0};t.update(t.options.fullWidth?p:k,m/2,a)}else t.update(i.minSize.width,S)}function r(t){var i=e.findNextWhere(C,function(e){return e.box===t}),a={left:0,right:0,top:D,bottom:A};i&&t.update(i.minSize.width,S,a)}function s(t){t.isHorizontal()?(t.left=t.options.fullWidth?l:w,t.right=t.options.fullWidth?i-l:w+k,t.top=P,t.bottom=P+t.height,P=t.bottom):(t.left=_,t.right=_+t.width,t.top=D,t.bottom=D+S,_=t.right)}if(t){var l=0,h=0,d=e.where(t.boxes,function(t){return"left"===t.options.position}),c=e.where(t.boxes,function(t){return"right"===t.options.position}),u=e.where(t.boxes,function(t){return"top"===t.options.position}),f=e.where(t.boxes,function(t){return"bottom"===t.options.position}),g=e.where(t.boxes,function(t){return"chartArea"===t.options.position});u.sort(function(t,e){return(e.options.fullWidth?1:0)-(t.options.fullWidth?1:0)}),f.sort(function(t,e){return(t.options.fullWidth?1:0)-(e.options.fullWidth?1:0)});var p=i-2*l,m=a-2*h,b=p/2,v=m/2,x=(i-b)/(d.length+c.length),y=(a-v)/(u.length+f.length),k=p,S=m,C=[];e.each(d.concat(c,u,f),o);var w=l,M=l,D=h,A=h;e.each(d.concat(c),n),e.each(d,function(t){w+=t.width}),e.each(c,function(t){M+=t.width}),e.each(u.concat(f),n),e.each(u,function(t){D+=t.height}),e.each(f,function(t){A+=t.height}),e.each(d.concat(c),r),w=l,M=l,D=h,A=h,e.each(d,function(t){w+=t.width}),e.each(c,function(t){M+=t.width}),e.each(u,function(t){D+=t.height}),e.each(f,function(t){A+=t.height});var I=a-D-A,F=i-w-M;(F!==k||I!==S)&&(e.each(d,function(t){t.height=I}),e.each(c,function(t){t.height=I}),e.each(u,function(t){t.options.fullWidth||(t.width=F)}),e.each(f,function(t){t.options.fullWidth||(t.width=F)}),S=I,k=F);var _=l,P=h;e.each(d.concat(u),s),_+=k,P+=S,e.each(c,s),e.each(f,s),t.chartArea={left:w,top:D,right:w+k,bottom:D+S},e.each(g,function(e){e.left=t.chartArea.left,e.top=t.chartArea.top,e.right=t.chartArea.right,e.bottom=t.chartArea.bottom,e.update(k,S)})}}}}},{}],28:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i=e.noop;t.defaults.global.legend={display:!0,position:"top",fullWidth:!0,reverse:!1,onClick:function(t,e){var i=e.datasetIndex,a=this.chart,o=a.getDatasetMeta(i);o.hidden=null===o.hidden?!a.data.datasets[i].hidden:null,a.update()},labels:{boxWidth:40,padding:10,generateLabels:function(t){var i=t.data;return e.isArray(i.datasets)?i.datasets.map(function(e,i){return{text:e.label,fillStyle:e.backgroundColor,hidden:!t.isDatasetVisible(i),lineCap:e.borderCapStyle,lineDash:e.borderDash,lineDashOffset:e.borderDashOffset,lineJoin:e.borderJoinStyle,lineWidth:e.borderWidth,strokeStyle:e.borderColor,datasetIndex:i}},this):[]}}},t.Legend=t.Element.extend({initialize:function(t){e.extend(this,t),this.legendHitBoxes=[],this.doughnutMode=!1},beforeUpdate:i,update:function(t,e,i){return this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this.margins=i,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this.beforeBuildLabels(),this.buildLabels(),this.afterBuildLabels(),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate(),this.minSize},afterUpdate:i,beforeSetDimensions:i,setDimensions:function(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0,this.minSize={width:0,height:0}},afterSetDimensions:i,beforeBuildLabels:i,buildLabels:function(){this.legendItems=this.options.labels.generateLabels.call(this,this.chart),this.options.reverse&&this.legendItems.reverse()},afterBuildLabels:i,beforeFit:i,fit:function(){var i=this.options,a=i.labels,o=i.display,n=this.ctx,r=t.defaults.global,s=e.getValueOrDefault,l=s(a.fontSize,r.defaultFontSize),h=s(a.fontStyle,r.defaultFontStyle),d=s(a.fontFamily,r.defaultFontFamily),c=e.fontString(l,h,d),u=this.legendHitBoxes=[],f=this.minSize,g=this.isHorizontal();if(g?(f.width=this.maxWidth,f.height=o?10:0):(f.width=o?10:0,f.height=this.maxHeight),o&&g){var p=this.lineWidths=[0],m=this.legendItems.length?l+a.padding:0;n.textAlign="left",n.textBaseline="top",n.font=c,e.each(this.legendItems,function(t,e){var i=a.boxWidth+l/2+n.measureText(t.text).width;p[p.length-1]+i+a.padding>=this.width&&(m+=l+a.padding,p[p.length]=this.left),u[e]={left:0,top:0,width:i,height:l},p[p.length-1]+=i+a.padding},this),f.height+=m}this.width=f.width,this.height=f.height},afterFit:i,isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},draw:function(){var i=this.options,a=i.labels,o=t.defaults.global,n=o.elements.line,r=this.width,s=this.lineWidths;if(i.display){var l=this.ctx,h={x:this.left+(r-s[0])/2,y:this.top+a.padding,line:0},d=e.getValueOrDefault,c=d(a.fontColor,o.defaultFontColor),u=d(a.fontSize,o.defaultFontSize),f=d(a.fontStyle,o.defaultFontStyle),g=d(a.fontFamily,o.defaultFontFamily),p=e.fontString(u,f,g);if(this.isHorizontal()){l.textAlign="left",l.textBaseline="top",l.lineWidth=.5,l.strokeStyle=c,l.fillStyle=c,l.font=p;var m=a.boxWidth,b=this.legendHitBoxes;e.each(this.legendItems,function(t,e){var i=l.measureText(t.text).width,c=m+u/2+i,f=h.x,g=h.y;f+c>=r&&(g=h.y+=u+a.padding,h.line++,f=h.x=this.left+(r-s[h.line])/2),l.save(),l.fillStyle=d(t.fillStyle,o.defaultColor),l.lineCap=d(t.lineCap,n.borderCapStyle),l.lineDashOffset=d(t.lineDashOffset,n.borderDashOffset),l.lineJoin=d(t.lineJoin,n.borderJoinStyle),l.lineWidth=d(t.lineWidth,n.borderWidth),l.strokeStyle=d(t.strokeStyle,o.defaultColor),l.setLineDash&&l.setLineDash(d(t.lineDash,n.borderDash)),l.strokeRect(f,g,m,u),l.fillRect(f,g,m,u),l.restore(),b[e].left=f,b[e].top=g,l.fillText(t.text,m+u/2+f,g),t.hidden&&(l.beginPath(),l.lineWidth=2,l.moveTo(m+u/2+f,g+u/2),l.lineTo(m+u/2+f+i,g+u/2),l.stroke()),h.x+=c+a.padding},this)}}},handleEvent:function(t){var i=e.getRelativePosition(t,this.chart.chart),a=i.x,o=i.y,n=this.options;if(a>=this.left&&a<=this.right&&o>=this.top&&o<=this.bottom)for(var r=this.legendHitBoxes,s=0;s<r.length;++s){var l=r[s];if(a>=l.left&&a<=l.left+l.width&&o>=l.top&&o<=l.top+l.height){n.onClick&&n.onClick.call(this,t,this.legendItems[s]);break}}}})}},{}],29:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.plugins=[],t.pluginService={register:function(e){var i=t.plugins;-1===i.indexOf(e)&&i.push(e)},remove:function(e){var i=t.plugins,a=i.indexOf(e);-1!==a&&i.splice(a,1)},notifyPlugins:function(i,a,o){e.each(t.plugins,function(t){t[i]&&"function"==typeof t[i]&&t[i].apply(o,a)},o)}};var i=e.noop;t.PluginBase=t.Element.extend({beforeInit:i,afterInit:i,beforeUpdate:i,afterUpdate:i,beforeDraw:i,afterDraw:i,destroy:i})}},{}],30:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.scale={display:!0,position:"left",gridLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1,drawBorder:!0,drawOnChartArea:!0,drawTicks:!0,tickMarkLength:10,zeroLineWidth:1,zeroLineColor:"rgba(0,0,0,0.25)",offsetGridLines:!1},scaleLabel:{labelString:"",display:!1},ticks:{beginAtZero:!1,minRotation:0,maxRotation:50,mirror:!1,padding:10,reverse:!1,display:!0,autoSkip:!0,autoSkipPadding:0,labelOffset:0,callback:function(t){return""+t}}},t.Scale=t.Element.extend({beforeUpdate:function(){e.callCallback(this.options.beforeUpdate,[this])},update:function(t,i,a){return this.beforeUpdate(),this.maxWidth=t,this.maxHeight=i,this.margins=e.extend({left:0,right:0,top:0,bottom:0},a),this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this.beforeBuildTicks(),this.buildTicks(),this.afterBuildTicks(),this.beforeTickToLabelConversion(),this.convertTicksToLabels(),this.afterTickToLabelConversion(),this.beforeCalculateTickRotation(),this.calculateTickRotation(),this.afterCalculateTickRotation(),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate(),this.minSize},afterUpdate:function(){e.callCallback(this.options.afterUpdate,[this])},beforeSetDimensions:function(){e.callCallback(this.options.beforeSetDimensions,[this])},setDimensions:function(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0},afterSetDimensions:function(){e.callCallback(this.options.afterSetDimensions,[this])},beforeDataLimits:function(){e.callCallback(this.options.beforeDataLimits,[this])},determineDataLimits:e.noop,afterDataLimits:function(){e.callCallback(this.options.afterDataLimits,[this])},beforeBuildTicks:function(){e.callCallback(this.options.beforeBuildTicks,[this])},buildTicks:e.noop,afterBuildTicks:function(){e.callCallback(this.options.afterBuildTicks,[this])},beforeTickToLabelConversion:function(){e.callCallback(this.options.beforeTickToLabelConversion,[this])},convertTicksToLabels:function(){this.ticks=this.ticks.map(function(t,e,i){return this.options.ticks.userCallback?this.options.ticks.userCallback(t,e,i):this.options.ticks.callback(t,e,i)},this)},afterTickToLabelConversion:function(){e.callCallback(this.options.afterTickToLabelConversion,[this])},beforeCalculateTickRotation:function(){e.callCallback(this.options.beforeCalculateTickRotation,[this])},calculateTickRotation:function(){var i=this.ctx,a=t.defaults.global,o=this.options.ticks,n=e.getValueOrDefault(o.fontSize,a.defaultFontSize),r=e.getValueOrDefault(o.fontStyle,a.defaultFontStyle),s=e.getValueOrDefault(o.fontFamily,a.defaultFontFamily),l=e.fontString(n,r,s);i.font=l;var h,d=i.measureText(this.ticks[0]).width,c=i.measureText(this.ticks[this.ticks.length-1]).width;if(this.labelRotation=o.minRotation||0,this.paddingRight=0,this.paddingLeft=0,this.options.display&&this.isHorizontal()){this.paddingRight=c/2+3,this.paddingLeft=d/2+3,this.longestTextCache||(this.longestTextCache={});for(var u,f,g=e.longestText(i,l,this.ticks,this.longestTextCache),p=g,m=this.getPixelForTick(1)-this.getPixelForTick(0)-6;p>m&&this.labelRotation<o.maxRotation;){
if(u=Math.cos(e.toRadians(this.labelRotation)),f=Math.sin(e.toRadians(this.labelRotation)),h=u*d,h+n/2>this.yLabelWidth&&(this.paddingLeft=h+n/2),this.paddingRight=n/2,f*g>this.maxHeight){this.labelRotation--;break}this.labelRotation++,p=u*g}}this.margins&&(this.paddingLeft=Math.max(this.paddingLeft-this.margins.left,0),this.paddingRight=Math.max(this.paddingRight-this.margins.right,0))},afterCalculateTickRotation:function(){e.callCallback(this.options.afterCalculateTickRotation,[this])},beforeFit:function(){e.callCallback(this.options.beforeFit,[this])},fit:function(){var i=this.minSize={width:0,height:0},a=this.options,o=t.defaults.global,n=a.ticks,r=a.scaleLabel,s=a.display,l=this.isHorizontal(),h=e.getValueOrDefault(n.fontSize,o.defaultFontSize),d=e.getValueOrDefault(n.fontStyle,o.defaultFontStyle),c=e.getValueOrDefault(n.fontFamily,o.defaultFontFamily),u=e.fontString(h,d,c),f=e.getValueOrDefault(r.fontSize,o.defaultFontSize),g=e.getValueOrDefault(r.fontStyle,o.defaultFontStyle),p=e.getValueOrDefault(r.fontFamily,o.defaultFontFamily),m=(e.fontString(f,g,p),a.gridLines.tickMarkLength);if(l?i.width=this.isFullWidth()?this.maxWidth-this.margins.left-this.margins.right:this.maxWidth:i.width=s?m:0,l?i.height=s?m:0:i.height=this.maxHeight,r.display&&s&&(l?i.height+=1.5*f:i.width+=1.5*f),n.display&&s){this.longestTextCache||(this.longestTextCache={});var b=e.longestText(this.ctx,u,this.ticks,this.longestTextCache);if(l){this.longestLabelWidth=b;var v=Math.sin(e.toRadians(this.labelRotation))*this.longestLabelWidth+1.5*h;i.height=Math.min(this.maxHeight,i.height+v),this.ctx.font=u;var x=this.ctx.measureText(this.ticks[0]).width,y=this.ctx.measureText(this.ticks[this.ticks.length-1]).width,k=Math.cos(e.toRadians(this.labelRotation)),S=Math.sin(e.toRadians(this.labelRotation));this.paddingLeft=0!==this.labelRotation?k*x+3:x/2+3,this.paddingRight=0!==this.labelRotation?S*(h/2)+3:y/2+3}else{var C=this.maxWidth-i.width,w=n.mirror;w?b=0:b+=this.options.ticks.padding,C>b?i.width+=b:i.width=this.maxWidth,this.paddingTop=h/2,this.paddingBottom=h/2}}this.margins&&(this.paddingLeft=Math.max(this.paddingLeft-this.margins.left,0),this.paddingTop=Math.max(this.paddingTop-this.margins.top,0),this.paddingRight=Math.max(this.paddingRight-this.margins.right,0),this.paddingBottom=Math.max(this.paddingBottom-this.margins.bottom,0)),this.width=i.width,this.height=i.height},afterFit:function(){e.callCallback(this.options.afterFit,[this])},isHorizontal:function(){return"top"===this.options.position||"bottom"===this.options.position},isFullWidth:function(){return this.options.fullWidth},getRightValue:function i(t){return null===t||"undefined"==typeof t?NaN:"number"==typeof t&&isNaN(t)?NaN:"object"==typeof t?t instanceof Date||t.isValid?t:i(this.isHorizontal()?t.x:t.y):t},getLabelForIndex:e.noop,getPixelForValue:e.noop,getValueForPixel:e.noop,getPixelForTick:function(t,e){if(this.isHorizontal()){var i=this.width-(this.paddingLeft+this.paddingRight),a=i/Math.max(this.ticks.length-(this.options.gridLines.offsetGridLines?0:1),1),o=a*t+this.paddingLeft;e&&(o+=a/2);var n=this.left+Math.round(o);return n+=this.isFullWidth()?this.margins.left:0}var r=this.height-(this.paddingTop+this.paddingBottom);return this.top+t*(r/(this.ticks.length-1))},getPixelForDecimal:function(t){if(this.isHorizontal()){var e=this.width-(this.paddingLeft+this.paddingRight),i=e*t+this.paddingLeft,a=this.left+Math.round(i);return a+=this.isFullWidth()?this.margins.left:0}return this.top+t*this.height},getBasePixel:function(){var t=this,e=t.min,i=t.max;return t.getPixelForValue(t.beginAtZero?0:0>e&&0>i?i:e>0&&i>0?e:0)},draw:function(i){var a=this.options;if(a.display){var o,n,r,s,l,h=this.ctx,d=t.defaults.global,c=a.ticks,u=a.gridLines,f=a.scaleLabel,g=0!==this.labelRotation,p=c.autoSkip;c.maxTicksLimit&&(l=c.maxTicksLimit);var m=e.getValueOrDefault(c.fontColor,d.defaultFontColor),b=e.getValueOrDefault(c.fontSize,d.defaultFontSize),v=e.getValueOrDefault(c.fontStyle,d.defaultFontStyle),x=e.getValueOrDefault(c.fontFamily,d.defaultFontFamily),y=e.fontString(b,v,x),k=u.tickMarkLength,S=e.getValueOrDefault(f.fontColor,d.defaultFontColor),C=e.getValueOrDefault(f.fontSize,d.defaultFontSize),w=e.getValueOrDefault(f.fontStyle,d.defaultFontStyle),M=e.getValueOrDefault(f.fontFamily,d.defaultFontFamily),D=e.fontString(C,w,M),A=e.toRadians(this.labelRotation),I=Math.cos(A),F=(Math.sin(A),this.longestLabelWidth*I);if(h.fillStyle=m,this.isHorizontal()){o=!0;var _="bottom"===a.position?this.top:this.bottom-k,P="bottom"===a.position?this.top+k:this.bottom;if(n=!1,g&&(F/=2),(F+c.autoSkipPadding)*this.ticks.length>this.width-(this.paddingLeft+this.paddingRight)&&(n=1+Math.floor((F+c.autoSkipPadding)*this.ticks.length/(this.width-(this.paddingLeft+this.paddingRight)))),l&&this.ticks.length>l)for(;!n||this.ticks.length/(n||1)>l;)n||(n=1),n+=1;p||(n=!1),e.each(this.ticks,function(t,r){var s=this.ticks.length===r+1,l=n>1&&r%n>0||r%n===0&&r+n>=this.ticks.length;if((!l||s)&&void 0!==t&&null!==t){var d=this.getPixelForTick(r),f=this.getPixelForTick(r,u.offsetGridLines);u.display&&(r===("undefined"!=typeof this.zeroLineIndex?this.zeroLineIndex:0)?(h.lineWidth=u.zeroLineWidth,h.strokeStyle=u.zeroLineColor,o=!0):o&&(h.lineWidth=u.lineWidth,h.strokeStyle=u.color,o=!1),d+=e.aliasPixel(h.lineWidth),h.beginPath(),u.drawTicks&&(h.moveTo(d,_),h.lineTo(d,P)),u.drawOnChartArea&&(h.moveTo(d,i.top),h.lineTo(d,i.bottom)),h.stroke()),c.display&&(h.save(),h.translate(f+c.labelOffset,g?this.top+12:"top"===a.position?this.bottom-k:this.top+k),h.rotate(-1*A),h.font=y,h.textAlign=g?"right":"center",h.textBaseline=g?"middle":"top"===a.position?"bottom":"top",h.fillText(t,0,0),h.restore())}},this),f.display&&(h.textAlign="center",h.textBaseline="middle",h.fillStyle=S,h.font=D,r=this.left+(this.right-this.left)/2,s="bottom"===a.position?this.bottom-C/2:this.top+C/2,h.fillText(f.labelString,r,s))}else{o=!0;var T="right"===a.position?this.left:this.right-5,V="right"===a.position?this.left+5:this.right;if(e.each(this.ticks,function(t,n){if(void 0!==t&&null!==t){var r=this.getPixelForTick(n);if(u.display&&(n===("undefined"!=typeof this.zeroLineIndex?this.zeroLineIndex:0)?(h.lineWidth=u.zeroLineWidth,h.strokeStyle=u.zeroLineColor,o=!0):o&&(h.lineWidth=u.lineWidth,h.strokeStyle=u.color,o=!1),r+=e.aliasPixel(h.lineWidth),h.beginPath(),u.drawTicks&&(h.moveTo(T,r),h.lineTo(V,r)),u.drawOnChartArea&&(h.moveTo(i.left,r),h.lineTo(i.right,r)),h.stroke()),c.display){var s,l=this.getPixelForTick(n,u.offsetGridLines);h.save(),"left"===a.position?c.mirror?(s=this.right+c.padding,h.textAlign="left"):(s=this.right-c.padding,h.textAlign="right"):c.mirror?(s=this.left-c.padding,h.textAlign="right"):(s=this.left+c.padding,h.textAlign="left"),h.translate(s,l+c.labelOffset),h.rotate(-1*A),h.font=y,h.textBaseline="middle",h.fillText(t,0,0),h.restore()}}},this),f.display){r="left"===a.position?this.left+C/2:this.right-C/2,s=this.top+(this.bottom-this.top)/2;var R="left"===a.position?-.5*Math.PI:.5*Math.PI;h.save(),h.translate(r,s),h.rotate(R),h.textAlign="center",h.fillStyle=S,h.font=D,h.textBaseline="middle",h.fillText(f.labelString,0,0),h.restore()}}if(u.drawBorder){h.lineWidth=u.lineWidth,h.strokeStyle=u.color;var O=this.left,W=this.right,L=this.top,B=this.bottom,z=e.aliasPixel(h.lineWidth);this.isHorizontal()?(L=B="top"===a.position?this.bottom:this.top,L+=z,B+=z):(O=W="left"===a.position?this.right:this.left,O+=z,W+=z),h.beginPath(),h.moveTo(O,L),h.lineTo(W,B),h.stroke()}}}})}},{}],31:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.scaleService={constructors:{},defaults:{},registerScaleType:function(t,i,a){this.constructors[t]=i,this.defaults[t]=e.clone(a)},getScaleConstructor:function(t){return this.constructors.hasOwnProperty(t)?this.constructors[t]:void 0},getScaleDefaults:function(i){return this.defaults.hasOwnProperty(i)?e.scaleMerge(t.defaults.scale,this.defaults[i]):{}},updateScaleDefaults:function(t,i){var a=this.defaults;a.hasOwnProperty(t)&&(a[t]=e.extend(a[t],i))},addScalesToLayout:function(i){e.each(i.scales,function(e){t.layoutService.addBox(i,e)})}}}},{}],32:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers;t.defaults.global.title={display:!1,position:"top",fullWidth:!0,fontStyle:"bold",padding:10,text:""};var i=e.noop;t.Title=t.Element.extend({initialize:function(i){e.extend(this,i),this.options=e.configMerge(t.defaults.global.title,i.options),this.legendHitBoxes=[]},beforeUpdate:i,update:function(t,e,i){return this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this.margins=i,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this.beforeBuildLabels(),this.buildLabels(),this.afterBuildLabels(),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate(),this.minSize},afterUpdate:i,beforeSetDimensions:i,setDimensions:function(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0,this.minSize={width:0,height:0}},afterSetDimensions:i,beforeBuildLabels:i,buildLabels:i,afterBuildLabels:i,beforeFit:i,fit:function(){var i=this,a=(i.ctx,e.getValueOrDefault),o=i.options,n=t.defaults.global,r=o.display,s=a(o.fontSize,n.defaultFontSize),l=i.minSize;i.isHorizontal()?(l.width=i.maxWidth,l.height=r?s+2*o.padding:0):(l.width=r?s+2*o.padding:0,l.height=i.maxHeight),i.width=l.width,i.height=l.height},afterFit:i,isHorizontal:function(){var t=this.options.position;return"top"===t||"bottom"===t},draw:function(){var i=this,a=i.ctx,o=e.getValueOrDefault,n=i.options,r=t.defaults.global;if(n.display){var s,l,h=o(n.fontSize,r.defaultFontSize),d=o(n.fontStyle,r.defaultFontStyle),c=o(n.fontFamily,r.defaultFontFamily),u=e.fontString(h,d,c),f=0,g=i.top,p=i.left,m=i.bottom,b=i.right;a.fillStyle=o(n.fontColor,r.defaultFontColor),a.font=u,i.isHorizontal()?(s=p+(b-p)/2,l=g+(m-g)/2):(s="left"===n.position?p+h/2:b-h/2,l=g+(m-g)/2,f=Math.PI*("left"===n.position?-.5:.5)),a.save(),a.translate(s,l),a.rotate(f),a.textAlign="center",a.textBaseline="middle",a.fillText(n.text,0,0),a.restore()}}})}},{}],33:[function(t,e,i){"use strict";e.exports=function(t){function e(t,e){return e&&(i.isArray(e)?t=t.concat(e):t.push(e)),t}var i=t.helpers;t.defaults.global.tooltips={enabled:!0,custom:null,mode:"single",backgroundColor:"rgba(0,0,0,0.8)",titleFontStyle:"bold",titleSpacing:2,titleMarginBottom:6,titleColor:"#fff",titleAlign:"left",bodySpacing:2,bodyColor:"#fff",bodyAlign:"left",footerFontStyle:"bold",footerSpacing:2,footerMarginTop:6,footerColor:"#fff",footerAlign:"left",yPadding:6,xPadding:6,yAlign:"center",xAlign:"center",caretSize:5,cornerRadius:6,multiKeyBackground:"#fff",callbacks:{beforeTitle:i.noop,title:function(t,e){var i="";return t.length>0&&(t[0].xLabel?i=t[0].xLabel:e.labels.length>0&&t[0].index<e.labels.length&&(i=e.labels[t[0].index])),i},afterTitle:i.noop,beforeBody:i.noop,beforeLabel:i.noop,label:function(t,e){var i=e.datasets[t.datasetIndex].label||"";return i+": "+t.yLabel},afterLabel:i.noop,afterBody:i.noop,beforeFooter:i.noop,footer:i.noop,afterFooter:i.noop}},t.Tooltip=t.Element.extend({initialize:function(){var e=t.defaults.global,a=this._options,o=a.tooltips;i.extend(this,{_model:{xPadding:o.xPadding,yPadding:o.yPadding,xAlign:o.yAlign,yAlign:o.xAlign,bodyColor:o.bodyColor,_bodyFontFamily:i.getValueOrDefault(o.bodyFontFamily,e.defaultFontFamily),_bodyFontStyle:i.getValueOrDefault(o.bodyFontStyle,e.defaultFontStyle),_bodyAlign:o.bodyAlign,bodyFontSize:i.getValueOrDefault(o.bodyFontSize,e.defaultFontSize),bodySpacing:o.bodySpacing,titleColor:o.titleColor,_titleFontFamily:i.getValueOrDefault(o.titleFontFamily,e.defaultFontFamily),_titleFontStyle:i.getValueOrDefault(o.titleFontStyle,e.defaultFontStyle),titleFontSize:i.getValueOrDefault(o.titleFontSize,e.defaultFontSize),_titleAlign:o.titleAlign,titleSpacing:o.titleSpacing,titleMarginBottom:o.titleMarginBottom,footerColor:o.footerColor,_footerFontFamily:i.getValueOrDefault(o.footerFontFamily,e.defaultFontFamily),_footerFontStyle:i.getValueOrDefault(o.footerFontStyle,e.defaultFontStyle),footerFontSize:i.getValueOrDefault(o.footerFontSize,e.defaultFontSize),_footerAlign:o.footerAlign,footerSpacing:o.footerSpacing,footerMarginTop:o.footerMarginTop,caretSize:o.caretSize,cornerRadius:o.cornerRadius,backgroundColor:o.backgroundColor,opacity:0,legendColorBackground:o.multiKeyBackground}})},getTitle:function(){var t=this._options.tooltips.callbacks.beforeTitle.apply(this,arguments),i=this._options.tooltips.callbacks.title.apply(this,arguments),a=this._options.tooltips.callbacks.afterTitle.apply(this,arguments),o=[];return o=e(o,t),o=e(o,i),o=e(o,a)},getBeforeBody:function(){var t=this._options.tooltips.callbacks.beforeBody.apply(this,arguments);return i.isArray(t)?t:void 0!==t?[t]:[]},getBody:function(t,e){var a=[];return i.each(t,function(t){i.pushAllIfDefined(this._options.tooltips.callbacks.beforeLabel.call(this,t,e),a),i.pushAllIfDefined(this._options.tooltips.callbacks.label.call(this,t,e),a),i.pushAllIfDefined(this._options.tooltips.callbacks.afterLabel.call(this,t,e),a)},this),a},getAfterBody:function(){var t=this._options.tooltips.callbacks.afterBody.apply(this,arguments);return i.isArray(t)?t:void 0!==t?[t]:[]},getFooter:function(){var t=this._options.tooltips.callbacks.beforeFooter.apply(this,arguments),i=this._options.tooltips.callbacks.footer.apply(this,arguments),a=this._options.tooltips.callbacks.afterFooter.apply(this,arguments),o=[];return o=e(o,t),o=e(o,i),o=e(o,a)},getAveragePosition:function(t){if(!t.length)return!1;var e=[],a=[];i.each(t,function(t){if(t&&t.hasValue()){var i=t.tooltipPosition();e.push(i.x),a.push(i.y)}});for(var o=0,n=0,r=0;r<e.length;r++)o+=e[r],n+=a[r];return{x:Math.round(o/e.length),y:Math.round(n/e.length)}},update:function(t){if(this._active.length){this._model.opacity=1;var e,a=this._active[0],o=[],n=[];if("single"===this._options.tooltips.mode){var r=a._yScale||a._scale;n.push({xLabel:a._xScale?a._xScale.getLabelForIndex(a._index,a._datasetIndex):"",yLabel:r?r.getLabelForIndex(a._index,a._datasetIndex):"",index:a._index,datasetIndex:a._datasetIndex}),e=this.getAveragePosition(this._active)}else i.each(this._data.datasets,function(t,e){if(this._chartInstance.isDatasetVisible(e)){var i=this._chartInstance.getDatasetMeta(e),o=i.data[a._index];if(o){var r=a._yScale||a._scale;n.push({xLabel:o._xScale?o._xScale.getLabelForIndex(o._index,o._datasetIndex):"",yLabel:r?r.getLabelForIndex(o._index,o._datasetIndex):"",index:a._index,datasetIndex:e})}}},this),i.each(this._active,function(t){t&&o.push({borderColor:t._view.borderColor,backgroundColor:t._view.backgroundColor})},null),e=this.getAveragePosition(this._active);i.extend(this._model,{title:this.getTitle(n,this._data),beforeBody:this.getBeforeBody(n,this._data),body:this.getBody(n,this._data),afterBody:this.getAfterBody(n,this._data),footer:this.getFooter(n,this._data)}),i.extend(this._model,{x:Math.round(e.x),y:Math.round(e.y),caretPadding:i.getValueOrDefault(e.padding,2),labelColors:o});var s=this.getTooltipSize(this._model);this.determineAlignment(s),i.extend(this._model,this.getBackgroundPoint(this._model,s))}else this._model.opacity=0;return t&&this._options.tooltips.custom&&this._options.tooltips.custom.call(this,this._model),this},getTooltipSize:function(t){var e=this._chart.ctx,a={height:2*t.yPadding,width:0},o=t.body.length+t.beforeBody.length+t.afterBody.length;return a.height+=t.title.length*t.titleFontSize,a.height+=(t.title.length-1)*t.titleSpacing,a.height+=t.title.length?t.titleMarginBottom:0,a.height+=o*t.bodyFontSize,a.height+=o?(o-1)*t.bodySpacing:0,a.height+=t.footer.length?t.footerMarginTop:0,a.height+=t.footer.length*t.footerFontSize,a.height+=t.footer.length?(t.footer.length-1)*t.footerSpacing:0,e.font=i.fontString(t.titleFontSize,t._titleFontStyle,t._titleFontFamily),i.each(t.title,function(t){a.width=Math.max(a.width,e.measureText(t).width)}),e.font=i.fontString(t.bodyFontSize,t._bodyFontStyle,t._bodyFontFamily),i.each(t.beforeBody.concat(t.afterBody),function(t){a.width=Math.max(a.width,e.measureText(t).width)}),i.each(t.body,function(i){a.width=Math.max(a.width,e.measureText(i).width+("single"!==this._options.tooltips.mode?t.bodyFontSize+2:0))},this),e.font=i.fontString(t.footerFontSize,t._footerFontStyle,t._footerFontFamily),i.each(t.footer,function(t){a.width=Math.max(a.width,e.measureText(t).width)}),a.width+=2*t.xPadding,a},determineAlignment:function(t){this._model.y<t.height?this._model.yAlign="top":this._model.y>this._chart.height-t.height&&(this._model.yAlign="bottom");var e,i,a,o,n,r=this,s=(this._chartInstance.chartArea.left+this._chartInstance.chartArea.right)/2,l=(this._chartInstance.chartArea.top+this._chartInstance.chartArea.bottom)/2;"center"===this._model.yAlign?(e=function(t){return s>=t},i=function(t){return t>s}):(e=function(e){return e<=t.width/2},i=function(e){return e>=r._chart.width-t.width/2}),a=function(e){return e+t.width>r._chart.width},o=function(e){return e-t.width<0},n=function(t){return l>=t?"top":"bottom"},e(this._model.x)?(this._model.xAlign="left",a(this._model.x)&&(this._model.xAlign="center",this._model.yAlign=n(this._model.y))):i(this._model.x)&&(this._model.xAlign="right",o(this._model.x)&&(this._model.xAlign="center",this._model.yAlign=n(this._model.y)))},getBackgroundPoint:function(t,e){var i={x:t.x,y:t.y};return"right"===t.xAlign?i.x-=e.width:"center"===t.xAlign&&(i.x-=e.width/2),"top"===t.yAlign?i.y+=t.caretPadding+t.caretSize:"bottom"===t.yAlign?i.y-=e.height+t.caretPadding+t.caretSize:i.y-=e.height/2,"center"===t.yAlign?"left"===t.xAlign?i.x+=t.caretPadding+t.caretSize:"right"===t.xAlign&&(i.x-=t.caretPadding+t.caretSize):"left"===t.xAlign?i.x-=t.cornerRadius+t.caretPadding:"right"===t.xAlign&&(i.x+=t.cornerRadius+t.caretPadding),i},drawCaret:function(t,e,a,o){var n,r,s,l,h,d,c=this._view,u=this._chart.ctx;"center"===c.yAlign?("left"===c.xAlign?(n=t.x,r=n-c.caretSize,s=n):(n=t.x+e.width,r=n+c.caretSize,s=n),h=t.y+e.height/2,l=h-c.caretSize,d=h+c.caretSize):("left"===c.xAlign?(n=t.x+c.cornerRadius,r=n+c.caretSize,s=r+c.caretSize):"right"===c.xAlign?(n=t.x+e.width-c.cornerRadius,r=n-c.caretSize,s=r-c.caretSize):(r=t.x+e.width/2,n=r-c.caretSize,s=r+c.caretSize),"top"===c.yAlign?(l=t.y,h=l-c.caretSize,d=l):(l=t.y+e.height,h=l+c.caretSize,d=l));var f=i.color(c.backgroundColor);u.fillStyle=f.alpha(a*f.alpha()).rgbString(),u.beginPath(),u.moveTo(n,l),u.lineTo(r,h),u.lineTo(s,d),u.closePath(),u.fill()},drawTitle:function(t,e,a,o){if(e.title.length){a.textAlign=e._titleAlign,a.textBaseline="top";var n=i.color(e.titleColor);a.fillStyle=n.alpha(o*n.alpha()).rgbString(),a.font=i.fontString(e.titleFontSize,e._titleFontStyle,e._titleFontFamily),i.each(e.title,function(i,o){a.fillText(i,t.x,t.y),t.y+=e.titleFontSize+e.titleSpacing,o+1===e.title.length&&(t.y+=e.titleMarginBottom-e.titleSpacing)})}},drawBody:function(t,e,a,o){a.textAlign=e._bodyAlign,a.textBaseline="top";var n=i.color(e.bodyColor);a.fillStyle=n.alpha(o*n.alpha()).rgbString(),a.font=i.fontString(e.bodyFontSize,e._bodyFontStyle,e._bodyFontFamily),i.each(e.beforeBody,function(i){a.fillText(i,t.x,t.y),t.y+=e.bodyFontSize+e.bodySpacing}),i.each(e.body,function(n,r){"single"!==this._options.tooltips.mode&&(a.fillStyle=i.color(e.legendColorBackground).alpha(o).rgbaString(),a.fillRect(t.x,t.y,e.bodyFontSize,e.bodyFontSize),a.strokeStyle=i.color(e.labelColors[r].borderColor).alpha(o).rgbaString(),a.strokeRect(t.x,t.y,e.bodyFontSize,e.bodyFontSize),a.fillStyle=i.color(e.labelColors[r].backgroundColor).alpha(o).rgbaString(),a.fillRect(t.x+1,t.y+1,e.bodyFontSize-2,e.bodyFontSize-2),a.fillStyle=i.color(e.bodyColor).alpha(o).rgbaString()),a.fillText(n,t.x+("single"!==this._options.tooltips.mode?e.bodyFontSize+2:0),t.y),t.y+=e.bodyFontSize+e.bodySpacing},this),i.each(e.afterBody,function(i){a.fillText(i,t.x,t.y),t.y+=e.bodyFontSize}),t.y-=e.bodySpacing},drawFooter:function(t,e,a,o){if(e.footer.length){t.y+=e.footerMarginTop,a.textAlign=e._footerAlign,a.textBaseline="top";var n=i.color(e.footerColor);a.fillStyle=n.alpha(o*n.alpha()).rgbString(),a.font=i.fontString(e.footerFontSize,e._footerFontStyle,e._footerFontFamily),i.each(e.footer,function(i){a.fillText(i,t.x,t.y),t.y+=e.footerFontSize+e.footerSpacing})}},draw:function(){var t=this._chart.ctx,e=this._view;if(0!==e.opacity){var a=e.caretPadding,o=this.getTooltipSize(e),n={x:e.x,y:e.y},r=Math.abs(e.opacity<.001)?0:e.opacity;if(this._options.tooltips.enabled){var s=i.color(e.backgroundColor);t.fillStyle=s.alpha(r*s.alpha()).rgbString(),i.drawRoundedRectangle(t,n.x,n.y,o.width,o.height,e.cornerRadius),t.fill(),this.drawCaret(n,o,r,a),n.x+=e.xPadding,n.y+=e.yPadding,this.drawTitle(n,e,t,r),this.drawBody(n,e,t,r),this.drawFooter(n,e,t,r)}}}})}},{}],34:[function(t,e,i){"use strict";e.exports=function(t,e){var i=t.helpers,a=t.defaults.global;a.elements.arc={backgroundColor:a.defaultColor,borderColor:"#fff",borderWidth:2},t.elements.Arc=t.Element.extend({inLabelRange:function(t){var e=this._view;return e?Math.pow(t-e.x,2)<Math.pow(e.radius+e.hoverRadius,2):!1},inRange:function(t,e){var a=this._view;if(a){for(var o=i.getAngleFromPoint(a,{x:t,y:e}),n=o.angle,r=o.distance,s=a.startAngle,l=a.endAngle;s>l;)l+=2*Math.PI;for(;n>l;)n-=2*Math.PI;for(;s>n;)n+=2*Math.PI;var h=n>=s&&l>=n,d=r>=a.innerRadius&&r<=a.outerRadius;return h&&d}return!1},tooltipPosition:function(){var t=this._view,e=t.startAngle+(t.endAngle-t.startAngle)/2,i=(t.outerRadius-t.innerRadius)/2+t.innerRadius;return{x:t.x+Math.cos(e)*i,y:t.y+Math.sin(e)*i}},draw:function(){var t=this._chart.ctx,e=this._view,i=e.startAngle,a=e.endAngle;t.beginPath(),t.arc(e.x,e.y,e.outerRadius,i,a),t.arc(e.x,e.y,e.innerRadius,a,i,!0),t.closePath(),t.strokeStyle=e.borderColor,t.lineWidth=e.borderWidth,t.fillStyle=e.backgroundColor,t.fill(),t.lineJoin="bevel",e.borderWidth&&t.stroke()}})}},{}],35:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i=t.defaults.global;t.defaults.global.elements.line={tension:.4,backgroundColor:i.defaultColor,borderWidth:3,borderColor:i.defaultColor,borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",fill:!0},t.elements.Line=t.Element.extend({lineToNextPoint:function(t,e,i,a,o){var n=this._chart.ctx;e._view.skip?a.call(this,t,e,i):t._view.skip?o.call(this,t,e,i):0===e._view.tension?n.lineTo(e._view.x,e._view.y):n.bezierCurveTo(t._view.controlPointNextX,t._view.controlPointNextY,e._view.controlPointPreviousX,e._view.controlPointPreviousY,e._view.x,e._view.y)},draw:function(){function t(t){r._view.skip||s._view.skip?t&&n.lineTo(a._view.scaleZero.x,a._view.scaleZero.y):n.bezierCurveTo(s._view.controlPointNextX,s._view.controlPointNextY,r._view.controlPointPreviousX,r._view.controlPointPreviousY,r._view.x,r._view.y)}var a=this,o=this._view,n=this._chart.ctx,r=this._children[0],s=this._children[this._children.length-1];n.save(),this._children.length>0&&o.fill&&(n.beginPath(),e.each(this._children,function(t,i){var a=e.previousItem(this._children,i),r=e.nextItem(this._children,i);0===i?(this._loop?n.moveTo(o.scaleZero.x,o.scaleZero.y):n.moveTo(t._view.x,o.scaleZero),t._view.skip?this._loop||n.moveTo(r._view.x,this._view.scaleZero):n.lineTo(t._view.x,t._view.y)):this.lineToNextPoint(a,t,r,function(t,e,i){this._loop?n.lineTo(this._view.scaleZero.x,this._view.scaleZero.y):(n.lineTo(t._view.x,this._view.scaleZero),n.moveTo(i._view.x,this._view.scaleZero))},function(t,e){n.lineTo(e._view.x,e._view.y)})},this),this._loop?t(!0):(n.lineTo(this._children[this._children.length-1]._view.x,o.scaleZero),n.lineTo(this._children[0]._view.x,o.scaleZero)),n.fillStyle=o.backgroundColor||i.defaultColor,n.closePath(),n.fill());var l=i.elements.line;n.lineCap=o.borderCapStyle||l.borderCapStyle,n.setLineDash&&n.setLineDash(o.borderDash||l.borderDash),n.lineDashOffset=o.borderDashOffset||l.borderDashOffset,n.lineJoin=o.borderJoinStyle||l.borderJoinStyle,n.lineWidth=o.borderWidth||l.borderWidth,n.strokeStyle=o.borderColor||i.defaultColor,n.beginPath(),e.each(this._children,function(t,i){var a=e.previousItem(this._children,i),o=e.nextItem(this._children,i);0===i?n.moveTo(t._view.x,t._view.y):this.lineToNextPoint(a,t,o,function(t,e,i){n.moveTo(i._view.x,i._view.y)},function(t,e){n.moveTo(e._view.x,e._view.y)})},this),this._loop&&this._children.length>0&&t(),n.stroke(),n.restore()}})}},{}],36:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i=t.defaults.global,a=i.defaultColor;i.elements.point={radius:3,pointStyle:"circle",backgroundColor:a,borderWidth:1,borderColor:a,hitRadius:1,hoverRadius:4,hoverBorderWidth:1},t.elements.Point=t.Element.extend({inRange:function(t,e){var i=this._view;return i?Math.pow(t-i.x,2)+Math.pow(e-i.y,2)<Math.pow(i.hitRadius+i.radius,2):!1},inLabelRange:function(t){var e=this._view;return e?Math.pow(t-e.x,2)<Math.pow(e.radius+e.hitRadius,2):!1},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y,padding:t.radius+t.borderWidth}},draw:function(){var t,o,n,r,s,l,h=this._view,d=this._chart.ctx,c=h.pointStyle,u=h.radius,f=h.x,g=h.y;if(!h.skip){if("object"==typeof c&&(t=c.toString(),"[object HTMLImageElement]"===t||"[object HTMLCanvasElement]"===t))return void d.drawImage(c,f-c.width/2,g-c.height/2);if(!(isNaN(u)||0>=u)){switch(d.strokeStyle=h.borderColor||a,d.lineWidth=e.getValueOrDefault(h.borderWidth,i.elements.point.borderWidth),d.fillStyle=h.backgroundColor||a,c){default:d.beginPath(),d.arc(f,g,u,0,2*Math.PI),d.closePath(),d.fill();break;case"triangle":d.beginPath(),o=3*u/Math.sqrt(3),s=o*Math.sqrt(3)/2,d.moveTo(f-o/2,g+s/3),d.lineTo(f+o/2,g+s/3),d.lineTo(f,g-2*s/3),d.closePath(),d.fill();break;case"rect":l=1/Math.SQRT2*u,d.fillRect(f-l,g-l,2*l,2*l),d.strokeRect(f-l,g-l,2*l,2*l);break;case"rectRot":d.translate(f,g),d.rotate(Math.PI/4),l=1/Math.SQRT2*u,d.fillRect(-l,-l,2*l,2*l),d.strokeRect(-l,-l,2*l,2*l),d.setTransform(1,0,0,1,0,0);break;case"cross":d.beginPath(),d.moveTo(f,g+u),d.lineTo(f,g-u),d.moveTo(f-u,g),d.lineTo(f+u,g),d.closePath();break;case"crossRot":d.beginPath(),n=Math.cos(Math.PI/4)*u,r=Math.sin(Math.PI/4)*u,d.moveTo(f-n,g-r),d.lineTo(f+n,g+r),d.moveTo(f-n,g+r),d.lineTo(f+n,g-r),d.closePath();break;case"star":d.beginPath(),d.moveTo(f,g+u),d.lineTo(f,g-u),d.moveTo(f-u,g),d.lineTo(f+u,g),n=Math.cos(Math.PI/4)*u,r=Math.sin(Math.PI/4)*u,d.moveTo(f-n,g-r),d.lineTo(f+n,g+r),d.moveTo(f-n,g+r),d.lineTo(f+n,g-r),d.closePath();break;case"line":d.beginPath(),d.moveTo(f-u,g),d.lineTo(f+u,g),d.closePath();break;case"dash":d.beginPath(),d.moveTo(f,g),d.lineTo(f+u,g),d.closePath()}d.stroke()}}}})}},{}],37:[function(t,e,i){"use strict";e.exports=function(t){var e=(t.helpers,t.defaults.global);e.elements.rectangle={backgroundColor:e.defaultColor,borderWidth:0,borderColor:e.defaultColor,borderSkipped:"bottom"},t.elements.Rectangle=t.Element.extend({draw:function(){function t(t){return l[(d+t)%4]}var e=this._chart.ctx,i=this._view,a=i.width/2,o=i.x-a,n=i.x+a,r=i.base-(i.base-i.y),s=i.borderWidth/2;i.borderWidth&&(o+=s,n-=s,r+=s),e.beginPath(),e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,e.lineWidth=i.borderWidth;var l=[[o,i.base],[o,r],[n,r],[n,i.base]],h=["bottom","left","top","right"],d=h.indexOf(i.borderSkipped,0);-1===d&&(d=0),e.moveTo.apply(e,t(0));for(var c=1;4>c;c++)e.lineTo.apply(e,t(c));e.fill(),i.borderWidth&&e.stroke()},height:function(){var t=this._view;return t.base-t.y},inRange:function(t,e){var i=this._view;return i?i.y<i.base?t>=i.x-i.width/2&&t<=i.x+i.width/2&&e>=i.y&&e<=i.base:t>=i.x-i.width/2&&t<=i.x+i.width/2&&e>=i.base&&e<=i.y:!1},inLabelRange:function(t){var e=this._view;return e?t>=e.x-e.width/2&&t<=e.x+e.width/2:!1},tooltipPosition:function(){var t=this._view;return{x:t.x,y:t.y}}})}},{}],38:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i={position:"bottom"},a=t.Scale.extend({determineDataLimits:function(){this.minIndex=0,this.maxIndex=this.chart.data.labels.length-1;var t;void 0!==this.options.ticks.min&&(t=e.indexOf(this.chart.data.labels,this.options.ticks.min),this.minIndex=-1!==t?t:this.minIndex),void 0!==this.options.ticks.max&&(t=e.indexOf(this.chart.data.labels,this.options.ticks.max),this.maxIndex=-1!==t?t:this.maxIndex),this.min=this.chart.data.labels[this.minIndex],this.max=this.chart.data.labels[this.maxIndex]},buildTicks:function(t){this.ticks=0===this.minIndex&&this.maxIndex===this.chart.data.labels.length-1?this.chart.data.labels:this.chart.data.labels.slice(this.minIndex,this.maxIndex+1)},getLabelForIndex:function(t,e){return this.ticks[t]},getPixelForValue:function(t,e,i,a){var o=Math.max(this.maxIndex+1-this.minIndex-(this.options.gridLines.offsetGridLines?0:1),1);if(this.isHorizontal()){var n=this.width-(this.paddingLeft+this.paddingRight),r=n/o,s=r*(e-this.minIndex)+this.paddingLeft;return this.options.gridLines.offsetGridLines&&a&&(s+=r/2),this.left+Math.round(s)}var l=this.height-(this.paddingTop+this.paddingBottom),h=l/o,d=h*(e-this.minIndex)+this.paddingTop;return this.options.gridLines.offsetGridLines&&a&&(d+=h/2),this.top+Math.round(d)},getPixelForTick:function(t,e){return this.getPixelForValue(this.ticks[t],t+this.minIndex,null,e)},getValueForPixel:function(t){var e,i=Math.max(this.ticks.length-(this.options.gridLines.offsetGridLines?0:1),1),a=this.isHorizontal(),o=a?this.width-(this.paddingLeft+this.paddingRight):this.height-(this.paddingTop+this.paddingBottom),n=o/i;return this.options.gridLines.offsetGridLines&&(t-=n/2),t-=a?this.paddingLeft:this.paddingTop,e=0>=t?0:Math.round(t/n)}});t.scaleService.registerScaleType("category",a,i)}},{}],39:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i={position:"left",ticks:{callback:function(t,i,a){var o=a.length>3?a[2]-a[1]:a[1]-a[0];Math.abs(o)>1&&t!==Math.floor(t)&&(o=t-Math.floor(t));var n=e.log10(Math.abs(o)),r="";if(0!==t){var s=-1*Math.floor(n);s=Math.max(Math.min(s,20),0),r=t.toFixed(s)}else r="0";return r}}},a=t.Scale.extend({determineDataLimits:function(){function t(t){return l?t.xAxisID===i.id:t.yAxisID===i.id}var i=this,a=i.options,o=a.ticks,n=i.chart,r=n.data,s=r.datasets,l=i.isHorizontal();if(i.min=null,i.max=null,a.stacked){var h={},d=!1,c=!1;e.each(s,function(o,r){var s=n.getDatasetMeta(r);void 0===h[s.type]&&(h[s.type]={positiveValues:[],negativeValues:[]});var l=h[s.type].positiveValues,u=h[s.type].negativeValues;n.isDatasetVisible(r)&&t(s)&&e.each(o.data,function(t,e){var o=+i.getRightValue(t);isNaN(o)||s.data[e].hidden||(l[e]=l[e]||0,u[e]=u[e]||0,a.relativePoints?l[e]=100:0>o?(c=!0,u[e]+=o):(d=!0,l[e]+=o))})}),e.each(h,function(t){var a=t.positiveValues.concat(t.negativeValues),o=e.min(a),n=e.max(a);i.min=null===i.min?o:Math.min(i.min,o),i.max=null===i.max?n:Math.max(i.max,n)})}else e.each(s,function(a,o){var r=n.getDatasetMeta(o);n.isDatasetVisible(o)&&t(r)&&e.each(a.data,function(t,e){var a=+i.getRightValue(t);isNaN(a)||r.data[e].hidden||(null===i.min?i.min=a:a<i.min&&(i.min=a),null===i.max?i.max=a:a>i.max&&(i.max=a))})});if(o.beginAtZero){var u=e.sign(i.min),f=e.sign(i.max);0>u&&0>f?i.max=0:u>0&&f>0&&(i.min=0)}void 0!==o.min?i.min=o.min:void 0!==o.suggestedMin&&(i.min=Math.min(i.min,o.suggestedMin)),void 0!==o.max?i.max=o.max:void 0!==o.suggestedMax&&(i.max=Math.max(i.max,o.suggestedMax)),i.min===i.max&&(i.max++,o.beginAtZero||i.min--)},buildTicks:function(){var i,a=this,o=a.options,n=o.ticks,r=e.getValueOrDefault,s=a.isHorizontal(),l=a.ticks=[];if(s)i=Math.min(n.maxTicksLimit?n.maxTicksLimit:11,Math.ceil(a.width/50));else{var h=r(n.fontSize,t.defaults.global.defaultFontSize);i=Math.min(n.maxTicksLimit?n.maxTicksLimit:11,Math.ceil(a.height/(2*h)))}i=Math.max(2,i);var d,c=n.fixedStepSize&&n.fixedStepSize>0||n.stepSize&&n.stepSize>0;if(c)d=r(n.fixedStepSize,n.stepSize);else{var u=e.niceNum(a.max-a.min,!1);d=e.niceNum(u/(i-1),!0)}var f=Math.floor(a.min/d)*d,g=Math.ceil(a.max/d)*d,p=(g-f)/d;p=e.almostEquals(p,Math.round(p),d/1e3)?Math.round(p):Math.ceil(p),l.push(void 0!==n.min?n.min:f);for(var m=1;p>m;++m)l.push(f+m*d);l.push(void 0!==n.max?n.max:g),
s||l.reverse(),a.max=e.max(l),a.min=e.min(l),n.reverse?(l.reverse(),a.start=a.max,a.end=a.min):(a.start=a.min,a.end=a.max)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},convertTicksToLabels:function(){var e=this;e.ticksAsNumbers=e.ticks.slice(),e.zeroLineIndex=e.ticks.indexOf(0),t.Scale.prototype.convertTicksToLabels.call(e)},getPixelForValue:function(t,e,i,a){var o,n,r=this,s=r.paddingLeft,l=r.paddingBottom,h=r.start,d=+r.getRightValue(t),c=r.end-h;return r.isHorizontal()?(n=r.width-(s+r.paddingRight),o=r.left+n/c*(d-h),Math.round(o+s)):(n=r.height-(r.paddingTop+l),o=r.bottom-l-n/c*(d-h),Math.round(o))},getValueForPixel:function(t){var e=this,i=e.isHorizontal(),a=e.paddingLeft,o=e.paddingBottom,n=i?e.width-(a+e.paddingRight):e.height-(e.paddingTop+o),r=(i?t-e.left-a:e.bottom-o-t)/n;return e.start+(e.end-e.start)*r},getPixelForTick:function(t,e){return this.getPixelForValue(this.ticksAsNumbers[t],null,null,e)}});t.scaleService.registerScaleType("linear",a,i)}},{}],40:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i={position:"left",ticks:{callback:function(t,i,a){var o=t/Math.pow(10,Math.floor(e.log10(t)));return 1===o||2===o||5===o||0===i||i===a.length-1?t.toExponential():""}}},a=t.Scale.extend({determineDataLimits:function(){function t(t){return h?t.xAxisID===i.id:t.yAxisID===i.id}var i=this,a=i.options,o=a.ticks,n=i.chart,r=n.data,s=r.datasets,l=e.getValueOrDefault,h=i.isHorizontal();if(i.min=null,i.max=null,a.stacked){var d={};e.each(s,function(o,r){var s=n.getDatasetMeta(r);n.isDatasetVisible(r)&&t(s)&&(void 0===d[s.type]&&(d[s.type]=[]),e.each(o.data,function(t,e){var o=d[s.type],n=+i.getRightValue(t);isNaN(n)||s.data[e].hidden||(o[e]=o[e]||0,a.relativePoints?o[e]=100:o[e]+=n)}))}),e.each(d,function(t){var a=e.min(t),o=e.max(t);i.min=null===i.min?a:Math.min(i.min,a),i.max=null===i.max?o:Math.max(i.max,o)})}else e.each(s,function(a,o){var r=n.getDatasetMeta(o);n.isDatasetVisible(o)&&t(r)&&e.each(a.data,function(t,e){var a=+i.getRightValue(t);isNaN(a)||r.data[e].hidden||(null===i.min?i.min=a:a<i.min&&(i.min=a),null===i.max?i.max=a:a>i.max&&(i.max=a))})});i.min=l(o.min,i.min),i.max=l(o.max,i.max),i.min===i.max&&(0!==i.min&&null!==i.min?(i.min=Math.pow(10,Math.floor(e.log10(i.min))-1),i.max=Math.pow(10,Math.floor(e.log10(i.max))+1)):(i.min=1,i.max=10))},buildTicks:function(){for(var t=this,i=t.options,a=i.ticks,o=e.getValueOrDefault,n=t.ticks=[],r=o(a.min,Math.pow(10,Math.floor(e.log10(t.min))));r<t.max;){n.push(r);var s=Math.floor(e.log10(r)),l=Math.floor(r/Math.pow(10,s))+1;10===l&&(l=1,++s),r=l*Math.pow(10,s)}var h=o(a.max,r);n.push(h),t.isHorizontal()||n.reverse(),t.max=e.max(n),t.min=e.min(n),a.reverse?(n.reverse(),t.start=t.max,t.end=t.min):(t.start=t.min,t.end=t.max)},convertTicksToLabels:function(){this.tickValues=this.ticks.slice(),t.Scale.prototype.convertTicksToLabels.call(this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},getPixelForTick:function(t,e){return this.getPixelForValue(this.tickValues[t],null,null,e)},getPixelForValue:function(t,i,a,o){var n,r,s=this,l=s.start,h=+s.getRightValue(t),d=e.log10(s.end)-e.log10(l),c=s.paddingTop,u=s.paddingBottom,f=s.paddingLeft;return s.isHorizontal()?0===h?r=s.left+f:(n=s.width-(f+s.paddingRight),r=s.left+n/d*(e.log10(h)-e.log10(l)),r+=f):0===h?r=s.top+c:(n=s.height-(c+u),r=s.bottom-u-n/d*(e.log10(h)-e.log10(l))),r},getValueForPixel:function(t){var i,a,o=this,n=e.log10(o.end)-e.log10(o.start);return o.isHorizontal()?(a=o.width-(o.paddingLeft+o.paddingRight),i=o.start*Math.pow(10,(t-o.left-o.paddingLeft)*n/a)):(a=o.height-(o.paddingTop+o.paddingBottom),i=Math.pow(10,(o.bottom-o.paddingBottom-t)*n/a)/o.start),i}});t.scaleService.registerScaleType("logarithmic",a,i)}},{}],41:[function(t,e,i){"use strict";e.exports=function(t){var e=t.helpers,i=t.defaults.global,a={display:!0,animate:!0,lineArc:!1,position:"chartArea",angleLines:{display:!0,color:"rgba(0, 0, 0, 0.1)",lineWidth:1},ticks:{showLabelBackdrop:!0,backdropColor:"rgba(255,255,255,0.75)",backdropPaddingY:2,backdropPaddingX:2},pointLabels:{fontSize:10,callback:function(t){return t}}},o=t.Scale.extend({getValueCount:function(){return this.chart.data.labels.length},setDimensions:function(){var t=this.options;this.width=this.maxWidth,this.height=this.maxHeight,this.xCenter=Math.round(this.width/2),this.yCenter=Math.round(this.height/2);var a=e.min([this.height,this.width]),o=e.getValueOrDefault(t.ticks.fontSize,i.defaultFontSize);this.drawingArea=t.display?a/2-(o/2+t.ticks.backdropPaddingY):a/2},determineDataLimits:function(){if(this.min=null,this.max=null,e.each(this.chart.data.datasets,function(t,i){if(this.chart.isDatasetVisible(i)){var a=this.chart.getDatasetMeta(i);e.each(t.data,function(t,e){var i=+this.getRightValue(t);isNaN(i)||a.data[e].hidden||(null===this.min?this.min=i:i<this.min&&(this.min=i),null===this.max?this.max=i:i>this.max&&(this.max=i))},this)}},this),this.options.ticks.beginAtZero){var t=e.sign(this.min),i=e.sign(this.max);0>t&&0>i?this.max=0:t>0&&i>0&&(this.min=0)}void 0!==this.options.ticks.min?this.min=this.options.ticks.min:void 0!==this.options.ticks.suggestedMin&&(this.min=Math.min(this.min,this.options.ticks.suggestedMin)),void 0!==this.options.ticks.max?this.max=this.options.ticks.max:void 0!==this.options.ticks.suggestedMax&&(this.max=Math.max(this.max,this.options.ticks.suggestedMax)),this.min===this.max&&(this.min--,this.max++)},buildTicks:function(){this.ticks=[];var t=e.getValueOrDefault(this.options.ticks.fontSize,i.defaultFontSize),a=Math.min(this.options.ticks.maxTicksLimit?this.options.ticks.maxTicksLimit:11,Math.ceil(this.drawingArea/(1.5*t)));a=Math.max(2,a);var o=e.niceNum(this.max-this.min,!1),n=e.niceNum(o/(a-1),!0),r=Math.floor(this.min/n)*n,s=Math.ceil(this.max/n)*n,l=Math.ceil((s-r)/n);this.ticks.push(void 0!==this.options.ticks.min?this.options.ticks.min:r);for(var h=1;l>h;++h)this.ticks.push(r+h*n);this.ticks.push(void 0!==this.options.ticks.max?this.options.ticks.max:s),this.max=e.max(this.ticks),this.min=e.min(this.ticks),this.options.ticks.reverse?(this.ticks.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),this.zeroLineIndex=this.ticks.indexOf(0)},convertTicksToLabels:function(){t.Scale.prototype.convertTicksToLabels.call(this),this.pointLabels=this.chart.data.labels.map(this.options.pointLabels.callback,this)},getLabelForIndex:function(t,e){return+this.getRightValue(this.chart.data.datasets[e].data[t])},fit:function(){var t,a,o,n,r,s,l,h,d,c,u,f,g=this.options.pointLabels,p=e.getValueOrDefault(g.fontSize,i.defaultFontSize),m=e.getValueOrDefault(g.fontStyle,i.defaultFontStyle),b=e.getValueOrDefault(g.fontFamily,i.defaultFontFamily),v=e.fontString(p,m,b),x=e.min([this.height/2-p-5,this.width/2]),y=this.width,k=0;for(this.ctx.font=v,a=0;a<this.getValueCount();a++)t=this.getPointPosition(a,x),o=this.ctx.measureText(this.pointLabels[a]?this.pointLabels[a]:"").width+5,0===a||a===this.getValueCount()/2?(n=o/2,t.x+n>y&&(y=t.x+n,r=a),t.x-n<k&&(k=t.x-n,l=a)):a<this.getValueCount()/2?t.x+o>y&&(y=t.x+o,r=a):a>this.getValueCount()/2&&t.x-o<k&&(k=t.x-o,l=a);d=k,c=Math.ceil(y-this.width),s=this.getIndexAngle(r),h=this.getIndexAngle(l),u=c/Math.sin(s+Math.PI/2),f=d/Math.sin(h+Math.PI/2),u=e.isNumber(u)?u:0,f=e.isNumber(f)?f:0,this.drawingArea=Math.round(x-(f+u)/2),this.setCenterPoint(f,u)},setCenterPoint:function(t,e){var i=this.width-e-this.drawingArea,a=t+this.drawingArea;this.xCenter=Math.round((a+i)/2+this.left),this.yCenter=Math.round(this.height/2+this.top)},getIndexAngle:function(t){var e=2*Math.PI/this.getValueCount();return t*e-Math.PI/2},getDistanceFromCenterForValue:function(t){if(null===t)return 0;var e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e},getPointPosition:function(t,e){var i=this.getIndexAngle(t);return{x:Math.round(Math.cos(i)*e)+this.xCenter,y:Math.round(Math.sin(i)*e)+this.yCenter}},getPointPositionForValue:function(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))},getBasePosition:function(){var t=this,e=t.min,i=t.max;return t.getPointPositionForValue(0,t.beginAtZero?0:0>e&&0>i?i:e>0&&i>0?e:0)},draw:function(){if(this.options.display){var t=this.ctx;if(e.each(this.ticks,function(a,o){if(o>0||this.options.reverse){var n=this.getDistanceFromCenterForValue(this.ticks[o]),r=this.yCenter-n;if(this.options.gridLines.display)if(t.strokeStyle=this.options.gridLines.color,t.lineWidth=this.options.gridLines.lineWidth,this.options.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var s=0;s<this.getValueCount();s++){var l=this.getPointPosition(s,this.getDistanceFromCenterForValue(this.ticks[o]));0===s?t.moveTo(l.x,l.y):t.lineTo(l.x,l.y)}t.closePath(),t.stroke()}if(this.options.ticks.display){var h=e.getValueOrDefault(this.options.ticks.fontColor,i.defaultFontColor),d=e.getValueOrDefault(this.options.ticks.fontSize,i.defaultFontSize),c=e.getValueOrDefault(this.options.ticks.fontStyle,i.defaultFontStyle),u=e.getValueOrDefault(this.options.ticks.fontFamily,i.defaultFontFamily),f=e.fontString(d,c,u);if(t.font=f,this.options.ticks.showLabelBackdrop){var g=t.measureText(a).width;t.fillStyle=this.options.ticks.backdropColor,t.fillRect(this.xCenter-g/2-this.options.ticks.backdropPaddingX,r-d/2-this.options.ticks.backdropPaddingY,g+2*this.options.ticks.backdropPaddingX,d+2*this.options.ticks.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=h,t.fillText(a,this.xCenter,r)}}},this),!this.options.lineArc){t.lineWidth=this.options.angleLines.lineWidth,t.strokeStyle=this.options.angleLines.color;for(var a=this.getValueCount()-1;a>=0;a--){if(this.options.angleLines.display){var o=this.getPointPosition(a,this.getDistanceFromCenterForValue(this.options.reverse?this.min:this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(o.x,o.y),t.stroke(),t.closePath()}var n=this.getPointPosition(a,this.getDistanceFromCenterForValue(this.options.reverse?this.min:this.max)+5),r=e.getValueOrDefault(this.options.pointLabels.fontColor,i.defaultFontColor),s=e.getValueOrDefault(this.options.pointLabels.fontSize,i.defaultFontSize),l=e.getValueOrDefault(this.options.pointLabels.fontStyle,i.defaultFontStyle),h=e.getValueOrDefault(this.options.pointLabels.fontFamily,i.defaultFontFamily),d=e.fontString(s,l,h);t.font=d,t.fillStyle=r;var c=this.pointLabels.length,u=this.pointLabels.length/2,f=u/2,g=f>a||a>c-f,p=a===f||a===c-f;0===a?t.textAlign="center":a===u?t.textAlign="center":u>a?t.textAlign="left":t.textAlign="right",p?t.textBaseline="middle":g?t.textBaseline="bottom":t.textBaseline="top",t.fillText(this.pointLabels[a]?this.pointLabels[a]:"",n.x,n.y)}}}}});t.scaleService.registerScaleType("radialLinear",o,a)}},{}],42:[function(t,e,i){"use strict";var a=t("moment");a="function"==typeof a?a:window.moment,e.exports=function(t){var e=t.helpers,i={units:[{name:"millisecond",steps:[1,2,5,10,20,50,100,250,500]},{name:"second",steps:[1,2,5,10,30]},{name:"minute",steps:[1,2,5,10,30]},{name:"hour",steps:[1,2,3,6,12]},{name:"day",steps:[1,2,5]},{name:"week",maxStep:4},{name:"month",maxStep:3},{name:"quarter",maxStep:4},{name:"year",maxStep:!1}]},o={position:"bottom",time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,displayFormats:{millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm:ss a",hour:"MMM D, hA",day:"ll",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"}},ticks:{autoSkip:!1}},n=t.Scale.extend({initialize:function(){if(!a)throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");t.Scale.prototype.initialize.call(this)},getLabelMoment:function(t,e){return this.labelMoments[t][e]},getMomentStartOf:function(t){return"week"===this.options.time.unit&&this.options.time.isoWeekday!==!1?t.clone().startOf("isoWeek").isoWeekday(this.options.time.isoWeekday):t.clone().startOf(this.tickUnit)},determineDataLimits:function(){this.labelMoments=[];var t=[];this.chart.data.labels&&this.chart.data.labels.length>0?(e.each(this.chart.data.labels,function(e,i){var a=this.parseTime(e);a.isValid()&&(this.options.time.round&&a.startOf(this.options.time.round),t.push(a))},this),this.firstTick=a.min.call(this,t),this.lastTick=a.max.call(this,t)):(this.firstTick=null,this.lastTick=null),e.each(this.chart.data.datasets,function(i,o){var n=[],r=this.chart.isDatasetVisible(o);"object"==typeof i.data[0]&&null!==i.data[0]?e.each(i.data,function(t,e){var i=this.parseTime(this.getRightValue(t));i.isValid()&&(this.options.time.round&&i.startOf(this.options.time.round),n.push(i),r&&(this.firstTick=null!==this.firstTick?a.min(this.firstTick,i):i,this.lastTick=null!==this.lastTick?a.max(this.lastTick,i):i))},this):n=t,this.labelMoments.push(n)},this),this.options.time.min&&(this.firstTick=this.parseTime(this.options.time.min)),this.options.time.max&&(this.lastTick=this.parseTime(this.options.time.max)),this.firstTick=(this.firstTick||a()).clone(),this.lastTick=(this.lastTick||a()).clone()},buildTicks:function(a){this.ctx.save();var o=e.getValueOrDefault(this.options.ticks.fontSize,t.defaults.global.defaultFontSize),n=e.getValueOrDefault(this.options.ticks.fontStyle,t.defaults.global.defaultFontStyle),r=e.getValueOrDefault(this.options.ticks.fontFamily,t.defaults.global.defaultFontFamily),s=e.fontString(o,n,r);if(this.ctx.font=s,this.ticks=[],this.unitScale=1,this.scaleSizeInUnits=0,this.options.time.unit)this.tickUnit=this.options.time.unit||"day",this.displayFormat=this.options.time.displayFormats[this.tickUnit],this.scaleSizeInUnits=this.lastTick.diff(this.firstTick,this.tickUnit,!0),this.unitScale=e.getValueOrDefault(this.options.time.unitStepSize,1);else{var l=this.isHorizontal()?this.width-(this.paddingLeft+this.paddingRight):this.height-(this.paddingTop+this.paddingBottom),h=this.tickFormatFunction(this.firstTick,0,[]),d=this.ctx.measureText(h).width,c=Math.cos(e.toRadians(this.options.ticks.maxRotation)),u=Math.sin(e.toRadians(this.options.ticks.maxRotation));d=d*c+o*u;var f=l/d;this.tickUnit="millisecond",this.scaleSizeInUnits=this.lastTick.diff(this.firstTick,this.tickUnit,!0),this.displayFormat=this.options.time.displayFormats[this.tickUnit];for(var g=0,p=i.units[g];g<i.units.length;){if(this.unitScale=1,e.isArray(p.steps)&&Math.ceil(this.scaleSizeInUnits/f)<e.max(p.steps)){for(var m=0;m<p.steps.length;++m)if(p.steps[m]>=Math.ceil(this.scaleSizeInUnits/f)){this.unitScale=e.getValueOrDefault(this.options.time.unitStepSize,p.steps[m]);break}break}if(p.maxStep===!1||Math.ceil(this.scaleSizeInUnits/f)<p.maxStep){this.unitScale=e.getValueOrDefault(this.options.time.unitStepSize,Math.ceil(this.scaleSizeInUnits/f));break}++g,p=i.units[g],this.tickUnit=p.name;var b=this.firstTick.diff(this.getMomentStartOf(this.firstTick),this.tickUnit,!0),v=this.getMomentStartOf(this.lastTick.clone().add(1,this.tickUnit)).diff(this.lastTick,this.tickUnit,!0);this.scaleSizeInUnits=this.lastTick.diff(this.firstTick,this.tickUnit,!0)+b+v,this.displayFormat=this.options.time.displayFormats[p.name]}}var x;if(this.options.time.min?x=this.getMomentStartOf(this.firstTick):(this.firstTick=this.getMomentStartOf(this.firstTick),x=this.firstTick),!this.options.time.max){var y=this.getMomentStartOf(this.lastTick);0!==y.diff(this.lastTick,this.tickUnit,!0)&&(this.lastTick=this.getMomentStartOf(this.lastTick.add(1,this.tickUnit)))}this.smallestLabelSeparation=this.width,e.each(this.chart.data.datasets,function(t,e){for(var i=1;i<this.labelMoments[e].length;i++)this.smallestLabelSeparation=Math.min(this.smallestLabelSeparation,this.labelMoments[e][i].diff(this.labelMoments[e][i-1],this.tickUnit,!0))},this),this.options.time.displayFormat&&(this.displayFormat=this.options.time.displayFormat),this.ticks.push(this.firstTick.clone());for(var k=1;k<=this.scaleSizeInUnits;++k){var S=x.clone().add(k,this.tickUnit);if(this.options.time.max&&S.diff(this.lastTick,this.tickUnit,!0)>=0)break;k%this.unitScale===0&&this.ticks.push(S)}var C=this.ticks[this.ticks.length-1].diff(this.lastTick,this.tickUnit);(0!==C||0===this.scaleSizeInUnits)&&(this.options.time.max?(this.ticks.push(this.lastTick.clone()),this.scaleSizeInUnits=this.lastTick.diff(this.ticks[0],this.tickUnit,!0)):(this.ticks.push(this.lastTick.clone()),this.scaleSizeInUnits=this.lastTick.diff(this.firstTick,this.tickUnit,!0))),this.ctx.restore()},getLabelForIndex:function(t,e){var i=this.chart.data.labels&&t<this.chart.data.labels.length?this.chart.data.labels[t]:"";return"object"==typeof this.chart.data.datasets[e].data[0]&&(i=this.getRightValue(this.chart.data.datasets[e].data[t])),this.options.time.tooltipFormat&&(i=this.parseTime(i).format(this.options.time.tooltipFormat)),i},tickFormatFunction:function(t,i,a){var o=t.format(this.displayFormat),n=this.options.ticks,r=e.getValueOrDefault(n.callback,n.userCallback);return r?r(o,i,a):o},convertTicksToLabels:function(){this.tickMoments=this.ticks,this.ticks=this.ticks.map(this.tickFormatFunction,this)},getPixelForValue:function(t,e,i,a){var o=t&&t.isValid&&t.isValid()?t:this.getLabelMoment(i,e);if(o){var n=o.diff(this.firstTick,this.tickUnit,!0),r=n/this.scaleSizeInUnits;if(this.isHorizontal()){var s=this.width-(this.paddingLeft+this.paddingRight),l=(s/Math.max(this.ticks.length-1,1),s*r+this.paddingLeft);return this.left+Math.round(l)}var h=this.height-(this.paddingTop+this.paddingBottom),d=(h/Math.max(this.ticks.length-1,1),h*r+this.paddingTop);return this.top+Math.round(d)}},getPixelForTick:function(t,e){return this.getPixelForValue(this.tickMoments[t],null,null,e)},getValueForPixel:function(t){var e=this.isHorizontal()?this.width-(this.paddingLeft+this.paddingRight):this.height-(this.paddingTop+this.paddingBottom),i=(t-(this.isHorizontal()?this.left+this.paddingLeft:this.top+this.paddingTop))/e;return i*=this.scaleSizeInUnits,this.firstTick.clone().add(a.duration(i,this.tickUnit).asSeconds(),"seconds")},parseTime:function(t){return"string"==typeof this.options.time.parser?a(t,this.options.time.parser):"function"==typeof this.options.time.parser?this.options.time.parser(t):"function"==typeof t.getMonth||"number"==typeof t?a(t):t.isValid&&t.isValid()?t:"string"!=typeof this.options.time.format&&this.options.time.format.call?(console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"),this.options.time.format(t)):a(t,this.options.time.format)}});t.scaleService.registerScaleType("time",n,o)}},{moment:1}]},{},[7]);
