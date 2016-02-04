module = angular.module('impac.components.widgets.hr-salaries-summary',[])

module.controller('WidgetHrSalariesSummaryCtrl', ($scope, $q, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.paramSelectorDeferred1 = $q.defer()
  $scope.paramSelectorDeferred2 = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.widthDeferred.promise
    $scope.paramSelectorDeferred1.promise
    $scope.paramSelectorDeferred2.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = !_.isEmpty(w.content) && w.content.summary? && !_.isEmpty(w.content.summary.data)

      $scope.periodOptions = [
        {label: 'Yearly', value: 'yearly'},
        {label: 'Monthly', value: 'monthly'},
        {label: 'Weekly', value: 'weekly'},
        {label: 'Hourly', value: 'hourly'}
      ]
      $scope.period = angular.copy(_.find($scope.periodOptions, (o) ->
        o.value == w.content.total.period.toLowerCase()
      ) || $scope.periodOptions[0])

      $scope.filterOptions = [
        {label: 'Gender', value: 'gender'},
        {label: 'Age Range', value: 'age_range'},
        {label: 'Job Title', value: 'job_title'},
      ]
      $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
        o.value == w.content.summary.filter
      ) || $scope.filterOptions[0])

  $scope.getColorByIndex = (index) ->
    ChartFormatterSvc.getColor(index)


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      barData = {
        labels: _.map(w.content.summary.data, (elem) ->
          elem.label
        ),
        values: _.map(w.content.summary.data, (elem) ->
          elem.value
        )
      }
      
      if $scope.filter.value == 'gender'
        barOptions = {
          showTooltips: false,
        }
        chartData = ChartFormatterSvc.barChart(barData, barOptions)

      else if $scope.filter.value == 'job_title'
        barOptions = {
          showTooltips: false,
          showXLabels: false,
          barDatasetSpacing: 15,
        }
        chartData = ChartFormatterSvc.barChart(barData, barOptions)

      else if $scope.filter.value == 'age_range'
        if _.last(barData.labels) == "unknown"
          barData.labels.pop()
          barData.values.pop()
        lineData = [{
          title: "Average salary",
          labels: barData.labels,
          values: barData.values
        }]
        lineOptions = {
          scaleBeginAtZero: true,
          showXLabels: false,
        }
        chartData = ChartFormatterSvc.lineChart(lineData, lineOptions)

      else
        return {error: {message: "wrong filter", code: 400}}
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetHrSalariesSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrSalariesSummaryCtrl'
  }
)
