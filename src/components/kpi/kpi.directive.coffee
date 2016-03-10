angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, $http, $compile, $templateCache, ImpacKpisSvc, ImpacTheming) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
      }
      controller: ($scope) ->
        $scope.showEditSettings = false

        $scope.kpiTemplates = ImpacKpisSvc.getKpisTemplates()
        $scope.possibleExtraParams = []
        $scope.limit = {}
        $scope.possibleTargets = [
          { label: 'over', mode: 'min' }
          { label: 'below', mode: 'max' }
        ]

        unless $scope.kpi.static
          ImpacKpisSvc.show($scope.kpi).then(
            (success) ->
              # Get the corresponding template of the KPI loaded
              kpiTemplate = _.find $scope.kpiTemplates, (aKpi) ->
                aKpi.endpoint == $scope.kpi.endpoint

              # If the template contains extra params we add it to the KPI
              if kpiTemplate? && kpiTemplate.extra_params?
                $scope.kpi.possibleExtraParams = kpiTemplate.extra_params

              $scope.kpi.targets ||= []
              if !_.isEmpty($scope.kpi.targets[0])
                $scope.kpi.limit = {} if !$scope.kpi.limit?
                $scope.kpi.limit.mode = _.keys($scope.kpi.targets[0])[0]
                $scope.kpi.limit.value = _.values($scope.kpi.targets[0])[0]
          )

        $scope.displayEditSettings = ->
          $scope.showEditSettings = true

        $scope.hideEditSettings = ->
          $scope.showEditSettings = false

        $scope.updateName = ->
          return if _.isEmpty($scope.kpi.name)
          ImpacKpisSvc.update($scope.kpi, { name: $scope.kpi.name })

        $scope.updateSettings = ->
          params = {}
          if !(_.isEmpty $scope.kpi.limit.value || _.isEmpty $scope.kpi.limit.mode)
            target0 = {}
            target0[$scope.kpi.limit.mode] = $scope.kpi.limit.value
            params.targets = [target0]
          params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)

          ImpacKpisSvc.update($scope.kpi, params) unless _.isEmpty(params)

          $scope.hideEditSettings()

        $scope.deleteKpi = ->
          return if $scope.kpi.static
          ImpacKpisSvc.delete($scope.kpi).then ((success) -> $scope.onDelete())

      link: (scope, element, attrs)->
        options = ImpacTheming.get().dhbKpisConfig.kpi
        customUrl = options.customTmplPath
        originUrl = 'kpi/kpi.tmpl.html'

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
