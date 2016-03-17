describe('<> mno-currency filter', function () {
  'use strict';

  var $filter;

  var SYMBOLS = {
    USD: '$',
    AUD: '$',
    CAD: '$',
    CNY: '¥',
    EUR: '€',
    GBP: '£',
    HKD: '$',
    INR: '',
    JPY: '¥',
    NZD: '$',
    SGD: '$',
    PHP: '₱',
    AED: '',
    IDR: 'Rp'
  }

  beforeEach(function () {
    module('impac.filters.mno-currency');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  describe('when ISOmode is default or explicity true', function () {
    it('suffixes currencies with the correct ISO code', function () {
      var keys = Object.keys(SYMBOLS);
      for (var i = 0; i < keys.length; i++) {
        expect($filter('mnoCurrency')(1456.60, keys[i])).toContain(keys[i]);
        expect($filter('mnoCurrency')(1456.60, keys[i], true)).toContain(keys[i]);
      }
    });

    it('formats all currency types correctly', function () {
      var keys = Object.keys(SYMBOLS);
      for (var i = 0; i < keys.length; i++) {
        expect($filter('mnoCurrency')(1456.60, keys[i])).toEqual('1,456.60 ' + keys[i]);
        expect($filter('mnoCurrency')(1456.60, keys[i], true)).toEqual('1,456.60 ' + keys[i]);
      }
    });
  });

  describe('when ISOmode is false', function () {
    it('prefixes currencies with the correct currency symbol', function () {
      var keys = Object.keys(SYMBOLS);
      for (var i = 0; i < keys.length; i++) {
        expect($filter('mnoCurrency')(1456.60, keys[i], false)).toContain(SYMBOLS[keys[i]]);
      }
    });
    it('formats all currency types correctly', function () {
      var keys = Object.keys(SYMBOLS);
      for (var i = 0; i < keys.length; i++) {
        expect($filter('mnoCurrency')(1456.60, keys[i], false)).toEqual(SYMBOLS[keys[i]] + '1,456.60');
      }
    });
  });

  describe('when an invalid currency is given', function () {
    it('converts amount given to a integer', function () {
      expect($filter('mnoCurrency')(1000000000.60, 'km/h')).toEqual(1000000000);
      expect($filter('mnoCurrency')(1456.60, 'km/h', false)).toEqual(1456);
    });
  });

  describe('when a percentage or ratio is given', function () {
    it('displays the amount correctly', function () {
      expect($filter('mnoCurrency')(6.67, '%')).toEqual('6.67 %');
      expect($filter('mnoCurrency')(9000.00, '%')).toEqual('9000.00 %');
      expect($filter('mnoCurrency')(50.60, '(ratio)')).toEqual('50.60 (ratio)');
      expect($filter('mnoCurrency')(9000, '(ratio)')).toEqual('9000.00 (ratio)');
    });
  });
});
