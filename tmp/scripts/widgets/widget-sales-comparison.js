(function () {
var module;

module = angular.module('maestrano.analytics.widget-sales-comparison', ['maestrano.assets']);

module.controller('WidgetSalesComparisonCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
    var getSettingsCount, selectedElementsSetting, unCollapsedSetting, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales_comparison) && !_.isEmpty(w.content.dates)) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
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
          }
        ];
        $scope.filter = _.find($scope.filterOptions, function(o) {
          return w.metadata && w.metadata.filter === o.value;
        }) || $scope.filterOptions[0];
        $scope.criteriaOptions = [
          {
            label: 'products',
            value: 'default'
          }, {
            label: 'locations',
            value: 'location'
          }, {
            label: 'industries',
            value: 'industry'
          }, {
            label: 'customers',
            value: 'customer'
          }
        ];
        $scope.criteria = _.find($scope.criteriaOptions, function(o) {
          return w.metadata && w.metadata.criteria === o.value;
        }) || $scope.criteriaOptions[0];
        if (w.metadata.selectedElements) {
          $scope.selectedElements = [];
          return angular.forEach(w.metadata.selectedElements, function(sElem) {
            var foundElem;
            foundElem = _.find(w.content.sales_comparison, function(statement) {
              return statement.name === sElem.name;
            });
            if (!foundElem) {
              angular.forEach(w.content.sales_comparison, function(statement) {
                if (statement.sales != null) {
                  return foundElem || (foundElem = _.find(statement.sales, function(sale) {
                    return sElem.id === sale.id;
                  }));
                }
              });
            }
            if (foundElem) {
              return $scope.selectedElements.push(foundElem);
            }
          });
        }
      }
    };
    w.format = function() {
      var all_values_are_positive, inputData, options;
      if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
        all_values_are_positive = true;
        inputData = [];
        angular.forEach($scope.selectedElements, function(sElem) {
          var data, labels;
          data = angular.copy(sElem);
          labels = _.map(w.content.dates, function(date) {
            if (w.metadata.hist_parameters && w.metadata.hist_parameters.period === "YEARLY") {
              return $filter('date')(date, 'yyyy');
            } else if (w.metadata.hist_parameters && w.metadata.hist_parameters.period === "QUARTERLY") {
              return $filter('date')(date, 'MMM-yy');
            } else if (w.metadata.hist_parameters && (w.metadata.hist_parameters.period === "WEEKLY" || w.metadata.hist_parameters.period === "DAILY")) {
              return $filter('date')(date, 'dd-MMM');
            } else {
              return $filter('date')(date, 'MMM');
            }
          });
          inputData.push({
            title: data.name,
            labels: labels,
            values: data.totals[$scope.filter.value]
          });
          return angular.forEach(data.totals, function(value) {
            return all_values_are_positive && (all_values_are_positive = value >= 0);
          });
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: false,
          pointDot: false
        };
        return w.chart = ChartFormatterSvc.lineChart(inputData, options);
      }
    };
    $scope.$watch((function() {
      return $scope.filter;
    }), function(filter) {
      return w.format();
    }, true);
    $scope.getLastDate = function() {
      if ($scope.isDataFound) {
        return _.last(w.content.dates);
      }
    };
    $scope.getTotalForPeriod = function(element) {
      if ((element.totals != null) && $scope.filter) {
        return _.reduce(element.totals[$scope.filter.value], function(memo, total) {
          return memo + total;
        }, 0);
      }
    };
    $scope.getElementChartColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.toogleSelectedElement = function(element) {
      if ($scope.isSelected(element)) {
        $scope.selectedElements = _.reject($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        });
        w.format();
        if (w.isExpanded() && $scope.selectedElements.length === 0) {
          return w.toogleExpanded();
        } else {
          return w.updateSettings(false);
        }
      } else {
        $scope.selectedElements || ($scope.selectedElements = []);
        $scope.selectedElements.push(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toogleExpanded();
        } else {
          return w.updateSettings(false);
        }
      }
    };
    $scope.isSelected = function(element) {
      if ((element != null) && ($scope.selectedElements != null)) {
        if (_.find($scope.selectedElements, function(sElem) {
          if (element.id) {
            return sElem.id === element.id;
          } else {
            return sElem.name === element.name;
          }
        })) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    $scope.toogleCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === element.name;
          });
        } else {
          $scope.unCollapsed.push(element.name);
        }
        return w.updateSettings(false);
      }
    };
    $scope.isCollapsed = function(element) {
      if ((element != null) && (element.name != null)) {
        if (_.find($scope.unCollapsed, (function(name) {
          return element.name === name;
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
    selectedElementsSetting = {};
    selectedElementsSetting.initialized = false;
    selectedElementsSetting.initialize = function() {
      return selectedElementsSetting.initialized = true;
    };
    selectedElementsSetting.toMetadata = function() {
      return {
        selectedElements: $scope.selectedElements
      };
    };
    w.settings.push(selectedElementsSetting);
    getSettingsCount = function() {
      if (w.settings != null) {
        return w.settings.length;
      } else {
        return 0;
      }
    };
    $scope.$watch(getSettingsCount, function(total) {
      if (total >= 7) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetSalesComparison', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("profit-and-loss");
    },
    controller: 'WidgetSalesComparisonCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLWNvbXBhcmlzb24uanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsNkNBQWYsRUFBNkQsQ0FBQyxrQkFBRCxDQUE3RDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQiwyQkFBbEIsRUFBOEM7RUFDNUMsUUFENEMsRUFDbEMsaUJBRGtDLEVBQ2YsbUJBRGUsRUFDTSxTQUROLEVBRTVDLFNBQUMsTUFBRCxFQUFTLGVBQVQsRUFBMEIsaUJBQTFCLEVBQTZDLE9BQTdDO0FBRUUsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxDQUFDLENBQUMsV0FBRixHQUFnQixTQUFBO01BQ2QsSUFBRyxNQUFNLENBQUMsV0FBUCxHQUFxQixPQUFPLENBQUMsU0FBUixDQUFrQixDQUFDLENBQUMsT0FBcEIsQ0FBQSxJQUFnQyxDQUFDLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBcEIsQ0FBakMsSUFBMEUsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBcEIsQ0FBbkc7UUFFRSxNQUFNLENBQUMsV0FBUCxHQUFxQixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVgsSUFBMEI7UUFFL0MsTUFBTSxDQUFDLGFBQVAsR0FBdUI7VUFDckI7WUFBQyxLQUFBLEVBQU8sMEJBQVI7WUFBb0MsS0FBQSxFQUFPLGtCQUEzQztXQURxQixFQUVyQjtZQUFDLEtBQUEsRUFBTywwQkFBUjtZQUFvQyxLQUFBLEVBQU8sZ0JBQTNDO1dBRnFCLEVBR3JCO1lBQUMsS0FBQSxFQUFPLGVBQVI7WUFBeUIsS0FBQSxFQUFPLGVBQWhDO1dBSHFCOztRQUt2QixNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxhQUFkLEVBQTZCLFNBQUMsQ0FBRDtp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LE1BQUE7QUFHRSxlQUFPLEVBSFQ7O0lBRGlCO0lBT25CLE1BQU0sQ0FBQyxNQUFQLENBQWMsZ0JBQWQsRUFBZ0MsU0FBQyxLQUFEO01BQzlCLElBQW1CLEtBQUEsSUFBUyxDQUE1QjtlQUFBLENBQUMsQ0FBQyxXQUFGLENBQUEsRUFBQTs7SUFEOEIsQ0FBaEM7QUFHQSxXQUFPO0VBcE1ULENBRjRDO0NBQTlDOztBQXlNQSxNQUFNLENBQUMsU0FBUCxDQUFpQix1QkFBakIsRUFBMEMsU0FBQTtBQUN4QyxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFVBQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsaUJBQWpCO0lBRkksQ0FGRDtJQUtKLFVBQUEsRUFBWSwyQkFMUjs7QUFEaUMsQ0FBMUMiLCJmaWxlIjoid2lkZ2V0cy93aWRnZXQtc2FsZXMtY29tcGFyaXNvbi5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1zYWxlcy1jb21wYXJpc29uJyxbJ21hZXN0cmFuby5hc3NldHMnXSlcblxubW9kdWxlLmNvbnRyb2xsZXIoJ1dpZGdldFNhbGVzQ29tcGFyaXNvbkN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLCAnJGZpbHRlcicsXG4gICgkc2NvcGUsIERoYkFuYWx5dGljc1N2YywgQ2hhcnRGb3JtYXR0ZXJTdmMsICRmaWx0ZXIpIC0+XG5cbiAgICB3ID0gJHNjb3BlLndpZGdldFxuXG4gICAgdy5pbml0Q29udGV4dCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgPSBhbmd1bGFyLmlzRGVmaW5lZCh3LmNvbnRlbnQpICYmICFfLmlzRW1wdHkody5jb250ZW50LnNhbGVzX2NvbXBhcmlzb24pICYmICFfLmlzRW1wdHkody5jb250ZW50LmRhdGVzKVxuXG4gICAgICAgICRzY29wZS51bkNvbGxhcHNlZCA9IHcubWV0YWRhdGEudW5Db2xsYXBzZWQgfHwgW11cblxuICAgICAgICAkc2NvcGUuZmlsdGVyT3B0aW9ucyA9IFtcbiAgICAgICAgICB7bGFiZWw6ICd2YWx1ZSBzb2xkIChpbmNsLiB0YXhlcyknLCB2YWx1ZTogJ2dyb3NzX3ZhbHVlX3NvbGQnfSxcbiAgICAgICAgICB7bGFiZWw6ICd2YWx1ZSBzb2xkIChleGNsLiB0YXhlcyknLCB2YWx1ZTogJ25ldF92YWx1ZV9zb2xkJ30sXG4gICAgICAgICAge2xhYmVsOiAncXVhbnRpdHkgc29sZCcsIHZhbHVlOiAncXVhbnRpdHlfc29sZCd9LFxuICAgICAgICBdXG4gICAgICAgICRzY29wZS5maWx0ZXIgPSBfLmZpbmQoJHNjb3BlLmZpbHRlck9wdGlvbnMsIChvKSAtPlxuICAgICAgICAgIHcubWV0YWRhdGEgJiYgdy5tZXRhZGF0YS5maWx0ZXIgPT0gby52YWx1ZVxuICAgICAgICApIHx8ICRzY29wZS5maWx0ZXJPcHRpb25zWzBdXG4gICAgICAgIFxuICAgICAgICAkc2NvcGUuY3JpdGVyaWFPcHRpb25zID0gW1xuICAgICAgICAgIHtsYWJlbDogJ3Byb2R1Y3RzJywgdmFsdWU6ICdkZWZhdWx0J30sXG4gICAgICAgICAge2xhYmVsOiAnbG9jYXRpb25zJywgdmFsdWU6ICdsb2NhdGlvbid9LFxuICAgICAgICAgIHtsYWJlbDogJ2luZHVzdHJpZXMnLCB2YWx1ZTogJ2luZHVzdHJ5J30sXG4gICAgICAgICAge2xhYmVsOiAnY3VzdG9tZXJzJywgdmFsdWU6ICdjdXN0b21lcid9LFxuICAgICAgICBdXG4gICAgICAgICRzY29wZS5jcml0ZXJpYSA9IF8uZmluZCgkc2NvcGUuY3JpdGVyaWFPcHRpb25zLCAobykgLT5cbiAgICAgICAgICB3Lm1ldGFkYXRhICYmIHcubWV0YWRhdGEuY3JpdGVyaWEgPT0gby52YWx1ZVxuICAgICAgICApIHx8ICRzY29wZS5jcml0ZXJpYU9wdGlvbnNbMF1cblxuICAgICAgICBpZiB3Lm1ldGFkYXRhLnNlbGVjdGVkRWxlbWVudHNcbiAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cyA9IFtdXG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHcubWV0YWRhdGEuc2VsZWN0ZWRFbGVtZW50cywgKHNFbGVtKSAtPlxuICAgICAgICAgICAgZm91bmRFbGVtID0gXy5maW5kKHcuY29udGVudC5zYWxlc19jb21wYXJpc29uLCAoc3RhdGVtZW50KS0+XG4gICAgICAgICAgICAgIHN0YXRlbWVudC5uYW1lID09IHNFbGVtLm5hbWVcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgaWYgIWZvdW5kRWxlbVxuICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gody5jb250ZW50LnNhbGVzX2NvbXBhcmlzb24sIChzdGF0ZW1lbnQpIC0+XG4gICAgICAgICAgICAgICAgZm91bmRFbGVtIHx8PSBfLmZpbmQoc3RhdGVtZW50LnNhbGVzLCAoc2FsZSktPlxuICAgICAgICAgICAgICAgICAgc0VsZW0uaWQgPT0gc2FsZS5pZFxuICAgICAgICAgICAgICAgICkgaWYgc3RhdGVtZW50LnNhbGVzP1xuICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLnB1c2goZm91bmRFbGVtKSBpZiBmb3VuZEVsZW1cbiAgICAgICAgICApXG5cbiAgICAgICAgIyB3LndpZHRoID0gNiB1bmxlc3MgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHM/ICYmICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDBcblxuICAgIHcuZm9ybWF0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCAmJiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cz8gJiYgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMubGVuZ3RoID4gMFxuICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSA9IHRydWVcbiAgICAgICAgXG4gICAgICAgIGlucHV0RGF0YSA9IFtdXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cywgKHNFbGVtKSAtPlxuICAgICAgICAgIGRhdGEgPSBhbmd1bGFyLmNvcHkoc0VsZW0pXG4gICAgICAgICAgXG4gICAgICAgICAgbGFiZWxzID0gXy5tYXAgdy5jb250ZW50LmRhdGVzLCAoZGF0ZSkgLT5cbiAgICAgICAgICAgIGlmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzICYmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZCA9PSBcIllFQVJMWVwiXG4gICAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAneXl5eScpXG4gICAgICAgICAgICBlbHNlIGlmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzICYmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZCA9PSBcIlFVQVJURVJMWVwiXG4gICAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnTU1NLXl5JylcbiAgICAgICAgICAgIGVsc2UgaWYgdy5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMgJiYgKHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZCA9PSBcIldFRUtMWVwiIHx8IHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZCA9PSBcIkRBSUxZXCIpXG4gICAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnZGQtTU1NJylcbiAgICAgICAgICAgIGVsc2UgIFxuICAgICAgICAgICAgICAkZmlsdGVyKCdkYXRlJykoZGF0ZSwgJ01NTScpXG4gICAgICAgICAgXG4gICAgICAgICAgaW5wdXREYXRhLnB1c2goe3RpdGxlOiBkYXRhLm5hbWUsIGxhYmVsczogbGFiZWxzLCB2YWx1ZXM6IGRhdGEudG90YWxzWyRzY29wZS5maWx0ZXIudmFsdWVdfSlcbiAgICAgICAgICBcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZGF0YS50b3RhbHMsICh2YWx1ZSkgLT5cbiAgICAgICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlICYmPSB2YWx1ZSA+PSAwXG4gICAgICAgICAgKVxuICAgICAgICApXG5cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzY2FsZUJlZ2luQXRaZXJvOiBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSxcbiAgICAgICAgICBzaG93WExhYmVsczogdHJ1ZSxcbiAgICAgICAgICBkYXRhc2V0RmlsbDogZmFsc2UsXG4gICAgICAgICAgcG9pbnREb3Q6IGZhbHNlLFxuICAgICAgICB9XG5cbiAgICAgICAgdy5jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmxpbmVDaGFydChpbnB1dERhdGEsb3B0aW9ucylcblxuICAgICRzY29wZS4kd2F0Y2ggKC0+ICRzY29wZS5maWx0ZXIpLCAoZmlsdGVyKSAtPlxuICAgICAgdy5mb3JtYXQoKVxuICAgICx0cnVlXG5cbiAgICAkc2NvcGUuZ2V0TGFzdERhdGUgPSAtPlxuICAgICAgXy5sYXN0KHcuY29udGVudC5kYXRlcykgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG5cbiAgICAkc2NvcGUuZ2V0VG90YWxGb3JQZXJpb2QgPSAoZWxlbWVudCkgLT5cbiAgICAgIF8ucmVkdWNlKGVsZW1lbnQudG90YWxzWyRzY29wZS5maWx0ZXIudmFsdWVdLCAobWVtbyx0b3RhbCkgLT5cbiAgICAgICAgbWVtbyArIHRvdGFsXG4gICAgICAsIDApIGlmIGVsZW1lbnQudG90YWxzPyAmJiAkc2NvcGUuZmlsdGVyXG5cbiAgICAkc2NvcGUuZ2V0RWxlbWVudENoYXJ0Q29sb3IgPSAoaW5kZXgpIC0+XG4gICAgICBDaGFydEZvcm1hdHRlclN2Yy5nZXRDb2xvcihpbmRleClcblxuXG4jIFRPRE8gc2VsZWN0ZWRFbGVtZW50IGFuZCBjb2xsYXBzZWQgc2hvdWxkIGJlIGZhY3Rvcml6ZWQgYXMgc2V0dGluZ3Mgb3IgJ2NvbW1vbnMnXG5cbiAgICAkc2NvcGUudG9vZ2xlU2VsZWN0ZWRFbGVtZW50ID0gKGVsZW1lbnQpIC0+XG4gICAgICBpZiAkc2NvcGUuaXNTZWxlY3RlZChlbGVtZW50KVxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cyA9IF8ucmVqZWN0KCRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLCAoc0VsZW0pIC0+XG4gICAgICAgICAgaWYgZWxlbWVudC5pZFxuICAgICAgICAgICAgc0VsZW0uaWQgPT0gZWxlbWVudC5pZFxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNFbGVtLm5hbWUgPT0gZWxlbWVudC5uYW1lXG4gICAgICAgIClcbiAgICAgICAgdy5mb3JtYXQoKVxuICAgICAgICBpZiB3LmlzRXhwYW5kZWQoKSAmJiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGggPT0gMFxuICAgICAgICAgIHcudG9vZ2xlRXhwYW5kZWQoKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgdy51cGRhdGVTZXR0aW5ncyhmYWxzZSlcbiAgICAgIGVsc2VcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMgfHw9IFtdXG4gICAgICAgICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLnB1c2goZWxlbWVudClcbiAgICAgICAgdy5mb3JtYXQoKVxuICAgICAgICBpZiAhdy5pc0V4cGFuZGVkKClcbiAgICAgICAgICB3LnRvb2dsZUV4cGFuZGVkKClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHcudXBkYXRlU2V0dGluZ3MoZmFsc2UpXG5cbiAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IChlbGVtZW50KSAtPlxuICAgICAgaWYgZWxlbWVudD8gJiYgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHM/XG4gICAgICAgIGlmIF8uZmluZCgkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cywgKHNFbGVtKSAtPlxuICAgICAgICAgIGlmIGVsZW1lbnQuaWRcbiAgICAgICAgICAgIHNFbGVtLmlkID09IGVsZW1lbnQuaWRcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBzRWxlbS5uYW1lID09IGVsZW1lbnQubmFtZVxuICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgZWxzZSBcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAkc2NvcGUudG9vZ2xlQ29sbGFwc2VkID0gKGVsZW1lbnQpIC0+XG4gICAgICBpZiBlbGVtZW50PyAmJiBlbGVtZW50Lm5hbWU/ICBcbiAgICAgICAgaWYgXy5maW5kKCRzY29wZS51bkNvbGxhcHNlZCwgKChuYW1lKSAtPiBlbGVtZW50Lm5hbWUgPT0gbmFtZSkpXG4gICAgICAgICAgJHNjb3BlLnVuQ29sbGFwc2VkID0gXy5yZWplY3QoJHNjb3BlLnVuQ29sbGFwc2VkLCAobmFtZSkgLT5cbiAgICAgICAgICAgIG5hbWUgPT0gZWxlbWVudC5uYW1lXG4gICAgICAgICAgKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgJHNjb3BlLnVuQ29sbGFwc2VkLnB1c2goZWxlbWVudC5uYW1lKVxuICAgICAgICB3LnVwZGF0ZVNldHRpbmdzKGZhbHNlKVxuXG4gICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gKGVsZW1lbnQpIC0+XG4gICAgICBpZiBlbGVtZW50PyAmJiBlbGVtZW50Lm5hbWU/ICBcbiAgICAgICAgaWYgXy5maW5kKCRzY29wZS51bkNvbGxhcHNlZCwgKChuYW1lKSAtPiBlbGVtZW50Lm5hbWUgPT0gbmFtZSkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICAjICMjIyBNaW5pLXNldHRpbmdzXG5cbiAgICB1bkNvbGxhcHNlZFNldHRpbmcgPSB7fVxuICAgIHVuQ29sbGFwc2VkU2V0dGluZy5pbml0aWFsaXplZCA9IGZhbHNlXG4gICAgXG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nLmluaXRpYWxpemUgPSAtPlxuICAgICAgdW5Db2xsYXBzZWRTZXR0aW5nLmluaXRpYWxpemVkID0gdHJ1ZVxuXG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nLnRvTWV0YWRhdGEgPSAtPlxuICAgICAge3VuQ29sbGFwc2VkOiAkc2NvcGUudW5Db2xsYXBzZWR9XG5cbiAgICB3LnNldHRpbmdzLnB1c2godW5Db2xsYXBzZWRTZXR0aW5nKVxuXG4gICAgc2VsZWN0ZWRFbGVtZW50c1NldHRpbmcgPSB7fVxuICAgIHNlbGVjdGVkRWxlbWVudHNTZXR0aW5nLmluaXRpYWxpemVkID0gZmFsc2VcbiAgICBcbiAgICBzZWxlY3RlZEVsZW1lbnRzU2V0dGluZy5pbml0aWFsaXplID0gLT5cbiAgICAgIHNlbGVjdGVkRWxlbWVudHNTZXR0aW5nLmluaXRpYWxpemVkID0gdHJ1ZVxuXG4gICAgc2VsZWN0ZWRFbGVtZW50c1NldHRpbmcudG9NZXRhZGF0YSA9IC0+XG4gICAgICB7c2VsZWN0ZWRFbGVtZW50czogJHNjb3BlLnNlbGVjdGVkRWxlbWVudHN9XG5cbiAgICB3LnNldHRpbmdzLnB1c2goc2VsZWN0ZWRFbGVtZW50c1NldHRpbmcpXG5cbiAgICAjIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAjIFRPRE86IFJlZmFjdG9yIG9uY2Ugd2UgaGF2ZSB1bmRlcnN0b29kIGV4YWN0bHkgaG93IHRoZSBhbmd1bGFyanMgY29tcGlsYXRpb24gcHJvY2VzcyB3b3JrczpcbiAgICAjIGluIHRoaXMgb3JkZXIsIHdlIHNob3VsZDpcbiAgICAjIDEtIGNvbXBpbGUgaW1wYWMtd2lkZ2V0IGNvbnRyb2xsZXJcbiAgICAjIDItIGNvbXBpbGUgdGhlIHNwZWNpZmljIHdpZGdldCB0ZW1wbGF0ZS9jb250cm9sbGVyXG4gICAgIyAzLSBjb21waWxlIHRoZSBzZXR0aW5ncyB0ZW1wbGF0ZXMvY29udHJvbGxlcnNcbiAgICAjIDQtIGNhbGwgd2lkZ2V0LmxvYWRDb250ZW50KCkgKGlkZWFsbHksIGZyb20gaW1wYWMtd2lkZ2V0LCBvbmNlIGEgY2FsbGJhY2sgXG4gICAgIyAgICAgYXNzZXNzaW5nIHRoYXQgZXZlcnl0aGluZyBpcyBjb21waWxlZCBhbiByZWFkeSBpcyByZWNlaXZlZClcbiAgICBnZXRTZXR0aW5nc0NvdW50ID0gLT5cbiAgICAgIGlmIHcuc2V0dGluZ3M/XG4gICAgICAgIHJldHVybiB3LnNldHRpbmdzLmxlbmd0aFxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gMFxuXG4gICAgIyB3aWR0aCArIGhpc3RfcGFyYW1ldGVycyArIG9yZ2FuaXphdGlvbl9pZHMgKyB1bkNvbGxhcHNlZCArIHNlbGVjdGVkRWxlbWVudCArIHgyIHBhcmFtLXNlbGVjdG9yXG4gICAgJHNjb3BlLiR3YXRjaCBnZXRTZXR0aW5nc0NvdW50LCAodG90YWwpIC0+XG4gICAgICB3LmxvYWRDb250ZW50KCkgaWYgdG90YWwgPj0gN1xuXG4gICAgcmV0dXJuIHdcbl0pXG5cbm1vZHVsZS5kaXJlY3RpdmUoJ3dpZGdldFNhbGVzQ29tcGFyaXNvbicsIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiYWNjb3VudHNcIilcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJwcm9maXQtYW5kLWxvc3NcIilcbiAgICAsY29udHJvbGxlcjogJ1dpZGdldFNhbGVzQ29tcGFyaXNvbkN0cmwnXG4gIH1cbikiXX0=