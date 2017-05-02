module = angular.module('impac.components.dashboard-settings.currency',[])

module.directive('dashboardSettingCurrency', ($templateCache, $log, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, ImpacKpisSvc, ImpacTheming, toastr) ->
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

      scope.data =
        currency: scope.currency
        savedCurrency: scope.currency

      scope.massAssignCurrency = ->
        data = {currency: scope.data.currency}
        ImpacDashboardsSvc.update(scope.currentDhb.id, data).then(
          ->
            scope.data.savedCurrency = scope.data.currency
            ImpacWidgetsSvc.massAssignAll(data)
            ImpacKpisSvc.massAssignAll(data)
          ->
            toastr.error("Unable to select currency '#{scope.data.currency}'", 'Error')
            scope.data.currency = scope.data.savedCurrency
        )


    template: $templateCache.get('dashboard-settings/currency.tmpl.html'),
  }
)
