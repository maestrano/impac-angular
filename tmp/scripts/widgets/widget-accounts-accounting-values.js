(function () {
var module;

module = angular.module('maestrano.analytics.widget-accounts-accounting-values', ['maestrano.assets']);

module.controller('WidgetAccountsAccountingValuesCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && (w.content.accounting != null);
    };
    w.format = function() {
      var all_values_are_positive, data, inputData, options;
      if ($scope.isDataFound) {
        data = angular.copy(w.content.accounting);
        inputData = {
          title: data.type,
          labels: data.dates,
          values: data.values
        };
        all_values_are_positive = true;
        angular.forEach(data.values, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        return w.chart = ChartFormatterSvc.lineChart([inputData], options);
      }
    };
    $scope.getCurrentPrice = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.accounting.values);
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.accounting.currency;
      }
    };
    $scope.getLegend = function() {
      if ($scope.isDataFound) {
        return w.content.accounting.legend;
      }
    };
    getSettingsCount = function() {
      if (w.settings != null) {
        return w.settings.length;
      } else {
        return 0;
      }
    };
    $scope.$watch(getSettingsCount, function(total) {
      if (total === 3) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetAccountsAccountingValue', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("accounting-value");
    },
    controller: 'WidgetAccountsAccountingValuesCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWFjY291bnRzLWFjY291bnRpbmctdmFsdWVzLmpzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLHVEQUFmLEVBQXVFLENBQUMsa0JBQUQsQ0FBdkU7O0FBRVQsTUFBTSxDQUFDLFVBQVAsQ0FBa0Isb0NBQWxCLEVBQXVEO0VBQ3JELFFBRHFELEVBQzNDLGlCQUQyQyxFQUN4QixtQkFEd0IsRUFFckQsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixpQkFBMUI7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7YUFDZCxNQUFNLENBQUMsV0FBUCxHQUFxQixtQkFBQSxJQUFjO0lBRHJCO0lBR2hCLENBQUMsQ0FBQyxNQUFGLEdBQVcsU0FBQTtBQUNULFVBQUE7TUFBQSxJQUFHLE1BQU0sQ0FBQyxXQUFWO1FBQ0UsSUFBQSxHQUFPLE9BQU8sQ0FBQyxJQUFSLENBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUF2QjtRQUNQLFNBQUEsR0FBWTtVQUFDLEtBQUEsRUFBTyxJQUFJLENBQUMsSUFBYjtVQUFtQixNQUFBLEVBQVEsSUFBSSxDQUFDLEtBQWhDO1VBQXVDLE1BQUEsRUFBUSxJQUFJLENBQUMsTUFBcEQ7O1FBQ1osdUJBQUEsR0FBMEI7UUFDMUIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsSUFBSSxDQUFDLE1BQXJCLEVBQTZCLFNBQUMsS0FBRDtpQkFDM0IsNEJBQUEsMEJBQTRCLEtBQUEsSUFBUztRQURWLENBQTdCO1FBSUEsT0FBQSxHQUFVO1VBQ1IsZ0JBQUEsRUFBa0IsdUJBRFY7VUFFUixXQUFBLEVBQWEsS0FGTDs7ZUFJVixDQUFDLENBQUMsS0FBRixHQUFVLGlCQUFpQixDQUFDLFNBQWxCLENBQTRCLENBQUMsU0FBRCxDQUE1QixFQUF3QyxPQUF4QyxFQVpaOztJQURTO0lBZVgsTUFBTSxDQUFDLGVBQVAsR0FBeUIsU0FBQTtNQUN2QixJQUE2QyxNQUFNLENBQUMsV0FBcEQ7QUFBQSxlQUFPLENBQUMsQ0FBQyxJQUFGLENBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBNUIsRUFBUDs7SUFEdUI7SUFHekIsTUFBTSxDQUFDLFdBQVAsR0FBcUIsU0FBQTtNQUNuQixJQUF3QyxNQUFNLENBQUMsV0FBL0M7QUFBQSxlQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQTVCOztJQURtQjtJQUdyQixNQUFNLENBQUMsU0FBUCxHQUFtQixTQUFBO01BQ2pCLElBQXNDLE1BQU0sQ0FBQyxXQUE3QztBQUFBLGVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBNUI7O0lBRGlCO0lBV25CLGdCQUFBLEdBQW1CLFNBQUE7TUFDakIsSUFBRyxrQkFBSDtBQUNFLGVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQURwQjtPQUFBLE1BQUE7QUFHRSxlQUFPLEVBSFQ7O0lBRGlCO0lBTW5CLE1BQU0sQ0FBQyxNQUFQLENBQWMsZ0JBQWQsRUFBZ0MsU0FBQyxLQUFEO01BQzlCLElBQW1CLEtBQUEsS0FBUyxDQUE1QjtlQUFBLENBQUMsQ0FBQyxXQUFGLENBQUEsRUFBQTs7SUFEOEIsQ0FBaEM7QUFHQSxXQUFPO0VBaERULENBRnFEO0NBQXZEOztBQXFEQSxNQUFNLENBQUMsU0FBUCxDQUFpQiwrQkFBakIsRUFBa0QsU0FBQTtBQUNoRCxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFVBQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsa0JBQWpCO0lBRkksQ0FGRDtJQUtKLFVBQUEsRUFBWSxvQ0FMUjs7QUFEeUMsQ0FBbEQiLCJmaWxlIjoid2lkZ2V0cy93aWRnZXQtYWNjb3VudHMtYWNjb3VudGluZy12YWx1ZXMuanMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXQtYWNjb3VudHMtYWNjb3VudGluZy12YWx1ZXMnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0QWNjb3VudHNBY2NvdW50aW5nVmFsdWVzQ3RybCcsW1xuICAnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsICdDaGFydEZvcm1hdHRlclN2YycsXG4gICgkc2NvcGUsIERoYkFuYWx5dGljc1N2YywgQ2hhcnRGb3JtYXR0ZXJTdmMpIC0+XG5cbiAgICB3ID0gJHNjb3BlLndpZGdldFxuXG4gICAgdy5pbml0Q29udGV4dCA9IC0+XG4gICAgICAkc2NvcGUuaXNEYXRhRm91bmQgPSB3LmNvbnRlbnQ/ICYmIHcuY29udGVudC5hY2NvdW50aW5nP1xuXG4gICAgdy5mb3JtYXQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG4gICAgICAgIGRhdGEgPSBhbmd1bGFyLmNvcHkody5jb250ZW50LmFjY291bnRpbmcpXG4gICAgICAgIGlucHV0RGF0YSA9IHt0aXRsZTogZGF0YS50eXBlLCBsYWJlbHM6IGRhdGEuZGF0ZXMsIHZhbHVlczogZGF0YS52YWx1ZXN9XG4gICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlID0gdHJ1ZVxuICAgICAgICBhbmd1bGFyLmZvckVhY2goZGF0YS52YWx1ZXMsICh2YWx1ZSkgLT5cbiAgICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSAmJj0gdmFsdWUgPj0gMFxuICAgICAgICApXG5cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzY2FsZUJlZ2luQXRaZXJvOiBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSxcbiAgICAgICAgICBzaG93WExhYmVsczogZmFsc2UsXG4gICAgICAgIH1cbiAgICAgICAgdy5jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmxpbmVDaGFydChbaW5wdXREYXRhXSxvcHRpb25zKVxuXG4gICAgJHNjb3BlLmdldEN1cnJlbnRQcmljZSA9IC0+XG4gICAgICByZXR1cm4gXy5sYXN0IHcuY29udGVudC5hY2NvdW50aW5nLnZhbHVlcyBpZiAkc2NvcGUuaXNEYXRhRm91bmRcblxuICAgICRzY29wZS5nZXRDdXJyZW5jeSA9IC0+XG4gICAgICByZXR1cm4gdy5jb250ZW50LmFjY291bnRpbmcuY3VycmVuY3kgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG5cbiAgICAkc2NvcGUuZ2V0TGVnZW5kID0gLT5cbiAgICAgIHJldHVybiB3LmNvbnRlbnQuYWNjb3VudGluZy5sZWdlbmQgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA9PSAzXG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0QWNjb3VudHNBY2NvdW50aW5nVmFsdWUnLCAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50KSAtPlxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImFjY291bnRzXCIpXG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiYWNjb3VudGluZy12YWx1ZVwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0QWNjb3VudHNBY2NvdW50aW5nVmFsdWVzQ3RybCcsXG4gIH1cbikiXX0=