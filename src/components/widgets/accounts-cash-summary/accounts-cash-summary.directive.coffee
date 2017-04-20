module = angular.module('impac.components.widgets.accounts-cash-summary',[])

module.controller('WidgetAccountsCashSummaryCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.widthDeferred.promise
    $scope.chartDeferred.promise
  ]

  $scope.ascending = true
  $scope.sortedColumn = 'account'


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)

      $scope.dates = w.content.dates
      $scope.unCollapsed = w.metadata.unCollapsed || []

      if w.metadata.selectedElement
        # Attempt to find the selectedElement by statement name
        $scope.selectedElement = _.find(w.content.summary, (statement)->
          statement.name == w.metadata.selectedElement
        )
        # Attempt to find the selectedElement by statement account id
        $scope.selectedElement ||= fetchElement(w.content.summary)

      sortData()

  $scope.getLastDate = ->
    $scope.dates[$scope.dates.length-1] if $scope.dates?

  $scope.getPrevDate = ->
    $scope.dates[$scope.dates.length-2] if $scope.dates?

  $scope.getLastValue = (element) ->
    _.last(element.cash_flows) if element.cash_flows?

  $scope.formatVariance = (aVariance) ->
    if aVariance?
      if aVariance > 0
        "+#{aVariance} %"
      else
        "#{aVariance} %"
    else
      "-"

  $scope.getLastVariance = (element) ->
    if element.variances? && _.last(element.variances)?
      $scope.formatVariance(_.last(element.variances))
    else
      "-"

  $scope.getVarianceClassColor = (aVariance) ->
    if parseInt(aVariance) > 0
      return 'positive'
    else if parseInt(aVariance) < 0
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
      $scope.selectedElement = null
      if w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)
    else
      $scope.selectedElement = angular.copy(element)
      $scope.selectedElement.category = statementName
      w.format()
      if !w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isSelected = (element, statementName = null) ->
    element? && $scope.selectedElement? && (
      matchElementToSelectedElement(element, statementName, $scope.selectedElement)
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
      w.width = 6 unless $scope.selectedElement?

  $scope.getSelectLineColor = (elem) ->
    ChartFormatterSvc.getColor(0)

  fetchElement = (statements)->
    for statement in statements
      continue unless statement.accounts?
      element = _.find(statement.accounts, (acc) -> getIdentifier(acc, statement.name) == w.metadata.selectedElement)
      if element?
        element = angular.merge(angular.copy(element), category: statement.name)
        return element

  matchElementToSelectedElement = (element, elementCategory = null, sElem)->
    getIdentifier(element, elementCategory) == getIdentifier(sElem)

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
      sortAccountsBy( (el) -> $scope.getLastValue(el) )
    else if $scope.sortedColumn == 'variance'
      sortAccountsBy( (el) -> $scope.getLastVariance(el) )

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElement?
      data = angular.copy($scope.selectedElement)

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map w.content.dates, (date) ->
        $filter('mnoDate')(date, period)

      inputData = {labels: dates, datasets: [{title: data.name, values: data.cash_flows}]}
      all_values_are_positive = true
      angular.forEach(data.cash_flows, (value) ->
        all_values_are_positive &&= value >= 0
      )

      options = {
        scaleBeginAtZero: all_values_are_positive,
        showXLabels: true,
      }
      chartData = ChartFormatterSvc.combinedBarChart(inputData,options)

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

  selectedElementSetting = {}
  selectedElementSetting.initialized = false

  selectedElementSetting.initialize = ->
    selectedElementSetting.initialized = true

  selectedElementSetting.toMetadata = ->
    return {selectedElement: null} unless $scope.selectedElement?
    {selectedElement: getIdentifier($scope.selectedElement) }


  w.settings.push(selectedElementSetting)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)

)

module.directive('widgetAccountsCashSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetAccountsCashSummaryCtrl'
  }
)
