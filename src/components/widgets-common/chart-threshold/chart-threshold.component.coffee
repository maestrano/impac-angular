###
#   @desc Chart Threshold - create Widget KPIs from Widget charts. (Highchart widgets only).
#   @todo support for multiple KPI watchables?
#   @todo support for multiple KPI targets?
###
module = angular.module('impac.components.widgets-common.chart-threshold', [])
module.component('chartThreshold', {
  templateUrl: 'widgets-common/chart-threshold.tmpl.html'
  bindings:
    widget: '<'
    chartPromise: '<?'
    options: '<?'
    onInit: '&?'
    onComplete: '&?'
  controller: ($timeout, $log, ImpacKpisSvc, toastr)->
    ctrl = this

    DEFAULT_OPTS = Object.freeze {
      # whether threshold attachability is disabled
      disabled: false
      # Chart size is shrunk by x pixels on kpi tooltip show
      chartShrinkSize: 38
      # KPI target mode
      kpiTargetMode: 'min'
      # Label shown when user is creating a KPI to give context to the target value.
      kpiCreateLabel: 'Get alerted when the target threshold goes below'
    }

    ctrl.$onInit = ->
      # Define properties
      # -------
      ctrl.kpi = {}
      ctrl.showPanel = false
      ctrl.draftTarget = ''
      # Configurable defaults
      ctrl.options = angular.merge({}, DEFAULT_OPTS, ctrl.options)
      # Emit API to parent
      ctrl.onInit($event: { api: { createKpi: ctrl.createKpi } })
      # Get attachable kpi templates
      ImpacKpisSvc.getAttachableKpis(ctrl.widget.endpoint).then(
        (templates)->
          return disableAttachability('No valid KPI Templates found') if _.isEmpty(templates) || _.isEmpty(templates[0].watchables)
          angular.extend(ctrl.kpi, angular.copy(templates[0]))
        ->
          disableAttachability()
      )
      # Register to chart changes
      ctrl.chartPromise.then(null, null, (chart)->
        ctrl.chart = chart
        # TODO: Not working for some reason =\ how can I update click event after init
        # ctrl.chart.update({
        #   chart: events: click: chartClickEvent
        # })
      )

    ctrl.createKpi = (target)->
      return if ctrl.options.disabled || !_.isEmpty(ctrl.draftTarget) || !target?
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
        "#{ctrl.options.kpiTargetMode}": ctrl.draftTarget
      }]
      return unless ImpacKpisSvc.validateKpiTargets(params.targets)
      params.widget_id = ctrl.widget.id
      ImpacKpisSvc.create('impac', ctrl.kpi.endpoint, ctrl.kpi.watchables[0], params).then(
        (kpi)->
          ctrl.widget.kpis.push(kpi)
          ctrl.onComplete($event: { kpi: kpi })
      ).finally(->
        ctrl.cancelCreateKpi()
      )

    # Private

    disableAttachability = (logMsg)->
      ctrl.options.disabled = true
      toastr.warning("Chart threshold KPI disabled!", "#{ctrl.widget.name} Widget")
      $log.warn("Impac! - #{ctrl.widget.name} Widget: #{logMsg}") if logMsg

    # chartClickEvent = (event)->
    #   # Currently only one kpi per widget is supported in the front-end
    #   return if options.disableCreate
    #   selectedValue = event.yAxis[0].value.toFixed(2)
    #   ctrl.createKpi(selectedValue)

    shrinkChart = ->
      return unless ctrl.chart
      ctrl.chart.setSize(null, ctrl.chart.chartHeight - ctrl.options.chartShrinkSize, false)
      ctrl.chart.container.parentElement.style.height = "#{ctrl.chart.chartHeight}px"

    growChart = ->
      return unless ctrl.chart
      ctrl.chart.setSize(null, ctrl.chart.chartHeight + ctrl.options.chartShrinkSize, false)
      ctrl.chart.container.parentElement.style.height = "#{ctrl.chart.chartHeight}px"


    return ctrl
})
