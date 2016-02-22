describe('<> ImpacDeveloper Provider', function () {
  'use strict';

  var ImpacDeveloper, options;

  beforeEach(function() {
    options = {
      status: true
    }
  });

  describe('when the service is enabled via developer.status', function () {
    beforeEach(function () {
      module('maestrano.impac', function (ImpacDeveloperProvider) {
        ImpacDeveloperProvider.configure(options);
      });
      inject(function (_ImpacDeveloper_) {
        ImpacDeveloper = _ImpacDeveloper_;
      });
    });

    it('service.getStatus returns true', function () {
      expect(ImpacDeveloper.getStatus()).toEqual(true);
    });

    describe('service.stubWidgetsTemplates', function () {
      beforeEach(function () {
        options.widgetsTemplates = [{name: 'Foobar'}];
        module('maestrano.impac', function (ImpacDeveloperProvider) {
          ImpacDeveloperProvider.configure(options);
        });
      });

      it('assigns the configured templates to service.widgetsTemplate', function () {
        expect(ImpacDeveloper.stubWidgetsTemplates()).toEqual(options.widgetsTemplates);
      });
    });
  });

  describe('when the service is disabled via developer.status', function () {
    beforeEach(function () {
      module('maestrano.impac');
      inject(function (_ImpacDeveloper_) {
        ImpacDeveloper = _ImpacDeveloper_;
      });
    });

    it('service.getStatus returns false', function () {
      expect(ImpacDeveloper.getStatus()).toEqual(false);
    });
  });
});
