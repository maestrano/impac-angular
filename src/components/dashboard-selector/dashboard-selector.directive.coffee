angular
.module('impac.components.dashboard-selector', [])
.directive('dashboardSelector', ($log, $compile, $templateCache, $http, ImpacTheming) ->
  return {
    restrict: 'E'
    scope: {}
    controller: ($scope) ->
      # Accessing parent scope to speed up implementing this component.
      # TODO: refactor methods & variables relating to this component out of the
      #       DashboardCtrl, and into this controller.
      $scope.dhbCtrl = $scope.$parent

      # TODO: These watchers will be REMOVED when the above refactor has been made.
      # adds values to the dhb objects for watching change.
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

      $scope.toogleAccessibilityMode = ->
        $scope.dhbCtrl.accessibility = !$scope.dhbCtrl.accessibility
        angular.forEach $scope.dhbCtrl.currentDhb.widgets, (w) ->
          w.loadContent()

      return $scope

    link: (scope, element, attrs) ->

      options = ImpacTheming.get().dhbSelectorConfig

      scope.isAccessibilityEnabled = options.accessibilityEnabled
      scope.isAddWidgetEnabled = options.addWidgetEnabled
      scope.isAddDhbEnabled = options.addDhbEnabled
      scope.isdeleteDhbEnabled = options.deleteDhbEnabled

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

      # gets custom template from local path, returns as string.
      getCustomTemplate = ->
        $http.get(selectorTemplate, {cache: $templateCache}).then(
          (tmplContent) ->
            if !tmplContent or !tmplContent.data or !tmplContent.data.length
              $log.warn 'dashboardSelector custom template: no content found'
            _compile(tmplContent.data)
          (err) ->
            $log.error 'Error retrieving custom template: ', err
        )

      # gets template string from templateCache
      getTemplate = ->
        _compile($templateCache.get(selectorTemplate))

      # compiles html string to element
      _compile = (htmlString) ->
        element.html(htmlString).show()
        $compile(element.contents())(scope)

      if customUrl then getCustomTemplate() else getTemplate()
  }
)


