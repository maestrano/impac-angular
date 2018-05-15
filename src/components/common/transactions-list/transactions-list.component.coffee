module = angular.module('impac.components.common.transactions-list',[])

module.component('transactionsList', {
  templateUrl: 'common/transactions-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    onUpdateExpectedDate: '&'
    onChangeResources: '&'
    onUpateScheduleTransaction: '&?'
    onCurrencyChange: '&'
    metadata: '<'
    transactions: '<'
    currency: '<'
    contacts: '<'
    totalRecords: '<'
    resourcesType: '<'
    listOnly: '<'
  controller: ($translate, $q, BoltResources)->
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

        # formatt values
        trx.amount = Number(Math.round(trx.amount + 'e2') + 'e-2')
        trx.balance = Number(Math.round(trx.balance + 'e2') + 'e-2')

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
      return trx.status != 'FORECAST' && !trx.recurring && angular.isDefined(ctrl.onUpateScheduleTransaction)

    ctrl.createSchedule =
      trx: null
      display: false
      show: (args) ->
        this.trx = args.trx
        this.resourcesType = args.resourcesType
        this.display = true
      hide: ->
        this.display = false
      create: () ->
        this.hide()
        BoltResources.update(
          ctrl.metadata.bolt_path,
          this.resourcesType,
          this.trx.id,
          {
            recurring: this.trx.recurring,
            recurring_pattern: this.trx.recurring_pattern,
            recurring_end_date: if this.trx.recurring_end_date then moment(this.trx.recurring_end_date).format('YYYY-MM-DD') else null
          }
        ).then(->
          ctrl.onUpateScheduleTransaction()
          ctrl.changePage()
        )

    ctrl.deleteTrxModal =
      trx: null
      display: false
      deletionType: "onlyThis"
      show: (trx) ->
        this.trx = trx
        this.display = true
        this.deletionType = "allOccurrences" unless(this.canDeleteOnlyThis())
      hide: ->
        this.trx = null
        this.deletionType = "onlyThis"
        this.display = false
      message: ->
        msgPreposition = if ctrl.resourcesType == 'invoices'
          $translate.instant('impac.common.speech.prepositions.to')
        else
          $translate.instant('impac.common.speech.prepositions.from')
        $translate.instant('impac.widget.common.confirm-modal.delete_trx.message', {
          title: this.trx.title,
          customer: this.trx.contact_name,
          preposition: msgPreposition
        })
      delete: ->
        if(this.deletionType == 'onlyThis')
          ctrl.deleteTransaction(this.trx)
        else
          ctrl.deleteTransactionsGroup(this.trx)
        this.hide()
      canDeleteOnlyThis: ->
        !this.trx.recurring
      canDeleteAllOccurrences: ->
        this.trx.recurring_parent? || this.trx.recurring

    ctrl.showPaginationControl = ->
      return ctrl.totalRecords > ctrl.itemsPerPage

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

    ctrl.deleteTransaction = (trx) ->
      _.remove(ctrl.currentAttributes.transactions, (trxInList) -> trxInList.id == trx.id)
      BoltResources.destroy(
        ctrl.metadata.bolt_path,
        ctrl.resourcesType,
        trx.id
      ).then(-> ctrl.onUpateScheduleTransaction())

    ctrl.deleteTransactionsGroup = (trx) ->
      trxGroupId = if trx.recurring
        trx.id
      else
        trx.recurring_parent

      # Remove all children transactions
      _.remove(ctrl.currentAttributes.transactions, (trxInList) -> (trxInList.recurring_parent == trxGroupId))
      ctrl.deleteParentTransaction(trxGroupId)

    # If the parent trx is FORECAST, it has to be deleted
    # Otherwise it's real transaction and it hasn't to be deleted or removed from the trxs list only the children
    ctrl.deleteParentTransaction = (trxId) ->
      trx = _.find(ctrl.currentAttributes.transactions, (trxInList) -> trxInList.id == trxId)
      if trx.status == 'FORECAST'
        ctrl.deleteTransaction(trx)
      else
        BoltResources.update(
          ctrl.metadata.bolt_path,
          ctrl.resourcesType,
          trxId,
          { recurring : false }
        ).then(-> ctrl.onUpateScheduleTransaction())

    return ctrl
})
