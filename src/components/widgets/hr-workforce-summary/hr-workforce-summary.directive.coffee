module = angular.module('impac.components.widgets.hr-workforce-summary',[])

module.controller('WidgetHrWorkforceSummaryCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

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
    if $scope.isDataFound = w.content.summary? && !_.isEmpty(w.content.summary.data)

      $scope.periodOptions = [
        {label: 'Yearly', value: 'yearly'},
        {label: 'Monthly', value: 'monthly'},
        {label: 'Weekly', value: 'weekly'},
        {label: 'Hourly', value: 'hourly'}
      ]
      $scope.period = _.find($scope.periodOptions, (o) ->
        o.value == w.content.total.period.toLowerCase()
      ) || $scope.periodOptions[0]

      $scope.filterOptions = [
        {label: 'Gender', value: 'gender'},
        {label: 'Age Range', value: 'age_range'},
        {label: 'Salary Range', value: 'salary_range'},
        {label: 'Job Title', value: 'job_title'},
      ]
      $scope.filter = _.find($scope.filterOptions, (o) ->
        o.value == w.content.summary.filter
      ) || $scope.filterOptions[0]

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