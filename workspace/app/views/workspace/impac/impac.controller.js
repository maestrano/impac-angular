angular.module('impacWorkspace').controller('ImpacController', function ($state, DevUser) {
  vm = this;

  vm.showImpac = DevUser.isAuthenticated();

  if (!vm.showImpac) {
    $state.go('workspace.login');
  }

  return vm;
});
