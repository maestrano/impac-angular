(function () {
var module;

module = angular.module('maestrano.analytics.widget-hr-payroll-taxes', ['maestrano.assets']);

module.controller('WidgetHrPayrollTaxesCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && w.content.total_tax && w.content.dates;
    };
    w.format = function() {
      var all_values_are_positive, inputData, options;
      if ($scope.isDataFound) {
        inputData = {
          title: "Payroll Taxes",
          labels: w.content.dates,
          values: w.content.total_tax
        };
        all_values_are_positive = true;
        angular.forEach(w.content.total_tax, function(value) {
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
        return _.last(w.content.total_tax);
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency || "USD";
      }
    };
    $scope.getPeriod = function() {
      var period, period_param;
      if ($scope.isDataFound && w.content.hist_parameters) {
        period_param = w.content.hist_parameters.period || "MONTHLY";
        period = "day";
        if (period_param !== "DAILY") {
          period = period_param.substr(0, period_param.length - 2).toLowerCase();
        }
        return "(current " + period + ")";
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

module.directive('widgetHrPayrollTaxes', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("payroll-taxes");
    },
    controller: 'WidgetHrPayrollTaxesCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWhyLXBheXJvbGwtdGF4ZXMuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsNkNBQWYsRUFBNkQsQ0FBQyxrQkFBRCxDQUE3RDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQiwwQkFBbEIsRUFBNkM7RUFDM0MsUUFEMkMsRUFDakMsaUJBRGlDLEVBQ2QsbUJBRGMsRUFFM0MsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixpQkFBMUI7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7YUFDZCxNQUFNLENBQUMsV0FBUCxHQUFxQixtQkFBQSxJQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBeEIsSUFBcUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUR0RDtJQUdoQixDQUFDLENBQUMsTUFBRixHQUFXLFNBQUE7QUFDVCxVQUFBO01BQUEsSUFBRyxNQUFNLENBQUMsV0FBVjtRQUNFLFNBQUEsR0FBWTtVQUFDLEtBQUEsRUFBTyxlQUFSO1VBQXlCLE1BQUEsRUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQTNDO1VBQWtELE1BQUEsRUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQXBFOztRQUNaLHVCQUFBLEdBQTBCO1FBQzFCLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBMUIsRUFBcUMsU0FBQyxLQUFEO2lCQUNuQyw0QkFBQSwwQkFBNEIsS0FBQSxJQUFTO1FBREYsQ0FBckM7UUFJQSxPQUFBLEdBQVU7VUFDUixnQkFBQSxFQUFrQix1QkFEVjtVQUVSLFdBQUEsRUFBYSxLQUZMOztlQUlWLENBQUMsQ0FBQyxLQUFGLEdBQVUsaUJBQWlCLENBQUMsU0FBbEIsQ0FBNEIsQ0FBQyxTQUFELENBQTVCLEVBQXdDLE9BQXhDLEVBWFo7O0lBRFM7SUFjWCxNQUFNLENBQUMsZUFBUCxHQUF5QixTQUFBO01BQ3ZCLElBQXFDLE1BQU0sQ0FBQyxXQUE1QztBQUFBLGVBQU8sQ0FBQyxDQUFDLElBQUYsQ0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQWpCLEVBQVA7O0lBRHVCO0lBR3pCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLFNBQUE7TUFDbkIsSUFBc0MsTUFBTSxDQUFDLFdBQTdDO0FBQUEsZUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVYsSUFBc0IsTUFBN0I7O0lBRG1CO0lBR3JCLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLFNBQUE7QUFDakIsVUFBQTtNQUFBLElBQUcsTUFBTSxDQUFDLFdBQVAsSUFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFuQztRQUNFLFlBQUEsR0FBZSxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUExQixJQUFvQztRQUNuRCxNQUFBLEdBQVM7UUFDVCxJQUF1RSxZQUFBLEtBQWdCLE9BQXZGO1VBQUEsTUFBQSxHQUFTLFlBQVksQ0FBQyxNQUFiLENBQW9CLENBQXBCLEVBQXNCLFlBQVksQ0FBQyxNQUFiLEdBQW9CLENBQTFDLENBQTRDLENBQUMsV0FBN0MsQ0FBQSxFQUFUOztBQUNBLGVBQU8sV0FBQSxHQUFZLE1BQVosR0FBbUIsSUFKNUI7O0lBRGlCO0lBY25CLGdCQUFBLEdBQW1CLFNBQUE7TUFDakIsSUFBRyxrQkFBSDtBQUNFLGVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQURwQjtPQUFBLE1BQUE7QUFHRSxlQUFPLEVBSFQ7O0lBRGlCO0lBTW5CLE1BQU0sQ0FBQyxNQUFQLENBQWMsZ0JBQWQsRUFBZ0MsU0FBQyxLQUFEO01BQzlCLElBQW1CLEtBQUEsSUFBUyxDQUE1QjtlQUFBLENBQUMsQ0FBQyxXQUFGLENBQUEsRUFBQTs7SUFEOEIsQ0FBaEM7QUFHQSxXQUFPO0VBbERULENBRjJDO0NBQTdDOztBQXVEQSxNQUFNLENBQUMsU0FBUCxDQUFpQixzQkFBakIsRUFBeUMsU0FBQTtBQUN2QyxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLElBQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsZUFBakI7SUFGSSxDQUZEO0lBS0osVUFBQSxFQUFZLDBCQUxSOztBQURnQyxDQUF6QyIsImZpbGUiOiJ3aWRnZXRzL3dpZGdldC1oci1wYXlyb2xsLXRheGVzLmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LWhyLXBheXJvbGwtdGF4ZXMnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0SHJQYXlyb2xsVGF4ZXNDdHJsJyxbXG4gICckc2NvcGUnLCAnRGhiQW5hbHl0aWNzU3ZjJywgJ0NoYXJ0Rm9ybWF0dGVyU3ZjJyxcbiAgKCRzY29wZSwgRGhiQW5hbHl0aWNzU3ZjLCBDaGFydEZvcm1hdHRlclN2YykgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgICRzY29wZS5pc0RhdGFGb3VuZCA9IHcuY29udGVudD8gJiYgdy5jb250ZW50LnRvdGFsX3RheCAmJiB3LmNvbnRlbnQuZGF0ZXNcblxuICAgIHcuZm9ybWF0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZFxuICAgICAgICBpbnB1dERhdGEgPSB7dGl0bGU6IFwiUGF5cm9sbCBUYXhlc1wiLCBsYWJlbHM6IHcuY29udGVudC5kYXRlcywgdmFsdWVzOiB3LmNvbnRlbnQudG90YWxfdGF4fVxuICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSA9IHRydWVcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHcuY29udGVudC50b3RhbF90YXgsICh2YWx1ZSkgLT5cbiAgICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSAmJj0gdmFsdWUgPj0gMFxuICAgICAgICApXG5cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzY2FsZUJlZ2luQXRaZXJvOiBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSxcbiAgICAgICAgICBzaG93WExhYmVsczogZmFsc2UsXG4gICAgICAgIH1cbiAgICAgICAgdy5jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmxpbmVDaGFydChbaW5wdXREYXRhXSxvcHRpb25zKVxuXG4gICAgJHNjb3BlLmdldEN1cnJlbnRQcmljZSA9IC0+XG4gICAgICByZXR1cm4gXy5sYXN0IHcuY29udGVudC50b3RhbF90YXggaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG5cbiAgICAkc2NvcGUuZ2V0Q3VycmVuY3kgPSAtPlxuICAgICAgcmV0dXJuIHcuY29udGVudC5jdXJyZW5jeSB8fCBcIlVTRFwiIGlmICRzY29wZS5pc0RhdGFGb3VuZFxuXG4gICAgJHNjb3BlLmdldFBlcmlvZCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgJiYgdy5jb250ZW50Lmhpc3RfcGFyYW1ldGVyc1xuICAgICAgICBwZXJpb2RfcGFyYW0gPSB3LmNvbnRlbnQuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZCB8fCBcIk1PTlRITFlcIlxuICAgICAgICBwZXJpb2QgPSBcImRheVwiXG4gICAgICAgIHBlcmlvZCA9IHBlcmlvZF9wYXJhbS5zdWJzdHIoMCxwZXJpb2RfcGFyYW0ubGVuZ3RoLTIpLnRvTG93ZXJDYXNlKCkgaWYgcGVyaW9kX3BhcmFtICE9IFwiREFJTFlcIlxuICAgICAgICByZXR1cm4gXCIoY3VycmVudCAje3BlcmlvZH0pXCJcblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA+PSAzXG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0SHJQYXlyb2xsVGF4ZXMnLCAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50KSAtPlxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImhyXCIpXG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwicGF5cm9sbC10YXhlc1wiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0SHJQYXlyb2xsVGF4ZXNDdHJsJyxcbiAgfVxuKSJdfQ==