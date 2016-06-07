module = angular.module('impac.components.alerts-config', [])
module.directive('alertsConfig', ($log, $timeout, $modal, $templateCache, $compile, ImpacKpisSvc, ImpacMainSvc) ->

  controller = ($scope) ->
    $scope.alerts = {
      inapp:
        service: 'inapp'
        label: "With in-app notifications"
      email:
        service: 'email'
        label: "By sending me an email"
    }

    ImpacMainSvc.load().then(
      (config) -> $scope.alerts.email.label += " at: #{config.userData.email}" if (config.userData? && config.userData.email)
    )

    $scope.save = (alerts) ->
      ImpacKpisSvc.saveAlerts($scope.kpi, alerts)
      $scope.modal.close()
      $scope.afterSaveCallback() if $scope.afterSaveCallback

    $scope.toggleAlert = (alert) ->
      alert.active = !alert.active

    $scope.translateTarget = (kpi) ->
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
        template: $templateCache.get('alerts-config/alerts-config.modal.html')
        scope: $scope
    }

    $scope.showAlertsSettings = ->
      # All the alerts that are already in kpi.alerts must appear as "active"
      for alert in $scope.kpi.alerts
        $scope.alerts[alert.service].active = true

      $scope.modal = $modal.open(alertsSettingsModal.options)


  link = (scope, element, attrs) ->
    htmlString = if scope.buttonHtml then scope.buttonHtml else "<i class='fa fa-bell-o' />"
    alertsConfig = element.find('.alerts-config')
    alertsConfig.html(htmlString).show()
    $compile(alertsConfig.contents())(scope)


  directive =
    restrict: 'EA'
    scope: {
      kpi: '='
      buttonHtml: '=?'
      afterSaveCallback: '=?'
    }
    template: $templateCache.get('alerts-config/alerts-config.tmpl.html')
    link: link
    controller: controller

  return directive
)
