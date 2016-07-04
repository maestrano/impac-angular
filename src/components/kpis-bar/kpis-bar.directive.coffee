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
        $scope.availableKpis = {
          hide: true,
          toggle: ->
            $scope.availableKpis.hide = !$scope.availableKpis.hide
        }
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
          initAvailableKpis()
          # QUICK FIX - see kpi.svc method for comments.
          _.forEach($scope.kpis, (kpi)-> ImpacKpisSvc.buildKpiWatchables(kpi))

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

        initAvailableKpis = ->
          $scope.availableKpis.list = _.select ImpacKpisSvc.getKpisTemplates(), (k) ->
            _.isEmpty(k.attachables) &&
            _.isEmpty(_.select($scope.kpis, (existingKpi) ->
              existingKpi.endpoint == k.endpoint && existingKpi.element_watched == k.watchables[0]
            ))
          $scope.availableKpis.hide = true if _.isEmpty($scope.availableKpis.list)

        # Linked methods
        # -------------------------
        $scope.addKpi = (kpi) ->
          $scope.isAddingKPI = true

          # Removes element watched from the available watchables array and saves the rest as
          # extra watchabes.
          # TODO: mno & impac should be change to deal with `watchables`, instead
          # of element_watched, and extra_watchables. The first element of watchables should be
          # considered the primary watchable, a.k.a element_watched.
          opts = {}
          opts.extra_watchables = _.filter(kpi.watchables, (w)-> w != kpi.element_watched)

          ImpacKpisSvc.create(kpi.source || 'impac', kpi.endpoint, kpi.element_watched, opts).then(
            (success) ->
              $scope.kpis.push(success)
            (error) ->
              $log.error("Impac Kpis bar can't add a kpi", error)
          ).finally(->
            initAvailableKpis()
            $scope.isAddingKPI = false
          )

        $scope.removeKpi = (kpiId) ->
          _.remove $scope.kpis, (kpi) -> kpi.id == kpiId
          initAvailableKpis()

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
