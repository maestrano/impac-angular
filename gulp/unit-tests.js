'use strict';

var path = require('path');
var gulp = require('gulp');
// var conf = require('./conf');

// var karma = require('karma');

// karma for gulp
var karma = require('karma').server;

/* ************************************ */
/* Testing Tasks                        */
/* ************************************ */
// run tests on concatinated and minified dist builds of impac-angular.
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/../karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

// run test on dist/impac-angular.min.js
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/../karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('test', ['test-dist-concatenated']);
gulp.task('test:dist', ['test-dist-minified']);
