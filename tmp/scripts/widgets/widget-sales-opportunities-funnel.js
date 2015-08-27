(function () {
var module,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module = angular.module('maestrano.analytics.widget-sales-opportunities-funnel', ['maestrano.assets']);

module.controller('WidgetSalesOpportunitiesFunnelCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'Utilities', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) {
    var getSettingsCount, selectedStatusSetting, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opps_per_sales_stage)) {
        $scope.statusOptions = _.compact(_.map(w.metadata.sales_stage_selection, function(status) {
          if (angular.isDefined(w.content.opps_per_sales_stage[status])) {
            return {
              label: status,
              selected: true
            };
          }
        }));
        return angular.forEach(w.content.opps_per_sales_stage, function(value, status) {
          if (w.metadata.sales_stage_selection && !(indexOf.call(w.metadata.sales_stage_selection, status) >= 0)) {
            return $scope.statusOptions.push({
              label: status,
              selected: false
            });
          } else if (_.isEmpty(w.metadata.sales_stage_selection)) {
            return $scope.statusOptions.push({
              label: status,
              selected: true
            });
          }
        });
      }
    };
    w.format = function() {
      var max;
      if ($scope.isDataFound) {
        max = 0;
        angular.forEach($scope.statusOptions, function(statusOption) {
          var value;
          value = w.content.opps_per_sales_stage[statusOption.label].total;
          if (statusOption.selected && angular.isDefined(value) && value > max) {
            return max = value;
          }
        });
        if (max > 0) {
          return $scope.funnel = _.compact(_.map($scope.statusOptions, function(statusOption, index) {
            var coloredWidth, statusWidth, value;
            value = w.content.opps_per_sales_stage[statusOption.label].total;
            coloredWidth = (100 * (value / max) - 10).toFixed();
            if (coloredWidth < 8) {
              statusWidth = 92;
            } else {
              statusWidth = 100 - coloredWidth;
            }
            if (statusOption.selected && angular.isDefined(value)) {
              return {
                status: statusOption.label,
                number: value,
                coloredWidth: {
                  width: coloredWidth + "%"
                },
                statusWidth: {
                  width: statusWidth + "%"
                }
              };
            }
          }));
        }
      }
    };
    $scope.getImpacColor = function(index) {
      return ChartFormatterSvc.getColor(index);
    };
    $scope.toogleSelectStatus = function(aStatus) {
      if ($scope.selectedStatus && $scope.selectedStatus === aStatus) {
        $scope.selectedStatus = null;
      } else {
        $scope.selectedStatus = aStatus;
      }
      if (!w.isExpanded() && $scope.selectedStatus) {
        return w.toogleExpanded();
      } else {
        return w.updateSettings(false);
      }
    };
    $scope.isSelected = function(aStatus) {
      return $scope.selectedStatus && aStatus === $scope.selectedStatus;
    };
    $scope.getSelectedOpportunities = function() {
      if ($scope.isDataFound && $scope.selectedStatus) {
        return w.content.opps_per_sales_stage[$scope.selectedStatus].opps;
      }
    };
    $scope.getOppDetails = function(anOpp) {
      var oppDetails;
      oppDetails = [];
      if (anOpp.amount) {
        oppDetails.push($filter('mnoCurrency')(anOpp.amount.amount, anOpp.amount.currency || 'AUD'));
      }
      if (anOpp.probability) {
        oppDetails.push("proba " + anOpp.probability + "%");
      }
      return oppDetails.join(' / ');
    };
    selectedStatusSetting = {};
    selectedStatusSetting.initialized = false;
    selectedStatusSetting.initialize = function() {
      if (angular.isDefined(w.content.opps_per_sales_stage[w.metadata.selected_status])) {
        $scope.selectedStatus = w.metadata.selected_status;
      }
      return selectedStatusSetting.initialized = true;
    };
    selectedStatusSetting.toMetadata = function() {
      return {
        selected_status: $scope.selectedStatus
      };
    };
    w.settings.push(selectedStatusSetting);
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

