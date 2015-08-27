(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.param-selector', ['maestrano.assets']);

module.controller('SettingParamSelectorCtrl', [
  '$scope', 'DhbAnalyticsSvc', function($scope, DhbAnalyticsSvc) {
    var setting, w;
    $scope.showOptions = false;
    $scope.toogleShowOptions = function() {
      return $scope.showOptions = !$scope.showOptions;
    };
    $scope.selectOption = function(anOption) {
      if (anOption !== $scope.selected) {
        $scope.selected = anOption;
        w.updateSettings(!$scope.noReload);
      }
      return $scope.toogleShowOptions();
    };
    $scope.getTruncateValue = function() {
      return parseInt($scope.truncateNo) || 20;
    };
    w = $scope.parentWidget;
    setting = {};
    setting.key = "param-selector";
    setting.isInitialized = false;
    setting.initialize = function() {
      if (w.content != null) {
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var param;
      param = {};
      param["" + $scope.param] = $scope.selected.value;
      return param;
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingParamSelector', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '=',
        param: '@',
        options: '=',
        selected: '=',
        truncateNo: '@'
      },
      link: function(scope, elements, attrs) {
        scope.noReload = typeof attrs.noReload !== 'undefined';
        return scope.truncateNo = attrs.truncateNo || 20;
      },
      templateUrl: TemplatePath['analytics/widgets/settings/param-selector.html'],
      controller: 'SettingParamSelectorCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3MvcGFyYW0tc2VsZWN0b3IuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUscURBQWYsRUFBcUUsQ0FBQyxrQkFBRCxDQUFyRTs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQiwwQkFBbEIsRUFDRTtFQUFDLFFBQUQsRUFBVyxpQkFBWCxFQUNBLFNBQUMsTUFBRCxFQUFTLGVBQVQ7QUFFRSxRQUFBO0lBQUEsTUFBTSxDQUFDLFdBQVAsR0FBcUI7SUFFckIsTUFBTSxDQUFDLGlCQUFQLEdBQTJCLFNBQUE7YUFDekIsTUFBTSxDQUFDLFdBQVAsR0FBcUIsQ0FBQyxNQUFNLENBQUM7SUFESjtJQUczQixNQUFNLENBQUMsWUFBUCxHQUFzQixTQUFDLFFBQUQ7TUFDcEIsSUFBRyxRQUFBLEtBQVksTUFBTSxDQUFDLFFBQXRCO1FBQ0UsTUFBTSxDQUFDLFFBQVAsR0FBa0I7UUFDbEIsQ0FBQyxDQUFDLGNBQUYsQ0FBaUIsQ0FBQyxNQUFNLENBQUMsUUFBekIsRUFGRjs7YUFHQSxNQUFNLENBQUMsaUJBQVAsQ0FBQTtJQUpvQjtJQU10QixNQUFNLENBQUMsZ0JBQVAsR0FBMEIsU0FBQTtBQUN4QixhQUFPLFFBQUEsQ0FBUyxNQUFNLENBQUMsVUFBaEIsQ0FBQSxJQUErQjtJQURkO0lBRzFCLENBQUEsR0FBSSxNQUFNLENBQUM7SUFHWCxPQUFBLEdBQVU7SUFDVixPQUFPLENBQUMsR0FBUixHQUFjO0lBQ2QsT0FBTyxDQUFDLGFBQVIsR0FBd0I7SUFHeEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtNQUNuQixJQUFnQyxpQkFBaEM7ZUFBQSxPQUFPLENBQUMsYUFBUixHQUF3QixLQUF4Qjs7SUFEbUI7SUFHckIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtBQUNuQixVQUFBO01BQUEsS0FBQSxHQUFRO01BQ1IsS0FBTSxDQUFBLEVBQUEsR0FBRyxNQUFNLENBQUMsS0FBVixDQUFOLEdBQTJCLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDM0MsYUFBTztJQUhZO0lBS3JCLENBQUMsQ0FBQyxhQUFGLENBQUMsQ0FBQyxXQUFhO1dBQ2YsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFYLENBQWdCLE9BQWhCO0VBakNGLENBREE7Q0FERjs7QUFzQ0EsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsc0JBQWpCLEVBQXlDO0VBQUMsY0FBRCxFQUFpQixTQUFDLFlBQUQ7QUFDeEQsV0FBTztNQUNMLFFBQUEsRUFBVSxHQURMO01BRUwsS0FBQSxFQUFPO1FBQ0wsWUFBQSxFQUFjLEdBRFQ7UUFFTCxLQUFBLEVBQU8sR0FGRjtRQUdMLE9BQUEsRUFBUyxHQUhKO1FBSUwsUUFBQSxFQUFVLEdBSkw7UUFLTCxVQUFBLEVBQVksR0FMUDtPQUZGO01BU0wsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsS0FBbEI7UUFDSixLQUFLLENBQUMsUUFBTixHQUFpQixPQUFPLEtBQUssQ0FBQyxRQUFiLEtBQXlCO2VBQzFDLEtBQUssQ0FBQyxVQUFOLEdBQW1CLEtBQUssQ0FBQyxVQUFOLElBQW9CO01BRm5DLENBVEQ7TUFZTCxXQUFBLEVBQWEsWUFBYSxDQUFBLGdEQUFBLENBWnJCO01BYUwsVUFBQSxFQUFZLDBCQWJQOztFQURpRCxDQUFqQjtDQUF6QyIsImZpbGUiOiJ3aWRnZXRzL3NldHRpbmdzL3BhcmFtLXNlbGVjdG9yLmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0cy1zZXR0aW5ncy5wYXJhbS1zZWxlY3RvcicsWydtYWVzdHJhbm8uYXNzZXRzJ10pXG5cbm1vZHVsZS5jb250cm9sbGVyKCdTZXR0aW5nUGFyYW1TZWxlY3RvckN0cmwnLFxuICBbJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMpIC0+XG5cbiAgICAkc2NvcGUuc2hvd09wdGlvbnMgPSBmYWxzZVxuXG4gICAgJHNjb3BlLnRvb2dsZVNob3dPcHRpb25zID0gLT5cbiAgICAgICRzY29wZS5zaG93T3B0aW9ucyA9ICEkc2NvcGUuc2hvd09wdGlvbnNcblxuICAgICRzY29wZS5zZWxlY3RPcHRpb24gPSAoYW5PcHRpb24pIC0+XG4gICAgICBpZiBhbk9wdGlvbiAhPSAkc2NvcGUuc2VsZWN0ZWRcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkID0gYW5PcHRpb25cbiAgICAgICAgdy51cGRhdGVTZXR0aW5ncyghJHNjb3BlLm5vUmVsb2FkKVxuICAgICAgJHNjb3BlLnRvb2dsZVNob3dPcHRpb25zKClcblxuICAgICRzY29wZS5nZXRUcnVuY2F0ZVZhbHVlID0gLT5cbiAgICAgIHJldHVybiBwYXJzZUludCgkc2NvcGUudHJ1bmNhdGVObykgfHwgMjBcblxuICAgIHcgPSAkc2NvcGUucGFyZW50V2lkZ2V0XG5cbiAgICAjIFdoYXQgd2lsbCBiZSBwYXNzZWQgdG8gcGFyZW50V2lkZ2V0XG4gICAgc2V0dGluZyA9IHt9XG4gICAgc2V0dGluZy5rZXkgPSBcInBhcmFtLXNlbGVjdG9yXCJcbiAgICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZVxuXG4gICAgIyBpbml0aWFsaXphdGlvbiBvZiB0aW1lIHJhbmdlIHBhcmFtZXRlcnMgZnJvbSB3aWRnZXQuY29udGVudC5oaXN0X3BhcmFtZXRlcnNcbiAgICBzZXR0aW5nLmluaXRpYWxpemUgPSAtPlxuICAgICAgc2V0dGluZy5pc0luaXRpYWxpemVkID0gdHJ1ZSBpZiB3LmNvbnRlbnQ/XG5cbiAgICBzZXR0aW5nLnRvTWV0YWRhdGEgPSAtPlxuICAgICAgcGFyYW0gPSB7fVxuICAgICAgcGFyYW1bXCIjeyRzY29wZS5wYXJhbX1cIl0gPSAkc2NvcGUuc2VsZWN0ZWQudmFsdWVcbiAgICAgIHJldHVybiBwYXJhbVxuXG4gICAgdy5zZXR0aW5ncyB8fD0gW11cbiAgICB3LnNldHRpbmdzLnB1c2goc2V0dGluZylcbl0pXG5cbm1vZHVsZS5kaXJlY3RpdmUoJ3NldHRpbmdQYXJhbVNlbGVjdG9yJywgWydUZW1wbGF0ZVBhdGgnLCAoVGVtcGxhdGVQYXRoKSAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgIHBhcmVudFdpZGdldDogJz0nLFxuICAgICAgcGFyYW06ICdAJyxcbiAgICAgIG9wdGlvbnM6ICc9JyxcbiAgICAgIHNlbGVjdGVkOiAnPScsXG4gICAgICB0cnVuY2F0ZU5vOiAnQCcsXG4gICAgfSxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnRzLCBhdHRycykgLT5cbiAgICAgIHNjb3BlLm5vUmVsb2FkID0gdHlwZW9mIGF0dHJzLm5vUmVsb2FkICE9ICd1bmRlZmluZWQnXG4gICAgICBzY29wZS50cnVuY2F0ZU5vID0gYXR0cnMudHJ1bmNhdGVObyB8fCAyMFxuICAgIHRlbXBsYXRlVXJsOiBUZW1wbGF0ZVBhdGhbJ2FuYWx5dGljcy93aWRnZXRzL3NldHRpbmdzL3BhcmFtLXNlbGVjdG9yLmh0bWwnXSxcbiAgICBjb250cm9sbGVyOiAnU2V0dGluZ1BhcmFtU2VsZWN0b3JDdHJsJ1xuICB9XG5dKSJdfQ==