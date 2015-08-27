(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.time-range', ['maestrano.assets']);

module.controller('SettingTimeRangeCtrl', [
  '$scope', function($scope) {
    var setting, w;
    w = $scope.parentWidget;
    $scope.numberOfPeriods = (new Date()).getMonth() + 1;
    $scope.selectedPeriod = "MONTHLY";
    $scope.PERIODS = ['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY'];
    $scope.periodToUnit = function() {
      var nb, period, unit;
      nb = $scope.numberOfPeriods;
      period = $scope.selectedPeriod;
      if (period !== "DAILY") {
        unit = period.substring(0, period.length - 2).toLowerCase();
      } else {
        unit = "day";
      }
      if (nb > 1) {
        unit = unit.concat("s");
      }
      return unit;
    };
    setting = {};
    setting.key = "time-range";
    setting.isInitialized = false;
    setting.initialize = function() {
      var hist;
      if ((w.metadata != null) && (hist = w.metadata.hist_parameters)) {
        if (hist.period != null) {
          $scope.selectedPeriod = hist.period;
        }
        if (hist.number_of_periods != null) {
          $scope.numberOfPeriods = hist.number_of_periods;
        }
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      return {
        hist_parameters: {
          period: $scope.selectedPeriod,
          number_of_periods: $scope.numberOfPeriods
        }
      };
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingTimeRange', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '='
      },
      templateUrl: TemplatePath['analytics/widgets/settings/time-range.html'],
      controller: 'SettingTimeRangeCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3MvdGltZS1yYW5nZS5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxpREFBZixFQUFpRSxDQUFDLGtCQUFELENBQWpFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLHNCQUFsQixFQUEwQztFQUFDLFFBQUQsRUFBVyxTQUFDLE1BQUQ7QUFFbkQsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxNQUFNLENBQUMsZUFBUCxHQUF5QixDQUFLLElBQUEsSUFBQSxDQUFBLENBQUwsQ0FBWSxDQUFDLFFBQWIsQ0FBQSxDQUFBLEdBQTBCO0lBQ25ELE1BQU0sQ0FBQyxjQUFQLEdBQXdCO0lBQ3hCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLENBQUMsT0FBRCxFQUFTLFFBQVQsRUFBa0IsU0FBbEIsRUFBNEIsV0FBNUIsRUFBd0MsUUFBeEM7SUFFakIsTUFBTSxDQUFDLFlBQVAsR0FBc0IsU0FBQTtBQUNwQixVQUFBO01BQUEsRUFBQSxHQUFLLE1BQU0sQ0FBQztNQUNaLE1BQUEsR0FBUyxNQUFNLENBQUM7TUFDaEIsSUFBRyxNQUFBLEtBQVUsT0FBYjtRQUNFLElBQUEsR0FBTyxNQUFNLENBQUMsU0FBUCxDQUFpQixDQUFqQixFQUFtQixNQUFNLENBQUMsTUFBUCxHQUFjLENBQWpDLENBQW1DLENBQUMsV0FBcEMsQ0FBQSxFQURUO09BQUEsTUFBQTtRQUdFLElBQUEsR0FBTyxNQUhUOztNQUlBLElBQUcsRUFBQSxHQUFLLENBQVI7UUFDRSxJQUFBLEdBQU8sSUFBSSxDQUFDLE1BQUwsQ0FBWSxHQUFaLEVBRFQ7O0FBRUEsYUFBTztJQVRhO0lBWXRCLE9BQUEsR0FBVTtJQUNWLE9BQU8sQ0FBQyxHQUFSLEdBQWM7SUFDZCxPQUFPLENBQUMsYUFBUixHQUF3QjtJQUd4QixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO0FBRW5CLFVBQUE7TUFBQSxJQUFHLG9CQUFBLElBQWUsQ0FBQSxJQUFBLEdBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFsQixDQUFsQjtRQUNFLElBQXVDLG1CQUF2QztVQUFBLE1BQU0sQ0FBQyxjQUFQLEdBQXdCLElBQUksQ0FBQyxPQUE3Qjs7UUFDQSxJQUFtRCw4QkFBbkQ7VUFBQSxNQUFNLENBQUMsZUFBUCxHQUF5QixJQUFJLENBQUMsa0JBQTlCOztlQUNBLE9BQU8sQ0FBQyxhQUFSLEdBQXdCLEtBSDFCOztJQUZtQjtJQU9yQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO0FBQ25CLGFBQU87UUFBRSxlQUFBLEVBQWlCO1VBQUMsTUFBQSxFQUFRLE1BQU0sQ0FBQyxjQUFoQjtVQUFnQyxpQkFBQSxFQUFtQixNQUFNLENBQUMsZUFBMUQ7U0FBbkI7O0lBRFk7SUFHckIsQ0FBQyxDQUFDLGFBQUYsQ0FBQyxDQUFDLFdBQWE7V0FDZixDQUFDLENBQUMsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsT0FBaEI7RUFwQ21ELENBQVg7Q0FBMUM7O0FBdUNBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGtCQUFqQixFQUFxQztFQUFDLGNBQUQsRUFBaUIsU0FBQyxZQUFEO0FBQ3BELFdBQU87TUFDTCxRQUFBLEVBQVUsR0FETDtNQUVMLEtBQUEsRUFBTztRQUNMLFlBQUEsRUFBYyxHQURUO09BRkY7TUFLTCxXQUFBLEVBQWEsWUFBYSxDQUFBLDRDQUFBLENBTHJCO01BTUwsVUFBQSxFQUFZLHNCQU5QOztFQUQ2QyxDQUFqQjtDQUFyQyIsImZpbGUiOiJ3aWRnZXRzL3NldHRpbmdzL3RpbWUtcmFuZ2UuanMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXRzLXNldHRpbmdzLnRpbWUtcmFuZ2UnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignU2V0dGluZ1RpbWVSYW5nZUN0cmwnLCBbJyRzY29wZScsICgkc2NvcGUpIC0+XG5cbiAgdyA9ICRzY29wZS5wYXJlbnRXaWRnZXRcblxuICAkc2NvcGUubnVtYmVyT2ZQZXJpb2RzID0gKG5ldyBEYXRlKCkpLmdldE1vbnRoKCkgKyAxXG4gICRzY29wZS5zZWxlY3RlZFBlcmlvZCA9IFwiTU9OVEhMWVwiXG4gICRzY29wZS5QRVJJT0RTID0gWydEQUlMWScsJ1dFRUtMWScsJ01PTlRITFknLCdRVUFSVEVSTFknLCdZRUFSTFknXVxuXG4gICRzY29wZS5wZXJpb2RUb1VuaXQgPSAtPlxuICAgIG5iID0gJHNjb3BlLm51bWJlck9mUGVyaW9kc1xuICAgIHBlcmlvZCA9ICRzY29wZS5zZWxlY3RlZFBlcmlvZFxuICAgIGlmIHBlcmlvZCAhPSBcIkRBSUxZXCJcbiAgICAgIHVuaXQgPSBwZXJpb2Quc3Vic3RyaW5nKDAscGVyaW9kLmxlbmd0aC0yKS50b0xvd2VyQ2FzZSgpXG4gICAgZWxzZVxuICAgICAgdW5pdCA9IFwiZGF5XCJcbiAgICBpZiBuYiA+IDFcbiAgICAgIHVuaXQgPSB1bml0LmNvbmNhdChcInNcIilcbiAgICByZXR1cm4gdW5pdFxuXG4gICMgV2hhdCB3aWxsIGJlIHBhc3NlZCB0byBwYXJlbnRXaWRnZXRcbiAgc2V0dGluZyA9IHt9XG4gIHNldHRpbmcua2V5ID0gXCJ0aW1lLXJhbmdlXCJcbiAgc2V0dGluZy5pc0luaXRpYWxpemVkID0gZmFsc2VcblxuICAjIGluaXRpYWxpemF0aW9uIG9mIHRpbWUgcmFuZ2UgcGFyYW1ldGVycyBmcm9tIHdpZGdldC5jb250ZW50Lmhpc3RfcGFyYW1ldGVyc1xuICBzZXR0aW5nLmluaXRpYWxpemUgPSAtPlxuICAgICMgaWYgdy5jb250ZW50PyAmJiBoaXN0ID0gdy5jb250ZW50Lmhpc3RfcGFyYW1ldGVyc1xuICAgIGlmIHcubWV0YWRhdGE/ICYmIGhpc3QgPSB3Lm1ldGFkYXRhLmhpc3RfcGFyYW1ldGVyc1xuICAgICAgJHNjb3BlLnNlbGVjdGVkUGVyaW9kID0gaGlzdC5wZXJpb2QgaWYgaGlzdC5wZXJpb2Q/XG4gICAgICAkc2NvcGUubnVtYmVyT2ZQZXJpb2RzID0gaGlzdC5udW1iZXJfb2ZfcGVyaW9kcyBpZiBoaXN0Lm51bWJlcl9vZl9wZXJpb2RzP1xuICAgICAgc2V0dGluZy5pc0luaXRpYWxpemVkID0gdHJ1ZVxuXG4gIHNldHRpbmcudG9NZXRhZGF0YSA9IC0+XG4gICAgcmV0dXJuIHsgaGlzdF9wYXJhbWV0ZXJzOiB7cGVyaW9kOiAkc2NvcGUuc2VsZWN0ZWRQZXJpb2QsIG51bWJlcl9vZl9wZXJpb2RzOiAkc2NvcGUubnVtYmVyT2ZQZXJpb2RzfSB9XG5cbiAgdy5zZXR0aW5ncyB8fD0gW11cbiAgdy5zZXR0aW5ncy5wdXNoKHNldHRpbmcpXG5dKVxuXG5tb2R1bGUuZGlyZWN0aXZlKCdzZXR0aW5nVGltZVJhbmdlJywgWydUZW1wbGF0ZVBhdGgnLCAoVGVtcGxhdGVQYXRoKSAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgIHBhcmVudFdpZGdldDogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogVGVtcGxhdGVQYXRoWydhbmFseXRpY3Mvd2lkZ2V0cy9zZXR0aW5ncy90aW1lLXJhbmdlLmh0bWwnXSxcbiAgICBjb250cm9sbGVyOiAnU2V0dGluZ1RpbWVSYW5nZUN0cmwnXG4gIH1cbl0pIl19