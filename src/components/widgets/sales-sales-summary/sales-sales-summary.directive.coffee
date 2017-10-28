module = angular.module('impac.components.widgets.sales-sales-summary',[])

module.controller('WidgetSalesSalesSummaryCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacUtilities, $translate, ImpacTheming) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.tagFilterDeferred = $q.defer()

  settingsPromises = [
    $scope.timePeriodDeferred.promise
    $scope.widthDeferred.promise
    $scope.chartDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.tagFilterDeferred.promise
  ]

  $scope.ascending = true
  $scope.sortedColumn = 'offers'
  $scope.filterTagsEnabled = ImpacTheming.get().widgetSettings.tagging.enabled

  setAmountDisplayed = ->
    $scope.amountDisplayed = angular.copy(_.find($scope.amountDisplayedOptions, (o) ->
        w.metadata && o.value == w.metadata.amount_displayed
      ) || $scope.amountDisplayedOptions[1])

  $translate([
    'impac.widget.accounts_profit_and_loss.last_period',
    'impac.widget.accounts_profit_and_loss.total_for_period']).then(
    (translation) ->
      $scope.amountDisplayedOptions = [
        { label: translation['impac.widget.accounts_profit_and_loss.last_period'], value: 'last' },
        { label: translation['impac.widget.accounts_profit_and_loss.total_for_period'], value: 'total' }
      ]

      setAmountDisplayed()
  )

  periodName = if (h = $scope.widget.metadata.hist_parameters) && h.period then h.period.toLowerCase() else 'monthly'
  $translate('impac.widget.settings.time_period.period.' + periodName).then(
    (translation) ->
      $scope.period_translation = _.capitalize(translation.toLowerCase())
  )

  $scope.isReportFiltered = ->
    w.metadata? && w.metadata.filter_query? && Object.keys(w.metadata.filter_query).length >0

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)

      $scope.dates = w.content.dates
      $scope.unCollapsed = w.metadata.unCollapsed || []

      # Dates for settings param selector display
      if w.metadata && (histParams = w.metadata.hist_parameters)

        dates = ImpacUtilities.selectedTimeRange(histParams)

        firstDate = $filter('mnoDate')(dates.from, getPeriod())
        lastDate = $filter('mnoDate')(dates.to, getPeriod())

        $scope.amountDisplayedOptions[1].label = "#{firstDate} to #{lastDate}"
        $scope.amountDisplayedOptions[0].label = lastDate

      setAmountDisplayed()

      unless _.isEmpty(w.metadata.selectedElements)
        $scope.selectedElements = []
        for sElemId in w.metadata.selectedElements
          # Attempt to find element by statement name
          foundElem = _.find(w.content.summary, (statement) -> statement.name == sElemId)
          # Attempt to find element by statement account id
          foundElem ||= fetchElement(w.content.summary, sElemId)

          $scope.selectedElements.push(foundElem) if foundElem

      w.width = 6 unless _.any($scope.selectedElements)
      sortData()

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index)

  getPeriod = ->
    if w.metadata? && w.metadata.hist_parameters? && w.metadata.hist_parameters.period?
      w.metadata.hist_parameters.period
    else
      'MONTHLY'

  getLastAmount = (element) ->
    _.last(element.totals) if element.totals?

  getTotalAmount = (element) ->
    _.sum(element.totals) if element.totals?

  $scope.getAmount = (element) ->
    switch $scope.amountDisplayed.value
      when 'total'
        getTotalAmount(element)
      else
        getLastAmount(element)

  $scope.getClassColor = (aTotal) ->
    if parseInt(aTotal) > 0
      return 'positive'
    else if parseInt(aTotal) < 0
      return 'negative'
    else
      return null

  $scope.getName = (element) ->
    element.name.replace(/_/g, " ") if element? && element.name?

  $scope.sort = (col) ->
    if $scope.sortedColumn == col
      $scope.ascending = !$scope.ascending
    else
      $scope.ascending = true
      $scope.sortedColumn = col
    sortData()

  # --->
  # TODO selectedElement and collapsed should be factorized as settings or 'commons'
  $scope.toggleSelectedElement = (element, statementName = null) ->
    if $scope.isSelected(element, statementName)
      $scope.selectedElements = _.reject($scope.selectedElements, (sElem) ->
        matchElementToSelectedElement(element, statementName, sElem)
      )
      w.format()
      if w.isExpanded() && $scope.selectedElements.length == 0
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)
    else
      selectedElement = angular.copy(element)
      selectedElement.category = statementName
      $scope.selectedElements ||= []
      $scope.selectedElements.push(selectedElement)
      w.format()
      if !w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isSelected = (element, statementName = null) ->
    element? && _.any($scope.selectedElements, (sElem) ->
      matchElementToSelectedElement(element, statementName, sElem)
    )

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

  $scope.getSelectLineColor = (element, statementName = null) ->
    sElem = _.find($scope.selectedElements, (sElem)->
      matchElementToSelectedElement(element, statementName, sElem)
    )
    ChartFormatterSvc.getColor(_.indexOf($scope.selectedElements, sElem)) if $scope.hasElements()

  $scope.hasElements = ->
    $scope.selectedElements? && $scope.selectedElements.length > 0

  matchElementToSelectedElement = (element, elementCategory = null, sElem)->
    getIdentifier(element, elementCategory) == getIdentifier(sElem)

  fetchElement = (statements, sElemId)->
    for statement in statements
      continue unless statement.accounts?
      element = _.find(statement.accounts, (acc) -> getIdentifier(acc, statement.name) == sElemId)
      if element?
        element = angular.merge(angular.copy(element), category: statement.name)
        return element

  getIdentifier = (element, category = null)->
    id = element.id || element.name
    category ||= element.category
    return id unless category
    "#{category}-#{id}"

  # <---

  sortAccountsBy = (getElem) ->
    angular.forEach(w.content.summary, (sElem) ->
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
      sortAccountsBy( (el) -> $scope.getAmount(el) )

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElements? && $scope.selectedElements.length > 0
      all_values_are_positive = true

      inputData = []
      angular.forEach($scope.selectedElements, (sElem) ->
        data = angular.copy(sElem)

        period = null
        period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
        dates = _.map w.content.dates, (date) ->
          $filter('mnoDate')(date, period)

        inputData.push({title: data.name, labels: dates, values: data.totals})

        angular.forEach(data.totals, (value) ->
          all_values_are_positive &&= value >= 0
        )
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true,
        datasetFill: $scope.selectedElements.length == 1,
        pointDot: $scope.selectedElements.length == 1,
      }

      chartData = ChartFormatterSvc.lineChart(inputData,options)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


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
    # Build simple array of identifiers for metadata storage
    selectedElementsMetadata = _.map($scope.selectedElements, (element)->
      getIdentifier(element)
    )
    {selectedElements: selectedElementsMetadata}

  w.settings.push(selectedElementsSetting)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesSalesSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesSalesSummaryCtrl'
  }
)
