module = angular.module('impac.components.widgets.hr-salaries-summary',[])

module.controller('WidgetHrSalariesSummaryCtrl', ($scope, $q, ChartFormatterSvc, $translate) ->

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

      $translate([
        "impac.widget.settings.time_period.period.yearly",
        "impac.widget.settings.time_period.period.monthly",
        "impac.widget.settings.time_period.period.weekly",
        "impac.widget.settings.time_period.period.hourly"]).then(
        (translations) ->
          $scope.periodOptions = [
            {label: _.capitalize(translations["impac.widget.settings.time_period.period.yearly"].toLowerCase()), value: "yearly"},
            {label: _.capitalize(translations["impac.widget.settings.time_period.period.monthly"].toLowerCase()), value: "monthly"},
            {label: _.capitalize(translations["impac.widget.settings.time_period.period.weekly"].toLowerCase()), value: "weekly"},
            {label: _.capitalize(translations["impac.widget.settings.time_period.period.hourly"].toLowerCase()), value: "hourly"}
          ]

          $scope.period = angular.copy(_.find($scope.periodOptions, (o) ->
              o.value == w.content.total.period.toLowerCase()
            ) || $scope.periodOptions[0])
      )

      $translate([
        "impac.common.label.gender",
        "impac.common.label.age_range",
        "impac.common.label.job_title"]).then(
        (translations) ->
          $scope.filterOptions = [
            {label: translations["impac.common.label.gender"], value: "gender"},
            {label: translations["impac.common.label.age_range"], value: "age_range"},
            {label: translations["impac.common.label.job_title"], value: "job_title"},
          ]

          $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
              o.value == w.content.summary.filter
            ) || $scope.filterOptions[0])
      )

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
