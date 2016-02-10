module = angular.module('impac.components.widgets.invoices-summary',[])

module.controller('WidgetInvoicesSummaryCtrl', ($scope, $q, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.chartFiltersDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.datesPickerDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.chartFiltersDeferred.promise
    $scope.chartDeferred.promise
    $scope.datesPickerDeferred.promise
  ]

  $scope.defaultFrom = "#{new Date().getFullYear() - 10}-01-01"


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.summary)


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
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
      chartData = ChartFormatterSvc.pieChart(pieData, pieOptions)
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetInvoicesSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesSummaryCtrl'
  }
)
