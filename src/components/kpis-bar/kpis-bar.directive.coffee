angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', ($log, $http, $compile, $templateCache, ImpacKpisSvc, ImpacTheming) ->
    return {
      restrict: 'E'
      scope: {
        kpis: '='
      }
      controller: ($scope, $timeout, $log) ->
        $scope.hideAvailableKpis = true
        $scope.showKpisExpanded = false
        $scope.showEditMode = false
        $scope.isAddingKPI = false

        # references to services (bound objects shared between all controllers)
        # -------------------------------------
        $scope.availableKpis = ImpacKpisSvc.getKpisTemplates()

        # $scope.keyStats = [
        #   { name: 'Interest', data: { value: '-15.30', unit: '%' }, static: true },
        #   { name: 'Profitability', data: { value: '8.34', unit: '%' }, static: true},
        #   { name: 'Cost of capital', data: { value: '20.00', unit: 'AUD' }, static: true},
        #   { name: 'TAX % based on FY14', data: { value: '29.91', unit: '%' }, static: true},
        #   { name: 'Super', data: { value: '479023', unit: 'AUD' }, static: true}
        # ]

        $scope.toggleAvailableKpis = ->
          $scope.hideAvailableKpis = !$scope.hideAvailableKpis

        $scope.formatKpiName = (endpoint) ->
          endpoint_splitted = endpoint.split('/')
          name = endpoint_splitted[0] + ' | ' + endpoint_splitted.slice(1,endpoint_splitted.length).join(' ')
          name = name.replace('_', ' ')
          return name

        $scope.addKpi = (kpi) ->
          $scope.isAddingKPI = true
          ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched).then(
            (success) ->
              $scope.kpis.push(success)
            (error) ->
              $log.error("Impac Kpis bar can't add a kpi", error)
          ).finally(-> $scope.isAddingKPI = false)

        $scope.removeKpi = (kpiId) ->
          $scope.kpis = _.remove($scope.kpis, (kpi) ->
            kpi.id != kpiId
          )

        $scope.toggleEditMode = ->
          $scope.showEditMode = !$scope.showEditMode
      link: (scope, element, attrs)->
        options = ImpacTheming.get().dhbKpisConfig.kpisBar
        customUrl = options.customTmplPath
        originUrl = 'kpis-bar/kpis-bar.tmpl.html'

        # gets custom template from local path, returns as string.
        getCustomTemplate = (templateUrl)->
          $http.get(templateUrl, {cache: $templateCache}).then(
            (tmplContent) ->
              if !tmplContent or !tmplContent.data or !tmplContent.data.length
                $log.warn 'custom template: no content found'
              _compile(tmplContent.data)
            (err) ->
              $log.error 'Error retrieving custom template: ', err
          )

        # gets template string from templateCache
        getTemplate = (templateUrl)->
          _compile($templateCache.get(templateUrl))

        # compiles html string to element
        _compile = (htmlString) ->
          element.html(htmlString).show()
          $compile(element.contents())(scope)

        if customUrl then getCustomTemplate(customUrl) else getTemplate(originUrl)

        return null
    }
  )
