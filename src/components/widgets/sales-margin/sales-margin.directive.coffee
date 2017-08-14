module = angular.module('impac.components.widgets.sales-margin',[])

module.controller('WidgetSalesMarginCtrl', ($scope, $q, ChartFormatterSvc, $filter, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.attachKpisDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.histModeDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.chartDeferred.promise
    $scope.attachKpisDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = w.content? && w.content.margins? && w.content.dates?

    if $scope.isDataFound
      $scope.filterOptions = [
        {label: $translate.instant('impac.widget.sales_margin.including_taxes'), value: 'gross_margin'},
        {label: $translate.instant('impac.widget.sales_margin.excluding_taxes'), value: 'net_margin'}
      ]

      if w.metadata? && w.metadata.filter=="net_margin"
        $scope.filter = angular.copy $scope.filterOptions[1]
      else
        $scope.filter = angular.copy $scope.filterOptions[0]

  $scope.getTotalMargin = ->
    if $scope.isDataFound
      if w.metadata? && w.metadata.filter=="net_margin"
        return _.reduce w.content.margins.net, (memo, margin) ->
          memo + margin
        , 0
      else
        return _.reduce w.content.margins.gross, (memo, margin) ->
          memo + margin
        , 0

  $scope.getCurrency = ->
    if $scope.isDataFound
      return w.content.currency || "USD"


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      if w.metadata? && w.metadata.filter=="net_margin"
        values = w.content.margins.net
      else
        values = w.content.margins.gross

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      inputData = {title: $translate.instant('impac.widget.sales_margin.gross_margin'), labels: dates, values: values}
      all_values_are_positive = true
      angular.forEach(values, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: false,
      }
      chartData = ChartFormatterSvc.lineChart([inputData],options)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesMargin', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesMarginCtrl',
  }
)
