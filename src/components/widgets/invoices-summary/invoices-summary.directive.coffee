module = angular.module('impac.components.widgets.invoices-summary',[])

module.controller('WidgetInvoicesSummaryCtrl', ($scope, Utilities, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = !_.isEmpty(w.content.summary)

    w.format = ->
      if $scope.isDataFound
        pieData = _.map w.content.summary, (entity) ->
          {
            label: entity.name,
            value: entity.total,
          }
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12,
        }
        w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions)


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
      w.loadContent() if total == 2

    return w
)

module.directive('widgetInvoicesSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesSummaryCtrl'
  }
)