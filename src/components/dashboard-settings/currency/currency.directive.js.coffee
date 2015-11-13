module = angular.module('impac.components.dashboard-settings.currency',[])

module.directive('dashboardSettingCurrency', ($templateCache, $log, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc) ->
  return {
    restrict: 'A',
    scope: {
      currency: '='
    },
    link: (scope, elements, attrs) ->
      ImpacMainSvc.load().then(
        (mainConfig) ->
          ImpacDashboardsSvc.load().then () ->
            # scope initialization
            scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
            scope.currency ||= scope.currentDhb.currency || mainConfig.currentOrganization.currency || 'USD'
            scope.currencies = mainConfig.currencies

            # auto-configure dashboards that don't have a currency defined
            unless scope.currentDhb.currency?
              $log.info "Dashboard #{scope.currentDhb.id} and its widgets have been auto-configured with currency #{scope.currency}"
              scope.massAssignCurrency() 
      )

      scope.massAssignCurrency = ->
        data = {currency: scope.currency}
        ImpacDashboardsSvc.update(scope.currentDhb.id, data)
        ImpacWidgetsSvc.massAssignAll(data)


    template: $templateCache.get('dashboard-settings/currency.tmpl.html'),
  }
)