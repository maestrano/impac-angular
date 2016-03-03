module = angular.module('impac.components.widgets.hr-payroll-summary',[])

module.controller('WidgetHrPayrollSummaryCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) ->

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


  # Widget specific methods
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)

      $scope.unCollapsed = w.metadata.unCollapsed || []

      if w.metadata.selectedElements
        $scope.selectedElements = []
        angular.forEach(w.metadata.selectedElements, (sElem) ->
          foundElem = _.find(w.content.summary, (statement)->
            statement.name == sElem.name
          )

          if !foundElem
            angular.forEach(w.content.summary, (statement) ->
              foundElem ||= _.find(statement.employees, (employee)->
                sElem.id == employee.id
              ) if statement.employees?
            )

          $scope.selectedElements.push(foundElem) if foundElem
        )

      w.width = 6 unless $scope.selectedElements? && $scope.selectedElements.length > 0

  $scope.getElementChartColor = (index) ->
    ChartFormatterSvc.getColor(index)

  $scope.getLastValue = (element) ->
    element.totals[element.totals.length - 2] if element.totals?

  $scope.getTotalSum = (element) ->
    _.reduce(element.totals, (memo, num) ->
      memo + num
    , 0) if element.totals?

  $scope.getName = (element) ->
    if element? && element.name?
      return "Total Leaves Accruals" if element.name == "total_leaves"
      return "Total Superannuation Accruals" if element.name == "total_super"
      return "Total Reimbursements" if element.name == "total_reimbursement"
      return "Total Taxes" if element.name == "total_tax"
      return "Total Time Off" if element.name == "total_timeoff"
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
  # <---


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
        pieData = _.map $scope.selectedElements, (elem) ->
          {
            label: $filter('titleize')($scope.getName({name: elem.name})),
            value: $scope.getLastValue(elem),
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
