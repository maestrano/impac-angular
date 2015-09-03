angular
  .module('impac.services.widget-templates', [])
  .service('WidgetTemplateSvc', ($http, $filter, $timeout) ->

    _self = @

    # Configuration
    @config = {
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

    @create = (aCreate) ->
      $http.post(_self.config.createPath, aCreate.model).then(
        (success) ->
          aCreate.model.id = success.data.id
          _self.updateImg(aCreate, aCreate.screenshot, true)
        (failure) ->
          return failure
      )

    @index = ->
      $http.get(_self.config.indexPath).then (success) ->
        return success.data.widget_templates

    @categories = ->
      $http.get(_self.config.categoriesPath).then (success) ->
        return $filter('orderBy')(success.data.categories,'id')

    @updateCategory = (aModel) ->
      $http.put(_self.config.updateCategoryPath(aModel.id), aModel)

    @destroy = (id) ->
      $http.delete(_self.config.deletePath(id)).then (success) ->
        return success

    @update = (aUpdate) ->
      $http.put(_self.config.updatePath(aUpdate.model.id), aUpdate.model).then(
        (success) ->
          _self.updateImg(aUpdate, aUpdate.screenshot, true)
        (failure) ->
          return failure
      )

    @updateImg = (aCat, imgFile, screenshot=true) ->
      if aCat?
        if imgFile?
          if screenshot
            path = _self.config.screenshotPath(aCat.model.id)
          else
            path = _self.config.catalogueImgPath(aCat.model.id)

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

    @show = (id) ->
      $http.get(_self.config.showPath(id)).then (success) ->
        return success.data.widget_template

    @createCategory = (data) ->
      $http.post(_self.config.newCategoryPath, data)

    @lastUpdate = ->
      $http.get(_self.config.lastUpdatePath).then (success) ->
        return success.data.last_update.last_update

    @previewApps = (element) ->
      if element.endpoints?
        $http.post(_self.config.previewAppsPath, {endpoints: element.endpoints}).then (success) ->
          element.model.compatible_apps = success.data

    @generatePdf = ->
      $http.post(_self.config.generatePdfPath)


    return
  )
