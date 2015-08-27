(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.hist-mode', ['maestrano.assets']);

module.controller('SettingHistModeCtrl', [
  '$scope', 'DhbAnalyticsSvc', function($scope, DhbAnalyticsSvc) {
    var setting, w;
    w = $scope.parentWidget;
    w.isHistoryMode = false;
    $scope.toogleHistMode = function(mode) {
      if ((w.isHistoryMode && mode === 'history') || (!w.isHistoryMode && mode === 'current')) {
        return;
      }
      w.isHistoryMode = !w.isHistoryMode;
      return w.updateSettings(false);
    };
    setting = {};
    setting.key = "hist-mode";
    setting.isInitialized = false;
    setting.initialize = function() {
      var mode;
      if ((w.content != null) && (w.content.hist_parameters != null) && (mode = w.content.hist_parameters.mode)) {
        if (mode === 'history') {
          w.isHistoryMode = true;
        } else {
          w.isHistoryMode = false;
        }
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var mode;
      if (w.isHistoryMode) {
        mode = 'history';
      } else {
        mode = 'current';
      }
      return {
        hist_parameters: {
          mode: mode
        }
      };
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingHistMode', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '='
      },
      templateUrl: TemplatePath['analytics/widgets/settings/hist-mode.html'],
      controller: 'SettingHistModeCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3MvaGlzdC1tb2RlLmpzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLGdEQUFmLEVBQWdFLENBQUMsa0JBQUQsQ0FBaEU7O0FBRVQsTUFBTSxDQUFDLFVBQVAsQ0FBa0IscUJBQWxCLEVBQ0U7RUFBQyxRQUFELEVBQVcsaUJBQVgsRUFDQSxTQUFDLE1BQUQsRUFBUyxlQUFUO0FBRUUsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFDWCxDQUFDLENBQUMsYUFBRixHQUFrQjtJQUVsQixNQUFNLENBQUMsY0FBUCxHQUF3QixTQUFDLElBQUQ7TUFDdEIsSUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFGLElBQW1CLElBQUEsS0FBUSxTQUE1QixDQUFBLElBQTBDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBSCxJQUFvQixJQUFBLEtBQU8sU0FBNUIsQ0FBcEQ7QUFBQSxlQUFBOztNQUNBLENBQUMsQ0FBQyxhQUFGLEdBQWtCLENBQUMsQ0FBQyxDQUFDO2FBQ3JCLENBQUMsQ0FBQyxjQUFGLENBQWlCLEtBQWpCO0lBSHNCO0lBTXhCLE9BQUEsR0FBVTtJQUNWLE9BQU8sQ0FBQyxHQUFSLEdBQWM7SUFDZCxPQUFPLENBQUMsYUFBUixHQUF3QjtJQUd4QixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO0FBQ25CLFVBQUE7TUFBQSxJQUFHLG1CQUFBLElBQWMsbUNBQWQsSUFBNEMsQ0FBQSxJQUFBLEdBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBakMsQ0FBL0M7UUFDRSxJQUFHLElBQUEsS0FBUSxTQUFYO1VBQ0UsQ0FBQyxDQUFDLGFBQUYsR0FBa0IsS0FEcEI7U0FBQSxNQUFBO1VBR0UsQ0FBQyxDQUFDLGFBQUYsR0FBa0IsTUFIcEI7O2VBSUEsT0FBTyxDQUFDLGFBQVIsR0FBd0IsS0FMMUI7O0lBRG1CO0lBUXJCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7QUFDbkIsVUFBQTtNQUFBLElBQUcsQ0FBQyxDQUFDLGFBQUw7UUFDRSxJQUFBLEdBQU8sVUFEVDtPQUFBLE1BQUE7UUFHRSxJQUFBLEdBQU8sVUFIVDs7QUFJQSxhQUFPO1FBQUMsZUFBQSxFQUFpQjtVQUFDLElBQUEsRUFBTSxJQUFQO1NBQWxCOztJQUxZO0lBT3JCLENBQUMsQ0FBQyxhQUFGLENBQUMsQ0FBQyxXQUFhO1dBQ2YsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFYLENBQWdCLE9BQWhCO0VBaENGLENBREE7Q0FERjs7QUFxQ0EsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsaUJBQWpCLEVBQW9DO0VBQUMsY0FBRCxFQUFpQixTQUFDLFlBQUQ7QUFDbkQsV0FBTztNQUNMLFFBQUEsRUFBVSxHQURMO01BRUwsS0FBQSxFQUFPO1FBQ0wsWUFBQSxFQUFjLEdBRFQ7T0FGRjtNQUtMLFdBQUEsRUFBYSxZQUFhLENBQUEsMkNBQUEsQ0FMckI7TUFNTCxVQUFBLEVBQVkscUJBTlA7O0VBRDRDLENBQWpCO0NBQXBDIiwiZmlsZSI6IndpZGdldHMvc2V0dGluZ3MvaGlzdC1tb2RlLmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0cy1zZXR0aW5ncy5oaXN0LW1vZGUnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignU2V0dGluZ0hpc3RNb2RlQ3RybCcsXG4gIFsnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsXG4gICgkc2NvcGUsIERoYkFuYWx5dGljc1N2YykgLT5cblxuICAgIHcgPSAkc2NvcGUucGFyZW50V2lkZ2V0XG4gICAgdy5pc0hpc3RvcnlNb2RlID0gZmFsc2VcblxuICAgICRzY29wZS50b29nbGVIaXN0TW9kZSA9IChtb2RlKSAtPlxuICAgICAgcmV0dXJuIGlmICh3LmlzSGlzdG9yeU1vZGUgJiYgbW9kZSA9PSAnaGlzdG9yeScpIHx8ICghdy5pc0hpc3RvcnlNb2RlICYmIG1vZGUgPT0nY3VycmVudCcpXG4gICAgICB3LmlzSGlzdG9yeU1vZGUgPSAhdy5pc0hpc3RvcnlNb2RlXG4gICAgICB3LnVwZGF0ZVNldHRpbmdzKGZhbHNlKVxuXG4gICAgIyBXaGF0IHdpbGwgYmUgcGFzc2VkIHRvIHBhcmVudFdpZGdldFxuICAgIHNldHRpbmcgPSB7fVxuICAgIHNldHRpbmcua2V5ID0gXCJoaXN0LW1vZGVcIlxuICAgIHNldHRpbmcuaXNJbml0aWFsaXplZCA9IGZhbHNlXG5cbiAgICAjIGluaXRpYWxpemF0aW9uIG9mIHRpbWUgcmFuZ2UgcGFyYW1ldGVycyBmcm9tIHdpZGdldC5jb250ZW50Lmhpc3RfcGFyYW1ldGVyc1xuICAgIHNldHRpbmcuaW5pdGlhbGl6ZSA9IC0+XG4gICAgICBpZiB3LmNvbnRlbnQ/ICYmIHcuY29udGVudC5oaXN0X3BhcmFtZXRlcnM/ICYmIG1vZGUgPSB3LmNvbnRlbnQuaGlzdF9wYXJhbWV0ZXJzLm1vZGVcbiAgICAgICAgaWYgbW9kZSA9PSAnaGlzdG9yeScgXG4gICAgICAgICAgdy5pc0hpc3RvcnlNb2RlID0gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgdy5pc0hpc3RvcnlNb2RlID0gZmFsc2VcbiAgICAgICAgc2V0dGluZy5pc0luaXRpYWxpemVkID0gdHJ1ZVxuXG4gICAgc2V0dGluZy50b01ldGFkYXRhID0gLT5cbiAgICAgIGlmIHcuaXNIaXN0b3J5TW9kZVxuICAgICAgICBtb2RlID0gJ2hpc3RvcnknXG4gICAgICBlbHNlXG4gICAgICAgIG1vZGUgPSAnY3VycmVudCdcbiAgICAgIHJldHVybiB7aGlzdF9wYXJhbWV0ZXJzOiB7bW9kZTogbW9kZX19XG5cbiAgICB3LnNldHRpbmdzIHx8PSBbXVxuICAgIHcuc2V0dGluZ3MucHVzaChzZXR0aW5nKVxuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnc2V0dGluZ0hpc3RNb2RlJywgWydUZW1wbGF0ZVBhdGgnLCAoVGVtcGxhdGVQYXRoKSAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgIHBhcmVudFdpZGdldDogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogVGVtcGxhdGVQYXRoWydhbmFseXRpY3Mvd2lkZ2V0cy9zZXR0aW5ncy9oaXN0LW1vZGUuaHRtbCddLFxuICAgIGNvbnRyb2xsZXI6ICdTZXR0aW5nSGlzdE1vZGVDdHJsJ1xuICB9XG5dKSJdfQ==