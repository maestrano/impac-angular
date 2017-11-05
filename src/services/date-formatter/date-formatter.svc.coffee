### Can be removed ###
#angular
#  .module('impac.services.date-formatter', [])
#  .service 'ImpacDateFormatter', ($locale, ImpacTheming, $translate) ->
#
#    @getFormatForEntity = (entity = '') ->
#
#      settings = ImpacTheming.get()
#      if settings.dateFormatterSettings.formats && settings.dateFormatterSettings.formats[entity]
#        format = settings.dateFormatterSettings.formats[entity]
#      else
#        format = settings.dateFormatterSettings.default
#      return format
#
#    return