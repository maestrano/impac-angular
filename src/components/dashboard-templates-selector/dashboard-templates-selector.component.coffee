module = angular.module('impac.components.dashboard-templates-selector', [])
module.component('dashboardTemplatesSelector', {
  templateUrl: 'dashboard-templates-selector/dashboard-templates-selector.tmpl.html'
  bindings:
    onSelect: '&'
  controller: (toastr, ImpacDhbTemplatesSvc)->
    ctrl = this

    ctrl.$onInit = ->
      ctrl.templates = []
      ctrl.selectedTemplate = {}
      ctrl.isTemplatesMode = false
      ctrl.hideLoader = false
      ImpacDhbTemplatesSvc.index().then(
        (templates)->
          ctrl.templates = templates
        ->
          toastr.error('Failed to retrieve dashboard templates. You can still create your dashboard from scratch.', 'Error')
      ).finally(
        ->
          ctrl.hideLoader = true
      )

    ctrl.hasTemplates = ->
      ctrl.templates.length

    ctrl.templateOnClick = (template)->
      ctrl.selectedTemplate = if ctrl.isSelected(template) then {} else template
      ctrl.onSelect($event: { template: angular.copy(ctrl.selectedTemplate) })

    ctrl.isSelected = (template)->
      _.isEqual(template, ctrl.selectedTemplate)

    ctrl.toggleTemplatesMode = ->
      ctrl.isTemplatesMode = !ctrl.isTemplatesMode
      # Clear selected template
      ctrl.templateOnClick({}) unless ctrl.isTemplatesMode

    return ctrl
})
