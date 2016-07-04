angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, $timeout, $modal, $templateCache, ImpacKpisSvc, ImpacEvents, IMPAC_EVENTS) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
      }
      template: $templateCache.get('kpi/kpi.tmpl.html'),

      controller: ($scope) ->
        # Load
        # -------------------------
        $scope.kpiTemplates = ImpacKpisSvc.getKpisTemplates()
        $scope.possibleExtraParams = []
        $scope.targets = {}
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

            watchablesWithoutTargets = false
            _.forEach($scope.kpi.watchables, (watchable)->
              if _.isEmpty (existingTargets = $scope.getTargets(watchable))
                # No targets found - initialise a target form model for watchable
                $scope.addTargetToWatchable(watchable)
                watchablesWithoutTargets = true
              else
                # Targets found - bind existing targets to the form model
                $scope.targets[watchable] = angular.copy(existingTargets)
            )
            # All watchables must have at least one target.
            $scope.displayEditSettings() if watchablesWithoutTargets
          )


        onUpdateSettingsCb = (force)-> $scope.updateSettings() if $scope.kpi.isEditing || force

        ImpacEvents.registerCb(IMPAC_EVENTS.kpisBarUpdateSettings, onUpdateSettingsCb)

        $scope.$on('$destroy', ()->
          ImpacEvents.deregisterCb(IMPAC_EVENTS.kpisBarUpdateSettings, onUpdateSettingsCb)
        )

        # Linked methods
        # -------------------------
        $scope.addTargetToWatchable = (watchable)->
          (newTarget = {})[$scope.getTargetPlaceholder(watchable).mode] = ''
          ($scope.targets[watchable] ||= []).push(newTarget)

        $scope.displayEditSettings = ->
          $scope.kpi.isEditing = true

        $scope.hideEditSettings = ->
          $scope.kpi.isEditing = false

        $scope.hasValidTargets = ->
          ImpacKpisSvc.validateKpiTargets($scope.targets)

        $scope.updateSettings = ->
          params = {}
          touched = (form = $scope["kpi#{$scope.kpi.id}SettingsForm"]) && form.$dirty
          hasValidTargets = $scope.hasValidTargets()
          return $scope.cancelUpdateSettings(hasValidTargets) unless touched && hasValidTargets

          params.targets = $scope.targets
          params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)

          ImpacKpisSvc.update($scope.kpi, params) unless _.isEmpty(params)
          form.$setPristine()
          # smoother update transition
          $timeout ->
            $scope.hideEditSettings()
          , 200

        $scope.cancelUpdateSettings = (hasValidTargets)->
          return $scope.deleteKpi() unless hasValidTargets
          # Update is cancelled, reset the targets to the last saved values stored on the kpi.
          $scope.targets = angular.copy($scope.kpi.targets)
          # smoother delete transition
          $timeout ->
            $scope.hideEditSettings()
          , 200

        $scope.deleteKpi = ->
          return if $scope.kpi.static
          ImpacKpisSvc.delete($scope.kpi).then ((success) -> $scope.onDelete())

        $scope.isTriggered = ->
          $scope.kpi.layout? && $scope.kpi.layout.triggered

        $scope.isEditing = ->
          $scope.kpi.isEditing || $scope.editMode

        $scope.getFormTargetValueInput = (watchable, targetIndex)->
          $scope["kpi#{$scope.kpi.id}SettingsForm"]["#{watchable}TargetValue#{targetIndex}"]

        $scope.getTargets = (watchable)->
          ($scope.kpi.targets? && $scope.kpi.targets[watchable]) || []

        $scope.getTargetUnit = (watchable)->
          unit = ($scope.kpi.data? && $scope.kpi.data[watchable].unit) || $scope.getTargetPlaceholder(watchable).unit || ''
          if unit == 'currency' then ImpacKpisSvc.getCurrentDashboard().currency else unit

        $scope.getTargetPlaceholder = (watchable)->
          ImpacKpisSvc.getKpiTargetPlaceholder($scope.kpi.endpoint, watchable)

        # Add / remove placeholder for impac-material nice-ness.
        $scope.bindTargetInputPlaceholder = (watchable, targetIndex)->
          $scope["#{watchable}TargetPlaceholder#{targetIndex}"] ||= ''

        $scope.setTargetInputPlaceholder = (watchable, targetIndex)->
          $scope["#{watchable}TargetPlaceholder#{targetIndex}"] = $scope.getTargetPlaceholder(watchable).value || ''

        $scope.resetTargetInputPlaceholder = (watchable, targetIndex)->
          $scope["#{watchable}TargetPlaceholder#{targetIndex}"] = ''

    }
  )
