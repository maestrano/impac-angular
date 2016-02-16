describe('<> ImpacUtilities', function () {
  'use strict';

  var svc, subject, $window, _lodash, moment;

  beforeEach(function () {
    module('maestrano.impac');
    inject(function (_ImpacUtilities_, _$window_) {
      svc = _ImpacUtilities_;
      $window = _$window_;
    });
    // lodash
    _lodash = $window._;
    moment = $window.moment
  });

  it('is defined', function () {
    expect(typeof svc).toBeDefined();
  });

  describe('#getDatesRange', function () {

    describe('when at least one valid date is given', function () {

      var dates = ["2016-01-02", "2015-12-09", "2015-11-09", "2015-10-01", "2015-09-07", "2015-08-05", "2015-07-01", "2015-06-08", "2015-05-08"];

      describe('when dates are date-strings', function () {
        it('returns and array containing a minDate and maxDate as Date objects', function () {
          var minDate = moment('2015-05-08 00:00:00').toDate();
          var maxDate = moment().startOf('day').toDate();
          expect(svc.getDatesRange(dates)).toEqual([minDate, maxDate]);
        });
      });

      describe('when dates are Date objects', function () {
        it('returns an array containing a minDate and maxDate as Date objects', function () {
          var minDate = moment('2015-05-08 00:00:00').toDate();
          var maxDate = moment().startOf('day').toDate();
          var parsedDates = _lodash.map(dates, function (date) {
            return new Date(date);
          });
          expect(svc.getDatesRange(parsedDates)).toEqual([minDate, maxDate]);
        });
      });

      describe('when excludeToday parameter is passed', function () {
        it('returns and array containing a minDate and maxDate as Date objects', function () {
          var minDate = moment('2015-05-08 00:00:00').toDate();
          var maxDate = moment('2016-01-02 00:00:00').toDate();
          expect(svc.getDatesRange(dates, true)).toEqual([minDate, maxDate]);
        });
      });
    });

    describe('when no valid dates are given', function () {
      it('returns the default date range', function() {
        expect(svc.getDatesRange([])).toEqual([])
      });
    });
  });
});
