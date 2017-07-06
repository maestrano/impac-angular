describe('<> sales-top-customers widget', function () {
  'use strict';

  var scope, widget, $q, $window, ImpacUtilities, moment;

  var template = angular.element('<div widget-sales-top-customers />');
  
  beforeEach(function () {
    module('maestrano.impac', function ($translateProvider) {
      // Stubs the en-AU language with locale file
      jasmine.getJSONFixtures().fixturesPath = "base/dist/locales/";
      $translateProvider.translations('en-AU', getJSONFixture("en-AU.json"));
      $translateProvider.preferredLanguage('en-AU');
    })

    // Injects services needed by the directive & this spec
    inject(function (_$q_, _$window_, _ImpacUtilities_) {
      $q = _$q_;
      $window = _$window_;
      ImpacUtilities = _ImpacUtilities_;
    });

    moment = $window.moment
  });

  function buildScope($rootScope) {
    scope = $rootScope.$new();
    scope.widgetDeferred = $q.defer();
    scope.orgDeferred = $q.defer();
    scope.datesPickerDeferred = $q.defer();
    scope.paramSelectorDeferred = $q.defer();
    scope.widget = widget || {};
    return scope;
  }

  function compileDirective($compile) {
    $compile(template)(scope);
  }

  describe('.controller', function () {
    beforeEach(function () {
      inject(buildScope);
      spyOn(scope.widgetDeferred, 'resolve');
      inject(compileDirective);
    });

    it('widgetDeferred resolve get called with settingsPromises', function() {
      expect(scope.widgetDeferred.resolve).toHaveBeenCalledWith([
        scope.orgDeferred.promise,
        scope.datesPickerDeferred.promise,
        scope.paramSelectorDeferred.promise
      ]);
    });

    describe('w.initContext', function () {
      beforeEach(function () {
        spyOn(ImpacUtilities, 'getDatesRange').and.returnValue([
          moment().toDate(),
          moment().toDate()
        ]);
        scope.widget.initContext();
      });

      it('is defined as a function', function () {
        expect(typeof scope.widget.initContext).toEqual('function');
      });

      describe('when no data returned from the API', function() {

        it('defined scope.isDataFound', function () {
          expect(scope.isDataFound).toEqual(false);
        });
      });

      describe('when data is returned from API', function () {
        beforeEach(function () {
          widget = { content: { entities: [{id: '1'}] }, metadata: {} };
          inject(buildScope);
          inject(compileDirective);
          scope.widget.initContext();
        });

        it('defines scope.isDataFound', function () {
          expect(scope.isDataFound).toEqual(true);
        });

        it('defines scope.defaultTo & scope.defaultFrom', function () {
          expect(scope.defaultFrom).toEqual(moment().format('YYYY-MM-DD'));
          expect(scope.defaultTo).toEqual(moment().format('YYYY-MM-DD'));
        });

        it('defines scope.limitEntriesOptions', function () {
          expect(scope.limitEntriesOptions).toEqual([
            { label: 'TOP - 5', value: 5 },
            { label: 'TOP - 10', value: 10 },
            { label: 'TOP - 25', value: 25 },
            { label: 'TOP - 50', value: 50 },
            { label: 'TOP - 100', value: 100 }
          ]);
        });

        it('defines scope.limitEntriesSelected with a default value', function () {
          expect(scope.limitEntriesSelected).toEqual({ label: 'TOP - 50', value: 50 });
        })

        describe('widget.metadata.limit_entries attribute', function () {
          beforeEach(function () {
            widget = { content: { entities: [{id: '1'}] }, metadata: { limit_entries: 10 } };
            inject(buildScope);
            inject(compileDirective);
            scope.widget.initContext();
          });

          it('sets scope.limitEntriesSelected to the saved value', function () {
            expect(scope.limitEntriesSelected).toEqual({ label: 'TOP - 10', value: 10 });
          });
        });
      });
    });
  });
});
