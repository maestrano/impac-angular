module = angular.module('impac.components.widgets.hr-payroll-summary',[])

module.controller('WidgetHrPayrollSummaryCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

    w = $scope.widget

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

    w.format = ->
      if $scope.isDataFound && $scope.selectedElements? && $scope.selectedElements.length > 0

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
        }
        w.hist_chart = ChartFormatterSvc.lineChart(inputData,options)

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
        }
        w.cur_chart = ChartFormatterSvc.pieChart(pieData, pieOptions)

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
      if $scope.selectedElements? && !_.isEmpty($scope.selectedElements) && $scope.selectedElements[0].id?
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
      if w.content.hist_parameters?
        switch w.content.hist_parameters.period
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

# TODO selectedElement and collapsed should be factorized as settings or 'commons'

    $scope.toogleSelectedElement = (element) ->
      if $scope.isSelected(element)
        $scope.selectedElements = _.reject($scope.selectedElements, (sElem) ->
          if element.id
            sElem.id == element.id
          else
            sElem.name == element.name
        )
        w.format()
        if w.isExpanded() && $scope.selectedElements.length == 0
          w.toogleExpanded()
        else
          w.updateSettings(false)
      else
        $scope.selectedElements ||= []
        $scope.selectedElements.push(element)
        w.format()
        if !w.isExpanded()
          w.toogleExpanded()
        else
          w.updateSettings(false)

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

    $scope.toogleCollapsed = (element) ->
      if element? && element.name?
        if _.find($scope.unCollapsed, ((name) -> element.name == name))
          $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
            name == element.name
          )
        else
          $scope.unCollapsed.push(element.name)
        w.updateSettings(false)

    $scope.getPeriod = ->
      if $scope.isDataFound && w.content.hist_parameters
        period_param = w.content.hist_parameters.period || "MONTHLY"
        period = "day"
        period = period_param.substr(0,period_param.length-2).toLowerCase() if period_param != "DAILY"
        return "last #{period}"
      else
        return "last MONTH"

    $scope.isCollapsed = (element) ->
      if element? && element.name?
        if _.find($scope.unCollapsed, ((name) -> element.name == name))
          return false
        else
          return true


    # ### Mini-settings

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

    # -----------------

    # TODO: Refactor once we have understood exactly how the angularjs compilation process works:
    # in this order, we should:
    # 1- compile impac-widget controller
    # 2- compile the specific widget template/controller
    # 3- compile the settings templates/controllers
    # 4- call widget.loadContent() (ideally, from impac-widget, once a callback
    #     assessing that everything is compiled an ready is received)
    getSettingsCount = ->
      if w.settings?
        return w.settings.length
      else
        return 0

    # width + time range + organization_ids + unCollapsed + selectedElement + hist mode choser
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 6

    return w
)

module.directive('widgetHrPayrollSummary', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("hr")
      element.addClass("payroll-summary")
    ,controller: 'WidgetHrPayrollSummaryCtrl'
  }
)