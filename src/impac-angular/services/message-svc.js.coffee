angular.module('maestrano.services.message-svc', []).factory('MessageSvc', ['$q','$rootScope','$templateCache', ($q, $rootScope, $templateCache) ->

  # -------------------------------------------------------------------------
  # Service
  # -------------------------------------------------------------------------

  # Initialization
  service = {}
  service.messages = [] # Queue for the messages
  service.count = 0
  bootstraped = false
  currentMessage = null

  # Put the message in the queue
  service.putMessage = (message) ->
    service.messages.push(message)
    unless bootstraped
      bootstrap()

  # Return the current message
  service.pullMessage = ->
    currentMessage['templateUrl'] = templateMessageUrl()
    return currentMessage

  # Check if there's a next message and check of which type it is
  service.next = ->
    if service.messages.length > 0
      currentMessage = service.messages.splice(0,1)[0]
      if currentMessage.type == 'external-modal'
        openExternalModal()
      else
        service.count += 1
    else
      currentMessage = null
      bootstraped = false
      service.count = 0

  # -------------------------------------------------------------------------
  # Private methods
  # -------------------------------------------------------------------------
  bootstrap = ->
    bootstraped = true
    service.next()

  # Used to open external modal
  # It expects the message to contain a msbBus (see MsbBus service)
  # The function will set the variable of the msgbus to true and call
  # service.next() when the modal is closed (to display next message)
  openExternalModal = ->
    msgbus = currentMessage.msgbus
    msgbus().value = true
    unregister = $rootScope.$watch((-> msgbus().value),
      () ->
        if msgbus().value == false
          unregister()
          service.next()
    )

  # Return the template to be used for the category: category
  # (not used at the moment, see comment above)
  templateMessageUrl = ->
    switch currentMessage.category
      when 'taskCompleted' then return $templateCache.get('modal-messages/congratulations.html')
      when 'information' then return $templateCache.get('modal-messages/information.html')
      when 'default' then return $templateCache.get('modal-messages/default.html')
      else return $templateCache.get('modal-messages/default.html')

  return service

])
