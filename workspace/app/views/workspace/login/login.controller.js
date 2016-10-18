angular.module('impacWorkspace').controller('LoginController', function ($scope, $state, DevUser, settings) {
  vm = this;

  if (DevUser.isAuthenticated()) {
    $state.go('workspace.impac');
  }

  vm.creds = { email: '', password: '' };

  vm.login = function () {
    DevUser.login(vm.creds).then(
      function () {
        $state.go('workspace.impac');
      }, function (response) {
        var msg = (response.data && response.data.error) || 'Unable to login';
        DevUser.fail(msg, response);
      }
    );
  };

  return vm;
});
