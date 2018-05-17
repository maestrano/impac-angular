module = angular.module('impac.components.common.trends-add',[])

module.component('trendsAdd', {
  templateUrl: 'common/trends-add.tmpl.html'
  bindings:
    onHide: '&'
    onCreateTrend: '&'
    accounts: '<'
    chart: '<'
    accountsLastValues: '<'
    accountsLastValues: '<'
    groups: '<'
    boltPath: '<'
    companyId: '<'

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

    ctrl.createTrend = ->
      return ctrl.createGroup() if ctrl.isAddingGroup
      ctrl.onHide()
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
      ctrl.redrawCurrentTrend()
      ctrl.lastDateOptions.minDate = ctrl.trend.startDate

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
      newSerie = angular.copy(_.find(ctrl.chart.series, 'name', 'Projected cash'))
      newData = applyTrend(ctrl.trend, newSerie.data, ctrl.accountsLastValues[ctrl.trend.account_id.id])
      delete newSerie['type']
      _.merge(newSerie, { name: "Current trend", zones: [{dashStyle: "ShortDot"}], color: "rgb(124, 77, 255)", data: newData })
      ctrl.chart.series.push(newSerie)
      ctrl.renderChart()

    # Apply the trend on the cash values in data, based on the account last value
    # data = [[timestamps, values]*]
    applyTrend = (trend, data, lastValue) ->
      unified = _.zip.apply(this, data)
      timestamps = unified[0]
      values = unified[1]

      # Find index for trend's start and last date in timestamps
      startIndex = timestamps.findIndex((t) -> t > trend.startDate.getTime()) - 1
      lastIndex = lastApplicationIndex(trend, timestamps)

      # Between startIndex and lastIndex, apply trend when period allows it
      increment = 0
      startDate = timestamps[startIndex]
      for i in [startIndex..lastIndex]
        continue unless shouldApplyTrend(trend, startDate, timestamps[i])
        increment = lastValue * trend.rate / 100.0
        lastValue += increment
        incrementRemainingValues(values, i, increment)

      # Return data with timestamps
      _.map([0...timestamps.length], (i) -> [timestamps[i], values[i]])

    shouldApplyTrend = (trend, startDate, currentDate) ->
      date = new Date(currentDate)
      switch trend.period
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

    lastApplicationDate = (trend) ->
      return trend.untilDate if trend.untilDate instanceof Date
      period = null
      if trend.untilDate == -1 then return
      switch trend.period
        when 'Once' then return null
        when 'Daily' then period = 'days'
        when 'Weekly' then period = 'weeks'
        when 'Monthly' then period = 'months'
        when 'Yearly' then period = 'years'
      moment.utc(trend.startDate).add(trend.untilDate, period).format('YYYY-MM-DD')

    lastApplicationIndex = (trend, timestamps) ->
      untilDate = lastApplicationDate(trend)
      return timestamps.length - 1 unless untilDate
      untilDate = new Date(untilDate)
      lastIndex = timestamps.findIndex (timestamp) -> timestamp > untilDate.getTime()
      if lastIndex == -1 then timestamps.length - 1 else lastIndex

    incrementRemainingValues = (values, start, increment) ->
      for i in [start...values.length]
        values[i] += increment

    ctrl.cancel = ->
      _.remove(ctrl.chart.series, {name: "Current trend"})
      ctrl.onHide()

    ctrl.switchAddingGroup = (value) ->
      ctrl.isAddingGroup = value
      ctrl.redrawCurrentTrend()

    return ctrl
})
