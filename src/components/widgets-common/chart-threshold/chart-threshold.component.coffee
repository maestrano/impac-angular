module = angular.module('impac.components.widgets-common.chart-threshold', [])
module.component('chartThreshold', {
  templateUrl: 'widgets-common/chart-threshold.tmpl.html'
  bindings:
    widget: '<'
    chartPromise: '<?'
    options: '<?'
    onInit: '&?'
    onComplete: '&?'
  controller: ($timeout, ImpacKpisSvc)->
    ctrl = this

    ctrl.$onInit = ->
      # Define properties
      # -------
      ctrl.kpi = {}
      ctrl.showPanel = false
      ctrl.draftTarget = ''
      ctrl.options ||= {
        # Chart size is shrunk by x pixels on kpi tooltip show
        chartShrinkSize: 38
      }
      # Emit API to parent
      ctrl.onInit($event: { api: { createKpi: ctrl.createKpi } })
      # Get attachable kpi templates
      ImpacKpisSvc.getAttachableKpis(ctrl.widget.endpoint).then((kpiTemplates)->
        # TODO: support for multiple kpi's.
        angular.extend(ctrl.kpi, angular.copy(kpiTemplates[0]))
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
      return if ctrl.draftTarget || !target?
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
      # TODO: get target mode from engine placeholders
      params.targets[ctrl.kpi.watchables[0]] = [{ min: ctrl.draftTarget }]
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
