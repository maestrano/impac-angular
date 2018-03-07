module = angular.module('impac.components.common.transactions-add',[])

module.component('transactionsAdd', {
  templateUrl: 'common/transactions-add.tmpl.html'
  bindings:
    onHide: '&'
    onCreateTransaction: '&'
    resourcesType: '='

  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.trx =
        datePicker:
          opened: false
          date: new Date()
          toggle: -> this.opened = !this.opened

      ctrl.schedulable =
        recurring: false
        interval: 4
        rule: ctrl.schedulableRules[2]
        endType: 'occurrencies'
        occurrencies: 12
        rules:  ctrl.schedulableRules
        datePicker:
          opened: false
          date: new Date()
          toggle: -> this.opened = !this.opened

      ctrl.tempDate = moment().add(10, 'weeks').toDate()

    ctrl.isValid = ->
      !_.isEmpty(ctrl.trx.name) && !isNaN(Number(ctrl.trx.amount)) && Number(ctrl.trx.amount) != 0

    ctrl.createTransaction = ->
      ctrl.onHide()
      ctrl.onCreateTransaction({ trx: ctrl.trx })

    ctrl.createSchedulable = ->
      console.log('schedulable: ', ctrl.schedulable)

    ctrl.range = (start, end) ->
      start = parseInt(start)
      end = parseInt(end)
      return [start..end]

    ctrl.schedulableRules =  [{name: 'Hourly', value: 'HourlyRule'},{name: 'Daily', value: 'DailyRule'},
                               {name: 'Weekly', value: 'WeeklyRule'},{name: 'Monthly', value: 'Monthly'},
                               {name: 'Yearly', value: 'YearlyRule'}]

    return ctrl
})
