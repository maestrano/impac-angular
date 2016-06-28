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
          { label: 'below', mode: 'min' }
          { label: 'over', mode: 'max' }
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

            if !_.isEmpty $scope.getTargets()
              $scope.kpi.limit = {} if !$scope.kpi.limit?
              $scope.kpi.limit.mode = _.keys($scope.getTargets()[0])[0]
              $scope.kpi.limit.value = _.values($scope.getTargets()[0])[0]
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
          touched = (form = $scope["kpi#{$scope.kpi.id}SettingsForm"]).$dirty
          return $scope.cancelUpdateSettings() unless touched && $scope.hasValidTarget()

          target0 = {}
          target0[$scope.kpi.limit.mode] = $scope.kpi.limit.value

          params.targets = {}
          params.targets[$scope.kpi.element_watched] = [target0]
          params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)

          ImpacKpisSvc.update($scope.kpi, params) unless _.isEmpty(params)
          form.$setPristine()
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

        $scope.getTargetUnit = ->
          unit = ($scope.kpi.data? && $scope.kpi.data[$scope.kpi.element_watched].unit) || $scope.getTargetPlaceholder().unit || ''
          if unit == 'currency' then ImpacKpisSvc.getCurrentDashboard().currency else unit

        $scope.getTargetValue = ->
          $scope.getTargetPlaceholder().value || ''

        $scope.getTargetMode = ->
          $scope.getTargetPlaceholder().mode || $scope.possibleTargets[0].mode

        $scope.getTargetModeLabel = ->
          _.find($scope.possibleTargets, (pt)-> pt.mode == $scope.getTargetMode()).label

        # TODO several watchables?
        $scope.getTargets = ->
          ($scope.kpi.targets? && $scope.kpi.targets[$scope.kpi.element_watched]) || []

        $scope.isEditing = ->
          $scope.kpiEditSettings.isEditing || $scope.editMode

        $scope.getTargetPlaceholder = ->
          ImpacKpisSvc.getKpiTargetPlaceholder($scope.kpi.endpoint, $scope.kpi.element_watched)

        # Add / remove placeholder for impac-material nice-ness.
        $scope.targetPlaceholder = ''
        $scope.setTargetPlaceholder = ->
          $scope.targetPlaceholder = $scope.getTargetValue()

        $scope.resetTargetPlaceholder = ->
          $scope.targetPlaceholder = ''

    }
  )
