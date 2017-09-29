module = angular.module('impac.components.widget', [])
module.controller('ImpacWidgetCtrl', ($scope, $log, $q, $timeout, ImpacWidgetsSvc, ImpacDashboardsSvc) ->

  w = $scope.widget || {}

  # 1st load
  # ---------------------------------------
  # widgetDeferred will be resolved once the widget is ready (ie: at the end of the 'specific' directive)
  $scope.widgetDeferred = $q.defer()
  $scope.widgetDeferred.promise.then(
    # each promise corresponds to a setting, and will be resolved once the setting is ready
    (promises) ->
      $q.all(promises).then(
        ->
          $scope.showWidget()

        (error) ->
          w.isLoading = false
          $log.error("widget #{w.id} failed to render")
          $log.error(error)
      )
  )

  $scope.showWidget = (refreshCache = false) ->
    ImpacWidgetsSvc.show(w, { refreshCache: refreshCache }).finally(
      ->
        #TODO: Accessibility should be treated differently (in service?)
        if $scope.isAccessibility
          $scope.initialWidth = w.width
          w.width = 12
        else if $scope.initialWidth
          w.width = $scope.initialWidth
    )

  $scope.initSettings = ->
    ImpacWidgetsSvc.initWidgetSettings(w)

  $scope.updateSettings = (needContentReload = true) ->
    ImpacWidgetsSvc.updateWidgetSettings(w, needContentReload)

  $scope.getColClass = ->
    "col-md-#{w.width}"

  w.getCssClasses = ->
    classes = [$scope.getColClass()]
    classes.push 'pdf-mode' if $scope.pdfMode
    classes.push 'hidden-print' unless w.ticked
    return classes.join(' ')

  ImpacDashboardsSvc.pdfModeEnabled().then(null, null, ->
    $scope.pdfMode = true
    w.ticked = true unless angular.isDefined(w.ticked)
    $scope.widget.hasEditAbility = false
    $scope.initSettings()
  )
  ImpacDashboardsSvc.pdfModeCanceled().then(null, null, ->
    $scope.pdfMode = false
    $scope.widget.hasEditAbility = true
  )

  $scope.tick = ->
    w.ticked = !w.ticked
    ImpacDashboardsSvc.tick()
)

module.directive('impacWidget', ($templateCache, ImpacUtilities, ImpacWidgetsSvc) ->
  return {
    restrict: 'A',
    scope: {
      parentDashboard: '='
      widget: '='
      isAccessibility: '='
      onDisplayAlerts: '&'
    },
    controller: 'ImpacWidgetCtrl',
    link: (scope, element) ->

      # initialize scope attributes
      # --------------------------------------
      scope.widget.isLoading = true
      scope.widget.settings = []
      scope.pdfMode = false
      # Unused so far -->
      scope.widget.hasEditAbility = true
      scope.widget.hasDeleteAbility = true
      # <--

      scope.cssClass = ImpacUtilities.fetchWidgetCssClass(scope.widget)
      scope.templatePath = ImpacUtilities.fetchWidgetTemplatePath(scope.widget)

      scope.showInfoPanel = false
      scope.isInfoPanelDisplayed = ->
        scope.showInfoPanel

      scope.toggleInfoPanel = ->
        scope.showInfoPanel = !scope.showInfoPanel

      scope.editTitle = false
      scope.isTitleEdited = ->
        scope.editTitle

      scope.toggleEditTitle = ->
        scope.editTitle = !scope.editTitle

      scope.showDeleteWidget = false
      scope.toggleDeleteWidget = ->
        scope.showDeleteWidget = !scope.showDeleteWidget

      scope.deleteWidget = ->
        ImpacWidgetsSvc.delete(scope.widget)
        .then(null, (e) -> scope.widget.errors = ImpacUtilities.processRailsError(e))

    ,template: $templateCache.get('widget/widget.tmpl.html')
  }
)
