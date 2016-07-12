module = angular.module('impac.components.widgets.sales-cycle',[])

module.controller('WidgetSalesCycleCtrl', ($scope, $q, ChartFormatterSvc, $filter, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.paramsPickerDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()
  $scope.chartDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.paramsPickerDeferred.promise
    $scope.timePeriodDeferred.promise
    $scope.chartDeferred.promise
  ]

  $scope.chartTitle = "Your sales cycle represents how much time your leads stay set to each status"


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    dhb = ImpacDashboardsSvc.getCurrentDashboard()
    status_selection = w.metadata.status_selection || dhb.metadata.status_selection || { values: [] }

    if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.status_average_durations)
      # Remove statuses absent from statuses list returned by the widget engine
      _.remove status_selection.values, (status) ->
        status not in _.keys w.content.status_average_durations

      # Parameter which define showing 'Apply to all similar widgets' checkbox
      $scope.hasReach = true

      $scope.statusOptions = []
      angular.forEach w.content.status_average_durations, (value, status) ->
        # Status will be ticked if has been selected before OR if no status is selected at all
        isSelected = _.isEmpty(status_selection.values) || ( status in status_selection.values )
        $scope.statusOptions.push({label: status, selected: isSelected})

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.getEntityColor = (elem) ->
    ChartFormatterSvc.getColor(_.indexOf($scope.pieData, elem)) if $scope.isDataFound

  getName = (name) ->
    if name?
      return name.replace(/_/g, " ")

  # Chart formating function
  # --------------------------------------
  $scope.drawTrigger = $q.defer()
  w.format = ->
    if $scope.isDataFound
      $scope.pieData = _.compact _.map $scope.statusOptions, (statusOption) ->
        value = w.content.status_average_durations[statusOption.label]
        {
          label: "#{$filter('titleize')(getName(statusOption.label))}",
          value: value
        } if statusOption.selected && angular.isDefined(value)

      pieOptions = {
        percentageInnerCutout: 50,
        tooltipFontSize: 12,
        currency: w.content.unit
      }
      chartData = ChartFormatterSvc.pieChart($scope.pieData, pieOptions)

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
