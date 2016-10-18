angular.module('impacWorkspace').controller('WorkspaceController', function ($scope, $state, DevUser) {
  main = this;

  main.isAuthenticated = DevUser.isAuthenticated;

  main.currentOrganization = {};

  $scope.$on('devise:login', function () {
    setCurrentOrganization();
  });

  main.logout = function () {
    DevUser.logout().then(
      function () {
        main.currentOrganization = {};
        $state.go('workspace.login');
      },
      function (error) {
        DevUser.fail('Unable to logout', error);
      }
    );
  };

  function setCurrentOrganization() {
    DevUser.getCurrentOrganization().then(null, null, function(org) {
      main.currentOrganization = org;
    });
  }

  return main;

});
