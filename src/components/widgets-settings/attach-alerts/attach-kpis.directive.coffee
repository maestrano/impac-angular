
module = angular.module('impac.components.widgets-settings.attach-kpis', [])
module.directive('settingAttachKpis', ($templateCache, ImpacWidgetsSvc, ImpacKpisSvc)->

  controller = ($scope)->
    w = $scope.parentWidget

    $scope.availableKpis = []

    $scope.possibleTargets = [
      { label: 'over', mode: 'min' }
      { label: 'below', mode: 'max' }
    ]

    $scope.kpi = {
      limit: { mode: $scope.possibleTargets[0].mode },
      watchables: [],
      possibleExtraParams: []
    }

    $scope.attachedKpis = angular.copy(w.kpis)

    ImpacKpisSvc.index(true).then((availableKpis)->
      $scope.availableKpis = availableKpis
      # sets first availableKpi as pre-selected kpi in the attachKpiForm.
      $scope.kpi.endpoint = availableKpis[0].endpoint
      $scope.selectKpi()
    )

    $scope.showEditKpi = {}

    $scope.toggleEditKpi = (id)->
      $scope.showEditKpi[id] = !$scope.showEditKpi[id]

    $scope.formatKpiName = (endpoint)->
      ImpacKpisSvc.formatKpiName(endpoint)

    $scope.hasValidTarget = ->
      ImpacKpisSvc.validateKpiTarget($scope.kpi)

    # Ugly code.. refactor later..
    # Re-binds the new kpi object and object arrays to the form model..
    $scope.selectKpi = ->
      selectedKpi = _.find($scope.availableKpis, (k)-> k.endpoint == $scope.kpi.endpoint)
      return unless selectedKpi
      $scope.kpi.watchables.length = 0
      _.forEach(selectedKpi.watchables, (w)-> $scope.kpi.watchables.push(w))
      $scope.kpi.possibleExtraParams = selectedKpi.extra_params
      $scope.kpi.endpoint = selectedKpi.endpoint
      $scope.kpi.element_watched = selectedKpi.watchables[0]
      $scope.extra_params = {}

    $scope.attachKpi = ->
      params = {}
      return unless $scope.hasValidTarget()

      target0 = {}
      target0[$scope.kpi.limit.mode] = $scope.kpi.limit.value
      params.targets = [target0]

      params.widget_id = w.id
      params.extra_params = $scope.kpi.extra_params unless _.isEmpty($scope.kpi.extra_params)

      ImpacKpisSvc.create('impac', $scope.kpi.endpoint, $scope.kpi.element_watched, params).then(
        (kpi)->
          $scope.attachedKpis.push(kpi)
      )

    $scope.deleteKpi = (kpi)->
      ImpacKpisSvc.delete(kpi, {widget_id: w.id}).then(->
        _.remove($scope.attachedKpis, (k)-> k.id == kpi.id )
      )

    settings = {}

    settings.initialize = ->

    settings.toMetadata = ->

    w.settings.push(settings)

    # Setting is ready: trigger load content
    # ------------------------------------
    $scope.deferred.resolve($scope.parentWidget)

  directive =
    restrict: 'A'
    scope: {
      parentWidget: '='
      deferred: '='
    }
    template: $templateCache.get('widgets-settings/attach-kpis.tmpl.html')
    controller: controller

  return directive
)
