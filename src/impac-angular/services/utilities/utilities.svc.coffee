# This service provides oftenly used methods like Rails error processing.
# todo::lib-structure: should this be in impac-angular?
angular
  .module('impac.services.utilities', [])
  .service('Utilities', () ->

    # Parse a Rails model error and return an array of messages
    # ready to be displayed
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
              capitalizedAttr = attribute.charAt(0).toUpperCase() + attribute.slice(1);
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

    # Camelize a string
    @camelize = (word) ->
      return word.replace(/(?:^|[-_])(\w)/g, (_, c) ->
          if c then c.toUpperCase() else ''
      )

    # Camelize a string for javascript
    # (camelize with first letter lower case)
    @jsCamelize = (word) ->
      camelized = this.camelize(word)
      return camelized.charAt(0).toLowerCase() + camelized.slice(1)

    @capitalize = (word) ->
      return (word.charAt(0).toUpperCase() + word.slice(1))

    return
  )
