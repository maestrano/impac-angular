(function () {
var module;

module = angular.module('maestrano.analytics.widget-hr-salaries-summary', ['maestrano.assets']);

module.controller('WidgetHrSalariesSummaryCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = (w.content.summary != null) && !_.isEmpty(w.content.summary.data)) {
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
        $scope.period = _.find($scope.periodOptions, function(o) {
          return o.value === w.content.total.period.toLowerCase();
        }) || $scope.periodOptions[0];
        $scope.filterOptions = [
          {
            label: 'Gender',
            value: 'gender'
          }, {
            label: 'Age Range',
            value: 'age_range'
          }, {
            label: 'Job Title',
            value: 'job_title'
          }
        ];
        return $scope.filter = _.find($scope.filterOptions, function(o) {
          return o.value === w.content.summary.filter;
        }) || $scope.filterOptions[0];
      }
    };
    w.format = function() {
      var barData, barOptions, lineData, lineOptions;
      if ($scope.isDataFound) {
        barData = {
          labels: _.map(w.content.summary.data, function(elem) {
            return elem.label;
          }),
          values: _.map(w.content.summary.data, function(elem) {
            return elem.value;
          })
        };
        if ($scope.filter.value === 'gender') {
          barOptions = {
            showTooltips: false
          };
          return w.chart = ChartFormatterSvc.barChart(barData, barOptions);
        } else if ($scope.filter.value === 'job_title') {
          barOptions = {
            showTooltips: false,
            showXLabels: false,
            barDatasetSpacing: 15
          };
          return w.chart = ChartFormatterSvc.barChart(barData, barOptions);
        } else if ($scope.filter.value === 'age_range') {
          if (_.last(barData.labels) === "unknown") {
            barData.labels.pop();
            barData.values.pop();
          }
          lineData = [
            {
              title: "Average salary",
              labels: barData.labels,
              values: barData.values
            }
          ];
          lineOptions = {
            scaleBeginAtZero: true,
            showXLabels: false
          };
          return w.chart = ChartFormatterSvc.lineChart(lineData, lineOptions);
        }
      }
    };
    $scope.getColorByIndex = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
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

module.directive('widgetHrSalariesSummary', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("salaries-summary");
    },
    controller: 'WidgetHrSalariesSummaryCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWhyLXNhbGFyaWVzLXN1bW1hcnkuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsZ0RBQWYsRUFBZ0UsQ0FBQyxrQkFBRCxDQUFoRTs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQiw2QkFBbEIsRUFBZ0Q7RUFDOUMsUUFEOEMsRUFDcEMsaUJBRG9DLEVBQ2pCLG1CQURpQixFQUU5QyxTQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGlCQUExQjtBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsU0FBQTtNQUNkLElBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsMkJBQUEsSUFBc0IsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQTVCLENBQS9DO1FBRUUsTUFBTSxDQUFDLGFBQVAsR0FBdUI7VUFDckI7WUFBQyxLQUFBLEVBQU8sUUFBUjtZQUFrQixLQUFBLEVBQU8sUUFBekI7V0FEcUIsRUFFckI7WUFBQyxLQUFBLEVBQU8sU0FBUjtZQUFtQixLQUFBLEVBQU8sU0FBMUI7V0FGcUIsRUFHckI7WUFBQyxLQUFBLEVBQU8sUUFBUjtZQUFrQixLQUFBLEVBQU8sUUFBekI7V0FIcUIsRUFJckI7WUFBQyxLQUFBLEVBQU8sUUFBUjtZQUFrQixLQUFBLEVBQU8sUUFBekI7V0FKcUI7O1FBTXZCLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBTSxDQUFDLGFBQWQsRUFBNkIsU0FBQyxDQUFEO2lCQUMzQyxDQUFDLENBQUMsS0FBRixLQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUF2QixDQUFBO1FBRGdDLENBQTdCLENBQUEsSUFFWCxNQUFNLENBQUMsYUFBYyxD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Q0FBQSxFQUFBOztJQUQ4QixDQUFoQztBQUdBLFdBQU87RUFuRlQsQ0FGOEM7Q0FBaEQ7O0FBd0ZBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLHlCQUFqQixFQUE0QyxTQUFBO0FBQzFDLFNBQU87SUFDTCxRQUFBLEVBQVUsR0FETDtJQUVMLElBQUEsRUFBTSxTQUFDLEtBQUQsRUFBUSxPQUFSO01BQ0osT0FBTyxDQUFDLFFBQVIsQ0FBaUIsSUFBakI7YUFDQSxPQUFPLENBQUMsUUFBUixDQUFpQixrQkFBakI7SUFGSSxDQUZEO0lBS0osVUFBQSxFQUFZLDZCQUxSOztBQURtQyxDQUE1QyIsImZpbGUiOiJ3aWRnZXRzL3dpZGdldC1oci1zYWxhcmllcy1zdW1tYXJ5LmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LWhyLXNhbGFyaWVzLXN1bW1hcnknLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0SHJTYWxhcmllc1N1bW1hcnlDdHJsJyxbXG4gICckc2NvcGUnLCAnRGhiQW5hbHl0aWNzU3ZjJywgJ0NoYXJ0Rm9ybWF0dGVyU3ZjJyxcbiAgKCRzY29wZSwgRGhiQW5hbHl0aWNzU3ZjLCBDaGFydEZvcm1hdHRlclN2YykgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCA9IHcuY29udGVudC5zdW1tYXJ5PyAmJiAhXy5pc0VtcHR5KHcuY29udGVudC5zdW1tYXJ5LmRhdGEpXG5cbiAgICAgICAgJHNjb3BlLnBlcmlvZE9wdGlvbnMgPSBbXG4gICAgICAgICAge2xhYmVsOiAnWWVhcmx5JywgdmFsdWU6ICd5ZWFybHknfSxcbiAgICAgICAgICB7bGFiZWw6ICdNb250aGx5JywgdmFsdWU6ICdtb250aGx5J30sXG4gICAgICAgICAge2xhYmVsOiAnV2Vla2x5JywgdmFsdWU6ICd3ZWVrbHknfSxcbiAgICAgICAgICB7bGFiZWw6ICdIb3VybHknLCB2YWx1ZTogJ2hvdXJseSd9XG4gICAgICAgIF1cbiAgICAgICAgJHNjb3BlLnBlcmlvZCA9IF8uZmluZCgkc2NvcGUucGVyaW9kT3B0aW9ucywgKG8pIC0+XG4gICAgICAgICAgby52YWx1ZSA9PSB3LmNvbnRlbnQudG90YWwucGVyaW9kLnRvTG93ZXJDYXNlKClcbiAgICAgICAgKSB8fCAkc2NvcGUucGVyaW9kT3B0aW9uc1swXVxuXG4gICAgICAgICRzY29wZS5maWx0ZXJPcHRpb25zID0gW1xuICAgICAgICAgIHtsYWJlbDogJ0dlbmRlcicsIHZhbHVlOiAnZ2VuZGVyJ30sXG4gICAgICAgICAge2xhYmVsOiAnQWdlIFJhbmdlJywgdmFsdWU6ICdhZ2VfcmFuZ2UnfSxcbiAgICAgICAgICB7bGFiZWw6ICdKb2IgVGl0bGUnLCB2YWx1ZTogJ2pvYl90aXRsZSd9LFxuICAgICAgICBdXG4gICAgICAgICRzY29wZS5maWx0ZXIgPSBfLmZpbmQoJHNjb3BlLmZpbHRlck9wdGlvbnMsIChvKSAtPlxuICAgICAgICAgIG8udmFsdWUgPT0gdy5jb250ZW50LnN1bW1hcnkuZmlsdGVyXG4gICAgICAgICkgfHwgJHNjb3BlLmZpbHRlck9wdGlvbnNbMF1cblxuICAgIHcuZm9ybWF0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZFxuICAgICAgICBiYXJEYXRhID0ge1xuICAgICAgICAgIGxhYmVsczogXy5tYXAody5jb250ZW50LnN1bW1hcnkuZGF0YSwgKGVsZW0pIC0+XG4gICAgICAgICAgICBlbGVtLmxhYmVsXG4gICAgICAgICAgKSxcbiAgICAgICAgICB2YWx1ZXM6IF8ubWFwKHcuY29udGVudC5zdW1tYXJ5LmRhdGEsIChlbGVtKSAtPlxuICAgICAgICAgICAgZWxlbS52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBpZiAkc2NvcGUuZmlsdGVyLnZhbHVlID09ICdnZW5kZXInXG4gICAgICAgICAgYmFyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHNob3dUb29sdGlwczogZmFsc2UsXG4gICAgICAgICAgfVxuICAgICAgICAgIHcuY2hhcnQgPSBDaGFydEZvcm1hdHRlclN2Yy5iYXJDaGFydChiYXJEYXRhLCBiYXJPcHRpb25zKVxuICAgICAgICBlbHNlIGlmICRzY29wZS5maWx0ZXIudmFsdWUgPT0gJ2pvYl90aXRsZSdcbiAgICAgICAgICBiYXJPcHRpb25zID0ge1xuICAgICAgICAgICAgc2hvd1Rvb2x0aXBzOiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dYTGFiZWxzOiBmYWxzZSxcbiAgICAgICAgICAgIGJhckRhdGFzZXRTcGFjaW5nOiAxNSxcbiAgICAgICAgICB9XG4gICAgICAgICAgdy5jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmJhckNoYXJ0KGJhckRhdGEsIGJhck9wdGlvbnMpXG4gICAgICAgIGVsc2UgaWYgJHNjb3BlLmZpbHRlci52YWx1ZSA9PSAnYWdlX3JhbmdlJ1xuICAgICAgICAgIGlmIF8ubGFzdChiYXJEYXRhLmxhYmVscykgPT0gXCJ1bmtub3duXCJcbiAgICAgICAgICAgIGJhckRhdGEubGFiZWxzLnBvcCgpXG4gICAgICAgICAgICBiYXJEYXRhLnZhbHVlcy5wb3AoKVxuICAgICAgICAgIGxpbmVEYXRhID0gW3tcbiAgICAgICAgICAgIHRpdGxlOiBcIkF2ZXJhZ2Ugc2FsYXJ5XCIsXG4gICAgICAgICAgICBsYWJlbHM6IGJhckRhdGEubGFiZWxzLFxuICAgICAgICAgICAgdmFsdWVzOiBiYXJEYXRhLnZhbHVlc1xuICAgICAgICAgIH1dXG4gICAgICAgICAgbGluZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBzY2FsZUJlZ2luQXRaZXJvOiB0cnVlLFxuICAgICAgICAgICAgc2hvd1hMYWJlbHM6IGZhbHNlLFxuICAgICAgICAgIH1cbiAgICAgICAgICB3LmNoYXJ0ID0gQ2hhcnRGb3JtYXR0ZXJTdmMubGluZUNoYXJ0KGxpbmVEYXRhLCBsaW5lT3B0aW9ucylcblxuICAgICRzY29wZS5nZXRDb2xvckJ5SW5kZXggPSAoaW5kZXgpIC0+XG4gICAgICBDaGFydEZvcm1hdHRlclN2Yy5nZXRDb2xvcihpbmRleClcblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIFNldHRpbmdzOiBvcmdhbml6YXRpb25zICsgd2lkdGggKyAyKnBhcmFtLXNlbGVjdG9yXG4gICAgJHNjb3BlLiR3YXRjaCBnZXRTZXR0aW5nc0NvdW50LCAodG90YWwpIC0+XG4gICAgICB3LmxvYWRDb250ZW50KCkgaWYgdG90YWwgPT0gNFxuXG4gICAgcmV0dXJuIHdcbl0pXG5cbm1vZHVsZS5kaXJlY3RpdmUoJ3dpZGdldEhyU2FsYXJpZXNTdW1tYXJ5JywgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCkgLT5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJoclwiKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInNhbGFyaWVzLXN1bW1hcnlcIilcbiAgICAsY29udHJvbGxlcjogJ1dpZGdldEhyU2FsYXJpZXNTdW1tYXJ5Q3RybCdcbiAgfVxuKSJdfQ==