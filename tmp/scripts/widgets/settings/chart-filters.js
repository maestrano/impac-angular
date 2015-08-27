(function () {
var module;

module = angular.module('maestrano.analytics.widgets-settings.chart-filters', ['maestrano.assets']);

module.controller('SettingChartFiltersCtrl', [
  '$scope', function($scope) {
    var setting, w;
    w = $scope.parentWidget;
    setting = {};
    setting.key = "chart-filters";
    setting.isInitialized = false;
    setting.initialize = function() {
      if ((w.content.chart_filter != null) && ($scope.filterCriteria = w.content.chart_filter.criteria)) {
        $scope.maxEntities = w.content.chart_filter.max;
        $scope.entityType = w.content.chart_filter.entity_type;
        $scope.filterLabel = w.content.chart_filter.filter_label.replace(/_/g, " ");
        if ($scope.filterCriteria === "number") {
          $scope.filterValuePercentage = 80;
          $scope.filterValueNumber = w.content.chart_filter.value;
        } else {
          $scope.filterValuePercentage = w.content.chart_filter.value;
          $scope.filterValueNumber = Math.round($scope.maxEntities / 2);
        }
        return setting.isInitialized = true;
      }
    };
    setting.toMetadata = function() {
      var filterValue;
      if (w.content.chart_filter != null) {
        if ($scope.filterCriteria === "percentage") {
          filterValue = $scope.filterValuePercentage;
        } else {
          filterValue = $scope.filterValueNumber;
        }
        return {
          chart_filter: {
            criteria: $scope.filterCriteria,
            value: filterValue
          }
        };
      } else {
        return {};
      }
    };
    w.settings || (w.settings = []);
    return w.settings.push(setting);
  }
]);

module.directive('settingChartFilters', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '='
      },
      templateUrl: TemplatePath['analytics/widgets/settings/chart-filters.html'],
      controller: 'SettingChartFiltersCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvc2V0dGluZ3MvY2hhcnQtZmlsdGVycy5qcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZSxvREFBZixFQUFvRSxDQUFDLGtCQUFELENBQXBFOztBQUVULE1BQU0sQ0FBQyxVQUFQLENBQWtCLHlCQUFsQixFQUE2QztFQUFDLFFBQUQsRUFBVyxTQUFDLE1BQUQ7QUFFdEQsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7SUFFWCxPQUFBLEdBQVU7SUFDVixPQUFPLENBQUMsR0FBUixHQUFjO0lBQ2QsT0FBTyxDQUFDLGFBQVIsR0FBd0I7SUFFeEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtNQUNuQixJQUFHLGdDQUFBLElBQTJCLENBQUEsTUFBTSxDQUFDLGNBQVAsR0FBd0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBL0MsQ0FBOUI7UUFDRSxNQUFNLENBQUMsV0FBUCxHQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUM1QyxNQUFNLENBQUMsVUFBUCxHQUFvQixDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUMzQyxNQUFNLENBQUMsV0FBUCxHQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBcEMsQ0FBNEMsSUFBNUMsRUFBaUQsR0FBakQ7UUFFckIsSUFBRyxNQUFNLENBQUMsY0FBUCxLQUF5QixRQUE1QjtVQUNFLE1BQU0sQ0FBQyxxQkFBUCxHQUErQjtVQUMvQixNQUFNLENBQUMsaUJBQVAsR0FBMkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFGcEQ7U0FBQSxNQUFBO1VBSUUsTUFBTSxDQUFDLHFCQUFQLEdBQStCLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1VBQ3RELE1BQU0sQ0FBQyxpQkFBUCxHQUEyQixJQUFJLENBQUMsS0FBTCxDQUFXLE1BQU0sQ0FBQyxXQUFQLEdBQW1CLENBQTlCLEVBTDdCOztlQU1BLE9BQU8sQ0FBQyxhQUFSLEdBQXdCLEtBWDFCOztJQURtQjtJQWNyQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO0FBQ25CLFVBQUE7TUFBQSxJQUFHLDhCQUFIO1FBQ0UsSUFBRyxNQUFNLENBQUMsY0FBUCxLQUF5QixZQUE1QjtVQUNFLFdBQUEsR0FBYyxNQUFNLENBQUMsc0JBRHZCO1NBQUEsTUFBQTtVQUdFLFdBQUEsR0FBYyxNQUFNLENBQUMsa0JBSHZCOztBQUlBLGVBQU87VUFBRSxZQUFBLEVBQWM7WUFBQyxRQUFBLEVBQVUsTUFBTSxDQUFDLGNBQWxCO1lBQWtDLEtBQUEsRUFBTyxXQUF6QztXQUFoQjtVQUxUO09BQUEsTUFBQTtBQU9FLGVBQU8sR0FQVDs7SUFEbUI7SUFVckIsQ0FBQyxDQUFDLGFBQUYsQ0FBQyxDQUFDLFdBQWE7V0FDZixDQUFDLENBQUMsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsT0FBaEI7RUFqQ3NELENBQVg7Q0FBN0M7O0FBb0NBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLHFCQUFqQixFQUF3QztFQUFDLGNBQUQsRUFBaUIsU0FBQyxZQUFEO0FBQ3ZELFdBQU87TUFDTCxRQUFBLEVBQVUsR0FETDtNQUVMLEtBQUEsRUFBTztRQUNMLFlBQUEsRUFBYyxHQURUO09BRkY7TUFLTCxXQUFBLEVBQWEsWUFBYSxDQUFBLCtDQUFBLENBTHJCO01BTUwsVUFBQSxFQUFZLHlCQU5QOztFQURnRCxDQUFqQjtDQUF4QyIsImZpbGUiOiJ3aWRnZXRzL3NldHRpbmdzL2NoYXJ0LWZpbHRlcnMuanMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXRzLXNldHRpbmdzLmNoYXJ0LWZpbHRlcnMnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignU2V0dGluZ0NoYXJ0RmlsdGVyc0N0cmwnLCBbJyRzY29wZScsICgkc2NvcGUpIC0+XG5cbiAgdyA9ICRzY29wZS5wYXJlbnRXaWRnZXRcblxuICBzZXR0aW5nID0ge31cbiAgc2V0dGluZy5rZXkgPSBcImNoYXJ0LWZpbHRlcnNcIlxuICBzZXR0aW5nLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZVxuXG4gIHNldHRpbmcuaW5pdGlhbGl6ZSA9IC0+XG4gICAgaWYgdy5jb250ZW50LmNoYXJ0X2ZpbHRlcj8gJiYgJHNjb3BlLmZpbHRlckNyaXRlcmlhID0gdy5jb250ZW50LmNoYXJ0X2ZpbHRlci5jcml0ZXJpYVxuICAgICAgJHNjb3BlLm1heEVudGl0aWVzID0gdy5jb250ZW50LmNoYXJ0X2ZpbHRlci5tYXhcbiAgICAgICRzY29wZS5lbnRpdHlUeXBlID0gdy5jb250ZW50LmNoYXJ0X2ZpbHRlci5lbnRpdHlfdHlwZVxuICAgICAgJHNjb3BlLmZpbHRlckxhYmVsID0gdy5jb250ZW50LmNoYXJ0X2ZpbHRlci5maWx0ZXJfbGFiZWwucmVwbGFjZSgvXy9nLFwiIFwiKVxuXG4gICAgICBpZiAkc2NvcGUuZmlsdGVyQ3JpdGVyaWEgPT0gXCJudW1iZXJcIlxuICAgICAgICAkc2NvcGUuZmlsdGVyVmFsdWVQZXJjZW50YWdlID0gODBcbiAgICAgICAgJHNjb3BlLmZpbHRlclZhbHVlTnVtYmVyID0gdy5jb250ZW50LmNoYXJ0X2ZpbHRlci52YWx1ZVxuICAgICAgZWxzZVxuICAgICAgICAkc2NvcGUuZmlsdGVyVmFsdWVQZXJjZW50YWdlID0gdy5jb250ZW50LmNoYXJ0X2ZpbHRlci52YWx1ZVxuICAgICAgICAkc2NvcGUuZmlsdGVyVmFsdWVOdW1iZXIgPSBNYXRoLnJvdW5kKCRzY29wZS5tYXhFbnRpdGllcy8yKVxuICAgICAgc2V0dGluZy5pc0luaXRpYWxpemVkID0gdHJ1ZVxuXG4gIHNldHRpbmcudG9NZXRhZGF0YSA9IC0+XG4gICAgaWYgdy5jb250ZW50LmNoYXJ0X2ZpbHRlcj9cbiAgICAgIGlmICRzY29wZS5maWx0ZXJDcml0ZXJpYSA9PSBcInBlcmNlbnRhZ2VcIlxuICAgICAgICBmaWx0ZXJWYWx1ZSA9ICRzY29wZS5maWx0ZXJWYWx1ZVBlcmNlbnRhZ2VcbiAgICAgIGVsc2VcbiAgICAgICAgZmlsdGVyVmFsdWUgPSAkc2NvcGUuZmlsdGVyVmFsdWVOdW1iZXJcbiAgICAgIHJldHVybiB7IGNoYXJ0X2ZpbHRlcjoge2NyaXRlcmlhOiAkc2NvcGUuZmlsdGVyQ3JpdGVyaWEsIHZhbHVlOiBmaWx0ZXJWYWx1ZX0gfVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB7fVxuXG4gIHcuc2V0dGluZ3MgfHw9IFtdXG4gIHcuc2V0dGluZ3MucHVzaChzZXR0aW5nKVxuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnc2V0dGluZ0NoYXJ0RmlsdGVycycsIFsnVGVtcGxhdGVQYXRoJywgKFRlbXBsYXRlUGF0aCkgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiB7XG4gICAgICBwYXJlbnRXaWRnZXQ6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6IFRlbXBsYXRlUGF0aFsnYW5hbHl0aWNzL3dpZGdldHMvc2V0dGluZ3MvY2hhcnQtZmlsdGVycy5odG1sJ10sXG4gICAgY29udHJvbGxlcjogJ1NldHRpbmdDaGFydEZpbHRlcnNDdHJsJ1xuICB9XG5dKSJdfQ==