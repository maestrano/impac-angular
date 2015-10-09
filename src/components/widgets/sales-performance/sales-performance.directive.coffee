module = angular.module('impac.components.widgets.sales-performance',[])

module.controller('WidgetSalesPerformanceCtrl', ($scope, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.assignees)

    $scope.getOpportunityAmount = (anOpp) ->
      if $scope.isDataFound && !_.isEmpty(anOpp)
        if anOpp.amount && anOpp.amount.amount
          amount = anOpp.amount.amount
          return $filter('mnoCurrency')(amount, anOpp.amount.currency || 'AUD')
        else
          return '-'

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

module.directive('widgetSalesPerformance', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesPerformanceCtrl'
  }
)