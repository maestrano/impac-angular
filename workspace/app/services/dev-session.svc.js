// -------------------------------------------------------
// Impac! Angular DevSession Service
// --------
// Providing CSRF Support for Impac! Workspace.
// -------------------------------------------------------
angular.module('impacWorkspace').service('DevSession', function ($log, $http, $cookies, CSRF, DevSettings) {
  var _self = this;

  // Create a session and xsrf token - ping mnoe api so we get a valid XSRF cookie.
  this.create = function () {
    return $http.get(DevSettings.defaults().mnoeUrl.host + '/mnoe/auth/users/sign_in.json')
      .success(function() {
        _self.setCsrfHttpHeader();
      });
  };

  // Angular Devise methods (e.g `Auth.currentUser()`) generate new sessions, this keeps the
  // default http headers up to date, ensuring the session is maintained.
  this.update = function () {
    this.setCsrfHttpHeader();
  };

  // Set stored XSRF cookie as $http headers common.
  this.setCsrfHttpHeader = function () {
    $http.defaults.headers.common[CSRF.headerTokenKey] = $cookies.get(CSRF.cookieTokenKey);
  };

  return this;
});
