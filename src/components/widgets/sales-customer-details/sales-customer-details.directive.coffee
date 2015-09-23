module = angular.module('impac.components.widgets.sales-customer-details',[])

module.controller('WidgetSalesCustomerDetailsCtrl', ($scope, DhbAnalyticsSvc, Utilities, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = !_.isEmpty(w.content.customers)

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


    # TODO: Refactor once we have understood exactly how the angularjs compilation process works:
    # in this order, we should:
    # 1- compile impac-widget controller
    # 2- compile the specific widget template/controller
    # 3- compile the settings templates/controllers
    # 4- call widget.loadContent() (ideally, from impac-widget, once a callback
    #     assessing that everything is compiled an ready is received)
    getSettingsCount = ->
      if w.settings?
        return w.settings.length
      else
        return 0

    # Settings: organizations + time range + x1 param selector + width
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 4

    return w
)

module.directive('widgetSalesCustomerDetails', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesCustomerDetailsCtrl'
  }
)