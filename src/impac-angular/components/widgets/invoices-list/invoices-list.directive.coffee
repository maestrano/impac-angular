module = angular.module('impac.components.widgets.invoices-list',[])

module.controller('WidgetInvoicesListCtrl', ($scope, DhbAnalyticsSvc, Utilities, $filter) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = !_.isEmpty(w.content.entities)

    # No need to put this under initContext because it won't change after a settings update
    $scope.entityType = w.metadata.entity
    $scope.entityTypeCap = Utilities.capitalize(w.metadata.entity)
    if w.metadata.order_by == 'name' || w.metadata.order_by == 'total_invoiced'
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

    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total == 1

    return w

)

module.directive('widgetInvoicesList', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("invoices")
      element.addClass("list")
    ,controller: 'WidgetInvoicesListCtrl'
  }
)