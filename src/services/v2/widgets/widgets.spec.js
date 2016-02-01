describe('<> ImpacWidgetsSvc-v2', function () {
  'use strict';

  var subject, svc, ImpacDashboardsSvc, ImpacMainSvc, ImpacRoutes, $q, $http, $rootScope;

  var config = {ssoSessionId: 'id-1'};
  var currentDhb = {id: 99, name: 'dhb-99', widgets: [
    {id: 1, name: 'w-1', metadata: {organization_ids: ['org-1']}},
    {id: 2, name: 'w-2', metadata: {organization_ids: ['org-1']}}
  ], callbacks: {}};

  beforeEach(function() {
    module('maestrano.impac');
    inject(function (_ImpacWidgetsSvc_, _ImpacDashboardsSvc_, _ImpacMainSvc_, _ImpacRoutes_, _$q_, _$http_, _$rootScope_) {
      svc = _ImpacWidgetsSvc_;
      ImpacDashboardsSvc = _ImpacDashboardsSvc_;
      ImpacMainSvc = _ImpacMainSvc_;
      ImpacRoutes = _ImpacRoutes_;
      $q = _$q_;
      $http = _$http_;
      $rootScope = _$rootScope_;
    });

    currentDhb.callbacks.widgetAdded = $q.defer();
  });


  // Initilization and getters
  // -------------------------------------------------
  it('is defined', function () {
    expect(typeof svc).toBeDefined();
  });

  it('has a config object', function () {
    expect(svc.config).toBeDefined();
    expect(svc.config.ssoSessionId).toEqual("");
  });


  // Load
  // -------------------------------------------------
  describe('#load()', function() {
    xit('loads the service');
  });


  // Helpers
  // -------------------------------------------------
  describe('#initWidgetSettings(:widget)', function() {
    xit("calls initialize() for all the widget's settings");
  });

  describe('#updateWidgetSettings(:widget, :needContentReload)', function() {
    xit('updates the widget\'s settings and eventually reload the widget');
  });

  describe('#massAssignAll(:metadata)', function() {
    var metadata = {currency: 'EUR'};

    beforeEach(function(){
      spyOn(svc, 'load').and.returnValue($q.resolve(config));
      spyOn(svc, 'update').and.callFake(function(w, opts){
        var updatedWidget = angular.copy(w);
        angular.merge(updatedWidget, opts)
        return $q.resolve(updatedWidget);
      });
      spyOn(svc, 'show').and.callFake(function(w){
        var renderedWidget = angular.copy(w);
        return $q.resolve(renderedWidget);
      });

      subject = svc.massAssignAll(metadata);
    });

    describe('standard conditions', function() {
      beforeEach(function() {
        spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(currentDhb);
        $rootScope.$apply();
      });

      it('retrieves the current dashboard', function() {
        expect(ImpacDashboardsSvc.getCurrentDashboard).toHaveBeenCalled();
      });

      it('updates all the widgets with the specified metadata', function() {
        expect(svc.update).toHaveBeenCalledWith({id: 1, name: 'w-1', metadata: {organization_ids: ['org-1']}}, {metadata: {organization_ids: ['org-1'], currency: 'EUR'}});
        expect(svc.update).toHaveBeenCalledWith({id: 2, name: 'w-2', metadata: {organization_ids: ['org-1']}}, {metadata: {organization_ids: ['org-1'], currency: 'EUR'}});
      });

      it('renders the widgets with clearing the cache', function() {
        expect(svc.show).toHaveBeenCalledWith({id: 1, name: 'w-1', metadata: {organization_ids: ['org-1'], currency: 'EUR'}, isLoading: true});
        expect(svc.show).toHaveBeenCalledWith({id: 2, name: 'w-2', metadata: {organization_ids: ['org-1'], currency: 'EUR'}, isLoading: true});
      })

      it('returns a promise per widget to update', function() {
        expect(typeof subject.then).toBe('function');
        expect(typeof subject.catch).toBe('function');
        expect(typeof subject.finally).toBe('function');
        expect(subject.$$state.value.length).toEqual(2);
        expect(subject.$$state.status).toEqual(1);
      });
    });

    describe('when the dashboard cannot be retrieved', function() {
      beforeEach(function() {
        spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(null);
        $rootScope.$apply();
      });

      it('returns a rejected promise', function() {
        expect(subject.$$state.status).toEqual(2);
      });
    });

    describe('when the dashboard has no widget', function() {
      beforeEach(function() {
        var dhb = angular.copy(currentDhb);
        dhb.widgets = [];
        spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(dhb);
        $rootScope.$apply();
      });

      it('resolves an empty array', function() {
        expect(subject.$$state.value).toEqual([]);
        expect(subject.$$state.status).toEqual(1);
      });
    });

    describe('when a widget already has the new metadata', function() {
      beforeEach(function() {
        var dhb = angular.copy(currentDhb);
        dhb.widgets.push({id: 3, name: 'w-3', metadata: {organization_ids: ['org-1'], currency: 'EUR'}});
        spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(dhb);
        $rootScope.$apply();
      });

      it('does not push the corresponding widget to the update list', function() {
        expect(svc.update).toHaveBeenCalledWith({id: 1, name: 'w-1', metadata: {organization_ids: ['org-1']}}, {metadata: {organization_ids: ['org-1'], currency: 'EUR'}});
        expect(svc.update).toHaveBeenCalledWith({id: 2, name: 'w-2', metadata: {organization_ids: ['org-1']}}, {metadata: {organization_ids: ['org-1'], currency: 'EUR'}});
        expect(svc.update).not.toHaveBeenCalledWith({id: 3, name: 'w-3', metadata: {organization_ids: ['org-1']}}, {metadata: {organization_ids: ['org-1'], currency: 'EUR'}});
        expect(subject.$$state.value.length).toEqual(2);
        expect(subject.$$state.status).toEqual(1);
      });
    });
  });


  // CRUD methods
  // -------------------------------------------------
  describe('#create(:widget)', function() {
    var widget = { name: 'test-widget' };

    beforeEach(function() {
      spyOn(svc, 'load').and.returnValue($q.resolve(config));
      spyOn($http, 'post').and.returnValue({data: widget});
      spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(currentDhb);
      spyOn(currentDhb.callbacks.widgetAdded, 'notify').and.callThrough();

      svc.create(widget)
    });

    xit ('notifies the widgetAdded callback', function() {
      expect(currentDhb.callbacks.widgetAdded.notify).toHaveBeenCalledWith(widget);
    });

    xit('creates the widget and adds it to the current dashboard');
  });

  describe('#show(:widget, "refreshCache)', function() {
    xit('calls the API and returns the widget content');
  });

  describe('#update(:widget, :opts)', function() {
    xit('updates attributes on the widget');
  });

  describe('#delete(:widget)', function() {
    xit('deletes the widget and removes it from the current dashboard');
  });
});
