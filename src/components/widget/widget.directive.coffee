module = angular.module('impac.components.widget', [])

module.controller('ImpacWidgetCtrl', ($scope, $timeout, $log, $q, ImpacWidgetsSvc, Utilities) ->

  # ---------------------------------------------------------
  # ### Widget object management
  # ---------------------------------------------------------

  # Initialization
  w = $scope.widget || {}
  w.parentDashboard ||= $scope.parentDashboard
  w.settings = []
  w.isLoading = true
  w.hasEditAbility = true
  w.hasDeleteAbility = true

  # Retrieve the widget content from Impac! and initialize the widget from it.
  w.loadContent = (refreshCache=false) ->
    w.isLoading = true
    ImpacWidgetsSvc.show(w, refreshCache).then(
      (updatedWidget) ->

        if $scope.isAccessibility
          w.initialWidth = w.width
          w.width = 12
        else if w.initialWidth 
          w.width = w.initialWidth

        # triggers the initialization of the widget's specific params (defined in the widget specific controller)
        w.initContext()
        # triggers the initialization of all the widget's settings
        w.initSettings()
        # formats the widget's chart data when needed
        w.isLoading = false
        w.format() if angular.isDefined(w.format)

      ,(errors) ->
        w.errors = Utilities.processRailsError(errors)
        w.isLoading = false
    )

  # Initialize all the settings of the widget
  w.initSettings = ->
    angular.forEach(w.settings, (setting) ->
      setting.initialize()
    )
    # TODO: is following still true ?
    # For discreet metadata updates, we don't want to force editMode to be false example: changing hist mode
    w.isEditMode = false
    return true

  # Retrieve all the widgets settings, build the new metadata parameter, and update the widget's settings
  w.updateSettings = (needContentReload=true) ->
    deferred = $q.defer()

    meta = {}
    angular.forEach(w.settings, (setting) ->
      angular.merge meta, setting.toMetadata()
    )
    
    if _.isEmpty(meta)
      deferred.reject('no setting to update')

    else
      w.isLoading = true if needContentReload
      ImpacWidgetsSvc.update(w, { metadata: meta }).then(
        (updatedWidget) ->
          w.loadContent() if needContentReload
          deferred.resolve(updatedWidget)
        (errors) ->
          w.errors = Utilities.processRailsError(errors)
          w.isLoading = false
          deferred.reject(errors)
      )

    return deferred.promise


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

      scope.isTemplateLoaded = ->
        return !!$templateCache.get(scope.widgetContentTemplate())

    ,templateUrl: "widget/widget.tmpl.html"
  }
)
