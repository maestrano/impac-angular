module = angular.module('impac.components.dashboard-settings.currency',[])

module.directive('dashboardSettingCurrency', ($templateCache, $log, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, ImpacKpisSvc, ImpacTheming, toastr) ->
  return {
    restrict: 'A',
    scope: {
      currency: '=' # deprecated - current currency is now retrieved using ImpacDashboardsSvc
    },
    link: (scope, element, attrs) ->
      scope.locked = ImpacTheming.get().dhbSettings.currency.locked

      init = (dhb) ->
        scope.currentDhb = dhb
        scope.data =
          currency: dhb.currency
          savedCurrency: dhb.currency

      ImpacDashboardsSvc.dashboardChanged().then(null, null, (newDhb) -> init(newDhb))

      ImpacMainSvc.load().then(
        (mainConfig) ->
          scope.currencies = mainConfig.currencies
          ImpacDashboardsSvc.load().then (config) ->
            init(config.currentDashboard)
      )

      scope.massAssignCurrency = ->
        data = {currency: scope.data.currency}
        ImpacDashboardsSvc.update(scope.currentDhb.id, data).then(
          ->
            scope.data.savedCurrency = scope.data.currency
            ImpacKpisSvc.massAssignAll(data).finally(
              ->
                ImpacWidgetsSvc.massAssignAll(data)
            )
          ->
            toastr.error("Unable to select currency '#{scope.data.currency}'", 'Error')
            scope.data.currency = scope.data.savedCurrency
        )

    template: $templateCache.get('dashboard-settings/currency.tmpl.html'),
  }
)
