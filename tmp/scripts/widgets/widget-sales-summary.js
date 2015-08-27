(function () {
var module;

module = angular.module('maestrano.analytics.widget-sales-summary', ['maestrano.assets']);

module.controller('WidgetSalesSummaryCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'Utilities', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = !_.isEmpty(w.content.hist_parameters)) {
        $scope.incorrectPeriod = _.isEmpty(w.content.summary);
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
        $scope.period = _.find($scope.periodOptions, function(o) {
          return o.value === w.content.hist_parameters.period;
        }) || $scope.periodOptions[0];
        $scope.filterOptions = [
          {
            label: 'value sold (incl. taxes)',
            value: 'gross_value_sold'
          }, {
            label: 'value sold (excl. taxes)',
            value: 'net_value_sold'
          }, {
            label: 'quantity sold',
            value: 'quantity_sold'
          }, {
            label: 'value purchased (incl. taxes)',
            value: 'gross_value_purchased'
          }, {
            label: 'value purchased (excl. taxes)',
            value: 'net_value_purchased'
          }, {
            label: 'quantity purchased',
            value: 'quantity_purchased'
          }
        ];
        if (w.metadata.criteria === "customer") {
          $scope.filterOptions = [$scope.filterOptions[0], $scope.filterOptions[1], $scope.filterOptions[2]];
        }
        return $scope.filter = _.find($scope.filterOptions, function(o) {
          return o.value === w.content.filter;
        }) || $scope.filterOptions[0];
      }
    };
    w.format = function() {
      var pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = _.map(w.content.summary, function(entity) {
          var label;
          if (entity.company) {
            label = (entity.code || entity.location || entity.industry || entity.customer) + " (" + entity.company + ")";
          } else {
            label = entity.code || entity.location || entity.industry || entity.customer;
          }
          return {
            label: label,
            value: entity.total
          };
        });
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
      if (total >= 4) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetSalesSummary', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("summary");
    },
    controller: 'WidgetSalesSummaryCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLXN1bW1hcnkuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsMENBQWYsRUFBMEQsQ0FBQyxrQkFBRCxDQUExRDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQix3QkFBbEIsRUFBMkM7RUFDekMsUUFEeUMsRUFDL0IsaUJBRCtCLEVBQ1osV0FEWSxFQUNDLG1CQURELEVBRXpDLFNBQUMsTUFBRCxFQUFTLGVBQVQsRUFBMEIsU0FBMUIsRUFBcUMsaUJBQXJDO0FBRUUsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxDQUFDLENBQUMsV0FBRixHQUFnQixTQUFBO01BQ2QsSUFBRyxNQUFNLENBQUMsV0FBUCxHQUFxQixDQUFDLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFwQixDQUF6QjtRQUVFLE1BQU0sQ0FBQyxlQUFQLEdBQXlCLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFwQjtRQUV6QixNQUFNLENBQUMsYUFBUCxHQUF1QjtVQUNyQjtZQUFDLEtBQUEsRUFBTyxNQUFSO1lBQWdCLEtBQUEsRUFBTyxRQUF2QjtXQURxQixFQUVyQjtZQUFDLEtBQUEsRUFBTyxTQUFSO1lBQW1CLEtBQUEsRUFBTyxXQUExQjtXQUZxQixFQUdyQjtZQUFDLEtBQUEsRUFBTyxPQUFSO1lBQWlCLEtBQUEsRUFBTyxTQUF4QjtXQUhxQixFQUlyQjtZQUFDLEtBQUEsRUFBTyxNQUFSO1lBQWdCLEtBQUEsRUFBTyxRQUF2QjtXQUpxQixFQUtyQjtZQUFDLEtBQUEsRUFBTyxLQUFSO1lBQWUsS0FBQSxFQUFPLE9BQXRCO1dBTHFCOztRQU92QixNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxhQUFkLEVBQTZCLFNBQUMsQ0FB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LFFBQUEsRUFBVSxHQURMO0lBRUwsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVI7TUFDSixPQUFPLENBQUMsUUFBUixDQUFpQixPQUFqQjthQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFNBQWpCO0lBRkksQ0FGRDtJQUtKLFVBQUEsRUFBWSx3QkFMUjs7QUFEOEIsQ0FBdkMiLCJmaWxlIjoid2lkZ2V0cy93aWRnZXQtc2FsZXMtc3VtbWFyeS5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1zYWxlcy1zdW1tYXJ5JyxbJ21hZXN0cmFuby5hc3NldHMnXSlcblxubW9kdWxlLmNvbnRyb2xsZXIoJ1dpZGdldFNhbGVzU3VtbWFyeUN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnVXRpbGl0aWVzJywgJ0NoYXJ0Rm9ybWF0dGVyU3ZjJyxcbiAgKCRzY29wZSwgRGhiQW5hbHl0aWNzU3ZjLCBVdGlsaXRpZXMsIENoYXJ0Rm9ybWF0dGVyU3ZjKSAtPlxuXG4gICAgdyA9ICRzY29wZS53aWRnZXRcblxuICAgIHcuaW5pdENvbnRleHQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kID0gIV8uaXNFbXB0eSh3LmNvbnRlbnQuaGlzdF9wYXJhbWV0ZXJzKVxuXG4gICAgICAgICRzY29wZS5pbmNvcnJlY3RQZXJpb2QgPSBfLmlzRW1wdHkody5jb250ZW50LnN1bW1hcnkpXG5cbiAgICAgICAgJHNjb3BlLnBlcmlvZE9wdGlvbnMgPSBbXG4gICAgICAgICAge2xhYmVsOiAneWVhcicsIHZhbHVlOiAnWUVBUkxZJ30sXG4gICAgICAgICAge2xhYmVsOiAncXVhcnRlcicsIHZhbHVlOiAnUVVBUlRFUkxZJ30sXG4gICAgICAgICAge2xhYmVsOiAnbW9udGgnLCB2YWx1ZTogJ01PTlRITFknfSxcbiAgICAgICAgICB7bGFiZWw6ICd3ZWVrJywgdmFsdWU6ICdXRUVLTFknfSxcbiAgICAgICAgICB7bGFiZWw6ICdkYXknLCB2YWx1ZTogJ0RBSUxZJ30sXG4gICAgICAgIF1cbiAgICAgICAgJHNjb3BlLnBlcmlvZCA9IF8uZmluZCgkc2NvcGUucGVyaW9kT3B0aW9ucywgKG8pIC0+XG4gICAgICAgICAgby52YWx1ZSA9PSB3LmNvbnRlbnQuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZFxuICAgICAgICApIHx8ICRzY29wZS5wZXJpb2RPcHRpb25zWzBdXG5cbiAgICAgICAgJHNjb3BlLmZpbHRlck9wdGlvbnMgPSBbXG4gICAgICAgICAge2xhYmVsOiAndmFsdWUgc29sZCAoaW5jbC4gdGF4ZXMpJywgdmFsdWU6ICdncm9zc192YWx1ZV9zb2xkJ30sXG4gICAgICAgICAge2xhYmVsOiAndmFsdWUgc29sZCAoZXhjbC4gdGF4ZXMpJywgdmFsdWU6ICduZXRfdmFsdWVfc29sZCd9LFxuICAgICAgICAgIHtsYWJlbDogJ3F1YW50aXR5IHNvbGQnLCB2YWx1ZTogJ3F1YW50aXR5X3NvbGQnfSxcbiAgICAgICAgICB7bGFiZWw6ICd2YWx1ZSBwdXJjaGFzZWQgKGluY2wuIHRheGVzKScsIHZhbHVlOiAnZ3Jvc3NfdmFsdWVfcHVyY2hhc2VkJ30sXG4gICAgICAgICAge2xhYmVsOiAndmFsdWUgcHVyY2hhc2VkIChleGNsLiB0YXhlcyknLCB2YWx1ZTogJ25ldF92YWx1ZV9wdXJjaGFzZWQnfSxcbiAgICAgICAgICB7bGFiZWw6ICdxdWFudGl0eSBwdXJjaGFzZWQnLCB2YWx1ZTogJ3F1YW50aXR5X3B1cmNoYXNlZCd9LFxuICAgICAgICBdXG4gICAgICAgICRzY29wZS5maWx0ZXJPcHRpb25zID0gW1xuICAgICAgICAgICRzY29wZS5maWx0ZXJPcHRpb25zWzBdLFxuICAgICAgICAgICRzY29wZS5maWx0ZXJPcHRpb25zWzFdLFxuICAgICAgICAgICRzY29wZS5maWx0ZXJPcHRpb25zWzJdXG4gICAgICAgIF0gaWYgdy5tZXRhZGF0YS5jcml0ZXJpYSA9PSBcImN1c3RvbWVyXCJcbiAgICAgICAgXG4gICAgICAgICRzY29wZS5maWx0ZXIgPSBfLmZpbmQoJHNjb3BlLmZpbHRlck9wdGlvbnMsIChvKSAtPlxuICAgICAgICAgIG8udmFsdWUgPT0gdy5jb250ZW50LmZpbHRlclxuICAgICAgICApIHx8ICRzY29wZS5maWx0ZXJPcHRpb25zWzBdXG5cbiAgICB3LmZvcm1hdCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmRcbiAgICAgICAgcGllRGF0YSA9IF8ubWFwIHcuY29udGVudC5zdW1tYXJ5LCAoZW50aXR5KSAtPlxuICAgICAgICAgIGlmIGVudGl0eS5jb21wYW55XG4gICAgICAgICAgICBsYWJlbCA9IFwiI3tlbnRpdHkuY29kZSB8fCBlbnRpdHkubG9jYXRpb24gfHwgZW50aXR5LmluZHVzdHJ5IHx8IGVudGl0eS5jdXN0b21lcn0gKCN7ZW50aXR5LmNvbXBhbnl9KVwiXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgbGFiZWwgPSBlbnRpdHkuY29kZSB8fCBlbnRpdHkubG9jYXRpb24gfHwgZW50aXR5LmluZHVzdHJ5IHx8IGVudGl0eS5jdXN0b21lclxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgICAgIHZhbHVlOiBlbnRpdHkudG90YWwsXG4gICAgICAgICAgfVxuICAgICAgICBwaWVPcHRpb25zID0ge1xuICAgICAgICAgIHBlcmNlbnRhZ2VJbm5lckN1dG91dDogNTAsXG4gICAgICAgICAgdG9vbHRpcEZvbnRTaXplOiAxMixcbiAgICAgICAgfVxuICAgICAgICB3LmNoYXJ0ID0gQ2hhcnRGb3JtYXR0ZXJTdmMucGllQ2hhcnQocGllRGF0YSwgcGllT3B0aW9ucylcblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA+PSA0XG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0U2FsZXNTdW1tYXJ5JywgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCkgLT5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJzYWxlc1wiKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInN1bW1hcnlcIilcbiAgICAsY29udHJvbGxlcjogJ1dpZGdldFNhbGVzU3VtbWFyeUN0cmwnXG4gIH1cbikiXX0=