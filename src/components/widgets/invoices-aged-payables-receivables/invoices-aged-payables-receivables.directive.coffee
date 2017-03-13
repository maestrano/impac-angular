module = angular.module('impac.components.widgets.invoices-aged-payables-receivables',[])

module.controller('WidgetInvoicesAgedPayablesReceivablesCtrl', ($scope, $q, $log, $filter, ChartFormatterSvc, ImpacWidgetsSvc, $translate) ->

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
  $scope.sortedColumn = 'customer'

  periodName = if (c = $scope.widget.content) && (c.hist_parameters && c.hist_parameters.period) then c.hist_parameters.period.toLowerCase() else 'monthly'
  $translate('impac.widget.settings.time_period.period.' + periodName).then(
    (translation) ->
      $scope.period_translation = _.capitalize(translation.toLowerCase())
  )

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && (!_.isEmpty(w.content.payables) || !_.isEmpty(w.content.receivables)) && !_.isEmpty(w.content.dates)

      $scope.unCollapsed = w.metadata.unCollapsed || []

      unless _.isEmpty(w.metadata.selectedElements)
        $scope.selectedElements = []
        angular.forEach(w.metadata.selectedElements, (sElem) ->
          # Attempt to find element by content type name
          foundElem = w.content.payables if sElem == "aged_payables"
          foundElem = w.content.receivables if sElem == "aged_receivables" && !foundElem

          # Attempt to find element by supplier id
          foundElem = _.find(w.content.payables.suppliers, (supplier)->
            supplier.id == sElem
          ) if !foundElem

          # Attempt to find element by customer id
          foundElem = _.find(w.content.receivables.customers, (customer)->
            customer.id == sElem
          ) if !foundElem

          $scope.selectedElements.push(foundElem) if foundElem
        )

      w.width = 6 unless $scope.selectedElements? && $scope.selectedElements.length > 0
      sortData()

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
    if $scope.isDataFound && w.metadata && w.metadata.hist_parameters
      period_param = w.metadata.hist_parameters.period || "MONTHLY"
      period = "day"
      period = period_param.substr(0,period_param.length-2).toLowerCase() if period_param != "DAILY"
      return "current #{period}"
    else return "current month"

  $scope.getOldestInvoice = (element) ->
    idx = _.findIndex(element.totals, (invoice) -> invoice != 0)
    return w.content.dates[idx] || null

  # --->
  # TODO selectedElement and collapsed should be factorized as settings or 'commons'
  $scope.toggleSelectedElement = (element) ->
    if $scope.isSelected(element)
      $scope.selectedElements = _.reject($scope.selectedElements, (sElem) ->
        matcher = (if element.id? then 'id' else 'name')
        sElem[matcher] == element[matcher]
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
    element? && _.any($scope.selectedElements, (sElem) ->
      matcher = (if element.id? then 'id' else 'name')
      sElem[matcher] == element[matcher]
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
  # <---

  sortBy = (data, getElem) ->
    data.sort (a, b) ->
      res = if getElem(a) > getElem(b) then 1
      else if getElem(a) < getElem(b) then -1
      else 0
      res *= -1 unless $scope.ascending
      return res

  sortByInvoiceCallback = (el) ->
    date = $scope.getOldestInvoice(el)
    # Date is a date-string representation of a period returned formatted from Impac! API.
    # It may contain symbols to signify further meaning, e.g " < 30 Nov 2015*". This
    # cleanses the symbols, formatting a valid Date for sorting.
    date = date.match(/[^_\W]+\s?/g).join('') if date && _.isString(date)
    new Date(date)

  sortData = ->
    if $scope.sortedColumn == 'customer'
      sortBy(w.content.payables.suppliers, (el) -> el.name )
      sortBy(w.content.receivables.customers, (el) -> el.name )
    else if $scope.sortedColumn == 'total'
      sortBy(w.content.payables.suppliers, (el) -> $scope.getTotalSum(el) )
      sortBy(w.content.receivables.customers, (el) -> $scope.getTotalSum(el) )
    else if $scope.sortedColumn == 'invoice'
      sortBy(w.content.payables.suppliers, sortByInvoiceCallback)
      sortBy(w.content.receivables.customers, sortByInvoiceCallback)

  $scope.sort = (col) ->
    if $scope.sortedColumn == col
      $scope.ascending = !$scope.ascending
    else
      $scope.ascending = true
      $scope.sortedColumn = col
    sortData()

  $scope.getSelectLineColor = (elem) ->
    ChartFormatterSvc.getColor(_.indexOf($scope.selectedElements, elem)) if $scope.hasElements()


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound && $scope.selectedElements? && $scope.selectedElements.length > 0

      # Hist chart
      all_values_are_positive = true
      inputData = []

      period = null
      period = w.metadata.hist_parameters.period if w.metadata? && w.metadata.hist_parameters?
      dates = _.map(w.content.dates, (date, index) -> $filter('mnoDate')(date, period))

      angular.forEach($scope.selectedElements, (sElem) ->
        data = angular.copy(sElem)
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
      matcher = (if element.id? then 'id' else 'name')
      element[matcher]
    )
    {selectedElements: selectedElementsMetadata}

  w.settings.push(selectedElementsSetting)

  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetInvoicesAgedPayablesReceivables', ->
  return {
    restrict: 'A',
    controller: 'WidgetInvoicesAgedPayablesReceivablesCtrl'
  }
)
