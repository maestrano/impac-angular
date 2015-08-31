# angular.module('maestrano.services.widget-templates-svc', []).factory('WidgetTemplateSvc', ['$http', '$filter', '$timeout', ($http, $filter, $timeout) ->
angular.module('maestrano.analytics.widget-templates-svc', []).factory('WidgetTemplateSvc', ['$http', '$filter', '$timeout', ($http, $filter, $timeout) ->

  service = {}

  # Configuration
  service.config = {
    createPath: '/js_api/v1/impac/widget_templates/',
    indexPath: '/js_api/v1/impac/widget_templates/',
    categoriesPath: '/js_api/v1/impac/widget_templates/categories',
    newCategoryPath: '/js_api/v1/impac/widget_templates/category',
    lastUpdatePath: '/js_api/v1/impac/widget_templates/last_update',
    previewAppsPath: '/js_api/v1/impac/widget_templates/preview_apps',
    generatePdfPath: '/js_api/v1/impac/widget_templates/generate_pdf',
    deletePath: (id) -> "/js_api/v1/impac/widget_templates/#{id}",
    updatePath: (id) -> "/js_api/v1/impac/widget_templates/#{id}",
    showPath: (id) -> "/js_api/v1/impac/widget_templates/#{id}",
    screenshotPath: (id) -> "/js_api/v1/impac/widget_templates/#{id}/update_screenshot",
    catalogueImgPath: (id) -> "/js_api/v1/impac/widget_templates/#{id}/update_catalogue_img",
    updateCategoryPath: (id) -> "/js_api/v1/impac/widget_templates/update_category/#{id}"
  }

  service.create = (aCreate) ->
    self = service

    $http.post(self.config.createPath, aCreate.model).then(
      (success) ->
        aCreate.model.id = success.data.id
        self.updateImg(aCreate, aCreate.screenshot, true)
      (failure) ->
        return failure
    )

  service.index = ->
    self = service

    $http.get(self.config.indexPath).then (success) ->
      return success.data.widget_templates

  service.categories = ->
    self = service
    $http.get(self.config.categoriesPath).then (success) ->
      return $filter('orderBy')(success.data.categories,'id')

  service.updateCategory = (aModel) ->
    self = service
    $http.put(self.config.updateCategoryPath(aModel.id), aModel)

  service.destroy = (id) ->
    self = service
    $http.delete(self.config.deletePath(id)).then (success) ->
      return success

  service.update = (aUpdate) ->
    self = service

    $http.put(self.config.updatePath(aUpdate.model.id), aUpdate.model).then(
      (success) ->
        self.updateImg(aUpdate, aUpdate.screenshot, true)
      (failure) ->
        return failure
    )

  service.updateImg = (aCat, imgFile, screenshot=true) ->
    if aCat?
      if imgFile?
        self = service

        if screenshot
          path = self.config.screenshotPath(aCat.model.id)
        else
          path = self.config.catalogueImgPath(aCat.model.id)

        opts = { transformRequest: angular.identity, headers: {'Content-Type': undefined} }
        imgData = new FormData()
        imgData.append('file', imgFile)

        $http.put(path, imgData, opts).then (success) ->
          if screenshot
            aCat.model.screenshot = success.data
            $timeout(
              -> aCat.saveCatalogueImg()
            ,300
            )
          else
            aCat.model.catalogueImg = success.data
            aCat.afterSave()
      else
        aCat.saveCatalogueImg()

  service.show = (id) ->
    self = service
    $http.get(self.config.showPath(id)).then (success) ->
      return success.data.widget_template

  service.createCategory = (data) ->
    self = service
    $http.post(self.config.newCategoryPath, data)

  service.lastUpdate = ->
    self = service
    $http.get(self.config.lastUpdatePath).then (success) ->
      return success.data.last_update.last_update

  service.previewApps = (element)->
    if element.endpoints?
      $http.post(service.config.previewAppsPath, {endpoints: element.endpoints}).then (success) ->
        element.model.compatible_apps = success.data

  service.generatePdf = ->
    $http.post(service.config.generatePdfPath)


  return service
])
