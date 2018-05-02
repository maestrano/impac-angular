module = angular.module('impac.components.widgets.accounts-invoices-list', [])
module.controller('WidgetAccountsInvoicesListCtrl', ($scope, $q, ImpacRoutes, BoltResources) ->

  # == Context and Helpers ========================================================================
  w = $scope.widget
  bolts = ImpacRoutes.bolts()
  bolt_path = _.find(bolts, {name: 'finance', provider: 'maestrano'}).path
  w.sortParamater = '-due_date'
  $scope.trxList = {
    display: false,
    resources: 'invoices',
    transactions: [],
    params: { include: 'contact', fields: { contacts: 'name' }, sort: w.sortParamater, currency: w.metadata.currency }
  }

  extractContactName = (id, contacts) ->
    contact = _.find contacts, (c) -> c.id == id
    contact.attributes.name

  # Widget Settings --------------------------------------
  $scope.orgDeferred = $q.defer()
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
        currency: w.metadata.currency
      }
    )
    BoltResources.index(bolt_path, $scope.trxList.resources, params).then(
      (response) ->
        # Clear transactions list and replace by newly fetched ones
        _.remove($scope.trxList.transactions, -> true)
        for transaction in response.data.data
          if transaction.relationships && transaction.relationships.contact && transaction.relationships.contact.data
            contact_name = extractContactName(transaction.relationships.contact.data.id, response.data.included)
          $scope.trxList.transactions.push(angular.merge(transaction.attributes, { id: $scope.trxList.id, contact_name: contact_name || null }))
        $scope.trxList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.trxList.show())

  $scope.trxList.changeResourcesType = (resourcesType) ->
    return if resourcesType == $scope.trxList.resources
    $scope.trxList.resources = resourcesType
    $scope.trxList.fetch()

  # --------------------------------------
  w.initContext = ->
    $scope.trxList.fetch()

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetAccountsInvoicesList', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsInvoicesListCtrl'
  }
)
