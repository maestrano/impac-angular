# angular.module('maestrano.services.dashboard.partner-svc', []).factory('DhbPartnerSvc', ['$http','$q','$window', ($http,$q,$window) ->
angular.module('maestrano.analytics.partner-svc', []).factory('DhbPartnerSvc', ['$http','$q','$window', ($http,$q,$window) ->
  # Configuration
  service = {}
  service.routes = {
    basePath: -> "/js_api/v1/dashboard/partners"
    sendLoginLinkPath: -> "#{service.routes.basePath()}/login_link"
    feedbackPath: -> "#{service.routes.basePath()}/feedback"
    introductionPath: -> "#{service.routes.basePath()}/introduction"
    webinarRequestPath: -> "#{service.routes.basePath()}/webinar_request"
    updateCustomerAccountToResellerMemberPath: -> "#{service.routes.basePath()}/reseller_member_cust_account_rel"
    baseSalesPath: -> "#{service.routes.basePath()}/sales"
    showSalesPath: (id) -> "#{service.routes.basePath()}/sales/" + id
  }

  service.defaultConfig = {
    delay: 5 * 60 * 1000 # minutes - long polling delay
  }

  service.config = {
    id: null, # The organization id to load
    timerId: null, # The current timer id (used for long polling)
    $q: null # The current service promise
  }

  service.data = {}

  # Return the id of the currently loaded/loading organization
  service.getId = ->
    service.config.id

  service.update = (data, opts = {}) ->
    return $http.put(service.routes.basePath(), data, opts)

  service.sendLoginLink = (data) ->
    return $http.put(service.routes.sendLoginLinkPath(), data)

  service.sendFeedback = (feedback) ->
    return $http.put(service.routes.feedbackPath(), { feedback: feedback })

  service.sendIntroduction = (data) ->
    return $http.put(service.routes.introductionPath(), { introduction: data })

  #======================================
  # Sales management
  #======================================
  service.sale = {}

  service.sale.delete = (sale_id) ->
    self = service
    return $http.delete(self.routes.showSalesPath(sale_id))

  service.sale.create = (sale) ->
    self = service
    data = {sale: sale}
    return $http.post(self.routes.baseSalesPath(), data)

  service.sale.update = (sale) ->
    self = service
    data = {sale: sale}
    return $http.put(self.routes.showSalesPath(sale.id), data)

  #======================================
  # Webinars management
  #======================================
  # Send an email to the channel partner manager
  service.webinar = {}

  service.webinar.sendRequest = (webinar) ->
    self = service
    data = { webinar_id: webinar.id }
    q = $http.put(self.routes.webinarRequestPath(),data)
    return q

  #======================================
  # Data Management
  #======================================
  # Configure the service
  service.configure = (opts) ->
    angular.copy(opts,service.config)
    angular.extend(service.config,service.defaultConfig)

  # Load the partners details
  #
  service.load = (force = false) ->
    self = service
    if !self.config.$q? || force
      self.config.$q = $http.get(self.routes.basePath()).then (success) ->
        angular.copy(success.data,self.data)

    return self.config.$q

  # Start data auto refresh for the service
  service.startAutoRefresh = ->
    self = service
    unless self.config.timerId?
      self.config.timerId = $window.setInterval((-> self.load(true)),self.config.delay)

  # Stop data auto refresh for the service
  service.stopAutoRefresh = ->
    self = service
    if self.config.timerId?
      $window.clearInterval(self.config.timerId)
      self.config.timerId = null

  # Force the service to reload
  service.reload = ->
    self.stopAutoRefresh()
    self.load(true).then(self.startAutoRefresh)

  # Setup the service
  # A full reload is only performed if the orga id
  # passed in the configOpts is different from the one
  # currently used
  # To force a service reload, use the 'reload' function
  service.setup = (configOpts = service.config)->
    self = service
    self.stopAutoRefresh()
    self.configure(configOpts)
    self.load(true).then(self.startAutoRefresh)

  service.addCustomerOrg = (org) ->
    self = service
    if self.data && self.data.organizations
      self.data.organizations.push(org)

  #======================================
  # Customers relation management
  #======================================
  service.resellerMember = {}

  service.resellerMember.update = (customer_account,reseller_members) ->
    self = service
    data = { customer_account:customer_account, reseller_members: reseller_members }
    q = $http.put(self.routes.updateCustomerAccountToResellerMemberPath(),data)
    return q


  return service
])
