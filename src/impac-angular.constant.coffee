
# Impac! Angular constants module
# ---------------------------------------------
module = angular.module('impac.constant')

# To facilitate the ImpacEvents service in defining event keys.
module.constant('IMPAC_EVENTS',
  kpiTargetAlert: 'kpi-target-alert'
  impacNotificationsLoad: 'impac-notifications-load'
  addOrRemoveAlerts: 'add-or-remove-alerts'
  kpisBarUpdateSettings: 'on-kpis-bar-update-settings'
)

module.constant('LOCALES', {
  'locales': [
    { id: 'en-gb', name: 'English (GB)' }
  ],
  'preferredLanguage': 'en-gb',
  'fallbackLanguage': 'en-gb'
})
