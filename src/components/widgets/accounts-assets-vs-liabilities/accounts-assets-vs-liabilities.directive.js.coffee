module = angular.module('impac.components.widgets.accounts-assets-vs-liabilities',[])

module.controller('WidgetAccountsAssetsVsLiabilitiesCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

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
    $scope.isDataFound = w.content? && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.companies)
    
    if $scope.isDataFound
      index=0
      $scope.companiesList = _.map w.content.companies, (company) ->
        assetSum = _.find(w.content.summary, ((sum) -> sum.classification == "ASSET"))
        liabilitiesSum = _.find(w.content.summary, ((sum) -> sum.classification == "LIABILITY"))

        result = {
          company: company
          assets: if assetSum? then assetSum.totals[index] else 0.0
          liabilities: if liabilitiesSum? then liabilitiesSum.totals[index] else 0.0
          currency: w.content.currency
        }

        index++
        result

  $scope.assetsColor = ChartFormatterSvc.getColor(0)
  $scope.liabilitiesColor = ChartFormatterSvc.getColor(1)


  # $scope.getAccountColor = (anAccount) ->
  #   if $scope.isMultiCompanyMode()
  #     ChartFormatterSvc.getColor(_.indexOf(w.selectedAccounts[0].accounts, anAccount))
  #   else
  #     ChartFormatterSvc.getColor(_.indexOf(w.selectedAccounts, anAccount))


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      datasets = _.map w.content.summary, (sum) ->
        if _.includes ['ASSET', 'LIABILITY'], sum.classification
          { title: sum.classification, values: sum.totals }

      datasets = _.sortByOrder(datasets, ['title'])

      inputData = { labels: w.content.companies, datasets: _.compact datasets }

      options = {
        showTooltips: false,
        showXLabels: false,
        barValueSpacing: Math.max(8-w.content.companies.length,1),
      }
      chartData = ChartFormatterSvc.combinedBarChart(inputData,options)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsAssetsVsLiabilities', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsAssetsVsLiabilitiesCtrl'
  }
)
