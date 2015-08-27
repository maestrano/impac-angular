module = angular.module('maestrano.analytics.widget-accounts-balance-sheet',['maestrano.assets'])

module.controller('WidgetAccountsBalanceSheetCtrl',[
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc',
  ($scope, DhbAnalyticsSvc, ChartFormatterSvc) ->

    w = $scope.widget

    w.initContext = ->
      if $scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)

        $scope.periodOptions = [
          {label: "Year", value: "YEARLY"},
          {label: "Quarter", value: "QUARTERLY"},
          {label: "Month", value: "MONTHLY"},
          {label: "Week", value: "WEEKLY"},
          {label: "Day", value: "DAILY"},
        ]
        $scope.period = _.find($scope.periodOptions, (o) ->
          o.value == w.content.period
        ) || $scope.periodOptions[2]

        $scope.dates = w.content.dates
        $scope.unCollapsed = w.metadata.unCollapsed || []
        $scope.categories = Object.keys(w.content.summary)

    $scope.toogleCollapsed = (categoryName) ->
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
])

module.directive('widgetAccountsBalanceSheet', ->
  return {
    restrict: 'A',
    link: (scope, element) ->
      element.addClass("accounts")
      element.addClass("balance-sheet")
    ,controller: 'WidgetAccountsBalanceSheetCtrl'
  }
)