module.directive('widgetSalesOpportunitiesFunnel', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("leads-funnel");
    },
    controller: 'WidgetSalesOpportunitiesFunnelCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLW9wcG9ydHVuaXRpZXMtZnVubmVsLmpzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxJQUFBLE1BQUE7RUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSx1REFBZixFQUF1RSxDQUFDLGtCQUFELENBQXZFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLG9DQUFsQixFQUF1RDtFQUNyRCxRQURxRCxFQUMzQyxpQkFEMkMsRUFDeEIsV0FEd0IsRUFDWCxtQkFEVyxFQUNVLFNBRFYsRUFFckQsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixTQUExQixFQUFxQyxpQkFBckMsRUFBd0QsT0FBeEQ7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7TUFDZCxJQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQUMsQ0FBQyxPQUFwQixDQUFBLElBQWdDLENBQUMsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFwQixDQUF6RDtRQUVFLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxDQUFDLENBQUMsUUFBUSxDQUFDLHFCQUFqQixFQUF3QyxTQUFDLE1BQUQ7VUFDdkUsSUFBbUMsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBcUIsQ0FBQSxNQUFBLENBQWpELENBQW5DO21CQUFBO2NBQUMsS0FBQSxFQUFPLE1BQVI7Y0FBZ0IsUUFBQSxFQUFVLElBQTFCO2NBQUE7O1FBRHVFLENBQXhDLENBQVY7ZUFHdkIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBMUIsRUFBZ0QsU0FBQyxLQUFELEVBQVEsTUFBUjtVQUM5QyxJ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QW1DLFNBQUE7YUFDakM7UUFBQyxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxjQUF6Qjs7SUFEaUM7SUFHbkMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFYLENBQWdCLHFCQUFoQjtJQVdBLGdCQUFBLEdBQW1CLFNBQUE7TUFDakIsSUFBRyxrQkFBSDtBQUNFLGVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQURwQjtPQUFBLE1BQUE7QUFHRSxlQUFPLEVBSFQ7O0lBRGlCO0lBT25CLE1BQU0sQ0FBQyxNQUFQLENBQWMsZ0JBQWQsRUFBZ0MsU0FBQyxLQUFEO01BQzlCLElBQW1CLEtBQUEsSUFBUyxDQUE1QjtlQUFBLENBQUMsQ0FBQyxXQUFGLENBQUEsRUFBQTs7SUFEOEIsQ0FBaEM7QUFHQSxXQUFPO0VBcEdULENBRnFEO0NBQXZEOztBQXlHQSxNQUFNLENBQUMsU0FBUCxDQUFpQixnQ0FBakIsRUFBbUQsU0FBQTtBQUNqRCxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE9BQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsY0FBakI7SUFGSSxDQUZEO0lBS0osVUFBQSxFQUFZLG9DQUxSOztBQUQwQyxDQUFuRCIsImZpbGUiOiJ3aWRnZXRzL3dpZGdldC1zYWxlcy1vcHBvcnR1bml0aWVzLWZ1bm5lbC5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIiMgVE9ETyBmYWN0b3Igd2l0aCBsZWFkcyBmdW5uZWwgIVxuXG5tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXQtc2FsZXMtb3Bwb3J0dW5pdGllcy1mdW5uZWwnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0U2FsZXNPcHBvcnR1bml0aWVzRnVubmVsQ3RybCcsW1xuICAnJHNjb3BlJywgJ0RoYkFuYWx5dGljc1N2YycsICdVdGlsaXRpZXMnLCAnQ2hhcnRGb3JtYXR0ZXJTdmMnLCAnJGZpbHRlcicsXG4gICgkc2NvcGUsIERoYkFuYWx5dGljc1N2YywgVXRpbGl0aWVzLCBDaGFydEZvcm1hdHRlclN2YywgJGZpbHRlcikgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCA9IGFuZ3VsYXIuaXNEZWZpbmVkKHcuY29udGVudCkgJiYgIV8uaXNFbXB0eSh3LmNvbnRlbnQub3Bwc19wZXJfc2FsZXNfc3RhZ2UpXG5cbiAgICAgICAgJHNjb3BlLnN0YXR1c09wdGlvbnMgPSBfLmNvbXBhY3QgXy5tYXAgdy5tZXRhZGF0YS5zYWxlc19zdGFnZV9zZWxlY3Rpb24sIChzdGF0dXMpIC0+XG4gICAgICAgICAge2xhYmVsOiBzdGF0dXMsIHNlbGVjdGVkOiB0cnVlfSBpZiBhbmd1bGFyLmlzRGVmaW5lZCh3LmNvbnRlbnQub3Bwc19wZXJfc2FsZXNfc3RhZ2Vbc3RhdHVzXSlcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2ggdy5jb250ZW50Lm9wcHNfcGVyX3NhbGVzX3N0YWdlLCAodmFsdWUsIHN0YXR1cykgLT5cbiAgICAgICAgICBpZiB3Lm1ldGFkYXRhLnNhbGVzX3N0YWdlX3NlbGVjdGlvbiAmJiAhKHN0YXR1cyBpbiB3Lm1ldGFkYXRhLnNhbGVzX3N0YWdlX3NlbGVjdGlvbilcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXNPcHRpb25zLnB1c2goe2xhYmVsOiBzdGF0dXMsIHNlbGVjdGVkOiBmYWxzZX0pXG4gICAgICAgICAgZWxzZSBpZiBfLmlzRW1wdHkody5tZXRhZGF0YS5zYWxlc19zdGFnZV9zZWxlY3Rpb24pXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzT3B0aW9ucy5wdXNoKHtsYWJlbDogc3RhdHVzLCBzZWxlY3RlZDogdHJ1ZX0pXG5cblxuICAgIHcuZm9ybWF0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZFxuICAgICAgICBtYXg9MFxuICAgICAgICBhbmd1bGFyLmZvckVhY2ggICRzY29wZS5zdGF0dXNPcHRpb25zLCAoc3RhdHVzT3B0aW9uKSAtPlxuICAgICAgICAgIHZhbHVlID0gdy5jb250ZW50Lm9wcHNfcGVyX3NhbGVzX3N0YWdlW3N0YXR1c09wdGlvbi5sYWJlbF0udG90YWxcbiAgICAgICAgICBtYXggPSB2YWx1ZSBpZiBzdGF0dXNPcHRpb24uc2VsZWN0ZWQgJiYgYW5ndWxhci5pc0RlZmluZWQodmFsdWUpICYmIHZhbHVlID4gbWF4XG5cbiAgICAgICAgaWYgbWF4ID4gMFxuICAgICAgICAgICRzY29wZS5mdW5uZWwgPSBfLmNvbXBhY3QgXy5tYXAgJHNjb3BlLnN0YXR1c09wdGlvbnMsIChzdGF0dXNPcHRpb24sIGluZGV4KSAtPlxuICAgICAgICAgICAgdmFsdWUgPSB3LmNvbnRlbnQub3Bwc19wZXJfc2FsZXNfc3RhZ2Vbc3RhdHVzT3B0aW9uLmxhYmVsXS50b3RhbFxuICAgICAgICAgICAgY29sb3JlZFdpZHRoID0gKDEwMCAqICh2YWx1ZSAvIG1heCkgLSAxMCkudG9GaXhlZCgpXG4gICAgICAgICAgICBpZiBjb2xvcmVkV2lkdGggPCA4XG4gICAgICAgICAgICAgIHN0YXR1c1dpZHRoID0gOTJcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgc3RhdHVzV2lkdGggPSAxMDAgLSBjb2xvcmVkV2lkdGhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNPcHRpb24ubGFiZWwsXG4gICAgICAgICAgICAgIG51bWJlcjogdmFsdWUsXG4gICAgICAgICAgICAgIGNvbG9yZWRXaWR0aDoge3dpZHRoOiBcIiN7Y29sb3JlZFdpZHRofSVcIn1cbiAgICAgICAgICAgICAgc3RhdHVzV2lkdGg6IHt3aWR0aDogXCIje3N0YXR1c1dpZHRofSVcIn1cbiAgICAgICAgICAgIH0gaWYgc3RhdHVzT3B0aW9uLnNlbGVjdGVkICYmIGFuZ3VsYXIuaXNEZWZpbmVkKHZhbHVlKVxuXG4gICAgJHNjb3BlLmdldEltcGFjQ29sb3IgPSAoaW5kZXgpIC0+XG4gICAgICBDaGFydEZvcm1hdHRlclN2Yy5nZXRDb2xvcihpbmRleClcblxuICAgICRzY29wZS50b29nbGVTZWxlY3RTdGF0dXMgPSAoYVN0YXR1cykgLT5cbiAgICAgIGlmICRzY29wZS5zZWxlY3RlZFN0YXR1cyAmJiAkc2NvcGUuc2VsZWN0ZWRTdGF0dXMgPT0gYVN0YXR1c1xuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTdGF0dXMgPSBudWxsXG4gICAgICBlbHNlXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFN0YXR1cyA9IGFTdGF0dXNcblxuICAgICAgaWYgIXcuaXNFeHBhbmRlZCgpICYmICRzY29wZS5zZWxlY3RlZFN0YXR1c1xuICAgICAgICAjIHdpbGwgdHJpZ2dlciB1cGRhdGVTZXR0aW5ncyhmYWxzZSlcbiAgICAgICAgdy50b29nbGVFeHBhbmRlZCgpXG4gICAgICBlbHNlXG4gICAgICAgIHcudXBkYXRlU2V0dGluZ3MoZmFsc2UpXG5cbiAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IChhU3RhdHVzKSAtPlxuICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFN0YXR1cyAmJiBhU3RhdHVzID09ICRzY29wZS5zZWxlY3RlZFN0YXR1c1xuXG4gICAgJHNjb3BlLmdldFNlbGVjdGVkT3Bwb3J0dW5pdGllcyA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgJiYgJHNjb3BlLnNlbGVjdGVkU3RhdHVzXG4gICAgICAgIHJldHVybiB3LmNvbnRlbnQub3Bwc19wZXJfc2FsZXNfc3RhZ2VbJHNjb3BlLnNlbGVjdGVkU3RhdHVzXS5vcHBzXG5cbiAgICAkc2NvcGUuZ2V0T3BwRGV0YWlscyA9IChhbk9wcCkgLT5cbiAgICAgIG9wcERldGFpbHMgPSBbXVxuICAgICAgb3BwRGV0YWlscy5wdXNoKCRmaWx0ZXIoJ21ub0N1cnJlbmN5JykoYW5PcHAuYW1vdW50LmFtb3VudCwgYW5PcHAuYW1vdW50LmN1cnJlbmN5IHx8ICdBVUQnKSkgaWYgYW5PcHAuYW1vdW50XG4gICAgICBvcHBEZXRhaWxzLnB1c2goXCJwcm9iYSAje2FuT3BwLnByb2JhYmlsaXR5fSVcIikgaWYgYW5PcHAucHJvYmFiaWxpdHlcblxuICAgICAgcmV0dXJuIG9wcERldGFpbHMuam9pbignIC8gJylcblxuXG4gICAgc2VsZWN0ZWRTdGF0dXNTZXR0aW5nID0ge31cbiAgICBzZWxlY3RlZFN0YXR1c1NldHRpbmcuaW5pdGlhbGl6ZWQgPSBmYWxzZVxuICAgIFxuICAgIHNlbGVjdGVkU3RhdHVzU2V0dGluZy5pbml0aWFsaXplID0gLT5cbiAgICAgICRzY29wZS5zZWxlY3RlZFN0YXR1cyA9IHcubWV0YWRhdGEuc2VsZWN0ZWRfc3RhdHVzIGlmIGFuZ3VsYXIuaXNEZWZpbmVkKHcuY29udGVudC5vcHBzX3Blcl9zYWxlc19zdGFnZVt3Lm1ldGFkYXRhLnNlbGVjdGVkX3N0YXR1c10pXG4gICAgICBzZWxlY3RlZFN0YXR1c1NldHRpbmcuaW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgICBzZWxlY3RlZFN0YXR1c1NldHRpbmcudG9NZXRhZGF0YSA9IC0+XG4gICAgICB7c2VsZWN0ZWRfc3RhdHVzOiAkc2NvcGUuc2VsZWN0ZWRTdGF0dXN9XG5cbiAgICB3LnNldHRpbmdzLnB1c2goc2VsZWN0ZWRTdGF0dXNTZXR0aW5nKVxuXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIG9yZ2FuaXphdGlvbnMgKyBwYXJhbXMgcGlja2VyICsgd2lkdGggKyBzdGF0dXMgc2VsZWN0b3JcbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA+PSA0XG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0U2FsZXNPcHBvcnR1bml0aWVzRnVubmVsJywgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCkgLT5cbiAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoXCJzYWxlc1wiKVxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImxlYWRzLWZ1bm5lbFwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0U2FsZXNPcHBvcnR1bml0aWVzRnVubmVsQ3RybCdcbiAgfVxuKSJdfQ==