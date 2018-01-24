module = angular.module('impac.components.widgets-settings.organizations',[])
module.controller('SettingOrganizationsCtrl', ($scope, $log, ImpacDashboardsSvc, ImpacMainSvc) ->

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
    else if singleOrgMode()
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
          count = 0
          widgetOrgIds = w.metadata.organization_ids
          currentOrganization = ImpacMainSvc.config.currentOrganization

          for org in $scope.dashboardOrganizations
            orgSelection = _.contains(widgetOrgIds, org.uid)
            w.selectedOrganizations[org.uid] = orgSelection
            if singleOrgMode()
              if widgetOrgIds.length > 1
                w.selectedOrganizations[org.uid] = false
              else if orgSelection
                w.selectedOrganizations[org.uid] = if count >= 1 then false else true
                count += 1
          if singleOrgMode() && widgetOrgIds.length > 1
            w.selectedOrganizations[currentOrganization.uid] = true
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
