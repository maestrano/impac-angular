module = angular.module('maestrano.analytics.impac-widget-template-admin',[])

module.controller('ImpacWidgetTemplateAdminCtrl',[
  '$scope', 'WidgetTemplateSvc', '$http', ($scope, WidgetTemplateSvc, $http) ->

    $scope.activatedCat = false
    $scope.cat = {}

    $scope.loaderImage = ''
    # todo::assets
    # $scope.loaderImage = AssetPath['loader-white-bg.gif']

    $scope.activateCat = (cat) ->
      if (cat == $scope.activatedCat)
        $scope.activatedCat = false
        $scope.cat[cat] = false
      else
        $scope.cat[cat] = true
        $scope.cat[$scope.activatedCat] = false if $scope.activatedCat
        $scope.activatedCat = cat

    # ======================
    # CREATE
    # ======================
    $scope.create = create = {}
    create.successMsg = false
    create.errorMsg = false
    create.errors = ''
    create.inProgress = false
    create.generatePdf = true
    create.screenshot = {}
    create.model = {}
    create.endpoints = []

    create.resetEndpoints = ->
      _.each create.endpoints, (ep) ->
        ep.checked = false

    create.reset = ->
      create.model = {}
      create.model['active'] = true
      create.model.screenshot = ""
      create.screenshot = {}
      create.resetEndpoints()

    create.save = ->
      create.errors = ''
      create.successMsg = false
      create.errorMsg = false
      create.inProgress = true
      create.model.endpoints = create.endpoints
      WidgetTemplateSvc.create(create).then(
        (response) ->
          if response.status == 400
            create.errorMsg = true
            create.errors = response.data
            create.inProgress = false
      )

    create.saveCatalogueImg = ->
      $scope.renderTemplateImg(false)

    create.afterSave = ->
      create.successMsg = true
      create.reset()
      index.get()
      create.inProgress = false
      if create.generatePdf
        WidgetTemplateSvc.generatePdf()

    # ======================
    # UPDATE
    # ======================
    $scope.update = update = {}
    update.selected = false
    update.inProgress = false
    update.successMsg = false
    update.errorMsg = false
    update.errors = ''
    update.generatePdf = true
    update.model = {}
    update.endpoints = []

    update.save = () ->
      update.successMsg = false
      update.errorMsg = false
      update.inProgress = true
      update.model.endpoints = update.endpoints
      WidgetTemplateSvc.update(update).then(
        (response) ->
          if response.status == 400
            update.errorMsg = true
            update.errors = response.data
            update.inProgress = false
      )

    update.saveCatalogueImg = ->
      $scope.renderTemplateImg(true)

    update.afterSave = ->
      update.successMsg = true
      update.inProgress = false
      if update.generatePdf
        WidgetTemplateSvc.generatePdf()

    update.selectEndpoints = (wt) ->
      _.each update.endpoints, (ep) ->
        ep.checked = false
        _.each wt.endpoints, (wt_ep) ->
          if wt_ep.shared_entity_id == ep.id
            return ep.checked = true

    $scope.$watch('update.selected', ->
      if update.selected
        _.each index.model, (wt) ->
          if wt.id == update.selected.id
            update.model = wt
            update.model.category_id = wt.category_id
            update.selectEndpoints(wt)
            return
      else
        update.model = {}
      $scope.$apply
    )

    # ======================
    # DESTROY
    # ======================
    $scope.destroy = destroy = {}
    destroy.selected = false
    destroy.inProgress = false
    destroy.generatePdf = true

    destroy.destroy = ->
      destroy.inProgress = true
      WidgetTemplateSvc.destroy(destroy.selected.id).then(
        destroy.inProgress = false
        destroy.selected = false
        destroy.confirm = ""
        index.get()
        if destroy.generatePdf
          WidgetTemplateSvc.generatePdf()
      )

    # ======================
    # ADD CATEGORY
    # ======================
    $scope.addCategory = addCategory = {}
    addCategory.model = {}

    addCategory.save = ->
      WidgetTemplateSvc.createCategory(addCategory.model).then(
        addCategory.model = {}
        index.getCategories()
      )

    # ======================
    # UPDATE CATEGORY
    # ======================
    $scope.updateCategory = updateCategory = {}
    updateCategory.selected = false
    updateCategory.inProgress = false
    updateCategory.model = {}
    updateCategory.successMsg = false
    updateCategory.errorMsg = false
    updateCategory.errors = ''

    updateCategory.save = () ->
      updateCategory.successMsg = false
      updateCategory.errorMsg = false
      updateCategory.inProgress = true
      WidgetTemplateSvc.updateCategory(updateCategory.model).then(
        (success) ->
          updateCategory.successMsg = true
          index.getCategories()
        (failure) ->
          updateCategory.errorMsg = true
          updateCategory.errors = failure.data
        updateCategory.inProgress = false
      )

    $scope.$watch('updateCategory.selected', ->
      if updateCategory.selected
        _.each index.categories, (cat) ->
          if cat.id == updateCategory.selected.id
            updateCategory.model = cat
            return
      else
        updateCategory.model = {}
      $scope.$apply
    )

    # ======================
    # INDEX
    # ======================
    $scope.index = index = {}
    index.inProgress = false
    index.model = {}
    index.categories = {}
    index.sharedEntities = {}
    index.lastUpdate = ""

    index.initEndpoints = (array) ->
      _.each index.sharedEntities, (se) ->
        array.push({id: se.id, name: se.name, checked: false})

    index.get = ->
      index.inProgress = true
      WidgetTemplateSvc.index().then(
        (widget_templates) ->
          index.model = widget_templates
          index.inProgress = false
      )

    index.getCategories = ->
      index.inProgress = true
      WidgetTemplateSvc.categories().then(
        (categories) ->
          index.categories = categories
          index.inProgress = false
      )

    index.getSharedEntities = ->
      index.inProgress = true
      $http.get('/js_api/v1/connec_entities').then(
        (success) ->
          index.sharedEntities = success.data.shared_entities
          index.initEndpoints(create.endpoints)
          index.initEndpoints(update.endpoints)
          index.inProgress = false
      )

    index.getLastUpdate = ->
      index.inProgress = true
      WidgetTemplateSvc.lastUpdate().then(
        (last_update) ->
          index.lastUpdate = last_update
          index.inProgress = false
      )

    # ======================
    # GLOBAL FUNCTIONS
    # ======================
    $scope.saveCatalogueImg = (aCat, catalogueImgFile) ->
      WidgetTemplateSvc.updateImg(aCat, catalogueImgFile, false)

    $scope.getSettings = (aModel) ->
      if aModel.settings? && _.isArray(aModel.settings)
        return aModel.settings.slice(0,6)
      else if aModel.settings? && _.isString(aModel.settings)
        if aModel.settings == ""
          return []
        else
          return aModel.settings.split(',').slice(0,6)

    $scope.getCompatibleApps = (element) ->
      WidgetTemplateSvc.previewApps(element) if element.endpoints?

    dataURItoBlob = (dataURI) ->
      byteString = atob(dataURI.split(',')[1])
      mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      ab = new ArrayBuffer(byteString.length)
      ia = new Uint8Array(ab)
      for i in [0..byteString.length]
        ia[i] = byteString.charCodeAt(i)

      bb = new Blob([ab])
      return bb

    $scope.renderTemplateImg = (isUpdate=true) ->
      if isUpdate
        contentElem = angular.element('#preview_update')
      else
        contentElem = angular.element('#preview_create')

      html2canvas(contentElem, {
        onrendered: (canvas) ->
          imageData = canvas.toDataURL('image/png')
          blob = dataURItoBlob(imageData)

          if isUpdate
            $scope.saveCatalogueImg(update, blob)
          else
            $scope.saveCatalogueImg(create, blob)
        }
      )

    # ======================
    # INIT
    # ======================
    $scope.init = ->
      _.each $scope.catList, (cat) ->
        $scope.cat[cat] = false
      create.reset()
      index.get()
      index.getCategories()
      index.getSharedEntities()
      index.getLastUpdate()

    $scope.init()
])

module.directive('impacWidgetTemplateAdmin', ['$templateCache', ($templateCache) ->
  return {
      restrict: 'A',
      scope: {},
      template: $templateCache.get('widgets/widget_template_admin.html')],
      controller: 'ImpacWidgetTemplateAdminCtrl'
  }
])
