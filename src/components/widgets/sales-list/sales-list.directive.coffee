module = angular.module('impac.components.widgets.sales-list',[])

module.controller('WidgetSalesListCtrl', ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary)

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
        $scope.filter = _.find($scope.filterOptions, (o) ->
          o.value == w.content.filter
        ) || $scope.filterOptions[0]

        $scope.unCollapsed = w.metadata.unCollapsed || []

    $scope.toggleCollapsed = (categoryName) ->
      if categoryName?
        if _.find($scope.unCollapsed, ((name) -> categoryName == name))
          $scope.unCollapsed = _.reject($scope.unCollapsed, (name) ->
            name == categoryName
          )
        else
          $scope.unCollapsed.push(categoryName)
        w.updateSettings(false)

    $scope.isCollapsed = (categoryName) ->
      if categoryName?
        if _.find($scope.unCollapsed, ((name) -> categoryName == name))
          return false
        else
          return true


    # ### Mini-settings

    unCollapsedSetting = {}
    unCollapsedSetting.initialized = false

    unCollapsedSetting.initialize = ->
      unCollapsedSetting.initialized = true

    unCollapsedSetting.toMetadata = ->
      {unCollapsed: $scope.unCollapsed}

    w.settings.push(unCollapsedSetting)

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

    # organization_ids + unCollapsed + param selector
    $scope.$watch getSettingsCount, (total) ->
      w.loadContent() if total >= 3

    return w
)

module.directive('widgetSalesList', ->
  return {
    restrict: 'A',
    controller: 'WidgetSalesListCtrl'
  }
)