module = angular.module('impac.components.widgets.sales-cycle',[])

module.controller('WidgetSalesCycleCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramsPickerDeferred = $q.defer()
  $scope.timeRangeDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramsPickerDeferred.promise
    $scope.timeRangeDeferred.promise
    $scope.chartDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.status_average_durations)

      # Takes metadata from dashboard or from widget according to 'reach' parameter
      status_average_durations = if w.metadata.status_average_durations && w.metadata.status_average_durations.reach == 'dashboard' then ImpacDashboardsSvc.getCurrentDashboard().status_average_durations else w.metadata.status_average_durations
      status_average_durations = status_average_durations || {values:[]}

      # Parameter which define showing "Apply to all similar widgets" checkbox
      $scope.hasReach = true

      $scope.unit = (w.metadata.unit || w.content.unit || "days").toLowerCase()

      $scope.statusOptions = _.compact _.map status_average_durations.values, (status) ->
        {label: status, selected: true} if angular.isDefined(w.content.status_average_durations[status])

      angular.forEach w.content.status_average_durations, (value, status) ->
        if status_average_durations.values && !(status in status_average_durations.values)
          $scope.statusOptions.push({label: status, selected: false})
        else if _.isEmpty(status_average_durations.values)
          $scope.statusOptions.push({label: status, selected: true})

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false


  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
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
        currency: w.content.unit
      }
      chartData = ChartFormatterSvc.pieChart(pieData, pieOptions)

      # calls chart.draw()
      $scope.drawTrigger.notify(chartData)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesCycle', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesCycleCtrl'
  }
)
