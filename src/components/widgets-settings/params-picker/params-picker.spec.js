describe('<> widget-setting-params-picker', function () {
  'use strict';

  var subject, subjectScope, $templateCache, $filter, ImpacWidgetsSvc, $httpBackend, $timeout;

  // Compile the directive and return its scope
  var compile = function() {
    inject(function ($rootScope, $compile, $q) {
      var scope = $rootScope.$new();

      // Attributes passed to the directive
      scope.widget = {settings: []};
      scope.deferred = $q.defer();
      scope.hasReach = true;
      scope.param = "status_selection";

      // Stubs
      spyOn(scope.deferred, 'resolve').and.callThrough();

      $compile(subject)(scope);
    });
    return subject.isolateScope();
  };

  beforeEach(function() {
    module('maestrano.impac');

    subject = angular.element('<div setting-params-picker options="statusOptions" has-reach="hasReach" param="status_selection" parent-widget="widget" class="part" deferred="::deferred" />');

    // Inject services called by the directive...
    inject(function (_ImpacWidgetsSvc_) {
      ImpacWidgetsSvc = _ImpacWidgetsSvc_;
    });

    // ...and stub their methods
    spyOn(ImpacWidgetsSvc, 'updateWidgetSettings').and.stub();
  });

  describe('.link', function(){
    var setting, $scope, w;

    beforeEach(function() {
      subjectScope = compile();
      $scope = subjectScope;
      setting = subjectScope.parentWidget.settings[0];
      w = subjectScope.parentWidget;
      w.metadata = setting.toMetadata();
    });

    it('pushes the setting in the parent widget\'s settings list', function() {
      expect(setting).toBeDefined();
      expect(setting.key).toBe('params-picker');
      expect(setting.initialize).toBeDefined();
      expect(setting.toMetadata).toBeDefined();
      expect(w.metadata).toBeDefined();
      expect(w.metadata[$scope.param]).toBeDefined();
    });

    describe('#setting.initialize()', function () {
      beforeEach(function () {
        setting.initialize();
      });

      it('default reach is widget', function () {
        expect(setting.reach).toBe("widget");
      });
    });
  });

});
