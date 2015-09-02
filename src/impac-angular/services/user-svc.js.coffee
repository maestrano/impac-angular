angular
  .module('maestrano.analytics.user-svc', [])
  .service('UserSvc', () ->

    # todo::endpoint: extract into a config type design.
    @getSsoSessionId = ->
      return "8bfbfd384261d1b0854dac6b8ac3fa041cc24ad8"

    return @

)
