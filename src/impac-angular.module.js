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
    'impac.components.widgets-common.data-not-found',
    'impac.components.widgets-common.editable-title',
    'impac.components.widgets-common.info-panel',
    'impac.components.widgets-common.top-buttons'
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


