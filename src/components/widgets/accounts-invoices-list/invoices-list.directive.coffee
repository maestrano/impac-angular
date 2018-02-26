module = angular.module('impac.components.widgets.invoices-list', [])
module.controller('WidgetInvoicesListCtrl', ($scope, $q, ImpacRoutes, BoltResources) ->

  # == Context and Helpers ========================================================================
  w = $scope.widget
  bolts = ImpacRoutes.bolts()
  bolt_path = _.find(bolts, {name: 'finance', provider: 'maestrano'}).path

  $scope.trxList = {
    display: false,
    resources: 'invoices',
    transactions: [],
    params: {}
  }

  # Widget Settings --------------------------------------
  $scope.orgDeferred = $q.defer();

  settingsPromises = [$scope.orgDeferred.promise]

  # Widget specific methods

  $scope.trxList.show = ->
    $scope.trxList.display = true

  $scope.trxList.hide = ->
    $scope.trxList.display = false

  $scope.trxList.fetch = (currentPage = 1) ->
    params = angular.merge(
      $scope.trxList.params, {
        metadata: _.pick(w.metadata, 'organization_ids')
        page: { number: currentPage }
      }
    )
    BoltResources.index(bolt_path, $scope.trxList.resources, params).then(
      (response) ->
        # Clear transactions list and replace by newly fetched ones
        _.remove($scope.trxList.transactions, -> true)
        for transaction in response.data.data
          transaction.attributes.trxDateUTC = moment.utc(transaction.transaction_date).format('DD MMM YYYY')
          transaction.attributes.dueDateUTC = moment.utc(transaction.due_date).format('DD MMM YYYY')
          $scope.trxList.transactions.push(angular.merge(transaction.attributes, { id: $scope.trxList.id }))
        $scope.trxList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.trxList.show())

  $scope.trxList.changeResourcesType = (resourcesType) ->
    return if resourcesType == $scope.trxList.resources
    $scope.trxList.resources = resourcesType
    $scope.trxList.fetch()

  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content?
    $scope.trxList.fetch()

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetInvoicesList', ->
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesListCtrl'
  }
)
