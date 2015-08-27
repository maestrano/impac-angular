(function () {
var module;

module = angular.module('maestrano.analytics.widget-sales-growth', ['maestrano.assets']);

module.controller('WidgetSalesGrowthCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, w;
    w = $scope.widget;
    $scope.isDataQuantity = true;
    $scope.getSelectedProduct = function() {
      if ($scope.isDataFound) {
        return _.find(w.content.summary, function(product) {
          return product.id === $scope.product.value;
        });
      }
    };
    $scope.getCurrentValue = function() {
      if ($scope.getSelectedProduct() != null) {
        return _.last($scope.getSelectedProduct().totals);
      }
    };
    $scope.getCurrentDate = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.dates);
      }
    };
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.productOptions = _.flatten(_.map(w.content.summary, function(product) {
          return {
            label: product.code,
            value: product.id
          };
        }));
        $scope.product = _.find($scope.productOptions, function(o) {
          return o.value === w.content.product;
        }) || {
          label: "SELECT PRODUCT",
          value: -1
        };
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
        $scope.filter = _.find($scope.filterOptions, function(o) {
          return o.value === w.content.filter;
        }) || $scope.filterOptions[0];
        return $scope.isDataQuantity = $scope.filter.value.match('quantity');
      }
    };
    w.format = function() {
      var all_values_are_positive, data, inputData, options;
      if ($scope.isDataFound && $scope.product && (data = $scope.getSelectedProduct())) {
        inputData = {
          title: data.name,
          labels: w.content.dates,
          values: data.totals
        };
        all_values_are_positive = true;
        angular.forEach(data.totals, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false
        };
        return w.chart = ChartFormatterSvc.lineChart([inputData], options);
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

module.directive('widgetSalesGrowth', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("growth");
    },
    controller: 'WidgetSalesGrowthCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLWdyb3d0aC5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSx5Q0FBZixFQUF5RCxDQUFDLGtCQUFELENBQXpEOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLHVCQUFsQixFQUEwQztFQUN4QyxRQUR3QyxFQUM5QixpQkFEOEIsRUFDWCxtQkFEVyxFQUV4QyxTQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGlCQUExQjtBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsTUFBTSxDQUFDLGNBQVAsR0FBd0I7SUFFeEIsTUFBTSxDQUFDLGtCQUFQLEdBQTRCLFNBQUE7TUFDMUIsSUFFSyxNQUFNLENBQUMsV0FGWjtBQUFBLGVBQU8sQ0FBQyxDQUFDLElBQUYsQ0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQWpCLEVBQTBCLFNBQUMsT0FBRDtpQkFDL0IsT0FBTyxDQUFDLEVBQVIsS0FBYyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBREUsQ0FBMUIsRUFBUDs7SUFEMEI7SUFLNUIsTUFBTSxDQUFDLGVBQVAsR0FBeUIsU0FBQTtNQUN2QixJQUFxRCxtQ0FBckQ7QUFBQSxlQUFPLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBTSxDQUFDLGtCQUFQLENBQUEsQ0FBMkIsQ0FBQyxNQUFuQyxFQUFQOztJQUR1QjtJQUd6QixNQUFNLENBQUMsY0FBUCxHQUF3QixTQUFBO01BQ3RCLElBQWtDLE1BQU0sQ0FBQyxXQUF6QztBQUFBLGVBQU8sQ0FBQyxDQUFDLElBQUYsQ0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQWpCLEVBQVA7O0lBRHNCO0lBR3hCLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7TUFDZCxJQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQUMsQ0FBQyxPQUFwQixD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QVAsQ0FBYyxnQkFBZCxFQUFnQyxTQUFDLEtBQUQ7TUFDOUIsSUFBbUIsS0FBQSxJQUFTLENBQTVCO2VBQUEsQ0FBQyxDQUFDLFdBQUYsQ0FBQSxFQUFBOztJQUQ4QixDQUFoQztBQUdBLFdBQU87RUF6RVQsQ0FGd0M7Q0FBMUM7O0FBOEVBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLG1CQUFqQixFQUFzQyxTQUFBO0FBQ3BDLFNBQU87SUFDTCxRQUFBLEVBQVUsR0FETDtJQUVMLElBQUEsRUFBTSxTQUFDLEtBQUQsRUFBUSxPQUFSO01BQ0osT0FBTyxDQUFDLFFBQVIsQ0FBaUIsT0FBakI7YUFDQSxPQUFPLENBQUMsUUFBUixDQUFpQixRQUFqQjtJQUZJLENBRkQ7SUFLSixVQUFBLEVBQVksdUJBTFI7O0FBRDZCLENBQXRDIiwiZmlsZSI6IndpZGdldHMvd2lkZ2V0LXNhbGVzLWdyb3d0aC5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1zYWxlcy1ncm93dGgnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0U2FsZXNHcm93dGhDdHJsJyxbXG4gICckc2NvcGUnLCAnRGhiQW5hbHl0aWNzU3ZjJywgJ0NoYXJ0Rm9ybWF0dGVyU3ZjJyxcbiAgKCRzY29wZSwgRGhiQW5hbHl0aWNzU3ZjLCBDaGFydEZvcm1hdHRlclN2YykgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICAkc2NvcGUuaXNEYXRhUXVhbnRpdHkgPSB0cnVlXG5cbiAgICAkc2NvcGUuZ2V0U2VsZWN0ZWRQcm9kdWN0ID0gLT5cbiAgICAgIHJldHVybiBfLmZpbmQody5jb250ZW50LnN1bW1hcnksIChwcm9kdWN0KSAtPlxuICAgICAgICBwcm9kdWN0LmlkID09ICRzY29wZS5wcm9kdWN0LnZhbHVlXG4gICAgICApIGlmICRzY29wZS5pc0RhdGFGb3VuZFxuXG4gICAgJHNjb3BlLmdldEN1cnJlbnRWYWx1ZSA9IC0+XG4gICAgICByZXR1cm4gXy5sYXN0KCRzY29wZS5nZXRTZWxlY3RlZFByb2R1Y3QoKS50b3RhbHMpIGlmICRzY29wZS5nZXRTZWxlY3RlZFByb2R1Y3QoKT9cblxuICAgICRzY29wZS5nZXRDdXJyZW50RGF0ZSA9IC0+XG4gICAgICByZXR1cm4gXy5sYXN0KHcuY29udGVudC5kYXRlcykgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCA9IGFuZ3VsYXIuaXNEZWZpbmVkKHcuY29udGVudCkgJiYgIV8uaXNFbXB0eSh3LmNvbnRlbnQuc3VtbWFyeSkgJiYgIV8uaXNFbXB0eSh3LmNvbnRlbnQuZGF0ZXMpXG5cbiAgICAgICAgJHNjb3BlLnByb2R1Y3RPcHRpb25zID0gXy5mbGF0dGVuKF8ubWFwKHcuY29udGVudC5zdW1tYXJ5LCAocHJvZHVjdCkgLT5cbiAgICAgICAgICByZXR1cm4ge2xhYmVsOiBwcm9kdWN0LmNvZGUsIHZhbHVlOiBwcm9kdWN0LmlkfVxuICAgICAgICApKVxuICAgICAgICAkc2NvcGUucHJvZHVjdCA9IF8uZmluZCgkc2NvcGUucHJvZHVjdE9wdGlvbnMsIChvKSAtPlxuICAgICAgICAgIG8udmFsdWUgPT0gdy5jb250ZW50LnByb2R1Y3RcbiAgICAgICAgKSB8fCB7bGFiZWw6IFwiU0VMRUNUIFBST0RVQ1RcIiwgdmFsdWU6IC0xfVxuXG4gICAgICAgICRzY29wZS5maWx0ZXJPcHRpb25zID0gW1xuICAgICAgICAgIHtsYWJlbDogJ3ZhbHVlIHNvbGQgKGluY2wuIHRheGVzKScsIHZhbHVlOiAnZ3Jvc3NfdmFsdWVfc29sZCd9LFxuICAgICAgICAgIHtsYWJlbDogJ3ZhbHVlIHNvbGQgKGV4Y2wuIHRheGVzKScsIHZhbHVlOiAnbmV0X3ZhbHVlX3NvbGQnfSxcbiAgICAgICAgICB7bGFiZWw6ICdxdWFudGl0eSBzb2xkJywgdmFsdWU6ICdxdWFudGl0eV9zb2xkJ30sXG4gICAgICAgICAge2xhYmVsOiAndmFsdWUgcHVyY2hhc2VkIChpbmNsLiB0YXhlcyknLCB2YWx1ZTogJ2dyb3NzX3ZhbHVlX3B1cmNoYXNlZCd9LFxuICAgICAgICAgIHtsYWJlbDogJ3ZhbHVlIHB1cmNoYXNlZCAoZXhjbC4gdGF4ZXMpJywgdmFsdWU6ICduZXRfdmFsdWVfcHVyY2hhc2VkJ30sXG4gICAgICAgICAge2xhYmVsOiAncXVhbnRpdHkgcHVyY2hhc2VkJywgdmFsdWU6ICdxdWFudGl0eV9wdXJjaGFzZWQnfSxcbiAgICAgICAgXVxuICAgICAgICAkc2NvcGUuZmlsdGVyID0gXy5maW5kKCRzY29wZS5maWx0ZXJPcHRpb25zLCAobykgLT5cbiAgICAgICAgICBvLnZhbHVlID09IHcuY29udGVudC5maWx0ZXJcbiAgICAgICAgKSB8fCAkc2NvcGUuZmlsdGVyT3B0aW9uc1swXVxuXG4gICAgICAgICRzY29wZS5pc0RhdGFRdWFudGl0eSA9ICRzY29wZS5maWx0ZXIudmFsdWUubWF0Y2goJ3F1YW50aXR5JylcblxuICAgIHcuZm9ybWF0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCAmJiAkc2NvcGUucHJvZHVjdCAmJiBkYXRhID0gJHNjb3BlLmdldFNlbGVjdGVkUHJvZHVjdCgpXG4gICAgICAgIGlucHV0RGF0YSA9IHt0aXRsZTogZGF0YS5uYW1lLCBsYWJlbHM6IHcuY29udGVudC5kYXRlcywgdmFsdWVzOiBkYXRhLnRvdGFsc31cbiAgICAgICAgYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUgPSB0cnVlXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChkYXRhLnRvdGFscywgKHZhbHVlKSAtPlxuICAgICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlICYmPSB2YWx1ZSA+PSAwXG4gICAgICAgIClcblxuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgIHNjYWxlQmVnaW5BdFplcm86IGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlLFxuICAgICAgICAgIHNob3dYTGFiZWxzOiBmYWxzZSxcbiAgICAgICAgfVxuICAgICAgICB3LmNoYXJ0ID0gQ2hhcnRGb3JtYXR0ZXJTdmMubGluZUNoYXJ0KFtpbnB1dERhdGFdLG9wdGlvbnMpXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIG9yZ2FuaXphdGlvbl9pZHMgKyB0aW1lIHJhZ2UgKyB4MiBwYXJhbSBzZWxlY3RvciAocHJvZHVjdCwgZmlsdGVyKVxuICAgICRzY29wZS4kd2F0Y2ggZ2V0U2V0dGluZ3NDb3VudCwgKHRvdGFsKSAtPlxuICAgICAgdy5sb2FkQ29udGVudCgpIGlmIHRvdGFsID49IDRcblxuICAgIHJldHVybiB3XG5dKVxuXG5tb2R1bGUuZGlyZWN0aXZlKCd3aWRnZXRTYWxlc0dyb3d0aCcsIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwic2FsZXNcIilcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJncm93dGhcIilcbiAgICAsY29udHJvbGxlcjogJ1dpZGdldFNhbGVzR3Jvd3RoQ3RybCdcbiAgfVxuKSJdfQ==