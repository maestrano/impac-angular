(function () {
var module;

module = angular.module('maestrano.analytics.widget-sales-segmented-turnover', ['maestrano.assets']);

module.controller('WidgetSalesSegmentedTurnoverCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.ranges)) {
        $scope.filterOptions = [
          {
            label: 'Gross revenue (incl. taxes)',
            value: 'gross'
          }, {
            label: 'Net revenue (excl. taxes)',
            value: 'net'
          }
        ];
        return $scope.filter = _.find($scope.filterOptions, function(o) {
          return o.value === w.content.filter;
        }) || $scope.filterOptions[0];
      }
    };
    w.format = function() {
      var barData, barOptions;
      if ($scope.isDataFound) {
        barData = {
          labels: _.map(w.content.ranges, function(elem) {
            return elem.label;
          }),
          values: _.map(w.content.ranges, function(elem) {
            return elem.value;
          })
        };
        barOptions = {
          showTooltips: false,
          showXLabels: false,
          barDatasetSpacing: 15
        };
        return w.chart = ChartFormatterSvc.barChart(barData, barOptions);
      }
    };
    $scope.getAnalysis = function() {
      if ($scope.isDataFound) {
        if (w.content.ranges[0].percentage + w.content.ranges[1].percentage > 50) {
          return "Your less expensive products bring you most of your revenue.";
        } else if (w.content.ranges[3].percentage + w.content.ranges[4].percentage > 50) {
          return "Your most expensive products bring you most of your revenue.";
        } else {
          return "Your revenue is balanced between your different products segments.";
        }
      }
    };
    $scope.getColorByIndex = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.getRangeLabel = function(aLabel) {
      var prices;
      prices = aLabel.split('-');
      return _.map(prices, function(price) {
        return $filter('mnoCurrency')(price, w.content.currency, false);
      }).join(' - ');
    };
    $scope.getMaxRange = function() {
      var max, maxRange;
      if ($scope.isDataFound) {
        max = 0;
        maxRange = w.content.ranges[0];
        angular.forEach(w.content.ranges, function(range) {
          if (range.percentage > max) {
            maxRange = angular.copy(range);
          }
          return max = Math.max(max, range.percentage);
        });
        return maxRange;
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

module.directive('widgetSalesSegmentedTurnover', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("segmented-turnover");
    },
    controller: 'WidgetSalesSegmentedTurnoverCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLXNlZ21lbnRlZC10dXJub3Zlci5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxxREFBZixFQUFxRSxDQUFDLGtCQUFELENBQXJFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLGtDQUFsQixFQUFxRDtFQUNuRCxRQURtRCxFQUN6QyxpQkFEeUMsRUFDdEIsbUJBRHNCLEVBQ0QsU0FEQyxFQUVuRCxTQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGlCQUExQixFQUE2QyxPQUE3QztBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsU0FBQTtNQUNkLElBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBcEIsQ0FBRCxJQUErQixDQUFDLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFwQixDQUF4RDtRQUVFLE1BQU0sQ0FBQyxhQUFQLEdBQXVCO1VBQ3JCO1lBQUMsS0FBQSxFQUFPLDZCQUFSO1lBQXVDLEtBQUEsRUFBTyxPQUE5QztXQURxQixFQUVyQjtZQUFDLEtBQUEsRUFBTywyQkFBUjtZQUFxQyxLQUFBLEVBQU8sS0FBNUM7V0FGcUI7O2VBSXZCLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBTSxDQUFDLGFBQWQsRUFBNkIsU0FBQyxDQUFEO2lCQUMzQyxDQUFDLENBQUMsS0FBRixLQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFEc0IsQ0FBN0IsQ0FBQSxJQUVYLE1BQU0sQ0FBQyxhQUFjLENBQUEsQ0FBQSxFQVI1Qjs7SUFEYztJQVdoQixDQUFDLENBQUMsTUFBRixHQUFXLFNBQUE7QUFDVCxVQUFBO01BQUEsSUFB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RUFBaUQsU0FBQTtBQUMvQyxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE9BQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsb0JBQWpCO0lBRkksQ0FGRDtJQUtKLFVBQUEsRUFBWSxrQ0FMUjs7QUFEd0MsQ0FBakQiLCJmaWxlIjoid2lkZ2V0cy93aWRnZXQtc2FsZXMtc2VnbWVudGVkLXR1cm5vdmVyLmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LXNhbGVzLXNlZ21lbnRlZC10dXJub3ZlcicsWydtYWVzdHJhbm8uYXNzZXRzJ10pXG5cbm1vZHVsZS5jb250cm9sbGVyKCdXaWRnZXRTYWxlc1NlZ21lbnRlZFR1cm5vdmVyQ3RybCcsW1xuICAnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsICdDaGFydEZvcm1hdHRlclN2YycsICckZmlsdGVyJyxcbiAgKCRzY29wZSwgRGhiQW5hbHl0aWNzU3ZjLCBDaGFydEZvcm1hdHRlclN2YywgJGZpbHRlcikgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCA9ICFfLmlzRW1wdHkody5jb250ZW50LmRhdGVzKSAmJiAhXy5pc0VtcHR5KHcuY29udGVudC5yYW5nZXMpXG5cbiAgICAgICAgJHNjb3BlLmZpbHRlck9wdGlvbnMgPSBbXG4gICAgICAgICAge2xhYmVsOiAnR3Jvc3MgcmV2ZW51ZSAoaW5jbC4gdGF4ZXMpJywgdmFsdWU6ICdncm9zcyd9LFxuICAgICAgICAgIHtsYWJlbDogJ05ldCByZXZlbnVlIChleGNsLiB0YXhlcyknLCB2YWx1ZTogJ25ldCd9LFxuICAgICAgICBdXG4gICAgICAgICRzY29wZS5maWx0ZXIgPSBfLmZpbmQoJHNjb3BlLmZpbHRlck9wdGlvbnMsIChvKSAtPlxuICAgICAgICAgIG8udmFsdWUgPT0gdy5jb250ZW50LmZpbHRlclxuICAgICAgICApIHx8ICRzY29wZS5maWx0ZXJPcHRpb25zWzBdXG5cbiAgICB3LmZvcm1hdCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmRcbiAgICAgICAgYmFyRGF0YSA9IHtcbiAgICAgICAgICBsYWJlbHM6IF8ubWFwKHcuY29udGVudC5yYW5nZXMsIChlbGVtKSAtPlxuICAgICAgICAgICAgZWxlbS5sYWJlbFxuICAgICAgICAgICksXG4gICAgICAgICAgdmFsdWVzOiBfLm1hcCh3LmNvbnRlbnQucmFuZ2VzLCAoZWxlbSkgLT5cbiAgICAgICAgICAgIGVsZW0udmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgYmFyT3B0aW9ucyA9IHtcbiAgICAgICAgICBzaG93VG9vbHRpcHM6IGZhbHNlLFxuICAgICAgICAgIHNob3dYTGFiZWxzOiBmYWxzZSxcbiAgICAgICAgICBiYXJEYXRhc2V0U3BhY2luZzogMTUsXG4gICAgICAgIH1cbiAgICAgICAgdy5jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmJhckNoYXJ0KGJhckRhdGEsIGJhck9wdGlvbnMpXG5cbiAgICAkc2NvcGUuZ2V0QW5hbHlzaXMgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG4gICAgICAgIGlmIHcuY29udGVudC5yYW5nZXNbMF0ucGVyY2VudGFnZSArIHcuY29udGVudC5yYW5nZXNbMV0ucGVyY2VudGFnZSA+IDUwXG4gICAgICAgICAgXCJZb3VyIGxlc3MgZXhwZW5zaXZlIHByb2R1Y3RzIGJyaW5nIHlvdSBtb3N0IG9mIHlvdXIgcmV2ZW51ZS5cIlxuICAgICAgICBlbHNlIGlmIHcuY29udGVudC5yYW5nZXNbM10ucGVyY2VudGFnZSArIHcuY29udGVudC5yYW5nZXNbNF0ucGVyY2VudGFnZSA+IDUwXG4gICAgICAgICAgXCJZb3VyIG1vc3QgZXhwZW5zaXZlIHByb2R1Y3RzIGJyaW5nIHlvdSBtb3N0IG9mIHlvdXIgcmV2ZW51ZS5cIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgXCJZb3VyIHJldmVudWUgaXMgYmFsYW5jZWQgYmV0d2VlbiB5b3VyIGRpZmZlcmVudCBwcm9kdWN0cyBzZWdtZW50cy5cIlxuXG4gICAgJHNjb3BlLmdldENvbG9yQnlJbmRleCA9IChpbmRleCkgLT5cbiAgICAgIENoYXJ0Rm9ybWF0dGVyU3ZjLmdldENvbG9yKGluZGV4KVxuXG4gICAgJHNjb3BlLmdldFJhbmdlTGFiZWwgPSAoYUxhYmVsKSAtPlxuICAgICAgcHJpY2VzID0gYUxhYmVsLnNwbGl0KCctJylcbiAgICAgIF8ubWFwKHByaWNlcywgKHByaWNlKSAtPlxuICAgICAgICAkZmlsdGVyKCdtbm9DdXJyZW5jeScpKHByaWNlLHcuY29udGVudC5jdXJyZW5jeSxmYWxzZSlcbiAgICAgICkuam9pbignIC0gJylcblxuICAgICRzY29wZS5nZXRNYXhSYW5nZSA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmRcbiAgICAgICAgbWF4ID0gMFxuICAgICAgICBtYXhSYW5nZSA9IHcuY29udGVudC5yYW5nZXNbMF1cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoIHcuY29udGVudC5yYW5nZXMsIChyYW5nZSkgLT5cbiAgICAgICAgICBtYXhSYW5nZSA9IGFuZ3VsYXIuY29weShyYW5nZSkgaWYgcmFuZ2UucGVyY2VudGFnZSA+IG1heFxuICAgICAgICAgIG1heCA9IE1hdGgubWF4KG1heCwgcmFuZ2UucGVyY2VudGFnZSlcblxuICAgICAgICByZXR1cm4gbWF4UmFuZ2VcblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIFNldHRpbmdzOiBvcmdhbml6YXRpb25zICsgdGltZSByYW5nZSArIDEqcGFyYW0tc2VsZWN0b3IgKyB3aWR0aFxuICAgICRzY29wZS4kd2F0Y2ggZ2V0U2V0dGluZ3NDb3VudCwgKHRvdGFsKSAtPlxuICAgICAgdy5sb2FkQ29udGVudCgpIGlmIHRvdGFsID49IDRcblxuICAgIHJldHVybiB3XG5dKVxuXG5tb2R1bGUuZGlyZWN0aXZlKCd3aWRnZXRTYWxlc1NlZ21lbnRlZFR1cm5vdmVyJywgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCkgLT5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJzYWxlc1wiKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInNlZ21lbnRlZC10dXJub3ZlclwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0U2FsZXNTZWdtZW50ZWRUdXJub3ZlckN0cmwnXG4gIH1cbikiXX0=