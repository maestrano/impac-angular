angular.module('impacWorkspace').controller('ImpacController', function ($state, DevUser) {
  vm = this;

  vm.showImpac = DevUser.isAuthenticated;

  DevUser.currentUser().then(null, function () {
    $state.go('workspace.login');
  });

  return vm;
});
