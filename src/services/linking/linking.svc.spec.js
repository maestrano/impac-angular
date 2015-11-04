describe('<> ImpacLinking Provider', function () {
  'use strict';

  var ImpacLinking, provider, service;

  beforeEach(function() {
    module('maestrano.impac');
    inject(function (_ImpacLinking_) {
      provider = ImpacLinking = _ImpacLinking_;
    });
  });

  it('should be defined', function () {
    expect(typeof provider).not.toEqual('undefined');
  });

  //describe('method: linkData', function () {
  //
  //  beforeEach(function () {
  //    spyOn(provider, 'linkData').and.callThrough();
  //  });
  //
  //  it('should throw an error if not all required links are set', function () {
  //    expect(function () {
  //      provider.linkData({
  //        user: function () {}
  //      });
  //    }).toThrowError();
  //  });
  //
  //  it('should throw an error if not all config options are callbacks', function () {
  //    expect(function () {
  //      provider.linkData({
  //        user: function () {},
  //        organizations: 10
  //      });
  //    }).toThrowError();
  //  });
  //});
  //
  //describe('method: $get', function () {
  //
  //  beforeEach(function () {
  //    service = ImpacLinking.$get();
  //    console.log('service: ',service);
  //  });
  //
  //  it('should return an instance of the service', function () {
  //    expect(service).toBeDefined();
  //    expect(typeof service).toEqual('object');
  //  });
  //
  //});
});
