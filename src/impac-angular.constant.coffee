
# Impac! Angular constants module
# ---------------------------------------------
module = angular.module('maestrano.impac')

# To facilitate the ImpacEvents service in defining event keys.
module.constant('IMPAC_EVENTS',
  kpiTargetAlert: 'kpi-target-alert'
  impacNotificationsLoad: 'impac-notifications-load'
  addOrRemoveAlerts: 'add-or-remove-alerts'
  kpisBarUpdateSettings: 'on-kpis-bar-update-settings'
  kpisBarToggleSettings: 'on-kpis-bar-toggle-settings'
  kpisBarUpdateDates: 'on-kpis-bar-update-dates'
  kpiPressEnterButton: 'on-kpi-press-enter-button'
)

module.constant('LOCALES',
  list: [
    { id: 'en-gb', name: 'English (GB)' }
    { id: 'zh-HK', name: 'Chinese (HK)' }
  ]
)

module.constant('MNO_CURRENCIES',
  USD: '$'
  AUD: '$'
  CAD: '$'
  CNY: '¥'
  EUR: '€'
  GBP: '£'
  HKD: '$'
  INR: ''
  JPY: '¥'
  NZD: '$'
  SGD: '$'
  PHP: '₱'
  AED: ''
  IDR: 'Rp'
  MMK: ''
)
