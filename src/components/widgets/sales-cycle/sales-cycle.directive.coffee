module = angular.module('impac.components.widgets.sales-cycle',[])

module.controller('WidgetSalesCycleCtrl', ($scope, Utilities, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.status_average_durations)
        $scope.unit = (w.metadata.unit || w.content.unit || "days").toLowerCase()

        $scope.statusOptions = _.compact _.map w.metadata.status_selection, (status) ->
          {label: status, selected: true} if angular.isDefined(w.content.status_average_durations[status])

        angular.forEach w.content.status_average_durations, (value, status) ->
          if w.metadata.status_selection && !(status in w.metadata.status_selection)
            $scope.statusOptions.push({label: status, selected: false})
          else if _.isEmpty(w.metadata.status_selection)
            $scope.statusOptions.push({label: status, selected: true})


    w.format = ->
      if $scope.isDataFound
        pieData = _.compact _.map $scope.statusOptions, (statusOption) ->
          value = w.content.status_average_durations[statusOption.label]

          {
            label: "#{$filter('titleize')(statusOption.label)}: #{value} #{$scope.unit}",
            value: value
          } if statusOption.selected && angular.isDefined(value)

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

    # time range + organizations + params picker
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 3

    return w
)

module.directive('widgetSalesCycle', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesCycleCtrl'
  }
)
