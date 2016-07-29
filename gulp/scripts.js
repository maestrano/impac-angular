'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(path.join(conf.paths.src, '/**/*.coffee'))
    // TODO: make source maps actually work.
    // .pipe($.sourcemaps.init())
    // .pipe($.sourcemaps.write())
    // TODO: configure .jshintrc rules, and re-enable.
    // .pipe($.coffeelint())
    // .pipe($.coffeelint.reporter())
    .pipe($.coffee()).on('error', conf.errorHandler('CoffeeScript'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/scripts')))
    .pipe($.size());
});
