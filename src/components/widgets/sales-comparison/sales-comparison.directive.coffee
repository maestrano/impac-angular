module = angular.module('impac.components.widgets.sales-comparison',[])

module.controller('WidgetSalesComparisonCtrl', ($scope, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales_comparison) && !_.isEmpty(w.content.dates)

        $scope.unCollapsed = w.metadata.unCollapsed || []

        $scope.filterOptions = [
          {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
          {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
          {label: 'quantity sold', value: 'quantity_sold'},
        ]
        $scope.filter = _.find($scope.filterOptions, (o) ->
          w.metadata && w.metadata.filter == o.value
        ) || $scope.filterOptions[0]

        $scope.criteriaOptions = [
          {label: 'products', value: 'default'},
          {label: 'locations', value: 'location'},
          {label: 'industries', value: 'industry'},
          {label: 'customers', value: 'customer'},
        ]
        $scope.criteria = _.find($scope.criteriaOptions, (o) ->
          w.metadata && w.metadata.criteria == o.value
        ) || $scope.criteriaOptions[0]

        if w.metadata.selectedElements
          $scope.selectedElements = []
          angular.forEach(w.metadata.selectedElements, (sElem) ->
            foundElem = _.find(w.content.sales_comparison, (statement)->
              statement.name == sElem.name
            )

            if !foundElem
              angular.forEach(w.content.sales_comparison, (statement) ->
                foundElem ||= _.find(statement.sales, (sale)->
                  sElem.id == sale.id
                ) if statement.sales?
              )

            $scope.selectedElements.push(foundElem) if foundElem
          )

        # w.width = 6 unless $scope.selectedElements? && $scope.selectedElements.length > 0

    w.format = ->
      if $scope.isDataFound && $scope.selectedElements? && $scope.selectedElements.length > 0
        all_values_are_positive = true

        inputData = []
        angular.forEach($scope.selectedElements, (sElem) ->
          data = angular.copy(sElem)

          labels = _.map w.content.dates, (date) ->
            if w.metadata.hist_parameters && w.metadata.hist_parameters.period == "YEARLY"
              $filter('date')(date, 'yyyy')
            else if w.metadata.hist_parameters && w.metadata.hist_parameters.period == "QUARTERLY"
              $filter('date')(date, 'MMM-yy')
            else if w.metadata.hist_parameters && (w.metadata.hist_parameters.period == "WEEKLY" || w.metadata.hist_parameters.period == "DAILY")
              $filter('date')(date, 'dd-MMM')
            else
              $filter('date')(date, 'MMM')

          inputData.push({title: data.name, labels: labels, values: data.totals[$scope.filter.value]})

          angular.forEach(data.totals, (value) ->
            all_values_are_positive &&= value >= 0
          )
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: false,
          pointDot: false,
        }

        w.chart = ChartFormatterSvc.lineChart(inputData,options)

    $scope.$watch (-> $scope.filter), (filter) ->
      w.format()
    ,true

    $scope.getLastDate = ->
      _.last(w.content.dates) if $scope.isDataFound

    $scope.getTotalForPeriod = (element) ->
      _.reduce(element.totals[$scope.filter.value], (memo,total) ->
        memo + total
      , 0) if element.totals? && $scope.filter

    $scope.getElementChartColor = (index) ->
      ChartFormatterSvc.getColor(index)


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

    # width + hist_parameters + organization_ids + unCollapsed + selectedElement + x2 param-selector
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 7

    return w
)

module.directive('widgetSalesComparison', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesComparisonCtrl'
  }
)