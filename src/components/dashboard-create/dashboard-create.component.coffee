module = angular.module('impac.components.dashboard-create', [])

module.component('impacDashboardCreate', {
  templateUrl: 'dashboard-create/dashboard-create.tmpl.html'
  bindings:
    onCreateDashboard: '&'
    labelLocale: '@?'
    btnClass: '@?'
  controller: ($scope, $uibModal, ImpacTheming, ImpacMainSvc) ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.label = ImpacTheming.getDhbLabelName()
      ImpacMainSvc.loadOrganizations().then(
        (mainConfig) ->
          ctrl.currentOrganizationId = mainConfig.currentOrganization.id
          initModalScope(mainConfig)
      )

    isCurrentOrg = (org) ->
      org.id == ctrl.currentOrganizationId

    unSelectOrgs = ->
      for org in ctrl.modalScope.organizations
        org.selected = isCurrentOrg(org)

    initModalScope = (mainConfig) ->
      ctrl.modalScope = angular.merge($scope.$new(), {
        label: ctrl.label
        multiMode:
          enabled: ImpacTheming.get().dhbConfig.multiCompany
        dashboard: {}
        organizations: mainConfig.organizations
      })
      unSelectOrgs()

      ctrl.modalScope.source =
        mode: 'single'
        init: unSelectOrgs()

      ctrl.modalScope.templates =
        enabled: ImpacTheming.get().dhbSettings.createFromTemplateEnabled
        select: ({ template }) ->
          angular.merge(ctrl.modalScope.dashboard, template)

      ctrl.modalScope.createDashboard = (orgs) ->
        mScope = ctrl.modalScope
        mScope.loading = true
        selectedOrganizations = _.filter(orgs, (org) -> org.selected)
        angular.merge(mScope.dashboard, { organization_ids: _.pluck(selectedOrganizations, 'id') })
        ctrl.onCreateDashboard({ dashboard: mScope.dashboard }).finally(
          ->
            mScope.loading = false
            ctrl.instance.close()
        )

      ctrl.modalScope.invalid = ->
        _.isEmpty(ctrl.modalScope.dashboard.name) || !_.some(_.pluck(ctrl.modalScope.organizations, 'selected'))

    ctrl.openModal = ->
      ctrl.modalScope.dashboard.name = null
      ctrl.modalScope.source.mode = 'single'
      modalConfig =
        backdrop: 'static'
        templateUrl: 'dashboard-create/dashboard-create.modal.html'
        scope: ctrl.modalScope
        windowClass: 'impac-dashboard-create'
      ctrl.instance = $uibModal.open(modalConfig)

    return ctrl
})
