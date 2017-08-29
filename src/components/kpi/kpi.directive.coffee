angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, $timeout, $templateCache, ImpacKpisSvc, ImpacEvents, IMPAC_EVENTS, $translate) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
        loadReady: '='
      }
      template: $templateCache.get('kpi/kpi.tmpl.html'),

      controller: ($scope, $element) ->
        # Private Methods
        # -------------------------
        fetchKpiData = ->
          ImpacKpisSvc.show($scope.kpi).then((response)->

            applyFetchedData(response)

            # Extra Params
            # Get the corresponding template of the KPI loaded
            kpiTemplate = ImpacKpisSvc.getKpiTemplate($scope.kpi.endpoint, $scope.kpi.element_watched)
            # Set the kpi name from the template
            $scope.kpi.name = kpiTemplate? && kpiTemplate.name
            # If the template contains extra params we add it to the KPI
            if kpiTemplate? && kpiTemplate.extra_params?
              $scope.kpi.possibleExtraParams = kpiTemplate.extra_params
              # Init the extra params select boxes with the first param
              _.forIn($scope.kpi.possibleExtraParams, (paramValues, param)->
                ($scope.kpi.extra_params ||= {})[param] = paramValues[0].id if paramValues[0]
              )

            # Targets
            watchablesWithoutTargets = false
            _.forEach($scope.kpi.watchables, (watchable)->
              # No targets found - initialise a target form model for watchable
              if _.isEmpty (existingTargets = $scope.getTargets(watchable))
                $scope.addTargetToWatchable(watchable)
                watchablesWithoutTargets = true

              # Targets found - bind existing targets to the form model
              else
                $scope.targets[watchable] = angular.copy(existingTargets)
            )
            # All watchables must have at least one target.
            $scope.displayEditSettings() if watchablesWithoutTargets
          )

        onUpdateSettingsCb = (force)-> $scope.updateSettings() if $scope.kpi.isEditing || force

        onToggleSettingsCb = -> animateKpiPanels()

        onUpdateDatesCb = -> fetchKpiData() unless $scope.kpi.static

        applyFetchedData = (response)->
          # Calculation
          $scope.kpi.data = response.data.kpi.calculation

          # Configuration
          # When the kpi initial configuration is partial, we update it with what the API has picked by default
          updatedConfig = response.data.kpi.configuration || {}
          missingParams = _.select(['targets','extra_params'], (param) -> !$scope.kpi[param]? && updatedConfig[param]?)
          angular.extend $scope.kpi, _.pick(updatedConfig, missingParams)

          # Layout
          $scope.kpi.layout = response.data.kpi.layout

        applyPlaceholderValues = ->
          _.forEach($scope.kpi.watchables, (watchable)->
            data = $scope.getTargetPlaceholder(watchable)
            (target = {})[data.mode] = data.value
            $scope.targets[watchable] = [target]
          )
          $scope.updateSettings(true)

        animateKpiPanels = ()->
          element = angular.element($element).find('.kpi-content')
          return unless element
          # Hides kpi-content while ngShow/ngHide is switching
          element.animate({opacity: 0}, 0)
          # Makes it reappear after switching
          $timeout ->
            element.animate({opacity: 1}, 150)
          , 200

        # Load
        # -------------------------
        $scope.kpiTemplates = ImpacKpisSvc.getKpisTemplates()
        $scope.possibleExtraParams = []
        $scope.targets = {}
        $scope.possibleTargets = [
          { label: $translate.instant('impac.kpi.below'), mode: 'min' }
          { label: $translate.instant('impac.kpi.over'), mode: 'max' }
        ]

        $scope.kpi.isLoading = true
        $scope.loadReady.promise.then(->
          unless $scope.kpi.static
            fetchKpiData().finally(-> $scope.kpi.isLoading = false)
          else
            $scope.kpi.isLoading = false
        )

        ImpacEvents.registerCb(IMPAC_EVENTS.kpisBarUpdateSettings, onUpdateSettingsCb)
        ImpacEvents.registerCb(IMPAC_EVENTS.kpisBarToggleSettings, onToggleSettingsCb)
        ImpacEvents.registerCb(IMPAC_EVENTS.kpisBarUpdateDates , onUpdateDatesCb)

        $scope.$on('$destroy', ()->
          ImpacEvents.deregisterCb(IMPAC_EVENTS.kpisBarUpdateSettings, onUpdateSettingsCb)
          ImpacEvents.deregisterCb(IMPAC_EVENTS.kpisBarToggleSettings, onToggleSettingsCb)
          ImpacEvents.deregisterCb(IMPAC_EVENTS.kpisBarUpdateDates, onUpdateDatesCb)
        )

        # Linked methods
        # -------------------------
        $scope.addTargetToWatchable = (watchable)->
          return if _.has($scope.targets, watchable)
          (newTarget = {})[$scope.getTargetPlaceholder(watchable).mode] = ''
          ($scope.targets[watchable] ||= []).push(newTarget)

        $scope.displayEditSettings = ->
          $scope.kpi.isEditing = true

        $scope.hideEditSettings = ->
          $scope.kpi.isEditing = false

        $scope.hasValidTargets = ->
          ImpacKpisSvc.validateKpiTargets($scope.targets)

        $scope.hasContent = ->
          !!($scope.kpi && $scope.kpi.layout && $scope.kpi.data)

        $scope.showKpiContent = ->
          !$scope.isLoading() && $scope.hasContent()

        $scope.isDataNotFound = ->
          !$scope.hasContent()

        $scope.isLoading = ->
          $scope.kpi.isLoading

        $scope.updateExtraParam = ->
          $scope.updateSettings(true)

        $scope.updateSettings = (force)->
          params = {}
          touched = (form = $scope["kpi#{$scope.kpi.id}SettingsForm"]) && form.$dirty
          hasValidTargets = $scope.hasValidTargets()

          return $scope.cancelUpdateSettings(hasValidTargets) unless touched && hasValidTargets || force

          params.targets = $scope.targets
          params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)

          unless _.isEmpty(params)
            ImpacKpisSvc.update($scope.kpi, params).then(
              (response)->
                applyFetchedData(response)
            )
          form.$setPristine()
          # smoother update transition
          $timeout ->
            $scope.hideEditSettings()
          , 200

        $scope.cancelUpdateSettings = (hasValidTargets)->
          if _.isEmpty $scope.kpi.targets
            # Uses the kpi templates placeholder recommendations as values
            applyPlaceholderValues()
          else
            # Update is cancelled, reset the targets to the last saved values stored on the kpi.
            $scope.targets = angular.copy($scope.kpi.targets)
          # smoother delete transition
          $timeout ->
            $scope.hideEditSettings()
          , 200

        $scope.deleteKpi = ->
          return if $scope.kpi.static
          $scope.kpi.isLoading = true
          ImpacKpisSvc.delete($scope.kpi).then((success) -> $scope.onDelete()).finally(-> $scope.kpi.isLoading = false)

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

        $scope.getRealValue = ->
          kpi = $scope.kpi
          return "" if _.isEmpty(kpi.data)
          value = kpi.data[kpi.watchables[0]].value
          unit = kpi.data[kpi.watchables[0]].unit
          [value, unit].join(' ').trim()

        # Add / remove placeholder for impac-material nice-ness.
        $scope.bindTargetInputPlaceholder = (watchable, targetIndex)->
          $scope["#{watchable}TargetPlaceholder#{targetIndex}"] ||= ''

        $scope.setTargetInputPlaceholder = (watchable, targetIndex)->
          $scope["#{watchable}TargetPlaceholder#{targetIndex}"] = $scope.getTargetPlaceholder(watchable).value || ''

        $scope.resetTargetInputPlaceholder = (watchable, targetIndex)->
          $scope["#{watchable}TargetPlaceholder#{targetIndex}"] = ''

        $scope.onKeyPress = (keyEvent) ->
          if keyEvent.which == 13
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpiPressEnterButton)

    }
  )
