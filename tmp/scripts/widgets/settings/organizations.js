(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.organizations', ['maestrano.assets']);

module.controller('SettingOrganizationsCtrl', [
  '$scope', function($scope) {
    var setting, w;
    w = $scope.parentWidget;
    $scope.dashboardOrganizations = w.parentDashboard.data_sources;
    w.selectedOrganizations = {};
    $scope.isOrganizationSelected = function(orgUid) {
      return !!w.selectedOrganizations[orgUid];
    };
    $scope.toogleSelectOrganization = function(orgUid) {
      return w.selectedOrganizations[orgUid] = !w.selectedOrganizations[orgUid];
    };
    setting = {};
    setting.key = "organizations";
    setting.isInitialized = false;
    setting.initialize = function() {
      if ((w.metadata != null) && (w.metadata.organization_ids != null)) {
        angular.forEach(w.metadata.organization_ids, function(orgUid) {
          return w.selectedOrganizations[orgUid] = true;
        });
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var newOrganizations;
      newOrganizations = _.compact(_.map(w.selectedOrganizations, function(checked, uid) {
        if (checked) {
          return uid;
        }
      }));
      return {
        organization_ids: newOrganizations
      };
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingOrganizations', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '='
      },
      templateUrl: TemplatePath['analytics/widgets/settings/organizations.html'],
      controller: 'SettingOrganizationsCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3Mvb3JnYW5pemF0aW9ucy5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxvREFBZixFQUFvRSxDQUFDLGtCQUFELENBQXBFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLDBCQUFsQixFQUE4QztFQUFDLFFBQUQsRUFBVyxTQUFDLE1BQUQ7QUFFdkQsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxNQUFNLENBQUMsc0JBQVAsR0FBZ0MsQ0FBQyxDQUFDLGVBQWUsQ0FBQztJQUNsRCxDQUFDLENBQUMscUJBQUYsR0FBMEI7SUFFMUIsTUFBTSxDQUFDLHNCQUFQLEdBQWdDLFNBQUMsTUFBRDthQUM5QixDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFzQixDQUFBLE1BQUE7SUFESTtJQUdoQyxNQUFNLENBQUMsd0JBQVAsR0FBa0MsU0FBQyxNQUFEO2FBQ2hDLENBQUMsQ0FBQyxxQkFBc0IsQ0FBQSxNQUFBLENBQXhCLEdBQWtDLENBQUMsQ0FBQyxDQUFDLHFCQUFzQixDQUFBLE1BQUE7SUFEM0I7SUFJbEMsT0FBQSxHQUFVO0lBQ1YsT0FBTyxDQUFDLEdBQVIsR0FBYztJQUNkLE9BQU8sQ0FBQyxhQUFSLEdBQXdCO0lBR3hCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7TUFDbkIsSUFBRyxvQkFBQSxJQUFlLHFDQUFsQjtRQUNFLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQTNCLEVBQTZDLFNBQUMsTUFBRDtpQkFDM0MsQ0FBQyxDQUFDLHFCQUFzQixDQUFBLE1BQUEsQ0FBeEIsR0FBa0M7UUFEUyxDQUE3QztlQUdBLE9BQU8sQ0FBQyxhQUFSLEdBQXdCLEtBSjFCOztJQURtQjtJQU9yQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO0FBQ25CLFVBQUE7TUFBQSxnQkFBQSxHQUFtQixDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxHQUFGLENBQU0sQ0FBQyxDQUFDLHFCQUFSLEVBQStCLFNBQUMsT0FBRCxFQUFTLEdBQVQ7UUFDMUQsSUFBTyxPQUFQO2lCQUFBLElBQUE7O01BRDBELENBQS9CLENBQVY7QUFHbkIsYUFBTztRQUFFLGdCQUFBLEVBQWtCLGdCQUFwQjs7SUFKWTtJQU1yQixDQUFDLENBQUMsYUFBRixDQUFDLENBQUMsV0FBYTtXQUNmLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBWCxDQUFnQixPQUFoQjtFQWpDdUQsQ0FBWDtDQUE5Qzs7QUFvQ0EsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsc0JBQWpCLEVBQXlDO0VBQUMsY0FBRCxFQUFpQixTQUFDLFlBQUQ7QUFDeEQsV0FBTztNQUNMLFFBQUEsRUFBVSxHQURMO01BRUwsS0FBQSxFQUFPO1FBQ0wsWUFBQSxFQUFjLEdBRFQ7T0FGRjtNQUtMLFdBQUEsRUFBYSxZQUFhLENBQUEsK0NBQUEsQ0FMckI7TUFNTCxVQUFBLEVBQVksMEJBTlA7O0VBRGlELENBQWpCO0NBQXpDIiwiZmlsZSI6IndpZGdldHMvc2V0dGluZ3Mvb3JnYW5pemF0aW9ucy5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldHMtc2V0dGluZ3Mub3JnYW5pemF0aW9ucycsWydtYWVzdHJhbm8uYXNzZXRzJ10pXG5cbm1vZHVsZS5jb250cm9sbGVyKCdTZXR0aW5nT3JnYW5pemF0aW9uc0N0cmwnLCBbJyRzY29wZScsICgkc2NvcGUpIC0+XG5cbiAgdyA9ICRzY29wZS5wYXJlbnRXaWRnZXRcblxuICAkc2NvcGUuZGFzaGJvYXJkT3JnYW5pemF0aW9ucyA9IHcucGFyZW50RGFzaGJvYXJkLmRhdGFfc291cmNlc1xuICB3LnNlbGVjdGVkT3JnYW5pemF0aW9ucyA9IHt9XG5cbiAgJHNjb3BlLmlzT3JnYW5pemF0aW9uU2VsZWN0ZWQgPSAob3JnVWlkKSAtPlxuICAgICEhdy5zZWxlY3RlZE9yZ2FuaXphdGlvbnNbb3JnVWlkXVxuXG4gICRzY29wZS50b29nbGVTZWxlY3RPcmdhbml6YXRpb24gPSAob3JnVWlkKSAtPlxuICAgIHcuc2VsZWN0ZWRPcmdhbml6YXRpb25zW29yZ1VpZF0gPSAhdy5zZWxlY3RlZE9yZ2FuaXphdGlvbnNbb3JnVWlkXVxuXG4gICMgV2hhdCB3aWxsIGJlIHBhc3NlZCB0byBwYXJlbnRXaWRnZXRcbiAgc2V0dGluZyA9IHt9XG4gIHNldHRpbmcua2V5ID0gXCJvcmdhbml6YXRpb25zXCJcbiAgc2V0dGluZy5pc0luaXRpYWxpemVkID0gZmFsc2VcblxuICAjIGluaXRpYWxpemF0aW9uIG9mIHNlbGVjdGVkIG9yZ2FuaXphdGlvbnNcbiAgc2V0dGluZy5pbml0aWFsaXplID0gLT5cbiAgICBpZiB3Lm1ldGFkYXRhPyAmJiB3Lm1ldGFkYXRhLm9yZ2FuaXphdGlvbl9pZHM/XG4gICAgICBhbmd1bGFyLmZvckVhY2gody5tZXRhZGF0YS5vcmdhbml6YXRpb25faWRzLCAob3JnVWlkKSAtPlxuICAgICAgICB3LnNlbGVjdGVkT3JnYW5pemF0aW9uc1tvcmdVaWRdID0gdHJ1ZVxuICAgICAgKVxuICAgICAgc2V0dGluZy5pc0luaXRpYWxpemVkID0gdHJ1ZVxuXG4gIHNldHRpbmcudG9NZXRhZGF0YSA9IC0+XG4gICAgbmV3T3JnYW5pemF0aW9ucyA9IF8uY29tcGFjdChfLm1hcCh3LnNlbGVjdGVkT3JnYW5pemF0aW9ucywgKGNoZWNrZWQsdWlkKSAtPlxuICAgICAgdWlkIGlmIGNoZWNrZWRcbiAgICApKVxuICAgIHJldHVybiB7IG9yZ2FuaXphdGlvbl9pZHM6IG5ld09yZ2FuaXphdGlvbnMgfVxuXG4gIHcuc2V0dGluZ3MgfHw9IFtdXG4gIHcuc2V0dGluZ3MucHVzaChzZXR0aW5nKVxuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnc2V0dGluZ09yZ2FuaXphdGlvbnMnLCBbJ1RlbXBsYXRlUGF0aCcsIChUZW1wbGF0ZVBhdGgpIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgcGFyZW50V2lkZ2V0OiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiBUZW1wbGF0ZVBhdGhbJ2FuYWx5dGljcy93aWRnZXRzL3NldHRpbmdzL29yZ2FuaXphdGlvbnMuaHRtbCddLFxuICAgIGNvbnRyb2xsZXI6ICdTZXR0aW5nT3JnYW5pemF0aW9uc0N0cmwnXG4gIH1cbl0pIl19