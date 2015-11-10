module = angular.module('impac.components.widgets.sales-aged',[])

module.controller('WidgetSalesAgedCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timeRangeDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timeRangeDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.aged_sales) && !_.isEmpty(w.content.dates)

      $scope.filterOptions = [
        {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
        {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
        {label: 'quantity sold', value: 'quantity_sold'},
      ]
      $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
        w.metadata && w.metadata.filter == o.value
      ) || $scope.filterOptions[0])

  $scope.getTotal = (anIndex) ->
    if $scope.isDataFound && anIndex >=0 && anIndex < w.content.aged_sales[$scope.filter.value].length
      return w.content.aged_sales[$scope.filter.value][anIndex]

  $scope.getLastDate = ->
    _.last(w.content.dates) if $scope.isDataFound

  $scope.getClassColor = (prev,value) ->
    # if (parseFloat(prev) && parseFloat(value))
    if value < prev
      return 'negative'
    else if value > prev
      return 'positive'
    else
      return null


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      all_values_are_positive = true

      inputData = []
      values = w.content.aged_sales[$scope.filter.value]

      $scope.formattedDates = _.map w.content.dates, (date) ->
        if w.metadata && w.metadata.hist_parameters && w.metadata.hist_parameters.period == "YEARLY"
          $filter('date')(date, 'yyyy')
        else if w.metadata && w.metadata.hist_parameters && w.metadata.hist_parameters.period == "QUARTERLY"
          $filter('date')(date, 'MMM-yy')
        else if w.metadata && w.metadata.hist_parameters && (w.metadata.hist_parameters.period == "WEEKLY" || w.metadata.hist_parameters.period == "DAILY")
          $filter('date')(date, 'dd-MMM')
        else
          $filter('date')(date, 'MMM')

      inputData.push({title: $scope.filter.label, labels: $scope.formattedDates, values: values})

      angular.forEach(values, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true,
        datasetFill: true,
        pointDot: true,
      }
      angular.merge(options, {currency: 'hide'}) if $scope.filter.value=='quantity_sold'

      chartData = ChartFormatterSvc.lineChart(inputData,options)
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesAged', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesAgedCtrl'
  }
)
