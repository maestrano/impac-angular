(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.account', ['maestrano.assets']);

module.controller('SettingAccountCtrl', [
  '$scope', '$filter', function($scope, $filter) {
    var setting, w;
    w = $scope.parentWidget;
    setting = {};
    setting.key = "account";
    setting.isInitialized = false;
    setting.initialize = function() {
      w.selectedAccount = null;
      if ((w.content != null) && (w.content.account_list != null) && (w.metadata != null) && (w.metadata.account_uid != null)) {
        w.selectedAccount = _.find(w.content.account_list, function(acc) {
          return acc.uid === w.metadata.account_uid;
        });
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      if (w.selectedAccount != null) {
        return {
          account_uid: w.selectedAccount.uid
        };
      }
    };
    $scope.formatAmount = function(anAccount) {
      return $filter('mnoCurrency')(anAccount.current_balance, anAccount.currency);
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingAccount', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '='
      },
      templateUrl: TemplatePath['analytics/widgets/settings/account.html'],
      controller: 'SettingAccountCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3MvYWNjb3VudC5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSw4Q0FBZixFQUE4RCxDQUFDLGtCQUFELENBQTlEOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLG9CQUFsQixFQUF3QztFQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLFNBQUMsTUFBRCxFQUFTLE9BQVQ7QUFFNUQsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFHWCxPQUFBLEdBQVU7SUFDVixPQUFPLENBQUMsR0FBUixHQUFjO0lBQ2QsT0FBTyxDQUFDLGFBQVIsR0FBd0I7SUFHeEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtNQUNuQixDQUFDLENBQUMsZUFBRixHQUFvQjtNQUNwQixJQUFHLG1CQUFBLElBQWMsZ0NBQWQsSUFBeUMsb0JBQXpDLElBQXdELGdDQUEzRDtRQUNFLENBQUMsQ0FBQyxlQUFGLEdBQW9CLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFqQixFQUErQixTQUFDLEdBQUQ7aUJBQ2pELEdBQUcsQ0FBQyxHQUFKLEtBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUQyQixDQUEvQjtlQUdwQixPQUFPLENBQUMsYUFBUixHQUF3QixLQUoxQjs7SUFGbUI7SUFRckIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtNQUNuQixJQUFpRCx5QkFBakQ7QUFBQSxlQUFPO1VBQUUsV0FBQSxFQUFhLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBakM7VUFBUDs7SUFEbUI7SUFHckIsTUFBTSxDQUFDLFlBQVAsR0FBc0IsU0FBQyxTQUFEO0FBQ3BCLGFBQU8sT0FBQSxDQUFRLGFBQVIsQ0FBQSxDQUF1QixTQUFTLENBQUMsZUFBakMsRUFBaUQsU0FBUyxDQUFDLFFBQTNEO0lBRGE7SUFHdEIsQ0FBQyxDQUFDLGFBQUYsQ0FBQyxDQUFDLFdBQWE7V0FDZixDQUFDLENBQUMsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsT0FBaEI7RUF6QjRELENBQXRCO0NBQXhDOztBQTRCQSxNQUFNLENBQUMsU0FBUCxDQUFpQixnQkFBakIsRUFBbUM7RUFBQyxjQUFELEVBQWlCLFNBQUMsWUFBRDtBQUNsRCxXQUFPO01BQ0wsUUFBQSxFQUFVLEdBREw7TUFFTCxLQUFBLEVBQU87UUFDTCxZQUFBLEVBQWMsR0FEVDtPQUZGO01BS0wsV0FBQSxFQUFhLFlBQWEsQ0FBQSx5Q0FBQSxDQUxyQjtNQU1MLFVBQUEsRUFBWSxvQkFOUDs7RUFEMkMsQ0FBakI7Q0FBbkMiLCJmaWxlIjoid2lkZ2V0cy9zZXR0aW5ncy9hY2NvdW50LmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0cy1zZXR0aW5ncy5hY2NvdW50JyxbJ21hZXN0cmFuby5hc3NldHMnXSlcblxubW9kdWxlLmNvbnRyb2xsZXIoJ1NldHRpbmdBY2NvdW50Q3RybCcsIFsnJHNjb3BlJywgJyRmaWx0ZXInLCAoJHNjb3BlLCAkZmlsdGVyKSAtPlxuXG4gIHcgPSAkc2NvcGUucGFyZW50V2lkZ2V0XG5cbiAgIyBXaGF0IHdpbGwgYmUgcGFzc2VkIHRvIHBhcmVudFdpZGdldFxuICBzZXR0aW5nID0ge31cbiAgc2V0dGluZy5rZXkgPSBcImFjY291bnRcIlxuICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZVxuXG4gICMgaW5pdGlhbGl6YXRpb24gb2YgdGltZSByYW5nZSBwYXJhbWV0ZXJzIGZyb20gd2lkZ2V0LmNvbnRlbnQuaGlzdF9wYXJhbWV0ZXJzXG4gIHNldHRpbmcuaW5pdGlhbGl6ZSA9IC0+XG4gICAgdy5zZWxlY3RlZEFjY291bnQgPSBudWxsXG4gICAgaWYgdy5jb250ZW50PyAmJiB3LmNvbnRlbnQuYWNjb3VudF9saXN0PyAmJiB3Lm1ldGFkYXRhPyAmJiB3Lm1ldGFkYXRhLmFjY291bnRfdWlkP1xuICAgICAgdy5zZWxlY3RlZEFjY291bnQgPSBfLmZpbmQody5jb250ZW50LmFjY291bnRfbGlzdCwgKGFjYykgLT5cbiAgICAgICAgYWNjLnVpZCA9PSB3Lm1ldGFkYXRhLmFjY291bnRfdWlkXG4gICAgICApXG4gICAgICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgc2V0dGluZy50b01ldGFkYXRhID0gLT5cbiAgICByZXR1cm4geyBhY2NvdW50X3VpZDogdy5zZWxlY3RlZEFjY291bnQudWlkIH0gaWYgdy5zZWxlY3RlZEFjY291bnQ/IFxuXG4gICRzY29wZS5mb3JtYXRBbW91bnQgPSAoYW5BY2NvdW50KSAtPlxuICAgIHJldHVybiAkZmlsdGVyKCdtbm9DdXJyZW5jeScpKGFuQWNjb3VudC5jdXJyZW50X2JhbGFuY2UsYW5BY2NvdW50LmN1cnJlbmN5KVxuXG4gIHcuc2V0dGluZ3MgfHw9IFtdXG4gIHcuc2V0dGluZ3MucHVzaChzZXR0aW5nKVxuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnc2V0dGluZ0FjY291bnQnLCBbJ1RlbXBsYXRlUGF0aCcsIChUZW1wbGF0ZVBhdGgpIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBzY29wZToge1xuICAgICAgcGFyZW50V2lkZ2V0OiAnPSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiBUZW1wbGF0ZVBhdGhbJ2FuYWx5dGljcy93aWRnZXRzL3NldHRpbmdzL2FjY291bnQuaHRtbCddLFxuICAgIGNvbnRyb2xsZXI6ICdTZXR0aW5nQWNjb3VudEN0cmwnXG4gIH1cbl0pIl19