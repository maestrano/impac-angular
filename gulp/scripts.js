'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');

var conf = require('./conf');
var bowerVersion = require('../bower.json').version;

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
    .pipe($.size())
});

// Scripts to run impac.version in the console (need to refresh first)
// Needs to be called AFTER scripts due to permissions errors
gulp.task('version', ['scripts'], function () {
  return fs.writeFileSync(path.join(conf.paths.tmp, '/scripts', '/version.js'), '(function (module) {module["impac"] = {"version":"' + bowerVersion + '"};}).call(window, window, window["impac"]);\n');
});

