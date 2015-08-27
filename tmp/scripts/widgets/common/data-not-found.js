(function () {
var module;

module = angular.module('maestrano.analytics.widgets-common.data-not-found', ['maestrano.assets']);

module.directive('commonDataNotFound', [
  'TemplatePath', 'AssetPath', function(TemplatePath, AssetPath) {
    return {
      restrict: 'A',
      scope: {
        widgetEngine: '='
      },
      templateUrl: TemplatePath['analytics/widgets/common/data-not-found.html'],
      link: function(scope, element) {
        var bgImagePath;
        bgImagePath = ["impac/data_not_found", scope.widgetEngine].join('/');
        return scope.bgImage = AssetPath[[bgImagePath, "png"].join('.')];
      }
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvY29tbW9uL2RhdGEtbm90LWZvdW5kLmpzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLG1EQUFmLEVBQW1FLENBQUMsa0JBQUQsQ0FBbkU7O0FBRVQsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsb0JBQWpCLEVBQXVDO0VBQUMsY0FBRCxFQUFpQixXQUFqQixFQUE4QixTQUFDLFlBQUQsRUFBZSxTQUFmO0FBQ25FLFdBQU87TUFDTCxRQUFBLEVBQVUsR0FETDtNQUVMLEtBQUEsRUFBTztRQUNOLFlBQUEsRUFBYyxHQURSO09BRkY7TUFLTCxXQUFBLEVBQWEsWUFBYSxDQUFBLDhDQUFBLENBTHJCO01BTUwsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVI7QUFDTCxZQUFBO1FBQUEsV0FBQSxHQUFjLENBQUMsc0JBQUQsRUFBd0IsS0FBSyxDQUFDLFlBQTlCLENBQTJDLENBQUMsSUFBNUMsQ0FBaUQsR0FBakQ7ZUFDZCxLQUFLLENBQUMsT0FBTixHQUFnQixTQUFVLENBQUEsQ0FBQyxXQUFELEVBQWEsS0FBYixDQUFtQixDQUFDLElBQXBCLENBQXlCLEdBQXpCLENBQUE7TUFGckIsQ0FORDs7RUFENEQsQ0FBOUI7Q0FBdkMiLCJmaWxlIjoid2lkZ2V0cy9jb21tb24vZGF0YS1ub3QtZm91bmQuanMuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnbWFlc3RyYW5vLmFuYWx5dGljcy53aWRnZXRzLWNvbW1vbi5kYXRhLW5vdC1mb3VuZCcsWydtYWVzdHJhbm8uYXNzZXRzJ10pXG5cbm1vZHVsZS5kaXJlY3RpdmUoJ2NvbW1vbkRhdGFOb3RGb3VuZCcsIFsnVGVtcGxhdGVQYXRoJywgJ0Fzc2V0UGF0aCcsIChUZW1wbGF0ZVBhdGgsIEFzc2V0UGF0aCkgLT5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHNjb3BlOiB7XG4gICAgXHR3aWRnZXRFbmdpbmU6ICc9J1xuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6IFRlbXBsYXRlUGF0aFsnYW5hbHl0aWNzL3dpZGdldHMvY29tbW9uL2RhdGEtbm90LWZvdW5kLmh0bWwnXSxcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQpIC0+XG4gICAgXHRiZ0ltYWdlUGF0aCA9IFtcImltcGFjL2RhdGFfbm90X2ZvdW5kXCIsc2NvcGUud2lkZ2V0RW5naW5lXS5qb2luKCcvJylcbiAgICBcdHNjb3BlLmJnSW1hZ2UgPSBBc3NldFBhdGhbW2JnSW1hZ2VQYXRoLFwicG5nXCJdLmpvaW4oJy4nKV1cbiAgfVxuXSkiXX0=