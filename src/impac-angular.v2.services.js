/*
*   VERSION 2 SERVICES
*   modules injected in build task; `gulp build:v2`.
*/
angular.module('impac.services',
  [
    'impac.services.routes-v2',
    'impac.services.linking',
    'impac.services.theming',
    'impac.services.assets',
    'impac.services.chart-formatter',
    'impac.services.message-bus',
    'impac.services.utilities',
    'impac.services.main',
    'impac.services.dashboards-v2',
    'impac.services.kpis-v2',
    'impac.services.widgets-v2',
  ]
);
