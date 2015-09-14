module = angular.module('impac.components.widgets.sales-number-of-leads',[])

module.controller('WidgetSalesNumberOfLeadsCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.number_of_leads)

        $scope.periodOptions = [
          {label: 'year', value: 'YEARLY'},
          {label: 'quarter', value: 'QUARTERLY'},
          {label: 'month', value: 'MONTHLY'},
          {label: 'week', value: 'WEEKLY'},
          {label: 'day', value: 'DAILY'},
        ]
        $scope.period = _.find($scope.periodOptions, (o) ->
          o.value == w.metadata.period
        ) || $scope.periodOptions[3]

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

    # organization_ids + param selector
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 2

    return w
)

module.directive('widgetSalesNumberOfLeads', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesNumberOfLeadsCtrl'
  }
)