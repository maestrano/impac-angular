module = angular.module('impac.components.common.trends-list',[])

module.component('trendsList', {
  templateUrl: 'common/trends-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    onDeleteTrend: '&'
    onUpdateTrend: '&'
    groups: '<'
    totalRecords: '<'
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.startDateOptions = { minDate: new Date() }
      ctrl.lastDateOptions = { minDate: new Date() }
      ctrl.currentPage = 1
      for group in ctrl.groups
        group.expanded = false
        for trend in group.trends
          trend.editMode = false
          ctrl.setDatePickers(trend)
      ctrl.originalGroups = _.map(ctrl.groups, _.cloneDeep)

    ctrl.setDatePickers = (trend) ->
      m = moment.utc(trend.last_apply_date)
      trend.untilDatePicker =
        opened: false
        date: m.toDate()
        toggle: ->
          this.opened = !this.opened if trend.editMode
      m = moment.utc(trend.start_date)
      trend.startDatePicker =
        opened: false
        date: m.toDate()
        toggle: ->
          this.opened = !this.opened if trend.editMode

    ctrl.updateStartDate = (trend) ->
      ctrl.lastDateOptions.minDate = trend.startDatePicker.date

    ctrl.deleteTrendModal =
      trend: null
      display: false
      show: (trend) ->
        this.trend = trend
        this.display = true
      cancel: ->
        this.trend = null
        this.display = false
      delete: ->
        ctrl.onDeleteTrend({ trendId: this.trend.id })
        trendGroup = _.find(ctrl.groups, _.flow(
          _.property('trends'),
          _.partialRight(_.some, { id: this.trend.id })
        ))
        trend = _.find(trendGroup.trends, 'id', this.trend.id)
        trendGroup.trends.splice(_.findIndex(trendGroup.trends, {id: trendGroup.id}), 1)
        ctrl.originalGroups = _.map(ctrl.groups, _.cloneDeep)
        this.cancel()

    ctrl.updateTrend = (trend) ->
      trend.last_apply_date = trend.untilDatePicker.date unless trend.period == 'once'
      trend.start_date = trend.startDatePicker.date
      ctrl.onUpdateTrend({ trend: _.omit(trend, 'startDatePicker', 'untilDatePicker', 'editMode') })
      ctrl.originalGroups = _.map(ctrl.groups, _.cloneDeep)
      trend.editMode = false

    ctrl.cancelEdit = (trendId) ->
      trendGroup = _.find(ctrl.originalGroups, _.flow(
        _.property('trends'),
        _.partialRight(_.some, { id: trendId })
      ))
      trendGroup.expanded = true
      trend = _.find(trendGroup.trends, 'id', trendId)
      trend.editMode = false
      ctrl.setDatePickers(trend)
      ctrl.groups.splice(_.findIndex(ctrl.groups, {id: trendGroup.id}), 1, trendGroup)
      ctrl.originalGroups = _.map(ctrl.groups, _.cloneDeep)

    ctrl.formatDate = (date, trend) ->
      if !date
        if !trend.period then date = trend.start_date else return 'forever'
      moment.utc(date).format("DD-MM-YYYY")

    return ctrl
})
