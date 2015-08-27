module = angular.module('maestrano.analytics.widget-accounts-assets-summary',['maestrano.assets'])

module.controller('WidgetAccountsAssetsSummaryCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc',
  ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)

    w.format = ->
      if $scope.isDataFound
        pieData = _.map w.content.summary, (account) ->
          {
            label: account.label,
            value: account.total,
          }
        # currency = "$"
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12,
          # tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' #{currency}' %>"
        }
        w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions)

    $scope.getCurrency = ->
      w.content.currency if $scope.isDataFound

    $scope.getAccountColor = (anAccount) ->
      ChartFormatterSvc.getColor(_.indexOf(w.content.summary, anAccount)) if $scope.isDataFound


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
])

module.directive('widgetAccountsAssetsSummary', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("accounts")
      element.addClass("assets-summary")
    ,controller: 'WidgetAccountsAssetsSummaryCtrl'
  }
)