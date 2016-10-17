angular.module('impacWorkspace').controller('LoginController', function ($state, DevUser, settings) {
  vm = this;

  if (DevUser.isAuthenticated()) {
    $state.go('workspace.impac');
  }

  vm.login = function () {
    DevUser.login({email: settings.email, password: settings.password}).then(
      function () {
        $state.go('workspace.impac');
      }, function (error) {
        DevUser.fail('Unable to login', error);
      }
    );
  };

  return vm;
});
