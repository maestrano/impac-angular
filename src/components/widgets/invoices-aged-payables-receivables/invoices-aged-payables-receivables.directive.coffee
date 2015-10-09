module = angular.module('impac.components.widgets.invoices-aged-payables-receivables',[])

module.controller('WidgetInvoicesAgedPayablesReceivablesCtrl', ($scope, $log, $filter, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && (!_.isEmpty(w.content.payables) || !_.isEmpty(w.content.receivables)) && !_.isEmpty(w.content.dates)

        $scope.unCollapsed = w.metadata.unCollapsed || []

        if w.metadata.selectedElements
          $scope.selectedElements = []
          angular.forEach(w.metadata.selectedElements, (sElem) ->
            foundElem = w.content.payables if sElem.name == "aged_payables"
            foundElem = w.content.receivables if sElem.name == "aged_receivables" && !foundElem

            foundElem = _.find(w.content.payables.suppliers, (supplier)->
              supplier.id == sElem.id
            ) if !foundElem

            foundElem = _.find(w.content.receivables.customers, (customer)->
              customer.id == sElem.id
            ) if !foundElem

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
        w.chart = ChartFormatterSvc.lineChart(inputData,options)

    $scope.getElementChartColor = (index) ->
      ChartFormatterSvc.getColor(index) if index?

    $scope.getLastValue = (element) ->
      _.last(element.totals) if element? && element.totals?

    $scope.getTotalSum = (element) ->
      _.reduce(element.totals, (memo, num) ->
        memo + num
      , 0) if element? && element.totals?

    $scope.getName = (element) ->
      if element? && element.name?
        return element.name.replace(/_/g, " ")

    $scope.getPeriod = ->
      if $scope.isDataFound && w.content.hist_parameters
        period_param = w.content.hist_parameters.period || "MONTHLY"
        period = "day"
        period = period_param.substr(0,period_param.length-2).toLowerCase() if period_param != "DAILY"
        return "current #{period}"
      else return "current month"


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
          w.updateSettings(false)
      else
        $scope.selectedElements ||= []
        $scope.selectedElements.push(element)
        w.format()
        if !w.isExpanded()
          w.toggleExpanded()
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

    $scope.toggleCollapsed = (element) ->
      if element? && element.name?
        if _.find($scope.unCollapsed, ((name) -> element.name == name))
          $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
            name == element.name
          )
        else
          $scope.unCollapsed.push(element.name)
        w.updateSettings(false)

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

    $scope.$watch getSettingsCount, (total) ->
      if total >= 5
        w.loadContent()

    return w
)

module.directive('widgetInvoicesAgedPayablesReceivables', ->
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesAgedPayablesReceivablesCtrl'
  }
)
