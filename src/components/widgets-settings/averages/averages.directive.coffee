module = angular.module('impac.components.widgets-settings.averages',[])
                .constant('GRANULARITY_OPTIONS', Object.freeze([
                   {name: 'daily', value: 'DAILY'},
                   {name: 'weekly', value: 'WEEKLY'},
                   {name: 'monthly', value: 'MONTHLY'},
                   {name: 'quarterly', value: 'QUARTERLY'},
                   {name: 'yearly', value: 'YEARLY'}]))

module.controller('SettingAveragesCtrl', ($scope, ImpacDashboardsSvc, GRANULARITY_OPTIONS) ->

  w = $scope.parentWidget
  $scope.granularityOptions = GRANULARITY_OPTIONS
  $scope.seletedAverages =
    enabled: false
    period: 'DAILY'
    calculation:
      from: moment().subtract(6, 'months').toDate()
      to: moment().toDate()
    application:
      from: moment().add(1, 'day').toDate()
      to: moment().add(3, 'months').toDate()

  $scope.toggleAverages = ->
    $scope.seletedAverages.enabled = !$scope.seletedAverages.enabled

  $scope.isToggleAverages = ->
    if $scope.seletedAverages?
      return $scope.seletedAverages.enabled

  optionsFor = (type, opts) ->
    from:
      datePicker:
        opened: false
        date: type.from
        options: opts 
        toggle: -> this.opened = !this.opened
    to:
      datePicker:
        opened: false
        date: type.to
        options: opts
        toggle: -> this.opened = !this.opened

  $scope.calculation = optionsFor($scope.seletedAverages.calculation, {maxDate: new Date()})
  $scope.application = optionsFor($scope.seletedAverages.application, {minDate: new Date()})

  # What will be passed to parentWidget
  setting = {}
  setting.key = "averages"
  setting.isInitialized = false

  # initialization of selected organizations
  setting.initialize = ->
    ImpacDashboardsSvc.load().then(
      (config) ->
        currentDashboard = config.currentDashboard
        averages = _.get(w, 'metadata.averages')

        if _.isPlainObject(averages)
          $scope.seletedAverages = w.metadata.averages
          applicationFrom = moment($scope.seletedAverages.application.from).toDate()
          applicationFrom = if moment().isBefore(applicationFrom)
            applicationFrom 
          else
            moment().toDate()

          $scope.seletedAverages.calculation.from = moment($scope.seletedAverages.calculation.from).toDate()
          $scope.seletedAverages.calculation.to = moment($scope.seletedAverages.calculation.to).toDate()
          $scope.seletedAverages.application.from = applicationFrom 
          $scope.seletedAverages.application.to = moment($scope.seletedAverages.application.to).toDate()

        setting.isInitialized = true
    )

  setting.toMetadata = ->
    seletedAverages =
      enabled: $scope.seletedAverages.enabled
      period: $scope.seletedAverages.period
      calculation:
        from: moment($scope.seletedAverages.calculation.from).format('YYYY-MM-DD')
        to: moment($scope.seletedAverages.calculation.to).format('YYYY-MM-DD')
      application:
        from: moment($scope.seletedAverages.application.from).format('YYYY-MM-DD')
        to: moment($scope.seletedAverages.application.to).format('YYYY-MM-DD')

    return { averages: seletedAverages }

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingAverages', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '='
      mode: '@?'
      deferred: '='
      onSelect: '&?'
    },
    template: $templateCache.get('widgets-settings/averages.tmpl.html'),
    controller: 'SettingAveragesCtrl'
  }
)
