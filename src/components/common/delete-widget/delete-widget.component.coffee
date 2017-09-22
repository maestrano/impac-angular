module = angular.module('impac.components.common.delete-widget',[])

module.component('commonDeleteWidget', {
  templateUrl: 'common/delete-widget.tmpl.html'
  bindings:
    onDelete: '&'
    onDismiss: '&'
  controller: ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.loading = false

    ctrl.deleteWidget = ->
      ctrl.loading = true
      ctrl.onDelete().finally(-> ctrl.loading = false)

    return ctrl
})
