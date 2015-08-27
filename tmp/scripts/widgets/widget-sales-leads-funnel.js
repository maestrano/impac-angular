(function () {
var module,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module = angular.module('maestrano.analytics.widget-sales-leads-funnel', ['maestrano.assets']);

module.controller('WidgetSalesLeadsFunnelCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'Utilities', 'ChartFormatterSvc', '$filter', function($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) {
    var getSettingsCount, selectedStatusSetting, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads_per_status)) {
        $scope.statusOptions = _.compact(_.map(w.metadata.status_selection, function(status) {
          if (angular.isDefined(w.content.leads_per_status[status])) {
            return {
              label: status,
              selected: true
            };
          }
        }));
        return angular.forEach(w.content.leads_per_status, function(value, status) {
          if (w.metadata.status_selection && !(indexOf.call(w.metadata.status_selection, status) >= 0)) {
            return $scope.statusOptions.push({
              label: status,
              selected: false
            });
          } else if (_.isEmpty(w.metadata.status_selection)) {
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
          value = w.content.leads_per_status[statusOption.label].total;
          if (statusOption.selected && angular.isDefined(value) && value > max) {
            return max = value;
          }
        });
        if (max > 0) {
          return $scope.funnel = _.compact(_.map($scope.statusOptions, function(statusOption, index) {
            var coloredWidth, statusWidth, value;
            value = w.content.leads_per_status[statusOption.label].total;
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
    $scope.getSelectedLeads = function() {
      if ($scope.isDataFound && $scope.selectedStatus) {
        return w.content.leads_per_status[$scope.selectedStatus].leads;
      }
    };
    $scope.getLeadDescription = function(aLead) {
      var nameLineArray, tooltip;
      tooltip = [];
      nameLineArray = ["<strong>"];
      if (aLead.first_name) {
        nameLineArray.push($filter('titleize')(aLead.first_name));
      }
      if (aLead.last_name) {
        nameLineArray.push($filter('titleize')(aLead.last_name));
      }
      nameLineArray.push("</strong>");
      tooltip.push(nameLineArray.join(' '));
      tooltip.push("Status: " + ($filter('titleize')(aLead.lead_status)));
      if (aLead.organization) {
        tooltip.push("Organization: " + ($filter('titleize')(aLead.organization)));
      }
      if (aLead.opportunities) {
        tooltip.push("<strong>Opportunities:</strong>");
        angular.forEach(aLead.opportunities, function(opp) {
          var oppLineArray;
          oppLineArray = [];
          if (opp.code) {
            oppLineArray.push("#" + opp.code);
          }
          if (opp.name) {
            oppLineArray.push("" + opp.name);
          }
          if (opp.amount) {
            oppLineArray.push($filter('mnoCurrency')(opp.amount.total_amount, "USD", false));
          }
          if (opp.probability) {
            oppLineArray.push(opp.probability + "%");
          }
          if (opp.sales_stage) {
            oppLineArray.push("" + opp.sales_stage);
          }
          return tooltip.push(oppLineArray.join(' - '));
        });
      }
      return tooltip.join("<br />");
    };
    selectedStatusSetting = {};
    selectedStatusSetting.initialized = false;
    selectedStatusSetting.initialize = function() {
      if (angular.isDefined(w.content.leads_per_status[w.metadata.selected_status])) {
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
      if (total >= 5) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetSalesLeadsFunnel', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("sales");
      return element.addClass("leads-funnel");
    },
    controller: 'WidgetSalesLeadsFunnelCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LXNhbGVzLWxlYWRzLWZ1bm5lbC5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxNQUFBO0VBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsK0NBQWYsRUFBK0QsQ0FBQyxrQkFBRCxDQUEvRDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQiw0QkFBbEIsRUFBK0M7RUFDN0MsUUFENkMsRUFDbkMsaUJBRG1DLEVBQ2hCLFdBRGdCLEVBQ0gsbUJBREcsRUFDa0IsU0FEbEIsRUFFN0MsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixTQUExQixFQUFxQyxpQkFBckMsRUFBd0QsT0FBeEQ7QUFFRSxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUVYLENBQUMsQ0FBQyxXQUFGLEdBQWdCLFNBQUE7TUFDZCxJQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE9BQU8sQ0FBQyxTQUFSLENBQWtCLENBQUMsQ0FBQyxPQUFwQixDQUFBLElBQWdDLENBQUMsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFwQixDQUF6RDtRQUVFLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFqQixFQUFtQyxTQUFDLE1BQUQ7VUFDbEUsSUFBbUMsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQSxNQUFBLENBQTdDLENBQW5DO21CQUFBO2NBQUMsS0FBQSxFQUFPLE1BQVI7Y0FBZ0IsUUFBQSxFQUFVLElBQTFCO2NBQUE7O1FBRGtFLENBQW5DLENBQVY7ZUFHdkIsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBMUIsRUFBNEMsU0FBQyxLQUFELEVBQVEsTUFBUjtVQUMxQyxJQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQVgsSUFBK0IsQ0FBQyxDQUFDLGFBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBckIsRUFBQSxNQUFBLE1BQUQsQ0FBbkM7bUJBQ0UsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFyQixDQUEwQjtjQUFDLEtBQUEsRUFBTyxNQUFSO2NBQWdCLFFBQUEsRUFBVSxLQUExQjthQUExQixFQURGO1dBQUEsTUFFSyxJQUFHLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBckIsQ0FBSDttQkFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQXJCLENBQTBCO2NBQUMsS0FBQSxFQUFPLE1BQVI7Y0FBZ0IsUUFBQSxFQUFVLElBQTFCO2FBQTFCLEVBREc7O1FBSHFDLENBQTVDLEVBTEY7O0lBRGM7SUFhaEIsQ0FBQyxDQUFDLE1BQUYsR0FBVyxTQUFBO0FBQ1QsVUFBQTtNQUFBLElBQUcsTUFBTSxDQUFDLFdBQVY7UUFDRSxHQUFBLEdBQUk7UUFDSixPQUFPLENBQUMsT0FBUixDQUFpQixNQUFNLENBQUMsYUFBeEIsRUFBdUMsU0FBQyxZQUFEO0FBQ3JDLGNBQUE7VUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQSxZQUFZLENBQUMsS0FBYixDQUFtQixDQUFDO1VBQ3ZELElBQWUsWUFBWSxDQUFDLFFBQWIsSUFBeUIsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsS0FBbEIsQ0FBekIsSUFBcUQsS0FBQSxHQUFRLEdBQTVFO21CQUFBLEdBQUEsR0FBTSxNQUFOOztRQUZxQyxDQUF2QztRQUlBLElBQUcsR0FBQSxHQUFNLENBQVQ7aUJBQ0UsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFDLENBQUMsR0FBRixDQUFNLE1BQU0sQ0FBQyxhQUFiLEVBQTRCLFNBQUMsWUFBRCxFQUFlLEtBQWY7QUFDcEQsZ0JBQUE7WUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQSxZQUFZLENBQUMsS0FBYixDQUFtQixDQUFDO1lBQ3ZELFlBQUEsR0FBZSxDQUFDLEdBQUEsR0FBTSxDQUFDLEtBQUEsR0FBUSxHQUFULENBQU4sR0FBc0IsRUFBdkIsQ0FBMEIsQ0FBQyxPQUEzQixDQUFBO1lBQ2YsSUFBRyxZQUFBLEdBQWUsQ0FBbEI7Y0FDRSxXQUFBLEdBQWMsR0FEaEI7YUFBQSxNQUFBO2NBR0UsV0FBQSxHQUFjLEdBQUEsR0FBTSxhQUh0Qjs7WUFJQSxJQUtLLFlBQVksQ0FBQyxRQUFiLElBQXlCLE9BQU8sQ0FBQyxTQUFSLENBQWtCLEtBQWxCLENBTDlCO3FCQUFBO2dCQUNFLE1BQUEsRUFBUSxZQUFZLENBQUMsS0FEdkI7Z0JBRUUsTUFBQSxFQUFRLEtBRlY7Z0JBR0UsWUFBQSxFQUFjO2tCQUFDLEtBQUEsRUFBVSxZQUFELEdBQWMsR0FBeEI7aUJBSGhCO2dCQUlFLFdBQUEsRUFBYTtrQkFBQyxLQUFBLEVBQVUsV0FBRCxHQUFhLEdBQXZCO2lCQUpmO2dCQUFBOztVQVBvRCxDQUE1QixDQUFWLEVBRGxCO1NBTkY7O0lBRFM7SUFzQlgsTUFBTSxDQUFDLGFBQVAsR0FBdUIsU0FBQyxLQUFEO2FBQ3JCLGlCQUFpQixDQUFDLFFBQWxCLENBQTJCLEtBQTNCO0lBRHFCO0lBR3ZCLE1BQU0sQ0FBQyxrQkFBUCxHQUE0QixTQUFDLE9BQUQ7TUFDMUIsSUFBRyxNQUFNLENBQUMsY0FBUCxJQUF5QixNQUFNLENBQUMsY0FBUCxLQUF5QixPQUFyRDtRQUNFLE1BQU0sQ0FBQyxjQUFQLEdBQXdCLEtBRDFCO09BQUEsTUFBQTtRQUdFLE1BQU0sQ0FBQyxjQUFQLEdBQXdCLFFBSDFCOztNQUtBLElBQUcsQ0FBQyxDQUFDLENBQUMsVUFBRixDQUFBLENBQUQsSUFBbUIsTUFBTSxDQUFDLGNBQTdCO2VBRUUsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxFQUZGO09BQUEsTUFBQTtlQUlFLENBQUMsQ0FBQyxjQUFGLENBQWlCLEtBQWpCLEVBSkY7O0lBTjBCO0lBWTVCLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLFNBQUMsT0FBRDtBQUNsQixhQUFPLE1BQU0sQ0FBQyxjQUFQLElBQXlCLE9BQUEsS0FBVyxNQUFNLENBQUM7SUFEaEM7SUFHcEIsTUFBTSxDQUFDLGdCQUFQLEdBQTBCLFNBQUE7TUFDeEIsSUFBRyxNQUFNLENBQUMsV0FBUCxJQUFzQixNQUFNLENBQUMsY0FBaEM7QUFDRSxlQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWlCLENBQUEsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsQ0FBQyxNQUQzRDs7SUFEd0I7SUFJMUIsTUFBTSxDQUFDLGtCQUFQLEdBQTRCLFNBQUMsS0FBRDtBQUMxQixVQUFBO01BQUEsT0FBQSxHQUFVO01BRVYsYUFBQSxHQUFnQixDQUFDLFVBQUQ7TUFDaEIsSUFBNkQsS0FBSyxDQUFDLFVBQW5FO1FBQUEsYUFBYSxDQUFDLElBQWQsQ0FBbUIsT0FBQSxDQUFRLFVBQVIsQ0FBQSxDQUFvQixLQUFLLENBQUMsVUFBMUIsQ0FBbkIsRUFBQTs7TUFDQSxJQUE0RCxLQUFLLENBQUMsU0FBbEU7UUFBQSxhQUFhLENBQUMsSUFBZCxDQUFtQixPQUFBLENBQVEsVUFBUixDQUFBLENBQW9CLEtBQUssQ0FBQyxTQUExQixDQUFuQixFQUFBOztNQUNBLGFBQWEsQ0FBQyxJQUFkLENBQW1CLFdBQW5CO01BRUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxhQUFhLENBQUMsSUFBZCxDQUFtQixHQUFuQixDQUFiO01BQ0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxVQUFBLEdBQVUsQ0FBQyxPQUFBLENBQVEsVUFBUixDQUFBLENBQW9CLEtBQUssQ0FBQyxXQUExQixDQUFELENBQXZCO01BQ0EsSUFBNEUsS0FBSyxDQUFDLFlBQWxGO1FBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxnQkFBQSxHQUFnQixDQUFDLE9BQUEsQ0FBUSxVQUFSLENBQUEsQ0FBb0IsS0FBSyxDQUFDLFlBQTFCLENBQUQsQ0FBN0IsRUFBQTs7TUFFQSxJQUFHLEtBQUssQ0FBQyxhQUFUO1FBQ0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxpQ0FBYjtRQUNBLE9BQU8sQ0FBQyxPQUFSLENBQWdCLEtBQUssQ0FBQyxhQUF0QixFQUFxQyxTQUFDLEdBQUQ7QUFDbkMsY0FBQTtVQUFBLFlBQUEsR0FBZTtVQUNmLElBQXFDLEdBQUcsQ0FBQyxJQUF6QztZQUFBLFlBQVksQ0FBQyxJQUFiLENBQWtCLEdBQUEsR0FBSSxHQUFHLENBQUMsSUFBMUIsRUFBQTs7VUFDQSxJQUFvQyxHQUFHLENBQUMsSUFBeEM7WUFBQSxZQUFZLENBQUMsSUFBYixDQUFrQixFQUFBLEdBQUcsR0FBRyxDQUFDLElBQXpCLEVBQUE7O1VBRUEsSUFBb0YsR0FBRyxDQUFDLE1BQXhGO1lBQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsT0FBQSxDQUFRLGFBQVIsQ0FBQSxDQUF1QixHQUFHLENBQUMsTUFBTSxDQUFDLFlBQWxDLEVBQWdELEtBQWhELEVBQXVELEtBQXZELENBQWxCLEVBQUE7O1VBQ0EsSUFBNEMsR0FBRyxDQUFDLFdBQWhEO1lBQUEsWUFBWSxDQUFDLElBQWIsQ0FBcUIsR0FBRyxDQUFDLFdBQUwsR0FBaUIsR0FBckMsRUFBQTs7VUFDQSxJQUEyQyxHQUFHLENBQUMsV0FBL0M7WUFBQSxZQUFZLENBQUMsSUFBYixDQUFrQixFQUFBLEdBQUcsR0FBRyxDQUFDLFdBQXpCLEVBQUE7O2lCQUNBLE9BQU8sQ0FBQyxJQUFSLENBQWEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsS0FBbEIsQ0FBYjtRQVJtQyxDQUFyQyxFQUZGOztBQVlBLGFBQU8sT0FBTyxDQUFDLElBQVIsQ0FBYSxRQUFiO0lBeEJtQjtJQTJCNUIscUJBQUEsR0FBd0I7SUFDeEIscUJBQXFCLENBQUMsV0FBdEIsR0FBb0M7SUFFcEMscUJBQXFCLENBQUMsVUFBdEIsR0FBbUMsU0FBQTtNQUNqQyxJQUFzRCxPQUFPLENBQUMsU0FBUixDQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFpQixDQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBWCxDQUE3QyxDQUF0RDtRQUFBLE1BQU0sQ0FBQyxjQUFQLEdBQXdCLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQW5DOzthQUNBLHFCQUFxQixDQUFDLFdBQXRCLEdBQW9DO0lBRkg7SUFJbkMscUJBQXFCLENBQUMsVUFBdEIsR0FBbUMsU0FBQTthQUNqQztRQUFDLGVBQUEsRUFBaUIsTUFBTSxDQUFDLGNBQXpCOztJQURpQztJQUduQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQVgsQ0FBZ0IscUJBQWhCO0lBV0EsZ0JBQUEsR0FBbUIsU0FBQTtNQUNqQixJQUFHLGtCQUFIO0FBQ0UsZUFBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BRHBCO09BQUEsTUFBQTtBQUdFLGVBQU8sRUFIVDs7SUFEaUI7SUFPbkIsTUFBTSxDQUFDLE1BQVAsQ0FBYyxnQkFBZCxFQUFnQyxTQUFDLEtBQUQ7TUFDOUIsSUFBbUIsS0FBQSxJQUFTLENBQTVCO2VBQUEsQ0FBQyxDQUFDLFdBQUYsQ0FBQSxFQUFBOztJQUQ4QixDQUFoQztBQUdBLFdBQU87RUF2SFQsQ0FGNkM7Q0FBL0M7O0FBNEhBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLHdCQUFqQixFQUEyQyxTQUFBO0FBQ3pDLFNBQU87SUFDTCxRQUFBLEVBQVUsR0FETDtJQUVMLElBQUEsRUFBTSxTQUFDLEtBQUQsRUFBUSxPQUFSO01BQ0osT0FBTyxDQUFDLFFBQVIsQ0FBaUIsT0FBakI7YUFDQSxPQUFPLENBQUMsUUFBUixDQUFpQixjQUFqQjtJQUZJLENBRkQ7SUFLSixVQUFBLEVBQVksNEJBTFI7O0FBRGtDLENBQTNDIiwiZmlsZSI6IndpZGdldHMvd2lkZ2V0LXNhbGVzLWxlYWRzLWZ1bm5lbC5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1zYWxlcy1sZWFkcy1mdW5uZWwnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0U2FsZXNMZWFkc0Z1bm5lbEN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnVXRpbGl0aWVzJywgJ0NoYXJ0Rm9ybWF0dGVyU3ZjJywgJyRmaWx0ZXInLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMsIFV0aWxpdGllcywgQ2hhcnRGb3JtYXR0ZXJTdmMsICRmaWx0ZXIpIC0+XG5cbiAgICB3ID0gJHNjb3BlLndpZGdldFxuXG4gICAgdy5pbml0Q29udGV4dCA9IC0+XG4gICAgICBpZiAkc2NvcGUuaXNEYXRhRm91bmQgPSBhbmd1bGFyLmlzRGVmaW5lZCh3LmNvbnRlbnQpICYmICFfLmlzRW1wdHkody5jb250ZW50LmxlYWRzX3Blcl9zdGF0dXMpXG5cbiAgICAgICAgJHNjb3BlLnN0YXR1c09wdGlvbnMgPSBfLmNvbXBhY3QgXy5tYXAgdy5tZXRhZGF0YS5zdGF0dXNfc2VsZWN0aW9uLCAoc3RhdHVzKSAtPlxuICAgICAgICAgIHtsYWJlbDogc3RhdHVzLCBzZWxlY3RlZDogdHJ1ZX0gaWYgYW5ndWxhci5pc0RlZmluZWQody5jb250ZW50LmxlYWRzX3Blcl9zdGF0dXNbc3RhdHVzXSlcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2ggdy5jb250ZW50LmxlYWRzX3Blcl9zdGF0dXMsICh2YWx1ZSwgc3RhdHVzKSAtPlxuICAgICAgICAgIGlmIHcubWV0YWRhdGEuc3RhdHVzX3NlbGVjdGlvbiAmJiAhKHN0YXR1cyBpbiB3Lm1ldGFkYXRhLnN0YXR1c19zZWxlY3Rpb24pXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzT3B0aW9ucy5wdXNoKHtsYWJlbDogc3RhdHVzLCBzZWxlY3RlZDogZmFsc2V9KVxuICAgICAgICAgIGVsc2UgaWYgXy5pc0VtcHR5KHcubWV0YWRhdGEuc3RhdHVzX3NlbGVjdGlvbilcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXNPcHRpb25zLnB1c2goe2xhYmVsOiBzdGF0dXMsIHNlbGVjdGVkOiB0cnVlfSlcblxuXG4gICAgdy5mb3JtYXQgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kXG4gICAgICAgIG1heD0wXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCAgJHNjb3BlLnN0YXR1c09wdGlvbnMsIChzdGF0dXNPcHRpb24pIC0+XG4gICAgICAgICAgdmFsdWUgPSB3LmNvbnRlbnQubGVhZHNfcGVyX3N0YXR1c1tzdGF0dXNPcHRpb24ubGFiZWxdLnRvdGFsXG4gICAgICAgICAgbWF4ID0gdmFsdWUgaWYgc3RhdHVzT3B0aW9uLnNlbGVjdGVkICYmIGFuZ3VsYXIuaXNEZWZpbmVkKHZhbHVlKSAmJiB2YWx1ZSA+IG1heFxuXG4gICAgICAgIGlmIG1heCA+IDBcbiAgICAgICAgICAkc2NvcGUuZnVubmVsID0gXy5jb21wYWN0IF8ubWFwICRzY29wZS5zdGF0dXNPcHRpb25zLCAoc3RhdHVzT3B0aW9uLCBpbmRleCkgLT5cbiAgICAgICAgICAgIHZhbHVlID0gdy5jb250ZW50LmxlYWRzX3Blcl9zdGF0dXNbc3RhdHVzT3B0aW9uLmxhYmVsXS50b3RhbFxuICAgICAgICAgICAgY29sb3JlZFdpZHRoID0gKDEwMCAqICh2YWx1ZSAvIG1heCkgLSAxMCkudG9GaXhlZCgpXG4gICAgICAgICAgICBpZiBjb2xvcmVkV2lkdGggPCA4XG4gICAgICAgICAgICAgIHN0YXR1c1dpZHRoID0gOTJcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgc3RhdHVzV2lkdGggPSAxMDAgLSBjb2xvcmVkV2lkdGhcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNPcHRpb24ubGFiZWwsXG4gICAgICAgICAgICAgIG51bWJlcjogdmFsdWUsXG4gICAgICAgICAgICAgIGNvbG9yZWRXaWR0aDoge3dpZHRoOiBcIiN7Y29sb3JlZFdpZHRofSVcIn1cbiAgICAgICAgICAgICAgc3RhdHVzV2lkdGg6IHt3aWR0aDogXCIje3N0YXR1c1dpZHRofSVcIn1cbiAgICAgICAgICAgIH0gaWYgc3RhdHVzT3B0aW9uLnNlbGVjdGVkICYmIGFuZ3VsYXIuaXNEZWZpbmVkKHZhbHVlKVxuXG4gICAgJHNjb3BlLmdldEltcGFjQ29sb3IgPSAoaW5kZXgpIC0+XG4gICAgICBDaGFydEZvcm1hdHRlclN2Yy5nZXRDb2xvcihpbmRleClcblxuICAgICRzY29wZS50b29nbGVTZWxlY3RTdGF0dXMgPSAoYVN0YXR1cykgLT5cbiAgICAgIGlmICRzY29wZS5zZWxlY3RlZFN0YXR1cyAmJiAkc2NvcGUuc2VsZWN0ZWRTdGF0dXMgPT0gYVN0YXR1c1xuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTdGF0dXMgPSBudWxsXG4gICAgICBlbHNlXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFN0YXR1cyA9IGFTdGF0dXNcblxuICAgICAgaWYgIXcuaXNFeHBhbmRlZCgpICYmICRzY29wZS5zZWxlY3RlZFN0YXR1c1xuICAgICAgICAjIHdpbGwgdHJpZ2dlciB1cGRhdGVTZXR0aW5ncyhmYWxzZSlcbiAgICAgICAgdy50b29nbGVFeHBhbmRlZCgpXG4gICAgICBlbHNlXG4gICAgICAgIHcudXBkYXRlU2V0dGluZ3MoZmFsc2UpXG5cbiAgICAkc2NvcGUuaXNTZWxlY3RlZCA9IChhU3RhdHVzKSAtPlxuICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFN0YXR1cyAmJiBhU3RhdHVzID09ICRzY29wZS5zZWxlY3RlZFN0YXR1c1xuXG4gICAgJHNjb3BlLmdldFNlbGVjdGVkTGVhZHMgPSAtPlxuICAgICAgaWYgJHNjb3BlLmlzRGF0YUZvdW5kICYmICRzY29wZS5zZWxlY3RlZFN0YXR1c1xuICAgICAgICByZXR1cm4gdy5jb250ZW50LmxlYWRzX3Blcl9zdGF0dXNbJHNjb3BlLnNlbGVjdGVkU3RhdHVzXS5sZWFkc1xuXG4gICAgJHNjb3BlLmdldExlYWREZXNjcmlwdGlvbiA9IChhTGVhZCkgLT5cbiAgICAgIHRvb2x0aXAgPSBbXVxuXG4gICAgICBuYW1lTGluZUFycmF5ID0gW1wiPHN0cm9uZz5cIl1cbiAgICAgIG5hbWVMaW5lQXJyYXkucHVzaCgkZmlsdGVyKCd0aXRsZWl6ZScpKGFMZWFkLmZpcnN0X25hbWUpKSBpZiBhTGVhZC5maXJzdF9uYW1lXG4gICAgICBuYW1lTGluZUFycmF5LnB1c2goJGZpbHRlcigndGl0bGVpemUnKShhTGVhZC5sYXN0X25hbWUpKSBpZiBhTGVhZC5sYXN0X25hbWVcbiAgICAgIG5hbWVMaW5lQXJyYXkucHVzaChcIjwvc3Ryb25nPlwiKVxuICAgICAgXG4gICAgICB0b29sdGlwLnB1c2gobmFtZUxpbmVBcnJheS5qb2luKCcgJykpIFxuICAgICAgdG9vbHRpcC5wdXNoKFwiU3RhdHVzOiAjeyRmaWx0ZXIoJ3RpdGxlaXplJykoYUxlYWQubGVhZF9zdGF0dXMpfVwiKVxuICAgICAgdG9vbHRpcC5wdXNoKFwiT3JnYW5pemF0aW9uOiAjeyRmaWx0ZXIoJ3RpdGxlaXplJykoYUxlYWQub3JnYW5pemF0aW9uKX1cIikgaWYgYUxlYWQub3JnYW5pemF0aW9uXG4gICAgICBcbiAgICAgIGlmIGFMZWFkLm9wcG9ydHVuaXRpZXNcbiAgICAgICAgdG9vbHRpcC5wdXNoKFwiPHN0cm9uZz5PcHBvcnR1bml0aWVzOjwvc3Ryb25nPlwiKVxuICAgICAgICBhbmd1bGFyLmZvckVhY2ggYUxlYWQub3Bwb3J0dW5pdGllcywgKG9wcCkgLT5cbiAgICAgICAgICBvcHBMaW5lQXJyYXkgPSBbXVxuICAgICAgICAgIG9wcExpbmVBcnJheS5wdXNoKFwiIyN7b3BwLmNvZGV9XCIpIGlmIG9wcC5jb2RlXG4gICAgICAgICAgb3BwTGluZUFycmF5LnB1c2goXCIje29wcC5uYW1lfVwiKSBpZiBvcHAubmFtZVxuICAgICAgICAgICMgVE9ETyBjdXJyZW5jeVxuICAgICAgICAgIG9wcExpbmVBcnJheS5wdXNoKCRmaWx0ZXIoJ21ub0N1cnJlbmN5Jykob3BwLmFtb3VudC50b3RhbF9hbW91bnQsIFwiVVNEXCIsIGZhbHNlKSkgaWYgb3BwLmFtb3VudFxuICAgICAgICAgIG9wcExpbmVBcnJheS5wdXNoKFwiI3tvcHAucHJvYmFiaWxpdHl9JVwiKSBpZiBvcHAucHJvYmFiaWxpdHlcbiAgICAgICAgICBvcHBMaW5lQXJyYXkucHVzaChcIiN7b3BwLnNhbGVzX3N0YWdlfVwiKSBpZiBvcHAuc2FsZXNfc3RhZ2VcbiAgICAgICAgICB0b29sdGlwLnB1c2gob3BwTGluZUFycmF5LmpvaW4oJyAtICcpKVxuXG4gICAgICByZXR1cm4gdG9vbHRpcC5qb2luKFwiPGJyIC8+XCIpXG5cblxuICAgIHNlbGVjdGVkU3RhdHVzU2V0dGluZyA9IHt9XG4gICAgc2VsZWN0ZWRTdGF0dXNTZXR0aW5nLmluaXRpYWxpemVkID0gZmFsc2VcbiAgICBcbiAgICBzZWxlY3RlZFN0YXR1c1NldHRpbmcuaW5pdGlhbGl6ZSA9IC0+XG4gICAgICAkc2NvcGUuc2VsZWN0ZWRTdGF0dXMgPSB3Lm1ldGFkYXRhLnNlbGVjdGVkX3N0YXR1cyBpZiBhbmd1bGFyLmlzRGVmaW5lZCh3LmNvbnRlbnQubGVhZHNfcGVyX3N0YXR1c1t3Lm1ldGFkYXRhLnNlbGVjdGVkX3N0YXR1c10pXG4gICAgICBzZWxlY3RlZFN0YXR1c1NldHRpbmcuaW5pdGlhbGl6ZWQgPSB0cnVlXG5cbiAgICBzZWxlY3RlZFN0YXR1c1NldHRpbmcudG9NZXRhZGF0YSA9IC0+XG4gICAgICB7c2VsZWN0ZWRfc3RhdHVzOiAkc2NvcGUuc2VsZWN0ZWRTdGF0dXN9XG5cbiAgICB3LnNldHRpbmdzLnB1c2goc2VsZWN0ZWRTdGF0dXNTZXR0aW5nKVxuXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAjIHRpbWUgcmFuZ2UgKyBvcmdhbml6YXRpb25zICsgcGFyYW1zIHBpY2tlciArIHdpZHRoICsgc3RhdHVzIHNlbGVjdG9yXG4gICAgJHNjb3BlLiR3YXRjaCBnZXRTZXR0aW5nc0NvdW50LCAodG90YWwpIC0+XG4gICAgICB3LmxvYWRDb250ZW50KCkgaWYgdG90YWwgPj0gNVxuXG4gICAgcmV0dXJuIHdcbl0pXG5cbm1vZHVsZS5kaXJlY3RpdmUoJ3dpZGdldFNhbGVzTGVhZHNGdW5uZWwnLCAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50KSAtPlxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInNhbGVzXCIpXG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwibGVhZHMtZnVubmVsXCIpXG4gICAgLGNvbnRyb2xsZXI6ICdXaWRnZXRTYWxlc0xlYWRzRnVubmVsQ3RybCdcbiAgfVxuKSJdfQ==