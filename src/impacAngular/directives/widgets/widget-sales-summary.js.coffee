module = angular.module('maestrano.analytics.widget-sales-summary',['maestrano.assets'])

module.controller('WidgetSalesSummaryCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'Utilities', 'ChartFormatterSvc',
  ($scope, DhbAnalyticsSvc, Utilities, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = !_.isEmpty(w.content.hist_parameters)

        $scope.incorrectPeriod = _.isEmpty(w.content.summary)

        $scope.periodOptions = [
          {label: 'year', value: 'YEARLY'},
          {label: 'quarter', value: 'QUARTERLY'},
          {label: 'month', value: 'MONTHLY'},
          {label: 'week', value: 'WEEKLY'},
          {label: 'day', value: 'DAILY'},
        ]
        $scope.period = _.find($scope.periodOptions, (o) ->
          o.value == w.content.hist_parameters.period
        ) || $scope.periodOptions[0]

        $scope.filterOptions = [
          {label: 'value sold (incl. taxes)', value: 'gross_value_sold'},
          {label: 'value sold (excl. taxes)', value: 'net_value_sold'},
          {label: 'quantity sold', value: 'quantity_sold'},
          {label: 'value purchased (incl. taxes)', value: 'gross_value_purchased'},
          {label: 'value purchased (excl. taxes)', value: 'net_value_purchased'},
          {label: 'quantity purchased', value: 'quantity_purchased'},
        ]
        $scope.filterOptions = [
          $scope.filterOptions[0],
          $scope.filterOptions[1],
          $scope.filterOptions[2]
        ] if w.metadata.criteria == "customer"
        
        $scope.filter = _.find($scope.filterOptions, (o) ->
          o.value == w.content.filter
        ) || $scope.filterOptions[0]

    w.format = ->
      if $scope.isDataFound
        pieData = _.map w.content.summary, (entity) ->
          if entity.company
            label = "#{entity.code || entity.location || entity.industry || entity.customer} (#{entity.company})"
          else
            label = entity.code || entity.location || entity.industry || entity.customer
          {
            label: label,
            value: entity.total,
          }
        pieOptions = {
          percentageInnerCutout: 50,
          tooltipFontSize: 12,
        }
        w.chart = ChartFormatterSvc.pieChart(pieData, pieOptions)

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
      w.loadContent() if total >= 4

    return w
])

module.directive('widgetSalesSummary', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("sales")
      element.addClass("summary")
    ,controller: 'WidgetSalesSummaryCtrl'
  }
)