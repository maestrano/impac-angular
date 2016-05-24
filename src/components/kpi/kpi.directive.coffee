angular
  .module('impac.components.kpi', [])
  .directive('impacKpi', ($log, $timeout, ImpacKpisSvc) ->
    return {
      restrict: 'EA'
      scope: {
        onDelete: '&'
        kpi: '='
        editMode: '='
      }
      templateUrl: 'kpi/kpi.tmpl.html'

      link: (scope, element, attrs, ctrl) ->

        # linked methods
        # ---------------------------
        scope.toggleEditMode = (editing)->
          element.find('.kpi-show')[if editing then 'hide' else 'show']()
          element.find('.kpi-edit')[if editing then 'show' else 'hide']()
          return

        scope.toggleLoader = (isLoading)->
          element.find('.kpi-data-loader')[if isLoading then 'show' else 'hide']()
          element.find('.kpi-content')[if isLoading then 'hide' else 'show']()
          return

        scope.hasValidTarget = ->
          return false unless scope.kpi.limit && scope.kpi.limit.value && scope.kpi.limit.mode
          !(_.isEmpty scope.kpi.limit.value || _.isEmpty scope.kpi.limit.mode)

        scope.cancelUpdateSettings = ->
          scope.deleteKpi() unless scope.hasValidTarget()
          # smoother delete transition
          $timeout ()->
            scope.toggleEditMode(false)
          , 500

        scope.updateName = ->
          return if _.isEmpty(scope.kpi.name)
          ctrl.updateKpi(scope.kpi, { name: scope.kpi.name })

        scope.updateSettings = ->
          params = {}
          return unless scope.hasValidTarget()

          target0 = {}
          target0[scope.kpi.limit.mode] = scope.kpi.limit.value
          params.targets = [target0]

          params.extra_params = scope.kpi.extra_params unless _.isEmpty(scope.kpi.extra_params)

          ctrl.updateKpi(scope.kpi, params) unless _.isEmpty(params)

          scope.toggleEditMode(false)

        scope.deleteKpi = ->
          return if scope.kpi.static
          ctrl.deleteKpi(scope.kpi)


        # load
        # ---------------------------
        scope.toggleLoader(true)
        scope.toggleEditMode(false)
        scope.possibleTargets = [
          { label: 'over', mode: 'min' }
          { label: 'below', mode: 'max' }
        ]

        ctrl.getKpiData(scope.kpi).then( ()->
          # Get the corresponding template of the KPI loaded
          kpiTemplate = _.find ctrl.getKpisTemplates(), (aKpi) ->
            aKpi.endpoint == scope.kpi.endpoint

          # If the template contains extra params we add it to the KPI
          if kpiTemplate.extra_params?
            scope.kpi.possibleExtraParams = kpiTemplate.extra_params

          scope.kpi.targets ||= []
          if !_.isEmpty(scope.kpi.targets[0])
            scope.kpi.limit = {} if !scope.kpi.limit?
            scope.kpi.limit.mode = _.keys(scope.kpi.targets[0])[0]
            scope.kpi.limit.value = _.values(scope.kpi.targets[0])[0]
          else
            # set default <select> option value, and show edit mode.
            scope.kpi.limit = { mode: scope.possibleTargets[0].mode }
            scope.toggleEditMode(true)

          scope.toggleLoader(false)
        )

      controller: ($scope) ->

        this.getKpisTemplates = -> ImpacKpisSvc.getKpisTemplates()

        this.getKpiData = (kpi)-> ImpacKpisSvc.show(kpi)

        this.updateKpi = (kpi, params)-> ImpacKpisSvc.update(kpi, params)

        this.deleteKpi = (kpi)-> ImpacKpisSvc.delete(kpi).then ((success) -> $scope.onDelete())

        return this
    }
  )
