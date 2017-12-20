angular.module('impac.filters.moment-date', []).filter('momentDate', ($translate, ImpacTheming) ->
  (date, component) ->

    moment.locale($translate.use().toLowerCase())

    validPeriods = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'default']
    if !_.isEmpty(component) && _.includes(validPeriods, component.toLowerCase())
      component = 'period-' + component.toLowerCase()

    settings = ImpacTheming.get()
    format = settings.dateFormatterSettings.default
    if settings.dateFormatterSettings.formats && settings.dateFormatterSettings.formats[component]
      format = settings.dateFormatterSettings.formats[component]

    return moment(date).format(format)
)
