module = angular.module('impac.components.widgets.sales-customer-details',[])

module.controller('WidgetSalesCustomerDetailsCtrl', ($scope, $q) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.ratesDate = moment.now()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.widthDeferred.promise
    $scope.paramSelectorDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && !_.isEmpty(w.content.customers)

    if $scope.isDataFound
      setSelectedCustomer()
      $scope.customersOptions = _.map(w.content.customers, (e) ->
        { value: e.uid, label: e.name }
      )

  $scope.formatAddress = (anAddress) ->
    return anAddress.replace(/, /g,',\n') if angular.isDefined(anAddress)

  $scope.getFromDate = ->
    return w.content.from if $scope.isDataFound

  $scope.getToDate = ->
    return w.content.to if $scope.isDataFound

  setSelectedCustomer = ->
    return false unless $scope.isDataFound

    if w.metadata && w.metadata.customer_uid
      customer = _.find(w.content.customers, (c) ->
        c.uid == w.metadata.customer_uid
      )

    customer ||= w.content.customers[0]

    $scope.selectedCustomer = angular.copy(customer)
    setSelectedCustomerId()
    buildFxTotals()

  setSelectedCustomerId = ->
    return false unless (cust = $scope.selectedCustomer)
    $scope.selectedCustomerId = { value: cust.uid, label: cust.name }

  buildFxTotals = ->
    return false unless (cust = $scope.selectedCustomer)

    invoicedFxTotals = [] ; dueFxTotals = [] ; paidFxTotals = []

    if _.some(cust.fx_totals, (total, currency) -> currency != w.metadata.currency)
      _.mapKeys cust.fx_totals, (total, currency) ->
        baseTotal = { rate: total.rate, currency: currency }
        invoicedFxTotals.push(angular.merge({ amount: total.invoiced }, baseTotal)) if total.invoiced != 0
        paidFxTotals.push(angular.merge({ amount: total.paid }, baseTotal)) if total.paid != 0
        dueFxTotals.push(angular.merge({ amount: total.due }, baseTotal)) if total.due != 0

      cust.invoicedFxTotals = invoicedFxTotals unless _.isEmpty(invoicedFxTotals)
      cust.paidFxTotals = paidFxTotals unless _.isEmpty(paidFxTotals)
      cust.dueFxTotals = dueFxTotals unless _.isEmpty(dueFxTotals)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesCustomerDetails', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesCustomerDetailsCtrl'
  }
)
