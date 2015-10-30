module = angular.module('impac.components.widgets.accounts-assets-liability-summary', [])
module.controller('WidgetAccountsAssetsLiabilitySummaryCtrl', ($scope, $q, ChartFormatterSvc) ->

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
    #TODO: No .pluralize() in angular?
    switch (w.metadata.classification || 'asset').toLowerCase()
      when 'liability'
        $scope.classification = "Liabilities"
      else
        $scope.classification = "Assets"

    $scope.accountsOptions = [
      { label: 'Assets Accounts', value: 'ASSET' },
      { label: 'Liability Accounts', value: 'LIABILITY' }
    ]

    if !$scope.selectedAccountsOption
      $scope.selectedAccountsOption = _.find($scope.accountsOptions, {
        value: w.metadata.classification
      });

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
        # tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' #{currency}' %>"
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
