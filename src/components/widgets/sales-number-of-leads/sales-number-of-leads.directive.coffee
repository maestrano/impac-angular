module = angular.module('impac.components.widgets.sales-number-of-leads',[])

module.controller('WidgetSalesNumberOfLeadsCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramSelectorDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramSelectorDeferred.promise
    $scope.timePeriodDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.number_of_leads)

      $scope.periodOptions = [
        {label: 'year', value: 'YEARLY'},
        {label: 'quarter', value: 'QUARTERLY'},
        {label: 'month', value: 'MONTHLY'},
        {label: 'week', value: 'WEEKLY'},
        {label: 'day', value: 'DAILY'},
      ]
      $scope.period = angular.copy(_.find($scope.periodOptions, (o) ->
        o.value == w.metadata.period
      ) || $scope.periodOptions[3])

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.formatNumberOfLeads = (carac) ->
    formattedNominal = 0
    formattedVariation = "- %"

    return {nominal: formattedNominal, variation: formattedVariation, color: ''} if !$scope.isDataFound

    n_hash = angular.copy(w.content.number_of_leads)
    nominal=0
    color=''

    if carac=="new" && n_hash.total && n_hash.total.length == 2
      nominal = n_hash.total[1] - n_hash.total[0]
      variation = getVariation(n_hash.total)
      if variation > 0
        color = 'green'
      else if variation < 0
        color = 'red'

    else if carac=="converted" && n_hash.converted && n_hash.converted.length == 2
      nominal = n_hash.converted[1]
      variation = getVariation(n_hash.converted)
      if variation > 0
        color = 'green'
      else if variation < 0
        color = 'red'

    else if carac=="lost" && n_hash.lost && n_hash.lost.length == 2
      nominal = n_hash.lost[1]
      variation = getVariation(n_hash.lost)
      if variation < 0
        color = 'green'
      else if variation > 0
        color = 'red'

    else
      return {nominal: formattedNominal, variation: formattedVariation, color: color}

    if nominal > 0
      formattedNominal = "+#{nominal}"
    else if nominal < 0
      formattedNominal = nominal

    if variation && variation > 0
      formattedVariation = "+#{variation.toFixed(0)}%"
    else if variation && variation < 0
      formattedVariation = "#{variation.toFixed(0)}%"

    return {nominal: formattedNominal, variation: formattedVariation, color: color}

  getVariation = (v_array) ->
    if v_array[0] != 0
      variation = 100 * ((v_array[1] / v_array[0]) - 1)
    else
      variation = "- "


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesNumberOfLeads', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesNumberOfLeadsCtrl'
  }
)
