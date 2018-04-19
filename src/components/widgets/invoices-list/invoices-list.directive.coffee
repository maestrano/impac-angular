module = angular.module('impac.components.widgets.invoices-list',[])

module.controller('WidgetInvoicesListCtrl', ($scope, $q, $sce, $filter, ImpacUtilities, $translate) ->

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
        $scope.limitEntriesLabel = $translate.instant('impac.widget.invoices_list.limit_entries_label.creditors')
      else
        $scope.limitEntriesLabel = $translate.instant('impac.widget.invoices_list.limit_entries_label.debtors')

    if w.metadata? && w.metadata.limit_entries?
      $scope.limitEntriesSelected = w.metadata.limit_entries

    if $scope.isDataFound
      dates = _.flatten _.map(w.content.entities, ((e) -> _.map(e.invoices, ((i) -> i.invoice_date)) ))
      datesRange = ImpacUtilities.getDatesRange(dates)
      $scope.defaultFrom = $filter('date')(datesRange[0], 'yyyy-MM-dd')
      $scope.defaultTo = $filter('date')(datesRange[1], 'yyyy-MM-dd')
      initInvoicesTooltips(w.content.entities)
      buildFxTotals()
      $scope.ratesDate = moment.now()


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
        invCurrency = Object.keys(i.fx_totals)[0]
        formattedInvoiced = $filter('mnoCurrency')(i.fx_totals[invCurrency].invoiced, invCurrency, true)

        if (i.tooltip_status == "partially paid")
          formattedPaid = $filter('mnoCurrency')(i.fx_totals[invCurrency].paid, invCurrency, true)
          amountDetail = " (#{formattedPaid} on #{formattedInvoiced})"
        else
          amountDetail = " (#{formattedInvoiced})"

        tooltip.push("#" + count + txn + " - " + i.tooltip_status + amountDetail)
        count++
      )
      $scope.invoiceTooltips[entity.id] = $sce.trustAsHtml(tooltip.join("<br />"))
    )

  buildFxTotals = ->
    for contact in w.content.entities
      contactFxTotals = []
      _.mapKeys contact.fx_totals, (total, currency) ->
        if currency != w.metadata.currency
          contactFxTotals.push({
            currency: currency,
            amount: total.invoiced,
            rate: total.rate
          })
      unless _.isEmpty(contactFxTotals)
        contact.formattedFxTotals = contactFxTotals


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
