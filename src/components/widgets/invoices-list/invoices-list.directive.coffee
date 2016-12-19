module = angular.module('impac.components.widgets.invoices-list',[])

module.controller('WidgetInvoicesListCtrl', ($scope, $q, $sce, $filter, ImpacUtilities) ->

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
      initInvoicesTooltips(w.content.entities)


  # No need to put this under initContext because it won't change after a settings update
  $scope.entityType = w.metadata.entity
  $scope.entityTypeCap = _.capitalize(w.metadata.entity)
  if _.isEmpty(w.metadata.order_by) || w.metadata.order_by == 'name' || w.metadata.order_by == 'total_invoiced'
    $scope.orderBy = ''
  else
    # returned by Impac!: "total_something"
    $scope.orderBy = _.last(w.metadata.order_by.split('_')).concat(" ")

  # Gather invoice tooltips and prepare as safe html for angular-bootstrap tooltip directive.
  # NOTE: returning the safe HTML directly causes digest cycle stack overflow as the objects
  # created by $sce are never identicle.
  $scope.invoiceTooltips = {}
  initInvoicesTooltips = (entities) ->
    _.each(entities, (entity)->
      # invoices list as html for a given customer/supplier
      tooltip = ["<strong>" + entity.name + "</strong>"]
      count = 1
      _.each(entity.invoices, (i) ->

        txn = if i.transaction_no != "" then " (" + i.transaction_no + ")" else ""

        if (i.tooltip_status == "partially paid")
          paid = " (" + $filter('mnoCurrency')(i.paid,i.currency,true) + " over " + $filter('mnoCurrency')(i.invoiced,i.currency,true) + ")"
        else
          paid = " (" + $filter('mnoCurrency')(i.invoiced,i.currency,true) + ")"

        tooltip.push("#" + count + txn + " - " + i.tooltip_status + paid)
        count++
      )
      $scope.invoiceTooltips[entity.id] = $sce.trustAsHtml(tooltip.join("<br />"))
    )


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
