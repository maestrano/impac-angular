angular.module('impacWorkspace').controller('WorkspaceController', function ($scope, $state, DevUser, DevSettings, DevSession) {
  main = this;

  main.isAuthenticated = DevUser.isAuthenticated;

  main.currentOrganization = {};

  $scope.$on('devise:login', function () {
    setCurrentOrganization();
  });

  $scope.$on('devise:new-registration', function() {
    setCurrentOrganization();
  });

  $scope.$on('devise:new-session', function () {
    DevSession.update();
  });

  $scope.$on('devise:logout', function () {
    DevSession.update();
  });

  $scope.$on('updated-providers', function () {
    setCurrentOrganization();
  });

  main.settings = function () {
    $state.go('workspace.settings');
  };

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
    defaults = DevSettings.defaults();
    DevUser.getCurrentOrganization(defaults.orgUid, defaults.mnoeUrl).then(null, null, function(org) {
      main.currentOrganization = org;
      $scope.$broadcast('current-org-uid', org.uid)
    });
  }

  return main;

});
