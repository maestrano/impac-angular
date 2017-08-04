describe('<> dashboard-setting-currency', function () {
  'use strict';

  var subject, subjectScope, $q, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc, ImpacKpisSvc;

  var currencies = ['cur1', 'cur2'];
  var mainConfig = {currencies: currencies};
  var currentDhb = {id: 1, name: 'dhb1'};

  // Helper to compile the directive and return its scope
  var compile = function() {
    inject(function ($rootScope, $compile) {
      var scope = $rootScope.$new();
      $compile(subject)(scope);
    });
    return subject.isolateScope();
  }

  beforeEach(function() {
    module('maestrano.impac');

    subject = angular.element('<div dashboard-setting-currency currency="\'cur1\'" />');

    // Inject services called by the directive...
    inject(function (_$q_, _ImpacMainSvc_, _ImpacDashboardsSvc_, _ImpacWidgetsSvc_, _ImpacKpisSvc_) {
      ImpacMainSvc = _ImpacMainSvc_;
      ImpacDashboardsSvc = _ImpacDashboardsSvc_;
      ImpacWidgetsSvc = _ImpacWidgetsSvc_;
      ImpacKpisSvc = _ImpacKpisSvc_;
      $q = _$q_;
    });

    // ...and stub their methods
    spyOn(ImpacMainSvc, 'load').and.returnValue($q.resolve(mainConfig));
    spyOn(ImpacDashboardsSvc, 'load').and.returnValue($q.resolve());
    spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.callFake(function(){
      return currentDhb;
    });
  });

  describe('#massAssignCurrency()', function() {
    var updateSpy;
    beforeEach(function() {
      updateSpy = spyOn(ImpacDashboardsSvc, 'update').and.callFake($q.resolve);
      spyOn(ImpacWidgetsSvc, 'massAssignAll').and.stub();
      spyOn(ImpacKpisSvc, 'massAssignAll').and.stub();

      subjectScope = compile();
      subjectScope.data.currency = 'cur2'
      subjectScope.data.savedCurrency = 'cur1'
      subjectScope.$digest();

      subjectScope.massAssignCurrency();
      subjectScope.$digest();

      it('updates the current dashboard with a currency', function() {
        expect(ImpacDashboardsSvc.update).toHaveBeenCalledWith(1, {currency: 'cur2'});
      });

      it('updates the current dashboard\'s widgets with a currency', function() {
        expect(ImpacWidgetsSvc.massAssignAll).toHaveBeenCalledWith({currency: 'cur2'});
      });

      it('updates the scope.data.savedCurrency saved value', function () {
        expect(subjectScope.data.savedCurrency).toEqual('cur2');
      })
    });

    beforeEach(function () {
      updateSpy.and.callFake($q.reject);

      it('returns the scope.data.currency to the previously saved currency on error', function () {
        expect(subjectScope.data.currency).toEqual('cur1');
      });
    });
  });

});
