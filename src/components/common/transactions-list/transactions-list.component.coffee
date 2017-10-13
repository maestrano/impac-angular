module = angular.module('impac.components.common.transactions-list',[])

module.component('transactionsList', {
  templateUrl: 'common/transactions-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    onUpdateExpectedDate: '&'
    transactions: '<'
    totalDue: '<'
    currency: '<'
    totalRecords: '<'
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.currentPage = 1

      for trx in ctrl.transactions
        # dates are sent in UTC by the API => a conversion to JS Date is necessary
        trx.trxDateUTC = moment.utc(trx.transaction_date).format('DD MMM YYYY')
        trx.dueDateUTC = moment.utc(trx.due_date).format('DD MMM YYYY')

        m = moment.utc(trx.expected_payment_date)
        trx.datePicker =
          opened: false
          date: new Date(m.year(), m.month(), m.date())
          toggle: ->
            this.opened = !this.opened

    return ctrl
})
