(function () {
var module;

module = angular.module('maestrano.analytics.widget-hr-employees-list', ['maestrano.assets']);

module.controller('WidgetHrEmployeesListCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'Utilities', '$filter', function($scope, DhbAnalyticsSvc, Utilities, $filter) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content.total) && !_.isEmpty(w.content.employees)) {
        $scope.periodOptions = [
          {
            label: 'Yearly',
            value: 'yearly'
          }, {
            label: 'Monthly',
            value: 'monthly'
          }, {
            label: 'Weekly',
            value: 'weekly'
          }, {
            label: 'Hourly',
            value: 'hourly'
          }
        ];
        return $scope.period = _.find($scope.periodOptions, function(o) {
          return o.value === w.content.total.period.toLowerCase();
        }) || $scope.periodOptions[0];
      }
    };
    $scope.getSingleCompanyName = function() {
      var org, orgUid;
      if (w.content && w.content.organizations) {
        orgUid = w.content.organizations[0];
        org = _.find(w.parentDashboard.data_sources, function(o) {
          return o.uid === orgUid;
        });
        return org.label;
      }
    };
    $scope.getEmployeeSalary = function(anEmployee) {
      if (anEmployee.salary != null) {
        return $filter('mnoCurrency')(anEmployee.salary.amount, w.content.total.currency);
      } else {
        return '-';
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
      if (total === 2) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetHrEmployeesList', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("employees-list");
    },
    controller: 'WidgetHrEmployeesListCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWhyLWVtcGxveWVlcy1saXN0LmpzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLDhDQUFmLEVBQThELENBQUMsa0JBQUQsQ0FBOUQ7O0FBRVQsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsMkJBQWxCLEVBQThDO0VBQzVDLFFBRDRDLEVBQ2xDLGlCQURrQyxFQUNmLFdBRGUsRUFDRixTQURFLEVBRTVDLFNBQUMsTUFBRCxFQUFTLGVBQVQsRUFBMEIsU0FBMUIsRUFBcUMsT0FBckM7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7TUFDZCxJQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLENBQUMsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQXBCLENBQUQsSUFBK0IsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBcEIsQ0FBeEQ7UUFDRSxNQUFNLENBQUMsYUFBUCxHQUF1QjtVQUNyQjtZQUFDLEtBQUEsRUFBTyxRQUFSO1lBQWtCLEtBQUEsRUFBTyxRQUF6QjtXQURxQixFQUVyQjtZQUFDLEtBQUEsRUFBTyxTQUFSO1lBQW1CLEtBQUEsRUFBTyxTQUExQjtXQUZxQixFQUdyQjtZQUFDLEtBQUEsRUFBTyxRQUFSO1lBQWtCLEtBQUEsRUFBTyxRQUF6QjtXQUhxQixFQUlyQjtZQUFDLEtBQUEsRUFBTyxRQUFSO1lBQWtCLEtBQUEsRUFBTyxRQUF6QjtXQUpxQjs7ZUFNdkIsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFNLENBQUMsYUFBZCxFQUE2QixTQUFDLENBQUQ7aUJBQzNDLENBQUMsQ0FBQyxLQUFGLEtBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQXZCLENBQUE7UUFEZ0MsQ0FBN0IsQ0FBQSxJQUVYLE1BQU0sQ0FBQyxhQUFjLENBQUEsQ0FBQSxFQVQ1Qjs7SUFEYztJQVloQixNQUFNLENBQUMsb0JBQVAsR0FBOEIsU0FBQTtBQUM1QixVQUFBO01BQUEsSUFBRyxDQUFDLENBQUMsT0FBRixJQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBMUI7UUFDRSxNQUFBLEdBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFjLENBQUEsQ0FBQTtRQUNqQyxHQUFBLEdBQU0sQ0FBQyxDQUFDLElBQUYsQ0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLFlBQXpCLEVBQXVDLFNBQUMsQ0FBRDtpQkFDM0MsQ0FBQyxDQUFDLEdBQUYsS0FBUztRQURrQyxDQUF2QztBQUdOLGVBQU8sR0FBRyxDQUFDLE1BTGI7O0lBRDRCO0lBUTlCLE1BQU0sQ0FBQyxpQkFBUCxHQUEyQixTQUFDLFVBQUQ7TUFDekIsSUFBRyx5QkFBSDtBQUNFLGVBQU8sT0FBQSxDQUFRLGFBQVIsQ0FBQSxDQUF1QixVQUFVLENBQUMsTUFBTSxDQUFDLE1BQXpDLEVBQWdELENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQWhFLEVBRFQ7T0FBQSxNQUFBO0FBR0UsZUFBTyxJQUhUOztJQUR5QjtJQWEzQixnQkFBQSxHQUFtQixTQUFBO01BQ2pCLElBQUcsa0JBQUg7QUFDRSxlQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FEcEI7T0FBQSxNQUFBO0FBR0UsZUFBTyxFQUhUOztJQURpQjtJQU9uQixNQUFNLENBQUMsTUFBUCxDQUFjLGdCQUFkLEVBQWdDLFNBQUMsS0FBRDtNQUM5QixJQUFtQixLQUFBLEtBQVMsQ0FBNUI7ZUFBQSxDQUFDLENBQUMsV0FBRixDQUFBLEVBQUE7O0lBRDhCLENBQWhDO0FBR0EsV0FBTztFQS9DVCxDQUY0QztDQUE5Qzs7QUFxREEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsdUJBQWpCLEVBQTBDLFNBQUE7QUFDeEMsU0FBTztJQUNMLFFBQUEsRUFBVSxHQURMO0lBRUwsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVI7TUFDSixPQUFPLENBQUMsUUFBUixDQUFpQixJQUFqQjthQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLGdCQUFqQjtJQUZJLENBRkQ7SUFLSixVQUFBLEVBQVksMkJBTFI7O0FBRGlDLENBQTFDIiwiZmlsZSI6IndpZGdldHMvd2lkZ2V0LWhyLWVtcGxveWVlcy1saXN0LmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LWhyLWVtcGxveWVlcy1saXN0JyxbJ21hZXN0cmFuby5hc3NldHMnXSlcblxubW9kdWxlLmNvbnRyb2xsZXIoJ1dpZGdldEhyRW1wbG95ZWVzTGlzdEN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnVXRpbGl0aWVzJywgJyRmaWx0ZXInLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMsIFV0aWxpdGllcywgJGZpbHRlcikgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCA9ICFfLmlzRW1wdHkody5jb250ZW50LnRvdGFsKSAmJiAhXy5pc0VtcHR5KHcuY29udGVudC5lbXBsb3llZXMpXG4gICAgICAgICRzY29wZS5wZXJpb2RPcHRpb25zID0gW1xuICAgICAgICAgIHtsYWJlbDogJ1llYXJseScsIHZhbHVlOiAneWVhcmx5J30sXG4gICAgICAgICAge2xhYmVsOiAnTW9udGhseScsIHZhbHVlOiAnbW9udGhseSd9LFxuICAgICAgICAgIHtsYWJlbDogJ1dlZWtseScsIHZhbHVlOiAnd2Vla2x5J30sXG4gICAgICAgICAge2xhYmVsOiAnSG91cmx5JywgdmFsdWU6ICdob3VybHknfVxuICAgICAgICBdXG4gICAgICAgICRzY29wZS5wZXJpb2QgPSBfLmZpbmQoJHNjb3BlLnBlcmlvZE9wdGlvbnMsIChvKSAtPlxuICAgICAgICAgIG8udmFsdWUgPT0gdy5jb250ZW50LnRvdGFsLnBlcmlvZC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICkgfHwgJHNjb3BlLnBlcmlvZE9wdGlvbnNbMF1cblxuICAgICRzY29wZS5nZXRTaW5nbGVDb21wYW55TmFtZSA9IC0+XG4gICAgICBpZiB3LmNvbnRlbnQgJiYgdy5jb250ZW50Lm9yZ2FuaXphdGlvbnNcbiAgICAgICAgb3JnVWlkID0gdy5jb250ZW50Lm9yZ2FuaXphdGlvbnNbMF1cbiAgICAgICAgb3JnID0gXy5maW5kKHcucGFyZW50RGFzaGJvYXJkLmRhdGFfc291cmNlcywgKG8pIC0+XG4gICAgICAgICAgby51aWQgPT0gb3JnVWlkXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIG9yZy5sYWJlbFxuXG4gICAgJHNjb3BlLmdldEVtcGxveWVlU2FsYXJ5ID0gKGFuRW1wbG95ZWUpIC0+XG4gICAgICBpZiBhbkVtcGxveWVlLnNhbGFyeT9cbiAgICAgICAgcmV0dXJuICRmaWx0ZXIoJ21ub0N1cnJlbmN5JykoYW5FbXBsb3llZS5zYWxhcnkuYW1vdW50LHcuY29udGVudC50b3RhbC5jdXJyZW5jeSlcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuICctJ1xuXG4gICAgIyBUT0RPOiBSZWZhY3RvciBvbmNlIHdlIGhhdmUgdW5kZXJzdG9vZCBleGFjdGx5IGhvdyB0aGUgYW5ndWxhcmpzIGNvbXBpbGF0aW9uIHByb2Nlc3Mgd29ya3M6XG4gICAgIyBpbiB0aGlzIG9yZGVyLCB3ZSBzaG91bGQ6XG4gICAgIyAxLSBjb21waWxlIGltcGFjLXdpZGdldCBjb250cm9sbGVyXG4gICAgIyAyLSBjb21waWxlIHRoZSBzcGVjaWZpYyB3aWRnZXQgdGVtcGxhdGUvY29udHJvbGxlclxuICAgICMgMy0gY29tcGlsZSB0aGUgc2V0dGluZ3MgdGVtcGxhdGVzL2NvbnRyb2xsZXJzXG4gICAgIyA0LSBjYWxsIHdpZGdldC5sb2FkQ29udGVudCgpIChpZGVhbGx5LCBmcm9tIGltcGFjLXdpZGdldCwgb25jZSBhIGNhbGxiYWNrIFxuICAgICMgICAgIGFzc2Vzc2luZyB0aGF0IGV2ZXJ5dGhpbmcgaXMgY29tcGlsZWQgYW4gcmVhZHkgaXMgcmVjZWl2ZWQpXG4gICAgZ2V0U2V0dGluZ3NDb3VudCA9IC0+XG4gICAgICBpZiB3LnNldHRpbmdzP1xuICAgICAgICByZXR1cm4gdy5zZXR0aW5ncy5sZW5ndGhcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIDBcblxuICAgICMgU2V0dGluZ3M6IG9yZ2FuaXphdGlvbnMgKyB4MSBwYXJhbSBzZWxlY3RvclxuICAgICRzY29wZS4kd2F0Y2ggZ2V0U2V0dGluZ3NDb3VudCwgKHRvdGFsKSAtPlxuICAgICAgdy5sb2FkQ29udGVudCgpIGlmIHRvdGFsID09IDJcblxuICAgIHJldHVybiB3XG5cbl0pXG5cbm1vZHVsZS5kaXJlY3RpdmUoJ3dpZGdldEhyRW1wbG95ZWVzTGlzdCcsIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiaHJcIilcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJlbXBsb3llZXMtbGlzdFwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0SHJFbXBsb3llZXNMaXN0Q3RybCdcbiAgfVxuKSJdfQ==