angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', ($templateCache, ImpacKpisSvc) ->
    return {
      restrict: 'E'
      scope: {
        kpis: '='
      }
      template: $templateCache.get('kpis-bar/kpis-bar.tmpl.html')

      controller: ($scope, $timeout, $log) ->
        # Load
        # -------------------------
        $scope.hideAvailableKpis = true
        $scope.showKpisExpanded = false
        # All kpis edit panels are shown
        $scope.showEditMode = false
        # Children kpis register data onto this hash by kpi.id so this directive can manage kpi
        # mandatory target selection without showing all edit views.
        $scope.kpisEditSettings = {}
        $scope.isAddingKPI = false

        # references to services (bound objects shared between all controllers)
        # -------------------------------------
        ImpacKpisSvc.load().then ->
          $scope.availableKpis = _.select ImpacKpisSvc.getKpisTemplates(), (k) -> _.isEmpty(k.attachables)

        # $scope.keyStats = [
        #   { name: 'Interest', data: { value: '-15.30', unit: '%' }, static: true },
        #   { name: 'Profitability', data: { value: '8.34', unit: '%' }, static: true},
        #   { name: 'Cost of capital', data: { value: '20.00', unit: 'AUD' }, static: true},
        #   { name: 'TAX % based on FY14', data: { value: '29.91', unit: '%' }, static: true},
        #   { name: 'Super', data: { value: '479023', unit: 'AUD' }, static: true}
        # ]

        $scope.sortableOptions = {
          stop: ->
            ids = _.pluck $scope.kpis, 'id'
            ImpacKpisSvc.updateKpisOrder(ids)
          cursorAt:
            left: 100
            top: 20
          opacity: 0.5
          delay: 150
          tolerance: 'pointer'
          cursor: "move"
          revert: 250
          # only the top-line with title will provide the handle to drag/drop kpis
          handle: ".top-line"
          cancel: ".unsortable"
          helper: 'clone'
        }

        # Linked methods
        # -------------------------
        $scope.toggleAvailableKpis = ->
          $scope.hideAvailableKpis = !$scope.hideAvailableKpis

        $scope.formatKpiName = ImpacKpisSvc.formatKpiName

        $scope.addKpi = (kpi) ->
          $scope.isAddingKPI = true
          ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched).then(
            (success) ->
              $scope.kpis.push(success)
            (error) ->
              $log.error("Impac Kpis bar can't add a kpi", error)
          ).finally(-> $scope.isAddingKPI = false)

        $scope.removeKpi = (kpiId) -> _.remove $scope.kpis, (kpi) -> kpi.id == kpiId

        $scope.toggleEditMode = ->
          if (kpiIsEditing() && !$scope.showEditMode)
            updateKpis()
          else
            updateKpis(f) if (f = $scope.showEditMode)
            $scope.showEditMode = !$scope.showEditMode

        $scope.isEditing = ->
          $scope.showEditMode || kpiIsEditing()

        # Private methods
        # -------------------------
        kpiIsEditing = ->
          _.includes(_.map($scope.kpisEditSettings, (data, id)-> data.isEditing), true)

        # Update or cancel the kpi.
        updateKpis = (force)->
          for id, data of $scope.kpisEditSettings
            # skips kpis that don't exist
            continue unless _.find($scope.kpis, (kpi)-> kpi.id == parseInt(id))
            data.callback() if data && data.callback && (data.isEditing || force)
          return

    }
  )
