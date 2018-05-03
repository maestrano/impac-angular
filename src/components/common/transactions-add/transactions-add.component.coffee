module = angular.module('impac.components.common.transactions-add',[])
                .constant('SCHEDULABLE_RULES', Object.freeze([
                   {name: 'Day', value: 'DailyRule'}, {name: 'Week', value: 'WeeklyRule'},
                   {name: 'Month', value: 'MonthlyRule'}, {name: 'Year', value: 'YearlyRule'}]))

module.component('transactionsAdd', {
  templateUrl: 'common/transactions-add.tmpl.html'
  bindings:
    onHide: '&'
    onCreateTransaction: '&'
    resourcesType: '<'
    contacts: '<'
    trx: '=?'

  controller: (SCHEDULABLE_RULES)  ->
    ctrl = this
    ctrl.schedulableRules = SCHEDULABLE_RULES

    ctrl.$onInit = ->
      ctrl.editable = false

      unless(ctrl.trx?)
        ctrl.trx = {}
        ctrl.editable = true

      ctrl.trx.datePicker =
        opened: false
        date: new Date()
        toggle: -> this.opened = !this.opened

      ctrl.schedulable =
        recurring: false
        interval: 4
        validateInterval: ->
          if (angular.isUndefined(this.interval) || this.interval == null || this.interval < 1)
            this.interval = 1
        rule: ctrl.schedulableRules[2]
        endType: 'occurrencies'
        occurrencies: 12
        rules:  ctrl.schedulableRules
        datePicker:
          opened: false
          date: new Date()
          options: {minDate: new Date()}
          minDate: -1
          toggle: -> this.opened = !this.opened

      unless(ctrl.editable )
        ctrl.trx.contact = (ctrl.contacts.filter( (contact) -> contact.attributes.name == ctrl.trx.contact_name))[0]
        ctrl.schedulable.recurring = true

      ctrl.tempDate = moment().add(10, 'weeks').toDate()


    ctrl.isValid = ->
      !_.isEmpty(ctrl.trx.title) && !isNaN(Number(ctrl.trx.amount)) && Number(ctrl.trx.amount) != 0 && ctrl.trx.contact

    ctrl.createTransaction = ->
      ctrl.onHide()
      ctrl.trx = ctrl.includeSchedulable(ctrl.trx)
      ctrl.onCreateTransaction({ trx: ctrl.trx })

    ctrl.includeSchedulable = (trx) ->
      trx.recurring = ctrl.schedulable.recurring
      if trx.recurring
        trx.recurring_pattern = {
          rule_type: ctrl.schedulable.rule.value,
          interval: ctrl.schedulable.interval,
          occurrences: ctrl.schedulable.occurrencies
        }
        if ctrl.schedulable.endType == 'endDate'
          trx.recurring_end_date = ctrl.schedulable.datePicker.date

      return trx

    ctrl.range = (start, end) ->
      start = parseInt(start)
      end = parseInt(end)
      return [start..end]

    return ctrl
})
