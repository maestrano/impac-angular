module = angular.module('impac.components.widgets-settings.organizations',[])
module.controller('SettingOrganizationsCtrl', ($scope) ->

  w = $scope.parentWidget

  $scope.dashboardOrganizations = w.parentDashboard.data_sources
  w.selectedOrganizations = {}

  $scope.isOrganizationSelected = (orgUid) ->
    !!w.selectedOrganizations[orgUid]

  $scope.toogleSelectOrganization = (orgUid) ->
    w.selectedOrganizations[orgUid] = !w.selectedOrganizations[orgUid]

  # What will be passed to parentWidget
  setting = {}
  setting.key = "organizations"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    if w.metadata? && w.metadata.organization_ids?
      angular.forEach(w.metadata.organization_ids, (orgUid) ->
        w.selectedOrganizations[orgUid] = true
      )
      setting.isInitialized = true

  setting.toMetadata = ->
    newOrganizations = _.compact(_.map(w.selectedOrganizations, (checked,uid) ->
      uid if checked
    ))
    return { organization_ids: newOrganizations }

  w.settings ||= []
  w.settings.push(setting)
)

module.directive('settingOrganizations', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
    },
    template: $templateCache.get('widgets/settings/organizations.html'),
    controller: 'SettingOrganizationsCtrl'
  }
)