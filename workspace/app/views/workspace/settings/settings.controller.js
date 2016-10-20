angular.module('impacWorkspace').controller('SettingsController', function ($scope, $state, DevUser, DevSettings) {
  vm = this;

  vm.settings = DevSettings.defaults();
  vm.settings.orgUid = main.currentOrganization.uid || '';
  vm.settings.widgetsTemplates = displayWidgetTemplates(vm.settings.widgetsTemplates);
  vm.updateError = '';

  DevUser.currentUser().then(null, function () {
    $state.go('workspace.login');
  });

  DevUser.getOrganizations(vm.settings.orgUid, vm.settings.mnoeUrl).then(function (data) {
    vm.availableOrgUids = _.map(data.organizations, function (org) {
      return org.uid;
    });
  });

  // On new session (load), current org uid is broadcasted here when it is has been set in the
  // workspace.controller.
  $scope.$on('current-org-uid', function (event, orgUid) {
    vm.settings.orgUid = orgUid;
  });

  vm.update = function () {
    if (!validateWidgetTemplatesJson()) { return; }
    DevSettings.updateProviders(vm.settings);
    $scope.$emit('updated-providers');
    $state.go('workspace.impac');
  };

  vm.back = function () {
    $state.go('workspace.impac');
  };

  vm.resetDefaults = function () {
    vm.settings = DevSettings.resetDefaults();
    vm.settings.orgUid = main.currentOrganization.uid || '';
  }

  function validateWidgetTemplatesJson () {
    var json = document.getElementById('widgets-templates-textarea').value;
    if (!json.length) { json = '[]'; }
    try {
      var array = JSON.parse(json);
    } catch (e) {
      vm.updateError = 'Invalid JSON for Widgets Templates';
      return false;
    }
    vm.settings.widgetsTemplates = array;
    return true;
  }

  function displayWidgetTemplates (templates) {
    return templates.length ? JSON.stringify(templates, undefined, 4) : '';
  }

  return vm;
});
