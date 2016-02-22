'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;

/**
 *  Builds and injects dependencies into workspace/index.html
 */
gulp.task('workspace', ['build'], function () {
  return gulp.src('workspace/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('workspace'));
});
