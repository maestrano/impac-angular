module = angular.module('impac.components.widgets.accounts-invoices-list', [])
module.controller('WidgetAccountsInvoicesListCtrl', ($scope, $q, ImpacRoutes, BoltResources) ->

  # == Context and Helpers ========================================================================
  setInitialParams = ->
    params =
      include: 'contact'
      fields:
        contacts: 'name'
      sort: w.sortParamater
      currency: w.metadata.currency
      filter:
        'status.not': 'FORECAST'
    return params

  w = $scope.widget
  bolts = ImpacRoutes.bolts()
  bolt_path = _.find(bolts, { name: 'finance', provider: 'maestrano' }).path
  w.sortParamater = '-due_date'
  $scope.trxList = {
    display: false,
    resources: 'invoices',
    overdue: 'all',
    transactions: [],
    params: setInitialParams()
  }

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
        include: 'contact'
        fields: { contacts: 'name' }
      }
    )
    BoltResources.index(bolt_path, $scope.trxList.resources, params).then(
      (response) ->
        # Clear transactions list and replace by newly fetched ones
        _.remove($scope.trxList.transactions, -> true)
        for trx in response.data.data
          contactName = ''
          if trx.relationships && trx.relationships.contact && trx.relationships.contact.data
            contactName = _.find(response.data.included, (includedContact) ->
              includedContact.id == trx.relationships.contact.data.id
            ).attributes.name
          $scope.trxList.transactions.push(angular.merge(trx.attributes, {
            id: $scope.trxList.id
            contact_name: contactName
          }))
        $scope.trxList.totalRecords = response.data.meta.record_count
    ).finally(-> $scope.trxList.show())

  $scope.trxList.changeResourcesType = (resourcesType) ->
    return if resourcesType == $scope.trxList.resources
    $scope.trxList.resources = resourcesType
    $scope.trxList.fetch()

  $scope.trxList.changeOverdueFilter = (overdueFilter) ->
    return if overdueFilter == $scope.trxList.overdue
    $scope.trxList.overdue = overdueFilter
    $scope.trxList.params.filter.balance = 'gt 0' if overdueFilter == 'overdue'
    delete $scope.trxList.params.filter.balance if overdueFilter == 'all'
    $scope.trxList.fetch()

  $scope.trxList.changeQuery = (query) ->
    $scope.trxList.params.filter.query_data = query
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
