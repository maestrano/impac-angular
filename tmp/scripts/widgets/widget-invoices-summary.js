(function () {
var module;

module = angular.module('maestrano.analytics.widget-invoices-summary', ['maestrano.assets']);

module.controller('WidgetInvoicesSummaryCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'Utilities', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      return $scope.isDataFound = !_.isEmpty(w.content.summary);
    };
    w.format = function() {
      var pieData, pieOptions;
      if ($scope.isDataFound) {
        pieData = _.map(w.content.summary, function(entity) {
          return {
            label: entity.name,
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
      if (total === 2) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetInvoicesSummary', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("invoices");
      return element.addClass("summary");
    },
    controller: 'WidgetInvoicesSummaryCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWludm9pY2VzLXN1bW1hcnkuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsNkNBQWYsRUFBNkQsQ0FBQyxrQkFBRCxDQUE3RDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQiwyQkFBbEIsRUFBOEM7RUFDNUMsUUFENEMsRUFDbEMsaUJBRGtDLEVBQ2YsV0FEZSxFQUNGLG1CQURFLEVBRTVDLFNBQUMsTUFBRCxFQUFTLGVBQVQsRUFBMEIsU0FBMUIsRUFBcUMsaUJBQXJDO0FBRUUsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxDQUFDLENBQUMsV0FBRixHQUFnQixTQUFBO2FBQ2QsTUFBTSxDQUFDLFdBQVAsR0FBcUIsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBcEI7SUFEUjtJQUdoQixDQUFDLENBQUMsTUFBRixHQUFXLFNBQUE7QUFDVCxVQUFBO01BQUEsSUFBRyxNQUFNLENBQUMsV0FBVjtRQUNFLE9BQUEsR0FBVSxDQUFDLENBQUMsR0FBRixDQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBaEIsRUFBeUIsU0FBQyxNQUFEO2lCQUNqQztZQUNFLEtBQUEsRUFBTyxNQUFNLENBQUMsSUFEaEI7WUFFRSxLQUFBLEVBQU8sTUFBTSxDQUFDLEtBRmhCOztRQURpQyxDQUF6QjtRQUtWLFVBQUEsR0FBYTtVQUNYLHFCQUFBLEVBQXVCLEVBRFo7VUFFWCxlQUFBLEVBQWlCLEVBRk47O2VBSWIsQ0FBQyxDQUFDLEtBQUYsR0FBVSxpQkFBaUIsQ0FBQyxRQUFsQixDQUEyQixPQUEzQixFQUFvQyxVQUFwQyxFQVZaOztJQURTO0lBcUJYLGdCQUFBLEdBQW1CLFNBQUE7TUFDakIsSUFBRyxrQkFBSDtBQUNFLGVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQURwQjtPQUFBLE1BQUE7QUFHRSxlQUFPLEVBSFQ7O0lBRGlCO0lBTW5CLE1BQU0sQ0FBQyxNQUFQLENBQWMsZ0JBQWQsRUFBZ0MsU0FBQyxLQUFEO01BQzlCLElBQW1CLEtBQUEsS0FBUyxDQUE1QjtlQUFBLENBQUMsQ0FBQyxXQUFGLENBQUEsRUFBQTs7SUFEOEIsQ0FBaEM7QUFHQSxXQUFPO0VBckNULENBRjRDO0NBQTlDOztBQTBDQSxNQUFNLENBQUMsU0FBUCxDQUFpQix1QkFBakIsRUFBMEMsU0FBQTtBQUN4QyxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFVBQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsU0FBakI7SUFGSSxDQUZEO0lBS0osVUFBQSxFQUFZLDJCQUxSOztBQURpQyxDQUExQyIsImZpbGUiOiJ3aWRnZXRzL3dpZGdldC1pbnZvaWNlcy1zdW1tYXJ5LmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LWludm9pY2VzLXN1bW1hcnknLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0SW52b2ljZXNTdW1tYXJ5Q3RybCcsW1xuICAnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsICdVdGlsaXRpZXMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMsIFV0aWxpdGllcywgQ2hhcnRGb3JtYXR0ZXJTdmMpIC0+XG5cbiAgICB3ID0gJHNjb3BlLndpZGdldFxuXG4gICAgdy5pbml0Q29udGV4dCA9IC0+XG4gICAgICAkc2NvcGUuaXNEYXRhRm91bmQgPSAhXy5pc0VtcHR5KHcuY29udGVudC5zdW1tYXJ5KVxuXG4gICAgdy5mb3JtYXQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG4gICAgICAgIHBpZURhdGEgPSBfLm1hcCB3LmNvbnRlbnQuc3VtbWFyeSwgKGVudGl0eSkgLT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogZW50aXR5Lm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogZW50aXR5LnRvdGFsLFxuICAgICAgICAgIH1cbiAgICAgICAgcGllT3B0aW9ucyA9IHtcbiAgICAgICAgICBwZXJjZW50YWdlSW5uZXJDdXRvdXQ6IDUwLFxuICAgICAgICAgIHRvb2x0aXBGb250U2l6ZTogMTIsXG4gICAgICAgIH1cbiAgICAgICAgdy5jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLnBpZUNoYXJ0KHBpZURhdGEsIHBpZU9wdGlvbnMpXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA9PSAyXG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0SW52b2ljZXNTdW1tYXJ5JywgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCkgLT5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJpbnZvaWNlc1wiKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInN1bW1hcnlcIilcbiAgICAsY29udHJvbGxlcjogJ1dpZGdldEludm9pY2VzU3VtbWFyeUN0cmwnXG4gIH1cbikiXX0=