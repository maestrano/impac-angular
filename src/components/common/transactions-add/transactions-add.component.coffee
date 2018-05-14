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
        ctrl.trx = { expected_payment_date: moment().utc().format() }
        ctrl.editable = true

      ctrl.trx.title = ctrl.trx.transaction_number if (ctrl.trx? && !(typeof ctrl.trx.title == "string" && ctrl.trx.title.length > 0))

      m = moment.utc(ctrl.trx.expected_payment_date)
      ctrl.trx.datePicker =
        opened: false
        date: new Date(m.year(), m.month(), m.date())
        toggle: -> this.opened = !this.opened

      ctrl.schedulable =
        recurring: false
        interval: 4
        validateInterval: ->
          this.interval = 1 unless this.interval? || this.interval > 0
        rule: ctrl.schedulableRules.find (rule) -> rule.value == 'WeeklyRule'
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
      return trx unless trx.recurring
      trx.recurring_pattern = {
        rule_type: ctrl.schedulable.rule.value,
        interval: ctrl.schedulable.interval,
        occurrences: ctrl.schedulable.occurrencies
      }
      trx.recurring_end_date = ctrl.schedulable.datePicker.date if ctrl.schedulable.endType == 'endDate'
      return trx

    ctrl.range = (start, end) ->
      start = parseInt(start)
      end = parseInt(end)
      return [start..end]

    return ctrl
})
