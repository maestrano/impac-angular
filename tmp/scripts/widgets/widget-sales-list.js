(function () {
var module;

module = angular.module('maestrano.analytics.widget-sales-list', ['maestrano.assets']);

module.controller('WidgetSalesListCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, unCollapsedSetting, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)) {
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
        $scope.filter = _.find($scope.filterOptions, function(o) {
          return o.value === w.content.filter;
        }) || $scope.filterOptions[0];
        return $scope.unCollapsed = w.metadata.unCollapsed || [];
      }
    };
    $scope.toogleCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === categoryName;
          });
        } else {
          $scope.unCollapsed.push(categoryName);
        }
        return w.updateSettings(false);
      }
    };
    $scope.isCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
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

module.directive('widgetSalesList', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("list");
    },
    controller: 'WidgetSalesListCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLWxpc3QuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsdUNBQWYsRUFBdUQsQ0FBQyxrQkFBRCxDQUF2RDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQixxQkFBbEIsRUFBd0M7RUFDdEMsUUFEc0MsRUFDNUIsaUJBRDRCLEVBQ1QsbUJBRFMsRUFFdEMsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixpQkFBMUI7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7TUFDZCxJQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQUMsQ0FBQyxPQUFwQixDQUFBLElBQWdDLENBQUMsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQXBCLENBQXpEO1FBRUUsTUFBTSxDQUFDLGFBQVAsR0FBdUI7VUFDckI7WUFBQyxLQUFBLEVBQU8sTUFBUjtZQUFnQixLQUFBLEVBQU8sUUFBdkI7V0FEcUIsRUFFckI7WUFBQyxLQUFBLEVBQU8sU0FBUjtZQUFtQixLQUFBLEVBQU8sV0FBMUI7V0FGcUIsRUFHckI7WUFBQyxLQUFBLEVBQU8sT0FBUjtZQUFpQixLQUFBLEVBQU8sU0FBeEI7V0FIcUIsRUFJckI7WUFBQyxLQUFBLEVBQU8sTUFBUjtZQUFnQixLQUFBLEVBQU8sUUFBdkI7V0FKcUIsRUFLckI7WUFBQyxLQUFBLEVBQU8sS0FBUjtZQUFlLEtBQUEsRUFBTyxPQUF0QjtXQUxxQjs7UUFPdkIsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFNLENBQUMsYUFBZCxFQUE2QixTQUFDLENBQUQ7aUJBQzNDLENBQUMsQ0FBQyxLQUFGLEtBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxl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O0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE9BQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsTUFBakI7SUFGSSxDQUZEO0lBS0osVUFBQSxFQUFZLHFCQUxSOztBQUQyQixDQUFwQyIsImZpbGUiOiJ3aWRnZXRzL3dpZGdldC1zYWxlcy1saXN0LmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LXNhbGVzLWxpc3QnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0U2FsZXNMaXN0Q3RybCcsW1xuICAnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsICdDaGFydEZvcm1hdHRlclN2YycsXG4gICgkc2NvcGUsIERoYkFuYWx5dGljc1N2YywgQ2hhcnRGb3JtYXR0ZXJTdmMpIC0+XG5cbiAgICB3ID0gJHNjb3BlLndpZGdldFxuXG4gICAgdy5pbml0Q29udGV4dCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgPSBhbmd1bGFyLmlzRGVmaW5lZCh3LmNvbnRlbnQpICYmICFfLmlzRW1wdHkody5jb250ZW50LnN1bW1hcnkpXG5cbiAgICAgICAgJHNjb3BlLnBlcmlvZE9wdGlvbnMgPSBbXG4gICAgICAgICAge2xhYmVsOiAneWVhcicsIHZhbHVlOiAnWUVBUkxZJ30sXG4gICAgICAgICAge2xhYmVsOiAncXVhcnRlcicsIHZhbHVlOiAnUVVBUlRFUkxZJ30sXG4gICAgICAgICAge2xhYmVsOiAnbW9udGgnLCB2YWx1ZTogJ01PTlRITFknfSxcbiAgICAgICAgICB7bGFiZWw6ICd3ZWVrJywgdmFsdWU6ICdXRUVLTFknfSxcbiAgICAgICAgICB7bGFiZWw6ICdkYXknLCB2YWx1ZTogJ0RBSUxZJ30sXG4gICAgICAgIF1cbiAgICAgICAgJHNjb3BlLnBlcmlvZCA9IF8uZmluZCgkc2NvcGUucGVyaW9kT3B0aW9ucywgKG8pIC0+XG4gICAgICAgICAgby52YWx1ZSA9PSB3LmNvbnRlbnQuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZFxuICAgICAgICApIHx8ICRzY29wZS5wZXJpb2RPcHRpb25zWzBdXG5cbiAgICAgICAgJHNjb3BlLmZpbHRlck9wdGlvbnMgPSBbXG4gICAgICAgICAge2xhYmVsOiAndmFsdWUgc29sZCAoaW5jbC4gdGF4ZXMpJywgdmFsdWU6ICdncm9zc192YWx1ZV9zb2xkJ30sXG4gICAgICAgICAge2xhYmVsOiAndmFsdWUgc29sZCAoZXhjbC4gdGF4ZXMpJywgdmFsdWU6ICduZXRfdmFsdWVfc29sZCd9LFxuICAgICAgICAgIHtsYWJlbDogJ3F1YW50aXR5IHNvbGQnLCB2YWx1ZTogJ3F1YW50aXR5X3NvbGQnfSxcbiAgICAgICAgICB7bGFiZWw6ICd2YWx1ZSBwdXJjaGFzZWQgKGluY2wuIHRheGVzKScsIHZhbHVlOiAnZ3Jvc3NfdmFsdWVfcHVyY2hhc2VkJ30sXG4gICAgICAgICAge2xhYmVsOiAndmFsdWUgcHVyY2hhc2VkIChleGNsLiB0YXhlcyknLCB2YWx1ZTogJ25ldF92YWx1ZV9wdXJjaGFzZWQnfSxcbiAgICAgICAgICB7bGFiZWw6ICdxdWFudGl0eSBwdXJjaGFzZWQnLCB2YWx1ZTogJ3F1YW50aXR5X3B1cmNoYXNlZCd9LFxuICAgICAgICBdXG4gICAgICAgICRzY29wZS5maWx0ZXIgPSBfLmZpbmQoJHNjb3BlLmZpbHRlck9wdGlvbnMsIChvKSAtPlxuICAgICAgICAgIG8udmFsdWUgPT0gdy5jb250ZW50LmZpbHRlclxuICAgICAgICApIHx8ICRzY29wZS5maWx0ZXJPcHRpb25zWzBdXG5cbiAgICAgICAgJHNjb3BlLnVuQ29sbGFwc2VkID0gdy5tZXRhZGF0YS51bkNvbGxhcHNlZCB8fCBbXVxuXG4gICAgJHNjb3BlLnRvb2dsZUNvbGxhcHNlZCA9IChjYXRlZ29yeU5hbWUpIC0+XG4gICAgICBpZiBjYXRlZ29yeU5hbWU/IFxuICAgICAgICBpZiBfLmZpbmQoJHNjb3BlLnVuQ29sbGFwc2VkLCAoKG5hbWUpIC0+IGNhdGVnb3J5TmFtZSA9PSBuYW1lKSlcbiAgICAgICAgICAkc2NvcGUudW5Db2xsYXBzZWQgPSBfLnJlamVjdCgkc2NvcGUudW5Db2xsYXBzZWQsIChuYW1lKSAtPlxuICAgICAgICAgICAgbmFtZSA9PSBjYXRlZ29yeU5hbWVcbiAgICAgICAgICApXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAkc2NvcGUudW5Db2xsYXBzZWQucHVzaChjYXRlZ29yeU5hbWUpXG4gICAgICAgIHcudXBkYXRlU2V0dGluZ3MoZmFsc2UpXG5cbiAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSAoY2F0ZWdvcnlOYW1lKSAtPlxuICAgICAgaWYgY2F0ZWdvcnlOYW1lPyAgXG4gICAgICAgIGlmIF8uZmluZCgkc2NvcGUudW5Db2xsYXBzZWQsICgobmFtZSkgLT4gY2F0ZWdvcnlOYW1lID09IG5hbWUpKVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0dXJuIHRydWVcblxuXG4gICAgIyAjIyMgTWluaS1zZXR0aW5nc1xuXG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nID0ge31cbiAgICB1bkNvbGxhcHNlZFNldHRpbmcuaW5pdGlhbGl6ZWQgPSBmYWxzZVxuICAgIFxuICAgIHVuQ29sbGFwc2VkU2V0dGluZy5pbml0aWFsaXplID0gLT5cbiAgICAgIHVuQ29sbGFwc2VkU2V0dGluZy5pbml0aWFsaXplZCA9IHRydWVcblxuICAgIHVuQ29sbGFwc2VkU2V0dGluZy50b01ldGFkYXRhID0gLT5cbiAgICAgIHt1bkNvbGxhcHNlZDogJHNjb3BlLnVuQ29sbGFwc2VkfVxuXG4gICAgdy5zZXR0aW5ncy5wdXNoKHVuQ29sbGFwc2VkU2V0dGluZylcblxuICAgICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIG9yZ2FuaXphdGlvbl9pZHMgKyB1bkNvbGxhcHNlZCArIHBhcmFtIHNlbGVjdG9yXG4gICAgJHNjb3BlLiR3YXRjaCBnZXRTZXR0aW5nc0NvdW50LCAodG90YWwpIC0+XG4gICAgICB3LmxvYWRDb250ZW50KCkgaWYgdG90YWwgPj0gM1xuXG4gICAgcmV0dXJuIHdcbl0pXG5cbm1vZHVsZS5kaXJlY3RpdmUoJ3dpZGdldFNhbGVzTGlzdCcsIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwic2FsZXNcIilcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJsaXN0XCIpXG4gICAgLGNvbnRyb2xsZXI6ICdXaWRnZXRTYWxlc0xpc3RDdHJsJ1xuICB9XG4pIl19