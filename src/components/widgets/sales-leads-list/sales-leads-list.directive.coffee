module = angular.module('impac.components.widgets.sales-leads-list',[])

module.controller('WidgetSalesLeadsListCtrl', ($scope, $q, ChartFormatterSvc, $filter, $sce, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
  ]

  $scope.ordering = "last_name"

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.leads)
    initLeadDescriptionTooltips(w.content.leads) if $scope.isDataFound

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  # Gather leads tooltips and prepare as safe html for angular-bootstrap tooltip directive.
  # NOTE: returning the safe HTML directly causes digest cycle stack overflow as the objects
  # created by $sce are never identicle.
  $scope.leadDescriptionTooltips = {}
  initLeadDescriptionTooltips = (leads) ->
    _.each(leads, (aLead, index)->
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
        _.each(aLead.opportunities, (opp) ->
          oppLineArray = []
          oppLineArray.push("##{opp.code}") if opp.code
          oppLineArray.push("#{opp.name}") if opp.name
          # TODO currency
          oppLineArray.push($filter('mnoCurrency')(opp.amount.total_amount, "USD", false)) if opp.amount
          oppLineArray.push("#{opp.probability}%") if opp.probability
          oppLineArray.push("#{opp.sales_stage}") if opp.sales_stage
          tooltip.push(oppLineArray.join(' - '))
        )

      $scope.leadDescriptionTooltips[index] = $sce.trustAsHtml(tooltip.join("<br />"))
    )

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesLeadsList', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesLeadsListCtrl'
  }
)
