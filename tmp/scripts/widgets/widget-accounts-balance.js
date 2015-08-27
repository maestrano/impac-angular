(function () {
var module;

module = angular.module('maestrano.analytics.widget-accounts-balance', ['maestrano.assets']);

module.controller('WidgetAccountsBalanceCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      return $scope.isDataFound = (w.content != null) && !_.isEmpty(w.content.account_list);
    };
    w.format = function() {
      var all_values_are_positive, data, inputData, options;
      if ($scope.isDataFound && (w.selectedAccount != null)) {
        data = angular.copy(w.selectedAccount);
        inputData = {
          title: data.name,
          labels: w.content.dates,
          values: data.balances
        };
        all_values_are_positive = true;
        angular.forEach(data.balances, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        return w.chart = ChartFormatterSvc.lineChart([inputData], options);
      }
    };
    $scope.getName = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.name;
      }
    };
    $scope.getCurrentBalance = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.current_balance;
      }
    };
    $scope.getCurrency = function() {
      if (w.selectedAccount != null) {
        return w.selectedAccount.currency;
      }
    };
    $scope.$watch((function() {
      return w.isEditMode;
    }), function(result) {
      if (w.selectedAccount == null) {
        return w.isEditMode = true;
      }
    });
    getSettingsCount = function() {
      if (w.settings != null) {
        return w.settings.length;
      } else {
        return 0;
      }
    };
    $scope.$watch(getSettingsCount, function(total) {
      if (total === 4) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetAccountsBalance', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("balance");
    },
    controller: 'WidgetAccountsBalanceCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWFjY291bnRzLWJhbGFuY2UuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsNkNBQWYsRUFBNkQsQ0FBQyxrQkFBRCxDQUE3RDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQiwyQkFBbEIsRUFBOEM7RUFDNUMsUUFENEMsRUFDbEMsaUJBRGtDLEVBQ2YsbUJBRGUsRUFFNUMsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixpQkFBMUI7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7YUFDZCxNQUFNLENBQUMsV0FBUCxHQUFxQixtQkFBQSxJQUFjLENBQUMsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQXBCO0lBRHRCO0lBR2hCLENBQUMsQ0FBQyxNQUFGLEdBQVcsU0FBQTtBQUNULFVBQUE7TUFBQSxJQUFHLE1BQU0sQ0FBQyxXQUFQLElBQXNCLDJCQUF6QjtRQUNFLElBQUEsR0FBTyxPQUFPLENBQUMsSUFBUixDQUFhLENBQUMsQ0FBQyxlQUFmO1FBQ1AsU0FBQSxHQUFZO1VBQUMsS0FBQSxFQUFPLElBQUksQ0FBQyxJQUFiO1VBQW1CLE1BQUEsRUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQXJDO1VBQTRDLE1BQUEsRUFBUSxJQUFJLENBQUMsUUFBekQ7O1FBQ1osdUJBQUEsR0FBMEI7UUFDMUIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsSUFBSSxDQUFDLFFBQXJCLEVBQStCLFNBQUMsS0FBRDtpQkFDN0IsNEJBQUEsMEJBQTRCLEtBQUEsSUFBUztRQURSLENBQS9CO1FBSUEsT0FBQSxHQUFVO1VBQ1IsZ0JBQUEsRUFBa0IsdUJBRFY7VUFFUixXQUFBLEVBQWEsS0FGTDs7ZUFJVixDQUFDLENBQUMsS0FBRixHQUFVLGlCQUFpQixDQUFDLFNBQWxCLENBQTRCLENBQUMsU0FBRCxDQUE1QixFQUF3QyxPQUF4QyxFQVpaOztJQURTO0lBZVgsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQTtNQUNmLElBQTBCLHlCQUExQjtlQUFBLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBbEI7O0lBRGU7SUFHakIsTUFBTSxDQUFDLGlCQUFQLEdBQTJCLFNBQUE7TUFDekIsSUFBcUMseUJBQXJDO2VBQUEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxnQkFBbEI7O0lBRHlCO0lBRzNCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLFNBQUE7TUFDbkIsSUFBOEIseUJBQTlCO2VBQUEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxTQUFsQjs7SUFEbUI7SUFLckIsTUFBTSxDQUFDLE1BQVAsQ0FBYyxDQUFDLFNBQUE7YUFBRyxDQUFDLENBQUM7SUFBTCxDQUFELENBQWQsRUFBaUMsU0FBQyxNQUFEO01BQy9CLElBQXdCLHlCQUF4QjtlQUFBLENBQUMsQ0FBQyxVQUFGLEdBQWUsS0FBZjs7SUFEK0IsQ0FBakM7SUFXQSxnQkFBQSxHQUFtQixTQUFBO01BQ2pCLElBQUcsa0JBQUg7QUFDRSxlQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FEcEI7T0FBQSxNQUFBO0FBR0UsZUFBTyxFQUhUOztJQURpQjtJQU1uQixNQUFNLENBQUMsTUFBUCxDQUFjLGdCQUFkLEVBQWdDLFNBQUMsS0FBRDtNQUM5QixJQUFtQixLQUFBLEtBQVMsQ0FBNUI7ZUFBQSxDQUFDLENBQUMsV0FBRixDQUFBLEVBQUE7O0lBRDhCLENBQWhDO0FBR0EsV0FBTztFQXJEVCxDQUY0QztDQUE5Qzs7QUEwREEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsdUJBQWpCLEVBQTBDLFNBQUE7QUFDeEMsU0FBTztJQUNMLFFBQUEsRUFBVSxHQURMO0lBRUwsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVI7TUFDSixPQUFPLENBQUMsUUFBUixDQUFpQixVQUFqQjthQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFNBQWpCO0lBRkksQ0FGRDtJQUtKLFVBQUEsRUFBWSwyQkFMUjs7QUFEaUMsQ0FBMUMiLCJmaWxlIjoid2lkZ2V0cy93aWRnZXQtYWNjb3VudHMtYmFsYW5jZS5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1hY2NvdW50cy1iYWxhbmNlJyxbJ21hZXN0cmFuby5hc3NldHMnXSlcblxubW9kdWxlLmNvbnRyb2xsZXIoJ1dpZGdldEFjY291bnRzQmFsYW5jZUN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMsIENoYXJ0Rm9ybWF0dGVyU3ZjKSAtPlxuXG4gICAgdyA9ICRzY29wZS53aWRnZXRcblxuICAgIHcuaW5pdENvbnRleHQgPSAtPlxuICAgICAgJHNjb3BlLmlzRGF0YUZvdW5kID0gdy5jb250ZW50PyAmJiAhXy5pc0VtcHR5KHcuY29udGVudC5hY2NvdW50X2xpc3QpXG5cbiAgICB3LmZvcm1hdCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgJiYgdy5zZWxlY3RlZEFjY291bnQ/XG4gICAgICAgIGRhdGEgPSBhbmd1bGFyLmNvcHkody5zZWxlY3RlZEFjY291bnQpXG4gICAgICAgIGlucHV0RGF0YSA9IHt0aXRsZTogZGF0YS5uYW1lLCBsYWJlbHM6IHcuY29udGVudC5kYXRlcywgdmFsdWVzOiBkYXRhLmJhbGFuY2VzfVxuICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSA9IHRydWVcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGEuYmFsYW5jZXMsICh2YWx1ZSkgLT5cbiAgICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSAmJj0gdmFsdWUgPj0gMFxuICAgICAgICApXG5cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzY2FsZUJlZ2luQXRaZXJvOiBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSxcbiAgICAgICAgICBzaG93WExhYmVsczogZmFsc2UsXG4gICAgICAgIH1cbiAgICAgICAgdy5jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmxpbmVDaGFydChbaW5wdXREYXRhXSxvcHRpb25zKVxuXG4gICAgJHNjb3BlLmdldE5hbWUgPSAtPlxuICAgICAgdy5zZWxlY3RlZEFjY291bnQubmFtZSBpZiB3LnNlbGVjdGVkQWNjb3VudD9cblxuICAgICRzY29wZS5nZXRDdXJyZW50QmFsYW5jZSA9IC0+XG4gICAgICB3LnNlbGVjdGVkQWNjb3VudC5jdXJyZW50X2JhbGFuY2UgaWYgdy5zZWxlY3RlZEFjY291bnQ/XG5cbiAgICAkc2NvcGUuZ2V0Q3VycmVuY3kgPSAtPlxuICAgICAgdy5zZWxlY3RlZEFjY291bnQuY3VycmVuY3kgaWYgdy5zZWxlY3RlZEFjY291bnQ/XG5cbiAgICAjIFdoZW4gdGhlIHVzZXIgdHJpZXMgdG8gZGlzYWJsZSBlZGl0IG1vZGUgd2l0aG91dCBoYXZpbmcgc2VsZWN0ZWQgYW4gYWNjb3VudFxuICAgICMgd2UgZm9yY2UgdGhlIGVkaXQgbW9kZSB0byByZW1haW4gZW5hYmxlZFxuICAgICRzY29wZS4kd2F0Y2ggKC0+IHcuaXNFZGl0TW9kZSksIChyZXN1bHQpIC0+XG4gICAgICB3LmlzRWRpdE1vZGUgPSB0cnVlIGlmICF3LnNlbGVjdGVkQWNjb3VudD9cbiAgICAgICAgXG5cbiAgICAjIFRPRE86IFJlZmFjdG9yIG9uY2Ugd2UgaGF2ZSB1bmRlcnN0b29kIGV4YWN0bHkgaG93IHRoZSBhbmd1bGFyanMgY29tcGlsYXRpb24gcHJvY2VzcyB3b3JrczpcbiAgICAjIGluIHRoaXMgb3JkZXIsIHdlIHNob3VsZDpcbiAgICAjIDEtIGNvbXBpbGUgaW1wYWMtd2lkZ2V0IGNvbnRyb2xsZXJcbiAgICAjIDItIGNvbXBpbGUgdGhlIHNwZWNpZmljIHdpZGdldCB0ZW1wbGF0ZS9jb250cm9sbGVyXG4gICAgIyAzLSBjb21waWxlIHRoZSBzZXR0aW5ncyB0ZW1wbGF0ZXMvY29udHJvbGxlcnNcbiAgICAjIDQtIGNhbGwgd2lkZ2V0LmxvYWRDb250ZW50KCkgKGlkZWFsbHksIGZyb20gaW1wYWMtd2lkZ2V0LCBvbmNlIGEgY2FsbGJhY2sgXG4gICAgIyAgICAgYXNzZXNzaW5nIHRoYXQgZXZlcnl0aGluZyBpcyBjb21waWxlZCBhbiByZWFkeSBpcyByZWNlaXZlZClcbiAgICBnZXRTZXR0aW5nc0NvdW50ID0gLT5cbiAgICAgIGlmIHcuc2V0dGluZ3M/XG4gICAgICAgIHJldHVybiB3LnNldHRpbmdzLmxlbmd0aFxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gMFxuXG4gICAgJHNjb3BlLiR3YXRjaCBnZXRTZXR0aW5nc0NvdW50LCAodG90YWwpIC0+XG4gICAgICB3LmxvYWRDb250ZW50KCkgaWYgdG90YWwgPT0gNFxuXG4gICAgcmV0dXJuIHdcbl0pXG5cbm1vZHVsZS5kaXJlY3RpdmUoJ3dpZGdldEFjY291bnRzQmFsYW5jZScsIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiYWNjb3VudHNcIilcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJiYWxhbmNlXCIpXG4gICAgLGNvbnRyb2xsZXI6ICdXaWRnZXRBY2NvdW50c0JhbGFuY2VDdHJsJ1xuICB9XG4pIl19