###
#   @desc Chart Threshold - create Widget KPIs from Widget charts. (Highchart widgets only).
#   @todo support for multiple KPI watchables?
#   @todo support for multiple KPI targets?
#   @todo support for multiple attachable KPIs?
###
module = angular.module('impac.components.widgets-common.chart-threshold', [])
module.component('chartThreshold', {
  templateUrl: 'widgets-common/chart-threshold.tmpl.html'
  bindings:
    widget: '<'
    chartPromise: '<?'
    chartShrinkSize: '<?'
    disabled: '<?'
    kpiTargetMode: '<?'
    kpiCreateLabel: '<?'
    thresholdColor: '@'
    onComplete: '&?'
  controller: ($timeout, $log, ImpacKpisSvc, ImpacUtilities, toastr)->
    ctrl = this

    ctrl.$onInit = ->
      # Define properties
      # -------
      ctrl.kpi = {}
      ctrl.showPanel = false
      ctrl.isEditingKpi = false
      ctrl.loading = false
      ctrl.draftTarget = value: ''
      ctrl.chartShrinkSize ||= 38
      ctrl.disabled ||= false
      ctrl.kpiTargetMode ||= 'min'
      ctrl.kpiCreateLabel ||= 'Get alerted when the target threshold goes below'
      ctrl.thresholdColor ||= 'rgba(0, 0, 0, 0.7)'
      # Get attachable kpi templates
      ImpacKpisSvc.getAttachableKpis(ctrl.widget.endpoint).then(
        (templates)->
          return disableAttachability('No valid KPI Templates found') if _.isEmpty(templates) || _.isEmpty(templates[0].watchables)
          # Widgets can have multiple possible attachable KPIs, only one is currently supported.
          angular.extend(ctrl.kpi, angular.copy(templates[0]))
          # The watchables are currently not selectable by the user, only one element_watched
          # is supported.
          ctrl.kpi.element_watched = ctrl.kpi.watchables[0]
        ->
          disableAttachability()
      )
      # Register to chart changes (expects a highchart instance)
      ctrl.chartPromise.then(null, null, onChartNotify) if ctrl.chartPromise? && _.isFunction(ctrl.chartPromise.then)

    ctrl.createKpi = (target)->
      return if ctrl.disabled
      # Only 1 kpi per widget is supported & prevent panel showing if target is currently drafting
      return unless target && _.isEmpty(ctrl.widget.kpis) && _.isEmpty(ctrl.draftTarget.value)
      ctrl.draftTarget.value = target
      toggleKpiPanel()
      return

    ctrl.editKpi = (options)->
      return if ctrl.showPanel || ctrl.disabled || _.isEmpty(ctrl.widget.kpis)
      ctrl.isEditingKpi = true
      angular.extend(ctrl.draftTarget, options)
      toggleKpiPanel()
      return

    ctrl.cancelCreateKpi = ->
      toggleKpiPanel()
      $timeout(->
        ctrl.draftTarget.value = ''
        ctrl.isEditingKpi = false
        ctrl.loading = false
      , 100)
      return

    ctrl.saveKpi = ->
      return if ctrl.loading
      ctrl.loading = true
      params = targets: {}, metadata: {}
      params.targets[ctrl.kpi.element_watched] = [{
        "#{ctrl.kpiTargetMode}": parseFloat(ctrl.draftTarget.value)
        currency: ImpacKpisSvc.getCurrentDashboard().currency
      }]
      return unless ImpacKpisSvc.validateKpiTargets(params.targets)
      promise = if ctrl.isEditingKpi
        ImpacKpisSvc.update(getKpi(), params, false).then(
          (kpi)->
            # Remove old threshold from chart
            ctrl.chart.removeThreshold(kpi.id)
            angular.extend(getKpi(), kpi)
        )
      else
        params.metadata.hist_parameters = ctrl.widget.metadata.hist_parameters
        params.widget_id = ctrl.widget.id
        ImpacKpisSvc.create(ctrl.kpi, params).then(
          (kpi)->
            ctrl.widget.kpis.push(kpi)
            kpi
        )
      promise.then(
        (kpi)->
          ImpacKpisSvc.show(kpi).then(
            (response)->
              dataKey = ImpacKpisSvc.getApiV2KpiDataKey(kpi)
              angular.extend(kpi, response.data[dataKey])
          ).finally(
            ->
              ctrl.onComplete($event: { kpi: kpi }) if _.isFunction(ctrl.onComplete)
          )
        ->
          toastr.error("Failed to save #{ctrl.kpi.element_watched} KPI", getWidgetName())
      ).finally(->
        ctrl.cancelCreateKpi()
      )

    ctrl.deleteKpi = ->
      return if ctrl.loading
      ctrl.loading = true
      ImpacKpisSvc.delete(getKpi()).then(
        ->
          toastr.success("Deleted #{ctrl.kpi.element_watched} KPI", getWidgetName())
          _.remove(ctrl.widget.kpis, (k)-> k.id == getKpi().id)
          ctrl.onComplete($event: {}) if _.isFunction(ctrl.onComplete)
        ->
          toastr.error("Failed to delete #{ctrl.kpi.element_watched} KPI", getWidgetName())
      ).finally(->
        ctrl.cancelCreateKpi()
      )

    # Private

    getKpi = ->
      _.find(ctrl.widget.kpis, (k)-> k.id == ctrl.draftTarget.kpiId)

    getWidgetName = ->
      _.startCase "#{ctrl.widget.name} widget"

    onChartNotify = (chart)->
      ctrl.chart = chart
      return unless validateHistParameters()
      Highcharts.addEvent(chart.hc.container, 'click', onChartClick)
      _.each buildThresholdsFromKpis(), (threshold)->
        thresholdSerie = ctrl.chart.findThreshold(threshold.kpiId)
        thresholdSerie = ctrl.chart.addThreshold(threshold) unless thresholdSerie?
        ctrl.chart.addThresholdEvent(thresholdSerie, 'click', onThresholdClick)
      return

    onChartClick = (event)->
      # Check whether click event fired is from the 'reset zoom' button
      return if event.srcElement.textContent == 'Reset zoom'
      # Guard for tooltips / other chart areas that don't return a yAxis value
      return unless event.yAxis && event.yAxis[0]
      value = event.yAxis[0].value
      # Guard for click events fired outside of the yAxis values range
      if !value || _.isNaN(value) then return else value = value.toFixed(2)
      ctrl.createKpi(value)

    onThresholdClick = (thresholdSerie)->
      thresholdValue = (opts = thresholdSerie.options).data[opts.data.length - 1][1].toFixed(2)
      ctrl.editKpi(kpiId: opts.kpiId, value: thresholdValue)

    disableAttachability = (logMsg)->
      ctrl.disabled = true
      toastr.warning('Chart KPIs are disabled!', getWidgetName())
      $log.warn("Impac! - #{getWidgetName()}: #{logMsg}") if logMsg

    # As this method can be called from parent component or an event callback,
    # $timeout to ensure value change is detected as per usual.
    toggleKpiPanel = ->
      $timeout(->
        if ctrl.showPanel then growChart() else shrinkChart()
        ctrl.showPanel = !ctrl.showPanel
      )

    shrinkChart = ->
      return unless ctrl.chart
      ctrl.chart.hc.setSize(null, ctrl.chart.hc.chartHeight - ctrl.chartShrinkSize, false)
      ctrl.chart.hc.container.parentElement.style.height = "#{ctrl.chart.hc.chartHeight}px"

    growChart = ->
      return unless ctrl.chart
      ctrl.chart.hc.setSize(null, ctrl.chart.hc.chartHeight + ctrl.chartShrinkSize, false)
      ctrl.chart.hc.container.parentElement.style.height = "#{ctrl.chart.hc.chartHeight}px"

    # Validate and build threshold data from widget kpi templates
    buildThresholdsFromKpis = ->
      targets = ctrl.widget.kpis? && ctrl.widget.kpis[0] && ctrl.widget.kpis[0].targets
      return [] unless ImpacKpisSvc.validateKpiTargets(targets)
      [{ kpiId: ctrl.widget.kpis[0].id, value: targets.threshold[0].min, name: 'Alert Threshold', color: ctrl.thresholdColor }]

    # Disable threshold when selected time period is strictly in the past
    validateHistParameters = ->
      widgetHistParams = ctrl.widget.metadata && ctrl.widget.metadata.hist_parameters
      # Widget histParams are YTD by default (when undefined on metadata),
      # therefore in the past by default
      ctrl.disabled = _.isEmpty(widgetHistParams) || moment(widgetHistParams.to) <= moment().startOf('day')
      return

    isCmpDisabled = ->
      if _.isEmpty(ctrl.widget.metadata.bolt_path)
        $log.error("chart-threshold.component not compatible with #{getWidgetName()} - no bolt path defined")
        true
      else
        false

    return ctrl
})
