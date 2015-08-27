(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.width', ['maestrano.assets']);

module.controller('SettingWidthCtrl', [
  '$scope', function($scope) {
    var setting, w;
    w = $scope.parentWidget;
    w.toogleExpanded = function() {
      $scope.expanded = !$scope.expanded;
      w.updateSettings(false);
      if ($scope.expanded) {
        return w.width = parseInt($scope.max);
      } else {
        return w.width = parseInt($scope.min);
      }
    };
    setting = {};
    setting.key = "width";
    setting.isInitialized = false;
    w.isExpanded = function() {
      return $scope.expanded;
    };
    setting.initialize = function() {
      if (w.width != null) {
        $scope.expanded = w.width === parseInt($scope.max);
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var newWidth;
      if ($scope.expanded) {
        newWidth = $scope.max;
      } else {
        newWidth = $scope.min;
      }
      return {
        width: parseInt(newWidth)
      };
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingWidth', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        min: '@',
        max: '@'
      },
      templateUrl: TemplatePath['analytics/widgets/settings/width.html'],
      controller: 'SettingWidthCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3Mvd2lkdGguanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsNENBQWYsRUFBNEQsQ0FBQyxrQkFBRCxDQUE1RDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQixrQkFBbEIsRUFBc0M7RUFBQyxRQUFELEVBQVcsU0FBQyxNQUFEO0FBRS9DLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLGNBQUYsR0FBbUIsU0FBQTtNQUNqQixNQUFNLENBQUMsUUFBUCxHQUFrQixDQUFDLE1BQU0sQ0FBQztNQUUxQixDQUFDLENBQUMsY0FBRixDQUFpQixLQUFqQjtNQUNBLElBQUcsTUFBTSxDQUFDLFFBQVY7ZUFDRSxDQUFDLENBQUMsS0FBRixHQUFVLFFBQUEsQ0FBUyxNQUFNLENBQUMsR0FBaEIsRUFEWjtPQUFBLE1BQUE7ZUFHRSxDQUFDLENBQUMsS0FBRixHQUFVLFFBQUEsQ0FBUyxNQUFNLENBQUMsR0FBaEIsRUFIWjs7SUFKaUI7SUFVbkIsT0FBQSxHQUFVO0lBQ1YsT0FBTyxDQUFDLEdBQVIsR0FBYztJQUNkLE9BQU8sQ0FBQyxhQUFSLEdBQXdCO0lBRXhCLENBQUMsQ0FBQyxVQUFGLEdBQWUsU0FBQTthQUNiLE1BQU0sQ0FBQztJQURNO0lBSWYsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtNQUNuQixJQUFHLGVBQUg7UUFDRSxNQUFNLENBQUMsUUFBUCxHQUFtQixDQUFDLENBQUMsS0FBRixLQUFXLFFBQUEsQ0FBUyxNQUFNLENBQUMsR0FBaEI7ZUFDOUIsT0FBTyxDQUFDLGFBQVIsR0FBd0IsS0FGMUI7O0lBRG1CO0lBS3JCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7QUFDbkIsVUFBQTtNQUFBLElBQUcsTUFBTSxDQUFDLFFBQVY7UUFDRSxRQUFBLEdBQVcsTUFBTSxDQUFDLElBRHBCO09BQUEsTUFBQTtRQUdFLFFBQUEsR0FBVyxNQUFNLENBQUMsSUFIcEI7O0FBSUEsYUFBTztRQUFFLEtBQUEsRUFBTyxRQUFBLENBQVMsUUFBVCxDQUFUOztJQUxZO0lBT3JCLENBQUMsQ0FBQyxhQUFGLENBQUMsQ0FBQyxXQUFhO1dBQ2YsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFYLENBQWdCLE9BQWhCO0VBbkMrQyxDQUFYO0NBQXRDOztBQXNDQSxNQUFNLENBQUMsU0FBUCxDQUFpQixjQUFqQixFQUFpQztFQUFDLGNBQUQsRUFBaUIsU0FBQyxZQUFEO0FBQ2hELFdBQU87TUFDTCxRQUFBLEVBQVUsR0FETDtNQUVMLEtBQUEsRUFBTztRQUNMLFlBQUEsRUFBYyxHQURUO1FBRUwsR0FBQSxFQUFLLEdBRkE7UUFHTCxHQUFBLEVBQUssR0FIQTtPQUZGO01BT0wsV0FBQSxFQUFhLFlBQWEsQ0FBQSx1Q0FBQSxDQVByQjtNQVFMLFVBQUEsRUFBWSxrQkFSUDs7RUFEeUMsQ0FBakI7Q0FBakMiLCJmaWxlIjoid2lkZ2V0cy9zZXR0aW5ncy93aWR0aC5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldHMtc2V0dGluZ3Mud2lkdGgnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignU2V0dGluZ1dpZHRoQ3RybCcsIFsnJHNjb3BlJywgKCRzY29wZSkgLT5cblxuICB3ID0gJHNjb3BlLnBhcmVudFdpZGdldFxuXG4gIHcudG9vZ2xlRXhwYW5kZWQgPSAtPlxuICAgICRzY29wZS5leHBhbmRlZCA9ICEkc2NvcGUuZXhwYW5kZWRcbiAgICAjIFdlIHdhbnQgdG8gcmVzaXplIHRoZSB3aWRnZXQgd2l0aG91dCB3YWl0aW5nIGZvciB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgZGFzaGJvYXJkaW5nIEFQSVxuICAgIHcudXBkYXRlU2V0dGluZ3MoZmFsc2UpXG4gICAgaWYgJHNjb3BlLmV4cGFuZGVkXG4gICAgICB3LndpZHRoID0gcGFyc2VJbnQoJHNjb3BlLm1heClcbiAgICBlbHNlXG4gICAgICB3LndpZHRoID0gcGFyc2VJbnQoJHNjb3BlLm1pbilcblxuICAjIFdoYXQgd2lsbCBiZSBwYXNzZWQgdG8gcGFyZW50V2lkZ2V0XG4gIHNldHRpbmcgPSB7fVxuICBzZXR0aW5nLmtleSA9IFwid2lkdGhcIlxuICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZVxuXG4gIHcuaXNFeHBhbmRlZCA9IC0+XG4gICAgJHNjb3BlLmV4cGFuZGVkXG5cbiAgIyBpbml0aWFsaXphdGlvbiBvZiB0aW1lIHJhbmdlIHBhcmFtZXRlcnMgZnJvbSB3aWRnZXQuY29udGVudC5oaXN0X3BhcmFtZXRlcnNcbiAgc2V0dGluZy5pbml0aWFsaXplID0gLT5cbiAgICBpZiB3LndpZHRoP1xuICAgICAgJHNjb3BlLmV4cGFuZGVkID0gKHcud2lkdGggPT0gcGFyc2VJbnQoJHNjb3BlLm1heCkpXG4gICAgICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgc2V0dGluZy50b01ldGFkYXRhID0gLT5cbiAgICBpZiAkc2NvcGUuZXhwYW5kZWRcbiAgICAgIG5ld1dpZHRoID0gJHNjb3BlLm1heFxuICAgIGVsc2VcbiAgICAgIG5ld1dpZHRoID0gJHNjb3BlLm1pblxuICAgIHJldHVybiB7IHdpZHRoOiBwYXJzZUludChuZXdXaWR0aCkgfVxuXG4gIHcuc2V0dGluZ3MgfHw9IFtdXG4gIHcuc2V0dGluZ3MucHVzaChzZXR0aW5nKVxuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnc2V0dGluZ1dpZHRoJywgWydUZW1wbGF0ZVBhdGgnLCAoVGVtcGxhdGVQYXRoKSAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgIHBhcmVudFdpZGdldDogJz0nLFxuICAgICAgbWluOiAnQCcsXG4gICAgICBtYXg6ICdAJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiBUZW1wbGF0ZVBhdGhbJ2FuYWx5dGljcy93aWRnZXRzL3NldHRpbmdzL3dpZHRoLmh0bWwnXSxcbiAgICBjb250cm9sbGVyOiAnU2V0dGluZ1dpZHRoQ3RybCdcbiAgfVxuXSkiXX0=