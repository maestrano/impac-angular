module = angular.module('impac.components.dashboard-controls', [])

module.directive('dashboardControls', ($templateCache) ->
  return {
    restrict: 'E'
    scope: {
      type: '@' # selector type | defaults 'dropdown'
    }
    controller: ($scope) ->
      # Accesses parent scope to speed up implementing this component.
      # todo: refactor methods & variables relating to dashboard controls out of the
      #       dashboard controller into this controller, and children directive wrappers
      $scope.dhbCtrl = $scope.$parent

      # TODO: These watchers will be removed when the above refactor has been made.
      # sets default values for bootstrap tabs directive to watch for change.
      $scope.$watch('dhbCtrl.dashboardsList', (dashboards) ->
        return if !dashboards or !dashboards.length
        _.forEach(dashboards, (dhb) ->
          dhb.active = false
        )
      )

      # For setting active tab on dashboard create
      $scope.$watch('dhbCtrl.currentDhbId', (newVal) ->
        return unless newVal
        _.forEach($scope.dhbCtrl.dashboardsList, (dhb) ->
          dhb.active = true if dhb.id == newVal
        )
      , true)

      return $scope


    link: (scope, element) ->
      defaultTmpl = 'dashboard-controls/dropdown.tmpl.html'

      setTemplate = (path) ->
        scope.selectorTmpl = path

      setClasses = (x, y, scrolling) ->
        scope.scrolling = scrolling
        $dashboardSelector = angular.element(document.getElementById('dashboard-selector'))
        $dashboardSelector.addClass('col-md-' + x)
        $actionsContainer = angular.element(document.getElementById('dashboard-actions'))
        $actionsContainer.addClass('col-md-' + y)

      switch scope.type
        when 'dropdown'
          setClasses(6, 6)
          setTemplate(defaultTmpl)
        when 'tabs'
          setClasses(8, 4, true)
          setTemplate('dashboard-controls/bootstrap-tabs.tmpl.html')
        when 'pills'
          setClasses(8, 4, true)
          setTemplate('dashboard-controls/bootstrap-tabs.tmpl.html')
        else
          scope.type = 'dropdown'
          setClasses(6, 6)
          setTemplate(defaultTmpl)

    template: $templateCache.get('dashboard-controls/dashboard-controls.tmpl.html')
  }
)
