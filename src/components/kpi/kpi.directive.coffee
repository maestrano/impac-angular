angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, $timeout, $templateCache, $translate, ImpacKpisSvc, ImpacEvents, IMPAC_EVENTS, MNO_CURRENCIES) ->
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
          ImpacKpisSvc.show($scope.kpi).then(
            (kpiData)->
              ImpacKpisSvc.applyFetchedDataToDhbKpi($scope.kpi, kpiData)
              initTargetsForm(true)
          )

        onUpdateSettingsCb = (force)->
          $scope.updateSettings() if $scope.kpi.isEditing || force

        onToggleSettingsCb = ->
          initTargetsForm()
          animateKpiPanels()

        onUpdateDatesCb = ->
          fetchKpiData() unless $scope.kpi.static

        applyPlaceholderValues = ->
          _.each $scope.kpi.watchables, (watchable)->
            data = $scope.getTargetPlaceholder(watchable)
            (target = {})[data.mode] = data.value
            $scope.targets[watchable] = [target]
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

        initTargetsForm = (toggleKpiIsEditing = false)->
          if _.isEmpty($scope.kpi.targets)
            _.each $scope.kpi.watchables, (watchable)->
              (newTarget = {})[$scope.getTargetPlaceholder(watchable).mode] = ''
              ($scope.targets[watchable] ||= []).push(newTarget)
            displayEditSettings() if toggleKpiIsEditing
          else
            $scope.targets = angular.copy($scope.kpi.targets)

        displayEditSettings = ->
          $scope.kpi.isEditing = true

        hideEditSettings = ->
          $scope.kpi.isEditing = false

        hasContent = ->
          !!($scope.kpi && $scope.kpi.layout && $scope.kpi.data)

        hasValidTargets = ->
          ImpacKpisSvc.validateKpiTargets($scope.targets)

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

        $scope.showKpiContent = ->
          !$scope.isLoading() && hasContent()

        $scope.isDataNotFound = ->
          !hasContent()

        $scope.isLoading = ->
          $scope.kpi.isLoading

        $scope.updateExtraParam = ->
          $scope.updateSettings(true)

        $scope.updateSettings = (force)->
          params = { targets: {} }
          touched = (form = $scope["kpi#{$scope.kpi.id}SettingsForm"]) && form.$dirty

          return $scope.cancelUpdateSettings(hasValidTargets()) unless touched && hasValidTargets() || force

          # Apply targets to params, adding dashboard currency as target base currency
          _.each($scope.targets, (targets, watchable)->
            curr = ImpacKpisSvc.getCurrentDashboard().currency
            params.targets[watchable] = _.map(targets, (t)-> angular.merge(t, currency: curr))
          )
          params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)

          unless _.isEmpty(params)
            ImpacKpisSvc.update($scope.kpi, params).then(
              (kpiData)->
                ImpacKpisSvc.applyFetchedDataToDhbKpi($scope.kpi, kpiData)
            )
          form.$setPristine()
          # smoother update transition
          $timeout ->
            hideEditSettings()
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
            hideEditSettings()
          , 200

        $scope.deleteKpi = ->
          return if $scope.kpi.static
          $scope.kpi.isLoading = true
          ImpacKpisSvc.delete($scope.kpi).then((success) -> $scope.onDelete()).finally(-> $scope.kpi.isLoading = false)

        $scope.isEditing = ->
          $scope.kpi.isEditing || $scope.editMode

        $scope.getFormTargetValueInput = (watchable, targetIndex)->
          $scope["kpi#{$scope.kpi.id}SettingsForm"]["#{watchable}TargetValue#{targetIndex}"]

        $scope.getTargetUnit = (watchable)->
          unit = ($scope.kpi.data? && $scope.kpi.data[watchable].unit) || $scope.getTargetPlaceholder(watchable).unit || ''
          if MNO_CURRENCIES[unit]? then ImpacKpisSvc.getCurrentDashboard().currency else unit

        $scope.getTargetPlaceholder = (watchable)->
          ImpacKpisSvc.getKpiTargetPlaceholder($scope.kpi.endpoint, watchable)

        $scope.getRealValue = ->
          return "" if _.isEmpty($scope.kpi.data) || _.isEmpty($scope.kpi.watchables)
          value = $scope.kpi.data[$scope.kpi.watchables[0]].value
          unit = $scope.kpi.data[$scope.kpi.watchables[0]].unit
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
