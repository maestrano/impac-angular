(function () {
var module;

module = angular.module('maestrano.analytics.widget-invoices-aged-payables-receivables', ['maestrano.assets']);

module.controller('WidgetInvoicesAgedPayablesReceivablesCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
    var getSettingsCount, selectedElementsSetting, unCollapsedSetting, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && (!_.isEmpty(w.content.payables) || !_.isEmpty(w.content.receivables)) && !_.isEmpty(w.content.dates)) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.metadata.selectedElements) {
          $scope.selectedElements = [];
          angular.forEach(w.metadata.selectedElements, function(sElem) {
            var foundElem;
            if (sElem.name === "aged_payables") {
              foundElem = w.content.payables;
            }
            if (sElem.name === "aged_receivables" && !foundElem) {
              foundElem = w.content.receivables;
            }
            if (!foundElem) {
              foundElem = _.find(w.content.payables.suppliers, function(supplier) {
                return supplier.id === sElem.id;
              });
            }
            if (!foundElem) {
              foundElem = _.find(w.content.receivables.customers, function(customer) {
                return customer.id === sElem.id;
              });
            }
            if (foundElem) {
              return $scope.selectedElements.push(foundElem);
            }
          });
        }
        if (!(($scope.selectedElements != null) && $scope.selectedElements.length > 0)) {
          return w.width = 6;
        }
      }
    };
    w.format = function() {
      var all_values_are_positive, inputData, labels, options;
      if ($scope.isDataFound && ($scope.selectedElements != null) && $scope.selectedElements.length > 0) {
        all_values_are_positive = true;
        inputData = [];
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
        angular.forEach($scope.selectedElements, function(sElem) {
          var data;
          data = angular.copy(sElem);
          inputData.push({
            title: data.name,
            labels: labels,
            values: data.totals
          });
          return angular.forEach(data.totals, function(value) {
            return all_values_are_positive && (all_values_are_positive = value >= 0);
          });
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: $scope.selectedElements.length === 1,
          pointDot: $scope.selectedElements.length === 1
        };
        return w.chart = ChartFormatterSvc.lineChart(inputData, options);
      }
    };
    $scope.getElementChartColor = function(index) {
      if (index != null) {
        return ChartFormatterSvc.getColor(index);
      }
    };
    $scope.getLastValue = function(element) {
      if ((element != null) && (element.totals != null)) {
        return _.last(element.totals);
      }
    };
    $scope.getTotalSum = function(element) {
      if ((element != null) && (element.totals != null)) {
        return _.reduce(element.totals, function(memo, num) {
          return memo + num;
        }, 0);
      }
    };
    $scope.getName = function(element) {
      if ((element != null) && (element.name != null)) {
        return element.name.replace(/_/g, " ");
      }
    };
    $scope.getPeriod = function() {
      var period, period_param;
      if ($scope.isDataFound && w.content.hist_parameters) {
        period_param = w.content.hist_parameters.period || "MONTHLY";
        period = "day";
        if (period_param !== "DAILY") {
          period = period_param.substr(0, period_param.length - 2).toLowerCase();
        }
        return "current " + period;
      } else {
        return "current month";
      }
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
      if (total >= 5) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetInvoicesAgedPayablesReceivables', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("invoices");
      return element.addClass("aged-payables-receivables");
    },
    controller: 'WidgetInvoicesAgedPayablesReceivablesCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWludm9pY2VzLWFnZWQtcGF5YWJsZXMtcmVjZWl2YWJsZXMuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsK0RBQWYsRUFBK0UsQ0FBQyxrQkFBRCxDQUEvRTs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQiwyQ0FBbEIsRUFBOEQ7RUFDNUQsUUFENEQsRUFDbEQsaUJBRGtELEVBQy9CLG1CQUQrQixFQUNWLFNBRFUsRUFFNUQsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixpQkFBMUIsRUFBNkMsT0FBN0M7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7TUFDZCxJQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQUMsQ0FBQyxPQUFwQixDQUFBLElBQWdDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBcEIsQ0FBRCxJQUFrQyxDQUFDLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFwQixDQUFwQyxDQUFoQyxJQUF5RyxDQUFDLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFwQixDQUFsSTtRQUVFLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBWCxJQUEwQjtRQUUvQyxJQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWQ7VUFDRSxNQUFNLENBQUMsZ0JBQVAsR0FBMEI7VUFDMUIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBM0IsRUFBNkMsU0FBQyxLQUFEO0FBQzNDLGdCQUFBO1lBQUEsSUFBa0MsS0FBSyxDQUFDLElBQU4sS0FBYyxlQUFo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Q0FBQSxFQUFBOztJQUQ4QixDQUFoQztBQUdBLFdBQU87RUF0TFQsQ0FGNEQ7Q0FBOUQ7O0FBMkxBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLHVDQUFqQixFQUEwRCxTQUFBO0FBQ3hELFNBQU87SUFDTCxRQUFBLEVBQVUsR0FETDtJQUVMLElBQUEsRUFBTSxTQUFDLEtBQUQsRUFBUSxPQUFSO01BQ0osT0FBTyxDQUFDLFFBQVIsQ0FBaUIsVUFBakI7YUFDQSxPQUFPLENBQUMsUUFBUixDQUFpQiwyQkFBakI7SUFGSSxDQUZEO0lBS0osVUFBQSxFQUFZLDJDQUxSOztBQURpRCxDQUExRCIsImZpbGUiOiJ3aWRnZXRzL3dpZGdldC1pbnZvaWNlcy1hZ2VkLXBheWFibGVzLXJlY2VpdmFibGVzLmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LWludm9pY2VzLWFnZWQtcGF5YWJsZXMtcmVjZWl2YWJsZXMnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0SW52b2ljZXNBZ2VkUGF5YWJsZXNSZWNlaXZhYmxlc0N0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLCAnJGZpbHRlcicsXG4gICgkc2NvcGUsIERoYkFuYWx5dGljc1N2YywgQ2hhcnRGb3JtYXR0ZXJTdmMsICRmaWx0ZXIpIC0+XG5cbiAgICB3ID0gJHNjb3BlLndpZGdldFxuXG4gICAgdy5pbml0Q29udGV4dCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgPSBhbmd1bGFyLmlzRGVmaW5lZCh3LmNvbnRlbnQpICYmICghXy5pc0VtcHR5KHcuY29udGVudC5wYXlhYmxlcykgfHwgIV8uaXNFbXB0eSh3LmNvbnRlbnQucmVjZWl2YWJsZXMpKSAmJiAhXy5pc0VtcHR5KHcuY29udGVudC5kYXRlcylcblxuICAgICAgICAkc2NvcGUudW5Db2xsYXBzZWQgPSB3Lm1ldGFkYXRhLnVuQ29sbGFwc2VkIHx8IFtdXG5cbiAgICAgICAgaWYgdy5tZXRhZGF0YS5zZWxlY3RlZEVsZW1lbnRzXG4gICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMgPSBbXVxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3Lm1ldGFkYXRhLnNlbGVjdGVkRWxlbWVudHMsIChzRWxlbSkgLT5cbiAgICAgICAgICAgIGZvdW5kRWxlbSA9IHcuY29udGVudC5wYXlhYmxlcyBpZiBzRWxlbS5uYW1lID09IFwiYWdlZF9wYXlhYmxlc1wiXG4gICAgICAgICAgICBmb3VuZEVsZW0gPSB3LmNvbnRlbnQucmVjZWl2YWJsZXMgaWYgc0VsZW0ubmFtZSA9PSBcImFnZWRfcmVjZWl2YWJsZXNcIiAmJiAhZm91bmRFbGVtXG5cbiAgICAgICAgICAgIGZvdW5kRWxlbSA9IF8uZmluZCh3LmNvbnRlbnQucGF5YWJsZXMuc3VwcGxpZXJzLCAoc3VwcGxpZXIpLT5cbiAgICAgICAgICAgICAgc3VwcGxpZXIuaWQgPT0gc0VsZW0uaWRcbiAgICAgICAgICAgICkgaWYgIWZvdW5kRWxlbVxuXG4gICAgICAgICAgICBmb3VuZEVsZW0gPSBfLmZpbmQody5jb250ZW50LnJlY2VpdmFibGVzLmN1c3RvbWVycywgKGN1c3RvbWVyKS0+XG4gICAgICAgICAgICAgIGN1c3RvbWVyLmlkID09IHNFbGVtLmlkXG4gICAgICAgICAgICApIGlmICFmb3VuZEVsZW1cblxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMucHVzaChmb3VuZEVsZW0pIGlmIGZvdW5kRWxlbVxuICAgICAgICAgIClcblxuICAgICAgICB3LndpZHRoID0gNiB1bmxlc3MgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHM/ICYmICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDBcblxuICAgIHcuZm9ybWF0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCAmJiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cz8gJiYgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMubGVuZ3RoID4gMFxuICAgICAgICBcbiAgICAgICAgIyBIaXN0IGNoYXJ0XG4gICAgICAgIGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlID0gdHJ1ZVxuICAgICAgICBpbnB1dERhdGEgPSBbXVxuICAgICAgICBsYWJlbHMgPSBfLm1hcCB3LmNvbnRlbnQuZGF0ZXMsIChkYXRlKSAtPlxuICAgICAgICAgIGlmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzICYmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZCA9PSBcIllFQVJMWVwiXG4gICAgICAgICAgICAkZmlsdGVyKCdkYXRlJykoZGF0ZSwgJ3l5eXknKVxuICAgICAgICAgIGVsc2UgaWYgdy5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMgJiYgdy5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMucGVyaW9kID09IFwiUVVBUlRFUkxZXCJcbiAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnTU1NLXl5JylcbiAgICAgICAgICBlbHNlIGlmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzICYmICh3Lm1ldGFkYXRhLmhpc3RfcGFyYW1ldGVycy5wZXJpb2QgPT0gXCJXRUVLTFlcIiB8fCB3Lm1ldGFkYXRhLmhpc3RfcGFyYW1ldGVycy5wZXJpb2QgPT0gXCJEQUlMWVwiKVxuICAgICAgICAgICAgJGZpbHRlcignZGF0ZScpKGRhdGUsICdkZC1NTU0nKVxuICAgICAgICAgIGVsc2UgIFxuICAgICAgICAgICAgJGZpbHRlcignZGF0ZScpKGRhdGUsICdNTU0nKVxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMsIChzRWxlbSkgLT5cbiAgICAgICAgICBkYXRhID0gYW5ndWxhci5jb3B5KHNFbGVtKVxuICAgICAgICAgIGlucHV0RGF0YS5wdXNoKHt0aXRsZTogZGF0YS5uYW1lLCBsYWJlbHM6IGxhYmVscywgdmFsdWVzOiBkYXRhLnRvdGFsc30pXG4gICAgICAgICAgXG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGEudG90YWxzLCAodmFsdWUpIC0+XG4gICAgICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSAmJj0gdmFsdWUgPj0gMFxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgIHNjYWxlQmVnaW5BdFplcm86IGFsbF92YWx1ZXNfYXJlX3Bvc2l0aXZlLFxuICAgICAgICAgIHNob3dYTGFiZWxzOiB0cnVlLFxuICAgICAgICAgIGRhdGFzZXRGaWxsOiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGggPT0gMSxcbiAgICAgICAgICBwb2ludERvdDogJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMubGVuZ3RoID09IDEsXG4gICAgICAgIH1cbiAgICAgICAgdy5jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmxpbmVDaGFydChpbnB1dERhdGEsb3B0aW9ucylcblxuICAgICRzY29wZS5nZXRFbGVtZW50Q2hhcnRDb2xvciA9IChpbmRleCkgLT5cbiAgICAgIENoYXJ0Rm9ybWF0dGVyU3ZjLmdldENvbG9yKGluZGV4KSBpZiBpbmRleD9cblxuICAgICRzY29wZS5nZXRMYXN0VmFsdWUgPSAoZWxlbWVudCkgLT5cbiAgICAgIF8ubGFzdChlbGVtZW50LnRvdGFscykgaWYgZWxlbWVudD8gJiYgZWxlbWVudC50b3RhbHM/XG5cbiAgICAkc2NvcGUuZ2V0VG90YWxTdW0gPSAoZWxlbWVudCkgLT5cbiAgICAgIF8ucmVkdWNlKGVsZW1lbnQudG90YWxzLCAobWVtbywgbnVtKSAtPlxuICAgICAgICBtZW1vICsgbnVtXG4gICAgICAsIDApIGlmIGVsZW1lbnQ/ICYmIGVsZW1lbnQudG90YWxzP1xuXG4gICAgJHNjb3BlLmdldE5hbWUgPSAoZWxlbWVudCkgLT5cbiAgICAgIGlmIGVsZW1lbnQ/ICYmIGVsZW1lbnQubmFtZT9cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQubmFtZS5yZXBsYWNlKC9fL2csIFwiIFwiKVxuXG4gICAgJHNjb3BlLmdldFBlcmlvZCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgJiYgdy5jb250ZW50Lmhpc3RfcGFyYW1ldGVyc1xuICAgICAgICBwZXJpb2RfcGFyYW0gPSB3LmNvbnRlbnQuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZCB8fCBcIk1PTlRITFlcIlxuICAgICAgICBwZXJpb2QgPSBcImRheVwiXG4gICAgICAgIHBlcmlvZCA9IHBlcmlvZF9wYXJhbS5zdWJzdHIoMCxwZXJpb2RfcGFyYW0ubGVuZ3RoLTIpLnRvTG93ZXJDYXNlKCkgaWYgcGVyaW9kX3BhcmFtICE9IFwiREFJTFlcIlxuICAgICAgICByZXR1cm4gXCJjdXJyZW50ICN7cGVyaW9kfVwiXG4gICAgICBlbHNlIHJldHVybiBcImN1cnJlbnQgbW9udGhcIlxuXG5cbiMgVE9ETyBzZWxlY3RlZEVsZW1lbnQgYW5kIGNvbGxhcHNlZCBzaG91bGQgYmUgZmFjdG9yaXplZCBhcyBzZXR0aW5ncyBvciAnY29tbW9ucydcblxuICAgICRzY29wZS50b29nbGVTZWxlY3RlZEVsZW1lbnQgPSAoZWxlbWVudCkgLT5cbiAgICAgIGlmICRzY29wZS5pc1NlbGVjdGVkKGVsZW1lbnQpXG4gICAgICAgICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzID0gXy5yZWplY3QoJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMsIChzRWxlbSkgLT5cbiAgICAgICAgICBpZiBlbGVtZW50LmlkXG4gICAgICAgICAgICBzRWxlbS5pZCA9PSBlbGVtZW50LmlkXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc0VsZW0ubmFtZSA9PSBlbGVtZW50Lm5hbWVcbiAgICAgICAgKVxuICAgICAgICB3LmZvcm1hdCgpXG4gICAgICAgIGlmIHcuaXNFeHBhbmRlZCgpICYmICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA9PSAwXG4gICAgICAgICAgdy50b29nbGVFeHBhbmRlZCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB3LnVwZGF0ZVNldHRpbmdzKGZhbHNlKVxuICAgICAgZWxzZVxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cyB8fD0gW11cbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMucHVzaChlbGVtZW50KVxuICAgICAgICB3LmZvcm1hdCgpXG4gICAgICAgIGlmICF3LmlzRXhwYW5kZWQoKVxuICAgICAgICAgIHcudG9vZ2xlRXhwYW5kZWQoKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgdy51cGRhdGVTZXR0aW5ncyhmYWxzZSlcblxuICAgICRzY29wZS5pc1NlbGVjdGVkID0gKGVsZW1lbnQpIC0+XG4gICAgICBpZiBlbGVtZW50PyAmJiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cz9cbiAgICAgICAgaWYgXy5maW5kKCRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLCAoc0VsZW0pIC0+XG4gICAgICAgICAgaWYgZWxlbWVudC5pZFxuICAgICAgICAgICAgc0VsZW0uaWQgPT0gZWxlbWVudC5pZFxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNFbGVtLm5hbWUgPT0gZWxlbWVudC5uYW1lXG4gICAgICAgIClcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICBlbHNlIFxuICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICRzY29wZS50b29nbGVDb2xsYXBzZWQgPSAoZWxlbWVudCkgLT5cbiAgICAgIGlmIGVsZW1lbnQ/ICYmIGVsZW1lbnQubmFtZT8gIFxuICAgICAgICBpZiBfLmZpbmQoJHNjb3BlLnVuQ29sbGFwc2VkLCAoKG5hbWUpIC0+IGVsZW1lbnQubmFtZSA9PSBuYW1lKSlcbiAgICAgICAgICAkc2NvcGUudW5Db2xsYXBzZWQgPSBfLnJlamVjdCgkc2NvcGUudW5Db2xsYXBzZWQsIChuYW1lKSAtPlxuICAgICAgICAgICAgbmFtZSA9PSBlbGVtZW50Lm5hbWVcbiAgICAgICAgICApXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAkc2NvcGUudW5Db2xsYXBzZWQucHVzaChlbGVtZW50Lm5hbWUpXG4gICAgICAgIHcudXBkYXRlU2V0dGluZ3MoZmFsc2UpXG5cbiAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSAoZWxlbWVudCkgLT5cbiAgICAgIGlmIGVsZW1lbnQ/ICYmIGVsZW1lbnQubmFtZT8gIFxuICAgICAgICBpZiBfLmZpbmQoJHNjb3BlLnVuQ29sbGFwc2VkLCAoKG5hbWUpIC0+IGVsZW1lbnQubmFtZSA9PSBuYW1lKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldHVybiB0cnVlXG5cblxuICAgICMgIyMjIE1pbmktc2V0dGluZ3NcblxuICAgIHVuQ29sbGFwc2VkU2V0dGluZyA9IHt9XG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nLmluaXRpYWxpemVkID0gZmFsc2VcbiAgICBcbiAgICB1bkNvbGxhcHNlZFNldHRpbmcuaW5pdGlhbGl6ZSA9IC0+XG4gICAgICB1bkNvbGxhcHNlZFNldHRpbmcuaW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgICB1bkNvbGxhcHNlZFNldHRpbmcudG9NZXRhZGF0YSA9IC0+XG4gICAgICB7dW5Db2xsYXBzZWQ6ICRzY29wZS51bkNvbGxhcHNlZH1cblxuICAgIHcuc2V0dGluZ3MucHVzaCh1bkNvbGxhcHNlZFNldHRpbmcpXG5cbiAgICBzZWxlY3RlZEVsZW1lbnRzU2V0dGluZyA9IHt9XG4gICAgc2VsZWN0ZWRFbGVtZW50c1NldHRpbmcuaW5pdGlhbGl6ZWQgPSBmYWxzZVxuICAgIFxuICAgIHNlbGVjdGVkRWxlbWVudHNTZXR0aW5nLmluaXRpYWxpemUgPSAtPlxuICAgICAgc2VsZWN0ZWRFbGVtZW50c1NldHRpbmcuaW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgICBzZWxlY3RlZEVsZW1lbnRzU2V0dGluZy50b01ldGFkYXRhID0gLT5cbiAgICAgIHtzZWxlY3RlZEVsZW1lbnRzOiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50c31cblxuICAgIHcuc2V0dGluZ3MucHVzaChzZWxlY3RlZEVsZW1lbnRzU2V0dGluZylcblxuICAgICMgLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIHdpZHRoICsgdGltZSByYW5nZSArIG9yZ2FuaXphdGlvbl9pZHMgKyB1bkNvbGxhcHNlZCArIHNlbGVjdGVkRWxlbWVudFxuICAgICRzY29wZS4kd2F0Y2ggZ2V0U2V0dGluZ3NDb3VudCwgKHRvdGFsKSAtPlxuICAgICAgdy5sb2FkQ29udGVudCgpIGlmIHRvdGFsID49IDVcblxuICAgIHJldHVybiB3XG5dKVxuXG5tb2R1bGUuZGlyZWN0aXZlKCd3aWRnZXRJbnZvaWNlc0FnZWRQYXlhYmxlc1JlY2VpdmFibGVzJywgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCkgLT5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJpbnZvaWNlc1wiKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImFnZWQtcGF5YWJsZXMtcmVjZWl2YWJsZXNcIilcbiAgICAsY29udHJvbGxlcjogJ1dpZGdldEludm9pY2VzQWdlZFBheWFibGVzUmVjZWl2YWJsZXNDdHJsJ1xuICB9XG4pIl19