module = angular.module('impac.components.widgets.sales-summary',[])

module.controller('WidgetSalesSummaryCtrl', ($scope, $q, ChartFormatterSvc) ->

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


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = !_.isEmpty(w.content) && !_.isEmpty(w.content.summary)

    $scope.filterOptions = [
      {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
      {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
      {label: 'quantity sold', value: 'quantity_sold'},
      {label: 'value purchased (incl. taxes)', value: 'gross_value_purchased'},
      {label: 'value purchased (excl. taxes)', value: 'net_value_purchased'},
      {label: 'quantity purchased', value: 'quantity_purchased'},
    ]
    $scope.filterOptions = [
      $scope.filterOptions[0],
      $scope.filterOptions[1],
      $scope.filterOptions[2]
    ] if w.metadata.criteria == "customer"

    $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
      o.value == w.metadata.filter
    ) || $scope.filterOptions[0])


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
