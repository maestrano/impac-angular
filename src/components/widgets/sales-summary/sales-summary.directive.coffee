module = angular.module('impac.components.widgets.sales-summary',[])

module.controller('WidgetSalesSummaryCtrl', ($scope, $q, ChartFormatterSvc, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.chartFiltersDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.datesPickerDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.chartFiltersDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.datesPickerDeferred.promise
    $scope.chartDeferred.promise
  ]

  $scope.datesPickerTemplate = "<span><from-date> to <to-date> <apply></span>"

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.summary) && ( _.sum(_.map(w.content.summary, (s) -> s.total)) > 0 )
    
    $translate([
      'impac.widget.sales_summary.value_sold_taxes',
      'impac.widget.sales_summary.value_sold_no_taxes',
      'impac.widget.sales_summary.quantity_sold',
      'impac.widget.sales_summary.value_purchased_taxes',
      'impac.widget.sales_summary.value_purchased_no_taxes',
      'impac.widget.sales_summary.quantity_purchased']).then(
      (translations) ->
        $scope.filterOptions = [
          {label: translations['impac.widget.sales_summary.value_sold_taxes'], value: 'gross_value_sold'},
          {label: translations['impac.widget.sales_summary.value_sold_no_taxes'], value: 'net_value_sold'},
          {label: translations['impac.widget.sales_summary.quantity_sold'], value: 'quantity_sold'},
          {label: translations['impac.widget.sales_summary.value_purchased_taxes'], value: 'gross_value_purchased'},
          {label: translations['impac.widget.sales_summary.value_purchased_no_taxes'], value: 'net_value_purchased'},
          {label: translations['impac.widget.sales_summary.quantity_purchased'], value: 'quantity_purchased'}
        ]
        $scope.filterOptions = [
          $scope.filterOptions[0],
          $scope.filterOptions[1],
          $scope.filterOptions[2]
        ] if w.metadata.criteria == "customer"

        $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
            o.value == w.metadata.filter
          ) || $scope.filterOptions[0])
    )

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      pieData = _.map w.content.summary, (entity) ->
        if entity.company
          label = "#{entity.code || entity.name || entity.location || entity.industry || entity.customer} (#{entity.company})"
        else
          label = entity.code || entity.name || entity.location || entity.industry || entity.customer
        {
          label: label,
          value: entity.total,
        }
      pieOptions = {
        percentageInnerCutout: 50,
        tooltipFontSize: 12,
      }
      angular.merge(pieOptions, {currency: 'hide'}) if $scope.filter.value.indexOf('quantity') > -1
      chartData = ChartFormatterSvc.pieChart(pieData, pieOptions)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesSummaryCtrl'
  }
)
