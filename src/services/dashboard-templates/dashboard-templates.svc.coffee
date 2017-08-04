angular
  .module('impac.services.dashboard-templates', [])
  .service 'ImpacDhbTemplatesSvc', ($q, $http, $log, ImpacRoutes, ImpacDashboardsSvc) ->

    _self = @

    @index = ->
      # $q.resolve([
      #   {
      #     name: 'Accounting Dashboard',
      #     metadata: {
      #       organization_ids: ['org-fbxx'],
      #       widgets_order: []
      #     }
      #   }, {
      #     name: 'Sales Dashboard',
      #     metadata: {
      #       organization_ids: ['org-fbxx'],
      #       widgets_order: []
      #     }
      #   }
      # ])
      $http.get(ImpacRoutes.dashboardTemplates.index()).then(
        (response)->
          response.data || []
        (err)->
          $log.err('Impac! DashboardTemplatesSvc: failed to retrieve dashboard templates', err)
          $q.reject()
      )

    return @
