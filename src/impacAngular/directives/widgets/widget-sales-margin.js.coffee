module = angular.module('maestrano.analytics.widget-sales-margin',['maestrano.assets'])

module.controller('WidgetSalesMarginCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', '$filter',
  ($scope, DhbAnalyticsSvc, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = w.content? && w.content.margins? && w.content.dates?

      $scope.filterOptions = [
        {label: 'Including taxes', value: 'gross_margin'},
        {label: 'Excluding taxes', value: 'net_margin'}
      ]

      if w.metadata? && w.metadata.filter=="net_margin"
        $scope.filter = $scope.filterOptions[1]
      else
        $scope.filter = $scope.filterOptions[0]

    w.format = ->
      if $scope.isDataFound
        if w.metadata? && w.metadata.filter=="net_margin"
          values = w.content.margins.net
        else
          values = w.content.margins.gross
        
        inputData = {title: "Gross margin", labels: w.content.dates, values: values}
        all_values_are_positive = true
        angular.forEach(values, (value) ->
          all_values_are_positive &&= value >= 0
        )

        options = {
          scaleBeginAtZero: all_values_are_positive,
          showXLabels: false,
        }
        w.chart = ChartFormatterSvc.lineChart([inputData],options)

    $scope.getTotalMargin = ->
      if $scope.isDataFound
        if w.metadata? && w.metadata.filter=="net_margin"
          return _.reduce w.content.margins.net, (memo, margin) ->
            memo + margin
          , 0
        else
          return _.reduce w.content.margins.gross, (memo, margin) ->
            memo + margin
          , 0

    $scope.getCurrency = ->
      if $scope.isDataFound
        return w.content.currency || "USD"

    $scope.getTimeSpan = ->
      if $scope.isDataFound
        return "From #{$filter('date')(_.first(w.content.dates), 'd MMM yy')} to #{$filter('date')(_.last(w.content.dates), 'd MMM yy')}"


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

    # organizations + time range + hist mode + oaram selector
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 4

    return w
])

module.directive('widgetSalesMargin', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("accounts")
      element.addClass("accounting-value")
    ,controller: 'WidgetSalesMarginCtrl',
  }
)