(function () {
var module;

module = angular.module('maestrano.analytics.widget-accounts-payable-receivable', ['maestrano.assets']);

module.controller('WidgetAccountsPayableReceivableCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && (w.content.values != null);
    };
    w.format = function() {
      var all_values_are_positive, lineData, lineOptions;
      if ($scope.isDataFound) {
        lineData = [
          {
            title: "Payable",
            labels: w.content.dates,
            values: w.content.values.payables
          }, {
            title: "Receivable",
            labels: w.content.dates,
            values: w.content.values.receivables
          }
        ];
        all_values_are_positive = true;
        angular.forEach(w.content.values.payables, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        angular.forEach(w.content.values.receivables, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        lineOptions = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        return w.chart = ChartFormatterSvc.lineChart(lineData, lineOptions, true);
      }
    };
    $scope.getCurrentPayable = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.payables);
      }
    };
    $scope.getCurrentReceivable = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.values.receivables);
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
      if (total === 3) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetAccountsPayableReceivable', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("payable-receivable");
    },
    controller: 'WidgetAccountsPayableReceivableCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWFjY291bnRzLXBheWFibGUtcmVjZWl2YWJsZS5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSx3REFBZixFQUF3RSxDQUFDLGtCQUFELENBQXhFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLHFDQUFsQixFQUF3RDtFQUN0RCxRQURzRCxFQUM1QyxpQkFENEMsRUFDekIsbUJBRHlCLEVBRXRELFNBQUMsTUFBRCxFQUFTLGVBQVQsRUFBMEIsaUJBQTFCO0FBRUUsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxDQUFDLENBQUMsV0FBRixHQUFnQixTQUFBO2FBQ2QsTUFBTSxDQUFDLFdBQVAsR0FBcUIsbUJBQUEsSUFBYztJQURyQjtJQUdoQixDQUFDLENBQUMsTUFBRixHQUFXLFNBQUE7QUFDVCxVQUFBO01BQUEsSUFBRyxNQUFNLENBQUMsV0FBVjtRQUNFLFFBQUEsR0FBVztVQUNUO1lBQUMsS0FBQSxFQUFPLFNBQVI7WUFBbUIsTUFBQSxFQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBckM7WUFBNEMsTUFBQSxFQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQXJFO1dBRFMsRUFFVDtZQUFDLEtBQUEsRUFBTyxZQUFSO1lBQXNCLE1BQUEsRUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQXhDO1lBQStDLE1BQUEsRUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUF4RTtXQUZTOztRQUlYLHVCQUFBLEdBQTBCO1FBQzFCLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQWpDLEVBQTJDLFNBQUMsS0FBRDtpQkFDekMsNEJBQUEsMEJBQTRCLEtBQUEsSUFBUztRQURJLENBQTNDO1FBR0EsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBakMsRUFBOEMsU0FBQyxLQUFEO2lCQUM1Qyw0QkFBQSwwQkFBNEIsS0FBQSxJQUFTO1FBRE8sQ0FBOUM7UUFHQSxXQUFBLEdBQWM7VUFDWixnQkFBQSxFQUFrQix1QkFETjtVQUVaLFdBQUEsRUFBYSxLQUZEOztlQUlkLENBQUMsQ0FBQyxLQUFGLEdBQVUsaUJBQWlCLENBQUMsU0FBbEIsQ0FBNEIsUUFBNUIsRUFBcUMsV0FBckMsRUFBa0QsSUFBbEQsRUFoQlo7O0lBRFM7SUFtQlgsTUFBTSxDQUFDLGlCQUFQLEdBQTJCLFNBQUE7TUFDekIsSUFBcUMsTUFBTSxDQUFDLFdBQTVDO2VBQUEsQ0FBQyxDQUFDLElBQUYsQ0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUF4QixFQUFBOztJQUR5QjtJQUczQixNQUFNLENBQUMsb0JBQVAsR0FBOEIsU0FBQTtNQUM1QixJQUF3QyxNQUFNLENBQUMsV0FBL0M7ZUFBQSxDQUFDLENBQUMsSUFBRixDQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQXhCLEVBQUE7O0lBRDRCO0lBRzlCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLFNBQUE7TUFDbkIsSUFBc0IsTUFBTSxDQUFDLFdBQTdCO2VBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFWOztJQURtQjtJQVdyQixnQkFBQSxHQUFtQixTQUFBO01BQ2pCLElBQUcsa0JBQUg7QUFDRSxlQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FEcEI7T0FBQSxNQUFBO0FBR0UsZUFBTyxFQUhUOztJQURpQjtJQU1uQixNQUFNLENBQUMsTUFBUCxDQUFjLGdCQUFkLEVBQWdDLFNBQUMsS0FBRDtNQUM5QixJQUFtQixLQUFBLEtBQVMsQ0FBNUI7ZUFBQSxDQUFDLENBQUMsV0FBRixDQUFBLEVBQUE7O0lBRDhCLENBQWhDO0FBR0EsV0FBTztFQXBEVCxDQUZzRDtDQUF4RDs7QUF5REEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsaUNBQWpCLEVBQW9ELFNBQUE7QUFDbEQsU0FBTztJQUNMLFFBQUEsRUFBVSxHQURMO0lBRUwsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVI7TUFDSixPQUFPLENBQUMsUUFBUixDQUFpQixVQUFqQjthQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLG9CQUFqQjtJQUZJLENBRkQ7SUFLSixVQUFBLEVBQVkscUNBTFI7O0FBRDJDLENBQXBEIiwiZmlsZSI6IndpZGdldHMvd2lkZ2V0LWFjY291bnRzLXBheWFibGUtcmVjZWl2YWJsZS5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1hY2NvdW50cy1wYXlhYmxlLXJlY2VpdmFibGUnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0QWNjb3VudHNQYXlhYmxlUmVjZWl2YWJsZUN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMsIENoYXJ0Rm9ybWF0dGVyU3ZjKSAtPlxuXG4gICAgdyA9ICRzY29wZS53aWRnZXRcblxuICAgIHcuaW5pdENvbnRleHQgPSAtPlxuICAgICAgJHNjb3BlLmlzRGF0YUZvdW5kID0gdy5jb250ZW50PyAmJiB3LmNvbnRlbnQudmFsdWVzP1xuXG4gICAgdy5mb3JtYXQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG4gICAgICAgIGxpbmVEYXRhID0gW1xuICAgICAgICAgIHt0aXRsZTogXCJQYXlhYmxlXCIsIGxhYmVsczogdy5jb250ZW50LmRhdGVzLCB2YWx1ZXM6IHcuY29udGVudC52YWx1ZXMucGF5YWJsZXMgfSxcbiAgICAgICAgICB7dGl0bGU6IFwiUmVjZWl2YWJsZVwiLCBsYWJlbHM6IHcuY29udGVudC5kYXRlcywgdmFsdWVzOiB3LmNvbnRlbnQudmFsdWVzLnJlY2VpdmFibGVzIH0sXG4gICAgICAgIF1cbiAgICAgICAgYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUgPSB0cnVlXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3LmNvbnRlbnQudmFsdWVzLnBheWFibGVzLCAodmFsdWUpIC0+XG4gICAgICAgICAgYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUgJiY9IHZhbHVlID49IDBcbiAgICAgICAgKVxuICAgICAgICBhbmd1bGFyLmZvckVhY2gody5jb250ZW50LnZhbHVlcy5yZWNlaXZhYmxlcywgKHZhbHVlKSAtPlxuICAgICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlICYmPSB2YWx1ZSA+PSAwXG4gICAgICAgIClcbiAgICAgICAgbGluZU9wdGlvbnMgPSB7XG4gICAgICAgICAgc2NhbGVCZWdpbkF0WmVybzogYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUsXG4gICAgICAgICAgc2hvd1hMYWJlbHM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgICAgIHcuY2hhcnQgPSBDaGFydEZvcm1hdHRlclN2Yy5saW5lQ2hhcnQobGluZURhdGEsbGluZU9wdGlvbnMsIHRydWUpXG5cbiAgICAkc2NvcGUuZ2V0Q3VycmVudFBheWFibGUgPSAtPlxuICAgICAgXy5sYXN0KHcuY29udGVudC52YWx1ZXMucGF5YWJsZXMpIGlmICRzY29wZS5pc0RhdGFGb3VuZFxuXG4gICAgJHNjb3BlLmdldEN1cnJlbnRSZWNlaXZhYmxlID0gLT5cbiAgICAgIF8ubGFzdCh3LmNvbnRlbnQudmFsdWVzLnJlY2VpdmFibGVzKSBpZiAkc2NvcGUuaXNEYXRhRm91bmRcblxuICAgICRzY29wZS5nZXRDdXJyZW5jeSA9IC0+XG4gICAgICB3LmNvbnRlbnQuY3VycmVuY3kgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA9PSAzXG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0QWNjb3VudHNQYXlhYmxlUmVjZWl2YWJsZScsIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiYWNjb3VudHNcIilcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJwYXlhYmxlLXJlY2VpdmFibGVcIilcbiAgICAsY29udHJvbGxlcjogJ1dpZGdldEFjY291bnRzUGF5YWJsZVJlY2VpdmFibGVDdHJsJ1xuICB9XG4pIl19