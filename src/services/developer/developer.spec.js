describe('<> ImpacDeveloper Provider', function () {
  'use strict';


  var ImpacDeveloper, provider = {};

  function configureProvider(options) {
    provider.options = options
    module('maestrano.impac', function (ImpacDeveloperProvider) {
      ImpacDeveloperProvider.configure(options);
    });
    inject(function (_ImpacDeveloper_) {
      ImpacDeveloper = _ImpacDeveloper_;
    });
  }

  describe('service.isEnabled', function () {
    describe('by default', function () {
      beforeEach(function () {
        configureProvider();
      });

      it('status is false', function () {
        expect(ImpacDeveloper.isEnabled()).toEqual(false);
      });
    })
    describe('configured as status true', function () {
      beforeEach(function () {
        configureProvider({status: true});
      });

      it('service.isEnabled returns true', function () {

        expect(ImpacDeveloper.isEnabled()).toEqual(provider.options.status);
      });
    });
  });

  describe('service.stubWidgetsTemplates', function () {
    var templatesFromAPI = [{name: 'API Template 1'}, {name: 'API Template 2'}];

    describe('with stubbed templates provided', function () {
      beforeEach(function () {
        configureProvider({widgetsTemplates: [{name: 'My Awesome Stubbed Widget Template'}]});
      });

      it('returns an array of stubbed templates, and api templates', function () {
        expect(ImpacDeveloper.stubWidgetsTemplates(templatesFromAPI)).toEqual(
          templatesFromAPI.concat(provider.options.widgetsTemplates)
        );
      })
    });

    describe('with no stubbed templates provided', function () {
      beforeEach(function () {
        configureProvider();
      });

      it('returns an array of api templates', function () {
        expect(ImpacDeveloper.stubWidgetsTemplates(templatesFromAPI)).toEqual(templatesFromAPI);
      })
    });
  });
});
