module = angular.module('impac.components.widgets.sales-customers-engagement', [])
module.controller('WidgetSalesCustomersEngagementCtrl', ($scope, $q, $filter, ImpacWidgetsSvc, ImpacAssets, HighchartsFactory, ImpacUtilities) ->

  w = $scope.widget
  $scope.isChartDisplayed = true

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer();
  settingsPromises = [$scope.orgDeferred.promise]

  # Time management
  todayUTC = moment().startOf('day').add(moment().utcOffset(), 'minutes')

  # Timestamps stored in the back-end are in UTC => the filter on the date must be UTC too
  dateFilter = (timestamp) ->
    pickedDate = moment.utc(timestamp)
    if pickedDate <= todayUTC then "lte #{pickedDate.format('YYYY-MM-DD')}" else pickedDate.format('YYYY-MM-DD')

  # Unique identifier for the chart object in the DOM
  $scope.chartId = ->
    "averagePurchaseSizeChart-#{w.id}"

  # # == Sub-Components - Needed? =============================================================
  $scope.chartDeferred = $q.defer()

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content?

  w.format = ->
    # Instantiate and render chart
    options =
      chartType: 'line'
      chartOnClickCallbacks: []
      currency: w.metadata.currency
      showToday: true
      showLegend: true

    $scope.chart = new HighchartsFactory($scope.chartId(), w.content.chart, options)

    $scope.chart.formatters = ->
        currency = @options.currency
        xAxisLabels =
          labels:
            formatter: ->
              if (this.chart.rangeSelector.options.selected >= 3)
                moment.utc(this.value).format('MMM YYYY')
              else
                moment.utc(this.value).format('DD MMM')
        yAxisLabels =
          labels:
            formatter: ->
              "#{this.value} %"
        xAxis: angular.merge([w.content.chart.xAxis[0]], [xAxisLabels])
        yAxis: angular.merge([w.content.chart.yAxis[0]], [yAxisLabels])
        rangeSelector:
          selected: 3
        tooltip:
          shared: false
          backgroundColor: '#FBF7E6'
          formatter: ->
            date = moment.utc(this.x).format('Do MMM YYYY')
            name = this.series.name
            "<strong>#{date}</strong><br>#{name}: #{this.y}%"

    $scope.chart.render(w.content.chart, options)

    # Notifies parent element that the chart is ready to be displayed
    $scope.chartDeferred.notify($scope.chart)

  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetSalesCustomersEngagement', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesCustomersEngagementCtrl'
  }
)
