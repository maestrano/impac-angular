# angular.module('maestrano.services.user-svc', []).factory('UserSvc', ['$http', ($http) ->
angular.module('maestrano.analytics.user-svc', []).factory('UserSvc', ['$http', ($http) ->
  service = {}

  # Configuration
  service.config = {
    signInPath: '/auth/users/sign_in',
    signUpPath: '/auth/users',
    updatePath: '/auth/users/update',
    confirmationPath: '/auth/users/confirmation',
    updatePasswordPath: '/auth/users/update_password',
  }

  # Load User
  service.then = () ->
  service.loadDocument = (force = false)->
    self = service
    if self.document == undefined || force
      self.query = $http.get("/jpi/v1/users/infos")
      self.then = self.query.then
      self.query.success (data) ->
        self.document = data
    else
      return self.query


  # Returns the id of the loaded user
  service.getId = ->
    self = service
    if self.document?
      return self.document.user.id
    else
      return null

  service.getSsoSessionId = ->
    self = service
    if self.document?
      return self.document.user.sso_session
    else
      return null

  # Return the elements required by the top-right select-box on the dashboard (dashboard-menu.js.coffee)
  service.getSelectBoxData = ->
    self = service
    if self.document? && self.document.user
      user = self.document.user
      return { name: user.name, surname: user.surname, avatar_url: user.avatar_url, organizations: user.organizations }
    else
      return null

  # Sign user in
  # Return a promise
  service.signIn = (email,password) ->
    self = service
    creds = {email: email, password: password}
    $http.post(self.config.signInPath,{user: creds})
      .then(-> self.loadDocument(true))

  service.addOrg = (org) ->
    self = service
    if self.document && self.document.user && self.document.user.organizations
      self.document.user.organizations.push(org)

  # Sign user up
  # expect the following hash:
  # {
  #   name: 'John',
  #   surname: 'Doe',
  #   email: 'john.doe@doecorp.com',
  #   password: 'jdoedoe',
  #   password_confirmation: 'jdoejdoe'
  # }
  # Return a promise
  service.signUp = (hash, bundle=null, org=null) ->
    self = service
    $http.post(self.config.signUpPath,{user: hash, bundle: bundle, organization: org})
      .then(-> self.loadDocument(true))

  service.updateUser = (hash) ->
    self = service
    $http.put(self.config.updatePath,{user: hash})
      .then(-> self.loadDocument(true))

  service.updateEmail = (anEmail) ->
    self = service
    $http.put(self.config.updatePath,{user: {email: anEmail}})
      .then(-> self.loadDocument(true))

  # hash: {
  #   :current_password
  #   :password
  #   :password_confirmation
  # }
  service.updatePassword = (hash) ->
    self = service
    $http.put(self.config.updatePasswordPath,{user: hash})
      .then(-> self.loadDocument(true))

  service.resendConfirmation = (anEmail) ->
    self = service
    $http.post(self.config.confirmationPath,{user: {email: anEmail}})
      .then(-> self.loadDocument(true))

  # Return true if the organization is a customer organization
  service.isCustomerOrganization = (orgId) ->
    self = service
    if self.document
      org = _.find(self.document.user.organizations,(org) ->
        org.id == orgId
      )
      if org then return org.is_customer_account
      else return false
    else return false

  return service

])
