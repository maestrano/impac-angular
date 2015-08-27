module = angular.module('maestrano.analytics.widget-sales-aged',['maestrano.assets'])

module.controller('WidgetSalesAgedCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter',
  ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.aged_sales) && !_.isEmpty(w.content.dates)

        $scope.filterOptions = [
          {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
          {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
          {label: 'quantity sold', value: 'quantity_sold'},
        ]
        $scope.filter = _.find($scope.filterOptions, (o) ->
          w.metadata && w.metadata.filter == o.value
        ) || $scope.filterOptions[0]

    w.format = ->
      if $scope.isDataFound
        all_values_are_positive = true
        
        inputData = []
        values = w.content.aged_sales[$scope.filter.value]

        $scope.formattedDates = _.map w.content.dates, (date) ->
          if w.metadata && w.metadata.hist_parameters && w.metadata.hist_parameters.period == "YEARLY"
            $filter('date')(date, 'yyyy')
          else if w.metadata && w.metadata.hist_parameters && w.metadata.hist_parameters.period == "QUARTERLY"
            $filter('date')(date, 'MMM-yy')
          else if w.metadata && w.metadata.hist_parameters && (w.metadata.hist_parameters.period == "WEEKLY" || w.metadata.hist_parameters.period == "DAILY")
            $filter('date')(date, 'dd-MMM')
          else  
            $filter('date')(date, 'MMM')
          
        inputData.push({title: $scope.filter.label, labels: $scope.formattedDates, values: values})
        
        angular.forEach(values, (value) ->
          all_values_are_positive &&= value >= 0
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: true,
          datasetFill: true,
          pointDot: true,
        }

        w.chart = ChartFormatterSvc.lineChart(inputData,options)

    $scope.$watch (-> $scope.filter), (filter) ->
      w.format()
    ,true

    $scope.getTotal = (anIndex) ->
      if $scope.isDataFound && anIndex >=0 && anIndex < w.content.aged_sales[$scope.filter.value].length
        return w.content.aged_sales[$scope.filter.value][anIndex]

    $scope.getLastDate = ->
      _.last(w.content.dates) if $scope.isDataFound

    $scope.getClassColor = (prev,value) ->
      # if (parseFloat(prev) && parseFloat(value))
      if value < prev
        return 'negative'
      else if value > prev
        return 'positive'
      else
        return null


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

    # time range + organization_ids param-selector
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 3

    return w
])

module.directive('widgetSalesAged', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("sales")
      element.addClass("aged")
    ,controller: 'WidgetSalesAgedCtrl'
  }
)