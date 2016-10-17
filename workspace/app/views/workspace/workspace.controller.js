angular.module('impacWorkspace').controller('WorkspaceController', function ($state, DevUser) {
  main = this;

  main.isAuthenticated = function () {
    return DevUser.isAuthenticated();
  };

  main.logout = function () {
    DevUser.logout().then(
      function () {
        $state.go('workspace.login');
      },
      function (error) {
        DevUser.fail('Unable to logout', error);
      }
    );
  };

  return main;

});
