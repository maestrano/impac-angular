module = angular.module('impac.components.common.transactions-list',[])

module.component('transactionsList', {
  templateUrl: 'common/transactions-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    onUpdateExpectedDate: '&'
    onChangeResources: '&'
    onDeleteTransaction: '&'
    onIncludeSchedulableTransaction: '&'
    onDeleteSchedulableTransaction: '&'
    onCurrencyChange: '&'
    transactions: '<'
    currency: '<'
    contacts: '<'
    totalRecords: '<'
    resourcesType: '<'
    listOnly: '<'
  controller: ->
    ctrl = this
    ctrl.currentAttributes = { currency: '', resourcesType: '', transactions: [] }
    ctrl.$onInit = ->
      ctrl.currentPage = 1
      ctrl.itemsPerPage = 30
      ctrl.totalAmount = 0.0
      ctrl.totalBalance = 0.0
      ctrl.formatTransactions()
      ctrl.calculateTotals()

    ctrl.formatTransactions = ->
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
          date: moment().toDate()
          toggle: ->
            this.opened = !this.opened

    ctrl.$onChanges = (changes) ->
      if changes.currency && (changes.currency.currentValue != ctrl.currentAttributes.currency)
        ctrl.onCurrencyChange().then(-> ctrl.$onInit())

    ctrl.changeResourcesType = ->
      ctrl
        .onChangeResources({ resourcesType: ctrl.resourcesType })
        .then(-> ctrl.$onInit())

    # update current attributes after data is fetched and processed to prevent premature rendering.
    ctrl.updateCurrentAttributes = (newAttrs) ->
      _.remove(ctrl.currentAttributes.transactions, -> true) if newAttrs.transactions
      _.merge(ctrl.currentAttributes, newAttrs)

    ctrl.changePage = ->
      ctrl
        .onPageChanged({page: ctrl.currentPage})
        .then(->
          ctrl.formatTransactions()
          ctrl.calculateTotals()
        )

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

    ctrl.canDeleteSchedulableTransaction = (trx) ->
      return (trx.status == 'FORECAST' && (trx.recurring || trx.recurring_parent)) || (trx.status != 'FORECAST' && trx.recurring)

    ctrl.deleteSchedule =
      args: {}
      display: false
      show: (args) ->
        this.args = args
        this.display = true
      cancel: ->
        this.args = {}
        this.display = false
      delete: ->
        ctrl.onDeleteSchedulableTransaction(this.args)
        this.display = false

    ctrl.createSchedule =
      trx: null
      display: false
      show: (args) ->
        this.trx = args.trx
        this.display = true
      hide: ->
        this.display = false
      create: (resourcesType) ->
        ctrl.onIncludeSchedulableTransaction({ trx: this.trx, resourcesType: resourcesType })
        this.display = false

    ctrl.showPaginationControl = ->
      return ctrl.totalRecords >= ctrl.itemsPerPage

    ctrl.calculateTotals = () ->
      # Moved logic from initialize to support recalculation on page change.
      ctrl.totalAmount = 0.0
      ctrl.totalBalance = 0.0
      for trx in ctrl.transactions
        ctrl.totalAmount += trx.amount
        ctrl.totalBalance += trx.balance
        ctrl.formatDate(trx)
      # Update attributes so rendering happens after calculation.
      ctrl.updateCurrentAttributes({ currency: ctrl.currency, resourcesType: ctrl.resourcesType, transactions: ctrl.transactions })

    ctrl.formatDate = (trx) ->
      # dates are sent in UTC by the API
      trx.trxDateUTC = moment.utc(trx.transaction_date).format('DD MMM YYYY')
      trx.dueDateUTC = moment.utc(trx.due_date).format('DD MMM YYYY')

      unless ctrl.listOnly
        trx.showReset = (trx.due_date != trx.expected_payment_date)
        m = moment.utc(trx.expected_payment_date)
        trx.datePicker =
          opened: false
          # JS Date object is required by uib-datepicker-tooltip
          date: new Date(m.year(), m.month(), m.date())
          toggle: ->
            this.opened = !this.opened

    # If the transaction is a "child" forecast, we remove it from the list and trigger the callback
    # If it is a "parent" forecast, we remove the all group
    ctrl.deleteTransaction = (trx) ->
      _.remove(ctrl.currentAttributes.transactions, (trxInList) -> trxInList.id == trx.id)
      if trx.recurring_parent
        ctrl.onDeleteTransaction({ resourcesType: ctrl.resourcesType, trxId: trx.id })
      else
        # TODO: rework logic
        ctrl.deleteTransactionsGroup({ recurring_parent: trx.id })

    return ctrl
})
