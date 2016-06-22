angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, $timeout, $modal, $templateCache, ImpacKpisSvc) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
        kpiEditSettings: '='
      }
      template: $templateCache.get('kpi/kpi.tmpl.html'),

      controller: ($scope) ->
        # Load
        # -------------------------
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

            $scope.kpi.name = kpiTemplate.name

            # If the template contains extra params we add it to the KPI
            if kpiTemplate? && kpiTemplate.extra_params?
              $scope.kpi.possibleExtraParams = kpiTemplate.extra_params

            if !_.isEmpty $scope.getKpiTargets()
              $scope.kpi.limit = {} if !$scope.kpi.limit?
              $scope.kpi.limit.mode = _.keys($scope.getKpiTargets()[0])[0]
              $scope.kpi.limit.value = _.values($scope.getKpiTargets()[0])[0]
            else
              # set default <select> option value, and show edit mode.
              $scope.kpi.limit = { mode: $scope.getTargetMode() }
              $scope.displayEditSettings()
          )


        # Linked methods
        # -------------------------
        $scope.displayEditSettings = ->
          $scope.kpiEditSettings.isEditing = true

        $scope.hideEditSettings = ->
          $scope.kpiEditSettings.isEditing = false

        $scope.hasValidTarget = ->
          ImpacKpisSvc.validateKpiTarget($scope.kpi)

        $scope.updateSettings = ->
          params = {}
          return $scope.cancelUpdateSettings() unless $scope.hasValidTarget()

          target0 = {}
          target0[$scope.kpi.limit.mode] = $scope.kpi.limit.value

          params.targets = {}
          params.targets[$scope.kpi.element_watched] = [target0]
          params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)

          ImpacKpisSvc.update($scope.kpi, params) unless _.isEmpty(params)

          # smoother update transition
          $timeout ->
            $scope.hideEditSettings()
          , 500


        # Register callback accessible by parent (kpi-bar).
        $scope.kpiEditSettings = { isEditing: false, callback: $scope.updateSettings }

        $scope.cancelUpdateSettings = ->
          $scope.deleteKpi() unless $scope.hasValidTarget() || $scope.kpi.isLoading
          # smoother delete transition
          $timeout ->
            $scope.hideEditSettings()
          , 500

        $scope.deleteKpi = ->
          return if $scope.kpi.static
          ImpacKpisSvc.delete($scope.kpi).then ((success) -> $scope.onDelete())

        $scope.isTriggered = ->
          $scope.kpi.layout? && $scope.kpi.layout.triggered

        $scope.getKpiTargetUnit = ->
          unit = ($scope.kpi.data? && $scope.kpi.data[$scope.kpi.element_watched].unit) || $scope.getTargetPlaceholder().unit || ''
          if unit == 'currency' then ImpacKpisSvc.getCurrentDashboard().currency else unit

        $scope.getKpiTargetValue = ->
          $scope.getTargetPlaceholder().value || ''

        $scope.getTargetMode = ->
          $scope.getTargetPlaceholder().mode || $scope.possibleTargets[0].mode

        # TODO several watchables?
        $scope.getKpiTargets = ->
          ($scope.kpi.targets? && $scope.kpi.targets[$scope.kpi.element_watched]) || []

        $scope.isEditing = ->
          $scope.kpiEditSettings.isEditing || $scope.editMode

        $scope.getTargetPlaceholder = ->
          templ = ImpacKpisSvc.getKpiTemplate($scope.kpi.endpoint)
          ((templ? && templ.target_placeholders?) && templ.target_placeholders[$scope.kpi.element_watched]) || {}

    }
  )
