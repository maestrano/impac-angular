module = angular.module('maestrano.analytics.widget-accounts-cash-summary',[])

module.controller('WidgetAccountsCashSummaryCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter',
  ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)

        $scope.dates = w.content.dates
        $scope.unCollapsed = w.metadata.unCollapsed || []

        if w.metadata.selectedElement
          $scope.selectedElement = _.find(w.content.summary, (statement)->
            statement.name == w.metadata.selectedElement.name
          )
          if !$scope.selectedElement
            angular.forEach(w.content.summary, (statement) ->
              $scope.selectedElement ||= _.find(statement.accounts, (account)->
                account.id == w.metadata.selectedElement.id
              ) if statement.accounts?

          )
        w.width = 6 unless $scope.selectedElement?

    w.format = ->
      if $scope.isDataFound && $scope.selectedElement?
        data = angular.copy($scope.selectedElement)
        labels = _.map w.content.dates, (date) ->
          if w.metadata.hist_parameters? && w.metadata.hist_parameters.period == "YEARLY"
            $filter('date')(date, 'yyyy')
          else if w.metadata.hist_parameters? && w.metadata.hist_parameters.period == "QUARTERLY"
            $filter('date')(date, 'MMM-yy')
          else if w.metadata.hist_parameters? && (w.metadata.hist_parameters.period == "WEEKLY" || w.metadata.hist_parameters.period == "DAILY")
            $filter('date')(date, 'dd-MMM')
          else
            $filter('date')(date, 'MMM')
        inputData = {title: data.name, labels: labels, values: data.cash_flows}
        all_values_are_positive = true
        angular.forEach(data.cash_flows, (value) ->
          all_values_are_positive &&= value >= 0
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
        }
        w.chart = ChartFormatterSvc.lineChart([inputData],options)

    $scope.getLastDate = ->
      _.last($scope.dates) if $scope.dates?

    $scope.getLastValue = (element) ->
      _.last(element.cash_flows) if element.cash_flows?

    $scope.formatVariance = (aVariance) ->
      if aVariance?
        if aVariance > 0
          "+#{aVariance} %"
        else
          "#{aVariance} %"
      else
        "n/a"

    $scope.getLastVariance = (element) ->
      if element.variances? && _.last(element.variances)?
        $scope.formatVariance(_.last(element.variances))
      else
        "n/a"

    $scope.getVarianceClassColor = (aVariance) ->
      if parseInt(aVariance) > 0
        return 'positive'
      else if parseInt(aVariance) < 0
        return 'negative'
      else
        return null

    $scope.getName = (element) ->
      element.name.replace("_", " ") if element? && element.name?

    $scope.toogleSelectedElement = (element) ->
      if $scope.isSelected(element)
        $scope.selectedElement = null
        if w.isExpanded()
          w.toogleExpanded()
        else
          w.updateSettings(false)
      else
        $scope.selectedElement = angular.copy(element)
        w.format()
        if !w.isExpanded()
          w.toogleExpanded()
        else
          w.updateSettings(false)

    $scope.isSelected = (element) ->
      if element? && $scope.selectedElement?
        if (element.id? && $scope.selectedElement.id && element.id == $scope.selectedElement.id) || (element.name == $scope.selectedElement.name)
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

    selectedElementSetting = {}
    selectedElementSetting.initialized = false

    selectedElementSetting.initialize = ->
      selectedElementSetting.initialized = true

    selectedElementSetting.toMetadata = ->
      {selectedElement: $scope.selectedElement}

    w.settings.push(selectedElementSetting)

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

    # width + hist_parameters + organization_ids + unCollapsed + selectedElement
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total == 5

    return w
])

module.directive('widgetAccountsCashSummary', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("accounts")
      element.addClass("cash-summary")
    ,controller: 'WidgetAccountsCashSummaryCtrl'
  }
)