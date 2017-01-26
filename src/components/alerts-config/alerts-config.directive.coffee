module = angular.module('impac.components.alerts-config', [])
module.directive('alertsConfig', ($modal, $templateCache, $compile, ImpacKpisSvc, ImpacMainSvc) ->

  return {
    restrict: 'EA'
    scope:
      kpi: '='
      buttonHtml: '@'
      afterSaveCallback: '=?'
    template: $templateCache.get('alerts-config/alerts-config.tmpl.html')

    link: (scope, element, attrs) ->
      htmlString = if scope.buttonHtml then scope.buttonHtml else "<i class='fa fa-bell-o' />"
      alertsConfig = element.find('.alerts-config')
      alertsConfig.html(htmlString).show()
      $compile(alertsConfig.contents())(scope)

    controller: ($scope) ->
      $scope.members = [{email: "example@maestrano.io"},{email: "example@maestrano.io"},{email: "example@maestrano.io"},{email: "example@maestrano.io"}]

      $scope.alerts = {
        inapp:
          service: 'inapp'
          label: "With in-app notifications"
        email:
          service: 'email'
          label: "By sending me an email to:"
      }

      $scope.search = { text: "" }

      ImpacMainSvc.load().then(
        (config) ->
          $scope.members = config.currentOrgMembers
          #Sets current state of recipients for email alerts
          email_alert = _.filter($scope.kpi.alerts, (alert) -> alert.service == 'email')[0]
          if email_alert
            email_recipients = email_alert.recipients.map((recipient) -> recipient.id)
            for member in $scope.members
              member.active = true if email_recipients.includes(member.id)
          else
            _.filter($scope.members, (member) -> member.email == config.userData.email)[0].active = true
      )

      $scope.save = (alerts) ->
        members = $scope.members.filter((member) -> member.active)
        $scope.alerts.email.recipient_ids = members.map((member) -> member.id)
        members.forEach((member) -> $scope.toggleRecipient(member)) if !$scope.alerts.email.active
        ImpacKpisSvc.saveAlerts($scope.kpi, alerts)
        $scope.modal.close()
        $scope.afterSaveCallback() if $scope.afterSaveCallback

      $scope.toggleAlert = (alert) ->
        alert.active = !alert.active

      $scope.toggleRecipient = (member) ->
        member.active = !member.active if _.filter($scope.members, (member) -> member.active).length > 1 || !member.active

      $scope.translateTarget = (kpi) ->
        watchableTargets = kpi.targets[kpi.element_watched] if kpi.targets
        return unless watchableTargets && watchableTargets.length > 0
        result = []

        if watchableTargets[0].max?
          result.push("over", watchableTargets[0].max)
        else if watchableTargets[0].min
          result.push("below", watchableTargets[0].min)

        result.push(kpi.data[kpi.element_watched].unit) if kpi.data?

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

      $scope.showRecipientList = (alert) ->
        alert.active && alert.service == 'email'

      $scope.onKeyPress = (event) ->
        if event.which == 13
          recipient = _.filter($scope.members, (member) -> member.email == $scope.search.text)[0]
          if recipient && !recipient.active
            recipient.active = true
            $scope.search.text = ""

  }
)
