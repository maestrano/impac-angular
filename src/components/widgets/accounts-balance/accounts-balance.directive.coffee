module = angular.module('impac.components.widgets.accounts-balance',[])

module.controller('WidgetAccountsBalanceCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.histModeDeferred.promise
    $scope.widthDeferred.promise
    $scope.chartDeferred.promise
  ]

  $scope.ascending = true
  $scope.sortedColumn = 'account'

  # Widget specific methods
  # --------------------------------------
  $scope.isDataFound=true
  w.initContext = ->
    if $scope.isDataFound = w.content? && !_.isEmpty(w.content.account_list)
      summary = []
      for classification, accounts of _.groupBy(w.content.account_list, 'classification')
        summary.push {
          name: classification,
          accounts: accounts,
          balances: _.reduce(accounts, (total, acc) ->
            if total.length == 0
              for balance, i in acc.balances
                total[i] = 0
            for balance, i in acc.balances
              total[i] += balance
            return total
          , []),
          currency: accounts[0].currency if accounts
        }

      $scope.summary = _.sortBy(summary, 'name')
      $scope.dates = w.content.dates
      $scope.unCollapsed = w.metadata.unCollapsed || []

      if w.metadata.selectedElements
        $scope.selectedElements = []
        angular.forEach(w.metadata.selectedElements, (sElem) ->
          foundElem = _.find($scope.summary, (statement)->
            statement.name == sElem.name
          )

          if !foundElem
            angular.forEach($scope.summary, (statement) ->
              foundElem ||= _.find(statement.accounts, (account)->
                if account.id
                  sElem.id == account.id
                else
                  sElem.name == account.name
              ) if statement.accounts?
            )

          $scope.selectedElements.push(foundElem) if foundElem
        )

      w.width = 6 unless $scope.selectedElements? && $scope.selectedElements.length > 0
      sortData()

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.getLastBalance = (element) ->
    _.last(element.balances) if element.balances?

  $scope.getTrackedField = ->
    if !_.isEmpty($scope.selectedElements) && $scope.selectedElements[0].id?
      field = $scope.selectedElements[0].id.split('-')[0]
      allFieldsEquals = true
      angular.forEach($scope.selectedElements, (element)->
        allFieldsEquals &&= (element.id && field == element.id.split('-')[0])
      )

      if allFieldsEquals
        return field.name
      else
        return null

  $scope.formatDate = (date) ->
    if w.metadata? && w.metadata.hist_parameters?
      switch w.metadata.hist_parameters.period
        when 'DAILY'
          return $filter('date')(date, 'dd-MMM')
        when 'WEEKLY'
          return $filter('date')(date, 'dd-MMM')
        when 'MONTHLY'
          return $filter('date')(date, 'MMM')
        when 'QUARTERLY'
          return $filter('date')(date, 'MMM-yy')
        when 'YEARLY'
          return $filter('date')(date, 'yyyy')
        else
          return $filter('date')(date, 'MMM')
    else
      return $filter('date')(date, 'MMM')

  getPeriod = ->
    if w.metadata? && w.metadata.hist_parameters? && w.metadata.hist_parameters.period?
      w.metadata.hist_parameters.period
    else
      'MONTHLY'

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.hasElements()
      if w.isHistoryMode
        # Hist chart
        all_values_are_positive = true
        inputData = []
        labels = _.map w.content.dates, (date) ->
          if w.metadata.hist_parameters && w.metadata.hist_parameters.period == "YEARLY"
            $filter('date')(date, 'yyyy')
          else if w.metadata.hist_parameters && w.metadata.hist_parameters.period == "QUARTERLY"
            $filter('date')(date, 'MMM-yy')
          else if w.metadata.hist_parameters && (w.metadata.hist_parameters.period == "WEEKLY" || w.metadata.hist_parameters.period == "DAILY")
            $filter('date')(date, 'dd-MMM')
          else
            $filter('date')(date, 'MMM')
        angular.forEach($scope.selectedElements, (sElem) ->
          data = angular.copy(sElem)
          inputData.push({title: data.name, labels: labels, values: data.balances})

          angular.forEach(data.balances, (value) ->
            all_values_are_positive &&= value >= 0
          )
        )
        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: $scope.selectedElements.length == 1,
          pointDot: $scope.selectedElements.length == 1,
          currency: 'hide'
        }
        chartData = ChartFormatterSvc.lineChart(inputData,options)
      else
        # Current chart
        pieData = _.map $scope.selectedElements, (elem) ->
          {
            label: $filter('titleize')(elem.name),
            value: $scope.getLastBalance(elem),
          }
        pieOptions = {
          showTooltips: true,
          percentageInnerCutout: 50,
          tooltipFontSize: 12,
          currency: 'hide'
        }
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)

  sortAccountsBy = (getElem) ->
    angular.forEach($scope.summary, (sElem) ->
      if sElem.accounts
        sElem.accounts.sort (a, b) ->
          res = if getElem(a) > getElem(b) then 1
          else if getElem(a) < getElem(b) then -1
          else 0
          res *= -1 unless $scope.ascending
          return res
    )

  sortData = ->
    if $scope.sortedColumn == 'account'
      sortAccountsBy( (el) -> el.name )
    else if $scope.sortedColumn == 'total'
      sortAccountsBy( (el) -> $scope.getLastBalance(el) )

  $scope.sort = (col) ->
    if $scope.sortedColumn == col
      $scope.ascending = !$scope.ascending
    else
      $scope.ascending = true
      $scope.sortedColumn = col
    sortData()

  # --->
  # TODO selectedElement and collapsed should be factorized as settings or 'commons'
  $scope.toggleSelectedElement = (element) ->
    if $scope.isSelected(element)
      $scope.selectedElements = _.reject($scope.selectedElements, (sElem) ->
        if element.id
          sElem.id == element.id
        else
          sElem.name == element.name
      )
      w.format()
      if w.isExpanded() && $scope.selectedElements.length == 0
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)
    else
      $scope.selectedElements ||= []
      $scope.selectedElements.push(element)
      w.format()
      if !w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isSelected = (element) ->
    if element? && $scope.selectedElements?
      if _.find($scope.selectedElements, (sElem) ->
        if element.id
          sElem.id == element.id
        else
          sElem.name == element.name
      )
        return true
      else
        return false
    else
      return false

  $scope.toggleCollapsed = (element) ->
    if element? && element.name?
      if _.find($scope.unCollapsed, ((name) -> element.name == name))
        $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
          name == element.name
        )
      else
        $scope.unCollapsed.push(element.name)
      ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isCollapsed = (element) ->
    if element? && element.name?
      if _.find($scope.unCollapsed, ((name) -> element.name == name))
        return false
      else
        return true

  $scope.hasElements = ->
    $scope.selectedElements? && $scope.selectedElements.length > 0

  $scope.getSelectLineColor = (elem) ->
    ChartFormatterSvc.getLightenColor(_.indexOf($scope.selectedElements, elem)) if $scope.hasElements()
  # <---

  # Mini-settings
  # --------------------------------------
  unCollapsedSetting = {}
  unCollapsedSetting.initialized = false

  unCollapsedSetting.initialize = ->
    unCollapsedSetting.initialized = true

  unCollapsedSetting.toMetadata = ->
    {unCollapsed: $scope.unCollapsed}

  w.settings.push(unCollapsedSetting)

  selectedElementsSetting = {}
  selectedElementsSetting.initialized = false

  selectedElementsSetting.initialize = ->
    selectedElementsSetting.initialized = true

  selectedElementsSetting.toMetadata = ->
    {selectedElements: $scope.selectedElements}

  w.settings.push(selectedElementsSetting)

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetAccountsBalance', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsBalanceCtrl'
  }
)
