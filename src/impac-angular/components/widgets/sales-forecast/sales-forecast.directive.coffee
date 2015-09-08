module = angular.module('impac.components.widgets.sales-forecast',[])

module.controller('WidgetSalesForecastCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.totals)

    w.format = ->
      if $scope.isDataFound
        all_values_are_positive = true

        formattedDates = _.map w.content.dates, (aDate) ->
          $filter('date')(aDate, 'MMM-yy')

        inputData = [{
          title: 'Sales Performance',
          labels: formattedDates,
          values: w.content.totals
        }]

        angular.forEach(w.content.totals, (value) ->
          all_values_are_positive &&= value >= 0
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: true,
          pointDot: false,
        }

        w.chart = ChartFormatterSvc.lineChart(inputData,options)

    $scope.getOpportunityAmount = (anOpp) ->
      if $scope.isDataFound && !_.isEmpty(anOpp)
        if anOpp.amount && anOpp.amount.amount
          return anOpp.amount.amount
        else
          return '-'

    $scope.getOpportunityCurrency = (anOpp) ->
      if $scope.isDataFound && !_.isEmpty(anOpp)
        if anOpp.amount && anOpp.amount.currency
          return anOpp.amount.currency
        else if w.content.currency
          return w.content.currency
        else
          return 'AUD'


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

module.directive('widgetSalesForecast', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("accounts")
      element.addClass("profit-and-loss")
    ,controller: 'WidgetSalesForecastCtrl'
  }
)