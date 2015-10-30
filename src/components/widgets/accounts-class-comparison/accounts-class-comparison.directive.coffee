module = angular.module('impac.components.widgets.accounts-class-comparison', [])
module.controller('WidgetAccountsClassComparisonCtrl', ($scope, $q, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.chartDeferred.promise
    $scope.paramSelectorDeferred.promise
  ]

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content)

    $scope.classifications = _.map w.content.classifications, (item) ->
      return { label: _.capitalize(item.toLowerCase()), value: item }

    if !$scope.selectedClassification
      $scope.selectedClassification = _.find $scope.classifications, {
        value: w.metadata.classification || $scope.classifications[0].value
      }

    # on load, runs classification filtering
    $scope.selectClassification()


  $scope.selectClassification = ->
    # TODO: Refactor engine for this widget
    # The classifications array returned by Impac's indexes match the summary object's totals attribute array indexes. This was originally designed to match chartJs barChart format.
    $scope.classIndex = _.indexOf(w.content.classifications, $scope.selectedClassification.value)
    w.format()

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    inputData = {}
    inputData.labels = _.map w.content.summary, (data) -> data.company
    inputData.values = _.map w.content.summary, (data) -> data.totals[$scope.classIndex]
    # maximum capacity for chartjs bar-chart
    inputData.labels.length = 15 if inputData.labels.length > 15
    inputData.values.length = 15 if inputData.values.length > 15

    while inputData.values.length < 15
      inputData.labels.push ""
      inputData.values.push null

    options = {
      showTooltips: false,
      showXLabels: false,
      barDatasetSpacing: 9
    }
    console.log 'inputData: ', inputData
    chartData = ChartFormatterSvc.barChart(inputData,options)

    $scope.drawTrigger.notify(chartData)

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)
module.directive('widgetAccountsClassComparison', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsClassComparisonCtrl'
  }
)
