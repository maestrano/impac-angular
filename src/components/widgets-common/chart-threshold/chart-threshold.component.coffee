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
    onComplete: '&?'
  controller: ($timeout, $log, ImpacKpisSvc, ImpacUtilities, toastr)->
    ctrl = this

    ctrl.$onInit = ->
      # Define properties
      # -------
      ctrl.kpi = {}
      ctrl.showPanel = false
      ctrl.isEditingKpi = false
      ctrl.draftTarget = value: ''
      ctrl.chartShrinkSize ||= 38
      ctrl.disabled ||= false
      ctrl.kpiTargetMode ||= 'min'
      ctrl.kpiCreateLabel ||= 'Get alerted when the target threshold goes below'
      # Get attachable kpi templates
      ImpacKpisSvc.getAttachableKpis(ctrl.widget.endpoint).then(
        (templates)->
          return disableAttachability('No valid KPI Templates found') if _.isEmpty(templates) || _.isEmpty(templates[0].watchables)
          angular.extend(ctrl.kpi, angular.copy(templates[0]))
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
      ctrl.draftTarget.value = ''
      ctrl.isEditingKpi = false
      toggleKpiPanel()
      return

    ctrl.saveKpi = ->
      params = targets: {}, metadata: {}
      params.targets[ctrl.kpi.watchables[0]] = [{
        "#{ctrl.kpiTargetMode}": ctrl.draftTarget.value
      }]
      return unless ImpacKpisSvc.validateKpiTargets(params.targets)
      promise = if ctrl.isEditingKpi
        kpi = _.find(ctrl.widget.kpis, (k)-> k.id == ctrl.draftTarget.kpiId)
        ImpacKpisSvc.update(kpi, params, false)
      else
        # TODO: improve the way the hist_params are applied onto widget kpis
        if ctrl.widget.metadata && (widgetHistParams = ctrl.widget.metadata.hist_parameters)
          params.metadata.hist_parameters = widgetHistParams
        else
          params.metadata.hist_parameters = ImpacUtilities.yearDates()
        params.widget_id = ctrl.widget.id
        ImpacKpisSvc.create('impac', ctrl.kpi.endpoint, ctrl.kpi.watchables[0], params)
      promise.then(
        (kpi)->
          ctrl.widget.kpis.push(kpi)
          ctrl.onComplete($event: { kpi: kpi }) if _.isFunction(ctrl.onComplete)
        (err)->
          toastr.error('Failed to save KPI', 'Error')
      ).finally(->
        ctrl.cancelCreateKpi()
      )

    # Private

    onChartNotify = (chart)->
      ctrl.chart = chart
      validateHistParameters()
      Highcharts.addEvent(chart.container, 'click', onChartClick)
      thresholdSeries = _.select(chart.series, (s)-> s.name.toLowerCase().includes('threshold'))
      _.each(thresholdSeries, (t)->
        Highcharts.addEvent(t, 'click', (event)-> onThresholdClick(t))
      )
      return

    onChartClick = (event)->
      # Check whether click event fired is from the 'reset zoom' button
      return if event.srcElement.textContent == 'Reset zoom'
      # Gaurd for tooltips / other chart areas that don't return a yAxis value
      return unless event.yAxis && event.yAxis[0]
      value = event.yAxis[0].value
      # Gaurd for click events fired outside of the yAxis values range
      if !value || _.isNaN(value) then return else value = value.toFixed(2)
      ctrl.createKpi(value)

    onThresholdClick = (thresholdSerie)->
      thresholdValue = (opts = thresholdSerie.options).data[opts.data.length - 1]
      ctrl.editKpi(kpiId: opts.kpiId, value: thresholdValue)

    disableAttachability = (logMsg)->
      ctrl.disabled = true
      toastr.warning("Chart threshold KPI disabled!", "#{ctrl.widget.name} Widget")
      $log.warn("Impac! - #{ctrl.widget.name} Widget: #{logMsg}") if logMsg

    # As this method can be called from parent component or an event callback,
    # $timeout to ensure value change is detected as per usual.
    toggleKpiPanel = ->
      $timeout(->
        if ctrl.showPanel then growChart() else shrinkChart()
        ctrl.showPanel = !ctrl.showPanel
      )

    shrinkChart = ->
      return unless ctrl.chart
      ctrl.chart.setSize(null, ctrl.chart.chartHeight - ctrl.chartShrinkSize, false)
      ctrl.chart.container.parentElement.style.height = "#{ctrl.chart.chartHeight}px"

    growChart = ->
      return unless ctrl.chart
      ctrl.chart.setSize(null, ctrl.chart.chartHeight + ctrl.chartShrinkSize, false)
      ctrl.chart.container.parentElement.style.height = "#{ctrl.chart.chartHeight}px"

    # Disable threshold when selected time period is strictly in the past
    validateHistParameters = ->
      widgetHistParams = ctrl.widget.metadata && ctrl.widget.metadata.hist_parameters
      # Widget histParams are YTD by default (when undefined on metadata),
      # therefore in the past by default
      ctrl.disabled = _.isEmpty(widgetHistParams) || moment(widgetHistParams.to) <= moment().startOf('day')
      return

    return ctrl
})
