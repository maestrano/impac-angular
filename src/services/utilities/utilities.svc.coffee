# This service is designed to provide a place for adding generic helper methods used in
# more than once place across the library.
angular
  .module('impac.services.utilities', [])
  .service('ImpacUtilities', ($window) ->

    _       = $window._
    moment  = $window.moment

    # Find the min & max dates from an array of dates.
    # Mostly used for setting date pickers default to the min &
    # max date of results returned from Connec!.
    # --
    # @params => accepts date-strings or Date objects.
    @getDatesRange = (dates, excludeToday=false) ->
      return [] unless dates && dates.length
      dates = dates.concat [], moment().toDate() unless excludeToday
      minDate = _.min _.map(dates, (d) -> moment(d))
      maxDate = _.max _.map(dates, (d) -> moment(d))
      return [minDate.startOf('day').toDate(), maxDate.startOf('day').toDate()]

    # Parse a Rails model error and return an array of messages
    # ready to be displayed
    # ---
    # TODO: should this be in impac-angular?
    @processRailsError = (error) ->
      messages = []

      if error.status && error.status == 401
        messages.push("Sorry! You are not authorized to perform this action")
      else
        if error.data && error.data != " "
          if angular.isArray(error.data)
            _.each(error.data, (errorMessage) ->
              capitalizedError = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
              messages.push("#{capitalizedError}")
            )
          else if angular.isObject(error.data)
            _.each(error.data, (attrErrors, attribute) ->
              capitalizedAttr = (attribute.charAt(0).toUpperCase() + attribute.slice(1)).replace('_', ' ')
              if angular.isArray(attrErrors)
                _.each(attrErrors, (attrError) ->
                  if capitalizedAttr.match(/base/i)
                    messages.push(attrError)
                  else
                    messages.push("#{capitalizedAttr} #{attrError}")
                )
              else
                if capitalizedAttr.match(/base/i)
                  messages.push(attrErrors)
                else
                  messages.push("#{capitalizedAttr} #{attrErrors}")
            )
          else if angular.isString(error.data)
            messages.push(error.data)
          else
            messages.push("Potentially a system or communication error. Please retry later.")
        else
          messages.push("Potentially a system or communication error. Please retry later.")

      return messages

    return
  )
