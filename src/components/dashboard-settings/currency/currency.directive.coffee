module = angular.module('impac.components.dashboard-settings.currency',[])

module.directive('dashboardSettingCurrency', ($templateCache, $log, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, ImpacTheming) ->
  return {
    restrict: 'A',
    scope: {
      currency: '='
    },
    link: (scope, element, attrs) ->
      scope.locked = ImpacTheming.get().dhbSettings.currency.locked

      ImpacMainSvc.load().then(
        (mainConfig) ->
          ImpacDashboardsSvc.load().then ->
            # scope initialization
            scope.currentDhb = ImpacDashboardsSvc.getCurrentDashboard()
            scope.currencies = mainConfig.currencies
      )

      scope.massAssignCurrency = ->
        data = {currency: scope.currency}
        ImpacDashboardsSvc.update(scope.currentDhb.id, data)
        ImpacWidgetsSvc.massAssignAll(data)


    template: $templateCache.get('dashboard-settings/currency.tmpl.html'),
  }
)
