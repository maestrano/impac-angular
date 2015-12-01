module = angular.module('impac.components.widgets.accounts-cash-summary',[])

module.controller('WidgetAccountsCashSummaryCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timeRangeDeferred = $q.defer()
  $scope.widthDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timeRangeDeferred.promise
    $scope.widthDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
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

  $scope.getPeriod = ->
    return unless w.metadata? && w.metadata.hist_parameters?
    period = w.metadata.hist_parameters.period || "MONTHLY"
    switch period.toUpperCase()
      when "DAILY" then return "day"
      else return period.toLowerCase().replace('ly','')


  $scope.toggleSelectedElement = (element) ->
    if $scope.isSelected(element)
      $scope.selectedElement = null
      if w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)
    else
      $scope.selectedElement = angular.copy(element)
      w.format()
      if !w.isExpanded()
        w.toggleExpanded()
      else
        ImpacWidgetsSvc.updateWidgetSettings(w,false)

  $scope.isSelected = (element) ->
    if element? && $scope.selectedElement?
      if (element.id? && $scope.selectedElement.id && element.id == $scope.selectedElement.id) || (element.name == $scope.selectedElement.name)
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
      w.width = 6 unless $scope.selectedElement?


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElement?
      data = angular.copy($scope.selectedElement)
      dates = _.map w.content.dates, (date) ->
        if w.metadata.hist_parameters? && w.metadata.hist_parameters.period == "YEARLY"
          $filter('date')(date, 'yyyy')
        else if w.metadata.hist_parameters? && w.metadata.hist_parameters.period == "QUARTERLY"
          $filter('date')(date, 'MMM-yy')
        else if w.metadata.hist_parameters? && (w.metadata.hist_parameters.period == "WEEKLY" || w.metadata.hist_parameters.period == "DAILY")
          $filter('date')(date, 'dd-MMM')
        else
          $filter('date')(date, 'MMM')
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
    {selectedElement: $scope.selectedElement}

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
