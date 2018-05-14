module = angular.module('impac.components.widgets-common.confirm-modal',[])

module.component('widgetsCommonConfirmModal', {
  templateUrl: 'widgets-common/confirm-modal.tmpl.html'
  transclude:
    'titleSlot': '?titleSection'
    'bodySlot': '?bodySection'
    'actionsSlot': '?actionsSection'
  bindings:
    opened: '<'
    loading: '=?'
    onDismiss: '&?'
    onAction: '&?'
  controller: ->
    ctrl = this

    ctrl.actionOnClick = ->
      ctrl.loading = true
      res = ctrl.onAction()
      if res? && angular.isDefined(res.finally)
        res.finally(-> ctrl.loading = false)
      else
        ctrl.loading = false

    ctrl
})
