module = angular.module('impac.components.widgets.sales-top-customers',[])

module.controller('WidgetSalesTopCustomersCtrl', ($scope, $q, $filter, ImpacUtilities) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.datesPickerDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.datesPickerDeferred.promise
    $scope.paramSelectorDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.entities)
      dates = _.flatten _.map(w.content.entities, ((e) -> _.map(e.invoices, ((i) -> i.invoice_date)) ))
      datesRange = ImpacUtilities.getDatesRange(dates)
      $scope.defaultFrom = $filter('date')(datesRange[0], 'yyyy-MM-dd')
      $scope.defaultTo = $filter('date')(datesRange[1], 'yyyy-MM-dd')

      $scope.limitEntriesOptions = [
        { label: 'TOP - 5', value: 5 }
        { label: 'TOP - 10', value: 10 }
        { label: 'TOP - 25', value: 25 }
        { label: 'TOP - 50', value: 50 }
        { label: 'TOP - 100', value: 100 }
      ]

      unless $scope.limitEntriesSelected
        $scope.limitEntriesSelected = angular.copy(_.find($scope.limitEntriesOptions, {
          value: w.metadata.limit_entries || 50
        }))

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesTopCustomers', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesTopCustomersCtrl'
  }
)
