module = angular.module('impac.components.common.duplicate-transactions-list',[])

module.component('duplicateTransactionsList', {
  templateUrl: 'common/duplicate-transactions-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    onConfirmDuplication: '&'
    onChangeResources: '&'
    transactions: '<'
    currency: '<'
    resourcesType: '<'
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.currentPage = 1
      ctrl.itemsPerPage = 30
      ctrl.formatTransactions()


    ctrl.formatTransactions = ->
      for dupTrx in ctrl.transactions
        dupTrx = ctrl.formatDates(dupTrx)
        dupTrx.reconciliation_target = dupTrx.reconciliation_target.data.attributes
        dupTrx.reconciliation_target = ctrl.formatDates(dupTrx.reconciliation_target )

    ctrl.formatDates = (trx) ->
      # dates are sent in UTC by the API
      trx.trxDateUTC = moment.utc(trx.transaction_date).format('DD MMM YYYY')
      trx.dueDateUTC = moment.utc(trx.due_date).format('DD MMM YYYY')
      trx.expectedPaymentDateUTC = moment.utc(trx.expected_payment_date).format('DD MMM YYYY')
      trx.showReset = (trx.due_date != trx.expected_payment_date)
      return trx

    ctrl.changeResourcesType = ->
      ctrl
        .onChangeResources({ resourcesType: ctrl.resourcesType })
        .then(-> ctrl.$onInit())

    ctrl.changePage = ->
      ctrl
        .onPageChanged({page: ctrl.currentPage})
        .then(-> ctrl.formatTransactions())

    ctrl.showPaginationControl = ->
      return ctrl.totalRecords >= ctrl.itemsPerPage

    return ctrl
})
