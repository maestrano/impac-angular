angular.module('impacWorkspace').controller('LoginController', function ($state, DevUser) {
  vm = this;


  if (DevUser.isAuthenticated()) {
    $state.go('workspace.impac');
  } else {
    DevUser.currentUser().then(function () {
      $state.go('workspace.impac');
    });
  }

  vm.showRegisterForm = false;
  vm.creds = { email: '', password: '', company: '' };

  vm.toggleRegisterForm = function () {
    vm.showRegisterForm = !vm.showRegisterForm;
  };

  vm.login = function () {
    DevUser.login(_.omit(vm.creds, ['company'])).then(
      function () {
        $state.go('workspace.impac');
      }, function (response) {
        var msg = (response.data && response.data.error) || 'Unable to login :(';
        DevUser.fail(msg, response);
      }
    );
  };

  vm.register = function () {
    DevUser.register(vm.creds).then(
      function (res) {
        console.log(res);
        $state.go('workspace.impac');
      }, function (err) {
        var msg = (response.data && response.data.error) || 'Unable to sign up :(';
        DevUser.fail(msg, response);
      }
    );
  };

  return vm;
});