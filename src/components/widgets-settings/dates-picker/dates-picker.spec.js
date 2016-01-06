describe('<> setting-dates-picker', function () {
  'use strict';

  var subject, subjectScope, $templateCache, $filter, ImpacWidgetsSvc, $httpBackend;

  // Compile the directive and return its scope
  var compile = function() {
    inject(function ($rootScope, $compile, $q) {
      var scope = $rootScope.$new();
      // Attributes passed to the directive
      scope.widget = {settings: []};
      scope.deferred = $q.defer();
      $compile(subject)(scope);
    });
    return subject.isolateScope();
  }

  beforeEach(function() {
    module('maestrano.impac');

    subject = angular.element('<div setting-dates-picker parent-widget="widget" deferred="::deferred" />');

    // Inject services called by the directive...
    inject(function (_$templateCache_, _$filter_, _ImpacWidgetsSvc_, _$httpBackend_) {
      ImpacWidgetsSvc = _ImpacWidgetsSvc_;
      $templateCache = _$templateCache_;
      $filter = _$filter_;
      $httpBackend = _$httpBackend_;
    });

    // ...and stub their methods
    spyOn(ImpacWidgetsSvc, 'updateWidgetSettings').and.callFake(function(){
      return true;
    });
  });

  describe('.link', function(){
    beforeEach(function() {
      subjectScope = compile();
      // Enclosed directive from angular-ui will retrieve templates through HTTP requests
      $httpBackend.whenGET(/template\/.*/).respond(200);
      subjectScope.$digest();
    });

    it('defines the calendars objects', function() {
      expect(subjectScope.calendarFrom).toBeDefined();
    });
  });

});