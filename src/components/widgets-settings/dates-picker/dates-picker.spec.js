describe('<> widget-setting-dates-picker', function () {
  'use strict';

  var subject, subjectScope, $templateCache, $filter, ImpacWidgetsSvc, $httpBackend, $timeout;
  var baseTime = new Date(2016,0,15);

  // Compile the directive and return its scope
  var compile = function() {
    inject(function ($rootScope, $compile, $q) {
      var scope = $rootScope.$new();

      // Attributes passed to the directive
      scope.widget = {settings: []};
      scope.deferred = $q.defer();
      scope.from = '2015-12-14';
      scope.to = '2016-01-20';
      scope.keepToday = false;

      // Stubs
      spyOn(scope.deferred, 'resolve').and.callThrough();

      $compile(subject)(scope);
    });
    return subject.isolateScope();
  }

  beforeEach(function() {
    module('maestrano.impac');

    subject = angular.element('<div setting-dates-picker parent-widget="widget" deferred="::deferred" from="from" to="to" keep-today="keepToday" />');

    // Inject services called by the directive...
    inject(function (_$templateCache_, _$filter_, _ImpacWidgetsSvc_, _$httpBackend_, _$timeout_) {
      ImpacWidgetsSvc = _ImpacWidgetsSvc_;
      $templateCache = _$templateCache_;
      $filter = _$filter_;
      $httpBackend = _$httpBackend_;
      $timeout = _$timeout_;
    });

    // ...and stub their methods
    spyOn(ImpacWidgetsSvc, 'updateWidgetSettings').and.stub();

    // Mock today's date as the 15th of Jan.
    jasmine.clock().mockDate(baseTime);
  });

  describe('.link', function(){
    var setting, cFrom, cTo;

    beforeEach(function() {
      subjectScope = compile();
      setting = subjectScope.parentWidget.settings[0];
      cFrom = subjectScope.calendarFrom;
      cTo = subjectScope.calendarTo;

      $httpBackend.whenGET(/template\/.*/).respond(200);
      // subjectScope.$digest();
    });

    it('defines the calendars objects', function() {
      expect(cFrom.value).toEqual(new Date(2016,0,1));
      expect(cFrom.opened).toBe(false);
      expect(cFrom.toggle).toBeDefined();
      expect(cTo.value).toEqual(baseTime);
      expect(cTo.opened).toBe(false);
      expect(cTo.toggle).toBeDefined();
    });

    it('pushes the setting in the parent widget\'s settings list', function() {
      expect(setting).toBeDefined();
      expect(setting.key).toBe('dates-picker');
      expect(setting.initialize).toBeDefined();
      expect(setting.toMetadata).toBeDefined();
    })

    it('resolves the deferred object to trigger the widget content loading', function() {
      expect(subjectScope.deferred.resolve).toHaveBeenCalledWith(setting);
    });

    describe('calendarFrom/To.toggle()', function() {
      it('switches the target calendar visibility', function() {
        cFrom.opened = false;
        cFrom.toggle();
        expect(cFrom.opened).toBe(true);
        cFrom.toggle();
        expect(cFrom.opened).toBe(false);

        cTo.opened = false;
        cTo.toggle();
        expect(cTo.opened).toBe(true);
        cTo.toggle();
        expect(cTo.opened).toBe(false);
      });
      it('closes the other calendar', function() {
        cFrom.opened = true;
        cTo.opened = false;
        cTo.toggle();
        expect(cFrom.opened).toBe(false);
        cFrom.toggle();
        expect(cTo.opened).toBe(false);
      });
    });

    describe('#showApplyButton()', function() {
      it('displays the "apply changes" button', function() {
        subjectScope.changed = false;
        subjectScope.showApplyButton();
        expect(subjectScope.changed).toBe(true);
      });
    });

    describe('#applyChanges()', function() {
      beforeEach(function() {
        subjectScope.changed = true;
        subjectScope.applyChanges();
      });
      it('updates the widget\'s settings', function() {
        expect(ImpacWidgetsSvc.updateWidgetSettings).toHaveBeenCalledWith(subjectScope.parentWidget, true);
      });
      it('hides the "apply changes" button', function() {
        expect(subjectScope.changed).toBe(false);
      });
    });

    describe('#setting.initialize()', function() {
      afterEach( function() {
        $timeout.verifyNoPendingTasks();
      });

      it('hides the "apply changes" button', function() {
        setting.initialize();
        $timeout.flush();
        expect(subjectScope.changed).toBe(false);
      });
      it('defines the calendars values', function() {
        setting.initialize();
        $timeout.flush();
        expect(cFrom.value).toEqual(new Date(2015,11,14));
        expect(cTo.value).toEqual(new Date(2016,0,20));
      });

      describe('when "from" is not defined', function() {
        it('sets the calendarFrom value as the first day of the year', function() {
          subjectScope.fromDate = undefined;
          setting.initialize();
          $timeout.flush();
          expect(cFrom.value).toEqual(new Date(2016,0,1));
        });
      });

      describe('when "to" is not defined', function() {
        it('sets the calendarTo value as today\'s date', function() {
          subjectScope.toDate = undefined;
          setting.initialize();
          $timeout.flush();
          expect(cTo.value).toEqual(new Date(2016,0,15));
        });
      });

      describe('when "keep-today" is true and "to" is defined', function() {
        it('does not take "to" into account, but sets the calendarTo value as today\'s date instead', function() {
          subjectScope.keepToday = true;
          setting.initialize();
          $timeout.flush();
          expect(cTo.value).toEqual(new Date(2016,0,15));
        });
      });
    });

    describe('#setting.toMetadata()', function() {
      it('returns the "hist_parameters" metadata', function() {
        setting.initialize();
        subjectScope.$evalAsync(function(){
          expect(setting.toMetadata()).toEqual({hist_parameters: {from: '2015-12-14', to: '2016-01-20', period: 'RANGE', keep_today: false}});
        });
      });
      describe('when "to" is today\'s date', function() {
        it('includes "keep_today"=true in the metadata', function() {
          setting.initialize();
          subjectScope.$evalAsync(function(){
            cTo.value = baseTime;
            expect(setting.toMetadata()).toEqual({hist_parameters: {from: '2015-12-14', to: '2016-01-15', period: 'RANGE', keep_today: true}});
          });
        });
      });
    });
  });

});
