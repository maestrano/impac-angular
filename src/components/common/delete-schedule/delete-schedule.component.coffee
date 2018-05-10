module = angular.module('impac.components.common.delete-schedule',[])

module.component('commonDeleteSchedule', {
  templateUrl: 'common/delete-schedule.tmpl.html'
  bindings:
    onDelete: '&'
    onDismiss: '&'
  controller: ->
    ctrl = this

    return ctrl
})
