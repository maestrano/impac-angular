'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

// Compile dist/impac-angular.css from src/impac-angular.less
gulp.task('styles-compile', function () {
  var lessOptions = {
    paths: [
      path.join(conf.paths.src, '/components')
    ]
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/components/**/*.less')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '/* inject:imports */',
    endtag: '/* endinject */',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/impac-angular.less')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(conf.wiredep))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.dist)))
});

// Concat all less files to generate dist/impac-angular.less
gulp.task('styles-concat', function () {
  return gulp.src([
      path.join(conf.paths.src, '/stylesheets/variables.less'),
      path.join(conf.paths.src, '/stylesheets/mixins.less'),
      path.join(conf.paths.src, '/stylesheets/globals.less'),
      path.join(conf.paths.src, '/stylesheets/widget-master-styles.less'),
      path.join(conf.paths.src, '/components/**/*.less')
    ])
    .pipe($.concat('impac-angular.less'))
    .pipe(gulp.dest(path.join(conf.paths.dist)));
});

gulp.task('styles', ['styles-concat', 'styles-compile']);
