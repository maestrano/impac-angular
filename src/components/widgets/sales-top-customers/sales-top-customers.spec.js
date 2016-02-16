describe('<> sales-top-customers widget', function () {
  'use strict';

  var scope, $q, $window, ImpacUtilities, moment;

  var setComponentSettingDeferreds = function () {
    scope.widgetDeferred = $q.defer();
    scope.orgDeferred = $q.defer();
    scope.datesPickerDeferred = $q.defer();
    scope.paramSelectorDeferred = $q.defer();
  };

  var setWidget = function (widget) {
    scope.widget = widget;
  };

  // injecting modules to test
  beforeEach(module('maestrano.impac'));

  // injecting services required
  beforeEach(function () {
    inject(function (_$q_, _$window_, _ImpacUtilities_) {
      $q = _$q_;
      $window = _$window_;
      ImpacUtilities = _ImpacUtilities_;
    });
    moment = $window.moment
  });

  // compiling the directive and setting scope.
  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();

    setComponentSettingDeferreds()
    setWidget({
      content: {
        entities: [{id: '1'}]
      },
      metadata: {
        limit_entries: 10
      }
    });

    $compile('<div widget-sales-top-customers />')(scope);
    // scope.$digest();
  }));

  describe('.controller', function () {
    beforeEach(function () {
      spyOn(scope.widgetDeferred, 'resolve');
      inject(function ($compile) {
        $compile('<div widget-sales-top-customers />')(scope);
      });
    });
    it('widgetDeferred resolve get called with settingsPromises', function() {
      expect(scope.widgetDeferred.resolve).toHaveBeenCalledWith([
        scope.orgDeferred.promise,
        scope.datesPickerDeferred.promise,
        scope.paramSelectorDeferred.promise
      ]);
    });
  });

  describe('w.initContext', function () {

    beforeEach(function () {
      spyOn(ImpacUtilities, 'getDatesRange').and.returnValue([moment().toDate(), moment().toDate()])
      scope.widget.initContext()
    });

    it('is defined', function () {
      expect(typeof scope.widget.initContext).toEqual('function');
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

    it('sets scope.limitEntriesSelected with saved metadata from widget', function () {
      expect(scope.limitEntriesSelected).toEqual({ label: 'TOP - 10', value: 10 });
    })

    describe('when no metadata.limit_entries param is saved', function () {
      beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();

        setComponentSettingDeferreds()
        setWidget({
          content: {
            entities: [{id: '1'}]
          },
          metadata: {}
        });

        $compile('<div widget-sales-top-customers />')(scope);
        scope.$digest();
      }));

      beforeEach(function () {
        scope.widget.initContext();
      });

      it('sets a default scope.limitEntriesSelected value if not saved in metadata', function () {
        expect(scope.limitEntriesSelected).toEqual({ label: 'TOP - 50', value: 50 });
      });
    });
  });
});
