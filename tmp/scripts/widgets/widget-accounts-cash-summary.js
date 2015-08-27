(function () {
var module;

module = angular.module('maestrano.analytics.widget-accounts-cash-summary', ['maestrano.assets']);

module.controller('WidgetAccountsCashSummaryCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) {
    var getSettingsCount, selectedElementSetting, unCollapsedSetting, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.dates = w.content.dates;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        if (w.metadata.selectedElement) {
          $scope.selectedElement = _.find(w.content.summary, function(statement) {
            return statement.name === w.metadata.selectedElement.name;
          });
          if (!$scope.selectedElement) {
            angular.forEach(w.content.summary, function(statement) {
              if (statement.accounts != null) {
                return $scope.selectedElement || ($scope.selectedElement = _.find(statement.accounts, function(account) {
                  return account.id === w.metadata.selectedElement.id;
                }));
              }
            });
          }
        }
        if ($scope.selectedElement == null) {
          return w.width = 6;
        }
      }
    };
    w.format = function() {
      var all_values_are_positive, data, inputData, labels, options;
      if ($scope.isDataFound && ($scope.selectedElement != null)) {
        data = angular.copy($scope.selectedElement);
        labels = _.map(w.content.dates, function(date) {
          if ((w.metadata.hist_parameters != null) && w.metadata.hist_parameters.period === "YEARLY") {
            return $filter('date')(date, 'yyyy');
          } else if ((w.metadata.hist_parameters != null) && w.metadata.hist_parameters.period === "QUARTERLY") {
            return $filter('date')(date, 'MMM-yy');
          } else if ((w.metadata.hist_parameters != null) && (w.metadata.hist_parameters.period === "WEEKLY" || w.metadata.hist_parameters.period === "DAILY")) {
            return $filter('date')(date, 'dd-MMM');
          } else {
            return $filter('date')(date, 'MMM');
          }
        });
        inputData = {
          title: data.name,
          labels: labels,
          values: data.cash_flows
        };
        all_values_are_positive = true;
        angular.forEach(data.cash_flows, function(value) {
          return all_values_are_positive && (all_values_are_positive = value >= 0);
        });
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true
        };
        return w.chart = ChartFormatterSvc.lineChart([inputData], options);
      }
    };
    $scope.getLastDate = function() {
      if ($scope.dates != null) {
        return _.last($scope.dates);
      }
    };
    $scope.getLastValue = function(element) {
      if (element.cash_flows != null) {
        return _.last(element.cash_flows);
      }
    };
    $scope.formatVariance = function(aVariance) {
      if (aVariance != null) {
        if (aVariance > 0) {
          return "+" + aVariance + " %";
        } else {
          return aVariance + " %";
        }
      } else {
        return "n/a";
      }
    };
    $scope.getLastVariance = function(element) {
      if ((element.variances != null) && (_.last(element.variances) != null)) {
        return $scope.formatVariance(_.last(element.variances));
      } else {
        return "n/a";
      }
    };
    $scope.getVarianceClassColor = function(aVariance) {
      if (parseInt(aVariance) > 0) {
        return 'positive';
      } else if (parseInt(aVariance) < 0) {
        return 'negative';
      } else {
        return null;
      }
    };
    $scope.getName = function(element) {
      if ((element != null) && (element.name != null)) {
        return element.name.replace("_", " ");
      }
    };
    $scope.toogleSelectedElement = function(element) {
      if ($scope.isSelected(element)) {
        $scope.selectedElement = null;
        if (w.isExpanded()) {
          return w.toogleExpanded();
        } else {
          return w.updateSettings(false);
        }
      } else {
        $scope.selectedElement = angular.copy(element);
        w.format();
        if (!w.isExpanded()) {
          return w.toogleExpanded();
        } else {
          return w.updateSettings(false);
        }
      }
    };
    $scope.isSelected = function(element) {
      if ((element != null) && ($scope.selectedElement != null)) {
        if (((element.id != null) && $scope.selectedElement.id && element.id === $scope.selectedElement.id) || (element.name === $scope.selectedElement.name)) {
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
    selectedElementSetting = {};
    selectedElementSetting.initialized = false;
    selectedElementSetting.initialize = function() {
      return selectedElementSetting.initialized = true;
    };
    selectedElementSetting.toMetadata = function() {
      return {
        selectedElement: $scope.selectedElement
      };
    };
    w.settings.push(selectedElementSetting);
    getSettingsCount = function() {
      if (w.settings != null) {
        return w.settings.length;
      } else {
        return 0;
      }
    };
    $scope.$watch(getSettingsCount, function(total) {
      if (total === 5) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetAccountsCashSummary', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("cash-summary");
    },
    controller: 'WidgetAccountsCashSummaryCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWFjY291bnRzLWNhc2gtc3VtbWFyeS5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxrREFBZixFQUFrRSxDQUFDLGtCQUFELENBQWxFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLCtCQUFsQixFQUFrRDtFQUNoRCxRQURnRCxFQUN0QyxpQkFEc0MsRUFDbkIsbUJBRG1CLEVBQ0UsU0FERixFQUVoRCxTQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGlCQUExQixFQUE2QyxPQUE3QztBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsU0FBQTtNQUNkLElBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsQ0FBQyxDQUFDLE9BQXBCLENBQUEsSUFBZ0MsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBcEIsQ0FBakMsSUFBaUUsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBcEIsQ0FBMUY7UUFFRSxNQUFNLENBQUMsS0FBUCxHQUFlLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDekIsTUFBTSxDQUFDLFdBQVAsR0FBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFYLElBQTBCO1FBRS9DLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFkO1VBQ0UsTUFBTSxDQUFDLGVBQVAsR0FBeUIsQ0FBQyxDQUFDLElBQUYsQ0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQWpCLEVBQTBCLFNBQUMsU0FBRDttQkFDakQsU0FBUyxDQUFDLElBQVYsS0FBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7VUFESSxDQUExQjtVQUd6QixJQUFHLENBQUMsTUFBTSxDQUFDLGVB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QyxTQUFBO0FBQzVDLFNBQU87SUFDTCxRQUFBLEVBQVUsR0FETDtJQUVMLElBQUEsRUFBTSxTQUFDLEtBQUQsRUFBUSxPQUFSO01BQ0osT0FBTyxDQUFDLFFBQVIsQ0FBaUIsVUFBakI7YUFDQSxPQUFPLENBQUMsUUFBUixDQUFpQixjQUFqQjtJQUZJLENBRkQ7SUFLSixVQUFBLEVBQVksK0JBTFI7O0FBRHFDLENBQTlDIiwiZmlsZSI6IndpZGdldHMvd2lkZ2V0LWFjY291bnRzLWNhc2gtc3VtbWFyeS5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1hY2NvdW50cy1jYXNoLXN1bW1hcnknLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0QWNjb3VudHNDYXNoU3VtbWFyeUN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLCAnJGZpbHRlcicsXG4gICgkc2NvcGUsIERoYkFuYWx5dGljc1N2YywgQ2hhcnRGb3JtYXR0ZXJTdmMsICRmaWx0ZXIpIC0+XG5cbiAgICB3ID0gJHNjb3BlLndpZGdldFxuXG4gICAgdy5pbml0Q29udGV4dCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgPSBhbmd1bGFyLmlzRGVmaW5lZCh3LmNvbnRlbnQpICYmICFfLmlzRW1wdHkody5jb250ZW50LnN1bW1hcnkpICYmICFfLmlzRW1wdHkody5jb250ZW50LmRhdGVzKVxuXG4gICAgICAgICRzY29wZS5kYXRlcyA9IHcuY29udGVudC5kYXRlc1xuICAgICAgICAkc2NvcGUudW5Db2xsYXBzZWQgPSB3Lm1ldGFkYXRhLnVuQ29sbGFwc2VkIHx8IFtdXG5cbiAgICAgICAgaWYgdy5tZXRhZGF0YS5zZWxlY3RlZEVsZW1lbnRcbiAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50ID0gXy5maW5kKHcuY29udGVudC5zdW1tYXJ5LCAoc3RhdGVtZW50KS0+XG4gICAgICAgICAgICBzdGF0ZW1lbnQubmFtZSA9PSB3Lm1ldGFkYXRhLnNlbGVjdGVkRWxlbWVudC5uYW1lXG4gICAgICAgICAgKVxuICAgICAgICAgIGlmICEkc2NvcGUuc2VsZWN0ZWRFbGVtZW50IFxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHcuY29udGVudC5zdW1tYXJ5LCAoc3RhdGVtZW50KSAtPlxuICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50IHx8PSBfLmZpbmQoc3RhdGVtZW50LmFjY291bnRzLCAoYWNjb3VudCktPlxuICAgICAgICAgICAgICAgIGFjY291bnQuaWQgPT0gdy5tZXRhZGF0YS5zZWxlY3RlZEVsZW1lbnQuaWRcbiAgICAgICAgICAgICAgKSBpZiBzdGF0ZW1lbnQuYWNjb3VudHM/XG5cbiAgICAgICAgICApXG4gICAgICAgIHcud2lkdGggPSA2IHVubGVzcyAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50P1xuXG4gICAgdy5mb3JtYXQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kICYmICRzY29wZS5zZWxlY3RlZEVsZW1lbnQ/XG4gICAgICAgIGRhdGEgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLnNlbGVjdGVkRWxlbWVudClcbiAgICAgICAgbGFiZWxzID0gXy5tYXAgdy5jb250ZW50LmRhdGVzLCAoZGF0ZSkgLT5cbiAgICAgICAgICBpZiB3Lm1ldGFkYXRhLmhpc3RfcGFyYW1ldGVycz8gJiYgdy5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMucGVyaW9kID09IFwiWUVBUkxZXCJcbiAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAneXl5eScpXG4gICAgICAgICAgZWxzZSBpZiB3Lm1ldGFkYXRhLmhpc3RfcGFyYW1ldGVycz8gJiYgdy5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMucGVyaW9kID09IFwiUVVBUlRFUkxZXCJcbiAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnTU1NLXl5JylcbiAgICAgICAgICBlbHNlIGlmIHcubWV0YWRhdGEuaGlzdF9wYXJhbWV0ZXJzPyAmJiAody5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMucGVyaW9kID09IFwiV0VFS0xZXCIgfHwgdy5tZXRhZGF0YS5oaXN0X3BhcmFtZXRlcnMucGVyaW9kID09IFwiREFJTFlcIilcbiAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnZGQtTU1NJylcbiAgICAgICAgICBlbHNlICBcbiAgICAgICAgICAgICRmaWx0ZXIoJ2RhdGUnKShkYXRlLCAnTU1NJylcbiAgICAgICAgaW5wdXREYXRhID0ge3RpdGxlOiBkYXRhLm5hbWUsIGxhYmVsczogbGFiZWxzLCB2YWx1ZXM6IGRhdGEuY2FzaF9mbG93c31cbiAgICAgICAgYWxsX3ZhbHVlc19hcmVfcG9zaXRpdmUgPSB0cnVlXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChkYXRhLmNhc2hfZmxvd3MsICh2YWx1ZSkgLT5cbiAgICAgICAgICBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSAmJj0gdmFsdWUgPj0gMFxuICAgICAgICApXG5cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzY2FsZUJlZ2luQXRaZXJvOiBhbGxfdmFsdWVzX2FyZV9wb3NpdGl2ZSxcbiAgICAgICAgICBzaG93WExhYmVsczogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgICB3LmNoYXJ0ID0gQ2hhcnRGb3JtYXR0ZXJTdmMubGluZUNoYXJ0KFtpbnB1dERhdGFdLG9wdGlvbnMpXG5cbiAgICAkc2NvcGUuZ2V0TGFzdERhdGUgPSAtPlxuICAgICAgXy5sYXN0KCRzY29wZS5kYXRlcykgaWYgJHNjb3BlLmRhdGVzP1xuXG4gICAgJHNjb3BlLmdldExhc3RWYWx1ZSA9IChlbGVtZW50KSAtPlxuICAgICAgXy5sYXN0KGVsZW1lbnQuY2FzaF9mbG93cykgaWYgZWxlbWVudC5jYXNoX2Zsb3dzP1xuXG4gICAgJHNjb3BlLmZvcm1hdFZhcmlhbmNlID0gKGFWYXJpYW5jZSkgLT5cbiAgICAgIGlmIGFWYXJpYW5jZT9cbiAgICAgICAgaWYgYVZhcmlhbmNlID4gMFxuICAgICAgICAgIFwiKyN7YVZhcmlhbmNlfSAlXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIFwiI3thVmFyaWFuY2V9ICVcIlxuICAgICAgZWxzZVxuICAgICAgICBcIm4vYVwiXG5cbiAgICAkc2NvcGUuZ2V0TGFzdFZhcmlhbmNlID0gKGVsZW1lbnQpIC0+XG4gICAgICBpZiBlbGVtZW50LnZhcmlhbmNlcz8gJiYgXy5sYXN0KGVsZW1lbnQudmFyaWFuY2VzKT9cbiAgICAgICAgJHNjb3BlLmZvcm1hdFZhcmlhbmNlKF8ubGFzdChlbGVtZW50LnZhcmlhbmNlcykpXG4gICAgICBlbHNlXG4gICAgICAgIFwibi9hXCJcblxuICAgICRzY29wZS5nZXRWYXJpYW5jZUNsYXNzQ29sb3IgPSAoYVZhcmlhbmNlKSAtPlxuICAgICAgaWYgcGFyc2VJbnQoYVZhcmlhbmNlKSA+IDBcbiAgICAgICAgcmV0dXJuICdwb3NpdGl2ZSdcbiAgICAgIGVsc2UgaWYgcGFyc2VJbnQoYVZhcmlhbmNlKSA8IDBcbiAgICAgICAgcmV0dXJuICduZWdhdGl2ZSdcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICRzY29wZS5nZXROYW1lID0gKGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50Lm5hbWUucmVwbGFjZShcIl9cIiwgXCIgXCIpIGlmIGVsZW1lbnQ/ICYmIGVsZW1lbnQubmFtZT9cblxuICAgICRzY29wZS50b29nbGVTZWxlY3RlZEVsZW1lbnQgPSAoZWxlbWVudCkgLT5cbiAgICAgIGlmICRzY29wZS5pc1NlbGVjdGVkKGVsZW1lbnQpXG4gICAgICAgICRzY29wZS5zZWxlY3RlZEVsZW1lbnQgPSBudWxsXG4gICAgICAgIGlmIHcuaXNFeHBhbmRlZCgpXG4gICAgICAgICAgdy50b29nbGVFeHBhbmRlZCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB3LnVwZGF0ZVNldHRpbmdzKGZhbHNlKVxuICAgICAgZWxzZVxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50ID0gYW5ndWxhci5jb3B5KGVsZW1lbnQpXG4gICAgICAgIHcuZm9ybWF0KClcbiAgICAgICAgaWYgIXcuaXNFeHBhbmRlZCgpXG4gICAgICAgICAgdy50b29nbGVFeHBhbmRlZCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICB3LnVwZGF0ZVNldHRpbmdzKGZhbHNlKVxuXG4gICAgJHNjb3BlLmlzU2VsZWN0ZWQgPSAoZWxlbWVudCkgLT5cbiAgICAgIGlmIGVsZW1lbnQ/ICYmICRzY29wZS5zZWxlY3RlZEVsZW1lbnQ/XG4gICAgICAgIGlmIChlbGVtZW50LmlkPyAmJiAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50LmlkICYmIGVsZW1lbnQuaWQgPT0gJHNjb3BlLnNlbGVjdGVkRWxlbWVudC5pZCkgfHwgKGVsZW1lbnQubmFtZSA9PSAkc2NvcGUuc2VsZWN0ZWRFbGVtZW50Lm5hbWUpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgZWxzZSBcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAkc2NvcGUudG9vZ2xlQ29sbGFwc2VkID0gKGVsZW1lbnQpIC0+XG4gICAgICBpZiBlbGVtZW50PyAmJiBlbGVtZW50Lm5hbWU/ICBcbiAgICAgICAgaWYgXy5maW5kKCRzY29wZS51bkNvbGxhcHNlZCwgKChuYW1lKSAtPiBlbGVtZW50Lm5hbWUgPT0gbmFtZSkpXG4gICAgICAgICAgJHNjb3BlLnVuQ29sbGFwc2VkID0gXy5yZWplY3QoJHNjb3BlLnVuQ29sbGFwc2VkLCAobmFtZSkgLT5cbiAgICAgICAgICAgIG5hbWUgPT0gZWxlbWVudC5uYW1lXG4gICAgICAgICAgKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgJHNjb3BlLnVuQ29sbGFwc2VkLnB1c2goZWxlbWVudC5uYW1lKVxuICAgICAgICB3LnVwZGF0ZVNldHRpbmdzKGZhbHNlKVxuXG4gICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gKGVsZW1lbnQpIC0+XG4gICAgICBpZiBlbGVtZW50PyAmJiBlbGVtZW50Lm5hbWU/ICBcbiAgICAgICAgaWYgXy5maW5kKCRzY29wZS51bkNvbGxhcHNlZCwgKChuYW1lKSAtPiBlbGVtZW50Lm5hbWUgPT0gbmFtZSkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICAjICMjIyBNaW5pLXNldHRpbmdzXG5cbiAgICB1bkNvbGxhcHNlZFNldHRpbmcgPSB7fVxuICAgIHVuQ29sbGFwc2VkU2V0dGluZy5pbml0aWFsaXplZCA9IGZhbHNlXG4gICAgXG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nLmluaXRpYWxpemUgPSAtPlxuICAgICAgdW5Db2xsYXBzZWRTZXR0aW5nLmluaXRpYWxpemVkID0gdHJ1ZVxuXG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nLnRvTWV0YWRhdGEgPSAtPlxuICAgICAge3VuQ29sbGFwc2VkOiAkc2NvcGUudW5Db2xsYXBzZWR9XG5cbiAgICB3LnNldHRpbmdzLnB1c2godW5Db2xsYXBzZWRTZXR0aW5nKVxuXG4gICAgc2VsZWN0ZWRFbGVtZW50U2V0dGluZyA9IHt9XG4gICAgc2VsZWN0ZWRFbGVtZW50U2V0dGluZy5pbml0aWFsaXplZCA9IGZhbHNlXG4gICAgXG4gICAgc2VsZWN0ZWRFbGVtZW50U2V0dGluZy5pbml0aWFsaXplID0gLT5cbiAgICAgIHNlbGVjdGVkRWxlbWVudFNldHRpbmcuaW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgICBzZWxlY3RlZEVsZW1lbnRTZXR0aW5nLnRvTWV0YWRhdGEgPSAtPlxuICAgICAge3NlbGVjdGVkRWxlbWVudDogJHNjb3BlLnNlbGVjdGVkRWxlbWVudH1cblxuICAgIHcuc2V0dGluZ3MucHVzaChzZWxlY3RlZEVsZW1lbnRTZXR0aW5nKVxuXG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgIyBUT0RPOiBSZWZhY3RvciBvbmNlIHdlIGhhdmUgdW5kZXJzdG9vZCBleGFjdGx5IGhvdyB0aGUgYW5ndWxhcmpzIGNvbXBpbGF0aW9uIHByb2Nlc3Mgd29ya3M6XG4gICAgIyBpbiB0aGlzIG9yZGVyLCB3ZSBzaG91bGQ6XG4gICAgIyAxLSBjb21waWxlIGltcGFjLXdpZGdldCBjb250cm9sbGVyXG4gICAgIyAyLSBjb21waWxlIHRoZSBzcGVjaWZpYyB3aWRnZXQgdGVtcGxhdGUvY29udHJvbGxlclxuICAgICMgMy0gY29tcGlsZSB0aGUgc2V0dGluZ3MgdGVtcGxhdGVzL2NvbnRyb2xsZXJzXG4gICAgIyA0LSBjYWxsIHdpZGdldC5sb2FkQ29udGVudCgpIChpZGVhbGx5LCBmcm9tIGltcGFjLXdpZGdldCwgb25jZSBhIGNhbGxiYWNrIFxuICAgICMgICAgIGFzc2Vzc2luZyB0aGF0IGV2ZXJ5dGhpbmcgaXMgY29tcGlsZWQgYW4gcmVhZHkgaXMgcmVjZWl2ZWQpXG4gICAgZ2V0U2V0dGluZ3NDb3VudCA9IC0+XG4gICAgICBpZiB3LnNldHRpbmdzP1xuICAgICAgICByZXR1cm4gdy5zZXR0aW5ncy5sZW5ndGhcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIDBcblxuICAgICMgd2lkdGggKyBoaXN0X3BhcmFtZXRlcnMgKyBvcmdhbml6YXRpb25faWRzICsgdW5Db2xsYXBzZWQgKyBzZWxlY3RlZEVsZW1lbnRcbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA9PSA1XG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0QWNjb3VudHNDYXNoU3VtbWFyeScsIC0+XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBJyxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiYWNjb3VudHNcIilcbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJjYXNoLXN1bW1hcnlcIilcbiAgICAsY29udHJvbGxlcjogJ1dpZGdldEFjY291bnRzQ2FzaFN1bW1hcnlDdHJsJ1xuICB9XG4pIl19