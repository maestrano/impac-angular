module = angular.module('impac.components.widgets-settings.width',[])

module.controller('SettingWidthCtrl', ($scope, $element, $timeout, $log, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.parentWidget

  # What will be passed to parentWidget
  setting = {}
  setting.key = "width"
  setting.isInitialized = false

  # Elements to be hidden during resizing
  for elem in $element.parents()
    if angular.element(elem).hasClass('content')
      $scope.contentElements = angular.element(elem).children()
      break

  # ------------------------------------

  # Animation to improve widget resize effect.
  hideOnResize = (elements) ->
    return unless (elements && elements.length > 0)
    # Hides elems in content
    for elem in elements
      angular.element(elem).animate({opacity: 0}, 0)
    # Makes them reappear after resizing
    $timeout ->
      for elem in elements
        angular.element(elem).animate({opacity: 1}, 200)
    , 300

  w.toggleExpanded = (save) ->
    save = true unless save?
    $scope.expanded = !$scope.expanded
    # false "needContentReload" param because we want to resize the widget without waiting
    # for the response from the dashboarding API.
    ImpacWidgetsSvc.updateWidgetSettings(w,false,true) if save
    hideOnResize($scope.contentElements)
    # Expands widget width to the maximum or minimum possible for the specific widget.
    if $scope.expanded
      w.width = parseInt($scope.max)
    else
      w.width = parseInt($scope.min)

  w.isExpanded = ->
    $scope.expanded

  # initialization of time range parameters from widget.content.hist_parameters
  setting.initialize = ->
    if w.width?
      $scope.expanded = (w.width == parseInt($scope.max))
      setting.isInitialized = true

  setting.toMetadata = ->
    if $scope.expanded
      newWidth = $scope.max
    else
      newWidth = $scope.min
    return { width: parseInt(newWidth) }

  ImpacDashboardsSvc.pdfModeEnabled().then(null, null, ->
    $scope.pdfMode = true
    $scope.initiallyExpanded = !!$scope.expanded
    w.toggleExpanded(false) unless $scope.initiallyExpanded
  )
  ImpacDashboardsSvc.pdfModeCanceled().then(null, null, ->
    $scope.pdfMode = false
    w.toggleExpanded(false) unless $scope.initiallyExpanded
  )

  w.settings.push(setting)

  # Setting is ready: trigger load content
  # ------------------------------------
  $scope.deferred.resolve($scope.parentWidget)
)

module.directive('settingWidth', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentWidget: '=',
      deferred: '='
      min: '@',
      max: '@',
    },
    template: $templateCache.get('widgets-settings/width.tmpl.html'),
    controller: 'SettingWidthCtrl'
  }
)
