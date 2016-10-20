// -------------------------------------------------------
// Impac! Angular DevUser Service
// --------
// Providing Auth & User data for the Impac! Workspace.
// -------------------------------------------------------
angular.module('impacWorkspace').service('DevUser', function ($log, $http, $q, Auth, toastr) {
  var _self = this;

  // Angular Devise methods exposed via this service
  // ------
  this.login = Auth.login;
  this.logout = Auth.logout;
  this.isAuthenticated = Auth.isAuthenticated;
  this.currentUser = Auth.currentUser;

  // MnoExpress User & Organization retrieval
  // ------
  this.getUserData = function(mnoeUrl) {
    var url = mnoeUrl.host + mnoeUrl.base + '/current_user';
    return $http.get(url).then(
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

  this.getCurrentOrganization = function(orgUid, mnoeUrl) {
    var deferred = $q.defer();
    _self.getOrganizations(orgUid, mnoeUrl).then(function (response) {
      var currentOrg = _.find(response.organizations, function (org) {
        return org.id == response.currentOrgId;
      });
      deferred.notify(currentOrg);
    });
    return deferred.promise;
  };

  this.getOrganizations = function(orgUid, mnoeUrl) {
    return _self.getUserData(mnoeUrl).then(
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

  this.getUser = function(mnoeUrl) {
    return _self.getUserData(mnoeUrl).then(
      function (user) {
        return user;
      }, function (err) {
        return $q.reject(err);
      }
    );
  };

  // Logging and Toastr notifications
  // ------
  this.fail = function (msg, error) {
    if (error == null) { error = ''; }
    $log.error('Develop Workspace Error: ' + msg, error);
    toastr.error(msg, 'Error');
  };

  return this;
});
