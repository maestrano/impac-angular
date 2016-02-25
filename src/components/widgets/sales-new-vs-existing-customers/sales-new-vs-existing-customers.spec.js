describe('<> sales-new-vs-existing-customers widget', function () {
  'use strict';

  var scope, widget, $q, ChartFormatterSvc;

  var template = angular.element('<div widget-sales-new-vs-existing-customers />');

  // Injects services needed by the directive & this spec
  beforeEach(function () {
    module('maestrano.impac');
    inject(function (_$q_, _ChartFormatterSvc_) {
      $q = _$q_;
      ChartFormatterSvc = _ChartFormatterSvc_;
    });
  });

  function buildScope($rootScope) {
    scope = $rootScope.$new();
    scope.widgetDeferred = $q.defer();
    scope.orgDeferred = $q.defer();
    scope.timeRangeParamSelectorDeferred = $q.defer();
    scope.displayTypeParamSelectorDeferred = $q.defer();
    scope.chartDeferred = $q.defer();
    scope.widget = widget || {};
    return scope;
  }

  function compileDirective($compile) {
    $compile(template)(scope);
  }

  function aFullSummary() {
    return {
      customers_count: { total: 10, new: 3, existing: 7 },
      total_sales: { total: 3000, new: 2000, existing: 1000 },
      transactions_count: { total: 40, new: 25, existing: 15 }
    }
  }

  describe('.controller', function () {
    beforeEach(function () {
      inject(buildScope);
      spyOn(scope.widgetDeferred, 'resolve');
      inject(compileDirective);
    });

    it('defines all widget specific methods as functions', function () {
      expect(typeof scope.displayTypeOnClick).toEqual('function');
      expect(typeof scope.shouldDisplayCurrency).toEqual('function');
      expect(typeof scope.calculatePercentage).toEqual('function');
    });

    it('defines a drawTrigger deferred', function () {
      expect(scope.drawTrigger && scope.drawTrigger.notify).toBeDefined();
    });

    it('widgetDeferred resolve get called with settingsPromises', function() {
      expect(scope.widgetDeferred.resolve).toHaveBeenCalledWith([
        scope.orgDeferred.promise,
        scope.timeRangeParamSelectorDeferred.promise,
        scope.displayTypeParamSelectorDeferred.promise,
        scope.chartDeferred.promise
      ]);
    });

    describe('w.initContext', function () {
      beforeEach(function () {
        scope.widget.initContext()
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
          widget = {
            metadata: {},
            content: {
              summary: {
                customers_count: { total:14, new:9, existing:5 },
                total_sales: { total: 11089.92, new:9084.56, existing:2005.36 },
                transactions_count: { total:14, new:9, existing: 5 }
              }
            }
          };
          inject(buildScope);
          inject(compileDirective);
          scope.widget.initContext();
        });

        it('defines scope.isDataFound', function () {
          expect(scope.isDataFound).toEqual(true);
        });

        it('defines scope.displayOptions', function () {
          expect(scope.displayOptions).toEqual([
            {label: 'Customers', value: 'customers_count'},
            {label: 'Total Sales', value: 'total_sales'},
            {label: 'Transactions', value: 'transactions_count'},
          ]);
        });

        it('defines scope.displayType with a default value', function () {
          expect(scope.displayType).toEqual({label: 'Customers', value: 'customers_count'});
        });

        describe('widget.metadata.display_type attribute', function () {
          beforeEach(function () {
            widget = { content: { summary: {} }, metadata: { display_type: 'total_sales' } };
            inject(buildScope);
            inject(compileDirective);
            scope.widget.initContext();
          });

          it('sets scope.displayType to the saved value', function () {
            expect(scope.displayType).toEqual({label: 'Total Sales', value: 'total_sales'});
          });
        });

        it('defines scope.timeRangeOptions', function () {
          expect(scope.timeRangeOptions).toEqual([
            {label: 'Last 24h', value: '-1d'},
            {label: 'Last 5 days', value: '-5d'},
            {label: 'Last 7 days', value: '-7d'},
            {label: 'Last 30 days', value: '-30d'},
            {label: 'Last 45 days', value: '-45d'},
            {label: 'Last 60 days', value: '-60d'},
            {label: 'Last 90 days', value: '-90d'},
          ]);
        });

        describe('widget.metadata.time_range attribute', function () {
          beforeEach(function () {
            widget = { content: { summary: {} }, metadata: { time_range: '-60d' } };
            inject(buildScope);
            inject(compileDirective);
            scope.widget.initContext();
          });

          it('sets scope.timeRange to the saved value', function () {
            expect(scope.timeRange).toEqual({label: 'Last 60 days', value: '-60d'});
          });
        });
      });
    });

    describe('scope.displayTypeOnClick', function () {
      beforeEach(function () {
        inject(buildScope);
        scope.updateSettings = function () {};
        inject(compileDirective);
      });

      it('should update the settings and redraw the pie chart (graph)', function () {
        spyOn(scope, 'updateSettings');
        spyOn(scope.widget, 'format');
        scope.displayTypeOnClick();
        expect(scope.updateSettings).toHaveBeenCalledTimes(1);
        expect(scope.updateSettings).toHaveBeenCalledWith(false);
        expect(scope.widget.format).toHaveBeenCalled();
      });
    });

    describe('scope.shouldDisplayCurrency', function () {
      describe('when scope.displayType value is a currency', function () {
        beforeEach(function () {
          inject(buildScope);
          scope.isDataFound = true;
          inject(compileDirective);
          scope.displayType = {label: 'Total Sales', value: 'total_sales'};
        });

        it('returns the correct results based on scope.displayType', function () {
          expect(scope.shouldDisplayCurrency()).toEqual(true);
        });
      });

      describe('when scope.displayType value is an amount', function () {
        beforeEach(function () {
          inject(buildScope);
          scope.isDataFound = true;
          scope.displayType = {label: 'Customers', value: 'customers_count'};
          inject(compileDirective);
        });

        it('returns the correct results based on scope.displayType', function () {
          expect(scope.shouldDisplayCurrency()).toEqual(false);
        });
      });
    });

    describe('scope.calculatePercentage', function () {
      beforeEach(function () {
        widget = { content: { summary: aFullSummary() }, metadata: {} };
        inject(buildScope);
        scope.displayType = {label: 'Customers', value: 'customers_count'};
        inject(compileDirective);
      });

      it('should correctly calculate a percentage and return as integer value', function () {
        expect(scope.calculatePercentage('new')).toEqual(30)
        expect(scope.calculatePercentage('existing')).toEqual(70)
      });
    });

    describe('w.format', function () {

      it('is defined as a function', function () {
        expect(typeof scope.widget.format).toEqual('function');
      });

      describe('when data is returned from the API', function () {
        var pieData = [{ label: 'EXISTING 70%', value: 7 }, { label: 'NEW 30%', value: 3 }];
        var pieOptions = { percentageInnerCutout: 50, tooltipFontSize: 12, currency: 'hide' };

        beforeEach(function () {
          widget = { content: { summary: aFullSummary() }, metadata: {} };
          inject(buildScope);
          scope.isDataFound = true
          scope.displayType = {label: 'Customers', value: 'customers_count'};
          scope.shouldDisplayCurrency = function () { return false };
          inject(compileDirective);
        });

        it('notifys drawTrigger with the correct chartData', function () {
          spyOn(ChartFormatterSvc, 'pieChart').and.callFake(function () {
            return {pieChart: 'response'};
          });
          spyOn(scope.drawTrigger, 'notify');
          scope.widget.format();
          expect(ChartFormatterSvc.pieChart).toHaveBeenCalledWith(pieData, pieOptions, true);
          expect(scope.drawTrigger.notify).toHaveBeenCalledWith({pieChart: 'response'});
        });
      });
    });

  });

});
