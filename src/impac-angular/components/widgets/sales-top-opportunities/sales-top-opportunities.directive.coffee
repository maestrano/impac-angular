module = angular.module('impac.components.widgets.sales-top-opportunities',[])

module.controller('WidgetSalesTopOpportunitiesCtrl', ($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.opportunities)

    $scope.getOppDetails = (anOpp) ->
      oppDetails = []
      oppDetails.push($filter('mnoCurrency')(anOpp.amount.amount, anOpp.amount.currency || 'AUD')) if anOpp.amount
      oppDetails.push("proba #{anOpp.probability}%") if anOpp.probability
      oppDetails.push(anOpp.sales_stage) if anOpp.sales_stage

      return oppDetails.join(' / ')

    $scope.getOppClass = (index) ->
      switch index
        when 0 then return 'first'
        when 1 then return 'second'
        when 2 then return 'second'
        else return ''


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

    # organizations
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 1

    return w
)

module.directive('widgetSalesTopOpportunities', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("sales")
      element.addClass("top-opportunities")
    ,controller: 'WidgetSalesTopOpportunitiesCtrl'
  }
)