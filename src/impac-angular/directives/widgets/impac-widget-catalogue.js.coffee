module = angular.module('impac.components.widgets.catalogue',[])

module.controller('ImpacWidgetCatalogueCtrl', ($scope, WidgetTemplateSvc, $http) ->

    $scope.loaderImage = ''
    # todo::assets
    # $scope.loaderImage = AssetPath['loader-white-bg.gif']

    #===MENU===
    $scope.menu = menu = {}
    menu.categories = []
    menu.loading = true

    menu.init = ->
      menu.loading = true
      WidgetTemplateSvc.categories().then(
        (categories) ->
          menu.categories = categories
          menu.removeInactiveWidgets() unless $scope.isAdmin
          menu.prepareCategories()
          menu.loading = false
      )

    menu.removeInactiveWidgets = ->
      _.each menu.categories, (cat) ->
        cat.widgets = _(cat.widgets).filter( (w) ->
          w.active
        )

    menu.prepareCategories = ->
      menu.categories = _(menu.categories).filter( (cat) ->
          _.isEmpty(cat.widgets) == false
        )

    #===SHOW===
    $scope.show = show = {}
    show.widget = false
    show.loading = false

    show.get = (id) ->
      show.loading = true
      WidgetTemplateSvc.show(id).then(
        (widget_template) ->
          show.widget = widget_template
          show.widget.settings = show.widget.settings.splice(0, 6)
          show.widget.compatible_apps = show.widget.compatible_apps.splice(0, 6)
          show.color = widget_template.category_color || "#233845"
          show.loading = false
      )


    #===INIT===
    $scope.init = ->
      menu.init()

    $scope.init()
)

module.directive('impacWidgetCatalogue', ($templateCache) ->
  return {
      restrict: 'A',
      scope: {
        isAdmin:'='
      },
      template: $templateCache.get('widgets/widget_catalogue.html'),
      controller: 'ImpacWidgetCatalogueCtrl'
  }
)
