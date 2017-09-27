angular
  .module('impac.components.kpis-bar', [])
  .directive('kpisBar', ($templateCache, $q, $timeout, ImpacKpisSvc, ImpacDashboardsSvc, ImpacTheming, ImpacEvents, IMPAC_EVENTS) ->
    return {
      restrict: 'E'
      scope: {
        kpis: '='
      }
      template: $templateCache.get('kpis-bar/kpis-bar.tmpl.html')

      controller: ($scope, $log, $element) ->
        # Load
        # -------------------------
        $scope.availableKpis = {
          kpiSelectorHidden: true,
          toggle: ->
            return false unless $scope.hasKpiAvailability()
            $scope.availableKpis.kpiSelectorHidden = !$scope.availableKpis.kpiSelectorHidden
          list: []
        }
        $scope.showKpisExpanded = false
        # All kpis edit panels are shown
        $scope.showEditMode = false
        $scope.isAddingKpi = false
        $scope.showContent = true

        $scope.dhbLabelName = ImpacTheming.getDhbLabelName()

        # references to services (bound objects shared between all controllers)
        # -------------------------------------
        ImpacKpisSvc.load().then ->
          initAvailableKpis()
          buildKpiWatchables()

        # Reload available KPIs on dashboard change
        ImpacDashboardsSvc.dashboardChanged().then(null, null, ->
          # Wait for the next digest cycle so the updated $scope.kpis has been propogated.
          $timeout(->
            initAvailableKpis()
            buildKpiWatchables()
          )
        )

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

        # Retrieves KPIs date range either saved onto dashboard or a default, and applies to the
        # settings-date-picker.
        # ---
        $scope.kpisDateRange = {}
        # Promises the kpi.directive that dates have been loaded and are ready for #show().
        $scope.kpiDatesDeferred = $q.defer()
        # Promises this directive that the dates-picker is loaded and ready for initialize.
        $scope.datesPickerDeferred = $q.defer()

        initDatesPicker = ->
          $scope.datesPickerDeferred.promise.then((settingDatesPicker)->
            ImpacKpisSvc.getKpisDateRange().then(
              (dates)->
                $scope.kpisDateRange.from = dates.from
                $scope.kpisDateRange.to = dates.to
                $scope.kpisDateRange.keepToday = dates.keepToday
              ->
                $scope.hideDatesPicker = true
            ).finally(->
              $scope.kpiDatesDeferred.resolve()
              settingDatesPicker.initialize()
            )
          )
        initDatesPicker()

        ImpacDashboardsSvc.dashboardChanged().then(null, null,
          (result) -> initDatesPicker() if result
        )

        ImpacEvents.registerCb(IMPAC_EVENTS.kpiPressEnterButton, -> $scope.toggleEditMode())

        # Linked methods
        # -------------------------
        $scope.addKpi = (kpi) ->
          return if $scope.isAddingKpi
          $scope.isAddingKpi = true

          kpi.element_watched = kpi.watchables[0]

          # Removes element watched from the available watchables array and saves the rest as
          # extra watchabes.
          # TODO: mno & impac should be change to deal with `watchables`, instead
          # of element_watched, and extra_watchables. The first element of watchables should be
          # considered the primary watchable, a.k.a element_watched.
          opts = {}
          opts.extra_watchables = _.filter(kpi.watchables, (w)-> w != kpi.element_watched)

          ImpacKpisSvc.create(kpi, opts).then(
            (success) ->
              $scope.kpis.push(success)
            (error) ->
              $log.error("Impac Kpis bar can't add a kpi", error)
          ).finally(->
            initAvailableKpis()
            $scope.isAddingKpi = false
          )

        $scope.removeKpi = (kpiId) ->
          _.remove $scope.kpis, (kpi) -> kpi.id == kpiId
          initAvailableKpis()

        $scope.toggleEditModeLock = false
        $scope.toggleEditMode = ->
          return if $scope.toggleEditModeLock
          $scope.toggleEditModeLock = true
          ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpisBarToggleSettings)
          if (kpiIsEditing() && !$scope.showEditMode)
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpisBarUpdateSettings)
          else
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpisBarUpdateSettings, f) if (f = $scope.showEditMode)
            $scope.showEditMode = !$scope.showEditMode
          $scope.availableKpis.toggle() unless $scope.availableKpis.kpiSelectorHidden || $scope.showEditMode
          # prevents spam clicking, and works with kpi show/edit annimation.
          $timeout(->
            $scope.toggleEditModeLock = false
          , 450)

        $scope.isEditing = ->
          $scope.showEditMode || kpiIsEditing()

        $scope.kpisBarUpdateDates = (dates)->
          return unless _.isObject(dates) && !_.isEmpty(dates)
          dashboard = ImpacDashboardsSvc.getCurrentDashboard()
          angular.merge dashboard.metadata, { kpis_hist_parameters: dates }
          ImpacDashboardsSvc.update(dashboard.id, { metadata: dashboard.metadata }).then(->
            ImpacEvents.notifyCallbacks(IMPAC_EVENTS.kpisBarUpdateDates)
          )

        $scope.toggleShowContent = ->
          $scope.showContent = !$scope.showContent
          animateKpiBarPanel()
          return true

        $scope.hasKpiAvailability = ->
          $scope.availableKpis.list.length

        $scope.showDatesPicker = ->
          $scope.isEditing() && $scope.kpis.length && !$scope.hideDatesPicker

        # Private methods
        # -------------------------
        kpiIsEditing = ->
          _.includes(_.map($scope.kpis, (kpi)-> kpi.isEditing), true)

        initAvailableKpis = ->
          $scope.availableKpis.list = _.select(ImpacKpisSvc.getKpisTemplates(), (k) ->
            _.isEmpty(k.attachables) &&
            _.isEmpty(_.select($scope.kpis, (existingKpi) ->
              existingKpi.endpoint == k.endpoint && existingKpi.element_watched == k.watchables[0]
            ))
          )
          $scope.availableKpis.kpiSelectorHidden = true if _.isEmpty($scope.availableKpis.list)

        # QUICK FIX - see kpi.svc method for comments.
        buildKpiWatchables = ->
          _.forEach($scope.kpis, (kpi)-> ImpacKpisSvc.buildKpiWatchables(kpi))

        animateKpiBarPanel = ()->
          elements = angular.element($element).find('.kpis .content, .kpis .content-buttons')
          return unless elements
          elements.slideToggle(500)

    }
  )
