module = angular.module('impac.components.common.trends-list',[])

module.component('trendsList', {
  templateUrl: 'common/trends-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    onDeleteTrend: '&'
    onUpdateTrend: '&'
    trends: '<'
    totalRecords: '<'
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.currentPage = 1
      for trend in ctrl.trends
        ctrl.setDatePicker(trend)
      ctrl.originalTrends = _.map(ctrl.trends, _.clone)

    ctrl.setDatePicker = (trend) ->
      m = moment.utc(trend.last_apply_date)
      trend.datePicker =
        opened: false
        date: new Date(m.year(), m.month(), m.date())
        toggle: ->
          this.opened = !this.opened if ctrl.editMode

    ctrl.onEditTrend = ->
      ctrl.editMode = true

    ctrl.updateTrend = (trend) ->
      trend.last_apply_date = trend.datePicker.date
      ctrl.onUpdateTrend({ trend: _.omit(trend, 'datePicker') })
      ctrl.originalTrends = _.map(ctrl.trends, _.clone)
      ctrl.editMode = false

    ctrl.cancelEdit = (trendId) ->
      trend = _.find(ctrl.originalTrends, 'id', trendId)
      ctrl.setDatePicker(trend)
      ctrl.trends.splice(_.findIndex(ctrl.trends, {id: trendId}), 1, trend)
      ctrl.originalTrends = _.map(ctrl.trends, _.clone)
      ctrl.editMode = false

    return ctrl
})
