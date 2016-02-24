describe('<> ImpacDeveloper Provider', function () {
  'use strict';

  var ImpacDeveloper, options;

  function configureProvider(options) {
    options = options;
    module('maestrano.impac', function (ImpacDeveloperProvider) {
      ImpacDeveloperProvider.configure(options);
    });
    inject(function (_ImpacDeveloper_) {
      ImpacDeveloper = _ImpacDeveloper_;
    });
  }

  describe('service.getStatus', function () {
    describe('default', function () {
      beforeEach(configureProvider())

      it('status is false', function () {
        expect(ImpacDeveloper.getStatus()).toEqual(false);
      });
    });
    describe('configured as status true', function () {
      beforeEach(configureProvider({status: true}))

      it('service.getStatus returns true', function () {
        expect(ImpacDeveloper.getStatus()).toEqual(true);
      });
    });
  });

  describe('service.stubWidgetsTemplates', function () {
    describe('default', function () {
      beforeEach(configureProvider());

      it('saves an empty array to service.widgetsTemplates', function () {
        expect(ImpacDeveloper.stubWidgetsTemplates()).toEqual([]);
        expect(ImpacDeveloper.widgetsTemplates).toBeDefined();
      });
    });
    describe('configured with widget templates', function () {
      beforeEach(configureProvider({widgetsTemplates: [{name: 'Foobar'}]}));

      it('saves the configured templates to service.widgetsTemplate', function () {
        expect(ImpacDeveloper.stubWidgetsTemplates()).toEqual(options.widgetsTemplates);
        expect(ImpacDeveloper.widgetsTemplates).toEqual(options.widgetsTemplates);
      })
    });
  });
});
