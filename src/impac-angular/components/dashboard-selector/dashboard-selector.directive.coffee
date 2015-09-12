module = angular.module('impac.components.dashboard-selector', [])

module.directive('dashboardSelector', () ->
  return {
    restrict: 'A'
    scope: {
      type: '@' # selector type | defaults 'dropdown'
    }
    controller: ($scope) ->
      # Accesses parent scope to speed up implementing this component.
      # todo: refactor methods & variables relating to dashboard selection out of the
      #       dashboard controller into this controller.
      $scope.parentScope = $scope.$parent

    link: (scope, element) ->

      defaultTmpl = 'dashboard-selector/dropdown.tmpl.html'

      setTemplate = (path) ->
        scope.templateUrl = path

      setClasses = (x, y, scrolling) ->
        scope.scrolling = scrolling

        element.addClass('col-md-' + x)

        $actionsContainer = angular.element(document.getElementById('dashboard-actions'))
        $actionsContainer.addClass('col-md-' + y)

      switch scope.type
        when 'dropdown'
          setClasses(6, 6)
          setTemplate(defaultTmpl)
        when 'tabs' || 'pills'
          setClasses(8, 4, true)
          setTemplate('dashboard-selector/bootstrap-tabs.tmpl.html')
        else
          scope.type = 'dropdown'
          setClasses(6, 6)
          setTemplate(defaultTmpl)

    template: '<div ng-include="templateUrl" id="module__dashboard-selector"></div>'
  }
)
