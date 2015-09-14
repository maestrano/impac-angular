angular
.module('impac.components.dashboard-selector', [])
.directive('dashboardSelector', ($compile, $templateCache, ImpacTheming) ->
  return {
    restrict: 'E'
    scope: {}
    controller: ($scope) ->
      # Accessing parent scope to speed up implementing this component.
      # TODO: refactor methods & variables relating to dashboard controls out of the
      #       dashboard controller into this controller, and children directive wrappers.
      $scope.dhbCtrl = $scope.$parent

      # TODO: These watchers will be REMOVED when the above refactor has been made.
      # They add values to the dhb objects for watching change.
      $scope.$watch('dhbCtrl.dashboardsList', (dashboards) ->
        return if !dashboards or !dashboards.length
        _.forEach(dashboards, (dhb) ->
          dhb.active = false
        )
      )

      # Sets tab as 'active' when creating a new dashboard
      $scope.$watch('dhbCtrl.currentDhbId', (newVal) ->
        return unless newVal
        _.forEach($scope.dhbCtrl.dashboardsList, (dhb) ->
          dhb.active = true if dhb.id == newVal
        )
      , true)

      return $scope

    link: (scope, element, attrs) ->

      options = ImpacTheming.getDhbSelectorConfig()

      if !!options.customTmplPath
        customUrl = options.customTmplPath
      else
        scope.selectorType = options.selectorType

      selectorTemplate = null

      setTemplate = (path) ->
        selectorTemplate = path

      switch scope.selectorType
        when 'dropdown' then setTemplate('dashboard-selector/dropdown.tmpl.html')
        when 'tabs' then setTemplate('dashboard-selector/bootstrap-tabs.tmpl.html')
        when 'pills' then setTemplate('dashboard-selector/bootstrap-tabs.tmpl.html')
        else setTemplate(customUrl)

      element.html($templateCache.get(selectorTemplate)).show()
      $compile(element.contents())(scope)
  }
)
