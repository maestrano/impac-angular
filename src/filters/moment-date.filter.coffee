angular.module('impac.filters.moment-date', []).filter('momentDate', (ImpacDateFormatter) ->
  (date, component) ->
    moment = window.moment
    if date
      d = moment(date)

      if d.isValid()
        return d.format(ImpacDateFormatter.getFormatForEntity(component))
      else if (d = moment(date, "DD-MM-YYYY")) && d.isValid()
        return d.format(ImpacDateFormatter.getFormatForEntity(component))

    return ''
)