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
    thresholdColor: '@'
    onComplete: '&?'
  controller: ($timeout, $log, $translate, ImpacKpisSvc, ImpacUtilities, toastr)->
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
      ctrl.timePeriod = amount: 3, duration: 'M'
      ctrl.timePeriodDurations = [
        { label: $translate.instant('impac.widget.common.chart-threshold.attach-panel.timeperiod.durations.days'), value: 'd' }
        { label: $translate.instant('impac.widget.common.chart-threshold.attach-panel.timeperiod.durations.weeks'), value: 'w' }
        { label: $translate.instant('impac.widget.common.chart-threshold.attach-panel.timeperiod.durations.months'), value: 'M' }
      ]
      ctrl.thresholdColor ||= 'rgba(0, 0, 0, 0.7)'
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
      params.targets[ctrl.kpi.watchables[0]] = [{
        "#{ctrl.kpiTargetMode}": parseFloat(ctrl.draftTarget.value)
      }]
      return ctrl.cancelCreateKpi() unless ImpacKpisSvc.validateKpiTargets(params.targets)
      params.metadata.hist_parameters = {
        from: moment().format('YYYY-MM-DD')
        to: moment().add(ctrl.timePeriod.amount, ctrl.timePeriod.duration).format('YYYY-MM-DD')
      }
      promise = if ctrl.isEditingKpi
        ImpacKpisSvc.update(getKpi(), params, false).then(
          (kpi)->
            # Remove old threshold from chart
            ctrl.chart.removeThreshold(kpi.id)
            angular.extend(getKpi(), kpi)
        )
      else
        params.widget_id = ctrl.widget.id
        ImpacKpisSvc.create('impac', ctrl.kpi.endpoint, ctrl.kpi.watchables[0], params).then(
          (kpi)->
            ctrl.widget.kpis.push(kpi)
            kpi
        )
      promise.then(
        (kpi)->
          ctrl.onComplete($event: { kpi: kpi }) if _.isFunction(ctrl.onComplete)
      ).finally(->
        ctrl.cancelCreateKpi()
      )

    ctrl.deleteKpi = ->
      return if ctrl.loading
      ctrl.loading = true
      kpiDesc = "#{ctrl.widget.name} #{(kpi = getKpi()).element_watched}"
      ImpacKpisSvc.delete(kpi).then(
        ->
          toastr.success("Deleted #{kpiDesc} KPI")
          _.remove(ctrl.widget.kpis, (k)-> k.id == kpi.id)
          ctrl.chart.removeThreshold(kpi.id)
          ctrl.onComplete($event: {}) if _.isFunction(ctrl.onComplete)
        ->
          toastr.error("Failed to delete #{kpiDesc} KPI", 'Error')
      ).finally(->
        ctrl.cancelCreateKpi()
      )

    ctrl.getSaveKpiBtnLabel = ->
      if ctrl.isEditingKpi then $translate.instant('impac.widget.common.chart-threshold.attach-panel.actions.update') else $translate.instant('impac.widget.common.chart-threshold.attach-panel.actions.save')

    # Private

    getKpi = ->
      _.find(ctrl.widget.kpis, (k)-> k.id == ctrl.draftTarget.kpiId)

    onChartNotify = (chart)->
      ctrl.chart = chart
      return unless validateHistParameters()
      ctrl.chart.addOnClickCallback(onChartClick)
      _.each buildThresholdsFromKpis(), (threshold)->
        thresholdSerie = ctrl.chart.findThreshold(threshold.kpiId)
        thresholdSerie = ctrl.chart.addThreshold(threshold) unless thresholdSerie?
        ctrl.chart.addThresholdEvent(thresholdSerie, 'click', onThresholdClick)
      return

    onChartClick = (event)->
      value = event.yAxis && event.yAxis[0] && event.yAxis[0].value
      if !value || _.isNaN(value) then return else value = value.toFixed(2)
      ctrl.createKpi(value)

    onThresholdClick = (thresholdSerie)->
      thresholdValue = (opts = thresholdSerie.options).data[opts.data.length - 1][1].toFixed(2)
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
      ctrl.chart.hc.setSize(null, ctrl.chart.hc.chartHeight - ctrl.chartShrinkSize, false)
      ctrl.chart.hc.container.parentElement.style.height = "#{ctrl.chart.hc.chartHeight}px"

    growChart = ->
      return unless ctrl.chart
      ctrl.chart.hc.setSize(null, ctrl.chart.hc.chartHeight + ctrl.chartShrinkSize, false)
      ctrl.chart.hc.container.parentElement.style.height = "#{ctrl.chart.hc.chartHeight}px"

    # Disable threshold when selected time period is strictly in the past
    validateHistParameters = ->
      widgetHistParams = ctrl.widget.metadata && ctrl.widget.metadata.hist_parameters
      ctrl.disabled = widgetHistParams? && moment(widgetHistParams.to) <= moment.utc().startOf('day')
      return !ctrl.disabled

    # Validate and build threshold data from widget kpi templates
    buildThresholdsFromKpis = ->
      thresholds = []
      targets = ctrl.widget.kpis? && (kpi = ctrl.widget.kpis[0])? && kpi.targets
      return thresholds unless ImpacKpisSvc.validateKpiTargets(targets)
      threshold =
        kpiId: kpi.id
        value: targets.threshold[0].min
        name: 'Alert Threshold'
        color: ctrl.thresholdColor
      threshold.tooltipHtml = timePeriodDurationTooltip(kpi)
      thresholds.push(threshold)
      thresholds

    timePeriodDurationTooltip = (kpi)->
      to = _.get(kpi, 'settings.hist_parameters.to')
      from = _.get(kpi, 'settings.hist_parameters.from')
      return unless to && from
      duration = _.round(moment.duration(moment(to).diff(moment(from))).asDays())
      "<br>For the next: #{duration} days"

    return ctrl
})
