'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    path = require('path'),
    gutil = require('gulp-util'),
    runSeq = require('run-sequence'),
    karma = require('karma').server;

gulp.task('test-v1', function (done) {
  karma.start({
    configFile: path.join(__dirname, '/../karma-v1.conf.js'),
    singleRun: true
  }, done);
  gutil.log(gutil.colors.yellow('[ STARTING VERSION 1 UNIT TESTS ]'));
  gutil.log(gutil.colors.yellow('[ STARTING VERSION 1 UNIT TESTS ]'));
  gutil.log(gutil.colors.yellow('[ STARTING VERSION 1 UNIT TESTS ]'));
});

gulp.task('test-v2', function (done) {
  karma.start({
    configFile: path.join(__dirname, '/../karma-v2.conf.js'),
    singleRun: true
  }, done);
  gutil.log(gutil.colors.yellow('[ STARTING VERSION 2 UNIT TESTS ]'));
  gutil.log(gutil.colors.yellow('[ STARTING VERSION 2 UNIT TESTS ]'));
  gutil.log(gutil.colors.yellow('[ STARTING VERSION 2 UNIT TESTS ]'));
});


gulp.task('test', function (cb) {
  runSeq('test-v1', ['test-v2'], cb);
});
