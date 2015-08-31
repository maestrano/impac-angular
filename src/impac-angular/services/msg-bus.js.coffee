# This service is used to pass objects between directives
# ---
# Please register below any object that should be shared so we
# we can ensure that there is no name conflict
angular.module('maestrano.message-bus', []).factory('MsgBus', [() ->
  # Init
  msgBus = {}


  # Messages
  # ---
  # Note that strings or integer can't be passed directly. Objects need to be
  # passed by reference
  # To pass a string or integer you would need to do something like this
  #
  # Controller1:
  # $scope.mystring = { value: 'bla' }
  # MsgBus.publish($scope.mystring)
  #
  # Controller2:
  # $scope.mystring = MsgBus.subscribe('mystring')
  # and use it in view like this: mystring().value
  #
  msgBusData =
    dashboardGrid: {}          # dashboardGrid created in AppsCtrl
    controlBarFilter: {}       # search bar filter
    controlBarQuickFilter: {}  # quick filters on control bar
    orgaSharingModal: {}       # Sharing Walkthrough Modal
    appConnectModal: {}        # Connec! Walkthrough Modal
    page: {}                   # the page we're on
    pane: {}                   # the pane we're on
    errors: []                 # current errors to be passed to the error flash
    autostopQueue: []          # list of AppInstance that should be proposed an autostop
    notificationQueue: []      # list of notifications that should appear in the notification widget
    params: {}                 # Params passed to myspace param upon loading. E.g.: /myspace?newApp=true

  # Set an object on the bus
  msgBus.publish = (name,object) ->
    msgBusData[name] = object

  # Get a bus accessor to the object
  # Note that this method returns a FUNCTION not an attribute
  # ---
  # We need to return a function if we want the result to be
  # evaluated during $digest (and UI updated automatically)
  msgBus.subscribe = (name) ->
    return () -> msgBusData[name]

  return msgBus
])
