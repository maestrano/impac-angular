module = angular.module('impac.components.common.transactions-list',[])

module.component('transactionsList', {
  templateUrl: 'common/transactions-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    transactions: '<'
    totalDue: '<'
    currency: '<'
    totalRecords: '<'
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.currentPage = 1

    return ctrl
})
