module = angular.module('impac.components.common.trends-add',[])

module.component('trendsAdd', {
  templateUrl: 'common/trends-add.tmpl.html'
  bindings:
    onHide: '&'
    onCreateTrend: '&'
    accounts: '='
    chart: '='
    accountsLastValues: '='

  controller: ($scope, HighchartsFactory) ->
    ctrl = this

    ctrl.$onInit = ->
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
      ctrl.trend.rate > 0 &&
      (ctrl.trend.untilDate? || ctrl.trend.period == "Once") &&
      !_.isEmpty(ctrl.trend.account_id)

    ctrl.isValid = ->
      !_.isEmpty(ctrl.trend.name) &&
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
      ctrl.onHide()
      ctrl.trend.period = ctrl.trend.period.toLowerCase()
      ctrl.trend.account_id = ctrl.trend.account_id.id
      ctrl.trend.untilDate = ctrl.untilDate()
      ctrl.onCreateTrend({ trend: ctrl.trend })

    ctrl.updateStartDate = ->
      ctrl.trend.startDate = ctrl.startDatePicker.date
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
      newSerie = Object.assign({}, _.find(ctrl.chart.series, 'name', 'Projected cash'))
      newData = ctrl.applyTrend(newSerie.data)
      delete newSerie['type']
      newSerie.name = "Current trend"
      newSerie.zones = [{dashStyle: "ShortDot"}]
      newSerie.color = "rgb(124, 77, 255)"
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
      currentValue = ctrl.accountsLastValues[ctrl.trend.account_id.id]
      increment = 0
      for i in [startIndex...timestamps.length]
        if ctrl.shouldApplyTrend(startDate, timestamps[i]) && i <= lastIndex
          increment = currentValue * ctrl.trend.rate / 100.0
          currentValue += increment
        values[i] += increment
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

    ctrl.cancel = ->
      _.remove(ctrl.chart.series, {name: "Current trend"})
      ctrl.onHide()

    return ctrl
})
