'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');

var conf = require('./conf');
var bowerInfo = require('../bower.json');

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

gulp.task('locales', function () {
  return gulp.src(path.join(conf.paths.src, '**/locales/*.json'))
    // .pipe(localesFilter)
    .pipe($.angularTranslate({
      module: 'maestrano.impac',
      standalone: false,
      filename: 'impac-angular.locales.js'}))
    .pipe(gulp.dest(conf.paths.tmp + '/scripts')) // Output locales.js
})

// Scripts to run impac.version in the console (need to refresh first)
// Needs to be called AFTER scripts due to permissions errors
gulp.task('version', ['scripts'], function () {
  var func = '(function () {console.info("' + bowerInfo.description + ' - v' + bowerInfo.version + '"); window["impac"] = {"version": "' + bowerInfo.version + '"};}).call();';

  return fs.writeFileSync(path.join(conf.paths.tmp, '/scripts', '/version.js'), func);
});

