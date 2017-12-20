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

      ctrl.tempDate = moment().add(10, 'weeks').toDate()

    ctrl.isValid = ->
      !_.isEmpty(ctrl.trx.name) && !isNaN(Number(ctrl.trx.amount)) && Number(ctrl.trx.amount) != 0

    ctrl.createTransaction = ->
      ctrl.onHide()
      ctrl.onCreateTransaction({ trx: ctrl.trx })

    return ctrl
})
