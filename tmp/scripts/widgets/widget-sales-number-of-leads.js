(function () {
var module;

module = angular.module('maestrano.analytics.widget-sales-number-of-leads', ['maestrano.assets']);

module.controller('WidgetSalesNumberOfLeadsCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
    var getSettingsCount, getVariation, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.number_of_leads)) {
        $scope.periodOptions = [
          {
            label: 'year',
            value: 'YEARLY'
          }, {
            label: 'quarter',
            value: 'QUARTERLY'
          }, {
            label: 'month',
            value: 'MONTHLY'
          }, {
            label: 'week',
            value: 'WEEKLY'
          }, {
            label: 'day',
            value: 'DAILY'
          }
        ];
        return $scope.period = _.find($scope.periodOptions, function(o) {
          return o.value === w.metadata.period;
        }) || $scope.periodOptions[3];
      }
    };
    $scope.formatNumberOfLeads = function(carac) {
      var color, formattedNominal, formattedVariation, n_hash, nominal, variation;
      formattedNominal = 0;
      formattedVariation = "- %";
      if (!$scope.isDataFound) {
        return {
          nominal: formattedNominal,
          variation: formattedVariation,
          color: ''
        };
      }
      n_hash = angular.copy(w.content.number_of_leads);
      nominal = 0;
      color = '';
      if (carac === "new" && n_hash.total && n_hash.total.length === 2) {
        nominal = n_hash.total[1] - n_hash.total[0];
        variation = getVariation(n_hash.total);
        if (variation > 0) {
          color = 'green';
        } else if (variation < 0) {
          color = 'red';
        }
      } else if (carac === "converted" && n_hash.converted && n_hash.converted.length === 2) {
        nominal = n_hash.converted[1];
        variation = getVariation(n_hash.converted);
        if (variation > 0) {
          color = 'green';
        } else if (variation < 0) {
          color = 'red';
        }
      } else if (carac === "lost" && n_hash.lost && n_hash.lost.length === 2) {
        nominal = n_hash.lost[1];
        variation = getVariation(n_hash.lost);
        if (variation < 0) {
          color = 'green';
        } else if (variation > 0) {
          color = 'red';
        }
      } else {
        return {
          nominal: formattedNominal,
          variation: formattedVariation,
          color: color
        };
      }
      if (nominal > 0) {
        formattedNominal = "+" + nominal;
      } else if (nominal < 0) {
        formattedNominal = nominal;
      }
      if (variation && variation > 0) {
        formattedVariation = "+" + (variation.toFixed(0)) + "%";
      } else if (variation && variation < 0) {
        formattedVariation = (variation.toFixed(0)) + "%";
      }
      return {
        nominal: formattedNominal,
        variation: formattedVariation,
        color: color
      };
    };
    getVariation = function(v_array) {
      var variation;
      if (v_array[0] !== 0) {
        return variation = 100 * ((v_array[1] / v_array[0]) - 1);
      } else {
        return variation = "- ";
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
      if (total >= 2) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetSalesNumberOfLeads', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("number-of-leads");
    },
    controller: 'WidgetSalesNumberOfLeadsCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLW51bWJlci1vZi1sZWFkcy5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxrREFBZixFQUFrRSxDQUFDLGtCQUFELENBQWxFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLDhCQUFsQixFQUFpRDtFQUMvQyxRQUQrQyxFQUNyQyxpQkFEcUMsRUFDbEIsbUJBRGtCLEVBQ0csU0FESCxFQUUvQyxTQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGlCQUExQixFQUE2QyxPQUE3QztBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsU0FBQTtNQUNkLElBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsQ0FBQyxDQUFDLE9BQXBCLENBQUEsSUFBZ0MsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBcEIsQ0FBekQ7UUFFRSxNQUFNLENBQUMsYUFBUCxHQUF1QjtVQUNyQjtZQUFDLEtBQUEsRUFBTyxNQUFSO1lBQWdCLEtBQUEsRUFBTyxRQUF2QjtXQURxQixFQUVyQjtZQUFDLEtBQUEsRUFBTyxTQUFSO1lBQW1CLEtBQUEsRUFBTyxXQUExQjtXQUZxQixFQUdyQjtZQUFDLEtBQUEsRUFBTyxPQUFSO1lBQWlCLEtBQUEsRUFBTyxTQUF4QjtXQUhxQixFQUlyQjtZQUFDLEtBQUEsRUFBTyxNQUFSO1lBQWdCLEtBQUEsRUFBTyxRQUF2QjtXQUpxQixFQUtyQjtZQUFDLEtBQUEsRUFBTyxLQUFSO1lBQWUsS0FBQSxFQUFPLE9BQXRCO1dBTHFCOztlQU92QixNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxhQUFkLEVBQTZCLFNBQUMsQ0FBRDtpQkFDM0MsQ0FBQyxD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O01BQUEsSUFBRyxPQUFRLENBQUEsQ0FBQSxDQUFSLEtBQWMsQ0FBakI7ZUFDRSxTQUFBLEdBQVksR0FBQSxHQUFNLENBQUMsQ0FBQyxPQUFRLENBQUEsQ0FBQSxDQUFSLEdBQWEsT0FBUSxDQUFBLENBQUEsQ0FBdEIsQ0FBQSxHQUE0QixDQUE3QixFQURwQjtPQUFBLE1BQUE7ZUFHRSxTQUFBLEdBQVksS0FIZDs7SUFEYTtJQWVmLGdCQUFBLEdBQW1CLFNBQUE7TUFDakIsSUFBRyxrQkFBSDtBQUNFLGVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQURwQjtPQUFBLE1BQUE7QUFHRSxlQUFPLEVBSFQ7O0lBRGlCO0lBT25CLE1BQU0sQ0FBQyxNQUFQLENBQWMsZ0JBQWQsRUFBZ0MsU0FBQyxLQUFEO01BQzlCLElBQW1CLEtBQUEsSUFBUyxDQUE1QjtlQUFBLENBQUMsQ0FBQyxXQUFGLENBQUEsRUFBQTs7SUFEOEIsQ0FBaEM7QUFHQSxXQUFPO0VBNUZULENBRitDO0NBQWpEOztBQWlHQSxNQUFNLENBQUMsU0FBUCxDQUFpQiwwQkFBakIsRUFBNkMsU0FBQTtBQUMzQyxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE9BQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsaUJBQWpCO0lBRkksQ0FGRDtJQUtKLFVBQUEsRUFBWSw4QkFMUjs7QUFEb0MsQ0FBN0MiLCJmaWxlIjoid2lkZ2V0cy93aWRnZXQtc2FsZXMtbnVtYmVyLW9mLWxlYWRzLmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LXNhbGVzLW51bWJlci1vZi1sZWFkcycsWydtYWVzdHJhbm8uYXNzZXRzJ10pXG5cbm1vZHVsZS5jb250cm9sbGVyKCdXaWRnZXRTYWxlc051bWJlck9mTGVhZHNDdHJsJyxbXG4gICckc2NvcGUnLCAnRGhiQW5hbHl0aWNzU3ZjJywgJ0NoYXJ0Rm9ybWF0dGVyU3ZjJywgJyRmaWx0ZXInLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMsIENoYXJ0Rm9ybWF0dGVyU3ZjLCAkZmlsdGVyKSAtPlxuXG4gICAgdyA9ICRzY29wZS53aWRnZXRcblxuICAgIHcuaW5pdENvbnRleHQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kID0gYW5ndWxhci5pc0RlZmluZWQody5jb250ZW50KSAmJiAhXy5pc0VtcHR5KHcuY29udGVudC5udW1iZXJfb2ZfbGVhZHMpXG5cbiAgICAgICAgJHNjb3BlLnBlcmlvZE9wdGlvbnMgPSBbXG4gICAgICAgICAge2xhYmVsOiAneWVhcicsIHZhbHVlOiAnWUVBUkxZJ30sXG4gICAgICAgICAge2xhYmVsOiAncXVhcnRlcicsIHZhbHVlOiAnUVVBUlRFUkxZJ30sXG4gICAgICAgICAge2xhYmVsOiAnbW9udGgnLCB2YWx1ZTogJ01PTlRITFknfSxcbiAgICAgICAgICB7bGFiZWw6ICd3ZWVrJywgdmFsdWU6ICdXRUVLTFknfSxcbiAgICAgICAgICB7bGFiZWw6ICdkYXknLCB2YWx1ZTogJ0RBSUxZJ30sXG4gICAgICAgIF1cbiAgICAgICAgJHNjb3BlLnBlcmlvZCA9IF8uZmluZCgkc2NvcGUucGVyaW9kT3B0aW9ucywgKG8pIC0+XG4gICAgICAgICAgby52YWx1ZSA9PSB3Lm1ldGFkYXRhLnBlcmlvZFxuICAgICAgICApIHx8ICRzY29wZS5wZXJpb2RPcHRpb25zWzNdXG5cbiAgICAkc2NvcGUuZm9ybWF0TnVtYmVyT2ZMZWFkcyA9IChjYXJhYykgLT5cbiAgICAgIGZvcm1hdHRlZE5vbWluYWwgPSAwXG4gICAgICBmb3JtYXR0ZWRWYXJpYXRpb24gPSBcIi0gJVwiXG5cbiAgICAgIHJldHVybiB7bm9taW5hbDogZm9ybWF0dGVkTm9taW5hbCwgdmFyaWF0aW9uOiBmb3JtYXR0ZWRWYXJpYXRpb24sIGNvbG9yOiAnJ30gaWYgISRzY29wZS5pc0RhdGFGb3VuZFxuXG4gICAgICBuX2hhc2ggPSBhbmd1bGFyLmNvcHkody5jb250ZW50Lm51bWJlcl9vZl9sZWFkcylcbiAgICAgIG5vbWluYWw9MFxuICAgICAgY29sb3I9JydcblxuICAgICAgaWYgY2FyYWM9PVwibmV3XCIgJiYgbl9oYXNoLnRvdGFsICYmIG5faGFzaC50b3RhbC5sZW5ndGggPT0gMlxuICAgICAgICBub21pbmFsID0gbl9oYXNoLnRvdGFsWzFdIC0gbl9oYXNoLnRvdGFsWzBdXG4gICAgICAgIHZhcmlhdGlvbiA9IGdldFZhcmlhdGlvbihuX2hhc2gudG90YWwpXG4gICAgICAgIGlmIHZhcmlhdGlvbiA+IDBcbiAgICAgICAgICBjb2xvciA9ICdncmVlbidcbiAgICAgICAgZWxzZSBpZiB2YXJpYXRpb24gPCAwXG4gICAgICAgICAgY29sb3IgPSAncmVkJ1xuXG4gICAgICBlbHNlIGlmIGNhcmFjPT1cImNvbnZlcnRlZFwiICYmIG5faGFzaC5jb252ZXJ0ZWQgJiYgbl9oYXNoLmNvbnZlcnRlZC5sZW5ndGggPT0gMlxuICAgICAgICBub21pbmFsID0gbl9oYXNoLmNvbnZlcnRlZFsxXVxuICAgICAgICB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24obl9oYXNoLmNvbnZlcnRlZClcbiAgICAgICAgaWYgdmFyaWF0aW9uID4gMFxuICAgICAgICAgIGNvbG9yID0gJ2dyZWVuJ1xuICAgICAgICBlbHNlIGlmIHZhcmlhdGlvbiA8IDBcbiAgICAgICAgICBjb2xvciA9ICdyZWQnXG5cbiAgICAgIGVsc2UgaWYgY2FyYWM9PVwibG9zdFwiICYmIG5faGFzaC5sb3N0ICYmIG5faGFzaC5sb3N0Lmxlbmd0aCA9PSAyXG4gICAgICAgIG5vbWluYWwgPSBuX2hhc2gubG9zdFsxXVxuICAgICAgICB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24obl9oYXNoLmxvc3QpXG4gICAgICAgIGlmIHZhcmlhdGlvbiA8IDBcbiAgICAgICAgICBjb2xvciA9ICdncmVlbidcbiAgICAgICAgZWxzZSBpZiB2YXJpYXRpb24gPiAwXG4gICAgICAgICAgY29sb3IgPSAncmVkJ1xuXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiB7bm9taW5hbDogZm9ybWF0dGVkTm9taW5hbCwgdmFyaWF0aW9uOiBmb3JtYXR0ZWRWYXJpYXRpb24sIGNvbG9yOiBjb2xvcn1cblxuICAgICAgaWYgbm9taW5hbCA+IDBcbiAgICAgICAgZm9ybWF0dGVkTm9taW5hbCA9IFwiKyN7bm9taW5hbH1cIlxuICAgICAgZWxzZSBpZiBub21pbmFsIDwgMFxuICAgICAgICBmb3JtYXR0ZWROb21pbmFsID0gbm9taW5hbFxuXG4gICAgICBpZiB2YXJpYXRpb24gJiYgdmFyaWF0aW9uID4gMFxuICAgICAgICBmb3JtYXR0ZWRWYXJpYXRpb24gPSBcIisje3ZhcmlhdGlvbi50b0ZpeGVkKDApfSVcIlxuICAgICAgZWxzZSBpZiB2YXJpYXRpb24gJiYgdmFyaWF0aW9uIDwgMFxuICAgICAgICBmb3JtYXR0ZWRWYXJpYXRpb24gPSBcIiN7dmFyaWF0aW9uLnRvRml4ZWQoMCl9JVwiXG5cbiAgICAgIHJldHVybiB7bm9taW5hbDogZm9ybWF0dGVkTm9taW5hbCwgdmFyaWF0aW9uOiBmb3JtYXR0ZWRWYXJpYXRpb24sIGNvbG9yOiBjb2xvcn1cblxuICAgIGdldFZhcmlhdGlvbiA9ICh2X2FycmF5KSAtPlxuICAgICAgaWYgdl9hcnJheVswXSAhPSAwXG4gICAgICAgIHZhcmlhdGlvbiA9IDEwMCAqICgodl9hcnJheVsxXSAvIHZfYXJyYXlbMF0pIC0gMSlcbiAgICAgIGVsc2VcbiAgICAgICAgdmFyaWF0aW9uID0gXCItIFwiXG5cbiAgICAjIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAjIFRPRE86IFJlZmFjdG9yIG9uY2Ugd2UgaGF2ZSB1bmRlcnN0b29kIGV4YWN0bHkgaG93IHRoZSBhbmd1bGFyanMgY29tcGlsYXRpb24gcHJvY2VzcyB3b3JrczpcbiAgICAjIGluIHRoaXMgb3JkZXIsIHdlIHNob3VsZDpcbiAgICAjIDEtIGNvbXBpbGUgaW1wYWMtd2lkZ2V0IGNvbnRyb2xsZXJcbiAgICAjIDItIGNvbXBpbGUgdGhlIHNwZWNpZmljIHdpZGdldCB0ZW1wbGF0ZS9jb250cm9sbGVyXG4gICAgIyAzLSBjb21waWxlIHRoZSBzZXR0aW5ncyB0ZW1wbGF0ZXMvY29udHJvbGxlcnNcbiAgICAjIDQtIGNhbGwgd2lkZ2V0LmxvYWRDb250ZW50KCkgKGlkZWFsbHksIGZyb20gaW1wYWMtd2lkZ2V0LCBvbmNlIGEgY2FsbGJhY2sgXG4gICAgIyAgICAgYXNzZXNzaW5nIHRoYXQgZXZlcnl0aGluZyBpcyBjb21waWxlZCBhbiByZWFkeSBpcyByZWNlaXZlZClcbiAgICBnZXRTZXR0aW5nc0NvdW50ID0gLT5cbiAgICAgIGlmIHcuc2V0dGluZ3M/XG4gICAgICAgIHJldHVybiB3LnNldHRpbmdzLmxlbmd0aFxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gMFxuXG4gICAgIyBvcmdhbml6YXRpb25faWRzICsgcGFyYW0gc2VsZWN0b3JcbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA+PSAyXG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0U2FsZXNOdW1iZXJPZkxlYWRzJywgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCkgLT5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJzYWxlc1wiKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcIm51bWJlci1vZi1sZWFkc1wiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0U2FsZXNOdW1iZXJPZkxlYWRzQ3RybCdcbiAgfVxuKSJdfQ==