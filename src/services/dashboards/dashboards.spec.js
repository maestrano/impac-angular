describe('<> ImpacDashboardsSvc', function () {
  'use strict';

  var subject, svc, ImpacDashboardsSvc, ImpacMainSvc, ImpacRoutes, ImpacDeveloper, $q, $http, $rootScope;

  beforeEach(function() {
    module('maestrano.impac');
    inject(function (_ImpacDashboardsSvc_, _ImpacMainSvc_, _ImpacRoutes_, _ImpacDeveloper_, _$q_, _$http_, _$rootScope_) {
      svc = ImpacDashboardsSvc = _ImpacDashboardsSvc_;
      ImpacMainSvc = _ImpacMainSvc_;
      ImpacRoutes = _ImpacRoutes_;
      ImpacDeveloper = _ImpacDeveloper_;
      $q = _$q_;
      $http = _$http_;
      $rootScope = _$rootScope_;
    });
  });


  // Initilization and getters
  // -------------------------------------------------
  it('is defined', function () {
    expect(typeof svc).toBeDefined();
  });

  it('has a config object', function () {
    expect(svc.config).toBeDefined();
    expect(svc.config.dashboards).toEqual([]);
    expect(svc.config.currentDashboard).toEqual({});
    expect(svc.config.widgetsTemplates).toEqual([]);
  });

  it('implements getters for the config sub-objects', function() {
    expect(typeof svc.getDashboards).toBe('function');
    expect(typeof svc.getCurrentDashboard).toBe('function');
    expect(typeof svc.getWidgetsTemplates).toBe('function');
  });


  // Callbacks
  // -------------------------------------------------
  it('defines some callbacks', function() {
    expect(Object.keys(svc.callbacks).length).toEqual(6);
    expect(typeof svc.callbacks.dashboardChanged.$$state).toBeDefined();
    expect(typeof svc.callbacks.widgetAdded.$$state).toBeDefined();
  });

  describe('#dashboardChanged', function() {
    it('returns a promise', function() {
      expect(svc.dashboardChanged().$$state).toBeDefined();
    });
  });

  describe('#widgetAdded', function() {
    it('returns a promise', function() {
      expect(svc.widgetAdded().$$state).toBeDefined();
    });
  });

  // Load
  // -------------------------------------------------
  describe('#load', function() {
    beforeEach(function() {
      // Stub for ImpacMainSvc.load()
      spyOn(ImpacMainSvc, "load").and.callFake(function() {
        var orgsDeferred = $q.defer();
        orgsDeferred.resolve({
          currentOrganization: {
            id: 1,
            acl: { related: {} }
          }
        });
        return orgsDeferred.promise;
      });

      // Stub for ImpacMainSvc.loadUserData()
      spyOn(ImpacMainSvc, "loadUserData").and.returnValue($q.resolve({sso_session: 'id-13513754'}));

      // Stub for $http.get()
      spyOn($http, "get").and.callFake(function() {
        var httpDeferred = $q.defer();
        httpDeferred.resolve({ data: { widgets: [] } });
        return httpDeferred.promise;
      });

      // Stubs for setters
      spyOn(svc, 'setDashboards').and.callFake(function(){
        var setDashboardsDeferred = $q.defer();
        setDashboardsDeferred.resolve(true);
        return setDashboardsDeferred.promise;
      });
      spyOn(svc, 'setCurrentDashboard').and.returnValue(true);
    });

    it('returns a promise', function() {
      expect(typeof svc.load().then).toBe('function');
      expect(typeof svc.load().catch).toBe('function');
      expect(typeof svc.load().finally).toBe('function');
    });

    describe('when the service is not configured yet', function() {
      beforeEach(function() {
        subject = svc.load();
        $rootScope.$apply();
      });

      it('loads the organizations', function() {
        expect(ImpacMainSvc.load).toHaveBeenCalled();
      });

      it('retrieves the dashboards from mnoe API', function() {
        expect($http.get).toHaveBeenCalledWith(ImpacRoutes.dashboards.index());
      });

      it('stores the dashboards in the service', function() {
        expect(svc.setDashboards).toHaveBeenCalledWith({ widgets: [] });
      });

      it('stores the current dashboard in the service', function() {
        expect(svc.setCurrentDashboard).toHaveBeenCalled();
      });

      it('resolves the config object', function() {
        expect(subject.$$state.value).toBe(svc.config)
      });
    });

    describe('when the service has already been configured', function() {
      beforeEach(function() {
        svc.config = {
          dashboards: ['dash1', 'dash2'],
          currentDashboard: 'dash1'
        };
      });

      it('simply resolves the config object', function() {
        subject = svc.load();
        expect(subject.$$state.value).toBe(svc.config)
        expect(ImpacMainSvc.load).not.toHaveBeenCalled();
      });

      describe('when force is true', function() {
        it('reloads the service', function() {
          subject = svc.load(true);
          expect(ImpacMainSvc.load).toHaveBeenCalledWith(true);
        });
      });
    });
  });


  // Setters
  // -------------------------------------------------
  describe('#setCurrentDashboard(:id)', function() {
    beforeEach(function() {
      svc.config = {
        dashboards: [{id: 1, name: 'dash1'}, {id: 2, name: 'dash2'}],
        currentDashboard: {}
      };

      spyOn(svc, 'setWidgetsTemplates').and.returnValue(true);
      spyOn(svc, 'initializeActiveTabs').and.returnValue(true);
      spyOn(svc.callbacks.dashboardChanged, 'notify').and.callThrough();
    });

    // Helpers ---
    function sharedBehaviorForSetDependingAttributes() {
      it('stores the widgets templates list in the service', function() {
        expect(svc.setWidgetsTemplates).toHaveBeenCalled();
      });

      it('initializes the tabs status', function() {
        expect(svc.initializeActiveTabs).toHaveBeenCalled();
      });
    };

    function sharedBehaviorForSetDefaultCurrentDashboard(id) {
      describe('.setDefaultCurrentDashboard', function() {
        describe('when at least one dashboard is defined in the list', function() {
          beforeEach(function() {
            svc.setCurrentDashboard(id);
          });

          it('replaces the current dashboard by the first available dashboard', function() {
            expect(svc.config.currentDashboard).toEqual({id: 1, name: 'dash1'});
          });

          it('sets the depending attributes', function() {
            sharedBehaviorForSetDependingAttributes();
          });

          it('notifies the dashboardChanged callback', function() {
            expect(svc.callbacks.dashboardChanged.notify).toHaveBeenCalledWith(svc.config.currentDashboard);
          });
        });

        describe('when there is no dashboard in list', function() {
          beforeEach(function() {
            svc.config.currentDashboard = {id: 0, name: 'dash0'};
            svc.config.dashboards = [];
            svc.setCurrentDashboard(id);
          });

          it('sets an empty object as the current dashboard', function() {
            expect(svc.config.currentDashboard).toEqual({});
          });

          it('notifies the dashboardChanged callback with false return value', function() {
            expect(svc.callbacks.dashboardChanged.notify).toHaveBeenCalledWith(false);
          });
        });
      });
    };
    // ---

    describe('when the dashboard exists in the list', function() {
      beforeEach(function() {
        svc.setCurrentDashboard(2);
      });

      it('replaces the current dashboard by the fetched dashboard', function() {
        expect(svc.config.currentDashboard).toEqual({id: 2, name: 'dash2'});
      });

      it('sets the depending attributes', function() {
        sharedBehaviorForSetDependingAttributes();
      });

      it('notifies the dashboardChanged callback', function() {
        expect(svc.callbacks.dashboardChanged.notify).toHaveBeenCalledWith(svc.config.currentDashboard);
      });
    });

    describe('when :id is not specified', function() {
      sharedBehaviorForSetDefaultCurrentDashboard(null);
    });

    describe('when the dashboard cannot be found in the list', function() {
      sharedBehaviorForSetDefaultCurrentDashboard(-1);
    });

  });

  describe('#setDashboards(:array)', function() {
    var array;

    beforeEach(function() {
      svc.config = {
        dashboards: [{id: 1, name: 'dash1'}, {id: 2, name: 'dash2'}]
      };

      array = [
        {id: 4, name: 'dash4', data_sources: [{id: 1}]},
        {id: 5, name: 'dash5', data_sources: [{id: 2}]},
        {id: 6, name: 'dash6', data_sources: [{id: 1},{id: 2}]}
      ]

      // Stub for ImpacMainSvc.loadOrganizations()
      spyOn(ImpacMainSvc, "loadOrganizations").and.callFake(function() {
        var orgsDeferred = $q.defer();
        orgsDeferred.resolve({currentOrganization: {id: 1}});
        return orgsDeferred.promise;
      });
    });

    it("saves only the dashboards that belong to the current organization", function() {
      svc.setDashboards(array);
      $rootScope.$apply();
      expect(svc.config.dashboards).toEqual([
        {id: 4, name: 'dash4', data_sources: [{id: 1}]},
        {id: 6, name: 'dash6', data_sources: [{id: 1},{id: 2}]}
      ]);
    });

    describe('when :array is not set', function() {
      it('empties the dashboards list', function() {
        svc.setDashboards();
        $rootScope.$apply();
        expect(svc.config.dashboards).toEqual([]);
      });
    });

  });

  describe('#setWidgetsTemplates(:array)', function() {
    var array = [{ endpoint: 'accounts/balance' }, 'template1', 'template2'];

    function sharedBehaviorForKeepOriginal(anArray) {
      it('does not change the original widgetTemplates object', function() {
        svc.config.widgetsTemplates = ['original'];
        svc.setWidgetsTemplates(anArray);
        expect(svc.config.widgetsTemplates).toEqual(['original']);
      });
    };

    it('saves the implemented widgets templates in the service', function() {
      svc.setWidgetsTemplates(array);
      expect(svc.config.widgetsTemplates).toEqual([{ endpoint: 'accounts/balance' }]);
    });
    
    describe('when :array is not defined', function() {
      sharedBehaviorForKeepOriginal();
    });

    describe('when ImpacDeveloper is enabled', function () {
      var stubbedWidgetTemplate = [{ endpoint: 'accounts/comparison' }]
      beforeEach(function () {
        spyOn(ImpacDeveloper, 'isEnabled').and.callFake(function () {
          return true
        });
        spyOn(ImpacDeveloper, 'stubWidgetsTemplates').and.returnValue(array.concat(stubbedWidgetTemplate));
      })

      it('retrieves and applies stubbed widgets templates', function () {
        svc.setWidgetsTemplates(array);
        expect(ImpacDeveloper.stubWidgetsTemplates).toHaveBeenCalledWith(array);
        expect(svc.config.widgetsTemplates).toEqual([{ endpoint: 'accounts/balance' }].concat(stubbedWidgetTemplate));
      });
    });
  });


  // CRUD methods
  // -------------------------------------------------
  describe('#create(:dashboard)', function() {
    var newDashboard = {id: 2, name: 'dash2', currency: 'test'};

    beforeEach(function() {
      svc.config = {
        dashboards: [{id: 1, name: 'dash1'}],
        currentDashboard: {}
      }
      ImpacMainSvc.config = {currentOrganization: {currency: 'test'}};

      // Stub for _self.load()
      spyOn(svc, "load").and.callFake(function() {
        return $q.resolve();
      });

      // Stub for $http.post()
      spyOn($http, "post").and.callFake(function(route,data) {
        var httpDeferred = $q.defer();
        httpDeferred.resolve({data: data.dashboard});
        return httpDeferred.promise;
      });

      spyOn(svc, 'setCurrentDashboard').and.stub();

      subject = svc.create({id: 2, name: 'dash2'});
      $rootScope.$apply();
    });

    it('returns a promise', function() {
      expect(typeof subject.then).toBe('function');
      expect(typeof subject.catch).toBe('function');
      expect(typeof subject.finally).toBe('function');
    });

    it('posts the dashboard to the mnoe API', function() {
      expect($http.post).toHaveBeenCalledWith(ImpacRoutes.dashboards.create(), {dashboard: newDashboard});
    });

    it('pushes the returned dashboard to the dashboards list', function() {
      expect(svc.config.dashboards).toEqual([{id: 1, name: 'dash1'}, newDashboard]);
    });

    it('stores the current dashboard in the service', function() {
      expect(svc.setCurrentDashboard).toHaveBeenCalledWith(newDashboard.id);
    });

    it('resolves the returned dashboard', function() {
      expect(subject.$$state.value).toEqual(newDashboard);
    });
  });

  describe('#delete(:dashboardId)', function() {
    beforeEach(function() {
      svc.config = {
        dashboards: [{id: 1, name: 'dash1'}],
        currentDashboard: {}
      }

      // Stub for $http.delete()
      spyOn($http, "delete").and.callFake(function(id) {
        var httpDeferred = $q.defer();
        httpDeferred.resolve('stubbed http response');
        return httpDeferred.promise;
      });

      spyOn(svc, 'setCurrentDashboard').and.stub();

      subject = svc.delete(1);
      $rootScope.$apply();
    });

    it('returns a promise', function() {
      expect(typeof subject.then).toBe('function');
      expect(typeof subject.catch).toBe('function');
      expect(typeof subject.finally).toBe('function');
    });

    it('deletes the dashboard by requesting the mnoe API', function() {
      expect($http.delete).toHaveBeenCalledWith(ImpacRoutes.dashboards.delete(1));
    });

    it('removes the dashboard from the dashboards list', function() {
      expect(svc.config.dashboards).toEqual([]);
    });

    it('reset the current dashboard', function() {
      expect(svc.setCurrentDashboard).toHaveBeenCalled();
    });

    it('resolves the returned object', function() {
      expect(subject.$$state.value).toEqual('stubbed http response');
    });
  });

  describe('#update(:dashboardId, :opts)', function() {
    var dashboard = {id: 1, name: 'dash1'};
    var opts = {name: 'newDash1', param: 'test'};

    function apply() {
      subject = svc.update(dashboard.id, opts);
      $rootScope.$apply();
    };

    beforeEach(function() {
      svc.config = {
        dashboards: [dashboard],
        currentDashboard: {}
      }

      // Stub for $http.put()
      spyOn($http, "put").and.callFake(function() {
        var httpDeferred = $q.defer();
        var response = dashboard;
        response.param = opts.param;
        response.name = opts.name;
        httpDeferred.resolve({data: response});
        return httpDeferred.promise;
      });
    });

    it('returns a promise', function() {
      apply();
      expect(typeof subject.then).toBe('function');
      expect(typeof subject.catch).toBe('function');
      expect(typeof subject.finally).toBe('function');
    });

    it('updates the dashboard by requesting the mnoe API', function() {
      apply();
      expect($http.put).toHaveBeenCalledWith(ImpacRoutes.dashboards.update(dashboard.id), {dashboard: opts});
    });

    it('updates the dashboard in the dashboards list', function() {
      apply();
      expect(svc.config.dashboards).toEqual([{id: 1, name: 'newDash1', param: 'test'}]);
    });

    it('resolves the returned object', function() {
      apply();
      expect(subject.$$state.value).toEqual({id: 1, name: 'newDash1', param: 'test'});
    });

    describe('when the dashboard to update is also the current dashboard', function() {
      it('updates the current dashboard', function() {
        svc.config.currentDashboard = dashboard;
        apply();
        expect(svc.config.currentDashboard).toEqual({id: 1, name: 'newDash1', param: 'test'});
      });
    });
  });

});
