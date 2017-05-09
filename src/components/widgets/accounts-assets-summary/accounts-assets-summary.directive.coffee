module = angular.module('impac.components.widgets.accounts-assets-summary', [])
module.controller('WidgetAccountsAssetsSummaryCtrl', ($scope, $q, ChartFormatterSvc, $translate) ->

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
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)

    if $scope.isDataFound
      if w.metadata.organization_ids.length > 1
        $scope.dataSource = w.content.repartition
      else
        $scope.dataSource = w.content.summary

    # Initialize the classification to ASSET
    if !w.metadata.classification
      w.metadata.classification = "ASSET"

    # Pluralize and translate classification (Liability -> Liabilities ...)
    $translate('impac.widget.acc_ass_smry.' + w.metadata.classification.toLowerCase() + ".many").then((result) ->
      $scope.classification = result
    )

  $scope.getCurrency = ->
    w.content.currency if $scope.isDataFound

  $scope.getAccountColor = (elem) ->
    ChartFormatterSvc.getColor(_.indexOf($scope.dataSource, elem)) if $scope.isDataFound


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      pieData = _.map $scope.dataSource, (company) ->
        {
          label: company.label,
          value: company.total,
        }

      pieOptions = {
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

module.directive('widgetAccountsAssetsSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsAssetsSummaryCtrl'
  }
)
