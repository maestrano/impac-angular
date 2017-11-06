angular.module('impac.filters.moment-date', []).filter('momentDate', ($translate, ImpacTheming) ->
  (date, component) ->

    getFormatForEntity = (entity = '') ->
      periods = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'default']
      if periods.includes(entity.toLowerCase())
        entity = 'period-' + entity.toLowerCase()

      settings = ImpacTheming.get()
      if settings.dateFormatterSettings.formats && settings.dateFormatterSettings.formats[entity]
        settings.dateFormatterSettings.formats[entity]
      else
        settings.dateFormatterSettings.default

    moment = window.moment
    moment.locale($translate.use().toLowerCase())

    return '' unless date

    d = moment(date)
    return d.format(getFormatForEntity(component)) if d.isValid()

    d = moment(date, "DD-MM-YYYY")
    return d.format(getFormatForEntity(component)) if d.isValid()

    return ''
)
