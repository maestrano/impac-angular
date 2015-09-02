/* Create all modules and define dependencies to make sure they exist
** and are loaded in the correct order to satisfy dependency injection
** before all nested files are concatenated by Grunt
*//*************************************************************************
***** TODO: refactor module names and structure something like below *****
// Config
angular.module('impac.config', []);
// Modules
angular.module('impac.directives',
  [
    'impac-widget',
    'chart'
    'widgets',
    'widgets-settings',
    'widgets-common'
  ]);
angular.module('impac.directives.widgets',
  [
    'invoices-list',
  ]);
angular.module('impac.directives.widgets-settings',
  [
    'account-list',
  ]);
angular.module('impac.directives.widgets-common',
  [
    'data-not-found',
  ]);
angular.module('impac.filters', []);
angular.module('impac.services', []);
angular.module('impac',
  [
    'impac.config',
    'impac.directives',
    'impac.filters',
    'impac.services'
  ]);
**************************************************************************/
angular.module('maestrano.analytics' ,
  [
    /*
    ** MODULES
    */
    'ui.sortable',
    'ui.bootstrap',
    'maestrano.analytics.config',
    'maestrano.analytics.templates',
    'maestrano.analytics.widgets-common',
    'maestrano.analytics.widgets-settings',
    /*
    ** DIRECTIVES
    */
    'maestrano.analytics.impac-dashboard',
    'maestrano.analytics.impac-widget',
    'maestrano.analytics.chart',
    'maestrano.analytics.widget-accounts-accounting-values',
    'maestrano.analytics.widget-accounts-assets-summary',
    'maestrano.analytics.widget-accounts-balance',
    'maestrano.analytics.widget-accounts-balance-sheet',
    'maestrano.analytics.widget-accounts-cash-summary',
    'maestrano.analytics.widget-accounts-comparison',
    'maestrano.analytics.widget-accounts-custom-calculation',
    'maestrano.analytics.widget-accounts-expenses-revenue',
    'maestrano.analytics.widget-accounts-payable-receivable',
    'maestrano.analytics.widget-accounts-profit-and-loss',
    'maestrano.analytics.widget-invoices-list',
    'maestrano.analytics.widget-invoices-summary',
    'maestrano.analytics.widget-invoices-aged-payables-receivables',
    'maestrano.analytics.widget-hr-employee-details',
    'maestrano.analytics.widget-hr-employees-list',
    'maestrano.analytics.widget-hr-leaves-balance',
    'maestrano.analytics.widget-hr-leaves-schedule',
    'maestrano.analytics.widget-hr-payroll-summary',
    'maestrano.analytics.widget-hr-payroll-taxes',
    'maestrano.analytics.widget-hr-salaries-summary',
    'maestrano.analytics.widget-hr-superannuation-accruals',
    'maestrano.analytics.widget-hr-timesheets',
    'maestrano.analytics.widget-hr-workforce-summary',
    'maestrano.analytics.widget-sales-aged',
    'maestrano.analytics.widget-sales-break-even',
    'maestrano.analytics.widget-sales-comparison',
    'maestrano.analytics.widget-sales-customer-details',
    'maestrano.analytics.widget-sales-cycle',
    'maestrano.analytics.widget-sales-forecast',
    'maestrano.analytics.widget-sales-growth',
    'maestrano.analytics.widget-sales-list',
    'maestrano.analytics.widget-sales-leads-funnel',
    'maestrano.analytics.widget-sales-leads-list',
    'maestrano.analytics.widget-sales-margin',
    'maestrano.analytics.widget-sales-number-of-leads',
    'maestrano.analytics.widget-sales-opportunities-funnel',
    'maestrano.analytics.widget-sales-performance',
    'maestrano.analytics.widget-sales-segmented-turnover',
    'maestrano.analytics.widget-sales-summary',
    'maestrano.analytics.widget-sales-top-opportunities',
    'maestrano.analytics.impac-widget-template-admin',
    'maestrano.analytics.impac-widget-catalogue',
    /*
    ** SERVICES / FACTORIES
    */
    'maestrano.analytics.impac-theming',
    'maestrano.analytics.analytics-svc',
    'maestrano.analytics.message-svc',
    'maestrano.analytics.message-bus',
    'maestrano.analytics.utilities',
    'maestrano.analytics.user-svc',
    'maestrano.analytics.organization-svc',
    'maestrano.analytics.partner-svc',
    'maestrano.analytics.partner-organization-svc',
    'maestrano.analytics.widget-templates-svc',
    'maestrano.analytics.chart-formatter-svc'
  ]
);
angular.module('maestrano.analytics.widgets-settings',
  [
    'maestrano.analytics.widgets-settings.account',
    'maestrano.analytics.widgets-settings.accounts-list',
    'maestrano.analytics.widgets-settings.chart-filters',
    'maestrano.analytics.widgets-settings.formula',
    'maestrano.analytics.widgets-settings.hist-mode',
    'maestrano.analytics.widgets-settings.organizations',
    'maestrano.analytics.widgets-settings.param-selector',
    'maestrano.analytics.widgets-settings.params-picker',
    'maestrano.analytics.widgets-settings.time-range',
    'maestrano.analytics.widgets-settings.width',
  ]
);
angular.module('maestrano.analytics.widgets-common',
  [
    'maestrano.analytics.widgets-common.data-not-found',
    'maestrano.analytics.widgets-common.editable-title',
    'maestrano.analytics.widgets-common.top-buttons',
  ]
);
angular.module('maestrano.analytics.templates', []);
angular.module('maestrano.analytics.config', []);
angular.module('maestrano.analytics.config').config(['$httpProvider',
    function ($httpProvider) {
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    }
]);

