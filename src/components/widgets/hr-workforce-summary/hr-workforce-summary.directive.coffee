module = angular.module('impac.components.widgets.hr-workforce-summary',[])

module.controller('WidgetHrWorkforceSummaryCtrl', ($scope, $q, ChartFormatterSvc, $filter, $translate) ->

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
    $scope.isDataFound = !_.isEmpty(w.content) && w.content.summary? && !_.isEmpty(w.content.summary.data)

    if $scope.isDataFound
      $scope.periodOptions = [
        {label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.yearly").toLowerCase()), value: "yearly"},
        {label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.quarterly").toLowerCase()), value: "quarterly"},
        {label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.monthly").toLowerCase()), value: "monthly"},
        {label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.weekly").toLowerCase()), value: "weekly"},
        {label: _.capitalize($translate.instant("impac.widget.settings.time_period.period.daily").toLowerCase()), value: "daily"}
      ]

      $scope.filterOptions = [
        {label: $translate.instant("impac.common.label.gender"), value: "gender"},
        {label: $translate.instant("impac.common.label.age_range"), value: "age_range"},
        {label: $translate.instant("impac.common.label.salary_range"), value: "salary_range"},
        {label: $translate.instant("impac.common.label.job_title"), value: "job_title"},
      ]

      $scope.period = angular.copy(_.find($scope.periodOptions, (o) ->
          o.value == w.content.total.period.toLowerCase()
        ) || $scope.periodOptions[0])

      $scope.filter = angular.copy(_.find($scope.filterOptions, (o) ->
          o.value == w.content.summary.filter
        ) || $scope.filterOptions[0])

  $scope.getTotalWorkforce = ->
    w.content.total.amount if $scope.isDataFound

  $scope.getNumberOfEmployees = ->
    w.content.total.employees if $scope.isDataFound

  $scope.getCurrency = ->
    w.content.total.currency if $scope.isDataFound

  $scope.formatSalaryRange = (aRange) ->
    range1 = $filter('mnoCurrency')(aRange.label.split('-')[0],aRange.currency,false)
    range2 = $filter('mnoCurrency')(aRange.label.split('-')[1],aRange.currency,false)
    return [range1,range2].join(" - ")

  $scope.getColorByIndex = (index) ->
    ChartFormatterSvc.getColor(index)


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound

      if $scope.filter.value == 'salary_range'
        barData = {
          labels: _.map(w.content.summary.data, (elem) ->
            $scope.formatSalaryRange(elem)
          ),
          values: _.map(w.content.summary.data, (elem) ->
            elem.value
          )
        }
        barOptions = {
          showTooltips: false,
          showXLabels: false,
          barDatasetSpacing: 15,
        }
        chartData = ChartFormatterSvc.barChart(barData, barOptions)

      else
        pieData = _.map w.content.summary.data, (elem) ->
          {
            label: elem.label,
            value: elem.value,
          }
        pieOptions = {
          showTooltips: true,
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

module.directive('widgetHrWorkforceSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrWorkforceSummaryCtrl'
  }
)
