module = angular.module('impac.components.widgets-settings.average-profit',[])
                .constant('GRANULARITY_OPTIONS', Object.freeze([
                   {name: 'daily', value: 'DAILY'},
                   {name: 'monthly', value: 'MONTHLY'},
                   {name: 'quarterly', value: 'QUARTERLY'},
                   {name: 'yearly', value: 'YEARLY'}]))

module.controller('SettingAverageProfitCtrl', ($scope, ImpacDashboardsSvc, GRANULARITY_OPTIONS) ->

  w = $scope.parentWidget
  $scope.granularityOptions = GRANULARITY_OPTIONS
  $scope.selectedAverageProfit =
    enabled: false
    period: 'DAILY'
    calculation:
      from: moment().subtract(6, 'months').toDate()
      to: moment().toDate()
    application:
      from: moment().add(1, 'day').toDate()
      to: moment().add(3, 'months').toDate()

  $scope.toggleAverageProfit = ->
    $scope.selectedAverageProfit.enabled = !$scope.selectedAverageProfit.enabled

  $scope.isToggleAverageProfit = ->
    if $scope.selectedAverageProfit?
      return $scope.selectedAverageProfit.enabled

  $scope.calculation =
    from:
      datePicker:
        opened: false
        date: $scope.selectedAverageProfit.calculation.from
        options: {maxDate: new Date()}
        toggle: -> this.opened = !this.opened
    to:
      datePicker:
        opened: false
        date: $scope.selectedAverageProfit.calculation.to
        options: {minDate: new Date()}
        toggle: -> this.opened = !this.opened

  $scope.application =
    from:
      datePicker:
        opened: false
        date: $scope.selectedAverageProfit.application.from
        options: {maxDate: new Date()}
        toggle: -> this.opened = !this.opened
    to:
      datePicker:
        opened: false
        date: $scope.selectedAverageProfit.application.to
        options: {minDate: new Date()}
        toggle: -> this.opened = !this.opened

  # What will be passed to parentWidget
  setting = {}
  setting.key = "average_profit"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        currentDashboard = config.currentDashboard
        average_profit = _.get(w, 'metadata.average_profit')
        $scope.selectedAverageProfit = w.metadata.average_profit if _.isPlainObject(average_profit)

        setting.isInitialized = true
    )

  setting.toMetadata = ->
    selectedAverageProfit =
      enabled: $scope.selectedAverageProfit.enabled
      period: $scope.selectedAverageProfit.period
      calculation:
        from: moment($scope.selectedAverageProfit.calculation.from).format('YYYY-MM-DD')
        to: moment($scope.selectedAverageProfit.calculation.to).format('YYYY-MM-DD')
      application:
        from: moment($scope.selectedAverageProfit.application.from).format('YYYY-MM-DD')
        to: moment($scope.selectedAverageProfit.application.to).format('YYYY-MM-DD')

    return { average_profit: selectedAverageProfit }

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingAverageProfit', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      mode: '@?'
      deferred: '='
      onSelect: '&?'
    },
    template: $templateCache.get('widgets-settings/average-profit.tmpl.html'),
    controller: 'SettingAverageProfitCtrl'
  }
)
