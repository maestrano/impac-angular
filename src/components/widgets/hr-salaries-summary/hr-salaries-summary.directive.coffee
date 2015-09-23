module = angular.module('impac.components.widgets.hr-salaries-summary',[])

module.controller('WidgetHrSalariesSummaryCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

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
          {label: 'Job Title', value: 'job_title'},
        ]
        $scope.filter = _.find($scope.filterOptions, (o) ->
          o.value == w.content.summary.filter
        ) || $scope.filterOptions[0]

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
          w.chart = ChartFormatterSvc.barChart(barData, barOptions)
        else if $scope.filter.value == 'job_title'
          barOptions = {
            showTooltips: false,
            showXLabels: false,
            barDatasetSpacing: 15,
          }
          w.chart = ChartFormatterSvc.barChart(barData, barOptions)
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
          w.chart = ChartFormatterSvc.lineChart(lineData, lineOptions)

    $scope.getColorByIndex = (index) ->
      ChartFormatterSvc.getColor(index)

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

    # Settings: organizations + width + 2*param-selector
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total == 4

    return w
)

module.directive('widgetHrSalariesSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrSalariesSummaryCtrl'
  }
)