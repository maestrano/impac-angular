module = angular.module('impac.components.widgets.sales-forecast',[])

module.controller('WidgetSalesForecastCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.dates) && !_.isEmpty(w.content.totals)

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.getOpportunityAmount = (anOpp) ->
    if $scope.isDataFound && !_.isEmpty(anOpp)
      if anOpp.amount && anOpp.amount.amount
        return anOpp.amount.amount
      else
        return '-'

  $scope.getOpportunityCurrency = (anOpp) ->
    if $scope.isDataFound && !_.isEmpty(anOpp)
      if anOpp.amount && anOpp.amount.currency
        return anOpp.amount.currency
      else if w.content.currency
        return w.content.currency
      else
        return 'AUD'


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      all_values_are_positive = true

      formattedDates = _.map w.content.dates, (aDate) ->
        $filter('date')(aDate, 'MMM-yy')

      inputData = [{
        title: 'Sales Performance',
        labels: formattedDates,
        values: w.content.totals
      }]

      angular.forEach(w.content.totals, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true,
        datasetFill: true,
        pointDot: false,
      }

      chartData = ChartFormatterSvc.lineChart(inputData,options)
      
      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesForecast', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesForecastCtrl'
  }
)