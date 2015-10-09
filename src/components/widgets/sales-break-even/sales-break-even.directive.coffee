module = angular.module('impac.components.widgets.sales-break-even',[])

module.controller('WidgetSalesBreakEvenCtrl', ($scope, ChartFormatterSvc, $filter) ->

    w = $scope.widget

    w.initContext = ->
      $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.sales)
      $scope.threshold = w.metadata.threshold

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

    # -----------------

    thresholdSetting = {}
    thresholdSetting.initialized = false

    thresholdSetting.initialize = ->
      thresholdSetting.initialized = true

    thresholdSetting.toMetadata = ->
      {threshold: $scope.threshold}

    w.settings.push(thresholdSetting)

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

    # organization_ids + time range + threshold
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 3

    return w
)

module.directive('widgetSalesBreakEven', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesBreakEvenCtrl'
  }
)