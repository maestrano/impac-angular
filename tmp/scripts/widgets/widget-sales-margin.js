(function () {
var module;

module = angular.module('maestrano.analytics.widget-sales-margin', ['maestrano.assets']);

module.controller('WidgetSalesMarginCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      $scope.isDataFound = (w.content != null) && (w.content.margins != null) && (w.content.dates != null);
      $scope.filterOptions = [
        {
          label: 'Including taxes',
          value: 'gross_margin'
        }, {
          label: 'Excluding taxes',
          value: 'net_margin'
        }
      ];
      if ((w.metadata != null) && w.metadata.filter === "net_margin") {
        return $scope.filter = $scope.filterOptions[1];
      } else {
        return $scope.filter = $scope.filterOptions[0];
      }
    };
    w.format = function() {
      var all_values_are_positive, inputData, options, values;
      if ($scope.isDataFound) {
        if ((w.metadata != null) && w.metadata.filter === "net_margin") {
          values = w.content.margins.net;
        } else {
          values = w.content.margins.gross;
        }
        inputData = {
          title: "Gross margin",
          labels: w.content.dates,
          values: values
        };
        all_values_are_positive = true;
        angular.forEach(values, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        return w.chart = ChartFormatterSvc.lineChart([inputData], options);
      }
    };
    $scope.getTotalMargin = function() {
      if ($scope.isDataFound) {
        if ((w.metadata != null) && w.metadata.filter === "net_margin") {
          return _.reduce(w.content.margins.net, function(memo, margin) {
            return memo + margin;
          }, 0);
        } else {
          return _.reduce(w.content.margins.gross, function(memo, margin) {
            return memo + margin;
          }, 0);
        }
      }
    };
    $scope.getCurrency = function() {
      if ($scope.isDataFound) {
        return w.content.currency || "USD";
      }
    };
    $scope.getTimeSpan = function() {
      if ($scope.isDataFound) {
        return "From " + ($filter('date')(_.first(w.content.dates), 'd MMM yy')) + " to " + ($filter('date')(_.last(w.content.dates), 'd MMM yy'));
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
      if (total >= 4) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetSalesMargin', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("accounting-value");
    },
    controller: 'WidgetSalesMarginCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLW1hcmdpbi5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSx5Q0FBZixFQUF5RCxDQUFDLGtCQUFELENBQXpEOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLHVCQUFsQixFQUEwQztFQUN4QyxRQUR3QyxFQUM5QixpQkFEOEIsRUFDWCxtQkFEVyxFQUNVLFNBRFYsRUFFeEMsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixpQkFBMUIsRUFBNkMsT0FBN0M7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7TUFDZCxNQUFNLENBQUMsV0FBUCxHQUFxQixtQkFBQSxJQUFjLDJCQUFkLElBQW9DO01BRXpELE1BQU0sQ0FBQyxhQUFQLEdBQXVCO1FBQ3JCO1VBQUMsS0FBQSxFQUFPLGlCQUFSO1VBQTJCLEtBQUEsRUFBTyxjQUFsQztTQURxQixFQUVyQjtVQUFDLEtBQUEsRUFBTyxpQkFBUjtVQUEyQixLQUFBLEVBQU8sWUFBbEM7U0FGcUI7O01BS3ZCLElBQUcsb0JBQUEsSUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQVgsS0FBbUIsWUFBckM7ZUFDRSxNQUFNLENBQUMsTUFBUCxHQUFnQixNQUFNLENBQUMsYUFBYyxDQUFBLENBQUEsRUFEdkM7T0FBQSxNQUFBO2VBR0UsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsTUFBTSxDQUFDLGFBQWMsQ0FBQSxDQUFBLEVBSHZDOztJQVJjO0lBYWhCLENBQUMsQ0FBQyxNQUFGLEdBQVcsU0FBQTtBQUNULFVBQUE7TUFBQSxJQUFHLE1BQU0sQ0FBQyxXQUFWO1FBQ0UsSUFBRyxvQkFBQSxJQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBWCxLQUFtQixZQUFyQztVQUNFLE1BQUEsR0FBUyxDQUFDLENBQUMsT0FBTyxDQUFD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b290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXQtc2FsZXMtbWFyZ2luJyxbJ21hZXN0cmFuby5hc3NldHMnXSlcblxubW9kdWxlLmNvbnRyb2xsZXIoJ1dpZGdldFNhbGVzTWFyZ2luQ3RybCcsW1xuICAnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsICdDaGFydEZvcm1hdHRlclN2YycsICckZmlsdGVyJyxcbiAgKCRzY29wZSwgRGhiQW5hbHl0aWNzU3ZjLCBDaGFydEZvcm1hdHRlclN2YywgJGZpbHRlcikgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgICRzY29wZS5pc0RhdGFGb3VuZCA9IHcuY29udGVudD8gJiYgdy5jb250ZW50Lm1hcmdpbnM/ICYmIHcuY29udGVudC5kYXRlcz9cblxuICAgICAgJHNjb3BlLmZpbHRlck9wdGlvbnMgPSBbXG4gICAgICAgIHtsYWJlbDogJ0luY2x1ZGluZyB0YXhlcycsIHZhbHVlOiAnZ3Jvc3NfbWFyZ2luJ30sXG4gICAgICAgIHtsYWJlbDogJ0V4Y2x1ZGluZyB0YXhlcycsIHZhbHVlOiAnbmV0X21hcmdpbid9XG4gICAgICBdXG5cbiAgICAgIGlmIHcubWV0YWRhdGE/ICYmIHcubWV0YWRhdGEuZmlsdGVyPT1cIm5ldF9tYXJnaW5cIlxuICAgICAgICAkc2NvcGUuZmlsdGVyID0gJHNjb3BlLmZpbHRlck9wdGlvbnNbMV1cbiAgICAgIGVsc2VcbiAgICAgICAgJHNjb3BlLmZpbHRlciA9ICRzY29wZS5maWx0ZXJPcHRpb25zWzBdXG5cbiAgICB3LmZvcm1hdCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmRcbiAgICAgICAgaWYgdy5tZXRhZGF0YT8gJiYgdy5tZXRhZGF0YS5maWx0ZXI9PVwibmV0X21hcmdpblwiXG4gICAgICAgICAgdmFsdWVzID0gdy5jb250ZW50Lm1hcmdpbnMubmV0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB2YWx1ZXMgPSB3LmNvbnRlbnQubWFyZ2lucy5ncm9zc1xuICAgICAgICBcbiAgICAgICAgaW5wdXREYXRhID0ge3RpdGxlOiBcIkdyb3NzIG1hcmdpblwiLCBsYWJlbHM6IHcuY29udGVudC5kYXRlcywgdmFsdWVzOiB2YWx1ZXN9XG4gICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlID0gdHJ1ZVxuICAgICAgICBhbmd1bGFyLmZvckVhY2godmFsdWVzLCAodmFsdWUpIC0+XG4gICAgICAgICAgYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUgJiY9IHZhbHVlID49IDBcbiAgICAgICAgKVxuXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc2NhbGVCZWdpbkF0WmVybzogYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUsXG4gICAgICAgICAgc2hvd1hMYWJlbHM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgICAgIHcuY2hhcnQgPSBDaGFydEZvcm1hdHRlclN2Yy5saW5lQ2hhcnQoW2lucHV0RGF0YV0sb3B0aW9ucylcblxuICAgICRzY29wZS5nZXRUb3RhbE1hcmdpbiA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmRcbiAgICAgICAgaWYgdy5tZXRhZGF0YT8gJiYgdy5tZXRhZGF0YS5maWx0ZXI9PVwibmV0X21hcmdpblwiXG4gICAgICAgICAgcmV0dXJuIF8ucmVkdWNlIHcuY29udGVudC5tYXJnaW5zLm5ldCwgKG1lbW8sIG1hcmdpbikgLT5cbiAgICAgICAgICAgIG1lbW8gKyBtYXJnaW5cbiAgICAgICAgICAsIDBcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldHVybiBfLnJlZHVjZSB3LmNvbnRlbnQubWFyZ2lucy5ncm9zcywgKG1lbW8sIG1hcmdpbikgLT5cbiAgICAgICAgICAgIG1lbW8gKyBtYXJnaW5cbiAgICAgICAgICAsIDBcblxuICAgICRzY29wZS5nZXRDdXJyZW5jeSA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmRcbiAgICAgICAgcmV0dXJuIHcuY29udGVudC5jdXJyZW5jeSB8fCBcIlVTRFwiXG5cbiAgICAkc2NvcGUuZ2V0VGltZVNwYW4gPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG4gICAgICAgIHJldHVybiBcIkZyb20gI3skZmlsdGVyKCdkYXRlJykoXy5maXJzdCh3LmNvbnRlbnQuZGF0ZXMpLCAnZCBNTU0geXknKX0gdG8gI3skZmlsdGVyKCdkYXRlJykoXy5sYXN0KHcuY29udGVudC5kYXRlcyksICdkIE1NTSB5eScpfVwiXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIG9yZ2FuaXphdGlvbnMgKyB0aW1lIHJhbmdlICsgaGlzdCBtb2RlICsgb2FyYW0gc2VsZWN0b3JcbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA+PSA0XG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0U2FsZXNNYXJnaW4nLCAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50KSAtPlxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImFjY291bnRzXCIpXG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiYWNjb3VudGluZy12YWx1ZVwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0U2FsZXNNYXJnaW5DdHJsJyxcbiAgfVxuKSJdfQ==