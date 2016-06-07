angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, $timeout, $modal, $templateCache, ImpacKpisSvc) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
      }
      template: $templateCache.get('kpi/kpi.tmpl.html'),

      controller: ($scope) ->
        $scope.showEditSettings = false
        $scope.showKpiLoader = true

        $scope.kpiTemplates = ImpacKpisSvc.getKpisTemplates()
        $scope.possibleExtraParams = []
        $scope.limit = {}
        $scope.possibleTargets = [
          { label: 'over', mode: 'min' }
          { label: 'below', mode: 'max' }
        ]

        unless $scope.kpi.static
          ImpacKpisSvc.show($scope.kpi).then( (renderedKpi) ->
            angular.extend $scope.kpi, renderedKpi

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
            else
              # set default <select> option value, and show edit mode.
              $scope.kpi.limit = { mode: $scope.possibleTargets[0].mode }
              $scope.displayEditSettings()

            $scope.showKpiLoader = false
          )
        else
          $scope.showKpiLoader = false

        $scope.displayEditSettings = ->
          $scope.showEditSettings = true

        $scope.hideEditSettings = ->
          $scope.showEditSettings = false

        $scope.updateName = ->
          return if _.isEmpty($scope.kpi.name)
          ImpacKpisSvc.update($scope.kpi, { name: $scope.kpi.name })

        $scope.hasValidTarget = ->
          ImpacKpisSvc.validateKpiTarget($scope.kpi)

        $scope.updateSettings = ->
          params = {}
          return unless $scope.hasValidTarget()

          target0 = {}
          target0[$scope.kpi.limit.mode] = $scope.kpi.limit.value
          params.targets = [target0]

          params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)

          ImpacKpisSvc.update($scope.kpi, params) unless _.isEmpty(params)

          $scope.hideEditSettings()

        $scope.cancelUpdateSettings = ->
          $scope.deleteKpi() unless $scope.hasValidTarget()
          # smoother delete transition
          $timeout ()->
            $scope.hideEditSettings()
          , 500

        $scope.deleteKpi = ->
          return if $scope.kpi.static
          ImpacKpisSvc.delete($scope.kpi).then ((success) -> $scope.onDelete())

    }
  )
