(function () {
var module;

module = angular.module('maestrano.analytics.widget-hr-payroll-summary', ['maestrano.assets']);

module.controller('WidgetHrPayrollSummaryCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
    var getSettingsCount, selectedElementsSetting, unCollapsedSetting, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.metadata.selectedElements) {
          $scope.selectedElements = [];
          angular.forEach(w.metadata.selectedElements, function(sElem) {
            var foundElem;
            foundElem = _.find(w.content.summary, function(statement) {
              return statement.name === sElem.name;
            });
            if (!foundElem) {
              angular.forEach(w.content.summary, function(statement) {
                if (statement.employees != null) {
                  return foundElem || (foundElem = _.find(statement.employees, function(employee) {
                    return sElem.id === employee.id;
                  }));
                }
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
      var all_values_are_positive, inputData, labels, options, pieData, pieOptions;
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
        w.hist_chart = ChartFormatterSvc.lineChart(inputData, options);
        pieData = _.map($scope.selectedElements, function(elem) {
          return {
            label: $filter('titleize')($scope.getName({
              name: elem.name
            })),
            value: $scope.getLastValue(elem)
          };
        });
        pieOptions = {
          showTooltips: true,
          percentageInnerCutout: 50,
          tooltipFontSize: 12
        };
        return w.cur_chart = ChartFormatterSvc.pieChart(pieData, pieOptions);
      }
    };
    $scope.getElementChartColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.getLastValue = function(element) {
      if (element.totals != null) {
        return element.totals[element.totals.length - 2];
      }
    };
    $scope.getTotalSum = function(element) {
      if (element.totals != null) {
        return _.reduce(element.totals, function(memo, num) {
          return memo + num;
        }, 0);
      }
    };
    $scope.getName = function(element) {
      if ((element != null) && (element.name != null)) {
        if (element.name === "total_leaves") {
          return "Total Leaves Accruals";
        }
        if (element.name === "total_super") {
          return "Total Superannuation Accruals";
        }
        if (element.name === "total_reimbursement") {
          return "Total Reimbursements";
        }
        if (element.name === "total_tax") {
          return "Total Taxes";
        }
        if (element.name === "total_timeoff") {
          return "Total Time Off";
        }
        return element.name.replace(/_/g, " ");
      }
    };
    $scope.getTrackedField = function() {
      var allFieldsEquals, field;
      if (($scope.selectedElements != null) && !_.isEmpty($scope.selectedElements) && ($scope.selectedElements[0].id != null)) {
        field = $scope.selectedElements[0].id.split('-')[0];
        allFieldsEquals = true;
        angular.forEach($scope.selectedElements, function(element) {
          return allFieldsEquals && (allFieldsEquals = element.id && field === element.id.split('-')[0]);
        });
        if (allFieldsEquals) {
          return $scope.getName({
            name: field
          });
        } else {
          return null;
        }
      }
    };
    $scope.formatDate = function(date) {
      if (w.content.hist_parameters != null) {
        switch (w.content.hist_parameters.period) {
          case 'DAILY':
            return $filter('date')(date, 'dd-MMM');
          case 'WEEKLY':
            return $filter('date')(date, 'dd-MMM');
          case 'MONTHLY':
            return $filter('date')(date, 'MMM');
          case 'QUARTERLY':
            return $filter('date')(date, 'MMM-yy');
          case 'YEARLY':
            return $filter('date')(date, 'yyyy');
          default:
            return $filter('date')(date, 'MMM');
        }
      } else {
        return $filter('date')(date, 'MMM');
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
    $scope.getPeriod = function() {
      var period, period_param;
      if ($scope.isDataFound && w.content.hist_parameters) {
        period_param = w.content.hist_parameters.period || "MONTHLY";
        period = "day";
        if (period_param !== "DAILY") {
          period = period_param.substr(0, period_param.length - 2).toLowerCase();
        }
        return "last " + period;
      } else {
        return "last MONTH";
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
      if (total >= 6) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetHrPayrollSummary', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("hr");
      return element.addClass("payroll-summary");
    },
    controller: 'WidgetHrPayrollSummaryCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWhyLXBheXJvbGwtc3VtbWFyeS5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSwrQ0FBZixFQUErRCxDQUFDLGtCQUFELENBQS9EOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLDRCQUFsQixFQUErQztFQUM3QyxRQUQ2QyxFQUNuQyxpQkFEbUMsRUFDaEIsbUJBRGdCLEVBQ0ssU0FETCxFQUU3QyxTQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGlCQUExQixFQUE2QyxPQUE3QztBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsU0FBQTtNQUNkLElBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsQ0FBQyxDQUFDLE9BQXBCLENBQUEsSUFBZ0MsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBcEIsQ0FBakMsSUFBaUUsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBcEIsQ0FBMUY7UUFFRSxNQUFNLENBQUMsV0FBUCxHQUFxQixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVgsSUFBMEI7UUFFL0MsSUFBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFkO1VBQ0UsTUFBTSxDQUFDLGdCQUFQLEdBQTBCO1VBQzFCLE9BQU8sQ0FBQyxPQUFSLENBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQTNCLEVBQTZDLFNBQUMsS0FBRDtBQUMzQyxnQkFBQTtZQUFBLFNBQUEsR0FBWSxDQUFDLENBQUMsSUFBRixDQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBakIsRUFBMEIsU0FBQyxTQUFEO3FCQUNwQyxTQUFTLENBQUMsSUFBVixLQUFrQixLQUFLLENBQUM7WUFEWSxDQUEx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QUEsRUFBWSw0QkFMUjs7QUFEa0MsQ0FBM0MiLCJmaWxlIjoid2lkZ2V0cy93aWRnZXQtaHItcGF5cm9sbC1zdW1tYXJ5LmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LWhyLXBheXJvbGwtc3VtbWFyeScsWydtYWVzdHJhbm8uYXNzZXRzJ10pXG5cbm1vZHVsZS5jb250cm9sbGVyKCdXaWRnZXRIclBheXJvbGxTdW1tYXJ5Q3RybCcsW1xuICAnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsICdDaGFydEZvcm1hdHRlclN2YycsICckZmlsdGVyJyxcbiAgKCRzY29wZSwgRGhiQW5hbHl0aWNzU3ZjLCBDaGFydEZvcm1hdHRlclN2YywgJGZpbHRlcikgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCA9IGFuZ3VsYXIuaXNEZWZpbmVkKHcuY29udGVudCkgJiYgIV8uaXNFbXB0eSh3LmNvbnRlbnQuc3VtbWFyeSkgJiYgIV8uaXNFbXB0eSh3LmNvbnRlbnQuZGF0ZXMpXG5cbiAgICAgICAgJHNjb3BlLnVuQ29sbGFwc2VkID0gdy5tZXRhZGF0YS51bkNvbGxhcHNlZCB8fCBbXVxuXG4gICAgICAgIGlmIHcubWV0YWRhdGEuc2VsZWN0ZWRFbGVtZW50c1xuICAgICAgICAgICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzID0gW11cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gody5tZXRhZGF0YS5zZWxlY3RlZEVsZW1lbnRzLCAoc0VsZW0pIC0+XG4gICAgICAgICAgICBmb3VuZEVsZW0gPSBfLmZpbmQody5jb250ZW50LnN1bW1hcnksIChzdGF0ZW1lbnQpLT5cbiAgICAgICAgICAgICAgc3RhdGVtZW50Lm5hbWUgPT0gc0VsZW0ubmFtZVxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICBpZiAhZm91bmRFbGVtXG4gICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3LmNvbnRlbnQuc3VtbWFyeSwgKHN0YXRlbWVudCkgLT5cbiAgICAgICAgICAgICAgICBmb3VuZEVsZW0gfHw9IF8uZmluZChzdGF0ZW1lbnQuZW1wbG95ZWVzLCAoZW1wbG95ZWUpLT5cbiAgICAgICAgICAgICAgICAgIHNFbGVtLmlkID09IGVtcGxveWVlLmlkXG4gICAgICAgICAgICAgICAgKSBpZiBzdGF0ZW1lbnQuZW1wbG95ZWVzP1xuICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLnB1c2goZm91bmRFbGVtKSBpZiBmb3VuZEVsZW1cbiAgICAgICAgICApXG5cbiAgICAgICAgdy53aWR0aCA9IDYgdW5sZXNzICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzPyAmJiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cy5sZW5ndGggPiAwXG5cbiAgICB3LmZvcm1hdCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgJiYgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHM/ICYmICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA+IDBcbiAgICAgICAgXG4gICAgICAgICMgSGlzdCBjaGFydFxuICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSA9IHRydWVcbiAgICAgICAgaW5wdXREYXRhID0gW11cbiAgICAgICAgbGFiZWxzID0gXy5tYXAgdy5jb250ZW50LmRhdGVzLCAoZGF0ZSkgLT5cbiAgICAgICAgICBpZiB3Lm1ldGFkYXRhLmhpc3RfcGFyYW1ldGVycyAmJiB3Lm1ldGFkYXRhLmhpc3RfcGFyYW1ldGVycy5wZXJpb2QgPT0gXCJZRUFSTFlcIlxuICAgICAgICAgICAgJGZpbHRlcignZGF0ZScpKGRhdGUsICd5eXl5JylcbiAgICAgICAgICBlbHNlIGlmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzICYmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZCA9PSBcIlFVQVJURVJMWVwiXG4gICAgICAgICAgICAkZmlsdGVyKCdkYXRlJykoZGF0ZSwgJ01NTS15eScpXG4gICAgICAgICAgZWxzZSBpZiB3Lm1ldGFkYXRhLmhpc3RfcGFyYW1ldGVycyAmJiAody5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMucGVyaW9kID09IFwiV0VFS0xZXCIgfHwgdy5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMucGVyaW9kID09IFwiREFJTFlcIilcbiAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnZGQtTU1NJylcbiAgICAgICAgICBlbHNlICBcbiAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnTU1NJylcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLCAoc0VsZW0pIC0+XG4gICAgICAgICAgZGF0YSA9IGFuZ3VsYXIuY29weShzRWxlbSlcbiAgICAgICAgICBpbnB1dERhdGEucHVzaCh7dGl0bGU6IGRhdGEubmFtZSwgbGFiZWxzOiBsYWJlbHMsIHZhbHVlczogZGF0YS50b3RhbHN9KVxuICAgICAgICAgIFxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChkYXRhLnRvdGFscywgKHZhbHVlKSAtPlxuICAgICAgICAgICAgYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUgJiY9IHZhbHVlID49IDBcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzY2FsZUJlZ2luQXRaZXJvOiBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSxcbiAgICAgICAgICBzaG93WExhYmVsczogdHJ1ZSxcbiAgICAgICAgICBkYXRhc2V0RmlsbDogJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMubGVuZ3RoID09IDEsXG4gICAgICAgICAgcG9pbnREb3Q6ICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLmxlbmd0aCA9PSAxLFxuICAgICAgICB9XG4gICAgICAgIHcuaGlzdF9jaGFydCA9IENoYXJ0Rm9ybWF0dGVyU3ZjLmxpbmVDaGFydChpbnB1dERhdGEsb3B0aW9ucylcblxuICAgICAgICAjIEN1cnJlbnQgY2hhcnRcbiAgICAgICAgcGllRGF0YSA9IF8ubWFwICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLCAoZWxlbSkgLT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJGZpbHRlcigndGl0bGVpemUnKSgkc2NvcGUuZ2V0TmFtZSh7bmFtZTogZWxlbS5uYW1lfSkpLFxuICAgICAgICAgICAgdmFsdWU6ICRzY29wZS5nZXRMYXN0VmFsdWUoZWxlbSksXG4gICAgICAgICAgfVxuICAgICAgICBwaWVPcHRpb25zID0ge1xuICAgICAgICAgIHNob3dUb29sdGlwczogdHJ1ZSxcbiAgICAgICAgICBwZXJjZW50YWdlSW5uZXJDdXRvdXQ6IDUwLFxuICAgICAgICAgIHRvb2x0aXBGb250U2l6ZTogMTIsXG4gICAgICAgIH1cbiAgICAgICAgdy5jdXJfY2hhcnQgPSBDaGFydEZvcm1hdHRlclN2Yy5waWVDaGFydChwaWVEYXRhLCBwaWVPcHRpb25zKVxuXG4gICAgJHNjb3BlLmdldEVsZW1lbnRDaGFydENvbG9yID0gKGluZGV4KSAtPlxuICAgICAgQ2hhcnRGb3JtYXR0ZXJTdmMuZ2V0Q29sb3IoaW5kZXgpXG5cbiAgICAkc2NvcGUuZ2V0TGFzdFZhbHVlID0gKGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LnRvdGFsc1tlbGVtZW50LnRvdGFscy5sZW5ndGggLSAyXSBpZiBlbGVtZW50LnRvdGFscz9cblxuICAgICRzY29wZS5nZXRUb3RhbFN1bSA9IChlbGVtZW50KSAtPlxuICAgICAgXy5yZWR1Y2UoZWxlbWVudC50b3RhbHMsIChtZW1vLCBudW0pIC0+XG4gICAgICAgIG1lbW8gKyBudW1cbiAgICAgICwgMCkgaWYgZWxlbWVudC50b3RhbHM/XG5cbiAgICAkc2NvcGUuZ2V0TmFtZSA9IChlbGVtZW50KSAtPlxuICAgICAgaWYgZWxlbWVudD8gJiYgZWxlbWVudC5uYW1lP1xuICAgICAgICByZXR1cm4gXCJUb3RhbCBMZWF2ZXMgQWNjcnVhbHNcIiBpZiBlbGVtZW50Lm5hbWUgPT0gXCJ0b3RhbF9sZWF2ZXNcIlxuICAgICAgICByZXR1cm4gXCJUb3RhbCBTdXBlcmFubnVhdGlvbiBBY2NydWFsc1wiIGlmIGVsZW1lbnQubmFtZSA9PSBcInRvdGFsX3N1cGVyXCJcbiAgICAgICAgcmV0dXJuIFwiVG90YWwgUmVpbWJ1cnNlbWVudHNcIiBpZiBlbGVtZW50Lm5hbWUgPT0gXCJ0b3RhbF9yZWltYnVyc2VtZW50XCJcbiAgICAgICAgcmV0dXJuIFwiVG90YWwgVGF4ZXNcIiBpZiBlbGVtZW50Lm5hbWUgPT0gXCJ0b3RhbF90YXhcIlxuICAgICAgICByZXR1cm4gXCJUb3RhbCBUaW1lIE9mZlwiIGlmIGVsZW1lbnQubmFtZSA9PSBcInRvdGFsX3RpbWVvZmZcIlxuICAgICAgICByZXR1cm4gZWxlbWVudC5uYW1lLnJlcGxhY2UoL18vZywgXCIgXCIpXG5cbiAgICAkc2NvcGUuZ2V0VHJhY2tlZEZpZWxkID0gLT5cbiAgICAgIGlmICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzPyAmJiAhXy5pc0VtcHR5KCRzY29wZS5zZWxlY3RlZEVsZW1lbnRzKSAmJiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50c1swXS5pZD9cbiAgICAgICAgZmllbGQgPSAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50c1swXS5pZC5zcGxpdCgnLScpWzBdXG4gICAgICAgIGFsbEZpZWxkc0VxdWFscyA9IHRydWVcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5zZWxlY3RlZEVsZW1lbnRzLCAoZWxlbWVudCktPlxuICAgICAgICAgIGFsbEZpZWxkc0VxdWFscyAmJj0gKGVsZW1lbnQuaWQgJiYgZmllbGQgPT0gZWxlbWVudC5pZC5zcGxpdCgnLScpWzBdKVxuICAgICAgICApXG5cbiAgICAgICAgaWYgYWxsRmllbGRzRXF1YWxzXG4gICAgICAgICAgcmV0dXJuICRzY29wZS5nZXROYW1lKHtuYW1lOiBmaWVsZH0pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgJHNjb3BlLmZvcm1hdERhdGUgPSAoZGF0ZSkgLT5cbiAgICAgIGlmIHcuY29udGVudC5oaXN0X3BhcmFtZXRlcnM/XG4gICAgICAgIHN3aXRjaCB3LmNvbnRlbnQuaGlzdF9wYXJhbWV0ZXJzLnBlcmlvZFxuICAgICAgICAgIHdoZW4gJ0RBSUxZJ1xuICAgICAgICAgICAgcmV0dXJuICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnZGQtTU1NJylcbiAgICAgICAgICB3aGVuICdXRUVLTFknXG4gICAgICAgICAgICByZXR1cm4gJGZpbHRlcignZGF0ZScpKGRhdGUsICdkZC1NTU0nKVxuICAgICAgICAgIHdoZW4gJ01PTlRITFknXG4gICAgICAgICAgICByZXR1cm4gJGZpbHRlcignZGF0ZScpKGRhdGUsICdNTU0nKVxuICAgICAgICAgIHdoZW4gJ1FVQVJURVJMWSdcbiAgICAgICAgICAgIHJldHVybiAkZmlsdGVyKCdkYXRlJykoZGF0ZSwgJ01NTS15eScpXG4gICAgICAgICAgd2hlbiAnWUVBUkxZJ1xuICAgICAgICAgICAgcmV0dXJuICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAneXl5eScpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnTU1NJylcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnTU1NJylcblxuIyBUT0RPIHNlbGVjdGVkRWxlbWVudCBhbmQgY29sbGFwc2VkIHNob3VsZCBiZSBmYWN0b3JpemVkIGFzIHNldHRpbmdzIG9yICdjb21tb25zJ1xuXG4gICAgJHNjb3BlLnRvb2dsZVNlbGVjdGVkRWxlbWVudCA9IChlbGVtZW50KSAtPlxuICAgICAgaWYgJHNjb3BlLmlzU2VsZWN0ZWQoZWxlbWVudClcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMgPSBfLnJlamVjdCgkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cywgKHNFbGVtKSAtPlxuICAgICAgICAgIGlmIGVsZW1lbnQuaWRcbiAgICAgICAgICAgIHNFbGVtLmlkID09IGVsZW1lbnQuaWRcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBzRWxlbS5uYW1lID09IGVsZW1lbnQubmFtZVxuICAgICAgICApXG4gICAgICAgIHcuZm9ybWF0KClcbiAgICAgICAgaWYgdy5pc0V4cGFuZGVkKCkgJiYgJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMubGVuZ3RoID09IDBcbiAgICAgICAgICB3LnRvb2dsZUV4cGFuZGVkKClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHcudXBkYXRlU2V0dGluZ3MoZmFsc2UpXG4gICAgICBlbHNlXG4gICAgICAgICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzIHx8PSBbXVxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50cy5wdXNoKGVsZW1lbnQpXG4gICAgICAgIHcuZm9ybWF0KClcbiAgICAgICAgaWYgIXcuaXNFeHBhbmRlZCgpXG4gICAgICAgICAgdy50b29nbGVFeHBhbmRlZCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB3LnVwZGF0ZVNldHRpbmdzKGZhbHNlKVxuXG4gICAgJHNjb3BlLmlzU2VsZWN0ZWQgPSAoZWxlbWVudCkgLT5cbiAgICAgIGlmIGVsZW1lbnQ/ICYmICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzP1xuICAgICAgICBpZiBfLmZpbmQoJHNjb3BlLnNlbGVjdGVkRWxlbWVudHMsIChzRWxlbSkgLT5cbiAgICAgICAgICBpZiBlbGVtZW50LmlkXG4gICAgICAgICAgICBzRWxlbS5pZCA9PSBlbGVtZW50LmlkXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc0VsZW0ubmFtZSA9PSBlbGVtZW50Lm5hbWVcbiAgICAgICAgKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIGVsc2UgXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgJHNjb3BlLnRvb2dsZUNvbGxhcHNlZCA9IChlbGVtZW50KSAtPlxuICAgICAgaWYgZWxlbWVudD8gJiYgZWxlbWVudC5uYW1lPyAgXG4gICAgICAgIGlmIF8uZmluZCgkc2NvcGUudW5Db2xsYXBzZWQsICgobmFtZSkgLT4gZWxlbWVudC5uYW1lID09IG5hbWUpKVxuICAgICAgICAgICRzY29wZS51bkNvbGxhcHNlZCA9IF8ucmVqZWN0KCRzY29wZS51bkNvbGxhcHNlZCwgKG5hbWUpIC0+XG4gICAgICAgICAgICBuYW1lID09IGVsZW1lbnQubmFtZVxuICAgICAgICAgIClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICRzY29wZS51bkNvbGxhcHNlZC5wdXNoKGVsZW1lbnQubmFtZSlcbiAgICAgICAgdy51cGRhdGVTZXR0aW5ncyhmYWxzZSlcblxuICAgICRzY29wZS5nZXRQZXJpb2QgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kICYmIHcuY29udGVudC5oaXN0X3BhcmFtZXRlcnNcbiAgICAgICAgcGVyaW9kX3BhcmFtID0gdy5jb250ZW50Lmhpc3RfcGFyYW1ldGVycy5wZXJpb2QgfHwgXCJNT05USExZXCJcbiAgICAgICAgcGVyaW9kID0gXCJkYXlcIlxuICAgICAgICBwZXJpb2QgPSBwZXJpb2RfcGFyYW0uc3Vic3RyKDAscGVyaW9kX3BhcmFtLmxlbmd0aC0yKS50b0xvd2VyQ2FzZSgpIGlmIHBlcmlvZF9wYXJhbSAhPSBcIkRBSUxZXCJcbiAgICAgICAgcmV0dXJuIFwibGFzdCAje3BlcmlvZH1cIlxuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gXCJsYXN0IE1PTlRIXCJcblxuICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IChlbGVtZW50KSAtPlxuICAgICAgaWYgZWxlbWVudD8gJiYgZWxlbWVudC5uYW1lPyAgXG4gICAgICAgIGlmIF8uZmluZCgkc2NvcGUudW5Db2xsYXBzZWQsICgobmFtZSkgLT4gZWxlbWVudC5uYW1lID09IG5hbWUpKVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0dXJuIHRydWVcblxuXG4gICAgIyAjIyMgTWluaS1zZXR0aW5nc1xuXG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nID0ge31cbiAgICB1bkNvbGxhcHNlZFNldHRpbmcuaW5pdGlhbGl6ZWQgPSBmYWxzZVxuICAgIFxuICAgIHVuQ29sbGFwc2VkU2V0dGluZy5pbml0aWFsaXplID0gLT5cbiAgICAgIHVuQ29sbGFwc2VkU2V0dGluZy5pbml0aWFsaXplZCA9IHRydWVcblxuICAgIHVuQ29sbGFwc2VkU2V0dGluZy50b01ldGFkYXRhID0gLT5cbiAgICAgIHt1bkNvbGxhcHNlZDogJHNjb3BlLnVuQ29sbGFwc2VkfVxuXG4gICAgdy5zZXR0aW5ncy5wdXNoKHVuQ29sbGFwc2VkU2V0dGluZylcblxuICAgIHNlbGVjdGVkRWxlbWVudHNTZXR0aW5nID0ge31cbiAgICBzZWxlY3RlZEVsZW1lbnRzU2V0dGluZy5pbml0aWFsaXplZCA9IGZhbHNlXG4gICAgXG4gICAgc2VsZWN0ZWRFbGVtZW50c1NldHRpbmcuaW5pdGlhbGl6ZSA9IC0+XG4gICAgICBzZWxlY3RlZEVsZW1lbnRzU2V0dGluZy5pbml0aWFsaXplZCA9IHRydWVcblxuICAgIHNlbGVjdGVkRWxlbWVudHNTZXR0aW5nLnRvTWV0YWRhdGEgPSAtPlxuICAgICAge3NlbGVjdGVkRWxlbWVudHM6ICRzY29wZS5zZWxlY3RlZEVsZW1lbnRzfVxuXG4gICAgdy5zZXR0aW5ncy5wdXNoKHNlbGVjdGVkRWxlbWVudHNTZXR0aW5nKVxuXG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgIyBUT0RPOiBSZWZhY3RvciBvbmNlIHdlIGhhdmUgdW5kZXJzdG9vZCBleGFjdGx5IGhvdyB0aGUgYW5ndWxhcmpzIGNvbXBpbGF0aW9uIHByb2Nlc3Mgd29ya3M6XG4gICAgIyBpbiB0aGlzIG9yZGVyLCB3ZSBzaG91bGQ6XG4gICAgIyAxLSBjb21waWxlIGltcGFjLXdpZGdldCBjb250cm9sbGVyXG4gICAgIyAyLSBjb21waWxlIHRoZSBzcGVjaWZpYyB3aWRnZXQgdGVtcGxhdGUvY29udHJvbGxlclxuICAgICMgMy0gY29tcGlsZSB0aGUgc2V0dGluZ3MgdGVtcGxhdGVzL2NvbnRyb2xsZXJzXG4gICAgIyA0LSBjYWxsIHdpZGdldC5sb2FkQ29udGVudCgpIChpZGVhbGx5LCBmcm9tIGltcGFjLXdpZGdldCwgb25jZSBhIGNhbGxiYWNrIFxuICAgICMgICAgIGFzc2Vzc2luZyB0aGF0IGV2ZXJ5dGhpbmcgaXMgY29tcGlsZWQgYW4gcmVhZHkgaXMgcmVjZWl2ZWQpXG4gICAgZ2V0U2V0dGluZ3NDb3VudCA9IC0+XG4gICAgICBpZiB3LnNldHRpbmdzP1xuICAgICAgICByZXR1cm4gdy5zZXR0aW5ncy5sZW5ndGhcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIDBcblxuICAgICMgd2lkdGggKyB0aW1lIHJhbmdlICsgb3JnYW5pemF0aW9uX2lkcyArIHVuQ29sbGFwc2VkICsgc2VsZWN0ZWRFbGVtZW50ICsgaGlzdCBtb2RlIGNob3NlclxuICAgICRzY29wZS4kd2F0Y2ggZ2V0U2V0dGluZ3NDb3VudCwgKHRvdGFsKSAtPlxuICAgICAgdy5sb2FkQ29udGVudCgpIGlmIHRvdGFsID49IDZcblxuICAgIHJldHVybiB3XG5dKVxuXG5tb2R1bGUuZGlyZWN0aXZlKCd3aWRnZXRIclBheXJvbGxTdW1tYXJ5JywgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCkgLT5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJoclwiKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInBheXJvbGwtc3VtbWFyeVwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0SHJQYXlyb2xsU3VtbWFyeUN0cmwnXG4gIH1cbikiXX0=