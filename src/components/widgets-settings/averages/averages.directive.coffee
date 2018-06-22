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
  $scope.selectedAverages =
    enabled: false
    period: 'DAILY'
    calculation:
      from: moment().subtract(6, 'months').toDate()
      to: moment().toDate()
    application:
      from: moment().add(1, 'day').toDate()
      to: moment().add(3, 'months').toDate()

  $scope.toggleAverages = ->
    $scope.selectedAverages.enabled = !$scope.selectedAverages.enabled

  $scope.isToggleAverages = ->
    if $scope.selectedAverages?
      return $scope.selectedAverages.enabled

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

  $scope.calculation = optionsFor($scope.selectedAverages.calculation, {maxDate: new Date()})
  $scope.application = optionsFor($scope.selectedAverages.application, {minDate: new Date()})

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

        console.log('init')
        if _.isPlainObject(averages)
          $scope.selectedAverages = _.clone(w.metadata.averages, true)
          applicationFrom = moment($scope.selectedAverages.application.from).toDate()
          applicationFrom = if moment().isBefore(applicationFrom)
            applicationFrom 
          else
            moment().toDate()

          $scope.selectedAverages.calculation.from = moment($scope.selectedAverages.calculation.from).toDate()
          $scope.selectedAverages.calculation.to = moment($scope.selectedAverages.calculation.to).toDate()
          $scope.selectedAverages.application.from = applicationFrom 
          $scope.selectedAverages.application.to = moment($scope.selectedAverages.application.to).toDate()

        setting.isInitialized = true
    )

  setting.toMetadata = ->
    selectedAverages =
      enabled: $scope.selectedAverages.enabled
      period: $scope.selectedAverages.period
      calculation:
        from: moment($scope.selectedAverages.calculation.from).format('YYYY-MM-DD')
        to: moment($scope.selectedAverages.calculation.to).format('YYYY-MM-DD')
      application:
        from: moment($scope.selectedAverages.application.from).format('YYYY-MM-DD')
        to: moment($scope.selectedAverages.application.to).format('YYYY-MM-DD')

    return { averages: selectedAverages }

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
