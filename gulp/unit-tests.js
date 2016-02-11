'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    path = require('path'),
    gutil = require('gulp-util'),
    runSeq = require('run-sequence'),
    karma = require('karma').server;

gulp.task('unit-tests', function (done) {
  karma.start({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: true
  }, done);
  gutil.log(gutil.colors.yellow('[ STARTING UNIT TESTS ]'));
});

gulp.task('unit-tests-min', function (done) {
  karma.start({
    configFile: path.join(__dirname, '/../karma-min.conf.js'),
    singleRun: true
  }, done);
  gutil.log(gutil.colors.yellow('[ STARTING UNIT TESTS ON MINIFIED FILES ]'));
});


gulp.task('test', function (cb) {
  runSeq('unit-tests', ['unit-tests-min'], cb);
});
