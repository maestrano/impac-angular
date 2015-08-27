(function () {
var module;

module = angular.module('maestrano.analytics.widget-accounts-expenses-revenue', ['maestrano.assets']);

module.controller('WidgetAccountsExpensesRevenueCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && (w.content.values != null);
    };
    w.format = function() {
      var all_values_are_positive, lineData, lineOptions, pieData, pieOptions;
      if ($scope.isDataFound) {
        lineData = [
          {
            title: "Expenses (" + ($scope.getCurrency()) + ")",
            labels: w.content.dates,
            values: w.content.values.expenses
          }, {
            title: "Revenue (" + ($scope.getCurrency()) + ")",
            labels: w.content.dates,
            values: w.content.values.revenue
          }
        ];
        all_values_are_positive = true;
        angular.forEach(w.content.values.expenses, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        angular.forEach(w.content.values.revenue, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        lineOptions = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        w.hist_chart = ChartFormatterSvc.lineChart(lineData, lineOptions, true);
        pieData = [
          {
            label: "Expenses (" + ($scope.getCurrency()) + ")",
            value: $scope.getCurrentExpenses()
          }, {
            label: "Revenue (" + ($scope.getCurrency()) + ")",
            value: $scope.getCurrentRevenue()
          }
        ];
        pieOptions = {
          tooltipFontSize: 12,
          percentageInnerCutout: 0
        };
        return w.cur_chart = ChartFormatterSvc.pieChart(pieData, pieOptions, true);
      }
    };
    $scope.getCurrentRevenue = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.revenue);
      }
    };
    $scope.getCurrentExpenses = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.expenses);
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency;
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

