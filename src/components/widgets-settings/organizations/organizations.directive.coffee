module = angular.module('impac.components.widgets-settings.organizations',[])
module.controller('SettingOrganizationsCtrl', ($scope, $log, ImpacDashboardsSvc) ->

  w = $scope.parentWidget
  w.selectedOrganizations = {}


  $scope.organizationMode ||= 'multiple'
  mode = $scope.organizationMode

  multiOrgMode = -> mode == 'multiple'

  singleOrgMode = -> mode == 'single'

  $scope.isOrganizationSelected = (orgUid) ->
    !!w.selectedOrganizations[orgUid]

  $scope.toggleSelectOrganization = (orgUid) ->
    if multiOrgMode()
      w.selectedOrganizations[orgUid] = !w.selectedOrganizations[orgUid]
      $scope.onSelect({orgs: w.selectedOrganizations}) if angular.isDefined( $scope.onSelect )
    if singleOrgMode()
      angular.forEach w.selectedOrganizations, (value, key) ->
        w.selectedOrganizations[key] = false
      w.selectedOrganizations[orgUid] = true

  # What will be passed to parentWidget
  setting = {}
  setting.key = "organizations"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        $scope.dashboardOrganizations = config.currentDashboard.data_sources
        if w.metadata? && w.metadata.organization_ids?
          # Note: For a widget in a dashboard multiple companies, we select the
          #       first company by default ONLY if the mode is radio.
          count = 0
          for org in $scope.dashboardOrganizations
            orgSelection = _.contains(w.metadata.organization_ids, org.uid)
            w.selectedOrganizations[org.uid] = orgSelection
            if singleOrgMode() && orgSelection
              w.selectedOrganizations[org.uid] = if count >= 1 then false else true
              count += 1
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
      organizationMode: '=?'
      deferred: '='
      onSelect: '&?'
    },
    template: $templateCache.get('widgets-settings/organizations.tmpl.html'),
    controller: 'SettingOrganizationsCtrl'
  }
)
