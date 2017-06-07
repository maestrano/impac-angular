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
  controller: ($timeout, $log, ImpacKpisSvc, toastr)->
    ctrl = this

    ctrl.$onInit = ->
      # Define properties
      # -------
      ctrl.kpi = {}
      ctrl.showPanel = false
      ctrl.draftTarget = ''
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
      # Register to chart changes
      ctrl.chartPromise.then(null, null, onChartNotify) if ctrl.chartPromise? && _.isFunction(ctrl.chartPromise.then)

    ctrl.createKpi = (target)->
      return if ctrl.disabled
      # Only 1 kpi per widget is supported & prevent panel showing if target is currently drafting
      return unless target && _.isEmpty(ctrl.widget.kpis) && _.isEmpty(ctrl.draftTarget)
      ctrl.draftTarget = target
      # As this method can be called from parent component, dirty checking in this ctrl
      # scope are not checked, this ensures value change is detected as per usual.
      $timeout(->
        ctrl.showPanel = true
        shrinkChart()
      )
      return

    ctrl.cancelCreateKpi = ->
      ctrl.draftTarget = ''
      ctrl.showPanel = false
      growChart()
      return

    ctrl.saveKpi = ->
      params = {}
      params.targets = {}
      params.targets[ctrl.kpi.watchables[0]] = [{
        "#{ctrl.kpiTargetMode}": ctrl.draftTarget
      }]
      return unless ImpacKpisSvc.validateKpiTargets(params.targets)
      params.widget_id = ctrl.widget.id
      ImpacKpisSvc.create('impac', ctrl.kpi.endpoint, ctrl.kpi.watchables[0], params).then(
        (kpi)->
          ctrl.widget.kpis.push(kpi)
          ctrl.onComplete($event: { kpi: kpi }) if _.isFunction(ctrl.onComplete)
      ).finally(->
        ctrl.cancelCreateKpi()
      )

    # Private

    onChartNotify = (chart)->
      ctrl.chart = chart
      Highcharts.addEvent(chart.container, 'click', onChartClick)
      return

    onChartClick = (event)->
      # Check whether click event fired is from the 'reset zoom' button
      return if event.srcElement.textContent == 'Reset zoom'
      value = event.yAxis[0].value
      # Gaurd for click events fired outside of the yAxis values range
      if !value || _.isNaN(value) then return else value = value.toFixed(2)
      ctrl.createKpi(value)

    disableAttachability = (logMsg)->
      ctrl.disabled = true
      toastr.warning("Chart threshold KPI disabled!", "#{ctrl.widget.name} Widget")
      $log.warn("Impac! - #{ctrl.widget.name} Widget: #{logMsg}") if logMsg

    shrinkChart = ->
      return unless ctrl.chart
      ctrl.chart.setSize(null, ctrl.chart.chartHeight - ctrl.chartShrinkSize, false)
      ctrl.chart.container.parentElement.style.height = "#{ctrl.chart.chartHeight}px"

    growChart = ->
      return unless ctrl.chart
      ctrl.chart.setSize(null, ctrl.chart.chartHeight + ctrl.chartShrinkSize, false)
      ctrl.chart.container.parentElement.style.height = "#{ctrl.chart.chartHeight}px"


    return ctrl
})
