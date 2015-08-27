(function () {
var module;

module = angular.module('maestrano.analytics.widgets-common.editable-title', ['maestrano.assets']);

module.controller('CommonEditableTitleCtrl', [
  '$scope', 'DhbAnalyticsSvc', function($scope, DhbAnalyticsSvc) {
    var w;
    w = $scope.parentWidget;
    return $scope.updateName = function() {
      var data;
      if (w.name.length === 0) {
        w.name = w.originalName;
        return "Incorrect name";
      } else {
        data = {
          name: w.name
        };
        return DhbAnalyticsSvc.widgets.update(w, data).then(function(success) {
          w.originalName = w.name;
          return angular.extend(w, success.data);
        }, function() {
          return w.name = w.originalName;
        });
      }
    };
  }
]);

module.directive('commonEditableTitle', [
  'TemplatePath', function(TemplatePath) {
    return {
      restrict: 'A',
      scope: {
        parentWidget: '='
      },
      templateUrl: TemplatePath['analytics/widgets/common/editable-title.html'],
      controller: 'CommonEditableTitleCtrl'
    };
  }
]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvY29tbW9uL2VkaXRhYmxlLXRpdGxlLmpzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlLG1EQUFmLEVBQW1FLENBQUMsa0JBQUQsQ0FBbkU7O0FBRVQsTUFBTSxDQUFDLFVBQVAsQ0FBa0IseUJBQWxCLEVBQ0U7RUFBQyxRQUFELEVBQVcsaUJBQVgsRUFDQSxTQUFDLE1BQUQsRUFBUyxlQUFUO0FBRUUsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUM7V0FFWCxNQUFNLENBQUMsVUFBUCxHQUFvQixTQUFBO0FBQ2xCLFVBQUE7TUFBQSxJQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBUCxLQUFpQixDQUFwQjtRQUNFLENBQUMsQ0FBQyxJQUFGLEdBQVMsQ0FBQyxDQUFDO0FBQ1gsZUFBTyxpQkFGVDtPQUFBLE1BQUE7UUFJRSxJQUFBLEdBQU87VUFBRSxJQUFBLEVBQU0sQ0FBQyxDQUFDLElBQVY7O2VBQ1AsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUF4QixDQUErQixDQUEvQixFQUFpQyxJQUFqQyxDQUFzQyxDQUFDLElBQXZDLENBQ0UsU0FBQyxPQUFEO1VBQ0UsQ0FBQyxDQUFDLFlBQUYsR0FBaUIsQ0FBQyxDQUFDO2lCQUNuQixPQUFPLENBQUMsTUFBUixDQUFlLENBQWYsRUFBa0IsT0FBTyxDQUFDLElBQTFCO1FBRkYsQ0FERixFQUlJLFNBQUE7aUJBQ0EsQ0FBQyxDQUFDLElBQUYsR0FBUyxDQUFDLENBQUM7UUFEWCxDQUpKLEVBTEY7O0lBRGtCO0VBSnRCLENBREE7Q0FERjs7QUFxQkEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIscUJBQWpCLEVBQXdDO0VBQUMsY0FBRCxFQUFpQixTQUFDLFlBQUQ7QUFDdkQsV0FBTztNQUNMLFFBQUEsRUFBVSxHQURMO01BRUwsS0FBQSxFQUFPO1FBQ0wsWUFBQSxFQUFjLEdBRFQ7T0FGRjtNQUtMLFdBQUEsRUFBYSxZQUFhLENBQUEsOENBQUEsQ0FMckI7TUFNTCxVQUFBLEVBQVkseUJBTlA7O0VBRGdELENBQWpCO0NBQXhDIiwiZmlsZSI6IndpZGdldHMvY29tbW9uL2VkaXRhYmxlLXRpdGxlLmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0cy1jb21tb24uZWRpdGFibGUtdGl0bGUnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignQ29tbW9uRWRpdGFibGVUaXRsZUN0cmwnLFxuICBbJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMpIC0+XG5cbiAgICB3ID0gJHNjb3BlLnBhcmVudFdpZGdldFxuXG4gICAgJHNjb3BlLnVwZGF0ZU5hbWUgPSAtPlxuICAgICAgaWYgdy5uYW1lLmxlbmd0aCA9PSAwXG4gICAgICAgIHcubmFtZSA9IHcub3JpZ2luYWxOYW1lXG4gICAgICAgIHJldHVybiBcIkluY29ycmVjdCBuYW1lXCJcbiAgICAgIGVsc2VcbiAgICAgICAgZGF0YSA9IHsgbmFtZTogdy5uYW1lIH1cbiAgICAgICAgRGhiQW5hbHl0aWNzU3ZjLndpZGdldHMudXBkYXRlKHcsZGF0YSkudGhlbihcbiAgICAgICAgICAoc3VjY2VzcyktPlxuICAgICAgICAgICAgdy5vcmlnaW5hbE5hbWUgPSB3Lm5hbWVcbiAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHcsIHN1Y2Nlc3MuZGF0YSlcbiAgICAgICAgICAsIC0+XG4gICAgICAgICAgICB3Lm5hbWUgPSB3Lm9yaWdpbmFsTmFtZVxuICAgICAgICApXG5dKVxuXG5tb2R1bGUuZGlyZWN0aXZlKCdjb21tb25FZGl0YWJsZVRpdGxlJywgWydUZW1wbGF0ZVBhdGgnLCAoVGVtcGxhdGVQYXRoKSAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgIHBhcmVudFdpZGdldDogJz0nXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogVGVtcGxhdGVQYXRoWydhbmFseXRpY3Mvd2lkZ2V0cy9jb21tb24vZWRpdGFibGUtdGl0bGUuaHRtbCddLFxuICAgIGNvbnRyb2xsZXI6ICdDb21tb25FZGl0YWJsZVRpdGxlQ3RybCdcbiAgfVxuXSkiXX0=