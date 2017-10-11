angular.module('impac.filters.moment-date', []).filter('momentDate', () ->
  (date, format) ->
    moment = window.moment

    d = moment(date)
    if d.isValid()
      return d.format(format)
    else
      return ''
)