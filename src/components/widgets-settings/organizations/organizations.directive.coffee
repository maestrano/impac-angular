module = angular.module('impac.components.widgets-settings.organizations',[])
module.controller('SettingOrganizationsCtrl', ($scope, $log, ImpacDashboardsSvc, ImpacMainSvc) ->

  w = $scope.parentWidget
  w.selectedOrganizations = {}

  $scope.mode ||= 'multiple'

  $scope.multiOrgMode = -> $scope.mode == 'multiple'

  $scope.singleOrgMode = -> $scope.mode == 'single'

  resetSelectedOrgs = -> w.selectedOrganizations = _.mapValues(w.selectedOrganizations, -> false)

  $scope.isOrganizationSelected = (orgUid) ->
    !!w.selectedOrganizations[orgUid]

  $scope.toggleSelectOrganization = (orgUid) ->
    if $scope.multiOrgMode()
      w.selectedOrganizations[orgUid] = !w.selectedOrganizations[orgUid]
      $scope.onSelect({orgs: w.selectedOrganizations}) if angular.isDefined( $scope.onSelect )
    else if $scope.singleOrgMode()
      resetSelectedOrgs()
      w.selectedOrganizations[orgUid] = true

  # What will be passed to parentWidget
  setting = {}
  setting.key = "organizations"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        currentDashboard = config.currentDashboard
        $scope.dashboardOrganizations = _.sortBy(currentDashboard.data_sources, (org) -> org.label.toLowerCase())
        return unless w.metadata? && w.metadata.organization_ids?
        widgetOrgIds = w.metadata.organization_ids
        if $scope.singleOrgMode()
          resetSelectedOrgs()
          if widgetOrgIds.length > 1
            currentOrganization = ImpacMainSvc.config.currentOrganization
            w.selectedOrganizations[currentOrganization.uid] = true
          else
            w.selectedOrganizations[widgetOrgIds[0]] = true
        else if $scope.multiOrgMode()
          for org in $scope.dashboardOrganizations
            w.selectedOrganizations[org.uid] = _.contains(widgetOrgIds, org.uid)
        setting.isInitialized = true
    )

  setting.toMetadata = ->
    newOrganizations = _.compact(_.map(w.selectedOrganizations, (checked,uid) ->
      uid if checked
    ))
    newOrganizations = [_.first($scope.dashboardOrganizations).uid] if _.isEmpty(newOrganizations)
    return { organization_ids: newOrganizations }

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingOrganizations', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      mode: '@?'
      deferred: '='
      onSelect: '&?'
    },
    template: $templateCache.get('widgets-settings/organizations.tmpl.html'),
    controller: 'SettingOrganizationsCtrl'
  }
)
