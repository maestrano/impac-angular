describe('<> dashboard-setting-currency', function () {
  'use strict';

  var subject, subjectScope, $q, ImpacMainSvc, ImpacDashboardsSvc, ImpacWidgetsSvc;

  var currencies = ['cur1', 'cur2'];
  var mainConfig = {currentOrganization: {currency: 'cur2'}, currencies: currencies};
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

    subject = angular.element('<div dashboard-setting-currency />');

    // Inject services called by the directive...
    inject(function (_$q_, _ImpacMainSvc_, _ImpacDashboardsSvc_, _ImpacWidgetsSvc_) {
      ImpacMainSvc = _ImpacMainSvc_;
      ImpacDashboardsSvc = _ImpacDashboardsSvc_;
      ImpacWidgetsSvc = _ImpacWidgetsSvc_;
      $q = _$q_;
    });

    // ...and stub their methods
    spyOn(ImpacMainSvc, 'load').and.returnValue($q.resolve(mainConfig));
    spyOn(ImpacDashboardsSvc, 'load').and.returnValue($q.resolve());
    spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.callFake(function(){
      return currentDhb;
    });
  });

  describe('.link', function(){
    beforeEach(function() {
      subjectScope = compile();
      spyOn(subjectScope, 'massAssignCurrency').and.stub();
      subjectScope.$digest();
    });

    it('defines scope.currentDhb', function() {
      expect(subjectScope.currentDhb).toEqual(currentDhb);
    });

    it('defines scope.currency', function() {
      expect(subjectScope.currency).toEqual('cur2');
    });

    it('defines scope.currencies', function() {
      expect(subjectScope.currencies).toEqual(currencies);
    });

    it('defines scope.massAssignCurrency()', function() {
      expect(subjectScope.massAssignCurrency).toBeDefined();
    });

    it('by default, assigns a currency to the current dashboard and it\'s widgets', function(){
      expect(subjectScope.massAssignCurrency).toHaveBeenCalled();
    });

    describe('when the current dashboard already has a currency', function() {
      beforeEach(function(){
        // re-compile the directive with different dashboard value...
        var prevCurDhb = currentDhb;
        currentDhb = {id: 1, name: 'dhb1', currency: 'cur1'};
        subjectScope = compile();

        spyOn(subjectScope, 'massAssignCurrency').and.stub();
        subjectScope.$digest();

        // restore the initial value of currentDhb for next tests
        currentDhb = prevCurDhb;
      });

      it('does not assign it a currency', function() {
        expect(subjectScope.massAssignCurrency).not.toHaveBeenCalled();
      })
    });
  });

  describe('#massAssignCurrency()', function() {
    beforeEach(function() {
      spyOn(ImpacDashboardsSvc, 'update').and.stub();
      spyOn(ImpacWidgetsSvc, 'massAssignAll').and.stub();
      subjectScope = compile();
      subjectScope.$digest();
    });

    it('updates the current dashboard with a currency', function() {
      expect(ImpacDashboardsSvc.update).toHaveBeenCalledWith(1, {currency: 'cur2'});     
    });

    it('updates the current dashboard\'s widgets with a currency', function() {
      expect(ImpacWidgetsSvc.massAssignAll).toHaveBeenCalledWith({currency: 'cur2'});     
    });
  });

});