module = angular.module('impac.components.widgets.sales-leads-list',[])

module.controller('WidgetSalesLeadsListCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads)

    $scope.getLeadDescription = (aLead) ->
      tooltip = []

      nameLineArray = ["<strong>"]
      nameLineArray.push($filter('titleize')(aLead.first_name)) if aLead.first_name
      nameLineArray.push($filter('titleize')(aLead.last_name)) if aLead.last_name
      nameLineArray.push("</strong>")

      tooltip.push(nameLineArray.join(' '))
      tooltip.push("Status: #{$filter('titleize')(aLead.lead_status)}")
      tooltip.push("Organization: #{$filter('titleize')(aLead.organization)}") if aLead.organization

      if aLead.opportunities
        tooltip.push("<strong>Opportunities:</strong>")
        angular.forEach aLead.opportunities, (opp) ->
          oppLineArray = []
          oppLineArray.push("##{opp.code}") if opp.code
          oppLineArray.push("#{opp.name}") if opp.name
          # TODO currency
          oppLineArray.push($filter('mnoCurrency')(opp.amount.total_amount, "USD", false)) if opp.amount
          oppLineArray.push("#{opp.probability}%") if opp.probability
          oppLineArray.push("#{opp.sales_stage}") if opp.sales_stage
          tooltip.push(oppLineArray.join(' - '))

      return tooltip.join("<br />")

    # -----------------

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

    # organization_ids
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 1

    return w
)

module.directive('widgetSalesLeadsList', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesLeadsListCtrl'
  }
)