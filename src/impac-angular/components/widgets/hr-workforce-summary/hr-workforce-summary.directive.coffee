module = angular.module('impac.components.widgets.hr-workforce-summary',[])

module.controller('WidgetHrWorkforceSummaryCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

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
          {label: 'Salary Range', value: 'salary_range'},
          {label: 'Job Title', value: 'job_title'},
        ]
        $scope.filter = _.find($scope.filterOptions, (o) ->
          o.value == w.content.summary.filter
        ) || $scope.filterOptions[0]

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
          w.chart = ChartFormatterSvc.barChart(barData, barOptions)
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
          w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions)

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

module.directive('widgetHrWorkforceSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrWorkforceSummaryCtrl'
  }
)