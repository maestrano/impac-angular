module = angular.module('impac.components.widgets-settings.source-selector',[])

module.directive('settingSourceSelector', ($templateCache, $timeout, ImpacMainSvc, ImpacUtilities, ImpacTheming) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      deferred: '='
    },
    # TODO: What is it?
    template: $templateCache.get('widgets-settings/source-selector.tmpl.html'),

    link: (scope) ->
      w = scope.parentWidget

      # Will there be a multi-org use case?
      scope.mode ||= 'single'
      scope.singleOrgMode = -> scope.mode == 'single'
      scope.multiOrgMode = -> scope.mode == 'multiple'

      scope.selectedApps = {}
      setting = {}
      setting.key = "source-selector"

      setting.initialize = ->
        $timeout ->
          retrieveAppInstances()
          return true

      setting.toMetadata = ->
        appInstanceId = _.compact(_.map(scope.selectedApps, (checked, uid) ->
          return null if uid == 'prm-records-only'
          uid if checked
        ))

        { app_instance_id: appInstanceId }

      resetSelectedApps = -> scope.selectedApps = _.mapValues(scope.selectedApps, -> false)
      updateAppInstances = (appInstances, primary, manual) ->
        valuesPresent = _.find(appInstances, (hash) ->
          # We push bot at the same time so we can check for one
          hash.value == 'prm-records-only'
        )
        if valuesPresent then appInstances else appInstances.push(primary, manual)

      retrieveAppInstances = ->
        return if false # needed?

        appInstances = _.find(w.configOptions.selectors, (selector) ->
	        return selector.name == 'app_instances'
        ).options

        # Used as a 'reset' switch to filter on primary records only
        primary =
          'value': 'prm-records-only'
          'label': 'Primary Only'

        # Used to select all records added manually
        # TODO: test with manual transactions (they have to be sent to the rec-eng)
        # TODO: Use _.replace when updating to Lodash 4.17.5
        orgUid = w.metadata.organization_ids[0]
        manUid = orgUid.replace('org', 'man')
        manual =
          'value': manUid
          'label': 'Manual'

        if appInstances then updateAppInstances(appInstances, primary, manual) else (appInstances = [primary, manual])

        scope.organizationApps = appInstances

      scope.isApplicationSelected = (app_uid) ->
        !!scope.selectedApps[app_uid]

      scope.toggleSelectApplication = (app_uid) ->
        resetSelectedApps()
        scope.selectedApps[app_uid] = true

      w.settings.push(setting)

      # Setting is ready: trigger load content
      # ------------------------------------
      scope.deferred.resolve(setting)
  }
)
