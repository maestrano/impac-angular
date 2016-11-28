'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();

/**
 *  Builds and injects dependencies into workspace/index.html
 */
gulp.task('workspace', ['build'], function () {
  var injectFiles = gulp.src(['workspace/app/**/*.js', 'workspace/app/**/*.css'], {read: false});
  var injectOptions = { relative: true };

  return gulp.src('workspace/index.html')
    .pipe(wiredep({
      devDependencies: true
    }))
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(gulp.dest('workspace'));
});
