module = angular.module('impac.components.widgets-settings.attach-kpis', [])
module.component('settingAttachKpi', {
  bindings: {
    widget: '<'
    chartPromise: '<?'
    options: '<?'
    onInit: '&?'
    onComplete: '&?'
  }
  templateUrl: 'widgets-settings/attach-kpi.tmpl.html'
  controller: ($timeout, ImpacKpisSvc, ImpacDashboardsSvc)->
    ctrl = this

    ctrl.$onInit = ->
      # Define properties
      # -------
      ctrl.kpi = {}
      ctrl.showPanel = false
      ctrl.draftTarget = ''
      ctrl.options ||= {
        chartShrinkSize: 30
      }
      ctrl.dhbCurrency = ImpacDashboardsSvc.getCurrentDashboard().currency
      # Emit API to parent
      ctrl.onInit($event: { api: { createKpi: ctrl.createKpi } })
      # Get attachable kpi templates
      ImpacKpisSvc.getAttachableKpis(ctrl.widget.endpoint).then((kpiTemplates)->
        # TODO: support for multiple kpi's.
        angular.extend(ctrl.kpi, angular.copy(kpiTemplates[0]))
      )
      # Register to dashboard change for currency update
      ImpacDashboardsSvc.dashboardUpdated().then(null, null, (dhb)->
        ctrl.dhbCurrency = dhb.currency
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
      # Also, improve animation of chart shrinking & panel rendering.
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

    growChart = ->
      return unless ctrl.chart
      ctrl.chart.setSize(null, ctrl.chart.chartHeight + ctrl.options.chartShrinkSize, false)


    return ctrl
})
