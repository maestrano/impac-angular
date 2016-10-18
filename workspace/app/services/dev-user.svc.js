// Impac! Angular DevUser Service - providing core authentication logic for Impac! developers.
// --------------------------------------------------------
angular.module('impacWorkspace').service('DevUser', function ($log, $http, $q, Auth, settings, toastr) {
  _self = this;

  // Angular Devise methods exposed via this service
  this.login = Auth.login;
  this.logout = Auth.logout;
  this.isAuthenticated = Auth.isAuthenticated;
  this.currentUser = Auth.currentUser;

  // Get logged in user & organizations from mno-hub
  this.getUserData = function() {
    return $http.get(settings.mno_url + '/current_user').then(
      function (response) {
        var user = (response.data && response.data.current_user);
        if (!user.logged_in) {
          return $q.reject();
        }
        return user || {};
      }, function (error) {
        var msg = 'Unable to retrieve Organizations';
        _self.fail(msg, error);
        return $q.reject(msg);
      }
    );
  };

  this.getCurrentOrganization = function() {
    var deferred = $q.defer();
    _self.getOrganizations(settings.org_uid).then(function (response) {
      currentOrg = _.find(response.organizations, function (org) {
        return org.id == response.currentOrgId;
      });
      deferred.notify(currentOrg);
    });
    return deferred.promise;
  };

  // Get organizations with the currentOrgId from workspace settings
  this.getOrganizations = function(orgUid) {
    return _self.getUserData().then(
      function (user) {
        var orgs = (user.organizations || []);
        var orga = orgs.find(function(orga) { return orga.uid == orgUid });
        var orgId = (orga && orga.id) || orgs[0].id || null;

        return { organizations: orgs, currentOrgId: orgId };
      }, function (err) {
        return $q.reject(err);
      }
    );
  };

  this.getUser = function() {
    return _self.getUserData().then(
      function (user) {
        return user;
      }, function (err) {
        return $q.reject(err);
      }
    );
  };

  // Logging and Toastr notifications method
  this.fail = function (msg, error) {
    if (error == null) { error = ''; }
    $log.error('Develop Workspace Error: ' + msg, error);
    toastr.error(msg, 'Error');
  };

  return this;
});
