angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, ImpacKpisSvc, $modal, $templateCache, ImpacMainSvc) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
      }
      templateUrl: 'kpi/kpi.tmpl.html'

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


        # --------------------------------------------------------------------------
        # Alerts settings modal
        # --------------------------------------------------------------------------

        alertsSettingsModalScope = $scope.$new()
        alertsSettingsModalScope.kpi = $scope.kpi
        alertsSettingsModalScope.alerts = {
          inapp:
            service: 'inapp'
            label: "With in-app notifications"
          email:
            service: 'email'
            label: "By sending me an email"
        }

        ImpacMainSvc.load().then(
          (config) -> alertsSettingsModalScope.alerts.email.label += " at: #{config.userData.email}" if (config.userData? && config.userData.email)
        )

        alertsSettingsModalScope.save = (alerts) ->
          ImpacKpisSvc.saveAlerts($scope.kpi, alerts)
          alertsSettingsModalScope.modal.close()

        alertsSettingsModalScope.toggleAlert = (alert) ->
          alert.active = !alert.active

        alertsSettingsModalScope.translateTarget = (kpi) ->
          return unless kpi.targets? && kpi.targets.length > 0
          result = []

          if kpi.targets[0].max?
            result.push("over", kpi.targets[0].max)
          else if kpi.targets[0].min
            result.push("below", kpi.targets[0].min)

          result.push(kpi.data.unit) if kpi.data?

          return result.join(' ')

        alertsSettingsModal = {
          options:
            backdrop: 'static'
            template: $templateCache.get('kpi/alerts-settings-modal.tmpl.html')
            scope: alertsSettingsModalScope
        }

        $scope.showAlertsSettings = ->
          # All the alerts that are already in kpi.alerts must appear as "active"
          for alert in $scope.kpi.alerts
            alertsSettingsModalScope.alerts[alert.service].active = true

          alertsSettingsModalScope.modal = $modal.open(alertsSettingsModal.options)

        # --------------------------------------------------------------------------

    }
  )
