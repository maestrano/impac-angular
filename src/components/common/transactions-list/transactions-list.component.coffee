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
        trx.datePicker =
          opened: false
          date: moment(trx.expected_payment_date).toDate()
          toggle: ->
            this.opened = !this.opened

    return ctrl
})
