'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('impacAngular');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('impacAngular.config')).to.be.ok;
  });

  
  it('should load filters module', function() {
    expect(hasModule('impacAngular.filters')).to.be.ok;
  });
  

  
  it('should load directives module', function() {
    expect(hasModule('impacAngular.directives')).to.be.ok;
  });
  

  
  it('should load services module', function() {
    expect(hasModule('impacAngular.services')).to.be.ok;
  });
  

});