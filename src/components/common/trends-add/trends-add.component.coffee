module = angular.module('impac.components.common.trends-add',[])

module.component('trendsAdd', {
  templateUrl: 'common/trends-add.tmpl.html'
  bindings:
    onHide: '&'
    onCreateTrend: '&'

  controller: ($scope) ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.datePicker =
        opened: false
        date: new Date()
        toggle: ->
          this.opened = true
      ctrl.trend =
        rate: 0
        period: "Daily"
        untilDate: -1
      ctrl.selectedPeriod = 1

    ctrl.period = ->
      switch ctrl.trend.period
        when "Once"
          ctrl.trend.untilDate = null
          ""
        when "Daily" then ("Day" + (if ctrl.selectedPeriod <= 1 then "" else "s"))
        when "Weekly" then ("Week" + (if ctrl.selectedPeriod <= 1 then "" else "s"))
        when "Monthly" then ("Month" + (if ctrl.selectedPeriod <= 1 then "" else "s"))
        when "Annually" then ("Year" + (if ctrl.selectedPeriod <= 1 then "" else "s"))

    ctrl.isPeriodDisabled = ->
      ctrl.trend.period == "Once"

    ctrl.isValid = ->
      !_.isEmpty(ctrl.trend.name) &&
      ctrl.trend.rate > 0 &&
      ctrl.trend.untilDate? || ctrl.trend.period == "Once"

    ctrl.createTrend = ->
      ctrl.onHide()
      ctrl.trend.period = ctrl.trend.period.toLowerCase()
      ctrl.onCreateTrend({ trend: ctrl.trend })

    ctrl.updateDate = ->
      ctrl.trend.untilDate = ctrl.datePicker.date

    return ctrl
})
