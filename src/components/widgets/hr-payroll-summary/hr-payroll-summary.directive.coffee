module = angular.module('impac.components.widgets.hr-payroll-summary',[])

module.controller('WidgetHrPayrollSummaryCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, $translate) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.histModeDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.widthDeferred.promise
    $scope.histModeDeferred.promise
    $scope.chartDeferred.promise
  ]

  $scope.ascending = true
  $scope.sortedColumn = 'employee'

  periodName = if (h = $scope.widget.metadata.hist_parameters) && h.period then h.period.toLowerCase() else 'monthly'
  $scope.periodTranslation = $translate.instant("impac.widget.settings.time_period.period.#{periodName}")

  # Widget specific methods
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)

      $scope.unCollapsed = w.metadata.unCollapsed || []

      unless _.isEmpty(w.metadata.selectedElements)
        $scope.selectedElements = []
        for sElemId in w.metadata.selectedElements
          # Attempt to find element by statement name
          foundElem = _.find(w.content.summary, (statement)-> statement.name == sElemId)
          # Attempt to find element by statement employee id
          foundElem ||= fetchElement(w.content.summary, sElemId)

          $scope.selectedElements.push(foundElem) if foundElem

      w.width = 6 unless $scope.selectedElements? && $scope.selectedElements.length > 0
      sortData()

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.getLastValue = (element) ->
    (element.totals && element.totals[element.totals.length - 1]) || 0

  $scope.getTotalSum = (element) ->
    _.reduce(element.totals, (memo, num) ->
      memo + num
    , 0) if element.totals?

  $scope.getName = (element) ->
    if element? && element.name?
      return $translate.instant('impac.widget.hr_payroll_summary.total_leaves') if element.name == "total_leaves"
      return $translate.instant('impac.widget.hr_payroll_summary.total_superannuation') if element.name == "total_super"
      return $translate.instant('impac.widget.hr_payroll_summary.total_reimbursements') if element.name == "total_reimbursement"
      return $translate.instant('impac.widget.hr_payroll_summary.total_taxes') if element.name == "total_tax"
      return $translate.instant('impac.widget.hr_payroll_summary.total_time_off') if element.name == "total_timeoff"
      return element.name.replace(/_/g, " ")

  $scope.getTrackedField = ->
    if !_.isEmpty($scope.selectedElements) && $scope.selectedElements[0].id?
      field = $scope.selectedElements[0].id.split('-')[0]
      allFieldsEquals = true
      angular.forEach($scope.selectedElements, (element)->
        allFieldsEquals &&= (element.id && field == element.id.split('-')[0])
      )

      if allFieldsEquals
        return $scope.getName({name: field})
      else
        return null

  $scope.formatDate = (date) ->
    if w.metadata? && w.metadata.hist_parameters?
      return $filter('mnoDate')(date, w.metadata.hist_parameters.period)
    else
      return $filter('date')(date, 'MMM')

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

  $scope.hasElements = ->
    $scope.selectedElements? && $scope.selectedElements.length > 0

  $scope.getSelectLineColor = (element, statementName = null) ->
    sElem = _.find($scope.selectedElements, (sElem)->
      matchElementToSelectedElement(element, statementName, sElem)
    )
    ChartFormatterSvc.getColor(_.indexOf($scope.selectedElements, sElem)) if $scope.hasElements()

  matchElementToSelectedElement = (element, elementCategory = null, sElem)->
    getIdentifier(element, elementCategory) == getIdentifier(sElem)

  fetchElement = (statements, sElemId)->
    for statement in statements
      continue unless statement.employees?
      element = _.find(statement.employees, (e) -> getIdentifier(e, statement.name) == sElemId)
      if element?
        element = angular.merge(angular.copy(element), category: statement.name)
        return element

  getIdentifier = (element, category = null)->
    id = element.id || element.name
    category ||= element.category
    return id unless category
    "#{category}-#{id}"

  # <---

  sortEmployeesBy = (getElem) ->
    angular.forEach(w.content.summary, (sElem) ->
      if sElem.employees
        sElem.employees.sort (a, b) ->
          res = if getElem(a) > getElem(b) then 1
          else if getElem(a) < getElem(b) then -1
          else 0
          res *= -1 unless $scope.ascending
          return res
    )

  sortData = ->
    if $scope.sortedColumn == 'employee'
      sortEmployeesBy( (el) -> el.name )
    else if $scope.sortedColumn == 'total'
      sortEmployeesBy( (el) -> $scope.getLastValue(el) )

  # Chart formatting function
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
            $filter('mnoDate')(date, 'YEARLY')
          else if w.metadata.hist_parameters && w.metadata.hist_parameters.period == "QUARTERLY"
            $filter('mnoDate')(date, 'QUARTERLY')
          else if w.metadata.hist_parameters && w.metadata.hist_parameters.period == "MONTHLY"
            $filter('mnoDate')(date, 'MONTHLY')
          else if w.metadata.hist_parameters && w.metadata.hist_parameters.period == "WEEKLY"
            $filter('mnoDate')(date, 'WEEKLY')
          else if w.metadata.hist_parameters && w.metadata.hist_parameters.period == "DAILY"
            $filter('mnoDate')(date, 'DAILY')
          else
            $filter('date')(date, 'MMM')
        angular.forEach($scope.selectedElements, (sElem) ->
          data = angular.copy(sElem)
          inputData.push({title: data.name, labels: labels, values: data.totals})

          angular.forEach(data.totals, (value) ->
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
        pieData = _.map($scope.selectedElements, (elem) ->
          {
            label: $filter('titleize')($scope.getName({name: elem.name})),
            value: $scope.getLastValue(elem),
          }
        )
        pieOptions = {
          showTooltips: true,
          percentageInnerCutout: 50,
          tooltipFontSize: 12,
          currency: 'hide'
        }
        chartData = ChartFormatterSvc.pieChart(pieData, pieOptions)

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

module.directive('widgetHrPayrollSummary', ->
  return {
    restrict: 'A',
    controller: 'WidgetHrPayrollSummaryCtrl'
  }
)
