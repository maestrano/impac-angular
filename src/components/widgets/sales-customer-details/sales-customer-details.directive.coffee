module = angular.module('impac.components.widgets.sales-customer-details',[])

module.controller('WidgetSalesCustomerDetailsCtrl', ($scope, $q) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()

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
      $scope.customersOptions = _.map(w.content.customers, (e) ->
        {
          value: e.uid,
          label: e.name,
        }
      )
      $scope.selectedCustomer = {
        value: $scope.getCustomer().uid,
        label: $scope.getCustomer().name,
      }

  $scope.getCustomer = ->
    return false unless $scope.isDataFound

    if w.metadata && w.metadata.customer_uid
      customer = angular.copy(_.find(w.content.customers, (e) ->
        e.uid == w.metadata.customer_uid
      ) || w.content.customers[0])
    else
      customer = angular.copy(w.content.customers[0])

    return customer

  $scope.formatAddress = (anAddress) ->
    return anAddress.replace(/, /g,',\n') if angular.isDefined(anAddress)

  $scope.getFromDate = ->
    return w.content.from if $scope.isDataFound

  $scope.getToDate = ->
    return w.content.to if $scope.isDataFound


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
