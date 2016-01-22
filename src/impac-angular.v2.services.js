/*
*   VERSION 2 SERVICES
*   modules injected in build task; `gulp build:v2`.
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
    // TODO: create v2 services for mno api v2
    'impac.services.kpis-v2',
    'impac.services.dashboards-v2',
    'impac.services.widgets-v2',
  ]
);