module.directive('widgetAccountsExpensesRevenue', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("expenses-revenue");
    },
    controller: 'WidgetAccountsExpensesRevenueCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWFjY291bnRzLWV4cGVuc2VzLXJldmVudWUuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsc0RBQWYsRUFBc0UsQ0FBQyxrQkFBRCxDQUF0RTs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQixtQ0FBbEIsRUFBc0Q7RUFDcEQsUUFEb0QsRUFDMUMsaUJBRDBDLEVBQ3ZCLG1CQUR1QixFQUVwRCxTQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGlCQUExQjtBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsU0FBQTthQUNkLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLG1CQUFBLElBQWM7SUFEckI7SUFHaEIsQ0FBQyxDQUFDLE1BQUYsR0FBVyxTQUFBO0FBQ1QsVUFBQTtNQUFBLElBQUcsTUFBTSxDQUFDLFdBQVY7UUFDRSxRQUFBLEdBQVc7VUFDVDtZQUFDLEtBQUEsRUFBTyxZQUFBLEdBQVksQ0FBQyxNQUFNLENBQUMsV0FBUCxDQUFBLENBQUQsQ0FBWixHQUFrQyxHQUExQztZQUE4QyxNQUFBLEVBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFoRTtZQUF1RSxNQUFBLEVBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBaEc7V0FEUyxFQUVUO1lBQUMsS0FBQSxFQUFPLFdBQUEsR0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFQLENBQUEsQ0FBRCxDQUFYLEdBQWlDLEdBQXpDO1lBQTZDLE1BQUEsRUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQS9EO1lBQXNFLE1BQUEsRUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUEvRjtXQUZTOztRQUlYLHVCQUFBLEdBQTBCO1FBQzFCLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQWpDLEVBQTJDLFNBQUMsS0FBRDtpQkFDekMsNEJBQUEsMEJBQTRCLEtBQUEsSUFBUztRQURJLENBQTNDO1FBR0EsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBakMsRUFBMEMsU0FBQyxLQUFEO2lCQUN4Qyw0QkFBQSwwQkFBNEIsS0FBQSxJQUFTO1FBREcsQ0FBMUM7UUFHQSxXQUFBLEdBQWM7VUFDWixnQkFBQSxFQUFrQix1QkFETjtVQUVaLFdBQUEsRUFBYSxLQUZEOztRQUlkLENBQUMsQ0FBQyxVQUFGLEdBQWUsaUJBQWlCLENBQUMsU0FBbEIsQ0FBNEIsUUFBNUIsRUFBcUMsV0FBckMsRUFBa0QsSUFBbEQ7UUFFZixPQUFBLEdBQVU7VUFDUjtZQUFFLEtBQUEsRUFBTyxZQUFBLEdBQVksQ0FBQyxNQUFNLENBQUMsV0FBUCxDQUFBLENBQUQsQ0FBWixHQUFrQyxHQUEzQztZQUErQyxLQUFBLEVBQU8sTUFBTSxDQUFDLGtCQUFQLENBQUEsQ0FBdEQ7V0FEUSxFQUVSO1lBQUUsS0FBQSxFQUFPLFdBQUEsR0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFQLENBQUEsQ0FBRCxDQUFYLEdBQWlDLEdBQTFDO1lBQThDLEtBQUEsRUFBTyxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUFyRDtXQUZROztRQUlWLFVBQUEsR0FBYTtVQUNYLGVBQUEsRUFBaUIsRUFETjtVQUVYLHFCQUFBLEVBQXVCLENBRlo7O2VBSWIsQ0FBQyxDQUFDLFNBQUYsR0FBYyxpQkFBaUIsQ0FBQyxRQUFsQixDQUEyQixPQUEzQixFQUFvQyxVQUFwQyxFQUFnRCxJQUFoRCxFQTFCaEI7O0lBRFM7SUE2QlgsTUFBTSxDQUFDLGlCQUFQLEdBQTJCLFNBQUE7TUFDekIsSUFBb0MsTUFBTSxDQUFDLFdBQTNDO2VBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUF4QixFQUFBOztJQUR5QjtJQUczQixNQUFNLENBQUMsa0JBQVAsR0FBNEIsU0FBQTtNQUMxQixJQUFxQyxNQUFNLENBQUMsV0FBNUM7ZUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQXhCLEVBQUE7O0lBRDBCO0lBRzVCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLFNBQUE7TUFDbkIsSUFBc0IsTUFBTSxDQUFDLFdBQTdCO2VBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFWOztJQURtQjtJQVdyQixnQkFBQSxHQUFtQixTQUFBO01BQ2pCLElBQUcsa0JBQUg7QUFDRSxlQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FEcEI7T0FBQSxNQUFBO0FBR0UsZUFBTyxFQUhUOztJQURpQjtJQU9uQixNQUFNLENBQUMsTUFBUCxDQUFjLGdCQUFkLEVBQWdDLFNBQUMsS0FBRDtNQUM5QixJQUFtQixLQUFBLElBQVMsQ0FBNUI7ZUFBQSxDQUFDLENBQUMsV0FBRixDQUFBLEVBQUE7O0lBRDhCLENBQWhDO0FBR0EsV0FBTztFQS9EVCxDQUZvRDtDQUF0RDs7QUFvRUEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsK0JBQWpCLEVBQWtELFNBQUE7QUFDaEQsU0FBTztJQUNMLFFBQUEsRUFBVSxHQURMO0lBRUwsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVI7TUFDSixPQUFPLENBQUMsUUFBUixDQUFpQixVQUFqQjthQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLGtCQUFqQjtJQUZJLENBRkQ7SUFLSixVQUFBLEVBQVksbUNBTFI7O0FBRHlDLENBQWxEIiwiZmlsZSI6IndpZGdldHMvd2lkZ2V0LWFjY291bnRzLWV4cGVuc2VzLXJldmVudWUuanMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXQtYWNjb3VudHMtZXhwZW5zZXMtcmV2ZW51ZScsWydtYWVzdHJhbm8uYXNzZXRzJ10pXG5cbm1vZHVsZS5jb250cm9sbGVyKCdXaWRnZXRBY2NvdW50c0V4cGVuc2VzUmV2ZW51ZUN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMsIENoYXJ0Rm9ybWF0dGVyU3ZjKSAtPlxuXG4gICAgdyA9ICRzY29wZS53aWRnZXRcblxuICAgIHcuaW5pdENvbnRleHQgPSAtPlxuICAgICAgJHNjb3BlLmlzRGF0YUZvdW5kID0gdy5jb250ZW50PyAmJiB3LmNvbnRlbnQudmFsdWVzP1xuXG4gICAgdy5mb3JtYXQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG4gICAgICAgIGxpbmVEYXRhID0gW1xuICAgICAgICAgIHt0aXRsZTogXCJFeHBlbnNlcyAoI3skc2NvcGUuZ2V0Q3VycmVuY3koKX0pXCIsIGxhYmVsczogdy5jb250ZW50LmRhdGVzLCB2YWx1ZXM6IHcuY29udGVudC52YWx1ZXMuZXhwZW5zZXMgfSxcbiAgICAgICAgICB7dGl0bGU6IFwiUmV2ZW51ZSAoI3skc2NvcGUuZ2V0Q3VycmVuY3koKX0pXCIsIGxhYmVsczogdy5jb250ZW50LmRhdGVzLCB2YWx1ZXM6IHcuY29udGVudC52YWx1ZXMucmV2ZW51ZSB9LFxuICAgICAgICBdXG4gICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlID0gdHJ1ZVxuICAgICAgICBhbmd1bGFyLmZvckVhY2gody5jb250ZW50LnZhbHVlcy5leHBlbnNlcywgKHZhbHVlKSAtPlxuICAgICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlICYmPSB2YWx1ZSA+PSAwXG4gICAgICAgIClcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHcuY29udGVudC52YWx1ZXMucmV2ZW51ZSwgKHZhbHVlKSAtPlxuICAgICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlICYmPSB2YWx1ZSA+PSAwXG4gICAgICAgIClcbiAgICAgICAgbGluZU9wdGlvbnMgPSB7XG4gICAgICAgICAgc2NhbGVCZWdpbkF0WmVybzogYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUsXG4gICAgICAgICAgc2hvd1hMYWJlbHM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgICAgIHcuaGlzdF9jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmxpbmVDaGFydChsaW5lRGF0YSxsaW5lT3B0aW9ucywgdHJ1ZSlcblxuICAgICAgICBwaWVEYXRhID0gW1xuICAgICAgICAgIHsgbGFiZWw6IFwiRXhwZW5zZXMgKCN7JHNjb3BlLmdldEN1cnJlbmN5KCl9KVwiLCB2YWx1ZTogJHNjb3BlLmdldEN1cnJlbnRFeHBlbnNlcygpIH0sXG4gICAgICAgICAgeyBsYWJlbDogXCJSZXZlbnVlICgjeyRzY29wZS5nZXRDdXJyZW5jeSgpfSlcIiwgdmFsdWU6ICRzY29wZS5nZXRDdXJyZW50UmV2ZW51ZSgpIH0sXG4gICAgICAgIF1cbiAgICAgICAgcGllT3B0aW9ucyA9IHtcbiAgICAgICAgICB0b29sdGlwRm9udFNpemU6IDEyLFxuICAgICAgICAgIHBlcmNlbnRhZ2VJbm5lckN1dG91dDogMCxcbiAgICAgICAgfVxuICAgICAgICB3LmN1cl9jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLnBpZUNoYXJ0KHBpZURhdGEsIHBpZU9wdGlvbnMsIHRydWUpXG5cbiAgICAkc2NvcGUuZ2V0Q3VycmVudFJldmVudWUgPSAtPlxuICAgICAgXy5sYXN0KHcuY29udGVudC52YWx1ZXMucmV2ZW51ZSkgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG5cbiAgICAkc2NvcGUuZ2V0Q3VycmVudEV4cGVuc2VzID0gLT5cbiAgICAgIF8ubGFzdCh3LmNvbnRlbnQudmFsdWVzLmV4cGVuc2VzKSBpZiAkc2NvcGUuaXNEYXRhRm91bmRcblxuICAgICRzY29wZS5nZXRDdXJyZW5jeSA9IC0+XG4gICAgICB3LmNvbnRlbnQuY3VycmVuY3kgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIG9yZ2FuaXphdGlvbl9pZHMgKyBoaXN0IG1vZGUgKyB0aW1lIHJhZ2VcbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA+PSAzXG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0QWNjb3VudHNFeHBlbnNlc1JldmVudWUnLCAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50KSAtPlxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImFjY291bnRzXCIpXG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiZXhwZW5zZXMtcmV2ZW51ZVwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0QWNjb3VudHNFeHBlbnNlc1JldmVudWVDdHJsJ1xuICB9XG4pIl19