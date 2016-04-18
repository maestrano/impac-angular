describe('<> widget-setting-time-slider', function () {
  'use strict';


  // Compile a directive and return its scope
  var compile = function(dir) {
    inject(function ($rootScope, $compile, $q) {
      var scope = $rootScope.$new();

      // Inject attributes passed to the directive
      scope.widget = {settings: []};
      scope.deferred = $q.defer();

      // Spies on compiled scope
      spyOn(scope.deferred, 'resolve').and.callThrough();

      $compile(dir)(scope);
    });

    return dir.isolateScope();
  };

  var directive = angular.element('<div setting-time-slider parent-widget="widget" deferred="::deferred" />');
  var subjectScope;
  var financialYEndM = null;
  beforeEach(function() {
    module('maestrano.impac');

    subjectScope = compile(directive);

    // Spies on services
    inject(function ($q, ImpacMainSvc) {
      spyOn(ImpacMainSvc, 'load').and.callFake(function() {
        return $q.resolve({ currentOrganization: { financial_year_end_month: financialYEndM } });
      });
    });

    // Mock today's date as the 15th of March.
    var baseTime = new Date(2016,2,15);
    jasmine.clock().mockDate(baseTime);
  });


  describe('.link', function() {
    var widget, setting, $timeout;
    beforeEach(function() {
      widget = subjectScope.parentWidget;
      setting = widget.settings[0];
      
      inject(function (_$timeout_) { $timeout = _$timeout_; });
    });

    var initialize = function() {
      setting.initialize();
      $timeout.flush();
    }

    it('defines subjectScope.parentWidget', function() {
      expect(widget).toBeDefined();
    });

    it('pushes the setting to the parent widget', function() {
      expect(setting.key).toEqual('time-slider');
    });

    it('resolves the deferred object', function() {
      expect(subjectScope.deferred.resolve).toHaveBeenCalledWith(setting);
    });

    it('does not require time-range and on-use attributes by default', function() {
      expect(subjectScope.timeRange).not.toBeDefined();
      expect(subjectScope.onUse).not.toBeDefined();
    });

    describe('optional parameters:', function() {
      var customDirective = angular.element('<div setting-time-slider parent-widget="widget" deferred="::deferred" time-range="\'-3y\'" on-use="true" />');
      var customScope;
      beforeEach(function(){ customScope = compile(customDirective); });

      it('defines scope.timeRange', function() {
        expect(customScope.timeRange).toEqual('-3y');
      });

      it('defines scope.onUse()', function() {
        expect(customScope.onUse()).toEqual(true);
      });
    });

    describe('#setting.initialize()', function() {
      var customDirective = angular.element('<div setting-time-slider parent-widget="widget" deferred="::deferred" time-range="\'-5w\'" />');
      var customScope;
      beforeEach(function() { customScope = compile(customDirective); });

      describe('initNumberOfPeriods():', function() {
        it('is based on the current month by default', function() {
          initialize();
          // March = 2...
          expect(subjectScope.numberOfPeriods).toEqual(2);
        });

        describe('when attribute time-range is defined', function() {
          it('is based on scope.timeRange', function() {
            initialize();
            expect(customScope.numberOfPeriods).toEqual(5);
          });
        });
      });

      describe('initPeriod():', function() {
        it('is monthly by default', function() {
          initialize();
          expect(subjectScope.period).toEqual('m');
        });

        describe('when attribute time-range is defined', function() {
          it('is based on scope.timeRange', function() {
            initialize();
            expect(customScope.period).toEqual('w');
          });
        });
      });

      describe('initFinancialYearEndMonth():', function() {
        it('is June by default', function() {
          initialize();
          expect(subjectScope.financialYearEndMonth).toEqual(6);
        });

        describe('when the current organization returns a financial year end month', function() {
          it('is based on this returned month', function() {
            financialYEndM = 7;
            initialize();
            expect(subjectScope.financialYearEndMonth).toEqual(7);
            financialYEndM = null;
          });
        });
      });
    });

    describe('#setting.toMetadata()', function() {
      it('returns the "hist_parameters" metadata', function() {
        initialize();
        var histParams = setting.toMetadata().hist_parameters;
        expect(histParams.to).toEqual('2016-03-15');
        expect(histParams.time_range).toEqual('-2m');
      });

      describe('when the period is financial year', function() {
        var customDirective = angular.element('<div setting-time-slider parent-widget="widget" deferred="::deferred" time-range="\'-2f\'" />');
        var customScope;
        beforeEach(function() { customScope = compile(customDirective); });
        // afterEach( function() {
        //   customScope.$digest();
        //   $timeout.verifyNoPendingTasks();
        // });
        
        xit('returns the "hist_parameters" metadata which includes a :from element', function() {
          initialize();

          console.log('period: ', customScope.period);
          console.log('n period: ', customScope.numberOfPeriods);
          console.log('f year end month: ', customScope.financialYearEndMonth);

          var histParams = customScope.parentWidget.settings[0].toMetadata().hist_parameters;
          expect(histParams.to).toEqual('2016-03-15');
          expect(histParams.time_range).toEqual('-2f');
          expect(histParams.from).toEqual('2013-07-01');

          // subjectScope.$evalAsync(function(){
          //   console.log('f year end month: ', customScope.financialYearEndMonth);
          //   expect(histParams.from).toEqual('2013-07-01');
          // });
        });
      });
    });
  });

});
