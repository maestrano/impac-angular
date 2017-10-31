angular.module('impac.filters.moment-date', []).filter('momentDate', ($translate, ImpacTheming) ->
  (date, component) ->

    getFormatForEntity = (entity = '') ->
      settings = ImpacTheming.get()
      if settings.dateFormatterSettings.formats && settings.dateFormatterSettings.formats[entity]
        format = settings.dateFormatterSettings.formats[entity]
      else
        format = settings.dateFormatterSettings.default
      return format

    moment = window.moment
    moment.locale($translate.use().toLowerCase())

    if date
      d = moment(date)

      if d.isValid()
        return d.format(getFormatForEntity(component))
      else if (d = moment(date, "DD-MM-YYYY")) && d.isValid()
        return d.format(getFormatForEntity(component))
    return ''
)