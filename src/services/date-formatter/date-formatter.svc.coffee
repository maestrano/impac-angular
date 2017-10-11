angular
  .module('impac.services.date-formatter', [])
  .service 'ImpacDateFormatter', ($log, $locale, ImpacTheming, ImpacUtilities) ->

    @getFormatForEntity = (entity = '') ->
      settings = ImpacTheming.get()
      if settings.dateFormatterSettings && settings.dateFormatterSettings[entity]
        format = settings.dateFormatterSettings[entity]
      else
        format = 'L'
      return format

    @formatDateString = (obj, widgetEndpoint = '') ->

      widgetDateFormat = this.getFormatForEntity(widgetEndpoint)
      formatDate = (obj) ->
        if Object::toString.call(obj) == '[object Array]'
          obj.forEach (val, key) ->
            if typeof val == 'object' and val != null
              formatDate val
            else if typeof val == 'string' && val.match /^[1,2]\d\d\d-[0,1]\d-[0,1,2,3]\d$/
              obj[key] = moment(val).format(widgetDateFormat)
            return

        else if Object::toString.call(obj) == '[object Object]'
          for prop, val of obj
            if typeof val == 'object' and val != null
              formatDate val
            else if typeof val == 'string' && val.match /^[1,2]\d\d\d-[0,1]\d-[0,1,2,3]\d$/
              obj[prop] = moment(val).format(widgetDateFormat)
        return
      formatDate obj

      return

    return