(function () {
var module,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module = angular.module('maestrano.analytics.widget-sales-cycle', ['maestrano.assets']);

module.controller('WidgetSalesCycleCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'Utilities', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.status_average_durations)) {
        $scope.unit = (w.metadata.unit || w.content.unit || "days").toLowerCase();
        $scope.statusOptions = _.compact(_.map(w.metadata.status_selection, function(status) {
          if (angular.isDefined(w.content.status_average_durations[status])) {
            return {
              label: status,
              selected: true
            };
          }
        }));
        return angular.forEach(w.content.status_average_durations, function(value, status) {
          if (w.metadata.status_selection && !(indexOf.call(w.metadata.status_selection, status) >= 0)) {
            return $scope.statusOptions.push({
              label: status,
              selected: false
            });
          } else if (_.isEmpty(w.metadata.status_selection)) {
            return $scope.statusOptions.push({
              label: status,
              selected: true
            });
          }
        });
      }
    };
    w.format = function() {
      var pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = _.compact(_.map($scope.statusOptions, function(statusOption) {
          var value;
          value = w.content.status_average_durations[statusOption.label];
          if (statusOption.selected && angular.isDefined(value)) {
            return {
              label: ($filter('titleize')(statusOption.label)) + ": " + value + " " + $scope.unit,
              value: value
            };
          }
        }));
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12
        };
        return w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions);
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
      if (total >= 3) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetSalesCycle', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("invoices");
      return element.addClass("summary");
    },
    controller: 'WidgetSalesCycleCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLWN5Y2xlLmpzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLE1BQUE7RUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSx3Q0FBZixFQUF3RCxDQUFDLGtCQUFELENBQXhEOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLHNCQUFsQixFQUF5QztFQUN2QyxRQUR1QyxFQUM3QixpQkFENkIsRUFDVixXQURVLEVBQ0csbUJBREgsRUFDd0IsU0FEeEIsRUFFdkMsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixTQUExQixFQUFxQyxpQkFBckMsRUFBd0QsT0FBeEQ7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7TUFDZCxJQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQUMsQ0FBQyxPQUFwQixDQUFBLElBQWdDLENBQUMsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFwQixDQUF6RDtRQUNFLE1BQU0sQ0FBQyxJQUFQLEdBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQVgsSUFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUE3QixJQUFxQyxNQUF0QyxDQUE2QyxDQUFDLFdBQTlDLENBQUE7UUFFZCxNQUFNLENBQUMsYUFBUCxHQUF1QixDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxHQUFGLENBQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBakIsRUFBbUMsU0FBQyxNQUFEO1VBQ2xFLElBQW1DLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXlCLENBQUEsTUFBQSxDQUFyRCxDQUFuQzttQkFBQTtjQUFDLEtBQUEsRUFBTyxNQUFSO2NBQWdCLFFBQUEsRUFBVSxJQUExQjtjQUFBOztRQURrRSxDQUFuQyxDQUFWO2VBR3ZCLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQTFCLEVBQW9ELFNBQUMsS0FBRCxFQUFRLE1BQVI7VUFDbEQsSUFBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFYLElBQStCLENBQUMsQ0FBQyxhQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQXJCLEVBQUEsTUFBQSxNQUFELENBQW5DO21CQUNFLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBckIsQ0FBMEI7Y0FBQyxLQUFBLEVBQU8sTUFBUjtjQUFnQixRQUFBLEVBQVUsS0FBMUI7YUFBMUIsRUFERjtXQUFBLE1BRUssSUFBRyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQXJCLENBQUg7bUJBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFyQixDQUEwQjtjQUFDLEtBQUEsRUFBTyxNQUFSO2NBQWdCLFFBQUEsRUFBVSxJQUExQjthQUExQixFQURHOztRQUg2QyxDQUFwRCxFQU5GOztJQURjO0lBY2hCLENBQUMsQ0FBQyxNQUFGLEdBQVcsU0FBQTtBQUNULFVBQUE7TUFBQSxJQUFHLE1BQU0sQ0FBQyxXQUFWO1FBQ0UsT0FBQSxHQUFVLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxNQUFNLENBQUMsYUFBYixFQUE0QixTQUFDLFlBQUQ7QUFDOUMsY0FBQTtVQUFBLEtBQUEsR0FBUSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUF5QixDQUFBLFlBQVksQ0FBQyxLQUFiO1VBRTNDLElBR0ssWUFBWSxDQUFDLFFBQWIsSUFBeUIsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsS0FBbEIsQ0FIOUI7bUJBQUE7Y0FDRSxLQUFBLEVBQVMsQ0FBQyxPQUFBLENBQVEsVUFBUixDQUFBLENBQW9CLFlBQVksQ0FBQyxLQUFqQyxDQUFELENBQUEsR0FBeUMsSUFBekMsR0FBNkMsS0FBN0MsR0FBbUQsR0FBbkQsR0FBc0QsTUFBTSxDQUFDLElBRHhFO2NBRUUsS0FBQSxFQUFPLEtBRlQ7Y0FBQTs7UUFIOEMsQ0FBNUIsQ0FBVjtRQVFWLFVBQUEsR0FBYTtVQUNYLHFCQUFBLEVBQXVCLEVBRFo7VUFFWCxlQUFBLEVBQWlCLEVBRk47O2VBSWIsQ0FBQyxDQUFDLEtBQUYsR0FBVSxpQkFBaUIsQ0FBQyxRQUFsQixDQUEyQixPQUEzQixFQUFvQyxVQUFwQyxFQWJaOztJQURTO0lBd0JYLGdCQUFBLEdBQW1CLFNBQUE7TUFDakIsSUFBRyxrQkFBSDtBQUNFLGVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQURwQjtPQUFBLE1BQUE7QUFHRSxlQUFPLEVBSFQ7O0lBRGlCO0lBT25CLE1BQU0sQ0FBQyxNQUFQLENBQWMsZ0JBQWQsRUFBZ0MsU0FBQyxLQUFEO01BQzlCLElBQW1CLEtBQUEsSUFBUyxDQUE1QjtlQUFBLENBQUMsQ0FBQyxXQUFGLENBQUEsRUFBQTs7SUFEOEIsQ0FBaEM7QUFHQSxXQUFPO0VBcERULENBRnVDO0NBQXpDOztBQXlEQSxNQUFNLENBQUMsU0FBUCxDQUFpQixrQkFBakIsRUFBcUMsU0FBQTtBQUNuQyxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFVBQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsU0FBakI7SUFGSSxDQUZEO0lBS0osVUFBQSxFQUFZLHNCQUxSOztBQUQ0QixDQUFyQyIsImZpbGUiOiJ3aWRnZXRzL3dpZGdldC1zYWxlcy1jeWNsZS5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1zYWxlcy1jeWNsZScsWydtYWVzdHJhbm8uYXNzZXRzJ10pXG5cbm1vZHVsZS5jb250cm9sbGVyKCdXaWRnZXRTYWxlc0N5Y2xlQ3RybCcsW1xuICAnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsICdVdGlsaXRpZXMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLCAnJGZpbHRlcicsXG4gICgkc2NvcGUsIERoYkFuYWx5dGljc1N2YywgVXRpbGl0aWVzLCBDaGFydEZvcm1hdHRlclN2YywgJGZpbHRlcikgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCA9IGFuZ3VsYXIuaXNEZWZpbmVkKHcuY29udGVudCkgJiYgIV8uaXNFbXB0eSh3LmNvbnRlbnQuc3RhdHVzX2F2ZXJhZ2VfZHVyYXRpb25zKVxuICAgICAgICAkc2NvcGUudW5pdCA9ICh3Lm1ldGFkYXRhLnVuaXQgfHwgdy5jb250ZW50LnVuaXQgfHwgXCJkYXlzXCIpLnRvTG93ZXJDYXNlKClcblxuICAgICAgICAkc2NvcGUuc3RhdHVzT3B0aW9ucyA9IF8uY29tcGFjdCBfLm1hcCB3Lm1ldGFkYXRhLnN0YXR1c19zZWxlY3Rpb24sIChzdGF0dXMpIC0+XG4gICAgICAgICAge2xhYmVsOiBzdGF0dXMsIHNlbGVjdGVkOiB0cnVlfSBpZiBhbmd1bGFyLmlzRGVmaW5lZCh3LmNvbnRlbnQuc3RhdHVzX2F2ZXJhZ2VfZHVyYXRpb25zW3N0YXR1c10pXG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoIHcuY29udGVudC5zdGF0dXNfYXZlcmFnZV9kdXJhdGlvbnMsICh2YWx1ZSwgc3RhdHVzKSAtPlxuICAgICAgICAgIGlmIHcubWV0YWRhdGEuc3RhdHVzX3NlbGVjdGlvbiAmJiAhKHN0YXR1cyBpbiB3Lm1ldGFkYXRhLnN0YXR1c19zZWxlY3Rpb24pXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzT3B0aW9ucy5wdXNoKHtsYWJlbDogc3RhdHVzLCBzZWxlY3RlZDogZmFsc2V9KVxuICAgICAgICAgIGVsc2UgaWYgXy5pc0VtcHR5KHcubWV0YWRhdGEuc3RhdHVzX3NlbGVjdGlvbilcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXNPcHRpb25zLnB1c2goe2xhYmVsOiBzdGF0dXMsIHNlbGVjdGVkOiB0cnVlfSlcblxuXG4gICAgdy5mb3JtYXQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG4gICAgICAgIHBpZURhdGEgPSBfLmNvbXBhY3QgXy5tYXAgJHNjb3BlLnN0YXR1c09wdGlvbnMsIChzdGF0dXNPcHRpb24pIC0+XG4gICAgICAgICAgdmFsdWUgPSB3LmNvbnRlbnQuc3RhdHVzX2F2ZXJhZ2VfZHVyYXRpb25zW3N0YXR1c09wdGlvbi5sYWJlbF1cblxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiBcIiN7JGZpbHRlcigndGl0bGVpemUnKShzdGF0dXNPcHRpb24ubGFiZWwpfTogI3t2YWx1ZX0gI3skc2NvcGUudW5pdH1cIixcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH0gaWYgc3RhdHVzT3B0aW9uLnNlbGVjdGVkICYmIGFuZ3VsYXIuaXNEZWZpbmVkKHZhbHVlKVxuXG4gICAgICAgIHBpZU9wdGlvbnMgPSB7XG4gICAgICAgICAgcGVyY2VudGFnZUlubmVyQ3V0b3V0OiA1MCxcbiAgICAgICAgICB0b29sdGlwRm9udFNpemU6IDEyLFxuICAgICAgICB9XG4gICAgICAgIHcuY2hhcnQgPSBDaGFydEZvcm1hdHRlclN2Yy5waWVDaGFydChwaWVEYXRhLCBwaWVPcHRpb25zKVxuXG5cbiAgICAjIFRPRE86IFJlZmFjdG9yIG9uY2Ugd2UgaGF2ZSB1bmRlcnN0b29kIGV4YWN0bHkgaG93IHRoZSBhbmd1bGFyanMgY29tcGlsYXRpb24gcHJvY2VzcyB3b3JrczpcbiAgICAjIGluIHRoaXMgb3JkZXIsIHdlIHNob3VsZDpcbiAgICAjIDEtIGNvbXBpbGUgaW1wYWMtd2lkZ2V0IGNvbnRyb2xsZXJcbiAgICAjIDItIGNvbXBpbGUgdGhlIHNwZWNpZmljIHdpZGdldCB0ZW1wbGF0ZS9jb250cm9sbGVyXG4gICAgIyAzLSBjb21waWxlIHRoZSBzZXR0aW5ncyB0ZW1wbGF0ZXMvY29udHJvbGxlcnNcbiAgICAjIDQtIGNhbGwgd2lkZ2V0LmxvYWRDb250ZW50KCkgKGlkZWFsbHksIGZyb20gaW1wYWMtd2lkZ2V0LCBvbmNlIGEgY2FsbGJhY2sgXG4gICAgIyAgICAgYXNzZXNzaW5nIHRoYXQgZXZlcnl0aGluZyBpcyBjb21waWxlZCBhbiByZWFkeSBpcyByZWNlaXZlZClcbiAgICBnZXRTZXR0aW5nc0NvdW50ID0gLT5cbiAgICAgIGlmIHcuc2V0dGluZ3M/XG4gICAgICAgIHJldHVybiB3LnNldHRpbmdzLmxlbmd0aFxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gMFxuXG4gICAgIyB0aW1lIHJhbmdlICsgb3JnYW5pemF0aW9ucyArIHBhcmFtcyBwaWNrZXJcbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA+PSAzXG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0U2FsZXNDeWNsZScsIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiaW52b2ljZXNcIilcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJzdW1tYXJ5XCIpXG4gICAgLGNvbnRyb2xsZXI6ICdXaWRnZXRTYWxlc0N5Y2xlQ3RybCdcbiAgfVxuKSJdfQ==