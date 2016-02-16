module = angular.module('impac.components.widgets.invoices-list',[])

module.controller('WidgetInvoicesListCtrl', ($scope, $q, $filter, ImpacUtilities) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.limitEntriesDeferred = $q.defer()
  $scope.datesPickerDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.limitEntriesDeferred.promise
    $scope.datesPickerDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.entities)

    if $scope.isDataFound && $scope.orderBy=='due '
      if $scope.entityType=='suppliers'
        $scope.limitEntriesLabel = 'creditors'
      else
        $scope.limitEntriesLabel = 'debtors'

    if w.metadata? && w.metadata.limit_entries?
      $scope.limitEntriesSelected = w.metadata.limit_entries

    if $scope.isDataFound
      dates = _.flatten _.map(w.content.entities, ((e) -> _.map(e.invoices, ((i) -> i.invoice_date)) ))
      datesRange = ImpacUtilities.getDatesRange(dates)
      $scope.defaultFrom = $filter('date')(datesRange[0], 'yyyy-MM-dd')
      $scope.defaultTo = $filter('date')(datesRange[1], 'yyyy-MM-dd')


  # No need to put this under initContext because it won't change after a settings update
  $scope.entityType = w.metadata.entity
  $scope.entityTypeCap = _.capitalize(w.metadata.entity)
  if _.isEmpty(w.metadata.order_by) || w.metadata.order_by == 'name' || w.metadata.order_by == 'total_invoiced'
    $scope.orderBy = ''
  else
    # returned by Impac!: "total_something"
    $scope.orderBy = _.last(w.metadata.order_by.split('_')).concat(" ")

  $scope.getInvoices = (entity) ->
    # Returns the invoices for a given customer/supplier
    tooltip = ["<strong>" + entity.name + "</strong>"]
    count=1
    angular.forEach(entity.invoices, (i) ->

      if (i.transaction_no != "")
        txn = " (" + i.transaction_no + ")"
      else
        txn = ""

      if (i.tooltip_status == "partially paid")
        paid = " (" + $filter('mnoCurrency')(i.paid,i.currency,false) + " over " + $filter('mnoCurrency')(i.invoiced,i.currency,false) + ")"
      else
        paid = " (" + $filter('mnoCurrency')(i.invoiced,i.currency,false) + ")"

      tooltip.push("#" + count + txn + " - " + i.tooltip_status + paid)
      count++
    )
    return tooltip.join("<br />")


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
