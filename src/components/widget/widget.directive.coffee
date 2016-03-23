module = angular.module('impac.components.widget', [])
module.controller('ImpacWidgetCtrl', ($scope, $log, $q, $timeout, ImpacWidgetsSvc) ->

  w = $scope.widget || {}

  # 1st load
  # ---------------------------------------
  # widgetDeferred will be resolved once the widget is ready (ie: at the end of the 'specific' directive)
  $scope.widgetDeferred = $q.defer()
  $scope.widgetDeferred.promise.then(
    # each promise corresponds to a setting, and will be resolved once the setting is ready
    (promises) ->
      $q.all(promises).then(
        (success) ->
          $scope.showWidget()

        (error) ->
          w.isLoading = false
          $log.error("widget #{w.id} failed to render")
          $log.error(error)
      )
  )


  $scope.showWidget = (refreshCache=false) ->
    w.isLoading ||= true
    ImpacWidgetsSvc.show(w, refreshCache).then(
      (updatedWidget) ->
        #TODO: Accessibility should be treated differently (in service?)
        if $scope.isAccessibility
          w.initialWidth = w.width
          w.width = 12
        else if w.initialWidth
          w.width = w.initialWidth
    ).finally( -> w.isLoading = false )

  $scope.initSettings = ->
    ImpacWidgetsSvc.initWidgetSettings(w)

  $scope.updateSettings = (needContentReload=true) ->
    ImpacWidgetsSvc.updateWidgetSettings(w, needContentReload)

  w.getColClass = ->
    "col-md-#{w.width}"
)

module.directive('impacWidget', ($templateCache) ->
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
      # Unused so far -->
      scope.widget.hasEditAbility = true
      scope.widget.hasDeleteAbility = true
      # <--

      #=======================================
      # DYNAMIC WIDGET TEMPLATE LOADING
      # widget category and metadata.template data sent from Maestrano db.
      #=======================================
      scope.widgetContentTemplate = ->
        # impac-angular component template name
        if scope.widget.metadata && scope.widget.metadata.template
          scope.templateName = scope.widget.metadata.template.replace(/\/|_/g, '-')

        # backward compatibility for old widgets
        else
          splittedPath = angular.copy(scope.widget.category).split('/')
          # remove any number of path extensions beyond length > 2. (eg: accounting_values is a template used by several different widgets)
          splittedPath.length = 2
          scope.templateName = splittedPath.join("-").replace(/_/g, '-')

        # url for retreiving widget templates from angular $templateCache service.
        templatePath = 'widgets/' + scope.templateName + '.tmpl.html'

        if scope.isAccessibility
          if $templateCache.get('widgets/' + scope.templateName + '.accessible.tmpl.html')
            templatePath = 'widgets/' + scope.templateName + '.accessible.tmpl.html'
          scope.templateName = scope.templateName + ' accessible'

        return templatePath

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


    ,template: $templateCache.get('widget/widget.tmpl.html')
  }
)
