module = angular.module('impac.components.widget', [])
module.controller('ImpacWidgetCtrl', ($scope, $log, $q, ImpacWidgetsSvc, Utilities) ->

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
          ImpacWidgetsSvc.show(w).then(
            (updatedWidget) ->
              w.isLoading = false
              #TODO: Accessibility should be treated differently (in service?)
              if $scope.isAccessibility
                w.initialWidth = w.width
                w.width = 12
              else if w.initialWidth 
                w.width = w.initialWidth

            (errorResponse) ->
              w.isLoading = false
              # TODO: better error management
              $log.error(errorResponse.data.error) if errorResponse.data? && errorResponse.data.error
          )

        (error) ->
          w.isLoading = false
          $log.error("widget #{w.id} failed to render")
          $log.error(error)
      )
  )


  $scope.initSettings = ->
    w.isEditMode = false
    ImpacWidgetsSvc.initWidgetSettings(w)

  $scope.updateSettings = (needContentReload=true) ->
    w.isEditMode = false
    ImpacWidgetsSvc.updateWidgetSettings(w, needContentReload)

  w.getColClass = ->
    "col-md-#{w.width}"
)

module.directive('impacWidget', ($templateCache) ->
  return {
    restrict: 'A',
    scope: {
      parentDashboard: '=',
      widget: '=',
      isAccessibility: '='
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
      # Widget data sent from Maestrano db have a category value in url format.
      # The structure of the url is `category/widget-template-name/data-extension`.
      # 'data-extension' means the widget re-uses a widget template, but signifies that
      # different data will be fed through.
      #=======================================
      scope.widgetContentTemplate = ->
        splittedPath = angular.copy(scope.widget.category).split("/")
        # remove any number of items beyond index 2 (eg: accounting_values is a template used by several different widgets)
        splittedPath.splice(2)
        # format into slug-case for filename matching
        scope.templateName = splittedPath.join("-").replace(/_/g, "-")
        # url for retreiving widget templates from angular $templateCache service.
        templatePath = "widgets/" + scope.templateName + ".tmpl.html"

        if scope.isAccessibility 
          if $templateCache.get("widgets/" + scope.templateName + ".accessible.tmpl.html")
            templatePath = "widgets/" + scope.templateName + ".accessible.tmpl.html"
          scope.templateName = scope.templateName + " accessible"

        return templatePath

    ,template: $templateCache.get("widget/widget.tmpl.html")
  }
)
