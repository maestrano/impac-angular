describe('<> dashboardSettingCurrency', function () {
  'use strict';

  var subject, scope, $templateCache, $log, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc;

  var mainConfig = {currentOrganization: {currency: 'from org'}};
  var currentDhb = {id: 1, name: 'dhb1'};

  beforeEach(function() {
    module('maestrano.impac');

    subject = angular.element('<div dashboard-setting-currency />');

    inject(function ($rootScope, $compile, $q, $templateCache, $log, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc) {
      scope = $rootScope.$new();
      $compile(subject)(scope);
      scope.$digest();
    });

    spyOn(ImpacMainSvc, 'load').and.returnValue($q.resolve(mainConfig));
    spyOn(ImpacDashboardsSvc, 'load').and.returnValue($q.resolve());
    spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue($q.resolve(currentDhb));
  });

  it('test', function() {
    expect(subject).toEqual('USD');
  });

});