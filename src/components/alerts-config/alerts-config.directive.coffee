module = angular.module('impac.components.alerts-config', [])
module.directive('alertsConfig', ($uibModal, $templateCache, $compile, $translate, ImpacKpisSvc, ImpacMainSvc) ->

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

      $scope.members = []

      $scope.alerts = {
        inapp:
          service: 'inapp'
          label: $translate.instant('impac.kpi.alerts.service.inapp')
        email:
          service: 'email'
          label: "By sending me an email to:"
      }

      $scope.recipientSearch = { text: "", focus: false }

      ImpacMainSvc.load().then(
        (config) ->
          $scope.members = config.currentOrgMembers
          # Translates email label unless has members (multiple recipients)
          # TODO: i18n for multiple recipients feature
          unless $scope.members || !config.userData.email
            $translate('impac.kpi.alerts.service.email', { EMAIL: 'hasEmail', email: config.userData.email }).then((label) ->
              $scope.alerts.email.label = label
            )
          # Sets current state of recipients for email alerts
          emailAlert = _.find($scope.kpi.alerts, (alert) -> alert.service == 'email')
          if emailAlert && $scope.members
            emailAlertRecipients = emailAlert.recipients.map((recipient) -> recipient.id)
            _.forEach($scope.members, (member) -> member.active = true if emailAlertRecipients.includes(member.id))
          else if $scope.members
            defaultActiveMember = _.find($scope.members, (member) -> member.email == config.userData.email) || $scope.members[0]
            defaultActiveMember.active = true if defaultActiveMember
      )

      $scope.save = (alerts) ->
        $scope.alerts.email.recipients = $scope.members.filter((member) -> member.active) if $scope.members
        _.forEach($scope.alerts.email.recipients, (recipient) -> $scope.toggleRecipient(recipient)) if !$scope.alerts.email.active
        ImpacKpisSvc.saveAlerts($scope.kpi, alerts)
        $scope.modal.close()
        $scope.afterSaveCallback() if $scope.afterSaveCallback

      $scope.toggleAlert = (alert) ->
        alert.active = !alert.active

      $scope.toggleRecipient = (recipient) ->
        recipient.active = !recipient.active if !recipient.active || _.filter($scope.members, (recipient) -> recipient.active).length > 1

      $scope.translateTarget = (kpi) ->
        watchableTargets = kpi.targets[kpi.element_watched] if kpi.targets
        return unless watchableTargets && watchableTargets.length > 0
        result = []

        if watchableTargets[0].max?
          result.push($translate.instant('impac.widget.alerts_config.over'), watchableTargets[0].max)
        else if watchableTargets[0].min
          result.push($translate.instant('impac.widget.alerts_config.below'), watchableTargets[0].min)

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
        if angular.isDefined($scope.kpi.alerts)
          for alert in $scope.kpi.alerts
            $scope.alerts[alert.service].active = true

        $scope.modal = $uibModal.open(alertsSettingsModal.options)

      $scope.showRecipientList = (alert) ->
        alert.active && alert.service == 'email' && $scope.members

      $scope.onAddRecipientsKeyPress = (event) ->
        availableInactiveRecipients = _.filter(this.filteredMembers, (member) -> !member.active)
        recipient = _.find(availableInactiveRecipients, (member) -> member.email == $scope.recipientSearch.text)
        memberIndex = 0
        if event.which == 13
          if $scope.selectedMember
            $scope.selectedMember.active = true
            $scope.selectedMember = null
          if recipient
            recipient.active = true
            $scope.recipientSearch.text = ""
        else if event.which == 40 && availableInactiveRecipients.length > 0
          memberIndex = _.indexOf(availableInactiveRecipients, $scope.selectedMember) + 1 if $scope.selectedMember
          memberIndex = 0 unless memberIndex < availableInactiveRecipients.length
          $scope.selectedMember = availableInactiveRecipients[memberIndex]
        else if event.which == 38 && availableInactiveRecipients.length > 0
          memberIndex = _.indexOf(availableInactiveRecipients, $scope.selectedMember) - 1 if $scope.selectedMember
          memberIndex = availableInactiveRecipients.length - 1 if memberIndex < 0
          $scope.selectedMember = availableInactiveRecipients[memberIndex]
        else
          $scope.selectedMember = null

      $scope.onRecipientSearchFocus = -> $scope.recipientSearch.focus = true

      $scope.showAvailableRecipients = (alert) ->
        return false unless this.filteredMembers
        $scope.showRecipientList(alert) && $scope.recipientSearch.focus && _.filter(this.filteredMembers, (member) -> !member.active).length > 0

  }
)
