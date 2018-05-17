module = angular.module('impac.components.common.trends-add',[])

module.component('trendsAdd', {
  templateUrl: 'common/trends-add.tmpl.html'
  bindings:
    onHide: '&'
    onCreateTrend: '&'
    accounts: '='
    chart: '='
    accountsLastValues: '='
    groups: '='
    boltPath: '='
    companyId: '='
  # TODO: See if we can reduce the number of bindings

  controller: ($scope, HighchartsFactory, BoltResources) ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.startDateOptions = { minDate: new Date() }
      ctrl.lastDateOptions = { minDate: new Date() }
      ctrl.untilDatePicker =
        opened: false
        date: new Date()
        toggle: ->
          this.opened = true
      ctrl.startDatePicker =
        opened: false
        date: new Date()
        toggle: ->
          this.opened = true
      ctrl.trend =
        rate: 0
        period: "Daily"
        startDate: new Date()
        untilDate: -1
      ctrl.selectedPeriod = 1
      ctrl.renderChart()

    ctrl.period = ->
      switch ctrl.trend.period
        when "Once"
          ctrl.trend.untilDate = null
          ""
        when "Daily" then ("Day" + (if ctrl.selectedPeriod <= 1 then "" else "s"))
        when "Weekly" then ("Week" + (if ctrl.selectedPeriod <= 1 then "" else "s"))
        when "Monthly" then ("Month" + (if ctrl.selectedPeriod <= 1 then "" else "s"))
        when "Yearly" then ("Year" + (if ctrl.selectedPeriod <= 1 then "" else "s"))

    ctrl.isPeriodDisabled = ->
      ctrl.trend.period == "Once"

    ctrl.dataIsValid = ->
      ctrl.trend.rate != 0 &&
      (ctrl.trend.untilDate? || ctrl.trend.period == "Once") &&
      !_.isEmpty(ctrl.trend.account)

    ctrl.isValid = ->
      !_.isEmpty(ctrl.trend.name) &&
      ((ctrl.trend.trends_group && !ctrl.isAddingGroup) ||
        (ctrl.trend.groupName && ctrl.isAddingGroup)) &&
      ctrl.dataIsValid()

    ctrl.untilDate = ->
      return ctrl.trend.untilDate if ctrl.trend.untilDate instanceof Date
      period = null
      if ctrl.trend.untilDate == -1 then return
      switch ctrl.trend.period
        when 'Once' then return null
        when 'Daily' then period = 'days'
        when 'Weekly' then period = 'weeks'
        when 'Monthly' then period = 'months'
        when 'Yearly' then period = 'years'
      moment.utc(ctrl.trend.startDate).add(ctrl.trend.untilDate, period).format('YYYY-MM-DD')

    ctrl.createTrend = ->
      return ctrl.createGroup() if ctrl.isAddingGroup
      ctrl.onHide()
      ctrl.trend.untilDate = ctrl.untilDate()
      ctrl.trend.period = ctrl.trend.period.toLowerCase()
      ctrl.trend.trends_group_id = ctrl.trend.trends_group.id
      ctrl.trend.account_id = ctrl.trend.account.id
      ctrl.onCreateTrend({ trend: ctrl.trend })

    ctrl.createGroup = ->
      BoltResources.create(
        ctrl.boltPath,
        'trends_groups',
        { name: ctrl.trend.groupName },
        { company: { data: { type: 'companies', id: ctrl.companyId } } }
      ).then(
        (response) ->
          ctrl.trend.trends_group = response.data.data
          ctrl.isAddingGroup = false
          ctrl.createTrend()
      )

    ctrl.updateStartDate = ->
      ctrl.trend.startDate = ctrl.startDatePicker.date
      ctrl.lastDateOptions.minDate = ctrl.trend.startDate
      ctrl.redrawCurrentTrend()

    ctrl.updateUntilDate = ->
      ctrl.trend.untilDate = ctrl.untilDatePicker.date
      ctrl.redrawCurrentTrend()

    ctrl.updatePeriod = ->
      ctrl.trend.untilDate = ctrl.selectedPeriod
      ctrl.redrawCurrentTrend()

    ctrl.renderChart = ->
      options = ctrl.chart.highChartOptions
      ctrl.addChart = new HighchartsFactory('trends-add-chart', ctrl.chart.series, options)
      ctrl.addChart.removeRangeSelector(1)
      ctrl.addChart.removeNavigator()
      ctrl.addChart.render()

    ctrl.redrawCurrentTrend = ->
      return unless ctrl.dataIsValid()
      _.remove(ctrl.chart.series, {name: "Current trend"})
      if ctrl.trend.trends_group && !ctrl.isAddingGroup
        newSerie = Object.assign({}, _.find(ctrl.chart.series, 'name', ctrl.trend.trends_group.attributes.name))
      else
        newSerie = Object.assign({}, _.find(ctrl.chart.series, 'name', 'Projected cash'))
      newData = ctrl.applyTrend(newSerie.data)
      delete newSerie['type']
      newSerie.name = "Current trend"
      newSerie.zones = [{dashStyle: "ShortDot"}]
      newSerie.color = "#ff1844"
      newSerie.data = newData
      ctrl.chart.series.push(newSerie)
      ctrl.renderChart()

    ctrl.applyTrend = (data) ->
      timestamps = data.map (x) -> x[0]
      values = data.map (x) -> x[1]
      startIndex = timestamps.findIndex (timestamp) -> timestamp > ctrl.trend.startDate.getTime()
      startDate = timestamps[startIndex]
      untilDate = ctrl.untilDate()
      untilDate = new Date(untilDate) if untilDate
      if untilDate
        lastIndex = timestamps.findIndex (timestamp) -> timestamp > untilDate.getTime()
        lastIndex = timestamps.length if lastIndex == -1
      else
        lastIndex = timestamps.length
      currentValue = ctrl.accountsLastValues[ctrl.trend.account.id]
      increment = 0
      for i in [startIndex...lastIndex]
        if ctrl.shouldApplyTrend(startDate, timestamps[i])
          increment = currentValue * ctrl.trend.rate / 100.0
          currentValue += increment
          for j in [i...timestamps.length]
            values[j] += increment
      res = []
      for i in [0...timestamps.length]
        res.push([timestamps[i], values[i]])
      res

    ctrl.shouldApplyTrend = (startDate, currentDate) ->
      date = new Date(currentDate)
      switch ctrl.trend.period
        when 'Once'
          startDate == currentDate
        when 'Daily'
          true
        when 'Weekly'
          Math.ceil((currentDate - startDate) / (1000 * 3600 * 24)) % 7 == 0
        when 'Monthly'
          date.getDate() == 1
        when 'Yearly'
          date.getDate() == 1 && date.getMonth() == 0

    ctrl.switchAddingGroup = (value) ->
      ctrl.isAddingGroup = value
      ctrl.redrawCurrentTrend()

    ctrl.cancel = ->
      _.remove(ctrl.chart.series, {name: "Current trend"})
      ctrl.onHide()

    return ctrl
})
