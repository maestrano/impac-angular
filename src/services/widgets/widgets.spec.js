describe('<> ImpacWidgetsSvc', function () {
  'use strict';

  var subject, svc, ImpacDashboardsSvc, ImpacMainSvc, ImpacRoutes, ImpacDeveloper, $q, $http, $rootScope, $log;

  var config = {ssoSessionId: 'id-1'};
  var currentDhb = {id: 99, name: 'dhb-99', metadata: {}, widgets: [
    {id: 1, name: 'w-1', metadata: {organization_ids: ['org-1']}},
    {id: 2, name: 'w-2', metadata: {organization_ids: ['org-1']}}
  ], callbacks: {}};

  beforeEach(function() {
    module('maestrano.impac');
    inject(function (_ImpacWidgetsSvc_, _ImpacDashboardsSvc_, _ImpacMainSvc_, _ImpacRoutes_, _ImpacDeveloper_, _$q_, _$http_, _$rootScope_, _$log_) {
      svc = _ImpacWidgetsSvc_;
      ImpacDashboardsSvc = _ImpacDashboardsSvc_;
      ImpacMainSvc = _ImpacMainSvc_;
      ImpacRoutes = _ImpacRoutes_;
      ImpacDeveloper = _ImpacDeveloper_;
      $q = _$q_;
      $http = _$http_;
      $rootScope = _$rootScope_;
      $log = _$log_;
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

  describe('#updateAllSimilarWidgets(:dashboard, :setting)', function () {
    var dashboard, aSetting, anotherSetting, settingKey, updatedDashboard;
    beforeEach(function () {
      dashboard = angular.copy(currentDhb);
      aSetting = {
        toMetadata: function () {
          return {
            status_selection: {
              values: [],
              reach: "dashboard"
            }
          }
        }
      };
      anotherSetting = {
        toMetadata: function () {
          return {
            another_status_selection: {
              values: [],
              reach: "dashboard"
            }
          }
        }
      };

      dashboard.widgets[0].settings = [angular.copy(aSetting)];
      dashboard.widgets[1].settings = [angular.copy(anotherSetting)];
      dashboard.widgets.push({id: 3, name: 'w-3', metadata: {organization_ids: ['org-1']}})
      dashboard.widgets[2].settings = angular.copy(dashboard.widgets[0].settings);

      settingKey = _.keys(aSetting.toMetadata())[0];

      spyOn(ImpacDashboardsSvc, 'update').and.callFake(function (id, data) {
        updatedDashboard = angular.copy(dashboard);
        updatedDashboard.metadata[settingKey] = data.metadata[settingKey];
        return $q.resolve(updatedDashboard);
      });

      spyOn(svc, 'update').and.callFake(function (wgt, data) {
        return $q.resolve(wgt.id);
      });

      spyOn(svc, 'show').and.callFake(function (updatedWidget) {
        return $q.resolve(updatedWidget);
      });

      spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(dashboard);

      svc.updateAllSimilarWidgets(dashboard, aSetting);
      $rootScope.$apply();
    });

    it('updates the dashboard\'s metadata', function () { 
      expect(ImpacDashboardsSvc.update).toHaveBeenCalledWith(dashboard.id, {metadata: aSetting.toMetadata()}); 
    });

    it('updates all the similar widgets\' metadata', function () {
      expect(svc.update).toHaveBeenCalledWith(dashboard.widgets[0], {metadata: dashboard.widgets[0].metadata});
      expect(svc.update).toHaveBeenCalledWith(dashboard.widgets[2], {metadata: dashboard.widgets[2].metadata});
    });

    it('does not update the other widgets', function () {
      expect(svc.update).not.toHaveBeenCalledWith(dashboard.widgets[1], {metadata: dashboard.widgets[1].metadata});
    });

    it('renders the updated widgets', function () {
      expect(svc.show).toHaveBeenCalledWith(1);
      expect(svc.show).toHaveBeenCalledWith(3);
    });
  });

  describe('#massAssignAll(:metadata)', function() {
    var metadata = {currency: 'EUR'};

    beforeEach(function(){
      spyOn(svc, 'load').and.returnValue($q.resolve(config));
      spyOn(svc, 'update').and.callFake(function(w, opts){
        var updatedWidget = angular.copy(w);
        angular.merge(updatedWidget, opts);
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

    describe('on _self.load success', function () {
      beforeEach(function() {
        spyOn(svc, 'load').and.returnValue($q.resolve(config));
        spyOn(ImpacDashboardsSvc.callbacks.widgetAdded, 'notify');
        spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(currentDhb);
      });

      describe('on $http success', function () {
        beforeEach(function () {
          spyOn($http, "post").and.returnValue($q.resolve({data: widget}));
          subject = svc.create(widget)
          $rootScope.$apply();
        });

        sharedSuccessExamples();
      });

      describe('on $http error', function () {
        beforeEach(function () {
          spyOn($http, "post").and.returnValue($q.reject('an error response'));
          spyOn($log, 'error').and.callThrough();
          subject = svc.create(widget)
          $rootScope.$apply();
        });

        it('logs & rejects with an error', function () {
          expect($log.error).toHaveBeenCalled();
          expect(subject.$$state.value).toEqual('an error response');
        });
      });

      describe('on stubbed widget response success', function () {
        beforeEach(function () {
          spyOn(ImpacDeveloper, 'isWidgetStubbed').and.returnValue(true);
          spyOn(ImpacDeveloper, 'createWidgetStub').and.returnValue($q.resolve({
            data: widget
          }))
          subject = svc.create(widget);
          $rootScope.$apply();
        });

        sharedSuccessExamples();
      });

      function sharedSuccessExamples() {
        it('creates the widget and adds it to the current dashboard', function () {
          expect(currentDhb.widgets).toContain(widget);
        });

        it ('notifies the widgetAdded callback', function() {
          expect(ImpacDashboardsSvc.callbacks.widgetAdded.notify).toHaveBeenCalledWith(widget);
        });

        it('resolves the promise', function() {
          expect(subject.$$state.value).toEqual(widget);
        });
      }
    });

    describe('on _self.load failure', function () {
      beforeEach(function () {
        spyOn(svc, 'load').and.returnValue($q.reject('error'));
        spyOn($log, 'error').and.callThrough();
        subject = svc.create(widget);
        $rootScope.$apply();
      });

      it('logs & rejects with an error', function () {
        expect($log.error).toHaveBeenCalled();
        expect(subject.$$state.value).toEqual('error');
      });
    });

  });

  describe('#show(:widget, "refreshCache)', function() {
    xit('calls the API and returns the widget content');
  });

  describe('#update(:widget, :opts)', function() {
    var opts = { name: 'new name', metadata: { some: 'opts' } };
    var widget = { id: 1, name: 'test-widget' };

    describe('on _self.load success', function () {
      beforeEach(function() {
        spyOn(svc, 'load').and.returnValue($q.resolve(config));
        spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(currentDhb);
      });

      describe('on http success', function() {
        beforeEach(function() {
          spyOn($http, "put").and.returnValue($q.resolve({data: opts}));

          subject = svc.update(widget,opts);
          $rootScope.$apply();
        });

        it('remotely saves the widget', function() {
          expect($http.put).toHaveBeenCalledWith(ImpacRoutes.widgets.update(currentDhb.id, widget.id), {widget: opts});
        });

        sharedSuccessExamples();
      });

      describe('on stubbed widget response success', function () {
        beforeEach(function () {
          spyOn(ImpacDeveloper, 'isWidgetStubbed').and.returnValue(true);
          spyOn(ImpacDeveloper, 'updateWidgetStub').and.returnValue($q.resolve({
            data: opts
          }));
        });

        sharedSuccessExamples();
      });

      function sharedSuccessExamples() {
        it('updates attributes on the widget', function() {
          expect(widget.metadata.some).toEqual(opts.metadata.some);
          expect(widget.name).toEqual(opts.name)
        });

        it('resolves the promise', function() {
          expect(subject.$$state.value).toEqual(widget);
        });
      }

      describe('on http error', function() {
        beforeEach(function() {
          spyOn($http, "put").and.returnValue($q.reject("an error response"));
          spyOn($log, 'error').and.callThrough();
          subject = svc.update(widget,opts);
          $rootScope.$apply();
        });

        it('does not update the attributes on the widget', function() {
          expect(widget).toEqual(widget);
        });

        it('logs & rejects with an error', function () {
          expect($log.error).toHaveBeenCalled();
          expect(subject.$$state.value).toEqual('an error response');
        });
      });
    });

    describe('on _self.load failure', function () {
      beforeEach(function () {
        spyOn(svc, 'load').and.returnValue($q.reject('error'));
        spyOn($log, 'error').and.callThrough();
        subject = svc.create(widget);
        $rootScope.$apply();
      });

      it('logs & rejects with an error', function () {
        expect($log.error).toHaveBeenCalled();
        expect(subject.$$state.value).toEqual('error');
      });
    });
  });

  describe('#delete(:widget)', function() {
    var widgetToDelete = { id: 333, name: 'test-widget' };

    describe('on _self.load success', function () {
      beforeEach(function() {
        spyOn(svc, 'load').and.returnValue($q.resolve(config));
        spyOn(ImpacDashboardsSvc, 'getCurrentDashboard').and.returnValue(currentDhb.widgets.concat([widgetToDelete]));
      });

      describe('on http success', function() {
        beforeEach(function() {
          spyOn($http, "delete").and.returnValue($q.resolve({data: {success: true}}));

          subject = svc.delete(widgetToDelete);
          $rootScope.$apply();
        });

        sharedSuccessExamples();
      });

      describe('on stubbed widget response success', function () {
        beforeEach(function () {
          spyOn(ImpacDeveloper, 'isWidgetStubbed').and.returnValue(true);
          spyOn(ImpacDeveloper, 'updateWidgetStub').and.returnValue($q.resolve({
            data: { success: true }
          }));
        });

        sharedSuccessExamples();
      });

      function sharedSuccessExamples() {
        it('removes the widget from the dashboard', function () {
          expect(currentDhb.widgets).not.toContain(widgetToDelete);
        });

        it('resolves the promise', function() {
          expect(subject.$$state.value).toEqual({data: { success: true }});
        });
      }

      describe('on http error', function() {
        beforeEach(function() {
          spyOn($http, "delete").and.returnValue($q.reject("an error response"));
          spyOn($log, 'error').and.callThrough();
          subject = svc.delete(widgetToDelete);
          $rootScope.$apply();
        });

        it('logs & rejects with an error', function () {
          expect($log.error).toHaveBeenCalled();
          expect(subject.$$state.value).toEqual('an error response');
        });
      });
    });

    describe('on _self.load failure', function () {
      beforeEach(function () {
        spyOn(svc, 'load').and.returnValue($q.reject('an error response'));
        spyOn($log, 'error').and.callThrough();
        subject = svc.delete(widgetToDelete);
        $rootScope.$apply();
      });

      it('logs & rejects with an error', function () {
        expect($log.error).toHaveBeenCalled();
        expect(subject.$$state.value).toEqual('an error response');
      });
    });
  });
});
