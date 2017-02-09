module = angular.module('impac.components.widgets.accounts-class-comparison', [])
module.controller('WidgetAccountsClassComparisonCtrl', ($scope, $q, $filter, ChartFormatterSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.chartDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.timePeriodDeferred.promise
  ]

  # Configure the commonTimePeriodInfo directive
  $scope.timePeriodInfoParams = {
    accountingBehaviour: 'pnl'
    histParams: {}
  }

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.companies)
    if $scope.isDataFound

      $scope.classifications = _.map(w.content.summary, (summary) ->
        klass = summary.classification
        {
          label: _.capitalize(klass.toLowerCase())
          value: klass
        }
        # return { label: _.capitalize(summary.toLowerCase()), value: summary }
      )

      if !$scope.selectedClassification
        $scope.selectedClassification = angular.copy(_.find $scope.classifications, {
          value: w.metadata.classification || $scope.classifications[0].value
        })

  $scope.getTotals = ->
    return [] unless $scope.selectedClassification
    amount = _.find(w.content.summary, (sum) ->
      sum.classification == $scope.selectedClassification.value
    ).totals

  $scope.getAmount = (index) ->
    amount = $scope.getTotals()[index]
    return $filter('mnoCurrency')(amount, w.content.currency)

  $scope.getAccountColor = (anEntity) ->
    ChartFormatterSvc.getColor(_.indexOf(w.content.companies, anEntity))

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      inputData = {}

      inputData.labels = w.content.companies
      inputData.values = $scope.getTotals()

      # inputData.labels = _.map w.content.summary, (data) -> data.company
      # inputData.values = _.map w.content.summary, (data) -> data.totals[$scope.classIndex]
      # maximum capacity for chartjs bar-chart
      inputData.labels.length = 15 if inputData.labels.length > 15
      inputData.values.length = 15 if inputData.values.length > 15

      options = {
        showTooltips: false,
        showXLabels: false,
        barValueSpacing: Math.max(8-w.content.companies.length,1)
      }
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
