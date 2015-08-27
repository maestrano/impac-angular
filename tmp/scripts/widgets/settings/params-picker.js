(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.params-picker', ['maestrano.assets']);

module.controller('SettingParamsPickerCtrl', [
  '$scope', 'DhbAnalyticsSvc', function($scope, DhbAnalyticsSvc) {
    var setting, w;
    w = $scope.parentWidget;
    setting = {};
    setting.key = "params-picker";
    setting.isInitialized = false;
    setting.initialize = function() {
      $scope.sortableOptions = {
        'ui-floating': true,
        tolerance: 'pointer'
      };
      if (_.isEmpty($scope.options)) {
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var param;
      param = {};
      param["" + $scope.param] = _.compact(_.map($scope.options, function(statusOption) {
        if (statusOption.selected) {
          return statusOption.label;
        }
      }));
      return param;
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingParamsPicker', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        param: '@',
        options: '='
      },
      link: function(scope, elements, attrs) {
        return scope.formattedParam = scope.param.replace('_', ' ');
      },
      templateUrl: TemplatePath['analytics/widgets/settings/params-picker.html'],
      controller: 'SettingParamsPickerCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3MvcGFyYW1zLXBpY2tlci5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxvREFBZixFQUFvRSxDQUFDLGtCQUFELENBQXBFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLHlCQUFsQixFQUNFO0VBQUMsUUFBRCxFQUFXLGlCQUFYLEVBQ0EsU0FBQyxNQUFELEVBQVMsZUFBVDtBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBR1gsT0FBQSxHQUFVO0lBQ1YsT0FBTyxDQUFDLEdBQVIsR0FBYztJQUNkLE9BQU8sQ0FBQyxhQUFSLEdBQXdCO0lBRXhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7TUFDbkIsTUFBTSxDQUFDLGVBQVAsR0FBeUI7UUFDdkIsYUFBQSxFQUFlLElBRFE7UUFFdkIsU0FBQSxFQUFXLFNBRlk7O01BSXpCLElBQWdDLENBQUMsQ0FBQyxPQUFGLENBQVUsTUFBTSxDQUFDLE9BQWpCLENBQWhDO2VBQUEsT0FBTyxDQUFDLGFBQVIsR0FBd0IsS0FBeEI7O0lBTG1CO0lBUXJCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7QUFDbkIsVUFBQTtNQUFBLEtBQUEsR0FBUTtNQUNSLEtBQU0sQ0FBQSxFQUFBLEdBQUcsTUFBTSxDQUFDLEtBQVYsQ0FBTixHQUEyQixDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxHQUFGLENBQU0sTUFBTSxDQUFDLE9BQWIsRUFBc0IsU0FBQyxZQUFEO1FBQ3pELElBQXNCLFlBQVksQ0FBQyxRQUFuQztpQkFBQSxZQUFZLENBQUMsTUFBYjs7TUFEeUQsQ0FBdEIsQ0FBVjtBQUczQixhQUFPO0lBTFk7SUFPckIsQ0FBQyxDQUFDLGFBQUYsQ0FBQyxDQUFDLFdBQWE7V0FDZixDQUFDLENBQUMsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsT0FBaEI7RUF6QkYsQ0FEQTtDQURGOztBQThCQSxNQUFNLENBQUMsU0FBUCxDQUFpQixxQkFBakIsRUFBd0M7RUFBQyxjQUFELEVBQWlCLFNBQUMsWUFBRDtBQUN2RCxXQUFPO01BQ0wsUUFBQSxFQUFVLEdBREw7TUFFTCxLQUFBLEVBQU87UUFDTCxZQUFBLEVBQWMsR0FEVDtRQUVMLEtBQUEsRUFBTyxHQUZGO1FBR0wsT0FBQSxFQUFTLEdBSEo7T0FGRjtNQU9MLElBQUEsRUFBTSxTQUFDLEtBQUQsRUFBUSxRQUFSLEVBQWtCLEtBQWxCO2VBQ0osS0FBSyxDQUFDLGNBQU4sR0FBdUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFaLENBQW9CLEdBQXBCLEVBQXdCLEdBQXhCO01BRG5CLENBUEQ7TUFTTCxXQUFBLEVBQWEsWUFBYSxDQUFBLCtDQUFBLENBVHJCO01BVUwsVUFBQSxFQUFZLHlCQVZQOztFQURnRCxDQUFqQjtDQUF4QyIsImZpbGUiOiJ3aWRnZXRzL3NldHRpbmdzL3BhcmFtcy1waWNrZXIuanMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXRzLXNldHRpbmdzLnBhcmFtcy1waWNrZXInLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignU2V0dGluZ1BhcmFtc1BpY2tlckN0cmwnLFxuICBbJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMpIC0+XG5cbiAgICB3ID0gJHNjb3BlLnBhcmVudFdpZGdldFxuXG4gICAgIyBXaGF0IHdpbGwgYmUgcGFzc2VkIHRvIHBhcmVudFdpZGdldFxuICAgIHNldHRpbmcgPSB7fVxuICAgIHNldHRpbmcua2V5ID0gXCJwYXJhbXMtcGlja2VyXCJcbiAgICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZVxuXG4gICAgc2V0dGluZy5pbml0aWFsaXplID0gLT5cbiAgICAgICRzY29wZS5zb3J0YWJsZU9wdGlvbnMgPSB7XG4gICAgICAgICd1aS1mbG9hdGluZyc6IHRydWUsXG4gICAgICAgIHRvbGVyYW5jZTogJ3BvaW50ZXInXG4gICAgICB9XG4gICAgICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSB0cnVlIGlmIF8uaXNFbXB0eSgkc2NvcGUub3B0aW9ucylcblxuXG4gICAgc2V0dGluZy50b01ldGFkYXRhID0gLT5cbiAgICAgIHBhcmFtID0ge31cbiAgICAgIHBhcmFtW1wiI3skc2NvcGUucGFyYW19XCJdID0gXy5jb21wYWN0KF8ubWFwICRzY29wZS5vcHRpb25zLCAoc3RhdHVzT3B0aW9uKSAtPlxuICAgICAgICBzdGF0dXNPcHRpb24ubGFiZWwgaWYgc3RhdHVzT3B0aW9uLnNlbGVjdGVkXG4gICAgICApXG4gICAgICByZXR1cm4gcGFyYW1cblxuICAgIHcuc2V0dGluZ3MgfHw9IFtdXG4gICAgdy5zZXR0aW5ncy5wdXNoKHNldHRpbmcpXG5dKVxuXG5tb2R1bGUuZGlyZWN0aXZlKCdzZXR0aW5nUGFyYW1zUGlja2VyJywgWydUZW1wbGF0ZVBhdGgnLCAoVGVtcGxhdGVQYXRoKSAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgIHBhcmVudFdpZGdldDogJz0nLFxuICAgICAgcGFyYW06ICdAJyxcbiAgICAgIG9wdGlvbnM6ICc9JyxcbiAgICB9LFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudHMsIGF0dHJzKSAtPlxuICAgICAgc2NvcGUuZm9ybWF0dGVkUGFyYW0gPSBzY29wZS5wYXJhbS5yZXBsYWNlKCdfJywnICcpXG4gICAgdGVtcGxhdGVVcmw6IFRlbXBsYXRlUGF0aFsnYW5hbHl0aWNzL3dpZGdldHMvc2V0dGluZ3MvcGFyYW1zLXBpY2tlci5odG1sJ10sXG4gICAgY29udHJvbGxlcjogJ1NldHRpbmdQYXJhbXNQaWNrZXJDdHJsJ1xuICB9XG5dKSJdfQ==