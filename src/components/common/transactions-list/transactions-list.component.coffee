module = angular.module('impac.components.common.transactions-list',[])

module.component('transactionsList', {
  templateUrl: 'common/transactions-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    onUpdateExpectedDate: '&'
    onChangeResources: '&'
    onDeleteTransaction: '&'
    onCreateSchedulableTransaction: '&'
    onModifySchedulableTransaction: '&'
    onDeleteSchedulableTransaction: '&'
    transactions: '<'
    currency: '<'
    totalRecords: '<'
    resourcesType: '<'
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.currentPage = 1
      ctrl.totalAmount = 0.0
      ctrl.totalBalance = 0.0

      for trx in ctrl.transactions
        ctrl.totalAmount += trx.amount
        ctrl.totalBalance += trx.balance

        # dates are sent in UTC by the API
        trx.trxDateUTC = moment.utc(trx.transaction_date).format('DD MMM YYYY')
        trx.dueDateUTC = moment.utc(trx.due_date).format('DD MMM YYYY')
        trx.showReset = (trx.due_date != trx.expected_payment_date)

        m = moment.utc(trx.expected_payment_date)
        trx.datePicker =
          opened: false
          # JS Date object is required by uib-datepicker-tooltip
          date: new Date(m.year(), m.month(), m.date())
          toggle: ->
            this.opened = !this.opened

    ctrl.changeResourcesType = ->
      ctrl
        .onChangeResources({ resourcesType: ctrl.resourcesType })
        .then(-> ctrl.$onInit())

    ctrl.changeExpectedDate = (trx) ->
      trx.showReset = true
      ctrl.onUpdateExpectedDate({ trxId: trx.id, date: trx.datePicker.date })

    ctrl.resetExpectedDate = (trx) ->
      trx.showReset = false
      m = moment.utc(trx.due_date)
      expDate = new Date(m.year(), m.month(), m.date())
      trx.datePicker.date = expDate
      ctrl.onUpdateExpectedDate({ trxId: trx.id, date: trx.datePicker.date })

    ctrl.canCreateSchedulableTransaction = (trx) ->
      return trx.status != 'FORECAST' && !trx.recurring

    ctrl.canModifySchedulableTransaction = (trx) ->
      return trx.recurring || (!trx.recurring_parent && trx.status == 'FORECAST')

    ctrl.canDeleteSchedulableTransaction = (trx) ->
      return (trx.status == 'FORECAST' && (trx.recurring || !trx.recurring_parent)) || (trx.status != 'FORECAST' && trx.recurring)

    return ctrl
})
