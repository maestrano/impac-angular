# angular.module('maestrano.services.dashboard.organization-svc', []).factory('DhbOrganizationSvc', ['$http','$q','$window','MessageSvc','UserSvc','DhbPartnerSvc', ($http,$q,$window,MessageSvc,UserSvc,DhbPartnerSvc) ->
angular.module('maestrano.analytics.organization-svc', []).factory('DhbOrganizationSvc', ['$http','$q','$window','MessageSvc','UserSvc','DhbPartnerSvc', ($http,$q,$window,MessageSvc,UserSvc,DhbPartnerSvc) ->
  # Configuration
  service = {}
  service.routes = {
    createPath: -> "/organizations"
    basePath: -> "/js_api/v1/dashboard/organization/#{service.config.id}/organization"
    arrearsSituationsPath: -> "#{service.routes.basePath()}/charge"
    loadPath: -> "#{service.routes.basePath()}"
    updatePath: -> "#{service.routes.basePath()}"
    updateBillingPath: -> "#{service.routes.basePath()}/update_billing"
    inviteMembersPath: -> "#{service.routes.basePath()}/invite_members"
    updateMemberPath: -> "#{service.routes.basePath()}/update_member"
    removeMemberPath: -> "#{service.routes.basePath()}/remove_member"
    updateSupportPlanPath: -> "#{service.routes.basePath()}/update_support_plan"
    trainingSessionReqPath: -> "#{service.routes.basePath()}/training_session_req"
    putMetaDataPath: -> "#{service.routes.basePath()}/meta_data"
  }

  service.defaultConfig = {
    delay: 2000 * 60 # seconds - long polling delay
  }

  service.config = {
    id: null, # The organization id to load
    timerId: null, # The current timer id (used for long polling)
    $q: null # The current service promise
  }

  service.data = {}

  #======================================
  # Data Management
  #======================================
  # Return the id of the currently loaded/loading organization
  service.getId = ->
    service.config.id

  # Return the name of the currently loaded/loading organization
  service.getName = ->
    if service.data && service.data.organization && service.data.organization.name
      return service.data.organization.name
    else
      return null

  # Return the uid of the currently loaded/loading organization
  service.getUid = ->
    if service.data && service.data.organization && service.data.organization.uid
      return service.data.organization.uid
    else
      return null

  service.isDemoOrganization = ->
    if service.data && service.data.organization && service.data.organization.demo_account
      return service.data.organization.demo_account
    else
      return null

  # Configure the service
  service.configure = (opts) ->
    angular.copy(opts,service.config)
    angular.extend(service.config,service.defaultConfig)

  # Load the organization details
  # Document structure
  # :organization
  #   :id
  #   :name
  #   :soa_enabled(true,false)
  # :current_user
  #   :role('Member','Power User', 'Admin', 'Super Admin')
  # :members
  #   [{ :id, :name, :surname, :email, :role('Invited', 'Member','Power User', 'Admin', 'Super Admin') }]
  # :credit_card
  #   :title
  #   :first_name
  #   :last_name
  #   :number
  #   :month
  #   :year
  #   :country
  #   :cvv
  #   :billing_address
  #   :billing_city
  #   :billing_postcode
  #   :billing_country
  # :arrears_situations
  #   [{ :id, :owner_id, :owner_type, :category, :status }]
  #
  service.load = (force = false) ->
    self = service
    if !self.config.$q? || force
      self.config.$q = $http.get(self.routes.loadPath()).then (success) ->
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
    self = service
    self.stopAutoRefresh()
    self.load(true).then(self.startAutoRefresh)

  # Setup the service
  # A full reload is only performed if the orga id
  # passed in the configOpts is different from the one
  # currently used
  # To force a service reload, use the 'reload' function
  service.setup = (configOpts = service.config)->
    self = service
    if configOpts.id != self.config.id
      self.stopAutoRefresh()
      self.configure(configOpts)
      self.load(true).then ->
        (self.startAutoRefresh)
        # if the organization is a customer organization, we print an information message
        if UserSvc.isCustomerOrganization(self.config.id)
          self.config.$q.then ->
            MessageSvc.putMessage({category:'information',title:'Warning',body:"<p>You are now accessing the dashboard of your client \"#{self.data.organization.name}\". Please note that any changes you make will affect your customers' account.</p>"})
        else if service.isDemoOrganization()
          self.config.$q.then ->
            MessageSvc.putMessage({category:'information',title:'Warning',body:"<p>You are now accessing the DEMO dashboard.</p><p><strong>DO NOT ATTACH PERSONAL OR CLIENT SYSTEMS TO THIS ACCOUNT</strong></p><p>Attaching accounts will result in the demo data and real data to merge. Please note that any changes you make will affect this account.</p>"})
        else
          # Intercom tracking - Disabled for customer organizations
          # Don't track when the signup process is not completed yet
          if (Intercom?) && !UserSvc.document.user.need_details_update
            window.Intercom('update', {
              id: self.data.current_user.id,
              email: self.data.current_user.email,
              company: {
                id: self.data.organization.id,
                name: self.data.organization.name,
                industry: self.data.organization.industry,
                size: self.data.organization.size,
                plan: self.data.organization.current_support_plan
                remote_created_at: self.data.organization.created_at
                credit_card_details: self.data.organization.credit_card?,
                user_count: self.data.organization.intercom.user_count,
                app_count: self.data.organization.intercom.app_count,
                available_credit: self.data.organization.intercom.available_credit,
                monthly_spend: self.data.organization.intercom.last_invoice_amount,
                app_list: self.data.organization.intercom.app_list
              }
            })

  #======================================
  # Organization Management
  #======================================
  service.organization = {}

  # Create a new organization
  # e.g. opts: { organization: {name:'bla'}, reseller_req:true }
  service.organization.create = (opts) ->
    self = service
    data = opts
    q = $http.post(self.routes.createPath(),data)
    q.then (success) ->
      # If the org creation has been requested by a reseller then we add
      # that new org to the customer orgs of the reseller
      if data.reseller_req then DhbPartnerSvc.addCustomerOrg(success.data)

      UserSvc.addOrg(success.data)
    return q


  # Edit the details on a given organization
  # opts = { name: "SomeName", soa_enabled: true }
  service.organization.update = (opts) ->
    self = service
    data = { organization: opts }
    q = $http.put(self.routes.updatePath(),data).then (success)->
      angular.copy(success.data.organization,self.data.organization)

    return q

  #======================================
  # Billing Management
  #======================================
  service.billing = {}

  # Update the cc details for this organization
  service.billing.update = (opts) ->
    self = service
    data = { credit_card: opts }
    q = $http.put(self.routes.updateBillingPath(),data).then (success)->
      # Bootstrap tasks
      unless self.data.organization.bootstrap_tasks.credit_card_details
        self.data.organization.bootstrap_tasks.credit_card_details = true
        MessageSvc.putMessage({body:"Congratulations! You've successfully updated your billing details. Now you can continue experiencing the great service you've come to expect with Maestrano!",category:"taskCompleted"})

      angular.copy(success.data.credit_card,self.data.credit_card)

    return q

  #======================================
  # Arrears Situations Management
  #======================================
  service.data.arrears_situations = {}

  service.charge = () ->
    self = service
    q = $http.put(self.routes.arrearsSituationsPath()).then (response) ->
      angular.copy(response.data,self.data.arrears_situations)
    return q

  #======================================
  # Support Management
  #======================================
  service.support_plan = {}

  # Update the support plan for this organization
  service.support_plan.update = (opts) ->
    self = service
    data = { support_plan: opts }
    q = $http.put(self.routes.updateSupportPlanPath(),data).then (success)->
      angular.copy(success.data.organization,self.data.organization)
    return q

  # Send an email to the account manager with the training session req
  # and consume a training session credit
  service.support_plan.training_session_req = (opts) ->
    self = service
    data = { message: opts }
    q = $http.post(self.routes.trainingSessionReqPath(),data).then (success)->
      angular.copy(success.data.organization,self.data.organization)
    return q

  #======================================
  # Member Management
  #======================================
  service.members = {}
  # Accept an array of invites
  # [{ email: 'bla@bla.com', role: 'Admin' }]
  # Or
  # a single email address
  # Or
  # a an array of email addresses
  # Or
  # a newline separated list of email addresses
  service.members.invite = (invites) ->
    self = service
    baseList = []
    if angular.isString(invites)
      baseList = invites.split("\n")
    else
      baseList = invites

    finalList = []
    _.each baseList, (e) ->
      if angular.isObject(e)
        finalList.push(e)
      else
        finalList.push({email: e})

    data = { invites: finalList}
    q = $http.put(self.routes.inviteMembersPath(), data).then (success)->
      # Bootstrap tasks
      unless (!self.data.organization? || self.data.organization.bootstrap_tasks.colleagues_invited)
        self.data.organization.bootstrap_tasks.colleagues_invited = true
        MessageSvc.putMessage({body:"Congratulations, you have invited your first colleagues to join your company. When you're ready to invite the rest of your team, just follow the same steps.",category:"taskCompleted"})

      angular.copy(success.data.members,self.data.members)

    return q

  # Remove a member from an organization
  # The email can either be a user email or an invited
  # email
  service.members.remove = (opts) ->
    self = service
    data = { member: { email: opts.email } }
    q = $http.put(self.routes.removeMemberPath(),data).then (success)->
      angular.copy(success.data.members,self.data.members)

    return q

  # Update the details related to a given member
  # opts = { email: 'john@bla.com', role: 'Admin' }
  service.members.update = (opts) ->
    self = service
    data = { member: opts }
    q = $http.put(self.routes.updateMemberPath(),data).then (success)->
      angular.copy(success.data.members,self.data.members)

    return q

  #======================================
  # User Role
  #======================================
  service.metaData = {}

  # Update the meta_data
  service.metaData.checkTask = (name) ->
    self = service
    data = { name:name, value:true }
    q = $http.put(self.routes.putMetaDataPath(),data).then (success)->
      self.data.organization.bootstrap_tasks[name] = true

    return q

  #======================================
  # User Role
  #======================================
  service.user = {}

  service.user.isSuperAdmin = ->
    service.data.current_user? && service.data.current_user.role == 'Super Admin'

  service.user.isAdmin = ->
    service.data.current_user? && service.data.current_user.role == 'Admin'

  service.user.isPowerUser = ->
    service.data.current_user? && service.data.current_user.role == 'Power User'

  service.user.isMember = ->
    service.data.current_user? && service.data.current_user.role == 'Member'

  service.user.atLeastMember = ->
    true

  service.user.atLeastPowerUser = ->
    u = service.user
    u.isPowerUser() || u.isAdmin() || u.isSuperAdmin()

  service.user.atLeastAdmin = ->
    u = service.user
    u.isAdmin() || u.isSuperAdmin()

  service.user.atLeastSuperAdmin = ->
    service.user.isSuperAdmin()

  #======================================
  # Access Management
  #======================================
  service.can = {}
  service.can.read = {}
  service.can.create = {}
  service.can.update = {}
  service.can.destroy = {}

  service.can.read = {
    appInstance: (obj = null) -> service.user.atLeastMember()
    billing: (obj = null) -> service.user.atLeastSuperAdmin()
    member: (obj = null) -> service.user.atLeastMember()
    organizationSettings: (obj = null) -> service.user.atLeastSuperAdmin()
  }

  service.can.create = {
    appInstance: (obj = null) -> service.user.atLeastAdmin()
    billing: (obj = null) -> service.user.atLeastSuperAdmin()
    member: (obj = null) -> service.user.atLeastAdmin() && (obj == null || obj.role != 'Super Admin' || service.user.isSuperAdmin())
    organizationSettings: (obj = null) -> service.user.atLeastSuperAdmin()
  }

  service.can.update = {
    appInstance: (obj = null) -> service.can.create.appInstance(obj) # call similar permission
    billing: (obj = null) -> service.can.create.billing(obj) # call similar permission
    member: (obj = null) -> service.can.create.member(obj) # call similar permission
    organizationSettings: (obj = null) -> service.can.create.organizationSettings(obj) # call similar permission
  }

  service.can.destroy = {
    appInstance: (obj = null) -> service.can.create.appInstance(obj) # call similar permission
    billing: (obj = null) -> service.can.create.billing(obj) # call similar permission
    member: (obj = null) -> service.can.create.member(obj) # call similar permission
    organizationSettings: (obj = null) -> service.can.create.organizationSettings(obj) # call similar permission
  }

  return service
])
