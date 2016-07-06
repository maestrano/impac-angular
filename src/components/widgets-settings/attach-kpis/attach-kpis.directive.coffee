module = angular.module('impac.components.widgets-settings.attach-kpis', [])
module.directive('settingAttachKpis', ($templateCache, ImpacWidgetsSvc, ImpacKpisSvc)->

  return {
    restrict: 'A'
    scope: {
      parentWidget: '='
      attachedKpis: '='
      widgetEngine: '='
      widgetId: '='
      extraParams: '='
      deferred: '='
      showExtraParam: '=?'
    }
    template: $templateCache.get('widgets-settings/attach-kpis.tmpl.html')

    controller: ($scope)->
      w = $scope.parentWidget

      # Settings configurations
      # -----------------------

      settings = {}

      settings.initialize = ->
        loadKpisData()

      settings.toMetadata = ->

      w.settings.push(settings)

      # Linked methods
      # -----------------------

      $scope.formatKpiName = (endpoint)->
        ImpacKpisSvc.formatKpiName(endpoint)

      $scope.hasValidTarget = ->
        ImpacKpisSvc.validateKpiTarget($scope.kpi)

      $scope.attachKpi = ->
        params = {}
        return unless $scope.hasValidTarget()

        target0 = {}
        target0[$scope.kpi.limit.mode] = $scope.kpi.limit.value

        params.targets = {}
        params.targets[$scope.kpi.watchables[0]] = [target0]
        params.widget_id = $scope.widgetId

        # NOTE: When multiple extra param functionality is added, this should be
        #       more dynamic via a selection ngModel or similar.
        for param, paramValues of $scope.extraParams
          params.extra_params ||= {}
          params.extra_params[param] = paramValues.uid

        ImpacKpisSvc.create('impac', $scope.kpi.endpoint, $scope.elementWatched, params).then(
          (kpi)->
            $scope.attachedKpis.push(kpi)
            ImpacKpisSvc.show(kpi).then(->
              # TODO: display interesting things (e.g graph overlays) with KPI data!
            )
        )

      $scope.deleteKpi = (kpi)->
        ImpacKpisSvc.delete(kpi, {widget_id: $scope.widgetId}).then(->
          _.remove($scope.attachedKpis, (k)-> k.id == kpi.id )
        )

      # Builds formatted kpi titles for attached kpis based on the set targets,
      # possibleTargets mappings, and the kpi.data.unit returned from impac!.
      # ---
      # NOTE: if multiple targets are to be supported, this should be revised.
      $scope.formatAttachedKpiTitle = (kpi)->
        return '' unless kpi.data && kpi.targets && $scope.elementWatched
        ImpacKpisSvc.formatKpiTarget(kpi.targets[$scope.elementWatched][0], kpi.data[$scope.elementWatched].unit, $scope.possibleTargets)

      # Local methods
      # -----------------------


      # On-load
      # -----------------------

      # Mapping target modes to labels.
      $scope.possibleTargets = [
        { label: 'over', mode: 'min' }
        { label: 'below', mode: 'max' }
      ]

      # Prepare Attachable KPI model.
      $scope.kpi = {
        limit: { mode: $scope.possibleTargets[0].mode }
        # possibleExtraParams: $scope.extraParams
      }

      # Load Attachable KPI Templates.
      # -------------------------------------
      ImpacKpisSvc.getAttachableKpis($scope.widgetEngine).then((kpiTemplates)->
        $scope.availableKpis = angular.copy(kpiTemplates)
        # Set default kpi.
        # TODO: support for multiple kpi's.
        angular.extend($scope.kpi, $scope.availableKpis[0])
        # Set default extra param.
        # TODO: support for multiple extra params.
        $scope.selectedParam = _.keys($scope.extraParams)[0]
        # TODO: support for watchable selection.
        $scope.elementWatched = $scope.kpi.watchables? && $scope.kpi.watchables[0]
      )

      # Load attached KPI's data.
      loadKpisData = ->
        _.forEach($scope.attachedKpis, (kpi)->
          ImpacKpisSvc.show(kpi).then((res)->
            # TODO: display interesting things (e.g graph overlays) with KPI data!
          )
        )

      loadKpisData()

      # Setting is ready: trigger load content
      # ------------------------------------
      $scope.deferred.resolve($scope.parentWidget)
  }
)
