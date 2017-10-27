module = angular.module('impac.components.common.customers-list',[])

module.component('customersList', {
  templateUrl: 'common/customers-list.tmpl.html'
  bindings:
    onHide: '&'
    onPageChanged: '&'
    customers: '<'
    currency: '<'
    totalRecords: '<'
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.currentPage = 1

    return ctrl
})
