'use strict';

var path = require('path');
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'karma', 'run-sequence']
});

gulp.task('unit-tests', function (done) {
  $.karma.server.start({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: true
  }, done);
  $.util.log($.util.colors.yellow('[ STARTING UNIT TESTS ]'));
});

gulp.task('unit-tests-min', function (done) {
  $.karma.server.start({
    configFile: path.join(__dirname, '/../karma-min.conf.js'),
    singleRun: true
  }, done);
  $.util.log($.util.colors.yellow('[ STARTING UNIT TESTS ON MINIFIED FILES ]'));
});


gulp.task('test', function (cb) {
  $.runSequence('unit-tests', ['unit-tests-min'], cb);
});
