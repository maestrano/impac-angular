module = angular.module('impac.components.common.delete-widget',[])

module.component('commonDeleteWidget', {
  templateUrl: 'common/delete-widget.tmpl.html'
  bindings:
    parentWidget: '<'
    onDismiss: '&'
  controller: (ImpacWidgetsSvc, ImpacUtilities) ->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.loading = false

    ctrl.deleteWidget = ->
      ctrl.loading = true
      ImpacWidgetsSvc.delete(ctrl.parentWidget)
      .then(null, (e) -> ctrl.parentWidget.errors = ImpacUtilities.processRailsError(e))
      .finally(-> ctrl.loading = false)

    return ctrl
})
