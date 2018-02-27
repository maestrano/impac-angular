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

      for dupTrx in ctrl.transactions
        dupTrx.origin = dupTrx.origin.data.attributes
        dupTrx.forecast = dupTrx.forecast.data.attributes
        dupTrx.origin = ctrl.formatDates(dupTrx.origin)
        dupTrx.forecast = ctrl.formatDates(dupTrx.forecast)

    ctrl.formatDates = (trx) ->
        # dates are sent in UTC by the API
        trx.trxDateUTC = moment.utc(trx.transaction_date).format('DD MMM YYYY')
        trx.dueDateUTC = moment.utc(trx.due_date).format('DD MMM YYYY')
        trx.expectedPaymentDateUTC = moment.utc(trx.expected_payment_date).format('DD MMM YYYY')
        trx.showReset = (trx.due_date != trx.expected_payment_date)
        return trx

    return ctrl
})
