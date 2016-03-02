module = angular.module('impac.components.widgets.sales-break-even',[])

module.controller('WidgetSalesBreakEvenCtrl', ($scope, $q, ChartFormatterSvc, $filter) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()
  $scope.timePeriodDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
    $scope.timePeriodDeferred.promise
  ]


  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales)
    $scope.threshold = w.metadata.threshold

  # TODO: should it be managed in a service? in the widget directive? Must isLoading and isDataFound be bound to the widget object or to the scope?
  w.processError = (error) ->
    # TODO: better error management
    if error.code == 404
      $scope.isDataFound = false

  $scope.getProjectedDate = ->
    if $scope.isDataFound && w.content.break_even
      if "#{w.content.break_even.projected_date}".match('After')
        date = angular.copy(w.content.break_even.projected_date).replace('After ', '')
        return "> #{$filter('date')(date, 'd-MM-yy')}"
      else
        return w.content.break_even.projected_date

  $scope.getOpportunitiesToClose = ->
    if $scope.isDataFound && w.content.break_even
      if "#{w.content.break_even.opportunities_to_close}".match('>')
        opps = angular.copy(w.content.break_even.opportunities_to_close).replace('>', '')
        return "> #{opps}"
      else
        return w.content.break_even.opportunities_to_close

  $scope.isTargetMet = ->
    if $scope.isDataFound && w.content.break_even
      return (w.content.break_even.variance < 0)

  $scope.getVariance = ->
    if $scope.isDataFound && w.content.break_even
      return Math.abs(w.content.break_even.variance)

  # Mini-settings
  # --------------------------------------
  thresholdSetting = {}
  thresholdSetting.initialized = false

  thresholdSetting.initialize = ->
    thresholdSetting.initialized = true

  thresholdSetting.toMetadata = ->
    {threshold: $scope.threshold}

  w.settings.push(thresholdSetting)


  # Widget is ready: can trigger the "wait for settigns to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetSalesBreakEven', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesBreakEvenCtrl'
  }
)
