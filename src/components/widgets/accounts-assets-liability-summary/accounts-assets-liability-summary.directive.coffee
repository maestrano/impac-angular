module = angular.module('impac.components.widgets.accounts-assets-liability-summary', [])
module.controller('WidgetAccountsAssetsLiabilitySummaryCtrl', ($scope, $q, ChartFormatterSvc, $translate) ->

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
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)

    # Initialize the classification to ASSET
    if !w.metadata.classification
      w.metadata.classification = "ASSET"

    # Pluralize and translate classification (Liability -> Liabilities ...)
    $translate('impac.widget.acc_ass_liab_smry.' + w.metadata.classification.toLowerCase() + '.many').then((result) ->
      $scope.classification = result
    )

    # Translate account options
    $translate(['impac.widget.acc_ass_liab_smry.accounts.asset', 'impac.widget.acc_ass_liab_smry.accounts.liability']).then(
      (translation) ->
        # label: "Asset Accounts", value: "ASSET"
        $scope.accountsOptions = [
          { label: translation['impac.widget.acc_ass_liab_smry.accounts.asset'], value: 'ASSET' },
          { label: translation['impac.widget.acc_ass_liab_smry.accounts.liability'], value: 'LIABILITY' }
        ]

        if !$scope.selectedAccountsOption
          $scope.selectedAccountsOption = angular.copy(_.find($scope.accountsOptions, {
            value: w.metadata.classification
          }))
    )


    if $scope.isDataFound
      if w.metadata.organization_ids.length > 1
        $scope.dataSource = w.content.repartition
      else
        $scope.dataSource = w.content.summary

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

module.directive('widgetAccountsAssetsLiabilitySummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsAssetsLiabilitySummaryCtrl'
  }
)
