module = angular.module('impac.components.widgets-settings.organizations',[])
module.controller('SettingOrganizationsCtrl', ($scope, $log, ImpacDashboardsSvc) ->

  w = $scope.parentWidget
  w.selectedOrganizations = {}
  ImpacDashboardsSvc.load().then(
    (config) ->
      $scope.dashboardOrganizations = config.currentDashboard.data_sources
  )

  $scope.isOrganizationSelected = (orgUid) ->
    !!w.selectedOrganizations[orgUid]

  $scope.toggleSelectOrganization = (orgUid) ->
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

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingOrganizations', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
    },
    template: $templateCache.get('widgets-settings/organizations.tmpl.html'),
    controller: 'SettingOrganizationsCtrl'
  }
)
